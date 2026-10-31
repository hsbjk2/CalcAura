import React, { useState, useId } from 'react';
import {
  calcTriangle,
  calcRightTriangle,
  calcCircle,
  calcRectangle,
  calcCoordinateGeometry,
  calcPolygon,
  calcCylinder,
  calcSphere,
  calcCone,
  GeometryResult,
} from '../math/geometry.ts';
import { MathView } from './MathView.tsx';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Layers,
  Edit3,
} from 'lucide-react';

type ShapeType =
  | 'triangle'
  | 'rightTriangle'
  | 'circle'
  | 'rectangle'
  | 'coordinate2d'
  | 'polygon'
  | 'cylinder'
  | 'sphere'
  | 'cone';

interface ValueInputProps {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}

const ValuePuttingField: React.FC<ValueInputProps> = ({
  id,
  label,
  value,
  min = 0.1,
  max = 50,
  step = 0.5,
  unit,
  onChange,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '' || raw === '-') {
      return;
    }
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  const nudge = (delta: number) => {
    const nextVal = Math.round((value + delta) * 100) / 100;
    if (min !== undefined && nextVal < min) return;
    if (max !== undefined && nextVal > max) return;
    onChange(nextVal);
  };

  const sliderMax = Math.max(max, Math.ceil(value * 1.5));
  const sliderMin = min !== undefined ? min : Math.min(0, value);

  return (
    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <label htmlFor={id} className="font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </label>
        {unit && (
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {unit}
          </span>
        )}
      </div>

      {/* Direct Value Putting Box & Nudge Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => nudge(-step)}
          className="w-7 h-7 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs cursor-pointer select-none transition-colors"
          title={`Decrease by ${step}`}
        >
          -
        </button>

        <div className="relative flex-1">
          <input
            id={id}
            type="number"
            step={step}
            value={value}
            onChange={handleNumberChange}
            className="w-full px-2.5 py-1 text-xs font-mono font-bold text-slate-900 dark:text-white bg-white dark:bg-[#111321] border border-slate-300 dark:border-white/15 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all shadow-inner"
            placeholder="Put value..."
          />
        </div>

        <button
          type="button"
          onClick={() => nudge(step)}
          className="w-7 h-7 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs cursor-pointer select-none transition-colors"
          title={`Increase by ${step}`}
        >
          +
        </button>
      </div>

      {/* Synchronized Continuous Slider */}
      <div className="pt-1">
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full accent-sky-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-white/15 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
          <span>{sliderMin}</span>
          <span>slider track</span>
          <span>{sliderMax}</span>
        </div>
      </div>
    </div>
  );
};

export const InteractiveGeometry: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<ShapeType>('triangle');

  // Triangle state
  const [triA, setTriA] = useState<number>(5);
  const [triB, setTriB] = useState<number>(6);
  const [triC, setTriC] = useState<number>(7);

  // Right Triangle state
  const [rtA, setRtA] = useState<number>(3);
  const [rtB, setRtB] = useState<number>(4);

  // Circle state
  const [circR, setCircR] = useState<number>(7);

  // Rectangle state
  const [rectL, setRectL] = useState<number>(8);
  const [rectW, setRectW] = useState<number>(5);

  // Coordinate geometry state
  const [coordX1, setCoordX1] = useState<number>(1);
  const [coordY1, setCoordY1] = useState<number>(2);
  const [coordX2, setCoordX2] = useState<number>(5);
  const [coordY2, setCoordY2] = useState<number>(5);

  // Regular polygon state
  const [polySides, setPolySides] = useState<number>(6);
  const [polyLength, setPolyLength] = useState<number>(5);

  // Cylinder state
  const [cylR, setCylR] = useState<number>(3);
  const [cylH, setCylH] = useState<number>(7);

  // Sphere state
  const [sphR, setSphR] = useState<number>(4);

  // Cone state
  const [coneR, setConeR] = useState<number>(3);
  const [coneH, setConeH] = useState<number>(6);

  // Compute results
  let result: GeometryResult;
  if (selectedShape === 'triangle') result = calcTriangle(triA, triB, triC);
  else if (selectedShape === 'rightTriangle') result = calcRightTriangle(rtA, rtB);
  else if (selectedShape === 'circle') result = calcCircle(circR);
  else if (selectedShape === 'rectangle') result = calcRectangle(rectL, rectW);
  else if (selectedShape === 'coordinate2d') result = calcCoordinateGeometry(coordX1, coordY1, coordX2, coordY2);
  else if (selectedShape === 'polygon') result = calcPolygon(polySides, polyLength);
  else if (selectedShape === 'cylinder') result = calcCylinder(cylR, cylH);
  else if (selectedShape === 'sphere') result = calcSphere(sphR);
  else result = calcCone(coneR, coneH);

  // Unique IDs for inputs
  const triAId = useId();
  const triBId = useId();
  const triCId = useId();
  const rtAId = useId();
  const rtBId = useId();
  const circRId = useId();
  const rectLId = useId();
  const rectWId = useId();
  const coordX1Id = useId();
  const coordY1Id = useId();
  const coordX2Id = useId();
  const coordY2Id = useId();
  const polySidesId = useId();
  const polyLengthId = useId();
  const cylRId = useId();
  const cylHId = useId();
  const sphRId = useId();
  const coneRId = useId();
  const coneHId = useId();

  // Reset current shape
  const handleReset = () => {
    if (selectedShape === 'triangle') {
      setTriA(5);
      setTriB(6);
      setTriC(7);
    } else if (selectedShape === 'rightTriangle') {
      setRtA(3);
      setRtB(4);
    } else if (selectedShape === 'circle') {
      setCircR(7);
    } else if (selectedShape === 'rectangle') {
      setRectL(8);
      setRectW(5);
    } else if (selectedShape === 'coordinate2d') {
      setCoordX1(1);
      setCoordY1(2);
      setCoordX2(5);
      setCoordY2(5);
    } else if (selectedShape === 'polygon') {
      setPolySides(6);
      setPolyLength(5);
    } else if (selectedShape === 'cylinder') {
      setCylR(3);
      setCylH(7);
    } else if (selectedShape === 'sphere') {
      setSphR(4);
    } else {
      setConeR(3);
      setConeH(6);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-medium mb-2">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Interactive Value Putting & Live Geometry Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Geometry & Spatial Mensuration
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Put custom dimensions, lengths, coordinates, or angles. The engine validates geometric inequalities, plots real-time vector diagrams, and renders step-by-step substitution proofs.
          </p>
        </div>

        {/* Quick Shape Selector Ribbon */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#111321] rounded-xl border border-slate-200 dark:border-white/10 overflow-x-auto max-w-full">
          {[
            { id: 'triangle', label: 'Triangle (Heron)' },
            { id: 'rightTriangle', label: 'Right Triangle' },
            { id: 'circle', label: 'Circle' },
            { id: 'rectangle', label: 'Rectangle' },
            { id: 'coordinate2d', label: 'Coordinate 2D' },
            { id: 'polygon', label: 'Regular Polygon' },
            { id: 'cylinder', label: 'Cylinder 3D' },
            { id: 'sphere', label: 'Sphere 3D' },
            { id: 'cone', label: 'Cone 3D' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedShape(tab.id as ShapeType)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedShape === tab.id
                  ? 'bg-sky-500 text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3-Column Grid: Value Putting Controls + Vector Visualization + Step Proofs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Value Putting Panel */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111321] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Put Values: {result.shapeName}
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Value Putting Presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Quick Value Presets:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedShape === 'triangle' && (
                <>
                  <button
                    onClick={() => { setTriA(3); setTriB(4); setTriC(5); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    3-4-5
                  </button>
                  <button
                    onClick={() => { setTriA(5); setTriB(12); setTriC(13); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    5-12-13
                  </button>
                  <button
                    onClick={() => { setTriA(6); setTriB(6); setTriC(6); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Equilateral 6
                  </button>
                  <button
                    onClick={() => { setTriA(5); setTriB(5); setTriC(8); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Isosceles 5-5-8
                  </button>
                  <button
                    onClick={() => { setTriA(8); setTriB(15); setTriC(17); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    8-15-17
                  </button>
                </>
              )}

              {selectedShape === 'rightTriangle' && (
                <>
                  <button
                    onClick={() => { setRtA(3); setRtB(4); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    3-4 (c=5)
                  </button>
                  <button
                    onClick={() => { setRtA(5); setRtB(12); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    5-12 (c=13)
                  </button>
                  <button
                    onClick={() => { setRtA(8); setRtB(15); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    8-15 (c=17)
                  </button>
                  <button
                    onClick={() => { setRtA(7); setRtB(24); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    7-24 (c=25)
                  </button>
                </>
              )}

              {selectedShape === 'circle' && (
                <>
                  <button
                    onClick={() => setCircR(7)}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r = 7 (Clean π)
                  </button>
                  <button
                    onClick={() => setCircR(3.5)}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r = 3.5
                  </button>
                  <button
                    onClick={() => setCircR(14)}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r = 14
                  </button>
                  <button
                    onClick={() => setCircR(10)}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r = 10
                  </button>
                </>
              )}

              {selectedShape === 'rectangle' && (
                <>
                  <button
                    onClick={() => { setRectL(16.18); setRectW(10); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Golden 16.18 × 10
                  </button>
                  <button
                    onClick={() => { setRectL(8); setRectW(8); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Square 8 × 8
                  </button>
                  <button
                    onClick={() => { setRectL(12); setRectW(5); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    12 × 5
                  </button>
                </>
              )}

              {selectedShape === 'coordinate2d' && (
                <>
                  <button
                    onClick={() => { setCoordX1(0); setCoordY1(0); setCoordX2(3); setCoordY2(4); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    (0,0) to (3,4)
                  </button>
                  <button
                    onClick={() => { setCoordX1(2); setCoordY1(1); setCoordX2(8); setCoordY2(9); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    (2,1) to (8,9)
                  </button>
                  <button
                    onClick={() => { setCoordX1(-4); setCoordY1(3); setCoordX2(4); setCoordY2(-3); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    (-4,3) to (4,-3)
                  </button>
                </>
              )}

              {selectedShape === 'polygon' && (
                <>
                  <button
                    onClick={() => { setPolySides(3); setPolyLength(6); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Triangle (n=3)
                  </button>
                  <button
                    onClick={() => { setPolySides(5); setPolyLength(5); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Pentagon (n=5)
                  </button>
                  <button
                    onClick={() => { setPolySides(6); setPolyLength(4); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Hexagon (n=6)
                  </button>
                  <button
                    onClick={() => { setPolySides(8); setPolyLength(4); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Octagon (n=8)
                  </button>
                </>
              )}

              {selectedShape === 'cylinder' && (
                <>
                  <button
                    onClick={() => { setCylR(7); setCylH(10); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r=7, h=10
                  </button>
                  <button
                    onClick={() => { setCylR(3.5); setCylH(12); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r=3.5, h=12
                  </button>
                </>
              )}

              {selectedShape === 'sphere' && (
                <>
                  <button
                    onClick={() => setSphR(7)}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r = 7 (Clean π)
                  </button>
                  <button
                    onClick={() => setSphR(4.2)}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r = 4.2
                  </button>
                  <button
                    onClick={() => setSphR(10)}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r = 10
                  </button>
                </>
              )}

              {selectedShape === 'cone' && (
                <>
                  <button
                    onClick={() => { setConeR(3); setConeH(4); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r=3, h=4 (l=5)
                  </button>
                  <button
                    onClick={() => { setConeR(5); setConeH(12); }}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-white/10 hover:bg-sky-500 hover:text-white rounded-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    r=5, h=12 (l=13)
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Dynamic Value Putting Fields based on shape */}
          <div className="space-y-3 pt-2">
            {selectedShape === 'triangle' && (
              <>
                <ValuePuttingField
                  id={triAId}
                  label="Side a (Base)"
                  value={triA}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="length units"
                  onChange={setTriA}
                />
                <ValuePuttingField
                  id={triBId}
                  label="Side b"
                  value={triB}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="length units"
                  onChange={setTriB}
                />
                <ValuePuttingField
                  id={triCId}
                  label="Side c"
                  value={triC}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="length units"
                  onChange={setTriC}
                />
              </>
            )}

            {selectedShape === 'rightTriangle' && (
              <>
                <ValuePuttingField
                  id={rtAId}
                  label="Leg a (Perpendicular / Altitude)"
                  value={rtA}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="units"
                  onChange={setRtA}
                />
                <ValuePuttingField
                  id={rtBId}
                  label="Leg b (Base)"
                  value={rtB}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="units"
                  onChange={setRtB}
                />
              </>
            )}

            {selectedShape === 'circle' && (
              <ValuePuttingField
                id={circRId}
                label="Radius (r)"
                value={circR}
                min={0.5}
                max={30}
                step={0.5}
                unit="units"
                onChange={setCircR}
              />
            )}

            {selectedShape === 'rectangle' && (
              <>
                <ValuePuttingField
                  id={rectLId}
                  label="Length (l)"
                  value={rectL}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="units"
                  onChange={setRectL}
                />
                <ValuePuttingField
                  id={rectWId}
                  label="Width (w)"
                  value={rectW}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="units"
                  onChange={setRectW}
                />
              </>
            )}

            {selectedShape === 'coordinate2d' && (
              <div className="grid grid-cols-2 gap-2">
                <ValuePuttingField
                  id={coordX1Id}
                  label="Point A: x₁"
                  value={coordX1}
                  min={-20}
                  max={20}
                  step={0.5}
                  unit="coord"
                  onChange={setCoordX1}
                />
                <ValuePuttingField
                  id={coordY1Id}
                  label="Point A: y₁"
                  value={coordY1}
                  min={-20}
                  max={20}
                  step={0.5}
                  unit="coord"
                  onChange={setCoordY1}
                />
                <ValuePuttingField
                  id={coordX2Id}
                  label="Point B: x₂"
                  value={coordX2}
                  min={-20}
                  max={20}
                  step={0.5}
                  unit="coord"
                  onChange={setCoordX2}
                />
                <ValuePuttingField
                  id={coordY2Id}
                  label="Point B: y₂"
                  value={coordY2}
                  min={-20}
                  max={20}
                  step={0.5}
                  unit="coord"
                  onChange={setCoordY2}
                />
              </div>
            )}

            {selectedShape === 'polygon' && (
              <>
                <ValuePuttingField
                  id={polySidesId}
                  label="Number of Sides (n)"
                  value={polySides}
                  min={3}
                  max={16}
                  step={1}
                  unit="sides"
                  onChange={(v) => setPolySides(Math.max(3, Math.round(v)))}
                />
                <ValuePuttingField
                  id={polyLengthId}
                  label="Side Length (s)"
                  value={polyLength}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="units"
                  onChange={setPolyLength}
                />
              </>
            )}

            {selectedShape === 'cylinder' && (
              <>
                <ValuePuttingField
                  id={cylRId}
                  label="Radius (r)"
                  value={cylR}
                  min={0.5}
                  max={20}
                  step={0.5}
                  unit="units"
                  onChange={setCylR}
                />
                <ValuePuttingField
                  id={cylHId}
                  label="Height (h)"
                  value={cylH}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="units"
                  onChange={setCylH}
                />
              </>
            )}

            {selectedShape === 'sphere' && (
              <ValuePuttingField
                id={sphRId}
                label="Radius (r)"
                value={sphR}
                min={0.5}
                max={25}
                step={0.5}
                unit="units"
                onChange={setSphR}
              />
            )}

            {selectedShape === 'cone' && (
              <>
                <ValuePuttingField
                  id={coneRId}
                  label="Base Radius (r)"
                  value={coneR}
                  min={0.5}
                  max={20}
                  step={0.5}
                  unit="units"
                  onChange={setConeR}
                />
                <ValuePuttingField
                  id={coneHId}
                  label="Vertical Height (h)"
                  value={coneH}
                  min={0.5}
                  max={30}
                  step={0.5}
                  unit="units"
                  onChange={setConeH}
                />
              </>
            )}
          </div>

          {/* Inequality / Geometric Validation Feedback */}
          {!result.valid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900 flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{result.error}</span>
            </div>
          )}

          {result.valid && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Verified Geometric Validity: All constraints satisfied</span>
            </div>
          )}
        </div>

        {/* Center Column: Live Responsive Geometric Diagram */}
        <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Live Vector Rendering</span>
          </div>

          {selectedShape === 'triangle' && (
            <svg viewBox="0 0 300 240" className="w-full max-w-[280px] h-auto">
              {result.valid ? (
                (() => {
                  const maxDim = Math.max(triA, triB, triC, 1);
                  const scale = 180 / maxDim;
                  const x1 = 40;
                  const y1 = 190;
                  const x2 = 40 + triA * scale;
                  const y2 = 190;

                  // Law of cosines for third vertex
                  const cosB = (triA * triA + triC * triC - triB * triB) / (2 * triA * triC);
                  const safeCos = Math.max(-1, Math.min(1, cosB));
                  const sinB = Math.sqrt(Math.max(0, 1 - safeCos * safeCos));
                  const x3 = x1 + triC * scale * safeCos;
                  const y3 = y1 - triC * scale * sinB;

                  return (
                    <g>
                      <polygon
                        points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                        fill="rgba(14, 165, 233, 0.15)"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      {/* Vertex points */}
                      <circle cx={x1} cy={y1} r="3" fill="#38bdf8" />
                      <circle cx={x2} cy={y2} r="3" fill="#38bdf8" />
                      <circle cx={x3} cy={y3} r="3" fill="#38bdf8" />

                      {/* Dimension Labels */}
                      <text x={(x1 + x2) / 2} y={y1 + 18} fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                        a = {triA}
                      </text>
                      <text x={(x2 + x3) / 2 + 10} y={(y2 + y3) / 2} fill="#94a3b8" fontSize="11" textAnchor="start" fontFamily="monospace">
                        b = {triB}
                      </text>
                      <text x={(x1 + x3) / 2 - 12} y={(y1 + y3) / 2} fill="#94a3b8" fontSize="11" textAnchor="end" fontFamily="monospace">
                        c = {triC}
                      </text>
                    </g>
                  );
                })()
              ) : (
                <text x="150" y="120" fill="#ef4444" fontSize="12" textAnchor="middle">
                  Triangle Condition Invalid
                </text>
              )}
            </svg>
          )}

          {selectedShape === 'rightTriangle' && (
            <svg viewBox="0 0 300 240" className="w-full max-w-[280px] h-auto">
              {(() => {
                const maxDim = Math.max(rtA, rtB, 1);
                const scale = 160 / maxDim;
                const x0 = 60;
                const y0 = 190;
                const xBase = x0 + rtB * scale;
                const yTop = y0 - rtA * scale;
                const cVal = Math.sqrt(rtA * rtA + rtB * rtB);

                return (
                  <g>
                    {/* Right angle marker */}
                    <path
                      d={`M ${x0 + 15} ${y0} L ${x0 + 15} ${y0 - 15} L ${x0} ${y0 - 15}`}
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points={`${x0},${y0} ${xBase},${y0} ${x0},${yTop}`}
                      fill="rgba(14, 165, 233, 0.15)"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <circle cx={x0} cy={y0} r="3" fill="#38bdf8" />
                    <circle cx={xBase} cy={y0} r="3" fill="#38bdf8" />
                    <circle cx={x0} cy={yTop} r="3" fill="#38bdf8" />

                    <text x={(x0 + xBase) / 2} y={y0 + 18} fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      b = {rtB}
                    </text>
                    <text x={x0 - 12} y={(y0 + yTop) / 2} fill="#94a3b8" fontSize="11" textAnchor="end" fontFamily="monospace">
                      a = {rtA}
                    </text>
                    <text x={(x0 + xBase) / 2 + 15} y={(y0 + yTop) / 2 - 5} fill="#fcd34d" fontSize="11" textAnchor="start" fontFamily="monospace">
                      c = {cVal.toFixed(2)}
                    </text>
                  </g>
                );
              })()}
            </svg>
          )}

          {selectedShape === 'circle' && (
            <svg viewBox="0 0 300 240" className="w-full max-w-[280px] h-auto">
              <circle
                cx="150"
                cy="120"
                r="85"
                fill="rgba(14, 165, 233, 0.15)"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              <line x1="150" y1="120" x2="235" y2="120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="150" cy="120" r="3.5" fill="#f59e0b" />
              <circle cx="235" cy="120" r="3" fill="#38bdf8" />
              <text x="192" y="112" fill="#fcd34d" fontSize="12" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                r = {circR}
              </text>
              <text x="150" y="224" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                d = {(circR * 2).toFixed(2)}
              </text>
            </svg>
          )}

          {selectedShape === 'rectangle' && (
            <svg viewBox="0 0 300 240" className="w-full max-w-[280px] h-auto">
              {(() => {
                const maxDim = Math.max(rectL, rectW, 1);
                const rw = Math.max(40, (rectL / maxDim) * 200);
                const rh = Math.max(30, (rectW / maxDim) * 140);
                const rx = (300 - rw) / 2;
                const ry = (240 - rh) / 2;

                return (
                  <g>
                    <rect x={rx} y={ry} width={rw} height={rh} fill="rgba(14, 165, 233, 0.15)" stroke="#38bdf8" strokeWidth="2.5" rx="3" />
                    <line x1={rx} y1={ry + rh} x2={rx + rw} y2={ry} stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={rx + rw / 2} y={ry + rh + 18} fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      l = {rectL}
                    </text>
                    <text x={rx - 10} y={ry + rh / 2} fill="#94a3b8" fontSize="11" textAnchor="end" fontFamily="monospace">
                      w = {rectW}
                    </text>
                  </g>
                );
              })()}
            </svg>
          )}

          {selectedShape === 'coordinate2d' && (
            <svg viewBox="0 0 300 240" className="w-full max-w-[280px] h-auto">
              {(() => {
                const minX = Math.min(coordX1, coordX2);
                const maxX = Math.max(coordX1, coordX2);
                const minY = Math.min(coordY1, coordY2);
                const maxY = Math.max(coordY1, coordY2);
                const rangeX = Math.max(1, maxX - minX);
                const rangeY = Math.max(1, maxY - minY);
                const scale = Math.min(180 / rangeX, 140 / rangeY);

                const originX = 150 - ((minX + maxX) / 2) * scale;
                const originY = 120 + ((minY + maxY) / 2) * scale;

                const px1 = originX + coordX1 * scale;
                const py1 = originY - coordY1 * scale;
                const px2 = originX + coordX2 * scale;
                const py2 = originY - coordY2 * scale;

                return (
                  <g>
                    {/* Grid Axes */}
                    <line x1="20" y1={originY} x2="280" y2={originY} stroke="#334155" strokeWidth="1" />
                    <line x1={originX} y1="20" x2={originX} y2="220" stroke="#334155" strokeWidth="1" />

                    {/* Vector Segment */}
                    <line x1={px1} y1={py1} x2={px2} y2={py2} stroke="#38bdf8" strokeWidth="3" />
                    {/* Component triangle */}
                    <line x1={px1} y1={py1} x2={px2} y2={py1} stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1={px2} y1={py1} x2={px2} y2={py2} stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Points */}
                    <circle cx={px1} cy={py1} r="4" fill="#10b981" />
                    <circle cx={px2} cy={py2} r="4" fill="#f59e0b" />

                    <text x={px1} y={py1 - 8} fill="#10b981" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      A({coordX1},{coordY1})
                    </text>
                    <text x={px2} y={py2 - 8} fill="#f59e0b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      B({coordX2},{coordY2})
                    </text>
                  </g>
                );
              })()}
            </svg>
          )}

          {selectedShape === 'polygon' && (
            <svg viewBox="0 0 300 240" className="w-full max-w-[280px] h-auto">
              {(() => {
                const n = Math.max(3, polySides);
                const r = 80;
                const cx = 150;
                const cy = 120;
                const points: string[] = [];

                for (let i = 0; i < n; i++) {
                  const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
                  const x = cx + r * Math.cos(angle);
                  const y = cy + r * Math.sin(angle);
                  points.push(`${x},${y}`);
                }

                return (
                  <g>
                    <polygon
                      points={points.join(' ')}
                      fill="rgba(14, 165, 233, 0.15)"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                    <circle cx={cx} cy={cy} r="3" fill="#f59e0b" />
                    <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke="#64748b" strokeWidth="1.2" strokeDasharray="2 2" />
                    <text x={cx + 6} y={cy - r / 2} fill="#94a3b8" fontSize="10" fontFamily="monospace">
                      R
                    </text>
                    <text x={cx} y={224} fill="#fcd34d" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      n = {n} sides · s = {polyLength}
                    </text>
                  </g>
                );
              })()}
            </svg>
          )}

          {selectedShape === 'cylinder' && (
            <svg viewBox="0 0 300 240" className="w-full max-w-[280px] h-auto">
              <ellipse cx="150" cy="60" rx="60" ry="20" fill="rgba(14, 165, 233, 0.25)" stroke="#38bdf8" strokeWidth="2" />
              <line x1="90" y1="60" x2="90" y2="180" stroke="#38bdf8" strokeWidth="2" />
              <line x1="210" y1="60" x2="210" y2="180" stroke="#38bdf8" strokeWidth="2" />
              <ellipse cx="150" cy="180" rx="60" ry="20" fill="rgba(14, 165, 233, 0.15)" stroke="#38bdf8" strokeWidth="2" />
              <line x1="150" y1="60" x2="210" y2="60" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx="150" cy="60" r="3" fill="#f59e0b" />
              {/* Labels */}
              <text x="75" y="120" fill="#94a3b8" fontSize="11" textAnchor="end" fontFamily="monospace">h = {cylH}</text>
              <text x="180" y="52" fill="#fcd34d" fontSize="10" textAnchor="middle" fontFamily="monospace">r = {cylR}</text>
            </svg>
          )}

          {selectedShape === 'sphere' && (
            <svg viewBox="0 0 300 240" className="w-full max-w-[280px] h-auto">
              <circle cx="150" cy="120" r="75" fill="rgba(14, 165, 233, 0.15)" stroke="#38bdf8" strokeWidth="2.5" />
              <ellipse cx="150" cy="120" rx="75" ry="25" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
              <line x1="150" y1="120" x2="225" y2="120" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="150" cy="120" r="3" fill="#f59e0b" />
              <text x="185" y="112" fill="#fcd34d" fontSize="11" textAnchor="middle" fontFamily="monospace">r = {sphR}</text>
            </svg>
          )}

          {selectedShape === 'cone' && (
            <svg viewBox="0 0 300 240" className="w-full max-w-[280px] h-auto">
              <line x1="150" y1="40" x2="80" y2="180" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="150" y1="40" x2="220" y2="180" stroke="#38bdf8" strokeWidth="2.5" />
              <ellipse cx="150" cy="180" rx="70" ry="20" fill="rgba(14, 165, 233, 0.15)" stroke="#38bdf8" strokeWidth="2" />
              <line x1="150" y1="40" x2="150" y2="180" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="150" y1="180" x2="220" y2="180" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="140" y="110" fill="#94a3b8" fontSize="11" textAnchor="end" fontFamily="monospace">h = {coneH}</text>
              <text x="185" y="196" fill="#fcd34d" fontSize="10" textAnchor="middle" fontFamily="monospace">r = {coneR}</text>
            </svg>
          )}
        </div>

        {/* Right Column: Calculated Properties & Step-by-Step Proof */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111321] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs space-y-5">
          <div className="pb-2 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Calculated Results & Proofs
            </h3>
            <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-semibold">
              Live Output
            </span>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {result.properties.map((prop, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-100 dark:border-white/10">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px] truncate">{prop.label}</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-xs sm:text-sm block truncate">
                  {prop.value} <span className="text-[10px] text-slate-400 font-normal">{prop.unit}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Standard Formula with KaTeX */}
          {result.formula && (
            <div className="p-3 bg-sky-500/10 dark:bg-sky-500/15 rounded-xl border border-sky-500/20">
              <span className="text-[11px] text-sky-700 dark:text-sky-300 font-semibold block mb-1">Standard Formula:</span>
              <div className="overflow-x-auto">
                <MathView math={result.formula} displayMode={true} className="text-xs sm:text-sm text-sky-900 dark:text-sky-200" />
              </div>
            </div>
          )}

          {/* Substitution */}
          {result.substitution && (
            <div className="p-3 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-200/60 dark:border-white/10">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mb-1">Value Substitution:</span>
              <div className="overflow-x-auto text-center py-1">
                <MathView math={result.substitution} displayMode={true} className="text-xs text-slate-800 dark:text-slate-200" />
              </div>
            </div>
          )}

          {/* Step-by-Step Proof */}
          {result.steps.length > 0 && (
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Derivation Steps
              </span>
              <div className="space-y-1 p-2.5 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5">
                {result.steps.map((st, i) => (
                  <p key={i} className="leading-relaxed text-[11px] font-mono text-slate-700 dark:text-slate-300">{st}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
