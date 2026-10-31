import React, { useState, useEffect, useRef } from 'react';
import { Search, Calculator, BookOpen, Compass, AreaChart, X, GraduationCap, Shapes } from 'lucide-react';
import { Translations, TRANSLATIONS } from '../i18n/translations.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
  t?: Translations;
}

interface SearchEntry {
  title: string;
  category: string;
  tabId: string;
  description: string;
  icon: React.ElementType;
}

const GLOBAL_SEARCH_ENTRIES: SearchEntry[] = [
  {
    title: 'Basic Calculator',
    category: 'Basic Arithmetic',
    tabId: 'basic-calculator',
    description: 'Everyday calculations, arithmetic, percentages and quick numerical operations.',
    icon: Calculator,
  },
  {
    title: 'School Mathematics Curriculum (Class 10 & 12)',
    category: 'Curriculum & Syllabus',
    tabId: 'curriculum',
    description: 'Complete secondary and higher secondary syllabus with 27 verified chapters, formula parameter solvers, and proofs.',
    icon: GraduationCap,
  },
  {
    title: 'Class 10 Mathematics Curriculum',
    category: 'Secondary Curriculum',
    tabId: 'class10',
    description: 'Real Numbers, Polynomials, Linear Systems, Quadratic Equations, Triangles, Trigonometry, and Mensuration.',
    icon: GraduationCap,
  },
  {
    title: 'Class 12 Mathematics Curriculum',
    category: 'Senior Curriculum',
    tabId: 'class12',
    description: 'Relations & Functions, Inverse Trig, Matrices, Determinants, Calculus Derivatives & Integrals, Vectors, and 3D Geometry.',
    icon: BookOpen,
  },
  {
    title: 'Scientific & Quadratic Equation Solver',
    category: 'Algebra',
    tabId: 'solver',
    description: 'Solve quadratic, linear systems with real/complex roots and step-by-step proofs.',
    icon: Compass,
  },
  {
    title: 'Real-Time Graphing & Calculus Engine',
    category: 'Functions & Calculus',
    tabId: 'graphing',
    description: 'Plot multi-functions, tangent line at point x₀, derivatives, and shaded integrals.',
    icon: AreaChart,
  },
  {
    title: 'Interactive Geometry & Mensuration',
    category: 'Geometry',
    tabId: 'geometry',
    description: 'Triangle, Circle, Cylinder, Sphere, Cone diagrams and automated formulas.',
    icon: Shapes,
  },
  {
    title: 'Physics & STEM Simulations',
    category: 'Physics',
    tabId: 'physics',
    description: 'Projectile trajectory kinematics, harmonic pendulum, and Ohm electrical circuits.',
    icon: Calculator,
  },
  {
    title: 'Statistics & Probability Distributions',
    category: 'STEM Tools',
    tabId: 'stem',
    description: 'Mean, median, mode, sample variance, standard deviation, and Gaussian curve.',
    icon: Calculator,
  },
  {
    title: 'Matrix Algebra & Determinants',
    category: 'Linear Algebra',
    tabId: 'stem',
    description: 'Determinant det(A), matrix inverse A⁻¹, matrix multiplication, and eigenvalues.',
    icon: Calculator,
  },
  {
    title: 'Land Plot Area & Construction Calculator',
    category: 'Mensuration',
    tabId: 'stem',
    description: 'Convert plot areas into Sq Ft, Gaj (Sq Yards), Acres, Hectares, and Bigha.',
    icon: Calculator,
  },
  {
    title: 'Student Weighted GPA & Attendance Planner',
    category: 'Student Tools',
    tabId: 'stem',
    description: 'Weighted CGPA calculations and attendance eligibility shortage/buffer planner.',
    icon: Calculator,
  },
  {
    title: 'Comprehensive Formula Library',
    category: 'Formulas',
    tabId: 'formulas',
    description: 'Browse standard formulas across school, high school, and undergraduate mathematics.',
    icon: BookOpen,
  },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  t = TRANSLATIONS.en,
}) => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Listen to Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matches = GLOBAL_SEARCH_ENTRIES.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/12 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-white/[0.08]">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {matches.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching calculator or formula found. Try searching &quot;quadratic&quot;, &quot;class 10&quot;, or &quot;derivative&quot;.
            </div>
          ) : (
            matches.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectTab(item.tabId);
                    onClose();
                  }}
                  className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] text-left transition-colors group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-[#7957F5]/10 dark:bg-white/[0.06] text-[#7957F5] dark:text-[#9D4EDD] group-hover:bg-[#7957F5] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{item.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-[#A6A9B8] truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#0B0D16] border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
