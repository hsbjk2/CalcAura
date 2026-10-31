import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, BookOpen, Cpu, Landmark, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../../motion/tokens.ts';

export const DifferentMindsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const audiences = [
    {
      role: 'School Students (Classes 9–10)',
      focus: 'Foundational Intuition',
      icon: GraduationCap,
      description:
        'Connect algebraic formulas to visible geometric curves. Master real numbers, linear equations, quadratic roots, coordinate distance, and mensuration.',
    },
    {
      role: 'Higher Secondary (Classes 11–12)',
      focus: 'Calculus & Vectors',
      icon: BookOpen,
      description:
        'Explore differential rates of change, definite integrals, vector cross products, 3D lines and planes, and Bayes probability distributions with instant proofs.',
    },
    {
      role: 'Engineering Students (Diploma & B.Tech)',
      focus: 'Applied Computational Rigor',
      icon: Cpu,
      description:
        'Verify multi-variable calculus, differential equations, Simpson numerical integration, circuit AC impedances, and beam structural reactions.',
    },
    {
      role: 'Undergraduate Learners (B.Sc. / Math)',
      focus: 'Theoretical Depth',
      icon: Landmark,
      description:
        'Investigate discrete structures, complex variable arithmetic, modular inverses, permutation groups, and multivariable Taylor approximations.',
    },
    {
      role: 'Educators & Instructors',
      focus: 'Dynamic Classroom Demonstration',
      icon: Sparkles,
      description:
        'Replace static chalkboard drawings with responsive 3D manifolds, movable tangent lines, and live KaTeX typesetting without server lag.',
    },
    {
      role: 'Technical Professionals & Curious Minds',
      focus: 'Deterministic Integrity',
      icon: CheckCircle2,
      description:
        'Perform exact numeric integration, statistical distribution fits, and scientific computations inside a completely private, zero-telemetry client.',
    },
  ];

  return (
    <section id="audiences" className="relative py-20 sm:py-32 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono font-semibold tracking-wider text-[#7957F5] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7957F5]" />
            <span>Audience & Intent</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
            Built for Different Minds.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
            CalcAura adapts to where you are on your mathematical journey—from secondary school curiosity to rigorous engineering analysis.
          </p>
        </div>

        {/* Editorial Layout: Responsive 6-card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <motion.div
                key={aud.role}
                initial={{ opacity: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: MOTION_DURATIONS.cardReveal, delay: 0.06 * idx, ease: MOTION_EASINGS.easeOut }}
                className="bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/10 p-5 sm:p-6 transition-all hover:border-[#7957F5]/40 hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#7957F5] dark:text-[#D94BCB]">
                      {aud.focus}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center text-slate-600 dark:text-slate-300">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F6F7FB] mb-2">
                    {aud.role}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                    {aud.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
