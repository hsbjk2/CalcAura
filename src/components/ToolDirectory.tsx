import React, { useState } from 'react';
import {
  Compass,
  AreaChart,
  Shapes,
  Atom,
  BarChart2,
  Grid,
  Ruler,
  GraduationCap,
  MapPin,
  ArrowRight,
} from 'lucide-react';

interface ToolDirectoryProps {
  onSelectTab: (tabId: string) => void;
}

interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  tabId: string;
  tools: string[];
}

const CATEGORIES: ToolCategory[] = [
  {
    id: 'algebra',
    name: 'Algebra & Equation Systems',
    description: 'Quadratic equation solver with discriminant classification, 2×2 Cramer’s linear systems, and verified substitution proofs.',
    icon: Compass,
    tabId: 'solver',
    tools: ['Quadratic Formula', 'Linear Systems (2×2)', 'Discriminant Ledger', 'Substitution Verifier'],
  },
  {
    id: 'graphing',
    name: 'Coordinate Graphing & Calculus',
    description: 'Multi-function Cartesian plane with real-time tangent slope interrogation, derivative curve, and shaded definite integrals.',
    icon: AreaChart,
    tabId: 'graphing',
    tools: ['Function Plotter', 'Tangent Line Tracer', 'Definite Integral Area', 'Discrete Value Table'],
  },
  {
    id: 'geometry',
    name: 'Euclidean Geometry & Mensuration',
    description: 'Parameter-driven vector diagrams computing perimeter, inradius, circumradius, surface areas, and 3D solid volumes.',
    icon: Shapes,
    tabId: 'geometry',
    tools: ['Heron’s Triangle', 'Circle & Sector', 'Cylinder & Cone (3D)', 'Sphere & Solid Mensuration'],
  },
  {
    id: 'physics',
    name: 'Physics & STEM Dynamics',
    description: 'Kinematic projectile trajectories with Earth/Moon/Mars gravity parameters, harmonic oscillators, and electrical circuit laws.',
    icon: Atom,
    tabId: 'physics',
    tools: ['Ballistic Trajectory', 'Harmonic Pendulum', "Ohm's Law Circuit", 'Multi-Gravity Environment'],
  },
  {
    id: 'statistics',
    name: 'Statistical Distribution & Inference',
    description: 'Full descriptive dataset metrics, sample variance, standard deviation, and interactive Gaussian normal distribution curves.',
    icon: BarChart2,
    tabId: 'stem',
    tools: ['Mean, Median, Mode', 'Variance & Std Dev', 'Gaussian PDF Curve', 'Quartile Spread (IQR)'],
  },
  {
    id: 'matrices',
    name: 'Matrix Algebra & Linear Systems',
    description: 'Determinants for 2×2 and 3×3 matrices, formal matrix inversion A^-1, matrix products, and characteristic eigenvalues.',
    icon: Grid,
    tabId: 'stem',
    tools: ['Determinants (det A)', 'Matrix Inverse (A^-1)', 'Matrix Multiplication', 'Eigenvalues (λ)'],
  },
  {
    id: 'land',
    name: 'Land & Construction Mensuration',
    description: 'Boundary dimension calculation and land-unit conversions across Square Feet, Gaj, Acres, Hectares, Guntha, and Bigha.',
    icon: MapPin,
    tabId: 'stem',
    tools: ['Square Feet & Gaj', 'Acres & Hectares', 'Bigha & Guntha', 'Perimeter Calculations'],
  },
  {
    id: 'conversions',
    name: 'Scientific Unit Systems',
    description: 'Exact conversion factors across Length, Surface Area, Mass, Temperature, and Angular Velocity.',
    icon: Ruler,
    tabId: 'stem',
    tools: ['Metric / Imperial Length', 'Surface Area Units', 'Celsius / Kelvin', 'Kinematic Velocity'],
  },
  {
    id: 'student',
    name: 'Academic Ledger & Attendance',
    description: 'Weighted credit-hour GPA/CGPA conversions and institutional attendance threshold calculation.',
    icon: GraduationCap,
    tabId: 'stem',
    tools: ['Weighted CGPA Ledger', 'Institutional Minimum %', 'Absence Shortage Deficit', 'Safe-to-Skip Buffer'],
  },
];

export const ToolDirectory: React.FC<ToolDirectoryProps> = ({ onSelectTab }) => {
  const [filter, setFilter] = useState<string>('all');

  const filtered =
    filter === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((c) =>
          filter === 'math'
            ? ['algebra', 'graphing', 'geometry', 'matrices'].includes(c.id)
            : filter === 'stem'
            ? ['physics', 'statistics', 'conversions'].includes(c.id)
            : ['land', 'student'].includes(c.id)
        );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <div>
          <span className="text-xs font-mono text-[#7957F5] uppercase tracking-wider block mb-1">
            Computing Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#F6F7FB]">
            Comprehensive Tool Directory
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-[#A6A9B8]">
            Browse mathematical disciplines, physical simulations, and academic computing suites.
          </p>
        </div>

        {/* Clean segmented controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#111321] rounded-xl border border-slate-200 dark:border-white/12">
          {[
            { id: 'all', label: 'All Modules' },
            { id: 'math', label: 'Mathematics' },
            { id: 'stem', label: 'Physics & STEM' },
            { id: 'student', label: 'Applied & Student' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === btn.id
                  ? 'bg-gradient-to-r from-[#7957F5] to-[#5558E8] text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.05]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {filtered.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectTab(cat.tabId)}
              className="group bg-white dark:bg-[#111321] hover:bg-slate-50 dark:hover:bg-[#16182c] rounded-2xl border border-slate-200 dark:border-white/12 hover:border-[#7957F5]/40 p-6 transition-all shadow-xs hover:shadow-[0_4px_25px_rgba(121,87,245,0.12)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-[#7957F5] group-hover:text-white group-hover:bg-[#7957F5] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-[#A6A9B8] opacity-0 group-hover:opacity-100 transition-opacity">
                    Open →
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-[#F6F7FB] mb-2 group-hover:text-[#7957F5] dark:group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed mb-4">
                  {cat.description}
                </p>

                {/* Sub-tools list */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                  {cat.tools.map((t, i) => (
                    <div key={i} className="text-[11px] text-slate-600 dark:text-[#A6A9B8] flex items-center gap-2">
                      <span className="text-[#7957F5]" aria-hidden="true">·</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-[#F6F7FB] group-hover:text-[#7957F5] transition-colors">
                <span>Launch Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
