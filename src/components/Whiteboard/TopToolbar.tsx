import React, { useState, useRef, useEffect } from 'react';
import {
  Undo2,
  Redo2,
  Save,
  Check,
  Download,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Edit3,
  ArrowLeft,
  Palette,
  ChevronDown,
  Copy,
  History,
  MoreVertical,
  X,
  Sparkles,
} from 'lucide-react';
import { BackgroundType } from './types.ts';
import { whiteboardSounds } from './soundEffects.ts';

interface TopToolbarProps {
  notebookName: string;
  onRenameNotebook: (name: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  isSaved: boolean;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onExitWhiteboard: () => void;
  currentBackground: BackgroundType;
  onChangeBackground: (bg: BackgroundType) => void;
  onOpenExportModal: () => void;
  onNavigateToHistory?: () => void;
}

const BACKGROUND_OPTIONS: { id: BackgroundType; label: string }[] = [
  { id: 'plain-white', label: 'Plain White' },
  { id: 'plain-dark', label: 'Plain Dark' },
  { id: 'plain-transparent', label: 'Transparent' },
  { id: 'ruled', label: 'Ruled Paper' },
  { id: 'grid', label: 'Square Grid' },
  { id: 'dotted', label: 'Dotted Paper' },
];

export const TopToolbar: React.FC<TopToolbarProps> = ({
  notebookName,
  onRenameNotebook,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  onSaveAs,
  isSaved,
  darkMode,
  onToggleDarkMode,
  soundEnabled,
  onToggleSound,
  isFullscreen,
  onToggleFullscreen,
  onExitWhiteboard,
  currentBackground,
  onChangeBackground,
  onOpenExportModal,
  onNavigateToHistory,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [titleText, setTitleText] = useState<string>(notebookName);
  const [bgMenuOpen, setBgMenuOpen] = useState<boolean>(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState<boolean>(false);
  const bgMenuRef = useRef<HTMLDivElement>(null);
  const mobileMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitleText(notebookName);
  }, [notebookName]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bgMenuRef.current && !bgMenuRef.current.contains(e.target as Node)) {
        setBgMenuOpen(false);
      }
      if (mobileMoreRef.current && !mobileMoreRef.current.contains(e.target as Node)) {
        setMobileMoreOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveTitle = () => {
    if (titleText.trim()) {
      onRenameNotebook(titleText.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="h-13 sm:h-14 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-2 sm:px-4 flex items-center justify-between gap-1.5 sm:gap-2 shrink-0 z-40 select-none">
      {/* Left: Exit, Logo, Title, Save Status */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink min-w-0">
        <button
          onClick={onExitWhiteboard}
          className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer shrink-0"
          title="Return to CalcAura Website"
          aria-label="Exit Whiteboard"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exit</span>
        </button>

        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#7957F5]/10 border border-[#7957F5]/30 flex items-center justify-center text-[#7957F5] dark:text-purple-300 font-mono font-bold text-xs shadow-xs shrink-0">
          <span>∑</span>
        </div>

        {/* Notebook Name */}
        <div className="flex items-center gap-1 min-w-0">
          {isEditingTitle ? (
            <input
              type="text"
              autoFocus
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveTitle();
                if (e.key === 'Escape') setIsEditingTitle(false);
              }}
              className="px-2 py-0.5 text-xs font-bold bg-white dark:bg-black rounded border border-[#7957F5] text-slate-900 dark:text-white focus:outline-none max-w-28 sm:max-w-48 md:max-w-64"
            />
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="group flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-white hover:text-[#7957F5] transition-colors cursor-pointer truncate max-w-24 sm:max-w-40 md:max-w-60 text-left"
              title="Click to rename document"
            >
              <span className="truncate">{notebookName}</span>
              <Edit3 className="w-2.5 h-2.5 text-slate-400 group-hover:text-[#7957F5] shrink-0 hidden sm:inline" />
            </button>
          )}

          {/* Saved / Unsaved Status Badge */}
          {isSaved ? (
            <div
              className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0"
              title="Saved to Whiteboard History"
            >
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden xs:inline text-[10px]">Saved</span>
            </div>
          ) : (
            <div
              className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0"
              title="Unsaved changes. Click Save to record in Whiteboard History."
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px]">Unsaved</span>
            </div>
          )}
        </div>
      </div>

      {/* Center/Desktop Controls (md:flex) */}
      <div className="hidden md:flex items-center gap-1 sm:gap-1.5">
        <button
          disabled={!canUndo}
          onClick={onUndo}
          className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          disabled={!canRedo}
          onClick={onRedo}
          className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-0.5" />

        {/* Canvas Background Dropdown */}
        <div className="relative" ref={bgMenuRef}>
          <button
            onClick={() => setBgMenuOpen(!bgMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            title="Change Canvas Background"
          >
            <Palette className="w-3.5 h-3.5 text-[#7957F5]" />
            <span className="hidden lg:inline">
              {BACKGROUND_OPTIONS.find((b) => b.id === currentBackground)?.label || 'Paper'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {bgMenuOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-44 bg-white dark:bg-[#1E1E22] rounded-2xl border border-slate-200 dark:border-white/12 shadow-2xl py-1.5 z-50 text-xs animate-in fade-in">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                Paper Background
              </span>
              {BACKGROUND_OPTIONS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => {
                    whiteboardSounds.playTapSound();
                    onChangeBackground(bg.id);
                    setBgMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${
                    currentBackground === bg.id
                      ? 'bg-[#7957F5]/10 text-[#7957F5] font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{bg.label}</span>
                  {currentBackground === bg.id && <Check className="w-3.5 h-3.5 text-[#7957F5]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Explicit Save */}
        <button
          onClick={onSave}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          title="Save to Whiteboard History (Ctrl+S)"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save</span>
        </button>

        {/* Save As (Create a new copy) */}
        <button
          onClick={onSaveAs}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          title="Save as a new copy in History"
        >
          <Copy className="w-3.5 h-3.5 text-[#7957F5]" />
          <span className="hidden lg:inline">Save As</span>
        </button>

        {/* Jump to Saved Whiteboards History */}
        {onNavigateToHistory && (
          <button
            onClick={onNavigateToHistory}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            title="View Saved Whiteboards History"
          >
            <History className="w-3.5 h-3.5 text-[#7957F5]" />
            <span className="hidden xl:inline">History</span>
          </button>
        )}
      </div>

      {/* Right Desktop Controls (md:flex) */}
      <div className="hidden md:flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          onClick={onToggleSound}
          className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 border-transparent'
          }`}
          title={`Audio Sound Effects: ${soundEnabled ? 'ON' : 'OFF'}`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={onToggleDarkMode}
          className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          title="Toggle Dark / Light UI"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7957F5] hover:bg-[#6846E3] active:scale-95 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          title="Export as PNG, JPG, Transparent PNG, SVG, or PDF"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Right Controls: Undo, Redo, Save, More Options (md:hidden) */}
      <div className="flex md:hidden items-center gap-1 shrink-0">
        <button
          disabled={!canUndo}
          onClick={onUndo}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          title="Undo"
          aria-label="Undo"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>

        <button
          disabled={!canRedo}
          onClick={onRedo}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          title="Redo"
          aria-label="Redo"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        {/* 1-Tap Save on Mobile */}
        <button
          onClick={onSave}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          title="Save Board"
          aria-label="Save Board"
        >
          <Save className="w-3.5 h-3.5" />
          <span className="text-[11px]">Save</span>
        </button>

        {/* More Menu Dropdown Toggle on Mobile */}
        <div className="relative" ref={mobileMoreRef}>
          <button
            onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="More Options"
            aria-label="More Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {mobileMoreOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-56 bg-white dark:bg-[#1E1E22] rounded-2xl border border-slate-200 dark:border-white/12 shadow-2xl py-2 z-50 text-xs animate-in fade-in">
              <div className="px-3 py-1 border-b border-slate-100 dark:border-white/10 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Board Actions
                </span>
              </div>

              {/* Save As */}
              <button
                onClick={() => {
                  setMobileMoreOpen(false);
                  onSaveAs();
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <Copy className="w-4 h-4 text-[#7957F5]" />
                <span>Save As New Copy</span>
              </button>

              {/* History */}
              {onNavigateToHistory && (
                <button
                  onClick={() => {
                    setMobileMoreOpen(false);
                    onNavigateToHistory();
                  }}
                  className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  <History className="w-4 h-4 text-[#7957F5]" />
                  <span>Whiteboard History</span>
                </button>
              )}

              {/* Export */}
              <button
                onClick={() => {
                  setMobileMoreOpen(false);
                  onOpenExportModal();
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#7957F5]" />
                <span>Export (PNG / PDF)</span>
              </button>

              <div className="my-1 border-t border-slate-100 dark:border-white/10" />

              {/* Background Options Submenu */}
              <div className="px-3 py-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Paper Background
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 px-2 py-1">
                {BACKGROUND_OPTIONS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => {
                      whiteboardSounds.playTapSound();
                      onChangeBackground(bg.id);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-left text-[11px] truncate flex items-center justify-between ${
                      currentBackground === bg.id
                        ? 'bg-[#7957F5]/10 text-[#7957F5] font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="truncate">{bg.label}</span>
                    {currentBackground === bg.id && <Check className="w-3 h-3 text-[#7957F5] shrink-0" />}
                  </button>
                ))}
              </div>

              <div className="my-1 border-t border-slate-100 dark:border-white/10" />

              {/* Preferences: Sound, Theme, Fullscreen */}
              <div className="flex items-center justify-around px-2 py-1">
                <button
                  onClick={onToggleSound}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex flex-col items-center gap-1 cursor-pointer"
                  title="Audio Sound"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4" />}
                  <span className="text-[9px]">{soundEnabled ? 'Sound ON' : 'Mute'}</span>
                </button>

                <button
                  onClick={onToggleDarkMode}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex flex-col items-center gap-1 cursor-pointer"
                  title="Toggle Theme"
                >
                  {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                  <span className="text-[9px]">{darkMode ? 'Light' : 'Dark'}</span>
                </button>

                <button
                  onClick={onToggleFullscreen}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex flex-col items-center gap-1 cursor-pointer"
                  title="Fullscreen"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4 text-[#7957F5]" /> : <Maximize className="w-4 h-4" />}
                  <span className="text-[9px]">{isFullscreen ? 'Exit FS' : 'Fullscreen'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
