import { Notebook, Sheet, BoardPreset, BoardType, BackgroundType } from './types.ts';

const DB_NAME = 'CalcAuraWhiteboardDB';
const DB_VERSION = 1;
const STORE_NAME = 'notebooks';
const ACTIVE_NOTEBOOK_KEY = 'calcAura_active_notebook_id';

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Generate unique ID
export function generateId(): string {
  return 'wb_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

// Default initial starter notebook (Pristine blank white canvas)
export function createDefaultNotebook(): Notebook {
  const sheetId = generateId();
  const now = Date.now();

  const sheet: Sheet = {
    id: sheetId,
    name: 'Sheet 1',
    background: 'plain-white',
    paths: [],
    objects: [],
    zoom: 1,
    pan: { x: 0, y: 0 },
    createdAt: now,
    updatedAt: now,
  };

  return {
    id: 'nb_' + Date.now().toString(36),
    name: 'My Drawing',
    sheets: [sheet],
    activeSheetId: sheetId,
    createdAt: now,
    updatedAt: now,
  };
}

export const BOARD_PRESETS: BoardPreset[] = [
  {
    id: 'simple',
    title: 'Simple Whiteboard',
    subtitle: 'Freehand sketching & clean writing',
    description: 'A completely blank, pristine drawing workspace for freehand writing, sketching, annotation, and general use.',
    badge: 'Essential',
    defaultName: 'My Drawing',
    defaultBackground: 'plain-white',
    accentColor: '#10B981',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    suitableTools: ['Pen', 'Pencil', 'Highlighter', 'Eraser', 'Shapes', 'Text', 'Image'],
  },
  {
    id: 'junior',
    title: 'Junior Learning Board',
    subtitle: 'Classes 1–5 & Math Playground',
    description: 'A friendly board with counting objects, fruits, toys, number cards, multiplication arrays, and fraction pieces.',
    badge: 'Classes 1–5',
    defaultName: 'Class 5 Multiplication',
    defaultBackground: 'grid',
    accentColor: '#EC4899',
    gradient: 'from-pink-500/20 to-rose-500/20',
    suitableTools: ['Fruits & Toys', 'Arrays (3×4=12)', 'Counting Cards', 'Draw', 'Speech'],
  },
  {
    id: 'school',
    title: 'School Mathematics Board',
    subtitle: 'Classes 6–9 Curriculum',
    description: 'A mathematical workspace with equations, fractions, number lines, geometric diagrams, coordinate grids, and graphing tools.',
    badge: 'Classes 6–9',
    defaultName: 'Algebra Practice',
    defaultBackground: 'coordinate',
    accentColor: '#8B5CF6',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    suitableTools: ['Formulas', 'Coordinate Grid', 'Graph Plotting', 'Geometry', 'Ruler'],
  },
  {
    id: 'secondary',
    title: 'Class 10 & 12 Board',
    subtitle: 'Board Exams & Calculus',
    description: 'A focused workspace for algebra, trigonometry, geometry, calculus, equations, graphs, and exam-working sheets.',
    badge: 'Board Prep',
    defaultName: 'Class 10 & 12 Mathematics',
    defaultBackground: 'ruled',
    accentColor: '#3B82F6',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    suitableTools: ['Trigonometry', 'Calculus', 'Quadratic Steps', 'Function Curves', 'Exam Sheets'],
  },
  {
    id: 'engineering',
    title: 'Engineering & Graduation',
    subtitle: 'Advanced Technical STEM',
    description: 'A technical workspace for advanced equations, matrices, vectors, graphs, coordinate systems, and scientific diagrams.',
    badge: 'College & STEM',
    defaultName: 'Engineering Mathematics',
    defaultBackground: 'isometric',
    accentColor: '#F59E0B',
    gradient: 'from-amber-500/20 to-orange-500/20',
    suitableTools: ['Matrices', '3D Vectors', 'Isometric Grid', 'Parametric Graphs', 'LaTeX'],
  },
  {
    id: 'geometry',
    title: 'Graph & Geometry Board',
    subtitle: 'Constructions & Plane Geometry',
    description: 'A visualization-focused workspace for coordinate planes, geometric constructions, editable shapes, graph plotting, and rulers.',
    badge: 'Visualization',
    defaultName: 'Geometry Homework',
    defaultBackground: 'coordinate',
    accentColor: '#06B6D4',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    suitableTools: ['Coordinate Axes', 'Theorem Proofs', 'Protractors', 'Polygons', 'Angles'],
  },
];

// Create a new board notebook based on selected preset type
export function createBoardNotebook(
  boardType: BoardType,
  customName?: string,
  customBg?: BackgroundType
): Notebook {
  const preset = BOARD_PRESETS.find((p) => p.id === boardType) || BOARD_PRESETS[0];
  const boardId = generateId();
  const name = customName?.trim() || preset.defaultName;
  const bg = customBg || preset.defaultBackground;
  const now = Date.now();
  const sheetId = generateId();

  // Create initial sheets tailored to the board
  let starterObjects: any[] = [];

  if (boardType === 'simple') {
    // Pristine, completely clean canvas with zero clutter as required
    starterObjects = [];
  } else if (boardType === 'junior') {
    starterObjects = [
      {
        id: generateId(),
        type: 'visual-learning',
        emoji: '🍎',
        label: 'Apples Multiplication',
        category: 'fruits',
        quantity: 12,
        groups: 3,
        itemsPerGroup: 4,
        equationCaption: '3 groups of 4 apples = 12 apples (3 × 4 = 12)',
        x: 100,
        y: 80,
        width: 380,
        height: 190,
        zIndex: 1,
      },
      {
        id: generateId(),
        type: 'sticky',
        x: 520,
        y: 80,
        width: 220,
        height: 160,
        text: 'Multiplication Rule:\nMultiplication is repeated addition!\n\n4 + 4 + 4 = 12\n3 × 4 = 12',
        bgColor: '#BBF7D0',
        textColor: '#14532D',
        fontSize: 14,
        zIndex: 2,
      },
    ];
  } else if (boardType === 'school') {
    starterObjects = [
      {
        id: generateId(),
        type: 'graph',
        x: 100,
        y: 80,
        width: 360,
        height: 240,
        fnString: 'sin(x)',
        label: 'f(x) = sin(x)',
        minX: -6.28,
        maxX: 6.28,
        minY: -1.5,
        maxY: 1.5,
        strokeColor: '#7957F5',
        showGrid: true,
        zIndex: 1,
      },
      {
        id: generateId(),
        type: 'math',
        x: 500,
        y: 90,
        width: 320,
        height: 90,
        latex: 'a^2 + b^2 = c^2',
        color: '#4F46E5',
        fontSize: 22,
        bgCard: true,
        zIndex: 2,
      },
      {
        id: generateId(),
        type: 'shape',
        shapeType: 'triangle',
        x: 540,
        y: 200,
        width: 220,
        height: 180,
        strokeColor: '#0EA5E9',
        fillColor: 'rgba(14, 165, 233, 0.12)',
        strokeWidth: 3,
        zIndex: 3,
      },
    ];
  } else if (boardType === 'secondary') {
    starterObjects = [
      {
        id: generateId(),
        type: 'text',
        x: 80,
        y: 60,
        width: 440,
        height: 40,
        text: 'Class 10 & 12 Examination Working Sheet',
        color: '#1E293B',
        fontSize: 22,
        fontFamily: 'sans-serif',
        bold: true,
        zIndex: 1,
      },
      {
        id: generateId(),
        type: 'math',
        x: 80,
        y: 120,
        width: 420,
        height: 90,
        latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        color: '#2563EB',
        fontSize: 20,
        bgCard: true,
        zIndex: 2,
      },
      {
        id: generateId(),
        type: 'math',
        x: 80,
        y: 230,
        width: 420,
        height: 90,
        latex: '\\frac{d}{dx}[\\sin(x)] = \\cos(x)',
        color: '#7C3AED',
        fontSize: 20,
        bgCard: true,
        zIndex: 3,
      },
      {
        id: generateId(),
        type: 'sticky',
        x: 540,
        y: 120,
        width: 260,
        height: 190,
        text: 'Exam Tips:\n• Verify discriminant b² - 4ac\n• State reasons for every geometric step\n• Check boundary values in calculus',
        bgColor: '#FEF08A',
        textColor: '#854D0E',
        fontSize: 14,
        zIndex: 4,
      },
    ];
  } else if (boardType === 'engineering') {
    starterObjects = [
      {
        id: generateId(),
        type: 'math',
        x: 80,
        y: 80,
        width: 420,
        height: 100,
        latex: '\\vec{v} = v_x \\hat{i} + v_y \\hat{j} + v_z \\hat{k}',
        color: '#D97706',
        fontSize: 20,
        bgCard: true,
        zIndex: 1,
      },
      {
        id: generateId(),
        type: 'math',
        x: 80,
        y: 200,
        width: 420,
        height: 110,
        latex: 'A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix}',
        color: '#059669',
        fontSize: 20,
        bgCard: true,
        zIndex: 2,
      },
      {
        id: generateId(),
        type: 'sticky',
        x: 540,
        y: 80,
        width: 260,
        height: 180,
        text: 'Engineering Notes:\n• Det(A) = ad - bc\n• Eigenvalues: det(A - λI) = 0\n• 3D Isometric Projection scale 1:1',
        bgColor: '#E0E7FF',
        textColor: '#3730A3',
        fontSize: 14,
        zIndex: 3,
      },
    ];
  } else if (boardType === 'geometry') {
    starterObjects = [
      {
        id: generateId(),
        type: 'shape',
        shapeType: 'triangle',
        x: 100,
        y: 80,
        width: 280,
        height: 220,
        strokeColor: '#0284C7',
        fillColor: 'rgba(2, 132, 199, 0.1)',
        strokeWidth: 3,
        zIndex: 1,
      },
      {
        id: generateId(),
        type: 'shape',
        shapeType: 'circle',
        x: 440,
        y: 80,
        width: 220,
        height: 220,
        strokeColor: '#7C3AED',
        fillColor: 'rgba(124, 58, 237, 0.08)',
        strokeWidth: 2.5,
        zIndex: 2,
      },
      {
        id: generateId(),
        type: 'math',
        x: 100,
        y: 330,
        width: 320,
        height: 80,
        latex: 'A = \\frac{1}{2} b h',
        color: '#0284C7',
        fontSize: 20,
        bgCard: true,
        zIndex: 3,
      },
    ];
  }

  const initialSheet: Sheet = {
    id: sheetId,
    name: 'Sheet 1',
    background: bg,
    paths: [],
    objects: starterObjects,
    zoom: 1,
    pan: { x: 0, y: 0 },
    createdAt: now,
    updatedAt: now,
  };

  return {
    id: boardId,
    name,
    boardType,
    description: preset.description,
    sheets: [initialSheet],
    activeSheetId: sheetId,
    createdAt: now,
    updatedAt: now,
  };
}

// List all saved notebooks from IndexedDB (for Recent Boards screen)
export async function listAllNotebooks(): Promise<Notebook[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const results = req.result as Notebook[];
        if (results && results.length > 0) {
          // Sort by updatedAt descending
          results.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
          resolve(results);
        } else {
          const local = loadFromLocalStorage();
          resolve(local ? [local] : []);
        }
      };
      req.onerror = () => {
        const local = loadFromLocalStorage();
        resolve(local ? [local] : []);
      };
    });
  } catch {
    const local = loadFromLocalStorage();
    return local ? [local] : [];
  }
}

// Load a specific notebook by ID
export async function loadNotebookById(id: string): Promise<Notebook | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        if (req.result) resolve(req.result);
        else resolve(null);
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// Delete notebook by ID
export async function deleteNotebook(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => {
        // Also clear active id if this was active
        if (localStorage.getItem(ACTIVE_NOTEBOOK_KEY) === id) {
          localStorage.removeItem(ACTIVE_NOTEBOOK_KEY);
        }
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Delete notebook error', err);
  }
}

// Load current or last active notebook from IndexedDB with fallback
export async function loadNotebook(): Promise<Notebook> {
  try {
    const activeId = localStorage.getItem(ACTIVE_NOTEBOOK_KEY);
    const db = await openDB();

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);

      if (activeId) {
        const req = store.get(activeId);
        req.onsuccess = () => {
          if (req.result && req.result.sheets && req.result.sheets.length > 0) {
            resolve(req.result);
            return;
          }
          // If active not found, get first available
          fallbackToAnyNotebook(store, resolve);
        };
        req.onerror = () => fallbackToAnyNotebook(store, resolve);
      } else {
        fallbackToAnyNotebook(store, resolve);
      }
    });
  } catch (err) {
    return loadFromLocalStorage() || createBoardNotebook('simple');
  }
}

function fallbackToAnyNotebook(store: IDBObjectStore, resolve: (nb: Notebook) => void) {
  const reqAll = store.getAll();
  reqAll.onsuccess = () => {
    const list = reqAll.result as Notebook[];
    if (list && list.length > 0) {
      list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      resolve(list[0]);
    } else {
      const local = loadFromLocalStorage();
      if (local) {
        saveNotebook(local).catch(() => {});
        resolve(local);
      } else {
        const initial = createBoardNotebook('simple');
        saveNotebook(initial).catch(() => {});
        resolve(initial);
      }
    }
  };
  reqAll.onerror = () => {
    resolve(loadFromLocalStorage() || createBoardNotebook('simple'));
  };
}

// Save notebook to IndexedDB and track as active
export async function saveNotebook(notebook: Notebook): Promise<void> {
  try {
    notebook.updatedAt = Date.now();
    localStorage.setItem(ACTIVE_NOTEBOOK_KEY, notebook.id);
    saveToLocalStorage(notebook);

    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(notebook);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    saveToLocalStorage(notebook);
  }
}

function saveToLocalStorage(nb: Notebook) {
  try {
    localStorage.setItem('calcAura_whiteboard_nb', JSON.stringify({
      id: nb.id,
      name: nb.name,
      boardType: nb.boardType,
      activeSheetId: nb.activeSheetId,
      updatedAt: nb.updatedAt,
      sheets: nb.sheets.map((s) => ({
        ...s,
        thumbnail: undefined, // skip large base64 thumbnails in localStorage
      })),
    }));
  } catch {}
}

function loadFromLocalStorage(): Notebook | null {
  try {
    const saved = localStorage.getItem('calcAura_whiteboard_nb');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.sheets && parsed.sheets.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

