import React, { useState, useEffect } from 'react';
import { ClassLearningHub } from './ClassLearningHub.tsx';
import { CLASS_6_CHAPTERS } from '../data/class6Data.ts';
import { CLASS_7_CHAPTERS } from '../data/class7Data.ts';
import { CLASS_8_CHAPTERS } from '../data/class8Data.ts';
import { CLASS_9_CHAPTERS } from '../data/class9Data.ts';
import {
  Compass,
  BookOpen,
  Sparkles,
  Layers,
  GraduationCap,
} from 'lucide-react';
import '../styles/curriculum.css';

interface MiddleSchoolSectionProps {
  onNavigateStage: (stageId: string) => void;
  initialGrade?: 'classes6-8' | 'class6' | 'class7' | 'class8' | 'class9';
}

export const MiddleSchoolSection: React.FC<MiddleSchoolSectionProps> = ({
  onNavigateStage,
  initialGrade = 'class6',
}) => {
  const [selectedClass, setSelectedClass] = useState<'class6' | 'class7' | 'class8' | 'class9'>(() => {
    if (initialGrade === 'classes6-8') return 'class6';
    if (initialGrade === 'class9') return 'class9';
    if (initialGrade === 'class8') return 'class8';
    if (initialGrade === 'class7') return 'class7';
    return 'class6';
  });

  useEffect(() => {
    if (initialGrade === 'classes6-8') setSelectedClass('class6');
    else if (initialGrade === 'class9') setSelectedClass('class9');
    else if (initialGrade === 'class8') setSelectedClass('class8');
    else if (initialGrade === 'class7') setSelectedClass('class7');
    else if (initialGrade === 'class6') setSelectedClass('class6');
  }, [initialGrade]);

  return (
    <div className="w-full space-y-6">
      {/* Grade Selector Switcher */}
      <div className="curr-banner curr-banner--compact flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7957F5] dark:text-[#D94BCB] block">
            Middle School & Pre-Secondary Continuum
          </span>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Classes 6, 7, 8 & 9 Mathematics System
          </h3>
        </div>

        <div className="flex items-center p-1 bg-slate-100 dark:bg-[#0B0D16] rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium">
          <button
            onClick={() => setSelectedClass('class6')}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              selectedClass === 'class6'
                ? 'bg-[#7957F5] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Class 6</span>
          </button>
          <button
            onClick={() => setSelectedClass('class7')}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              selectedClass === 'class7'
                ? 'bg-[#7957F5] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Class 7</span>
          </button>
          <button
            onClick={() => setSelectedClass('class8')}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              selectedClass === 'class8'
                ? 'bg-[#7957F5] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Class 8</span>
          </button>
          <button
            onClick={() => setSelectedClass('class9')}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              selectedClass === 'class9'
                ? 'bg-[#7957F5] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Class 9</span>
          </button>
        </div>
      </div>

      {/* Render Active Class Learning Hub */}
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

      {selectedClass === 'class9' && (
        <ClassLearningHub
          classLevelTitle="Class 9"
          classLevelSubtitle="Secondary Mathematics Foundations"
          badgeLabel="Class 9 · 8 Chapters"
          chapters={CLASS_9_CHAPTERS}
          onNavigateStage={onNavigateStage}
        />
      )}
    </div>
  );
};
