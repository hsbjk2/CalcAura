import React, { useState, useEffect } from 'react';
import { Translations } from '../i18n/translations.ts';
import { Class10Section } from './Class10Section.tsx';
import { Class12Section } from './Class12Section.tsx';
import { MiddleSchoolSection } from './MiddleSchoolSection.tsx';
import { ClassLearningHub } from './ClassLearningHub.tsx';
import { LearningAndToolsSection } from './LearningAndToolsSection.tsx';
import { CLASS_6_CHAPTERS } from '../data/class6Data.ts';
import { CLASS_7_CHAPTERS } from '../data/class7Data.ts';
import { CLASS_8_CHAPTERS } from '../data/class8Data.ts';
import { CLASS_9_CHAPTERS } from '../data/class9Data.ts';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  Compass,
  Cpu,
  Landmark,
  ArrowRight,
  Layers,
  Award,
} from 'lucide-react';

export { Class10Section } from './Class10Section.tsx';
export { Class12Section } from './Class12Section.tsx';
export { MiddleSchoolSection } from './MiddleSchoolSection.tsx';

export type ClassProgressionLevel =
  | 'classes1-5'
  | 'classes6-8'
  | 'class6'
  | 'class7'
  | 'class8'
  | 'class9'
  | 'class10'
  | 'class12'
  | 'engineering'
  | 'graduation';

interface SchoolCurriculumSectionProps {
  t: Translations;
  onNavigateStage: (stageId: string) => void;
  initialClass?: ClassProgressionLevel | 'both';
}

interface ClassLevelMeta {
  id: ClassProgressionLevel;
  title: string;
  subtitle: string;
  stageTarget?: string;
  icon: React.ElementType;
  badge: string;
  themeColor: string;
}

const CLASS_LEVELS: ClassLevelMeta[] = [
  {
    id: 'classes1-5',
    title: 'Classes 1–5',
    subtitle: 'Foundation Mathematics',
    stageTarget: 'stage-classes1-5',
    icon: Sparkles,
    badge: 'Foundation',
    themeColor: 'from-pink-500 to-rose-500',
  },
  {
    id: 'class6',
    title: 'Class 6',
    subtitle: 'Mathematics Explorer',
    icon: Compass,
    badge: 'Grade 6',
    themeColor: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'class7',
    title: 'Class 7',
    subtitle: 'Intermediate Mathematics',
    icon: Layers,
    badge: 'Grade 7',
    themeColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'class8',
    title: 'Class 8',
    subtitle: 'Advanced Middle School',
    icon: Sparkles,
    badge: 'Grade 8',
    themeColor: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'class9',
    title: 'Class 9',
    subtitle: 'Pre-Secondary Mathematics',
    icon: BookOpen,
    badge: 'Grade 9',
    themeColor: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'class10',
    title: 'Class 10',
    subtitle: 'Secondary Mathematics',
    icon: GraduationCap,
    badge: 'Secondary',
    themeColor: 'from-sky-500 to-indigo-600',
  },
  {
    id: 'class12',
    title: 'Class 12',
    subtitle: 'Senior Secondary Mathematics',
    icon: BookOpen,
    badge: 'Senior Sec',
    themeColor: 'from-purple-500 to-violet-600',
  },
  {
    id: 'engineering',
    title: 'Engineering',
    subtitle: 'Engineering Mathematics',
    icon: Cpu,
    badge: 'STEM / B.Tech',
    themeColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 'graduation',
    title: 'Graduation',
    subtitle: 'Undergraduate Mathematics',
    icon: Landmark,
    badge: 'Undergraduate',
    themeColor: 'from-emerald-500 to-teal-700',
  },
];

export const SchoolCurriculumSection: React.FC<SchoolCurriculumSectionProps> = ({
  t,
  onNavigateStage,
  initialClass = 'class10',
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassProgressionLevel>(() => {
    if (initialClass === 'both' || initialClass === 'class10') return 'class10';
    if (initialClass === 'class12') return 'class12';
    if (initialClass === 'classes6-8') return 'class6';
    return (initialClass as ClassProgressionLevel) || 'class10';
  });

  useEffect(() => {
    if (initialClass) {
      if (initialClass === 'both') {
        setSelectedClass('class10');
      } else if (initialClass === 'classes6-8') {
        setSelectedClass('class6');
      } else {
        setSelectedClass(initialClass as ClassProgressionLevel);
      }
    }
  }, [initialClass]);

  const currentMeta = CLASS_LEVELS.find((c) => c.id === selectedClass) || CLASS_LEVELS[5];

  return (
    <div id="school-curriculum" className="w-full space-y-8">
      {/* Top Class Switcher Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7957F5]/10 border border-[#7957F5]/30 text-[#7957F5] dark:text-[#D94BCB] text-xs font-mono font-semibold mb-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Class-Based Mathematics Progression</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {currentMeta.title} — {currentMeta.subtitle}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a class level to inspect chapters, concepts, practice & quizzes immediately:
          </span>
        </div>

        {/* Intuitive Class Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {CLASS_LEVELS.map((lvl) => {
            const isSelected = selectedClass === lvl.id;
            const Icon = lvl.icon;

            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedClass(lvl.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[76px] ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white border-transparent shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100/80 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 w-full">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    {lvl.badge}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                </div>
                <div>
                  <div className={`text-xs font-black truncate ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {lvl.title}
                  </div>
                  <div className={`text-[10px] truncate ${isSelected ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                    {lvl.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER SELECTED CLASS CONTENT IMMEDIATELY */}
      {selectedClass === 'classes1-5' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
            <div>
              <span className="px-3 py-1 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 font-mono text-xs font-bold">
                Foundation Mathematics · Classes 1 to 5
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                Visual & Interactive Foundation Playground
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] max-w-2xl mt-1">
                Age-appropriate chapters covering numbers, arithmetic, fractions, decimals, patterns, geometry, measurements, time, and money with interactive mini-labs and strict zero-leak quizzes.
              </p>
            </div>

            <button
              onClick={() => onNavigateStage('stage-classes1-5')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Open Classes 1–5 Learning Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { grade: 1, title: 'Class 1', desc: 'Numbers 1–99, basic counting, shapes & comparisons' },
              { grade: 2, title: 'Class 2', desc: '2-digit addition, subtraction, clocks, coins & intro to tables' },
              { grade: 3, title: 'Class 3', desc: 'Multiplication tables 1–10, division basics, fractions & perimeter' },
              { grade: 4, title: 'Class 4', desc: 'Multi-digit arithmetic, factors, decimals intro & polygon area' },
              { grade: 5, title: 'Class 5', desc: 'Fraction arithmetic, decimals, 3D volume, angles & word problems' },
            ].map((g) => (
              <div
                key={g.grade}
                onClick={() => onNavigateStage('stage-classes1-5')}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-pink-500/50 transition-all cursor-pointer space-y-1"
              >
                <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400">
                  {g.title}
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedClass === 'class6' && (
        <ClassLearningHub
          classLevelTitle="Class 6"
          classLevelSubtitle="Mathematics Explorer"
          badgeLabel="Class 6 · 10 Chapters"
          chapters={CLASS_6_CHAPTERS}
          onNavigateStage={onNavigateStage}
        />
      )}

      {selectedClass === 'class7' && (
        <ClassLearningHub
          classLevelTitle="Class 7"
          classLevelSubtitle="Intermediate Mathematics"
          badgeLabel="Class 7 · 15 Chapters"
          chapters={CLASS_7_CHAPTERS}
          onNavigateStage={onNavigateStage}
        />
      )}

      {selectedClass === 'class8' && (
        <ClassLearningHub
          classLevelTitle="Class 8"
          classLevelSubtitle="Advanced Middle-School Mathematics"
          badgeLabel="Class 8 · 14 Chapters"
          chapters={CLASS_8_CHAPTERS}
          onNavigateStage={onNavigateStage}
        />
      )}

      {selectedClass === 'classes6-8' && (
        <MiddleSchoolSection onNavigateStage={onNavigateStage} initialGrade="class6" />
      )}

      {selectedClass === 'class9' && (
        <ClassLearningHub
          classLevelTitle="Class 9"
          classLevelSubtitle="Secondary Mathematics Foundations"
          badgeLabel="Class 9 · 8 Chapters"
          chapters={CLASS_9_CHAPTERS}
          onNavigateStage={onNavigateStage}
        />
      )}

      {selectedClass === 'class10' && (
        <Class10Section t={t} onNavigateStage={onNavigateStage} />
      )}

      {selectedClass === 'class12' && (
        <Class12Section t={t} onNavigateStage={onNavigateStage} />
      )}

      {selectedClass === 'engineering' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                Applied Higher Mathematics
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Engineering Mathematics Tools & Computing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Transform calculus, matrix eigenvalues, Laplace transforms, Fourier series, and numerical methods.
              </p>
            </div>
            <button
              onClick={() => onNavigateStage('stage-engineering')}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <span>View Full Engineering Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <LearningAndToolsSection t={t} onNavigateStage={onNavigateStage} initialLevel="engineering" />
        </div>
      )}

      {selectedClass === 'graduation' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                Undergraduate Pure Mathematics
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Graduation Mathematics & Higher Analysis
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Abstract algebra, groups, rings, fields, real & complex analysis, metric spaces, and topology.
              </p>
            </div>
            <button
              onClick={() => onNavigateStage('stage-graduation')}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <span>View Full Graduation Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <LearningAndToolsSection t={t} onNavigateStage={onNavigateStage} initialLevel="graduation" />
        </div>
      )}
    </div>
  );
};
