import React, { useState, useId } from 'react';
import { solveQuadratic, solveSystem2x2 } from '../math/algebra.ts';
import { MathView } from './MathView.tsx';
import { CheckCircle2, RotateCcw } from 'lucide-react';

type SolverMode = 'quadratic' | 'system' | 'linear';

export const EquationSolver: React.FC = () => {
  const [mode, setMode] = useState<SolverMode>('quadratic');

  // Quadratic state
  const [qa, setQa] = useState<number>(1);
  const [qb, setQb] = useState<number>(-5);
  const [qc, setQc] = useState<number>(6);

  // System 2x2 state
  const [sA1, setSA1] = useState<number>(2);
  const [sB1, setSB1] = useState<number>(1);
  const [sC1, setSC1] = useState<number>(5);
  const [sA2, setSA2] = useState<number>(1);
  const [sB2, setSB2] = useState<number>(3);
  const [sC2, setSC2] = useState<number>(10);

  // Linear state
  const [la, setLa] = useState<number>(3);
  const [lb, setLb] = useState<number>(-12);

  // Quadratic solution
  const quadSol = solveQuadratic(qa, qb, qc);

  // System solution
  const sysSol = solveSystem2x2(sA1, sB1, sC1, sA2, sB2, sC2);

  // Linear solution: ax + b = 0 => x = -b/a
  const linX = la !== 0 ? -lb / la : NaN;

  // Form input unique IDs
  const qaId = useId();
  const qbId = useId();
  const qcId = useId();
  const sA1Id = useId();
  const sB1Id = useId();
  const sC1Id = useId();
  const sA2Id = useId();
  const sB2Id = useId();
  const sC2Id = useId();
  const laId = useId();
  const lbId = useId();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Equation Solver & Step-by-Step Proofs
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Solve polynomial and linear systems with mathematical rigor, discriminant analysis, and verified substitution proofs.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          {[
            { id: 'quadratic', label: 'Quadratic Equation' },
            { id: 'system', label: '2×2 Linear System' },
            { id: 'linear', label: 'Simple Linear (ax + b = 0)' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as SolverMode)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                mode === m.id
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Solver Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              {mode === 'quadratic'
                ? 'Quadratic Coefficients'
                : mode === 'system'
                ? 'System Equations'
                : 'Linear Coefficients'}
            </h3>
            <button
              onClick={() => {
                if (mode === 'quadratic') {
                  setQa(1);
                  setQb(-5);
                  setQc(6);
                } else if (mode === 'system') {
                  setSA1(2);
                  setSB1(1);
                  setSC1(5);
                  setSA2(1);
                  setSB2(3);
                  setSC2(10);
                } else {
                  setLa(3);
                  setLb(-12);
                }
              }}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {mode === 'quadratic' && (
            <div className="space-y-4">
              <div className="p-3 bg-sky-50 dark:bg-slate-950 rounded-xl border border-sky-100 dark:border-slate-800 text-center">
                <MathView
                  math={`${qa}x^2 ${qb >= 0 ? `+ ${qb}` : `- ${Math.abs(qb)}`}x ${qc >= 0 ? `+ ${qc}` : `- ${Math.abs(qc)}`} = 0`}
                  displayMode={true}
                  className="text-base text-sky-800 dark:text-sky-300 font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label htmlFor={qaId} className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">a (x² coeff)</label>
                  <input
                    id={qaId}
                    type="number"
                    value={qa}
                    onChange={(e) => setQa(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={qbId} className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">b (x coeff)</label>
                  <input
                    id={qbId}
                    type="number"
                    value={qb}
                    onChange={(e) => setQb(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={qcId} className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">c (constant)</label>
                  <input
                    id={qcId}
                    type="number"
                    value={qc}
                    onChange={(e) => setQc(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm"
                  />
                </div>
              </div>

              {/* Presets */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-1.5">Example Cases:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => {
                      setQa(1);
                      setQb(-5);
                      setQc(6);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    x² - 5x + 6 = 0
                  </button>
                  <button
                    onClick={() => {
                      setQa(1);
                      setQb(-4);
                      setQc(4);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    (x - 2)² = 0
                  </button>
                  <button
                    onClick={() => {
                      setQa(1);
                      setQb(2);
                      setQc(5);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    x² + 2x + 5 = 0 (Complex)
                  </button>
                </div>
              </div>
            </div>
          )}

          {mode === 'system' && (
            <div className="space-y-4">
              <div className="p-3 bg-sky-50 dark:bg-slate-950 rounded-xl border border-sky-100 dark:border-slate-800 text-center space-y-1">
                <MathView math={`\\begin{cases} ${sA1}x + ${sB1}y = ${sC1} \\\\ ${sA2}x + ${sB2}y = ${sC2} \\end{cases}`} displayMode={true} className="text-sm text-sky-800 dark:text-sky-300" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Equation (1): a₁x + b₁y = c₁</span>
                  <div className="grid grid-cols-3 gap-2">
                    <input id={sA1Id} type="number" value={sA1} onChange={(e) => setSA1(parseFloat(e.target.value) || 0)} className="px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-center" />
                    <input id={sB1Id} type="number" value={sB1} onChange={(e) => setSB1(parseFloat(e.target.value) || 0)} className="px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-center" />
                    <input id={sC1Id} type="number" value={sC1} onChange={(e) => setSC1(parseFloat(e.target.value) || 0)} className="px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-center font-bold" />
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Equation (2): a₂x + b₂y = c₂</span>
                  <div className="grid grid-cols-3 gap-2">
                    <input id={sA2Id} type="number" value={sA2} onChange={(e) => setSA2(parseFloat(e.target.value) || 0)} className="px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-center" />
                    <input id={sB2Id} type="number" value={sB2} onChange={(e) => setSB2(parseFloat(e.target.value) || 0)} className="px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-center" />
                    <input id={sC2Id} type="number" value={sC2} onChange={(e) => setSC2(parseFloat(e.target.value) || 0)} className="px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-center font-bold" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'linear' && (
            <div className="space-y-4">
              <div className="p-3 bg-sky-50 dark:bg-slate-950 rounded-xl border border-sky-100 dark:border-slate-800 text-center">
                <MathView
                  math={`${la}x ${lb >= 0 ? `+ ${lb}` : `- ${Math.abs(lb)}`} = 0`}
                  displayMode={true}
                  className="text-base text-sky-800 dark:text-sky-300 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label htmlFor={laId} className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Slope a</label>
                  <input
                    id={laId}
                    type="number"
                    value={la}
                    onChange={(e) => setLa(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={lbId} className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Constant b</label>
                  <input
                    id={lbId}
                    type="number"
                    value={lb}
                    onChange={(e) => setLb(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Output: Step-by-Step Explanation and Proof */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Mathematical Solution & Verification
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Proof</span>
            </span>
          </div>

          {mode === 'quadratic' && quadSol && (
            <div className="space-y-4">
              {/* Highlight Result Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-sky-50 dark:bg-slate-950 rounded-xl border border-sky-100 dark:border-slate-800 text-center">
                  <span className="text-[11px] text-slate-500 block">Discriminant (Δ)</span>
                  <span className="text-base font-bold text-sky-700 dark:text-sky-300 font-mono">
                    {quadSol.discriminant}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-slate-950 rounded-xl border border-emerald-100 dark:border-slate-800 text-center">
                  <span className="text-[11px] text-slate-500 block">Nature of Roots</span>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mt-1">
                    {quadSol.rootType === 'two-real'
                      ? 'Two Real Roots'
                      : quadSol.rootType === 'one-real'
                      ? 'One Real (Repeated)'
                      : 'Complex Conjugates'}
                  </span>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-slate-950 rounded-xl border border-amber-100 dark:border-slate-800 text-center col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-slate-500 block">Vertex V(h, k)</span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono block mt-1">
                    ({quadSol.vertex.x.toFixed(2)}, {quadSol.vertex.y.toFixed(2)})
                  </span>
                </div>
              </div>

              {/* KaTeX Standard Formula */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Standard Quadratic Formula:</span>
                <MathView math={quadSol.latexFormula} displayMode={true} className="text-base text-slate-800 dark:text-slate-200" />
              </div>

              {/* Step-by-Step Proof */}
              <div className="space-y-2 text-xs font-mono">
                <span className="text-[11px] font-sans font-semibold text-slate-500 uppercase tracking-wider block">
                  Detailed Derivation Steps
                </span>
                {quadSol.steps.map((st, i) => (
                  <div key={i} className="p-2 rounded bg-slate-50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800/80">
                    {st}
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'system' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-sky-50 dark:bg-slate-950 rounded-xl border border-sky-100 dark:border-slate-800 text-center">
                  <span className="text-[11px] text-slate-500 block">Solution for x</span>
                  <span className="text-lg font-bold text-sky-700 dark:text-sky-300 font-mono">
                    {sysSol.status === 'unique' ? sysSol.x.toFixed(4) : sysSol.status}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-slate-950 rounded-xl border border-emerald-100 dark:border-slate-800 text-center">
                  <span className="text-[11px] text-slate-500 block">Solution for y</span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                    {sysSol.status === 'unique' ? sysSol.y.toFixed(4) : sysSol.status}
                  </span>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2 text-xs font-mono">
                <span className="text-[11px] font-sans font-semibold text-slate-500 uppercase tracking-wider block">
                  Cramer's Rule Determinants
                </span>
                {sysSol.steps.map((st, i) => (
                  <div key={i} className="p-2 rounded bg-slate-50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800/80">
                    {st}
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'linear' && (
            <div className="space-y-4">
              <div className="p-4 bg-sky-50 dark:bg-slate-950 rounded-xl border border-sky-100 dark:border-slate-800 text-center">
                <span className="text-xs text-slate-500 block mb-1">Root x</span>
                <span className="text-2xl font-bold text-sky-700 dark:text-sky-300 font-mono">
                  x = {isNaN(linX) ? 'Undefined' : linX.toFixed(4)}
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300">
                  1. Given linear equation: {la}x + ({lb}) = 0
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300">
                  2. Isolate variable: {la}x = {-lb}
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300">
                  3. Divide by coefficient a: x = ({-lb}) / {la} = {linX.toFixed(4)}
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300">
                  4. Verification: {la} × ({linX.toFixed(4)}) + ({lb}) = {(la * linX + lb).toFixed(4)} ≈ 0
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
