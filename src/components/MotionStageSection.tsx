import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../motion/tokens.ts';

export interface MotionStageSectionProps {
  id: string;
  stageNum: string;
  stageCategory: string;
  title: string;
  description: React.ReactNode;
  nextStageId?: string;
  nextStageLabel?: string;
  onNextStage?: (stageId: string) => void;
  backgroundVariant?: 'slate' | 'white';
  children: React.ReactNode;
}

export const MotionStageSection: React.FC<MotionStageSectionProps> = ({
  id,
  stageNum,
  stageCategory,
  title,
  description,
  nextStageId,
  nextStageLabel,
  onNextStage,
  backgroundVariant = 'white',
  children,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const bgClasses =
    backgroundVariant === 'white'
      ? 'bg-slate-50 dark:bg-[#0B0D16]'
      : 'bg-white dark:bg-[#111321]/50';

  return (
    <section
      id={id}
      className={`scroll-mt-28 py-10 sm:py-16 md:py-20 border-b border-slate-200 dark:border-white/[0.08] ${bgClasses} relative transition-colors opacity-100`}
    >
      {/* Subtle top accent milestone indicator */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7957F5] via-[#5558E8]/70 to-[#D94BCB]/40"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-1.5">
            {/* Stage Tag */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#A6A9B8]">
              <span className="font-bold text-[#7957F5]">{stageNum}</span>
              <span className="text-slate-300 dark:text-white/20">/</span>
              <span className="uppercase tracking-widest text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {stageCategory}
              </span>
            </div>

            {/* Stage Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
              {title}
            </h2>

            {/* Stage Description */}
            <div className="text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] max-w-2xl leading-relaxed">
              {description}
            </div>
          </div>

          {/* Quick link to proceed to the next stage */}
          {nextStageId && nextStageLabel && onNextStage && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onNextStage(nextStageId)}
                className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border border-slate-200 dark:border-white/12 bg-white dark:bg-[#111321] text-xs font-mono font-semibold text-slate-800 dark:text-[#F6F7FB] hover:text-slate-950 dark:hover:text-white hover:border-[#7957F5]/50 hover:bg-slate-50 dark:hover:bg-[#16182c] transition-all shadow-xs cursor-pointer"
              >
                <span>{nextStageLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#D94BCB]" />
              </button>
            </div>
          )}
        </div>

        {/* Interactive Tool / Workbench Content - Guaranteed visible, never blanked */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1 }}
          transition={{ duration: MOTION_DURATIONS.smallReveal, ease: MOTION_EASINGS.easeOut }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};
