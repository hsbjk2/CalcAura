import test from 'node:test';
import assert from 'node:assert/strict';
import { CLASS_6_CHAPTERS } from '../data/class6Data.ts';
import { CLASS_7_CHAPTERS } from '../data/class7Data.ts';
import { CLASS_8_CHAPTERS } from '../data/class8Data.ts';
import { CLASS_9_CHAPTERS } from '../data/class9Data.ts';

test('Class 6 contains all 10 specified chapters with authentic titles', () => {
  assert.equal(CLASS_6_CHAPTERS.length, 10, 'Class 6 must have exactly 10 chapters');

  const expectedTitles = [
    'Patterns in Mathematics',
    'Lines and Angles',
    'Number Play',
    'Data Handling and Presentation',
    'Prime Time',
    'Perimeter and Area',
    'Fractions',
    'Playing with Constructions',
    'Symmetry',
    'The Other Side of Zero',
  ];

  expectedTitles.forEach((title, idx) => {
    assert.equal(
      CLASS_6_CHAPTERS[idx].title,
      title,
      `Chapter ${idx + 1} title should be "${title}"`
    );
  });
});

test('Class 7 contains all 15 specified chapters in 4 structured units', () => {
  assert.equal(CLASS_7_CHAPTERS.length, 15, 'Class 7 must have exactly 15 chapters');

  const expectedTitles = [
    'Large Numbers Around Us',
    'Arithmetic Expressions',
    'A Peek Beyond the Point',
    'Number Play',
    'Operations with Integers',
    'Finding Common Ground',
    'Another Peek Beyond the Point',
    'Expressions Using Letter-Numbers',
    'Finding the Unknown',
    'Parallel and Intersecting Lines',
    'A Tale of Three Intersecting Lines',
    'Geometric Twins',
    'Constructions and Tilings',
    'Working with Fractions',
    'Connecting the Dots',
  ];

  expectedTitles.forEach((title, idx) => {
    assert.equal(
      CLASS_7_CHAPTERS[idx].title,
      title,
      `Class 7 Chapter ${idx + 1} title should be "${title}"`
    );
  });

  // Verify unit counts: 7 in Number systems, 2 in Algebra, 4 in Geometry, 2 in Fractions & Data
  const numSystems = CLASS_7_CHAPTERS.filter((c) => c.unit.includes('Number Systems'));
  const algebra = CLASS_7_CHAPTERS.filter((c) => c.unit.includes('Algebra'));
  const geometry = CLASS_7_CHAPTERS.filter((c) => c.unit.includes('Geometric'));
  const fractionsData = CLASS_7_CHAPTERS.filter((c) => c.unit.includes('Fractions'));

  assert.equal(numSystems.length, 7, 'Number systems unit must have 7 chapters');
  assert.equal(algebra.length, 2, 'Algebra unit must have 2 chapters');
  assert.equal(geometry.length, 4, 'Geometry unit must have 4 chapters');
  assert.equal(fractionsData.length, 2, 'Fractions and data unit must have 2 chapters');
});

test('Class 8 contains all 14 specified chapters across Part A and Part B', () => {
  assert.equal(CLASS_8_CHAPTERS.length, 14, 'Class 8 must have exactly 14 chapters');

  const expectedTitles = [
    'A Square and A Cube',
    'Power Play',
    'A Story of Numbers',
    'Quadrilaterals',
    'Number Play',
    'We Distribute, Yet Things Multiply',
    'Proportional Reasoning-1',
    'Fractions in Disguise',
    'The Baudhayana-Pythagoras Theorem',
    'Proportional Reasoning-2',
    'Exploring Some Geometric Themes',
    'Tales by Dots and Lines',
    'Algebra Play',
    'Area',
  ];

  expectedTitles.forEach((title, idx) => {
    assert.equal(
      CLASS_8_CHAPTERS[idx].title,
      title,
      `Class 8 Chapter ${idx + 1} title should be "${title}"`
    );
  });

  const partA = CLASS_8_CHAPTERS.filter((c) => c.unit.includes('Part A'));
  const partB = CLASS_8_CHAPTERS.filter((c) => c.unit.includes('Part B'));

  assert.equal(partA.length, 7, 'Part A must have 7 chapters');
  assert.equal(partB.length, 7, 'Part B must have 7 chapters');
});

test('Class 9 contains all 8 verified curriculum chapters', () => {
  assert.equal(CLASS_9_CHAPTERS.length, 8, 'Class 9 must have exactly 8 chapters');

  const expectedTitles = [
    'Orienting Yourself: The Use of Coordinates',
    'Introduction to Linear Polynomials',
    'The World of Numbers',
    'Exploring Algebraic Identities',
    "I'm Up and Down, and Round and Round",
    'Measuring Space: Perimeter and Area',
    'The Mathematics of Maybe: Introduction to Probability',
    'Predicting What Comes Next: Exploring Sequences and Progressions',
  ];

  expectedTitles.forEach((title, idx) => {
    assert.equal(
      CLASS_9_CHAPTERS[idx].title,
      title,
      `Class 9 Chapter ${idx + 1} title should be "${title}"`
    );
  });
});

test('Every chapter has complete pedagogical components and valid quiz items', () => {
  const allChapters = [
    ...CLASS_6_CHAPTERS,
    ...CLASS_7_CHAPTERS,
    ...CLASS_8_CHAPTERS,
    ...CLASS_9_CHAPTERS,
  ];

  allChapters.forEach((ch) => {
    assert.ok(ch.id, `Chapter must have an ID: ${ch.title}`);
    assert.ok(ch.number, `Chapter must have a number: ${ch.title}`);
    assert.ok(ch.description.length > 20, `Chapter must have a descriptive intro: ${ch.title}`);
    assert.ok(ch.learningObjectives.length >= 2, `Chapter must have learning objectives: ${ch.title}`);
    assert.ok(ch.formula.length > 0, `Chapter must have mathematical formula: ${ch.title}`);
    assert.ok(ch.simpleExplanation.length > 30, `Chapter must have simple explanation: ${ch.title}`);
    assert.ok(ch.detailedExplanation.length > 50, `Chapter must have detailed explanation: ${ch.title}`);
    assert.ok(ch.advancedReasoning.length > 50, `Chapter must have challenge reasoning: ${ch.title}`);
    assert.ok(ch.workedExamples.length >= 1, `Chapter must have worked examples: ${ch.title}`);
    assert.ok(ch.guidedPractice.question.length > 10, `Chapter must have guided practice: ${ch.title}`);
    assert.ok(ch.guidedPractice.solution.length > 10, `Chapter must have guided practice solution: ${ch.title}`);
    assert.ok(ch.independentQuestions.length >= 2, `Chapter must have independent questions: ${ch.title}`);
    assert.ok(ch.chapterQuiz.length >= 3, `Chapter must have at least 3 quiz questions: ${ch.title}`);

    // Verify quiz items integrity
    ch.chapterQuiz.forEach((q, qIdx) => {
      assert.ok(q.question.length > 5, `Quiz question text missing in ${ch.title} Q${qIdx + 1}`);
      assert.ok(q.options.length >= 4, `Quiz question options should be >= 4 in ${ch.title} Q${qIdx + 1}`);
      assert.ok(
        q.correctIdx >= 0 && q.correctIdx < q.options.length,
        `Quiz correctIdx out of bounds in ${ch.title} Q${qIdx + 1}`
      );
      assert.ok(q.explanation.length > 15, `Quiz explanation missing in ${ch.title} Q${qIdx + 1}`);
      assert.ok(q.ruleOrFormula.length > 0, `Quiz rule/formula missing in ${ch.title} Q${qIdx + 1}`);
    });
  });
});

test('Middle school math algorithm verifications: Triangular numbers, Pythagoras, Coordinates, AP', () => {
  // Triangular number formula: n(n + 1) / 2
  const tri8 = (8 * 9) / 2;
  assert.equal(tri8, 36, '8th triangular number is 36');

  // Baudhayana-Pythagoras theorem: a^2 + b^2 = c^2
  const a = 9;
  const b = 12;
  const c = Math.sqrt(a * a + b * b);
  assert.equal(c, 15, '9-12-15 right triangle hypotenuse is 15');

  // Euclidean distance formula: sqrt((x2-x1)^2 + (y2-y1)^2)
  const x1 = -3;
  const y1 = 4;
  const x2 = 3;
  const y2 = -4;
  const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  assert.equal(dist, 10, 'Distance between (-3, 4) and (3, -4) is 10');

  // Midpoint formula: ((x1+x2)/2, (y1+y2)/2)
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  assert.equal(mx, 0);
  assert.equal(my, 0);

  // Arithmetic Progression nth term: a + (n - 1)d
  const apA = 10;
  const apD = -3;
  const term30 = apA + (30 - 1) * apD;
  assert.equal(term30, -77, '30th term of AP 10, 7, 4... is -77');

  // Sum of AP: n/2 [2a + (n - 1)d]
  const sum20 = (20 / 2) * (2 * 2 + (20 - 1) * 3);
  assert.equal(sum20, 610, 'Sum of first 20 terms of AP 2, 5, 8... is 610');

  // Euler Polyhedral formula: V - E + F = 2
  const cubeV = 8;
  const cubeE = 12;
  const cubeF = 6;
  assert.equal(cubeV - cubeE + cubeF, 2, 'Cube satisfies V - E + F = 2');
});

test('Interactive practice sheet includes authentic questions from Classes 6, 7, 8, and 9', async () => {
  const { sampleRandomQuestions, getQuestionCountByStage } = await import(
    '../data/practiceQuestionsData.ts'
  );

  const count6th = getQuestionCountByStage('6th');
  const count7th = getQuestionCountByStage('7th');
  const count8th = getQuestionCountByStage('8th');
  const count9th = getQuestionCountByStage('9th');

  assert.ok(count6th >= 30, `Expected at least 30 Class 6 questions, found ${count6th}`);
  assert.ok(count7th >= 45, `Expected at least 45 Class 7 questions, found ${count7th}`);
  assert.ok(count8th >= 42, `Expected at least 42 Class 8 questions, found ${count8th}`);
  assert.ok(count9th >= 24, `Expected at least 24 Class 9 questions, found ${count9th}`);

  // Test sampling 6 random questions from each middle-school stage
  for (const stg of ['6th', '7th', '8th', '9th'] as const) {
    const sampled = sampleRandomQuestions(6, stg);
    assert.equal(sampled.length, 6, `Should sample 6 questions for stage ${stg}`);
    const ids = new Set(sampled.map((q) => q.id));
    assert.equal(ids.size, 6, `All 6 questions in stage ${stg} should be distinct`);
    sampled.forEach((q) => {
      assert.equal(q.stage, stg);
      assert.ok(q.problem.length > 5);
      assert.equal(q.options.length, 4);
      assert.ok(q.correctIdx >= 0 && q.correctIdx <= 3);
      assert.ok(q.explanation.length > 5);
    });
  }
});
