import React, { useState } from 'react';
import { MathView } from './MathView.tsx';
import { Search, ExternalLink, Calculator, ChevronDown, ChevronUp, CheckCircle2, RotateCcw } from 'lucide-react';

export interface FormulaItem {
  id: string;
  name: string;
  category: 'Geometry' | 'Algebra' | 'Calculus' | 'Physics' | 'Statistics' | 'Mensuration';
  level: 'School (9-10)' | 'High School (11-12)' | 'College / STEM';
  latex: string;
  description: string;
  targetTab: string;
  // Side / value putting parameters definition
  hasSideInputs?: boolean;
  inputParams?: {
    key: string;
    label: string;
    defaultValue: number;
    unit?: string;
    min?: number;
    max?: number;
  }[];
  compute?: (inputs: Record<string, number>) => {
    resultLatex: string;
    steps: string[];
    values: { label: string; value: string | number }[];
  };
}

export const FORMULA_CATALOG: FormulaItem[] = [
  {
    id: 'f-pythagoras',
    name: 'Pythagorean Theorem (Sides of Right Triangle)',
    category: 'Geometry',
    level: 'School (9-10)',
    latex: 'a^2 + b^2 = c^2 \\implies c = \\sqrt{a^2 + b^2}',
    description: 'Relates lengths of perpendicular legs a and b to hypotenuse c in any right-angled triangle.',
    targetTab: 'geometry',
    hasSideInputs: true,
    inputParams: [
      { key: 'a', label: 'Side a (Perpendicular Leg)', defaultValue: 3, unit: 'units', min: 0.1 },
      { key: 'b', label: 'Side b (Base Leg)', defaultValue: 4, unit: 'units', min: 0.1 },
    ],
    compute: (vals) => {
      const a = Math.max(0.001, Number(vals.a) || 3);
      const b = Math.max(0.001, Number(vals.b) || 4);
      const c2 = a * a + b * b;
      const c = Math.sqrt(c2);
      const area = 0.5 * a * b;
      const perimeter = a + b + c;
      const alphaDeg = (Math.asin(a / c) * 180) / Math.PI;
      const betaDeg = 90 - alphaDeg;

      return {
        resultLatex: `c = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${(a * a).toFixed(2)} + ${(b * b).toFixed(2)}} = \\mathbf{${c.toFixed(4)}}`,
        steps: [
          `Substitute leg values: a = ${a}, b = ${b}`,
          `Compute squared terms: a² = ${(a * a).toFixed(2)}, b² = ${(b * b).toFixed(2)}`,
          `Sum: a² + b² = ${c2.toFixed(2)}`,
          `Take square root: c = √${c2.toFixed(2)} = ${c.toFixed(4)} units`,
        ],
        values: [
          { label: 'Hypotenuse (c)', value: c.toFixed(4) },
          { label: 'Perimeter (a + b + c)', value: perimeter.toFixed(4) },
          { label: 'Right Triangle Area (½ ab)', value: area.toFixed(4) },
          { label: 'Angle opposite a (α)', value: `${alphaDeg.toFixed(2)}°` },
          { label: 'Angle opposite b (β)', value: `${betaDeg.toFixed(2)}°` },
        ],
      };
    },
  },
  {
    id: 'f-heron',
    name: "Heron's Formula (Area from 3 Sides)",
    category: 'Geometry',
    level: 'School (9-10)',
    latex: 'A = \\sqrt{s(s - a)(s - b)(s - c)}, \\quad s = \\frac{a+b+c}{2}',
    description: 'Computes exact triangle area directly from three side lengths without requiring the altitude.',
    targetTab: 'geometry',
    hasSideInputs: true,
    inputParams: [
      { key: 'a', label: 'Side a', defaultValue: 5, unit: 'units', min: 0.1 },
      { key: 'b', label: 'Side b', defaultValue: 6, unit: 'units', min: 0.1 },
      { key: 'c', label: 'Side c', defaultValue: 7, unit: 'units', min: 0.1 },
    ],
    compute: (vals) => {
      const a = Math.max(0.001, Number(vals.a) || 5);
      const b = Math.max(0.001, Number(vals.b) || 6);
      const c = Math.max(0.001, Number(vals.c) || 7);

      const isValidTriangle = a + b > c && b + c > a && c + a > b;

      if (!isValidTriangle) {
        return {
          resultLatex: '\\text{Triangle Inequality Violated: } a+b > c',
          steps: [
            `Side lengths: a=${a}, b=${b}, c=${c}`,
            `Sum of any two sides must be strictly greater than the third side.`,
            `Here: ${a} + ${b} = ${a + b} ${a + b <= c ? '≤' : '>'} ${c}`,
          ],
          values: [{ label: 'Status', value: 'Invalid triangle sides' }],
        };
      }

      const perimeter = a + b + c;
      const s = perimeter / 2;
      const term = s * (s - a) * (s - b) * (s - c);
      const area = Math.sqrt(term);
      const inradius = area / s;
      const circumradius = (a * b * c) / (4 * area);

      return {
        resultLatex: `A = \\sqrt{${s.toFixed(2)} \\times ${(s - a).toFixed(2)} \\times ${(s - b).toFixed(2)} \\times ${(s - c).toFixed(2)}} = \\mathbf{${area.toFixed(4)}}`,
        steps: [
          `Calculate perimeter: P = ${a} + ${b} + ${c} = ${perimeter.toFixed(2)}`,
          `Calculate semi-perimeter: s = P / 2 = ${s.toFixed(2)}`,
          `Calculate factors: (s - a) = ${(s - a).toFixed(2)}, (s - b) = ${(s - b).toFixed(2)}, (s - c) = ${(s - c).toFixed(2)}`,
          `Product inside radical: ${term.toFixed(4)}`,
          `Area: √${term.toFixed(4)} = ${area.toFixed(4)} sq units`,
        ],
        values: [
          { label: 'Semi-perimeter (s)', value: s.toFixed(4) },
          { label: 'Triangle Area', value: `${area.toFixed(4)} sq units` },
          { label: 'Perimeter', value: `${perimeter.toFixed(2)} units` },
          { label: 'Incircle Radius (r = A/s)', value: inradius.toFixed(4) },
          { label: 'Circumcircle Radius (R)', value: circumradius.toFixed(4) },
        ],
      };
    },
  },
  {
    id: 'f-rect-cuboid',
    name: 'Rectangle & Cuboid (Sides, Area, Volume & Surface)',
    category: 'Mensuration',
    level: 'School (9-10)',
    latex: 'P = 2(l+w), \\quad A = l \\cdot w, \\quad V = l \\cdot w \\cdot h',
    description: 'Computes perimeter, cross-section area, total surface area, volume, and 3D space diagonal from side dimensions.',
    targetTab: 'geometry',
    hasSideInputs: true,
    inputParams: [
      { key: 'l', label: 'Length (l)', defaultValue: 8, unit: 'cm', min: 0.1 },
      { key: 'w', label: 'Width (w)', defaultValue: 5, unit: 'cm', min: 0.1 },
      { key: 'h', label: 'Height (h)', defaultValue: 4, unit: 'cm', min: 0.1 },
    ],
    compute: (vals) => {
      const l = Math.max(0.001, Number(vals.l) || 8);
      const w = Math.max(0.001, Number(vals.w) || 5);
      const h = Math.max(0.001, Number(vals.h) || 4);

      const perimeter2D = 2 * (l + w);
      const area2D = l * w;
      const diag2D = Math.sqrt(l * l + w * w);
      const volume3D = l * w * h;
      const surfaceArea3D = 2 * (l * w + w * h + h * l);
      const lateralSurfaceArea = 2 * h * (l + w);
      const spaceDiag3D = Math.sqrt(l * l + w * w + h * h);

      return {
        resultLatex: `V = ${l} \\times ${w} \\times ${h} = \\mathbf{${volume3D.toFixed(2)}} \\text{ cm}^3, \\quad A_{base} = \\mathbf{${area2D.toFixed(2)}} \\text{ cm}^2`,
        steps: [
          `Base Area: l × w = ${l} × ${w} = ${area2D.toFixed(2)} cm²`,
          `2D Perimeter: 2(l + w) = 2(${l + w}) = ${perimeter2D.toFixed(2)} cm`,
          `Cuboid Volume: l × w × h = ${volume3D.toFixed(2)} cm³`,
          `Total Surface Area: 2(lw + wh + hl) = 2(${l * w} + ${w * h} + ${h * l}) = ${surfaceArea3D.toFixed(2)} cm²`,
          `Space Diagonal: √(l² + w² + h²) = √${(l * l + w * w + h * h).toFixed(2)} = ${spaceDiag3D.toFixed(4)} cm`,
        ],
        values: [
          { label: 'Volume (V)', value: `${volume3D.toFixed(2)} cm³` },
          { label: 'Total Surface Area (TSA)', value: `${surfaceArea3D.toFixed(2)} cm²` },
          { label: 'Lateral Surface Area (LSA)', value: `${lateralSurfaceArea.toFixed(2)} cm²` },
          { label: 'Base Area', value: `${area2D.toFixed(2)} cm²` },
          { label: 'Space Diagonal (d)', value: `${spaceDiag3D.toFixed(4)} cm` },
        ],
      };
    },
  },
  {
    id: 'f-circle-cylinder',
    name: 'Circle & Right Cylinder (Radius & Height)',
    category: 'Mensuration',
    level: 'School (9-10)',
    latex: 'A = \\pi r^2, \\quad C = 2\\pi r, \\quad V = \\pi r^2 h',
    description: 'Calculates circle circumference, base area, cylinder volume, curved surface area, and total surface area.',
    targetTab: 'geometry',
    hasSideInputs: true,
    inputParams: [
      { key: 'r', label: 'Radius (r)', defaultValue: 7, unit: 'cm', min: 0.1 },
      { key: 'h', label: 'Height (h)', defaultValue: 10, unit: 'cm', min: 0.1 },
    ],
    compute: (vals) => {
      const r = Math.max(0.001, Number(vals.r) || 7);
      const h = Math.max(0.001, Number(vals.h) || 10);

      const circumference = 2 * Math.PI * r;
      const baseArea = Math.PI * r * r;
      const volume = baseArea * h;
      const csa = 2 * Math.PI * r * h;
      const tsa = 2 * Math.PI * r * (r + h);

      return {
        resultLatex: `V = \\pi (${r})^2 (${h}) = \\mathbf{${volume.toFixed(2)}} \\text{ cm}^3, \\quad C = \\mathbf{${circumference.toFixed(2)}} \\text{ cm}`,
        steps: [
          `Base Area: π r² = π (${r})² = ${baseArea.toFixed(2)} cm²`,
          `Circumference: 2 π r = 2 π (${r}) = ${circumference.toFixed(2)} cm`,
          `Cylinder Volume: π r² h = ${volume.toFixed(2)} cm³`,
          `Curved Surface Area (CSA): 2 π r h = ${csa.toFixed(2)} cm²`,
          `Total Surface Area (TSA): 2 π r (r + h) = ${tsa.toFixed(2)} cm²`,
        ],
        values: [
          { label: 'Cylinder Volume', value: `${volume.toFixed(2)} cm³` },
          { label: 'Curved Surface Area (CSA)', value: `${csa.toFixed(2)} cm²` },
          { label: 'Total Surface Area (TSA)', value: `${tsa.toFixed(2)} cm²` },
          { label: 'Base Circle Area', value: `${baseArea.toFixed(2)} cm²` },
          { label: 'Base Circumference', value: `${circumference.toFixed(2)} cm` },
        ],
      };
    },
  },
  {
    id: 'f-cone-sphere',
    name: 'Cone & Sphere Mensuration (Radius & Height)',
    category: 'Mensuration',
    level: 'School (9-10)',
    latex: 'V_{cone} = \\frac{1}{3}\\pi r^2 h, \\quad l = \\sqrt{r^2 + h^2}, \\quad V_{sphere} = \\frac{4}{3}\\pi r^3',
    description: 'Computes cone slant height, cone volume, sphere volume, and surface areas from radius and height.',
    targetTab: 'geometry',
    hasSideInputs: true,
    inputParams: [
      { key: 'r', label: 'Radius (r)', defaultValue: 6, unit: 'cm', min: 0.1 },
      { key: 'h', label: 'Cone Height (h)', defaultValue: 8, unit: 'cm', min: 0.1 },
    ],
    compute: (vals) => {
      const r = Math.max(0.001, Number(vals.r) || 6);
      const h = Math.max(0.001, Number(vals.h) || 8);

      const slantHeight = Math.sqrt(r * r + h * h);
      const coneVolume = (1 / 3) * Math.PI * r * r * h;
      const coneCSA = Math.PI * r * slantHeight;
      const coneTSA = Math.PI * r * (r + slantHeight);
      const sphereVolume = (4 / 3) * Math.PI * Math.pow(r, 3);
      const sphereSurfaceArea = 4 * Math.PI * r * r;

      return {
        resultLatex: `l = \\sqrt{${r}^2 + ${h}^2} = \\mathbf{${slantHeight.toFixed(2)}} \\text{ cm}, \\quad V_{cone} = \\mathbf{${coneVolume.toFixed(2)}} \\text{ cm}^3`,
        steps: [
          `Cone Slant Height: l = √(r² + h²) = √(${r * r} + ${h * h}) = ${slantHeight.toFixed(2)} cm`,
          `Cone Volume: ⅓ π r² h = ⅓ π (${r * r}) (${h}) = ${coneVolume.toFixed(2)} cm³`,
          `Cone Curved Surface: π r l = π (${r}) (${slantHeight.toFixed(2)}) = ${coneCSA.toFixed(2)} cm²`,
          `Sphere Volume (same radius): 4/3 π r³ = ${sphereVolume.toFixed(2)} cm³`,
          `Sphere Surface Area: 4 π r² = ${sphereSurfaceArea.toFixed(2)} cm²`,
        ],
        values: [
          { label: 'Cone Slant Height (l)', value: `${slantHeight.toFixed(2)} cm` },
          { label: 'Cone Volume', value: `${coneVolume.toFixed(2)} cm³` },
          { label: 'Cone Total Surface Area', value: `${coneTSA.toFixed(2)} cm²` },
          { label: 'Sphere Volume', value: `${sphereVolume.toFixed(2)} cm³` },
          { label: 'Sphere Surface Area', value: `${sphereSurfaceArea.toFixed(2)} cm²` },
        ],
      };
    },
  },
  {
    id: 'f-coord-dist',
    name: 'Coordinate Distance & Section Formula',
    category: 'Geometry',
    level: 'School (9-10)',
    latex: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
    description: 'Computes Euclidean distance between two coordinate points in the Cartesian plane and midpoint.',
    targetTab: 'geometry',
    hasSideInputs: true,
    inputParams: [
      { key: 'x1', label: 'Point A (x₁)', defaultValue: 1, unit: 'x' },
      { key: 'y1', label: 'Point A (y₁)', defaultValue: 2, unit: 'y' },
      { key: 'x2', label: 'Point B (x₂)', defaultValue: 4, unit: 'x' },
      { key: 'y2', label: 'Point B (y₂)', defaultValue: 6, unit: 'y' },
    ],
    compute: (vals) => {
      const x1 = Number(vals.x1) || 1;
      const y1 = Number(vals.y1) || 2;
      const x2 = Number(vals.x2) || 4;
      const y2 = Number(vals.y2) || 6;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const slope = dx !== 0 ? (dy / dx).toFixed(4) : 'Undefined (Vertical)';

      return {
        resultLatex: `d = \\sqrt{(${x2} - ${x1})^2 + (${y2} - ${y1})^2} = \\sqrt{${(dx * dx).toFixed(2)} + ${(dy * dy).toFixed(2)}} = \\mathbf{${dist.toFixed(4)}}`,
        steps: [
          `Δx = x₂ - x₁ = ${x2} - (${x1}) = ${dx}`,
          `Δy = y₂ - y₁ = ${y2} - (${y1}) = ${dy}`,
          `Sum of squares: Δx² + Δy² = ${dx * dx} + ${dy * dy} = ${dx * dx + dy * dy}`,
          `Distance: √${dx * dx + dy * dy} = ${dist.toFixed(4)} units`,
        ],
        values: [
          { label: 'Distance (d)', value: dist.toFixed(4) },
          { label: 'Midpoint M', value: `(${midX.toFixed(2)}, ${midY.toFixed(2)})` },
          { label: 'Line Slope (m)', value: slope },
          { label: 'Delta X (Δx)', value: dx },
          { label: 'Delta Y (Δy)', value: dy },
        ],
      };
    },
  },
  {
    id: 'f-quad',
    name: 'Quadratic Formula (Roots & Discriminant)',
    category: 'Algebra',
    level: 'School (9-10)',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad D = b^2 - 4ac',
    description: 'Finds exact real or complex roots of any quadratic equation ax² + bx + c = 0.',
    targetTab: 'solver',
    hasSideInputs: true,
    inputParams: [
      { key: 'a', label: 'Coefficient a (x²)', defaultValue: 1, min: -100, max: 100 },
      { key: 'b', label: 'Coefficient b (x)', defaultValue: -5, min: -100, max: 100 },
      { key: 'c', label: 'Constant c', defaultValue: 6, min: -100, max: 100 },
    ],
    compute: (vals) => {
      let a = Number(vals.a);
      if (a === 0) a = 1;
      const b = Number(vals.b) || 0;
      const c = Number(vals.c) || 0;

      const disc = b * b - 4 * a * c;
      const vertexX = -b / (2 * a);
      const vertexY = a * vertexX * vertexX + b * vertexX + c;

      if (disc > 0) {
        const root1 = (-b + Math.sqrt(disc)) / (2 * a);
        const root2 = (-b - Math.sqrt(disc)) / (2 * a);
        return {
          resultLatex: `x_1 = \\mathbf{${root1.toFixed(4)}}, \\quad x_2 = \\mathbf{${root2.toFixed(4)}} \\quad (D = ${disc.toFixed(2)} > 0)`,
          steps: [
            `Discriminant: D = b² - 4ac = (${b})² - 4(${a})(${c}) = ${disc.toFixed(2)}`,
            `D > 0: Two distinct real roots exist`,
            `x₁ = (-(${b}) + √${disc.toFixed(2)}) / (2·${a}) = ${root1.toFixed(4)}`,
            `x₂ = (-(${b}) - √${disc.toFixed(2)}) / (2·${a}) = ${root2.toFixed(4)}`,
          ],
          values: [
            { label: 'Discriminant (D)', value: disc.toFixed(2) },
            { label: 'Root 1 (x₁)', value: root1.toFixed(4) },
            { label: 'Root 2 (x₂)', value: root2.toFixed(4) },
            { label: 'Parabola Vertex', value: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})` },
            { label: 'Nature of Roots', value: 'Two Distinct Real Roots' },
          ],
        };
      } else if (disc === 0) {
        const root = -b / (2 * a);
        return {
          resultLatex: `x_1 = x_2 = \\mathbf{${root.toFixed(4)}} \\quad (D = 0)`,
          steps: [
            `Discriminant: D = (${b})² - 4(${a})(${c}) = 0`,
            `D = 0: Exactly one repeated real root`,
            `x = -b / (2a) = -(${b}) / (2·${a}) = ${root.toFixed(4)}`,
          ],
          values: [
            { label: 'Discriminant (D)', value: '0' },
            { label: 'Repeated Root', value: root.toFixed(4) },
            { label: 'Vertex', value: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})` },
            { label: 'Nature of Roots', value: 'One Repeated Real Root' },
          ],
        };
      } else {
        const realPart = -b / (2 * a);
        const imagPart = Math.sqrt(-disc) / (2 * a);
        return {
          resultLatex: `x = \\mathbf{${realPart.toFixed(4)} \\pm ${Math.abs(imagPart).toFixed(4)}i} \\quad (D = ${disc.toFixed(2)} < 0)`,
          steps: [
            `Discriminant: D = (${b})² - 4(${a})(${c}) = ${disc.toFixed(2)} < 0`,
            `D < 0: No real roots. Two conjugate complex roots exist.`,
            `Real part: -b / 2a = ${realPart.toFixed(4)}`,
            `Imaginary part: √|D| / 2a = ${Math.abs(imagPart).toFixed(4)}`,
          ],
          values: [
            { label: 'Discriminant (D)', value: disc.toFixed(2) },
            { label: 'Complex Roots', value: `${realPart.toFixed(4)} ± ${Math.abs(imagPart).toFixed(4)}i` },
            { label: 'Nature of Roots', value: 'Two Complex Conjugate Roots' },
            { label: 'Parabola Vertex', value: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})` },
          ],
        };
      }
    },
  },
  {
    id: 'f-ohms',
    name: "Ohm's Law & Power Dissipation",
    category: 'Physics',
    level: 'School (9-10)',
    latex: 'V = I \\times R, \\quad P = V \\times I = I^2 R = \\frac{V^2}{R}',
    description: 'Fundamental relationship governing voltage, current, resistance and energy dissipation.',
    targetTab: 'physics',
    hasSideInputs: true,
    inputParams: [
      { key: 'v', label: 'Voltage (V)', defaultValue: 12, unit: 'Volts' },
      { key: 'r', label: 'Resistance (R)', defaultValue: 4, unit: 'Ohms', min: 0.01 },
    ],
    compute: (vals) => {
      const v = Number(vals.v) || 12;
      const r = Math.max(0.001, Number(vals.r) || 4);
      const i = v / r;
      const p = v * i;

      return {
        resultLatex: `I = \\frac{${v}\\text{ V}}{${r}\\;\\Omega} = \\mathbf{${i.toFixed(3)}\\text{ A}}, \\quad P = \\mathbf{${p.toFixed(2)}\\text{ W}}`,
        steps: [
          `Current: I = V / R = ${v} / ${r} = ${i.toFixed(3)} Amperes`,
          `Power: P = V × I = ${v} × ${i.toFixed(3)} = ${p.toFixed(2)} Watts`,
          `Check: I² × R = (${i.toFixed(3)})² × ${r} = ${p.toFixed(2)} W`,
        ],
        values: [
          { label: 'Current (I)', value: `${i.toFixed(3)} A` },
          { label: 'Power (P)', value: `${p.toFixed(2)} W` },
          { label: 'Conductance (G = 1/R)', value: `${(1 / r).toFixed(4)} S` },
        ],
      };
    },
  },
  {
    id: 'f-projectile',
    name: 'Kinematic Projectile Horizontal Range',
    category: 'Physics',
    level: 'High School (11-12)',
    latex: 'R = \\frac{v_0^2 \\sin(2\\theta)}{g}, \\quad H_{max} = \\frac{v_0^2 \\sin^2(\\theta)}{2g}',
    description: 'Computes horizontal range and peak trajectory altitude for launched ballistic projectiles.',
    targetTab: 'physics',
    hasSideInputs: true,
    inputParams: [
      { key: 'v0', label: 'Initial Velocity (v₀)', defaultValue: 25, unit: 'm/s', min: 0.1 },
      { key: 'angle', label: 'Launch Angle (θ)', defaultValue: 45, unit: 'degrees', min: 1, max: 89 },
    ],
    compute: (vals) => {
      const v0 = Math.max(0.1, Number(vals.v0) || 25);
      const angleDeg = Number(vals.angle) || 45;
      const g = 9.81;
      const rad = (angleDeg * Math.PI) / 180;
      const range = (v0 * v0 * Math.sin(2 * rad)) / g;
      const timeOfFlight = (2 * v0 * Math.sin(rad)) / g;
      const maxHeight = (v0 * v0 * Math.pow(Math.sin(rad), 2)) / (2 * g);

      return {
        resultLatex: `R = \\frac{(${v0})^2 \\sin(2 \\times ${angleDeg}^\\circ)}{9.81} = \\mathbf{${range.toFixed(2)}\\text{ m}}`,
        steps: [
          `Launch speed: v₀ = ${v0} m/s at θ = ${angleDeg}°`,
          `Time of Flight: t = 2 v₀ sin(θ) / g = ${timeOfFlight.toFixed(2)} s`,
          `Maximum Altitude: H = v₀² sin²(θ) / 2g = ${maxHeight.toFixed(2)} m`,
          `Horizontal Range: R = v₀² sin(2θ) / g = ${range.toFixed(2)} m`,
        ],
        values: [
          { label: 'Horizontal Range (R)', value: `${range.toFixed(2)} m` },
          { label: 'Max Altitude (H)', value: `${maxHeight.toFixed(2)} m` },
          { label: 'Time of Flight (T)', value: `${timeOfFlight.toFixed(2)} s` },
          { label: 'Optimal Angle for Max Range', value: '45°' },
        ],
      };
    },
  },
  {
    id: 'f-deriv-def',
    name: 'Derivative Definition (Newton Quotient)',
    category: 'Calculus',
    level: 'High School (11-12)',
    latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
    description: 'Defines instantaneous rate of change and tangent slope of a differentiable curve.',
    targetTab: 'graphing',
  },
  {
    id: 'f-simpson',
    name: "Simpson's 1/3 Rule for Numerical Integration",
    category: 'Calculus',
    level: 'College / STEM',
    latex: '\\int_a^b f(x)dx \\approx \\frac{h}{3}\\left[f(x_0) + 4\\sum f(x_{odd}) + 2\\sum f(x_{even}) + f(x_n)\\right]',
    description: 'High-accuracy quadratic polynomial interpolation for definite integration.',
    targetTab: 'graphing',
  },
  {
    id: 'f-normal',
    name: 'Gaussian Normal Probability Density (PDF)',
    category: 'Statistics',
    level: 'College / STEM',
    latex: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2}',
    description: 'Continuous bell curve probability distribution parameterized by mean μ and variance σ².',
    targetTab: 'stem',
  },
];

interface FormulaLibraryProps {
  onNavigateTab: (tabId: string) => void;
}

export const FormulaLibrary: React.FC<FormulaLibraryProps> = ({ onNavigateTab }) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  // Interactive formula parameter state
  const [expandedFormulaId, setExpandedFormulaId] = useState<string | null>('f-pythagoras');
  const [paramValues, setParamValues] = useState<Record<string, Record<string, number>>>({
    'f-pythagoras': { a: 3, b: 4 },
    'f-heron': { a: 5, b: 6, c: 7 },
    'f-rect-cuboid': { l: 8, w: 5, h: 4 },
    'f-circle-cylinder': { r: 7, h: 10 },
    'f-cone-sphere': { r: 6, h: 8 },
    'f-coord-dist': { x1: 1, y1: 2, x2: 4, y2: 6 },
    'f-quad': { a: 1, b: -5, c: 6 },
    'f-ohms': { v: 12, r: 4 },
    'f-projectile': { v0: 25, angle: 45 },
  });

  const handleParamChange = (formulaId: string, paramKey: string, val: number) => {
    setParamValues((prev) => ({
      ...prev,
      [formulaId]: {
        ...(prev[formulaId] || {}),
        [paramKey]: val,
      },
    }));
  };

  const filtered = FORMULA_CATALOG.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || f.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7957F5]/10 border border-[#7957F5]/25 text-[#7957F5] dark:text-purple-300 text-xs font-mono font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Mathematical Compendium</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
            Comprehensive Formula Library
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] max-w-2xl">
            Input side lengths, dimensions and physical parameters directly into formulas for instant step-by-step evaluations.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sides, formulas, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#111321] border border-slate-300 dark:border-white/12 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#7957F5] focus:outline-none shadow-xs"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 thin-scrollbar">
        {['All', 'Geometry', 'Mensuration', 'Algebra', 'Physics', 'Calculus', 'Statistics'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              selectedCat === cat
                ? 'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white shadow-xs font-semibold'
                : 'bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const isExpanded = expandedFormulaId === item.id;
          const currentInputs = paramValues[item.id] || {};
          const computed = item.compute ? item.compute(currentInputs) : null;

          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-[#111321] rounded-2xl border p-4 sm:p-5 transition-all flex flex-col justify-between ${
                isExpanded
                  ? 'border-[#7957F5] ring-2 ring-[#7957F5]/20 shadow-md'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-xs'
              }`}
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-[#7957F5] dark:text-[#D94BCB]">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{item.level}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {item.name}
                </h3>

                {/* KaTeX formula display */}
                <div className="p-2.5 sm:p-3 bg-slate-50 dark:bg-[#0B0D16] rounded-xl border border-slate-100 dark:border-white/[0.06] text-center mb-3 overflow-x-auto min-w-0">
                  <MathView
                    math={item.latex}
                    displayMode={true}
                    className="text-xs sm:text-sm text-slate-900 dark:text-purple-300"
                  />
                </div>

                <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Side / Value Putting Option */}
                {item.hasSideInputs && item.inputParams && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setExpandedFormulaId(isExpanded ? null : item.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <Calculator className="w-3.5 h-3.5 text-[#7957F5]" />
                        <span>Put Values of Sides & Parameters</span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Interactive Value Inputs Panel */}
                    {isExpanded && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10 space-y-3 animate-in fade-in">
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                          Enter Side Dimensions:
                        </div>

                        {/* Input Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          {item.inputParams.map((param) => {
                            const val = currentInputs[param.key] ?? param.defaultValue;
                            return (
                              <div key={param.key} className="space-y-1">
                                <label className="text-[10px] font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
                                  <span>{param.label.split('(')[0]}</span>
                                  {param.unit && <span className="text-[9px] text-slate-400">[{param.unit}]</span>}
                                </label>
                                <input
                                  type="number"
                                  step="any"
                                  min={param.min}
                                  max={param.max}
                                  value={val}
                                  onChange={(e) =>
                                    handleParamChange(item.id, param.key, parseFloat(e.target.value) || 0)
                                  }
                                  className="w-full px-2 py-1 rounded-lg bg-white dark:bg-[#111321] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:ring-1 focus:ring-[#7957F5] focus:outline-none"
                                />
                              </div>
                            );
                          })}
                        </div>

                        {/* Live Step-by-Step Computed Output */}
                        {computed && (
                          <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2">
                            <div className="text-[10px] font-mono text-[#7957F5] dark:text-[#D94BCB] font-bold uppercase tracking-wider">
                              Calculated Result:
                            </div>

                            <div className="p-2 rounded-lg bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 text-center min-w-0">
                              <MathView
                                math={computed.resultLatex}
                                displayMode={true}
                                className="text-xs text-slate-900 dark:text-emerald-400 font-semibold"
                              />
                            </div>

                            {/* Summary Values Grid */}
                            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                              {computed.values.map((v, idx) => (
                                <div
                                  key={idx}
                                  className="p-1.5 rounded-md bg-slate-100 dark:bg-white/[0.04] flex flex-col"
                                >
                                  <span className="text-slate-500 dark:text-slate-400 text-[10px] truncate">
                                    {v.label}
                                  </span>
                                  <span className="font-bold text-slate-900 dark:text-white truncate">
                                    {v.value}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Step proofs list */}
                            <details className="text-[11px] font-mono text-slate-600 dark:text-slate-400 cursor-pointer pt-1">
                              <summary className="hover:text-slate-900 dark:hover:text-white">
                                View Derivation Steps ({computed.steps.length})
                              </summary>
                              <ul className="mt-1 space-y-1 pl-2 border-l-2 border-purple-400/40 text-[10px]">
                                {computed.steps.map((st, i) => (
                                  <li key={i}>{st}</li>
                                ))}
                              </ul>
                            </details>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Action */}
              <button
                type="button"
                onClick={() => onNavigateTab(item.targetTab)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#7957F5] hover:text-white dark:bg-white/[0.06] dark:hover:bg-[#7957F5] dark:hover:text-white text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer group mt-2"
              >
                <span>Launch Interactive Workbench</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
