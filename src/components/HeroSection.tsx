import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Translations } from '../i18n/translations.ts';
import { FramedProductPreview } from './FramedProductPreview.tsx';

interface HeroSectionProps {
  onNavigateTab: (tabId: string) => void;
  t: Translations;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateTab }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Ambient Violet, Indigo & Magenta Background Lighting (CSS Gradients) */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] sm:w-[1100px] sm:h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7957F5]/20 via-[#5558E8]/10 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-48 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D94BCB]/10 via-[#7957F5]/5 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Hero Content */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-slate-700 dark:text-[#A6A9B8] uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7957F5]" />
            <span>MATHEMATICS • SCIENCE • ENGINEERING</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB] leading-[1.1] sm:leading-[1.12]"
          >
            Every Equation.
            <br />
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-[#F6F7FB] dark:to-[#A6A9B8] bg-clip-text text-transparent">
              A Clearer Perspective.
            </span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-[#A6A9B8] leading-relaxed max-w-2xl mx-auto"
          >
            Calculate, solve, visualize and understand mathematics in one powerful workspace—from everyday calculations to advanced scientific computing.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {/* Primary Gradient CTA */}
            <button
              onClick={() => {
                const el = document.getElementById('popular-calculators') || document.getElementById('stage-01');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-[0_0_25px_rgba(121,87,245,0.4)] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <span>Explore Calculators</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Secondary Outlined Action */}
            <button
              onClick={() => onNavigateTab('solver')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#111321]/90 hover:bg-slate-50 dark:hover:bg-[#181a2e] text-slate-800 dark:text-[#F6F7FB] hover:text-slate-950 dark:hover:text-white text-sm font-medium rounded-xl border border-slate-300 dark:border-white/12 hover:border-slate-400 dark:hover:border-white/25 shadow-xs transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <Compass className="w-4 h-4 text-slate-600 dark:text-[#A6A9B8]" />
              <span>Open Math Solver</span>
            </button>
          </motion.div>

          {/* Subtle Supporting Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 text-xs text-slate-500 dark:text-[#A6A9B8]/80 font-mono tracking-wide"
          >
            Geometry · Graphing · Calculus · Statistics · Engineering
          </motion.div>
        </div>

        {/* Framed CalcAura Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16"
        >
          <FramedProductPreview onNavigateTab={onNavigateTab} />
        </motion.div>
      </div>
    </section>
  );
};
