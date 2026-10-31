/**
 * Equation solving and algebra engine with step-by-step mathematical proofs.
 */

export interface QuadraticSolution {
  a: number;
  b: number;
  c: number;
  discriminant: number;
  rootType: 'two-real' | 'one-real' | 'complex';
  roots: { real: number; imag?: number }[];
  vertex: { x: number; y: number };
  axisOfSymmetry: number;
  yIntercept: number;
  steps: string[];
  latexFormula: string;
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticSolution | null {
  if (a === 0) return null; // Degenerate linear equation

  const d = b * b - 4 * a * c;
  const vx = -b / (2 * a);
  const vy = a * vx * vx + b * vx + c;
  const steps: string[] = [];

  steps.push(`Standard Form: ${a}x² + (${b})x + (${c}) = 0`);
  steps.push(`1. Calculate Discriminant: Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${b * b} - (${4 * a * c}) = ${d}`);

  let rootType: QuadraticSolution['rootType'] = 'two-real';
  const roots: { real: number; imag?: number }[] = [];

  if (d > 0) {
    rootType = 'two-real';
    const r1 = (-b + Math.sqrt(d)) / (2 * a);
    const r2 = (-b - Math.sqrt(d)) / (2 * a);
    roots.push({ real: r1 }, { real: r2 });
    steps.push(`2. Since Δ > 0, there are two distinct real roots.`);
    steps.push(`3. x1 = (-b + √Δ)/(2a) = (${-b} + ${Math.sqrt(d).toFixed(4)})/${2 * a} = ${r1.toFixed(4)}`);
    steps.push(`4. x2 = (-b - √Δ)/(2a) = (${-b} - ${Math.sqrt(d).toFixed(4)})/${2 * a} = ${r2.toFixed(4)}`);
  } else if (d === 0) {
    rootType = 'one-real';
    const r = -b / (2 * a);
    roots.push({ real: r });
    steps.push(`2. Since Δ = 0, there is one repeated real root.`);
    steps.push(`3. x = -b/(2a) = ${-b}/${2 * a} = ${r.toFixed(4)}`);
  } else {
    rootType = 'complex';
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-d) / (2 * a);
    roots.push({ real: realPart, imag: Math.abs(imagPart) }, { real: realPart, imag: -Math.abs(imagPart) });
    steps.push(`2. Since Δ < 0, there are two complex conjugate roots.`);
    steps.push(`3. x = ${realPart.toFixed(4)} ± ${Math.abs(imagPart).toFixed(4)}i`);
  }

  steps.push(`5. Vertex of Parabola: V(h, k) where h = -b/(2a) = ${vx.toFixed(4)}, k = f(h) = ${vy.toFixed(4)}`);
  steps.push(`6. Axis of symmetry: x = ${vx.toFixed(4)}`);
  steps.push(`7. Y-intercept: (0, ${c})`);

  return {
    a,
    b,
    c,
    discriminant: d,
    rootType,
    roots,
    vertex: { x: vx, y: vy },
    axisOfSymmetry: vx,
    yIntercept: c,
    steps,
    latexFormula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
  };
}

export interface LinearSystem2x2 {
  x: number;
  y: number;
  status: 'unique' | 'inconsistent' | 'dependent';
  D: number;
  Dx: number;
  Dy: number;
  steps: string[];
}

export function solveSystem2x2(
  a1: number, b1: number, c1: number,
  a2: number, b2: number, c2: number
): LinearSystem2x2 {
  // a1*x + b1*y = c1
  // a2*x + b2*y = c2
  const D = a1 * b2 - a2 * b1;
  const Dx = c1 * b2 - c2 * b1;
  const Dy = a1 * c2 - a2 * c1;
  const steps: string[] = [
    `System:`,
    `  (1) ${a1}x + ${b1}y = ${c1}`,
    `  (2) ${a2}x + ${b2}y = ${c2}`,
    `Applying Cramer's Rule:`,
    `  D  = (${a1})(${b2}) - (${a2})(${b1}) = ${D}`,
    `  Dx = (${c1})(${b2}) - (${c2})(${b1}) = ${Dx}`,
    `  Dy = (${a1})(${c2}) - (${a2})(${c1}) = ${Dy}`,
  ];

  if (Math.abs(D) < 1e-10) {
    if (Math.abs(Dx) < 1e-10 && Math.abs(Dy) < 1e-10) {
      steps.push(`Since D = Dx = Dy = 0, the lines coincide. System has infinitely many solutions (dependent).`);
      return { x: 0, y: 0, status: 'dependent', D, Dx, Dy, steps };
    } else {
      steps.push(`Since D = 0 but Dx or Dy ≠ 0, the lines are parallel. System has no solution (inconsistent).`);
      return { x: 0, y: 0, status: 'inconsistent', D, Dx, Dy, steps };
    }
  }

  const x = Dx / D;
  const y = Dy / D;
  steps.push(`Unique Solution:`);
  steps.push(`  x = Dx / D = ${Dx} / ${D} = ${x.toFixed(4)}`);
  steps.push(`  y = Dy / D = ${Dy} / ${D} = ${y.toFixed(4)}`);
  steps.push(`Verification:`);
  steps.push(`  Eq 1: ${a1}(${x.toFixed(2)}) + ${b1}(${y.toFixed(2)}) = ${(a1 * x + b1 * y).toFixed(2)} ≈ ${c1}`);
  steps.push(`  Eq 2: ${a2}(${x.toFixed(2)}) + ${b2}(${y.toFixed(2)}) = ${(a2 * x + b2 * y).toFixed(2)} ≈ ${c2}`);

  return { x, y, status: 'unique', D, Dx, Dy, steps };
}
