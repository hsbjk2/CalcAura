import React, { useState } from 'react';
import { Pizza, PieChart, Layers, CheckCircle2, RotateCw } from 'lucide-react';

export const VisualFractionsActivity: React.FC = () => {
  const [denominator, setDenominator] = useState<number>(4);
  const [selectedSlices, setSelectedSlices] = useState<Record<number, boolean>>({ 0: true });
  const [foodType, setFoodType] = useState<'pizza' | 'chocolate' | 'bar'>('pizza');

  const selectedCount = Object.keys(selectedSlices).length;
  const fractionValue = selectedCount / denominator;

  const toggleSlice = (idx: number) => {
    setSelectedSlices((prev) => {
      const next = { ...prev };
      if (next[idx]) {
        delete next[idx];
      } else {
        next[idx] = true;
      }
      return next;
    });
  };

  const handleSelectDenominator = (d: number) => {
    setDenominator(d);
    setSelectedSlices({ 0: true });
  };

  // Simplification for equivalent fraction
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const commonDiv = gcd(selectedCount, denominator);
  const simplifiedNum = selectedCount / commonDiv;
  const simplifiedDen = denominator / commonDiv;
  const isEquivalent = commonDiv > 1 && selectedCount > 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-pink-500/25">
            ½
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Visual Fractions Playground</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-mono font-semibold">
                Class 2–5
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tap slices to shade parts of a whole and discover equivalent fractions!
            </p>
          </div>
        </div>

        {/* Object model toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs">
          <button
            onClick={() => setFoodType('pizza')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              foodType === 'pizza'
                ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Pizza
          </button>
          <button
            onClick={() => setFoodType('chocolate')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              foodType === 'chocolate'
                ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Chocolate Bar
          </button>
          <button
            onClick={() => setFoodType('bar')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              foodType === 'bar'
                ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Fraction Bar
          </button>
        </div>
      </div>

      {/* Denominator Selector (Equal Divisions) */}
      <div className="p-4 rounded-2xl bg-pink-500/[0.04] border border-pink-500/20 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Divide Whole Into Equal Parts (Denominator):
        </span>
        <div className="flex items-center gap-1.5">
          {[2, 3, 4, 6, 8].map((d) => (
            <button
              key={d}
              onClick={() => handleSelectDenominator(d)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                denominator === d
                  ? 'bg-pink-600 text-white shadow-xs scale-105'
                  : 'bg-white dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
              }`}
            >
              {d} equal parts
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Slices Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center min-h-[260px] gap-6">
        {foodType === 'pizza' && (
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 select-none">
            {/* SVG Interactive Pizza Slices */}
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
              {Array.from({ length: denominator }).map((_, idx) => {
                const anglePerSlice = 360 / denominator;
                const startAngle = idx * anglePerSlice;
                const endAngle = (idx + 1) * anglePerSlice;
                const isSelected = selectedSlices[idx];

                // Polar to Cartesian
                const r = 90;
                const cx = 100;
                const cy = 100;
                const startRad = ((startAngle - 90) * Math.PI) / 180;
                const endRad = ((endAngle - 90) * Math.PI) / 180;
                const x1 = cx + r * Math.cos(startRad);
                const y1 = cy + r * Math.sin(startRad);
                const x2 = cx + r * Math.cos(endRad);
                const y2 = cy + r * Math.sin(endRad);

                const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;

                return (
                  <path
                    key={idx}
                    d={d}
                    onClick={() => toggleSlice(idx)}
                    className="cursor-pointer transition-all hover:brightness-110"
                    fill={isSelected ? '#F59E0B' : '#E2E8F0'}
                    stroke="#D97706"
                    strokeWidth="2"
                  />
                );
              })}
              {/* Center Pizza Crust Dot */}
              <circle cx="100" cy="100" r="8" fill="#B45309" />
            </svg>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Tap any slice to eat/select it!
            </p>
          </div>
        )}

        {foodType === 'chocolate' && (
          <div className="w-full max-w-md space-y-2 select-none">
            <div className="grid gap-1.5 p-3 rounded-2xl bg-[#451A03] border-4 border-[#311202] shadow-md" style={{ gridTemplateColumns: `repeat(${denominator}, minmax(0, 1fr))` }}>
              {Array.from({ length: denominator }).map((_, idx) => {
                const isSelected = selectedSlices[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleSlice(idx)}
                    className={`h-24 sm:h-28 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center p-1 border ${
                      isSelected
                        ? 'bg-[#B45309] border-[#F59E0B] text-white shadow-inner scale-[0.98]'
                        : 'bg-[#78350F] border-[#451A03] text-amber-200/50 hover:bg-[#853B0F]'
                    }`}
                  >
                    <span>1/{denominator}</span>
                    <span className="text-[9px] opacity-70">{isSelected ? 'Selected' : 'Tap'}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Tap chocolate squares to break & select them!
            </p>
          </div>
        )}

        {foodType === 'bar' && (
          <div className="w-full max-w-lg space-y-3 select-none">
            <div className="flex h-16 rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-white/20 shadow-sm">
              {Array.from({ length: denominator }).map((_, idx) => {
                const isSelected = selectedSlices[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleSlice(idx)}
                    className={`flex-1 font-mono text-xs font-black transition-all cursor-pointer flex flex-col items-center justify-center border-r last:border-r-0 border-slate-200 dark:border-white/10 ${
                      isSelected
                        ? 'bg-pink-500 text-white shadow-inner'
                        : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    <span>1/{denominator}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Tap fraction bar segments to shade them!
            </p>
          </div>
        )}
      </div>

      {/* Fraction Value & Name Card */}
      <div className="p-5 rounded-3xl bg-pink-500/[0.06] border border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <span className="text-xs font-mono font-bold text-pink-600 uppercase tracking-wider block">
            Selected Fraction
          </span>
          <div className="flex items-center gap-3 mt-1">
            <div className="inline-flex flex-col items-center justify-center font-mono font-black text-2xl sm:text-3xl text-pink-600">
              <span>{selectedCount}</span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-pink-600 rounded-full" />
              <span>{denominator}</span>
            </div>

            <div className="text-left">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {selectedCount === 0
                  ? 'Zero Parts'
                  : selectedCount === denominator
                  ? 'One Whole (1)'
                  : selectedCount === 1 && denominator === 2
                  ? 'One Half (½)'
                  : selectedCount === 1 && denominator === 4
                  ? 'One Quarter (¼)'
                  : selectedCount === 3 && denominator === 4
                  ? 'Three Quarters (¾)'
                  : `${selectedCount} out of ${denominator} equal parts`}
              </h4>
              <p className="text-xs text-slate-500">
                Decimal equivalent: <strong>{(selectedCount / denominator).toFixed(2)}</strong> ({Math.round((selectedCount / denominator) * 100)}%)
              </p>
            </div>
          </div>
        </div>

        {/* Equivalent Fraction badge */}
        {isEquivalent && (
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0B0D16] border border-pink-500/30 text-center shadow-xs">
            <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase block">
              Equivalent Fraction!
            </span>
            <span className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">
              {selectedCount}/{denominator} = {simplifiedNum}/{simplifiedDen}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
