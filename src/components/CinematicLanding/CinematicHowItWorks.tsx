import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Compass, Eye, CheckCircle2 } from 'lucide-react';

export const CinematicHowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  const steps = [
    {
      num: '01',
      title: 'Explore',
      tagline: 'Formulate',
      icon: Compass,
      description:
        'Start with a mathematical question, symbolic expression, quadratic equation, or physical system. Enter parameters with full KaTeX mathematical notation.',
    },
    {
      num: '02',
      title: 'Visualize',
      tagline: 'Observe',
      icon: Eye,
      description:
        'Observe relationships through interactive Cartesian planes, parametric 3D manifolds, and vector geometry diagrams with real-time coordinate feedback.',
    },
    {
      num: '03',
      title: 'Understand',
      tagline: 'Synthesize',
      icon: CheckCircle2,
      description:
        'Use exact calculated roots, derivative slopes, step-by-step proofs, and discriminant classification to build confidence in the underlying concepts.',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative py-24 sm:py-36 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono font-semibold tracking-wider text-[#7957F5] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7957F5]" />
            <span>Workflow & Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
            From Question to Understanding.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
            A continuous three-stage workflow connecting mathematical formulation with tangible visual insight.
          </p>
        </div>

        {/* Connected Visual Narrative Sequence */}
        <div className="relative">
          {/* Connecting SVG Path across desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 z-0 pointer-events-none">
            <svg className="w-full h-8" preserveAspectRatio="none" viewBox="0 0 1000 30">
              <path
                d="M 50 15 Q 250 -5, 500 15 T 950 15"
                fill="none"
                stroke="rgba(148, 163, 184, 0.25)"
                strokeWidth="2"
                strokeDasharray="6,6"
              />
              <motion.path
                d="M 50 15 Q 250 -5, 500 15 T 950 15"
                fill="none"
                stroke="url(#connectingGradient)"
                strokeWidth="2.5"
                style={{
                  pathLength: shouldReduceMotion ? 1 : pathLength,
                }}
              />
              <defs>
                <linearGradient id="connectingGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7957F5" />
                  <stop offset="50%" stopColor="#5558E8" />
                  <stop offset="100%" stopColor="#D94BCB" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Three Connected Milestones */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.15 * idx, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/12 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-lg hover:border-[#7957F5]/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-mono font-black text-slate-300 dark:text-white/20 group-hover:text-[#7957F5] transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#7957F5] group-hover:bg-[#7957F5]/20 group-hover:text-[#7957F5] dark:group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-[#D94BCB] font-semibold uppercase tracking-wider block mb-1">
                      {step.tagline}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-[#F6F7FB] group-hover:text-[#7957F5] dark:group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-[#A6A9B8] leading-relaxed pt-1">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
