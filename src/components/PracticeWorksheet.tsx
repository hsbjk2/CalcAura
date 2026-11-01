import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { MathView } from './MathView.tsx';
import {
  sampleRandomQuestions,
  PracticeQuestion,
  AcademicStage,
  STAGES_CONFIG,
  getQuestionCountByStage,
  PRACTICE_QUESTIONS_BANK,
} from '../data/practiceQuestionsData.ts';
import {
  CheckCircle2,
  XCircle,
  RotateCw,
  Award,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  RefreshCw,
  BookOpen,
  GraduationCap,
  Layers,
  ArrowRight,
  Check,
  AlertCircle,
  Play,
  Timer,
  Zap,
  RotateCcw,
  ShieldCheck,
  Flame,
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  ListFilter,
  BarChart3,
  History,
} from 'lucide-react';
import {
  PracticeHistoryEntry,
  savePracticeHistoryEntry,
} from '../data/historyStorage.ts';
import { useAuth } from '../context/AuthContext.tsx';

type TestStatus = 'idle' | 'countdown' | 'in-progress' | 'completed';

interface SavedTestAttempt {
  timestamp: number;
  stage: AcademicStage | 'all';
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  userAnswers: Record<number, number>;
  questions: PracticeQuestion[];
}

export interface PracticeWorksheetProps {
  initialAttemptToReview?: PracticeHistoryEntry | null;
  onExitReview?: () => void;
  onNavigateToHistory?: () => void;
  onNavigateToAuth?: () => void;
}

export const PracticeWorksheet: React.FC<PracticeWorksheetProps> = ({
  initialAttemptToReview,
  onExitReview,
  onNavigateToHistory,
  onNavigateToAuth,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [historySaveStatus, setHistorySaveStatus] = useState<'saved' | 'sign-in-required' | 'error' | null>(null);

  // Current stage filter ('all' | '10th' | '12th' | 'engineering' | 'graduation')
  const [selectedStage, setSelectedStage] = useState<AcademicStage | 'all'>('all');

  // Test state: 'idle' (ready to start), 'countdown' (3-2-1), 'in-progress' (active), 'completed' (results)
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [preCountdown, setPreCountdown] = useState<number>(3);

  // Time limit options: 5, 10, 15 minutes (or 0 for unlimited)
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(10);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(10 * 60);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);

  // Questions currently active
  const [questions, setQuestions] = useState<PracticeQuestion[]>(() =>
    sampleRandomQuestions(6, 'all')
  );

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  // Store user answers as a map: questionIndex -> selectedOptionIndex (0..3)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  // Questions marked for review during active test
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  // Confirmation modal state before final submission
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);
  const [timedOut, setTimedOut] = useState<boolean>(false);

  // Filter in completed results: 'all' | 'incorrect' | 'correct'
  const [resultsFilter, setResultsFilter] = useState<'all' | 'incorrect' | 'correct'>('all');

  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Format mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Restore saved attempt or load review attempt
  useEffect(() => {
    if (initialAttemptToReview && Array.isArray(initialAttemptToReview.questions)) {
      setQuestions(initialAttemptToReview.questions);
      const answers = initialAttemptToReview.userAnswers || (initialAttemptToReview as any).submittedAnswers || {};
      setUserAnswers(answers);
      const validStage =
        initialAttemptToReview.stage && STAGES_CONFIG[initialAttemptToReview.stage]
          ? initialAttemptToReview.stage
          : 'all';
      setSelectedStage(validStage);
      setTimeSpentSeconds(initialAttemptToReview.timeSpentSeconds || (initialAttemptToReview as any).timeTakenSeconds || 0);
      setTimeLimitMinutes(initialAttemptToReview.timeLimitMinutes || 0);
      setTestStatus('completed');
      return;
    }

    try {
      const savedStr = localStorage.getItem('calcaura_last_test_attempt');
      if (savedStr) {
        const attempt: SavedTestAttempt = JSON.parse(savedStr);
        if (attempt && Array.isArray(attempt.questions) && attempt.questions.length > 0) {
          // Keep saved attempt in state memory but do not force 'completed' unless requested
        }
      }
    } catch {}
  }, [initialAttemptToReview]);

  // Pre-test 3-2-1 Countdown Effect
  useEffect(() => {
    if (testStatus === 'countdown') {
      if (preCountdown > 0) {
        const timer = setTimeout(() => {
          setPreCountdown((prev) => prev - 1);
        }, 850);
        return () => clearTimeout(timer);
      } else {
        // Countdown finished -> Start test
        setTestStatus('in-progress');
        setRemainingSeconds(timeLimitMinutes > 0 ? timeLimitMinutes * 60 : 0);
        setTimeSpentSeconds(0);
      }
    }
  }, [testStatus, preCountdown, timeLimitMinutes]);

  // In-test active timer effect
  useEffect(() => {
    if (testStatus === 'in-progress') {
      countdownTimerRef.current = setInterval(() => {
        setTimeSpentSeconds((prev) => prev + 1);

        if (timeLimitMinutes > 0) {
          setRemainingSeconds((prev) => {
            if (prev <= 1) {
              // Auto-submit when time expires
              if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
              setTimedOut(true);
              finishTestSubmission();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, [testStatus, timeLimitMinutes]);

  // Start test handler
  const handleStartTest = () => {
    setHistorySaveStatus(null);
    const newQuestions = sampleRandomQuestions(6, selectedStage);
    setQuestions(newQuestions);
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentIdx(0);
    setTimedOut(false);
    setShowSubmitConfirmModal(false);
    setPreCountdown(3);
    setTestStatus('countdown');
  };

  // Switch stage in lobby
  const handleSelectStage = useCallback((stage: AcademicStage | 'all') => {
    setSelectedStage(stage);
    const newQuestions = sampleRandomQuestions(6, stage);
    setQuestions(newQuestions);
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentIdx(0);
    setTimedOut(false);
    setShowSubmitConfirmModal(false);
  }, []);

  // Retake the same exact 6 questions
  const handleRetakeSameSet = useCallback(() => {
    setHistorySaveStatus(null);
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentIdx(0);
    setTimedOut(false);
    setShowSubmitConfirmModal(false);
    setPreCountdown(3);
    setTestStatus('countdown');
  }, []);

  // Practice only incorrect & unanswered questions
  const handlePracticeIncorrectOnly = useCallback(() => {
    setHistorySaveStatus(null);
    const incorrectOrUnanswered = questions.filter(
      (q, idx) => userAnswers[idx] !== q.correctIdx
    );
    if (incorrectOrUnanswered.length === 0) return;
    setQuestions(incorrectOrUnanswered);
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentIdx(0);
    setTimedOut(false);
    setShowSubmitConfirmModal(false);
    setPreCountdown(3);
    setTestStatus('countdown');
  }, [questions, userAnswers]);

  // Option selection during test (answers can be freely changed before submission)
  const handleSelectOption = (optionIdx: number) => {
    if (testStatus !== 'in-progress') return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIdx,
    }));
  };

  // Toggle mark for review on current question
  const handleToggleMarkForReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentIdx]: !prev[currentIdx],
    }));
  };

  // Calculate score and accuracy
  const score = useMemo(() => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIdx) {
        correctCount++;
      }
    });
    return correctCount;
  }, [questions, userAnswers]);

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;
  const currentQ = questions[currentIdx] || questions[0];
  const stageConfig =
    (selectedStage && STAGES_CONFIG[selectedStage]) ||
    STAGES_CONFIG.all || {
      id: 'all' as const,
      label: 'Practice Sheet',
      shortLabel: 'Practice',
      badge: 'Assessment',
      color: 'from-violet-600 to-fuchsia-600',
      description: 'Practice assessment and mathematics worksheet.',
    };
  const stagePoolCount = getQuestionCountByStage(selectedStage);

  // Trigger submission confirmation check
  const handleRequestSubmit = () => {
    if (unansweredCount > 0) {
      setShowSubmitConfirmModal(true);
    } else {
      finishTestSubmission();
    }
  };

  // Final confirmed test submission
  const finishTestSubmission = () => {
    setShowSubmitConfirmModal(false);
    setTestStatus('completed');
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = questions.length - answeredCount;
    const incorrectCount = answeredCount - score;
    const percentage = Math.round((score / questions.length) * 100);
    const attemptId = 'ps_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);

    const historyEntry: PracticeHistoryEntry = {
      id: attemptId,
      title: `${stageConfig.label} Practice Assessment`,
      stage: selectedStage,
      stageLabel: stageConfig.label,
      classChapter: `${stageConfig.label} · ${questions.length} Questions`,
      classGrade: stageConfig.label,
      chapter: stageConfig.badge,
      submittedAt: Date.now(),
      questions: JSON.parse(JSON.stringify(questions)),
      userAnswers: { ...userAnswers },
      submittedAnswers: { ...userAnswers },
      score,
      totalQuestions: questions.length,
      percentage,
      correctCount: score,
      incorrectCount,
      unansweredCount,
      timeSpentSeconds,
      timeTakenSeconds: timeSpentSeconds,
      timeLimitMinutes,
    };

    if (isAuthenticated && user?.id) {
      historyEntry.userId = user.id;
      setHistorySaveStatus(null);
      savePracticeHistoryEntry(historyEntry, user.id)
        .then(() => setHistorySaveStatus('saved'))
        .catch((err) => {
          console.error('Failed to save practice history to Supabase:', err);
          setHistorySaveStatus('error');
        });
    } else {
      setHistorySaveStatus('sign-in-required');
    }

    const el = document.getElementById('practice-worksheet-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuitToLobby = () => {
    setHistorySaveStatus(null);
    setTestStatus('idle');
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentIdx(0);
    setShowSubmitConfirmModal(false);
  };

  // Topic-wise performance calculation
  const topicBreakdown = useMemo(() => {
    const map: Record<string, { total: number; correct: number }> = {};
    questions.forEach((q, idx) => {
      const topic = q.topic || q.category || 'General';
      if (!map[topic]) map[topic] = { total: 0, correct: 0 };
      map[topic].total++;
      if (userAnswers[idx] === q.correctIdx) {
        map[topic].correct++;
      }
    });
    return Object.entries(map).map(([topic, data]) => ({
      topic,
      total: data.total,
      correct: data.correct,
      pct: Math.round((data.correct / data.total) * 100),
    }));
  }, [questions, userAnswers]);

  const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

  const stageBadges: Record<AcademicStage, { label: string; bg: string; text: string; border: string }> = {
    '6th': {
      label: 'Class 6th',
      bg: 'bg-teal-500/10 dark:bg-teal-500/20',
      text: 'text-teal-600 dark:text-teal-400',
      border: 'border-teal-500/30',
    },
    '7th': {
      label: 'Class 7th',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/30',
    },
    '8th': {
      label: 'Class 8th',
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500/30',
    },
    '9th': {
      label: 'Class 9th',
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-500/30',
    },
    '10th': {
      label: 'Class 10th',
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500/30',
    },
    '12th': {
      label: 'Class 12th',
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500/30',
    },
    engineering: {
      label: 'Engineering',
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-500/30',
    },
    graduation: {
      label: 'Graduation',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/30',
    },
  };

  const isLowTime = timeLimitMinutes > 0 && remainingSeconds < 60;

  return (
    <div id="practice-worksheet-root" className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 transition-all">
      {/* ========================================================
          CONFIRMATION MODAL BEFORE FINAL SUBMISSION
          ======================================================== */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Unanswered Questions
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Confirmation required before grading
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              You have <strong className="text-amber-600 dark:text-amber-400 font-bold">{unansweredCount}</strong> unanswered question{unansweredCount > 1 ? 's' : ''} out of {questions.length}. Any unattempted questions will receive 0 marks.
            </p>

            <div className="p-3 bg-slate-100 dark:bg-white/[0.04] rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Attempted: <strong>{answeredCount}</strong></span>
              <span>Unanswered: <strong>{unansweredCount}</strong></span>
              <span>Marked for Review: <strong>{Object.values(markedForReview).filter(Boolean).length}</strong></span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  // Find first unanswered question
                  const firstUnans = questions.findIndex((_, idx) => userAnswers[idx] === undefined);
                  if (firstUnans !== -1) setCurrentIdx(firstUnans);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Review Unanswered
              </button>

              <button
                onClick={finishTestSubmission}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Confirm & Submit Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          1. PRE-TEST COUNTDOWN ANIMATION SCREEN (3... 2... 1... GO!)
          ======================================================== */}
      {testStatus === 'countdown' && (
        <div className="min-h-[420px] flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="relative mb-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#7957F5] to-[#D94BCB] p-1 flex items-center justify-center shadow-[0_0_40px_rgba(121,87,245,0.4)] animate-pulse">
              <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0D16] flex items-center justify-center">
                <span className="text-5xl sm:text-7xl font-black font-mono bg-gradient-to-r from-[#7957F5] to-[#D94BCB] bg-clip-text text-transparent">
                  {preCountdown > 0 ? preCountdown : 'GO!'}
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
            {preCountdown > 0 ? 'Get Ready for Examination' : 'Starting Now!'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Stage: <strong className="text-[#7957F5]">{stageConfig.label}</strong> · 6 Questions ·{' '}
            {timeLimitMinutes > 0 ? `${timeLimitMinutes} Minutes Timer` : 'Untimed'}
          </p>

          <button
            onClick={() => {
              setTestStatus('in-progress');
              setRemainingSeconds(timeLimitMinutes > 0 ? timeLimitMinutes * 60 : 0);
              setTimeSpentSeconds(0);
            }}
            className="mt-6 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white underline cursor-pointer"
          >
            Skip Countdown
          </button>
        </div>
      )}

      {/* ========================================================
          2. PRE-TEST LOBBY SCREEN (OPTION TO START TEST)
          ======================================================== */}
      {testStatus === 'idle' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#7957F5]/10 dark:bg-[#7957F5]/20 border border-[#7957F5]/30 text-[#7957F5] dark:text-[#D94BCB] text-[11px] font-mono font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Automated Evaluation Engine
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-semibold">
                    Backup Pool: {PRACTICE_QUESTIONS_BANK.length} Questions
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                  <GraduationCap className="w-8 h-8 text-[#7957F5]" />
                  <span>Mathematics Examination Portal</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] max-w-2xl leading-relaxed">
                  Test your mathematical problem solving under realistic exam conditions. Correct answers and step-by-step proofs remain strictly hidden during the test until final confirmed submission.
                </p>
              </div>

              {/* Big Start Test CTA Button */}
              <div className="shrink-0 flex flex-col items-center sm:items-end gap-2">
                <button
                  onClick={handleStartTest}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7957F5] via-[#9E46EF] to-[#D94BCB] hover:brightness-110 active:scale-95 text-white text-base font-extrabold shadow-[0_0_25px_rgba(121,87,245,0.4)] cursor-pointer transition-all flex items-center justify-center gap-3 group"
                >
                  <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                  <span>Start Test (6 Questions)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-sky-500" />
                  Countdown starts immediately on click
                </span>
              </div>
            </div>

            {/* Academic Stage Selector */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#7957F5]" />
                  Select Stage to Solve:
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Pool: <strong>{stagePoolCount}</strong> verified questions
                </span>
              </div>

              {/* Stage Pills */}
              <div className="flex items-center gap-2 overflow-x-auto thin-scrollbar pb-1 max-w-full">
                {(['all', '6th', '7th', '8th', '9th', '10th', '12th', 'engineering', 'graduation'] as const).map((stageKey) => {
                  const cfg = STAGES_CONFIG[stageKey];
                  const isSelected = selectedStage === stageKey;
                  const count = getQuestionCountByStage(stageKey);

                  return (
                    <button
                      key={stageKey}
                      onClick={() => handleSelectStage(stageKey)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white shadow-md shadow-[#7957F5]/25 font-bold scale-[1.02]'
                          : 'bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.09] border border-slate-200/70 dark:border-white/10'
                      }`}
                    >
                      <span>{cfg.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {count} Qs
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                {stageConfig.description}
              </p>
            </div>

            {/* Countdown Duration Configuration */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Countdown Timer Limit:</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: '5 Mins (Sprint)', val: 5 },
                  { label: '10 Mins (Standard)', val: 10 },
                  { label: '15 Mins (Comprehensive)', val: 15 },
                  { label: 'Untimed', val: 0 },
                ].map((tOpt) => {
                  const isSelected = timeLimitMinutes === tOpt.val;
                  return (
                    <button
                      key={tOpt.val}
                      onClick={() => setTimeLimitMinutes(tOpt.val)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-600 text-white shadow-xs font-bold'
                          : 'bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                      }`}
                    >
                      {tOpt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Test Structure & Instructions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Strict Zero-Leak Mode
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No answers, hints, or solution steps are revealed during the test. Change answers anytime before submission.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Mark for Review & Palette
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Flag questions to revisit later. Unanswered, answered, and review states are distinctly color-coded.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Detailed Review & Retry
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Full step proofs, formula rules, mistake analysis, and instant retry mode for incorrect questions upon submission.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. ACTIVE SOLVER VIEW (SOLVING THE QUESTIONS)
          ======================================================== */}
      {testStatus === 'in-progress' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Top Test Control Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Quick-Jump Question Palette */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = userAnswers[idx] !== undefined;
                const isReview = markedForReview[idx];

                let btnClass = 'bg-slate-100 dark:bg-white/[0.05] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10';

                if (isCurrent) {
                  btnClass = 'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white shadow-md shadow-[#7957F5]/30 ring-2 ring-[#7957F5]/40 font-bold';
                } else if (isReview) {
                  btnClass = 'bg-amber-500/15 border-amber-500/60 text-amber-700 dark:text-amber-300 font-bold';
                } else if (isAnswered) {
                  btnClass = 'bg-sky-500/15 border-sky-500/50 text-sky-700 dark:text-sky-300 font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-mono text-xs transition-all cursor-pointer flex items-center justify-center border ${btnClass}`}
                    title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ' (Unanswered)'}${isReview ? ' [Marked for Review]' : ''}`}
                  >
                    <span>{idx + 1}</span>
                    {isReview ? (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 text-[8px] flex items-center justify-center text-white">
                        ★
                      </span>
                    ) : isAnswered ? (
                      <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-sky-500" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Countdown Clock Display & Submit Button */}
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all ${
                  isLowTime
                    ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 animate-pulse'
                    : 'bg-slate-100 dark:bg-white/[0.05] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200'
                }`}
                title={timeLimitMinutes > 0 ? 'Remaining Time' : 'Elapsed Time'}
              >
                <Timer className={`w-4 h-4 ${isLowTime ? 'text-rose-500' : 'text-sky-500'}`} />
                <span>
                  {timeLimitMinutes > 0
                    ? `Remaining: ${formatTime(remainingSeconds)}`
                    : `Time: ${formatTime(timeSpentSeconds)}`}
                </span>
              </div>

              {/* Submit / Finish Button */}
              <button
                onClick={handleRequestSubmit}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-95 text-white text-xs font-bold shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Submit Exam ({answeredCount}/{questions.length})</span>
              </button>
            </div>
          </div>

          {/* Active Question Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 shadow-lg space-y-5">
            {/* Question Header Meta */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#7957F5]/10 text-[#7957F5] dark:text-[#D94BCB] font-mono text-xs font-bold">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    stageBadges[currentQ.stage].bg
                  } ${stageBadges[currentQ.stage].text} border ${stageBadges[currentQ.stage].border}`}
                >
                  {stageBadges[currentQ.stage].label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                  {currentQ.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Mark for Review Toggle Button */}
                <button
                  onClick={handleToggleMarkForReview}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    markedForReview[currentIdx]
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300'
                      : 'bg-slate-100 dark:bg-white/[0.05] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${markedForReview[currentIdx] ? 'fill-amber-500' : ''}`} />
                  <span>{markedForReview[currentIdx] ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>

                <span
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                    currentQ.difficulty === 'Basic'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : currentQ.difficulty === 'Intermediate'
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                  }`}
                >
                  {currentQ.difficulty}
                </span>
              </div>
            </div>

            {/* Problem Statement */}
            <div>
              <span className="text-xs font-bold text-[#7957F5] dark:text-[#D94BCB] uppercase tracking-wider block mb-1.5">
                {currentQ.topic}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.problem}
              </h3>
            </div>


            {/* Multiple Choice Options (4 Choices) - ZERO correctness leaks */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">
                Select Your Answer (Click to choose or change):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentIdx] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[52px] ${
                        isSelected
                          ? 'bg-[#7957F5]/10 dark:bg-[#7957F5]/20 border-[#7957F5] dark:border-[#D94BCB] ring-2 ring-[#7957F5]/30 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100/80 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white'
                              : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {OPTION_LETTERS[optIdx]}
                        </span>
                        <span className="text-sm font-medium leading-snug break-words">
                          {opt}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#7957F5] dark:bg-[#D94BCB] flex items-center justify-center text-white shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Navigation Controls */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Question</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuitToLobby}
                  className="px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Exit Exam
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-4 sm:px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleRequestSubmit}
                    className="px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Submit Exam</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          4. RESULTS VIEW (SHOWN AFTER SUBMITTING OR TIMEOUT)
          ======================================================== */}
      {testStatus === 'completed' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {historySaveStatus === 'saved' && (
            <div className="p-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 text-sm text-emerald-700 dark:text-emerald-300">
              Your submitted result has been saved to your CALCAURA account and synced with Supabase.
            </div>
          )}
          {historySaveStatus === 'sign-in-required' && (
            <div className="p-4 rounded-2xl border border-amber-500/25 bg-amber-500/5 text-sm text-slate-700 dark:text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span>Sign in with Clerk to save this real result to your personal cloud history. Your score remains visible in this session.</span>
              <button onClick={() => onNavigateToAuth ? onNavigateToAuth() : window.location.assign('/sign-in')} className="shrink-0 px-4 py-2 rounded-xl bg-[#7957F5] text-white text-xs font-bold">Sign in</button>
            </div>
          )}
          {historySaveStatus === 'error' && (
            <div className="p-3 rounded-2xl border border-rose-500/25 bg-rose-500/5 text-sm text-rose-700 dark:text-rose-300">
              The result is not confirmed as cloud-saved. Check your Supabase connection and RLS setup, then submit a new attempt after fixing the issue.
            </div>
          )}
          {/* Executive Performance Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 shadow-lg text-center space-y-5">
            <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-[#7957F5]/20 to-[#D94BCB]/20 border border-[#7957F5]/30 text-[#7957F5] dark:text-[#D94BCB]">
              <Award className="w-10 h-10" />
            </div>

            <div>
              {timedOut && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20 mb-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Time Limit Expired · Automatically Evaluated
                </span>
              )}
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1">
                Official Assessment Results · Stage: {stageConfig.label}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {score === questions.length
                  ? `Mastery Achieved! Perfect ${score}/${questions.length}`
                  : score >= Math.ceil(questions.length * 0.65)
                  ? 'Great Job! Strong Problem Solving'
                  : score >= Math.ceil(questions.length * 0.35)
                  ? 'Good Effort! Keep Practicing'
                  : 'Review the Step Proofs & Retake'}
              </h3>
            </div>

            {/* Score Ring / Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-2xl mx-auto pt-2">
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Score
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white block mt-0.5">
                  {score} <span className="text-sm text-slate-400 font-normal">/ {questions.length}</span>
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Accuracy
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#7957F5] dark:text-[#D94BCB] block mt-0.5">
                  {Math.round((score / questions.length) * 100)}%
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Time Spent
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-600 dark:text-sky-400 block mt-0.5">
                  {formatTime(timeSpentSeconds)}
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Status
                </span>
                <span className="text-xs font-mono font-bold block mt-2 text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-600 dark:text-emerald-400">✓ {score}</span> ·{' '}
                  <span className="text-rose-500">✗ {answeredCount - score}</span> ·{' '}
                  <span className="text-amber-500">? {unansweredCount}</span>
                </span>
              </div>
            </div>

            {/* Chapter-wise Performance Breakdown */}
            {topicBreakdown.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.06] max-w-2xl mx-auto text-left">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block mb-2">
                  Topic & Chapter-wise Performance:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topicBreakdown.map((t) => (
                    <div
                      key={t.topic}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate pr-2">
                        {t.topic}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-slate-500">
                          {t.correct}/{t.total}
                        </span>
                        <span
                          className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${
                            t.pct === 100
                              ? 'bg-emerald-500/15 text-emerald-600'
                              : t.pct >= 50
                              ? 'bg-sky-500/15 text-sky-600'
                              : 'bg-rose-500/15 text-rose-600'
                          }`}
                        >
                          {t.pct}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons: Retake, Practice Mistakes, New Test */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={handleStartTest}
                className="px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Start New 6-Question Test</span>
              </button>

              {score < questions.length && (
                <button
                  onClick={handlePracticeIncorrectOnly}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs sm:text-sm font-bold cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Retry Incorrect Questions ({questions.length - score})</span>
                </button>
              )}

              <button
                onClick={handleRetakeSameSet}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold cursor-pointer transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Exact Set</span>
              </button>

              <button
                onClick={handleQuitToLobby}
                className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold cursor-pointer transition-all"
              >
                Change Stage / Settings
              </button>

              {onNavigateToHistory && (
                <button
                  onClick={onNavigateToHistory}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#7957F5]/10 hover:bg-[#7957F5]/20 text-[#7957F5] dark:text-[#D94BCB] border border-[#7957F5]/30 text-xs sm:text-sm font-bold cursor-pointer transition-all flex items-center gap-1.5"
                  title="View completed tests in History"
                >
                  <History className="w-4 h-4" />
                  <span>View in History</span>
                </button>
              )}

              {onExitReview && (
                <button
                  onClick={onExitReview}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <span>Back to History</span>
                </button>
              )}
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#7957F5]" />
                <span>Question-by-Question Solution Breakdown & Step Proofs</span>
              </h4>

              {/* Review Filter Pills */}
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'all', label: `All (${questions.length})` },
                  { id: 'incorrect', label: `Incorrect/Skipped (${questions.length - score})` },
                  { id: 'correct', label: `Correct (${score})` },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setResultsFilter(f.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      resultsFilter === f.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                        : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {questions.map((q, idx) => {
              const selectedOptIdx = userAnswers[idx];
              const isCorrect = selectedOptIdx === q.correctIdx;
              const isUnanswered = selectedOptIdx === undefined;
              const qBadge = stageBadges[q.stage];

              if (resultsFilter === 'correct' && !isCorrect) return null;
              if (resultsFilter === 'incorrect' && isCorrect) return null;

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 ${
                    isCorrect
                      ? 'bg-emerald-500/[0.04] border-emerald-500/30'
                      : isUnanswered
                      ? 'bg-amber-500/[0.04] border-amber-500/30'
                      : 'bg-rose-500/[0.04] border-rose-500/30'
                  }`}
                >
                  {/* Top Status & Topic Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                        Question {idx + 1} of {questions.length}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${qBadge.bg} ${qBadge.text} border ${qBadge.border}`}
                      >
                        {qBadge.label}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {q.topic}
                      </span>
                    </div>

                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correct (+1 Mark)
                        </span>
                      ) : isUnanswered ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/20">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Not Attempted (0 Marks)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorrect (0 Marks)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Original Question Statement */}
                  <div>
                    <h5 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                      {q.problem}
                    </h5>
                  </div>

                  {q.latex && (
                    <div className="p-3 bg-slate-100 dark:bg-black/30 rounded-xl text-center overflow-x-auto thin-scrollbar">
                      <MathView math={q.latex} displayMode={true} />
                    </div>
                  )}

                  {/* Options List with submitted vs correct status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOptIdx === optIdx;
                      const isOptionCorrect = optIdx === q.correctIdx;

                      let optClass = 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300';

                      if (isOptionCorrect) {
                        optClass = 'bg-emerald-500/15 border-emerald-500/60 text-emerald-800 dark:text-emerald-200 font-bold';
                      } else if (isOptionSelected && !isCorrect) {
                        optClass = 'bg-rose-500/15 border-rose-500/60 text-rose-800 dark:text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${optClass}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] shrink-0 bg-slate-200 dark:bg-white/10">
                              {OPTION_LETTERS[optIdx]}
                            </span>
                            <span className="truncate">{opt}</span>
                          </div>
                          {isOptionCorrect && (
                            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                              ✓ Correct Answer
                            </span>
                          )}
                          {isOptionSelected && !isOptionCorrect && (
                            <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 shrink-0">
                              ✗ Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step Solution & Mathematical Proof */}
                  <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#7957F5] dark:text-[#D94BCB]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Step-by-Step Proof & Solution:</span>
                    </div>
                    <p className="leading-relaxed whitespace-pre-line">{q.explanation}</p>

                    {/* Rule, Formula & Concept */}
                    <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>Standard Rule: {q.topic} verified standard theorem</span>
                      <span>Target Level: {stageBadges[q.stage].label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
