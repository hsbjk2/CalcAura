import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Shapes,
  Compass,
  Atom,
  Grid,
  BookOpen,
  ArrowRight,
  Maximize2,
  Check,
  TrendingUp,
} from 'lucide-react';

interface FramedProductPreviewProps {
  onNavigateTab: (tabId: string) => void;
}

interface FunctionPreset {
  id: string;
  name: string;
  formula: string;
  formulaLatex: string;
  derivativeFormula: string;
  fn: (x: number) => number;
  dfn: (x: number) => number;
  integral: (a: number, b: number) => number;
  roots: number[];
  extrema: { type: 'max' | 'min'; x: number; y: number }[];
  domain: [number, number];
  range: [number, number];
}

const PRESETS: FunctionPreset[] = [
  {
    id: 'cubic',
    name: 'Cubic Polynomial',
    formula: 'f(x) = x³ - 3x + 1',
    formulaLatex: 'f(x) = x^3 - 3x + 1',
    derivativeFormula: "f'(x) = 3x² - 3",
    fn: (x) => x * x * x - 3 * x + 1,
    dfn: (x) => 3 * x * x - 3,
    integral: (a, b) => {
      const F = (t: number) => (t ** 4) / 4 - (3 * t ** 2) / 2 + t;
      return F(b) - F(a);
    },
    roots: [-1.879, 0.347, 1.532],
    extrema: [
      { type: 'max', x: -1, y: 3 },
      { type: 'min', x: 1, y: -1 },
    ],
    domain: [-3, 3],
    range: [-4, 5],
  },
  {
    id: 'quadratic',
    name: 'Parabola Curve',
    formula: 'f(x) = x² - 2x - 3',
    formulaLatex: 'f(x) = x^2 - 2x - 3',
    derivativeFormula: "f'(x) = 2x - 2",
    fn: (x) => x * x - 2 * x - 3,
    dfn: (x) => 2 * x - 2,
    integral: (a, b) => {
      const F = (t: number) => (t ** 3) / 3 - t ** 2 - 3 * t;
      return F(b) - F(a);
    },
    roots: [-1, 3],
    extrema: [{ type: 'min', x: 1, y: -4 }],
    domain: [-3.5, 4.5],
    range: [-5, 6],
  },
  {
    id: 'trig',
    name: 'Damped Sine Wave',
    formula: 'f(x) = 2·sin(1.8x)',
    formulaLatex: 'f(x) = 2\\sin(1.8x)',
    derivativeFormula: "f'(x) = 3.6·cos(1.8x)",
    fn: (x) => 2 * Math.sin(1.8 * x),
    dfn: (x) => 3.6 * Math.cos(1.8 * x),
    integral: (a, b) => {
      const F = (t: number) => (-2 / 1.8) * Math.cos(1.8 * t);
      return F(b) - F(a);
    },
    roots: [-3.49, -1.745, 0, 1.745, 3.49],
    extrema: [
      { type: 'max', x: 0.87, y: 2 },
      { type: 'min', x: -0.87, y: -2 },
      { type: 'min', x: 2.61, y: -2 },
    ],
    domain: [-4, 4],
    range: [-3, 3],
  },
];

export const FramedProductPreview: React.FC<FramedProductPreviewProps> = ({ onNavigateTab }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('cubic');
  const [tangentX, setTangentX] = useState<number>(0.5);
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('graphing');
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);

  const activePreset = useMemo(
    () => PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0],
    [selectedPresetId]
  );

  // SVG coordinate transformation
  const svgWidth = 560;
  const svgHeight = 280;
  const [xMin, xMax] = activePreset.domain;
  const [yMin, yMax] = activePreset.range;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * svgWidth;
  const toSvgY = (y: number) => svgHeight - ((y - yMin) / (yMax - yMin)) * svgHeight;
  const toMathX = (svgX: number) => xMin + (svgX / svgWidth) * (xMax - xMin);

  // Calculate curve points
  const points = useMemo(() => {
    const pts: [number, number][] = [];
    const steps = 140;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = activePreset.fn(x);
      pts.push([toSvgX(x), toSvgY(y)]);
    }
    return pts;
  }, [activePreset, xMin, xMax]);

  const pathD = points.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt[0].toFixed(1)},${pt[1].toFixed(1)}`,
    ''
  );

  // Tangent line values at tangentX
  const currentY = activePreset.fn(tangentX);
  const currentSlope = activePreset.dfn(tangentX);
  const tangentSvgX = toSvgX(tangentX);
  const tangentSvgY = toSvgY(currentY);

  const tangentX1 = tangentX - 1.5;
  const tangentY1 = currentY - currentSlope * 1.5;
  const tangentX2 = tangentX + 1.5;
  const tangentY2 = currentY + currentSlope * 1.5;

  const integralVal = activePreset.integral(xMin + 0.5, xMax - 0.5);

  const sidebarItems = [
    { id: 'graphing', label: 'Graphing & Slopes', icon: AreaChart, tab: 'graphing' },
    { id: 'geometry', label: 'Euclidean Geometry', icon: Shapes, tab: 'geometry' },
    { id: 'solver', label: 'Equation Solver', icon: Compass, tab: 'solver' },
    { id: 'physics', label: 'Kinematics Lab', icon: Atom, tab: 'physics' },
    { id: 'stem', label: 'Matrix & Stats', icon: Grid, tab: 'stem' },
    { id: 'formulas', label: 'Formula Catalog', icon: BookOpen, tab: 'formulas' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      {/* Framed Application Container with Ambient Glow */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/12 shadow-[0_0_50px_rgba(121,87,245,0.12)] overflow-hidden transition-all">
        {/* Subtle top edge gradient highlight */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#7957F5]/50 to-transparent" />

        {/* 1. Mock CalcAura App Header Bar */}
        <div className="bg-slate-100 dark:bg-[#0e101d] px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/10 mx-0.5 sm:mx-1 shrink-0" />

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono min-w-0 truncate">
              <span className="hidden sm:inline text-slate-500 dark:text-[#A6A9B8]">workspace</span>
              <span className="hidden sm:inline text-slate-300 dark:text-white/30">/</span>
              <span className="text-slate-900 dark:text-[#F6F7FB] font-semibold flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7957F5] animate-pulse shrink-0" />
                <span className="truncate">Live Analysis Viewport</span>
              </span>
            </div>
          </div>

          {/* Engine Status & Full Screen Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <Check className="w-3 h-3" />
              Deterministic 64-bit Engine
            </span>

            <button
              onClick={() => onNavigateTab('graphing')}
              className="flex items-center gap-1 text-xs text-slate-600 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white px-2 sm:px-2.5 py-1 rounded-md bg-white dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 transition-colors shrink-0"
              title="Open Full Workspace"
            >
              <span className="hidden sm:inline">Full Screen</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Main Body Grid: Sidebar + Interactive Canvas + Data Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Mini Sidebar */}
          <div className="hidden md:flex lg:col-span-3 bg-slate-50 dark:bg-[#0d0f1b] border-r border-slate-200 dark:border-white/[0.08] p-3 flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#A6A9B8]/60 px-3 py-1.5">
                Active Modules
              </div>
              <div className="space-y-1 mt-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSidebarItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSidebarItem(item.id);
                        onNavigateTab(item.tab);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                        isActive
                          ? 'bg-[#7957F5]/10 dark:bg-[#7957F5]/20 text-slate-900 dark:text-[#F6F7FB] border border-[#7957F5]/30 dark:border-[#7957F5]/40 font-semibold shadow-xs'
                          : 'text-slate-600 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-[#F6F7FB] hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#7957F5] dark:text-[#D94BCB]' : 'text-slate-400 dark:text-[#A6A9B8]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick summary card */}
            <div className="p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] mt-4 shadow-2xs">
              <div className="text-[11px] font-mono text-slate-500 dark:text-[#A6A9B8] mb-1">Live Calculus Probe</div>
              <div className="text-xs text-slate-900 dark:text-[#F6F7FB] font-semibold">
                x = {tangentX.toFixed(2)}, f(x) = {currentY.toFixed(2)}
              </div>
              <div className="text-[11px] font-mono text-[#7957F5] mt-1">
                Tangent Slope = {currentSlope.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Interactive Workspace Area */}
          <div className="lg:col-span-9 p-4 sm:p-6 flex flex-col justify-between bg-white dark:bg-[#111321]">
            <div>
              {/* Function Preset Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 thin-scrollbar">
                  {PRESETS.map((p) => {
                    const isSelected = selectedPresetId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPresetId(p.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#7957F5] to-[#5558E8] text-white shadow-xs font-semibold'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] text-slate-700 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06]'
                        }`}
                      >
                        {p.formula}
                      </button>
                    );
                  })}
                </div>

                {/* Tangent Probe Slider */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#A6A9B8] shrink-0">
                  <span>Probe x:</span>
                  <input
                    type="range"
                    min={xMin + 0.5}
                    max={xMax - 0.5}
                    step={0.05}
                    value={tangentX}
                    onChange={(e) => setTangentX(parseFloat(e.target.value))}
                    className="w-24 sm:w-28 accent-[#7957F5] cursor-pointer"
                    aria-label="Probe position x"
                  />
                  <span className="w-10 font-bold text-slate-900 dark:text-[#F6F7FB] text-right">
                    {tangentX.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Real SVG Mathematical Graph */}
              <div className="relative mt-4 bg-[#0B0D16] rounded-xl border border-white/[0.08] p-2 sm:p-4 overflow-hidden">
                {/* Graph coordinates header */}
                <div className="absolute top-3 left-4 z-10 flex items-center gap-3 text-[11px] font-mono text-[#A6A9B8]">
                  <span className="flex items-center gap-1 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#7957F5]" />
                    {activePreset.name}
                  </span>
                  {hoverCoord && (
                    <span className="text-[#D94BCB]">
                      ({hoverCoord.x.toFixed(2)}, {hoverCoord.y.toFixed(2)})
                    </span>
                  )}
                </div>

                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-auto max-h-[260px] cursor-crosshair select-none"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const relX = ((e.clientX - rect.left) / rect.width) * svgWidth;
                    const mx = toMathX(relX);
                    setHoverCoord({ x: mx, y: activePreset.fn(mx) });
                  }}
                  onMouseLeave={() => setHoverCoord(null)}
                >
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#7957F5" />
                      <stop offset="50%" stopColor="#5558E8" />
                      <stop offset="100%" stopColor="#D94BCB" />
                    </linearGradient>
                    <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7957F5" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#7957F5" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {Array.from({ length: 9 }).map((_, i) => {
                    const gx = xMin + (i * (xMax - xMin)) / 8;
                    const sx = toSvgX(gx);
                    return (
                      <line
                        key={`gx-${i}`}
                        x1={sx}
                        y1={0}
                        x2={sx}
                        y2={svgHeight}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="2,3"
                      />
                    );
                  })}

                  {Array.from({ length: 7 }).map((_, i) => {
                    const gy = yMin + (i * (yMax - yMin)) / 6;
                    const sy = toSvgY(gy);
                    return (
                      <line
                        key={`gy-${i}`}
                        x1={0}
                        y1={sy}
                        x2={svgWidth}
                        y2={sy}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="2,3"
                      />
                    );
                  })}

                  {/* Axes */}
                  <line
                    x1={0}
                    y1={toSvgY(0)}
                    x2={svgWidth}
                    y2={toSvgY(0)}
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.2"
                  />
                  <line
                    x1={toSvgX(0)}
                    y1={0}
                    x2={toSvgX(0)}
                    y2={svgHeight}
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.2"
                  />

                  {/* Main Curve */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#curveGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Roots Points */}
                  {activePreset.roots.map((r, i) => {
                    const rx = toSvgX(r);
                    const ry = toSvgY(0);
                    return (
                      <g key={`root-${i}`}>
                        <circle cx={rx} cy={ry} r="4" fill="#D94BCB" />
                        <circle cx={rx} cy={ry} r="7" fill="none" stroke="#D94BCB" strokeOpacity="0.4" />
                      </g>
                    );
                  })}

                  {/* Extrema Points */}
                  {activePreset.extrema.map((ex, i) => {
                    const exX = toSvgX(ex.x);
                    const exY = toSvgY(ex.y);
                    return (
                      <g key={`ex-${i}`}>
                        <circle cx={exX} cy={exY} r="3.5" fill="#38BDF8" />
                        <text
                          x={exX}
                          y={ex.type === 'max' ? exY - 7 : exY + 12}
                          fontSize="9"
                          fill="#A6A9B8"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {ex.type.toUpperCase()}({ex.x}, {ex.y})
                        </text>
                      </g>
                    );
                  })}

                  {/* Tangent Line */}
                  <line
                    x1={toSvgX(tangentX1)}
                    y1={toSvgY(tangentY1)}
                    x2={toSvgX(tangentX2)}
                    y2={toSvgY(tangentY2)}
                    stroke="#FBBF24"
                    strokeWidth="1.8"
                    strokeDasharray="4,3"
                  />

                  {/* Tangent Point Indicator */}
                  <circle cx={tangentSvgX} cy={tangentSvgY} r="5" fill="#FBBF24" />
                  <circle
                    cx={tangentSvgX}
                    cy={tangentSvgY}
                    r="9"
                    fill="none"
                    stroke="#FBBF24"
                    strokeOpacity="0.4"
                  />
                </svg>
              </div>
            </div>

            {/* 3. Numerical Result & Metric Summary Panel */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-slate-50 dark:bg-[#0B0D16]/60 p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
                <span className="text-[10px] text-slate-500 dark:text-[#A6A9B8] block mb-1">PROBE VALUE</span>
                <span className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                  f({tangentX.toFixed(2)}) = {currentY.toFixed(2)}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-[#0B0D16]/60 p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
                <span className="text-[10px] text-slate-500 dark:text-[#A6A9B8] block mb-1">DERIVATIVE SLOPE</span>
                <span className="text-amber-600 dark:text-[#FBBF24] font-semibold text-xs sm:text-sm">
                  f'({tangentX.toFixed(2)}) = {currentSlope.toFixed(2)}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-[#0B0D16]/60 p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
                <span className="text-[10px] text-slate-500 dark:text-[#A6A9B8] block mb-1">REAL ROOTS</span>
                <span className="text-[#D94BCB] font-semibold text-xs sm:text-sm">
                  x ≈ {activePreset.roots.map((r) => r.toFixed(1)).join(', ')}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-[#0B0D16]/60 p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-[#A6A9B8] block mb-1">AREA INTEGRAL</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm">
                    ∫ ≈ {integralVal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => onNavigateTab('graphing')}
                  className="p-1.5 rounded-lg bg-[#7957F5]/10 hover:bg-[#7957F5]/20 dark:bg-[#7957F5]/20 dark:hover:bg-[#7957F5]/40 text-[#7957F5] dark:text-white transition-colors cursor-pointer"
                  title="Open Graphing Engine"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#7957F5] dark:text-[#D94BCB]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
