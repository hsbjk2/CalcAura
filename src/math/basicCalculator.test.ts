import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateBasicExpression,
  calculatePercentage,
  formatCalculatorNumber,
  stripPrecision,
} from './basicCalculatorEngine.ts';

test('Basic Arithmetic Operations: addition, subtraction, multiplication, division', () => {
  assert.equal(evaluateBasicExpression('12 + 8').value, 20);
  assert.equal(evaluateBasicExpression('45 - 19').value, 26);
  assert.equal(evaluateBasicExpression('7 × 8').value, 56);
  assert.equal(evaluateBasicExpression('7 * 8').value, 56);
  assert.equal(evaluateBasicExpression('144 ÷ 12').value, 12);
  assert.equal(evaluateBasicExpression('144 / 12').value, 12);
});

test('Decimal calculations and floating-point normalization', () => {
  // Test 0.1 + 0.2 equals 0.3 without 0.30000000000000004
  const res = evaluateBasicExpression('0.1 + 0.2');
  assert.equal(res.success, true);
  assert.equal(res.value, 0.3);

  assert.equal(evaluateBasicExpression('1.25 × 4').value, 5);
  assert.equal(evaluateBasicExpression('7.5 ÷ 2.5').value, 3);
  assert.equal(evaluateBasicExpression('0.05 + 0.025').value, 0.075);
});

test('Operator Precedence: multiplication/division before addition/subtraction', () => {
  // 2 + 3 * 4 should be 14, not 20
  assert.equal(evaluateBasicExpression('2 + 3 × 4').value, 14);
  assert.equal(evaluateBasicExpression('10 - 6 ÷ 2').value, 7);
  assert.equal(evaluateBasicExpression('100 - 5 × 10 + 20 ÷ 4').value, 55);
});

test('Parentheses and nested sub-expressions', () => {
  // (2 + 3) * 4 should be 20
  assert.equal(evaluateBasicExpression('(2 + 3) × 4').value, 20);
  assert.equal(evaluateBasicExpression('(10 - 2) ÷ (2 + 2)').value, 2);
  assert.equal(evaluateBasicExpression('((5 + 3) × 2) - 6').value, 10);
  // Auto-closing unclosed parentheses
  assert.equal(evaluateBasicExpression('(4 + 6').value, 10);
});

test('Negative numbers and sign change logic', () => {
  assert.equal(evaluateBasicExpression('-5 + 12').value, 7);
  assert.equal(evaluateBasicExpression('10 + -3').value, 7);
  assert.equal(evaluateBasicExpression('-4 × -5').value, 20);
  assert.equal(evaluateBasicExpression('(-8) ÷ 2').value, -4);
});

test('Division by zero handling', () => {
  const divZero = evaluateBasicExpression('15 ÷ 0');
  assert.equal(divZero.success, false);
  assert.equal(divZero.error, 'Cannot divide by zero');

  const divZeroDec = evaluateBasicExpression('5 / (2 - 2)');
  assert.equal(divZeroDec.success, false);
  assert.equal(divZeroDec.error, 'Cannot divide by zero');
});

test('Smartphone percentage calculation conventions', () => {
  // 1. Add percentage: 200 + 10% -> 10% of 200 = 20
  const addPct = calculatePercentage(200, 10, '+');
  assert.equal(addPct, 20);
  assert.equal(evaluateBasicExpression(`200 + ${addPct}`).value, 220);

  // 2. Subtract percentage: 500 - 25% -> 25% of 500 = 125
  const subPct = calculatePercentage(500, 25, '-');
  assert.equal(subPct, 125);
  assert.equal(evaluateBasicExpression(`500 - ${subPct}`).value, 375);

  // 3. Multiply percentage: 200 * 10% -> 200 * 0.10
  const multPct = calculatePercentage(200, 10, '*');
  assert.equal(multPct, 0.1);
  assert.equal(evaluateBasicExpression(`200 * ${multPct}`).value, 20);

  // 4. Standalone percentage: 75% -> 0.75
  const standalonePct = calculatePercentage(null, 75, null);
  assert.equal(standalonePct, 0.75);
});

test('Large number formatting with readable grouping separators', () => {
  assert.equal(formatCalculatorNumber(1000), '1,000');
  assert.equal(formatCalculatorNumber(1234567.89), '1,234,567.89');
  assert.equal(formatCalculatorNumber(-9876543.21), '-9,876,543.21');
  assert.equal(formatCalculatorNumber(0), '0');
});
