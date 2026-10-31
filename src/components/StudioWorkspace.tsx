import React, { useState, useEffect } from 'react';
import {
  Layers,
  Compass,
  AreaChart,
  Shapes,
  Atom,
  Grid,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
  Sun,
  Moon,
  Globe,
  CheckCircle2,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import { Language, TRANSLATIONS, Translations } from '../i18n/translations.ts';
import { ThreeCanvas3DScroll } from './ThreeCanvas3DScroll.tsx';
import { EquationSolver } from './EquationSolver.tsx';
import { GraphingEngine } from './GraphingEngine.tsx';
import { InteractiveGeometry } from './InteractiveGeometry.tsx';
import { PhysicsVisualizer } from './PhysicsVisualizer.tsx';
import { StemToolkit } from './StemToolkit.tsx';
import { FormulaLibrary } from './FormulaLibrary.tsx';
import { PracticeWorksheet } from './PracticeWorksheet.tsx';
import { SearchModal } from './SearchModal.tsx';
import { AboutModal } from './AboutModal.tsx';

interface StudioWorkspaceProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export interface WorkspaceModule {
  id: string;
  step: string;
  title: string;
  shortTitle: string;
  category: string;
  icon: React.ElementType;
}

const MODULES: WorkspaceModule[] = [
  {
    id: '3d-spatial',
    step: '01',
    title: '3D Coordinate Space & Manifold Visualizer',
    shortTitle: '3D Spatial View',
    category: 'Spatial Geometry',
    icon: Layers,
  },
  {
    id: 'solver',
    step: '02',
    title: 'Equation Solver & Analytical Step Proofs',
    shortTitle: 'Equation Solver',
    category: 'Algebra & Systems',
    icon: Compass,
  },
  {
    id: 'graphing',
    step: '03',
    title: 'Cartesian Coordinate Graphing & Calculus Slopes',
    shortTitle: 'Graphing & Calculus',
    category: 'Functions & Calculus',
    icon: AreaChart,
  },
  {
    id: 'geometry',
    step: '04',
    title: 'Parametric Euclidean Geometry & Mensuration',
    shortTitle: 'Vector Geometry',
    category: 'Mensuration',
    icon: Shapes,
  },
  {
    id: 'physics',
    step: '05',
    title: 'Physics Kinematics & Dynamic Systems',
    shortTitle: 'Physics Simulations',
    category: 'Physics & STEM',
    icon: Atom,
  },
  {
    id: 'stem',
    step: '06',
    title: 'Matrix Algebra, Gaussian Distributions & Land Units',
    shortTitle: 'STEM & Statistics',
    category: 'Linear Algebra & Data',
    icon: Grid,
  },
  {
    id: 'reference',
    step: '07',
    title: 'Formula Library & Interactive Problem Worksheets',
    shortTitle: 'Formulas & Practice',
    category: 'Reference & Quiz',
    icon: BookOpen,
  },
];

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'ja', label: '日本語', flag: 'JA' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'hi', label: 'हिन्दी', flag: 'HI' },
];

export const StudioWorkspace: React.FC<StudioWorkspaceProps> = ({
  darkMode,
  onToggleDarkMode,
  currentLang,
  onSelectLang,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>('3d-spatial');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);

  const t: Translations = TRANSLATIONS[currentLang];

  const currentModuleIndex = MODULES.findIndex((m) => m.id === activeModuleId);
  const currentModule = MODULES[currentModuleIndex] || MODULES[0];

  // Keyboard navigation between sequential steps (Left / Right arrow when not typing)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const goToPrevious = () => {
    if (currentModuleIndex > 0) {
      setActiveModuleId(MODULES[currentModuleIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (currentModuleIndex < MODULES.length - 1) {
      setActiveModuleId(MODULES[currentModuleIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
      {/* 1. Production Top Instrument Bar */}
      <header className="sticky top-0 z-40 h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 select-none">
        {/* Left: Brand & Sequential Workspace Stage Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hidden md:block"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActiveModuleId('3d-spatial');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-left"
          >
            <div className="w-7 h-7 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-mono font-bold text-xs">
              CA
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
              CalcAura
            </span>
          </button>

          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline" aria-hidden="true">/</span>

          {/* Sequential Step Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="text-slate-400">Step {currentModule.step} of 07</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px] lg:max-w-[320px]">
              {currentModule.shortTitle}
            </span>
          </div>
        </div>

        {/* Center: Sequential Stepper Strip for Desktop */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg text-xs font-mono">
          {MODULES.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => setActiveModuleId(mod.id)}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                activeModuleId === mod.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] text-slate-400">{mod.step}</span>
              <span>{mod.shortTitle.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Right: Actions, Language Switcher, Theme & Search */}
        <div className="flex items-center gap-2">
          {/* Global Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs text-slate-500 dark:text-slate-400 transition-colors"
            title="Search Instruments (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-mono">Search ⌘K</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              <span>{currentLang.toUpperCase()}</span>
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 text-xs font-mono animate-in fade-in"
                onClick={() => setLangMenuOpen(false)}
              >
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => onSelectLang(l.code)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      currentLang === l.code ? 'font-bold text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] text-slate-400">{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* About Modal */}
          <button
            onClick={() => setAboutOpen(true)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            title="About CalcAura & HSBJK"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 2. Main Studio Body: Sequential Sidebar + Dedicated Instrument Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sequential Sidebar (Desktop) */}
        <aside
          className={`hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-200 select-none ${
            sidebarCollapsed ? 'w-16' : 'w-64 lg:w-72'
          }`}
        >
          {/* Header inside sidebar */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              {sidebarCollapsed ? 'Step' : 'Sequential Pipeline'}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {currentModuleIndex + 1}/7
            </span>
          </div>

          {/* Sequential Step List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {MODULES.map((mod, index) => {
              const Icon = mod.icon;
              const isActive = activeModuleId === mod.id;
              const isPast = index < currentModuleIndex;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all group ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs shrink-0 transition-colors ${
                      isActive
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                        : isPast
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : mod.step}
                  </div>

                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold truncate text-slate-900 dark:text-slate-100">
                          {mod.shortTitle}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block truncate mt-0.5">
                        {mod.category}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer inside sidebar */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-mono">
            {!sidebarCollapsed ? (
              <div className="flex items-center justify-between">
                <span>HSBJK Engine</span>
                <span className="text-[10px] text-emerald-500 font-medium">Ready</span>
              </div>
            ) : (
              <div className="text-center font-bold">CL</div>
            )}
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex">
            <div className="w-72 bg-white dark:bg-slate-900 h-full p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <span className="font-bold text-sm">Sequential Modules</span>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  {MODULES.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setActiveModuleId(mod.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left text-xs ${
                        activeModuleId === mod.id
                          ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-slate-400">{mod.step}</span>
                      <span>{mod.shortTitle}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                CalcAura · Built by HSBJK
              </div>
            </div>
          </div>
        )}

        {/* Center Primary Stage Area */}
        <main className="flex-1 overflow-y-auto flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
          {/* Active Stage Container */}
          <div className="w-full">
            {/* Sequential Stage Header Strip */}
            <div className="bg-white dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
              <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                    <span>STAGE {currentModule.step}</span>
                    <span aria-hidden="true">/</span>
                    <span>{currentModule.category.toUpperCase()}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {currentModule.title}
                  </h1>
                </div>

                {/* Stage Step Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPrevious}
                    disabled={currentModuleIndex === 0}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={currentModuleIndex === MODULES.length - 1}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Component Canvas */}
            <div className="py-6">
              {activeModuleId === '3d-spatial' && (
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                  <ThreeCanvas3DScroll t={t} />
                  <div className="mt-8">
                    <EquationSolver />
                  </div>
                </div>
              )}

              {activeModuleId === 'solver' && <EquationSolver />}

              {activeModuleId === 'graphing' && <GraphingEngine />}

              {activeModuleId === 'geometry' && <InteractiveGeometry />}

              {activeModuleId === 'physics' && <PhysicsVisualizer />}

              {activeModuleId === 'stem' && <StemToolkit />}

              {activeModuleId === 'reference' && (
                <div className="space-y-12">
                  <FormulaLibrary onNavigateTab={(id) => setActiveModuleId(id === 'calculators' ? 'geometry' : id)} />
                  <PracticeWorksheet />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Execution Status Ledger */}
          <footer className="h-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between text-[11px] font-mono text-slate-500 select-none">
            <div className="flex items-center gap-4">
              <span>Deterministic Kernel</span>
              <span aria-hidden="true">·</span>
              <span>Local Browser Evaluation</span>
              <span aria-hidden="true">·</span>
              <span>KaTeX Engine Active</span>
            </div>
            <div>
              Designed & Built by <strong className="text-slate-800 dark:text-slate-200">HSBJK</strong>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Search and About Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTab={(tabId) => {
          const matched = MODULES.find((m) => m.id === tabId);
          if (matched) setActiveModuleId(matched.id);
          else if (tabId === 'calculators') setActiveModuleId('geometry');
          else setActiveModuleId('3d-spatial');
        }}
      />

      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
};
