import React, { useState } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { Plus, Equal, Sparkles, RotateCw, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';

export const PictureAdditionActivity: React.FC = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('apple');
  const [groupA, setGroupA] = useState<number>(3);
  const [groupB, setGroupB] = useState<number>(2);
  const [isCombined, setIsCombined] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const sum = groupA + groupB;
  const meta = VISUAL_ASSETS[assetType];

  const handleNewPuzzle = () => {
    const assets: VisualAssetType[] = ['apple', 'banana', 'orange', 'car', 'block', 'cookie', 'cupcake', 'star', 'flower'];
    const newAsset = assets[Math.floor(Math.random() * assets.length)];
    const a = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const b = Math.floor(Math.random() * 4) + 1; // 1 to 4
    setAssetType(newAsset);
    setGroupA(a);
    setGroupB(b);
    setIsCombined(false);
    setUserAnswer(null);
    setShowHint(false);
  };

  const handleCombine = () => {
    setIsCombined(true);
  };

  const options = [sum - 1, sum, sum + 1, sum + 2].filter((v) => v > 0).sort((a, b) => a - b);
  // Guarantee 4 unique options
  const uniqueOpts = Array.from(new Set([sum, sum + 1, Math.max(1, sum - 1), sum + 2])).sort((a, b) => a - b);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-500/25">
            +
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Picture Addition</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                Class 1–3
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Combine groups of objects to understand how addition works!
            </p>
          </div>
        </div>

        <button
          onClick={handleNewPuzzle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>New Addition</span>
        </button>
      </div>

      {/* Instruction */}
      <div className="text-center space-y-1">
        <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {groupA} {groupA === 1 ? meta.name : meta.plural} + {groupB} {groupB === 1 ? meta.name : meta.plural} = ?
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click <strong>Combine Groups</strong> to watch the two collections come together into one group!
        </p>
      </div>

      {/* Visual Addition Stage */}
      {!isCombined ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
          {/* Group 1 */}
          <div className="flex-1 text-center p-4 rounded-2xl bg-white dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 shadow-xs min-w-[140px]">
            <span className="text-xs font-mono font-bold text-slate-500 block mb-2">
              Group 1 ({groupA})
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 min-h-[70px]">
              {Array.from({ length: groupA }).map((_, i) => (
                <VisualObject key={i} type={assetType} size="md" />
              ))}
            </div>
            <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400 mt-2 block">
              {groupA}
            </span>
          </div>

          {/* Plus Sign */}
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center shrink-0 text-xl">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>

          {/* Group 2 */}
          <div className="flex-1 text-center p-4 rounded-2xl bg-white dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 shadow-xs min-w-[140px]">
            <span className="text-xs font-mono font-bold text-slate-500 block mb-2">
              Group 2 ({groupB})
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 min-h-[70px]">
              {Array.from({ length: groupB }).map((_, i) => (
                <VisualObject key={i} type={assetType} size="md" />
              ))}
            </div>
            <span className="text-lg font-black font-mono text-teal-600 dark:text-teal-400 mt-2 block">
              {groupB}
            </span>
          </div>

          {/* Equals Sign */}
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-black flex items-center justify-center shrink-0 text-xl">
            <Equal className="w-6 h-6 stroke-[3]" />
          </div>

          {/* Combine Action Card */}
          <button
            onClick={handleCombine}
            className="flex-1 p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-all flex flex-col items-center justify-center gap-2 min-w-[140px]"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Combine Groups!</span>
          </button>
        </div>
      ) : (
        /* Combined View */
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest block">
            Combined Collection (Total)
          </span>

          {/* All objects combined together */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 min-h-[100px]">
            {Array.from({ length: sum }).map((_, i) => (
              <VisualObject
                key={i}
                type={assetType}
                size="lg"
                isCounted={true}
                countedNumber={i + 1}
                className="animate-in zoom-in-75 duration-200"
              />
            ))}
          </div>

          {/* Animated Equation Banner */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white dark:bg-[#0B0D16] border border-emerald-500/30 text-lg sm:text-2xl font-black font-mono shadow-sm">
            <span className="text-emerald-600">{groupA}</span>
            <span className="text-slate-400">+</span>
            <span className="text-teal-600">{groupB}</span>
            <span className="text-slate-400">=</span>
            <span className="text-emerald-600 font-extrabold">{sum}</span>
          </div>
        </div>
      )}

      {/* Answer Picking (when not yet answered) */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block text-center">
          What is the total sum?
        </span>

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {uniqueOpts.map((opt) => {
            const isSelected = userAnswer === opt;
            const isCorrect = isSelected && opt === sum;
            const isWrong = isSelected && opt !== sum;

            return (
              <button
                key={opt}
                onClick={() => {
                  setUserAnswer(opt);
                  setIsCombined(true);
                }}
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

      {/* Feedback & Explanation */}
      {userAnswer !== null && (
        <div
          className={`p-4 rounded-2xl text-center space-y-1 animate-in zoom-in-95 ${
            userAnswer === sum
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-300'
          }`}
        >
          {userAnswer === sum ? (
            <>
              <div className="flex items-center justify-center gap-1.5 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Superb! {groupA} + {groupB} = {sum} {meta.plural.toLowerCase()}!</span>
              </div>
              <p className="text-xs">
                When you put {groupA} {groupA === 1 ? meta.name : meta.plural} and {groupB} {groupB === 1 ? meta.name : meta.plural} together, you get exactly {sum} {meta.plural}.
              </p>
              <button
                onClick={handleNewPuzzle}
                className="mt-2 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Next Addition Puzzle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <div className="font-bold text-sm">Not quite!</div>
              <p className="text-xs">
                Count the combined objects above: {groupA} plus {groupB} makes {sum}.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
