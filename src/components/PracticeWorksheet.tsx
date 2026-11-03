import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { MathView } from './MathView.tsx';
import { Tilt3D, Reveal, GlassPanel, Aurora } from './ui/Depth.tsx';
import '../styles/practice.css';
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
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  RefreshCw,
  Layers,
  ArrowRight,
  Check,
  AlertCircle,
  Play,
  Timer,
  RotateCcw,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
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

/* A quiet SVG ring used for the live answered count and the final score. */
const ProgressRing: React.FC<{
  value: number;
  size?: number;
  label: string;
  caption?: string;
}> = ({ value, size = 92, label, caption }) => {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circumference;

  return (
    <div
      className={`practice-ring ${size >= 120 ? 'practice-ring--lg' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 80 80" role="img" aria-label={`${label}${caption ? ` ${caption}` : ''}, ${clamped}%`}>
        <circle className="practice-ring__track" cx="40" cy="40" r={radius} />
        <circle
          className="practice-ring__value"
          cx="40"
          cy="40"
          r={radius}
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <span className="practice-ring__center">
        <span className="practice-ring__num">{label}</span>
        {caption && <span className="practice-ring__cap">{caption}</span>}
      </span>
    </div>
  );
};

const STAGE_ORDER = ['all', '6th', '7th', '8th', '9th', '10th', '12th', 'engineering', 'graduation'] as const;

const TIME_OPTIONS = [
  { label: '5 min · sprint', val: 5 },
  { label: '10 min · standard', val: 10 },
  { label: '15 min · full', val: 15 },
  { label: 'Untimed', val: 0 },
];

const STAGE_LABELS: Record<AcademicStage, string> = {
  '6th': 'Class 6th',
  '7th': 'Class 7th',
  '8th': 'Class 8th',
  '9th': 'Class 9th',
  '10th': 'Class 10th',
  '12th': 'Class 12th',
  engineering: 'Engineering',
  graduation: 'Graduation',
};

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
  const accuracyPct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const answeredPct = questions.length ? (answeredCount / questions.length) * 100 : 0;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;

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

  const isLowTime = timeLimitMinutes > 0 && remainingSeconds < 60;
  const reviewFilters = [
    { id: 'all' as const, label: `All (${questions.length})` },
    { id: 'incorrect' as const, label: `Missed (${questions.length - score})` },
    { id: 'correct' as const, label: `Correct (${score})` },
  ];

  return (
    <div id="practice-worksheet-root" className="practice-root">
      {/* ========================================================
          CONFIRMATION MODAL BEFORE FINAL SUBMISSION
          ======================================================== */}
      {showSubmitConfirmModal && (
        <div
          className="practice-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="practice-submit-title"
        >
          <div className="practice-modal__panel">
            <div className="practice-modal__head">
              <span className="practice-modal__icon" aria-hidden="true">
                <AlertCircle />
              </span>
              <div>
                <h4 id="practice-submit-title">Unanswered questions</h4>
                <p>Confirmation required before grading</p>
              </div>
            </div>

            <p className="practice-modal__copy">
              You have <strong>{unansweredCount}</strong> unanswered question
              {unansweredCount > 1 ? 's' : ''} out of {questions.length}. Anything left blank is
              marked zero, and the proofs are revealed on submission.
            </p>

            <dl className="practice-modal__stats">
              <div>
                <dt>Attempted</dt>
                <dd>{answeredCount}</dd>
              </div>
              <div>
                <dt>Unanswered</dt>
                <dd>{unansweredCount}</dd>
              </div>
              <div>
                <dt>Marked</dt>
                <dd>{markedCount}</dd>
              </div>
            </dl>

            <div className="practice-modal__actions">
              <button
                type="button"
                className="practice-btn practice-btn--ghost practice-btn--sm"
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  // Find first unanswered question
                  const firstUnans = questions.findIndex((_, idx) => userAnswers[idx] === undefined);
                  if (firstUnans !== -1) setCurrentIdx(firstUnans);
                }}
              >
                Review unanswered
              </button>

              <button
                type="button"
                className="practice-btn practice-btn--sm"
                onClick={finishTestSubmission}
              >
                <Check />
                Confirm &amp; submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          1. PRE-TEST COUNTDOWN (3... 2... 1... GO!)
          ======================================================== */}
      {testStatus === 'countdown' && (
        <Reveal>
          <GlassPanel className="practice-countdown">
            <span className="practice-kicker">Zero-leak sitting</span>

            <div className="practice-countdown__dial">
              <span key={preCountdown} className="practice-countdown__num">
                {preCountdown > 0 ? preCountdown : 'GO'}
              </span>
            </div>

            <h2 className="practice-title practice-title--md">
              {preCountdown > 0 ? 'The sheet is about to open.' : 'Starting now.'}
            </h2>
            <p className="practice-countdown__meta">
              Stage <strong>{stageConfig.label}</strong> · {questions.length} questions ·{' '}
              {timeLimitMinutes > 0 ? `${timeLimitMinutes}-minute clock` : 'Untimed'}
            </p>

            <button
              type="button"
              className="practice-link"
              onClick={() => {
                setTestStatus('in-progress');
                setRemainingSeconds(timeLimitMinutes > 0 ? timeLimitMinutes * 60 : 0);
                setTimeSpentSeconds(0);
              }}
            >
              Skip the countdown
            </button>
          </GlassPanel>
        </Reveal>
      )}

      {/* ========================================================
          2. PRE-TEST LOBBY
          ======================================================== */}
      {testStatus === 'idle' && (
        <div className="practice-lobby">
          <Reveal>
            <GlassPanel className="practice-hero">
              <Aurora className="practice-hero__aurora" />

              <div className="practice-hero__copy">
                <div className="practice-hero__tags">
                  <span className="practice-chip">
                    <Sparkles />
                    Zero-leak evaluation
                  </span>
                  <span className="practice-chip">
                    <ShieldCheck />
                    {PRACTICE_QUESTIONS_BANK.length} verified questions
                  </span>
                </div>

                <h2 className="practice-title">
                  Six questions,
                  <br />
                  no answers in sight.
                </h2>

                <p className="practice-lead">
                  A real sitting for Class 6 through graduation mathematics. Set the stage and the
                  clock, submit once, then read every worked proof.
                </p>

                <div className="practice-hero__actions">
                  <button type="button" className="practice-btn" onClick={handleStartTest}>
                    <Play />
                    Start the sheet
                    <ArrowRight />
                  </button>
                  <a className="practice-btn practice-btn--ghost" href="#practice-how">
                    How practice works
                  </a>
                </div>

                <dl className="practice-hero__meta">
                  <div>
                    <dt>Sheet</dt>
                    <dd>{questions.length} questions</dd>
                  </div>
                  <div>
                    <dt>Stage</dt>
                    <dd>{stageConfig.shortLabel}</dd>
                  </div>
                  <div>
                    <dt>Clock</dt>
                    <dd>{timeLimitMinutes > 0 ? `${timeLimitMinutes} minutes` : 'Untimed'}</dd>
                  </div>
                  <div>
                    <dt>Proofs</dt>
                    <dd>After submission</dd>
                  </div>
                </dl>
              </div>

              {/* Calm 3D "worked page" */}
              <div className="depth-stage practice-hero__stage" aria-hidden="true">
                <span className="practice-hero__ring" />
                <Tilt3D className="practice-page" strength={7}>
                  <div className="practice-page__sheet practice-page__sheet--back" />
                  <div className="practice-page__sheet practice-page__sheet--mid" />

                  <div className="practice-page__sheet practice-page__sheet--main">
                    <div className="practice-page__grid" />

                    <div className="practice-page__head">
                      <span>Sheet 08 · Practice</span>
                      <strong>CalcAura</strong>
                    </div>

                    <div className="practice-page__line">
                      <span className="practice-page__num">01</span>
                      <span>x² − 5x + 6 = 0</span>
                    </div>
                    <div className="practice-page__line">
                      <span className="practice-page__num">02</span>
                      <span>(x − 2)(x − 3) = 0</span>
                    </div>
                    <div className="practice-page__rule" />
                    <div className="practice-page__line">
                      <span className="practice-page__num">03</span>
                      <span>∫ 2x dx = x² + C</span>
                    </div>
                    <div className="practice-page__line">
                      <span className="practice-page__num">04</span>
                      <span>sin²θ + cos²θ = 1</span>
                    </div>

                    <span className="practice-page__answer">
                      <Check />
                      x = 2, 3 · marked
                    </span>
                  </div>

                  <span className="practice-page__glyph practice-page__glyph--sum">∑</span>
                  <span className="practice-page__glyph practice-page__glyph--pi">π</span>
                </Tilt3D>
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal delay={90}>
            <GlassPanel className="practice-setup">
              <div className="practice-setup__head">
                <div>
                  <span className="practice-kicker">Sheet setup</span>
                  <h3 className="practice-title practice-title--sm">
                    Choose the paper, then the clock.
                  </h3>
                </div>
                <span className="practice-chip">{stagePoolCount} in this pool</span>
              </div>

              <div className="practice-setup__group">
                <span className="practice-setup__label">
                  <Layers />
                  Academic stage
                </span>
                <div className="practice-pills" role="group" aria-label="Academic stage">
                  {STAGE_ORDER.map((stageKey) => {
                    const cfg = STAGES_CONFIG[stageKey];
                    const isSelected = selectedStage === stageKey;
                    const count = getQuestionCountByStage(stageKey);

                    return (
                      <button
                        key={stageKey}
                        type="button"
                        onClick={() => handleSelectStage(stageKey)}
                        aria-pressed={isSelected}
                        className={`practice-pill ${isSelected ? 'is-active' : ''}`}
                      >
                        <span>{cfg.shortLabel}</span>
                        <span className="practice-pill__count">{count}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="practice-setup__hint">{stageConfig.description}</p>
              </div>

              <div className="practice-setup__row">
                <span className="practice-setup__label">
                  <Clock />
                  Clock limit
                </span>
                <div className="practice-pills practice-pills--time" role="group" aria-label="Clock limit">
                  {TIME_OPTIONS.map((tOpt) => {
                    const isSelected = timeLimitMinutes === tOpt.val;
                    return (
                      <button
                        key={tOpt.val}
                        type="button"
                        onClick={() => setTimeLimitMinutes(tOpt.val)}
                        aria-pressed={isSelected}
                        className={`practice-pill practice-pill--time ${isSelected ? 'is-active' : ''}`}
                      >
                        {tOpt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal delay={150}>
            <section className="practice-how" id="practice-how" aria-labelledby="practice-how-title">
              <div className="practice-how__head">
                <span className="practice-kicker">How practice works</span>
                <h3 id="practice-how-title" className="practice-title practice-title--sm">
                  A real sitting, then the proofs.
                </h3>
              </div>

              <ol className="practice-how__list">
                <li>
                  <span className="practice-how__num">01</span>
                  <div>
                    <h4>Zero leaks while you sit</h4>
                    <p>
                      No hints, ticks or worked steps until you submit. Every choice can be changed
                      while the clock runs.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="practice-how__num">02</span>
                  <div>
                    <h4>Mark what needs another look</h4>
                    <p>
                      Flag a question for review, jump with the palette, and see answered and
                      untouched questions at a glance.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="practice-how__num">03</span>
                  <div>
                    <h4>Read the working, then retry</h4>
                    <p>
                      After submission every question opens its own proof, and mistakes can be
                      retried as a shorter sheet.
                    </p>
                  </div>
                </li>
              </ol>
            </section>
          </Reveal>
        </div>
      )}

      {/* ========================================================
          3. ACTIVE SOLVER
          ======================================================== */}
      {testStatus === 'in-progress' && (
        <div className="practice-active">
          <Reveal>
            <GlassPanel className="practice-toolbar">
              <div className="practice-toolbar__top">
                <div className="practice-toolbar__status">
                  <span className="practice-chip practice-chip--accent">
                    {currentIdx + 1} / {questions.length}
                  </span>
                  <span className="practice-toolbar__topic">{currentQ?.topic}</span>
                </div>

                <div className="practice-toolbar__actions">
                  <div className="practice-toolbar__progress">
                    <ProgressRing
                      value={answeredPct}
                      size={52}
                      label={`${answeredCount}/${questions.length}`}
                      caption="done"
                    />
                    <span className="practice-toolbar__progress-text">
                      <span>{unansweredCount}</span>
                      <span>left</span>
                    </span>
                  </div>

                  <span
                    className={`practice-timer ${isLowTime ? 'is-low' : ''}`}
                    title={timeLimitMinutes > 0 ? 'Remaining time' : 'Elapsed time'}
                  >
                    <Timer />
                    <span>
                      {timeLimitMinutes > 0
                        ? formatTime(remainingSeconds)
                        : formatTime(timeSpentSeconds)}
                    </span>
                  </span>

                  <button
                    type="button"
                    className="practice-btn practice-btn--sm"
                    onClick={handleRequestSubmit}
                  >
                    <Check />
                    Submit ({answeredCount}/{questions.length})
                  </button>
                </div>
              </div>

              <div
                className="practice-rail"
                role="progressbar"
                aria-label="Answered questions"
                aria-valuemin={0}
                aria-valuemax={questions.length}
                aria-valuenow={answeredCount}
              >
                {questions.map((_, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAnswered = userAnswers[idx] !== undefined;
                  return (
                    <span
                      key={idx}
                      className={`practice-rail__seg ${isAnswered ? 'is-answered' : ''} ${
                        isCurrent ? 'is-current' : ''
                      }`}
                    />
                  );
                })}
              </div>

              <div className="practice-palette" role="group" aria-label="Question palette">
                {questions.map((_, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isReview = markedForReview[idx];

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIdx(idx)}
                      aria-current={isCurrent ? 'step' : undefined}
                      aria-label={`Question ${idx + 1}${isAnswered ? ', answered' : ', unanswered'}${
                        isReview ? ', marked for review' : ''
                      }`}
                      title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ' (Unanswered)'}${
                        isReview ? ' [Marked for review]' : ''
                      }`}
                      className={`practice-palette__btn ${isAnswered ? 'is-answered' : ''} ${
                        isReview ? 'is-marked' : ''
                      } ${isCurrent ? 'is-current' : ''}`}
                    >
                      {idx + 1}
                      {isReview && <span className="practice-palette__flag" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal delay={80}>
            <GlassPanel className="practice-question">
              <div className="practice-question__meta">
                <div className="practice-question__tags">
                  <span className="practice-chip practice-chip--accent">
                    Question {currentIdx + 1}
                  </span>
                  <span className="practice-chip">{STAGE_LABELS[currentQ.stage]}</span>
                  <span className="practice-chip">{currentQ.category}</span>
                  <span
                    className={`practice-chip practice-chip--${currentQ.difficulty.toLowerCase()}`}
                  >
                    {currentQ.difficulty}
                  </span>
                </div>

                <div className="practice-question__tools">
                  <button
                    type="button"
                    onClick={handleToggleMarkForReview}
                    aria-pressed={Boolean(markedForReview[currentIdx])}
                    className={`practice-chip practice-chip--button ${
                      markedForReview[currentIdx] ? 'is-marked' : ''
                    }`}
                  >
                    {markedForReview[currentIdx] ? <BookmarkCheck /> : <Bookmark />}
                    {markedForReview[currentIdx] ? 'Marked for review' : 'Mark for review'}
                  </button>
                </div>
              </div>

              <div className="practice-question__body">
                <span className="practice-question__topic">{currentQ.topic}</span>
                <h3 className="practice-question__problem">{currentQ.problem}</h3>

                {currentQ.latex && (
                  <div className="practice-math">
                    <MathView math={currentQ.latex} displayMode={true} />
                  </div>
                )}
              </div>

              <div className="practice-options">
                <span className="practice-options__label">Choose one answer</span>

                <div className="practice-options__grid">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentIdx] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx)}
                        aria-pressed={isSelected}
                        className={`practice-option ${isSelected ? 'is-selected' : ''}`}
                      >
                        <span className="practice-option__letter">{OPTION_LETTERS[optIdx]}</span>
                        <span className="practice-option__text">{opt}</span>
                        <span className="practice-option__check" aria-hidden="true">
                          {isSelected ? <Check /> : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="practice-question__footer">
                <button
                  type="button"
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="practice-btn practice-btn--ghost practice-btn--sm"
                >
                  <ChevronLeft />
                  Previous
                </button>

                <div className="practice-question__footer-right">
                  <button type="button" className="practice-link" onClick={handleQuitToLobby}>
                    Leave sheet
                  </button>

                  {currentIdx < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))
                      }
                      className="practice-btn practice-btn--sm"
                    >
                      Next question
                      <ChevronRight />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRequestSubmit}
                      className="practice-btn practice-btn--sm"
                    >
                      <Check />
                      Submit sheet
                    </button>
                  )}
                </div>
              </div>
            </GlassPanel>
          </Reveal>
        </div>
      )}

      {/* ========================================================
          4. RESULTS
          ======================================================== */}
      {testStatus === 'completed' && (
        <div className="practice-results">
          {historySaveStatus === 'saved' && (
            <div className="practice-banner practice-banner--ok">
              <span className="practice-banner__text">
                <ShieldCheck />
                Saved to your CalcAura account and synced with Supabase.
              </span>
            </div>
          )}

          {historySaveStatus === 'sign-in-required' && (
            <div className="practice-banner practice-banner--warn">
              <span className="practice-banner__text">
                <ShieldCheck />
                Sign in to keep this sheet in your cloud history. Your score stays visible in this
                session either way.
              </span>
              <button
                type="button"
                className="practice-btn practice-btn--sm"
                onClick={() => (onNavigateToAuth ? onNavigateToAuth() : window.location.assign('/sign-in'))}
              >
                Sign in
              </button>
            </div>
          )}

          {historySaveStatus === 'error' && (
            <div className="practice-banner practice-banner--error">
              <span className="practice-banner__text">
                <AlertCircle />
                The result is not confirmed as cloud-saved. Check the Supabase connection and RLS
                setup, then submit a new attempt.
              </span>
            </div>
          )}

          <Reveal>
            <GlassPanel className="practice-score">
              <div className="practice-score__ring">
                <ProgressRing value={accuracyPct} size={148} label={`${accuracyPct}%`} caption="accuracy" />
              </div>

              <div className="practice-score__copy">
                {timedOut && (
                  <span className="practice-chip practice-chip--intermediate">
                    <AlertCircle />
                    Time expired · auto-evaluated
                  </span>
                )}

                <span className="practice-kicker">Marked · {stageConfig.label}</span>

                <h2 className="practice-title practice-title--md">
                  {score === questions.length
                    ? `Every one. ${score}/${questions.length}.`
                    : score >= Math.ceil(questions.length * 0.65)
                    ? 'Strong paper, a few proofs to read.'
                    : score >= Math.ceil(questions.length * 0.35)
                    ? 'A fair start. Walk the working.'
                    : 'Read the proofs, then retake.'}
                </h2>

                <p className="practice-score__sub">
                  {score === questions.length
                    ? 'Every answer matched. The working below is still worth reading — it is the same method without the time pressure.'
                    : 'The score is only half the sheet. Every question below carries its own step-by-step proof and the method behind the answer.'}
                </p>

                <div className="practice-score__metrics">
                  <div>
                    <span>Score</span>
                    <strong>
                      {score}
                      <em>/{questions.length}</em>
                    </strong>
                  </div>
                  <div>
                    <span>Accuracy</span>
                    <strong>
                      {accuracyPct}
                      <em>%</em>
                    </strong>
                  </div>
                  <div>
                    <span>Time</span>
                    <strong>{formatTime(timeSpentSeconds)}</strong>
                  </div>
                  <div>
                    <span>Answers</span>
                    <strong className="practice-score__status">
                      <span className="is-correct">✓ {score}</span>
                      <span className="is-wrong">✗ {answeredCount - score}</span>
                      <span className="is-skipped">? {unansweredCount}</span>
                    </strong>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </Reveal>

          {topicBreakdown.length > 0 && (
            <Reveal delay={80}>
              <GlassPanel className="practice-topics">
                <div className="practice-topics__head">
                  <span className="practice-kicker">Topic breakdown</span>
                  <span className="practice-chip">{topicBreakdown.length} topics in this sheet</span>
                </div>

                <div className="practice-topics__grid">
                  {topicBreakdown.map((t) => (
                    <div key={t.topic} className="practice-topic">
                      <div className="practice-topic__row">
                        <span>{t.topic}</span>
                        <span>
                          {t.correct}/{t.total} · {t.pct}%
                        </span>
                      </div>
                      <div className="practice-topic__bar">
                        <span style={{ width: `${t.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </Reveal>
          )}

          <Reveal delay={140}>
            <div className="practice-actions">
              <button type="button" className="practice-btn practice-btn--sm" onClick={handleStartTest}>
                <RefreshCw />
                New sheet
              </button>

              {score < questions.length && (
                <button
                  type="button"
                  className="practice-btn practice-btn--ghost practice-btn--sm"
                  onClick={handlePracticeIncorrectOnly}
                >
                  <RotateCw />
                  Retry mistakes ({questions.length - score})
                </button>
              )}

              <button
                type="button"
                className="practice-btn practice-btn--ghost practice-btn--sm"
                onClick={handleRetakeSameSet}
              >
                <RotateCcw />
                Retake this set
              </button>

              <button type="button" className="practice-link" onClick={handleQuitToLobby}>
                Change stage
              </button>

              {onNavigateToHistory && (
                <button
                  type="button"
                  className="practice-btn practice-btn--ghost practice-btn--sm"
                  onClick={onNavigateToHistory}
                  title="View completed sheets in History"
                >
                  <History />
                  View in history
                </button>
              )}

              {onExitReview && (
                <button
                  type="button"
                  className="practice-btn practice-btn--ghost practice-btn--sm"
                  onClick={onExitReview}
                >
                  <ChevronLeft />
                  Back to history
                </button>
              )}
            </div>
          </Reveal>

          <div className="practice-review">
            <Reveal>
              <div className="practice-review__head">
                <div>
                  <span className="practice-kicker">Worked proofs</span>
                  <h3 className="practice-title practice-title--sm">Question by question</h3>
                </div>

                <div
                  className="practice-pills practice-pills--filters"
                  role="group"
                  aria-label="Filter worked proofs"
                >
                  {reviewFilters.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setResultsFilter(f.id)}
                      aria-pressed={resultsFilter === f.id}
                      className={`practice-pill ${resultsFilter === f.id ? 'is-active' : ''}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {questions.map((q, idx) => {
              const selectedOptIdx = userAnswers[idx];
              const isCorrect = selectedOptIdx === q.correctIdx;
              const isUnanswered = selectedOptIdx === undefined;

              if (resultsFilter === 'correct' && !isCorrect) return null;
              if (resultsFilter === 'incorrect' && isCorrect) return null;

              return (
                <Reveal key={q.id} delay={Math.min(idx * 60, 240)}>
                  <article
                    className={`practice-review-card ${
                      isCorrect ? 'is-correct' : isUnanswered ? 'is-skipped' : 'is-wrong'
                    }`}
                  >
                    <div className="practice-review-card__head">
                      <div className="practice-review-card__meta">
                        <span className="practice-review-card__index">
                          Q{String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="practice-chip">{STAGE_LABELS[q.stage]}</span>
                        <span className="practice-review-card__topic">{q.topic}</span>
                      </div>

                      <span
                        className={`practice-state ${
                          isCorrect
                            ? 'practice-state--correct'
                            : isUnanswered
                            ? 'practice-state--skipped'
                            : 'practice-state--wrong'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 />
                            Correct
                          </>
                        ) : isUnanswered ? (
                          <>
                            <AlertCircle />
                            Not attempted
                          </>
                        ) : (
                          <>
                            <XCircle />
                            Incorrect
                          </>
                        )}
                      </span>
                    </div>

                    <h4 className="practice-review-card__problem">{q.problem}</h4>

                    {q.latex && (
                      <div className="practice-math">
                        <MathView math={q.latex} displayMode={true} />
                      </div>
                    )}

                    <div className="practice-review-card__options">
                      {q.options.map((opt, optIdx) => {
                        const isOptionSelected = selectedOptIdx === optIdx;
                        const isOptionCorrect = optIdx === q.correctIdx;

                        return (
                          <div
                            key={optIdx}
                            className={`practice-review-option ${
                              isOptionCorrect
                                ? 'is-correct'
                                : isOptionSelected && !isCorrect
                                ? 'is-chosen'
                                : ''
                            }`}
                          >
                            <span className="practice-review-option__letter">
                              {OPTION_LETTERS[optIdx]}
                            </span>
                            <span className="practice-review-option__text">{opt}</span>
                            {isOptionCorrect && (
                              <span className="practice-review-option__tag">Correct</span>
                            )}
                            {isOptionSelected && !isOptionCorrect && (
                              <span className="practice-review-option__tag">Yours</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="practice-proof">
                      <div className="practice-proof__head">
                        <Sparkles />
                        Worked proof &amp; step solution
                      </div>
                      <p>{q.explanation}</p>

                      <div className="practice-proof__foot">
                        <span>{q.topic}</span>
                        <span>{STAGE_LABELS[q.stage]}</span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
