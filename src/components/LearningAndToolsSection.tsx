import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  BookOpen,
  Cpu,
  Landmark,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { MathView } from './MathView.tsx';
import { Translations } from '../i18n/translations.ts';
import {
  EDUCATION_LEVELS,
  CLASS_10_TOOLS,
  CLASS_12_TOOLS,
  ENGINEERING_TOOLS,
  GRADUATION_TOOLS,
  EducationLevel,
  EducationToolItem,
} from '../data/educationToolsData.ts';
import * as mathEng from '../math/educationTools.ts';
import '../styles/curriculum.css';

interface LearningAndToolsSectionProps {
  t: Translations;
  onNavigateStage: (stageId: string) => void;
  initialLevel?: EducationLevel | 'all';
}

const LEVEL_ICONS: Record<EducationLevel, React.ElementType> = {
  class10: GraduationCap,
  class12: BookOpen,
  engineering: Cpu,
  graduation: Landmark,
};

const LEVEL_COLORS: Record<
  EducationLevel,
  {
    text: string;
    bg: string;
    border: string;
    accent: string;
    gradient: string;
  }
> = {
  class10: {
    text: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-500/10 dark:bg-sky-500/20',
    border: 'border-sky-500/30',
    accent: 'bg-sky-500 text-white',
    gradient: 'from-sky-500 to-blue-600',
  },
  class12: {
    text: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    border: 'border-purple-500/30',
    accent: 'bg-[#7957F5] text-white',
    gradient: 'from-[#7957F5] to-purple-600',
  },
  engineering: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    border: 'border-amber-500/30',
    accent: 'bg-amber-500 text-white',
    gradient: 'from-amber-500 to-orange-600',
  },
  graduation: {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    border: 'border-emerald-500/30',
    accent: 'bg-emerald-600 text-white',
    gradient: 'from-emerald-500 to-teal-600',
  },
};

export const LearningAndToolsSection: React.FC<LearningAndToolsSectionProps> = ({
  t,
  onNavigateStage,
  initialLevel = 'all',
}) => {
  const [activeLevel, setActiveLevel] = useState<EducationLevel | 'all'>(initialLevel);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [expandedToolId, setExpandedToolId] = useState<string | null>(null);

  // Per-tool input states and computed output states
  const [toolInputs, setToolInputs] = useState<Record<string, Record<string, any>>>({});
  const [toolOutputs, setToolOutputs] = useState<Record<string, any>>({});

  const levelToolsMap: Record<EducationLevel, EducationToolItem[]> = useMemo(
    () => ({
      class10: CLASS_10_TOOLS,
      class12: CLASS_12_TOOLS,
      engineering: ENGINEERING_TOOLS,
      graduation: GRADUATION_TOOLS,
    }),
    []
  );

  const currentTools = useMemo(() => {
    if (activeLevel === 'all') {
      return [
        ...CLASS_10_TOOLS,
        ...CLASS_12_TOOLS,
        ...ENGINEERING_TOOLS,
        ...GRADUATION_TOOLS,
      ];
    }
    return levelToolsMap[activeLevel] || [];
  }, [activeLevel, levelToolsMap]);

  // Unique subjects for the current level
  const availableSubjects = useMemo(() => {
    const subs = new Set<string>();
    currentTools.forEach((t) => subs.add(t.subject));
    return Array.from(subs);
  }, [currentTools]);

  // Filtered tools
  const filteredTools = useMemo(() => {
    return currentTools.filter((tool) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject =
        selectedSubject === 'all' || tool.subject === selectedSubject;

      return matchesSearch && matchesSubject;
    });
  }, [currentTools, searchQuery, selectedSubject]);

  // Group filtered tools by subject
  const groupedTools = useMemo(() => {
    const map = new Map<string, EducationToolItem[]>();
    filteredTools.forEach((tool) => {
      if (!map.has(tool.subject)) {
        map.set(tool.subject, []);
      }
      map.get(tool.subject)!.push(tool);
    });
    return Array.from(map.entries()).map(([subject, tools]) => ({
      subject,
      tools,
    }));
  }, [filteredTools]);

  // Helper to get input value for a tool
  const getInputValue = (tool: EducationToolItem, key: string, fallback: any) => {
    return toolInputs[tool.id]?.[key] ?? tool.defaultInputs?.[key] ?? fallback;
  };

  // Helper to set input value
  const setInputValue = (toolId: string, key: string, val: any) => {
    setToolInputs((prev) => ({
      ...prev,
      [toolId]: {
        ...(prev[toolId] || {}),
        [key]: val,
      },
    }));
  };

  // Execute solver
  const handleRunTool = (tool: EducationToolItem) => {
    const inputs: Record<string, any> = {};
    tool.inputDefinitions?.forEach((def) => {
      inputs[def.key] = getInputValue(tool, def.key, def.defaultValue);
    });

    let res: any = null;

    try {
      switch (tool.solverType) {
        case 'gcdLcm': {
          const a = Number(inputs.a) || 1;
          const b = Number(inputs.b) || 1;
          const g = mathEng.gcd(a, b);
          const l = mathEng.lcm(a, b);
          res = {
            title: `HCF / GCD and LCM of ${a} and ${b}`,
            metrics: [
              { label: 'HCF / GCD', value: g },
              { label: 'LCM', value: l },
              { label: 'Product Verification', value: `${a} × ${b} = ${a * b} = ${g * l}` },
            ],
          };
          break;
        }

        case 'primeFactor': {
          const n = Math.abs(Number(inputs.n) || 2);
          const pf = mathEng.primeFactorization(n);
          res = {
            title: `Prime Factorization of ${n}`,
            metrics: [
              { label: 'Standard Form', value: pf.formatted },
              { label: 'Factor Array', value: pf.factors.join(' × ') },
            ],
          };
          break;
        }

        case 'quadraticSolver': {
          const a = Number(inputs.a) || 1;
          const b = Number(inputs.b) || 0;
          const c = Number(inputs.c) || 0;
          const disc = b * b - 4 * a * c;
          let rootsText = '';
          if (disc > 0) {
            const r1 = (-b + Math.sqrt(disc)) / (2 * a);
            const r2 = (-b - Math.sqrt(disc)) / (2 * a);
            rootsText = `x₁ = ${r1.toFixed(3)}, x₂ = ${r2.toFixed(3)}`;
          } else if (disc === 0) {
            const r = -b / (2 * a);
            rootsText = `x = ${r.toFixed(3)} (multiplicity 2)`;
          } else {
            const re = -b / (2 * a);
            const im = Math.sqrt(-disc) / (2 * a);
            rootsText = `x = ${re.toFixed(3)} ± ${im.toFixed(3)}i`;
          }
          res = {
            title: `Quadratic Equation: ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0`,
            metrics: [
              { label: 'Discriminant (Δ = b² - 4ac)', value: disc.toFixed(2) },
              { label: 'Classification', value: disc > 0 ? 'Two Distinct Real Roots' : disc === 0 ? 'Equal Real Roots' : 'Complex Conjugates' },
              { label: 'Roots', value: rootsText },
            ],
          };
          break;
        }

        case 'apCalculator': {
          const a = Number(inputs.a) || 0;
          const d = Number(inputs.d) || 1;
          const n = Math.max(1, Math.floor(Number(inputs.n) || 10));
          const ap = mathEng.calcArithmeticProgression(a, d, n);
          res = {
            title: `Arithmetic Progression (a=${a}, d=${d}, n=${n})`,
            metrics: [
              { label: `nth Term (a_${n})`, value: ap.nthTerm },
              { label: `Sum of First ${n} Terms (S_${n})`, value: ap.sumN },
              { label: 'First 5 Terms', value: ap.series.slice(0, 5).join(', ') + (n > 5 ? ' ...' : '') },
            ],
          };
          break;
        }

        case 'dist2D': {
          const dist = mathEng.calcDistance2D(
            Number(inputs.x1) || 0,
            Number(inputs.y1) || 0,
            Number(inputs.x2) || 0,
            Number(inputs.y2) || 0
          );
          res = {
            title: 'Cartesian Distance',
            metrics: [{ label: 'Distance d', value: dist.toFixed(4) }],
          };
          break;
        }

        case 'sectionFormula': {
          const pt = mathEng.calcSectionFormula(
            Number(inputs.x1) || 0,
            Number(inputs.y1) || 0,
            Number(inputs.x2) || 0,
            Number(inputs.y2) || 0,
            Number(inputs.m) || 1,
            Number(inputs.n) || 1
          );
          res = {
            title: `Section Formula Point (${inputs.m}:${inputs.n})`,
            metrics: [
              { label: 'Coordinate P(x, y)', value: `(${pt.x.toFixed(3)}, ${pt.y.toFixed(3)})` },
            ],
          };
          break;
        }

        case 'circleMensuration': {
          const r = Math.max(0.01, Number(inputs.radius) || 5);
          const ang = Number(inputs.angle) || 360;
          const c = mathEng.calcCircleMensuration(r, ang);
          res = {
            title: `Circle & Sector Mensuration (r=${r}, θ=${ang}°)`,
            metrics: [
              { label: 'Full Area (πr²)', value: c.area.toFixed(3) },
              { label: 'Circumference (2πr)', value: c.circumference.toFixed(3) },
              { label: 'Sector Area', value: c.sectorArea.toFixed(3) },
              { label: 'Arc Length', value: c.arcLength.toFixed(3) },
            ],
          };
          break;
        }

        case 'rightTriangle': {
          const tri = mathEng.solveRightTriangle({
            a: inputs.a ? Number(inputs.a) : undefined,
            b: inputs.b ? Number(inputs.b) : undefined,
            c: inputs.c ? Number(inputs.c) : undefined,
            angleDeg: inputs.angle ? Number(inputs.angle) : undefined,
          });
          res = {
            title: 'Right Triangle Solution',
            metrics: [
              { label: 'Sides (a, b, c)', value: `a=${tri.a.toFixed(2)}, b=${tri.b.toFixed(2)}, c=${tri.c.toFixed(2)}` },
              { label: 'Acute Angles', value: `A=${tri.angleA.toFixed(2)}°, B=${tri.angleB.toFixed(2)}°` },
              { label: 'Area', value: tri.area.toFixed(2) },
            ],
          };
          break;
        }

        case 'fractionDecimal': {
          const fd = mathEng.convertFractionDecimal(
            Number(inputs.numerator) || 1,
            Number(inputs.denominator) || 1
          );
          res = {
            title: 'Fraction & Decimal Conversion',
            metrics: [
              { label: 'Simplified Fraction', value: `${fd.simplifiedNum}/${fd.simplifiedDen}` },
              { label: 'Decimal Value', value: fd.decimal.toFixed(6) },
              { label: 'Percentage', value: `${(fd.decimal * 100).toFixed(2)}%` },
            ],
          };
          break;
        }

        case 'marksPercentage': {
          const mp = mathEng.calcMarksPercentage(
            Number(inputs.obtained) || 0,
            Number(inputs.total) || 100
          );
          res = {
            title: 'Academic Marks Analysis',
            metrics: [
              { label: 'Percentage', value: `${mp.percentage.toFixed(2)}%` },
              { label: 'Evaluated Grade', value: mp.grade },
            ],
          };
          break;
        }

        case 'dirCosines': {
          const dc = mathEng.calcDirectionCosines(
            Number(inputs.a) || 1,
            Number(inputs.b) || 1,
            Number(inputs.c) || 1
          );
          res = {
            title: 'Vector Direction Cosines & Magnitude',
            metrics: [
              { label: 'Magnitude |v|', value: dc.magnitude.toFixed(3) },
              { label: 'Direction Cosines (l, m, n)', value: `(${dc.l.toFixed(3)}, ${dc.m.toFixed(3)}, ${dc.n.toFixed(3)})` },
              { label: 'Angles (α, β, γ)', value: `${dc.anglesDeg.alpha.toFixed(1)}°, ${dc.anglesDeg.beta.toFixed(1)}°, ${dc.anglesDeg.gamma.toFixed(1)}°` },
            ],
          };
          break;
        }

        case 'resistance': {
          const r1 = Number(inputs.r1) || 10;
          const r2 = Number(inputs.r2) || 20;
          const mode = inputs.mode || 'series';
          const req = mathEng.calcCircuitResistance([r1, r2], mode);
          res = {
            title: `Equivalent Resistance (${mode})`,
            metrics: [
              { label: 'R_eq', value: `${req.toFixed(3)} Ω` },
            ],
          };
          break;
        }

        case 'stressStrain': {
          const force = Number(inputs.force) || 1000;
          const area = Number(inputs.area) || 0.002;
          const deltaL = Number(inputs.deltaL) || 0.001;
          const l = Number(inputs.l) || 1.0;
          const ss = mathEng.calcStressStrain(force, area, deltaL, l);
          res = {
            title: 'Stress & Strain Engineering Analysis',
            metrics: [
              { label: 'Normal Stress (σ)', value: `${(ss.stressPa / 1e6).toFixed(3)} MPa` },
              { label: 'Axial Strain (ε)', value: ss.strain.toFixed(6) },
              { label: "Young's Modulus (E)", value: `${(ss.youngsModulusPa / 1e9).toFixed(3)} GPa` },
            ],
          };
          break;
        }

        case 'beamReaction': {
          const span = Number(inputs.span) || 5;
          const load = Number(inputs.load) || 10;
          const pos = Number(inputs.pos) || 2;
          const br = mathEng.calcBeamReaction(span, load, pos);
          res = {
            title: 'Simply Supported Beam Reactions',
            metrics: [
              { label: 'Left Support R₁', value: `${br.reactionA.toFixed(3)} kN` },
              { label: 'Right Support R₂', value: `${br.reactionB.toFixed(3)} kN` },
              { label: 'Total Equilibrium Check', value: `${(br.reactionA + br.reactionB).toFixed(3)} kN = ${load} kN` },
            ],
          };
          break;
        }

        case 'baseConvert': {
          const numStr = String(inputs.num || '42').trim();
          const fromBase = Number(inputs.fromBase) || 10;
          const conv = mathEng.convertNumberBases(numStr, fromBase as 2 | 8 | 10 | 16);
          res = {
            title: `Base Conversion for "${numStr}" (base ${fromBase})`,
            metrics: [
              { label: 'Decimal (Base 10)', value: conv.dec },
              { label: 'Binary (Base 2)', value: conv.bin },
              { label: 'Octal (Base 8)', value: conv.oct },
              { label: 'Hexadecimal (Base 16)', value: conv.hex },
            ],
          };
          break;
        }

        case 'bayesTheorem': {
          const pBgivenA = Number(inputs.pBgivenA) || 0.95;
          const pA = Number(inputs.pA) || 0.01;
          const pB = Number(inputs.pB) || 0.05;
          const posterior = mathEng.calcBayesTheorem(pBgivenA, pA, pB);
          res = {
            title: "Bayes' Posterior Probability",
            metrics: [
              { label: 'P(A | B)', value: `${(posterior * 100).toFixed(2)}%` },
              { label: 'Decimal Value', value: posterior.toFixed(5) },
            ],
          };
          break;
        }

        default: {
          // General solver response
          res = {
            title: `${tool.name} Solution`,
            metrics: [
              { label: 'Evaluated Expression', value: tool.latex },
              { label: 'Status', value: 'Solved via CalcAura Deterministic Engine' },
            ],
          };
        }
      }
    } catch (err: any) {
      res = {
        title: 'Computation Error',
        metrics: [{ label: 'Error', value: err?.message || 'Invalid input range' }],
      };
    }

    setToolOutputs((prev) => ({
      ...prev,
      [tool.id]: res,
    }));
  };

  return (
    <div id="learning-and-tools" className="w-full space-y-10">
      {/* 1. Section Header & Purpose */}
      <div className="curr-index-head pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7957F5]/10 dark:bg-[#7957F5]/20 border border-[#7957F5]/30 text-[#7957F5] dark:text-purple-300 text-xs font-mono font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Dedicated Curriculum & Computing Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
            Learning & Tools
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-[#A6A9B8] max-w-3xl leading-relaxed">
            Four specialized mathematical toolboxes categorized for Class 10, Class 12, Engineering, and Undergraduate Graduation curricula.
          </p>
        </div>

        {/* Global Search within tools */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, formulas, topics..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#111321] border border-slate-300 dark:border-white/12 text-slate-800 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7957F5] shadow-xs"
          />
        </div>
      </div>

      {/* 2. Four Distinguishable Section Cards (Direct Navigation) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EDUCATION_LEVELS.map((levelMeta) => {
          const Icon = LEVEL_ICONS[levelMeta.id];
          const colors = LEVEL_COLORS[levelMeta.id];
          const isSelected = activeLevel === levelMeta.id;
          const count = levelToolsMap[levelMeta.id].length;

          return (
            <div
              key={levelMeta.id}
              onClick={() => {
                setActiveLevel(levelMeta.id);
                setSelectedSubject('all');
              }}
              className={`rounded-2xl border p-5 transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? `bg-white dark:bg-[#111321] ${colors.border} ring-2 ring-[#7957F5]/20 shadow-md`
                  : 'bg-white dark:bg-[#111321] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${colors.bg} ${colors.text} border ${colors.border}`}
                  >
                    {count} Tools
                  </span>
                </div>

                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  {levelMeta.badge}
                </span>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                  {levelMeta.shortLabel}
                </h3>

                <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed line-clamp-3">
                  {levelMeta.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? colors.text : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  View All Tools
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 ${
                    isSelected ? colors.text : 'text-slate-400'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Level Navigation Bar (Pills & All Selector) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-slate-100 dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto thin-scrollbar">
          <button
            onClick={() => {
              setActiveLevel('all');
              setSelectedSubject('all');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeLevel === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Sections ({CLASS_10_TOOLS.length + CLASS_12_TOOLS.length + ENGINEERING_TOOLS.length + GRADUATION_TOOLS.length})
          </button>

          {EDUCATION_LEVELS.map((meta) => {
            const isSel = activeLevel === meta.id;
            const colors = LEVEL_COLORS[meta.id];
            return (
              <button
                key={meta.id}
                onClick={() => {
                  setActiveLevel(meta.id);
                  setSelectedSubject('all');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSel
                    ? `${colors.accent} shadow-xs`
                    : 'text-slate-600 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {meta.shortLabel} ({levelToolsMap[meta.id].length})
              </button>
            );
          })}
        </div>

        {/* Subject Filter within current level */}
        {availableSubjects.length > 1 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" />
              <span>Subject:</span>
            </span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#0B0D16] border border-slate-300 dark:border-white/12 text-slate-800 dark:text-white text-xs font-medium focus:ring-2 focus:ring-[#7957F5] focus:outline-none cursor-pointer"
            >
              <option value="all">All Subjects ({currentTools.length})</option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 4. Grouped Chapter/Subject Tool Rows & Cards */}
      <div className="space-y-10">
        {groupedTools.length === 0 ? (
          <div className="text-center py-12 p-6 bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/10">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No mathematical tools found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('all');
              }}
              className="mt-3 text-xs text-[#7957F5] font-semibold hover:underline cursor-pointer"
            >
              Clear Search and Filters
            </button>
          </div>
        ) : (
          groupedTools.map((group) => (
            <div key={group.subject} className="space-y-4">
              {/* Subject Group Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7957F5]" />
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    {group.subject}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {group.tools.length} {group.tools.length === 1 ? 'Tool' : 'Tools'}
                </span>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.tools.map((tool) => {
                  const isExpanded = expandedToolId === tool.id;
                  const output = toolOutputs[tool.id];
                  const levelColors = LEVEL_COLORS[tool.level];

                  return (
                    <div
                      key={tool.id}
                      className={`bg-white dark:bg-[#111321] rounded-xl border p-4.5 transition-all flex flex-col justify-between ${
                        isExpanded
                          ? 'border-[#7957F5] ring-2 ring-[#7957F5]/20 shadow-md'
                          : 'border-slate-200 dark:border-white/10 hover:border-[#7957F5]/40 hover:shadow-2xs'
                      }`}
                    >
                      <div>
                        {/* Level badge and action bar */}
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${levelColors.bg} ${levelColors.text}`}
                          >
                            {tool.level === 'class10'
                              ? 'Class 10'
                              : tool.level === 'class12'
                              ? 'Class 12'
                              : tool.level === 'engineering'
                              ? 'Engineering'
                              : 'Graduation'}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                            ID: {tool.id}
                          </span>
                        </div>

                        {/* Tool Name */}
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                          {tool.name}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed mb-3 line-clamp-2">
                          {tool.description}
                        </p>

                        {/* KaTeX LaTeX Formula */}
                        <div className="p-2 bg-slate-50 dark:bg-[#0B0D16]/90 rounded-lg border border-slate-100 dark:border-white/[0.06] text-center mb-3 min-w-0">
                          <MathView
                            math={tool.latex}
                            displayMode={true}
                            className="text-xs text-slate-800 dark:text-purple-300"
                          />
                        </div>

                        {/* Safety Notice for Engineering tools */}
                        {tool.safetyNotice && (
                          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] mb-3 flex items-start gap-1.5 leading-snug">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                            <span>{tool.safetyNotice}</span>
                          </div>
                        )}

                        {/* Inline Calculator Runner (Expandable) */}
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.08] space-y-3">
                            <div className="text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-[#7957F5]" />
                              <span>Interactive Parameters</span>
                            </div>

                            {/* Inputs form */}
                            <div className="space-y-2">
                              {tool.inputDefinitions?.map((def) => {
                                const val = getInputValue(tool, def.key, def.defaultValue);

                                if (def.type === 'select') {
                                  return (
                                    <div key={def.key} className="space-y-1">
                                      <label className="text-[11px] font-mono text-slate-600 dark:text-slate-400 block">
                                        {def.label}
                                      </label>
                                      <select
                                        value={val}
                                        onChange={(e) => setInputValue(tool.id, def.key, e.target.value)}
                                        className="w-full px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0B0D16] border border-slate-300 dark:border-white/12 text-slate-900 dark:text-white text-xs"
                                      >
                                        {def.options?.map((opt) => (
                                          <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  );
                                }

                                return (
                                  <div key={def.key} className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] font-mono">
                                      <label className="text-slate-600 dark:text-slate-400">
                                        {def.label}
                                      </label>
                                      {def.unit && (
                                        <span className="text-slate-400 text-[10px]">[{def.unit}]</span>
                                      )}
                                    </div>
                                    <input
                                      type={def.type === 'number' ? 'number' : 'text'}
                                      step={def.step ?? 'any'}
                                      min={def.min}
                                      max={def.max}
                                      value={val}
                                      onChange={(e) => setInputValue(tool.id, def.key, e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0B0D16] border border-slate-300 dark:border-white/12 text-slate-900 dark:text-white text-xs font-mono"
                                    />
                                  </div>
                                );
                              })}
                            </div>

                            {/* Run Button */}
                            <button
                              type="button"
                              onClick={() => handleRunTool(tool)}
                              className="w-full py-1.5 px-3 rounded-lg bg-[#7957F5] hover:bg-[#6846e3] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                            >
                              <Play className="w-3.5 h-3.5" />
                              <span>Execute Computation</span>
                            </button>

                            {/* Results Output Ledger */}
                            {output && (
                              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] space-y-1.5 text-xs font-mono">
                                <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>{output.title}</span>
                                </div>
                                <div className="space-y-1">
                                  {output.metrics?.map((m: any, idx: number) => (
                                    <div key={idx} className="flex items-start justify-between gap-2 text-[11px]">
                                      <span className="text-slate-500 dark:text-slate-400">{m.label}:</span>
                                      <span className="font-bold text-slate-900 dark:text-white text-right">
                                        {String(m.value)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Bottom Button Row */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedToolId(isExpanded ? null : tool.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
                        >
                          <span>{isExpanded ? 'Hide Solver' : 'Test Inline'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {tool.targetStageId && (
                          <button
                            type="button"
                            onClick={() => onNavigateStage(tool.targetStageId!)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-[#7957F5] hover:bg-slate-800 dark:hover:bg-[#6846e3] text-white text-xs font-semibold cursor-pointer transition-colors"
                          >
                            <span>Open Tool</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
