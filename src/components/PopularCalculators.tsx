import React from 'react';
import {
  Calculator,
  Compass,
  Shapes,
  AreaChart,
  TrendingUp,
  Grid,
  BarChart2,
  Ruler,
  ArrowUpRight,
} from 'lucide-react';

interface PopularCalculatorsProps {
  onSelectTab: (tabId: string) => void;
}

interface PopularTool {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  tabId: string;
  badge: string;
}

const TOOLS: PopularTool[] = [
  {
    id: 'basic-calculator',
    name: 'Basic Calculator',
    subtitle: 'Everyday calculations, arithmetic, percentages and quick numerical operations.',
    icon: Calculator,
    tabId: 'basic-calculator',
    badge: 'Basic Arithmetic',
  },
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    subtitle: 'Standard, scientific & transcendental operations with memory registers',
    icon: Calculator,
    tabId: 'stem',
    badge: 'Standard & Sci',
  },
  {
    id: 'solver',
    name: 'Equation Solver',
    subtitle: 'Polynomial roots, linear 2×2 systems & discriminant verification',
    icon: Compass,
    tabId: 'solver',
    badge: 'Algebra Proofs',
  },
  {
    id: 'geometry',
    name: 'Area and Geometry',
    subtitle: 'Heron’s formula, circle sectors, triangles & 3D solid mensuration',
    icon: Shapes,
    tabId: 'geometry',
    badge: 'Vector SVG',
  },
  {
    id: 'graphing',
    name: 'Graphing Calculator',
    subtitle: 'Multi-function Cartesian plotter, movable probe & value tables',
    icon: AreaChart,
    tabId: 'graphing',
    badge: 'Cartesian Engine',
  },
  {
    id: 'calculus',
    name: 'Calculus & Derivatives',
    subtitle: 'Real-time tangent lines, slopes, derivative curves & Riemann sums',
    icon: TrendingUp,
    tabId: 'graphing',
    badge: 'Analytic Slopes',
  },
  {
    id: 'matrices',
    name: 'Matrices and Vectors',
    subtitle: 'Matrix determinants (det A), inversion A^-1, and characteristic eigenvalues (λ)',
    icon: Grid,
    tabId: 'stem',
    badge: 'Linear Algebra',
  },
  {
    id: 'statistics',
    name: 'Statistics & Probability',
    subtitle: 'Mean, sample variance, standard deviation & Gaussian normal distribution',
    icon: BarChart2,
    tabId: 'stem',
    badge: 'Data Inference',
  },
  {
    id: 'conversions',
    name: 'Unit Converter',
    subtitle: 'Precise scientific conversion across length, area, mass, and velocity',
    icon: Ruler,
    tabId: 'stem',
    badge: 'SI / Imperial',
  },
];

export const PopularCalculators: React.FC<PopularCalculatorsProps> = ({ onSelectTab }) => {
  return (
    <section id="popular-calculators" className="scroll-mt-32 pb-12 sm:pb-16 border-b border-slate-200 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#7957F5] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7957F5]" />
              <span>Core Instruments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
              Popular Calculators
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#A6A9B8] max-w-xl">
              Direct access to CalcAura's most utilized mathematical instruments and computing environments.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-[#A6A9B8]">
            {TOOLS.length} Core Modules Available
          </div>
        </div>

        {/* 8 Concise Polished Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTab(tool.tabId)}
                className="group text-left p-5 rounded-2xl bg-white dark:bg-[#111321] hover:bg-slate-50 dark:hover:bg-[#16182c] border border-slate-200 dark:border-white/12 hover:border-[#7957F5]/40 transition-all shadow-xs hover:shadow-[0_4px_20px_rgba(121,87,245,0.12)] hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7957F5]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-700 dark:text-[#F6F7FB] group-hover:text-white group-hover:bg-[#7957F5] group-hover:border-[#7957F5]/30 transition-all">
                      <Icon className="w-5 h-5 text-[#7957F5] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-[#A6A9B8]/80 group-hover:text-slate-900 dark:group-hover:text-[#F6F7FB] transition-colors">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-[#F6F7FB] group-hover:text-[#7957F5] dark:group-hover:text-white transition-colors mb-1.5 flex items-center justify-between">
                    <span>{tool.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-[#A6A9B8] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                    {tool.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-[#A6A9B8] group-hover:text-[#7957F5] transition-colors">
                  <span>Launch Tool</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
