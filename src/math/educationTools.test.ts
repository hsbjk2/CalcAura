import test from 'node:test';
import assert from 'node:assert/strict';
import {
  gcd,
  lcm,
  primeFactorization,
  calcArithmeticProgression,
  calcDistance2D,
  calcSectionFormula,
  calcCartesianTriangleArea,
  calcTrigRatios,
  calcMarksPercentage,
  calcInverseTrig,
  dotProduct3D,
  crossProduct3D,
  angleBetweenVectors3D,
  calcDistance3D,
  calcConditionalProbability,
  calcBayesTheorem,
  calcBinomialProb,
  simpsonsRule,
  bisectionMethod,
  calcCircuitResistance,
  calcVoltageDivider,
  calcAcImpedance,
  calcStressStrain,
  calcBeamReaction,
  convertNumberBases,
  normalizeValues,
  complexMultiply,
  complexDivide,
  complexPolar,
  permutations,
  combinations,
  modInverse,
  calcPoissonProb,
  calcLinearRegression,
  calcCircleMensuration,
  solveRightTriangle,
  convertFractionDecimal,
  calcDirectionCosines,
  calcMohrsCircle,
  calcReynoldsNumber,
} from './educationTools.ts';

test('Class 10 algorithms: GCD, LCM, Prime Factors, AP, Distance, Section, Trig, Marks', () => {
  // GCD and LCM
  assert.equal(gcd(48, 18), 6);
  assert.equal(lcm(12, 18), 36);

  // Prime Factorization: 120 = 2^3 * 3 * 5
  const pf = primeFactorization(120);
  assert.equal(pf.powers[2], 3);
  assert.equal(pf.powers[3], 1);
  assert.equal(pf.powers[5], 1);

  // Arithmetic Progression: a=3, d=4, n=10 => a10 = 3 + 9*4 = 39, S10 = 10/2 * (6 + 36) = 210
  const ap = calcArithmeticProgression(3, 4, 10);
  assert.equal(ap.nthTerm, 39);
  assert.equal(ap.sumN, 210);

  // 2D Distance: (0,0) to (3,4) = 5
  assert.equal(calcDistance2D(0, 0, 3, 4), 5);

  // Section Formula: midpoint of (2,4) and (6,8) is (4,6)
  const mid = calcSectionFormula(2, 4, 6, 8, 1, 1);
  assert.equal(mid.x, 4);
  assert.equal(mid.y, 6);

  // Cartesian Triangle Area: (0,0), (4,0), (0,3) => Area = 6
  assert.equal(calcCartesianTriangleArea(0, 0, 4, 0, 0, 3), 6);

  // Trig Ratios: 30 degrees sin = 0.5, cos = ~0.866
  const trig = calcTrigRatios(30);
  assert.ok(Math.abs(trig.sin - 0.5) < 1e-6);

  // Marks Percentage: 450 out of 500 = 90% => A+
  const marks = calcMarksPercentage(450, 500);
  assert.equal(marks.percentage, 90);
  assert.equal(marks.grade, 'A+');
});

test('Class 12 algorithms: Inverse Trig, Vectors 3D, Probability, Bayes, Binomial', () => {
  // Inverse Trig: arcsin(0.5) = 30 deg
  const invTrig = calcInverseTrig(0.5, 'arcsin');
  assert.equal(invTrig.valid, true);
  assert.ok(Math.abs((invTrig.deg || 0) - 30) < 1e-4);

  // Vectors 3D: [1, 0, 0] and [0, 1, 0] => dot = 0, cross = [0, 0, 1], angle = 90 deg
  const dot = dotProduct3D([1, 0, 0], [0, 1, 0]);
  assert.equal(dot, 0);
  const cross = crossProduct3D([1, 0, 0], [0, 1, 0]);
  assert.deepEqual(cross, [0, 0, 1]);
  const angle = angleBetweenVectors3D([1, 0, 0], [0, 1, 0]);
  assert.equal(angle, 90);

  // 3D Distance: (1, 2, 3) to (4, 6, 3) = sqrt(9 + 16 + 0) = 5
  assert.equal(calcDistance3D([1, 2, 3], [4, 6, 3]), 5);

  // Conditional Probability: P(A ∩ B) = 0.2, P(B) = 0.5 => P(A|B) = 0.4
  assert.equal(calcConditionalProbability(0.2, 0.5), 0.4);

  // Bayes' Theorem: P(B|A)=0.8, P(A)=0.1, P(B)=0.2 => P(A|B) = (0.8*0.1)/0.2 = 0.4
  assert.ok(Math.abs(calcBayesTheorem(0.8, 0.1, 0.2) - 0.4) < 1e-6);

  // Binomial: n=4, k=2, p=0.5 => 4C2 * (0.5)^4 = 6 * 0.0625 = 0.375
  assert.equal(calcBinomialProb(4, 2, 0.5), 0.375);
});

test('Engineering algorithms: Simpson 1/3, Bisection, Circuits, Mechanics, Bases, Normalization', () => {
  // Simpson's rule: int_0^3 x^2 dx = 9
  const integ = simpsonsRule((x) => x * x, 0, 3, 60);
  assert.ok(Math.abs(integ - 9) < 1e-4);

  // Bisection method for x^2 - 4 = 0 in [1, 3] => root = 2
  const bisect = bisectionMethod((x) => x * x - 4, 1, 3);
  assert.ok(bisect.converged);
  assert.ok(Math.abs(bisect.root - 2) < 1e-4);

  // Circuit resistance: Series [10, 20] = 30; Parallel [10, 10] = 5
  assert.equal(calcCircuitResistance([10, 20], 'series'), 30);
  assert.equal(calcCircuitResistance([10, 10], 'parallel'), 5);

  // Voltage divider: 12V with R1=100, R2=100 => 6V
  assert.equal(calcVoltageDivider(12, 100, 100), 6);

  // AC Impedance: R=3, f=50, L=0, C=0 => Z = 3
  const ac = calcAcImpedance(3, 50, 0, 0);
  assert.equal(ac.z, 3);

  // Stress and Strain: Force=1000N, Area=0.01m2 => Stress=100000 Pa
  const ss = calcStressStrain(1000, 0.01, 0.001, 1);
  assert.equal(ss.stressPa, 100000);
  assert.equal(ss.strain, 0.001);

  // Beam reactions: Span=10m, Load=100kN at center (5m) => RA=50, RB=50, MaxM=250
  const beam = calcBeamReaction(10, 100, 5);
  assert.equal(beam.reactionA, 50);
  assert.equal(beam.reactionB, 50);
  assert.equal(beam.maxBendingMoment, 250);

  // Number Base: "FF" in hex => dec 255, bin 11111111, oct 377
  const bases = convertNumberBases('FF', 16);
  assert.equal(bases.dec, 255);
  assert.equal(bases.bin, '11111111');
  assert.equal(bases.oct, '377');

  // Normalization: [10, 20, 30] => minMax: [0, 0.5, 1]
  const norm = normalizeValues([10, 20, 30]);
  assert.deepEqual(norm.minMax, [0, 0.5, 1]);
});

test('Graduation algorithms: Complex arithmetic, Permutations, Combinations, Mod Inverse, Regression', () => {
  // Complex multiply: (1 + 2i) * (3 + 4i) = 3 + 4i + 6i - 8 = -5 + 10i
  const prod = complexMultiply({ re: 1, im: 2 }, { re: 3, im: 4 });
  assert.equal(prod.re, -5);
  assert.equal(prod.im, 10);

  // Complex polar: 3 + 4i => r = 5
  const polar = complexPolar({ re: 3, im: 4 });
  assert.equal(polar.r, 5);

  // Permutations & Combinations: 5P2 = 20, 5C2 = 10
  assert.equal(permutations(5, 2), 20);
  assert.equal(combinations(5, 2), 10);

  // Modular inverse: 3 mod 11 => 3 * 4 = 12 = 1 mod 11 => inverse is 4
  assert.equal(modInverse(3, 11), 4);

  // Poisson: lambda=2, k=0 => e^-2 = ~0.1353
  const pois = calcPoissonProb(2, 0);
  assert.ok(Math.abs(pois - Math.exp(-2)) < 1e-4);

  // Linear Regression: (1, 2), (2, 4), (3, 6) => slope = 2, intercept = 0, r2 = 1
  const reg = calcLinearRegression([
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
  ]);
  assert.equal(Math.round(reg.slope), 2);
  assert.equal(Math.round(reg.intercept), 0);
  assert.equal(Math.round(reg.r2), 1);
});

test('Extended algorithms: Circle, Right Triangle, Fraction, Direction Cosines, Mohr, Reynolds', () => {
  // Circle mensuration
  const circle = calcCircleMensuration(7);
  assert.ok(Math.abs(circle.area - 153.938) < 0.1);
  assert.ok(Math.abs(circle.circumference - 43.98) < 0.1);

  // Right triangle: a=3, b=4 => c=5, area=6
  const rt = solveRightTriangle({ a: 3, b: 4 });
  assert.equal(rt.c, 5);
  assert.equal(rt.area, 6);

  // Fraction: 12 / 16 => 3/4, decimal = 0.75, terminating = true
  const frac = convertFractionDecimal(12, 16);
  assert.equal(frac.simplifiedNum, 3);
  assert.equal(frac.simplifiedDen, 4);
  assert.equal(frac.decimal, 0.75);
  assert.equal(frac.isTerminating, true);

  // Direction Cosines: [3, 0, 4] => mag = 5, l = 0.6, m = 0, n = 0.8
  const dc = calcDirectionCosines(3, 0, 4);
  assert.equal(dc.magnitude, 5);
  assert.equal(dc.l, 0.6);
  assert.equal(dc.m, 0);
  assert.equal(dc.n, 0.8);

  // Mohr's circle: sigmaX = 80, sigmaY = 20, tauXY = 40 => sigmaAvg = 50, radius = sqrt(30^2 + 40^2) = 50 => sigma1 = 100, sigma2 = 0
  const mohr = calcMohrsCircle(80, 20, 40);
  assert.equal(mohr.sigmaAvg, 50);
  assert.equal(mohr.radius, 50);
  assert.equal(mohr.sigma1, 100);
  assert.equal(mohr.sigma2, 0);

  // Reynolds: rho=1000, v=2, D=0.05, mu=0.001 => Re = 100,000 => Turbulent
  const rey = calcReynoldsNumber(1000, 2, 0.05, 0.001);
  assert.equal(rey.reynoldsNumber, 100000);
  assert.equal(rey.flowRegime, 'Turbulent');
});
