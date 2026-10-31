import React, { useState } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { Minus, Equal, RotateCw, CheckCircle2, ArrowRight, Lightbulb, Trash2 } from 'lucide-react';

export const PictureSubtractionActivity: React.FC = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('orange');
  const [totalCount, setTotalCount] = useState<number>(8);
  const [removeCount, setRemoveCount] = useState<number>(3);
  const [removedIndices, setRemovedIndices] = useState<Record<number, boolean>>({});
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const remainingTarget = totalCount - removeCount;
  const meta = VISUAL_ASSETS[assetType];

  const handleNewPuzzle = () => {
    const assets: VisualAssetType[] = ['orange', 'apple', 'banana', 'strawberry', 'cookie', 'block', 'car', 'flower'];
    const newAsset = assets[Math.floor(Math.random() * assets.length)];
    const total = Math.floor(Math.random() * 6) + 4; // 4 to 9
    const rem = Math.floor(Math.random() * (total - 2)) + 1; // 1 to total - 2
    setAssetType(newAsset);
    setTotalCount(total);
    setRemoveCount(rem);
    setRemovedIndices({});
    setUserAnswer(null);
  };

  const handleTapToRemove = (idx: number) => {
    setRemovedIndices((prev) => {
      const next = { ...prev };
      if (next[idx]) {
        delete next[idx];
      } else {
        if (Object.keys(prev).length < removeCount) {
          next[idx] = true;
        }
      }
      return next;
    });
  };

  const removedCountNow = Object.keys(removedIndices).length;
  const remainingCountNow = totalCount - removedCountNow;

  // Answer options
  const uniqueOpts = Array.from(
    new Set([
      remainingTarget,
      Math.max(1, remainingTarget - 1),
      remainingTarget + 1,
      remainingTarget + 2,
    ])
  ).sort((a, b) => a - b);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-rose-500/25">
            −
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Picture Subtraction</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-semibold">
                Class 1–3
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Take away objects from a collection and count what remains!
            </p>
          </div>
        </div>

        <button
          onClick={handleNewPuzzle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>New Subtraction</span>
        </button>
      </div>

      {/* Scenario Instruction */}
      <div className="text-center space-y-1">
        <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          You have {totalCount} {meta.plural.toLowerCase()}. Take away {removeCount}. How many remain?
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tap {removeCount} {meta.plural.toLowerCase()} to remove them into the "Removed Basket"!
        </p>
      </div>

      {/* Interactive Subtraction Stage: Main Basket vs Removed Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Basket (Remaining) */}
        <div className="md:col-span-2 p-5 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border-2 border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 uppercase">
              Main Collection ({totalCount} Started)
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              {remainingCountNow} remaining
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 p-4 min-h-[140px] bg-white dark:bg-[#0B0D16] rounded-2xl border border-slate-200 dark:border-white/10">
            {Array.from({ length: totalCount }).map((_, i) => {
              const isRem = removedIndices[i];
              return (
                <VisualObject
                  key={i}
                  type={assetType}
                  size="lg"
                  isDimmed={isRem}
                  isRemoved={isRem}
                  onClick={() => handleTapToRemove(i)}
                  className={`transition-all ${isRem ? 'scale-90 opacity-30 grayscale' : 'hover:scale-105'}`}
                />
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Tap an object to toggle removing it. Removed count: <strong>{removedCountNow}/{removeCount}</strong>
          </p>
        </div>

        {/* Removed Area */}
        <div className="p-5 rounded-3xl bg-rose-500/[0.04] border-2 border-dashed border-rose-500/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold uppercase mb-2">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Removed Basket ({removeCount})</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Objects taken away move into this basket.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 p-3 min-h-[90px] bg-white dark:bg-[#0B0D16] rounded-2xl border border-rose-500/20">
            {Object.keys(removedIndices).length === 0 ? (
              <span className="text-xs text-slate-400 italic">No objects removed yet</span>
            ) : (
              Object.keys(removedIndices).map((k) => (
                <VisualObject key={k} type={assetType} size="md" className="animate-in zoom-in-50" />
              ))
            )}
          </div>

          <button
            onClick={() => {
              // Auto remove requested count
              const rem: Record<number, boolean> = {};
              for (let i = 0; i < removeCount; i++) rem[i] = true;
              setRemovedIndices(rem);
            }}
            className="w-full py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            Auto-Remove {removeCount}
          </button>
        </div>
      </div>

      {/* Equation Banner */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-lg sm:text-2xl font-black font-mono">
          <span className="text-slate-900 dark:text-white">{totalCount}</span>
          <span className="text-rose-500">−</span>
          <span className="text-rose-500">{removeCount}</span>
          <span className="text-slate-400">=</span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {userAnswer !== null ? userAnswer : '?'}
          </span>
        </div>
      </div>

      {/* Answer Selector */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block text-center">
          How many {meta.plural.toLowerCase()} are left?
        </span>

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {uniqueOpts.map((opt) => {
            const isSelected = userAnswer === opt;
            const isCorrect = isSelected && opt === remainingTarget;
            const isWrong = isSelected && opt !== remainingTarget;

            return (
              <button
                key={opt}
                onClick={() => setUserAnswer(opt)}
                className={`py-3 rounded-2xl font-mono text-xl font-black transition-all cursor-pointer ${
                  isCorrect
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                    : isWrong
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {userAnswer !== null && (
        <div
          className={`p-4 rounded-2xl text-center space-y-1 animate-in zoom-in-95 ${
            userAnswer === remainingTarget
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-300'
          }`}
        >
          {userAnswer === remainingTarget ? (
            <>
              <div className="flex items-center justify-center gap-1.5 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Correct! {totalCount} − {removeCount} = {remainingTarget} {meta.plural.toLowerCase()} remaining!</span>
              </div>
              <p className="text-xs">
                Starting with {totalCount} and removing {removeCount} leaves exactly {remainingTarget} {meta.plural}.
              </p>
              <button
                onClick={handleNewPuzzle}
                className="mt-2 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Next Subtraction Puzzle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <div className="font-bold text-sm">Not quite!</div>
              <p className="text-xs">
                Look at the main collection: after removing {removeCount}, there are {remainingTarget} remaining.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
