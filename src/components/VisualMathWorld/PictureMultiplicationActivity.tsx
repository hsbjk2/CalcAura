import React, { useState } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { X, Equal, RotateCw, CheckCircle2, ArrowRight, Grid, Layers, Sparkles } from 'lucide-react';

export const PictureMultiplicationActivity: React.FC = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('strawberry');
  const [numGroups, setNumGroups] = useState<number>(3);
  const [itemsPerGroup, setItemsPerGroup] = useState<number>(4);
  const [viewFormat, setViewFormat] = useState<'groups' | 'array' | 'repeatedAddition'>('groups');
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const totalProduct = numGroups * itemsPerGroup;
  const meta = VISUAL_ASSETS[assetType];

  const handleRandomize = () => {
    const assets: VisualAssetType[] = ['strawberry', 'apple', 'banana', 'orange', 'cookie', 'block', 'car', 'star'];
    const newAsset = assets[Math.floor(Math.random() * assets.length)];
    const g = Math.floor(Math.random() * 4) + 2; // 2 to 5
    const i = Math.floor(Math.random() * 5) + 2; // 2 to 6
    setAssetType(newAsset);
    setNumGroups(g);
    setItemsPerGroup(i);
    setUserAnswer(null);
  };

  const options = Array.from(
    new Set([
      totalProduct,
      Math.max(2, totalProduct - itemsPerGroup),
      totalProduct + itemsPerGroup,
      totalProduct + 2,
    ])
  ).sort((a, b) => a - b);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-purple-500/25">
            ×
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Multiplication with Groups & Arrays</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-semibold">
                Class 2–4
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore multiplication as equal groups, repeated addition, and visual arrays!
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs">
            <button
              onClick={() => setViewFormat('groups')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewFormat === 'groups'
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Groups
            </button>
            <button
              onClick={() => setViewFormat('array')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewFormat === 'array'
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Array
            </button>
            <button
              onClick={() => setViewFormat('repeatedAddition')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewFormat === 'repeatedAddition'
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Addition
            </button>
          </div>

          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Randomize</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls for Groups & Items */}
      <div className="p-4 rounded-2xl bg-purple-500/[0.04] border border-purple-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Number of Groups:</span>
          <div className="flex items-center gap-1">
            {[2, 3, 4, 5].map((g) => (
              <button
                key={g}
                onClick={() => {
                  setNumGroups(g);
                  setUserAnswer(null);
                }}
                className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  numGroups === g
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Objects in Each Group:</span>
          <div className="flex items-center gap-1">
            {[2, 3, 4, 5, 6].map((i) => (
              <button
                key={i}
                onClick={() => {
                  setItemsPerGroup(i);
                  setUserAnswer(null);
                }}
                className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  itemsPerGroup === i
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visualization Canvas */}
      {viewFormat === 'groups' && (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold block mb-1">
              Equal Groups Representation
            </span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {numGroups} baskets with {itemsPerGroup} {itemsPerGroup === 1 ? meta.name : meta.plural} in each basket
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 p-4 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
            {Array.from({ length: numGroups }).map((_, groupIdx) => (
              <div
                key={groupIdx}
                className="p-4 rounded-2xl bg-white dark:bg-[#0B0D16] border-2 border-purple-500/30 text-center shadow-xs space-y-2 animate-in zoom-in-95"
              >
                <span className="text-[11px] font-mono font-bold text-purple-600 uppercase">
                  Basket #{groupIdx + 1} ({itemsPerGroup} items)
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5 min-h-[50px]">
                  {Array.from({ length: itemsPerGroup }).map((_, i) => (
                    <VisualObject key={i} type={assetType} size="md" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewFormat === 'array' && (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold block mb-1">
              Multiplication Array (Rows × Columns)
            </span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {numGroups} Rows of {itemsPerGroup} Columns
            </h4>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-2">
            {Array.from({ length: numGroups }).map((_, rowIdx) => (
              <div key={rowIdx} className="flex items-center gap-2 p-1 rounded-xl bg-purple-500/[0.05]">
                <span className="text-[10px] font-mono text-purple-400 w-8 text-right pr-1">R{rowIdx + 1}:</span>
                {Array.from({ length: itemsPerGroup }).map((_, colIdx) => (
                  <VisualObject key={colIdx} type={assetType} size="md" />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {viewFormat === 'repeatedAddition' && (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold block mb-1">
              Repeated Addition Model
            </span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Adding {itemsPerGroup} repeatedly {numGroups} times
            </h4>
          </div>

          <div className="p-6 rounded-3xl bg-purple-500/[0.05] border border-purple-500/20 text-center space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xl sm:text-2xl font-black font-mono">
              {Array.from({ length: numGroups }).map((_, i) => (
                <React.Fragment key={i}>
                  <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0B0D16] border border-purple-500/30 text-purple-600">
                    {itemsPerGroup}
                  </span>
                  {i < numGroups - 1 && <span className="text-slate-400">+</span>}
                </React.Fragment>
              ))}
              <span className="text-slate-400">=</span>
              <span className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-extrabold">
                {totalProduct}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Skip counting by {itemsPerGroup}: {Array.from({ length: numGroups }, (_, i) => (i + 1) * itemsPerGroup).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Equation Banner */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white dark:bg-[#0B0D16] border border-purple-500/30 text-xl sm:text-3xl font-black font-mono shadow-sm">
          <span className="text-purple-600">{numGroups}</span>
          <span className="text-slate-400">×</span>
          <span className="text-indigo-600">{itemsPerGroup}</span>
          <span className="text-slate-400">=</span>
          <span className="text-purple-600 font-extrabold">{userAnswer !== null ? userAnswer : '?'}</span>
        </div>
      </div>

      {/* Answer Selector */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block text-center">
          What is the total number of {meta.plural.toLowerCase()}?
        </span>

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {options.map((opt) => {
            const isSelected = userAnswer === opt;
            const isCorrect = isSelected && opt === totalProduct;
            const isWrong = isSelected && opt !== totalProduct;

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
            userAnswer === totalProduct
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-300'
          }`}
        >
          {userAnswer === totalProduct ? (
            <>
              <div className="flex items-center justify-center gap-1.5 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Brilliant! {numGroups} × {itemsPerGroup} = {totalProduct} {meta.plural.toLowerCase()}!</span>
              </div>
              <p className="text-xs">
                {numGroups} equal groups of {itemsPerGroup} adds up to exactly {totalProduct} objects in total.
              </p>
            </>
          ) : (
            <>
              <div className="font-bold text-sm">Check your count!</div>
              <p className="text-xs">
                Count the items across all {numGroups} groups: {numGroups} groups of {itemsPerGroup} equals {totalProduct}.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
