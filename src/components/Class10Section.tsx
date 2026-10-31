import React, { useState } from 'react';
import { MathView } from './MathView.tsx';
import { Translations } from '../i18n/translations.ts';
import {
  CLASS_10_CHAPTERS,
  groupChaptersByUnit,
  CurriculumChapter,
} from '../data/curriculumData.ts';
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Compass,
  AreaChart,
  Shapes,
  BarChart2,
  CheckCircle2,
  Layers,
  Filter,
  Calculator,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Class10SectionProps {
  t: Translations;
  onNavigateStage: (stageId: string) => void;
  hideHeader?: boolean;
}

const getChapterIcon = (targetStageId: string) => {
  switch (targetStageId) {
    case 'stage-02':
      return AreaChart;
    case 'stage-03':
      return Shapes;
    case 'stage-04':
      return Compass;
    case 'stage-06':
      return BarChart2;
    case 'stage-07':
      return BookOpen;
    case 'stage-08':
      return CheckCircle2;
    default:
      return Layers;
  }
};

interface SolverConfig {
  label: string;
  fields: { key: string; label: string; defaultValue: number; unit?: string }[];
  compute: (inputs: Record<string, number>) => {
    latexResult: string;
    metrics: { label: string; value: string | number }[];
    steps: string[];
  };
}

const CHAPTER_SIDE_SOLVERS: Record<string, SolverConfig> = {
  'c10-06': {
    label: 'Triangle Sides & Pythagoras Solver',
    fields: [
      { key: 'a', label: 'Side a', defaultValue: 3, unit: 'cm' },
      { key: 'b', label: 'Side b', defaultValue: 4, unit: 'cm' },
      { key: 'c', label: 'Side c (or Hypotenuse)', defaultValue: 5, unit: 'cm' },
    ],
    compute: (vals) => {
      const a = Math.max(0.1, Number(vals.a) || 3);
      const b = Math.max(0.1, Number(vals.b) || 4);
      const c = Math.max(0.1, Number(vals.c) || 5);
      const isRightTriangle = Math.abs(a * a + b * b - c * c) < 0.01;
      const p = a + b + c;
      const s = p / 2;
      const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));

      return {
        latexResult: isRightTriangle
          ? `c = \\sqrt{${a}^2 + ${b}^2} = \\mathbf{${c.toFixed(2)}} \\implies a^2+b^2=c^2`
          : `\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)} = \\mathbf{${area.toFixed(2)}} \\text{ cm}^2`,
        metrics: [
          { label: 'Perimeter (P)', value: `${p.toFixed(2)} cm` },
          { label: 'Area', value: `${area.toFixed(2)} cm²` },
          { label: 'Semi-perimeter (s)', value: `${s.toFixed(2)} cm` },
          { label: 'Right-Angled?', value: isRightTriangle ? 'Yes (Verified)' : 'General Triangle' },
        ],
        steps: [
          `Sides: a = ${a}, b = ${b}, c = ${c}`,
          `Perimeter P = ${a} + ${b} + ${c} = ${p.toFixed(2)}`,
          `Heron's s = ${s.toFixed(2)}`,
          `Area = √(${s.toFixed(1)} × ${(s - a).toFixed(1)} × ${(s - b).toFixed(1)} × ${(s - c).toFixed(1)}) = ${area.toFixed(2)} cm²`,
        ],
      };
    },
  },
  'c10-07': {
    label: 'Coordinate Distance & Midpoint Solver',
    fields: [
      { key: 'x1', label: 'x₁', defaultValue: 1 },
      { key: 'y1', label: 'y₁', defaultValue: 2 },
      { key: 'x2', label: 'x₂', defaultValue: 4 },
      { key: 'y2', label: 'y₂', defaultValue: 6 },
    ],
    compute: (vals) => {
      const x1 = Number(vals.x1) || 1;
      const y1 = Number(vals.y1) || 2;
      const x2 = Number(vals.x2) || 4;
      const y2 = Number(vals.y2) || 6;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;

      return {
        latexResult: `d = \\sqrt{(${x2} - ${x1})^2 + (${y2} - ${y1})^2} = \\mathbf{${dist.toFixed(4)}}`,
        metrics: [
          { label: 'Distance', value: `${dist.toFixed(4)} units` },
          { label: 'Midpoint M', value: `(${mx.toFixed(2)}, ${my.toFixed(2)})` },
          { label: 'Slope m', value: dx !== 0 ? (dy / dx).toFixed(3) : 'Vertical' },
        ],
        steps: [
          `Δx = ${x2} - ${x1} = ${dx}, Δy = ${y2} - ${y1} = ${dy}`,
          `d = √(${dx * dx} + ${dy * dy}) = √${dx * dx + dy * dy} = ${dist.toFixed(4)}`,
        ],
      };
    },
  },
  'c10-08': {
    label: 'Trigonometric Sides & Ratio Calculator',
    fields: [
      { key: 'opp', label: 'Opposite Side (Perpendicular)', defaultValue: 3, unit: 'cm' },
      { key: 'adj', label: 'Adjacent Side (Base)', defaultValue: 4, unit: 'cm' },
    ],
    compute: (vals) => {
      const opp = Math.max(0.1, Number(vals.opp) || 3);
      const adj = Math.max(0.1, Number(vals.adj) || 4);
      const hyp = Math.sqrt(opp * opp + adj * adj);
      const sin = opp / hyp;
      const cos = adj / hyp;
      const tan = opp / adj;
      const deg = (Math.atan2(opp, adj) * 180) / Math.PI;

      return {
        latexResult: `\\text{Hypotenuse } c = \\sqrt{${opp}^2 + ${adj}^2} = \\mathbf{${hyp.toFixed(2)}}, \\quad \\tan\\theta = \\mathbf{${tan.toFixed(3)}}`,
        metrics: [
          { label: 'Hypotenuse (h)', value: hyp.toFixed(4) },
          { label: 'sin θ (opp/hyp)', value: sin.toFixed(4) },
          { label: 'cos θ (adj/hyp)', value: cos.toFixed(4) },
          { label: 'tan θ (opp/adj)', value: tan.toFixed(4) },
          { label: 'Angle θ', value: `${deg.toFixed(2)}°` },
        ],
        steps: [
          `Opposite = ${opp}, Adjacent = ${adj}`,
          `Hypotenuse = √(${opp * opp} + ${adj * adj}) = ${hyp.toFixed(4)}`,
          `sin θ = ${opp} / ${hyp.toFixed(2)} = ${sin.toFixed(4)}`,
          `Angle θ = arctan(${opp}/${adj}) = ${deg.toFixed(2)}°`,
        ],
      };
    },
  },
  'c10-12': {
    label: 'Circle & Sector Area Calculator',
    fields: [
      { key: 'r', label: 'Radius (r)', defaultValue: 7, unit: 'cm' },
      { key: 'theta', label: 'Sector Angle (θ)', defaultValue: 60, unit: '°' },
    ],
    compute: (vals) => {
      const r = Math.max(0.1, Number(vals.r) || 7);
      const theta = Math.max(0, Math.min(360, Number(vals.theta) || 60));
      const area = Math.PI * r * r;
      const circum = 2 * Math.PI * r;
      const sectorArea = (theta / 360) * area;
      const arcLength = (theta / 360) * circum;

      return {
        latexResult: `A = \\pi (${r})^2 = \\mathbf{${area.toFixed(2)}} \\text{ cm}^2, \\quad A_{sector} = \\mathbf{${sectorArea.toFixed(2)}} \\text{ cm}^2`,
        metrics: [
          { label: 'Full Circle Area', value: `${area.toFixed(2)} cm²` },
          { label: 'Circumference', value: `${circum.toFixed(2)} cm` },
          { label: 'Sector Area (θ/360 × πr²)', value: `${sectorArea.toFixed(2)} cm²` },
          { label: 'Arc Length (l)', value: `${arcLength.toFixed(2)} cm` },
        ],
        steps: [
          `Radius r = ${r} cm, Sector angle θ = ${theta}°`,
          `Circle Area = π × (${r})² = ${area.toFixed(2)} cm²`,
          `Sector Area = (${theta}/360) × ${area.toFixed(2)} = ${sectorArea.toFixed(2)} cm²`,
        ],
      };
    },
  },
  'c10-13': {
    label: 'Surface Areas & Volumes (Cylinder & Cone)',
    fields: [
      { key: 'r', label: 'Radius (r)', defaultValue: 7, unit: 'cm' },
      { key: 'h', label: 'Height (h)', defaultValue: 10, unit: 'cm' },
    ],
    compute: (vals) => {
      const r = Math.max(0.1, Number(vals.r) || 7);
      const h = Math.max(0.1, Number(vals.h) || 10);
      const cylVol = Math.PI * r * r * h;
      const cylCSA = 2 * Math.PI * r * h;
      const cylTSA = 2 * Math.PI * r * (r + h);
      const coneSlant = Math.sqrt(r * r + h * h);
      const coneVol = (1 / 3) * cylVol;

      return {
        latexResult: `V_{cyl} = \\pi (${r})^2 (${h}) = \\mathbf{${cylVol.toFixed(2)}} \\text{ cm}^3, \\quad \\text{TSA} = \\mathbf{${cylTSA.toFixed(2)}} \\text{ cm}^2`,
        metrics: [
          { label: 'Cylinder Volume', value: `${cylVol.toFixed(2)} cm³` },
          { label: 'Cylinder Total Surface Area', value: `${cylTSA.toFixed(2)} cm²` },
          { label: 'Cylinder Curved Surface Area', value: `${cylCSA.toFixed(2)} cm²` },
          { label: 'Cone Volume (1/3 V_cyl)', value: `${coneVol.toFixed(2)} cm³` },
          { label: 'Cone Slant Height (l)', value: `${coneSlant.toFixed(2)} cm` },
        ],
        steps: [
          `Radius r = ${r} cm, Height h = ${h} cm`,
          `Cylinder Volume = π r² h = ${cylVol.toFixed(2)} cm³`,
          `TSA = 2 π r (r + h) = 2 × π × ${r} × (${r + h}) = ${cylTSA.toFixed(2)} cm²`,
        ],
      };
    },
  },
  'c10-04': {
    label: 'Quadratic Equation Solver',
    fields: [
      { key: 'a', label: 'Coeff a', defaultValue: 1 },
      { key: 'b', label: 'Coeff b', defaultValue: -5 },
      { key: 'c', label: 'Coeff c', defaultValue: 6 },
    ],
    compute: (vals) => {
      let a = Number(vals.a);
      if (a === 0) a = 1;
      const b = Number(vals.b) || 0;
      const c = Number(vals.c) || 0;
      const d = b * b - 4 * a * c;

      if (d >= 0) {
        const x1 = (-b + Math.sqrt(d)) / (2 * a);
        const x2 = (-b - Math.sqrt(d)) / (2 * a);
        return {
          latexResult: `x_1 = \\mathbf{${x1.toFixed(3)}}, \\quad x_2 = \\mathbf{${x2.toFixed(3)}} \\quad (D = ${d.toFixed(2)})`,
          metrics: [
            { label: 'Discriminant (D)', value: d.toFixed(2) },
            { label: 'Root 1 (x₁)', value: x1.toFixed(3) },
            { label: 'Root 2 (x₂)', value: x2.toFixed(3) },
            { label: 'Nature of Roots', value: d > 0 ? 'Real & Distinct' : 'Real & Equal' },
          ],
          steps: [
            `Equation: ${a}x² + (${b})x + (${c}) = 0`,
            `D = b² - 4ac = (${b})² - 4(${a})(${c}) = ${d.toFixed(2)}`,
            `Roots x = (-b ± √D) / 2a = ${x1.toFixed(3)}, ${x2.toFixed(3)}`,
          ],
        };
      } else {
        const re = -b / (2 * a);
        const im = Math.sqrt(-d) / (2 * a);
        return {
          latexResult: `x = \\mathbf{${re.toFixed(3)} \\pm ${Math.abs(im).toFixed(3)}i} \\quad (D = ${d.toFixed(2)} < 0)`,
          metrics: [
            { label: 'Discriminant (D)', value: d.toFixed(2) },
            { label: 'Complex Roots', value: `${re.toFixed(3)} ± ${Math.abs(im).toFixed(3)}i` },
            { label: 'Nature of Roots', value: 'Complex Conjugates' },
          ],
          steps: [`D < 0: No real roots. Two complex conjugate roots exist.`],
        };
      }
    },
  },
  'c10-05': {
    label: 'Arithmetic Progression Solver',
    fields: [
      { key: 'a', label: 'First Term (a)', defaultValue: 2 },
      { key: 'd', label: 'Common Diff (d)', defaultValue: 3 },
      { key: 'n', label: 'Term Number (n)', defaultValue: 10, unit: 'terms' },
    ],
    compute: (vals) => {
      const a = Number(vals.a) || 2;
      const d = Number(vals.d) || 3;
      const n = Math.max(1, Math.round(Number(vals.n) || 10));
      const an = a + (n - 1) * d;
      const sn = (n / 2) * (2 * a + (n - 1) * d);

      return {
        latexResult: `a_{${n}} = \\mathbf{${an}}, \\quad S_{${n}} = \\mathbf{${sn}}`,
        metrics: [
          { label: `${n}th Term (a_n)`, value: an },
          { label: `Sum of ${n} Terms (S_n)`, value: sn },
          { label: 'First 5 Terms', value: [a, a + d, a + 2 * d, a + 3 * d, a + 4 * d].join(', ') },
        ],
        steps: [
          `a_n = a + (n-1)d = ${a} + (${n}-1)×${d} = ${an}`,
          `S_n = (n/2)[2a + (n-1)d] = (${n}/2)[${2 * a} + ${an - a}] = ${sn}`,
        ],
      };
    },
  },
  'c10-01': {
    label: 'Real Numbers: Euclid HCF & LCM',
    fields: [
      { key: 'a', label: 'Number a', defaultValue: 48 },
      { key: 'b', label: 'Number b', defaultValue: 18 },
    ],
    compute: (vals) => {
      const a = Math.abs(Math.round(Number(vals.a) || 48));
      const b = Math.abs(Math.round(Number(vals.b) || 18));
      const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
      const g = gcd(a, b);
      const l = (a * b) / (g || 1);
      const q = Math.floor(a / (b || 1));
      const r = a % (b || 1);

      return {
        latexResult: `\\text{HCF}(${a}, ${b}) = \\mathbf{${g}}, \\quad \\text{LCM} = \\mathbf{${l}}, \\quad ${a} = ${b}(${q}) + ${r}`,
        metrics: [
          { label: 'HCF / GCD', value: g },
          { label: 'LCM', value: l },
          { label: 'Euclid Form (a = bq + r)', value: `${a} = ${b}×${q} + ${r}` },
          { label: 'Product Verification', value: `${a * b} = ${g * l}` },
        ],
        steps: [
          `Apply Euclid division lemma: ${a} = ${b} × ${q} + ${r}`,
          `HCF = ${g}`,
          `LCM = (${a} × ${b}) / ${g} = ${l}`,
        ],
      };
    },
  },
};

export const Class10Section: React.FC<Class10SectionProps> = ({
  t,
  onNavigateStage,
  hideHeader = false,
}) => {
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>('all');
  const [activeChapterId, setActiveChapterId] = useState<string | null>('c10-06');
  const [solverInputs, setSolverInputs] = useState<Record<string, Record<string, number>>>({});

  const units = groupChaptersByUnit(CLASS_10_CHAPTERS);

  const displayedUnits =
    selectedUnitFilter === 'all'
      ? units
      : units.filter((u) => u.title.toLowerCase().includes(selectedUnitFilter.toLowerCase()));

  const handleInputChange = (chapterId: string, key: string, val: number) => {
    setSolverInputs((prev) => ({
      ...prev,
      [chapterId]: {
        ...(prev[chapterId] || {}),
        [key]: val,
      },
    }));
  };

  return (
    <div id="class-10-mathematics" className="w-full">
      {/* Section Header or Streamlined Controls */}
      {!hideHeader ? (
        <div className="pb-6 mb-8 border-b border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-mono font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Secondary Standard (Class 10)</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Class 10 Mathematics
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] max-w-3xl leading-relaxed">
              {t.class10Subtitle ||
                'Foundational secondary mathematics curriculum: real numbers, polynomials, linear equations in two variables, quadratic equations, trigonometry, coordinate geometry, mensuration, and statistics.'}
            </p>
          </div>

          {/* Unit Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 dark:text-[#A6A9B8] font-medium flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Unit:</span>
              </span>
              <select
                value={selectedUnitFilter}
                onChange={(e) => setSelectedUnitFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#111321] border border-slate-300 dark:border-white/12 text-slate-800 dark:text-white text-xs font-medium focus:ring-2 focus:ring-[#7957F5] focus:outline-none cursor-pointer shadow-xs"
              >
                <option value="all">All Units (14 Chapters)</option>
                {units.map((u) => (
                  <option key={u.id} value={u.title}>
                    {u.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-5 mb-7 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#A6A9B8]">
            <span className="font-bold text-sky-600 dark:text-sky-400">14 Verified Chapters</span>
            <span className="text-slate-300 dark:text-white/20">/</span>
            <span>Interactive Solvers & Step Proofs</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-600 dark:text-[#A6A9B8] font-medium flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Unit:</span>
              </span>
              <select
                value={selectedUnitFilter}
                onChange={(e) => setSelectedUnitFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#111321] border border-slate-300 dark:border-white/12 text-slate-800 dark:text-white text-xs font-medium focus:ring-2 focus:ring-[#7957F5] focus:outline-none cursor-pointer shadow-xs"
              >
                <option value="all">All Units (14 Chapters)</option>
                {units.map((u) => (
                  <option key={u.id} value={u.title}>
                    {u.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Structured Curriculum by Unit Groups */}
      <div className="space-y-10">
        {displayedUnits.map((unitGroup) => (
          <div key={unitGroup.id} className="space-y-4">
            {/* Unit Header Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <h3 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {unitGroup.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {unitGroup.chapters.length} {unitGroup.chapters.length === 1 ? 'Topic' : 'Topics'}
              </span>
            </div>

            {/* Responsive Chapter Rows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unitGroup.chapters.map((ch: CurriculumChapter) => {
                const Icon = getChapterIcon(ch.targetStageId);
                const isSelected = activeChapterId === ch.id;
                const solverConfig = CHAPTER_SIDE_SOLVERS[ch.id];
                const currentVals = solverInputs[ch.id] || {};
                const computed = solverConfig ? solverConfig.compute(currentVals) : null;

                return (
                  <div
                    key={ch.id}
                    className={`bg-white dark:bg-[#111321] rounded-2xl border p-4 sm:p-5 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md'
                        : 'border-slate-200 dark:border-white/10 hover:border-sky-500/50 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Chapter Top Row: Number & Icon */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                          {ch.number}
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center text-slate-500 dark:text-slate-400">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5 leading-snug">
                        {ch.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed mb-3">
                        {ch.description}
                      </p>

                      {/* Formula Preview with KaTeX */}
                      <div className="p-2 sm:p-2.5 bg-slate-50 dark:bg-[#0B0D16]/90 rounded-xl border border-slate-100 dark:border-white/[0.06] text-center mb-3 min-w-0 overflow-x-auto">
                        <MathView
                          math={ch.latex}
                          displayMode={true}
                          className="text-xs text-slate-800 dark:text-sky-300"
                        />
                      </div>

                      {/* Interactive Value Putting Drawer for Sides & Parameters */}
                      {solverConfig && (
                        <div className="mb-3">
                          <button
                            type="button"
                            onClick={() => setActiveChapterId(isSelected ? null : ch.id)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-1.5">
                              <Calculator className="w-3.5 h-3.5" />
                              <span>Put Values of Sides / Inputs</span>
                            </div>
                            {isSelected ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>

                          {isSelected && (
                            <div className="mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 space-y-3">
                              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                                {solverConfig.label}
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                {solverConfig.fields.map((field) => {
                                  const val = currentVals[field.key] ?? field.defaultValue;
                                  return (
                                    <div key={field.key} className="space-y-1">
                                      <label className="text-[10px] font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
                                        <span>{field.label}</span>
                                        {field.unit && <span className="text-[9px] text-slate-400">[{field.unit}]</span>}
                                      </label>
                                      <input
                                        type="number"
                                        step="any"
                                        value={val}
                                        onChange={(e) =>
                                          handleInputChange(ch.id, field.key, parseFloat(e.target.value) || 0)
                                        }
                                        className="w-full px-2 py-1 rounded-lg bg-white dark:bg-[#111321] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:ring-1 focus:ring-sky-500 focus:outline-none"
                                      />
                                    </div>
                                  );
                                })}
                              </div>

                              {computed && (
                                <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2">
                                  <div className="p-2 rounded-lg bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 text-center min-w-0">
                                    <MathView
                                      math={computed.latexResult}
                                      displayMode={true}
                                      className="text-xs text-sky-700 dark:text-sky-300 font-semibold"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                                    {computed.metrics.map((m, idx) => (
                                      <div
                                        key={idx}
                                        className="p-1.5 rounded-md bg-slate-100 dark:bg-white/[0.04] flex flex-col"
                                      >
                                        <span className="text-slate-500 dark:text-slate-400 truncate">{m.label}</span>
                                        <span className="font-bold text-slate-900 dark:text-white truncate">
                                          {m.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Button: Opens actual calculator */}
                    <button
                      type="button"
                      onClick={() => onNavigateStage(ch.targetStageId)}
                      className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white text-slate-700 dark:text-[#F6F7FB] text-xs font-semibold transition-colors cursor-pointer group mt-2"
                    >
                      <span>{ch.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
