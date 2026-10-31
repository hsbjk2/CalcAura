/**
 * CalcAura Pure Math & Game Engine Logic
 * Decoupled pure logic for Math Playground games:
 * - Number Quest
 * - Fruit Market
 * - Multiplication Space Mission
 * - Fraction Kitchen
 * - Shape Builder
 * - Memory Match
 * - Pattern Detective
 * - Number Maze
 * - Logic Lab
 * - Math Bingo
 * - Coordinate Explorer
 * - Measurement Mission
 */

// 1. NUMBER QUEST
export interface NumberQuestStage {
  stage: number;
  targetCount: number;
  itemName: string;
  itemEmoji: string;
  problemText: string;
  options: number[];
}

export function generateNumberQuestStage(stage: number): NumberQuestStage {
  const items = [
    { name: 'Apples', emoji: '🍎' },
    { name: 'Star Gems', emoji: '⭐' },
    { name: 'Toy Rockets', emoji: '🚀' },
    { name: 'Sunflowers', emoji: '🌻' },
    { name: 'Friendly Bunnies', emoji: '🐰' },
    { name: 'Magic Crystals', emoji: '💎' },
  ];
  const item = items[(stage - 1) % items.length];
  // Progressive target: Stage 1 = 3-5, Stage 2 = 6-10, Stage 3 = 11-20, Stage 4+ = 20-50
  let target: number;
  if (stage <= 1) target = 3 + (stage % 3);
  else if (stage === 2) target = 6 + (stage * 2);
  else if (stage === 3) target = 12 + stage;
  else target = 15 + stage * 3;

  // Generate 4 distinct options including target
  const optsSet = new Set<number>([target]);
  while (optsSet.size < 4) {
    const delta = Math.floor(Math.random() * 7) - 3;
    const candidate = Math.max(1, target + (delta === 0 ? 2 : delta));
    optsSet.add(candidate);
  }
  const options = Array.from(optsSet).sort(() => Math.random() - 0.5);

  return {
    stage,
    targetCount: target,
    itemName: item.name,
    itemEmoji: item.emoji,
    problemText: `Find and collect exactly ${target} ${item.name} to power the quest gateway!`,
    options,
  };
}

export function verifyNumberQuestSelection(selected: number, target: number): boolean {
  return selected === target;
}

// 2. FRUIT MARKET
export interface FruitItem {
  id: string;
  name: string;
  emoji: string;
  unitPrice: number; // in Rupees
}

export const FRUIT_CATALOG: FruitItem[] = [
  { id: 'apple', name: 'Fresh Apple', emoji: '🍎', unitPrice: 15 },
  { id: 'banana', name: 'Ripe Banana', emoji: '🍌', unitPrice: 5 },
  { id: 'orange', name: 'Juicy Orange', emoji: '🍊', unitPrice: 10 },
  { id: 'mango', name: 'Sweet Mango', emoji: '🥭', unitPrice: 25 },
  { id: 'grapes', name: 'Green Grapes Bunch', emoji: '🍇', unitPrice: 30 },
  { id: 'watermelon', name: 'Watermelon Slice', emoji: '🍉', unitPrice: 20 },
];

export function calculateBasketTotal(basket: Record<string, number>): number {
  let total = 0;
  for (const item of FRUIT_CATALOG) {
    const qty = basket[item.id] || 0;
    total += qty * item.unitPrice;
  }
  return total;
}

export function calculateFruitMarketChange(total: number, cashPaid: number): {
  changeDue: number;
  isValidPayment: boolean;
  notesChange: { note: number; count: number }[];
} {
  if (cashPaid < total) {
    return { changeDue: 0, isValidPayment: false, notesChange: [] };
  }
  let change = cashPaid - total;
  const changeDue = change;
  const denominations = [100, 50, 20, 10, 5, 2, 1];
  const notesChange: { note: number; count: number }[] = [];

  for (const denom of denominations) {
    if (change >= denom) {
      const count = Math.floor(change / denom);
      notesChange.push({ note: denom, count });
      change %= denom;
    }
  }

  return {
    changeDue,
    isValidPayment: true,
    notesChange,
  };
}

// 3. MULTIPLICATION SPACE MISSION (Tables 1-30)
export interface SpaceMissionQuestion {
  tableNum: number;
  multiplier: number;
  correctProduct: number;
  options: number[];
  speedBoostKm: number;
}

export function generateSpaceMissionQuestion(selectedTable?: number): SpaceMissionQuestion {
  const table = selectedTable && selectedTable >= 1 && selectedTable <= 30
    ? selectedTable
    : Math.floor(Math.random() * 12) + 2; // Default 2 to 13
  const mult = Math.floor(Math.random() * 10) + 1; // 1 to 10
  const product = table * mult;

  const optsSet = new Set<number>([product]);
  while (optsSet.size < 4) {
    const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? table : 1);
    const candidate = Math.max(1, product + offset);
    optsSet.add(candidate);
  }
  const options = Array.from(optsSet).sort(() => Math.random() - 0.5);

  return {
    tableNum: table,
    multiplier: mult,
    correctProduct: product,
    options,
    speedBoostKm: product * 10,
  };
}

// 4. FRACTION KITCHEN
export interface FractionChallenge {
  numerator: number;
  denominator: number;
  decimalValue: number;
  equivalentString: string;
  slicesSelected: number;
}

export function checkFractionMatch(numerator: number, denominator: number, selectedSlices: number): boolean {
  if (denominator <= 0) return false;
  return selectedSlices === numerator;
}

export function areFractionsEquivalent(n1: number, d1: number, n2: number, d2: number): boolean {
  if (d1 === 0 || d2 === 0) return false;
  return n1 * d2 === n2 * d1;
}

// 5. SHAPE BUILDER & PROPERTIES
export interface ShapeProperty {
  name: string;
  sides: number;
  vertices: number;
  interiorAngleSum: number;
  isRegularPossible: boolean;
  faces3D?: number;
}

export const SHAPE_PROPERTIES: Record<string, ShapeProperty> = {
  triangle: { name: 'Triangle', sides: 3, vertices: 3, interiorAngleSum: 180, isRegularPossible: true },
  quadrilateral: { name: 'Quadrilateral', sides: 4, vertices: 4, interiorAngleSum: 360, isRegularPossible: true },
  pentagon: { name: 'Pentagon', sides: 5, vertices: 5, interiorAngleSum: 540, isRegularPossible: true },
  hexagon: { name: 'Hexagon', sides: 6, vertices: 6, interiorAngleSum: 720, isRegularPossible: true },
  cube: { name: 'Cube', sides: 12, vertices: 8, interiorAngleSum: 2160, isRegularPossible: true, faces3D: 6 },
  cylinder: { name: 'Cylinder', sides: 2, vertices: 0, interiorAngleSum: 0, isRegularPossible: false, faces3D: 3 },
};

export function calculateInteriorAngleSum(sides: number): number {
  if (sides < 3) return 0;
  return (sides - 2) * 180;
}

// 6. MEMORY MATCH GENERATOR
export interface MemoryCard {
  id: string;
  pairId: string;
  display: string;
  subText?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function generateMemoryCards(countPairs = 6): MemoryCard[] {
  const pool = [
    { pairId: 'p1', a: '7 × 8', b: '56', desc: 'Multiplication' },
    { pairId: 'p2', a: '9 × 6', b: '54', desc: 'Multiplication' },
    { pairId: 'p3', a: '½', b: '0.50', desc: 'Fraction to Decimal' },
    { pairId: 'p4', a: '¾', b: '0.75', desc: 'Fraction to Decimal' },
    { pairId: 'p5', a: '√64', b: '8', desc: 'Square Root' },
    { pairId: 'p6', a: '15 + 27', b: '42', desc: 'Addition' },
    { pairId: 'p7', a: '100 ÷ 4', b: '25', desc: 'Division' },
    { pairId: 'p8', a: '2³', b: '8', desc: 'Exponent' },
  ];

  const selectedPairs = pool.slice(0, countPairs);
  const cards: MemoryCard[] = [];

  selectedPairs.forEach((pair, idx) => {
    cards.push({
      id: `c-${idx}-a`,
      pairId: pair.pairId,
      display: pair.a,
      subText: pair.desc,
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: `c-${idx}-b`,
      pairId: pair.pairId,
      display: pair.b,
      subText: pair.desc,
      isFlipped: false,
      isMatched: false,
    });
  });

  return cards.sort(() => Math.random() - 0.5);
}

// 7. PATTERN DETECTIVE
export interface PatternSequence {
  type: 'arithmetic' | 'geometric' | 'shapes' | 'fibonacci';
  sequence: (number | string)[];
  missingIndex: number;
  correctAnswer: number | string;
  ruleExplanation: string;
  options: (number | string)[];
}

export function generatePatternDetective(level: 1 | 2 | 3 = 1): PatternSequence {
  if (level === 1) {
    // Arithmetic step (e.g. +3, +5, +10)
    const start = Math.floor(Math.random() * 10) + 2;
    const step = [2, 3, 5, 10][Math.floor(Math.random() * 4)];
    const seq = [start, start + step, start + 2 * step, start + 3 * step, start + 4 * step];
    const missingIdx = 3;
    const ans = seq[missingIdx];
    const displaySeq: (number | string)[] = [...seq];
    displaySeq[missingIdx] = '?';

    const opts = [ans, ans + step, ans - step, ans + 2 * step].sort(() => Math.random() - 0.5);
    return {
      type: 'arithmetic',
      sequence: displaySeq,
      missingIndex: missingIdx,
      correctAnswer: ans,
      ruleExplanation: `Add ${step} at each step: ${start}, ${start + step}, ...`,
      options: Array.from(new Set(opts)),
    };
  } else if (level === 2) {
    // Geometric step (e.g. *2, *3)
    const start = [2, 3, 4][Math.floor(Math.random() * 3)];
    const ratio = 2;
    const seq = [start, start * ratio, start * ratio * ratio, start * Math.pow(ratio, 3), start * Math.pow(ratio, 4)];
    const missingIdx = 2;
    const ans = seq[missingIdx];
    const displaySeq: (number | string)[] = [...seq];
    displaySeq[missingIdx] = '?';
    const opts = [ans, ans * 2, ans + 4, ans - 2].sort(() => Math.random() - 0.5);

    return {
      type: 'geometric',
      sequence: displaySeq,
      missingIndex: missingIdx,
      correctAnswer: ans,
      ruleExplanation: `Multiply by ${ratio} at each step`,
      options: Array.from(new Set(opts)),
    };
  } else {
    // Shape rotation cycle
    const shapes = ['▲', '▶', '▼', '◀', '▲', '▶'];
    const missingIdx = 3;
    const ans = shapes[missingIdx];
    const displaySeq = [...shapes];
    displaySeq[missingIdx] = '?';
    return {
      type: 'shapes',
      sequence: displaySeq,
      missingIndex: missingIdx,
      correctAnswer: ans,
      ruleExplanation: '90° clockwise rotation of triangle pointer',
      options: ['▲', '▶', '▼', '◀'],
    };
  }
}

// 8. NUMBER MAZE
export interface MazeCell {
  row: number;
  col: number;
  value: number;
  isPath: boolean;
  isCurrent: boolean;
  isGoal: boolean;
}

export function generateNumberMaze(size = 4, stepRule = 3): {
  grid: MazeCell[][];
  ruleDescription: string;
} {
  const grid: MazeCell[][] = [];
  let pathVal = 3;

  for (let r = 0; r < size; r++) {
    const row: MazeCell[] = [];
    for (let c = 0; c < size; c++) {
      row.push({
        row: r,
        col: c,
        value: Math.floor(Math.random() * 30) + 1,
        isPath: false,
        isCurrent: r === 0 && c === 0,
        isGoal: r === size - 1 && c === size - 1,
      });
    }
    grid.push(row);
  }

  // Set guaranteed path from (0,0) down and right to goal
  let currR = 0;
  let currC = 0;
  grid[0][0].value = pathVal;
  grid[0][0].isPath = true;

  while (currR < size - 1 || currC < size - 1) {
    if (currR === size - 1) {
      currC++;
    } else if (currC === size - 1) {
      currR++;
    } else {
      if (Math.random() > 0.5) currC++;
      else currR++;
    }
    pathVal += stepRule;
    grid[currR][currC].value = pathVal;
    grid[currR][currC].isPath = true;
  }

  return {
    grid,
    ruleDescription: `Follow the path by hopping to numbers that increase by +${stepRule} at each step!`,
  };
}

// 9. LOGIC LAB (3x3 Mini Sudoku / Logic Matrix)
export function verifyMiniSudoku(grid: number[][]): boolean {
  if (grid.length !== 3 || grid.some((r) => r.length !== 3)) return false;
  // Each row must contain 1, 2, 3
  for (let r = 0; r < 3; r++) {
    const set = new Set(grid[r]);
    if (set.size !== 3 || !set.has(1) || !set.has(2) || !set.has(3)) return false;
  }
  // Each col must contain 1, 2, 3
  for (let c = 0; c < 3; c++) {
    const colVals = [grid[0][c], grid[1][c], grid[2][c]];
    const set = new Set(colVals);
    if (set.size !== 3 || !set.has(1) || !set.has(2) || !set.has(3)) return false;
  }
  return true;
}

// 10. MATH BINGO
export interface BingoCell {
  val: number;
  isMarked: boolean;
}

export function generateBingoBoard(size = 3): BingoCell[][] {
  const used = new Set<number>();
  const board: BingoCell[][] = [];

  for (let r = 0; r < size; r++) {
    const row: BingoCell[] = [];
    for (let c = 0; c < size; c++) {
      let num = Math.floor(Math.random() * 30) + 1;
      while (used.has(num)) {
        num = Math.floor(Math.random() * 30) + 1;
      }
      used.add(num);
      row.push({ val: num, isMarked: false });
    }
    board.push(row);
  }
  return board;
}

export function checkBingoWin(board: BingoCell[][]): boolean {
  const size = board.length;
  // Check rows
  for (let r = 0; r < size; r++) {
    if (board[r].every((c) => c.isMarked)) return true;
  }
  // Check cols
  for (let c = 0; c < size; c++) {
    let colMarked = true;
    for (let r = 0; r < size; r++) {
      if (!board[r][c].isMarked) {
        colMarked = false;
        break;
      }
    }
    if (colMarked) return true;
  }
  // Check diagonals
  let d1 = true;
  let d2 = true;
  for (let i = 0; i < size; i++) {
    if (!board[i][i].isMarked) d1 = false;
    if (!board[i][size - 1 - i].isMarked) d2 = false;
  }
  return d1 || d2;
}

// 11. COORDINATE EXPLORER
export interface TreasurePoint {
  x: number;
  y: number;
  hint: string;
}

export function calculateDistance(x1: number, y1: number, x2: number, y2: number): {
  euclidean: number;
  manhattan: number;
  dx: number;
  dy: number;
} {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const euclidean = Math.sqrt(dx * dx + dy * dy);
  const manhattan = Math.abs(dx) + Math.abs(dy);
  return { euclidean, manhattan, dx, dy };
}

export function getQuadrant(x: number, y: number): string {
  if (x > 0 && y > 0) return 'Quadrant I (+, +)';
  if (x < 0 && y > 0) return 'Quadrant II (-, +)';
  if (x < 0 && y < 0) return 'Quadrant III (-, -)';
  if (x > 0 && y < 0) return 'Quadrant IV (+, -)';
  if (x === 0 && y === 0) return 'Origin (0, 0)';
  if (x === 0) return 'Y-Axis';
  return 'X-Axis';
}

// 12. MEASUREMENT MISSION
export function convertLength(val: number, fromUnit: 'mm' | 'cm' | 'm' | 'km', toUnit: 'mm' | 'cm' | 'm' | 'km'): number {
  // Convert from -> meters
  let inMeters = val;
  if (fromUnit === 'mm') inMeters = val / 1000;
  else if (fromUnit === 'cm') inMeters = val / 100;
  else if (fromUnit === 'km') inMeters = val * 1000;

  // Convert meters -> toUnit
  if (toUnit === 'mm') return inMeters * 1000;
  if (toUnit === 'cm') return inMeters * 100;
  if (toUnit === 'm') return inMeters;
  return inMeters / 1000;
}

export function convertWeight(val: number, fromUnit: 'g' | 'kg', toUnit: 'g' | 'kg'): number {
  if (fromUnit === toUnit) return val;
  if (fromUnit === 'g' && toUnit === 'kg') return val / 1000;
  return val * 1000;
}

export function convertVolume(val: number, fromUnit: 'ml' | 'l', toUnit: 'ml' | 'l'): number {
  if (fromUnit === toUnit) return val;
  if (fromUnit === 'ml' && toUnit === 'l') return val / 1000;
  return val * 1000;
}
