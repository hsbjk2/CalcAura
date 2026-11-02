import React, { useState } from 'react';
import { MiddleSchoolChapter, MiddleSchoolQuizItem } from '../data/class6Data.ts';
import { MathView } from './MathView.tsx';
import { MiddleSchoolInteractiveToolView } from './MiddleSchoolInteractiveTools.tsx';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Search,
  Sliders,
  Award,
  AlertCircle,
  FileText,
  Play,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

interface ClassLearningHubProps {
  classLevelTitle: string;
  classLevelSubtitle: string;
  badgeLabel: string;
  chapters: MiddleSchoolChapter[];
  onNavigateStage?: (stageId: string) => void;
  onOpenPlayground?: () => void;
}

export const ClassLearningHub: React.FC<ClassLearningHubProps> = ({
  classLevelTitle,
  classLevelSubtitle,
  badgeLabel,
  chapters,
  onNavigateStage,
  onOpenPlayground,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(chapters[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [explanationLevel, setExplanationLevel] = useState<'simple' | 'detailed' | 'advanced'>('simple');
  const [activeTab, setActiveTab] = useState<'concepts' | 'interactive' | 'examples' | 'practice' | 'test'>('concepts');

  // Guided practice hint toggle
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  // ZERO-LEAK TEST STATE
  // chapterId -> questionIndex -> selectedOptionIndex (or undefined if unanswered)
  const [testAnswers, setTestAnswers] = useState<Record<string, Record<number, number>>>({});
  const [currentTestQIdx, setCurrentTestQIdx] = useState<Record<string, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<Record<string, boolean>>({});

  const filteredChapters = chapters.filter(
    (ch) =>
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChapter = chapters.find((c) => c.id === activeChapterId) || chapters[0];

  // Group chapters by unit
  const unitsMap = new Map<string, MiddleSchoolChapter[]>();
  filteredChapters.forEach((ch) => {
    const list = unitsMap.get(ch.unit) || [];
    list.push(ch);
    unitsMap.set(ch.unit, list);
  });

  // Current chapter test variables
  const currentChapterAnswers = testAnswers[activeChapter.id] || {};
  const currentQIndex = currentTestQIdx[activeChapter.id] || 0;
  const isSubmitted = !!testSubmitted[activeChapter.id];
  const totalQuestions = activeChapter.chapterQuiz.length;

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (isSubmitted) return; // Prevent answer changes after submission
    setTestAnswers((prev) => ({
      ...prev,
      [activeChapter.id]: {
        ...(prev[activeChapter.id] || {}),
        [qIdx]: optIdx,
      },
    }));
  };

  const handleSubmitTest = () => {
    setTestSubmitted((prev) => ({
      ...prev,
      [activeChapter.id]: true,
    }));
  };

  const handleRetryTest = () => {
    setTestSubmitted((prev) => ({
      ...prev,
      [activeChapter.id]: false,
    }));
    setTestAnswers((prev) => ({
      ...prev,
      [activeChapter.id]: {},
    }));
    setCurrentTestQIdx((prev) => ({
      ...prev,
      [activeChapter.id]: 0,
    }));
  };

  // Score computation (computed ONLY after submission)
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  if (isSubmitted) {
    activeChapter.chapterQuiz.forEach((q, idx) => {
      const selected = currentChapterAnswers[idx];
      if (selected === undefined) {
        unansweredCount++;
      } else if (selected === q.correctIdx) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });
  }

  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="w-full space-y-6">
      {/* Top Class Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7957F5]/10 border border-[#7957F5]/30 text-[#7957F5] dark:text-[#D94BCB] text-xs font-mono font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{badgeLabel}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {classLevelTitle} — {classLevelSubtitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] mt-1 max-w-3xl">
            Complete structured syllabus with multi-level explanations, KaTeX formulas, step-by-step worked examples, interactive simulations, and strict zero-leak assessments.
          </p>
        </div>

        {onOpenPlayground && (
          <button
            onClick={onOpenPlayground}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Math Playground</span>
          </button>
        )}
      </div>

      {/* Main Grid: Sidebar Chapters + Chapter Learning Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chapter Directory Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search chapters or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#7957F5]"
            />
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 max-h-[620px] overflow-y-auto thin-scrollbar space-y-4">
            {Array.from(unitsMap.entries()).map(([unitName, unitChapters]) => (
              <div key={unitName} className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 block">
                  {unitName}
                </span>

                <div className="space-y-1">
                  {unitChapters.map((ch) => {
                    const isSelected = ch.id === activeChapter.id;
                    const isPassed = testSubmitted[ch.id];

                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setActiveChapterId(ch.id);
                          setActiveTab('concepts');
                        }}
                        className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#7957F5] text-white shadow-md font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="min-w-0">
                          <span
                            className={`text-[10px] font-mono block ${
                              isSelected ? 'text-white/80' : 'text-slate-400'
                            }`}
                          >
                            {ch.number}
                          </span>
                          <span className="text-xs truncate block leading-snug">
                            {ch.title}
                          </span>
                        </div>

                        {isPassed && (
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-white' : 'text-emerald-500'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Chapter Workspace */}
        <div className="lg:col-span-8 space-y-5">
          {/* Chapter Header Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <div>
                <span className="text-xs font-mono font-bold text-[#7957F5] dark:text-[#D94BCB]">
                  {activeChapter.number} · {activeChapter.unit}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {activeChapter.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 w-fit">
                {classLevelTitle}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
              {activeChapter.description}
            </p>

            {/* Learning Objectives Pills */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Learning Objectives
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeChapter.learningObjectives.map((obj, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{obj}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Responsive Sub-Tabs: shared by Classes 6, 7, 8 and 9 */}
          <div className="grid w-full min-w-0 grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 p-2 bg-slate-100 dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/10">
            {[
              { id: 'concepts', label: '1. Concepts & Formulas', icon: BookOpen },
              { id: 'interactive', label: '2. Interactive Lab', icon: Sliders },
              { id: 'examples', label: '3. Worked Examples', icon: FileText },
              { id: 'practice', label: '4. Practice Questions', icon: HelpCircle },
              { id: 'test', label: '5. Chapter Test', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  aria-pressed={isTabActive}
                  className={`flex w-full min-w-0 min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-center text-xs sm:text-sm font-semibold leading-snug whitespace-normal break-words transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7957F5] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111321] ${
                    isTabActive
                      ? 'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="block w-full min-w-0 whitespace-normal break-words text-center">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: CONCEPTS & THEORY */}
          {activeTab === 'concepts' && (
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 space-y-6">
              {/* Formula Card */}
              {activeChapter.formula && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Fundamental Mathematical Formula</span>
                  </div>
                  <div className="text-sm sm:text-base font-mono overflow-x-auto py-1">
                    <MathView math={activeChapter.formula} displayMode={true} />
                  </div>
                </div>
              )}

              {/* 3 Explanation Levels Switcher */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Depth of Explanation
                  </span>
                  <div className="flex items-center p-1 bg-slate-100 dark:bg-white/[0.04] rounded-xl border border-slate-200 dark:border-white/10 text-xs">
                    {(['simple', 'detailed', 'advanced'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setExplanationLevel(lvl)}
                        className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all cursor-pointer ${
                          explanationLevel === lvl
                            ? 'bg-[#7957F5] text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {lvl === 'simple'
                          ? 'Intuitive / Simple'
                          : lvl === 'detailed'
                          ? 'Detailed / Rigorous'
                          : 'Challenge Reasoning'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explanation Content Box */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-sm leading-relaxed space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7957F5] dark:text-[#D94BCB]">
                    <Lightbulb className="w-4 h-4" />
                    <span>
                      {explanationLevel === 'simple'
                        ? 'Intuitive Core Explanation'
                        : explanationLevel === 'detailed'
                        ? 'Comprehensive Step-by-Step Mathematical Explanation'
                        : 'Deep Challenge & Proof Reasoning'}
                    </span>
                  </div>

                  <p>
                    {explanationLevel === 'simple' && activeChapter.simpleExplanation}
                    {explanationLevel === 'detailed' && activeChapter.detailedExplanation}
                    {explanationLevel === 'advanced' && activeChapter.advancedReasoning}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE LAB */}
          {activeTab === 'interactive' && (
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
                <div>
                  <h4 className="font-black text-base text-slate-900 dark:text-white">
                    {activeChapter.relatedActivityLabel || 'Interactive Mathematical Lab'}
                  </h4>
                  <span className="text-xs text-slate-500">
                    Interact directly with sliders and visual models to test mathematical concepts live.
                  </span>
                </div>
              </div>

              {/* Render Selected Interactive Tool */}
              <MiddleSchoolInteractiveToolView toolId={activeChapter.interactiveToolId} />
            </div>
          )}

          {/* TAB 3: WORKED EXAMPLES */}
          {activeTab === 'examples' && (
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 space-y-5">
              <h4 className="font-black text-base text-slate-900 dark:text-white">
                Detailed Worked Examples
              </h4>

              <div className="space-y-4">
                {activeChapter.workedExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#7957F5]/10 text-[#7957F5] dark:text-[#D94BCB]">
                        Example {i + 1}
                      </span>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                        {ex.title}
                      </h5>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {ex.description}
                    </p>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-mono font-bold text-slate-800 dark:text-white block mb-1">
                        Working Steps:
                      </span>
                      {ex.steps.map((st, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2">
                          <span className="text-[#7957F5] font-mono font-bold shrink-0">•</span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      Final Result: {ex.result}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRACTICE QUESTIONS */}
          {activeTab === 'practice' && (
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 space-y-6">
              {/* Guided Practice */}
              {activeChapter.guidedPractice && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Guided Practice Problem
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeChapter.guidedPractice.question}
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() =>
                        setShowHint((prev) => ({ ...prev, [activeChapter.id]: !prev[activeChapter.id] }))
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold text-xs cursor-pointer transition-colors"
                    >
                      {showHint[activeChapter.id] ? 'Hide Hint' : 'View Hint'}
                    </button>
                    <button
                      onClick={() =>
                        setShowSolution((prev) => ({ ...prev, [activeChapter.id]: !prev[activeChapter.id] }))
                      }
                      className="px-3 py-1.5 rounded-lg bg-[#7957F5]/10 hover:bg-[#7957F5]/20 text-[#7957F5] dark:text-[#D94BCB] font-bold text-xs cursor-pointer transition-colors"
                    >
                      {showSolution[activeChapter.id] ? 'Hide Solution' : 'View Solution'}
                    </button>
                  </div>

                  {showHint[activeChapter.id] && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-300">
                      <span className="font-bold">Hint: </span>
                      {activeChapter.guidedPractice.hint}
                    </div>
                  )}

                  {showSolution[activeChapter.id] && (
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white block">Step-by-Step Solution:</span>
                      <p>{activeChapter.guidedPractice.solution}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Independent Questions List */}
              <div className="space-y-3">
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                  Independent Challenge Questions
                </h5>
                <div className="space-y-2">
                  {activeChapter.independentQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex items-start gap-3 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <span className="font-mono font-bold text-slate-400 mt-0.5">#{idx + 1}</span>
                      <span className="leading-relaxed">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ZERO-LEAK CHAPTER TEST & POST-SUBMISSION RESULTS */}
          {activeTab === 'test' && (
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 space-y-6">
              {/* Header and Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h4 className="font-black text-lg text-slate-900 dark:text-white">
                      Chapter Assessment Test
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isSubmitted
                      ? 'Assessment submitted. Review your score breakdown and step-by-step explanations below.'
                      : 'Zero-leak assessment mode: Answers are not revealed until test submission.'}
                  </p>
                </div>

                {isSubmitted && (
                  <button
                    onClick={handleRetryTest}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Test</span>
                  </button>
                )}
              </div>

              {/* POST-SUBMISSION SUMMARY BANNER */}
              {isSubmitted && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold block">
                        Assessment Results
                      </span>
                      <h5 className="text-xl font-black text-slate-900 dark:text-white">
                        Score: {correctCount} / {totalQuestions} ({scorePercentage}%)
                      </h5>
                    </div>

                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold ${
                        scorePercentage >= 80
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : scorePercentage >= 50
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                          : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {scorePercentage >= 80
                        ? 'Mastery Achieved ★'
                        : scorePercentage >= 50
                        ? 'Good Progress'
                        : 'Review Recommended'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c0e17] border border-emerald-500/30">
                      <span className="text-[10px] text-slate-500 block">Correct</span>
                      <span className="text-base font-black text-emerald-500">{correctCount}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c0e17] border border-rose-500/30">
                      <span className="text-[10px] text-slate-500 block">Incorrect</span>
                      <span className="text-base font-black text-rose-500">{incorrectCount}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10">
                      <span className="text-[10px] text-slate-500 block">Unanswered</span>
                      <span className="text-base font-black text-slate-400">{unansweredCount}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TEST QUESTION VIEWER (Active during test or review mode) */}
              {totalQuestions > 0 && (
                <div className="space-y-4">
                  {/* Question Navigator Dots */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>
                      Question {currentQIndex + 1} of {totalQuestions}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {activeChapter.chapterQuiz.map((_, idx) => {
                        const isAns = currentChapterAnswers[idx] !== undefined;
                        const isCur = currentQIndex === idx;
                        const isCor = isSubmitted && currentChapterAnswers[idx] === activeChapter.chapterQuiz[idx].correctIdx;
                        const isInc = isSubmitted && isAns && !isCor;

                        return (
                          <button
                            key={idx}
                            onClick={() =>
                              setCurrentTestQIdx((prev) => ({ ...prev, [activeChapter.id]: idx }))
                            }
                            className={`w-7 h-7 rounded-lg text-[11px] font-bold cursor-pointer transition-all flex items-center justify-center ${
                              isCur
                                ? 'ring-2 ring-[#7957F5] scale-110'
                                : ''
                            } ${
                              isSubmitted
                                ? isCor
                                  ? 'bg-emerald-500 text-white'
                                  : isInc
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                                : isAns
                                ? 'bg-[#7957F5] text-white'
                                : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Question Card */}
                  {(() => {
                    const q = activeChapter.chapterQuiz[currentQIndex];
                    const selectedOpt = currentChapterAnswers[currentQIndex];

                    return (
                      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                          {q.question}
                        </p>

                        {/* Options List */}
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedOpt === optIdx;
                            const isCorrectOpt = optIdx === q.correctIdx;

                            // STRICT ZERO-LEAK: Only show colors if isSubmitted
                            let btnStyle = 'bg-white dark:bg-[#0c0e17] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200';

                            if (!isSubmitted) {
                              if (isSelected) {
                                btnStyle = 'bg-[#7957F5]/10 border-[#7957F5] text-[#7957F5] dark:text-[#D94BCB] font-bold shadow-xs';
                              } else {
                                btnStyle += ' hover:border-slate-300 dark:hover:border-white/20';
                              }
                            } else {
                              if (isCorrectOpt) {
                                btnStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                              } else if (isSelected && !isCorrectOpt) {
                                btnStyle = 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300 line-through';
                              } else {
                                btnStyle += ' opacity-50';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectOption(currentQIndex, optIdx)}
                                disabled={isSubmitted}
                                className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>

                                {isSubmitted && isCorrectOpt && (
                                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                    ✓ Correct Answer
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* POST-SUBMISSION DETAILED EXPLANATION PANEL */}
                        {isSubmitted && (
                          <div className="p-4 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                            <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800 dark:text-white">
                              <Lightbulb className="w-4 h-4 text-amber-500" />
                              <span>Mathematical Explanation & Rule:</span>
                            </div>

                            {q.ruleOrFormula && (
                              <div className="p-2 rounded bg-slate-100 dark:bg-white/5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                                Rule / Formula: {q.ruleOrFormula}
                              </div>
                            )}

                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                              {q.explanation}
                            </p>

                            {q.commonMistake && (
                              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-300 text-[11px]">
                                <span className="font-bold">Common Misconception: </span>
                                {q.commonMistake}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Navigation Buttons: Previous / Next / Submit */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
                          <button
                            onClick={() =>
                              setCurrentTestQIdx((prev) => ({
                                ...prev,
                                [activeChapter.id]: Math.max(0, currentQIndex - 1),
                              }))
                            }
                            disabled={currentQIndex === 0}
                            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 cursor-pointer flex items-center gap-1"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>Previous</span>
                          </button>

                          <div className="flex items-center gap-2">
                            {currentQIndex < totalQuestions - 1 ? (
                              <button
                                onClick={() =>
                                  setCurrentTestQIdx((prev) => ({
                                    ...prev,
                                    [activeChapter.id]: currentQIndex + 1,
                                  }))
                                }
                                className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-xs font-bold text-slate-800 dark:text-white cursor-pointer flex items-center gap-1"
                              >
                                <span>Next</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            ) : !isSubmitted ? (
                              <button
                                onClick={handleSubmitTest}
                                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Submit Chapter Test</span>
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
