import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  MoreVertical,
  Copy,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  RefreshCw,
  Palette,
  X,
  Check,
  ChevronUp,
} from 'lucide-react';
import { Sheet, BackgroundType } from './types.ts';
import { whiteboardSounds } from './soundEffects.ts';

interface SheetStripProps {
  sheets: Sheet[];
  activeSheetId: string;
  onSelectSheet: (sheetId: string) => void;
  onAddNewSheet: () => void;
  onRenameSheet: (sheetId: string, newName: string) => void;
  onDuplicateSheet: (sheetId: string) => void;
  onDeleteSheet: (sheetId: string) => void;
  onMoveSheet: (sheetId: string, direction: 'left' | 'right') => void;
  onChangeBackground: (sheetId: string, bg: BackgroundType) => void;
  onClearSheet: (sheetId: string) => void;
}

export const SheetStrip: React.FC<SheetStripProps> = ({
  sheets,
  activeSheetId,
  onSelectSheet,
  onAddNewSheet,
  onRenameSheet,
  onDuplicateSheet,
  onDeleteSheet,
  onMoveSheet,
  onChangeBackground,
  onClearSheet,
}) => {
  const [activeMenuSheetId, setActiveMenuSheetId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [editingSheetId, setEditingSheetId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');
  const [bgPickerSheetId, setBgPickerSheetId] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  // Close context menu on click outside or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuSheetId(null);
        setMenuPosition(null);
        setBgPickerSheetId(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (editingSheetId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [editingSheetId]);

  const handleStartRename = (sheet: Sheet) => {
    setEditingSheetId(sheet.id);
    setEditingName(sheet.name);
    setActiveMenuSheetId(null);
  };

  const handleSaveRename = (sheetId: string) => {
    if (editingName.trim()) {
      onRenameSheet(sheetId, editingName.trim());
    }
    setEditingSheetId(null);
  };

  const currentSheetIndex = sheets.findIndex((s) => s.id === activeSheetId);
  const activeSheet = sheets[currentSheetIndex] || sheets[0];

  return (
    <>
      {/* 1. DESKTOP / TABLET STRIP (hidden on mobile, md:flex) */}
      <footer className="hidden md:flex h-14 lg:h-16 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md border-t border-slate-200 dark:border-white/10 px-3 items-center justify-between gap-3 shrink-0 z-40 select-none">
        {/* Left controls: Sheet count & quick navigator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
            Sheets ({sheets.length})
          </span>

          {/* New Sheet Button */}
          <button
            onClick={onAddNewSheet}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#7957F5] hover:bg-[#6846E3] active:scale-95 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            title="Add New Sheet (Plain White, Grid, etc.)"
            aria-label="Add New Sheet"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Sheet</span>
          </button>
        </div>

        {/* Center scrollable sheet thumbnails */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto py-1 thin-scrollbar px-2">
          {sheets.map((sheet, index) => {
            const isActive = sheet.id === activeSheetId;
            const isRenaming = editingSheetId === sheet.id;

            return (
              <div
                key={sheet.id}
                onClick={() => {
                  if (!isActive) {
                    whiteboardSounds.playSheetSwitchSound();
                    onSelectSheet(sheet.id);
                  }
                }}
                className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 max-w-56 ${
                  isActive
                    ? 'bg-slate-100 dark:bg-white/10 border-[#7957F5] shadow-xs'
                    : 'bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                {/* Mini visual background indicator or thumbnail */}
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg shrink-0 border border-slate-300 dark:border-white/20 flex items-center justify-center overflow-hidden text-[9px] font-bold ${
                    sheet.background === 'plain-dark'
                      ? 'bg-[#161618] text-white'
                      : sheet.background === 'plain-transparent'
                      ? 'bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:4px_4px] bg-slate-100 text-slate-700'
                      : 'bg-white text-slate-800'
                  }`}
                >
                  {sheet.thumbnail ? (
                    <img src={sheet.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Title & Page number */}
                <div className="min-w-0 flex-1">
                  {isRenaming ? (
                    <input
                      ref={renameInputRef}
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={() => handleSaveRename(sheet.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveRename(sheet.id);
                        if (e.key === 'Escape') setEditingSheetId(null);
                      }}
                      className="w-full px-1.5 py-0.5 text-xs bg-white dark:bg-black rounded border border-[#7957F5] text-slate-900 dark:text-white focus:outline-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <div>
                      <span
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          handleStartRename(sheet);
                        }}
                        className="text-xs font-bold text-slate-800 dark:text-slate-100 block truncate"
                      >
                        {sheet.name}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate font-mono">
                        Page {index + 1} · {sheet.background.replace('-', ' ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Context menu toggle button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeMenuSheetId === sheet.id) {
                      setActiveMenuSheetId(null);
                      setMenuPosition(null);
                    } else {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMenuPosition({
                        x: Math.max(10, Math.min(rect.left, window.innerWidth - 210)),
                        y: rect.top,
                      });
                      setActiveMenuSheetId(sheet.id);
                    }
                    setBgPickerSheetId(null);
                  }}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Sheet Options"
                  aria-label="Sheet Options"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Floating Context Menu - Fixed outside overflow scroll container */}
        {activeMenuSheetId && menuPosition && (() => {
          const sheet = sheets.find((s) => s.id === activeMenuSheetId);
          if (!sheet) return null;
          const index = sheets.findIndex((s) => s.id === activeMenuSheetId);

          return (
            <div
              ref={menuRef}
              onClick={(e) => e.stopPropagation()}
              style={{
                left: menuPosition.x,
                bottom: window.innerHeight - menuPosition.y + 8,
              }}
              className="fixed w-48 bg-white dark:bg-[#1E1E22] rounded-2xl border border-slate-200 dark:border-white/12 shadow-2xl py-1.5 z-[100] text-xs animate-in fade-in"
            >
              <button
                onClick={() => handleStartRename(sheet)}
                className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Rename</span>
              </button>

              <button
                onClick={() => {
                  whiteboardSounds.playPopSound();
                  onDuplicateSheet(sheet.id);
                  setActiveMenuSheetId(null);
                  setMenuPosition(null);
                }}
                className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Duplicate Sheet</span>
              </button>

              {/* Change Background Submenu */}
              <div className="px-3 py-1.5 flex items-center justify-between text-slate-700 dark:text-slate-200 border-t border-b border-slate-100 dark:border-white/5 my-1">
                <span className="flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-slate-400" />
                  <span>Background</span>
                </span>
                <button
                  onClick={() => setBgPickerSheetId(bgPickerSheetId === sheet.id ? null : sheet.id)}
                  className="text-[10px] text-[#7957F5] font-semibold cursor-pointer"
                >
                  Change
                </button>
              </div>

              {bgPickerSheetId === sheet.id && (
                <div className="p-2 grid grid-cols-2 gap-1 bg-slate-50 dark:bg-black/20 my-1 rounded-xl mx-2">
                  {[
                    { id: 'plain-white', label: 'Plain White' },
                    { id: 'plain-dark', label: 'Plain Dark' },
                    { id: 'plain-transparent', label: 'Transparent' },
                    { id: 'ruled', label: 'Ruled Paper' },
                    { id: 'grid', label: 'Square Grid' },
                    { id: 'dotted', label: 'Dotted' },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => {
                        onChangeBackground(sheet.id, bg.id as BackgroundType);
                        setActiveMenuSheetId(null);
                        setMenuPosition(null);
                        setBgPickerSheetId(null);
                      }}
                      className={`px-2 py-1 text-[10px] rounded text-left font-medium cursor-pointer ${
                        sheet.background === bg.id
                          ? 'bg-[#7957F5] text-white'
                          : 'hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Move Left / Right */}
              <div className="flex items-center px-2 py-1 gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => {
                    onMoveSheet(sheet.id, 'left');
                    setActiveMenuSheetId(null);
                    setMenuPosition(null);
                  }}
                  className="flex-1 py-1 text-[11px] font-semibold flex items-center justify-center gap-1 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>Left</span>
                </button>
                <button
                  disabled={index === sheets.length - 1}
                  onClick={() => {
                    onMoveSheet(sheet.id, 'right');
                    setActiveMenuSheetId(null);
                    setMenuPosition(null);
                  }}
                  className="flex-1 py-1 text-[11px] font-semibold flex items-center justify-center gap-1 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-40 cursor-pointer"
                >
                  <span>Right</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={() => {
                  whiteboardSounds.playEraseSound();
                  onClearSheet(sheet.id);
                  setActiveMenuSheetId(null);
                  setMenuPosition(null);
                }}
                className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-amber-600 dark:text-amber-400 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear Sheet</span>
              </button>

              <button
                onClick={() => {
                  onDeleteSheet(sheet.id);
                  setActiveMenuSheetId(null);
                  setMenuPosition(null);
                }}
                className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 cursor-pointer border-t border-slate-100 dark:border-white/5 mt-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Sheet</span>
              </button>
            </div>
          );
        })()}
      </footer>

      {/* 2. MOBILE COMPACT SHEET NAVIGATOR (md:hidden, docked bottom bar) */}
      <footer className="flex md:hidden h-12 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md border-t border-slate-200 dark:border-white/10 px-3 items-center justify-between gap-2 shrink-0 z-40 select-none">
        {/* Left: Quick stepper & sheet selector */}
        <div className="flex items-center gap-1">
          <button
            disabled={currentSheetIndex <= 0}
            onClick={() => {
              if (currentSheetIndex > 0) {
                whiteboardSounds.playSheetSwitchSound();
                onSelectSheet(sheets[currentSheetIndex - 1].id);
              }
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title="Previous Sheet"
            aria-label="Previous Sheet"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Sheet Selector Pill (Opens Mobile Bottom Drawer) */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-100 text-xs font-semibold cursor-pointer max-w-[170px]"
            title="Open Sheet Manager"
            aria-label="Manage Sheets"
          >
            <Layers className="w-3.5 h-3.5 text-[#7957F5] shrink-0" />
            <span className="truncate">
              {activeSheet ? activeSheet.name : `Sheet ${currentSheetIndex + 1}`}
            </span>
            <span className="text-[10px] text-slate-400 font-mono shrink-0">
              ({currentSheetIndex + 1}/{sheets.length})
            </span>
            <ChevronUp className="w-3 h-3 text-slate-400 shrink-0" />
          </button>

          <button
            disabled={currentSheetIndex >= sheets.length - 1}
            onClick={() => {
              if (currentSheetIndex < sheets.length - 1) {
                whiteboardSounds.playSheetSwitchSound();
                onSelectSheet(sheets[currentSheetIndex + 1].id);
              }
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title="Next Sheet"
            aria-label="Next Sheet"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Quick Add New Sheet Button */}
        <button
          onClick={onAddNewSheet}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#7957F5] hover:bg-[#6846E3] active:scale-95 text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
          title="Add New Sheet"
          aria-label="Add Sheet"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Sheet</span>
        </button>
      </footer>

      {/* 3. MOBILE SHEET MANAGEMENT BOTTOM DRAWER */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 md:hidden">
          <div
            className="w-full bg-white dark:bg-[#18181B] rounded-t-3xl border-t border-slate-200 dark:border-white/12 shadow-2xl max-h-[75vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#7957F5]/10 flex items-center justify-center text-[#7957F5]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Manage Sheets ({sheets.length})
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Switch, rename, duplicate, reorder or delete sheets
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    onAddNewSheet();
                    setMobileDrawerOpen(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#7957F5] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>New</span>
                </button>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  aria-label="Close Drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sheets List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {sheets.map((sheet, index) => {
                const isActive = sheet.id === activeSheetId;
                const isRenaming = editingSheetId === sheet.id;

                return (
                  <div
                    key={sheet.id}
                    className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-purple-50/60 dark:bg-[#7957F5]/10 border-[#7957F5]'
                        : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10'
                    }`}
                  >
                    {/* Left: Thumbnail & Info */}
                    <div
                      onClick={() => {
                        onSelectSheet(sheet.id);
                        whiteboardSounds.playSheetSwitchSound();
                        setMobileDrawerOpen(false);
                      }}
                      className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl shrink-0 border border-slate-300 dark:border-white/20 flex items-center justify-center overflow-hidden text-xs font-bold ${
                          sheet.background === 'plain-dark'
                            ? 'bg-[#161618] text-white'
                            : 'bg-white text-slate-800'
                        }`}
                      >
                        {sheet.thumbnail ? (
                          <img src={sheet.thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {isRenaming ? (
                          <input
                            type="text"
                            autoFocus
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onBlur={() => handleSaveRename(sheet.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveRename(sheet.id);
                              if (e.key === 'Escape') setEditingSheetId(null);
                            }}
                            className="w-full px-2 py-0.5 text-xs bg-white dark:bg-black rounded border border-[#7957F5] text-slate-900 dark:text-white focus:outline-none"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {sheet.name}
                              </span>
                              {isActive && (
                                <span className="px-1.5 py-0.2 rounded-md bg-[#7957F5] text-white text-[9px] font-semibold">
                                  Active
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              Page {index + 1} · {sheet.background.replace('-', ' ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Reorder Left/Right (Up/Down) */}
                      <button
                        disabled={index === 0}
                        onClick={() => onMoveSheet(sheet.id, 'left')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={index === sheets.length - 1}
                        onClick={() => onMoveSheet(sheet.id, 'right')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Rename */}
                      <button
                        onClick={() => handleStartRename(sheet)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                        title="Rename Sheet"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => {
                          whiteboardSounds.playPopSound();
                          onDuplicateSheet(sheet.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                        title="Duplicate Sheet"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        disabled={sheets.length <= 1}
                        onClick={() => onDeleteSheet(sheet.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 disabled:opacity-20 cursor-pointer"
                        title="Delete Sheet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
