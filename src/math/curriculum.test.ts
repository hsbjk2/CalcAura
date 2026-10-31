import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLASS_10_CHAPTERS,
  CLASS_12_CHAPTERS,
  groupChaptersByUnit,
} from '../data/curriculumData.ts';

test('Class 10 curriculum contains all 14 specified chapters', () => {
  assert.equal(CLASS_10_CHAPTERS.length, 14);
  const titles = CLASS_10_CHAPTERS.map((c) => c.title);
  assert.ok(titles.includes('Real Numbers'));
  assert.ok(titles.includes('Polynomials'));
  assert.ok(titles.includes('Pair of Linear Equations in Two Variables'));
  assert.ok(titles.includes('Quadratic Equations'));
  assert.ok(titles.includes('Arithmetic Progressions'));
  assert.ok(titles.includes('Triangles'));
  assert.ok(titles.includes('Coordinate Geometry'));
  assert.ok(titles.includes('Introduction to Trigonometry'));
  assert.ok(titles.includes('Applications of Trigonometry'));
  assert.ok(titles.includes('Circles'));
  assert.ok(titles.includes('Areas Related to Circles'));
  assert.ok(titles.includes('Surface Areas and Volumes'));
  assert.ok(titles.includes('Statistics'));
  assert.ok(titles.includes('Probability'));
});

test('Class 12 curriculum contains all 13 specified chapters', () => {
  assert.equal(CLASS_12_CHAPTERS.length, 13);
  const titles = CLASS_12_CHAPTERS.map((c) => c.title);
  assert.ok(titles.includes('Relations and Functions'));
  assert.ok(titles.includes('Inverse Trigonometric Functions'));
  assert.ok(titles.includes('Matrices'));
  assert.ok(titles.includes('Determinants'));
  assert.ok(titles.includes('Continuity and Differentiability'));
  assert.ok(titles.includes('Applications of Derivatives'));
  assert.ok(titles.includes('Integrals'));
  assert.ok(titles.includes('Applications of Integrals'));
  assert.ok(titles.includes('Differential Equations'));
  assert.ok(titles.includes('Vector Algebra'));
  assert.ok(titles.includes('Three-Dimensional Geometry'));
  assert.ok(titles.includes('Linear Programming'));
  assert.ok(titles.includes('Probability'));
});

test('Curriculum chapters map to valid stage targets in CalcAura', () => {
  const validStageIds = [
    'stage-01',
    'stage-02',
    'stage-03',
    'stage-04',
    'stage-05',
    'stage-06',
    'stage-07',
    'stage-08',
  ];

  for (const c of [...CLASS_10_CHAPTERS, ...CLASS_12_CHAPTERS]) {
    assert.ok(
      validStageIds.includes(c.targetStageId),
      `Chapter ${c.title} must have a valid stage ID, found ${c.targetStageId}`
    );
    assert.ok(c.latex.length > 0, `Chapter ${c.title} must have LaTeX preview`);
  }
});

test('groupChaptersByUnit groups chapters into structured unit groups', () => {
  const units10 = groupChaptersByUnit(CLASS_10_CHAPTERS);
  assert.ok(units10.length >= 4);
  const totalChapters10 = units10.reduce((acc, u) => acc + u.chapters.length, 0);
  assert.equal(totalChapters10, 14);

  const units12 = groupChaptersByUnit(CLASS_12_CHAPTERS);
  assert.ok(units12.length >= 4);
  const totalChapters12 = units12.reduce((acc, u) => acc + u.chapters.length, 0);
  assert.equal(totalChapters12, 13);
});
