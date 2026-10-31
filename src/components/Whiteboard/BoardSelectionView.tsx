import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  FolderOpen,
  Plus,
  Trash2,
  Calendar,
  Layers,
  ArrowLeft,
  Check,
  PenTool,
  Compass,
  Shapes,
  Sigma,
  TrendingUp,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { BoardType, BoardPreset, BackgroundType, Notebook } from './types.ts';
import { BOARD_PRESETS, listAllNotebooks, deleteNotebook } from './storage.ts';
import { whiteboardSounds } from './soundEffects.ts';

interface BoardSelectionViewProps {
  onSelectBoard: (boardType: BoardType, boardName: string, background: BackgroundType) => void;
  onOpenExistingBoard: (notebook: Notebook) => void;
  onExit: () => void;
  darkMode: boolean;
}

// -------------------------------------------------------------
// MINIATURE ANIMATED BOARD PREVIEW COMPONENTS
// -------------------------------------------------------------

const SimpleBoardPreview: React.FC = () => {
  return (
    <div className="w-full h-28 rounded-xl bg-white dark:bg-[#18181B] border border-slate-200 dark:border-white/10 relative overflow-hidden flex items-center justify-center">
      {/* Animated drawing line */}
      <svg className="w-full h-full" viewBox="0 0 240 100">
        <path
          d="M 20 60 Q 60 20, 110 50 T 210 40"
          fill="none"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="280"
          strokeDashoffset="280"
          className="animate-[dash_3s_ease-in-out_infinite]"
        />
        {/* Animated pencil icon moving along the stroke */}
        <circle cx="205" cy="42" r="4" fill="#10B981" className="animate-ping" />
      </svg>
      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Pristine Blank Canvas
      </div>
    </div>
  );
};

const JuniorBoardPreview: React.FC = () => {
  return (
    <div className="w-full h-28 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50/50 dark:from-pink-950/20 dark:to-rose-950/10 border border-pink-200/60 dark:border-pink-800/20 relative overflow-hidden flex flex-col items-center justify-center p-2">
      {/* 3 Groups of 4 Apples animation preview */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((grp) => (
          <div
            key={grp}
            className="px-1.5 py-1 rounded-lg border border-dashed border-pink-400/50 bg-white/60 dark:bg-black/30 flex gap-0.5 items-center transition-all hover:scale-105"
          >
            <span className="text-sm animate-bounce" style={{ animationDelay: `${grp * 150}ms` }}>🍎</span>
            <span className="text-sm animate-bounce" style={{ animationDelay: `${grp * 150 + 50}ms` }}>🍎</span>
            <span className="text-sm animate-bounce" style={{ animationDelay: `${grp * 150 + 100}ms` }}>🍎</span>
            <span className="text-sm animate-bounce" style={{ animationDelay: `${grp * 150 + 150}ms` }}>🍎</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[11px] font-bold text-pink-600 dark:text-pink-300 font-mono">
        3 groups × 4 = 12 apples
      </div>
    </div>
  );
};

const SchoolBoardPreview: React.FC = () => {
  return (
    <div className="w-full h-28 rounded-xl bg-slate-900/90 dark:bg-[#12131F] border border-purple-500/20 relative overflow-hidden flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8B5CF6_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF6_1px,transparent_1px)] bg-[size:16px_16px]" />
      <svg className="w-full h-full relative z-10" viewBox="0 0 240 100">
        {/* Axes */}
        <line x1="20" y1="50" x2="220" y2="50" stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="120" y1="10" x2="120" y2="90" stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" />
        {/* Sine Wave */}
        <path
          d="M 20 50 Q 50 15, 80 50 T 140 50 T 200 50"
          fill="none"
          stroke="#A855F7"
          strokeWidth="2.5"
          className="animate-[pulse_2s_ease-in-out_infinite]"
        />
        {/* Tangent slope indicator */}
        <line x1="60" y1="20" x2="100" y2="80" stroke="#38BDF8" strokeWidth="1.5" />
      </svg>
      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-purple-500/20 text-[9px] font-mono text-purple-300">
        f(x) = sin x
      </div>
    </div>
  );
};

const SecondaryBoardPreview: React.FC = () => {
  return (
    <div className="w-full h-28 rounded-xl bg-[#0F172A] border border-blue-500/20 relative overflow-hidden flex flex-col justify-center px-4">
      <div className="text-[11px] font-mono font-bold text-blue-400">
        ax² + bx + c = 0
      </div>
      <div className="text-xs font-serif italic text-cyan-200 mt-1">
        x = (-b ± √(b² - 4ac)) / 2a
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
          ∫ sin(x) dx = -cos(x) + C
        </span>
      </div>
    </div>
  );
};

const EngineeringBoardPreview: React.FC = () => {
  return (
    <div className="w-full h-28 rounded-xl bg-[#13111C] border border-amber-500/20 relative overflow-hidden flex items-center justify-between px-4">
      {/* 3D Coordinate Axis Icon */}
      <svg className="w-20 h-20" viewBox="0 0 100 100">
        <line x1="50" y1="50" x2="90" y2="50" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="50" y1="50" x2="50" y2="10" stroke="#10B981" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="80" stroke="#6366F1" strokeWidth="2" />
        <circle cx="50" cy="50" r="3" fill="#FFF" />
      </svg>
      {/* Matrix Vector Preview */}
      <div className="font-mono text-[10px] text-amber-300 leading-tight">
        <div>[ a₁₁  a₁₂ ]</div>
        <div>[ a₂₁  a₂₂ ]</div>
        <div className="text-xs text-amber-400 font-bold mt-1">v⃗ = xî + yĵ + zk̂</div>
      </div>
    </div>
  );
};

const GeometryBoardPreview: React.FC = () => {
  return (
    <div className="w-full h-28 rounded-xl bg-[#0D1520] border border-cyan-500/20 relative overflow-hidden flex items-center justify-center">
      <svg className="w-32 h-24" viewBox="0 0 120 90">
        {/* Dynamic Construction Triangle */}
        <polygon
          points="60,15 105,75 15,75"
          fill="rgba(6, 182, 212, 0.15)"
          stroke="#06B6D4"
          strokeWidth="2"
        />
        {/* Circle circumscribed */}
        <circle cx="60" cy="55" r="32" fill="none" stroke="#818CF8" strokeWidth="1" strokeDasharray="3 3" />
        {/* Angle arc */}
        <path d="M 50 65 A 12 12 0 0 0 70 65" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
      </svg>
      <div className="absolute bottom-2 right-3 text-[9px] font-mono text-cyan-300 font-semibold">
        A = ½·b·h
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// MASTER BOARD SELECTION VIEW
// -------------------------------------------------------------

export const BoardSelectionView: React.FC<BoardSelectionViewProps> = ({
  onSelectBoard,
  onOpenExistingBoard,
  onExit,
  darkMode,
}) => {
  const [selectedType, setSelectedType] = useState<BoardType>('simple');
  const [boardName, setBoardName] = useState<string>('My Drawing');
  const [selectedBg, setSelectedBg] = useState<BackgroundType>('plain-white');
  const [recentNotebooks, setRecentNotebooks] = useState<Notebook[]>([]);
  const [validationError, setValidationError] = useState<string>('');
  const [isLaunching, setIsLaunching] = useState<boolean>(false);

  // Load existing saved notebooks for the "Recent Boards" list
  useEffect(() => {
    listAllNotebooks().then((list) => {
      setRecentNotebooks(list);
    });
  }, []);

  // Update default name and background when user selects another board preset
  const handlePresetClick = (preset: BoardPreset) => {
    whiteboardSounds.playTapSound();
    setSelectedType(preset.id);
    setBoardName(preset.defaultName);
    setSelectedBg(preset.defaultBackground);
    setValidationError('');
  };

  const handleCreateBoard = () => {
    if (!boardName.trim()) {
      setValidationError('Please enter a name for your board.');
      return;
    }

    whiteboardSounds.playTapSound();
    setIsLaunching(true);

    setTimeout(() => {
      onSelectBoard(selectedType, boardName.trim(), selectedBg);
    }, 280);
  };

  const handleDeleteRecent = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this saved board permanently?')) {
      await deleteNotebook(id);
      setRecentNotebooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const activePreset = BOARD_PRESETS.find((p) => p.id === selectedType) || BOARD_PRESETS[0];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col w-screen h-screen overflow-y-auto ${
        darkMode ? 'dark bg-[#0B0D17] text-[#F3F4F6]' : 'bg-slate-50 text-slate-900'
      } transition-opacity duration-300 ${isLaunching ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}
    >
      {/* Background ambient radial glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-purple-600/15 via-indigo-600/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[400px] bg-pink-500/10 blur-3xl rounded-full" />
      </div>

      {/* Top Header Row */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between shrink-0">
        {/* Back to Website */}
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to CalcAura</span>
        </button>

        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7957F5] to-[#D94BCB] flex items-center justify-center text-white font-mono font-bold text-sm shadow-md">
            <span>∑</span>
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              CalcAura Whiteboard
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
              Workspace Creator
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col justify-start">
        {/* Main Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            What would you like to create?
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Choose your workspace. Start drawing, explore mathematics, or work through your next problem.
          </p>
        </div>

        {/* 6 Board Preset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {BOARD_PRESETS.map((preset, idx) => {
            const isSelected = selectedType === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handlePresetClick(preset)}
                className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white dark:bg-[#151726] border-[#7957F5] shadow-[0_0_24px_rgba(121,87,245,0.25)] ring-2 ring-[#7957F5]/40 -translate-y-1'
                    : 'bg-white/80 dark:bg-[#12131F]/70 hover:bg-white dark:hover:bg-[#16182B] border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:-translate-y-0.5 shadow-xs'
                }`}
              >
                <div>
                  {/* Top row: Badge and selection indicator */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${preset.accentColor}20`,
                        color: preset.accentColor,
                        border: `1px solid ${preset.accentColor}40`,
                      }}
                    >
                      {preset.badge}
                    </span>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#7957F5] text-white'
                          : 'border border-slate-300 dark:border-white/20 group-hover:border-slate-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#7957F5] dark:group-hover:text-purple-300 transition-colors">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {preset.subtitle}
                  </p>

                  {/* Animated Miniature Preview */}
                  <div className="mt-3 mb-3">
                    {preset.id === 'simple' && <SimpleBoardPreview />}
                    {preset.id === 'junior' && <JuniorBoardPreview />}
                    {preset.id === 'school' && <SchoolBoardPreview />}
                    {preset.id === 'secondary' && <SecondaryBoardPreview />}
                    {preset.id === 'engineering' && <EngineeringBoardPreview />}
                    {preset.id === 'geometry' && <GeometryBoardPreview />}
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {preset.description}
                  </p>
                </div>

                {/* Bottom tag: Suitable tools list */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-1">
                  {preset.suitableTools.map((tool: string) => (
                    <span
                      key={tool}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Board Configuration & Launch Row */}
        <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#141624] border border-slate-200 dark:border-white/12 shadow-xl mb-10 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Board Name input & Paper background choice */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Board Document Name
                </label>
                <div className="relative max-w-md">
                  <input
                    type="text"
                    value={boardName}
                    onChange={(e) => {
                      setBoardName(e.target.value);
                      if (e.target.value.trim()) setValidationError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateBoard();
                    }}
                    placeholder="Enter board name..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0D17] border border-slate-300 dark:border-white/15 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7957F5] focus:border-transparent transition-all"
                  />
                  {validationError && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{validationError}</p>
                  )}
                </div>
              </div>

              {/* Initial Paper Surface */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Canvas Paper Surface
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'plain-white', label: 'Plain White' },
                    { id: 'plain-dark', label: 'Plain Dark' },
                    { id: 'plain-transparent', label: 'Transparent' },
                    { id: 'ruled', label: 'Ruled Paper' },
                    { id: 'grid', label: 'Square Grid' },
                    { id: 'coordinate', label: 'Coordinate Graph' },
                    { id: 'isometric', label: 'Isometric 3D' },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => {
                        whiteboardSounds.playTapSound();
                        setSelectedBg(bg.id as BackgroundType);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        selectedBg === bg.id
                          ? 'bg-[#7957F5] text-white border-[#7957F5] shadow-xs'
                          : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Prominent "Create Board" CTA */}
            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleCreateBoard}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#7957F5] via-[#9055F6] to-[#D94BCB] hover:brightness-110 active:scale-98 text-white text-sm font-bold shadow-[0_8px_25px_rgba(121,87,245,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Create {activePreset.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Saved Boards Section (if any exist) */}
        {recentNotebooks.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen className="w-4 h-4 text-[#7957F5]" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Continue with Saved Boards
              </h2>
              <span className="text-xs font-mono text-slate-400">
                ({recentNotebooks.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recentNotebooks.map((nb) => (
                <div
                  key={nb.id}
                  onClick={() => {
                    whiteboardSounds.playTapSound();
                    onOpenExistingBoard(nb);
                  }}
                  className="group relative p-3.5 rounded-xl bg-white/70 dark:bg-[#12131F]/80 hover:bg-white dark:hover:bg-[#181928] border border-slate-200 dark:border-white/10 hover:border-[#7957F5] transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#7957F5] truncate transition-colors">
                        {nb.name}
                      </h4>
                      {nb.boardType && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-600 dark:text-purple-300 shrink-0">
                          {nb.boardType}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {nb.sheets?.length || 1} {nb.sheets?.length === 1 ? 'sheet' : 'sheets'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(nb.updatedAt || nb.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDeleteRecent(e, nb.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete saved board"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#7957F5] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
