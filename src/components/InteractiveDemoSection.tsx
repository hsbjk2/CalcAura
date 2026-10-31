import React, { useState, useId } from 'react';
import { solveQuadratic, QuadraticSolution } from '../math/algebra.ts';
import { MathView } from './MathView.tsx';
import { RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';

interface InteractiveDemoSectionProps {
  onNavigateTab: (tabId: string) => void;
}

export const InteractiveDemoSection: React.FC<InteractiveDemoSectionProps> = ({ onNavigateTab }) => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-2);
  const [c, setC] = useState<number>(-3);

  const safeA = a === 0 ? 1 : a;
  const quad: QuadraticSolution = solveQuadratic(safeA, b, c) || {
    a: 1,
    b: -2,
    c: -3,
    discriminant: 16,
    rootType: 'two-real',
    roots: [{ real: 3 }, { real: -1 }],
    vertex: { x: 1, y: -4 },
    axisOfSymmetry: 1,
    yIntercept: -3,
    steps: [],
    latexFormula: 'x^2 - 2x - 3 = 0',
  };

  // SVG coordinate transformation
  const width = 520;
  const height = 300;
  const xMin = -7;
  const xMax = 7;
  const yMin = -7;
  const yMax = 9;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

  // Generate curve path
  const numPts = 140;
  const points: [number, number][] = [];
  for (let i = 0; i <= numPts; i++) {
    const x = xMin + (i / numPts) * (xMax - xMin);
    const y = safeA * x * x + b * x + c;
    points.push([toSvgX(x), toSvgY(y)]);
  }
  const pathD = points.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt[0].toFixed(1)},${pt[1].toFixed(1)}`,
    ''
  );

  const aId = useId();
  const bId = useId();
  const cId = useId();

  // Formatting polynomial formula string
  const formatPoly = () => {
    let res = '';
    if (safeA === 1) res += 'x^2';
    else if (safeA === -1) res += '-x^2';
    else res += `${safeA}x^2`;

    if (b > 0) res += ` + ${b === 1 ? '' : b}x`;
    else if (b < 0) res += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x`;

    if (c > 0) res += ` + ${c}`;
    else if (c < 0) res += ` - ${Math.abs(c)}`;

    return res;
  };

  const polyLatex = `f(x) = ${formatPoly()}`;

  return (
    <section id="interactive-demo" className="scroll-mt-32 py-14 sm:py-20 border-b border-slate-200/80 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono font-semibold tracking-wider text-[#7957F5] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7957F5]" />
            <span>Interactive Demonstration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
            Dynamic Quadratic Function Analysis
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-[#A6A9B8]">
            Adjust the coefficients <span className="font-mono text-slate-900 dark:text-white">a</span>,{' '}
            <span className="font-mono text-slate-900 dark:text-white">b</span>, and{' '}
            <span className="font-mono text-slate-900 dark:text-white">c</span> below. Observe the vertex, discriminant
            roots, and Cartesian curve update in real time.
          </p>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {[
              { label: 'x² - 2x - 3 (Real roots)', a: 1, b: -2, c: -3 },
              { label: 'x² - 4x + 4 (Repeated)', a: 1, b: -4, c: 4 },
              { label: '-x² + 2x + 3 (Inverted)', a: -1, b: 2, c: 3 },
              { label: 'x² + 2x + 4 (Complex)', a: 1, b: 2, c: 4 },
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setA(preset.a);
                  setB(preset.b);
                  setC(preset.c);
                }}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Demonstration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Parabola Canvas */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/12 p-5 sm:p-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7957F5]" />
                <span className="text-xs font-mono font-semibold text-slate-900 dark:text-[#F6F7FB]">
                  Cartesian Plane Visualizer
                </span>
              </div>
              <button
                onClick={() => {
                  setA(1);
                  setB(-2);
                  setC(-3);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* SVG Plot */}
            <div className="bg-slate-950 dark:bg-[#0B0D16] rounded-xl border border-slate-800 dark:border-white/[0.06] p-2 relative overflow-hidden">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[300px]">
                <defs>
                  <linearGradient id="demoParabolaGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7957F5" />
                    <stop offset="50%" stopColor="#5558E8" />
                    <stop offset="100%" stopColor="#D94BCB" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {Array.from({ length: 15 }).map((_, i) => {
                  const gx = xMin + i;
                  const sx = toSvgX(gx);
                  return (
                    <line
                      key={`x-${i}`}
                      x1={sx}
                      y1={0}
                      x2={sx}
                      y2={height}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  );
                })}

                {Array.from({ length: 17 }).map((_, i) => {
                  const gy = yMin + i;
                  const sy = toSvgY(gy);
                  return (
                    <line
                      key={`y-${i}`}
                      x1={0}
                      y1={sy}
                      x2={width}
                      y2={sy}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Axes */}
                <line
                  x1={0}
                  y1={toSvgY(0)}
                  x2={width}
                  y2={toSvgY(0)}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <line
                  x1={toSvgX(0)}
                  y1={0}
                  x2={toSvgX(0)}
                  y2={height}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />

                {/* Axis of Symmetry line x = quad.vertex.x */}
                <line
                  x1={toSvgX(quad.vertex.x)}
                  y1={0}
                  x2={toSvgX(quad.vertex.x)}
                  y2={height}
                  stroke="#38BDF8"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  strokeOpacity="0.4"
                />

                {/* Parabola Curve */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#demoParabolaGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Vertex Point */}
                <circle
                  cx={toSvgX(quad.vertex.x)}
                  cy={toSvgY(quad.vertex.y)}
                  r="5"
                  fill="#38BDF8"
                />
                <circle
                  cx={toSvgX(quad.vertex.x)}
                  cy={toSvgY(quad.vertex.y)}
                  r="9"
                  fill="none"
                  stroke="#38BDF8"
                  strokeOpacity="0.4"
                />

                {/* Real Roots Points */}
                {quad.rootType === 'two-real' && quad.roots.length >= 2 && (
                  <>
                    <circle cx={toSvgX(quad.roots[0].real)} cy={toSvgY(0)} r="5" fill="#D94BCB" />
                    <circle cx={toSvgX(quad.roots[1].real)} cy={toSvgY(0)} r="5" fill="#D94BCB" />
                  </>
                )}
                {quad.rootType === 'one-real' && quad.roots.length >= 1 && (
                  <circle cx={toSvgX(quad.roots[0].real)} cy={toSvgY(0)} r="5" fill="#D94BCB" />
                )}
              </svg>
            </div>

            {/* Slider Controls for Coefficients */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Coefficient a */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0D16]/60 border border-slate-200 dark:border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <label htmlFor={aId} className="text-slate-600 dark:text-[#A6A9B8]">
                    Coefficient <strong className="text-slate-900 dark:text-white">a</strong>
                  </label>
                  <span className="font-bold text-[#7957F5]">{safeA}</span>
                </div>
                <input
                  id={aId}
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={safeA}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setA(val === 0 ? 0.5 : val);
                  }}
                  className="w-full accent-[#7957F5] cursor-pointer"
                />
              </div>

              {/* Coefficient b */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0D16]/60 border border-slate-200 dark:border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <label htmlFor={bId} className="text-slate-600 dark:text-[#A6A9B8]">
                    Coefficient <strong className="text-slate-900 dark:text-white">b</strong>
                  </label>
                  <span className="font-bold text-[#5558E8]">{b}</span>
                </div>
                <input
                  id={bId}
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value))}
                  className="w-full accent-[#5558E8] cursor-pointer"
                />
              </div>

              {/* Coefficient c */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0D16]/60 border border-slate-200 dark:border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <label htmlFor={cId} className="text-slate-600 dark:text-[#A6A9B8]">
                    Constant <strong className="text-slate-900 dark:text-white">c</strong>
                  </label>
                  <span className="font-bold text-[#D94BCB]">{c}</span>
                </div>
                <input
                  id={cId}
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value))}
                  className="w-full accent-[#D94BCB] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Mathematical Derivation & Proof Ledger */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/12 p-5 sm:p-6 shadow-sm dark:shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.08] mb-4">
                <span className="text-xs font-mono text-slate-500 dark:text-[#A6A9B8] uppercase tracking-wider">
                  Analytical Solution Ledger
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Exact Solution
                </span>
              </div>

              {/* Formula Display */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B0D16] border border-slate-200 dark:border-white/[0.08] mb-4 text-center">
                <div className="text-[10px] font-mono text-slate-500 dark:text-[#A6A9B8] mb-1">POLYNOMIAL EQUATION</div>
                <div className="text-base text-slate-900 dark:text-[#F6F7FB] font-semibold py-1">
                  <MathView math={polyLatex} />
                </div>
              </div>

              {/* Analytical Metrics */}
              <div className="space-y-3 text-xs font-mono">
                {/* Discriminant */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 dark:text-[#A6A9B8] block text-[11px]">DISCRIMINANT (Δ = b² - 4ac)</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-[#F6F7FB]">
                      Δ = {quad.discriminant.toFixed(2)}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      quad.discriminant > 0
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : quad.discriminant === 0
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {quad.rootType === 'two-real'
                      ? 'Two Real Roots'
                      : quad.rootType === 'one-real'
                      ? 'Repeated Root'
                      : 'Complex Conjugates'}
                  </span>
                </div>

                {/* Vertex */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 dark:text-[#A6A9B8] block text-[11px]">PARABOLA VERTEX (h, k)</span>
                    <span className="text-sm font-bold text-sky-600 dark:text-[#38BDF8]">
                      ({quad.vertex.x.toFixed(2)}, {quad.vertex.y.toFixed(2)})
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-[#A6A9B8]">
                    {safeA > 0 ? 'Global Minimum' : 'Global Maximum'}
                  </span>
                </div>

                {/* Roots calculation */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                  <span className="text-slate-500 dark:text-[#A6A9B8] block text-[11px] mb-1">COMPUTED ROOTS</span>
                  {quad.rootType === 'two-real' && quad.roots.length >= 2 && (
                    <div className="text-[#D94BCB] font-bold text-sm">
                      x1 = {quad.roots[0].real.toFixed(3)}, x2 = {quad.roots[1].real.toFixed(3)}
                    </div>
                  )}
                  {quad.rootType === 'one-real' && quad.roots.length >= 1 && (
                    <div className="text-[#D94BCB] font-bold text-sm">
                      x = {quad.roots[0].real.toFixed(3)} (multiplicity 2)
                    </div>
                  )}
                  {quad.rootType === 'complex' && quad.roots.length >= 1 && (
                    <div className="text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm">
                      x = {quad.roots[0].real.toFixed(2)} ± {(quad.roots[0].imag || 0).toFixed(2)}i
                    </div>
                  )}
                </div>

                {/* First Derivative */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 dark:text-[#A6A9B8] block text-[11px]">FIRST DERIVATIVE</span>
                    <span className="text-xs text-slate-900 dark:text-[#F6F7FB] font-semibold">
                      f'(x) = {2 * safeA}x {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-[#A6A9B8]">f'(h) = 0 at vertex</span>
                </div>
              </div>
            </div>

            {/* Launch Full Solver Link */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.08]">
              <button
                onClick={() => onNavigateTab('solver')}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-900 dark:text-[#F6F7FB] hover:text-slate-950 dark:hover:text-white text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/12 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Open Full Equation Solver & Step Proofs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
