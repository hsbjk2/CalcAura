import { PracticeQuestion, AcademicStage } from './practiceQuestionsData.ts';
import { Notebook } from '../components/Whiteboard/types.ts';
import { generateId } from '../components/Whiteboard/storage.ts';
import {
  savePracticeAttemptToSupabase,
  fetchPracticeAttemptsFromSupabase,
  deletePracticeAttemptFromSupabase,
  clearAllPracticeAttemptsFromSupabase,
  saveWhiteboardToSupabase,
  fetchSavedWhiteboardsFromSupabase,
  deleteSavedWhiteboardFromSupabase,
} from './supabaseHistoryService.ts';
import { getActiveTokenProvider, isSupabaseConfigured } from '../lib/supabaseClient.ts';

export interface PracticeHistoryEntry {
  id: string;
  userId?: string;
  title: string;
  stage: AcademicStage | 'all';
  stageLabel: string;
  classChapter: string;
  submittedAt: number;
  questions: PracticeQuestion[];
  userAnswers: Record<number, number>;
  submittedAnswers?: Record<string | number, number>;
  score: number;
  totalQuestions: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  timeTakenSeconds?: number;
  timeLimitMinutes: number;
  classGrade?: string;
  chapter?: string;
}

export interface SavedWhiteboardEntry {
  id: string;
  userId?: string;
  name: string;
  sheetCount: number;
  createdAt: number;
  lastSavedAt: number;
  thumbnail?: string;
  notebook: Notebook;
}

const DB_NAME = 'CalcAuraHistoryDB';
const DB_VERSION = 1;
const STORE_PRACTICE = 'practice_history';
const STORE_WHITEBOARD = 'saved_whiteboards';

const LS_PRACTICE_KEY = 'calcaura_practice_history_v1';
const LS_WHITEBOARD_KEY = 'calcaura_saved_whiteboards_v1';
const LS_ACTIVE_UID = 'calcaura_active_user_id';

export function getActiveUserId(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(LS_ACTIVE_UID);
  } catch {
    return null;
  }
}

function openHistoryDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_PRACTICE)) {
        db.createObjectStore(STORE_PRACTICE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_WHITEBOARD)) {
        db.createObjectStore(STORE_WHITEBOARD, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ========================================================
// 1. INTERACTIVE PRACTICE SHEETS HISTORY (USER ISOLATED)
// ========================================================

export async function savePracticeHistoryEntry(entry: PracticeHistoryEntry, userId?: string): Promise<void> {
  const targetUid = userId || entry.userId || getActiveUserId() || 'anonymous';
  const entryWithUser: PracticeHistoryEntry = {
    ...entry,
    userId: targetUid,
  };

  try {
    const db = await openHistoryDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_PRACTICE, 'readwrite');
      const store = tx.objectStore(STORE_PRACTICE);
      const req = store.put(entryWithUser);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB savePracticeHistoryEntry failed, using localStorage fallback', err);
    savePracticeToLocalStorage(entryWithUser);
  }

  // Cloud sync to Supabase if configured
  if (isSupabaseConfigured() && targetUid && targetUid !== 'anonymous') {
    try {
      await savePracticeAttemptToSupabase(entryWithUser, targetUid, getActiveTokenProvider() || undefined);
    } catch (err) {
      console.warn('Supabase practice attempt cloud sync failed:', err);
    }
  }
}

export async function listPracticeHistory(currentUserId?: string | null): Promise<PracticeHistoryEntry[]> {
  const activeUid = currentUserId !== undefined ? currentUserId : getActiveUserId();
  
  // Security check: if not logged in, NEVER reveal private records!
  if (!activeUid) {
    return [];
  }

  // Attempt to fetch from Supabase Cloud if configured
  if (isSupabaseConfigured()) {
    try {
      const remote = await fetchPracticeAttemptsFromSupabase(activeUid, getActiveTokenProvider() || undefined);
      if (remote !== null) {
        // Cache fetched remote records to IndexedDB for offline resilience
        try {
          const db = await openHistoryDB();
          const tx = db.transaction(STORE_PRACTICE, 'readwrite');
          const store = tx.objectStore(STORE_PRACTICE);
          remote.forEach((item) => store.put(item));
        } catch {}
        return remote;
      }
    } catch (err) {
      console.warn('Supabase practice attempts fetch failed, falling back to local DB:', err);
    }
  }

  let allEntries: PracticeHistoryEntry[] = [];
  try {
    const db = await openHistoryDB();
    allEntries = await new Promise<PracticeHistoryEntry[]>((resolve) => {
      const tx = db.transaction(STORE_PRACTICE, 'readonly');
      const store = tx.objectStore(STORE_PRACTICE);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as PracticeHistoryEntry[]) || []);
      req.onerror = () => resolve(loadPracticeFromLocalStorage());
    });
  } catch {
    allEntries = loadPracticeFromLocalStorage();
  }

  // Filter entries strictly for this user
  let userEntries = allEntries.filter((e) => e.userId === activeUid);

  // If user is a demo user and has no records yet, seed realistic records
  if (userEntries.length === 0 && activeUid.startsWith('user-')) {
    const seeded = getDemoPracticeSeeds(activeUid);
    for (const seed of seeded) {
      await savePracticeHistoryEntry(seed, activeUid);
    }
    userEntries = seeded;
  }

  userEntries.sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
  return userEntries;
}

export async function getPracticeHistoryById(id: string, currentUserId?: string | null): Promise<PracticeHistoryEntry | null> {
  const activeUid = currentUserId !== undefined ? currentUserId : getActiveUserId();
  if (!activeUid) return null;

  try {
    const db = await openHistoryDB();
    const result = await new Promise<PracticeHistoryEntry | null>((resolve) => {
      const tx = db.transaction(STORE_PRACTICE, 'readonly');
      const store = tx.objectStore(STORE_PRACTICE);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(loadPracticeFromLocalStorage().find((p) => p.id === id) || null);
    });
    if (result && result.userId === activeUid) return result;
    return null;
  } catch {
    const item = loadPracticeFromLocalStorage().find((p) => p.id === id);
    if (item && item.userId === activeUid) return item;
    return null;
  }
}

export async function deletePracticeHistoryEntry(id: string, currentUserId?: string | null): Promise<void> {
  const activeUid = currentUserId !== undefined ? currentUserId : getActiveUserId();
  if (!activeUid) return;

  try {
    const db = await openHistoryDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_PRACTICE, 'readwrite');
      const store = tx.objectStore(STORE_PRACTICE);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('deletePracticeHistoryEntry error', err);
  }
  deletePracticeFromLocalStorage(id);

  if (isSupabaseConfigured()) {
    try {
      await deletePracticeAttemptFromSupabase(id, activeUid, getActiveTokenProvider() || undefined);
    } catch {}
  }
}

export async function clearAllPracticeHistory(currentUserId?: string | null): Promise<void> {
  const activeUid = currentUserId !== undefined ? currentUserId : getActiveUserId();
  if (!activeUid) return;

  try {
    const db = await openHistoryDB();
    const tx = db.transaction(STORE_PRACTICE, 'readwrite');
    const store = tx.objectStore(STORE_PRACTICE);
    const req = store.getAll();
    req.onsuccess = () => {
      const items = (req.result as PracticeHistoryEntry[]) || [];
      items.forEach((item) => {
        if (item.userId === activeUid) {
          store.delete(item.id);
        }
      });
    };
  } catch (err) {
    console.warn('clearAllPracticeHistory error', err);
  }

  try {
    const list = loadPracticeFromLocalStorage().filter((e) => e.userId !== activeUid);
    localStorage.setItem(LS_PRACTICE_KEY, JSON.stringify(list));
  } catch {}

  if (isSupabaseConfigured()) {
    try {
      await clearAllPracticeAttemptsFromSupabase(activeUid, getActiveTokenProvider() || undefined);
    } catch {}
  }
}

function savePracticeToLocalStorage(entry: PracticeHistoryEntry) {
  try {
    const list = loadPracticeFromLocalStorage();
    const idx = list.findIndex((e) => e.id === entry.id);
    if (idx >= 0) list[idx] = entry;
    else list.unshift(entry);
    localStorage.setItem(LS_PRACTICE_KEY, JSON.stringify(list));
  } catch {}
}

function loadPracticeFromLocalStorage(): PracticeHistoryEntry[] {
  try {
    const str = localStorage.getItem(LS_PRACTICE_KEY);
    return str ? JSON.parse(str) : [];
  } catch {
    return [];
  }
}

function deletePracticeFromLocalStorage(id: string) {
  try {
    const list = loadPracticeFromLocalStorage().filter((e) => e.id !== id);
    localStorage.setItem(LS_PRACTICE_KEY, JSON.stringify(list));
  } catch {}
}

// ========================================================
// 2. SAVED WHITEBOARDS HISTORY (MANUAL SAVE ONLY & ISOLATED)
// ========================================================

export async function isWhiteboardSavedInHistory(id: string): Promise<boolean> {
  try {
    const db = await openHistoryDB();
    return await new Promise<boolean>((resolve) => {
      const tx = db.transaction(STORE_WHITEBOARD, 'readonly');
      const store = tx.objectStore(STORE_WHITEBOARD);
      const req = store.get(id);
      req.onsuccess = () => resolve(!!req.result);
      req.onerror = () => resolve(false);
    });
  } catch {
    return loadSavedWhiteboardsFromLocalStorage().some((wb) => wb.id === id);
  }
}

export async function saveWhiteboardToHistory(
  notebook: Notebook,
  thumbnail?: string,
  userId?: string
): Promise<SavedWhiteboardEntry> {
  const now = Date.now();
  const existing = await getSavedWhiteboardById(notebook.id);
  const targetUid = userId || existing?.userId || getActiveUserId() || 'anonymous';

  const entry: SavedWhiteboardEntry = {
    id: notebook.id,
    userId: targetUid,
    name: notebook.name || 'Untitled Board',
    sheetCount: notebook.sheets?.length || 1,
    createdAt: existing ? existing.createdAt : notebook.createdAt || now,
    lastSavedAt: now,
    thumbnail: thumbnail || existing?.thumbnail || notebook.sheets?.[0]?.thumbnail,
    notebook: {
      ...notebook,
      updatedAt: now,
    },
  };

  try {
    const db = await openHistoryDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_WHITEBOARD, 'readwrite');
      const store = tx.objectStore(STORE_WHITEBOARD);
      const req = store.put(entry);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('saveWhiteboardToHistory failed, using localStorage fallback', err);
    saveSavedWhiteboardToLocalStorage(entry);
  }

  // Cloud sync to Supabase if configured
  if (isSupabaseConfigured() && targetUid && targetUid !== 'anonymous') {
    try {
      await saveWhiteboardToSupabase(entry, targetUid, getActiveTokenProvider() || undefined);
    } catch (err) {
      console.warn('Supabase whiteboard cloud sync failed:', err);
    }
  }

  return entry;
}

export async function saveWhiteboardAsCopy(
  notebook: Notebook,
  newName: string,
  thumbnail?: string,
  userId?: string
): Promise<SavedWhiteboardEntry> {
  const newId = generateId();
  const now = Date.now();
  const targetUid = userId || getActiveUserId() || 'anonymous';

  const clonedNotebook: Notebook = {
    ...JSON.parse(JSON.stringify(notebook)),
    id: newId,
    name: newName.trim() || `${notebook.name} (Copy)`,
    createdAt: now,
    updatedAt: now,
  };

  const entry: SavedWhiteboardEntry = {
    id: newId,
    userId: targetUid,
    name: clonedNotebook.name,
    sheetCount: clonedNotebook.sheets?.length || 1,
    createdAt: now,
    lastSavedAt: now,
    thumbnail: thumbnail || clonedNotebook.sheets?.[0]?.thumbnail,
    notebook: clonedNotebook,
  };

  try {
    const db = await openHistoryDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_WHITEBOARD, 'readwrite');
      const store = tx.objectStore(STORE_WHITEBOARD);
      const req = store.put(entry);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    saveSavedWhiteboardToLocalStorage(entry);
  }

  // Cloud sync copy to Supabase if configured
  if (isSupabaseConfigured() && targetUid && targetUid !== 'anonymous') {
    try {
      await saveWhiteboardToSupabase(entry, targetUid, getActiveTokenProvider() || undefined);
    } catch (err) {
      console.warn('Supabase copy whiteboard cloud sync failed:', err);
    }
  }

  return entry;
}

export async function listSavedWhiteboards(currentUserId?: string | null): Promise<SavedWhiteboardEntry[]> {
  const activeUid = currentUserId !== undefined ? currentUserId : getActiveUserId();
  
  // Security check: if not logged in, NEVER reveal private whiteboards!
  if (!activeUid) {
    return [];
  }

  // Attempt to fetch from Supabase Cloud if configured
  if (isSupabaseConfigured()) {
    try {
      const remote = await fetchSavedWhiteboardsFromSupabase(activeUid, getActiveTokenProvider() || undefined);
      if (remote !== null) {
        // Cache to IndexedDB for offline resilience
        try {
          const db = await openHistoryDB();
          const tx = db.transaction(STORE_WHITEBOARD, 'readwrite');
          const store = tx.objectStore(STORE_WHITEBOARD);
          remote.forEach((wb) => store.put(wb));
        } catch {}
        return remote;
      }
    } catch (err) {
      console.warn('Supabase whiteboards fetch failed, falling back to local DB:', err);
    }
  }

  let allBoards: SavedWhiteboardEntry[] = [];
  try {
    const db = await openHistoryDB();
    allBoards = await new Promise<SavedWhiteboardEntry[]>((resolve) => {
      const tx = db.transaction(STORE_WHITEBOARD, 'readonly');
      const store = tx.objectStore(STORE_WHITEBOARD);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as SavedWhiteboardEntry[]) || []);
      req.onerror = () => resolve(loadSavedWhiteboardsFromLocalStorage());
    });
  } catch {
    allBoards = loadSavedWhiteboardsFromLocalStorage();
  }

  let userBoards = allBoards.filter((wb) => wb.userId === activeUid);

  // If user is a demo user and has no whiteboards yet, seed a sample board
  if (userBoards.length === 0 && activeUid.startsWith('user-')) {
    const seed = getDemoWhiteboardSeed(activeUid);
    await saveWhiteboardToHistory(seed.notebook, seed.thumbnail, activeUid);
    userBoards = [seed];
  }

  userBoards.sort((a, b) => (b.lastSavedAt || 0) - (a.lastSavedAt || 0));
  return userBoards;
}

export async function getSavedWhiteboardById(id: string): Promise<SavedWhiteboardEntry | null> {
  try {
    const db = await openHistoryDB();
    return await new Promise<SavedWhiteboardEntry | null>((resolve) => {
      const tx = db.transaction(STORE_WHITEBOARD, 'readonly');
      const store = tx.objectStore(STORE_WHITEBOARD);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(loadSavedWhiteboardsFromLocalStorage().find((w) => w.id === id) || null);
    });
  } catch {
    return loadSavedWhiteboardsFromLocalStorage().find((w) => w.id === id) || null;
  }
}

export async function renameSavedWhiteboard(id: string, newName: string): Promise<SavedWhiteboardEntry | null> {
  const existing = await getSavedWhiteboardById(id);
  if (!existing) return null;
  const updated: SavedWhiteboardEntry = {
    ...existing,
    name: newName.trim(),
    notebook: {
      ...existing.notebook,
      name: newName.trim(),
    },
  };
  try {
    const db = await openHistoryDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_WHITEBOARD, 'readwrite');
      const store = tx.objectStore(STORE_WHITEBOARD);
      const req = store.put(updated);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    saveSavedWhiteboardToLocalStorage(updated);
  }

  if (isSupabaseConfigured() && existing.userId) {
    try {
      await saveWhiteboardToSupabase(updated, existing.userId, getActiveTokenProvider() || undefined);
    } catch {}
  }

  return updated;
}

export async function duplicateSavedWhiteboard(id: string): Promise<SavedWhiteboardEntry> {
  const existing = await getSavedWhiteboardById(id);
  if (!existing) throw new Error('Whiteboard not found');
  return saveWhiteboardAsCopy(existing.notebook, `${existing.name} (Copy)`, existing.thumbnail, existing.userId);
}

export async function deleteSavedWhiteboard(id: string): Promise<void> {
  const existing = await getSavedWhiteboardById(id);
  const activeUid = existing?.userId || getActiveUserId();

  try {
    const db = await openHistoryDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_WHITEBOARD, 'readwrite');
      const store = tx.objectStore(STORE_WHITEBOARD);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('deleteSavedWhiteboard error', err);
  }
  deleteSavedWhiteboardFromLocalStorage(id);

  if (isSupabaseConfigured() && activeUid) {
    try {
      await deleteSavedWhiteboardFromSupabase(id, activeUid, getActiveTokenProvider() || undefined);
    } catch {}
  }
}

function saveSavedWhiteboardToLocalStorage(entry: SavedWhiteboardEntry) {
  try {
    const list = loadSavedWhiteboardsFromLocalStorage();
    const idx = list.findIndex((e) => e.id === entry.id);
    if (idx >= 0) list[idx] = entry;
    else list.unshift(entry);
    localStorage.setItem(LS_WHITEBOARD_KEY, JSON.stringify(list));
  } catch {}
}

function loadSavedWhiteboardsFromLocalStorage(): SavedWhiteboardEntry[] {
  try {
    const str = localStorage.getItem(LS_WHITEBOARD_KEY);
    return str ? JSON.parse(str) : [];
  } catch {
    return [];
  }
}

function deleteSavedWhiteboardFromLocalStorage(id: string) {
  try {
    const list = loadSavedWhiteboardsFromLocalStorage().filter((e) => e.id !== id);
    localStorage.setItem(LS_WHITEBOARD_KEY, JSON.stringify(list));
  } catch {}
}

// Demo seeds generator for initial authenticated preview
function getDemoPracticeSeeds(userId: string): PracticeHistoryEntry[] {
  return [
    {
      id: 'demo_sheet_01_' + userId,
      userId,
      title: 'Class 10th Real Numbers & Polynomials Assessment',
      stage: '10th',
      stageLabel: 'Class 10th',
      classChapter: 'Class 10th · 4 Questions',
      classGrade: 'Class 10th',
      chapter: 'Real Numbers & Polynomials',
      submittedAt: Date.now() - 3600000 * 2,
      questions: [
        {
          id: 101,
          stage: '10th',
          topic: 'Real Numbers — Euclid Division Lemma',
          category: 'Number Systems',
          problem: 'Find the Highest Common Factor (HCF) of 135 and 225 using Euclid’s algorithm.',
          latex: '\\text{HCF}(135, 225) = ?',
          options: ['15', '45', '25', '75'],
          correctIdx: 1,
          explanation: '225 = 135(1) + 90, 135 = 90(1) + 45, 90 = 45(2) + 0. Remainder is 0, so HCF is 45.',
          difficulty: 'Basic',
        },
        {
          id: 102,
          stage: '10th',
          topic: 'Polynomials — Zeroes and Coefficients',
          category: 'Algebra',
          problem: 'Find the zeroes of the quadratic polynomial x² - 2x - 8.',
          latex: 'x^2 - 2x - 8 = 0',
          options: ['4, -2', '-4, 2', '4, 2', '-4, -2'],
          correctIdx: 0,
          explanation: 'Factorizing: (x - 4)(x + 2) = 0. Therefore, the zeroes are 4 and -2.',
          difficulty: 'Intermediate',
        },
        {
          id: 103,
          stage: '10th',
          topic: 'Arithmetic Progressions',
          category: 'Algebra',
          problem: 'Which term of the AP: 21, 18, 15... is -81?',
          latex: 'a_n = a + (n - 1)d = -81',
          options: ['34th', '35th', '36th', '32nd'],
          correctIdx: 1,
          explanation: 'a = 21, d = -3. -81 = 21 + (n - 1)(-3) => -102 = -3(n - 1) => n - 1 = 34 => n = 35.',
          difficulty: 'Intermediate',
        },
        {
          id: 104,
          stage: '10th',
          topic: 'Trigonometry — Standard Angles',
          category: 'Trigonometry',
          problem: 'Evaluate: 2 tan²(45°) + cos²(30°) - sin²(60°)',
          latex: '2\\tan^2(45^\\circ) + \\cos^2(30^\\circ) - \\sin^2(60^\\circ)',
          options: ['2', '1', '0', '3'],
          correctIdx: 0,
          explanation: '2(1)² + (√3/2)² - (√3/2)² = 2 + 3/4 - 3/4 = 2.',
          difficulty: 'Basic',
        },
      ],
      userAnswers: { 0: 1, 1: 0, 2: 1, 3: 0 },
      submittedAnswers: { 0: 1, 1: 0, 2: 1, 3: 0 },
      score: 4,
      totalQuestions: 4,
      percentage: 100,
      correctCount: 4,
      incorrectCount: 0,
      unansweredCount: 0,
      timeSpentSeconds: 240,
      timeTakenSeconds: 240,
      timeLimitMinutes: 10,
    },
  ];
}

function getDemoWhiteboardSeed(userId: string): SavedWhiteboardEntry {
  const now = Date.now();
  const nbId = 'wb_demo_' + userId;
  return {
    id: nbId,
    userId,
    name: 'Calculus & Geometry Proofs',
    sheetCount: 2,
    createdAt: now - 86400000,
    lastSavedAt: now - 3600000 * 4,
    thumbnail: '',
    notebook: {
      id: nbId,
      name: 'Calculus & Geometry Proofs',
      activeSheetId: 'sheet_01',
      sheets: [
        {
          id: 'sheet_01',
          name: 'Unit Circle & Euler',
          background: 'grid',
          paths: [],
          objects: [
            {
              id: 'el_txt_1',
              type: 'text',
              x: 120,
              y: 80,
              width: 320,
              height: 40,
              zIndex: 1,
              text: 'Euler’s Identity: e^(iπ) + 1 = 0',
              fontSize: 24,
              color: '#7957F5',
              fontFamily: 'sans-serif',
            },
            {
              id: 'el_txt_2',
              type: 'text',
              x: 120,
              y: 130,
              width: 320,
              height: 40,
              zIndex: 2,
              text: 'Pythagorean Theorem: a² + b² = c²',
              fontSize: 20,
              color: '#0EA5E9',
              fontFamily: 'sans-serif',
            },
          ],
          zoom: 1,
          pan: { x: 0, y: 0 },
          createdAt: now - 86400000,
          updatedAt: now - 3600000 * 4,
        },
        {
          id: 'sheet_02',
          name: 'Derivative Rules',
          background: 'dotted',
          paths: [],
          objects: [
            {
              id: 'el_txt_3',
              type: 'text',
              x: 100,
              y: 90,
              width: 300,
              height: 40,
              zIndex: 1,
              text: 'd/dx [sin(x)] = cos(x)',
              fontSize: 22,
              color: '#10B981',
              fontFamily: 'sans-serif',
            },
          ],
          zoom: 1,
          pan: { x: 0, y: 0 },
          createdAt: now - 86400000,
          updatedAt: now - 3600000 * 4,
        },
      ],
      createdAt: now - 86400000,
      updatedAt: now - 3600000 * 4,
    },
  };
}
