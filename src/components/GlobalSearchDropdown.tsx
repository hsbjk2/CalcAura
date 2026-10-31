import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Compass,
  AreaChart,
  Shapes,
  Sparkles,
  GraduationCap,
  BookOpen,
  Calculator,
  Layers,
  Atom,
  TrendingUp,
  Clock,
  ArrowRight,
  Landmark,
  Cpu,
  Sigma,
  Table as TableIcon,
  PenTool
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.tsx';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  meta: string;
  category: 'popular' | 'education' | 'formulas';
  tabId: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  keywords: string[];
}

const SEARCH_REGISTRY: SearchItem[] = [
  // --- POPULAR TOOLS ---
  {
    id: 'tool-basic-calculator',
    title: 'Basic Calculator',
    description: 'Everyday calculations, arithmetic, percentages and quick numerical operations',
    meta: 'Basic Arithmetic',
    category: 'popular',
    tabId: 'basic-calculator',
    icon: Calculator,
    iconBg: 'bg-[#7957F5]/10 dark:bg-[#7957F5]/20',
    iconColor: 'text-[#7957F5] dark:text-[#A78BFA]',
    keywords: ['basic calculator', 'calculator', 'arithmetic', 'add', 'subtract', 'multiply', 'divide', 'percentage', 'math', 'simple calculator', 'phone calculator'],
  },
  {
    id: 'tool-whiteboard',
    title: 'CalcAura Whiteboard Workspace',
    description: 'Interactive mathematical whiteboard with plain canvas, multi-sheets, KaTeX formulas, and drawing tools',
    meta: 'Whiteboard',
    category: 'popular',
    tabId: 'whiteboard',
    icon: PenTool,
    iconBg: 'bg-teal-500/10 dark:bg-teal-500/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
    keywords: ['whiteboard', 'canvas', 'draw', 'drawing', 'sketch', 'sheet', 'sheets', 'katex', 'math', 'scratchpad', 'board', 'paint'],
  },
  {
    id: 'tool-solver',
    title: 'Scientific & Quadratic Equation Solver',
    description: 'Solve polynomial equations, linear systems, and roots with verified steps',
    meta: 'Algebra',
    category: 'popular',
    tabId: 'solver',
    icon: Compass,
    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    keywords: ['equation', 'solve', 'quadratic', 'roots', 'algebra', 'linear', 'discriminant', 'polynomial', 'proof'],
  },
  {
    id: 'tool-graphing',
    title: 'Real-Time Graphing & Calculus Engine',
    description: 'Plot continuous functions, tangent lines at x₀, derivatives, and shaded integrals',
    meta: 'Calculus',
    category: 'popular',
    tabId: 'graphing',
    icon: AreaChart,
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    keywords: ['graph', 'plot', 'calculus', 'tangent', 'derivative', 'integral', 'function', 'curve', 'slope'],
  },
  {
    id: 'tool-geometry',
    title: 'Interactive Geometry & Mensuration',
    description: 'Explore circles, triangles, cylinders, cones, and real-time perimeter formulas',
    meta: 'Geometry',
    category: 'popular',
    tabId: 'geometry',
    icon: Shapes,
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    keywords: ['geometry', 'area', 'perimeter', 'volume', 'circle', 'triangle', 'cylinder', 'sphere', 'cone', 'shape'],
  },
  {
    id: 'tool-playground',
    title: 'Math Playground: Toy Balance Scale',
    description: 'Balance equation beams using teddy bears, apples, and interactive 3D wave meshes',
    meta: 'Toy Lab',
    category: 'popular',
    tabId: 'playground',
    icon: Sparkles,
    iconBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/20',
    iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
    keywords: ['playground', 'toy', 'balance', 'scale', 'teddy', 'apple', 'interactive', 'stem', 'wave', '3d'],
  },
  {
    id: 'tool-physics',
    title: 'Physics & STEM Simulations',
    description: 'Kinematics projectile paths, harmonic pendulums, and Ohm circuit simulations',
    meta: 'Physics',
    category: 'popular',
    tabId: 'physics',
    icon: Atom,
    iconBg: 'bg-sky-500/10 dark:bg-sky-500/20',
    iconColor: 'text-sky-600 dark:text-sky-400',
    keywords: ['physics', 'projectile', 'kinematics', 'gravity', 'pendulum', 'circuits', 'ohm', 'simulation'],
  },
  {
    id: 'tool-tables',
    title: 'Multiplication Tables 1–30 Studio',
    description: 'Master times tables up to 30 with interactive pronunciation, flashcards, and quizzes',
    meta: 'Arithmetic',
    category: 'popular',
    tabId: 'multiplication-tables',
    icon: TableIcon,
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    keywords: ['tables', 'multiplication', 'times', '1 to 30', 'arithmetic', 'quizzes', 'flashcards', 'pahaade'],
  },

  // --- LEARNING & EDUCATION ---
  {
    id: 'edu-classes1-5',
    title: 'Classes 1–5: Little Steps, Big Discoveries',
    description: 'Playful early-math playground with animals, flowers, toys, and foundation chapters',
    meta: 'Classes 1–5',
    category: 'education',
    tabId: 'classes1-5',
    icon: Sparkles,
    iconBg: 'bg-pink-500/10 dark:bg-pink-500/20',
    iconColor: 'text-pink-600 dark:text-pink-400',
    keywords: ['kids', 'class 1', 'class 2', 'class 3', 'class 4', 'class 5', 'shapes', 'counting', 'toys', 'animals', 'foundation'],
  },
  {
    id: 'edu-class6',
    title: 'Class 6 — Mathematics Explorer',
    description: 'Patterns, Lines & Angles, Number Play, Data Handling, Primes, Fractions, Symmetry, and Integers',
    meta: 'Class 6',
    category: 'education',
    tabId: 'curriculum',
    icon: Compass,
    iconBg: 'bg-teal-500/10 dark:bg-teal-500/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
    keywords: ['class 6', 'grade 6', 'sixth', 'patterns', 'lines and angles', 'prime time', 'fractions', 'symmetry', 'integers'],
  },
  {
    id: 'edu-class7',
    title: 'Class 7 — Intermediate Mathematics',
    category: 'education',
    description: 'Large numbers, arithmetic expressions, decimals, integers, algebra, parallel lines, triangles, congruence, tilings, and fractions',
    meta: 'Class 7',
    tabId: 'curriculum',
    icon: Layers,
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    keywords: ['class 7', 'grade 7', 'seventh', 'algebra', 'linear equations', 'parallel lines', 'congruence', 'triangles', 'fractions'],
  },
  {
    id: 'edu-class8',
    title: 'Class 8 — Advanced Middle-School Mathematics',
    category: 'education',
    description: 'Squares and cubes, powers, quadrilaterals, distributive laws, proportions, Baudhayana-Pythagoras theorem, factorisation, and area',
    meta: 'Class 8',
    tabId: 'curriculum',
    icon: Sparkles,
    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    keywords: ['class 8', 'grade 8', 'eighth', 'squares', 'cubes', 'powers', 'exponents', 'pythagoras', 'quadrilaterals', 'factorisation', 'area'],
  },
  {
    id: 'edu-class9',
    title: 'Class 9 — Secondary Mathematics Foundations',
    category: 'education',
    description: 'Coordinates, linear polynomials, real numbers, algebraic identities, circle geometry, Heron area, probability, and sequences',
    meta: 'Class 9',
    tabId: 'curriculum',
    icon: BookOpen,
    iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    keywords: ['class 9', 'grade 9', 'ninth', 'coordinates', 'polynomials', 'real numbers', 'identities', 'circles', 'heron', 'probability', 'sequences'],
  },
  {
    id: 'edu-class10',
    title: 'Class 10 Secondary Mathematics',
    description: 'Secondary mathematics curriculum: Quadratic equations, AP, Coordinate geometry, Trigonometry',
    meta: 'Class 10',
    category: 'education',
    tabId: 'class10',
    icon: GraduationCap,
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    keywords: ['class 10', 'tenth', 'secondary', 'trigonometry', 'real numbers', 'polynomials', 'circles', 'triangles'],
  },
  {
    id: 'edu-class12',
    title: 'Class 12 Higher Secondary Mathematics',
    description: 'Matrices, Determinants, Differential Equations, Integrals, Vectors, and 3D Geometry',
    meta: 'Class 12',
    category: 'education',
    tabId: 'class12',
    icon: BookOpen,
    iconBg: 'bg-violet-500/10 dark:bg-violet-500/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
    keywords: ['class 12', 'twelfth', 'matrices', 'determinants', 'calculus', 'derivatives', 'integrals', 'vectors', '3d geometry'],
  },
  {
    id: 'edu-engineering',
    title: 'Engineering Mathematics & Computing',
    description: 'Diploma and B.Tech STEM tools: Multivariable calculus, eigenvalues, and matrices',
    meta: 'Engineering',
    category: 'education',
    tabId: 'stage-engineering',
    icon: Cpu,
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    keywords: ['engineering', 'btech', 'diploma', 'eigenvalues', 'matrix', 'laplace', 'fourier', 'numerical'],
  },
  {
    id: 'edu-graduation',
    title: 'Graduation Mathematics & Higher Analysis',
    description: 'Undergraduate B.Sc. mathematical analysis, linear systems, and vector calculus',
    meta: 'Graduation',
    category: 'education',
    tabId: 'stage-graduation',
    icon: Landmark,
    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    keywords: ['graduation', 'bsc', 'analysis', 'undergraduate', 'advanced math', 'higher mathematics', 'vector calculus'],
  },
  {
    id: 'edu-curriculum-hub',
    title: 'School Mathematics Learning Hub',
    description: 'Structured class-wise curriculum and mathematics topic directory',
    meta: 'Curriculum',
    category: 'education',
    tabId: 'curriculum',
    icon: Layers,
    iconBg: 'bg-teal-500/10 dark:bg-teal-500/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
    keywords: ['curriculum', 'learning', 'classes', 'grades', 'chapters', 'mathematics'],
  },

  // --- FORMULAS & TOPICS ---
  {
    id: 'form-quadratic',
    title: 'Quadratic Formula & Discriminant',
    description: 'Roots of ax² + bx + c = 0 via (-b ± √(b² - 4ac)) / (2a)',
    meta: 'Algebra',
    category: 'formulas',
    tabId: 'solver',
    icon: Sigma,
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    keywords: ['formula', 'quadratic formula', 'roots', 'discriminant', 'algebra', 'roots of quadratic'],
  },
  {
    id: 'form-pythagoras',
    title: 'Pythagorean Theorem: a² + b² = c²',
    description: 'Fundamental relationship among the three sides of a right-angled triangle',
    meta: 'Geometry',
    category: 'formulas',
    tabId: 'geometry',
    icon: Shapes,
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    keywords: ['pythagoras', 'pythagorean', 'hypotenuse', 'right triangle', 'formula', 'theorem'],
  },
  {
    id: 'form-derivatives',
    title: 'Calculus Derivative Rules & Slopes',
    description: 'Power rule, product rule, quotient rule, and instantaneous rates of change',
    meta: 'Calculus',
    category: 'formulas',
    tabId: 'stage-07',
    icon: AreaChart,
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
    keywords: ['derivative', 'power rule', 'quotient rule', 'chain rule', 'differentiation', 'slope', 'rate'],
  },
  {
    id: 'form-matrices',
    title: 'Matrix Determinants & Inverse A⁻¹',
    description: '2x2 and 3x3 matrix algebra, determinant det(A), and Cramer rule solving',
    meta: 'Linear Algebra',
    category: 'formulas',
    tabId: 'stem',
    icon: Layers,
    iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    keywords: ['matrix', 'determinant', 'inverse', 'cramer', 'linear algebra', 'multiplication', 'identity'],
  },
];

interface GlobalSearchDropdownProps {
  onSelectTab: (tabId: string) => void;
  darkMode?: boolean;
}

export const GlobalSearchDropdown: React.FC<GlobalSearchDropdownProps> = ({
  onSelectTab,
  darkMode = false,
}) => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [recentSearchIds, setRecentSearchIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('calcaura_recent_searches');
      return stored ? JSON.parse(stored) : ['tool-solver', 'tool-graphing', 'edu-classes1-5'];
    } catch {
      return ['tool-solver', 'tool-graphing', 'edu-classes1-5'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (window.innerWidth < 640) {
          mobileInputRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered results based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return SEARCH_REGISTRY.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.meta.toLowerCase().includes(q) ||
        item.keywords.some((kw) => kw.toLowerCase().includes(q))
      );
    });
  }, [query]);

  // Items to display: either filtered results, or grouped defaults + recents
  const recentItems = useMemo(() => {
    return recentSearchIds
      .map((id) => SEARCH_REGISTRY.find((item) => item.id === id))
      .filter((item): item is SearchItem => Boolean(item))
      .slice(0, 3);
  }, [recentSearchIds]);

  const popularItems = useMemo(() => {
    return SEARCH_REGISTRY.filter((item) => item.category === 'popular').slice(0, 4);
  }, []);

  const educationItems = useMemo(() => {
    return SEARCH_REGISTRY.filter((item) => item.category === 'education').slice(0, 3);
  }, []);

  const formulaItems = useMemo(() => {
    return SEARCH_REGISTRY.filter((item) => item.category === 'formulas').slice(0, 3);
  }, []);

  // Total visible item list for arrow key navigation
  const navigableList = useMemo(() => {
    if (query.trim()) {
      return filteredItems;
    }
    return [...recentItems, ...popularItems, ...educationItems, ...formulaItems];
  }, [query, filteredItems, recentItems, popularItems, educationItems, formulaItems]);

  // Handle arrow key navigation and Enter selection
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, navigableList.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + navigableList.length) % Math.max(1, navigableList.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = navigableList[selectedIndex];
      if (target) {
        handleSelectItem(target);
      }
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    // Add to recent searches
    const updatedRecents = [item.id, ...recentSearchIds.filter((id) => id !== item.id)].slice(0, 5);
    setRecentSearchIds(updatedRecents);
    try {
      localStorage.setItem('calcaura_recent_searches', JSON.stringify(updatedRecents));
    } catch {}

    onSelectTab(item.tabId);
    setIsOpen(false);
    setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearRecents = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearchIds([]);
    try {
      localStorage.removeItem('calcaura_recent_searches');
    } catch {}
  };

  // Helper to render matched highlight
  const renderHighlighted = (text: string, highlightQuery: string) => {
    if (!highlightQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${highlightQuery.trim()})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlightQuery.trim().toLowerCase() ? (
        <span key={i} className="text-[#7957F5] dark:text-[#D94BCB] font-bold bg-[#7957F5]/10 dark:bg-white/10 rounded px-0.5">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} className="relative z-50">
      {/* ==============================================================
          1. COMPACT SEARCH BAR INPUT
          Modern, refined input with subtle border and shortcut hint
      ============================================================== */}
      {/* Mobile Search Icon Button (< sm) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="sm:hidden p-2 rounded-xl text-slate-700 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] transition-colors cursor-pointer shrink-0 flex items-center justify-center"
        title="Search calculators & formulas (⌘K)"
        aria-label="Search calculators & formulas"
      >
        <Search className="w-4 h-4 text-slate-700 dark:text-[#A6A9B8]" />
      </button>

      {/* Desktop/Tablet Search Input (>= sm) */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl transition-all duration-200 cursor-text ${
          isOpen
            ? 'w-48 md:w-56 lg:w-64 bg-white dark:bg-[#181818] border border-[#7957F5]/60 dark:border-white/20 shadow-md ring-2 ring-[#7957F5]/20'
            : 'w-36 md:w-48 lg:w-56 bg-slate-100 hover:bg-slate-200/80 dark:bg-[#181818] dark:hover:bg-[#202022] border border-slate-200 dark:border-white/10 shadow-xs'
        }`}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <Search className="w-3.5 h-3.5 text-slate-400 dark:text-[#8E8E93] shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder={t.searchPlaceholder || 'Search calculators, formulas and topics…'}
          className="w-full bg-transparent text-xs text-slate-900 dark:text-[#F2F2F7] placeholder:text-slate-400 dark:placeholder:text-[#8E8E93] focus:outline-none truncate"
        />

        {query ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuery('');
              inputRef.current?.focus();
            }}
            className="p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-white/[0.08] text-[10px] font-mono text-slate-500 dark:text-[#8E8E93] shrink-0 pointer-events-none">
            <span>⌘K</span>
          </div>
        )}
      </div>

      {/* ==============================================================
          2. FLOATING SEARCH DROPDOWN PANEL
          Dark charcoal surface (#181818), subtle border, restrained shadow,
          compact two-level rows, right-aligned metadata tags
      ============================================================== */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="fixed inset-x-3 top-16 sm:absolute sm:inset-auto sm:right-0 sm:mt-2 w-auto sm:w-[440px] md:w-[480px] max-h-[80vh] sm:max-h-[480px] overflow-y-auto thin-scrollbar rounded-2xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          style={{
            transformOrigin: 'top right',
          }}
        >
          {/* Mobile In-Panel Search Field */}
          <div className="sm:hidden flex items-center gap-2 p-2 border-b border-slate-200 dark:border-white/10 mb-2">
            <Search className="w-4 h-4 text-[#7957F5] shrink-0" />
            <input
              ref={mobileInputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder={t.searchPlaceholder || 'Search calculators, formulas and topics…'}
              className="w-full bg-transparent text-xs text-slate-900 dark:text-[#F2F2F7] placeholder:text-slate-400 focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  mobileInputRef.current?.focus();
                }}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-[#7957F5] dark:text-[#D94BCB] px-1"
              >
                Done
              </button>
            )}
          </div>
          {query.trim() ? (
            /* --- FILTERED SEARCH RESULTS --- */
            <div>
              {filteredItems.length === 0 ? (
                <div className="py-10 px-4 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
                    <Search className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t.searchNoResults || 'No matching calculators, formulas or topics found.'}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Try searching &quot;quadratic&quot;, &quot;class 10&quot;, &quot;graphing&quot;, or &quot;tables&quot;.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-[#8E8E93] uppercase tracking-wider">
                    Results ({filteredItems.length})
                  </div>
                  {filteredItems.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-100 dark:bg-[#222224]'
                            : 'hover:bg-slate-50 dark:hover:bg-[#1E1E20]'
                        }`}
                      >
                        {/* Left Icon + Text */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-[#F2F2F7] truncate">
                              {renderHighlighted(item.title, query)}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-[#8E8E93] truncate">
                              {renderHighlighted(item.description, query)}
                            </p>
                          </div>
                        </div>

                        {/* Right-aligned metadata */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#A6A9B8] border border-slate-200/60 dark:border-white/[0.06]">
                            {item.meta}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-[#555] group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* --- DEFAULT GROUPED SECTIONS (Popular Tools, Learning & Education, Formulas, Recents) --- */
            <div className="space-y-3">
              {/* SECTION 1: RECENT SEARCHES */}
              {recentItems.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-[#8E8E93] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#7957F5]" />
                      <span>{t.searchRecentSearches || 'Recent Searches'}</span>
                    </span>
                    <button
                      onClick={handleClearRecents}
                      className="text-[10px] font-normal text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      {t.searchClear || 'Clear'}
                    </button>
                  </div>
                  <div className="space-y-0.5">
                    {recentItems.map((item, idx) => {
                      const isSelected = selectedIndex === idx;
                      const Icon = item.icon;

                      return (
                        <div
                          key={`recent-${item.id}`}
                          onClick={() => handleSelectItem(item)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`group flex items-center justify-between gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-slate-100 dark:bg-[#222224]'
                              : 'hover:bg-slate-50 dark:hover:bg-[#1E1E20]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-semibold text-slate-800 dark:text-[#F2F2F7] block truncate">
                                {item.title}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-[#8E8E93] block truncate">
                                {item.description}
                              </span>
                            </div>
                          </div>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500 dark:text-[#A6A9B8] bg-slate-100 dark:bg-white/[0.04]">
                            {item.meta}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 2: POPULAR TOOLS */}
              <div>
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-[#7957F5]" />
                  <span>{t.searchPopularTools || 'Popular Tools'}</span>
                </div>
                <div className="space-y-0.5">
                  {popularItems.map((item, idx) => {
                    const globalIdx = recentItems.length + idx;
                    const isSelected = selectedIndex === globalIdx;
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`group flex items-center justify-between gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-100 dark:bg-[#222224]'
                            : 'hover:bg-slate-50 dark:hover:bg-[#1E1E20]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-8 h-8 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-slate-800 dark:text-[#F2F2F7] block truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-[#8E8E93] block truncate">
                              {item.description}
                            </span>
                          </div>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500 dark:text-[#A6A9B8] bg-slate-100 dark:bg-white/[0.04]">
                          {item.meta}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: LEARNING & EDUCATION */}
              <div>
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3 h-3 text-purple-500" />
                  <span>{t.searchLearningEducation || 'Learning & Education'}</span>
                </div>
                <div className="space-y-0.5">
                  {educationItems.map((item, idx) => {
                    const globalIdx = recentItems.length + popularItems.length + idx;
                    const isSelected = selectedIndex === globalIdx;
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`group flex items-center justify-between gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-100 dark:bg-[#222224]'
                            : 'hover:bg-slate-50 dark:hover:bg-[#1E1E20]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-8 h-8 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-slate-800 dark:text-[#F2F2F7] block truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-[#8E8E93] block truncate">
                              {item.description}
                            </span>
                          </div>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500 dark:text-[#A6A9B8] bg-slate-100 dark:bg-white/[0.04]">
                          {item.meta}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4: FORMULAS & TOPICS */}
              <div>
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
                  <Sigma className="w-3 h-3 text-amber-500" />
                  <span>{t.searchFormulasTopics || 'Formulas & Topics'}</span>
                </div>
                <div className="space-y-0.5">
                  {formulaItems.map((item, idx) => {
                    const globalIdx = recentItems.length + popularItems.length + educationItems.length + idx;
                    const isSelected = selectedIndex === globalIdx;
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`group flex items-center justify-between gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-100 dark:bg-[#222224]'
                            : 'hover:bg-slate-50 dark:hover:bg-[#1E1E20]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-8 h-8 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-slate-800 dark:text-[#F2F2F7] block truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-[#8E8E93] block truncate">
                              {item.description}
                            </span>
                          </div>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500 dark:text-[#A6A9B8] bg-slate-100 dark:bg-white/[0.04]">
                          {item.meta}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Minimal Key Guide Footer */}
          <div className="mt-2 pt-2 px-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400 dark:text-[#8E8E93]">
            <span className="flex items-center gap-1">
              <span className="px-1 py-0.2 rounded bg-slate-100 dark:bg-white/10 font-mono">↑↓</span> to navigate
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1 py-0.2 rounded bg-slate-100 dark:bg-white/10 font-mono">↵</span> to select
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1 py-0.2 rounded bg-slate-100 dark:bg-white/10 font-mono">ESC</span> to dismiss
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
