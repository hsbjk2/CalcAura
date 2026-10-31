import React, { useState } from 'react';
import {
  Compass,
  Sliders,
  RotateCcw,
  Play,
  CheckCircle2,
  Sparkles,
  Calculator,
  Grid,
  Maximize2,
  RefreshCw,
  Shuffle,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { MathView } from './MathView.tsx';

interface ToolProps {
  toolId: string;
}

// 1. Angle Explorer (Class 6 Lines & Angles)
export const AngleExplorerTool: React.FC = () => {
  const [angle, setAngle] = useState<number>(65);

  const getClassification = (deg: number) => {
    if (deg === 0) return { name: 'Zero Angle', color: 'text-slate-500', desc: 'No rotation' };
    if (deg < 90) return { name: 'Acute Angle', color: 'text-emerald-500', desc: 'Between 0° and 90°' };
    if (deg === 90) return { name: 'Right Angle', color: 'text-blue-500', desc: 'Exactly 90° (perpendicular)' };
    if (deg < 180) return { name: 'Obtuse Angle', color: 'text-amber-500', desc: 'Between 90° and 180°' };
    if (deg === 180) return { name: 'Straight Angle', color: 'text-purple-500', desc: 'Exactly 180° (straight line)' };
    if (deg < 360) return { name: 'Reflex Angle', color: 'text-rose-500', desc: 'Between 180° and 360°' };
    return { name: 'Complete Angle', color: 'text-indigo-500', desc: 'Exactly 360° (full rotation)' };
  };

  const info = getClassification(angle);
  const rad = (angle * Math.PI) / 180;
  const radius = 100;
  const cx = 140;
  const cy = 130;
  const x2 = cx + radius * Math.cos(-rad);
  const y2 = cy + radius * Math.sin(-rad);

  const arcRadius = 40;
  const arcX = cx + arcRadius * Math.cos(-rad);
  const arcY = cy + arcRadius * Math.sin(-rad);
  const largeArcFlag = angle > 180 ? 1 : 0;
  const arcPath =
    angle === 360
      ? `M ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 1 0 ${cx - arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 1 0 ${cx + arcRadius} ${cy}`
      : `M ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${arcX} ${arcY}`;

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-teal-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Interactive Angle Explorer</h4>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-200/50 dark:bg-white/10 ${info.color}`}>
          {info.name} ({angle}°)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Angle Canvas */}
        <div className="flex justify-center items-center bg-white dark:bg-[#0c0e17] rounded-xl border border-slate-200 dark:border-white/10 p-2">
          <svg width="280" height="230" className="overflow-visible">
            {/* Protractor Guideline Arcs */}
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="currentColor" strokeDasharray="3 3" className="text-slate-200 dark:text-white/10" />
            <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} stroke="currentColor" strokeDasharray="2 2" className="text-slate-300 dark:text-white/10" />
            <line x1={cx} y1={cy - radius} x2={cx} y2={cy + radius} stroke="currentColor" strokeDasharray="2 2" className="text-slate-300 dark:text-white/10" />

            {/* Arc sector highlight */}
            {angle > 0 && (
              <path d={arcPath} fill="none" stroke="#0ea5e9" strokeWidth="3" />
            )}

            {/* Base Ray (0 deg) */}
            <line x1={cx} y1={cy} x2={cx + radius + 15} y2={cy} stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow)" />
            {/* Rotating Ray */}
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#7957F5" strokeWidth="3.5" />
            {/* Vertex Point */}
            <circle cx={cx} cy={cy} r="5" fill="#7957F5" />
            {/* Rotating Vertex Endpoint */}
            <circle cx={x2} cy={y2} r="4" fill="#D94BCB" />
          </svg>
        </div>

        {/* Controls and Angle Relations */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-400">
              <span>Rotation Angle (θ):</span>
              <span className="font-bold text-slate-900 dark:text-white">{angle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-[#7957F5] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>0°</span>
              <span>90°</span>
              <span>180°</span>
              <span>270°</span>
              <span>360°</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Complement (90° - θ)</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">
                {angle <= 90 ? `${90 - angle}°` : 'None (> 90°)'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Supplement (180° - θ)</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">
                {angle <= 180 ? `${180 - angle}°` : 'None (> 180°)'}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 text-xs text-teal-800 dark:text-teal-300">
            <span className="font-bold">Key Concept: </span>
            {info.desc}.
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Fraction Strips & Bars Visualizer (Class 6 Fractions & Class 7 Operations)
export const FractionBarsTool: React.FC = () => {
  const [num1, setNum1] = useState<number>(2);
  const [den1, setDen1] = useState<number>(3);
  const [num2, setNum2] = useState<number>(1);
  const [den2, setDen2] = useState<number>(4);

  const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

  const commonDen = lcm(den1, den2);
  const eqNum1 = num1 * (commonDen / den1);
  const eqNum2 = num2 * (commonDen / den2);
  const sumNum = eqNum1 + eqNum2;
  const sumGcd = gcd(sumNum, commonDen);
  const simplifiedSumNum = sumNum / sumGcd;
  const simplifiedSumDen = commonDen / sumGcd;

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grid className="w-5 h-5 text-indigo-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Fraction Strips & Common Denominator Lab</h4>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          Visual Part-Whole Explorer
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Fraction 1 Controls */}
        <div className="p-3 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Fraction A</span>
            <span className="font-mono font-bold text-indigo-500 text-sm">{num1} / {den1}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span>Numerator:</span>
            <input type="range" min="1" max={den1} value={num1} onChange={(e) => setNum1(Number(e.target.value))} className="w-full accent-indigo-500" />
            <span className="font-mono w-4">{num1}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span>Denominator:</span>
            <input type="range" min="2" max="10" value={den1} onChange={(e) => { const d = Number(e.target.value); setDen1(d); if (num1 > d) setNum1(d); }} className="w-full accent-indigo-500" />
            <span className="font-mono w-4">{den1}</span>
          </div>
          {/* Bar 1 */}
          <div className="h-7 w-full flex rounded-lg overflow-hidden border border-slate-300 dark:border-white/20">
            {Array.from({ length: den1 }).map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 border-r last:border-r-0 border-white/30 flex items-center justify-center text-[10px] font-mono font-bold ${
                  i < num1 ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-white/5 text-slate-400'
                }`}
              >
                1/{den1}
              </div>
            ))}
          </div>
        </div>

        {/* Fraction 2 Controls */}
        <div className="p-3 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Fraction B</span>
            <span className="font-mono font-bold text-pink-500 text-sm">{num2} / {den2}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span>Numerator:</span>
            <input type="range" min="1" max={den2} value={num2} onChange={(e) => setNum2(Number(e.target.value))} className="w-full accent-pink-500" />
            <span className="font-mono w-4">{num2}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span>Denominator:</span>
            <input type="range" min="2" max="10" value={den2} onChange={(e) => { const d = Number(e.target.value); setDen2(d); if (num2 > d) setNum2(d); }} className="w-full accent-pink-500" />
            <span className="font-mono w-4">{den2}</span>
          </div>
          {/* Bar 2 */}
          <div className="h-7 w-full flex rounded-lg overflow-hidden border border-slate-300 dark:border-white/20">
            {Array.from({ length: den2 }).map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 border-r last:border-r-0 border-white/30 flex items-center justify-center text-[10px] font-mono font-bold ${
                  i < num2 ? 'bg-pink-500 text-white' : 'bg-slate-200 dark:bg-white/5 text-slate-400'
                }`}
              >
                1/{den2}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Denominator and Combined Sum Strip */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
          <span className="font-mono font-bold text-slate-800 dark:text-white">
            Common Denominator LCM({den1}, {den2}) = {commonDen}
          </span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            {num1}/{den1} + {num2}/{den2} = {eqNum1}/{commonDen} + {eqNum2}/{commonDen} = {sumNum}/{commonDen} {sumGcd > 1 ? `(${simplifiedSumNum}/${simplifiedSumDen})` : ''}
          </span>
        </div>

        {/* Combined Visual Bar */}
        <div className="h-8 w-full flex rounded-lg overflow-hidden border border-slate-300 dark:border-white/20">
          {Array.from({ length: Math.max(commonDen, sumNum) }).map((_, i) => {
            const isFromA = i < eqNum1;
            const isFromB = i >= eqNum1 && i < sumNum;
            const isFilled = i < sumNum;
            return (
              <div
                key={i}
                className={`h-full flex-1 border-r last:border-r-0 border-white/30 flex items-center justify-center text-[9px] font-mono font-bold ${
                  isFromA
                    ? 'bg-indigo-500 text-white'
                    : isFromB
                    ? 'bg-pink-500 text-white'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-300'
                }`}
                title={`Slice ${i + 1} of ${commonDen}`}
              >
                {isFilled ? '•' : ''}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-indigo-500 inline-block" />
            <span>Fraction A ({eqNum1}/{commonDen})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-pink-500 inline-block" />
            <span>Fraction B ({eqNum2}/{commonDen})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Integer Number Line (Class 6 The Other Side of Zero & Class 7 Integers)
export const IntegerNumberLineTool: React.FC = () => {
  const [start, setStart] = useState<number>(-3);
  const [jump, setJump] = useState<number>(7);

  const result = start + jump;

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Directed Integer Number Line & Jumps</h4>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          Sign Arithmetic
        </span>
      </div>

      <div className="flex items-center justify-center py-6 px-2 bg-white dark:bg-[#0c0e17] rounded-xl border border-slate-200 dark:border-white/10 overflow-x-auto">
        <svg width="460" height="110" className="overflow-visible">
          {/* Axis Line */}
          <line x1="20" y1="65" x2="440" y2="65" stroke="currentColor" strokeWidth="2.5" className="text-slate-400 dark:text-white/30" />
          {/* Arrow heads */}
          <polygon points="15,65 25,60 25,70" fill="currentColor" className="text-slate-400 dark:text-white/30" />
          <polygon points="445,65 435,60 435,70" fill="currentColor" className="text-slate-400 dark:text-white/30" />

          {/* Number Line Ticks (-10 to +10) */}
          {Array.from({ length: 21 }).map((_, idx) => {
            const val = idx - 10;
            const x = 30 + idx * 20;
            const isZero = val === 0;
            const isStart = val === start;
            const isEnd = val === result;

            return (
              <g key={val}>
                <line
                  x1={x}
                  y1={isZero ? 50 : 58}
                  x2={x}
                  y2={isZero ? 80 : 72}
                  stroke={isZero ? '#7957F5' : 'currentColor'}
                  strokeWidth={isZero ? 2.5 : 1.5}
                  className={isZero ? '' : 'text-slate-300 dark:text-white/20'}
                />
                <text
                  x={x}
                  y="92"
                  textAnchor="middle"
                  className={`text-[9px] font-mono ${
                    isZero
                      ? 'fill-[#7957F5] font-black'
                      : isStart || isEnd
                      ? 'fill-slate-900 dark:fill-white font-bold'
                      : 'fill-slate-400'
                  }`}
                >
                  {val}
                </text>

                {isStart && (
                  <circle cx={x} cy="65" r="5" fill="#3b82f6" />
                )}
                {isEnd && (
                  <circle cx={x} cy="65" r="5" fill="#10b981" />
                )}
              </g>
            );
          })}

          {/* Curved Jump Arc */}
          {jump !== 0 && result >= -10 && result <= 10 && start >= -10 && start <= 10 && (
            <path
              d={`M ${30 + (start + 10) * 20} 60 Q ${
                (30 + (start + 10) * 20 + 30 + (result + 10) * 20) / 2
              } ${jump > 0 ? 15 : 20} ${30 + (result + 10) * 20} 60`}
              fill="none"
              stroke={jump > 0 ? '#10b981' : '#f43f5e'}
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
          )}
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span>Starting Integer:</span>
            <span className="font-bold">{start}</span>
          </div>
          <input
            type="range"
            min="-10"
            max="10"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span>Directed Jump (Addition / Subtraction):</span>
            <span className="font-bold text-emerald-500">{jump > 0 ? `+${jump}` : jump}</span>
          </div>
          <input
            type="range"
            min="-10"
            max="10"
            value={jump}
            onChange={(e) => setJump(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 flex items-center justify-between font-mono text-sm">
        <span>Equation: {start} + ({jump}) = </span>
        <span className="text-lg font-black text-emerald-500">{result}</span>
      </div>
    </div>
  );
};

// 4. Prime Sieve & Divisibility Lab (Class 6 Prime Time)
export const PrimeSieveTool: React.FC = () => {
  const [filter, setFilter] = useState<number | null>(null);

  const isPrime = (n: number) => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sieve of Eratosthenes (Numbers 1–100)</h4>
        </div>
        <div className="flex items-center gap-1.5">
          {[2, 3, 5, 7].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(filter === p ? null : p)}
              className={`px-2 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
                filter === p
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
              }`}
            >
              Multiples of {p}
            </button>
          ))}
          {filter && (
            <button
              onClick={() => setFilter(null)}
              className="px-2 py-1 rounded text-xs font-mono bg-rose-500/10 text-rose-500 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5 p-3 bg-white dark:bg-[#0c0e17] rounded-xl border border-slate-200 dark:border-white/10 text-center text-xs font-mono">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
          const prime = isPrime(num);
          const isMultiple = filter ? num !== filter && num % filter === 0 : false;
          return (
            <div
              key={num}
              className={`py-1.5 rounded transition-all font-bold ${
                num === 1
                  ? 'bg-slate-100 dark:bg-white/5 text-slate-400'
                  : isMultiple
                  ? 'bg-rose-500/20 text-rose-500 line-through'
                  : prime
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300'
              }`}
              title={`${num}: ${prime ? 'Prime' : num === 1 ? 'Neither' : 'Composite'}`}
            >
              {num}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
          Prime Numbers (25 primes under 100)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-200 dark:bg-white/10 inline-block" />
          Composite Numbers
        </span>
      </div>
    </div>
  );
};

// 5. Perimeter & Area Grid Lab (Class 6 & Class 8)
export const PerimeterAreaTool: React.FC = () => {
  const [length, setLength] = useState<number>(6);
  const [width, setWidth] = useState<number>(4);

  const perimeter = 2 * (length + width);
  const area = length * width;

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Maximize2 className="w-5 h-5 text-cyan-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Perimeter & Area 2D Grid Lab</h4>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          Mensuration
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Dynamic Grid Box */}
        <div className="flex justify-center items-center p-4 bg-white dark:bg-[#0c0e17] rounded-xl border border-slate-200 dark:border-white/10 min-h-[200px]">
          <div
            className="grid gap-1 border-2 border-cyan-500 p-1 rounded-lg bg-cyan-500/10 transition-all"
            style={{
              gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
              width: `${length * 28}px`,
              height: `${width * 28}px`,
            }}
          >
            {Array.from({ length: area }).map((_, i) => (
              <div
                key={i}
                className="bg-cyan-500/30 border border-cyan-500/40 rounded flex items-center justify-center text-[8px] font-mono text-cyan-700 dark:text-cyan-300"
              >
                1
              </div>
            ))}
          </div>
        </div>

        {/* Sliders and Metrics */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span>Length (l):</span>
              <span className="font-bold text-cyan-500">{length} units</span>
            </div>
            <input
              type="range"
              min="2"
              max="9"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span>Width (b):</span>
              <span className="font-bold text-cyan-500">{width} units</span>
            </div>
            <input
              type="range"
              min="2"
              max="7"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Perimeter P = 2(l + b)</span>
              <span className="text-lg font-black font-mono text-slate-900 dark:text-white">
                {perimeter} units
              </span>
              <span className="text-[10px] text-slate-400 block">Boundary wire length</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Area A = l × b</span>
              <span className="text-lg font-black font-mono text-cyan-500">
                {area} sq units
              </span>
              <span className="text-[10px] text-slate-400 block">Surface tile squares</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Two-Pan Balance Scale Linear Equation Solver (Class 7 Algebra)
export const EquationBalancerTool: React.FC = () => {
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(3);
  const [c, setC] = useState<number>(11);

  // 2x + 3 = 11 => 2x = 8 => x = 4
  const diff = c - b;
  const xVal = a !== 0 ? (diff / a).toFixed(2) : 'Undefined';
  const isInteger = a !== 0 && diff % a === 0;

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Two-Pan Balance Scale Equation Balancer</h4>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">
          Linear Algebra
        </span>
      </div>

      <div className="p-4 bg-white dark:bg-[#0c0e17] rounded-xl border border-slate-200 dark:border-white/10 flex flex-col items-center space-y-3">
        {/* Scale SVG visual */}
        <svg width="340" height="120" className="overflow-visible">
          {/* Fulcrum base */}
          <polygon points="170,80 155,115 185,115" fill="#64748b" />
          {/* Horizontal Beam */}
          <line x1="60" y1="80" x2="280" y2="80" stroke="#7957F5" strokeWidth="4" />
          <circle cx="170" cy="80" r="4" fill="#D94BCB" />

          {/* Left Pan Strings & Pan */}
          <line x1="70" y1="80" x2="50" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="70" y1="80" x2="90" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
          <ellipse cx="70" cy="105" rx="30" ry="7" fill="#818cf8" opacity="0.6" />

          {/* Right Pan Strings & Pan */}
          <line x1="270" y1="80" x2="250" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="270" y1="80" x2="290" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
          <ellipse cx="270" cy="105" rx="30" ry="7" fill="#f472b6" opacity="0.6" />

          {/* Content on Left Pan */}
          <text x="70" y="60" textAnchor="middle" className="text-xs font-mono font-black fill-slate-900 dark:fill-white">
            {a}x + {b}
          </text>
          {/* Content on Right Pan */}
          <text x="270" y="60" textAnchor="middle" className="text-xs font-mono font-black fill-slate-900 dark:fill-white">
            {c}
          </text>
        </svg>

        <div className="text-center">
          <span className="text-base font-mono font-bold text-purple-600 dark:text-purple-400">
            {a}x + {b} = {c}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-slate-500 block">Coefficient (a)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={a}
            onChange={(e) => setA(Math.max(1, Number(e.target.value)))}
            className="w-full px-2 py-1 rounded bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 font-mono text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-slate-500 block">Constant (b)</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full px-2 py-1 rounded bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 font-mono text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-slate-500 block">Target (c)</label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            className="w-full px-2 py-1 rounded bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 font-mono text-xs"
          />
        </div>
      </div>

      <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 text-xs space-y-1 font-mono text-purple-900 dark:text-purple-300">
        <div>Step 1: Subtract {b} from both sides: {a}x = {c} - {b} = {diff}</div>
        <div>Step 2: Divide both sides by {a}: x = {diff} / {a}</div>
        <div className="font-bold text-sm mt-1 text-purple-600 dark:text-purple-400">
          Solution: x = {isInteger ? Number(xVal) : xVal}
        </div>
      </div>
    </div>
  );
};

// 7. Baudhayana-Pythagoras Visual Proof (Class 8 Pythagoras)
export const PythagorasVisualTool: React.FC = () => {
  const [a, setA] = useState<number>(3);
  const [b, setB] = useState<number>(4);

  const cSq = a * a + b * b;
  const c = Math.sqrt(cSq);
  const isTriple = Number.isInteger(c);

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Baudhayana-Pythagoras Geometric Dissection</h4>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
          a² + b² = c²
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Triangle & Squares SVG */}
        <div className="flex justify-center items-center p-3 bg-white dark:bg-[#0c0e17] rounded-xl border border-slate-200 dark:border-white/10 min-h-[220px]">
          <svg width="260" height="200" viewBox="0 0 260 200">
            {/* Right Triangle */}
            <polygon points="60,150 60,60 180,150" fill="#f8fafc" stroke="#334155" strokeWidth="2" className="dark:fill-white/5 dark:stroke-white/30" />
            {/* Right Angle marker */}
            <polyline points="60,135 75,135 75,150" fill="none" stroke="#64748b" strokeWidth="1.5" />

            {/* Square on leg a (vertical) */}
            <rect x="10" y="60" width="50" height="90" fill="#38bdf8" opacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
            <text x="35" y="110" textAnchor="middle" className="text-xs font-mono font-bold fill-sky-800 dark:fill-sky-300">
              a²={a*a}
            </text>

            {/* Square on leg b (horizontal) */}
            <rect x="60" y="150" width="120" height="40" fill="#ec4899" opacity="0.3" stroke="#be185d" strokeWidth="1.5" />
            <text x="120" y="175" textAnchor="middle" className="text-xs font-mono font-bold fill-pink-800 dark:fill-pink-300">
              b²={b*b}
            </text>

            {/* Hypotenuse label */}
            <text x="135" y="95" textAnchor="middle" className="text-xs font-mono font-bold fill-amber-600 dark:fill-amber-400">
              c² = {cSq}
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span>Leg a:</span>
              <span className="font-bold text-sky-500">{a}</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span>Leg b:</span>
              <span className="font-bold text-pink-500">{b}</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 font-mono text-xs space-y-1">
            <div>a² = {a}² = {a * a}</div>
            <div>b² = {b}² = {b * b}</div>
            <div className="font-bold text-amber-600 dark:text-amber-400 pt-1 border-t border-slate-200 dark:border-white/10">
              c = √({a * a} + {b * b}) = √{cSq} = {c.toFixed(3)} {isTriple && '★ Integer Pythagorean Triple!'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. Cartesian Coordinate Plotter (Class 8 & Class 9 Coordinates)
export const CoordinatePlotterTool: React.FC = () => {
  const [x1, setX1] = useState<number>(-2);
  const [y1, setY1] = useState<number>(3);
  const [x2, setX2] = useState<number>(4);
  const [y2, setY2] = useState<number>(-1);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Grid coordinates mapping (-5 to +5 -> 0 to 260)
  const toSvgX = (x: number) => 130 + x * 22;
  const toSvgY = (y: number) => 130 - y * 22;

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Cartesian Coordinate & Distance Plotter</h4>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          4 Quadrants
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Cartesian Grid */}
        <div className="flex justify-center items-center p-2 bg-white dark:bg-[#0c0e17] rounded-xl border border-slate-200 dark:border-white/10">
          <svg width="260" height="260" className="overflow-visible">
            {/* Grid Lines */}
            {Array.from({ length: 11 }).map((_, i) => {
              const pos = 20 + i * 22;
              return (
                <React.Fragment key={i}>
                  <line x1={pos} y1="20" x2={pos} y2="240" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-white/10" />
                  <line x1="20" y1={pos} x2="240" y2={pos} stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-white/10" />
                </React.Fragment>
              );
            })}

            {/* Axes */}
            <line x1="20" y1="130" x2="240" y2="130" stroke="currentColor" strokeWidth="2" className="text-slate-700 dark:text-white/60" />
            <line x1="130" y1="20" x2="130" y2="240" stroke="currentColor" strokeWidth="2" className="text-slate-700 dark:text-white/60" />

            {/* Segment connecting points */}
            <line
              x1={toSvgX(x1)}
              y1={toSvgY(y1)}
              x2={toSvgX(x2)}
              y2={toSvgY(y2)}
              stroke="#7957F5"
              strokeWidth="2.5"
            />

            {/* Point 1 */}
            <circle cx={toSvgX(x1)} cy={toSvgY(y1)} r="5" fill="#3b82f6" />
            <text x={toSvgX(x1) + 8} y={toSvgY(y1) - 6} className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">
              A({x1},{y1})
            </text>

            {/* Point 2 */}
            <circle cx={toSvgX(x2)} cy={toSvgY(y2)} r="5" fill="#ec4899" />
            <text x={toSvgX(x2) + 8} y={toSvgY(y2) - 6} className="text-[10px] font-mono font-bold fill-pink-600 dark:fill-pink-400">
              B({x2},{y2})
            </text>

            {/* Midpoint */}
            <circle cx={toSvgX(midX)} cy={toSvgY(midY)} r="4" fill="#10b981" />
          </svg>
        </div>

        {/* Inputs & Distance Formula */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 space-y-1">
              <span className="font-bold text-blue-600">Point A (x₁, y₁)</span>
              <div className="flex gap-2">
                <input type="number" min="-5" max="5" value={x1} onChange={(e) => setX1(Number(e.target.value))} className="w-12 px-1 py-0.5 rounded border border-blue-300 dark:border-blue-800 text-xs font-mono" />
                <input type="number" min="-5" max="5" value={y1} onChange={(e) => setY1(Number(e.target.value))} className="w-12 px-1 py-0.5 rounded border border-blue-300 dark:border-blue-800 text-xs font-mono" />
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/30 space-y-1">
              <span className="font-bold text-pink-600">Point B (x₂, y₂)</span>
              <div className="flex gap-2">
                <input type="number" min="-5" max="5" value={x2} onChange={(e) => setX2(Number(e.target.value))} className="w-12 px-1 py-0.5 rounded border border-pink-300 dark:border-pink-800 text-xs font-mono" />
                <input type="number" min="-5" max="5" value={y2} onChange={(e) => setY2(Number(e.target.value))} className="w-12 px-1 py-0.5 rounded border border-pink-300 dark:border-pink-800 text-xs font-mono" />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 font-mono text-xs space-y-1">
            <div className="text-slate-600 dark:text-slate-400">
              d = √[({x2} - {x1})² + ({y2} - {y1})²]
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Distance = {dist.toFixed(3)} units
            </div>
            <div className="text-emerald-600 dark:text-emerald-400">
              Midpoint M = ({midX}, {midY})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 9. Probability Simulator (Class 9 Probability)
export const ProbabilitySimulatorTool: React.FC = () => {
  const [trials, setTrials] = useState<number>(0);
  const [heads, setHeads] = useState<number>(0);
  const [tails, setTails] = useState<number>(0);

  const flip = (n: number) => {
    let h = 0;
    let t = 0;
    for (let i = 0; i < n; i++) {
      if (Math.random() < 0.5) h++;
      else t++;
    }
    setHeads((prev) => prev + h);
    setTails((prev) => prev + t);
    setTrials((prev) => prev + n);
  };

  const reset = () => {
    setTrials(0);
    setHeads(0);
    setTails(0);
  };

  const headPct = trials > 0 ? ((heads / trials) * 100).toFixed(1) : '50.0';
  const tailPct = trials > 0 ? ((tails / trials) * 100).toFixed(1) : '50.0';

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shuffle className="w-5 h-5 text-rose-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Monte Carlo Probability Coin Simulator</h4>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400">
          Law of Large Numbers
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 text-center space-y-1">
          <span className="text-xs font-mono text-slate-500 block">Heads (H)</span>
          <span className="text-2xl font-black font-mono text-blue-500">{heads}</span>
          <span className="text-xs font-mono text-slate-400 block">{headPct}% (Theoretical: 50%)</span>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 text-center space-y-1">
          <span className="text-xs font-mono text-slate-500 block">Tails (T)</span>
          <span className="text-2xl font-black font-mono text-pink-500">{tails}</span>
          <span className="text-xs font-mono text-slate-400 block">{tailPct}% (Theoretical: 50%)</span>
        </div>
      </div>

      {/* Progress Bar of experimental convergence */}
      <div className="h-6 w-full flex rounded-lg overflow-hidden border border-slate-300 dark:border-white/20">
        <div className="h-full bg-blue-500 transition-all flex items-center justify-center text-[10px] text-white font-mono font-bold" style={{ width: `${headPct}%` }}>
          {headPct}% H
        </div>
        <div className="h-full bg-pink-500 transition-all flex items-center justify-center text-[10px] text-white font-mono font-bold" style={{ width: `${tailPct}%` }}>
          {tailPct}% T
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
        <span className="text-xs font-mono text-slate-500">Total Flips: {trials}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => flip(1)}
            className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-xs font-bold cursor-pointer"
          >
            Flip 1x
          </button>
          <button
            onClick={() => flip(100)}
            className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow cursor-pointer"
          >
            Flip 100x
          </button>
          <button
            onClick={() => flip(1000)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-rose-500 text-white text-xs font-bold shadow cursor-pointer"
          >
            Flip 1,000x
          </button>
          <button
            onClick={reset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 10. Sequences & Progressions Predictor (Class 9 Sequences & AP)
export const SequencesPredictorTool: React.FC = () => {
  const [a, setA] = useState<number>(3);
  const [d, setD] = useState<number>(4);
  const [n, setN] = useState<number>(10);

  const nthTerm = a + (n - 1) * d;
  const sumN = (n / 2) * (2 * a + (n - 1) * d);

  const previewTerms = Array.from({ length: Math.min(8, n) }, (_, i) => a + i * d);

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Arithmetic Progression (AP) Predictor</h4>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400">
          aₙ = a + (n-1)d
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-slate-500 block">First Term (a)</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full px-2 py-1 rounded bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 font-mono text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-slate-500 block">Difference (d)</label>
          <input
            type="number"
            value={d}
            onChange={(e) => setD(Number(e.target.value))}
            className="w-full px-2 py-1 rounded bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 font-mono text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-slate-500 block">Target Term (n)</label>
          <input
            type="number"
            min="1"
            max="1000"
            value={n}
            onChange={(e) => setN(Math.max(1, Number(e.target.value)))}
            className="w-full px-2 py-1 rounded bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 font-mono text-xs"
          />
        </div>
      </div>

      {/* Visual Sequence Preview Pills */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono text-slate-500 uppercase">Sequence Progression Preview:</span>
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {previewTerms.map((term, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded bg-slate-200/70 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-bold"
            >
              {term}
            </span>
          ))}
          {n > 8 && <span className="text-slate-400">...</span>}
        </div>
      </div>

      {/* Formula Output Box */}
      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/30">
          <span className="text-[10px] text-teal-600 block">Term a_{n}</span>
          <span className="text-xl font-black text-teal-700 dark:text-teal-300">
            {nthTerm}
          </span>
          <span className="text-[10px] text-teal-500/80 block mt-0.5">{a} + ({n}-1)×{d}</span>
        </div>
        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/30">
          <span className="text-[10px] text-indigo-600 block">Sum S_{n}</span>
          <span className="text-xl font-black text-indigo-700 dark:text-indigo-300">
            {sumN}
          </span>
          <span className="text-[10px] text-indigo-500/80 block mt-0.5">({n}/2) × [{a} + {nthTerm}]</span>
        </div>
      </div>
    </div>
  );
};

// Dispatcher Component mapping tool IDs
export const MiddleSchoolInteractiveToolView: React.FC<ToolProps> = ({ toolId }) => {
  switch (toolId) {
    case 'tool-c6-angles':
    case 'tool-c7-parallel-transversal':
      return <AngleExplorerTool />;
    case 'tool-c6-fractions':
      return <FractionBarsTool />;
    case 'tool-c6-zero-side':
    case 'tool-c7-integers':
      return <IntegerNumberLineTool />;
    case 'tool-c6-prime-time':
    case 'tool-c7-common-ground':
      return <PrimeSieveTool />;
    case 'tool-c6-perimeter-area':
    case 'tool-c8-area-solids':
    case 'tool-c9-area-space':
      return <PerimeterAreaTool />;
    case 'tool-c7-equation-balancer':
    case 'tool-c7-algebra-letters':
      return <EquationBalancerTool />;
    case 'tool-c8-pythagoras':
    case 'tool-c7-triangles':
      return <PythagorasVisualTool />;
    case 'tool-c9-coordinates':
    case 'tool-c8-quadrilaterals':
      return <CoordinatePlotterTool />;
    case 'tool-c9-probability':
      return <ProbabilitySimulatorTool />;
    case 'tool-c9-sequences':
    case 'tool-c6-patterns':
    case 'tool-c8-powers':
      return <SequencesPredictorTool />;
    default:
      return <AngleExplorerTool />;
  }
};
