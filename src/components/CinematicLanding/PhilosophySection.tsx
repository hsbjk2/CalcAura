import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const gridOffsetY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const pillars = [
    {
      num: '01',
      title: 'From Abstraction to Geometry',
      description:
        'Mathematical symbols carry immense depth, but human intuition thrives on spatial representation. CalcAura anchors abstract equations into interactive vectors, manifolds, and dynamic curves.',
    },
    {
      num: '02',
      title: 'Deterministic Integrity',
      description:
        'No cloud approximations or black-box guessing. Every equation is solved client-side using rigorous algebraic proofs, exact discriminant classification, and analytical calculus.',
    },
    {
      num: '03',
      title: 'Fluid Exploration',
      description:
        'When you modify a coefficient or drag a tangent point, every related property—from roots and vertices to derivative slopes—responds in real time to reveal cause and effect.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-24 sm:py-36 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden"
    >
      {/* Background Animated Mathematical Coordinate Plane */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : gridOffsetY }}
        className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.14] -z-10"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="philosophyGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7957F5" strokeWidth="0.8" />
              <circle cx="60" cy="60" r="1.5" fill="#D94BCB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#philosophyGrid)" />
        </svg>
      </motion.div>

      {/* Ambient Lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7957F5]/10 via-[#5558E8]/5 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono font-semibold tracking-wider text-slate-700 dark:text-[#A6A9B8] uppercase mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D94BCB]" />
            <span>The CalcAura Philosophy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB] leading-[1.12]"
          >
            Beyond Numbers.
            <br />
            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-[#F6F7FB] dark:to-[#A6A9B8] bg-clip-text text-transparent">
              Into Understanding.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-base sm:text-xl text-slate-600 dark:text-[#A6A9B8] leading-relaxed max-w-2xl mx-auto font-light"
          >
            Calculations, equations, and visual geometry work together as one cohesive system—anchoring abstract formulas into intuitive spatial understanding.
          </motion.p>
        </div>

        {/* Distinctive Editorial Three-Column Composition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pt-6 border-t border-slate-200 dark:border-white/[0.08]">
          {pillars.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 * idx, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="text-sm font-mono font-bold text-[#7957F5] tracking-widest">
                /{item.num}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-[#F6F7FB] tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
