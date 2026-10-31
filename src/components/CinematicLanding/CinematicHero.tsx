import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Hero3DCanvas } from './Hero3DCanvas.tsx';
import { useI18n } from '../../i18n/I18nContext.tsx';

interface CinematicHeroProps {
  onOpenPlatform: () => void;
  onExploreScroll: () => void;
  onDiscoverVision: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onOpenPlatform,
  onExploreScroll,
  onDiscoverVision,
  onNavigateTab,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useI18n();

  return (
    <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-white/[0.06]">
      {/* Ambient Violet, Indigo & Magenta Background Lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7957F5]/20 via-[#5558E8]/10 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-60 right-1/4 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D94BCB]/15 via-transparent to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy & Primary Action System */}
          <div className="lg:col-span-7 text-center lg:text-left z-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-slate-700 dark:text-[#A6A9B8] uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7957F5]" />
              <span>{t.heroEyebrow}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB] leading-[1.08] text-balance"
            >
              {t.heroHeadline1}
              <br />
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-[#F6F7FB] dark:to-[#A6A9B8] bg-clip-text text-transparent">
                {t.heroHeadline2}
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-base sm:text-lg text-slate-600 dark:text-[#A6A9B8] leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {t.heroDescription}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              {/* Primary Gradient Action */}
              <button
                onClick={onOpenPlatform}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-[0_0_25px_rgba(121,87,245,0.4)] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <span>{t.heroOpenApp}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              {/* Secondary Outlined Action */}
              <button
                onClick={onExploreScroll}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white dark:bg-[#111321]/90 hover:bg-slate-50 dark:hover:bg-[#181a2e] text-slate-800 dark:text-[#F6F7FB] hover:text-slate-950 dark:hover:text-white text-sm font-medium rounded-xl border border-slate-300 dark:border-white/12 hover:border-slate-400 dark:hover:border-white/25 shadow-xs transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <Sparkles className="w-4 h-4 text-[#7957F5] dark:text-[#A6A9B8]" />
                <span>{t.heroExploreMath}</span>
              </button>
            </motion.div>

            {/* Direct Quick-Launch Class System Access */}
            {onNavigateTab && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="mt-7 pt-5 border-t border-slate-200/80 dark:border-white/10"
              >
                <div className="flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-[#A6A9B8] mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#7957F5]" />
                  <span>Explore Direct Class Content:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {[
                    { id: 'classes1-5', label: 'Classes 1–5' },
                    { id: 'class6', label: 'Class 6' },
                    { id: 'class7', label: 'Class 7' },
                    { id: 'class8', label: 'Class 8' },
                    { id: 'class9', label: 'Class 9' },
                    { id: 'class10', label: 'Class 10' },
                    { id: 'class12', label: 'Class 12' },
                    { id: 'curriculum', label: 'Full Curriculum' },
                  ].map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => onNavigateTab(cls.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white hover:bg-slate-100 dark:bg-white/[0.05] dark:hover:bg-[#7957F5]/20 text-slate-800 dark:text-slate-200 hover:text-[#7957F5] dark:hover:text-white border border-slate-200/90 dark:border-white/10 hover:border-[#7957F5]/40 transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      {cls.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Subtle Platform Attribution */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-xs text-slate-500 dark:text-[#A6A9B8]/70 font-mono tracking-wider"
            >
              {t.heroPlatformCrafted}
            </motion.div>
          </div>

          {/* Right Column: 3D Mathematical Manifold Visual */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Subtle frame border around 3D surface */}
            <div className="relative w-full rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111321]/80 dark:to-[#0B0D16]/90 border border-slate-200 dark:border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_0_60px_rgba(121,87,245,0.18)] p-2 overflow-hidden">
              <div className="absolute top-3 left-4 text-[10px] font-mono text-slate-500 dark:text-[#A6A9B8] z-20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7957F5] animate-ping" />
                <span>Parametric Quadric Manifold</span>
              </div>
              <div className="absolute top-3 right-4 text-[10px] font-mono text-[#D94BCB] z-20 font-semibold">
                z = (x² - y²)/3
              </div>

              <Hero3DCanvas />

              {/* Bottom depth badge */}
              <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-[10px] font-mono text-slate-600 dark:text-[#A6A9B8] z-20 px-2.5 py-1 rounded-lg bg-slate-100/85 dark:bg-[#0B0D16]/75 backdrop-blur-md border border-slate-200 dark:border-white/[0.08]">
                <span>Perspective 45°</span>
                <span>Real-Time WebGL Mesh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
