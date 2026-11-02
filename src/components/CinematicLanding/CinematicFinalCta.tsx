import React from 'react';
import calcauraLogo from '../../../Logo.png';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface CinematicFinalCtaProps {
  onOpenPlatform: () => void;
  onOpenAbout: () => void;
}

export const CinematicFinalCta: React.FC<CinematicFinalCtaProps> = ({
  onOpenPlatform,
  onOpenAbout,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-28 sm:py-40 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden text-center">
      {/* Ambient Violet Background Lighting */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_var(--tw-gradient-stops))] from-[#7957F5]/20 via-[#5558E8]/10 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Large Centered CALCAURA Logo */}
<div className="mx-auto mb-8 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden border border-[#7957F5]/50 shadow-[0_0_40px_rgba(121,87,245,0.4)]">
  <img
    src={calcauraLogo}
    alt="CALCAURA Logo"
    className="w-full h-full object-contain p-3"
  />
</div>

        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB]"
        >
          See Mathematics Differently.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-xl text-slate-600 dark:text-[#A6A9B8] max-w-xl mx-auto leading-relaxed"
        >
          Enter a workspace designed to help you calculate, visualize, and understand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary Action */}
          <button
            onClick={onOpenPlatform}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-[0_0_30px_rgba(121,87,245,0.45)] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <span>Open CALCAURA</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Action */}
          <button
            onClick={onOpenAbout}
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-white dark:bg-[#111321]/90 hover:bg-slate-50 dark:hover:bg-[#181a2e] text-slate-800 dark:text-[#F6F7FB] hover:text-slate-950 dark:hover:text-white text-sm font-medium rounded-xl border border-slate-300 dark:border-white/12 hover:border-slate-400 dark:hover:border-white/25 shadow-xs transition-all whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#7957F5] dark:text-[#A6A9B8]" />
            <span>About CalcAura</span>
          </button>
        </motion.div>

        <div className="mt-8 text-xs font-mono text-slate-500 dark:text-[#A6A9B8]/70">
          Deterministic Client Engine · Zero Telemetry · Open Platform
        </div>

      </div>
    </section>
  );
};
