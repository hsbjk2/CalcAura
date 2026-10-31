import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FramedProductPreview } from '../FramedProductPreview.tsx';
import { ArrowRight, Layers } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext.tsx';

interface Scroll3DProductRevealProps {
  onOpenPlatform: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const Scroll3DProductReveal: React.FC<Scroll3DProductRevealProps> = ({
  onOpenPlatform,
  onNavigateTab,
}) => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across the pinned showcase container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // 3D perspective transforms mapped to scroll position
  const rotateX = useTransform(scrollYProgress, [0.1, 0.7], [20, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.75], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0.05, 0.65], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.35], [0.45, 1]);
  const haloScale = useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1.25]);

  return (
    <section
      ref={containerRef}
      id="product-showcase"
      className="relative min-h-[140vh] sm:min-h-[165vh] py-12 sm:py-16"
    >
      {/* Sticky Frame: Pins smoothly as user scrolls through the 3D perspective transition */}
      <div className="sticky top-20 sm:top-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono font-semibold tracking-wider text-[#7957F5] uppercase mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.canvasPreviewTag}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
            {t.canvasTitle}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8]">
            {t.canvasSubtitle}
          </p>
        </div>

        {/* 3D Transforming Wrapper */}
        <div
          className="w-full relative"
          style={{ perspective: shouldReduceMotion ? 'none' : '1200px' }}
        >
          {/* Ambient Lighting Shift */}
          <motion.div
            style={{
              scale: shouldReduceMotion ? 1 : haloScale,
            }}
            className="pointer-events-none absolute -inset-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7957F5]/25 via-[#D94BCB]/15 to-transparent blur-3xl -z-10"
            aria-hidden="true"
          />

          {/* 3D Rotated Application Panel */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    rotateX,
                    scale,
                    y,
                    opacity,
                    transformStyle: 'preserve-3d',
                  }
            }
            className="transition-shadow duration-300"
          >
            <FramedProductPreview onNavigateTab={onNavigateTab} />
          </motion.div>
        </div>

        {/* Quick Launch Anchor CTA below the preview */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={onOpenPlatform}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-[0.98] text-white text-xs font-semibold shadow-[0_0_20px_rgba(121,87,245,0.35)] transition-all cursor-pointer"
          >
            <span>{t.heroOpenApp}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
