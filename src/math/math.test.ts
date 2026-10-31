import test from 'node:test';
import assert from 'node:assert/strict';

import { evaluateExpression, formatNum } from './parser.ts';
import {
  calcTriangle,
  calcRightTriangle,
  calcCircle,
  calcRectangle,
  calcCoordinateGeometry,
  calcPolygon,
  calcCylinder,
} from './geometry.ts';
import { solveQuadratic, solveSystem2x2 } from './algebra.ts';
import { computeDerivative, computeDefiniteIntegral } from './calculus.ts';
import { computeStatistics } from './statistics.ts';
import {
  det2x2,
  inv2x2,
  multiply2x2,
  detNxN,
  invNxN,
  multiplyNxN,
  traceNxN,
  rankNxN,
  solveLinearSystemNxN,
} from './linearAlgebra.ts';
import { calcProjectile, calcOhmsLaw } from './physics.ts';
import { planAttendance } from './student.ts';

test('evaluateExpression calculates polynomials and trigonometric functions', () => {
  assert.equal(evaluateExpression('2 + 3 * 4'), 14);
  assert.equal(evaluateExpression('x^2 - 4', 3), 5);
  assert.equal(evaluateExpression('sin(0)'), 0);
  assert.equal(formatNum(12.34567, 2), '12.35');
});

test('geometry engine calculates accurate shapes & enforces inequality', () => {
  const validTri = calcTriangle(3, 4, 5);
  assert.equal(validTri.valid, true);
  const areaProp = validTri.properties.find((p) => p.label === 'Area');
  assert.equal(areaProp?.value, '6.0000');

  const invalidTri = calcTriangle(1, 2, 10);
  assert.equal(invalidTri.valid, false);

  const rt = calcRightTriangle(3, 4);
  assert.equal(rt.valid, true);
  assert.equal(rt.properties.find((p) => p.label === 'Hypotenuse (c)')?.value, '5.0000');
  assert.equal(rt.properties.find((p) => p.label === 'Area')?.value, '6.0000');

  const coord = calcCoordinateGeometry(1, 2, 4, 6);
  assert.equal(coord.valid, true);
  assert.equal(coord.properties.find((p) => p.label === 'Distance d(A, B)')?.value, '5.0000');

  const poly = calcPolygon(6, 4);
  assert.equal(poly.valid, true);
  assert.equal(poly.properties.find((p) => p.label === 'Perimeter')?.value, '24.0000');

  const circ = calcCircle(7);
  assert.equal(circ.valid, true);

  const rect = calcRectangle(5, 10);
  assert.equal(rect.valid, true);
  assert.equal(rect.properties.find((p) => p.label === 'Area')?.value, '50.0000');
});

test('algebra solver finds correct real & complex roots and systems', () => {
  // x^2 - 5x + 6 = 0 => roots 3, 2
  const quad = solveQuadratic(1, -5, 6);
  assert.ok(quad);
  assert.equal(quad?.rootType, 'two-real');
  assert.equal(Math.round(quad.roots[0].real), 3);
  assert.equal(Math.round(quad.roots[1].real), 2);

  // 2x + y = 5, x + 3y = 10 => x = 1, y = 3
  const sys = solveSystem2x2(2, 1, 5, 1, 3, 10);
  assert.equal(sys.status, 'unique');
  assert.equal(Math.round(sys.x), 1);
  assert.equal(Math.round(sys.y), 3);
});

test('calculus engine differentiates and integrates polynomials', () => {
  // f(x) = x^2 at x0 = 3 => f'(3) = 6
  const deriv = computeDerivative('x^2', 3);
  assert.ok(Math.abs(deriv.slope - 6) < 0.01);

  // int_0^2 x^2 dx = 8/3 = 2.6667
  const integ = computeDefiniteIntegral('x^2', 0, 2, 100);
  assert.ok(Math.abs(integ.integralValue - 2.6667) < 0.01);
});

test('statistics calculates mean, median and variance', () => {
  const stats = computeStatistics([2, 4, 4, 4, 5, 5, 7, 9]);
  assert.ok(stats);
  assert.equal(stats?.mean, 5);
  assert.equal(stats?.median, 4.5);
  assert.deepEqual(stats?.mode, [4]);
});

test('linear algebra solves determinants and inverse', () => {
  const m: [[number, number], [number, number]] = [[4, 7], [2, 6]];
  const d = det2x2(m);
  assert.equal(d, 10);

  const inv = inv2x2(m);
  assert.ok(inv);
  const prod = multiply2x2(m, inv!);
  assert.ok(Math.abs(prod[0][0] - 1) < 1e-6);
  assert.ok(Math.abs(prod[1][1] - 1) < 1e-6);
});

test('linear algebra solves up to 5x5 matrix determinants, inverses, and systems', () => {
  // 3x3 matrix test
  const m3 = [
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0],
  ];
  const det3 = detNxN(m3);
  assert.equal(det3, 1);
  const inv3 = invNxN(m3);
  assert.ok(inv3);
  const prod3 = multiplyNxN(m3, inv3!);
  assert.ok(Math.abs(prod3[0][0] - 1) < 1e-5);
  assert.ok(Math.abs(prod3[1][1] - 1) < 1e-5);
  assert.ok(Math.abs(prod3[2][2] - 1) < 1e-5);

  // 4x4 matrix test
  const m4 = [
    [2, 1, 0, 0],
    [1, 2, 1, 0],
    [0, 1, 2, 1],
    [0, 0, 1, 2],
  ];
  assert.equal(detNxN(m4), 5);
  assert.equal(rankNxN(m4), 4);
  assert.equal(traceNxN(m4), 8);

  // 5x5 matrix test
  const m5 = [
    [2, -1, 0, 0, 0],
    [-1, 2, -1, 0, 0],
    [0, -1, 2, -1, 0],
    [0, 0, -1, 2, -1],
    [0, 0, 0, -1, 2],
  ];
  assert.equal(detNxN(m5), 6);
  assert.equal(rankNxN(m5), 5);
  assert.equal(traceNxN(m5), 10);

  const inv5 = invNxN(m5);
  assert.ok(inv5);
  const prod5 = multiplyNxN(m5, inv5!);
  for (let i = 0; i < 5; i++) {
    assert.ok(Math.abs(prod5[i][i] - 1) < 1e-5);
  }

  // 5x5 linear system solving AX = B
  const b5 = [1, 0, 0, 0, 1];
  const sys5 = solveLinearSystemNxN(m5, b5);
  assert.equal(sys5.status, 'unique');
  assert.ok(sys5.solution);
  assert.equal(sys5.solution?.length, 5);
  // Verify AX = B
  for (let i = 0; i < 5; i++) {
    let dot = 0;
    for (let j = 0; j < 5; j++) {
      dot += m5[i][j] * sys5.solution![j];
    }
    assert.ok(Math.abs(dot - b5[i]) < 1e-5);
  }
});

test('physics projectile and circuit equations', () => {
  const proj = calcProjectile(20, 45, 0, 9.8);
  assert.ok(proj.maxHeight > 0);
  assert.ok(proj.range > 0);

  const ohm = calcOhmsLaw({ v: 12, r: 6 });
  assert.equal(ohm.current, 2);
  assert.equal(ohm.power, 24);
});

test('student attendance planner handles shortage and buffer', () => {
  // Attended 10/20 = 50%, target 75% => need continuous attendance
  const shortage = planAttendance(10, 20, 75);
  assert.equal(shortage.status, 'shortage');
  assert.ok(shortage.classesNeededToTarget > 0);

  // Attended 18/20 = 90%, target 75% => can skip
  const surplus = planAttendance(18, 20, 75);
  assert.equal(surplus.status, 'on-track');
  assert.ok(surplus.classesCanSkip >= 1);
});

test('practice questions bank contains at least 200 questions and samples 6 valid questions', async () => {
  const { PRACTICE_QUESTIONS_BANK, sampleRandomQuestions } = await import('../data/practiceQuestionsData.ts');
  assert.ok(PRACTICE_QUESTIONS_BANK.length >= 200, `Expected at least 200 questions, found ${PRACTICE_QUESTIONS_BANK.length}`);
  
  for (const q of PRACTICE_QUESTIONS_BANK) {
    assert.ok(q.id > 0);
    assert.ok(q.problem && q.problem.length > 5);
    assert.ok(q.topic && q.topic.length > 2);
    assert.ok(
      ['6th', '7th', '8th', '9th', '10th', '12th', 'engineering', 'graduation'].includes(q.stage),
      `Question ${q.id} has invalid stage ${q.stage}`
    );
    assert.equal(q.options.length, 4, `Question ${q.id} must have 4 options`);
    assert.ok(q.correctIdx >= 0 && q.correctIdx <= 3, `Question ${q.id} correctIdx out of bounds`);
    assert.ok(q.explanation && q.explanation.length > 5);
  }

  const setAll = sampleRandomQuestions(6, 'all');
  assert.equal(setAll.length, 6);
  assert.equal(new Set(setAll.map(q => q.id)).size, 6, 'All-stage questions must be distinct');

  for (const stage of ['6th', '7th', '8th', '9th', '10th', '12th', 'engineering', 'graduation'] as const) {
    const stageSet = sampleRandomQuestions(6, stage);
    assert.equal(stageSet.length, 6);
    assert.equal(new Set(stageSet.map(q => q.id)).size, 6, `Stage ${stage} sample must be 6 distinct questions`);
    for (const q of stageSet) {
      assert.equal(q.stage, stage, `Sampled question ${q.id} must match requested stage ${stage}`);
    }
  }
});

