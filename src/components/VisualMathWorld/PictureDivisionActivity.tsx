import React, { useState } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { Divide, Equal, RotateCw, CheckCircle2, ArrowRight, Sparkles, Users } from 'lucide-react';

export const PictureDivisionActivity: React.FC = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('strawberry');
  const [totalItems, setTotalItems] = useState<number>(12);
  const [numRecipients, setNumRecipients] = useState<number>(3);
  const [isShared, setIsShared] = useState<boolean>(false);
  const [userQuotient, setUserQuotient] = useState<number | null>(null);

  const quotient = Math.floor(totalItems / numRecipients);
  const remainder = totalItems % numRecipients;
  const meta = VISUAL_ASSETS[assetType];

  const handleRandomize = () => {
    const assets: VisualAssetType[] = ['strawberry', 'apple', 'cookie', 'banana', 'orange', 'block', 'candy' as any];
    const newAsset = assets[Math.floor(Math.random() * (assets.length - 1))];
    const rec = Math.floor(Math.random() * 3) + 2; // 2, 3, 4 recipients
    const q = Math.floor(Math.random() * 4) + 2; // 2 to 5 per basket
    const hasRem = Math.random() > 0.5;
    const r = hasRem ? Math.floor(Math.random() * (rec - 1)) + 1 : 0;
    const total = rec * q + r;

    setAssetType(newAsset);
    setTotalItems(total);
    setNumRecipients(rec);
    setIsShared(false);
    setUserQuotient(null);
  };

  const handleShare = () => {
    setIsShared(true);
  };

  const options = Array.from(new Set([quotient, Math.max(1, quotient - 1), quotient + 1, quotient + 2])).sort(
    (a, b) => a - b
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-sky-500/25">
            ÷
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Division with Fair Sharing</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono font-semibold">
                Class 2–4
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Share objects equally between friends and observe remainders!
            </p>
          </div>
        </div>

        <button
          onClick={handleRandomize}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>New Division</span>
        </button>
      </div>

      {/* Scenario Instruction */}
      <div className="text-center space-y-1">
        <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Share {totalItems} {meta.plural.toLowerCase()} equally among {numRecipients} children
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          How many does each child get? Click <strong>Share Equally</strong> to distribute!
        </p>
      </div>

      {/* Visual Distribution Canvas */}
      {!isShared ? (
        <div className="space-y-4 p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-center">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
            Initial Collection to Distribute ({totalItems} {meta.plural})
          </span>

          <div className="flex flex-wrap items-center justify-center gap-3 p-4 min-h-[90px] bg-white dark:bg-[#0B0D16] rounded-2xl border border-slate-200 dark:border-white/10">
            {Array.from({ length: totalItems }).map((_, i) => (
              <VisualObject key={i} type={assetType} size="md" />
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={handleShare}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-110 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Share Equally Among {numRecipients} Children!</span>
            </button>
          </div>
        </div>
      ) : (
        /* Shared Distribution View */
        <div className="space-y-4 animate-in zoom-in-95 duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: numRecipients }).map((_, rIdx) => (
              <div
                key={rIdx}
                className="p-5 rounded-3xl bg-white dark:bg-[#0B0D16] border-2 border-sky-500/40 text-center shadow-xs space-y-2"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-sky-600 uppercase font-mono">
                  <Users className="w-3.5 h-3.5" />
                  <span>Child #{rIdx + 1}'s Share</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 p-3 min-h-[60px] bg-sky-500/[0.03] rounded-2xl">
                  {Array.from({ length: quotient }).map((_, i) => (
                    <VisualObject key={i} type={assetType} size="md" />
                  ))}
                </div>

                <span className="text-sm font-black font-mono text-slate-800 dark:text-slate-200 block">
                  {quotient} {quotient === 1 ? meta.name : meta.plural}
                </span>
              </div>
            ))}
          </div>

          {/* Remainder Tray if any */}
          {remainder > 0 && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
              <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
                Remainder Leftover Tray ({remainder} {remainder === 1 ? meta.name : meta.plural} cannot be shared equally)
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: remainder }).map((_, i) => (
                  <VisualObject key={i} type={assetType} size="md" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Equation Banner */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xl sm:text-2xl font-black font-mono">
          <span className="text-slate-900 dark:text-white">{totalItems}</span>
          <span className="text-sky-500">÷</span>
          <span className="text-sky-500">{numRecipients}</span>
          <span className="text-slate-400">=</span>
          <span className="text-emerald-600 font-extrabold">{userQuotient !== null ? userQuotient : '?'}</span>
          {remainder > 0 && isShared && (
            <span className="text-amber-500 text-sm font-normal">
              (R: {remainder})
            </span>
          )}
        </div>
      </div>

      {/* Answer Selector */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block text-center">
          How many {meta.plural.toLowerCase()} does each child get?
        </span>

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {options.map((opt) => {
            const isSelected = userQuotient === opt;
            const isCorrect = isSelected && opt === quotient;
            const isWrong = isSelected && opt !== quotient;

            return (
              <button
                key={opt}
                onClick={() => {
                  setUserQuotient(opt);
                  setIsShared(true);
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

      {/* Feedback */}
      {userQuotient !== null && (
        <div
          className={`p-4 rounded-2xl text-center space-y-1 animate-in zoom-in-95 ${
            userQuotient === quotient
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-300'
          }`}
        >
          {userQuotient === quotient ? (
            <>
              <div className="flex items-center justify-center gap-1.5 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Fair share complete! Each child gets {quotient} {meta.plural.toLowerCase()}!</span>
              </div>
              <p className="text-xs">
                {totalItems} ÷ {numRecipients} = {quotient}
                {remainder > 0 ? ` with ${remainder} leftover.` : ' with zero remainder.'}
              </p>
            </>
          ) : (
            <>
              <div className="font-bold text-sm">Not quite!</div>
              <p className="text-xs">
                When {totalItems} items are distributed equally among {numRecipients} recipients, each receives {quotient}.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
