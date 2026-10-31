import React, { useState } from 'react';
import { MathView } from './MathView.tsx';
import { Translations } from '../i18n/translations.ts';
import {
  CLASS_12_CHAPTERS,
  groupChaptersByUnit,
  CurriculumChapter,
} from '../data/curriculumData.ts';
import {
  BookOpen,
  ArrowRight,
  Compass,
  AreaChart,
  Shapes,
  BarChart2,
  CheckCircle2,
  Layers,
  Filter,
} from 'lucide-react';

interface Class12SectionProps {
  t: Translations;
  onNavigateStage: (stageId: string) => void;
  hideHeader?: boolean;
}

const getChapterIcon = (targetStageId: string) => {
  switch (targetStageId) {
    case 'stage-01':
      return Layers;
    case 'stage-02':
      return AreaChart;
    case 'stage-03':
      return Shapes;
    case 'stage-04':
      return Compass;
    case 'stage-06':
      return BarChart2;
    case 'stage-07':
      return BookOpen;
    case 'stage-08':
      return CheckCircle2;
    default:
      return BookOpen;
  }
};

export const Class12Section: React.FC<Class12SectionProps> = ({
  t,
  onNavigateStage,
  hideHeader = false,
}) => {
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>('all');
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);

  const units = groupChaptersByUnit(CLASS_12_CHAPTERS);

  const displayedUnits =
    selectedUnitFilter === 'all'
      ? units
      : units.filter((u) => u.title.toLowerCase().includes(selectedUnitFilter.toLowerCase()));

  return (
    <div id="class-12-mathematics" className="w-full">
      {/* Section Header or Streamlined Controls */}
      {!hideHeader ? (
        <div className="pb-6 mb-8 border-b border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-mono font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Senior Secondary Standard (Class 12)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Class 12 Mathematics
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-[#A6A9B8] max-w-3xl leading-relaxed">
              {t.class12Subtitle ||
                'Higher secondary advanced mathematics curriculum: relations and functions, inverse trigonometry, matrices, determinants, continuity, differential & integral calculus, vector algebra, 3D geometry, linear programming, and probability.'}
            </p>
          </div>

          {/* Unit Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 dark:text-[#A6A9B8] font-medium flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Unit:</span>
              </span>
              <select
                value={selectedUnitFilter}
                onChange={(e) => setSelectedUnitFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#111321] border border-slate-300 dark:border-white/12 text-slate-800 dark:text-white text-xs font-medium focus:ring-2 focus:ring-[#7957F5] focus:outline-none cursor-pointer shadow-xs"
              >
                <option value="all">All Units (13 Chapters)</option>
                {units.map((u) => (
                  <option key={u.id} value={u.title}>
                    {u.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-5 mb-7 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#A6A9B8]">
            <span className="font-bold text-[#7957F5] dark:text-[#9D4EDD]">13 Verified Chapters</span>
            <span className="text-slate-300 dark:text-white/20">/</span>
            <span>Deterministic Client Proofs & Advanced Calculus</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-600 dark:text-[#A6A9B8] font-medium flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Unit:</span>
              </span>
              <select
                value={selectedUnitFilter}
                onChange={(e) => setSelectedUnitFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#111321] border border-slate-300 dark:border-white/12 text-slate-800 dark:text-white text-xs font-medium focus:ring-2 focus:ring-[#7957F5] focus:outline-none cursor-pointer shadow-xs"
              >
                <option value="all">All Units (13 Chapters)</option>
                {units.map((u) => (
                  <option key={u.id} value={u.title}>
                    {u.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Structured Curriculum by Unit Groups */}
      <div className="space-y-10">
        {displayedUnits.map((unitGroup) => (
          <div key={unitGroup.id} className="space-y-4">
            {/* Unit Header Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7957F5]" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {unitGroup.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {unitGroup.chapters.length} {unitGroup.chapters.length === 1 ? 'Topic' : 'Topics'}
              </span>
            </div>

            {/* Compact Chapter Rows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unitGroup.chapters.map((ch: CurriculumChapter) => {
                const Icon = getChapterIcon(ch.targetStageId);
                const isSelected = activeChapterId === ch.id;

                return (
                  <div
                    key={ch.id}
                    onClick={() => setActiveChapterId(isSelected ? null : ch.id)}
                    className={`bg-white dark:bg-[#111321] rounded-xl border p-4.5 transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#7957F5] ring-2 ring-[#7957F5]/20 shadow-md'
                        : 'border-slate-200 dark:border-white/10 hover:border-[#7957F5]/50 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Chapter Top Row: Number & Icon */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold text-[#7957F5] dark:text-[#9D4EDD] uppercase tracking-wider">
                          {ch.number}
                        </span>
                        <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center text-slate-500 dark:text-slate-400">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                        {ch.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed mb-3 line-clamp-2">
                        {ch.description}
                      </p>

                      {/* Formula Preview with KaTeX */}
                      <div className="p-2 bg-slate-50 dark:bg-[#0B0D16]/90 rounded-lg border border-slate-100 dark:border-white/[0.06] text-center mb-3 min-w-0">
                        <MathView
                          math={ch.latex}
                          displayMode={true}
                          className="text-xs text-slate-800 dark:text-purple-300"
                        />
                      </div>
                    </div>

                    {/* Action Button: Opens actual calculator */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateStage(ch.targetStageId);
                      }}
                      className="w-full inline-flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:bg-[#7957F5] hover:text-white dark:hover:bg-[#7957F5] dark:hover:text-white text-slate-700 dark:text-[#F6F7FB] text-xs font-semibold transition-colors cursor-pointer group"
                    >
                      <span>{ch.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
