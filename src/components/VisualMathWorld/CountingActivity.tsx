import React, { useState, useMemo } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { Sparkles, RotateCw, CheckCircle2, Lightbulb, Trophy, ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface CountingActivityProps {
  onCompleteChapter?: () => void;
}

export const CountingActivity: React.FC<CountingActivityProps> = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('apple');
  const [targetCount, setTargetCount] = useState<number>(5);
  const [countedIndices, setCountedIndices] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [mode, setMode] = useState<'count' | 'compare'>('count');
  const [compareCount2, setCompareCount2] = useState<number>(3);
  const [compareAsset2, setCompareAsset2] = useState<VisualAssetType>('banana');
  const [score, setScore] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Play sound if enabled
  const playPop = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + Object.keys(countedIndices).length * 80, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  };

  // Generate a new random question
  const handleNewQuestion = () => {
    const assets: VisualAssetType[] = ['apple', 'banana', 'orange', 'strawberry', 'car', 'star', 'ball', 'cookie', 'cupcake', 'cat'];
    const newAsset = assets[Math.floor(Math.random() * assets.length)];
    const newCount = Math.floor(Math.random() * 8) + 2; // 2 to 9
    setAssetType(newAsset);
    setTargetCount(newCount);
    setCountedIndices({});
    setSelectedAnswer(null);
    setShowHint(false);

    const newAsset2 = assets.filter((a) => a !== newAsset)[Math.floor(Math.random() * (assets.length - 1))];
    let newCount2 = Math.floor(Math.random() * 8) + 2;
    while (newCount2 === newCount) {
      newCount2 = Math.floor(Math.random() * 8) + 2;
    }
    setCompareAsset2(newAsset2);
    setCompareCount2(newCount2);
  };

  // Tap an item to count it
  const handleTapItem = (idx: number) => {
    if (countedIndices[idx] !== undefined) return;
    const nextNum = Object.keys(countedIndices).length + 1;
    setCountedIndices((prev) => ({ ...prev, [idx]: nextNum }));
    playPop();
  };

  const countedTotal = Object.keys(countedIndices).length;
  const isAllCounted = countedTotal === targetCount;
  const meta = VISUAL_ASSETS[assetType];
  const meta2 = VISUAL_ASSETS[compareAsset2];

  // Answer options
  const answerOptions = useMemo(() => {
    const opts = new Set<number>();
    opts.add(targetCount);
    while (opts.size < 4) {
      const delta = Math.floor(Math.random() * 5) - 2;
      const val = targetCount + delta;
      if (val >= 1 && val <= 12) opts.add(val);
    }
    return Array.from(opts).sort((a, b) => a - b);
  }, [targetCount]);

  const handleSelectAnswer = (ans: number) => {
    setSelectedAnswer(ans);
    if (ans === targetCount) {
      setScore((s) => s + 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
      {/* Activity Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-amber-500/25">
            123
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Counting World</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-semibold">
                Class 1–2
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tap each object one-by-one to count the total collection!
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Mode switch */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs">
            <button
              onClick={() => {
                setMode('count');
                handleNewQuestion();
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                mode === 'count'
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Count
            </button>
            <button
              onClick={() => {
                setMode('compare');
                handleNewQuestion();
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                mode === 'compare'
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Compare
            </button>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                : 'text-slate-400 border-slate-200 dark:border-white/10'
            }`}
            title="Toggle Counting Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleNewQuestion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>New Set</span>
          </button>
        </div>
      </div>

      {/* MODE 1: COUNT THE OBJECTS */}
      {mode === 'count' && (
        <div className="space-y-6">
          {/* Question Prompt */}
          <div className="text-center space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
              Activity Instruction
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              How many {meta.plural.toLowerCase()} can you see?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tap each {meta.name.toLowerCase()} below to mark it as counted!
            </p>
          </div>

          {/* Interactive Collection Field */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-500/[0.04] to-orange-500/[0.04] dark:from-white/[0.02] dark:to-white/[0.01] border-2 border-dashed border-amber-500/30 dark:border-white/10 min-h-[220px] flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {Array.from({ length: targetCount }).map((_, idx) => (
              <VisualObject
                key={idx}
                type={assetType}
                size="lg"
                isCounted={countedIndices[idx] !== undefined}
                countedNumber={countedIndices[idx]}
                onClick={() => handleTapItem(idx)}
                className="animate-in zoom-in-75 duration-300"
              />
            ))}
          </div>

          {/* Tally Progress Bar */}
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">Counted:</span>
              <span className="text-base font-mono font-black text-amber-600 dark:text-amber-400">
                {countedTotal} / {targetCount}
              </span>
            </div>

            <button
              onClick={() => setShowHint(true)}
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Need a hint?</span>
            </button>
          </div>

          {showHint && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <strong>Hint:</strong> Point your finger and count out loud: 1, 2, 3... Every time you tap an object, a number badge appears!
              </div>
            </div>
          )}

          {/* Answer Selection Buttons */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block text-center">
              Select Your Answer:
            </span>

            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
              {answerOptions.map((opt) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = isSelected && opt === targetCount;
                const isWrong = isSelected && opt !== targetCount;

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectAnswer(opt)}
                    className={`py-3 rounded-2xl font-mono text-lg font-black transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isCorrect
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                        : isWrong
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className="text-[10px] font-normal opacity-80">
                      {opt === 1 ? meta.name : meta.plural}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Celebration */}
          {selectedAnswer !== null && (
            <div
              className={`p-4 rounded-2xl text-center space-y-1 animate-in zoom-in-95 ${
                selectedAnswer === targetCount
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-300'
              }`}
            >
              {selectedAnswer === targetCount ? (
                <>
                  <div className="flex items-center justify-center gap-1.5 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>Hooray! That's correct! Exactly {targetCount} {meta.plural.toLowerCase()}!</span>
                  </div>
                  <p className="text-xs">
                    Great counting skills! You counted every single one correctly.
                  </p>
                  <button
                    onClick={handleNewQuestion}
                    className="mt-2 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Try Next Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <>
                  <div className="font-bold text-sm">Almost there! Keep trying.</div>
                  <p className="text-xs">
                    Count again carefully: there are {targetCount} {meta.plural.toLowerCase()} in total.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: COMPARE TWO COLLECTIONS (MORE OR FEWER) */}
      {mode === 'compare' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
              Comparison Challenge
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Which group has MORE objects?
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Group 1 */}
            <button
              onClick={() => handleSelectAnswer(1)}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer text-center space-y-3 ${
                selectedAnswer === 1
                  ? targetCount > compareCount2
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-rose-500 bg-rose-500/10'
                  : 'border-slate-200 dark:border-white/10 hover:border-amber-500 bg-slate-50 dark:bg-white/[0.02]'
              }`}
            >
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                Group A: {meta.plural}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 min-h-[100px]">
                {Array.from({ length: targetCount }).map((_, i) => (
                  <VisualObject key={i} type={assetType} size="md" />
                ))}
              </div>
              <span className="text-sm font-bold block text-slate-700 dark:text-slate-300">
                Count: {targetCount} {meta.plural}
              </span>
            </button>

            {/* Group 2 */}
            <button
              onClick={() => handleSelectAnswer(2)}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer text-center space-y-3 ${
                selectedAnswer === 2
                  ? compareCount2 > targetCount
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-rose-500 bg-rose-500/10'
                  : 'border-slate-200 dark:border-white/10 hover:border-amber-500 bg-slate-50 dark:bg-white/[0.02]'
              }`}
            >
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                Group B: {meta2.plural}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 min-h-[100px]">
                {Array.from({ length: compareCount2 }).map((_, i) => (
                  <VisualObject key={i} type={compareAsset2} size="md" />
                ))}
              </div>
              <span className="text-sm font-bold block text-slate-700 dark:text-slate-300">
                Count: {compareCount2} {meta2.plural}
              </span>
            </button>
          </div>

          {/* Comparison Result */}
          {selectedAnswer !== null && (
            <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-center text-xs text-amber-900 dark:text-amber-200">
              <strong>Comparison Fact:</strong>{' '}
              {targetCount > compareCount2
                ? `Group A has ${targetCount} which is MORE than Group B's ${compareCount2} (${targetCount} > ${compareCount2})!`
                : `Group B has ${compareCount2} which is MORE than Group A's ${targetCount} (${compareCount2} > ${targetCount})!`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
