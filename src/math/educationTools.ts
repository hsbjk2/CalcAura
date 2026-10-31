/**
 * Pure Mathematical & Scientific Computing Algorithms for Education-Based Tools
 * Covers Class 10, Class 12, Engineering, and Graduation levels.
 */

// ==========================================
// 1. CLASS 10 MATHEMATICS ALGORITHMS
// ==========================================

/** Euclidean Greatest Common Divisor */
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

/** Least Common Multiple */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(Math.round((a * b) / gcd(a, b)));
}

/** Prime factorization of integer n >= 2 */
export function primeFactorization(n: number): { factors: number[]; powers: Record<number, number>; formatted: string } {
  let val = Math.abs(Math.round(n));
  if (val < 2) return { factors: [val], powers: { [val]: 1 }, formatted: `${val}` };

  const factors: number[] = [];
  const powers: Record<number, number> = {};

  let d = 2;
  while (d * d <= val) {
    if (val % d === 0) {
      factors.push(d);
      powers[d] = (powers[d] || 0) + 1;
      val = Math.floor(val / d);
    } else {
      d = d === 2 ? 3 : d + 2;
    }
  }
  if (val > 1) {
    factors.push(val);
    powers[val] = (powers[val] || 0) + 1;
  }

  const formatted = Object.entries(powers)
    .map(([prime, p]) => (p > 1 ? `${prime}^${p}` : `${prime}`))
    .join(' \\times ');

  return { factors, powers, formatted };
}

/** Arithmetic Progression solver (first term a, common diff d, index n) */
export function calcArithmeticProgression(a: number, d: number, n: number): { nthTerm: number; sumN: number; series: number[] } {
  const count = Math.max(1, Math.min(100, Math.round(n)));
  const nthTerm = a + (count - 1) * d;
  const sumN = (count / 2) * (2 * a + (count - 1) * d);
  const series: number[] = [];
  for (let i = 0; i < Math.min(count, 8); i++) {
    series.push(a + i * d);
  }
  return { nthTerm, sumN, series };
}

/** 2D Coordinate Distance formula between (x1, y1) and (x2, y2) */
export function calcDistance2D(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/** 2D Section formula dividing line segment in ratio m : n internally */
export function calcSectionFormula(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  m: number,
  n: number
): { x: number; y: number } {
  const denom = m + n;
  if (denom === 0) return { x: NaN, y: NaN };
  return {
    x: (m * x2 + n * x1) / denom,
    y: (m * y2 + n * y1) / denom,
  };
}

/** Cartesian Triangle Area using Shoelace formula */
export function calcCartesianTriangleArea(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): number {
  return 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
}

/** Trigonometric ratios for angle in degrees */
export function calcTrigRatios(degrees: number): {
  sin: number;
  cos: number;
  tan: number | null;
  cot: number | null;
  sec: number | null;
  cosec: number | null;
} {
  const rad = (degrees * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.abs(cos) < 1e-12 ? null : sin / cos;
  const cot = Math.abs(sin) < 1e-12 ? null : cos / sin;
  const sec = Math.abs(cos) < 1e-12 ? null : 1 / cos;
  const cosec = Math.abs(sin) < 1e-12 ? null : 1 / sin;

  return { sin, cos, tan, cot, sec, cosec };
}

/** Heights and Distances: height h given distance d and angle of elevation theta deg */
export function calcHeightsAndDistances(distance: number, elevationDeg: number): number {
  const rad = (elevationDeg * Math.PI) / 180;
  return distance * Math.tan(rad);
}

/** Marks and Percentage calculator */
export function calcMarksPercentage(obtained: number, total: number): { percentage: number; grade: string } {
  if (total <= 0) return { percentage: 0, grade: 'N/A' };
  const percentage = (obtained / total) * 100;
  let grade = 'F';
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';
  else if (percentage >= 33) grade = 'E';

  return { percentage, grade };
}

// ==========================================
// 2. CLASS 12 MATHEMATICS ALGORITHMS
// ==========================================

/** Inverse Trigonometric Functions evaluation in radians & degrees */
export function calcInverseTrig(
  val: number,
  fn: 'arcsin' | 'arccos' | 'arctan'
): { rad: number | null; deg: number | null; valid: boolean } {
  if (fn === 'arcsin') {
    if (val < -1 || val > 1) return { rad: null, deg: null, valid: false };
    const rad = Math.asin(val);
    return { rad, deg: (rad * 180) / Math.PI, valid: true };
  }
  if (fn === 'arccos') {
    if (val < -1 || val > 1) return { rad: null, deg: null, valid: false };
    const rad = Math.acos(val);
    return { rad, deg: (rad * 180) / Math.PI, valid: true };
  }
  const rad = Math.atan(val);
  return { rad, deg: (rad * 180) / Math.PI, valid: true };
}

/** Vector dot product in 3D */
export function dotProduct3D(a: [number, number, number], b: [number, number, number]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/** Vector cross product in 3D */
export function crossProduct3D(
  a: [number, number, number],
  b: [number, number, number]
): [number, number, number] {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

/** Magnitude of 3D vector */
export function vectorMagnitude3D(v: [number, number, number]): number {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

/** Angle between two 3D vectors in degrees */
export function angleBetweenVectors3D(
  a: [number, number, number],
  b: [number, number, number]
): number {
  const dot = dotProduct3D(a, b);
  const magA = vectorMagnitude3D(a);
  const magB = vectorMagnitude3D(b);
  if (magA === 0 || magB === 0) return 0;
  const cosTheta = Math.max(-1, Math.min(1, dot / (magA * magB)));
  return (Math.acos(cosTheta) * 180) / Math.PI;
}

/** 3D Euclidean distance between (x1, y1, z1) and (x2, y2, z2) */
export function calcDistance3D(
  p1: [number, number, number],
  p2: [number, number, number]
): number {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dz = p2[2] - p1[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/** Conditional Probability P(A | B) = P(A ∩ B) / P(B) */
export function calcConditionalProbability(pIntersection: number, pCondition: number): number {
  if (pCondition <= 0 || pCondition > 1 || pIntersection < 0 || pIntersection > pCondition) return NaN;
  return pIntersection / pCondition;
}

/** Bayes' Theorem posterior P(A | B) = P(B | A) * P(A) / P(B) */
export function calcBayesTheorem(pBgivenA: number, pA: number, pB: number): number {
  if (pB <= 0 || pA < 0 || pBgivenA < 0) return NaN;
  return (pBgivenA * pA) / pB;
}

/** Binomial probability P(X = k) = nCk * p^k * (1-p)^(n-k) */
export function calcBinomialProb(n: number, k: number, p: number): number {
  if (k < 0 || k > n || p < 0 || p > 1) return 0;
  let coeff = 1;
  for (let i = 1; i <= k; i++) {
    coeff = (coeff * (n - (k - i))) / i;
  }
  return coeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

// ==========================================
// 3. ENGINEERING TOOLS ALGORITHMS
// ==========================================

/** Simpson's 1/3 Rule for numerical integration of f(x) over [a, b] */
export function simpsonsRule(f: (x: number) => number, a: number, b: number, intervals = 100): number {
  const n = intervals % 2 === 0 ? intervals : intervals + 1;
  const h = (b - a) / n;
  let sum = f(a) + f(b);

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += i % 2 === 0 ? 2 * f(x) : 4 * f(x);
  }
  return (h / 3) * sum;
}

/** Newton-Raphson single step: x_next = x - f(x) / f'(x) */
export function newtonRaphsonStep(f: (x: number) => number, fPrime: (x: number) => number, x0: number): { x1: number; delta: number } {
  const df = fPrime(x0);
  if (Math.abs(df) < 1e-12) return { x1: x0, delta: 0 };
  const x1 = x0 - f(x0) / df;
  return { x1, delta: Math.abs(x1 - x0) };
}

/** Bisection method for root finding over [a, b] */
export function bisectionMethod(
  f: (x: number) => number,
  a: number,
  b: number,
  tolerance = 1e-5,
  maxIter = 50
): { root: number; iterations: number; converged: boolean } {
  let low = a;
  let high = b;
  if (f(low) * f(high) > 0) {
    return { root: (low + high) / 2, iterations: 0, converged: false };
  }

  let mid = low;
  let iter = 0;
  while (iter < maxIter && (high - low) / 2 > tolerance) {
    mid = (low + high) / 2;
    if (Math.abs(f(mid)) < 1e-12) break;
    if (f(low) * f(mid) < 0) {
      high = mid;
    } else {
      low = mid;
    }
    iter++;
  }
  return { root: mid, iterations: iter, converged: true };
}

/** Electrical series and parallel resistance */
export function calcCircuitResistance(resistors: number[], mode: 'series' | 'parallel'): number {
  if (resistors.length === 0) return 0;
  if (mode === 'series') {
    return resistors.reduce((acc, r) => acc + r, 0);
  }
  const sumInv = resistors.reduce((acc, r) => (r > 0 ? acc + 1 / r : acc), 0);
  return sumInv > 0 ? 1 / sumInv : 0;
}

/** Voltage divider: V_out = V_in * (R2 / (R1 + R2)) */
export function calcVoltageDivider(vIn: number, r1: number, r2: number): number {
  const denom = r1 + r2;
  if (denom === 0) return 0;
  return vIn * (r2 / denom);
}

/** AC Circuit Impedance Z = sqrt(R^2 + (X_L - X_C)^2) */
export function calcAcImpedance(r: number, f: number, l: number, c: number): {
  z: number;
  xl: number;
  xc: number;
  phaseDeg: number;
} {
  const omega = 2 * Math.PI * f;
  const xl = omega * l;
  const xc = c > 0 ? 1 / (omega * c) : 0;
  const reactance = xl - xc;
  const z = Math.sqrt(r * r + reactance * reactance);
  const phaseDeg = (Math.atan2(reactance, r) * 180) / Math.PI;

  return { z, xl, xc, phaseDeg };
}

/** Mechanical Stress and Strain */
export function calcStressStrain(forceN: number, areaM2: number, deltaL: number, lengthL: number): {
  stressPa: number;
  strain: number;
  youngsModulusPa: number;
} {
  const stressPa = areaM2 > 0 ? forceN / areaM2 : 0;
  const strain = lengthL > 0 ? deltaL / lengthL : 0;
  const youngsModulusPa = strain > 0 ? stressPa / strain : 0;

  return { stressPa, strain, youngsModulusPa };
}

/** Simply supported beam with point load P at distance 'a' from left support A, span L */
export function calcBeamReaction(spanL: number, loadP: number, loadPosA: number): {
  reactionA: number;
  reactionB: number;
  maxBendingMoment: number;
} {
  if (spanL <= 0) return { reactionA: 0, reactionB: 0, maxBendingMoment: 0 };
  const b = spanL - loadPosA;
  const reactionA = (loadP * b) / spanL;
  const reactionB = (loadP * loadPosA) / spanL;
  const maxBendingMoment = (loadP * loadPosA * b) / spanL;

  return { reactionA, reactionB, maxBendingMoment };
}

/** Concrete Volume estimator for slab (length × width × thickness + waste%) */
export function calcConcreteVolume(lengthM: number, widthM: number, thicknessM: number, wastePct = 5): {
  volumeM3: number;
  bags50kg: number;
} {
  const netVol = lengthM * widthM * thicknessM;
  const volumeM3 = netVol * (1 + wastePct / 100);
  // ~7 bags of 50kg cement per cubic meter for standard M20 mix
  const bags50kg = Math.ceil(volumeM3 * 7);
  return { volumeM3, bags50kg };
}

/** Binary / Decimal / Hexadecimal converter */
export function convertNumberBases(numStr: string, fromBase: 2 | 8 | 10 | 16): {
  bin: string;
  oct: string;
  dec: number;
  hex: string;
} {
  const dec = parseInt(numStr.trim(), fromBase);
  if (isNaN(dec)) return { bin: '0', oct: '0', dec: 0, hex: '0' };
  return {
    bin: dec.toString(2),
    oct: dec.toString(8),
    dec,
    hex: dec.toString(16).toUpperCase(),
  };
}

/** Min-Max Normalization to [0, 1] and Z-Score standardization */
export function normalizeValues(values: number[]): { minMax: number[]; zScores: number[] } {
  if (values.length === 0) return { minMax: [], zScores: [] };
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / values.length;
  const std = Math.sqrt(variance) || 1;

  const minMax = values.map((v) => (v - min) / range);
  const zScores = values.map((v) => (v - mean) / std);

  return { minMax, zScores };
}

// ==========================================
// 4. GRADUATION TOOLS ALGORITHMS
// ==========================================

/** Complex number representation and arithmetic */
export interface ComplexNumber {
  re: number;
  im: number;
}

export function complexAdd(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function complexMultiply(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

export function complexDivide(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  const denom = b.re * b.re + b.im * b.im;
  if (denom === 0) return { re: NaN, im: NaN };
  return {
    re: (a.re * b.re + a.im * b.im) / denom,
    im: (a.im * b.re - a.re * b.im) / denom,
  };
}

export function complexPolar(c: ComplexNumber): { r: number; thetaDeg: number; thetaRad: number } {
  const r = Math.sqrt(c.re * c.re + c.im * c.im);
  const thetaRad = Math.atan2(c.im, c.re);
  return { r, thetaDeg: (thetaRad * 180) / Math.PI, thetaRad };
}

/** Permutations nPr = n! / (n - r)! */
export function permutations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let p = 1;
  for (let i = 0; i < r; i++) {
    p *= n - i;
  }
  return p;
}

/** Combinations nCr = n! / (r! (n - r)!) */
export function combinations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  const k = Math.min(r, n - r);
  let c = 1;
  for (let i = 1; i <= k; i++) {
    c = (c * (n - (k - i))) / i;
  }
  return c;
}

/** Modular Arithmetic: (a mod m) and modular multiplicative inverse using Extended Euclidean */
export function modInverse(a: number, m: number): number | null {
  let [t, newT] = [0, 1];
  let [r, newR] = [m, a % m];

  while (newR !== 0) {
    const q = Math.floor(r / newR);
    [t, newT] = [newT, t - q * newT];
    [r, newR] = [newR, r - q * newR];
  }

  if (r > 1) return null; // Not invertible
  if (t < 0) t += m;
  return t;
}

/** Poisson Distribution P(X = k) = (lambda^k * e^-lambda) / k! */
export function calcPoissonProb(lambda: number, k: number): number {
  if (lambda <= 0 || k < 0) return 0;
  let factorial = 1;
  for (let i = 1; i <= k; i++) factorial *= i;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial;
}

// ==========================================
// 5. EXTENDED ALGORITHMS FOR ALL LEVELS
// ==========================================

/** Circle geometry & sector mensuration */
export function calcCircleMensuration(radius: number, sectorAngleDeg = 360): {
  diameter: number;
  circumference: number;
  area: number;
  arcLength: number;
  sectorArea: number;
} {
  const r = Math.max(0, radius);
  const diameter = 2 * r;
  const circumference = 2 * Math.PI * r;
  const area = Math.PI * r * r;
  const theta = Math.max(0, Math.min(360, sectorAngleDeg));
  const arcLength = (theta / 360) * circumference;
  const sectorArea = (theta / 360) * area;
  return { diameter, circumference, area, arcLength, sectorArea };
}

/** 3D Solid Surface Area & Volume */
export function calc3DSolidMensuration(solid: 'cylinder' | 'cone' | 'sphere' | 'cuboid', dims: Record<string, number>): {
  surfaceArea: number;
  volume: number;
} {
  if (solid === 'cylinder') {
    const r = dims.r || 1;
    const h = dims.h || 1;
    const surfaceArea = 2 * Math.PI * r * (r + h);
    const volume = Math.PI * r * r * h;
    return { surfaceArea, volume };
  }
  if (solid === 'cone') {
    const r = dims.r || 1;
    const h = dims.h || 1;
    const l = Math.sqrt(r * r + h * h);
    const surfaceArea = Math.PI * r * (r + l);
    const volume = (1 / 3) * Math.PI * r * r * h;
    return { surfaceArea, volume };
  }
  if (solid === 'sphere') {
    const r = dims.r || 1;
    const surfaceArea = 4 * Math.PI * r * r;
    const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
    return { surfaceArea, volume };
  }
  // Cuboid: l, w, h
  const l = dims.l || 1;
  const w = dims.w || 1;
  const h = dims.h || 1;
  const surfaceArea = 2 * (l * w + w * h + h * l);
  const volume = l * w * h;
  return { surfaceArea, volume };
}

/** Right triangle solver given side1, side2 or side + angle */
export function solveRightTriangle(params: { a?: number; b?: number; c?: number; angleDeg?: number }): {
  a: number;
  b: number;
  c: number;
  angleA: number;
  angleB: number;
  area: number;
} {
  let a = params.a || 0;
  let b = params.b || 0;
  let c = params.c || 0;

  if (a > 0 && b > 0) {
    c = Math.sqrt(a * a + b * b);
  } else if (a > 0 && c > a) {
    b = Math.sqrt(c * c - a * a);
  } else if (b > 0 && c > b) {
    a = Math.sqrt(c * c - b * b);
  } else if (a > 0 && params.angleDeg) {
    const rad = (params.angleDeg * Math.PI) / 180;
    b = a / Math.tan(rad);
    c = a / Math.sin(rad);
  } else {
    a = 3;
    b = 4;
    c = 5;
  }

  const angleA = (Math.asin(a / c) * 180) / Math.PI;
  const angleB = 90 - angleA;
  const area = 0.5 * a * b;

  return { a, b, c, angleA, angleB, area };
}

/** Fraction and Decimal Converter */
export function convertFractionDecimal(num: number, den: number): {
  decimal: number;
  simplifiedNum: number;
  simplifiedDen: number;
  isTerminating: boolean;
  latex: string;
} {
  const g = gcd(num, den) || 1;
  const sNum = num / g;
  const sDen = den / g;
  const decimal = sNum / sDen;

  // Check if denominator only has prime factors 2 and 5 (terminating)
  let d = Math.abs(sDen);
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  const isTerminating = d === 1;

  const latex = `\\frac{${sNum}}{${sDen}} = ${decimal.toFixed(isTerminating ? 4 : 6)}${isTerminating ? '' : '\\dots'}`;
  return { decimal, simplifiedNum: sNum, simplifiedDen: sDen, isTerminating, latex };
}

/** Grouped Data Mean using Direct & Assumed Mean methods */
export function calcGroupedDataMean(classes: { lower: number; upper: number; f: number }[]): {
  totalF: number;
  mean: number;
  classMarks: number[];
  table: { interval: string; xi: number; fi: number; fixi: number }[];
} {
  let totalF = 0;
  let sumFiXi = 0;
  const classMarks: number[] = [];
  const table = classes.map((c) => {
    const xi = (c.lower + c.upper) / 2;
    classMarks.push(xi);
    const fixi = c.f * xi;
    totalF += c.f;
    sumFiXi += fixi;
    return {
      interval: `${c.lower} - ${c.upper}`,
      xi,
      fi: c.f,
      fixi,
    };
  });

  const mean = totalF > 0 ? sumFiXi / totalF : 0;
  return { totalF, mean, classMarks, table };
}

/** Direction Cosines and Ratios for 3D vector [a, b, c] */
export function calcDirectionCosines(a: number, b: number, c: number): {
  magnitude: number;
  l: number;
  m: number;
  n: number;
  anglesDeg: { alpha: number; beta: number; gamma: number };
} {
  const mag = Math.sqrt(a * a + b * b + c * c);
  if (mag === 0) {
    return { magnitude: 0, l: 0, m: 0, n: 0, anglesDeg: { alpha: 90, beta: 90, gamma: 90 } };
  }
  const l = a / mag;
  const m = b / mag;
  const n = c / mag;
  const alpha = (Math.acos(Math.max(-1, Math.min(1, l))) * 180) / Math.PI;
  const beta = (Math.acos(Math.max(-1, Math.min(1, m))) * 180) / Math.PI;
  const gamma = (Math.acos(Math.max(-1, Math.min(1, n))) * 180) / Math.PI;

  return { magnitude: mag, l, m, n, anglesDeg: { alpha, beta, gamma } };
}

/** Tangent and Normal lines to f(x) at x0 using numerical derivative */
export function calcTangentNormal(f: (x: number) => number, x0: number): {
  y0: number;
  tangentSlope: number;
  normalSlope: number | null;
  tangentEq: string;
  normalEq: string;
} {
  const h = 1e-5;
  const y0 = f(x0);
  const m = (f(x0 + h) - f(x0 - h)) / (2 * h);

  const tC = y0 - m * x0;
  const tangentEq = `y = ${m.toFixed(3)}x ${tC >= 0 ? '+' : '-'} ${Math.abs(tC).toFixed(3)}`;

  let normalSlope: number | null = null;
  let normalEq = 'Vertical line x = ' + x0.toFixed(3);
  if (Math.abs(m) > 1e-9) {
    normalSlope = -1 / m;
    const nC = y0 - normalSlope * x0;
    normalEq = `y = ${normalSlope.toFixed(3)}x ${nC >= 0 ? '+' : '-'} ${Math.abs(nC).toFixed(3)}`;
  }

  return { y0, tangentSlope: m, normalSlope, tangentEq, normalEq };
}

/** Runge-Kutta 4th Order (RK4) single step for dy/dx = f(x, y) */
export function rk4Step(f: (x: number, y: number) => number, x: number, y: number, h: number): number {
  const k1 = h * f(x, y);
  const k2 = h * f(x + 0.5 * h, y + 0.5 * k1);
  const k3 = h * f(x + 0.5 * h, y + 0.5 * k2);
  const k4 = h * f(x + h, y + k3);
  return y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
}

/** Mohr's Circle 2D Principal Stresses and Max In-Plane Shear */
export function calcMohrsCircle(sigmaX: number, sigmaY: number, tauXY: number): {
  sigmaAvg: number;
  radius: number;
  sigma1: number;
  sigma2: number;
  tauMax: number;
  principalAngleDeg: number;
} {
  const sigmaAvg = (sigmaX + sigmaY) / 2;
  const radius = Math.sqrt(Math.pow((sigmaX - sigmaY) / 2, 2) + Math.pow(tauXY, 2));
  const sigma1 = sigmaAvg + radius;
  const sigma2 = sigmaAvg - radius;
  const tauMax = radius;
  const thetaP = (0.5 * Math.atan2(2 * tauXY, sigmaX - sigmaY) * 180) / Math.PI;

  return { sigmaAvg, radius, sigma1, sigma2, tauMax, principalAngleDeg: thetaP };
}

/** Fluid Mechanics: Reynolds Number and flow classification */
export function calcReynoldsNumber(density: number, velocity: number, diameter: number, viscosity: number): {
  reynoldsNumber: number;
  flowRegime: 'Laminar' | 'Transitional' | 'Turbulent';
} {
  if (viscosity <= 0) return { reynoldsNumber: 0, flowRegime: 'Laminar' };
  const re = (density * velocity * diameter) / viscosity;
  let flowRegime: 'Laminar' | 'Transitional' | 'Turbulent' = 'Laminar';
  if (re > 4000) flowRegime = 'Turbulent';
  else if (re >= 2100) flowRegime = 'Transitional';

  return { reynoldsNumber: re, flowRegime };
}

/** Thermodynamics Carnot Efficiency & Ideal Gas Law */
export function calcThermodynamics(tempHotK: number, tempColdK: number, pKPa: number, vM3: number, nMoles: number): {
  carnotEfficiency: number;
  gasTemperatureK: number;
} {
  const eta = tempHotK > 0 ? Math.max(0, 1 - tempColdK / tempHotK) : 0;
  // PV = nRT -> T = PV / (nR), R = 8.314 J/(mol K)
  const R = 8.314;
  const gasT = nMoles > 0 ? (pKPa * 1000 * vM3) / (nMoles * R) : 0;
  return { carnotEfficiency: eta, gasTemperatureK: gasT };
}

/** Standard Normal CDF approximation (Abramowitz & Stegun) */
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - prob : prob;
}

/** Series Convergence Ratio Test for sum(a_n) */
export function ratioTest(ratioLimit: number): { status: 'Converges' | 'Diverges' | 'Inconclusive'; text: string } {
  if (ratioLimit < 1) {
    return { status: 'Converges', text: 'L < 1: The infinite series converges absolutely.' };
  }
  if (ratioLimit > 1) {
    return { status: 'Diverges', text: 'L > 1: The infinite series diverges.' };
  }
  return { status: 'Inconclusive', text: 'L = 1: The ratio test is inconclusive; alternate test required.' };
}

/** Linear regression: y = mx + c from paired points (x, y) */
export function calcLinearRegression(pts: { x: number; y: number }[]): {
  slope: number;
  intercept: number;
  r2: number;
} {
  const n = pts.length;
  if (n < 2) return { slope: 0, intercept: 0, r2: 0 };

  const sumX = pts.reduce((a, p) => a + p.x, 0);
  const sumY = pts.reduce((a, p) => a + p.y, 0);
  const sumXY = pts.reduce((a, p) => a + p.x * p.y, 0);
  const sumX2 = pts.reduce((a, p) => a + p.x * p.x, 0);
  const sumY2 = pts.reduce((a, p) => a + p.y * p.y, 0);

  const denom = n * sumX2 - sumX * sumX;
  if (Math.abs(denom) < 1e-12) return { slope: 0, intercept: 0, r2: 0 };

  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;

  const numR = n * sumXY - sumX * sumY;
  const denomR = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  const r2 = denomR > 0 ? (numR / denomR) ** 2 : 0;

  return { slope, intercept, r2 };
}
