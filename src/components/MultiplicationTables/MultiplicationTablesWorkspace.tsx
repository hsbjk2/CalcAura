import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Grid3X3,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Printer,
  Sparkles,
  Trophy,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Layers,
  ArrowRight,
  Copy,
  Check,
  X,
  FileText,
  BookOpen,
  Zap,
  Play,
  RotateCcw,
  Timer
} from 'lucide-react';
import { Reveal, GlassPanel, Tilt3D, Aurora } from '../ui/Depth.tsx';
import '../../styles/multiplication.css';

type TableMode = 'learn' | 'practice' | 'challenge' | 'missing';
type MultiplierRange = 10 | 12 | 20 | 25;
type PrintSheetMode = 'answers' | 'blanks' | 'missing';
type PrintScope = 'single' | '1to10' | '11to20' | '21to30';

const MODES: { id: TableMode; label: string; icon: React.ReactNode }[] = [
  { id: 'learn', label: 'Learn table', icon: <BookOpen className="mult-icon" /> },
  { id: 'practice', label: 'Flashcards', icon: <Zap className="mult-icon" /> },
  { id: 'missing', label: 'Missing number', icon: <HelpCircle className="mult-icon" /> },
  { id: 'challenge', label: 'Speed drill', icon: <Trophy className="mult-icon" /> }
];

export const MultiplicationTablesWorkspace: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<number>(7);
  const [multiplierRange, setMultiplierRange] = useState<MultiplierRange>(10);
  const [mode, setMode] = useState<TableMode>('learn');
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(4);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- PRINT MODAL STATE ---
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [printSheetMode, setPrintSheetMode] = useState<PrintSheetMode>('answers');
  const [printScope, setPrintScope] = useState<PrintScope>('single');
  const [copiedSheet, setCopiedSheet] = useState<boolean>(false);

  // --- PRACTICE & CHALLENGE STATE ---
  const [quizMultiplier, setQuizMultiplier] = useState<number>(6);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [challengeComplete, setChallengeComplete] = useState<boolean>(false);
  const [missingPosition, setMissingPosition] = useState<'a' | 'b' | 'c'>('b'); // a * b = c

  // Sound pronunciation synthesis
  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    } catch {}
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Challenge timer
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      setChallengeComplete(true);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  // Handle quiz submission
  const handleCheckAnswer = () => {
    const num = Number(userAnswer.trim());
    let expected = selectedTable * quizMultiplier;

    if (mode === 'missing') {
      if (missingPosition === 'a') expected = selectedTable;
      else if (missingPosition === 'b') expected = quizMultiplier;
      else expected = selectedTable * quizMultiplier;
    }

    if (num === expected) {
      setFeedback('correct');
      setScore((prev) => prev + 10 + streak * 2);
      setStreak((prev) => prev + 1);
      if (soundEnabled) speakText('Correct!');
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else {
      setFeedback('wrong');
      setStreak(0);
      if (soundEnabled) speakText('Try again');
    }
  };

  const nextQuestion = () => {
    setUserAnswer('');
    setFeedback(null);
    const nextMult = Math.floor(Math.random() * multiplierRange) + 1;
    setQuizMultiplier(nextMult);
    const positions: ('a' | 'b' | 'c')[] = ['a', 'b', 'c'];
    setMissingPosition(positions[Math.floor(Math.random() * positions.length)]);
  };

  const startChallenge = () => {
    setScore(0);
    setStreak(0);
    setTimerSeconds(45);
    setTimerActive(true);
    setChallengeComplete(false);
    nextQuestion();
  };

  // Tables to generate for printing
  const tablesToPrint = useMemo(() => {
    if (printScope === '1to10') return Array.from({ length: 10 }, (_, i) => i + 1);
    if (printScope === '11to20') return Array.from({ length: 10 }, (_, i) => i + 11);
    if (printScope === '21to30') return Array.from({ length: 10 }, (_, i) => i + 21);
    return [selectedTable];
  }, [printScope, selectedTable]);

  // Copy plain text worksheet
  const handleCopyWorksheetText = () => {
    const title = `CALCAURA MATHEMATICS — MULTIPLICATION WORKSHEET\nDate: _______________  Student: _______________\n\n`;
    let body = '';

    tablesToPrint.forEach((tbl) => {
      body += `=== TABLE OF ${tbl} ===\n`;
      for (let m = 1; m <= multiplierRange; m++) {
        if (printSheetMode === 'answers') {
          body += `${tbl} × ${m} = ${tbl * m}\n`;
        } else if (printSheetMode === 'blanks') {
          body += `${tbl} × ${m} = ______\n`;
        } else {
          body += `${tbl} × ______ = ${tbl * m}\n`;
        }
      }
      body += '\n';
    });

    navigator.clipboard.writeText(title + body);
    setCopiedSheet(true);
    setTimeout(() => setCopiedSheet(false), 2000);
  };

  const handleTriggerPrint = () => {
    try {
      window.print();
    } catch {
      handleCopyWorksheetText();
    }
  };

  const currentProduct = selectedTable * selectedMultiplier;
  const squareValue = selectedTable * selectedTable;
  const nineAnchor = Math.min(9, multiplierRange);
  const nineProduct = 9 * nineAnchor;
  const nineDigitSum = String(nineProduct)
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0);
  const miniTable = Array.from({ length: 9 }, (_, i) => selectedTable * (i + 1));

  return (
    <div
      ref={containerRef}
      className={`mult-studio ${isFullscreen ? 'is-fullscreen' : ''}`}
    >
      {/* Print Stylesheet injection for clean paper print */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #calcaura-print-sheet, #calcaura-print-sheet * {
            visibility: visible !important;
          }
          #calcaura-print-sheet {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            padding: 24px !important;
            border: 0 !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
          }
          .mult-studio .mult-modal,
          .mult-studio .mult-modal__panel,
          .mult-studio .mult-modal__preview {
            position: static !important;
            display: block !important;
            overflow: visible !important;
            max-height: none !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
          }
          .mult-studio .mult-modal__scrim {
            display: none !important;
          }
        }
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}
      <Reveal as="section" className="mult-hero">
        <Aurora />

        <div className="mult-hero__copy">
          <span className="mult-eyebrow">
            <Sparkles className="mult-icon mult-icon--accent" aria-hidden="true" />
            Multiplication studio · tables 1–30
          </span>

          <h1 className="mult-hero__title">
            Every table,
            <br />
            <em>made visible.</em>
          </h1>

          <p className="mult-hero__lead">
            Arrays, recitation, missing factors and speed drills for all thirty tables.
            One quiet desk for the patterns behind the answers.
          </p>

          <div className="mult-hero__meta" aria-label="Workspace summary">
            <span className="mult-chip">
              <Grid3X3 className="mult-icon" aria-hidden="true" /> 30 tables
            </span>
            <span className="mult-chip">
              <Layers className="mult-icon" aria-hidden="true" /> 4 modes
            </span>
            <span className="mult-chip">
              <Volume2 className="mult-icon" aria-hidden="true" /> Voice recitation
            </span>
          </div>
        </div>

        <div className="mult-hero__visual" aria-hidden="true">
          <Tilt3D className="mult-object" strength={8}>
            <span className="mult-object__halo" />
            <div className="mult-object__stack">
              <div className="mult-object__sheet mult-object__sheet--back">
                <div className="mult-object__topline">
                  <span>Tables</span>
                  <span>01—30</span>
                </div>
                <span className="mult-object__rule" />
                <span className="mult-object__rule mult-object__rule--short" />
                <span className="mult-object__ghost-number">×</span>
              </div>

              <div className="mult-object__sheet mult-object__sheet--mid">
                <div className="mult-object__topline">
                  <span>Pattern</span>
                  <span>{String(selectedTable).padStart(2, '0')}</span>
                </div>
                <div className="mult-object__mini">
                  {miniTable.map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
              </div>

              <div className="mult-object__sheet mult-object__sheet--front">
                <div className="mult-object__topline">
                  <span>Table of</span>
                  <span>{String(selectedTable).padStart(2, '0')}</span>
                </div>
                <div className="mult-object__equation">
                  {selectedTable}
                  <span>×</span>
                  {selectedMultiplier}
                </div>
                <div className="mult-object__product">= {currentProduct}</div>
                <div className="mult-object__footer">
                  <span>CalcAura</span>
                  <span>×{multiplierRange}</span>
                </div>
              </div>
            </div>
          </Tilt3D>
        </div>
      </Reveal>

      {/* ------------------------------------------------------------------ */}
      {/* Toolbar                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Reveal delay={60}>
        <GlassPanel className="mult-toolbar">
          <div className="mult-toolbar__status">
            <span className="mult-kicker">Now studying</span>
            <div className="mult-toolbar__title">
              Table of <strong>{selectedTable}</strong>
              <span className="mult-toolbar__range">×1—{multiplierRange}</span>
            </div>
          </div>

          <div className="mult-actions">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              aria-pressed={soundEnabled}
              className={`mult-action ${soundEnabled ? 'is-on' : ''}`}
            >
              {soundEnabled ? <Volume2 className="mult-icon" aria-hidden="true" /> : <VolumeX className="mult-icon" aria-hidden="true" />}
              <span>Voice {soundEnabled ? 'on' : 'off'}</span>
            </button>

            <button type="button" onClick={toggleFullscreen} className="mult-action">
              {isFullscreen ? <Minimize2 className="mult-icon" aria-hidden="true" /> : <Maximize2 className="mult-icon" aria-hidden="true" />}
              <span>{isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPrintModalOpen(true)}
              className="mult-action mult-action--accent"
            >
              <Printer className="mult-icon" aria-hidden="true" />
              <span>Print sheet</span>
            </button>
          </div>
        </GlassPanel>
      </Reveal>

      {/* ------------------------------------------------------------------ */}
      {/* Table switcher                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Reveal delay={110}>
        <GlassPanel className="mult-switcher">
          <div className="mult-switcher__head">
            <div>
              <span className="mult-kicker">
                <Grid3X3 className="mult-icon" aria-hidden="true" /> Choose a table
              </span>
              <p className="mult-switcher__hint">Pill a number to rebuild the whole desk.</p>
            </div>

            <div className="mult-switcher__nav">
              <button
                type="button"
                onClick={() => setSelectedTable((prev) => Math.max(1, prev - 1))}
                disabled={selectedTable === 1}
                className="mult-icon-btn"
                aria-label="Previous table"
              >
                <ChevronLeft className="mult-icon" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedTable((prev) => Math.min(30, prev + 1))}
                disabled={selectedTable === 30}
                className="mult-icon-btn"
                aria-label="Next table"
              >
                <ChevronRight className="mult-icon" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedTable(Math.floor(Math.random() * 30) + 1)}
                className="mult-btn mult-btn--quiet mult-btn--sm"
              >
                <Shuffle className="mult-icon" aria-hidden="true" /> Random
              </button>
            </div>
          </div>

          <div className="mult-switcher__grid" role="group" aria-label="Multiplication tables 1 to 30">
            {Array.from({ length: 30 }).map((_, i) => {
              const num = i + 1;
              const isCurrent = selectedTable === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedTable(num)}
                  aria-pressed={isCurrent}
                  className={`mult-table-btn ${isCurrent ? 'is-active' : ''}`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </GlassPanel>
      </Reveal>

      {/* ------------------------------------------------------------------ */}
      {/* Modes + range                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Reveal delay={150}>
        <GlassPanel className="mult-controls">
          <div className="mult-modes" role="group" aria-label="Learning mode">
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                aria-pressed={mode === item.id}
                className={`mult-mode ${mode === item.id ? 'is-active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mult-range" role="group" aria-label="Multiplier range">
            <span className="mult-kicker">Range</span>
            {[10, 12, 20, 25].map((rng) => (
              <button
                key={rng}
                type="button"
                onClick={() => setMultiplierRange(rng as MultiplierRange)}
                aria-pressed={multiplierRange === rng}
                className={`mult-range__btn ${multiplierRange === rng ? 'is-active' : ''}`}
              >
                ×{rng}
              </button>
            ))}
          </div>
        </GlassPanel>
      </Reveal>

      {/* ------------------------------------------------------------------ */}
      {/* MODE 1: LEARN                                                     */}
      {/* ------------------------------------------------------------------ */}
      {mode === 'learn' && (
        <Reveal className="mult-learn" delay={40}>
          <GlassPanel className="mult-panel mult-recitation">
            <div className="mult-panel__head">
              <div>
                <span className="mult-kicker">Recitation list</span>
                <h2 className="mult-panel__title">Table of {selectedTable}</h2>
              </div>
              <span className="mult-panel__hint">Tap a row to visualise</span>
            </div>

            <div className="mult-recitation__list">
              {Array.from({ length: multiplierRange }).map((_, i) => {
                const mult = i + 1;
                const product = selectedTable * mult;
                const isSelected = selectedMultiplier === mult;

                return (
                  <div key={mult} className={`mult-row ${isSelected ? 'is-active' : ''}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMultiplier(mult);
                        speakText(`${selectedTable} times ${mult} is ${product}`);
                      }}
                      aria-pressed={isSelected}
                      className="mult-row__select"
                    >
                      <span className="mult-row__index">{String(mult).padStart(2, '0')}</span>
                      <span className="mult-row__expr">
                        {selectedTable} × {mult}
                      </span>
                    </button>

                    <div className="mult-row__right">
                      <span className="mult-row__product">{product}</span>
                      <button
                        type="button"
                        onClick={() => speakText(`${selectedTable} times ${mult} is ${product}`)}
                        className="mult-row__audio"
                        aria-label={`Speak ${selectedTable} times ${mult} equals ${product}`}
                      >
                        <Volume2 className="mult-icon" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassPanel>

          <GlassPanel className="mult-panel mult-visual">
            <div className="mult-equation">
              <div>
                <span className="mult-kicker">Visualising equation</span>
                <div className="mult-equation__line">
                  {selectedTable} × {selectedMultiplier} = <strong>{currentProduct}</strong>
                </div>
                <p className="mult-equation__note">
                  “{selectedTable} groups of {selectedMultiplier}” or “{selectedMultiplier} groups of {selectedTable}”
                </p>
              </div>

              <button
                type="button"
                onClick={() => speakText(`${selectedTable} multiplied by ${selectedMultiplier} equals ${currentProduct}`)}
                className="mult-btn mult-btn--accent mult-btn--sm"
              >
                <Volume2 className="mult-icon" aria-hidden="true" /> Speak equation
              </button>
            </div>

            <div className="mult-array">
              <div className="mult-array__head">
                <span>
                  Dot matrix · {selectedTable} rows × {selectedMultiplier} columns
                </span>
                <span>{currentProduct} dots</span>
              </div>

              <div className="mult-array__canvas math-grid">
                <div
                  className="mult-array__grid"
                  style={{
                    gridTemplateColumns: `repeat(${selectedMultiplier}, minmax(12px, 18px))`
                  }}
                >
                  {Array.from({ length: selectedTable * selectedMultiplier }).map((_, idx) => (
                    <span key={idx} className="mult-dot" />
                  ))}
                </div>
              </div>
            </div>

            <div className="mult-addition">
              <span className="mult-kicker">Repeated addition</span>
              <p>
                {Array.from({ length: selectedMultiplier })
                  .map(() => selectedTable)
                  .join(' + ')}{' '}
                = <strong>{currentProduct}</strong>
              </p>
            </div>
          </GlassPanel>
        </Reveal>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODE 2: FLASHCARDS                                                */}
      {/* ------------------------------------------------------------------ */}
      {mode === 'practice' && (
        <Reveal className="mult-stage" delay={40}>
          <GlassPanel className="mult-practice">
            <div className="mult-practice__head">
              <span className="mult-kicker">Flashcard practice</span>
              <span className="mult-practice__hint">Table of {selectedTable}</span>
            </div>

            <div className="mult-question">
              <span className="mult-question__ghost" aria-hidden="true">
                ×
              </span>
              <div className="mult-question__line">
                {selectedTable} <span>×</span> {quizMultiplier}
              </div>
            </div>

            <div className="mult-answer">
              <input
                type="number"
                inputMode="numeric"
                placeholder="Your answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                className="mult-input"
                aria-label="Your answer"
              />
              <button type="button" onClick={handleCheckAnswer} className="mult-btn mult-btn--accent">
                Verify
                <ArrowRight className="mult-icon" aria-hidden="true" />
              </button>
            </div>

            {feedback && (
              <div className={`mult-feedback ${feedback === 'correct' ? 'is-correct' : 'is-wrong'}`} role="status">
                {feedback === 'correct' ? (
                  <>
                    <CheckCircle2 className="mult-icon" aria-hidden="true" /> Brilliant — that is correct.
                  </>
                ) : (
                  <>
                    <HelpCircle className="mult-icon" aria-hidden="true" /> Not quite. Try the row above in the table.
                  </>
                )}
              </div>
            )}
          </GlassPanel>
        </Reveal>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODE 3: MISSING NUMBER                                            */}
      {/* ------------------------------------------------------------------ */}
      {mode === 'missing' && (
        <Reveal className="mult-stage" delay={40}>
          <GlassPanel className="mult-practice">
            <div className="mult-practice__head">
              <span className="mult-kicker">Fill in the missing factor</span>
              <span className="mult-practice__hint">Table of {selectedTable}</span>
            </div>

            <div className="mult-question mult-question--missing">
              <span className="mult-question__ghost" aria-hidden="true">
                ?
              </span>
              <div className="mult-question__line">
                <span>{missingPosition === 'a' ? '____' : selectedTable}</span>
                <span>×</span>
                <span>{missingPosition === 'b' ? '____' : quizMultiplier}</span>
                <span>=</span>
                <span>{missingPosition === 'c' ? '____' : selectedTable * quizMultiplier}</span>
              </div>
            </div>

            <div className="mult-answer">
              <input
                type="number"
                inputMode="numeric"
                placeholder="Missing number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                className="mult-input"
                aria-label="Missing number"
              />
              <button type="button" onClick={handleCheckAnswer} className="mult-btn mult-btn--accent">
                Check
                <ArrowRight className="mult-icon" aria-hidden="true" />
              </button>
            </div>

            {feedback && (
              <div className={`mult-feedback ${feedback === 'correct' ? 'is-correct' : 'is-wrong'}`} role="status">
                {feedback === 'correct' ? (
                  <>
                    <CheckCircle2 className="mult-icon" aria-hidden="true" /> Superb — that completes the equation.
                  </>
                ) : (
                  <>
                    <HelpCircle className="mult-icon" aria-hidden="true" /> Incorrect. Give it another thought.
                  </>
                )}
              </div>
            )}
          </GlassPanel>
        </Reveal>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODE 4: SPEED DRILL                                               */}
      {/* ------------------------------------------------------------------ */}
      {mode === 'challenge' && (
        <Reveal className="mult-stage" delay={40}>
          <GlassPanel className="mult-practice">
            <div className="mult-drill__head">
              <div className="mult-drill__label">
                <Trophy className="mult-icon mult-icon--accent" aria-hidden="true" />
                <span>Speed challenge</span>
              </div>
              <div className="mult-drill__stats">
                <span className="mult-stat">
                  <Timer className="mult-icon" aria-hidden="true" /> {timerSeconds}s
                </span>
                <span className="mult-stat">Score {score}</span>
                <span className="mult-stat">Streak {streak}</span>
              </div>
            </div>

            {!timerActive && !challengeComplete ? (
              <div className="mult-drill__ready">
                <span className="mult-drill__glyph" aria-hidden="true">
                  ×
                </span>
                <h3>Ready for a 45-second drill?</h3>
                <p>
                  Test your mastery of the table of {selectedTable}. Answer as many questions as you can
                  before the clock runs out.
                </p>
                <button type="button" onClick={startChallenge} className="mult-btn mult-btn--accent">
                  <Play className="mult-icon" aria-hidden="true" /> Start drill
                </button>
              </div>
            ) : timerActive ? (
              <div className="mult-drill__active">
                <div className="mult-question mult-question--compact">
                  <div className="mult-question__line">
                    {selectedTable} × {quizMultiplier} <span>= ?</span>
                  </div>
                </div>

                <div className="mult-answer mult-answer--compact">
                  <input
                    type="number"
                    inputMode="numeric"
                    autoFocus
                    placeholder="Answer"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                    className="mult-input"
                    aria-label="Answer"
                  />
                  <button type="button" onClick={handleCheckAnswer} className="mult-btn mult-btn--accent">
                    Next
                    <ArrowRight className="mult-icon" aria-hidden="true" />
                  </button>
                </div>

                {feedback && (
                  <div className={`mult-feedback ${feedback === 'correct' ? 'is-correct' : 'is-wrong'}`} role="status">
                    {feedback === 'correct' ? (
                      <>
                        <CheckCircle2 className="mult-icon" aria-hidden="true" /> Correct. Keep the streak alive.
                      </>
                    ) : (
                      <>
                        <HelpCircle className="mult-icon" aria-hidden="true" /> Try again.
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="mult-drill__done">
                <Trophy className="mult-icon mult-icon--accent mult-drill__trophy" aria-hidden="true" />
                <h3>Time is up.</h3>
                <div className="mult-drill__score">
                  <span>Final score</span>
                  <strong>{score} points</strong>
                  <span>Final streak {streak}</span>
                </div>
                <button type="button" onClick={startChallenge} className="mult-btn mult-btn--accent">
                  <RotateCcw className="mult-icon" aria-hidden="true" /> Try again
                </button>
              </div>
            )}
          </GlassPanel>
        </Reveal>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Patterns                                                           */}
      {/* ------------------------------------------------------------------ */}
      <Reveal as="section" className="mult-patterns" delay={80}>
        <div className="mult-patterns__head">
          <div>
            <span className="mult-kicker">
              <Lightbulb className="mult-icon mult-icon--accent" aria-hidden="true" /> Patterns in multiplication
            </span>
            <h2 className="mult-patterns__title">The table is a map, not a list.</h2>
          </div>
          <p className="mult-patterns__lead">
            Four quiet rules turn thirty answers into one shape you can reason with.
          </p>
        </div>

        <div className="mult-patterns__grid">
          <GlassPanel as="article" className="mult-pattern">
            <span className="mult-pattern__index">01 / Squares</span>
            <h3 className="mult-pattern__title">Squares sit on the diagonal.</h3>
            <p className="mult-pattern__copy">
              When both factors match, the answer is a square. It is the hinge the rest of the table
              folds around.
            </p>
            <div className="mult-pattern__math">
              {selectedTable} × {selectedTable} = <strong>{squareValue}</strong>
            </div>
          </GlassPanel>

          <GlassPanel as="article" className="mult-pattern">
            <span className="mult-pattern__index">02 / Turnaround</span>
            <h3 className="mult-pattern__title">Order never changes the product.</h3>
            <p className="mult-pattern__copy">
              Commutativity means one fact covers two questions. Learn it once, read it both ways.
            </p>
            <div className="mult-pattern__math mult-pattern__math--stack">
              <span>
                {selectedTable} × {selectedMultiplier} = {currentProduct}
              </span>
              <span>
                {selectedMultiplier} × {selectedTable} = {currentProduct}
              </span>
            </div>
          </GlassPanel>

          <GlassPanel as="article" className="mult-pattern">
            <span className="mult-pattern__index">03 / The nine trick</span>
            <h3 className="mult-pattern__title">Digits in a nine product add to nine.</h3>
            <p className="mult-pattern__copy">
              A quick check for every row of the nine table — no recitation required.
            </p>
            <div className="mult-pattern__math">
              9 × {nineAnchor} = <strong>{nineProduct}</strong>
              <span className="mult-pattern__proof">
                {String(nineProduct)
                  .split('')
                  .join(' + ')}{' '}
                = {nineDigitSum}
              </span>
            </div>
          </GlassPanel>

          <GlassPanel as="article" className="mult-pattern">
            <span className="mult-pattern__index">04 / Anchors</span>
            <h3 className="mult-pattern__title">Land on 1, 5 and 10 first.</h3>
            <p className="mult-pattern__copy">
              Three landmarks fix the scale of any table. Every other row is a step between them.
            </p>
            <div className="mult-pattern__math mult-pattern__math--anchors">
              <span>
                {selectedTable} × 1 = {selectedTable}
              </span>
              <span>
                {selectedTable} × 5 = {selectedTable * 5}
              </span>
              <span>
                {selectedTable} × 10 = {selectedTable * 10}
              </span>
            </div>
          </GlassPanel>
        </div>
      </Reveal>

      {/* ------------------------------------------------------------------ */}
      {/* PRINTABLE SHEET MODAL                                              */}
      {/* ------------------------------------------------------------------ */}
      {isPrintModalOpen && (
        <div className="mult-modal" role="dialog" aria-modal="true" aria-label="Printable multiplication worksheet">
          <button
            type="button"
            className="mult-modal__scrim"
            aria-label="Close print sheet"
            onClick={() => setIsPrintModalOpen(false)}
          />

          <div className="mult-modal__panel">
            <div className="mult-modal__head">
              <div className="mult-modal__title">
                <span className="mult-modal__icon">
                  <FileText className="mult-icon" aria-hidden="true" />
                </span>
                <div>
                  <h3>Printable multiplication worksheet</h3>
                  <p>Formatted for A4 / Letter paper, student practice and offline test sheets.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPrintModalOpen(false)}
                className="mult-icon-btn"
                aria-label="Close print sheet"
              >
                <X className="mult-icon" aria-hidden="true" />
              </button>
            </div>

            <div className="mult-modal__controls">
              <div className="mult-modal__group">
                <span className="mult-kicker">Scope</span>
                {[
                  { id: 'single', label: `Table of ${selectedTable}` },
                  { id: '1to10', label: 'Tables 1–10' },
                  { id: '11to20', label: 'Tables 11–20' },
                  { id: '21to30', label: 'Tables 21–30' }
                ].map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setPrintScope(sc.id as PrintScope)}
                    aria-pressed={printScope === sc.id}
                    className={`mult-segment ${printScope === sc.id ? 'is-active' : ''}`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>

              <div className="mult-modal__group">
                <span className="mult-kicker">Format</span>
                {[
                  { id: 'answers', label: 'Complete table' },
                  { id: 'blanks', label: 'Blank quiz' },
                  { id: 'missing', label: 'Missing factor' }
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setPrintSheetMode(fmt.id as PrintSheetMode)}
                    aria-pressed={printSheetMode === fmt.id}
                    className={`mult-segment ${printSheetMode === fmt.id ? 'is-active' : ''}`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mult-modal__preview">
              <div id="calcaura-print-sheet" className="mult-sheet">
                <div className="mult-sheet__head">
                  <div>
                    <h2>CALCAURA MATHEMATICS WORKBOOK</h2>
                    <p>Multiplication mastery sheet · CalcAura Learning Platform</p>
                  </div>
                  <div className="mult-sheet__meta">
                    <div>Student Name: _______________________</div>
                    <div>Date: _________________ Score: ____/{tablesToPrint.length * multiplierRange}</div>
                  </div>
                </div>

                <div className={`mult-sheet__grid ${tablesToPrint.length === 1 ? 'is-single' : ''}`}>
                  {tablesToPrint.map((tbl) => (
                    <div key={tbl} className="mult-sheet__table">
                      <div className="mult-sheet__caption">Table of {tbl}</div>
                      <div className="mult-sheet__rows">
                        {Array.from({ length: multiplierRange }).map((_, idx) => {
                          const m = idx + 1;
                          const ans = tbl * m;
                          return (
                            <div key={m} className="mult-sheet__row">
                              <span>
                                {tbl} × {printSheetMode === 'missing' ? '____' : m}
                              </span>
                              <span>= {printSheetMode === 'blanks' ? '______' : ans}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mult-sheet__foot">
                  Practiced on CalcAura · Keep learning, keep solving.
                </div>
              </div>
            </div>

            <div className="mult-modal__foot">
              <button type="button" onClick={handleCopyWorksheetText} className="mult-btn mult-btn--quiet">
                {copiedSheet ? <Check className="mult-icon" aria-hidden="true" /> : <Copy className="mult-icon" aria-hidden="true" />}
                <span>{copiedSheet ? 'Copied to clipboard' : 'Copy worksheet text'}</span>
              </button>

              <div className="mult-modal__foot-right">
                <button type="button" onClick={() => setIsPrintModalOpen(false)} className="mult-btn mult-btn--quiet">
                  Close
                </button>
                <button type="button" onClick={handleTriggerPrint} className="mult-btn mult-btn--accent">
                  <Printer className="mult-icon" aria-hidden="true" /> Print sheet now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
