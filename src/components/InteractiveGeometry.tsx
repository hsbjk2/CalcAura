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
import { Reveal, GlassPanel } from './ui/Depth.tsx';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Layers,
  Compass,
  Ruler,
} from 'lucide-react';
import '../styles/geometry.css';

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

interface Measure {
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
}

interface RelationshipNote {
  tag: string;
  statement: string;
  detail: string;
}

const SHAPE_OPTIONS: { id: ShapeType; label: string; meta: string }[] = [
  { id: 'triangle', label: 'Triangle', meta: 'Heron' },
  { id: 'rightTriangle', label: 'Right triangle', meta: 'Pythagoras' },
  { id: 'circle', label: 'Circle', meta: 'π · radius' },
  { id: 'rectangle', label: 'Rectangle', meta: 'l × w' },
  { id: 'coordinate2d', label: 'Coordinate', meta: 'Δx · Δy' },
  { id: 'polygon', label: 'Polygon', meta: 'n-gon' },
  { id: 'cylinder', label: 'Cylinder', meta: 'πr²h' },
  { id: 'sphere', label: 'Sphere', meta: '4/3 πr³' },
  { id: 'cone', label: 'Cone', meta: '⅓ πr²h' },
];

const tidy = (value?: string | number): string => {
  if (value === undefined || value === null || value === '') return '—';
  const text = String(value);
  if (!text.includes('.')) return text;
  return text.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
};

const ShapeGlyph: React.FC<{ shape: ShapeType }> = ({ shape }) => {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {shape === 'triangle' && <path d="M12 4 21 20H3Z" {...common} />}
      {shape === 'rightTriangle' && (
        <>
          <path d="M5 20V5l14 15H5Z" {...common} />
          <path d="M5 15h5v5" {...common} opacity="0.55" />
        </>
      )}
      {shape === 'circle' && <circle cx="12" cy="12" r="7.5" {...common} />}
      {shape === 'rectangle' && <rect x="4" y="6.5" width="16" height="11" rx="0.5" {...common} />}
      {shape === 'coordinate2d' && (
        <>
          <path d="M4 20V4M4 20h16" {...common} />
          <path d="M7 16 17 7" {...common} />
          <circle cx="7" cy="16" r="1.2" fill="currentColor" />
          <circle cx="17" cy="7" r="1.2" fill="currentColor" />
        </>
      )}
      {shape === 'polygon' && <path d="M12 4l7 4v8l-7 4-7-4V8Z" {...common} />}
      {shape === 'cylinder' && (
        <>
          <ellipse cx="12" cy="6" rx="6" ry="2.5" {...common} />
          <path d="M6 6v12c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" {...common} />
          <path d="M6 18c0-1.4 2.7-2.5 6-2.5s6 1.1 6 2.5" {...common} opacity="0.55" />
        </>
      )}
      {shape === 'sphere' && (
        <>
          <circle cx="12" cy="12" r="7.5" {...common} />
          <ellipse cx="12" cy="12" rx="7.5" ry="3" {...common} opacity="0.55" />
        </>
      )}
      {shape === 'cone' && (
        <>
          <path d="M12 4 6 18M12 4l6 14" {...common} />
          <ellipse cx="12" cy="18" rx="6" ry="2.5" {...common} />
        </>
      )}
    </svg>
  );
};

const Preset: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({
  onClick,
  children,
}) => (
  <button type="button" onClick={onClick} className="geometry-preset">
    {children}
  </button>
);

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
    <div className="geometry-field">
      <div className="geometry-field__head">
        <label htmlFor={id} className="geometry-field__label">
          {label}
        </label>
        {unit && <span className="geometry-field__unit">{unit}</span>}
      </div>

      <div className="geometry-field__row">
        <button
          type="button"
          onClick={() => nudge(-step)}
          className="geometry-nudge"
          title={`Decrease by ${step}`}
          aria-label={`Decrease ${label} by ${step}`}
        >
          −
        </button>

        <div className="geometry-field__input-wrap">
          <input
            id={id}
            type="number"
            step={step}
            value={value}
            onChange={handleNumberChange}
            className="geometry-number"
            placeholder="Value"
            inputMode="decimal"
          />
        </div>

        <button
          type="button"
          onClick={() => nudge(step)}
          className="geometry-nudge"
          title={`Increase by ${step}`}
          aria-label={`Increase ${label} by ${step}`}
        >
          +
        </button>
      </div>

      <div className="geometry-slider">
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="geometry-range"
          aria-label={`${label} slider`}
        />
        <div className="geometry-slider__scale">
          <span>{sliderMin}</span>
          <span>range</span>
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

  const propertyValue = (fragment: string) =>
    result.properties.find((property) =>
      property.label.toLowerCase().includes(fragment.toLowerCase()),
    )?.value;

  const measures: Measure[] = (() => {
    switch (selectedShape) {
      case 'triangle':
        return [
          { label: 'a', value: tidy(triA), unit: 'u' },
          { label: 'b', value: tidy(triB), unit: 'u' },
          { label: 'c', value: tidy(triC), unit: 'u' },
          { label: 'area', value: tidy(propertyValue('Area')), unit: 'u²', accent: true },
        ];
      case 'rightTriangle':
        return [
          { label: 'a', value: tidy(rtA), unit: 'u' },
          { label: 'b', value: tidy(rtB), unit: 'u' },
          { label: 'c', value: tidy(propertyValue('Hypotenuse')), unit: 'u', accent: true },
        ];
      case 'circle':
        return [
          { label: 'r', value: tidy(circR), unit: 'u' },
          { label: 'd', value: tidy(propertyValue('Diameter')), unit: 'u' },
          { label: 'C', value: tidy(propertyValue('Circumference')), unit: 'u' },
          { label: 'A', value: tidy(propertyValue('Area')), unit: 'u²', accent: true },
        ];
      case 'rectangle':
        return [
          { label: 'l', value: tidy(rectL), unit: 'u' },
          { label: 'w', value: tidy(rectW), unit: 'u' },
          { label: 'A', value: tidy(propertyValue('Area')), unit: 'u²', accent: true },
        ];
      case 'coordinate2d':
        return [
          { label: 'Δx', value: tidy(propertyValue('Horizontal Offset')), unit: 'u' },
          { label: 'Δy', value: tidy(propertyValue('Vertical Offset')), unit: 'u' },
          { label: 'd', value: tidy(propertyValue('Distance')), unit: 'u', accent: true },
        ];
      case 'polygon':
        return [
          { label: 'n', value: tidy(polySides) },
          { label: 's', value: tidy(polyLength), unit: 'u' },
          { label: '∠int', value: tidy(propertyValue('Interior Angle')), unit: '°', accent: true },
        ];
      case 'cylinder':
        return [
          { label: 'r', value: tidy(cylR), unit: 'u' },
          { label: 'h', value: tidy(cylH), unit: 'u' },
          { label: 'V', value: tidy(propertyValue('Volume')), unit: 'u³', accent: true },
        ];
      case 'sphere':
        return [
          { label: 'r', value: tidy(sphR), unit: 'u' },
          { label: 'd', value: tidy(propertyValue('Diameter')), unit: 'u' },
          { label: 'A', value: tidy(propertyValue('Surface Area')), unit: 'u²' },
          { label: 'V', value: tidy(propertyValue('Volume')), unit: 'u³', accent: true },
        ];
      case 'cone':
        return [
          { label: 'r', value: tidy(coneR), unit: 'u' },
          { label: 'h', value: tidy(coneH), unit: 'u' },
          { label: 'l', value: tidy(propertyValue('Slant Height')), unit: 'u' },
          { label: 'V', value: tidy(propertyValue('Volume')), unit: 'u³', accent: true },
        ];
      default:
        return [];
    }
  })();

  const relationship: RelationshipNote = (() => {
    if (!result.valid) {
      return {
        tag: 'Constraint check',
        statement: 'No valid construction yet.',
        detail: result.error ?? 'Adjust the dimensions until the shape conditions are met.',
      };
    }

    switch (selectedShape) {
      case 'triangle':
        return {
          tag: 'Angle sum · Law of Cosines',
          statement: `${tidy(propertyValue('Angle A'))}° + ${tidy(propertyValue('Angle B'))}° + ${tidy(propertyValue('Angle C'))}° = 180°`,
          detail: `Sides a = ${triA}, b = ${triB}, c = ${triC}. Heron area = ${tidy(propertyValue('Area'))} sq units.`,
        };
      case 'rightTriangle':
        return {
          tag: 'Pythagorean relation',
          statement: `a² + b² = c²  →  ${rtA}² + ${rtB}² = ${(rtA * rtA + rtB * rtB).toFixed(2)}`,
          detail: `Hypotenuse c = ${tidy(propertyValue('Hypotenuse'))} units. Area = ${tidy(propertyValue('Area'))} sq units.`,
        };
      case 'circle':
        return {
          tag: 'Radius · circumference',
          statement: `C = πd = ${tidy(propertyValue('Circumference'))}`,
          detail: `r = ${circR}, d = ${tidy(propertyValue('Diameter'))}. Area = πr² = ${tidy(propertyValue('Area'))} sq units.`,
        };
      case 'rectangle':
        return {
          tag: 'Area · perimeter',
          statement: `A = l × w = ${tidy(propertyValue('Area'))}`,
          detail: `${rectL} × ${rectW} sq units · perimeter = ${tidy(propertyValue('Perimeter'))} units · diagonal = ${tidy(propertyValue('Diagonal'))}.`,
        };
      case 'coordinate2d':
        return {
          tag: 'Distance formula',
          statement: `d = √(Δx² + Δy²) = ${tidy(propertyValue('Distance'))}`,
          detail: `Δx = ${tidy(propertyValue('Horizontal Offset'))}, Δy = ${tidy(propertyValue('Vertical Offset'))} · midpoint ${tidy(propertyValue('Midpoint'))} · slope ${tidy(propertyValue('Slope'))}.`,
        };
      case 'polygon':
        return {
          tag: 'Interior angle',
          statement: `(${polySides} − 2) × 180° ÷ ${polySides} = ${tidy(propertyValue('Interior Angle'))}°`,
          detail: `Perimeter = ${tidy(propertyValue('Perimeter'))} units · apothem = ${tidy(propertyValue('Apothem'))} units.`,
        };
      case 'cylinder':
        return {
          tag: 'Volume · surface',
          statement: `V = πr²h = ${tidy(propertyValue('Volume'))}`,
          detail: `r = ${cylR}, h = ${cylH}. Curved area = ${tidy(propertyValue('Curved Surface Area'))} sq units · total = ${tidy(propertyValue('Total Surface Area'))}.`,
        };
      case 'sphere':
        return {
          tag: 'Volume · surface',
          statement: `V = 4/3 πr³ = ${tidy(propertyValue('Volume'))}`,
          detail: `r = ${sphR}. Surface area = ${tidy(propertyValue('Surface Area'))} sq units · diameter = ${tidy(propertyValue('Diameter'))}.`,
        };
      case 'cone':
        return {
          tag: 'Slant height',
          statement: `l² = r² + h²  →  l = ${tidy(propertyValue('Slant Height'))}`,
          detail: `r = ${coneR}, h = ${coneH}. Volume = ${tidy(propertyValue('Volume'))} cubic units · total area = ${tidy(propertyValue('Total Surface Area'))}.`,
        };
      default:
        return { tag: 'Relationship', statement: '', detail: '' };
    }
  })();

  return (
    <div className="geometry-desk max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Reveal className="geometry-head">
        <div className="geometry-head__meta">
          <span className="geometry-kicker">
            <Compass aria-hidden="true" />
            Construction desk
          </span>
          <span className="geometry-kicker geometry-kicker--muted">
            Interactive geometry · 09 shapes
          </span>
        </div>

        <div className="geometry-head__grid">
          <div>
            <h2 className="geometry-title">
              Geometry <span className="geometry-title__amp">&amp;</span>
              <span className="geometry-title__second">spatial mensuration</span>
            </h2>
          </div>

          <div className="geometry-head__aside">
            <p className="geometry-lede">
              Put custom dimensions, coordinates, or angles. The engine validates the
              geometric inequalities, plots the figure in real time, and keeps a substitution
              proof beside the construction.
            </p>
            <div className="geometry-head__tags">
              <span className="geometry-chip">Real-time vectors</span>
              <span className="geometry-chip">Validity checks</span>
              <span className="geometry-chip">Step proofs</span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80} className="geometry-palette-wrap">
        <div className="geometry-palette">
          <div className="geometry-palette__head">
            <span className="geometry-section-label">
              <Layers aria-hidden="true" />
              Shape palette
            </span>
            <span className="geometry-section-note">Select a construction</span>
          </div>

          <div className="geometry-palette__rail" role="group" aria-label="Shape palette">
            {SHAPE_OPTIONS.map((tab, index) => {
              const isActive = selectedShape === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedShape(tab.id)}
                  className={`geometry-shape-tab${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                >
                  <span className="geometry-shape-tab__glyph" aria-hidden="true">
                    <ShapeGlyph shape={tab.id} />
                  </span>
                  <span className="geometry-shape-tab__text">
                    <span className="geometry-shape-tab__label">{tab.label}</span>
                    <span className="geometry-shape-tab__meta">{tab.meta}</span>
                  </span>
                  <span className="geometry-shape-tab__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="geometry-grid">
        <Reveal delay={140} className="geometry-col geometry-col--inputs">
          <GlassPanel className="geometry-panel">
            <div className="geometry-panel__head">
              <div>
                <span className="geometry-section-label">
                  <Ruler aria-hidden="true" />
                  Values
                </span>
                <h3 className="geometry-panel__title">{result.shapeName}</h3>
              </div>
              <button type="button" onClick={handleReset} className="geometry-reset">
                <RotateCcw aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>

            <div className="geometry-presets">
              <span className="geometry-section-label geometry-section-label--small">
                <Sparkles aria-hidden="true" />
                Quick values
              </span>
              <div className="geometry-presets__row">
                {selectedShape === 'triangle' && (
                  <>
                    <Preset onClick={() => { setTriA(3); setTriB(4); setTriC(5); }}>3-4-5</Preset>
                    <Preset onClick={() => { setTriA(5); setTriB(12); setTriC(13); }}>5-12-13</Preset>
                    <Preset onClick={() => { setTriA(6); setTriB(6); setTriC(6); }}>Equilateral 6</Preset>
                    <Preset onClick={() => { setTriA(5); setTriB(5); setTriC(8); }}>Isosceles 5-5-8</Preset>
                    <Preset onClick={() => { setTriA(8); setTriB(15); setTriC(17); }}>8-15-17</Preset>
                  </>
                )}

                {selectedShape === 'rightTriangle' && (
                  <>
                    <Preset onClick={() => { setRtA(3); setRtB(4); }}>3-4 (c=5)</Preset>
                    <Preset onClick={() => { setRtA(5); setRtB(12); }}>5-12 (c=13)</Preset>
                    <Preset onClick={() => { setRtA(8); setRtB(15); }}>8-15 (c=17)</Preset>
                    <Preset onClick={() => { setRtA(7); setRtB(24); }}>7-24 (c=25)</Preset>
                  </>
                )}

                {selectedShape === 'circle' && (
                  <>
                    <Preset onClick={() => setCircR(7)}>r = 7 (Clean π)</Preset>
                    <Preset onClick={() => setCircR(3.5)}>r = 3.5</Preset>
                    <Preset onClick={() => setCircR(14)}>r = 14</Preset>
                    <Preset onClick={() => setCircR(10)}>r = 10</Preset>
                  </>
                )}

                {selectedShape === 'rectangle' && (
                  <>
                    <Preset onClick={() => { setRectL(16.18); setRectW(10); }}>Golden 16.18 × 10</Preset>
                    <Preset onClick={() => { setRectL(8); setRectW(8); }}>Square 8 × 8</Preset>
                    <Preset onClick={() => { setRectL(12); setRectW(5); }}>12 × 5</Preset>
                  </>
                )}

                {selectedShape === 'coordinate2d' && (
                  <>
                    <Preset onClick={() => { setCoordX1(0); setCoordY1(0); setCoordX2(3); setCoordY2(4); }}>
                      (0,0) to (3,4)
                    </Preset>
                    <Preset onClick={() => { setCoordX1(2); setCoordY1(1); setCoordX2(8); setCoordY2(9); }}>
                      (2,1) to (8,9)
                    </Preset>
                    <Preset onClick={() => { setCoordX1(-4); setCoordY1(3); setCoordX2(4); setCoordY2(-3); }}>
                      (-4,3) to (4,-3)
                    </Preset>
                  </>
                )}

                {selectedShape === 'polygon' && (
                  <>
                    <Preset onClick={() => { setPolySides(3); setPolyLength(6); }}>Triangle (n=3)</Preset>
                    <Preset onClick={() => { setPolySides(5); setPolyLength(5); }}>Pentagon (n=5)</Preset>
                    <Preset onClick={() => { setPolySides(6); setPolyLength(4); }}>Hexagon (n=6)</Preset>
                    <Preset onClick={() => { setPolySides(8); setPolyLength(4); }}>Octagon (n=8)</Preset>
                  </>
                )}

                {selectedShape === 'cylinder' && (
                  <>
                    <Preset onClick={() => { setCylR(7); setCylH(10); }}>r=7, h=10</Preset>
                    <Preset onClick={() => { setCylR(3.5); setCylH(12); }}>r=3.5, h=12</Preset>
                  </>
                )}

                {selectedShape === 'sphere' && (
                  <>
                    <Preset onClick={() => setSphR(7)}>r = 7 (Clean π)</Preset>
                    <Preset onClick={() => setSphR(4.2)}>r = 4.2</Preset>
                    <Preset onClick={() => setSphR(10)}>r = 10</Preset>
                  </>
                )}

                {selectedShape === 'cone' && (
                  <>
                    <Preset onClick={() => { setConeR(3); setConeH(4); }}>r=3, h=4 (l=5)</Preset>
                    <Preset onClick={() => { setConeR(5); setConeH(12); }}>r=5, h=12 (l=13)</Preset>
                  </>
                )}
              </div>
            </div>

            <div className="geometry-fields">
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
                <div className="geometry-fields__pair">
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

            {!result.valid && (
              <div className="geometry-status geometry-status--invalid" role="status">
                <AlertTriangle aria-hidden="true" />
                <span>
                  <strong>Constraint not met.</strong> {result.error}
                </span>
              </div>
            )}

            {result.valid && (
              <div className="geometry-status geometry-status--valid" role="status">
                <CheckCircle2 aria-hidden="true" />
                <span>Construction valid · all constraints satisfied</span>
              </div>
            )}
          </GlassPanel>
        </Reveal>

        <Reveal delay={220} className="geometry-col geometry-col--canvas">
          <div className="depth-stage geometry-canvas-stage">
            <GlassPanel className="geometry-canvas-card" tilt>
              <div className="geometry-canvas__bar">
                <span className="geometry-section-label">
                  <Layers aria-hidden="true" />
                  Live vector draft
                </span>
                <span
                  className={`geometry-canvas__status${result.valid ? ' is-valid' : ' is-invalid'}`}
                >
                  <span className="geometry-canvas__status-dot" aria-hidden="true" />
                  {result.valid ? 'Valid construction' : 'Check inputs'}
                </span>
              </div>

              <div className="geometry-canvas">
                <span className="geometry-corner geometry-corner--tl" aria-hidden="true" />
                <span className="geometry-corner geometry-corner--tr" aria-hidden="true" />
                <span className="geometry-corner geometry-corner--bl" aria-hidden="true" />
                <span className="geometry-corner geometry-corner--br" aria-hidden="true" />

                <div className="geometry-canvas__figure">
                  {selectedShape === 'triangle' && (
                    <svg
                      viewBox="0 0 300 240"
                      className="geometry-diagram"
                      role="img"
                      aria-label={`${result.shapeName} construction`}
                    >
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
                                className="geo-shape"
                                strokeWidth="2.5"
                              />
                              {/* Vertex points */}
                              <circle cx={x1} cy={y1} r="3" className="geo-point" />
                              <circle cx={x2} cy={y2} r="3" className="geo-point" />
                              <circle cx={x3} cy={y3} r="3" className="geo-point" />

                              {/* Dimension Labels */}
                              <text
                                x={(x1 + x2) / 2}
                                y={y1 + 18}
                                className="geo-label"
                                fontSize="11"
                                textAnchor="middle"
                              >
                                a = {triA}
                              </text>
                              <text
                                x={(x2 + x3) / 2 + 10}
                                y={(y2 + y3) / 2}
                                className="geo-label"
                                fontSize="11"
                                textAnchor="start"
                              >
                                b = {triB}
                              </text>
                              <text
                                x={(x1 + x3) / 2 - 12}
                                y={(y1 + y3) / 2}
                                className="geo-label"
                                fontSize="11"
                                textAnchor="end"
                              >
                                c = {triC}
                              </text>
                            </g>
                          );
                        })()
                      ) : (
                        <text
                          x="150"
                          y="120"
                          className="geo-invalid"
                          fontSize="12"
                          textAnchor="middle"
                        >
                          Triangle condition invalid
                        </text>
                      )}
                    </svg>
                  )}

                  {selectedShape === 'rightTriangle' && (
                    <svg
                      viewBox="0 0 300 240"
                      className="geometry-diagram"
                      role="img"
                      aria-label={`${result.shapeName} construction`}
                    >
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
                              className="geo-right-angle"
                              strokeWidth="1.5"
                            />
                            <polygon
                              points={`${x0},${y0} ${xBase},${y0} ${x0},${yTop}`}
                              className="geo-shape"
                              strokeWidth="2.5"
                            />
                            <circle cx={x0} cy={y0} r="3" className="geo-point" />
                            <circle cx={xBase} cy={y0} r="3" className="geo-point" />
                            <circle cx={x0} cy={yTop} r="3" className="geo-point" />

                            <text
                              x={(x0 + xBase) / 2}
                              y={y0 + 18}
                              className="geo-label"
                              fontSize="11"
                              textAnchor="middle"
                            >
                              b = {rtB}
                            </text>
                            <text
                              x={x0 - 12}
                              y={(y0 + yTop) / 2}
                              className="geo-label"
                              fontSize="11"
                              textAnchor="end"
                            >
                              a = {rtA}
                            </text>
                            <text
                              x={(x0 + xBase) / 2 + 15}
                              y={(y0 + yTop) / 2 - 5}
                              className="geo-label geo-label--accent"
                              fontSize="11"
                              textAnchor="start"
                              fontWeight="bold"
                            >
                              c = {cVal.toFixed(2)}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  )}

                  {selectedShape === 'circle' && (
                    <svg
                      viewBox="0 0 300 240"
                      className="geometry-diagram"
                      role="img"
                      aria-label={`${result.shapeName} construction`}
                    >
                      <circle cx="150" cy="120" r="85" className="geo-shape" strokeWidth="2.5" />
                      <line
                        x1="150"
                        y1="120"
                        x2="235"
                        y2="120"
                        className="geo-measure"
                        strokeWidth="2"
                      />
                      <circle cx="150" cy="120" r="3.5" className="geo-point geo-point--accent" />
                      <circle cx="235" cy="120" r="3" className="geo-point" />
                      <text
                        x="192"
                        y="112"
                        className="geo-label geo-label--accent"
                        fontSize="12"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        r = {circR}
                      </text>
                      <text
                        x="150"
                        y="224"
                        className="geo-label"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        d = {(circR * 2).toFixed(2)}
                      </text>
                    </svg>
                  )}

                  {selectedShape === 'rectangle' && (
                    <svg
                      viewBox="0 0 300 240"
                      className="geometry-diagram"
                      role="img"
                      aria-label={`${result.shapeName} construction`}
                    >
                      {(() => {
                        const maxDim = Math.max(rectL, rectW, 1);
                        const rw = Math.max(40, (rectL / maxDim) * 200);
                        const rh = Math.max(30, (rectW / maxDim) * 140);
                        const rx = (300 - rw) / 2;
                        const ry = (240 - rh) / 2;

                        return (
                          <g>
                            <rect
                              x={rx}
                              y={ry}
                              width={rw}
                              height={rh}
                              className="geo-shape"
                              strokeWidth="2.5"
                              rx="1"
                            />
                            <line
                              x1={rx}
                              y1={ry + rh}
                              x2={rx + rw}
                              y2={ry}
                              className="geo-dash"
                              strokeWidth="1"
                            />
                            <text
                              x={rx + rw / 2}
                              y={ry + rh + 18}
                              className="geo-label"
                              fontSize="11"
                              textAnchor="middle"
                            >
                              l = {rectL}
                            </text>
                            <text
                              x={rx - 10}
                              y={ry + rh / 2}
                              className="geo-label"
                              fontSize="11"
                              textAnchor="end"
                            >
                              w = {rectW}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  )}

                  {selectedShape === 'coordinate2d' && (
                    <svg
                      viewBox="0 0 300 240"
                      className="geometry-diagram"
                      role="img"
                      aria-label={`${result.shapeName} construction`}
                    >
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
                            <line x1="20" y1={originY} x2="280" y2={originY} className="geo-axis" />
                            <line x1={originX} y1="20" x2={originX} y2="220" className="geo-axis" />

                            {/* Vector Segment */}
                            <line
                              x1={px1}
                              y1={py1}
                              x2={px2}
                              y2={py2}
                              className="geo-vector"
                              strokeWidth="3"
                            />
                            {/* Component triangle */}
                            <line
                              x1={px1}
                              y1={py1}
                              x2={px2}
                              y2={py1}
                              className="geo-dash"
                              strokeWidth="1"
                            />
                            <line
                              x1={px2}
                              y1={py1}
                              x2={px2}
                              y2={py2}
                              className="geo-dash"
                              strokeWidth="1"
                            />

                            {/* Points */}
                            <circle cx={px1} cy={py1} r="4" className="geo-point" />
                            <circle cx={px2} cy={py2} r="4" className="geo-point geo-point--accent" />

                            <text
                              x={px1}
                              y={py1 - 8}
                              className="geo-label geo-label--strong"
                              fontSize="10"
                              textAnchor="middle"
                            >
                              A({coordX1},{coordY1})
                            </text>
                            <text
                              x={px2}
                              y={py2 - 8}
                              className="geo-label geo-label--accent"
                              fontSize="10"
                              textAnchor="middle"
                            >
                              B({coordX2},{coordY2})
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  )}

                  {selectedShape === 'polygon' && (
                    <svg
                      viewBox="0 0 300 240"
                      className="geometry-diagram"
                      role="img"
                      aria-label={`${result.shapeName} construction`}
                    >
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
                              className="geo-shape"
                              strokeWidth="2.5"
                            />
                            <circle cx={cx} cy={cy} r="3" className="geo-point geo-point--accent" />
                            <line
                              x1={cx}
                              y1={cy}
                              x2={cx}
                              y2={cy - r}
                              className="geo-dash"
                              strokeWidth="1.2"
                            />
                            <text x={cx + 6} y={cy - r / 2} className="geo-label" fontSize="10">
                              R
                            </text>
                            <text
                              x={cx}
                              y="224"
                              className="geo-label geo-label--accent"
                              fontSize="11"
                              textAnchor="middle"
                            >
                              n = {n} sides · s = {polyLength}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  )}

                  {selectedShape === 'cylinder' && (
                    <svg
                      viewBox="0 0 300 240"
                      className="geometry-diagram"
                      role="img"
                      aria-label={`${result.shapeName} construction`}
                    >
                      <ellipse
                        cx="150"
                        cy="60"
                        rx="60"
                        ry="20"
                        className="geo-shape"
                        strokeWidth="2"
                      />
                      <line x1="90" y1="60" x2="90" y2="180" className="geo-solid-line" strokeWidth="2" />
                      <line x1="210" y1="60" x2="210" y2="180" className="geo-solid-line" strokeWidth="2" />
                      <ellipse
                        cx="150"
                        cy="180"
                        rx="60"
                        ry="20"
                        className="geo-shape"
                        strokeWidth="2"
                      />
                      <line
                        x1="150"
                        y1="60"
                        x2="210"
                        y2="60"
                        className="geo-measure"
                        strokeWidth="1.5"
                      />
                      <circle cx="150" cy="60" r="3" className="geo-point geo-point--accent" />
                      {/* Labels */}
                      <text
                        x="75"
                        y="120"
                        className="geo-label"
                        fontSize="11"
                        textAnchor="end"
                      >
                        h = {cylH}
                      </text>
                      <text
                        x="180"
                        y="52"
                        className="geo-label geo-label--accent"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        r = {cylR}
                      </text>
                    </svg>
                  )}

                  {selectedShape === 'sphere' && (
                    <svg
                      viewBox="0 0 300 240"
                      className="geometry-diagram"
                      role="img"
                      aria-label={`${result.shapeName} construction`}
                    >
                      <circle cx="150" cy="120" r="75" className="geo-shape" strokeWidth="2.5" />
                      <ellipse
                        cx="150"
                        cy="120"
                        rx="75"
                        ry="25"
                        className="geo-dash"
                        strokeWidth="1.2"
                      />
                      <line
                        x1="150"
                        y1="120"
                        x2="225"
                        y2="120"
                        className="geo-measure"
                        strokeWidth="2"
                      />
                      <circle cx="150" cy="120" r="3" className="geo-point geo-point--accent" />
                      <text
                        x="185"
                        y="112"
                        className="geo-label geo-label--accent"
                        fontSize="11"
                        textAnchor="middle"
                      >
                        r = {sphR}
                      </text>
                    </svg>
                  )}

                  {selectedShape === 'cone' && (
                    <svg
                      viewBox="0 0 300 240"
                      className="geometry-diagram"
                      role="img"
                      aria-label={`${result.shapeName} construction`}
                    >
                      <line x1="150" y1="40" x2="80" y2="180" className="geo-solid-line" strokeWidth="2.5" />
                      <line x1="150" y1="40" x2="220" y2="180" className="geo-solid-line" strokeWidth="2.5" />
                      <ellipse
                        cx="150"
                        cy="180"
                        rx="70"
                        ry="20"
                        className="geo-shape"
                        strokeWidth="2"
                      />
                      <line
                        x1="150"
                        y1="40"
                        x2="150"
                        y2="180"
                        className="geo-dash"
                        strokeWidth="1"
                      />
                      <line
                        x1="150"
                        y1="180"
                        x2="220"
                        y2="180"
                        className="geo-measure"
                        strokeWidth="1.5"
                      />
                      <text
                        x="140"
                        y="110"
                        className="geo-label"
                        fontSize="11"
                        textAnchor="end"
                      >
                        h = {coneH}
                      </text>
                      <text
                        x="185"
                        y="196"
                        className="geo-label geo-label--accent"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        r = {coneR}
                      </text>
                    </svg>
                  )}
                </div>
              </div>

              <div className="geometry-canvas__measures">
                {measures.map((measure) => (
                  <div
                    key={measure.label}
                    className={`geometry-measure-chip${measure.accent ? ' is-accent' : ''}`}
                  >
                    <span className="geometry-measure-chip__label">{measure.label}</span>
                    <span className="geometry-measure-chip__value">
                      {measure.value}
                      {measure.unit && (
                        <span className="geometry-measure-chip__unit">{measure.unit}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="geometry-note">
                <div className="geometry-note__head">
                  <span className="geometry-note__tag">{relationship.tag}</span>
                  <span className="geometry-note__stamp">Proof note</span>
                </div>
                <p className="geometry-note__statement">{relationship.statement}</p>
                <p className="geometry-note__detail">{relationship.detail}</p>
              </div>
            </GlassPanel>
          </div>
        </Reveal>

        <Reveal delay={300} className="geometry-col geometry-col--results">
          <GlassPanel className="geometry-panel geometry-panel--results">
            <div className="geometry-panel__head">
              <div>
                <span className="geometry-section-label">
                  <Ruler aria-hidden="true" />
                  Output
                </span>
                <h3 className="geometry-panel__title">Results &amp; proof</h3>
              </div>
              <span className="geometry-live">Live</span>
            </div>

            <div className="geometry-results-grid">
              {result.properties.map((prop, idx) => (
                <div key={idx} className="geometry-result">
                  <span className="geometry-result__label">{prop.label}</span>
                  <span className="geometry-result__value">
                    {prop.value}
                    {prop.unit && <span className="geometry-result__unit">{prop.unit}</span>}
                  </span>
                </div>
              ))}
            </div>

            {result.properties.length === 0 && (
              <p className="geometry-results-empty">
                No computed values yet. Adjust the inputs until the shape condition is satisfied.
              </p>
            )}

            {result.formula && (
              <div className="geometry-formula-block">
                <span className="geometry-block-label">Standard formula</span>
                <div className="geometry-formula">
                  <MathView math={result.formula} displayMode={true} />
                </div>
              </div>
            )}

            {result.substitution && (
              <div className="geometry-substitution-block">
                <span className="geometry-block-label">Value substitution</span>
                <div className="geometry-substitution">
                  <MathView math={result.substitution} displayMode={true} />
                </div>
              </div>
            )}

            {result.steps.length > 0 && (
              <div className="geometry-steps">
                <span className="geometry-block-label">Derivation steps</span>
                {result.steps.map((step, index) => {
                  const match = step.match(/^(\d+)\.\s*(.*)$/);
                  return (
                    <p key={index} className="geometry-step">
                      <span className="geometry-step__index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{match ? match[2] : step}</span>
                    </p>
                  );
                })}
              </div>
            )}
          </GlassPanel>
        </Reveal>
      </div>
    </div>
  );
};
