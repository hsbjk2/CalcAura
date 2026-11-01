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
  const targetUid = userId || entry.userId || getActiveUserId();
  if (!targetUid) throw new Error('Sign in with your Clerk account before saving practice history.');
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured. Add the Supabase URL and publishable key before saving history.');
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

  const cloudSaved = await savePracticeAttemptToSupabase(
    entryWithUser,
    targetUid,
    getActiveTokenProvider() || undefined
  );
  if (!cloudSaved) {
    throw new Error('Your practice result could not be saved to Supabase. Check your connection, Clerk integration, and database policies, then try again.');
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
  const targetUid = userId || getActiveUserId();
  if (!targetUid) throw new Error('Sign in with your Clerk account before saving a whiteboard.');
  const existingCandidate = await getSavedWhiteboardById(notebook.id);
  const existing = existingCandidate?.userId === targetUid ? existingCandidate : null;
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured. Add the Supabase URL and publishable key before saving whiteboards.');

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

  const cloudSaved = await saveWhiteboardToSupabase(
    entry,
    targetUid,
    getActiveTokenProvider() || undefined
  );
  if (!cloudSaved) {
    throw new Error('Your whiteboard could not be saved to Supabase. Check your connection, Clerk integration, and database policies, then try again.');
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
  const targetUid = userId || getActiveUserId();
  if (!targetUid) throw new Error('Sign in with your Clerk account before saving a whiteboard copy.');
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured. Add the Supabase URL and publishable key before saving whiteboards.');

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

  const cloudSaved = await saveWhiteboardToSupabase(
    entry,
    targetUid,
    getActiveTokenProvider() || undefined
  );
  if (!cloudSaved) {
    throw new Error('Your whiteboard copy could not be saved to Supabase. Check your connection, Clerk integration, and database policies, then try again.');
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
