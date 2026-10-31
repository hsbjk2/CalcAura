import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateNumberQuestStage,
  verifyNumberQuestSelection,
  calculateBasketTotal,
  calculateFruitMarketChange,
  generateSpaceMissionQuestion,
  checkFractionMatch,
  areFractionsEquivalent,
  calculateInteriorAngleSum,
  generateMemoryCards,
  generatePatternDetective,
  verifyMiniSudoku,
  generateBingoBoard,
  checkBingoWin,
  calculateDistance,
  getQuadrant,
  convertLength,
  convertWeight,
  convertVolume,
} from './playgroundGames.ts';

test('Number Quest generates valid stages and verifies answers', () => {
  const stage1 = generateNumberQuestStage(1);
  assert.ok(stage1.targetCount >= 3);
  assert.ok(stage1.options.includes(stage1.targetCount));
  assert.equal(verifyNumberQuestSelection(stage1.targetCount, stage1.targetCount), true);
  assert.equal(verifyNumberQuestSelection(stage1.targetCount + 1, stage1.targetCount), false);
});

test('Fruit Market calculates prices and exact change denominations', () => {
  const basket = { apple: 2, banana: 4 }; // 2*15 + 4*5 = 50
  const total = calculateBasketTotal(basket);
  assert.equal(total, 50);

  const payment = calculateFruitMarketChange(total, 100);
  assert.equal(payment.isValidPayment, true);
  assert.equal(payment.changeDue, 50);
  assert.deepEqual(payment.notesChange, [{ note: 50, count: 1 }]);

  const underpaid = calculateFruitMarketChange(total, 40);
  assert.equal(underpaid.isValidPayment, false);
});

test('Multiplication Space Mission validates tables 1 to 30', () => {
  const q = generateSpaceMissionQuestion(7);
  assert.equal(q.tableNum, 7);
  assert.equal(q.correctProduct, 7 * q.multiplier);
  assert.ok(q.options.includes(q.correctProduct));
  assert.ok(q.speedBoostKm > 0);
});

test('Fraction Kitchen tests matching and fraction equivalence', () => {
  assert.equal(checkFractionMatch(3, 4, 3), true);
  assert.equal(checkFractionMatch(3, 4, 2), false);

  assert.equal(areFractionsEquivalent(1, 2, 2, 4), true);
  assert.equal(areFractionsEquivalent(3, 4, 6, 8), true);
  assert.equal(areFractionsEquivalent(1, 3, 2, 5), false);
});

test('Shape Builder calculates correct interior angle sums', () => {
  assert.equal(calculateInteriorAngleSum(3), 180); // Triangle
  assert.equal(calculateInteriorAngleSum(4), 360); // Quadrilateral
  assert.equal(calculateInteriorAngleSum(5), 540); // Pentagon
  assert.equal(calculateInteriorAngleSum(6), 720); // Hexagon
});

test('Memory Match generates matched pairs of cards', () => {
  const cards = generateMemoryCards(4);
  assert.equal(cards.length, 8);
  const pairCounts = new Map<string, number>();
  cards.forEach((c) => {
    pairCounts.set(c.pairId, (pairCounts.get(c.pairId) || 0) + 1);
  });
  for (const count of pairCounts.values()) {
    assert.equal(count, 2);
  }
});

test('Pattern Detective provides consistent sequence solutions', () => {
  const pat1 = generatePatternDetective(1);
  assert.ok(pat1.options.includes(pat1.correctAnswer));
  const pat2 = generatePatternDetective(2);
  assert.ok(pat2.options.includes(pat2.correctAnswer));
  const pat3 = generatePatternDetective(3);
  assert.ok(pat3.options.includes(pat3.correctAnswer));
});

test('Logic Lab mini sudoku validation detects valid 3x3 matrices', () => {
  const valid = [
    [1, 2, 3],
    [2, 3, 1],
    [3, 1, 2],
  ];
  assert.equal(verifyMiniSudoku(valid), true);

  const invalid = [
    [1, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
  ];
  assert.equal(verifyMiniSudoku(invalid), false);
});

test('Math Bingo checks rows, columns, and diagonal lines for wins', () => {
  const board = generateBingoBoard(3);
  assert.equal(checkBingoWin(board), false);

  // Mark first row
  board[0][0].isMarked = true;
  board[0][1].isMarked = true;
  board[0][2].isMarked = true;
  assert.equal(checkBingoWin(board), true);
});

test('Coordinate Explorer computes distances and quadrants', () => {
  const dist = calculateDistance(0, 0, 3, 4);
  assert.equal(dist.euclidean, 5);
  assert.equal(dist.manhattan, 7);

  assert.equal(getQuadrant(2, 3), 'Quadrant I (+, +)');
  assert.equal(getQuadrant(-2, 3), 'Quadrant II (-, +)');
  assert.equal(getQuadrant(-2, -3), 'Quadrant III (-, -)');
  assert.equal(getQuadrant(2, -3), 'Quadrant IV (+, -)');
  assert.equal(getQuadrant(0, 0), 'Origin (0, 0)');
});

test('Measurement Mission handles conversions of metric length, weight, and volume', () => {
  assert.equal(convertLength(5, 'km', 'm'), 5000);
  assert.equal(convertLength(250, 'cm', 'm'), 2.5);
  assert.equal(convertLength(30, 'mm', 'cm'), 3);

  assert.equal(convertWeight(2500, 'g', 'kg'), 2.5);
  assert.equal(convertWeight(1.5, 'kg', 'g'), 1500);

  assert.equal(convertVolume(750, 'ml', 'l'), 0.75);
  assert.equal(convertVolume(2, 'l', 'ml'), 2000);
});
