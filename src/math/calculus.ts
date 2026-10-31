import { evaluateExpression } from './parser.ts';

export interface DerivativeResult {
  x0: number;
  y0: number;
  slope: number;
  secondDerivative: number;
  tangentEquation: string;
  normalEquation: string;
  isExtremum: boolean;
  concavity: 'up' | 'down' | 'inflection';
}

export function computeDerivative(expr: string, x0: number): DerivativeResult {
  const h = 1e-5;
  const y0 = evaluateExpression(expr, x0);
  const yPlus = evaluateExpression(expr, x0 + h);
  const yMinus = evaluateExpression(expr, x0 - h);

  const slope = (yPlus - yMinus) / (2 * h);
  const secondDerivative = (yPlus - 2 * y0 + yMinus) / (h * h);

  const m = slope;
  const c = y0 - m * x0;
  const signC = c >= 0 ? `+ ${c.toFixed(4)}` : `- ${Math.abs(c).toFixed(4)}`;
  const tangentEquation = `y = ${m.toFixed(4)}x ${signC}`;

  let normalEquation = '';
  if (Math.abs(m) < 1e-6) {
    normalEquation = `x = ${x0.toFixed(4)}`;
  } else {
    const normalM = -1 / m;
    const normalC = y0 - normalM * x0;
    const signNC = normalC >= 0 ? `+ ${normalC.toFixed(4)}` : `- ${Math.abs(normalC).toFixed(4)}`;
    normalEquation = `y = ${normalM.toFixed(4)}x ${signNC}`;
  }

  const isExtremum = Math.abs(slope) < 1e-3;
  let concavity: 'up' | 'down' | 'inflection' = 'inflection';
  if (secondDerivative > 1e-3) concavity = 'up';
  else if (secondDerivative < -1e-3) concavity = 'down';

  return {
    x0,
    y0,
    slope,
    secondDerivative,
    tangentEquation,
    normalEquation,
    isExtremum,
    concavity,
  };
}

export interface DefiniteIntegralResult {
  a: number;
  b: number;
  integralValue: number;
  subintervals: number;
  trapezoidalValue: number;
  simpsonsValue: number;
  partitions: { x: number; y: number }[];
}

export function computeDefiniteIntegral(
  expr: string,
  a: number,
  b: number,
  n: number = 60
): DefiniteIntegralResult {
  if (n % 2 !== 0) n += 1; // ensure even for Simpson's rule
  const h = (b - a) / n;
  const partitions: { x: number; y: number }[] = [];

  let sumTrap = 0;
  let sumSimp = 0;

  for (let i = 0; i <= n; i++) {
    const x = a + i * h;
    const y = evaluateExpression(expr, x);
    partitions.push({ x, y });

    // Trapezoid sum
    if (i === 0 || i === n) {
      sumTrap += y / 2;
    } else {
      sumTrap += y;
    }

    // Simpson sum
    if (i === 0 || i === n) {
      sumSimp += y;
    } else if (i % 2 === 1) {
      sumSimp += 4 * y;
    } else {
      sumSimp += 2 * y;
    }
  }

  const trapezoidalValue = sumTrap * h;
  const simpsonsValue = (sumSimp * h) / 3;

  return {
    a,
    b,
    integralValue: simpsonsValue,
    subintervals: n,
    trapezoidalValue,
    simpsonsValue,
    partitions,
  };
}
