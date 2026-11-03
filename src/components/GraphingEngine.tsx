import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import { evaluateExpression } from '../math/parser.ts';
import { computeDerivative, computeDefiniteIntegral } from '../math/calculus.ts';
import { MathView } from './MathView.tsx';
import { ZoomIn, ZoomOut, RotateCcw, Download, Table, Tangent, AreaChart } from 'lucide-react';
import '../styles/tools.css';

interface FunctionConfig {
  id: string;
  expr: string;
  color: string;
  visible: boolean;
}

export const GraphingEngine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Functions state
  const [functions, setFunctions] = useState<FunctionConfig[]>([
    { id: 'f1', expr: 'x^2 - 4', color: '#38bdf8', visible: true },
    { id: 'f2', expr: '2*x + 1', color: '#f59e0b', visible: false },
  ]);

  // Coordinate viewport
  const [xRange, setXRange] = useState<{ min: number; max: number }>({ min: -6, max: 6 });
  const [yRange, setYRange] = useState<{ min: number; max: number }>({ min: -6, max: 6 });

  // Calculus overlays
  const [showTangent, setShowTangent] = useState<boolean>(true);
  const [tangentX, setTangentX] = useState<number>(1);
  const [showIntegral, setShowIntegral] = useState<boolean>(false);
  const [integralA, setIntegralA] = useState<number>(0);
  const [integralB, setIntegralB] = useState<number>(3);

  // Cursor tracking
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);

  // Form input unique IDs
  const tangentXId = useId();
  const integralAId = useId();
  const integralBId = useId();

  // Coordinate transforms
  const toCanvasX = useCallback((x: number, width: number) => {
    return ((x - xRange.min) / (xRange.max - xRange.min)) * width;
  }, [xRange]);

  const toCanvasY = useCallback((y: number, height: number) => {
    return height - ((y - yRange.min) / (yRange.max - yRange.min)) * height;
  }, [yRange]);

  const toMathX = useCallback((cx: number, width: number) => {
    return xRange.min + (cx / width) * (xRange.max - xRange.min);
  }, [xRange]);

  // Redraw canvas
  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const isDark = document.documentElement.classList.contains('dark');

    // Clear background with theme-adaptive fill
    ctx.fillStyle = isDark ? '#090d16' : '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Grid lines & labels
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.55)';
    ctx.font = '10px "JetBrains Mono", monospace';

    const xStep = Math.max(1, Math.round((xRange.max - xRange.min) / 10));
    const yStep = Math.max(1, Math.round((yRange.max - yRange.min) / 10));

    // Vertical grid
    for (let x = Math.ceil(xRange.min); x <= Math.floor(xRange.max); x += xStep) {
      const cx = toCanvasX(x, width);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
      if (x !== 0) ctx.fillText(x.toString(), cx - 6, toCanvasY(0, height) + 14);
    }

    // Horizontal grid
    for (let y = Math.ceil(yRange.min); y <= Math.floor(yRange.max); y += yStep) {
      const cy = toCanvasY(y, height);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();
      if (y !== 0) ctx.fillText(y.toString(), toCanvasX(0, width) + 6, cy + 4);
    }

    // Main Axes
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = isDark ? '#475569' : '#94A3B8';
    // X-Axis
    const cyZero = toCanvasY(0, height);
    ctx.beginPath();
    ctx.moveTo(0, cyZero);
    ctx.lineTo(width, cyZero);
    ctx.stroke();
    // Y-Axis
    const cxZero = toCanvasX(0, width);
    ctx.beginPath();
    ctx.moveTo(cxZero, 0);
    ctx.lineTo(cxZero, height);
    ctx.stroke();

    // Shaded Definite Integral (under first visible function)
    const primaryFn = functions.find((f) => f.visible);
    if (showIntegral && primaryFn) {
      const startX = Math.min(integralA, integralB);
      const endX = Math.max(integralA, integralB);
      const step = (endX - startX) / 80;

      ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.beginPath();
      ctx.moveTo(toCanvasX(startX, width), toCanvasY(0, height));

      for (let x = startX; x <= endX; x += step) {
        const y = evaluateExpression(primaryFn.expr, x);
        if (!isNaN(y)) {
          ctx.lineTo(toCanvasX(x, width), toCanvasY(y, height));
        }
      }
      ctx.lineTo(toCanvasX(endX, width), toCanvasY(0, height));
      ctx.closePath();
      ctx.fill();
    }

    // Plot functions
    functions.forEach((fn) => {
      if (!fn.visible) return;
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = fn.color;
      ctx.beginPath();

      const numSamples = width * 1.5;
      let firstPoint = true;

      for (let i = 0; i <= numSamples; i++) {
        const x = xRange.min + (i / numSamples) * (xRange.max - xRange.min);
        const y = evaluateExpression(fn.expr, x);

        if (!isNaN(y) && isFinite(y)) {
          const cx = toCanvasX(x, width);
          const cy = toCanvasY(y, height);

          // Discontinuity safety guard
          if (cy < -height || cy > height * 2) {
            firstPoint = true;
          } else {
            if (firstPoint) {
              ctx.moveTo(cx, cy);
              firstPoint = false;
            } else {
              ctx.lineTo(cx, cy);
            }
          }
        } else {
          firstPoint = true;
        }
      }
      ctx.stroke();
    });

    // Tangent Line overlay at tangentX
    if (showTangent && primaryFn) {
      const y0 = evaluateExpression(primaryFn.expr, tangentX);
      if (!isNaN(y0) && isFinite(y0)) {
        const deriv = computeDerivative(primaryFn.expr, tangentX);
        const m = deriv.slope;

        // Draw tangent line across screen
        const xLeft = xRange.min;
        const yLeft = m * (xLeft - tangentX) + y0;
        const xRight = xRange.max;
        const yRight = m * (xRight - tangentX) + y0;

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(toCanvasX(xLeft, width), toCanvasY(yLeft, height));
        ctx.lineTo(toCanvasX(xRight, width), toCanvasY(yRight, height));
        ctx.stroke();
        ctx.setLineDash([]);

        // Tangent Point Circle
        const ptX = toCanvasX(tangentX, width);
        const ptY = toCanvasY(y0, height);
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(ptX, ptY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#fde68a';
        ctx.fillText(`P(${tangentX.toFixed(2)}, ${y0.toFixed(2)}) m=${m.toFixed(2)}`, ptX + 8, ptY - 8);
      }
    }

    // Cursor tracking dot
    if (cursorPos) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(cursorPos.x, 0);
      ctx.lineTo(cursorPos.x, height);
      ctx.moveTo(0, cursorPos.y);
      ctx.lineTo(width, cursorPos.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [functions, xRange, yRange, showTangent, tangentX, showIntegral, integralA, integralB, cursorPos, toCanvasX, toCanvasY]);

  useEffect(() => {
    drawGraph();
    const observer = new MutationObserver(() => {
      drawGraph();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [drawGraph]);

  // Zoom handlers
  const handleZoom = (factor: number) => {
    setXRange((prev) => ({
      min: prev.min * factor,
      max: prev.max * factor,
    }));
    setYRange((prev) => ({
      min: prev.min * factor,
      max: prev.max * factor,
    }));
  };

  const handleResetZoom = () => {
    setXRange({ min: -6, max: 6 });
    setYRange({ min: -6, max: 6 });
  };

  // Mouse move over canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const cy = (e.clientY - rect.top) * (canvas.height / rect.height);
    setCursorPos({ x: cx, y: cy });
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
  };

  // Export PNG
  const handleExportPng = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'calcaura-graph.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  // Calculations for readout
  const primaryFn = functions.find((f) => f.visible);
  const derivInfo = primaryFn ? computeDerivative(primaryFn.expr, tangentX) : null;
  const integralInfo = primaryFn && showIntegral ? computeDefiniteIntegral(primaryFn.expr, integralA, integralB) : null;

  return (
    <div className="tool-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="tool-head flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Real-Time Graphing & Calculus Engine
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Plot multiple functions, inspect tangent lines, examine slope derivatives, and shade definite integrals interactively.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom(0.8)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(1.25)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportPng}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PNG</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Control Sidebar + Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Function Inputs & Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Active Functions
            </h3>

            {functions.map((fn, idx) => (
              <div key={fn.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fn.color }} />
                    f{idx + 1}(x) =
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-500">
                    <input
                      type="checkbox"
                      checked={fn.visible}
                      onChange={(e) => {
                        const updated = [...functions];
                        updated[idx].visible = e.target.checked;
                        setFunctions(updated);
                      }}
                      className="rounded accent-sky-500"
                    />
                    <span>Visible</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={fn.expr}
                  onChange={(e) => {
                    const updated = [...functions];
                    updated[idx].expr = e.target.value;
                    setFunctions(updated);
                  }}
                  placeholder="e.g. sin(x), x^2 - 4"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            ))}

            {/* Quick Presets */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block mb-1.5">Function Presets:</span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { label: 'Quadratic', expr: 'x^2 - 4' },
                  { label: 'Sine Wave', expr: 'sin(x)' },
                  { label: 'Cubic', expr: '0.2*x^3 - x' },
                  { label: 'Exponential', expr: 'exp(0.5*x)' },
                ].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const updated = [...functions];
                      updated[0].expr = p.expr;
                      updated[0].visible = true;
                      setFunctions(updated);
                    }}
                    className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[11px] hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-slate-700 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculus Tools Drawer */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Calculus & Analysis
            </h3>

            {/* Tangent Line Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <Tangent className="w-3.5 h-3.5 text-amber-500" />
                  <span>Tangent Line at Point x0</span>
                </span>
                <input
                  type="checkbox"
                  checked={showTangent}
                  onChange={(e) => setShowTangent(e.target.checked)}
                  className="rounded accent-amber-500"
                />
              </div>
              {showTangent && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <label htmlFor={tangentXId}>Point x0</label>
                    <span className="font-mono">{tangentX.toFixed(2)}</span>
                  </div>
                  <input
                    id={tangentXId}
                    type="range"
                    min={xRange.min}
                    max={xRange.max}
                    step="0.1"
                    value={tangentX}
                    onChange={(e) => setTangentX(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  {derivInfo && (
                    <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-[11px] font-mono text-amber-900 dark:text-amber-200">
                      <div>Slope f&apos;(x0) = {derivInfo.slope.toFixed(4)}</div>
                      <div>Equation: {derivInfo.tangentEquation}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Definite Integral Toggle */}
            <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <AreaChart className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Definite Integral Shading</span>
                </span>
                <input
                  type="checkbox"
                  checked={showIntegral}
                  onChange={(e) => setShowIntegral(e.target.checked)}
                  className="rounded accent-emerald-500"
                />
              </div>
              {showIntegral && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label htmlFor={integralAId} className="text-[11px] text-slate-500 block mb-0.5">Lower bound a</label>
                      <input
                        id={integralAId}
                        type="number"
                        value={integralA}
                        onChange={(e) => setIntegralA(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor={integralBId} className="text-[11px] text-slate-500 block mb-0.5">Upper bound b</label>
                      <input
                        id={integralBId}
                        type="number"
                        value={integralB}
                        onChange={(e) => setIntegralB(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded font-mono text-xs"
                      />
                    </div>
                  </div>
                  {integralInfo && (
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-[11px] font-mono text-emerald-900 dark:text-emerald-200">
                      <div>∫ [{integralA}, {integralB}] ≈ {integralInfo.integralValue.toFixed(4)}</div>
                      <div className="text-[10px] text-slate-500">Method: Simpson's 1/3 Rule (N=60)</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Value Table Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowTable(!showTable)}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Table className="w-3.5 h-3.5" />
                <span>{showTable ? 'Hide Values Table' : 'Show Values Table (x vs f(x))'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center / Right Column: The Canvas Coordinate Plane */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
            <canvas
              ref={canvasRef}
              width={800}
              height={520}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full h-[480px] sm:h-[520px] block cursor-crosshair"
            />

            {/* Real-time Cursor Coordinates Readout */}
            {cursorPos && (
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-sky-400 shadow-md">
                x: {toMathX(cursorPos.x, 800).toFixed(2)}, y:{' '}
                {evaluateExpression(functions[0].expr, toMathX(cursorPos.x, 800)).toFixed(2)}
              </div>
            )}
          </div>

          {/* Table of Values Popup / Drawer */}
          {showTable && primaryFn && (
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Value Table for f(x) = {primaryFn.expr}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="py-1 px-3">x</th>
                      <th className="py-1 px-3">f(x)</th>
                      <th className="py-1 px-3">f'(x) Slope</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((xv) => {
                      const yv = evaluateExpression(primaryFn.expr, xv);
                      const dy = computeDerivative(primaryFn.expr, xv);
                      return (
                        <tr key={xv} className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-1.5 px-3 text-slate-700 dark:text-slate-300">{xv}</td>
                          <td className="py-1.5 px-3 font-semibold text-sky-600 dark:text-sky-400">
                            {isNaN(yv) ? 'undefined' : yv.toFixed(4)}
                          </td>
                          <td className="py-1.5 px-3 text-amber-600 dark:text-amber-400">
                            {isNaN(dy.slope) ? '-' : dy.slope.toFixed(4)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
