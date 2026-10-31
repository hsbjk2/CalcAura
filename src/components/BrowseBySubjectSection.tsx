import React, { useState } from 'react';
import {
  Compass,
  Shapes,
  AreaChart,
  Grid,
  BarChart2,
  Atom,
  Ruler,
  GraduationCap,
  Layers,
  Zap,
  FlaskConical,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface BrowseBySubjectSectionProps {
  onSelectTab: (tabId: string) => void;
}

interface SubjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
  tabId: string;
  tools: string[];
}

const SUBJECTS: SubjectItem[] = [
  {
    id: 'algebra',
    name: 'Algebra',
    category: 'Pure Mathematics',
    description:
      'Polynomial root solving, discriminant classification (Δ = b² - 4ac), 2×2 linear systems, and verified algebraic proofs.',
    icon: Compass,
    tabId: 'solver',
    tools: ['Quadratic Formula', 'Linear Systems', 'Discriminant Ledger'],
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    category: 'Pure Mathematics',
    description:
      'Trigonometric functions, sinusoidal wave curves, radian conversions, and fundamental Pythagorean identities.',
    icon: Activity,
    tabId: 'formulas',
    tools: ['Sine/Cosine Waves', 'Angle Conversions', 'Identities Reference'],
  },
  {
    id: 'geometry',
    name: 'Geometry',
    category: 'Spatial Mathematics',
    description:
      'Parametric Euclidean diagrams, Heron’s formula, circle sectors, inradius, and 3D solid mensuration (cones, spheres, cylinders).',
    icon: Shapes,
    tabId: 'geometry',
    tools: ["Heron's Formula", 'Circle Arcs', '3D Solid Mensuration'],
  },
  {
    id: 'calculus',
    name: 'Calculus',
    category: 'Mathematical Analysis',
    description:
      'Differential tangent line slopes, instantaneous rates of change, derivative curves, and shaded Riemann definite integrals.',
    icon: AreaChart,
    tabId: 'graphing',
    tools: ['Derivative Tracer', 'Tangent Slope', 'Definite Integrals'],
  },
  {
    id: 'linear-algebra',
    name: 'Linear Algebra',
    category: 'Pure Mathematics',
    description:
      '2×2 up to 5×5 matrix determinants (det A), formal matrix inversion A⁻¹, linear systems (AX = B), matrix products, and rank analysis.',
    icon: Grid,
    tabId: 'stem',
    tools: ['Up to 5×5 Matrix Solvers', 'Inverse Matrix (A⁻¹)', 'System Solver (AX=B)'],
  },
  {
    id: 'statistics',
    name: 'Statistics',
    category: 'Applied Data',
    description:
      'Descriptive dataset metrics, sample variance, standard deviation, and interactive Gaussian normal distribution curves.',
    icon: BarChart2,
    tabId: 'stem',
    tools: ['Mean, Median, Mode', 'Standard Deviation', 'Gaussian Bell Curve'],
  },
  {
    id: 'numerical-methods',
    name: 'Numerical Methods',
    category: 'Computational Science',
    description:
      'Iterative root approximation, discrete point value tables, numeric integration, and parametric error bounds.',
    icon: Layers,
    tabId: 'graphing',
    tools: ['Point Tables', 'Numeric Derivatives', 'Riemann Sum Bounds'],
  },
  {
    id: 'physics',
    name: 'Physics',
    category: 'Natural Sciences',
    description:
      'Kinematic projectile ballistics with Earth/Moon/Mars gravity parameters, harmonic pendulum oscillation, and mechanics.',
    icon: Atom,
    tabId: 'physics',
    tools: ['Ballistic Trajectory', 'Harmonic Pendulum', 'Multi-Gravity Engine'],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: 'Natural Sciences',
    description:
      'Ideal gas law computations (PV = nRT), thermodynamic temperature conversions, and fundamental physical constants.',
    icon: FlaskConical,
    tabId: 'formulas',
    tools: ['Ideal Gas Laws', 'Thermal Scales', 'Physical Constants'],
  },
  {
    id: 'engineering-math',
    name: 'Engineering Mathematics',
    category: 'Applied Engineering',
    description:
      'Ohm’s law electrical circuit relationships (V = IR, P = VI), resistance calculations, and dynamic power dissipation.',
    icon: Zap,
    tabId: 'physics',
    tools: ["Ohm's Law Circuits", 'Electrical Power (P)', 'Resistance Networks'],
  },
  {
    id: 'land-construction',
    name: 'Land & Construction',
    category: 'Applied Mensuration',
    description:
      'Plot boundary calculations and conversion factors across Square Feet, Gaj, Acres, Hectares, Guntha, and Bigha.',
    icon: Ruler,
    tabId: 'stem',
    tools: ['Sq Feet to Gaj', 'Acres & Hectares', 'Regional Land Units'],
  },
  {
    id: 'student-tools',
    name: 'Student Tools',
    category: 'Academic Utilities',
    description:
      'Weighted credit-hour GPA/CGPA planners, attendance shortage buffer calculations, and verified student worksheets.',
    icon: GraduationCap,
    tabId: 'practice',
    tools: ['Weighted CGPA', 'Attendance Deficit', 'Verified Worksheets'],
  },
];

export const BrowseBySubjectSection: React.FC<BrowseBySubjectSectionProps> = ({ onSelectTab }) => {
  const [filter, setFilter] = useState<string>('all');

  const filtered =
    filter === 'all'
      ? SUBJECTS
      : SUBJECTS.filter((s) => {
          if (filter === 'pure') return ['algebra', 'trigonometry', 'geometry', 'calculus', 'linear-algebra'].includes(s.id);
          if (filter === 'applied') return ['statistics', 'numerical-methods', 'engineering-math'].includes(s.id);
          if (filter === 'science') return ['physics', 'chemistry'].includes(s.id);
          if (filter === 'practical') return ['land-construction', 'student-tools'].includes(s.id);
          return true;
        });

  return (
    <section id="browse-by-subject" className="scroll-mt-32 py-14 sm:py-20 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#7957F5] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7957F5]" />
              <span>Full Curriculum & Workspace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
              Browse by Subject
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#A6A9B8] max-w-xl">
              Comprehensive mathematical disciplines, physical modeling, and applied STEM utilities with direct tool launches.
            </p>
          </div>

          {/* Interactive filter controls without pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#111321] rounded-xl border border-slate-200 dark:border-white/12 overflow-x-auto thin-scrollbar">
            {[
              { id: 'all', label: 'All 12 Subjects' },
              { id: 'pure', label: 'Pure Math' },
              { id: 'applied', label: 'Applied & Stats' },
              { id: 'science', label: 'Sciences' },
              { id: 'practical', label: 'Applied Tools' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  filter === btn.id
                    ? 'bg-gradient-to-r from-[#7957F5] to-[#5558E8] text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* 12-Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-8">
          {filtered.map((subject) => {
            const Icon = subject.icon;
            return (
              <div
                key={subject.id}
                onClick={() => onSelectTab(subject.tabId)}
                className="group bg-white dark:bg-[#111321] hover:bg-slate-50 dark:hover:bg-[#16182c] rounded-2xl border border-slate-200 dark:border-white/12 hover:border-[#7957F5]/40 p-6 transition-all shadow-xs hover:shadow-[0_4px_25px_rgba(121,87,245,0.14)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-[#7957F5] group-hover:text-white group-hover:bg-[#7957F5] group-hover:border-[#7957F5]/30 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    {/* Clean unboxed category label */}
                    <span className="text-[11px] font-mono text-slate-500 dark:text-[#A6A9B8]">
                      {subject.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F6F7FB] group-hover:text-[#7957F5] dark:group-hover:text-white transition-colors mb-2">
                    {subject.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed mb-4">
                    {subject.description}
                  </p>

                  {/* Clean unboxed tool tags */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                    {subject.tools.map((t, i) => (
                      <div key={i} className="text-[11px] text-slate-600 dark:text-[#A6A9B8] flex items-center gap-2">
                        <span className="text-[#7957F5]" aria-hidden="true">
                          ·
                        </span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-[#F6F7FB] group-hover:text-[#7957F5] transition-colors">
                  <span>Launch Subject Tools</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
