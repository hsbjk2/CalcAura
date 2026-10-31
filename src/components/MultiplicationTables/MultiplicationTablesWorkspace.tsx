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
  FileText
} from 'lucide-react';
import { VisualObject, VisualAssetType } from '../VisualMathWorld/VisualAssetLibrary.tsx';

type TableMode = 'learn' | 'practice' | 'challenge' | 'missing';
type MultiplierRange = 10 | 12 | 20 | 25;
type PrintSheetMode = 'answers' | 'blanks' | 'missing';
type PrintScope = 'single' | '1to10' | '11to20' | '21to30';

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

  return (
    <div
      ref={containerRef}
      className={`bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors p-3 sm:p-6 md:p-8 space-y-6 ${
        isFullscreen ? 'p-4 sm:p-8 overflow-y-auto' : ''
      }`}
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
            padding: 24px !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* Top Banner / Navigation */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Complete 1 to 30 Workspace
          </div>
          <h1 className="text-xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3 flex-wrap">
            Multiplication Tables Studio
            <span className="text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
              Table of {selectedTable}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Visual arrays, repeated addition, audio pronunciation, and interactive speed drills for all 30 tables.
          </p>
        </div>

        {/* Global Controls: Audio, Fullscreen, Print Sheet */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-2 sm:p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
            <span>Voice {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="px-3 py-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="px-3.5 py-2 sm:p-2.5 rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* 1–30 Table Selector Bar (Fully Responsive Grid) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            Select Table (1 to 30)
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedTable((prev) => Math.max(1, prev - 1))}
              disabled={selectedTable === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedTable((prev) => Math.min(30, prev + 1))}
              disabled={selectedTable === 30}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedTable(Math.floor(Math.random() * 30) + 1)}
              className="px-2.5 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1 hover:bg-indigo-100 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" /> Random
            </button>
          </div>
        </div>

        {/* 30 Number Buttons: 5 cols on mobile, 6 on small, 10 on tablet, 15 on desktop */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-15 gap-1.5">
          {Array.from({ length: 30 }).map((_, i) => {
            const num = i + 1;
            const isCurrent = selectedTable === num;
            return (
              <button
                key={num}
                onClick={() => setSelectedTable(num)}
                className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Switcher & Multiplier Range */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        {/* 4 Learning Modes */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'learn', label: '1. Learn Table', icon: '📖' },
            { id: 'practice', label: '2. Flashcards', icon: '⚡' },
            { id: 'missing', label: '3. Missing Number', icon: '❓' },
            { id: 'challenge', label: '4. Speed Drill', icon: '🏆' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as TableMode)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === m.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Range Selector: x10, x12, x20, x25 */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-xs font-bold text-slate-500 mr-1">Range:</span>
          {[10, 12, 20, 25].map((rng) => (
            <button
              key={rng}
              onClick={() => setMultiplierRange(rng as MultiplierRange)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                multiplierRange === rng
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              ×{rng}
            </button>
          ))}
        </div>
      </div>

      {/* MODE 1: LEARN MODE */}
      {mode === 'learn' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Full Table Equation List */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-2 max-h-[640px] overflow-y-auto thin-scrollbar">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex justify-between items-center">
              <span>Recitation List</span>
              <span>Tap row to visualize</span>
            </h3>

            {Array.from({ length: multiplierRange }).map((_, i) => {
              const mult = i + 1;
              const product = selectedTable * mult;
              const isSelected = selectedMultiplier === mult;

              return (
                <div
                  key={mult}
                  onClick={() => {
                    setSelectedMultiplier(mult);
                    speakText(`${selectedTable} times ${mult} is ${product}`);
                  }}
                  className={`p-3 rounded-2xl cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg scale-[1.01]'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {mult}
                    </span>
                    <span className="font-mono text-base font-bold">
                      {selectedTable} × {mult}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-black">{product}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(`${selectedTable} times ${mult} is ${product}`);
                      }}
                      className="p-1.5 rounded-lg hover:bg-white/20 opacity-70 hover:opacity-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Synchronized Visual Models */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
            {/* Active Equation Card */}
            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Visualizing Equation
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white mt-1">
                  {selectedTable} × {selectedMultiplier} = {selectedTable * selectedMultiplier}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  &ldquo;{selectedTable} groups of {selectedMultiplier}&rdquo; or &ldquo;{selectedMultiplier} groups of {selectedTable}&rdquo;
                </p>
              </div>

              <button
                onClick={() => speakText(`${selectedTable} multiplied by ${selectedMultiplier} equals ${selectedTable * selectedMultiplier}`)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer shrink-0"
              >
                <Volume2 className="w-4 h-4" /> Speak Equation
              </button>
            </div>

            {/* Visual Dot Array (Matrix Visualization) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Dot Matrix Array ({selectedTable} rows × {selectedMultiplier} columns)
                </span>
                <span className="text-xs font-mono text-blue-600 font-bold">
                  {selectedTable * selectedMultiplier} total dots
                </span>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto flex justify-center">
                <div
                  className="grid gap-1.5"
                  style={{
                    gridTemplateColumns: `repeat(${selectedMultiplier}, minmax(14px, 20px))`
                  }}
                >
                  {Array.from({ length: selectedTable * selectedMultiplier }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 rounded-full bg-blue-500 border border-blue-600 dark:border-blue-400 shadow-2xs hover:scale-125 transition-transform"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Repeated Addition Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Repeated Addition:</span>
              <div className="font-mono text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 break-words">
                {Array.from({ length: selectedMultiplier })
                  .map(() => selectedTable)
                  .join(' + ')}{' '}
                = <span className="text-blue-600">{selectedTable * selectedMultiplier}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: FLASHCARDS */}
      {mode === 'practice' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Flashcard Practice</div>
          <div className="py-12 px-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/60 rounded-3xl border border-indigo-100 dark:border-slate-700 shadow-inner">
            <div className="text-5xl sm:text-6xl font-black font-mono text-slate-900 dark:text-white">
              {selectedTable} × {quizMultiplier}
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <input
              type="number"
              placeholder="Your Answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
              className="w-48 px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center text-xl font-bold"
            />
            <button
              onClick={handleCheckAnswer}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Verify
            </button>
          </div>

          {feedback && (
            <div
              className={`p-3 rounded-xl font-bold text-sm ${
                feedback === 'correct'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200'
              }`}
            >
              {feedback === 'correct' ? '🎉 Brilliant! Correct Answer!' : '❌ Not quite. Try again!'}
            </div>
          )}
        </div>
      )}

      {/* MODE 3: MISSING NUMBER */}
      {mode === 'missing' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Fill in the Missing Factor</div>
          <div className="py-12 px-6 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700">
            <div className="text-4xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <span>{missingPosition === 'a' ? '____' : selectedTable}</span>
              <span>×</span>
              <span>{missingPosition === 'b' ? '____' : quizMultiplier}</span>
              <span>=</span>
              <span>{missingPosition === 'c' ? '____' : selectedTable * quizMultiplier}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <input
              type="number"
              placeholder="Missing Number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
              className="w-48 px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center text-xl font-bold"
            />
            <button
              onClick={handleCheckAnswer}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Check
            </button>
          </div>

          {feedback && (
            <div
              className={`p-3 rounded-xl font-bold text-sm ${
                feedback === 'correct'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200'
              }`}
            >
              {feedback === 'correct' ? '🌟 Superb! Correct value!' : '❌ Incorrect. Give it another thought.'}
            </div>
          )}
        </div>
      )}

      {/* MODE 4: SPEED DRILL */}
      {mode === 'challenge' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Speed Challenge</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                ⏱️ {timerSeconds}s
              </span>
              <span className="text-xs font-bold text-amber-600">Score: {score}</span>
            </div>
          </div>

          {!timerActive && !challengeComplete ? (
            <div className="py-12 space-y-4">
              <div className="text-5xl">⚡</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready for 45-Second Speed Drill?</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Test your mastery of the Table of {selectedTable}. Answer as many questions as you can before the clock runs out!
              </p>
              <button
                onClick={startChallenge}
                className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                Start Drill Now 🚀
              </button>
            </div>
          ) : timerActive ? (
            <div className="space-y-6">
              <div className="py-8 px-6 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700">
                <div className="text-4xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white">
                  {selectedTable} × {quizMultiplier} = ?
                </div>
              </div>

              <div className="flex items-center gap-3 max-w-xs mx-auto">
                <input
                  type="number"
                  autoFocus
                  placeholder="Answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center text-xl font-bold"
                />
                <button
                  onClick={handleCheckAnswer}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 space-y-4">
              <div className="text-5xl">🏆</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Time is Up!</h3>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 max-w-xs mx-auto">
                <div className="text-xs text-amber-700 dark:text-amber-300 font-bold uppercase">Final Score</div>
                <div className="text-4xl font-black text-amber-800 dark:text-amber-200">{score} Points</div>
              </div>
              <button
                onClick={startChallenge}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* DEDICATED PRINTABLE SHEET MODAL & PREVIEW */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 flex items-center justify-center font-bold">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Printable Multiplication Worksheet
                  </h3>
                  <p className="text-xs text-slate-500">
                    Formatted for A4 / Letter paper, student practice, and offline test sheets.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Controls Bar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Scope */}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-500">Scope:</span>
                {[
                  { id: 'single', label: `Table of ${selectedTable}` },
                  { id: '1to10', label: 'Tables 1–10' },
                  { id: '11to20', label: 'Tables 11–20' },
                  { id: '21to30', label: 'Tables 21–30' }
                ].map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setPrintScope(sc.id as PrintScope)}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                      printScope === sc.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>

              {/* Mode */}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-500">Format:</span>
                {[
                  { id: 'answers', label: 'Complete Table' },
                  { id: 'blanks', label: 'Blank Quiz (Practice)' },
                  { id: 'missing', label: 'Missing Factor' }
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setPrintSheetMode(fmt.id as PrintSheetMode)}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                      printSheetMode === fmt.id
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Printable Paper Preview (rendered on white sheet) */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-100 dark:bg-slate-950 flex justify-center">
              <div
                id="calcaura-print-sheet"
                className="bg-white text-slate-900 p-8 rounded-2xl shadow-md border border-slate-300 max-w-2xl w-full font-serif space-y-6"
              >
                {/* Paper Header */}
                <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">
                      CALCAURA MATHEMATICS WORKBOOK
                    </h2>
                    <p className="text-xs text-slate-600 font-sans">
                      Multiplication Mastery Sheet · HSBJK Learning Platform
                    </p>
                  </div>
                  <div className="text-xs text-right font-sans space-y-1">
                    <div>Student Name: _______________________</div>
                    <div>Date: _________________  Score: ____/{tablesToPrint.length * multiplierRange}</div>
                  </div>
                </div>

                {/* Tables Grid */}
                <div className={`grid gap-6 ${tablesToPrint.length === 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                  {tablesToPrint.map((tbl) => (
                    <div key={tbl} className="border border-slate-300 rounded-xl p-4 bg-slate-50/50">
                      <div className="text-sm font-bold font-sans text-center border-b border-slate-300 pb-2 mb-3 uppercase tracking-wider text-blue-700">
                        Table of {tbl}
                      </div>
                      <div className="space-y-1.5 font-mono text-xs">
                        {Array.from({ length: multiplierRange }).map((_, idx) => {
                          const m = idx + 1;
                          const ans = tbl * m;
                          return (
                            <div key={m} className="flex items-center justify-between py-0.5 border-b border-dotted border-slate-200">
                              <span>
                                {tbl} × {printSheetMode === 'missing' ? '____' : m}
                              </span>
                              <span className="font-bold">
                                = {printSheetMode === 'blanks' ? '______' : ans}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200 text-center font-sans text-[11px] text-slate-500">
                  Practiced on CalcAura Platform · Keep Learning & Keep Solving!
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyWorksheetText}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                >
                  {copiedSheet ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSheet ? 'Copied to Clipboard!' : 'Copy Worksheet Text'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={handleTriggerPrint}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Sheet Now 🖨️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
