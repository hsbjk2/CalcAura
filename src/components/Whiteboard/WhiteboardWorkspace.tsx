import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Notebook,
  Sheet,
  ToolType,
  ShapeType,
  CanvasObject,
  DrawingPath,
  Point,
  BackgroundType,
  HistoryStep,
} from './types.ts';
import {
  loadNotebook,
  saveNotebook,
  createDefaultNotebook,
  generateId,
} from './storage.ts';
import { renderWhiteboardBackground } from './BackgroundRenderer.ts';
import {
  renderCanvasObject,
  renderDrawingPath,
  generateSheetThumbnail,
  getImageFromCache,
} from './exportUtils.ts';
import {
  getNextZIndex,
  getNextStackZIndex,
  reorderSheetLayers,
  bringToFront,
  sendToBack,
  bringForward,
  sendBackward,
  hitTestTopObject,
  hitTestHandle,
  HandleType,
} from './layerUtils.ts';
import { whiteboardSounds } from './soundEffects.ts';
import { TopToolbar } from './TopToolbar.tsx';
import { LeftToolbar, MobileToolStrip } from './LeftToolbar.tsx';
import { PropertiesBar } from './PropertiesBar.tsx';
import { SheetStrip } from './SheetStrip.tsx';
import { NewSheetModal } from './NewSheetModal.tsx';
import { StickerEmojiModal } from './StickerEmojiModal.tsx';
import { ExportModal } from './ExportModal.tsx';
import { AlertTriangle, Trash2, X, Copy, Check, Save, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { isSupabaseConfigured } from '../../lib/supabaseClient.ts';
import {
  saveWhiteboardToHistory,
  saveWhiteboardAsCopy,
  isWhiteboardSavedInHistory,
  renameSavedWhiteboard,
} from '../../data/historyStorage.ts';

interface WhiteboardWorkspaceProps {
  onExit: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  initialNotebook?: Notebook | null;
  onNavigateToHistory?: () => void;
}

export const WhiteboardWorkspace: React.FC<WhiteboardWorkspaceProps> = ({
  onExit,
  darkMode,
  onToggleDarkMode,
  initialNotebook,
  onNavigateToHistory,
}) => {
  const { user, isAuthenticated } = useAuth();

  // Main Notebook State
  const [notebook, setNotebook] = useState<Notebook>(() => initialNotebook || createDefaultNotebook());
  const [activeSheetId, setActiveSheetId] = useState<string>(() => (initialNotebook || notebook).sheets[0]?.id || '');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [saveAsModalOpen, setSaveAsModalOpen] = useState<boolean>(false);
  const [saveAsName, setSaveAsName] = useState<string>('');

  // Active Tool & Properties
  const [activeTool, setActiveTool] = useState<ToolType>('pen');
  const [activeShape, setActiveShape] = useState<ShapeType>('rect');
  const [strokeColor, setStrokeColor] = useState<string>('#1E293B');
  const [fillColor, setFillColor] = useState<string>('rgba(121, 87, 245, 0.15)');
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [eraserSize, setEraserSize] = useState<number>(36);
  const [eraserCursorPos, setEraserCursorPos] = useState<{ x: number; y: number } | null>(null);

  // Selection & Object Editing
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  // Modals
  const [newSheetModalOpen, setNewSheetModalOpen] = useState<boolean>(false);
  const [stickerModalOpen, setStickerModalOpen] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [sheetPendingDelete, setSheetPendingDelete] = useState<Sheet | null>(null);

  // Canvas Viewport Transform
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // DOM Refs
  const workspaceContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const justCreatedTextRef = useRef<boolean>(false);

  // Drawing Interaction Refs
  const isPointerDownRef = useRef<boolean>(false);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPathRef = useRef<Point[]>([]);

  // Multi-Touch & Pinch-to-Zoom Tracking
  const activePointersRef = useRef<Map<number, { clientX: number; clientY: number }>>(new Map());
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);
  const pinchStartPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchStartMidpointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Dragging & Resizing Refs
  const isDraggingObjectRef = useRef<boolean>(false);
  const activeHandleRef = useRef<HandleType | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialObjectBoxRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });

  const isPanningRef = useRef<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // History stack for Undo/Redo
  const historyMapRef = useRef<Map<string, { past: HistoryStep[]; future: HistoryStep[] }>>(new Map());

  // Current active sheet
  const activeSheet = notebook.sheets.find((s) => s.id === activeSheetId) || notebook.sheets[0];

  const isMountedRef = useRef<boolean>(false);

  // Load Notebook on mount
  useEffect(() => {
    if (initialNotebook && initialNotebook.sheets && initialNotebook.sheets.length > 0) {
      setNotebook(initialNotebook);
      setActiveSheetId(initialNotebook.activeSheetId || initialNotebook.sheets[0].id);
      isWhiteboardSavedInHistory(initialNotebook.id).then((saved) => {
        setIsSaved(saved);
      });
    } else {
      // Fresh new board is initially unsaved
      setIsSaved(false);
    }
  }, [initialNotebook]);

  // Mark board as unsaved when user modifies content after initial mount
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    setIsSaved(false);
  }, [notebook]);

  // Manual explicit save to History
  const handleManualSave = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      setSaveToast('Sign in with Clerk before saving this whiteboard to your account.');
      setTimeout(() => setSaveToast(null), 4000);
      return;
    }
    if (!isSupabaseConfigured()) {
      setSaveToast('Connect Supabase before saving whiteboards to the cloud.');
      setTimeout(() => setSaveToast(null), 4000);
      return;
    }
    try {
      let thumbnail: string | undefined;
      if (activeSheet) {
        try {
          thumbnail = await generateSheetThumbnail(activeSheet);
        } catch {}
      }
      await saveWhiteboardToHistory(notebook, thumbnail, user.id);
      setIsSaved(true);
      whiteboardSounds.playSaveSound();
      setSaveToast(`Board "${notebook.name}" saved to History!`);
      setTimeout(() => setSaveToast(null), 3000);
    } catch (err) {
      console.error('Failed to save whiteboard', err);
      setSaveToast('Failed to save whiteboard. Please try again.');
      setTimeout(() => setSaveToast(null), 3500);
    }
  }, [notebook, activeSheet, isAuthenticated, user?.id]);

  // Save As (Create a new copy in History)
  const handleOpenSaveAs = useCallback(() => {
    setSaveAsName(`${notebook.name} (Copy)`);
    setSaveAsModalOpen(true);
  }, [notebook.name]);

  const handleConfirmSaveAs = useCallback(async () => {
    if (!saveAsName.trim()) return;
    if (!isAuthenticated || !user?.id) {
      setSaveToast('Sign in with Clerk before saving a whiteboard copy.');
      setTimeout(() => setSaveToast(null), 4000);
      setSaveAsModalOpen(false);
      return;
    }
    if (!isSupabaseConfigured()) {
      setSaveToast('Connect Supabase before saving whiteboards to the cloud.');
      setTimeout(() => setSaveToast(null), 4000);
      setSaveAsModalOpen(false);
      return;
    }
    try {
      let thumbnail: string | undefined;
      if (activeSheet) {
        try {
          thumbnail = await generateSheetThumbnail(activeSheet);
        } catch {}
      }
      const newEntry = await saveWhiteboardAsCopy(notebook, saveAsName.trim(), thumbnail, user.id);
      setNotebook(newEntry.notebook);
      setActiveSheetId(newEntry.notebook.activeSheetId || newEntry.notebook.sheets[0]?.id);
      setIsSaved(true);
      setSaveAsModalOpen(false);
      whiteboardSounds.playSaveSound();
      setSaveToast(`Saved as new copy: "${newEntry.name}"`);
      setTimeout(() => setSaveToast(null), 3000);
    } catch (err) {
      console.error('Failed to save copy', err);
      setSaveToast('Failed to save copy. Please try again.');
      setTimeout(() => setSaveToast(null), 3500);
    }
  }, [notebook, saveAsName, activeSheet, isAuthenticated, user?.id]);

  const handleRenameNotebook = useCallback(async (newName: string) => {
    setNotebook((prev) => ({ ...prev, name: newName }));
    const saved = await isWhiteboardSavedInHistory(notebook.id);
    if (saved) {
      await renameSavedWhiteboard(notebook.id, newName);
    } else {
      setIsSaved(false);
    }
  }, [notebook.id]);

  // Push History state for Undo/Redo
  const pushHistory = useCallback(() => {
    if (!activeSheet) return;
    let stack = historyMapRef.current.get(activeSheet.id);
    if (!stack) {
      stack = { past: [], future: [] };
      historyMapRef.current.set(activeSheet.id, stack);
    }
    stack.past.push({
      paths: JSON.parse(JSON.stringify(activeSheet.paths)),
      objects: JSON.parse(JSON.stringify(activeSheet.objects)),
    });
    stack.future = [];
    if (stack.past.length > 40) stack.past.shift();
  }, [activeSheet]);

  // Undo
  const handleUndo = useCallback(() => {
    if (!activeSheet) return;
    const stack = historyMapRef.current.get(activeSheet.id);
    if (!stack || stack.past.length === 0) return;

    whiteboardSounds.playTapSound();
    const prev = stack.past.pop()!;
    stack.future.push({
      paths: JSON.parse(JSON.stringify(activeSheet.paths)),
      objects: JSON.parse(JSON.stringify(activeSheet.objects)),
    });

    setNotebook((prevNb) => ({
      ...prevNb,
      sheets: prevNb.sheets.map((s) =>
        s.id === activeSheet.id
          ? { ...s, paths: prev.paths, objects: prev.objects, updatedAt: Date.now() }
          : s
      ),
    }));
    setSelectedObjectId(null);
    setEditingTextId(null);
  }, [activeSheet]);

  // Redo
  const handleRedo = useCallback(() => {
    if (!activeSheet) return;
    const stack = historyMapRef.current.get(activeSheet.id);
    if (!stack || stack.future.length === 0) return;

    whiteboardSounds.playTapSound();
    const next = stack.future.pop()!;
    stack.past.push({
      paths: JSON.parse(JSON.stringify(activeSheet.paths)),
      objects: JSON.parse(JSON.stringify(activeSheet.objects)),
    });

    setNotebook((prevNb) => ({
      ...prevNb,
      sheets: prevNb.sheets.map((s) =>
        s.id === activeSheet.id
          ? { ...s, paths: next.paths, objects: next.objects, updatedAt: Date.now() }
          : s
      ),
    }));
    setSelectedObjectId(null);
    setEditingTextId(null);
  }, [activeSheet]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Never intercept when typing inside text area or input
      const target = e.target as HTMLElement | null;
      if (
        editingTextId ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      if (newSheetModalOpen || stickerModalOpen || exportModalOpen || sheetPendingDelete) return;

      const isCtrl = e.metaKey || e.ctrlKey;

      if (isCtrl && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if (isCtrl && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (isCtrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleManualSave();
      } else if (isCtrl && e.key.toLowerCase() === 'd') {
        if (selectedObjectId) {
          e.preventDefault();
          handleDuplicateSelected();
        }
      } else if (e.key === 'v' || e.key === 'V') {
        setActiveTool('select');
      } else if (e.key === 'h' || e.key === 'H') {
        setActiveTool('pan');
      } else if (e.key === 'p' || e.key === 'P') {
        setActiveTool('pen');
      } else if (e.key === 'e' || e.key === 'E') {
        setActiveTool('eraser');
      } else if (e.key === 't' || e.key === 'T') {
        setActiveTool('text');
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedObjectId) {
          e.preventDefault();
          handleDeleteSelected();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    editingTextId,
    newSheetModalOpen,
    stickerModalOpen,
    exportModalOpen,
    sheetPendingDelete,
    selectedObjectId,
    handleUndo,
    handleRedo,
    notebook,
  ]);

  // Coordinate screen to canvas mapping
  const screenToCanvas = (screenX: number, screenY: number): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (screenX - rect.left - pan.x) / zoom,
      y: (screenY - rect.top - pan.y) / zoom,
    };
  };

  // Commit text editing
  const commitTextEdit = useCallback(() => {
    if (!editingTextId || !activeSheet) return;
    const textObj = activeSheet.objects.find((o) => o.id === editingTextId);
    if (!textObj || textObj.type !== 'text') {
      setEditingTextId(null);
      return;
    }

    if (!textObj.text || !textObj.text.trim()) {
      // Remove empty text object
      setNotebook((prev) => ({
        ...prev,
        sheets: prev.sheets.map((s) =>
          s.id === activeSheet.id
            ? { ...s, objects: s.objects.filter((o) => o.id !== editingTextId) }
            : s
        ),
      }));
      setSelectedObjectId(null);
    } else {
      pushHistory();
    }
    setEditingTextId(null);
  }, [editingTextId, activeSheet, pushHistory]);

  const handleSelectTool = useCallback(
    (tool: ToolType) => {
      commitTextEdit();
      if (tool !== 'select') {
        setSelectedObjectId(null);
      }
      setActiveTool(tool);
    },
    [commitTextEdit]
  );

  // Redraw Canvas on state changes
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !activeSheet) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 1. Render Sheet Background
    renderWhiteboardBackground({
      ctx,
      width: rect.width,
      height: rect.height,
      zoom,
      pan,
      background: activeSheet.background,
    });

    // 2. Apply Pan & Zoom for objects and paths
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // 3. Render Unified Layers (Paths & Objects sorted by zIndex ascending)
    type UnifiedCanvasLayer =
      | { kind: 'path'; path: DrawingPath; zIndex: number }
      | { kind: 'object'; object: CanvasObject; zIndex: number };

    const layers: UnifiedCanvasLayer[] = [
      ...activeSheet.paths.map((p, idx) => ({
        kind: 'path' as const,
        path: p,
        zIndex: typeof p.zIndex === 'number' ? p.zIndex : idx + 1,
      })),
      ...activeSheet.objects.map((o) => ({
        kind: 'object' as const,
        object: o,
        zIndex: typeof o.zIndex === 'number' ? o.zIndex : 1,
      })),
    ].sort((a, b) => a.zIndex - b.zIndex);

    layers.forEach((l) => {
      if (l.kind === 'path') {
        renderDrawingPath(ctx, l.path, activeSheet.background);
      } else {
        if (l.object.id === editingTextId) return;
        renderCanvasObject(ctx, l.object);
      }
    });

    // 4. Render Active In-Progress Path (drawn topmost while user is dragging pointer)
    if (currentPathRef.current.length > 0) {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (activeTool === 'highlighter') {
        ctx.globalAlpha = 0.35;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth * 2.2;
      } else if (activeTool === 'eraser') {
        ctx.strokeStyle = activeSheet.background === 'plain-dark' ? '#161618' : '#FFFFFF';
        ctx.lineWidth = eraserSize;
      } else {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
      }

      ctx.beginPath();
      ctx.moveTo(currentPathRef.current[0].x, currentPathRef.current[0].y);
      for (let i = 1; i < currentPathRef.current.length; i++) {
        ctx.lineTo(currentPathRef.current[i].x, currentPathRef.current[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // 5. Render Selection Bounding Box & 8 Handles + Rotation handle if selected in select mode
    if (selectedObjectId && activeTool === 'select') {
      const selectedObj = activeSheet.objects.find((o) => o.id === selectedObjectId);
      if (selectedObj && selectedObj.id !== editingTextId) {
        ctx.save();
        ctx.translate(selectedObj.x, selectedObj.y);

        if (selectedObj.rotation) {
          ctx.translate(selectedObj.width / 2, selectedObj.height / 2);
          ctx.rotate((selectedObj.rotation * Math.PI) / 180);
          ctx.translate(-selectedObj.width / 2, -selectedObj.height / 2);
        }

        ctx.strokeStyle = '#7957F5';
        ctx.lineWidth = 1.5 / zoom;
        ctx.setLineDash([4 / zoom, 4 / zoom]);
        ctx.strokeRect(-2, -2, selectedObj.width + 4, selectedObj.height + 4);

        // Rotation stem & circular handle
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(selectedObj.width / 2, -2);
        ctx.lineTo(selectedObj.width / 2, -22 / zoom);
        ctx.stroke();

        ctx.fillStyle = '#7957F5';
        ctx.beginPath();
        ctx.arc(selectedObj.width / 2, -22 / zoom, 5 / zoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5 / zoom;
        ctx.stroke();

        // 8 Corner & Edge Handles
        const hs = 7 / zoom;
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#7957F5';
        ctx.lineWidth = 1.5 / zoom;

        const handles = [
          [-2, -2], // nw
          [selectedObj.width / 2, -2], // n
          [selectedObj.width + 2, -2], // ne
          [selectedObj.width + 2, selectedObj.height / 2], // e
          [selectedObj.width + 2, selectedObj.height + 2], // se
          [selectedObj.width / 2, selectedObj.height + 2], // s
          [-2, selectedObj.height + 2], // sw
          [-2, selectedObj.height / 2], // w
        ];

        handles.forEach(([hx, hy]) => {
          ctx.fillRect(hx - hs / 2, hy - hs / 2, hs, hs);
          ctx.strokeRect(hx - hs / 2, hy - hs / 2, hs, hs);
        });

        ctx.restore();
      }
    }

    ctx.restore(); // restore zoom & pan
    ctx.restore(); // restore dpr
  }, [activeSheet, zoom, pan, activeTool, strokeColor, strokeWidth, eraserSize, selectedObjectId, editingTextId]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Container & Window resize observer for responsive canvas
  useEffect(() => {
    const handleResize = () => redrawCanvas();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const container = canvasContainerRef.current;
    let ro: ResizeObserver | null = null;
    if (container && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        redrawCanvas();
      });
      ro.observe(container);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (ro) ro.disconnect();
    };
  }, [redrawCanvas]);

  // Fit to screen: Automatically fit all sheet drawing content centered inside viewport
  const handleFitToScreen = useCallback(() => {
    if (!activeSheet || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    // Measure paths
    activeSheet.paths.forEach((p) => {
      p.points.forEach((pt) => {
        if (pt.x < minX) minX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y > maxY) maxY = pt.y;
      });
    });

    // Measure objects
    activeSheet.objects.forEach((o) => {
      if (o.x < minX) minX = o.x;
      if (o.y < minY) minY = o.y;
      if (o.x + o.width > maxX) maxX = o.x + o.width;
      if (o.y + o.height > maxY) maxY = o.y + o.height;
    });

    // Default 1200x800 sheet area if empty
    if (minX === Infinity || maxX === -Infinity) {
      minX = 0;
      minY = 0;
      maxX = 1200;
      maxY = 800;
    }

    const pad = 48;
    const contentW = Math.max(100, maxX - minX + pad * 2);
    const contentH = Math.max(100, maxY - minY + pad * 2);
    const contentCenterX = (minX + maxX) / 2;
    const contentCenterY = (minY + maxY) / 2;

    const scaleX = rect.width / contentW;
    const scaleY = rect.height / contentH;
    const newZoom = Math.min(2.5, Math.max(0.2, Math.min(scaleX, scaleY)));

    const newPanX = rect.width / 2 - contentCenterX * newZoom;
    const newPanY = rect.height / 2 - contentCenterY * newZoom;

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
    whiteboardSounds.playTapSound();
  }, [activeSheet]);

  const handleZoomIn = useCallback(() => {
    whiteboardSounds.playTapSound();
    setZoom((z) => Math.min(4.0, Number((z * 1.2).toFixed(2))));
  }, []);

  const handleZoomOut = useCallback(() => {
    whiteboardSounds.playTapSound();
    setZoom((z) => Math.max(0.2, Number((z / 1.2).toFixed(2))));
  }, []);

  const handleResetZoom = useCallback(() => {
    whiteboardSounds.playTapSound();
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // ==========================================
  // IMAGE INSERTION (File Upload & Clipboard)
  // ==========================================

  const handleImageFile = useCallback(
    (file: File, atPoint?: Point) => {
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, SVG, WebP).');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        if (!src) return;

        const img = getImageFromCache(src);
        img.onload = () => {
          const maxWidth = 450;
          const scale = Math.min(1, maxWidth / (img.naturalWidth || 450));
          const w = Math.round((img.naturalWidth || 450) * scale);
          const h = Math.round((img.naturalHeight || 300) * scale);

          const spawnX = atPoint ? Math.round(atPoint.x - w / 2) : 100;
          const spawnY = atPoint ? Math.round(atPoint.y - h / 2) : 100;

          const newImgObj: CanvasObject = {
            id: generateId(),
            type: 'image',
            src,
            aspectRatio: (img.naturalWidth || 450) / (img.naturalHeight || 300),
            x: Math.max(20, spawnX),
            y: Math.max(20, spawnY),
            width: w,
            height: h,
            zIndex: getNextStackZIndex(activeSheet),
          };

          pushHistory();
          whiteboardSounds.playPopSound();
          setNotebook((prev) => ({
            ...prev,
            sheets: prev.sheets.map((s) =>
              s.id === activeSheet.id ? { ...s, objects: [...s.objects, newImgObj] } : s
            ),
          }));
          setSelectedObjectId(newImgObj.id);
          setActiveTool('select');
        };
      };
      reader.readAsDataURL(file);
    },
    [activeSheet, pushHistory]
  );

  // Clipboard Paste listener for images
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (editingTextId) return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            handleImageFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [editingTextId, handleImageFile]);

  // Canvas Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const canvasPoint = screenToCanvas(e.clientX, e.clientY);
      handleImageFile(file, canvasPoint);
    }
  };

  // ==========================================
  // STICKER INSERTION
  // ==========================================

  const handleInsertSticker = (emoji: string, label: string) => {
    pushHistory();
    const newSticker: CanvasObject = {
      id: generateId(),
      type: 'sticker',
      emoji,
      label,
      x: 180,
      y: 180,
      width: 90,
      height: 90,
      zIndex: getNextStackZIndex(activeSheet),
    };

    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id ? { ...s, objects: [...s.objects, newSticker] } : s
      ),
    }));
    setSelectedObjectId(newSticker.id);
    setActiveTool('select');
  };

  // ==========================================
  // CANVAS INTERACTION POINTER HANDLERS
  // ==========================================

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    activePointersRef.current.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

    // Multi-touch pinch-to-zoom / two-finger pan detection (2 or more touches)
    if (activePointersRef.current.size >= 2) {
      // Discard single-finger drawing line immediately
      currentPathRef.current = [];
      isPointerDownRef.current = false;
      isDraggingObjectRef.current = false;
      activeHandleRef.current = null;
      redrawCanvas();

      const pts = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[1].clientX - pts[0].clientX, pts[1].clientY - pts[0].clientY);
      pinchStartDistRef.current = dist;
      pinchStartZoomRef.current = zoom;
      pinchStartPanRef.current = { ...pan };
      pinchStartMidpointRef.current = {
        x: (pts[0].clientX + pts[1].clientX) / 2,
        y: (pts[0].clientY + pts[1].clientY) / 2,
      };
      return;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    if (justCreatedTextRef.current) return;
    // If text was being edited, commit it
    if (editingTextId) {
      commitTextEdit();
    }

    const canvasPoint = screenToCanvas(e.clientX, e.clientY);
    isPointerDownRef.current = true;
    pointerStartRef.current = { x: canvasPoint.x, y: canvasPoint.y };

    // Pan Tool or Middle Click
    if (activeTool === 'pan' || e.button === 1) {
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      return;
    }

    // Check if clicking a resize or rotation handle of currently selected object (ONLY in select mode)
    if (activeTool === 'select' && selectedObjectId) {
      const selected = activeSheet.objects.find((o) => o.id === selectedObjectId);
      if (selected) {
        const handleHit = hitTestHandle(selected, canvasPoint, zoom);
        if (handleHit) {
          activeHandleRef.current = handleHit;
          initialObjectBoxRef.current = {
            x: selected.x,
            y: selected.y,
            width: selected.width,
            height: selected.height,
            rotation: selected.rotation || 0,
          };
          return;
        }
      }
    }

    // Select Tool: hit-test objects from top to bottom (cycling through overlapping if already selected)
    if (activeTool === 'select') {
      const hit = hitTestTopObject(activeSheet.objects, canvasPoint, selectedObjectId);

      if (hit) {
        whiteboardSounds.playTapSound();
        setSelectedObjectId(hit.id);
        isDraggingObjectRef.current = true;
        dragOffsetRef.current = { x: canvasPoint.x - hit.x, y: canvasPoint.y - hit.y };
      } else {
        setSelectedObjectId(null);
      }
      redrawCanvas();
      return;
    }

    // Freehand Drawing Tools: Pen, Pencil, Highlighter, Eraser
    if (['pen', 'pencil', 'highlighter', 'eraser'].includes(activeTool)) {
      setSelectedObjectId(null);
      pushHistory();
      currentPathRef.current = [canvasPoint];
      if (activeTool === 'pen') whiteboardSounds.playPencilSound();
      redrawCanvas();
      return;
    }

    // Text Tool: Click canvas or image to open text area directly at that location
    if (activeTool === 'text') {
      // Check if clicking on an existing text object to edit it
      const hit = hitTestTopObject(activeSheet.objects, canvasPoint);
      if (hit && hit.type === 'text') {
        justCreatedTextRef.current = true;
        setTimeout(() => {
          justCreatedTextRef.current = false;
        }, 350);
        setSelectedObjectId(hit.id);
        setEditingTextId(hit.id);
        return;
      }

      pushHistory();
      whiteboardSounds.playTapSound();
      const newTextId = generateId();
      const newText: CanvasObject = {
        id: newTextId,
        type: 'text',
        x: Math.round(canvasPoint.x),
        y: Math.round(canvasPoint.y),
        width: 220,
        height: 48,
        text: 'Type text here',
        color: strokeColor,
        fontSize: 22,
        fontFamily: 'sans-serif',
        zIndex: getNextStackZIndex(activeSheet),
      };

      setNotebook((prev) => ({
        ...prev,
        sheets: prev.sheets.map((s) =>
          s.id === activeSheet.id ? { ...s, objects: [...s.objects, newText] } : s
        ),
      }));

      justCreatedTextRef.current = true;
      setTimeout(() => {
        justCreatedTextRef.current = false;
      }, 350);

      setSelectedObjectId(newTextId);
      setEditingTextId(newTextId);
      return;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    activePointersRef.current.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

    // Multi-touch pinch-to-zoom and two-finger pan
    if (activePointersRef.current.size >= 2) {
      const pts = Array.from(activePointersRef.current.values());
      const currentDist = Math.hypot(pts[1].clientX - pts[0].clientX, pts[1].clientY - pts[0].clientY);
      const currentMid = {
        x: (pts[0].clientX + pts[1].clientX) / 2,
        y: (pts[0].clientY + pts[1].clientY) / 2,
      };

      if (pinchStartDistRef.current && pinchStartDistRef.current > 0) {
        const scaleRatio = currentDist / pinchStartDistRef.current;
        const newZoom = Math.min(4.0, Math.max(0.2, pinchStartZoomRef.current * scaleRatio));

        const canvas = canvasRef.current;
        const rect = canvas ? canvas.getBoundingClientRect() : { left: 0, top: 0 };

        const initWorldX =
          (pinchStartMidpointRef.current.x - rect.left - pinchStartPanRef.current.x) /
          pinchStartZoomRef.current;
        const initWorldY =
          (pinchStartMidpointRef.current.y - rect.top - pinchStartPanRef.current.y) /
          pinchStartZoomRef.current;

        const newPanX = currentMid.x - rect.left - initWorldX * newZoom;
        const newPanY = currentMid.y - rect.top - initWorldY * newZoom;

        setZoom(newZoom);
        setPan({ x: newPanX, y: newPanY });
      }
      return;
    }

    if (!isPointerDownRef.current) return;
    const canvasPoint = screenToCanvas(e.clientX, e.clientY);

    // Pan Move
    if (isPanningRef.current) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      });
      return;
    }

    // Handle Dragging (Resizing or Rotating selected object)
    if (activeHandleRef.current && selectedObjectId) {
      const selected = activeSheet.objects.find((o) => o.id === selectedObjectId);
      if (!selected) return;

      const handle = activeHandleRef.current;
      const initial = initialObjectBoxRef.current;

      // Rotation Handle
      if (handle === 'rot') {
        const cx = initial.x + initial.width / 2;
        const cy = initial.y + initial.height / 2;
        const rad = Math.atan2(canvasPoint.y - cy, canvasPoint.x - cx);
        let deg = Math.round((rad * 180) / Math.PI + 90);
        if (deg < 0) deg += 360;

        setNotebook((prev) => ({
          ...prev,
          sheets: prev.sheets.map((s) =>
            s.id === activeSheet.id
              ? {
                  ...s,
                  objects: s.objects.map((obj) =>
                    obj.id === selectedObjectId ? { ...obj, rotation: deg } : obj
                  ),
                }
              : s
          ),
        }));
        return;
      }

      // Corner & Edge Resizing
      let newX = initial.x;
      let newY = initial.y;
      let newW = initial.width;
      let newH = initial.height;

      const dx = canvasPoint.x - pointerStartRef.current.x;
      const dy = canvasPoint.y - pointerStartRef.current.y;

      if (handle === 'se') {
        newW = Math.max(30, initial.width + dx);
        newH = Math.max(20, initial.height + dy);
        if (selected.type === 'image' && selected.aspectRatio) {
          newH = Math.round(newW / selected.aspectRatio);
        } else if (selected.type === 'sticker') {
          newH = newW;
        }
      } else if (handle === 'e') {
        newW = Math.max(30, initial.width + dx);
      } else if (handle === 's') {
        newH = Math.max(20, initial.height + dy);
      } else if (handle === 'nw') {
        const proposedW = initial.width - dx;
        const proposedH = initial.height - dy;
        if (proposedW >= 30) {
          newW = proposedW;
          newX = initial.x + dx;
        }
        if (proposedH >= 20) {
          newH = proposedH;
          newY = initial.y + dy;
        }
      } else if (handle === 'ne') {
        newW = Math.max(30, initial.width + dx);
        const proposedH = initial.height - dy;
        if (proposedH >= 20) {
          newH = proposedH;
          newY = initial.y + dy;
        }
      } else if (handle === 'sw') {
        const proposedW = initial.width - dx;
        if (proposedW >= 30) {
          newW = proposedW;
          newX = initial.x + dx;
        }
        newH = Math.max(20, initial.height + dy);
      } else if (handle === 'n') {
        const proposedH = initial.height - dy;
        if (proposedH >= 20) {
          newH = proposedH;
          newY = initial.y + dy;
        }
      } else if (handle === 'w') {
        const proposedW = initial.width - dx;
        if (proposedW >= 30) {
          newW = proposedW;
          newX = initial.x + dx;
        }
      }

      setNotebook((prev) => ({
        ...prev,
        sheets: prev.sheets.map((s) =>
          s.id === activeSheet.id
            ? {
                ...s,
                objects: s.objects.map((obj) =>
                  obj.id === selectedObjectId
                    ? {
                        ...obj,
                        x: Math.round(newX),
                        y: Math.round(newY),
                        width: Math.round(newW),
                        height: Math.round(newH),
                      }
                    : obj
                ),
              }
            : s
        ),
      }));
      return;
    }

    // Dragging Object Position
    if (isDraggingObjectRef.current && selectedObjectId) {
      setNotebook((prev) => ({
        ...prev,
        sheets: prev.sheets.map((s) =>
          s.id === activeSheet.id
            ? {
                ...s,
                objects: s.objects.map((obj) =>
                  obj.id === selectedObjectId
                    ? {
                        ...obj,
                        x: Math.round(canvasPoint.x - dragOffsetRef.current.x),
                        y: Math.round(canvasPoint.y - dragOffsetRef.current.y),
                      }
                    : obj
                ),
              }
            : s
        ),
      }));
      return;
    }

    // Freehand drawing stroke
    if (['pen', 'pencil', 'highlighter', 'eraser'].includes(activeTool)) {
      if (activeTool === 'eraser') {
        setEraserCursorPos({ x: e.clientX, y: e.clientY });
      }
      currentPathRef.current.push(canvasPoint);
      redrawCanvas();
      return;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) {
      pinchStartDistRef.current = null;
    }

    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    isPanningRef.current = false;
    activeHandleRef.current = null;

    if (isDraggingObjectRef.current) {
      isDraggingObjectRef.current = false;
      pushHistory();
      updateCurrentSheetThumbnail();
      return;
    }

    const canvasPoint = screenToCanvas(e.clientX, e.clientY);

    // Commit Freehand Drawing Path
    if (['pen', 'pencil', 'highlighter', 'eraser'].includes(activeTool)) {
      if (currentPathRef.current.length > 0) {
        const newPath: DrawingPath = {
          id: generateId(),
          tool: activeTool as any,
          points: currentPathRef.current,
          color: strokeColor,
          width: activeTool === 'eraser' ? eraserSize : strokeWidth,
          opacity: activeTool === 'highlighter' ? 0.35 : 1,
          zIndex: getNextStackZIndex(activeSheet),
        };

        setNotebook((prev) => ({
          ...prev,
          sheets: prev.sheets.map((s) =>
            s.id === activeSheet.id ? { ...s, paths: [...s.paths, newPath] } : s
          ),
        }));
        currentPathRef.current = [];
        updateCurrentSheetThumbnail();
      }
      return;
    }

    // Commit Geometric Shape Drag-Creation
    const isShapeTool = [
      'rect',
      'circle',
      'ellipse',
      'triangle',
      'right-triangle',
      'star',
      'star-4',
      'diamond',
      'pentagon',
      'hexagon',
      'octagon',
      'parallelogram',
      'trapezoid',
      'heart',
      'cube',
      'cylinder',
      'cone',
      'speech-bubble',
      'coordinate-axes',
      'line',
      'arrow',
      'double-arrow',
    ].includes(activeTool);

    if (isShapeTool) {
      pushHistory();
      whiteboardSounds.playPopSound();

      const start = pointerStartRef.current;
      const x = Math.min(start.x, canvasPoint.x);
      const y = Math.min(start.y, canvasPoint.y);
      const w = Math.max(30, Math.abs(canvasPoint.x - start.x));
      const h = Math.max(30, Math.abs(canvasPoint.y - start.y));

      const newShape: CanvasObject = {
        id: generateId(),
        type: 'shape',
        shapeType: ((isShapeTool && activeTool !== 'select' && activeTool !== 'pan') ? (activeTool as ShapeType) : activeShape) || 'rect',
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(w),
        height: Math.round(h),
        strokeColor,
        fillColor: fillColor || 'transparent',
        strokeWidth,
        zIndex: getNextStackZIndex(activeSheet),
      };

      setNotebook((prev) => ({
        ...prev,
        sheets: prev.sheets.map((s) =>
          s.id === activeSheet.id ? { ...s, objects: [...s.objects, newShape] } : s
        ),
      }));

      setSelectedObjectId(newShape.id);
      setActiveTool('select');
      updateCurrentSheetThumbnail();
      return;
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) {
      pinchStartDistRef.current = null;
    }
    isPointerDownRef.current = false;
    isPanningRef.current = false;
    activeHandleRef.current = null;
    if (currentPathRef.current.length > 0) {
      currentPathRef.current = [];
      redrawCanvas();
    }
  };

  // Double click canvas to re-edit existing text
  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasPoint = screenToCanvas(e.clientX, e.clientY);
    const hit = hitTestTopObject(activeSheet.objects, canvasPoint);
    if (hit && hit.type === 'text') {
      justCreatedTextRef.current = true;
      setTimeout(() => {
        justCreatedTextRef.current = false;
      }, 350);
      setSelectedObjectId(hit.id);
      setEditingTextId(hit.id);
    }
  };

  // Zoom with mouse wheel or trackpad
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((z) => Math.min(4, Math.max(0.2, z * zoomFactor)));
    } else {
      setPan((p) => ({
        x: p.x - e.deltaX,
        y: p.y - e.deltaY,
      }));
    }
  };

  const updateCurrentSheetThumbnail = () => {
    if (!activeSheet) return;
    const thumb = generateSheetThumbnail(activeSheet);
    if (thumb) {
      setNotebook((prev) => ({
        ...prev,
        sheets: prev.sheets.map((s) => (s.id === activeSheet.id ? { ...s, thumbnail: thumb } : s)),
      }));
    }
  };

  const handleInsertShape = (shape: ShapeType) => {
    if (!activeSheet) return;
    pushHistory();
    whiteboardSounds.playPopSound();
    const canvasWidth = canvasRef.current?.clientWidth || 800;
    const canvasHeight = canvasRef.current?.clientHeight || 600;
    const centerScreen = { x: canvasWidth / 2, y: canvasHeight / 2 };
    const centerCanvas = screenToCanvas(centerScreen.x, centerScreen.y);

    const isLinear = shape === 'line' || shape === 'arrow' || shape === 'double-arrow';
    const isAxes = shape === 'coordinate-axes';
    const defaultWidth = isLinear ? 180 : isAxes ? 200 : 120;
    const defaultHeight = isLinear ? 36 : isAxes ? 200 : 120;

    const newShape: CanvasObject = {
      id: generateId(),
      type: 'shape',
      shapeType: shape,
      x: Math.round(centerCanvas.x - defaultWidth / 2),
      y: Math.round(centerCanvas.y - defaultHeight / 2),
      width: defaultWidth,
      height: defaultHeight,
      strokeColor,
      fillColor: fillColor || 'transparent',
      strokeWidth,
      zIndex: getNextStackZIndex(activeSheet),
    };

    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id ? { ...s, objects: [...s.objects, newShape] } : s
      ),
    }));
    setSelectedObjectId(newShape.id);
    setActiveTool('select');
    updateCurrentSheetThumbnail();
  };

  const handleClearCurrentSheet = () => {
    if (!activeSheet) return;
    pushHistory();
    whiteboardSounds.playPopSound();
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id ? { ...s, paths: [], objects: [] } : s
      ),
    }));
    setSelectedObjectId(null);
    updateCurrentSheetThumbnail();
  };

  // ==========================================
  // SHEET MANAGEMENT ACTIONS
  // ==========================================

  const handleSelectSheet = (sheetId: string) => {
    commitTextEdit();
    setActiveSheetId(sheetId);
    setSelectedObjectId(null);
    setNotebook((prev) => ({ ...prev, activeSheetId: sheetId }));
    const target = notebook.sheets.find((s) => s.id === sheetId);
    if (target) {
      setZoom(target.zoom || 1);
      setPan(target.pan || { x: 0, y: 0 });
    }
  };

  const handleAddNewSheet = (name: string, background: BackgroundType) => {
    commitTextEdit();
    const newId = generateId();
    const newSheet: Sheet = {
      id: newId,
      name,
      background,
      paths: [],
      objects: [],
      zoom: 1,
      pan: { x: 0, y: 0 },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    whiteboardSounds.playPopSound();
    setNotebook((prev) => ({
      ...prev,
      sheets: [...prev.sheets, newSheet],
      activeSheetId: newId,
    }));
    setActiveSheetId(newId);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedObjectId(null);
  };

  const handleRenameSheet = (sheetId: string, newName: string) => {
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) => (s.id === sheetId ? { ...s, name: newName } : s)),
    }));
  };

  const handleDuplicateSheet = (sheetId: string) => {
    commitTextEdit();
    const target = notebook.sheets.find((s) => s.id === sheetId);
    if (!target) return;

    const newId = generateId();
    const duplicated: Sheet = {
      ...JSON.parse(JSON.stringify(target)),
      id: newId,
      name: `${target.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setNotebook((prev) => ({
      ...prev,
      sheets: [...prev.sheets, duplicated],
      activeSheetId: newId,
    }));
    setActiveSheetId(newId);
  };

  // Safe Sheet Deletion with confirmation
  const handleDeleteSheetRequest = (sheetId: string) => {
    const target = notebook.sheets.find((s) => s.id === sheetId);
    if (!target) return;

    if (target.paths.length > 0 || target.objects.length > 0) {
      setSheetPendingDelete(target);
    } else {
      executeDeleteSheet(sheetId);
    }
  };

  const executeDeleteSheet = (sheetId: string) => {
    whiteboardSounds.playEraseSound();
    setNotebook((prev) => {
      const remaining = prev.sheets.filter((s) => s.id !== sheetId);
      if (remaining.length === 0) {
        // Protect last remaining sheet: automatically create blank replacement
        const replacement: Sheet = {
          id: generateId(),
          name: 'Sheet 1',
          background: 'plain-white',
          paths: [],
          objects: [],
          zoom: 1,
          pan: { x: 0, y: 0 },
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        setActiveSheetId(replacement.id);
        return {
          ...prev,
          sheets: [replacement],
          activeSheetId: replacement.id,
        };
      }
      const nextActive = prev.activeSheetId === sheetId ? remaining[0].id : prev.activeSheetId;
      setActiveSheetId(nextActive);
      return {
        ...prev,
        sheets: remaining,
        activeSheetId: nextActive,
      };
    });
    setSheetPendingDelete(null);
    setSelectedObjectId(null);
  };

  const handleMoveSheet = (sheetId: string, direction: 'left' | 'right') => {
    setNotebook((prev) => {
      const idx = prev.sheets.findIndex((s) => s.id === sheetId);
      if (idx === -1) return prev;
      const targetIdx = direction === 'left' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.sheets.length) return prev;

      const updated = [...prev.sheets];
      const temp = updated[idx];
      updated[idx] = updated[targetIdx];
      updated[targetIdx] = temp;

      return { ...prev, sheets: updated };
    });
  };

  const handleChangeBackground = (background: BackgroundType) => {
    whiteboardSounds.playTapSound();
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) => (s.id === activeSheetId ? { ...s, background } : s)),
    }));
  };

  const handleClearSheet = (sheetId: string) => {
    pushHistory();
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) => (s.id === sheetId ? { ...s, paths: [], objects: [] } : s)),
    }));
    setSelectedObjectId(null);
    setEditingTextId(null);
  };

  // ==========================================
  // OBJECT ACTIONS (Duplicate, Layering, Delete)
  // ==========================================

  const handleDeleteSelected = () => {
    if (!selectedObjectId) return;
    pushHistory();
    whiteboardSounds.playEraseSound();
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id
          ? { ...s, objects: s.objects.filter((o) => o.id !== selectedObjectId) }
          : s
      ),
    }));
    setSelectedObjectId(null);
    setEditingTextId(null);
  };

  const handleDuplicateSelected = () => {
    const selected = activeSheet?.objects.find((o) => o.id === selectedObjectId);
    if (!selected) return;

    pushHistory();
    whiteboardSounds.playPopSound();
    const copy: CanvasObject = {
      ...JSON.parse(JSON.stringify(selected)),
      id: generateId(),
      x: selected.x + 30,
      y: selected.y + 30,
      zIndex: getNextStackZIndex(activeSheet),
    };

    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id ? { ...s, objects: [...s.objects, copy] } : s
      ),
    }));
    setSelectedObjectId(copy.id);
  };

  // 4-Tier Layer Stacking Controls with Unified Objects & Paths Support
  const handleBringToFront = () => {
    if (!selectedObjectId || !activeSheet) return;
    pushHistory();
    whiteboardSounds.playTapSound();
    const updated = reorderSheetLayers(activeSheet.objects, activeSheet.paths, selectedObjectId, 'front');
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id ? { ...s, objects: updated.objects, paths: updated.paths } : s
      ),
    }));
    updateCurrentSheetThumbnail();
  };

  const handleSendToBack = () => {
    if (!selectedObjectId || !activeSheet) return;
    pushHistory();
    whiteboardSounds.playTapSound();
    const updated = reorderSheetLayers(activeSheet.objects, activeSheet.paths, selectedObjectId, 'back');
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id ? { ...s, objects: updated.objects, paths: updated.paths } : s
      ),
    }));
    updateCurrentSheetThumbnail();
  };

  const handleBringForward = () => {
    if (!selectedObjectId || !activeSheet) return;
    pushHistory();
    whiteboardSounds.playTapSound();
    const updated = reorderSheetLayers(activeSheet.objects, activeSheet.paths, selectedObjectId, 'forward');
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id ? { ...s, objects: updated.objects, paths: updated.paths } : s
      ),
    }));
    updateCurrentSheetThumbnail();
  };

  const handleSendBackward = () => {
    if (!selectedObjectId || !activeSheet) return;
    pushHistory();
    whiteboardSounds.playTapSound();
    const updated = reorderSheetLayers(activeSheet.objects, activeSheet.paths, selectedObjectId, 'backward');
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id ? { ...s, objects: updated.objects, paths: updated.paths } : s
      ),
    }));
    updateCurrentSheetThumbnail();
  };

  const handleRotateSelected = (deltaDeg: number) => {
    if (!selectedObjectId || !activeSheet) return;
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id
          ? {
              ...s,
              objects: s.objects.map((o) =>
                o.id === selectedObjectId
                  ? { ...o, rotation: ((o.rotation || 0) + deltaDeg + 360) % 360 }
                  : o
              ),
            }
          : s
      ),
    }));
  };

  const handleUpdateSelectedProps = (props: Partial<CanvasObject>) => {
    if (!selectedObjectId) return;
    setNotebook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) =>
        s.id === activeSheet.id
          ? {
              ...s,
              objects: s.objects.map((o) => (o.id === selectedObjectId ? ({ ...o, ...props } as any) : o)),
            }
          : s
      ),
    }));
  };

  const handleImageUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
    e.target.value = '';
  };

  const selectedObject = activeSheet?.objects.find((o) => o.id === selectedObjectId) || null;
  const historyStack = activeSheet ? historyMapRef.current.get(activeSheet.id) : null;
  const canUndo = (historyStack?.past.length || 0) > 0;
  const canRedo = (historyStack?.future.length || 0) > 0;

  // Active text being edited
  const editingText =
    editingTextId && activeSheet
      ? (activeSheet.objects.find((o) => o.id === editingTextId && o.type === 'text') as any)
      : null;

  return (
    <div
      ref={workspaceContainerRef}
      className="w-full h-screen flex flex-col bg-slate-100 dark:bg-[#121214] text-slate-900 dark:text-slate-100 overflow-hidden font-sans select-none"
    >
      {/* Hidden file input for image upload */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={handleImageUploaded}
        className="hidden"
      />

      {/* 1. TOP TOOLBAR */}
      <TopToolbar
        notebookName={notebook.name}
        onRenameNotebook={handleRenameNotebook}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleManualSave}
        onSaveAs={handleOpenSaveAs}
        onNavigateToHistory={onNavigateToHistory}
        isSaved={isSaved}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }}
        onExitWhiteboard={onExit}
        currentBackground={activeSheet?.background || 'plain-white'}
        onChangeBackground={handleChangeBackground}
        onOpenExportModal={() => setExportModalOpen(true)}
      />

      {/* MOBILE TOOL STRIP (Rendered horizontally below TopToolbar on screens < 768px) */}
      <MobileToolStrip
        activeTool={activeTool}
        onSelectTool={handleSelectTool}
        activeShape={activeShape}
        onSelectShape={setActiveShape}
        onOpenImageUpload={() => imageInputRef.current?.click()}
        onOpenStickerModal={() => setStickerModalOpen(true)}
        onInsertShape={handleInsertShape}
      />

      {/* 2. MAIN WORKSPACE: LEFT TOOLBAR (DESKTOP/TABLET) + CENTER CANVAS */}
      <div className="flex-1 flex overflow-hidden relative w-full h-full">
        {/* Left Drawing Tools Sidebar (Desktop & Tablet >= 768px) */}
        <LeftToolbar
          activeTool={activeTool}
          onSelectTool={handleSelectTool}
          activeShape={activeShape}
          onSelectShape={setActiveShape}
          onOpenImageUpload={() => imageInputRef.current?.click()}
          onOpenStickerModal={() => setStickerModalOpen(true)}
          onInsertShape={handleInsertShape}
          className="hidden md:flex"
        />

        {/* Central Drawing Canvas Container */}
        <div
          ref={canvasContainerRef}
          className="flex-1 relative overflow-hidden bg-slate-100 dark:bg-[#121214] w-full h-full touch-none"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Floating Contextual Properties Bar */}
          <PropertiesBar
            activeTool={activeTool}
            selectedObject={selectedObject}
            strokeColor={strokeColor}
            onChangeStrokeColor={setStrokeColor}
            fillColor={fillColor}
            onChangeFillColor={setFillColor}
            strokeWidth={strokeWidth}
            onChangeStrokeWidth={setStrokeWidth}
            eraserSize={eraserSize}
            onChangeEraserSize={setEraserSize}
            onClearSheet={handleClearCurrentSheet}
            onDuplicateSelected={handleDuplicateSelected}
            onDeleteSelected={handleDeleteSelected}
            onBringForward={handleBringForward}
            onSendBackward={handleSendBackward}
            onBringToFront={handleBringToFront}
            onSendToBack={handleSendToBack}
            onRotateSelected={handleRotateSelected}
            onUpdateSelectedProps={handleUpdateSelectedProps}
          />

          {/* Interactive HTML5 Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerEnter={(e) => {
              if (activeTool === 'eraser') setEraserCursorPos({ x: e.clientX, y: e.clientY });
            }}
            onPointerLeave={() => {
              setEraserCursorPos(null);
            }}
            onDoubleClick={handleDoubleClick}
            onWheel={handleWheel}
            className={`w-full h-full block touch-none ${
              activeTool === 'pan'
                ? 'cursor-grab active:cursor-grabbing'
                : activeTool === 'eraser'
                ? 'cursor-none'
                : 'cursor-crosshair'
            }`}
          />

          {/* Dynamic circular eraser size indicator tracking pointer */}
          {activeTool === 'eraser' && eraserCursorPos && (
            <div
              className="pointer-events-none fixed z-30 rounded-full border-2 border-slate-700/80 dark:border-white/90 bg-slate-500/15 -translate-x-1/2 -translate-y-1/2 shadow-xs transition-none"
              style={{
                left: eraserCursorPos.x,
                top: eraserCursorPos.y,
                width: Math.max(8, eraserSize * zoom),
                height: Math.max(8, eraserSize * zoom),
              }}
            />
          )}

          {/* Editable Text Area Overlay directly on Canvas */}
          {editingText && (
            <textarea
              ref={textareaRef}
              autoFocus
              value={editingText.text}
              placeholder="Type text here..."
              onChange={(e) => {
                const val = e.target.value;
                // Auto-expand dimensions to fit content
                const lines = val.split('\n');
                const maxLineLen = lines.reduce((max, l) => Math.max(max, l.length), 0);
                const charWidth = (editingText.fontSize || 22) * 0.6;
                const estimatedWidth = Math.max(160, maxLineLen * charWidth + 30);
                const estimatedHeight = Math.max(48, lines.length * (editingText.fontSize || 22) * 1.35 + 16);

                setNotebook((prev) => ({
                  ...prev,
                  sheets: prev.sheets.map((s) =>
                    s.id === activeSheet.id
                      ? {
                          ...s,
                          objects: s.objects.map((obj) =>
                            obj.id === editingText.id
                              ? {
                                  ...obj,
                                  text: val,
                                  width: Math.round(estimatedWidth),
                                  height: Math.round(estimatedHeight),
                                }
                              : obj
                          ),
                        }
                      : s
                  ),
                }));
              }}
              onBlur={() => {
                if (justCreatedTextRef.current) return;
                commitTextEdit();
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Escape') {
                  commitTextEdit();
                }
              }}
              style={{
                position: 'absolute',
                left: pan.x + editingText.x * zoom,
                top: pan.y + editingText.y * zoom,
                width: Math.max(140, editingText.width) * zoom,
                height: Math.max(44, editingText.height) * zoom,
                fontSize: `${(editingText.fontSize || 22) * zoom}px`,
                fontFamily: editingText.fontFamily || 'sans-serif',
                fontWeight: editingText.bold ? 'bold' : 'normal',
                fontStyle: editingText.italic ? 'italic' : 'normal',
                textDecoration: editingText.underline ? 'underline' : 'none',
                color: editingText.color || strokeColor,
                textAlign: editingText.align || 'left',
                lineHeight: 1.35,
                background: darkMode ? 'rgba(30, 30, 34, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                border: '2px dashed #7957F5',
                borderRadius: '8px',
                padding: '4px 8px',
                outline: 'none',
                resize: 'none',
                zIndex: 60,
              }}
            />
          )}

          {/* Interactive Zoom Controls & Fit to Screen Pill */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-0.5 sm:gap-1 p-1 bg-white/90 dark:bg-[#18181B]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl shadow-md text-xs font-medium text-slate-700 dark:text-slate-200 select-none">
            <button
              type="button"
              onClick={handleFitToScreen}
              className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Fit Content to Screen"
              aria-label="Fit to Screen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-3.5 bg-slate-200 dark:bg-white/10" />
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 font-mono text-[11px] text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              title="Click to Reset Zoom (100%)"
              aria-label="Reset Zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM MULTI-SHEET STRIP */}
      <SheetStrip
        sheets={notebook.sheets}
        activeSheetId={activeSheetId}
        onSelectSheet={handleSelectSheet}
        onAddNewSheet={() => setNewSheetModalOpen(true)}
        onRenameSheet={handleRenameSheet}
        onDuplicateSheet={handleDuplicateSheet}
        onDeleteSheet={handleDeleteSheetRequest}
        onMoveSheet={handleMoveSheet}
        onChangeBackground={(sheetId, bg) => {
          setNotebook((prev) => ({
            ...prev,
            sheets: prev.sheets.map((s) => (s.id === sheetId ? { ...s, background: bg } : s)),
          }));
        }}
        onClearSheet={handleClearSheet}
      />

      {/* 4. MODALS */}
      <NewSheetModal
        isOpen={newSheetModalOpen}
        onClose={() => setNewSheetModalOpen(false)}
        onCreateSheet={handleAddNewSheet}
      />

      <StickerEmojiModal
        isOpen={stickerModalOpen}
        onClose={() => setStickerModalOpen(false)}
        onInsertSticker={handleInsertSticker}
      />

      {/* Dedicated Export Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        activeSheet={activeSheet}
        notebook={notebook}
      />

      {/* Safe Sheet Deletion Confirmation Dialog */}
      {sheetPendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl p-6 relative">
            <button
              onClick={() => setSheetPendingDelete(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-3 text-rose-500">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Delete Sheet?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete <strong className="font-semibold text-slate-900 dark:text-white">“{sheetPendingDelete.name}”</strong>? This sheet contains active drawings and objects that cannot be recovered.
            </p>
            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSheetPendingDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                Keep Sheet
              </button>
              <button
                onClick={() => executeDeleteSheet(sheetPendingDelete.id)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Sheet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save As Modal */}
      {saveAsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl p-6 relative">
            <button
              onClick={() => setSaveAsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4 text-[#7957F5]">
              <div className="w-10 h-10 rounded-2xl bg-[#7957F5]/10 border border-[#7957F5]/20 flex items-center justify-center">
                <Copy className="w-5 h-5 text-[#7957F5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Save Whiteboard As
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Create a new copy in Whiteboard History
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Board Name
                </label>
                <input
                  type="text"
                  autoFocus
                  value={saveAsName}
                  onChange={(e) => setSaveAsName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleConfirmSaveAs();
                    if (e.key === 'Escape') setSaveAsModalOpen(false);
                  }}
                  placeholder="Enter board title"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#7957F5]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSaveAsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSaveAs}
                  disabled={!saveAsName.trim()}
                  className="px-5 py-2 rounded-xl bg-[#7957F5] hover:bg-[#6846E3] disabled:opacity-40 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Notification Toast */}
      {saveToast && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{saveToast}</span>
        </div>
      )}
    </div>
  );
};
