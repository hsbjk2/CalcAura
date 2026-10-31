import React, { useState, useId } from 'react';
import { computeStatistics, normalPdf } from '../math/statistics.ts';
import {
  det2x2,
  inv2x2,
  multiply2x2,
  eigenvalues2x2,
  Matrix2x2,
  detNxN,
  invNxN,
  multiplyNxN,
  traceNxN,
  transposeNxN,
  rankNxN,
  solveLinearSystemNxN,
} from '../math/linearAlgebra.ts';
import { UNIT_CATEGORIES, convertUnits } from '../math/conversions.ts';
import { calcGpa, planAttendance, CourseEntry } from '../math/student.ts';
import { MathView } from './MathView.tsx';
import {
  BarChart3,
  Grid3X3,
  Ruler,
  GraduationCap,
  MapPin,
  Sparkles,
  Calculator,
  RotateCcw,
  Equal,
} from 'lucide-react';

type StemTab = 'statistics' | 'matrices' | 'conversions' | 'land' | 'student';

export const StemToolkit: React.FC = () => {
  const [tab, setTab] = useState<StemTab>('statistics');

  // Statistics state
  const [dataInput, setDataInput] = useState<string>('12, 15, 18, 18, 22, 25, 29, 31, 35');
  const statsParsed = dataInput
    .split(/[, \n]+/)
    .map(Number)
    .filter((n) => !isNaN(n));
  const statsResult = computeStatistics(statsParsed);

  // Up to 5x5 Matrix state
  const [matrixDim, setMatrixDim] = useState<number>(3); // Supports 2, 3, 4, 5
  const [matrixSubTab, setMatrixSubTab] = useState<'properties' | 'system' | 'multiply'>('properties');

  const [matA, setMatA] = useState<number[][]>([
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0],
  ]);

  const [matB, setMatB] = useState<number[][]>([
    [2, 0, -1],
    [1, 3, 2],
    [0, -2, 1],
  ]);

  const [vecB, setVecB] = useState<number[]>([14, 11, 23]);

  const detA = detNxN(matA);
  const invA = invNxN(matA);
  const rankA = rankNxN(matA);
  const traceA = traceNxN(matA);
  const transA = transposeNxN(matA);
  const prodAB = multiplyNxN(matA, matB);
  const systemSol = solveLinearSystemNxN(matA, vecB);
  const eig2x2 =
    matrixDim === 2
      ? eigenvalues2x2([[matA[0][0], matA[0][1]], [matA[1][0], matA[1][1]]])
      : null;

  // Conversion state
  const [convCategory, setConvCategory] = useState<string>('Length');
  const currentCat = UNIT_CATEGORIES.find((c) => c.name === convCategory) || UNIT_CATEGORIES[0];
  const [convVal, setConvVal] = useState<number>(100);
  const [fromUnit, setFromUnit] = useState<string>(currentCat.units[0].id);
  const [toUnit, setToUnit] = useState<string>(currentCat.units[1].id);
  const convertedVal = convertUnits(convVal, fromUnit, toUnit, convCategory);

  // Land Plot state
  const [plotLength, setPlotLength] = useState<number>(60);
  const [plotWidth, setPlotWidth] = useState<number>(40);
  const plotAreaSqFt = plotLength * plotWidth;
  const plotAreaSqM = plotAreaSqFt * 0.092903;
  const plotAreaSqYd = plotAreaSqFt / 9; // 1 sq yard (gaj) = 9 sq ft
  const plotAreaAcres = plotAreaSqFt / 43560;
  const plotAreaGuntha = plotAreaSqFt / 1089;
  const plotAreaBigha = plotAreaSqFt / 27225;

  // Student state
  const [courses, setCourses] = useState<CourseEntry[]>([
    { id: '1', name: 'Calculus III', credits: 4, gradePoint: 9 },
    { id: '2', name: 'Linear Algebra', credits: 4, gradePoint: 10 },
    { id: '3', name: 'Physics Mechanics', credits: 3, gradePoint: 8 },
    { id: '4', name: 'Data Structures', credits: 4, gradePoint: 9 },
  ]);
  const gpaResult = calcGpa(courses);

  const [attendedClasses, setAttendedClasses] = useState<number>(38);
  const [totalClasses, setTotalClasses] = useState<number>(50);
  const [targetAttendance, setTargetAttendance] = useState<number>(75);
  const attendancePlan = planAttendance(attendedClasses, totalClasses, targetAttendance);

  // Accessible unique IDs
  const convValId = useId();
  const plotLengthId = useId();
  const plotWidthId = useId();
  const attendedClassesId = useId();
  const totalClassesId = useId();
  const targetAttendanceId = useId();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            STEM & Student Computing Toolkit
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Professional matrix algebra, statistical distributions, land plot dimensions, unit conversions, and academic planning.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
          {[
            { id: 'statistics', label: 'Statistics & Distribution', icon: BarChart3 },
            { id: 'matrices', label: 'Matrix Algebra', icon: Grid3X3 },
            { id: 'conversions', label: 'Unit Converter', icon: Ruler },
            { id: 'land', label: 'Land Plot Area', icon: MapPin },
            { id: 'student', label: 'Student & Attendance', icon: GraduationCap },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id as StemTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  tab === item.id
                    ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Statistics Section */}
      {tab === 'statistics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Input Dataset
            </h3>
            <p className="text-xs text-slate-500">Enter numbers separated by commas or spaces:</p>
            <textarea
              rows={4}
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            {/* Quick datasets */}
            <div className="flex gap-2">
              <button
                onClick={() => setDataInput('10, 20, 20, 30, 40, 50, 60, 70')}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              >
                Sample 1
              </button>
              <button
                onClick={() => setDataInput('5, 15, 25, 35, 45, 55, 65, 75, 85, 95')}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              >
                Uniform Set
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {statsResult && (
              <div className="space-y-6">
                {/* SVG Bell Curve for Normal Distribution */}
                <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
                    <span>Probability Density Function (Gaussian)</span>
                    <span className="text-sky-600 dark:text-sky-400">μ = {statsResult.mean.toFixed(2)}, σ = {statsResult.stdDevSample.toFixed(2)}</span>
                  </div>
                  <svg viewBox="0 0 400 150" className="w-full h-[150px]">
                    {(() => {
                      const m = statsResult.mean;
                      const s = statsResult.stdDevSample || 1;
                      const pts: [number, number][] = [];
                      for (let i = 0; i <= 100; i++) {
                        const x = m - 3.5 * s + (i / 100) * (7 * s);
                        const y = normalPdf(x, m, s);
                        const svgX = (i / 100) * 360 + 20;
                        const svgY = 130 - (y * s * 2.5) * 110;
                        pts.push([svgX, svgY]);
                      }
                      const path = pts.reduce((acc, p, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${p[0].toFixed(1)},${p[1].toFixed(1)}`, '');
                      return (
                        <g>
                          <line x1="20" y1="130" x2="380" y2="130" stroke="#475569" strokeWidth="1.5" />
                          <line x1="200" y1="20" x2="200" y2="130" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                          <path d={path} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* Summary Metrics Grid */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                    Comprehensive Statistical Summary
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Mean</span>
                      <span className="text-sm font-bold text-sky-600 dark:text-sky-400">{statsResult.mean.toFixed(3)}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Median</span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{statsResult.median.toFixed(3)}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Mode</span>
                      <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                        {statsResult.mode.length > 0 ? statsResult.mode.join(', ') : 'None'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Sample Std Dev</span>
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{statsResult.stdDevSample.toFixed(3)}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Q1 (25th %)</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{statsResult.q1.toFixed(3)}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Q3 (75th %)</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{statsResult.q3.toFixed(3)}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">IQR</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{statsResult.iqr.toFixed(3)}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Total Sum</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{statsResult.sum.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Matrices Section: Supports 2x2, 3x3, 4x4, and 5x5 */}
      {tab === 'matrices' && (
        <div className="space-y-6">
          {/* Matrix Dimension & Operation Controls Bar */}
          <div className="p-4 sm:p-5 bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Matrix Dimension:
              </span>
              <div className="flex items-center p-1 bg-slate-100 dark:bg-white/[0.04] rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold font-mono">
                {[2, 3, 4, 5].map((dim) => (
                  <button
                    key={dim}
                    onClick={() => {
                      setMatrixDim(dim);
                      setMatA((prev) =>
                        Array.from({ length: dim }, (_, r) =>
                          Array.from({ length: dim }, (_, c) => {
                            if (prev[r] && prev[r][c] !== undefined) return prev[r][c];
                            return r === c ? 1 : 0;
                          })
                        )
                      );
                      setMatB((prev) =>
                        Array.from({ length: dim }, (_, r) =>
                          Array.from({ length: dim }, (_, c) => {
                            if (prev[r] && prev[r][c] !== undefined) return prev[r][c];
                            return r === c ? 1 : 0;
                          })
                        )
                      );
                      setVecB((prev) =>
                        Array.from({ length: dim }, (_, i) => (prev[i] !== undefined ? prev[i] : (i + 1) * 3))
                      );
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      matrixDim === dim
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {dim}×{dim}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix Operation Tabs */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-white/[0.04] rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium overflow-x-auto">
              <button
                onClick={() => setMatrixSubTab('properties')}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  matrixSubTab === 'properties'
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Inversion & Properties
              </button>
              <button
                onClick={() => setMatrixSubTab('system')}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  matrixSubTab === 'system'
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Solve System (AX = B)
              </button>
              <button
                onClick={() => setMatrixSubTab('multiply')}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  matrixSubTab === 'multiply'
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Matrix Product (A × B)
              </button>
            </div>
          </div>

          {/* Main Matrix Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Input Matrix A & Value Presets */}
            <div className="lg:col-span-6 bg-white dark:bg-[#111321] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Input Matrix A ({matrixDim}×{matrixDim})
                  </h3>
                </div>

                {/* Preset Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setMatA(
                        Array.from({ length: matrixDim }, (_, r) =>
                          Array.from({ length: matrixDim }, (_, c) => (r === c ? 1 : 0))
                        )
                      );
                    }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                    title="Identity Matrix"
                  >
                    Identity (I)
                  </button>
                  <button
                    onClick={() => {
                      if (matrixDim === 2) setMatA([[4, 7], [2, 6]]);
                      else if (matrixDim === 3) setMatA([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
                      else if (matrixDim === 4) setMatA([[2, 1, 0, 0], [1, 2, 1, 0], [0, 1, 2, 1], [0, 0, 1, 2]]);
                      else setMatA([[2, -1, 0, 0, 0], [-1, 2, -1, 0, 0], [0, -1, 2, -1, 0], [0, 0, -1, 2, -1], [0, 0, 0, -1, 2]]);
                    }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Sample
                  </button>
                  <button
                    onClick={() => {
                      setMatA(Array.from({ length: matrixDim }, () => new Array(matrixDim).fill(0)));
                    }}
                    className="p-1 text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                    title="Clear All to Zero"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Matrix A Grid */}
              <div
                className={`grid gap-2 max-w-md mx-auto ${
                  matrixDim === 2
                    ? 'grid-cols-2'
                    : matrixDim === 3
                    ? 'grid-cols-3'
                    : matrixDim === 4
                    ? 'grid-cols-4'
                    : 'grid-cols-5'
                }`}
              >
                {matA.map((row, r) =>
                  row.map((val, c) => (
                    <div key={`${r}-${c}`} className="relative">
                      <input
                        type="number"
                        step="any"
                        value={val}
                        onChange={(e) => {
                          const n = parseFloat(e.target.value) || 0;
                          setMatA((prev) => {
                            const next = prev.map((rw) => [...rw]);
                            next[r][c] = n;
                            return next;
                          });
                        }}
                        className="w-full p-2 sm:p-2.5 bg-slate-50 dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 rounded-xl font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-xs"
                      />
                      <span className="absolute top-0.5 right-1 text-[8px] font-mono text-slate-400 dark:text-slate-600 pointer-events-none select-none">
                        {r + 1},{c + 1}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Live KaTeX Representation of Matrix A */}
              <div className="pt-2 text-center overflow-x-auto">
                <MathView
                  math={`A = \\begin{pmatrix} ${matA.map((r) => r.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`}
                  displayMode={true}
                  className="text-base sm:text-lg text-slate-800 dark:text-slate-200"
                />
              </div>

              {/* Secondary Matrix B Input if Multiplication SubTab */}
              {matrixSubTab === 'multiply' && (
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Input Matrix B ({matrixDim}×{matrixDim})
                    </h4>
                    <button
                      onClick={() => {
                        setMatB(
                          Array.from({ length: matrixDim }, (_, r) =>
                            Array.from({ length: matrixDim }, (_, c) => (r === c ? 1 : 0))
                          )
                        );
                      }}
                      className="text-[11px] font-mono text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                    >
                      Set to Identity
                    </button>
                  </div>

                  <div
                    className={`grid gap-2 max-w-md mx-auto ${
                      matrixDim === 2
                        ? 'grid-cols-2'
                        : matrixDim === 3
                        ? 'grid-cols-3'
                        : matrixDim === 4
                        ? 'grid-cols-4'
                        : 'grid-cols-5'
                    }`}
                  >
                    {matB.map((row, r) =>
                      row.map((val, c) => (
                        <input
                          key={`b-${r}-${c}`}
                          type="number"
                          step="any"
                          value={val}
                          onChange={(e) => {
                            const n = parseFloat(e.target.value) || 0;
                            setMatB((prev) => {
                              const next = prev.map((rw) => [...rw]);
                              next[r][c] = n;
                              return next;
                            });
                          }}
                          className="w-full p-2 bg-slate-50 dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 rounded-xl font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Linear System Vector B Input if System SubTab */}
              {matrixSubTab === 'system' && (
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Constants Column Vector B ({matrixDim}×1)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Input right-hand side values for the linear system <span className="font-mono">A · X = B</span>:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 max-w-md mx-auto justify-center">
                    {vecB.map((val, i) => (
                      <div key={`vb-${i}`} className="flex items-center gap-1">
                        <span className="text-xs font-mono text-slate-500">b_{i + 1} =</span>
                        <input
                          type="number"
                          step="any"
                          value={val}
                          onChange={(e) => {
                            const n = parseFloat(e.target.value) || 0;
                            setVecB((prev) => {
                              const next = [...prev];
                              next[i] = n;
                              return next;
                            });
                          }}
                          className="w-16 p-2 bg-slate-50 dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 rounded-xl font-mono text-center text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Calculations, Inversion, Solution & Breakdown */}
            <div className="lg:col-span-6 bg-white dark:bg-[#111321] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Mathematical Analysis & Output
                </h3>
                <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">
                  {matrixDim}×{matrixDim} Engine
                </span>
              </div>

              {/* Key Metrics Ribbon: Determinant, Rank, Trace */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-100 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] truncate">
                    det(A)
                  </span>
                  <span
                    className={`text-base font-bold font-mono block truncate ${
                      Math.abs(detA) > 1e-6
                        ? 'text-sky-600 dark:text-sky-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {detA.toFixed(4)}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-100 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] truncate">
                    Rank(A)
                  </span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-white block">
                    {rankA} <span className="text-[10px] text-slate-400 font-normal">/ {matrixDim}</span>
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-100 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] truncate">
                    Trace tr(A)
                  </span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-white block truncate">
                    {traceA.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* SUBTAB 1: Properties & Inversion */}
              {matrixSubTab === 'properties' && (
                <div className="space-y-4">
                  {/* Matrix Inverse */}
                  <div className="p-4 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-200/60 dark:border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-200">
                        Matrix Inverse A⁻¹ (Gauss-Jordan)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {invA ? 'Invertible (Non-Singular)' : 'Singular Matrix'}
                      </span>
                    </div>

                    {invA ? (
                      <div className="text-center overflow-x-auto py-2">
                        <MathView
                          math={`A^{-1} = \\begin{pmatrix} ${invA
                            .map((row) => row.map((v) => (Number.isInteger(v) ? v : v.toFixed(3))).join(' & '))
                            .join(' \\\\ ')} \\end{pmatrix}`}
                          displayMode={true}
                          className="text-xs sm:text-sm text-slate-900 dark:text-slate-100"
                        />
                      </div>
                    ) : (
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/40 text-xs text-amber-700 dark:text-amber-300">
                        Singular matrix (det A = 0). The inverse matrix does not exist.
                      </div>
                    )}
                  </div>

                  {/* Matrix Transpose */}
                  <div className="p-4 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-200/60 dark:border-white/10 space-y-2">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                      Matrix Transpose Aᵀ
                    </span>
                    <div className="text-center overflow-x-auto py-1">
                      <MathView
                        math={`A^T = \\begin{pmatrix} ${transA
                          .map((row) => row.join(' & '))
                          .join(' \\\\ ')} \\end{pmatrix}`}
                        displayMode={true}
                        className="text-xs sm:text-sm text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  {/* Eigenvalues for 2x2 */}
                  {eig2x2 && (
                    <div className="p-4 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-200/60 dark:border-white/10 space-y-1">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                        Characteristic Eigenvalues (det(A - λI) = 0)
                      </span>
                      <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 pt-1">
                        {eig2x2[0].imag !== undefined
                          ? `λ₁ = ${eig2x2[0].real.toFixed(3)} + ${eig2x2[0].imag.toFixed(3)}i,  λ₂ = ${eig2x2[1].real.toFixed(3)} - ${Math.abs(eig2x2[1].imag ?? 0).toFixed(3)}i`
                          : `λ₁ = ${eig2x2[0].real.toFixed(3)},  λ₂ = ${eig2x2[1].real.toFixed(3)}`}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB 2: Solve System (AX = B) */}
              {matrixSubTab === 'system' && (
                <div className="space-y-4">
                  <div className="p-4 bg-sky-500/10 dark:bg-sky-500/15 rounded-xl border border-sky-500/20 space-y-3">
                    <span className="text-xs font-bold text-sky-800 dark:text-sky-300 block">
                      Solution Vector X (for AX = B)
                    </span>

                    {systemSol.status === 'unique' && systemSol.solution ? (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {systemSol.solution.map((val, idx) => (
                            <div
                              key={idx}
                              className="p-2 bg-white dark:bg-[#111321] rounded-lg border border-sky-500/30 text-center"
                            >
                              <span className="text-[10px] text-slate-400 font-mono block">
                                Variable x_{idx + 1}
                              </span>
                              <span className="text-sm font-bold font-mono text-sky-700 dark:text-sky-300">
                                {Number.isInteger(val) ? val : val.toFixed(4)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 text-center overflow-x-auto">
                          <MathView
                            math={`X = \\begin{pmatrix} ${systemSol.solution
                              .map((v) => (Number.isInteger(v) ? v : v.toFixed(4)))
                              .join(' \\\\ ')} \\end{pmatrix}`}
                            displayMode={true}
                            className="text-sm text-sky-950 dark:text-sky-200"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-lg text-xs text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50">
                        {systemSol.error || 'System does not have a unique solution.'}
                      </div>
                    )}
                  </div>

                  {/* Step Derivation */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Gauss-Jordan Elimination Steps
                    </span>
                    <div className="space-y-1 p-2.5 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5 font-mono text-[11px]">
                      {systemSol.steps.map((st, i) => (
                        <p key={i} className="leading-snug text-slate-700 dark:text-slate-300">{st}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 3: Matrix Product (A x B) */}
              {matrixSubTab === 'multiply' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-200/60 dark:border-white/10 space-y-2">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                      Matrix Product Result C = A · B ({matrixDim}×{matrixDim})
                    </span>

                    <div className="text-center overflow-x-auto py-2">
                      <MathView
                        math={`C = A \\cdot B = \\begin{pmatrix} ${prodAB
                          .map((row) => row.map((v) => (Number.isInteger(v) ? v : v.toFixed(3))).join(' & '))
                          .join(' \\\\ ')} \\end{pmatrix}`}
                        displayMode={true}
                        className="text-xs sm:text-sm text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Unit Converter Section */}
      {tab === 'conversions' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
            {UNIT_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setConvCategory(cat.name);
                  setFromUnit(cat.units[0].id);
                  setToUnit(cat.units[1].id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  convCategory === cat.name
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={convValId} className="block text-xs text-slate-500 mb-1">From</label>
              <input
                id={convValId}
                type="number"
                value={convVal}
                onChange={(e) => setConvVal(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm mb-2"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs"
              >
                {currentCat.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs text-slate-500 mb-1">Result</span>
              <div className="w-full p-2.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 rounded-xl font-mono text-sm font-bold text-sky-700 dark:text-sky-300 mb-2 truncate">
                {convertedVal.toFixed(6).replace(/\.?0+$/, '')}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs"
              >
                {currentCat.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Land Plot Section */}
      {tab === 'land' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Plot Dimensions (Feet)
            </h3>
            <div>
              <label htmlFor={plotLengthId} className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Plot Length (ft)</label>
              <input
                id={plotLengthId}
                type="number"
                value={plotLength}
                onChange={(e) => setPlotLength(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm"
              />
            </div>
            <div>
              <label htmlFor={plotWidthId} className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Plot Width (ft)</label>
              <input
                id={plotWidthId}
                type="number"
                value={plotWidth}
                onChange={(e) => setPlotWidth(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Plot Measurement Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">Square Feet</span>
                <span className="text-base font-bold text-sky-600 dark:text-sky-400">{plotAreaSqFt.toLocaleString()} sq ft</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">Square Yards (Gaj)</span>
                <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{plotAreaSqYd.toFixed(2)} gaj</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">Square Meters</span>
                <span className="text-base font-bold text-amber-600 dark:text-amber-400">{plotAreaSqM.toFixed(2)} m²</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">Acres</span>
                <span className="text-base font-bold text-slate-700 dark:text-slate-300">{plotAreaAcres.toFixed(4)} ac</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">Guntha</span>
                <span className="text-base font-bold text-slate-700 dark:text-slate-300">{plotAreaGuntha.toFixed(2)} guntha</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">Bigha</span>
                <span className="text-base font-bold text-slate-700 dark:text-slate-300">{plotAreaBigha.toFixed(3)} bigha</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Section */}
      {tab === 'student' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* GPA Calculator */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                Weighted GPA / CGPA
              </h3>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                GPA: {gpaResult.gpa.toFixed(2)} / 10.0
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {courses.map((c, i) => (
                <div key={c.id} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[i].name = e.target.value;
                      setCourses(updated);
                    }}
                    className="col-span-6 px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Credits"
                    value={c.credits}
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[i].credits = parseFloat(e.target.value) || 0;
                      setCourses(updated);
                    }}
                    className="col-span-3 px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono text-center"
                  />
                  <input
                    type="number"
                    placeholder="Grade"
                    value={c.gradePoint}
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[i].gradePoint = parseFloat(e.target.value) || 0;
                      setCourses(updated);
                    }}
                    className="col-span-3 px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono text-center font-bold"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Planner */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Attendance Eligibility Planner
            </h3>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label htmlFor={attendedClassesId} className="block text-slate-500 mb-1">Attended</label>
                <input
                  id={attendedClassesId}
                  type="number"
                  value={attendedClasses}
                  onChange={(e) => setAttendedClasses(parseInt(e.target.value) || 0)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-center"
                />
              </div>
              <div>
                <label htmlFor={totalClassesId} className="block text-slate-500 mb-1">Total Held</label>
                <input
                  id={totalClassesId}
                  type="number"
                  value={totalClasses}
                  onChange={(e) => setTotalClasses(parseInt(e.target.value) || 0)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-center"
                />
              </div>
              <div>
                <label htmlFor={targetAttendanceId} className="block text-slate-500 mb-1">Target %</label>
                <input
                  id={targetAttendanceId}
                  type="number"
                  value={targetAttendance}
                  onChange={(e) => setTargetAttendance(parseInt(e.target.value) || 75)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-center"
                />
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              attendancePlan.status === 'on-track'
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-800 dark:text-red-300'
            }`}>
              <div className="font-bold text-sm mb-1">
                Current Attendance: {attendancePlan.currentPercent}%
              </div>
              <p>{attendancePlan.advice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
