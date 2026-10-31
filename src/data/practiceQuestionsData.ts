/**
 * Curated Question Bank of 255 Verified Mathematics Practice Problems
 * Categorized by Academic Stage:
 *  - 10th: Class 10 Secondary Mathematics (65 questions)
 *  - 12th: Class 12 Senior Secondary Mathematics (65 questions)
 *  - engineering: Applied Engineering Mathematics (65 questions)
 *  - graduation: Graduation / B.Sc / Higher Mathematics (60 questions)
 * 
 * User solves 6 questions per session; refreshing picks 6 random questions from the selected stage or full pool.
 */

import { CLASS_6_CHAPTERS } from './class6Data.ts';
import { CLASS_7_CHAPTERS } from './class7Data.ts';
import { CLASS_8_CHAPTERS } from './class8Data.ts';
import { CLASS_9_CHAPTERS } from './class9Data.ts';

export type AcademicStage =
  | '6th'
  | '7th'
  | '8th'
  | '9th'
  | '10th'
  | '12th'
  | 'engineering'
  | 'graduation';

export interface StageInfo {
  id: AcademicStage | 'all';
  label: string;
  shortLabel: string;
  badge: string;
  color: string;
  description: string;
}

export const STAGES_CONFIG: Record<AcademicStage | 'all', StageInfo> = {
  all: {
    id: 'all',
    label: 'All Stages',
    shortLabel: 'All',
    badge: 'Universal (396 Qs)',
    color: 'from-violet-600 to-fuchsia-600',
    description: 'Comprehensive mathematics question bank spanning Classes 6, 7, 8, 9, 10, 12, Engineering, and Higher Mathematics.',
  },
  '6th': {
    id: '6th',
    label: 'Class 6th',
    shortLabel: '6th',
    badge: 'Explorer (30 Qs)',
    color: 'from-teal-600 to-emerald-600',
    description: 'Class 6 Explorer: Patterns, Lines & Angles, Number Play, Data Handling, Prime Factors, Perimeter & Area, Fractions, Symmetry, and Integers.',
  },
  '7th': {
    id: '7th',
    label: 'Class 7th',
    shortLabel: '7th',
    badge: 'Intermediate (45 Qs)',
    color: 'from-emerald-600 to-teal-600',
    description: 'Class 7 Intermediate: Large Numbers, Arithmetic Expressions, Decimals, Integers, Letter-Numbers, Unknowns, Lines & Angles, Triangles, Congruence, and Fractions.',
  },
  '8th': {
    id: '8th',
    label: 'Class 8th',
    shortLabel: '8th',
    badge: 'Adv. Middle (42 Qs)',
    color: 'from-indigo-600 to-purple-600',
    description: 'Class 8 Advanced: Squares & Cubes, Exponent Rules, Number Stories, Quadrilaterals, Distributive Reasoning, Ratios, Baudhayana-Pythagoras, Algebra, and Area.',
  },
  '9th': {
    id: '9th',
    label: 'Class 9th',
    shortLabel: '9th',
    badge: 'Pre-Secondary (24 Qs)',
    color: 'from-cyan-600 to-blue-600',
    description: 'Class 9 Secondary Foundations: Cartesian Coordinates, Linear Polynomials, Real Numbers, Algebraic Identities, Circles, Heron Area, Probability, and Sequences.',
  },
  '10th': {
    id: '10th',
    label: 'Class 10th',
    shortLabel: '10th',
    badge: 'Secondary (65 Qs)',
    color: 'from-blue-600 to-indigo-600',
    description: 'Secondary Mathematics Core: Real Numbers, Polynomials, Linear Systems, Quadratics, AP, Geometry, Trigonometry, Statistics & Probability.',
  },
  '12th': {
    id: '12th',
    label: 'Class 12th',
    shortLabel: '12th',
    badge: 'Sr. Secondary (65 Qs)',
    color: 'from-purple-600 to-pink-600',
    description: 'Class 12 Senior Core: Relations & Functions, Matrices, Determinants, Calculus, Differential Equations, Vectors, 3D Geometry & Bayes Theorem.',
  },
  engineering: {
    id: 'engineering',
    label: 'Engineering',
    shortLabel: 'Engg',
    badge: 'B.Tech / B.E. (65 Qs)',
    color: 'from-amber-600 to-orange-600',
    description: 'B.Tech & B.E. Engineering Mathematics: Eigenvalues, Green-Stokes-Gauss theorems, Laplace & Fourier, PDEs, and Numerical Methods.',
  },
  graduation: {
    id: 'graduation',
    label: 'Graduation',
    shortLabel: 'Graduation',
    badge: 'B.Sc / Higher (60 Qs)',
    color: 'from-emerald-600 to-teal-600',
    description: 'Higher Degree Mathematics: Abstract Algebra (Groups, Rings, Fields), Real & Complex Analysis, Topology, Functional Analysis, and Graph Theory.',
  },
};

export interface PracticeQuestion {
  id: number;
  stage: AcademicStage;
  topic: string;
  category: string;
  problem: string;
  latex?: string;
  options: string[];
  correctIdx: number;
  explanation: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

const RAW_PRACTICE_QUESTIONS_BANK: PracticeQuestion[] = [
  {
    "id": 1,
    "stage": "10th",
    "topic": "Real Numbers — Euclid Division Lemma",
    "category": "Number Systems",
    "problem": "Find the Highest Common Factor (HCF) of 135 and 225 using Euclid’s algorithm.",
    "latex": "\\text{HCF}(135, 225) = ?",
    "options": [
      "15",
      "45",
      "25",
      "75"
    ],
    "correctIdx": 1,
    "explanation": "225 = 135(1) + 90, 135 = 90(1) + 45, 90 = 45(2) + 0. Remainder is 0, so HCF is 45.",
    "difficulty": "Basic"
  },
  {
    "id": 2,
    "stage": "10th",
    "topic": "Real Numbers — Prime Factorization",
    "category": "Number Systems",
    "problem": "What is the prime factorization of 140 in exponent form?",
    "latex": "140 = 2^a \\cdot 5^b \\cdot 7^c",
    "options": [
      "2² × 5 × 7",
      "2³ × 5 × 7",
      "2 × 5² × 7",
      "2² × 3 × 7"
    ],
    "correctIdx": 0,
    "explanation": "140 ÷ 2 = 70; 70 ÷ 2 = 35; 35 ÷ 5 = 7; 7 ÷ 7 = 1. Thus 140 = 2² × 5 × 7.",
    "difficulty": "Basic"
  },
  {
    "id": 3,
    "stage": "10th",
    "topic": "Real Numbers — HCF & LCM Relation",
    "category": "Number Systems",
    "problem": "If HCF(306, 657) = 9, what is LCM(306, 657)?",
    "latex": "\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b",
    "options": [
      "21,538",
      "24,118",
      "22,338",
      "20,838"
    ],
    "correctIdx": 2,
    "explanation": "LCM = (306 × 657) / 9 = 34 × 657 = 22,338.",
    "difficulty": "Intermediate"
  },
  {
    "id": 4,
    "stage": "10th",
    "topic": "Real Numbers — Irrationality Property",
    "category": "Number Systems",
    "problem": "Which of the following numbers is irrational?",
    "latex": "x \\in \\mathbb{R} \\setminus \\mathbb{Q}",
    "options": [
      "√9",
      "0.375",
      "22/7",
      "√5"
    ],
    "correctIdx": 3,
    "explanation": "√5 cannot be expressed as a ratio of integers p/q, hence it is irrational.",
    "difficulty": "Basic"
  },
  {
    "id": 5,
    "stage": "10th",
    "topic": "Real Numbers — Terminating Decimals",
    "category": "Number Systems",
    "problem": "After how many decimal places will 13 / (2⁴ × 5³) terminate?",
    "latex": "\\frac{13}{2^4 \\times 5^3} = \\frac{65}{10^4}",
    "options": [
      "4 places",
      "3 places",
      "7 places",
      "1 place"
    ],
    "correctIdx": 0,
    "explanation": "The maximum exponent between 2⁴ and 5³ is 4, so it terminates after 4 decimal places.",
    "difficulty": "Intermediate"
  },
  {
    "id": 6,
    "stage": "10th",
    "topic": "Polynomials — Zeroes of Quadratic Polynomial",
    "category": "Algebra",
    "problem": "What are the zeroes of the quadratic polynomial p(x) = x² − 2x − 8?",
    "latex": "x^2 - 2x - 8 = 0",
    "options": [
      "−4 and 2",
      "4 and −2",
      "2 and 8",
      "−2 and −4"
    ],
    "correctIdx": 1,
    "explanation": "Factoring gives (x − 4)(x + 2) = 0 => x = 4, x = −2.",
    "difficulty": "Basic"
  },
  {
    "id": 7,
    "stage": "10th",
    "topic": "Polynomials — Sum and Product of Zeroes",
    "category": "Algebra",
    "problem": "If α and β are zeroes of 2x² + 5x − 12, find (α + β) + αβ.",
    "latex": "\\alpha + \\beta = -\\frac{5}{2}, \\quad \\alpha\\beta = -6",
    "options": [
      "−17/2",
      "−1/2",
      "7/2",
      "−7/2"
    ],
    "correctIdx": 0,
    "explanation": "α + β = −5/2 and αβ = −6. Sum = −5/2 + (−6) = −17/2.",
    "difficulty": "Intermediate"
  },
  {
    "id": 8,
    "stage": "10th",
    "topic": "Polynomials — Constructing Polynomial",
    "category": "Algebra",
    "problem": "Find a quadratic polynomial whose sum of zeroes is −3 and product is 2.",
    "latex": "p(x) = x^2 - (\\alpha + \\beta)x + \\alpha\\beta",
    "options": [
      "x² − 3x + 2",
      "x² − 3x − 2",
      "x² + 3x + 2",
      "x² + 3x − 2"
    ],
    "correctIdx": 2,
    "explanation": "x² − (−3)x + 2 = x² + 3x + 2.",
    "difficulty": "Basic"
  },
  {
    "id": 9,
    "stage": "10th",
    "topic": "Linear Equations — Infinite Solutions Condition",
    "category": "Algebra",
    "problem": "For what k will 2x + 3y = 7 and (k−1)x + (k+2)y = 3k have infinitely many solutions?",
    "latex": "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}",
    "options": [
      "k = 5",
      "k = 4",
      "k = 3",
      "k = 7"
    ],
    "correctIdx": 3,
    "explanation": "2/(k−1) = 3/(k+2) => 2k + 4 = 3k − 3 => k = 7. Checking 7/(3×7) = 1/3, satisfied.",
    "difficulty": "Intermediate"
  },
  {
    "id": 10,
    "stage": "10th",
    "topic": "Linear Equations — Parallel Lines",
    "category": "Algebra",
    "problem": "If 3x + 2ky = 2 and 2x + 5y + 1 = 0 are parallel, find k.",
    "latex": "\\frac{3}{2} = \\frac{2k}{5}",
    "options": [
      "15/4",
      "4/15",
      "5/3",
      "−15/4"
    ],
    "correctIdx": 0,
    "explanation": "3/2 = 2k/5 => 4k = 15 => k = 15/4.",
    "difficulty": "Basic"
  },
  {
    "id": 11,
    "stage": "10th",
    "topic": "Linear Equations — Intersection Coordinates",
    "category": "Algebra",
    "problem": "Find the intersection point of x + y = 14 and x − y = 4.",
    "latex": "\\begin{cases} x + y = 14 \\\\ x - y = 4 \\end{cases}",
    "options": [
      "(8, 6)",
      "(9, 5)",
      "(10, 4)",
      "(7, 7)"
    ],
    "correctIdx": 1,
    "explanation": "Adding: 2x = 18 => x = 9. Then y = 14 − 9 = 5.",
    "difficulty": "Basic"
  },
  {
    "id": 12,
    "stage": "10th",
    "topic": "Quadratic Equations — Nature of Roots",
    "category": "Algebra",
    "problem": "Determine the nature of the roots of 2x² − 6x + 3 = 0.",
    "latex": "D = b^2 - 4ac",
    "options": [
      "Equal real roots",
      "No real roots",
      "Two distinct real roots",
      "One real and one imaginary"
    ],
    "correctIdx": 2,
    "explanation": "D = (−6)² − 4(2)(3) = 36 − 24 = 12 > 0. Two distinct real roots.",
    "difficulty": "Basic"
  },
  {
    "id": 13,
    "stage": "10th",
    "topic": "Quadratic Equations — Equal Roots Condition",
    "category": "Algebra",
    "problem": "Find the positive value of k for which 2x² + kx + 3 = 0 has two equal roots.",
    "latex": "D = k^2 - 24 = 0",
    "options": [
      "√6",
      "24",
      "4√3",
      "2√6"
    ],
    "correctIdx": 3,
    "explanation": "D = k² − 24 = 0 => k = √24 = 2√6.",
    "difficulty": "Intermediate"
  },
  {
    "id": 14,
    "stage": "10th",
    "topic": "Quadratic Equations — Reciprocal Roots",
    "category": "Algebra",
    "problem": "If one root of 5x² + 13x + k = 0 is the reciprocal of the other, find k.",
    "latex": "\\alpha \\cdot \\frac{1}{\\alpha} = \\frac{k}{5} = 1",
    "options": [
      "5",
      "13",
      "−5",
      "1/5"
    ],
    "correctIdx": 0,
    "explanation": "Product of roots is 1: k/5 = 1 => k = 5.",
    "difficulty": "Basic"
  },
  {
    "id": 15,
    "stage": "10th",
    "topic": "Arithmetic Progressions — 30th Term",
    "category": "Sequences",
    "problem": "Find the 30th term of the AP: 10, 7, 4, ...",
    "latex": "a_n = a + (n - 1)d",
    "options": [
      "77",
      "−77",
      "−87",
      "−70"
    ],
    "correctIdx": 1,
    "explanation": "a = 10, d = −3. a₃₀ = 10 + 29(−3) = 10 − 87 = −77.",
    "difficulty": "Basic"
  },
  {
    "id": 16,
    "stage": "10th",
    "topic": "Arithmetic Progressions — Sum of 20 Terms",
    "category": "Sequences",
    "problem": "Find the sum of the first 20 terms of the AP: 2, 7, 12, 17, ...",
    "latex": "S_{20} = \\frac{20}{2}[2(2) + 19(5)]",
    "options": [
      "980",
      "1020",
      "990",
      "970"
    ],
    "correctIdx": 2,
    "explanation": "S₂₀ = 10[4 + 95] = 10 × 99 = 990.",
    "difficulty": "Basic"
  },
  {
    "id": 17,
    "stage": "10th",
    "topic": "Arithmetic Progressions — Number of Terms for Given Sum",
    "category": "Sequences",
    "problem": "How many terms of the AP 9, 17, 25, ... give a sum of 636?",
    "latex": "\\frac{n}{2}[18 + (n - 1)8] = 636",
    "options": [
      "14",
      "10",
      "16",
      "12"
    ],
    "correctIdx": 3,
    "explanation": "n(4n + 5) = 636 => 4n² + 5n − 636 = 0 => (4n + 53)(n − 12) = 0 => n = 12.",
    "difficulty": "Intermediate"
  },
  {
    "id": 18,
    "stage": "10th",
    "topic": "Arithmetic Progressions — Common Difference from S_n",
    "category": "Sequences",
    "problem": "If the sum of n terms is S_n = 3n² + 5n, find the common difference d.",
    "latex": "d = S_2 - 2S_1",
    "options": [
      "6",
      "3",
      "8",
      "5"
    ],
    "correctIdx": 0,
    "explanation": "S₁ = 8, S₂ = 22. a₁ = 8, a₂ = 14 => d = 14 − 8 = 6.",
    "difficulty": "Intermediate"
  },
  {
    "id": 19,
    "stage": "10th",
    "topic": "Coordinate Geometry — Distance Between Points",
    "category": "Geometry",
    "problem": "What is the distance between A(2, 3) and B(4, 1)?",
    "latex": "d = \\sqrt{(4-2)^2 + (1-3)^2}",
    "options": [
      "4",
      "2√2",
      "8",
      "√8/2"
    ],
    "correctIdx": 1,
    "explanation": "d = √(2² + (−2)²) = √(4 + 4) = √8 = 2√2.",
    "difficulty": "Basic"
  },
  {
    "id": 20,
    "stage": "10th",
    "topic": "Coordinate Geometry — Section Formula",
    "category": "Geometry",
    "problem": "Find the point dividing (−1, 7) and (4, −3) in ratio 2 : 3.",
    "latex": "x = \\frac{2(4)+3(-1)}{5}, \\quad y = \\frac{2(-3)+3(7)}{5}",
    "options": [
      "(2, 4)",
      "(0, 3)",
      "(1, 3)",
      "(1, 5)"
    ],
    "correctIdx": 2,
    "explanation": "x = (8 − 3)/5 = 1, y = (−6 + 21)/5 = 3. Point is (1, 3).",
    "difficulty": "Intermediate"
  },
  {
    "id": 21,
    "stage": "10th",
    "topic": "Coordinate Geometry — Midpoint",
    "category": "Geometry",
    "problem": "If P(a/3, 4) is the midpoint of Q(−6, 5) and R(−2, 3), find a.",
    "latex": "\\frac{a}{3} = \\frac{-6 + (-2)}{2}",
    "options": [
      "−4",
      "12",
      "−6",
      "−12"
    ],
    "correctIdx": 3,
    "explanation": "a/3 = −8/2 = −4 => a = −12.",
    "difficulty": "Basic"
  },
  {
    "id": 22,
    "stage": "10th",
    "topic": "Coordinate Geometry — Collinear Points",
    "category": "Geometry",
    "problem": "For what k are (2, 3), (4, k), and (6, −3) collinear?",
    "latex": "2(k + 3) + 4(-3 - 3) + 6(3 - k) = 0",
    "options": [
      "0",
      "2",
      "−1",
      "3"
    ],
    "correctIdx": 0,
    "explanation": "2k + 6 − 24 + 18 − 6k = 0 => −4k = 0 => k = 0.",
    "difficulty": "Intermediate"
  },
  {
    "id": 23,
    "stage": "10th",
    "topic": "Triangles — Thales Theorem",
    "category": "Geometry",
    "problem": "In ΔABC, DE || BC. If AD = 1.5 cm, DB = 3 cm, AE = 1 cm, find EC.",
    "latex": "\\frac{AD}{DB} = \\frac{AE}{EC}",
    "options": [
      "1.5 cm",
      "2 cm",
      "3 cm",
      "2.5 cm"
    ],
    "correctIdx": 1,
    "explanation": "1.5 / 3 = 1 / EC => 1/2 = 1/EC => EC = 2 cm.",
    "difficulty": "Basic"
  },
  {
    "id": 24,
    "stage": "10th",
    "topic": "Triangles — Areas of Similar Triangles",
    "category": "Geometry",
    "problem": "ΔABC ~ ΔDEF, area(ABC) = 64 cm², area(DEF) = 121 cm², EF = 15.4 cm. Find BC.",
    "latex": "\\frac{BC^2}{15.4^2} = \\frac{64}{121}",
    "options": [
      "8.4 cm",
      "10.5 cm",
      "11.2 cm",
      "12.8 cm"
    ],
    "correctIdx": 2,
    "explanation": "BC / 15.4 = 8 / 11 => BC = (8 × 15.4) / 11 = 11.2 cm.",
    "difficulty": "Intermediate"
  },
  {
    "id": 25,
    "stage": "10th",
    "topic": "Triangles — Pythagoras Theorem",
    "category": "Geometry",
    "problem": "A 10 m ladder reaches a window 8 m high. Find the distance of its foot from the wall.",
    "latex": "d = \\sqrt{10^2 - 8^2}",
    "options": [
      "2 m",
      "4 m",
      "8 m",
      "6 m"
    ],
    "correctIdx": 3,
    "explanation": "base = √(100 − 64) = √36 = 6 m.",
    "difficulty": "Basic"
  },
  {
    "id": 26,
    "stage": "10th",
    "topic": "Trigonometry — Secant & Tangent Identity",
    "category": "Trigonometry",
    "problem": "Evaluate: 9 sec²A − 9 tan²A.",
    "latex": "9(\\sec^2 A - \\tan^2 A) = 9(1)",
    "options": [
      "9",
      "1",
      "0",
      "8"
    ],
    "correctIdx": 0,
    "explanation": "sec²A − tan²A = 1 => 9(1) = 9.",
    "difficulty": "Basic"
  },
  {
    "id": 27,
    "stage": "10th",
    "topic": "Trigonometry — Double Angle Value",
    "category": "Trigonometry",
    "problem": "Find the numerical value of (2 tan 30°) / (1 + tan² 30°).",
    "latex": "\\frac{2(1/\\sqrt{3})}{1 + 1/3} = \\frac{\\sqrt{3}}{2}",
    "options": [
      "1/2",
      "√3/2",
      "√3",
      "1"
    ],
    "correctIdx": 1,
    "explanation": "(2/√3) / (4/3) = √3/2 (which is sin 60°).",
    "difficulty": "Basic"
  },
  {
    "id": 28,
    "stage": "10th",
    "topic": "Trigonometry — Cosine from Sine",
    "category": "Trigonometry",
    "problem": "If sin A = 3/5, find cos A.",
    "latex": "\\cos A = \\sqrt{1 - \\sin^2 A}",
    "options": [
      "3/4",
      "5/4",
      "4/5",
      "4/3"
    ],
    "correctIdx": 2,
    "explanation": "cos A = √(1 − 9/25) = √(16/25) = 4/5.",
    "difficulty": "Basic"
  },
  {
    "id": 29,
    "stage": "10th",
    "topic": "Trigonometry — Complementary Angles",
    "category": "Trigonometry",
    "problem": "Evaluate: sin 18° / cos 72°.",
    "latex": "\\cos 72^\\circ = \\sin(90^\\circ - 72^\\circ) = \\sin 18^\\circ",
    "options": [
      "0",
      "1/2",
      "−1",
      "1"
    ],
    "correctIdx": 3,
    "explanation": "cos 72° = sin 18° => sin 18° / sin 18° = 1.",
    "difficulty": "Basic"
  },
  {
    "id": 30,
    "stage": "10th",
    "topic": "Trigonometry — Sun Elevation",
    "category": "Trigonometry",
    "problem": "The shadow of a tower is √3 times its height. What is the sun’s angle of elevation?",
    "latex": "\\tan\\theta = \\frac{h}{h\\sqrt{3}} = \\frac{1}{\\sqrt{3}}",
    "options": [
      "30°",
      "45°",
      "60°",
      "90°"
    ],
    "correctIdx": 0,
    "explanation": "tan θ = 1/√3 => θ = 30°.",
    "difficulty": "Basic"
  },
  {
    "id": 31,
    "stage": "10th",
    "topic": "Trigonometry — String of Flying Kite",
    "category": "Trigonometry",
    "problem": "A kite at height 60 m has string inclined at 60° to horizontal. Find string length.",
    "latex": "\\sin 60^\\circ = \\frac{60}{L} \\implies L = \\frac{120}{\\sqrt{3}}",
    "options": [
      "30√3 m",
      "40√3 m",
      "120 m",
      "60√2 m"
    ],
    "correctIdx": 1,
    "explanation": "L = 60 / sin 60° = 60 / (√3/2) = 120 / √3 = 40√3 m.",
    "difficulty": "Intermediate"
  },
  {
    "id": 32,
    "stage": "10th",
    "topic": "Circles — Angle Between Tangents",
    "category": "Geometry",
    "problem": "Tangents PA and PB to circle O are inclined at 80°. Find ∠POA.",
    "latex": "\\angle AOB = 180^\\circ - 80^\\circ = 100^\\circ",
    "options": [
      "60°",
      "70°",
      "50°",
      "80°"
    ],
    "correctIdx": 2,
    "explanation": "∠AOB = 180° − 80° = 100°. Line PO bisects ∠AOB => ∠POA = 50°.",
    "difficulty": "Intermediate"
  },
  {
    "id": 33,
    "stage": "10th",
    "topic": "Circles — Tangent Length & Radius",
    "category": "Geometry",
    "problem": "A point P is 25 cm from circle centre O. Tangent PT is 24 cm. Find radius.",
    "latex": "r = \\sqrt{25^2 - 24^2}",
    "options": [
      "6 cm",
      "12 cm",
      "9 cm",
      "7 cm"
    ],
    "correctIdx": 3,
    "explanation": "r = √(625 − 576) = √49 = 7 cm.",
    "difficulty": "Basic"
  },
  {
    "id": 34,
    "stage": "10th",
    "topic": "Circles — Concentric Circles Chord",
    "category": "Geometry",
    "problem": "Concentric circles have radii 5 cm and 3 cm. Find chord length of outer touching inner.",
    "latex": "L = 2\\sqrt{5^2 - 3^2}",
    "options": [
      "8 cm",
      "4 cm",
      "10 cm",
      "6 cm"
    ],
    "correctIdx": 0,
    "explanation": "Half chord = √(25 − 9) = 4 cm => full chord = 8 cm.",
    "difficulty": "Intermediate"
  },
  {
    "id": 35,
    "stage": "10th",
    "topic": "Areas of Circles — Sector Area",
    "category": "Mensuration",
    "problem": "Find the area of sector of circle radius 6 cm with angle 60° (π = 22/7).",
    "latex": "\\text{Area} = \\frac{60}{360} \\times \\frac{22}{7} \\times 36",
    "options": [
      "66/7 cm²",
      "132/7 cm²",
      "144/7 cm²",
      "120/7 cm²"
    ],
    "correctIdx": 1,
    "explanation": "(1/6) × (22/7) × 36 = 132/7 cm².",
    "difficulty": "Basic"
  },
  {
    "id": 36,
    "stage": "10th",
    "topic": "Areas of Circles — Quadrant Area",
    "category": "Mensuration",
    "problem": "Find the area of a circle quadrant whose circumference is 22 cm.",
    "latex": "2\\pi r = 22 \\implies r = 3.5, \\quad \\frac{1}{4}\\pi r^2",
    "options": [
      "77/4 cm²",
      "22/7 cm²",
      "77/8 cm²",
      "35/4 cm²"
    ],
    "correctIdx": 2,
    "explanation": "2(22/7)r = 22 => r = 7/2. Area = (1/4)(22/7)(49/4) = 77/8 cm².",
    "difficulty": "Intermediate"
  },
  {
    "id": 37,
    "stage": "10th",
    "topic": "Surface Areas & Volumes — Two Joined Cubes",
    "category": "Mensuration",
    "problem": "Two cubes of volume 64 cm³ each are joined end-to-end. Find surface area of cuboid.",
    "latex": "a = 4, \\quad 2(8\\cdot 4 + 4\\cdot 4 + 8\\cdot 4)",
    "options": [
      "128 cm²",
      "192 cm²",
      "144 cm²",
      "160 cm²"
    ],
    "correctIdx": 3,
    "explanation": "Edge = 4 cm. Cuboid is 8 × 4 × 4. Surface area = 2(32 + 16 + 32) = 160 cm².",
    "difficulty": "Intermediate"
  },
  {
    "id": 38,
    "stage": "10th",
    "topic": "Surface Areas & Volumes — Toy Height",
    "category": "Mensuration",
    "problem": "A toy has cone on hemisphere of radius 3.5 cm. Total height is 15.5 cm. Find cone height.",
    "latex": "h = 15.5 - 3.5",
    "options": [
      "12 cm",
      "10 cm",
      "11.5 cm",
      "13 cm"
    ],
    "correctIdx": 0,
    "explanation": "Height of cone = total height − radius = 15.5 − 3.5 = 12 cm.",
    "difficulty": "Basic"
  },
  {
    "id": 39,
    "stage": "10th",
    "topic": "Surface Areas & Volumes — Recasting Sphere to Cylinder",
    "category": "Mensuration",
    "problem": "A metallic sphere of radius 4.2 cm is melted into a cylinder of radius 6 cm. Find cylinder height.",
    "latex": "\\frac{4}{3}\\pi(4.2)^3 = \\pi(6)^2 h",
    "options": [
      "3.12 cm",
      "2.74 cm",
      "2.45 cm",
      "1.98 cm"
    ],
    "correctIdx": 1,
    "explanation": "(4/3)(74.088) = 36h => 98.784 = 36h => h ≈ 2.74 cm.",
    "difficulty": "Intermediate"
  },
  {
    "id": 40,
    "stage": "10th",
    "topic": "Statistics — Empirical Relationship",
    "category": "Statistics",
    "problem": "If Mode = 24 and Mean = 60, find Median using the empirical relationship.",
    "latex": "\\text{Mode} = 3\\text{Median} - 2\\text{Mean}",
    "options": [
      "52",
      "44",
      "48",
      "56"
    ],
    "correctIdx": 2,
    "explanation": "24 = 3 Median − 120 => 3 Median = 144 => Median = 48.",
    "difficulty": "Basic"
  },
  {
    "id": 41,
    "stage": "10th",
    "topic": "Statistics — Mean of First 9 Natural Numbers",
    "category": "Statistics",
    "problem": "What is the arithmetic mean of the first 9 natural numbers?",
    "latex": "\\bar{x} = \\frac{9+1}{2}",
    "options": [
      "4.5",
      "5.5",
      "6",
      "5"
    ],
    "correctIdx": 3,
    "explanation": "Sum = 9(10)/2 = 45 => Mean = 45 / 9 = 5.",
    "difficulty": "Basic"
  },
  {
    "id": 42,
    "stage": "10th",
    "topic": "Probability — Single Die Prime Outcome",
    "category": "Probability",
    "problem": "A fair six-sided die is rolled once. What is the probability of obtaining a prime number?",
    "latex": "P(\\text{prime}) = \\frac{|\\{2,3,5\\}|}{6}",
    "options": [
      "1/2",
      "1/3",
      "2/3",
      "1/6"
    ],
    "correctIdx": 0,
    "explanation": "Primes in {1, 2, 3, 4, 5, 6} are {2, 3, 5} (3 primes). 3/6 = 1/2.",
    "difficulty": "Basic"
  },
  {
    "id": 43,
    "stage": "10th",
    "topic": "Probability — Red King from Standard Deck",
    "category": "Probability",
    "problem": "A card is drawn from a standard deck of 52 cards. What is the probability of a red king?",
    "latex": "P(E) = \\frac{2}{52}",
    "options": [
      "1/52",
      "1/26",
      "1/13",
      "2/13"
    ],
    "correctIdx": 1,
    "explanation": "There are 2 red kings (hearts and diamonds). P = 2/52 = 1/26.",
    "difficulty": "Basic"
  },
  {
    "id": 44,
    "stage": "10th",
    "topic": "Probability — Complementary Event",
    "category": "Probability",
    "problem": "If P(E) = 0.05, what is P(not E)?",
    "latex": "P(\\bar{E}) = 1 - 0.05",
    "options": [
      "0.05",
      "0.50",
      "0.95",
      "0.90"
    ],
    "correctIdx": 2,
    "explanation": "P(not E) = 1 − 0.05 = 0.95.",
    "difficulty": "Basic"
  },
  {
    "id": 45,
    "stage": "10th",
    "topic": "Polynomials — Graph Crossings and Zeroes",
    "category": "Algebra",
    "problem": "If y = p(x) intersects the x-axis at 3 distinct points, how many real roots does it have?",
    "latex": "p(x) = 0",
    "options": [
      "2",
      "1",
      "4",
      "3"
    ],
    "correctIdx": 3,
    "explanation": "Each x-intercept corresponds to a real root of the polynomial.",
    "difficulty": "Basic"
  },
  {
    "id": 46,
    "stage": "10th",
    "topic": "Polynomials — Cubic Vieta Product",
    "category": "Algebra",
    "problem": "For ax³ + bx² + cx + d = 0 with roots α, β, γ, what is αβγ?",
    "latex": "\\alpha\\beta\\gamma = -\\frac{d}{a}",
    "options": [
      "−d/a",
      "d/a",
      "−c/a",
      "c/a"
    ],
    "correctIdx": 0,
    "explanation": "By Vieta formulas, the product of three roots is −d/a.",
    "difficulty": "Intermediate"
  },
  {
    "id": 47,
    "stage": "10th",
    "topic": "Linear Equations — Slope of 3x + 4y = 12",
    "category": "Algebra",
    "problem": "What is the slope of the linear equation 3x + 4y = 12?",
    "latex": "m = -\\frac{a}{b}",
    "options": [
      "3/4",
      "−3/4",
      "4/3",
      "−4/3"
    ],
    "correctIdx": 1,
    "explanation": "4y = −3x + 12 => y = (−3/4)x + 3. Slope m = −3/4.",
    "difficulty": "Basic"
  },
  {
    "id": 48,
    "stage": "10th",
    "topic": "Quadratic Equations — Discriminant Calculation",
    "category": "Algebra",
    "problem": "Find the discriminant of 3x² − 5x + 2 = 0.",
    "latex": "D = (-5)^2 - 4(3)(2)",
    "options": [
      "25",
      "49",
      "1",
      "−1"
    ],
    "correctIdx": 2,
    "explanation": "D = 25 − 24 = 1.",
    "difficulty": "Basic"
  },
  {
    "id": 49,
    "stage": "10th",
    "topic": "Arithmetic Progressions — Common Difference from Terms",
    "category": "Sequences",
    "problem": "In an AP, if a₁₈ − a₁₄ = 32, find the common difference d.",
    "latex": "4d = 32",
    "options": [
      "4",
      "6",
      "16",
      "8"
    ],
    "correctIdx": 3,
    "explanation": "(a + 17d) − (a + 13d) = 4d = 32 => d = 8.",
    "difficulty": "Basic"
  },
  {
    "id": 50,
    "stage": "10th",
    "topic": "Coordinate Geometry — Centroid Coordinates",
    "category": "Geometry",
    "problem": "Find the centroid of triangle with vertices (3, −5), (−7, 4), and (10, −2).",
    "latex": "G = \\left(\\frac{3-7+10}{3}, \\frac{-5+4-2}{3}\\right)",
    "options": [
      "(2, −1)",
      "(3, −1)",
      "(2, 1)",
      "(6, −3)"
    ],
    "correctIdx": 0,
    "explanation": "x = 6/3 = 2, y = −3/3 = −1. G = (2, −1).",
    "difficulty": "Basic"
  },
  {
    "id": 51,
    "stage": "10th",
    "topic": "Trigonometry — Cosecant Identity",
    "category": "Trigonometry",
    "problem": "What is 1 + cot² θ equal to?",
    "latex": "1 + \\cot^2\\theta = \\csc^2\\theta",
    "options": [
      "sec² θ",
      "csc² θ",
      "sin² θ",
      "tan² θ"
    ],
    "correctIdx": 1,
    "explanation": "Fundamental identity: 1 + cot²θ = csc²θ.",
    "difficulty": "Basic"
  },
  {
    "id": 52,
    "stage": "10th",
    "topic": "Circles — Inscribed Angle in Semicircle",
    "category": "Geometry",
    "problem": "What is the measure of an angle inscribed in a semicircle?",
    "latex": "\\theta = 90^\\circ",
    "options": [
      "60°",
      "45°",
      "90°",
      "180°"
    ],
    "correctIdx": 2,
    "explanation": "Thales Theorem proves that the angle subtended by a diameter is always 90°.",
    "difficulty": "Basic"
  },
  {
    "id": 53,
    "stage": "10th",
    "topic": "Circles — Cyclic Quadrilateral Opposite Angles",
    "category": "Geometry",
    "problem": "In a cyclic quadrilateral ABCD, if ∠A = 70°, find ∠C.",
    "latex": "\\angle A + \\angle C = 180^\\circ",
    "options": [
      "70°",
      "90°",
      "120°",
      "110°"
    ],
    "correctIdx": 3,
    "explanation": "Opposite angles of cyclic quad sum to 180°: 180° − 70° = 110°.",
    "difficulty": "Basic"
  },
  {
    "id": 54,
    "stage": "10th",
    "topic": "Areas of Circles — Perimeter of Protractor",
    "category": "Mensuration",
    "problem": "What is the perimeter of a semicircular protractor of radius r?",
    "latex": "P = \\pi r + 2r",
    "options": [
      "πr + 2r",
      "2πr",
      "πr",
      "πr² / 2"
    ],
    "correctIdx": 0,
    "explanation": "The boundary is semicircular arc (πr) plus the diameter (2r).",
    "difficulty": "Basic"
  },
  {
    "id": 55,
    "stage": "10th",
    "topic": "Surface Areas & Volumes — Cone Curved Area",
    "category": "Mensuration",
    "problem": "What is the curved surface area of a cone of radius r and slant height l?",
    "latex": "\\text{CSA} = \\pi r l",
    "options": [
      "2πrl",
      "πrl",
      "πr(l + r)",
      "1/3 πr²h"
    ],
    "correctIdx": 1,
    "explanation": "The formula for the curved surface area of a right circular cone is πrl.",
    "difficulty": "Basic"
  },
  {
    "id": 56,
    "stage": "10th",
    "topic": "Surface Areas & Volumes — Sphere Volume",
    "category": "Mensuration",
    "problem": "Find the volume of a sphere with diameter 6 cm.",
    "latex": "V = \\frac{4}{3}\\pi(3)^3",
    "options": [
      "144π cm³",
      "288π cm³",
      "36π cm³",
      "18π cm³"
    ],
    "correctIdx": 2,
    "explanation": "Radius r = 3 cm. V = (4/3)π(27) = 36π cm³.",
    "difficulty": "Basic"
  },
  {
    "id": 57,
    "stage": "10th",
    "topic": "Statistics — Midpoint of Class Interval",
    "category": "Statistics",
    "problem": "What is the class mark of the interval 25 − 35?",
    "latex": "\\frac{25 + 35}{2} = 30",
    "options": [
      "35",
      "25",
      "10",
      "30"
    ],
    "correctIdx": 3,
    "explanation": "(25 + 35)/2 = 60/2 = 30.",
    "difficulty": "Basic"
  },
  {
    "id": 58,
    "stage": "10th",
    "topic": "Probability — Two Coins Toss",
    "category": "Probability",
    "problem": "Two fair coins are tossed. What is the probability of getting at least one head?",
    "latex": "P = \\frac{|\\{HH, HT, TH\\}|}{4}",
    "options": [
      "3/4",
      "1/2",
      "1/4",
      "1"
    ],
    "correctIdx": 0,
    "explanation": "Favorable outcomes {HH, HT, TH} = 3 out of 4 total => 3/4.",
    "difficulty": "Basic"
  },
  {
    "id": 59,
    "stage": "10th",
    "topic": "Probability — Probability of Impossible Event",
    "category": "Probability",
    "problem": "What is the probability of an impossible event?",
    "latex": "P(\\emptyset) = 0",
    "options": [
      "1",
      "0",
      "0.5",
      "−1"
    ],
    "correctIdx": 1,
    "explanation": "An impossible event has 0 outcomes, hence probability is strictly 0.",
    "difficulty": "Basic"
  },
  {
    "id": 60,
    "stage": "10th",
    "topic": "Coordinate Geometry — Distance to Origin",
    "category": "Geometry",
    "problem": "Find the distance of point P(−6, 8) from origin.",
    "latex": "d = \\sqrt{(-6)^2 + 8^2}",
    "options": [
      "14",
      "2",
      "10",
      "√28"
    ],
    "correctIdx": 2,
    "explanation": "d = √(36 + 64) = √100 = 10.",
    "difficulty": "Basic"
  },
  {
    "id": 61,
    "stage": "10th",
    "topic": "Triangles — Angle Bisector Ratio",
    "category": "Geometry",
    "problem": "In ΔABC, AD bisects ∠A. If AB = 6 cm, AC = 8 cm, BD = 3 cm, find DC.",
    "latex": "\\frac{6}{8} = \\frac{3}{DC}",
    "options": [
      "3 cm",
      "5 cm",
      "4.5 cm",
      "4 cm"
    ],
    "correctIdx": 3,
    "explanation": "6/8 = 3/DC => 3/4 = 3/DC => DC = 4 cm.",
    "difficulty": "Intermediate"
  },
  {
    "id": 62,
    "stage": "10th",
    "topic": "Trigonometry — Reciprocal Identity Sum",
    "category": "Trigonometry",
    "problem": "Evaluate: (sin θ)(csc θ) + (cos θ)(sec θ).",
    "latex": "1 + 1 = 2",
    "options": [
      "2",
      "1",
      "0",
      "4"
    ],
    "correctIdx": 0,
    "explanation": "sin θ csc θ = 1, cos θ sec θ = 1 => 1 + 1 = 2.",
    "difficulty": "Basic"
  },
  {
    "id": 63,
    "stage": "10th",
    "topic": "Real Numbers — Terminating Exponents",
    "category": "Number Systems",
    "problem": "The denominator of 7/80 in prime factor form is:",
    "latex": "80 = 2^4 \\times 5",
    "options": [
      "2³ × 5",
      "2⁴ × 5",
      "2² × 5²",
      "2⁵ × 5"
    ],
    "correctIdx": 1,
    "explanation": "80 = 16 × 5 = 2⁴ × 5.",
    "difficulty": "Basic"
  },
  {
    "id": 64,
    "stage": "10th",
    "topic": "Arithmetic Progressions — 10th Term from End",
    "category": "Sequences",
    "problem": "Find the 10th term from the end of the AP: 4, 9, 14, ..., 254.",
    "latex": "l - (10 - 1)d = 254 - 45",
    "options": [
      "214",
      "204",
      "209",
      "219"
    ],
    "correctIdx": 2,
    "explanation": "l − (n − 1)d = 254 − 9(5) = 254 − 45 = 209.",
    "difficulty": "Intermediate"
  },
  {
    "id": 65,
    "stage": "10th",
    "topic": "Probability — Certain Event",
    "category": "Probability",
    "problem": "What is the probability of a sure (certain) event?",
    "latex": "P(S) = 1",
    "options": [
      "0",
      "0.5",
      "100",
      "1"
    ],
    "correctIdx": 3,
    "explanation": "The probability of a certain event is precisely 1.",
    "difficulty": "Basic"
  },
  {
    "id": 66,
    "stage": "12th",
    "topic": "Relations & Functions — Equivalence Relation",
    "category": "Relations & Functions",
    "problem": "A relation R on a set A is an equivalence relation if and only if it is:",
    "latex": "R \\text{ is reflexive, symmetric, and transitive}",
    "options": [
      "Reflexive, symmetric, and transitive",
      "Reflexive and transitive only",
      "Symmetric and transitive only",
      "Reflexive and anti-symmetric"
    ],
    "correctIdx": 0,
    "explanation": "By mathematical definition, an equivalence relation must satisfy reflexivity, symmetry, and transitivity.",
    "difficulty": "Basic"
  },
  {
    "id": 67,
    "stage": "12th",
    "topic": "Relations & Functions — Bijective Functions",
    "category": "Relations & Functions",
    "problem": "A function f: A → B is bijective if and only if:",
    "latex": "f \\text{ is one-one and onto}",
    "options": [
      "f is one-to-one only",
      "f is one-one (injective) and onto (surjective)",
      "f is onto only",
      "f is constant"
    ],
    "correctIdx": 1,
    "explanation": "A bijection is both injective (one-to-one) and surjective (onto).",
    "difficulty": "Basic"
  },
  {
    "id": 68,
    "stage": "12th",
    "topic": "Inverse Trigonometry — Principal Value Branch of sin⁻¹",
    "category": "Trigonometry",
    "problem": "What is the principal value branch of sin⁻¹(x)?",
    "latex": "\\arcsin(x) \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]",
    "options": [
      "[0, π]",
      "(−π/2, π/2)",
      "[−π/2, π/2]",
      "[0, π/2]"
    ],
    "correctIdx": 2,
    "explanation": "The principal value branch of arcsin is defined on [−π/2, π/2].",
    "difficulty": "Basic"
  },
  {
    "id": 69,
    "stage": "12th",
    "topic": "Inverse Trigonometry — tan⁻¹(1) Principal Value",
    "category": "Trigonometry",
    "problem": "Find the principal value of tan⁻¹(1).",
    "latex": "\\tan^{-1}(1) = \\frac{\\pi}{4}",
    "options": [
      "π/2",
      "π/3",
      "π/6",
      "π/4"
    ],
    "correctIdx": 3,
    "explanation": "Since tan(π/4) = 1 and π/4 lies in (−π/2, π/2), tan⁻¹(1) = π/4.",
    "difficulty": "Basic"
  },
  {
    "id": 70,
    "stage": "12th",
    "topic": "Inverse Trigonometry — cos⁻¹(−1/2) Principal Value",
    "category": "Trigonometry",
    "problem": "Find the principal value of cos⁻¹(−1/2).",
    "latex": "\\cos^{-1}(-x) = \\pi - \\cos^{-1}(x)",
    "options": [
      "2π/3",
      "π/3",
      "−π/3",
      "5π/6"
    ],
    "correctIdx": 0,
    "explanation": "cos⁻¹(−1/2) = π − cos⁻¹(1/2) = π − π/3 = 2π/3, which lies in [0, π].",
    "difficulty": "Intermediate"
  },
  {
    "id": 71,
    "stage": "12th",
    "topic": "Matrices — Skew-Symmetric Matrix Diagonal",
    "category": "Linear Algebra",
    "problem": "What can be said about the diagonal elements of any skew-symmetric matrix?",
    "latex": "A^T = -A \\implies a_{ii} = -a_{ii} = 0",
    "options": [
      "All equal to 1",
      "All equal to 0",
      "All imaginary",
      "Arbitrary real numbers"
    ],
    "correctIdx": 1,
    "explanation": "For skew-symmetric A: A^T = −A. Hence a_ii = −a_ii => 2 a_ii = 0 => a_ii = 0 for all diagonal entries.",
    "difficulty": "Basic"
  },
  {
    "id": 72,
    "stage": "12th",
    "topic": "Matrices — Transpose Product Property",
    "category": "Linear Algebra",
    "problem": "For any two conformable matrices A and B, what is (AB)ᵀ equal to?",
    "latex": "(AB)^T = B^T A^T",
    "options": [
      "Aᵀ Bᵀ",
      "A Bᵀ",
      "Bᵀ Aᵀ",
      "−Bᵀ Aᵀ"
    ],
    "correctIdx": 2,
    "explanation": "By transpose reversal law: (AB)ᵀ = Bᵀ Aᵀ.",
    "difficulty": "Basic"
  },
  {
    "id": 73,
    "stage": "12th",
    "topic": "Matrices — Symmetric and Skew-Symmetric Decomposition",
    "category": "Linear Algebra",
    "problem": "Any square matrix A can be uniquely expressed as the sum of a symmetric and skew-symmetric matrix as:",
    "latex": "A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)",
    "options": [
      "A = Aᵀ + A",
      "A = (A + Aᵀ) / 3 + (A − Aᵀ) / 3",
      "A = Aᵀ − A",
      "A = 1/2(A + Aᵀ) + 1/2(A − Aᵀ)"
    ],
    "correctIdx": 3,
    "explanation": "1/2(A + Aᵀ) is symmetric and 1/2(A − Aᵀ) is skew-symmetric, summing to A.",
    "difficulty": "Basic"
  },
  {
    "id": 74,
    "stage": "12th",
    "topic": "Determinants — Scaled Determinant Property",
    "category": "Linear Algebra",
    "problem": "If A is an n × n square matrix and k is a scalar, what is det(kA)?",
    "latex": "\\det(kA) = k^n \\det(A)",
    "options": [
      "kⁿ det(A)",
      "k det(A)",
      "kⁿ⁻¹ det(A)",
      "n^k det(A)"
    ],
    "correctIdx": 0,
    "explanation": "Factoring k out of each of the n rows yields kⁿ det(A).",
    "difficulty": "Basic"
  },
  {
    "id": 75,
    "stage": "12th",
    "topic": "Determinants — Adjoint Matrix Determinant",
    "category": "Linear Algebra",
    "problem": "If A is a non-singular matrix of order 3 and det(A) = 4, find det(adj A).",
    "latex": "\\det(\\text{adj } A) = [\\det(A)]^{n-1}",
    "options": [
      "64",
      "16",
      "4",
      "12"
    ],
    "correctIdx": 1,
    "explanation": "det(adj A) = [det(A)]^(n−1) = 4^(3−1) = 4² = 16.",
    "difficulty": "Intermediate"
  },
  {
    "id": 76,
    "stage": "12th",
    "topic": "Determinants — Singularity Condition",
    "category": "Linear Algebra",
    "problem": "A square matrix A is called singular if and only if:",
    "latex": "\\det(A) = 0",
    "options": [
      "det(A) > 0",
      "det(A) = 1",
      "det(A) = 0",
      "A = Aᵀ"
    ],
    "correctIdx": 2,
    "explanation": "A matrix is singular if its determinant equals zero, implying it has no multiplicative inverse.",
    "difficulty": "Basic"
  },
  {
    "id": 77,
    "stage": "12th",
    "topic": "Continuity & Differentiability — Derivative of e^(sin x)",
    "category": "Calculus",
    "problem": "Find the derivative of y = e^(sin x) with respect to x.",
    "latex": "\\frac{d}{dx} e^{\\sin x} = e^{\\sin x} \\cos x",
    "options": [
      "e^(cos x)",
      "−e^(sin x) cos x",
      "e^(sin x) sin x",
      "e^(sin x) cos x"
    ],
    "correctIdx": 3,
    "explanation": "Applying chain rule: dy/dx = e^(sin x) × d/dx(sin x) = e^(sin x) cos x.",
    "difficulty": "Basic"
  },
  {
    "id": 78,
    "stage": "12th",
    "topic": "Continuity & Differentiability — Logarithmic Differentiation",
    "category": "Calculus",
    "problem": "What is the derivative of y = x^x for x > 0?",
    "latex": "\\frac{d}{dx} x^x = x^x(1 + \\ln x)",
    "options": [
      "x^x (1 + ln x)",
      "x · x^(x−1)",
      "x^x ln x",
      "x^(x+1)"
    ],
    "correctIdx": 0,
    "explanation": "ln y = x ln x => (1/y) dy/dx = ln x + 1 => dy/dx = x^x(1 + ln x).",
    "difficulty": "Intermediate"
  },
  {
    "id": 79,
    "stage": "12th",
    "topic": "Continuity & Differentiability — Rolle’s Theorem Condition",
    "category": "Calculus",
    "problem": "For Rolle’s theorem to apply to f(x) on [a, b], which condition must be met in addition to continuity on [a, b] and differentiability on (a, b)?",
    "latex": "f(a) = f(b)",
    "options": [
      "f’(a) = f’(b)",
      "f(a) = f(b)",
      "f(a) = 0",
      "f’(c) = 1"
    ],
    "correctIdx": 1,
    "explanation": "Rolle’s theorem requires f(a) = f(b), which guarantees a point c in (a, b) where f’(c) = 0.",
    "difficulty": "Basic"
  },
  {
    "id": 80,
    "stage": "12th",
    "topic": "Applications of Derivatives — Increasing Function Test",
    "category": "Calculus",
    "problem": "A function f(x) is strictly increasing on an open interval (a, b) if for all x in (a, b):",
    "latex": "f'(x) > 0",
    "options": [
      "f’(x) < 0",
      "f’(x) = 0",
      "f’(x) > 0",
      "f’’(x) > 0"
    ],
    "correctIdx": 2,
    "explanation": "If f’(x) > 0 on (a, b), then f is strictly increasing on that interval.",
    "difficulty": "Basic"
  },
  {
    "id": 81,
    "stage": "12th",
    "topic": "Applications of Derivatives — Rate of Change of Area",
    "category": "Calculus",
    "problem": "The radius of a circle increases at 3 cm/s. At what rate is the area increasing when r = 10 cm?",
    "latex": "\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}",
    "options": [
      "30π cm²/s",
      "20π cm²/s",
      "120π cm²/s",
      "60π cm²/s"
    ],
    "correctIdx": 3,
    "explanation": "A = πr² => dA/dt = 2πr (dr/dt) = 2π(10)(3) = 60π cm²/s.",
    "difficulty": "Basic"
  },
  {
    "id": 82,
    "stage": "12th",
    "topic": "Integrals — Standard Indefinite Integral of 1/(1+x²)",
    "category": "Calculus",
    "problem": "Evaluate: ∫ 1 / (1 + x²) dx.",
    "latex": "\\int \\frac{1}{1+x^2} dx = \\tan^{-1} x + C",
    "options": [
      "tan⁻¹ x + C",
      "sin⁻¹ x + C",
      "ln|1 + x²| + C",
      "sec⁻¹ x + C"
    ],
    "correctIdx": 0,
    "explanation": "The derivative of tan⁻¹(x) is 1/(1 + x²), so the indefinite integral is tan⁻¹ x + C.",
    "difficulty": "Basic"
  },
  {
    "id": 83,
    "stage": "12th",
    "topic": "Integrals — Integration by Parts Formula",
    "category": "Calculus",
    "problem": "What is the standard formula for integration by parts ∫ u v dx?",
    "latex": "\\int u v dx = u \\int v dx - \\int \\left(u' \\int v dx\\right) dx",
    "options": [
      "u v − ∫ u’ v dx",
      "u ∫ v dx − ∫ (u’ ∫ v dx) dx",
      "u v + ∫ u’ v’ dx",
      "u’ v − u v’"
    ],
    "correctIdx": 1,
    "explanation": "Integration by parts is ∫ u dv = u v − ∫ v du, written in differential form as u ∫ v dx − ∫ (u’ ∫ v dx) dx.",
    "difficulty": "Basic"
  },
  {
    "id": 84,
    "stage": "12th",
    "topic": "Integrals — Definite Integral of Odd Function",
    "category": "Calculus",
    "problem": "If f(x) is an odd continuous function on [−a, a], what is the value of ∫_{-a}^a f(x) dx?",
    "latex": "\\int_{-a}^a f(x) dx = 0",
    "options": [
      "2 ∫_0^a f(x) dx",
      "f(a) − f(−a)",
      "0",
      "a f(0)"
    ],
    "correctIdx": 2,
    "explanation": "For any odd function f(−x) = −f(x), the integral from −a to a cancels out to 0.",
    "difficulty": "Basic"
  },
  {
    "id": 85,
    "stage": "12th",
    "topic": "Integrals — King’s Property of Definite Integrals",
    "category": "Calculus",
    "problem": "Evaluate: ∫_0^{π/2} (sin x) / (sin x + cos x) dx.",
    "latex": "I = \\int_0^{\\pi/2} \\frac{\\sin x}{\\sin x + \\cos x} dx = \\frac{\\pi}{4}",
    "options": [
      "π/2",
      "1",
      "π",
      "π/4"
    ],
    "correctIdx": 3,
    "explanation": "Using King’s property ∫_0^a f(x)dx = ∫_0^a f(a−x)dx: 2I = ∫_0^{π/2} 1 dx = π/2 => I = π/4.",
    "difficulty": "Intermediate"
  },
  {
    "id": 86,
    "stage": "12th",
    "topic": "Applications of Integrals — Area of Circle",
    "category": "Calculus",
    "problem": "Find the area enclosed by the circle x² + y² = a² using integration.",
    "latex": "\\text{Area} = 4 \\int_0^a \\sqrt{a^2 - x^2} dx = \\pi a^2",
    "options": [
      "π a²",
      "2π a",
      "4/3 π a³",
      "2π a²"
    ],
    "correctIdx": 0,
    "explanation": "Area = 4 ∫_0^a √(a² − x²) dx = 4 [ (x/2)√(a² − x²) + (a²/2) sin⁻¹(x/a) ]_0^a = 4 (a²/2)(π/2) = π a².",
    "difficulty": "Basic"
  },
  {
    "id": 87,
    "stage": "12th",
    "topic": "Differential Equations — Order and Degree",
    "category": "Differential Equations",
    "problem": "What is the order and degree of the differential equation (d²y/dx²)³ + (dy/dx)² + sin y = 0?",
    "latex": "\\text{Order} = 2, \\quad \\text{Degree} = 3",
    "options": [
      "Order 3, Degree 2",
      "Order 2, Degree 3",
      "Order 2, Degree 1",
      "Order 3, Degree not defined"
    ],
    "correctIdx": 1,
    "explanation": "The highest derivative is d²y/dx² (order 2), and its power is 3 (degree 3).",
    "difficulty": "Basic"
  },
  {
    "id": 88,
    "stage": "12th",
    "topic": "Differential Equations — Integrating Factor",
    "category": "Differential Equations",
    "problem": "What is the integrating factor (IF) for the linear differential equation dy/dx + P(x) y = Q(x)?",
    "latex": "\\text{IF} = e^{\\int P(x) dx}",
    "options": [
      "∫ P(x) dx",
      "e^{−∫ P(x) dx}",
      "e^{∫ P(x) dx}",
      "P(x) Q(x)"
    ],
    "correctIdx": 2,
    "explanation": "The integrating factor that turns the left side into d/dx(y · IF) is e^{∫ P(x) dx}.",
    "difficulty": "Basic"
  },
  {
    "id": 89,
    "stage": "12th",
    "topic": "Vectors — Dot Product Orthogonality",
    "category": "Vector Algebra",
    "problem": "Two non-zero vectors a and b are perpendicular (orthogonal) if and only if:",
    "latex": "\\mathbf{a} \\cdot \\mathbf{b} = 0",
    "options": [
      "a × b = 0",
      "|a| = |b|",
      "a + b = 0",
      "a · b = 0"
    ],
    "correctIdx": 3,
    "explanation": "a · b = |a||b| cos θ = 0 when θ = 90° (cos 90° = 0).",
    "difficulty": "Basic"
  },
  {
    "id": 90,
    "stage": "12th",
    "topic": "Vectors — Cross Product of Parallel Vectors",
    "category": "Vector Algebra",
    "problem": "If two non-zero vectors a and b are collinear (parallel), what is their vector cross product a × b?",
    "latex": "\\mathbf{a} \\times \\mathbf{b} = \\mathbf{0}",
    "options": [
      "0 (null vector)",
      "|a||b|",
      "1",
      "a · b"
    ],
    "correctIdx": 0,
    "explanation": "a × b = |a||b| sin θ n̂. Since θ = 0° or 180°, sin θ = 0, giving the zero vector.",
    "difficulty": "Basic"
  },
  {
    "id": 91,
    "stage": "12th",
    "topic": "Vectors — Unit Vector Calculation",
    "category": "Vector Algebra",
    "problem": "Find the unit vector in the direction of vector a = 2i + 3j + 6k.",
    "latex": "\\hat{\\mathbf{a}} = \\frac{\\mathbf{a}}{|\\mathbf{a}|}",
    "options": [
      "(2i + 3j + 6k) / 49",
      "(2i + 3j + 6k) / 7",
      "(2i + 3j + 6k) / 11",
      "2i + 3j + 6k"
    ],
    "correctIdx": 1,
    "explanation": "|a| = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7. Unit vector = a / 7.",
    "difficulty": "Basic"
  },
  {
    "id": 92,
    "stage": "12th",
    "topic": "3D Geometry — Direction Cosines Relation",
    "category": "3D Geometry",
    "problem": "If l, m, n are the direction cosines of any line in 3D space, what is l² + m² + n²?",
    "latex": "l^2 + m^2 + n^2 = 1",
    "options": [
      "0",
      "2",
      "1",
      "−1"
    ],
    "correctIdx": 2,
    "explanation": "cos² α + cos² β + cos² γ = l² + m² + n² = 1 for any line.",
    "difficulty": "Basic"
  },
  {
    "id": 93,
    "stage": "12th",
    "topic": "3D Geometry — Distance Formula in 3D",
    "category": "3D Geometry",
    "problem": "Find the distance between P(1, 2, 3) and Q(4, 2, 7) in 3D space.",
    "latex": "d = \\sqrt{(4-1)^2 + (2-2)^2 + (7-3)^2}",
    "options": [
      "6",
      "7",
      "√25 / 2",
      "5"
    ],
    "correctIdx": 3,
    "explanation": "d = √(3² + 0² + 4²) = √(9 + 16) = √25 = 5.",
    "difficulty": "Basic"
  },
  {
    "id": 94,
    "stage": "12th",
    "topic": "Linear Programming — Optimal Solution Location",
    "category": "Linear Programming",
    "problem": "In a linear programming problem with a bounded feasible region, where does the optimal value always occur?",
    "latex": "\\text{At the corner points (vertices) of the feasible region}",
    "options": [
      "At the corner points (vertices)",
      "At the origin only",
      "Inside the region strictly",
      "On the boundary midpoint"
    ],
    "correctIdx": 0,
    "explanation": "Fundamental theorem of LPP: The maximum and minimum values occur at vertex (corner) points.",
    "difficulty": "Basic"
  },
  {
    "id": 95,
    "stage": "12th",
    "topic": "Probability — Conditional Probability Formula",
    "category": "Probability",
    "problem": "What is the formula for the conditional probability P(A | B) when P(B) > 0?",
    "latex": "P(A|B) = \\frac{P(A \\cap B)}{P(B)}",
    "options": [
      "P(A ∩ B) / P(A)",
      "P(A ∩ B) / P(B)",
      "P(A) P(B)",
      "P(A ∪ B) / P(B)"
    ],
    "correctIdx": 1,
    "explanation": "P(A | B) is the probability of A given B has occurred: P(A ∩ B) / P(B).",
    "difficulty": "Basic"
  },
  {
    "id": 96,
    "stage": "12th",
    "topic": "Probability — Independent Events Condition",
    "category": "Probability",
    "problem": "Two events A and B are independent if and only if:",
    "latex": "P(A \\cap B) = P(A) P(B)",
    "options": [
      "P(A ∪ B) = P(A) + P(B)",
      "P(A | B) = 0",
      "P(A ∩ B) = P(A) P(B)",
      "P(A) = P(B)"
    ],
    "correctIdx": 2,
    "explanation": "By definition of independent events, P(A ∩ B) = P(A) × P(B).",
    "difficulty": "Basic"
  },
  {
    "id": 97,
    "stage": "12th",
    "topic": "Probability — Bayes’ Theorem Denominator",
    "category": "Probability",
    "problem": "In Bayes’ Theorem P(E_i | A), the denominator represents:",
    "latex": "P(A) = \\sum_{j=1}^n P(E_j) P(A|E_j)",
    "options": [
      "The prior probability P(E_i)",
      "The conditional probability P(A|E_i)",
      "The joint probability P(E_i ∩ A)",
      "Total probability of event A"
    ],
    "correctIdx": 3,
    "explanation": "The denominator is the total probability theorem: ∑ P(E_j) P(A | E_j) = P(A).",
    "difficulty": "Intermediate"
  },
  {
    "id": 98,
    "stage": "12th",
    "topic": "Relations & Functions — Number of Subsets of A × B",
    "category": "Relations & Functions",
    "problem": "If set A has 3 elements and set B has 2 elements, how many relations can be defined from A to B?",
    "latex": "2^{m \\times n} = 2^{3 \\times 2} = 2^6",
    "options": [
      "64",
      "32",
      "6",
      "12"
    ],
    "correctIdx": 0,
    "explanation": "Total relations = 2^(|A| × |B|) = 2^(3 × 2) = 2⁶ = 64.",
    "difficulty": "Basic"
  },
  {
    "id": 99,
    "stage": "12th",
    "topic": "Inverse Trigonometry — sin⁻¹(x) + cos⁻¹(x)",
    "category": "Trigonometry",
    "problem": "For any x in [−1, 1], what is sin⁻¹(x) + cos⁻¹(x) equal to?",
    "latex": "\\sin^{-1} x + \\cos^{-1} x = \\frac{\\pi}{2}",
    "options": [
      "π",
      "π/2",
      "0",
      "2π"
    ],
    "correctIdx": 1,
    "explanation": "Standard inverse trig identity: sin⁻¹(x) + cos⁻¹(x) = π/2.",
    "difficulty": "Basic"
  },
  {
    "id": 100,
    "stage": "12th",
    "topic": "Matrices — Scalar Matrix Definition",
    "category": "Linear Algebra",
    "problem": "A diagonal matrix whose all diagonal elements are equal is called a:",
    "latex": "\\text{Scalar Matrix}",
    "options": [
      "Zero matrix",
      "Identity matrix only",
      "Scalar matrix",
      "Symmetric matrix only"
    ],
    "correctIdx": 2,
    "explanation": "A scalar matrix is a diagonal matrix where all diagonal entries are equal to each other.",
    "difficulty": "Basic"
  },
  {
    "id": 101,
    "stage": "12th",
    "topic": "Determinants — Product Rule",
    "category": "Linear Algebra",
    "problem": "For any two square matrices A and B of the same order, det(AB) equals:",
    "latex": "\\det(AB) = \\det(A) \\det(B)",
    "options": [
      "det(A) + det(B)",
      "det(A) / det(B)",
      "det(A) det(Bᵀ)",
      "det(A) det(B)"
    ],
    "correctIdx": 3,
    "explanation": "The determinant of a matrix product is the product of their determinants.",
    "difficulty": "Basic"
  },
  {
    "id": 102,
    "stage": "12th",
    "topic": "Continuity — Point of Discontinuity of f(x) = [x]",
    "category": "Calculus",
    "problem": "Where is the greatest integer function f(x) = [x] discontinuous?",
    "latex": "x \\in \\mathbb{Z}",
    "options": [
      "At all integer values of x",
      "At x = 0 only",
      "At all non-integer values",
      "Nowhere (continuous everywhere)"
    ],
    "correctIdx": 0,
    "explanation": "At every integer k, the left-hand limit is k − 1 while the right-hand limit is k, creating a jump discontinuity.",
    "difficulty": "Basic"
  },
  {
    "id": 103,
    "stage": "12th",
    "topic": "Calculus — Derivative of tan x",
    "category": "Calculus",
    "problem": "What is the derivative of tan x with respect to x?",
    "latex": "\\frac{d}{dx} \\tan x = \\sec^2 x",
    "options": [
      "sec x tan x",
      "sec² x",
      "−csc² x",
      "1 + cos² x"
    ],
    "correctIdx": 1,
    "explanation": "d/dx(tan x) = sec² x.",
    "difficulty": "Basic"
  },
  {
    "id": 104,
    "stage": "12th",
    "topic": "Calculus — Derivative of ln(cos x)",
    "category": "Calculus",
    "problem": "Evaluate: d/dx [ ln(cos x) ].",
    "latex": "\\frac{1}{\\cos x}(-\\sin x) = -\\tan x",
    "options": [
      "tan x",
      "cot x",
      "−tan x",
      "−cot x"
    ],
    "correctIdx": 2,
    "explanation": "By chain rule: (1/cos x) × (−sin x) = −tan x.",
    "difficulty": "Basic"
  },
  {
    "id": 105,
    "stage": "12th",
    "topic": "Calculus — Second Derivative of x³",
    "category": "Calculus",
    "problem": "What is the second derivative d²y/dx² of y = x³?",
    "latex": "\\frac{d^2}{dx^2} x^3 = 6x",
    "options": [
      "3x²",
      "6x²",
      "6",
      "6x"
    ],
    "correctIdx": 3,
    "explanation": "dy/dx = 3x² => d²y/dx² = 6x.",
    "difficulty": "Basic"
  },
  {
    "id": 106,
    "stage": "12th",
    "topic": "Integrals — Indefinite Integral of sec² x",
    "category": "Calculus",
    "problem": "Evaluate: ∫ sec² x dx.",
    "latex": "\\int \\sec^2 x dx = \\tan x + C",
    "options": [
      "tan x + C",
      "sec x + C",
      "ln|sec x| + C",
      "tan² x + C"
    ],
    "correctIdx": 0,
    "explanation": "Since d/dx(tan x) = sec² x, ∫ sec² x dx = tan x + C.",
    "difficulty": "Basic"
  },
  {
    "id": 107,
    "stage": "12th",
    "topic": "Integrals — Integral of e^(2x)",
    "category": "Calculus",
    "problem": "Evaluate: ∫ e^(2x) dx.",
    "latex": "\\int e^{2x} dx = \\frac{1}{2} e^{2x} + C",
    "options": [
      "2 e^(2x) + C",
      "1/2 e^(2x) + C",
      "e^(2x) + C",
      "1/4 e^(2x) + C"
    ],
    "correctIdx": 1,
    "explanation": "Using substitution u = 2x, du = 2 dx => (1/2) e^(2x) + C.",
    "difficulty": "Basic"
  },
  {
    "id": 108,
    "stage": "12th",
    "topic": "Integrals — Definite Integral of x from 0 to 2",
    "category": "Calculus",
    "problem": "Evaluate: ∫_0^2 x dx.",
    "latex": "\\left[ \\frac{x^2}{2} \\right]_0^2 = 2",
    "options": [
      "4",
      "1",
      "2",
      "0"
    ],
    "correctIdx": 2,
    "explanation": "[x²/2]_0^2 = 4/2 − 0 = 2.",
    "difficulty": "Basic"
  },
  {
    "id": 109,
    "stage": "12th",
    "topic": "Differential Equations — General Solution of dy/dx = y",
    "category": "Differential Equations",
    "problem": "Find the general solution of dy/dx = y.",
    "latex": "\\frac{dy}{y} = dx \\implies y = C e^x",
    "options": [
      "y = x + C",
      "y = x² + C",
      "y = ln x + C",
      "y = C e^x"
    ],
    "correctIdx": 3,
    "explanation": "Separating variables: dy/y = dx => ln|y| = x + c => y = C e^x.",
    "difficulty": "Basic"
  },
  {
    "id": 110,
    "stage": "12th",
    "topic": "Vectors — Magnitude of 3i + 4j",
    "category": "Vector Algebra",
    "problem": "Find the magnitude of vector v = 3i + 4j.",
    "latex": "|\\mathbf{v}| = \\sqrt{3^2 + 4^2} = 5",
    "options": [
      "5",
      "7",
      "1",
      "25"
    ],
    "correctIdx": 0,
    "explanation": "|v| = √(9 + 16) = √25 = 5.",
    "difficulty": "Basic"
  },
  {
    "id": 111,
    "stage": "12th",
    "topic": "Vectors — Self Dot Product",
    "category": "Vector Algebra",
    "problem": "For any vector a, what is a · a equal to?",
    "latex": "\\mathbf{a} \\cdot \\mathbf{a} = |\\mathbf{a}|^2",
    "options": [
      "0",
      "|a|²",
      "2|a|",
      "1"
    ],
    "correctIdx": 1,
    "explanation": "a · a = |a||a| cos 0° = |a|².",
    "difficulty": "Basic"
  },
  {
    "id": 112,
    "stage": "12th",
    "topic": "3D Geometry — Equation of Plane Passing Through Origin",
    "category": "3D Geometry",
    "problem": "What is the form of the Cartesian equation of a plane passing through origin?",
    "latex": "Ax + By + Cz = 0",
    "options": [
      "Ax + By + Cz = D (D ≠ 0)",
      "x + y + z = 1",
      "Ax + By + Cz = 0",
      "x/a + y/b + z/c = 1"
    ],
    "correctIdx": 2,
    "explanation": "Since (0, 0, 0) satisfies the equation, the constant term D must be 0.",
    "difficulty": "Basic"
  },
  {
    "id": 113,
    "stage": "12th",
    "topic": "Probability — Fair Die Even Outcome",
    "category": "Probability",
    "problem": "What is the probability of rolling an even number on a fair die?",
    "latex": "P = 3/6 = 1/2",
    "options": [
      "1/3",
      "1/6",
      "2/3",
      "1/2"
    ],
    "correctIdx": 3,
    "explanation": "Even numbers are {2, 4, 6} (3 outcomes). P = 3/6 = 1/2.",
    "difficulty": "Basic"
  },
  {
    "id": 114,
    "stage": "12th",
    "topic": "Matrices — Invertibility Condition",
    "category": "Linear Algebra",
    "problem": "A square matrix A is invertible if and only if:",
    "latex": "\\det(A) \\neq 0",
    "options": [
      "det(A) ≠ 0",
      "det(A) = 0",
      "A is symmetric",
      "A is diagonal"
    ],
    "correctIdx": 0,
    "explanation": "A matrix has an inverse A⁻¹ = (adj A) / det(A) if and only if det(A) ≠ 0.",
    "difficulty": "Basic"
  },
  {
    "id": 115,
    "stage": "12th",
    "topic": "Calculus — Derivative of sin⁻¹ x",
    "category": "Calculus",
    "problem": "What is the derivative of sin⁻¹ x with respect to x for |x| < 1?",
    "latex": "\\frac{d}{dx} \\sin^{-1} x = \\frac{1}{\\sqrt{1-x^2}}",
    "options": [
      "−1/√(1−x²)",
      "1/√(1−x²)",
      "1/(1+x²)",
      "1/√(x²−1)"
    ],
    "correctIdx": 1,
    "explanation": "d/dx(sin⁻¹ x) = 1/√(1 − x²).",
    "difficulty": "Basic"
  },
  {
    "id": 116,
    "stage": "12th",
    "topic": "Calculus — Critical Point Definition",
    "category": "Calculus",
    "problem": "A point c in the domain of f is called a critical point if:",
    "latex": "f'(c) = 0 \\quad \\text{or } f'(c) \\text{ does not exist}",
    "options": [
      "f(c) = 0",
      "f’’(c) = 0",
      "f’(c) = 0 or f’(c) does not exist",
      "f’(c) > 0"
    ],
    "correctIdx": 2,
    "explanation": "Critical points occur where the derivative is 0 or undefined.",
    "difficulty": "Basic"
  },
  {
    "id": 117,
    "stage": "12th",
    "topic": "Integrals — Integral of 1/x",
    "category": "Calculus",
    "problem": "Evaluate: ∫ 1/x dx for x > 0.",
    "latex": "\\int \\frac{1}{x} dx = \\ln|x| + C",
    "options": [
      "1/x² + C",
      "−1/x² + C",
      "e^x + C",
      "ln|x| + C"
    ],
    "correctIdx": 3,
    "explanation": "d/dx(ln x) = 1/x => ∫ 1/x dx = ln|x| + C.",
    "difficulty": "Basic"
  },
  {
    "id": 118,
    "stage": "12th",
    "topic": "Vectors — Self Cross Product",
    "category": "Vector Algebra",
    "problem": "For any vector a, what is a × a?",
    "latex": "\\mathbf{a} \\times \\mathbf{a} = \\mathbf{0}",
    "options": [
      "0 (null vector)",
      "|a|²",
      "1",
      "a · a"
    ],
    "correctIdx": 0,
    "explanation": "a × a = |a|² sin(0°) n̂ = 0.",
    "difficulty": "Basic"
  },
  {
    "id": 119,
    "stage": "12th",
    "topic": "3D Geometry — Distance of Point from Origin",
    "category": "3D Geometry",
    "problem": "What is the distance of P(x, y, z) from the origin (0, 0, 0)?",
    "latex": "d = \\sqrt{x^2 + y^2 + z^2}",
    "options": [
      "x + y + z",
      "√(x² + y² + z²)",
      "x² + y² + z²",
      "√(x + y + z)"
    ],
    "correctIdx": 1,
    "explanation": "In 3D Euclidean space, d = √(x² + y² + z²).",
    "difficulty": "Basic"
  },
  {
    "id": 120,
    "stage": "12th",
    "topic": "Probability — Sum of All Elementary Probabilities",
    "category": "Probability",
    "problem": "For any discrete sample space S with outcomes E_i, what is ∑ P(E_i)?",
    "latex": "\\sum P(E_i) = 1",
    "options": [
      "0",
      "∞",
      "1",
      "P(S)/2"
    ],
    "correctIdx": 2,
    "explanation": "Total probability axiom: The sum of probabilities of all mutually exclusive exhaustive outcomes is 1.",
    "difficulty": "Basic"
  },
  {
    "id": 121,
    "stage": "12th",
    "topic": "Matrices — Trace of Matrix",
    "category": "Linear Algebra",
    "problem": "The trace of a square matrix is defined as:",
    "latex": "\\text{Tr}(A) = \\sum a_{ii}",
    "options": [
      "Product of diagonal entries",
      "Determinant of matrix",
      "Sum of all matrix entries",
      "Sum of principal diagonal entries"
    ],
    "correctIdx": 3,
    "explanation": "Trace(A) = a₁₁ + a₂₂ + ... + a_nn.",
    "difficulty": "Basic"
  },
  {
    "id": 122,
    "stage": "12th",
    "topic": "Calculus — Derivative of cos x",
    "category": "Calculus",
    "problem": "What is the derivative of cos x?",
    "latex": "\\frac{d}{dx} \\cos x = -\\sin x",
    "options": [
      "−sin x",
      "sin x",
      "−cos x",
      "tan x"
    ],
    "correctIdx": 0,
    "explanation": "d/dx(cos x) = −sin x.",
    "difficulty": "Basic"
  },
  {
    "id": 123,
    "stage": "12th",
    "topic": "Calculus — Second Derivative Test for Minimum",
    "category": "Calculus",
    "problem": "If f’(c) = 0 and f’’(c) > 0, what does f have at x = c?",
    "latex": "f''(c) > 0 \\implies \\text{Local Minimum}",
    "options": [
      "Local maximum",
      "Local minimum",
      "Point of inflection",
      "Asymptote"
    ],
    "correctIdx": 1,
    "explanation": "When f’’(c) > 0, the curve is concave up, so x = c is a local minimum.",
    "difficulty": "Basic"
  },
  {
    "id": 124,
    "stage": "12th",
    "topic": "Differential Equations — Degree of Linear ODE",
    "category": "Differential Equations",
    "problem": "By definition, what must be the degree of every linear differential equation?",
    "latex": "\\text{Degree} = 1",
    "options": [
      "0",
      "2",
      "1",
      "Any integer"
    ],
    "correctIdx": 2,
    "explanation": "In a linear ODE, all dependent variables and their derivatives occur to the first power.",
    "difficulty": "Basic"
  },
  {
    "id": 125,
    "stage": "12th",
    "topic": "Vectors — Direction Cosines of x-axis",
    "category": "3D Geometry",
    "problem": "What are the direction cosines of the positive x-axis?",
    "latex": "(1, 0, 0)",
    "options": [
      "(0, 1, 0)",
      "(0, 0, 1)",
      "(1, 1, 1)",
      "(1, 0, 0)"
    ],
    "correctIdx": 3,
    "explanation": "The angles with axes are 0°, 90°, 90° => cos 0° = 1, cos 90° = 0, cos 90° = 0 => (1, 0, 0).",
    "difficulty": "Basic"
  },
  {
    "id": 126,
    "stage": "12th",
    "topic": "Probability — Mean of Binomial Distribution",
    "category": "Probability",
    "problem": "What is the mean of a binomial distribution B(n, p)?",
    "latex": "\\mu = np",
    "options": [
      "np",
      "np(1−p)",
      "√[np(1−p)]",
      "n/p"
    ],
    "correctIdx": 0,
    "explanation": "The expected value (mean) of a binomial distribution is μ = np.",
    "difficulty": "Basic"
  },
  {
    "id": 127,
    "stage": "12th",
    "topic": "Probability — Variance of Binomial Distribution",
    "category": "Probability",
    "problem": "What is the variance of a binomial distribution B(n, p)?",
    "latex": "\\sigma^2 = npq = np(1-p)",
    "options": [
      "np",
      "np(1 − p)",
      "√[np(1 − p)]",
      "n(1 − p)"
    ],
    "correctIdx": 1,
    "explanation": "Variance Var(X) = n p (1 − p) = n p q.",
    "difficulty": "Basic"
  },
  {
    "id": 128,
    "stage": "12th",
    "topic": "Matrices — Idempotent Matrix Property",
    "category": "Linear Algebra",
    "problem": "A matrix A is called idempotent if:",
    "latex": "A^2 = A",
    "options": [
      "A² = I",
      "A² = 0",
      "A² = A",
      "Aᵀ = A"
    ],
    "correctIdx": 2,
    "explanation": "By definition, an idempotent matrix satisfies A² = A.",
    "difficulty": "Basic"
  },
  {
    "id": 129,
    "stage": "12th",
    "topic": "Matrices — Involutory Matrix Property",
    "category": "Linear Algebra",
    "problem": "A matrix A is called involutory if:",
    "latex": "A^2 = I",
    "options": [
      "A² = A",
      "A² = 0",
      "Aᵀ = −A",
      "A² = I"
    ],
    "correctIdx": 3,
    "explanation": "An involutory matrix is its own inverse: A² = I.",
    "difficulty": "Basic"
  },
  {
    "id": 130,
    "stage": "12th",
    "topic": "Calculus — Integral of sin x",
    "category": "Calculus",
    "problem": "Evaluate: ∫ sin x dx.",
    "latex": "\\int \\sin x dx = -\\cos x + C",
    "options": [
      "−cos x + C",
      "cos x + C",
      "−sin x + C",
      "tan x + C"
    ],
    "correctIdx": 0,
    "explanation": "Since d/dx(−cos x) = sin x, ∫ sin x dx = −cos x + C.",
    "difficulty": "Basic"
  },
  {
    "id": 131,
    "stage": "engineering",
    "topic": "Linear Algebra — Cayley-Hamilton Theorem",
    "category": "Linear Algebra",
    "problem": "What does the Cayley-Hamilton theorem state for every square matrix A?",
    "latex": "p(A) = 0 \\quad \\text{where } p(\\lambda) = \\det(A - \\lambda I)",
    "options": [
      "Every square matrix satisfies its own characteristic equation",
      "Every matrix has an inverse",
      "The trace equals the determinant",
      "Every matrix can be diagonalized"
    ],
    "correctIdx": 0,
    "explanation": "Cayley-Hamilton states that if p(λ) = det(A − λI) = 0 is the characteristic polynomial, then p(A) = 0.",
    "difficulty": "Basic"
  },
  {
    "id": 132,
    "stage": "engineering",
    "topic": "Linear Algebra — Sum of Eigenvalues",
    "category": "Linear Algebra",
    "problem": "For any square matrix A, what is the sum of all its eigenvalues equal to?",
    "latex": "\\sum \\lambda_i = \\text{Tr}(A)",
    "options": [
      "The determinant det(A)",
      "The trace Tr(A) (sum of diagonal entries)",
      "The rank of A",
      "Zero always"
    ],
    "correctIdx": 1,
    "explanation": "Theorem: The sum of eigenvalues equals the trace Tr(A), and the product equals det(A).",
    "difficulty": "Basic"
  },
  {
    "id": 133,
    "stage": "engineering",
    "topic": "Linear Algebra — Product of Eigenvalues",
    "category": "Linear Algebra",
    "problem": "For any square matrix A, what is the product of all its eigenvalues equal to?",
    "latex": "\\prod \\lambda_i = \\det(A)",
    "options": [
      "Tr(A)",
      "The spectral radius",
      "The determinant det(A)",
      "1"
    ],
    "correctIdx": 2,
    "explanation": "Theorem: The product of all eigenvalues λ₁ λ₂ ... λ_n is equal to det(A).",
    "difficulty": "Basic"
  },
  {
    "id": 134,
    "stage": "engineering",
    "topic": "Linear Algebra — Orthogonal Matrix Property",
    "category": "Linear Algebra",
    "problem": "A real square matrix Q is called orthogonal if and only if:",
    "latex": "Q^T Q = Q Q^T = I \\implies Q^{-1} = Q^T",
    "options": [
      "Qᵀ = −Q",
      "det(Q) = 0",
      "Q² = I",
      "Qᵀ Q = I (or Q⁻¹ = Qᵀ)"
    ],
    "correctIdx": 3,
    "explanation": "By definition, an orthogonal matrix satisfies Qᵀ Q = I, so its inverse is its transpose.",
    "difficulty": "Basic"
  },
  {
    "id": 135,
    "stage": "engineering",
    "topic": "Multivariable Calculus — Euler’s Theorem on Homogeneous Functions",
    "category": "Multivariable Calculus",
    "problem": "If u(x, y) is a homogeneous function of degree n in x and y, then x ∂u/∂x + y ∂u/∂y equals:",
    "latex": "x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n u",
    "options": [
      "n u",
      "u / n",
      "(n − 1) u",
      "0"
    ],
    "correctIdx": 0,
    "explanation": "Euler’s theorem on homogeneous functions states that x ∂u/∂x + y ∂u/∂y = n u.",
    "difficulty": "Basic"
  },
  {
    "id": 136,
    "stage": "engineering",
    "topic": "Vector Calculus — Divergence of Curl of Any Vector Field",
    "category": "Vector Calculus",
    "problem": "For any twice continuously differentiable vector field F, what is div(curl F)?",
    "latex": "\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0",
    "options": [
      "∇² F",
      "0",
      "|F|",
      "curl(div F)"
    ],
    "correctIdx": 1,
    "explanation": "Vector calculus identity: div(curl F) = ∇ · (∇ × F) = 0 identically.",
    "difficulty": "Basic"
  },
  {
    "id": 137,
    "stage": "engineering",
    "topic": "Vector Calculus — Curl of Gradient of Any Scalar Field",
    "category": "Vector Calculus",
    "problem": "For any scalar potential field φ, what is curl(grad φ)?",
    "latex": "\\nabla \\times (\\nabla \\phi) = \\mathbf{0}",
    "options": [
      "∇² φ",
      "grad(div φ)",
      "0 (null vector)",
      "div(grad φ)"
    ],
    "correctIdx": 2,
    "explanation": "Vector calculus identity: The curl of any gradient field is identically zero: ∇ × ∇φ = 0.",
    "difficulty": "Basic"
  },
  {
    "id": 138,
    "stage": "engineering",
    "topic": "Vector Calculus — Green’s Theorem in the Plane",
    "category": "Vector Calculus",
    "problem": "Green’s theorem relates a line integral around a simple closed curve C to a double integral over region D as:",
    "latex": "\\oint_C (M dx + N dy) = \\iint_D \\left(\\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y}\\right) dA",
    "options": [
      "∮ (M dx + N dy) = ∬ (M + N) dA",
      "∮ (M dx + N dy) = ∬ (∂M/∂x + ∂N/∂y) dA",
      "∮ (M dx + N dy) = 0",
      "∮ (M dx + N dy) = ∬ (∂N/∂x − ∂M/∂y) dA"
    ],
    "correctIdx": 3,
    "explanation": "Green’s theorem in the plane converts ∮_C (M dx + N dy) into ∬_D (∂N/∂x − ∂M/∂y) dx dy.",
    "difficulty": "Intermediate"
  },
  {
    "id": 139,
    "stage": "engineering",
    "topic": "Vector Calculus — Gauss Divergence Theorem",
    "category": "Vector Calculus",
    "problem": "The Gauss Divergence Theorem converts the outward flux ∬_S F · n̂ dS over a closed surface into:",
    "latex": "\\iint_S \\mathbf{F} \\cdot \\hat{\\mathbf{n}} dS = \\iiint_V (\\nabla \\cdot \\mathbf{F}) dV",
    "options": [
      "∭_V (∇ · F) dV",
      "∭_V (∇ × F) dV",
      "∮_C F · dr",
      "∭_V |F| dV"
    ],
    "correctIdx": 0,
    "explanation": "Gauss Divergence Theorem: The net outward flux through closed surface S equals the volume integral of divergence of F.",
    "difficulty": "Basic"
  },
  {
    "id": 140,
    "stage": "engineering",
    "topic": "Vector Calculus — Stokes’ Theorem",
    "category": "Vector Calculus",
    "problem": "Stokes’ theorem equates the line integral ∮_C F · dr along the boundary of an open surface S to:",
    "latex": "\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\hat{\\mathbf{n}} dS",
    "options": [
      "∬_S (∇ · F) dS",
      "∬_S (∇ × F) · n̂ dS",
      "∭_V (∇ × F) dV",
      "0 always"
    ],
    "correctIdx": 1,
    "explanation": "Stokes’ theorem: Line integral of F around closed loop C equals surface integral of curl(F) through open surface S.",
    "difficulty": "Basic"
  },
  {
    "id": 141,
    "stage": "engineering",
    "topic": "Ordinary Differential Equations — Exact Differential Condition",
    "category": "Differential Equations",
    "problem": "The first-order differential equation M(x, y) dx + N(x, y) dy = 0 is exact if and only if:",
    "latex": "\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}",
    "options": [
      "∂M/∂x = ∂N/∂y",
      "M + N = 0",
      "∂M/∂y = ∂N/∂x",
      "∂²M/∂x² = ∂²N/∂y²"
    ],
    "correctIdx": 2,
    "explanation": "Euler condition for exactness: ∂M/∂y = ∂N/∂x.",
    "difficulty": "Basic"
  },
  {
    "id": 142,
    "stage": "engineering",
    "topic": "Ordinary Differential Equations — Wronskian Linear Independence",
    "category": "Differential Equations",
    "problem": "Two solutions y₁(x) and y₂(x) of a second-order linear ODE are linearly independent on an interval if their Wronskian W(y₁, y₂) is:",
    "latex": "W(y_1, y_2) = y_1 y_2' - y_1' y_2 \\neq 0",
    "options": [
      "Equal to zero everywhere",
      "Always negative",
      "A constant 1",
      "Non-zero on that interval"
    ],
    "correctIdx": 3,
    "explanation": "If W(y₁, y₂) ≠ 0 on the interval, then the solutions are linearly independent.",
    "difficulty": "Basic"
  },
  {
    "id": 143,
    "stage": "engineering",
    "topic": "Laplace Transforms — Transform of Unit Step Function",
    "category": "Transform Calculus",
    "problem": "What is the Laplace transform L{u(t − a)} of the delayed Heaviside unit step function for a > 0?",
    "latex": "\\mathcal{L}\\{u(t - a)\\} = \\frac{e^{-as}}{s}",
    "options": [
      "e^(−as) / s",
      "1 / (s − a)",
      "e^(as) / s",
      "1 / s²"
    ],
    "correctIdx": 0,
    "explanation": "L{u(t − a)} = ∫_a^∞ e^(−st) dt = [−e^(−st)/s]_a^∞ = e^(−as) / s.",
    "difficulty": "Basic"
  },
  {
    "id": 144,
    "stage": "engineering",
    "topic": "Laplace Transforms — First Shifting Theorem",
    "category": "Transform Calculus",
    "problem": "If L{f(t)} = F(s), what is the Laplace transform L{e^(at) f(t)}?",
    "latex": "\\mathcal{L}\\{e^{at} f(t)\\} = F(s - a)",
    "options": [
      "F(s + a)",
      "F(s − a)",
      "e^(−as) F(s)",
      "F(s) / (s − a)"
    ],
    "correctIdx": 1,
    "explanation": "First shifting theorem: Multiplication by e^(at) in the time domain corresponds to a shift s → s − a in the s-domain.",
    "difficulty": "Basic"
  },
  {
    "id": 145,
    "stage": "engineering",
    "topic": "Laplace Transforms — Transform of Dirac Delta Function",
    "category": "Transform Calculus",
    "problem": "What is the Laplace transform L{δ(t)} of the unit impulse (Dirac delta) function?",
    "latex": "\\mathcal{L}\\{\\delta(t)\\} = 1",
    "options": [
      "1/s",
      "0",
      "1",
      "s"
    ],
    "correctIdx": 2,
    "explanation": "L{δ(t)} = ∫_0^∞ δ(t) e^(−st) dt = e^(0) = 1.",
    "difficulty": "Basic"
  },
  {
    "id": 146,
    "stage": "engineering",
    "topic": "Laplace Transforms — Convolution Theorem",
    "category": "Transform Calculus",
    "problem": "What is the inverse Laplace transform L⁻¹{F(s) · G(s)} equal to?",
    "latex": "\\mathcal{L}^{-1}\\{F(s) G(s)\\} = f(t) * g(t) = \\int_0^t f(\\tau) g(t - \\tau) d\\tau",
    "options": [
      "f(t) + g(t)",
      "f(t) · g(t)",
      "f’(t) g’(t)",
      "f(t) * g(t) (Convolution integral)"
    ],
    "correctIdx": 3,
    "explanation": "Convolution Theorem: Product in frequency domain transforms to convolution in time domain.",
    "difficulty": "Basic"
  },
  {
    "id": 147,
    "stage": "engineering",
    "topic": "Fourier Series — Dirichlet Conditions",
    "category": "Fourier Analysis",
    "problem": "Which of the following is a necessary Dirichlet condition for f(x) to be represented by a Fourier series on (−L, L)?",
    "latex": "\\text{f(x) must have a finite number of finite discontinuities in any period}",
    "options": [
      "f(x) has a finite number of finite discontinuities in any period",
      "f(x) must be infinite at discrete points",
      "f(x) must have infinitely many maxima and minima",
      "f(x) must be non-periodic"
    ],
    "correctIdx": 0,
    "explanation": "Dirichlet conditions require: f(x) is single-valued and bounded, has a finite number of discontinuities, and a finite number of extrema in any period.",
    "difficulty": "Intermediate"
  },
  {
    "id": 148,
    "stage": "engineering",
    "topic": "Fourier Series — Fourier Coefficients for Odd Function",
    "category": "Fourier Analysis",
    "problem": "In the Fourier series expansion of an odd function f(x) on (−L, L), what are the cosine coefficients a_n?",
    "latex": "a_n = \\frac{1}{L} \\int_{-L}^L f(x) \\cos\\left(\\frac{n\\pi x}{L}\\right) dx = 0",
    "options": [
      "a_n = 2/L ∫_0^L f(x) dx",
      "a_n = 0 for all n",
      "a_n = b_n",
      "a_n = (−1)ⁿ"
    ],
    "correctIdx": 1,
    "explanation": "For an odd function, f(x) cos(nπx/L) is odd, so its integral over symmetric limits (−L, L) vanishes (a_n = 0).",
    "difficulty": "Basic"
  },
  {
    "id": 149,
    "stage": "engineering",
    "topic": "Complex Variables — Cauchy-Riemann Equations",
    "category": "Complex Analysis",
    "problem": "For f(z) = u(x, y) + i v(x, y) to be analytic, the Cauchy-Riemann equations in Cartesian form are:",
    "latex": "\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\quad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}",
    "options": [
      "∂u/∂x = ∂u/∂y and ∂v/∂x = ∂v/∂y",
      "∂u/∂x = −∂v/∂y and ∂u/∂y = ∂v/∂x",
      "∂u/∂x = ∂v/∂y and ∂u/∂y = −∂v/∂x",
      "∂²u/∂x² + ∂²v/∂y² = 0"
    ],
    "correctIdx": 2,
    "explanation": "The Cauchy-Riemann conditions are u_x = v_y and u_y = −v_x.",
    "difficulty": "Basic"
  },
  {
    "id": 150,
    "stage": "engineering",
    "topic": "Complex Variables — Harmonic Functions and Laplace Equation",
    "category": "Complex Analysis",
    "problem": "The real and imaginary parts of an analytic function f(z) = u + i v satisfy which partial differential equation?",
    "latex": "\\nabla^2 u = \\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = 0",
    "options": [
      "Wave equation: u_tt = c² u_xx",
      "Heat equation: u_t = k u_xx",
      "Poisson equation: ∇²u = −ρ",
      "Laplace equation: ∇²u = 0 (Harmonic functions)"
    ],
    "correctIdx": 3,
    "explanation": "Differentiating CR equations yields u_xx + u_yy = 0 and v_xx + v_yy = 0, meaning both are harmonic.",
    "difficulty": "Basic"
  },
  {
    "id": 151,
    "stage": "engineering",
    "topic": "Complex Variables — Cauchy’s Integral Theorem",
    "category": "Complex Analysis",
    "problem": "If f(z) is analytic within and on a simple closed contour C, what is the value of ∮_C f(z) dz?",
    "latex": "\\oint_C f(z) dz = 0",
    "options": [
      "0",
      "2πi",
      "2πi f(z₀)",
      "1"
    ],
    "correctIdx": 0,
    "explanation": "Cauchy’s Integral Theorem: The contour integral of any function analytic on and inside a closed path is zero.",
    "difficulty": "Basic"
  },
  {
    "id": 152,
    "stage": "engineering",
    "topic": "Complex Variables — Cauchy’s Residue Theorem",
    "category": "Complex Analysis",
    "problem": "If f(z) has isolated singularities z_k inside closed curve C, ∮_C f(z) dz equals:",
    "latex": "\\oint_C f(z) dz = 2\\pi i \\sum \\text{Res}(f, z_k)",
    "options": [
      "πi ∑ Res(f, z_k)",
      "2πi ∑ Res(f, z_k)",
      "∑ Res(f, z_k)",
      "0"
    ],
    "correctIdx": 1,
    "explanation": "Cauchy Residue Theorem: ∮_C f(z) dz = 2πi × (sum of residues inside C).",
    "difficulty": "Basic"
  },
  {
    "id": 153,
    "stage": "engineering",
    "topic": "Numerical Methods — Newton-Raphson Iteration Formula",
    "category": "Numerical Analysis",
    "problem": "What is the iteration formula for the Newton-Raphson method to find root of f(x) = 0?",
    "latex": "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
    "options": [
      "x_{n+1} = x_n − f’(x_n)/f(x_n)",
      "x_{n+1} = x_n + f(x_n)/f’(x_n)",
      "x_{n+1} = x_n − f(x_n)/f’(x_n)",
      "x_{n+1} = [x_n + f(x_n)] / 2"
    ],
    "correctIdx": 2,
    "explanation": "Newton-Raphson uses linear tangent approximation: x_{n+1} = x_n − f(x_n) / f’(x_n).",
    "difficulty": "Basic"
  },
  {
    "id": 154,
    "stage": "engineering",
    "topic": "Numerical Methods — Order of Convergence of Newton-Raphson",
    "category": "Numerical Analysis",
    "problem": "What is the order of convergence of the Newton-Raphson method for a simple root?",
    "latex": "\\text{Order of convergence } = 2 \\quad (\\text{Quadratic})",
    "options": [
      "Linear (Order 1)",
      "Superlinear (Order 1.618)",
      "Cubic (Order 3)",
      "Quadratic (Order 2)"
    ],
    "correctIdx": 3,
    "explanation": "Newton-Raphson exhibits quadratic convergence (error e_{n+1} ≈ C e_n²) near a simple root.",
    "difficulty": "Basic"
  },
  {
    "id": 155,
    "stage": "engineering",
    "topic": "Numerical Methods — Simpson’s 1/3 Rule Polynomial Degree",
    "category": "Numerical Analysis",
    "problem": "Simpson’s 1/3 rule for numerical integration is exact for polynomials of degree up to:",
    "latex": "\\text{Exact for polynomials of degree } \\le 3",
    "options": [
      "3 (Cubic)",
      "1 (Linear)",
      "2 (Quadratic)",
      "4 (Quartic)"
    ],
    "correctIdx": 0,
    "explanation": "Simpson’s 1/3 rule fits parabolas (degree 2) but due to symmetry it is exact for all cubics (degree 3).",
    "difficulty": "Intermediate"
  },
  {
    "id": 156,
    "stage": "engineering",
    "topic": "Numerical Methods — Runge-Kutta 4th Order Truncation Error",
    "category": "Numerical Analysis",
    "problem": "The local truncation error of the classical 4th-order Runge-Kutta (RK4) method per step is of order:",
    "latex": "O(h^5)",
    "options": [
      "O(h³)",
      "O(h⁵)",
      "O(h⁴)",
      "O(h²)"
    ],
    "correctIdx": 1,
    "explanation": "The local error of RK4 is O(h⁵), leading to a global truncation error of O(h⁴).",
    "difficulty": "Intermediate"
  },
  {
    "id": 157,
    "stage": "engineering",
    "topic": "Partial Differential Equations — Classification of B² − 4AC",
    "category": "Partial Differential Equations",
    "problem": "The second-order PDE A u_xx + B u_xy + C u_yy + ... = 0 is classified as elliptic if:",
    "latex": "B^2 - 4AC < 0",
    "options": [
      "B² − 4AC = 0",
      "B² − 4AC > 0",
      "B² − 4AC < 0",
      "B² − 4AC = 1"
    ],
    "correctIdx": 2,
    "explanation": "Classification: B² − 4AC < 0 is elliptic (e.g. Laplace), = 0 is parabolic (e.g. Heat), > 0 is hyperbolic (e.g. Wave).",
    "difficulty": "Basic"
  },
  {
    "id": 158,
    "stage": "engineering",
    "topic": "Partial Differential Equations — One-Dimensional Heat Equation",
    "category": "Partial Differential Equations",
    "problem": "Which of the following represents the one-dimensional unsteady heat conduction equation?",
    "latex": "\\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2}",
    "options": [
      "∂²u/∂t² = c² ∂²u/∂x²",
      "∂²u/∂x² + ∂²u/∂y² = 0",
      "∂u/∂x + ∂u/∂y = 0",
      "∂u/∂t = α ∂²u/∂x²"
    ],
    "correctIdx": 3,
    "explanation": "The 1D transient heat equation is parabolic: ∂u/∂t = α ∂²u/∂x².",
    "difficulty": "Basic"
  },
  {
    "id": 159,
    "stage": "engineering",
    "topic": "Applied Statistics — Poisson Distribution Mean and Variance",
    "category": "Probability & Statistics",
    "problem": "In a Poisson distribution with parameter λ, what is the relationship between its mean and variance?",
    "latex": "\\text{Mean} = \\text{Variance} = \\lambda",
    "options": [
      "Mean = Variance = λ",
      "Mean = λ, Variance = λ²",
      "Variance = √λ",
      "Mean = 2λ, Variance = λ"
    ],
    "correctIdx": 0,
    "explanation": "For a Poisson random variable, both the expected value E[X] and variance Var(X) are equal to λ.",
    "difficulty": "Basic"
  },
  {
    "id": 160,
    "stage": "engineering",
    "topic": "Applied Statistics — Normal Distribution Total Area",
    "category": "Probability & Statistics",
    "problem": "What is the total area under the standard normal probability density function curve from −∞ to +∞?",
    "latex": "\\int_{-\\infty}^\\infty \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2} dz = 1",
    "options": [
      "0.5",
      "1.0",
      "π",
      "2π"
    ],
    "correctIdx": 1,
    "explanation": "By axiom of probability, the integral of any valid probability density function across its entire support is exactly 1.",
    "difficulty": "Basic"
  },
  {
    "id": 161,
    "stage": "engineering",
    "topic": "Linear Algebra — Rank of Matrix",
    "category": "Linear Algebra",
    "problem": "The rank of an m × n matrix A is defined as:",
    "latex": "\\text{Maximum number of linearly independent row or column vectors}",
    "options": [
      "Number of non-zero entries",
      "The determinant value",
      "Maximum number of linearly independent rows (or columns)",
      "min(m, n) always"
    ],
    "correctIdx": 2,
    "explanation": "Rank is the dimension of the vector space generated by its rows (or columns).",
    "difficulty": "Basic"
  },
  {
    "id": 162,
    "stage": "engineering",
    "topic": "Linear Algebra — System AX = B Consistency Test (Rouché–Capelli)",
    "category": "Linear Algebra",
    "problem": "The linear system AX = B has at least one solution (is consistent) if and only if:",
    "latex": "\\text{rank}(A) = \\text{rank}([A|B])",
    "options": [
      "rank(A) < rank([A|B])",
      "det(A) = 0",
      "A is symmetric",
      "rank(A) = rank([A|B])"
    ],
    "correctIdx": 3,
    "explanation": "Rouché–Capelli theorem: The system AX = B has a solution if and only if the rank of the coefficient matrix equals the rank of the augmented matrix.",
    "difficulty": "Intermediate"
  },
  {
    "id": 163,
    "stage": "engineering",
    "topic": "Vector Calculus — Directional Derivative",
    "category": "Vector Calculus",
    "problem": "The directional derivative of scalar field φ in direction of unit vector û is given by:",
    "latex": "D_{\\hat{u}} \\phi = \\nabla \\phi \\cdot \\hat{u}",
    "options": [
      "∇φ · û",
      "∇ × û",
      "∇² φ",
      "|∇φ| / |û|"
    ],
    "correctIdx": 0,
    "explanation": "The directional derivative is the scalar projection of the gradient vector onto the direction unit vector: ∇φ · û.",
    "difficulty": "Basic"
  },
  {
    "id": 164,
    "stage": "engineering",
    "topic": "Vector Calculus — Conservative Vector Field",
    "category": "Vector Calculus",
    "problem": "A continuous vector field F in a simply connected domain is conservative if and only if:",
    "latex": "\\nabla \\times \\mathbf{F} = \\mathbf{0} \\quad (\\text{curl } \\mathbf{F} = \\mathbf{0})",
    "options": [
      "∇ · F = 0",
      "curl F = 0 (irrotational)",
      "∇² F = 0",
      "|F| = constant"
    ],
    "correctIdx": 1,
    "explanation": "A conservative field can be written as F = ∇φ. Since curl(grad φ) = 0, conservative fields are irrotational.",
    "difficulty": "Basic"
  },
  {
    "id": 165,
    "stage": "engineering",
    "topic": "Laplace Transforms — Transform of sin(ωt)",
    "category": "Transform Calculus",
    "problem": "What is the Laplace transform L{sin(ωt)} for s > 0?",
    "latex": "\\mathcal{L}\\{\\sin(\\omega t)\\} = \\frac{\\omega}{s^2 + \\omega^2}",
    "options": [
      "s / (s² + ω²)",
      "1 / (s² + ω²)",
      "ω / (s² + ω²)",
      "ω / (s − ω)"
    ],
    "correctIdx": 2,
    "explanation": "Standard transform: L{sin(ωt)} = ω / (s² + ω²).",
    "difficulty": "Basic"
  },
  {
    "id": 166,
    "stage": "engineering",
    "topic": "Laplace Transforms — Transform of cos(ωt)",
    "category": "Transform Calculus",
    "problem": "What is the Laplace transform L{cos(ωt)} for s > 0?",
    "latex": "\\mathcal{L}\\{\\cos(\\omega t)\\} = \\frac{s}{s^2 + \\omega^2}",
    "options": [
      "ω / (s² + ω²)",
      "1 / (s + ω)",
      "s² / (s² + ω²)",
      "s / (s² + ω²)"
    ],
    "correctIdx": 3,
    "explanation": "Standard transform: L{cos(ωt)} = s / (s² + ω²).",
    "difficulty": "Basic"
  },
  {
    "id": 167,
    "stage": "engineering",
    "topic": "Laplace Transforms — Transform of t^n",
    "category": "Transform Calculus",
    "problem": "For a positive integer n, what is L{t^n}?",
    "latex": "\\mathcal{L}\\{t^n\\} = \\frac{n!}{s^{n+1}}",
    "options": [
      "n! / s^(n+1)",
      "n! / s^n",
      "(n − 1)! / s^n",
      "1 / s^(n+1)"
    ],
    "correctIdx": 0,
    "explanation": "L{t^n} = ∫_0^∞ t^n e^(−st) dt = n! / s^(n+1).",
    "difficulty": "Basic"
  },
  {
    "id": 168,
    "stage": "engineering",
    "topic": "Ordinary Differential Equations — Cauchy-Euler Equation",
    "category": "Differential Equations",
    "problem": "The equation x² d²y/dx² + a x dy/dx + b y = 0 is converted to a constant coefficient ODE via substitution:",
    "latex": "x = e^z \\quad (z = \\ln x)",
    "options": [
      "y = e^x",
      "x = e^z (or z = ln x)",
      "y = x v",
      "x = tan z"
    ],
    "correctIdx": 1,
    "explanation": "Setting x = e^z transforms Cauchy-Euler equations into linear ODEs with constant coefficients.",
    "difficulty": "Intermediate"
  },
  {
    "id": 169,
    "stage": "engineering",
    "topic": "Fourier Transforms — Transform of Gaussian Function",
    "category": "Fourier Analysis",
    "problem": "The Fourier transform of a Gaussian bell function e^(−a x²) is another:",
    "latex": "\\mathcal{F}\\{e^{-a x^2}\\} = \\sqrt{\\frac{\\pi}{a}} e^{-\\frac{\\omega^2}{4a}}",
    "options": [
      "Lorentzian function",
      "Step function",
      "Gaussian function",
      "Sine wave"
    ],
    "correctIdx": 2,
    "explanation": "Gaussians are eigenfunctions of the Fourier transform: F{e^(−a x²)} is proportional to e^(−ω²/(4a)).",
    "difficulty": "Intermediate"
  },
  {
    "id": 170,
    "stage": "engineering",
    "topic": "Numerical Methods — Trapezoidal Rule Truncation Error",
    "category": "Numerical Analysis",
    "problem": "The global truncation error of the composite Trapezoidal rule with step size h is of order:",
    "latex": "O(h^2)",
    "options": [
      "O(h)",
      "O(h⁴)",
      "O(h³)",
      "O(h²)"
    ],
    "correctIdx": 3,
    "explanation": "Trapezoidal rule uses linear interpolation with local error O(h³) and global error O(h²).",
    "difficulty": "Basic"
  },
  {
    "id": 171,
    "stage": "engineering",
    "topic": "Numerical Methods — Bisection Method Guarantee",
    "category": "Numerical Analysis",
    "problem": "The bisection method for finding roots of continuous f(x) requires which initial condition?",
    "latex": "f(a) \\cdot f(b) < 0",
    "options": [
      "f(a) · f(b) < 0 (opposite signs)",
      "f’(x) ≠ 0",
      "f(a) = f(b)",
      "f(a) > 0 and f(b) > 0"
    ],
    "correctIdx": 0,
    "explanation": "By the Intermediate Value Theorem, f(a) · f(b) < 0 guarantees at least one root in (a, b).",
    "difficulty": "Basic"
  },
  {
    "id": 172,
    "stage": "engineering",
    "topic": "Linear Algebra — Diagonalizability Condition",
    "category": "Linear Algebra",
    "problem": "An n × n matrix A is diagonalizable if and only if:",
    "latex": "A \\text{ has } n \\text{ linearly independent eigenvectors}",
    "options": [
      "det(A) ≠ 0",
      "A has n linearly independent eigenvectors",
      "A is upper triangular",
      "All entries are positive"
    ],
    "correctIdx": 1,
    "explanation": "Diagonalizability requires a basis of n linearly independent eigenvectors (P⁻¹ A P = D).",
    "difficulty": "Intermediate"
  },
  {
    "id": 173,
    "stage": "engineering",
    "topic": "Linear Algebra — Symmetric Matrix Eigenvalues",
    "category": "Linear Algebra",
    "problem": "What can be said about the eigenvalues of any real symmetric matrix?",
    "latex": "\\lambda_i \\in \\mathbb{R} \\quad (\\text{All real})",
    "options": [
      "All pure imaginary",
      "All strictly positive",
      "All real",
      "At least one zero"
    ],
    "correctIdx": 2,
    "explanation": "Spectral Theorem: Every real symmetric matrix has strictly real eigenvalues and orthogonal eigenvectors.",
    "difficulty": "Basic"
  },
  {
    "id": 174,
    "stage": "engineering",
    "topic": "Linear Algebra — Trace under Similarity Transformation",
    "category": "Linear Algebra",
    "problem": "If B = P⁻¹ A P, how are Tr(B) and Tr(A) related?",
    "latex": "\\text{Tr}(P^{-1} A P) = \\text{Tr}(A)",
    "options": [
      "Tr(B) = det(P) Tr(A)",
      "Tr(B) = −Tr(A)",
      "Tr(B) = [Tr(A)]²",
      "Tr(B) = Tr(A) (Invariant)"
    ],
    "correctIdx": 3,
    "explanation": "Trace is cyclic: Tr(P⁻¹ A P) = Tr(A P P⁻¹) = Tr(A). Trace is a similarity invariant.",
    "difficulty": "Basic"
  },
  {
    "id": 175,
    "stage": "engineering",
    "topic": "Multivariable Calculus — Jacobian of 2D Transformation",
    "category": "Multivariable Calculus",
    "problem": "The Jacobian determinant J = ∂(x, y)/∂(u, v) for x = r cos θ, y = r sin θ is:",
    "latex": "J = \\begin{vmatrix} \\cos\\theta & -r\\sin\\theta \\\\ \\sin\\theta & r\\cos\\theta \\end{vmatrix} = r",
    "options": [
      "r",
      "r²",
      "1",
      "r cos θ"
    ],
    "correctIdx": 0,
    "explanation": "dx dy = r dr dθ, as the Jacobian of polar coordinates evaluates to r (cos²θ + sin²θ) = r.",
    "difficulty": "Basic"
  },
  {
    "id": 176,
    "stage": "engineering",
    "topic": "Multivariable Calculus — Saddle Point Test",
    "category": "Multivariable Calculus",
    "problem": "For f(x, y), if f_x = f_y = 0 at (a, b) and D = f_xx f_yy − (f_xy)² < 0, what does (a, b) represent?",
    "latex": "D < 0 \\implies \\text{Saddle point}",
    "options": [
      "Local maximum",
      "Saddle point",
      "Local minimum",
      "Inconclusive test"
    ],
    "correctIdx": 1,
    "explanation": "When the discriminant D = f_xx f_yy − (f_xy)² < 0, the Hessian has opposite signs, indicating a saddle point.",
    "difficulty": "Basic"
  },
  {
    "id": 177,
    "stage": "engineering",
    "topic": "Complex Variables — Singularity Type of (sin z)/z at z = 0",
    "category": "Complex Analysis",
    "problem": "What type of isolated singularity does f(z) = (sin z) / z have at z = 0?",
    "latex": "\\lim_{z \\to 0} \\frac{\\sin z}{z} = 1 \\implies \\text{Removable Singularity}",
    "options": [
      "Simple pole",
      "Essential singularity",
      "Removable singularity",
      "Branch point"
    ],
    "correctIdx": 2,
    "explanation": "Since lim_{z→0} (sin z)/z = 1 is finite, z = 0 is a removable singularity.",
    "difficulty": "Basic"
  },
  {
    "id": 178,
    "stage": "engineering",
    "topic": "Complex Variables — Residue at Simple Pole",
    "category": "Complex Analysis",
    "problem": "For a simple pole at z = z₀, how is the residue Res(f, z₀) calculated?",
    "latex": "\\text{Res}(f, z_0) = \\lim_{z \\to z_0} (z - z_0) f(z)",
    "options": [
      "lim_{z→z₀} f(z)",
      "lim_{z→z₀} f’(z)",
      "f(z₀)",
      "lim_{z→z₀} (z − z₀) f(z)"
    ],
    "correctIdx": 3,
    "explanation": "By Laurent expansion: Res(f, z₀) = b₁ = lim_{z→z₀} (z − z₀) f(z).",
    "difficulty": "Basic"
  },
  {
    "id": 179,
    "stage": "engineering",
    "topic": "Partial Differential Equations — Separation of Variables Form",
    "category": "Partial Differential Equations",
    "problem": "In the separation of variables method for u(x, t), the solution is assumed in the form:",
    "latex": "u(x, t) = X(x) T(t)",
    "options": [
      "u(x, t) = X(x) T(t)",
      "u(x, t) = X(x) + T(t)",
      "u(x, t) = X(x) / T(t)",
      "u(x, t) = e^{x+t}"
    ],
    "correctIdx": 0,
    "explanation": "The method factors PDE variables as a product of single-variable functions: u(x, t) = X(x) T(t).",
    "difficulty": "Basic"
  },
  {
    "id": 180,
    "stage": "engineering",
    "topic": "Fourier Series — Half-Range Cosine Series Periodicity",
    "category": "Fourier Analysis",
    "problem": "In a half-range Fourier cosine series on [0, L], the function is extended to [−L, 0] as:",
    "latex": "f(-x) = f(x) \\quad (\\text{Even extension})",
    "options": [
      "An odd extension: f(−x) = −f(x)",
      "An even extension: f(−x) = f(x)",
      "Zero: f(−x) = 0",
      "Constant extension"
    ],
    "correctIdx": 1,
    "explanation": "A cosine series contains only even terms, so f(x) must be extended as an even function.",
    "difficulty": "Basic"
  },
  {
    "id": 181,
    "stage": "engineering",
    "topic": "Vector Calculus — Solenoidal Vector Field Definition",
    "category": "Vector Calculus",
    "problem": "A vector field V is called solenoidal (incompressible) if:",
    "latex": "\\nabla \\cdot \\mathbf{V} = 0",
    "options": [
      "∇ × V = 0",
      "∇² V = 0",
      "∇ · V = 0 (Divergence is zero)",
      "|V| = 0"
    ],
    "correctIdx": 2,
    "explanation": "Solenoidal fields have zero divergence: ∇ · V = 0.",
    "difficulty": "Basic"
  },
  {
    "id": 182,
    "stage": "engineering",
    "topic": "Vector Calculus — Irrotational Vector Field Definition",
    "category": "Vector Calculus",
    "problem": "A vector field V is called irrotational (curl-free) if:",
    "latex": "\\nabla \\times \\mathbf{V} = \\mathbf{0}",
    "options": [
      "∇ · V = 0",
      "V · ∇ = 0",
      "∇² V = 0",
      "∇ × V = 0 (Curl is zero)"
    ],
    "correctIdx": 3,
    "explanation": "Irrotational fields have vanishing curl: ∇ × V = 0.",
    "difficulty": "Basic"
  },
  {
    "id": 183,
    "stage": "engineering",
    "topic": "Ordinary Differential Equations — Particular Integral of (D² + 1)y = e^(2x)",
    "category": "Differential Equations",
    "problem": "Find the particular integral y_p of (D² + 1)y = e^(2x).",
    "latex": "y_p = \\frac{1}{2^2 + 1} e^{2x} = \\frac{1}{5} e^{2x}",
    "options": [
      "1/5 e^(2x)",
      "1/3 e^(2x)",
      "e^(2x)",
      "1/4 e^(2x)"
    ],
    "correctIdx": 0,
    "explanation": "y_p = 1/(D² + 1) e^(2x) = 1/(2² + 1) e^(2x) = (1/5) e^(2x).",
    "difficulty": "Basic"
  },
  {
    "id": 184,
    "stage": "engineering",
    "topic": "Ordinary Differential Equations — Resonance in Harmonic Oscillator",
    "category": "Differential Equations",
    "problem": "In the forced oscillator y’’ + ω₀² y = cos(ωt), resonance occurs when:",
    "latex": "\\omega = \\omega_0",
    "options": [
      "ω = 0",
      "ω = ω₀ (Driving frequency matches natural frequency)",
      "ω = 2ω₀",
      "ω >> ω₀"
    ],
    "correctIdx": 1,
    "explanation": "When driving frequency ω equals undamped natural frequency ω₀, resonance occurs.",
    "difficulty": "Basic"
  },
  {
    "id": 185,
    "stage": "engineering",
    "topic": "Applied Statistics — Exponential Distribution Memoryless Property",
    "category": "Probability & Statistics",
    "problem": "The property P(X > s + t | X > s) = P(X > t) uniquely characterizes which continuous distribution?",
    "latex": "P(X > s + t \\mid X > s) = P(X > t) \\implies \\text{Exponential Distribution}",
    "options": [
      "Normal distribution",
      "Uniform distribution",
      "Exponential distribution",
      "Poisson distribution"
    ],
    "correctIdx": 2,
    "explanation": "The exponential distribution is the only continuous probability distribution with the memoryless property.",
    "difficulty": "Intermediate"
  },
  {
    "id": 186,
    "stage": "engineering",
    "topic": "Applied Statistics — Central Limit Theorem",
    "category": "Probability & Statistics",
    "problem": "The Central Limit Theorem states that as sample size n → ∞, the sample mean distribution approaches:",
    "latex": "\\bar{X}_n \\xrightarrow{d} \\mathcal{N}\\left(\\mu, \\frac{\\sigma^2}{n}\\right)",
    "options": [
      "A uniform distribution",
      "A Poisson distribution",
      "An exponential distribution",
      "A normal (Gaussian) distribution"
    ],
    "correctIdx": 3,
    "explanation": "CLT: Regardless of population distribution, sample means approach a normal distribution for large n.",
    "difficulty": "Basic"
  },
  {
    "id": 187,
    "stage": "engineering",
    "topic": "Numerical Methods — Regula-Falsi Method",
    "category": "Numerical Analysis",
    "problem": "The Regula-Falsi (false position) method finds roots by approximating the curve with:",
    "latex": "\\text{A secant line connecting } (a, f(a)) \\text{ and } (b, f(b))",
    "options": [
      "A secant line connecting two bracketing points",
      "A tangent line at one point",
      "A parabola through 3 points",
      "A cubic spline"
    ],
    "correctIdx": 0,
    "explanation": "Regula-Falsi replaces the curve by a chord (secant line) connecting (a, f(a)) and (b, f(b)).",
    "difficulty": "Basic"
  },
  {
    "id": 188,
    "stage": "engineering",
    "topic": "Multivariable Calculus — Gradient Direction",
    "category": "Vector Calculus",
    "problem": "In what direction does the gradient vector ∇f point at any regular point?",
    "latex": "\\nabla f \\text{ points in direction of maximum rate of increase}",
    "options": [
      "Direction of zero change",
      "Direction of greatest rate of increase of f",
      "Tangent to the contour curve",
      "Direction of minimum decrease"
    ],
    "correctIdx": 1,
    "explanation": "The gradient ∇f always points in the direction of the steepest ascent (maximum rate of increase).",
    "difficulty": "Basic"
  },
  {
    "id": 189,
    "stage": "engineering",
    "topic": "Multivariable Calculus — Gradient Magnitude",
    "category": "Vector Calculus",
    "problem": "What does the magnitude |∇f| of the gradient vector represent?",
    "latex": "|\\nabla f| = \\text{Maximum rate of increase}",
    "options": [
      "The value of f itself",
      "The zero rate of change",
      "The maximum rate of increase (steepest slope)",
      "The curvature of f"
    ],
    "correctIdx": 2,
    "explanation": "|∇f| equals the maximum directional derivative at that point.",
    "difficulty": "Basic"
  },
  {
    "id": 190,
    "stage": "engineering",
    "topic": "Laplace Transforms — Transform of Integral",
    "category": "Transform Calculus",
    "problem": "If L{f(t)} = F(s), what is the Laplace transform L{∫_0^t f(τ) dτ}?",
    "latex": "\\mathcal{L}\\left\\{\\int_0^t f(\\tau) d\\tau\\right\\} = \\frac{F(s)}{s}",
    "options": [
      "s F(s)",
      "F’(s)",
      "F(s) − f(0)",
      "F(s) / s"
    ],
    "correctIdx": 3,
    "explanation": "Integration in the time domain corresponds to division by s in the Laplace frequency domain: F(s) / s.",
    "difficulty": "Basic"
  },
  {
    "id": 191,
    "stage": "engineering",
    "topic": "Laplace Transforms — Transform of Derivative",
    "category": "Transform Calculus",
    "problem": "What is the Laplace transform L{f’(t)} of the derivative of f(t)?",
    "latex": "\\mathcal{L}\\{f'(t)\\} = s F(s) - f(0)",
    "options": [
      "s F(s) − f(0)",
      "F(s) / s",
      "s² F(s)",
      "s F(s) + f(0)"
    ],
    "correctIdx": 0,
    "explanation": "By integration by parts: L{f’(t)} = s F(s) − f(0).",
    "difficulty": "Basic"
  },
  {
    "id": 192,
    "stage": "engineering",
    "topic": "Linear Algebra — Trace of Identity Matrix",
    "category": "Linear Algebra",
    "problem": "What is the trace of an n × n identity matrix I_n?",
    "latex": "\\text{Tr}(I_n) = \\sum_{i=1}^n 1 = n",
    "options": [
      "1",
      "n",
      "0",
      "n²"
    ],
    "correctIdx": 1,
    "explanation": "The diagonal contains n ones: Tr(I_n) = 1 + 1 + ... + 1 = n.",
    "difficulty": "Basic"
  },
  {
    "id": 193,
    "stage": "engineering",
    "topic": "Complex Variables — Entire Function Definition",
    "category": "Complex Analysis",
    "problem": "A function f(z) that is analytic everywhere in the finite complex plane ℂ is called:",
    "latex": "\\text{Entire Function}",
    "options": [
      "Harmonic function",
      "Meromorphic function",
      "Entire function",
      "Holomorphic at infinity"
    ],
    "correctIdx": 2,
    "explanation": "An entire function (e.g. e^z, sin z, polynomials) is analytic at every point in ℂ.",
    "difficulty": "Basic"
  },
  {
    "id": 194,
    "stage": "engineering",
    "topic": "Numerical Methods — Euler’s Method Order",
    "category": "Numerical Analysis",
    "problem": "What is the global order of convergence of Euler’s explicit forward method for ODEs?",
    "latex": "O(h)",
    "options": [
      "O(h²)",
      "O(h³)",
      "O(h⁴)",
      "O(h) (First order)"
    ],
    "correctIdx": 3,
    "explanation": "Forward Euler has local truncation error O(h²) and global truncation error O(h).",
    "difficulty": "Basic"
  },
  {
    "id": 195,
    "stage": "engineering",
    "topic": "Applied Statistics — Covariance of Independent Variables",
    "category": "Probability & Statistics",
    "problem": "If two random variables X and Y are statistically independent, what is their covariance Cov(X, Y)?",
    "latex": "\\text{Cov}(X, Y) = E[XY] - E[X]E[Y] = 0",
    "options": [
      "0",
      "1",
      "Var(X) Var(Y)",
      "E[X] + E[Y]"
    ],
    "correctIdx": 0,
    "explanation": "For independent variables, E[XY] = E[X]E[Y], so Cov(X, Y) = 0.",
    "difficulty": "Basic"
  },
  {
    "id": 196,
    "stage": "graduation",
    "topic": "Abstract Algebra — Lagrange’s Theorem on Subgroup Orders",
    "category": "Abstract Algebra",
    "problem": "What does Lagrange’s Theorem state for any subgroup H of a finite group G?",
    "latex": "|H| \\text{ divides } |G|",
    "options": [
      "The order of H divides the order of G (|H| | |G|)",
      "|H| must equal |G| / 2",
      "H must be abelian",
      "H is always a normal subgroup"
    ],
    "correctIdx": 0,
    "explanation": "Lagrange’s Theorem: The order of every subgroup H of a finite group G divides the order of G (|G| = [G : H] |H|).",
    "difficulty": "Basic"
  },
  {
    "id": 197,
    "stage": "graduation",
    "topic": "Abstract Algebra — Order of Cyclic Group Generators",
    "category": "Abstract Algebra",
    "problem": "How many generators does a finite cyclic group G of order n possess?",
    "latex": "\\phi(n) \\quad (\\text{Euler's totient function})",
    "options": [
      "n − 1",
      "φ(n) (Euler totient function)",
      "n / 2",
      "Always exactly 1"
    ],
    "correctIdx": 1,
    "explanation": "An element g^k generates a cyclic group of order n if and only if gcd(k, n) = 1. There are φ(n) such elements.",
    "difficulty": "Basic"
  },
  {
    "id": 198,
    "stage": "graduation",
    "topic": "Abstract Algebra — Prime Order Group Structure",
    "category": "Abstract Algebra",
    "problem": "Every group G of prime order p is necessarily:",
    "latex": "G \\cong \\mathbb{Z}_p \\quad (\\text{Cyclic and hence Abelian})",
    "options": [
      "Non-abelian",
      "Permutation group S_p",
      "Cyclic (and therefore abelian)",
      "Infinite"
    ],
    "correctIdx": 2,
    "explanation": "Since any non-identity element generates a non-trivial subgroup whose order divides p, the generator must have order p, making G cyclic.",
    "difficulty": "Basic"
  },
  {
    "id": 199,
    "stage": "graduation",
    "topic": "Abstract Algebra — First Isomorphism Theorem for Groups",
    "category": "Abstract Algebra",
    "problem": "If φ: G → H is a group homomorphism with kernel K, then G / K is isomorphic to:",
    "latex": "G / \\ker(\\phi) \\cong \\text{Im}(\\phi)",
    "options": [
      "H / G",
      "G",
      "K",
      "Im(φ) (The image of φ in H)"
    ],
    "correctIdx": 3,
    "explanation": "First Isomorphism Theorem: G / ker(φ) ≅ Im(φ).",
    "difficulty": "Intermediate"
  },
  {
    "id": 200,
    "stage": "graduation",
    "topic": "Abstract Algebra — Normal Subgroup Definition",
    "category": "Abstract Algebra",
    "problem": "A subgroup N of G is normal (N ⊲ G) if and only if for all g in G and n in N:",
    "latex": "g n g^{-1} \\in N",
    "options": [
      "g n g⁻¹ ∈ N for all g ∈ G, n ∈ N",
      "g n = n for all g, n",
      "N = {e}",
      "g n = e"
    ],
    "correctIdx": 0,
    "explanation": "A normal subgroup is invariant under all inner automorphisms: g N g⁻¹ = N for all g in G.",
    "difficulty": "Basic"
  },
  {
    "id": 201,
    "stage": "graduation",
    "topic": "Abstract Algebra — Fermat’s Little Theorem",
    "category": "Number Theory",
    "problem": "If p is a prime and a is an integer not divisible by p, then a^(p−1) mod p equals:",
    "latex": "a^{p-1} \\equiv 1 \\pmod{p}",
    "options": [
      "0",
      "1",
      "p − 1",
      "a"
    ],
    "correctIdx": 1,
    "explanation": "Fermat’s Little Theorem: a^(p−1) ≡ 1 (mod p) for any gcd(a, p) = 1.",
    "difficulty": "Basic"
  },
  {
    "id": 202,
    "stage": "graduation",
    "topic": "Abstract Algebra — Integral Domain Zero Divisors",
    "category": "Ring Theory",
    "problem": "A commutative ring with identity (R, +, ·) is called an integral domain if and only if:",
    "latex": "a \\cdot b = 0 \\implies a = 0 \\text{ or } b = 0",
    "options": [
      "Every non-zero element has an inverse",
      "R has finite elements",
      "It has no non-zero zero divisors (ab = 0 => a = 0 or b = 0)",
      "Every ideal is maximal"
    ],
    "correctIdx": 2,
    "explanation": "An integral domain is a non-trivial commutative ring with identity having no non-zero zero divisors.",
    "difficulty": "Basic"
  },
  {
    "id": 203,
    "stage": "graduation",
    "topic": "Abstract Algebra — Field Definition",
    "category": "Ring Theory",
    "problem": "A commutative ring with unity is a field if and only if:",
    "latex": "\\text{Every non-zero element is a unit (has a multiplicative inverse)}",
    "options": [
      "All elements are prime",
      "The ring is finite",
      "It has non-trivial nilpotent elements",
      "Every non-zero element has a multiplicative inverse"
    ],
    "correctIdx": 3,
    "explanation": "A field is an integral domain in which every non-zero element a has an inverse a⁻¹ such that a · a⁻¹ = 1.",
    "difficulty": "Basic"
  },
  {
    "id": 204,
    "stage": "graduation",
    "topic": "Real Analysis — Supremum Definition",
    "category": "Real Analysis",
    "problem": "The supremum (least upper bound) of a non-empty set S bounded above in ℝ is:",
    "latex": "\\sup(S) = \\text{least of all upper bounds of } S",
    "options": [
      "The smallest upper bound of S",
      "The largest element of S always",
      "Infimum of S",
      "Average of bounds"
    ],
    "correctIdx": 0,
    "explanation": "By definition, supremum is the least element in the set of all upper bounds of S.",
    "difficulty": "Basic"
  },
  {
    "id": 205,
    "stage": "graduation",
    "topic": "Real Analysis — Bolzano-Weierstrass Theorem",
    "category": "Real Analysis",
    "problem": "What does the Bolzano-Weierstrass theorem state for sequences in ℝ^n?",
    "latex": "\\text{Every bounded sequence has a convergent subsequence}",
    "options": [
      "Every sequence is monotonic",
      "Every bounded sequence has a convergent subsequence",
      "Every sequence converges",
      "Every Cauchy sequence is bounded only"
    ],
    "correctIdx": 1,
    "explanation": "Bolzano-Weierstrass: Every bounded sequence of real numbers contains at least one convergent subsequence.",
    "difficulty": "Basic"
  },
  {
    "id": 206,
    "stage": "graduation",
    "topic": "Real Analysis — Heine-Borel Theorem",
    "category": "Real Analysis",
    "problem": "In ℝ^n, a subset K is compact if and only if K is:",
    "latex": "K \\text{ is closed and bounded}",
    "options": [
      "Open and bounded",
      "Connected and open",
      "Closed and bounded",
      "Infinite and discrete"
    ],
    "correctIdx": 2,
    "explanation": "Heine-Borel Theorem: A subset of Euclidean space ℝ^n is compact if and only if it is closed and bounded.",
    "difficulty": "Basic"
  },
  {
    "id": 207,
    "stage": "graduation",
    "topic": "Real Analysis — Cauchy Completeness of ℝ",
    "category": "Real Analysis",
    "problem": "A metric space (X, d) is called complete if and only if:",
    "latex": "\\text{Every Cauchy sequence in } X \\text{ converges to a limit in } X",
    "options": [
      "Every bounded set is compact",
      "Every open set is connected",
      "The space is discrete",
      "Every Cauchy sequence converges to a point in X"
    ],
    "correctIdx": 3,
    "explanation": "Completeness means that all Cauchy sequences have limits belonging to the space.",
    "difficulty": "Basic"
  },
  {
    "id": 208,
    "stage": "graduation",
    "topic": "Real Analysis — Uniform Continuity on Compact Intervals",
    "category": "Real Analysis",
    "problem": "If a function f: [a, b] → ℝ is continuous on a closed bounded interval [a, b], then f is necessarily:",
    "latex": "f \\text{ is uniformly continuous on } [a, b]",
    "options": [
      "Uniformly continuous on [a, b]",
      "Differentiable everywhere",
      "A polynomial",
      "Constant"
    ],
    "correctIdx": 0,
    "explanation": "Heine-Cantor Theorem: Continuous functions defined on compact metric spaces are uniformly continuous.",
    "difficulty": "Basic"
  },
  {
    "id": 209,
    "stage": "graduation",
    "topic": "Real Analysis — Weierstrass M-Test for Series of Functions",
    "category": "Real Analysis",
    "problem": "The Weierstrass M-test guarantees what kind of convergence for ∑ f_n(x) on set E if |f_n(x)| ≤ M_n and ∑ M_n converges?",
    "latex": "\\sum f_n(x) \\text{ converges uniformly and absolutely on } E",
    "options": [
      "Pointwise convergence only",
      "Uniform and absolute convergence on E",
      "Conditional convergence",
      "Convergence almost nowhere"
    ],
    "correctIdx": 1,
    "explanation": "If |f_n(x)| ≤ M_n and ∑ M_n < ∞, then ∑ f_n(x) converges uniformly and absolutely on E.",
    "difficulty": "Basic"
  },
  {
    "id": 210,
    "stage": "graduation",
    "topic": "Complex Analysis — Liouville’s Theorem",
    "category": "Complex Analysis",
    "problem": "What does Liouville’s Theorem state regarding bounded entire functions on ℂ?",
    "latex": "f \\text{ bounded and entire } \\implies f(z) = \\text{constant}",
    "options": [
      "Every entire function has a pole",
      "Every entire function is a polynomial",
      "Every bounded entire function on ℂ is constant",
      "Every entire function is periodic"
    ],
    "correctIdx": 2,
    "explanation": "Liouville’s Theorem: If f: ℂ → ℂ is entire and |f(z)| ≤ M for all z, then f is constant.",
    "difficulty": "Basic"
  },
  {
    "id": 211,
    "stage": "graduation",
    "topic": "Complex Analysis — Fundamental Theorem of Algebra",
    "category": "Complex Analysis",
    "problem": "The Fundamental Theorem of Algebra states that every non-constant polynomial P(z) of degree n with complex coefficients has:",
    "latex": "P(z) = 0 \\text{ has exactly } n \\text{ complex roots (counted with multiplicity)}",
    "options": [
      "No roots in ℂ",
      "At least one real root",
      "Only rational roots",
      "Exactly n roots in ℂ (counting multiplicities)"
    ],
    "correctIdx": 3,
    "explanation": "Every complex polynomial of degree n ≥ 1 splits completely into linear factors over ℂ, having exactly n roots.",
    "difficulty": "Basic"
  },
  {
    "id": 212,
    "stage": "graduation",
    "topic": "Complex Analysis — Maximum Modulus Principle",
    "category": "Complex Analysis",
    "problem": "If f(z) is non-constant and analytic on a bounded connected domain D and continuous on D̄, where does |f(z)| attain its maximum?",
    "latex": "\\max_{z \\in \\bar{D}} |f(z)| \\text{ is attained on the boundary } \\partial D",
    "options": [
      "Only on the boundary ∂D",
      "Strictly in the interior of D",
      "At the origin z = 0 always",
      "At infinity"
    ],
    "correctIdx": 0,
    "explanation": "Maximum Modulus Principle: |f(z)| cannot attain a local maximum in the interior of D unless f is constant.",
    "difficulty": "Basic"
  },
  {
    "id": 213,
    "stage": "graduation",
    "topic": "Complex Analysis — Morera’s Theorem",
    "category": "Complex Analysis",
    "problem": "Morera’s theorem states that if f(z) is continuous on domain D and ∮_C f(z) dz = 0 for every closed curve C in D, then:",
    "latex": "f(z) \\text{ is analytic (holomorphic) in } D",
    "options": [
      "f(z) is constant",
      "f(z) is analytic (holomorphic) in D",
      "f(z) is zero everywhere",
      "f(z) is a rational function"
    ],
    "correctIdx": 1,
    "explanation": "Morera’s theorem provides the converse to Cauchy’s Integral Theorem: vanishing loop integrals imply analyticity.",
    "difficulty": "Intermediate"
  },
  {
    "id": 214,
    "stage": "graduation",
    "topic": "Complex Analysis — Essential Singularity Laurent Expansion",
    "category": "Complex Analysis",
    "problem": "An isolated singularity z = z₀ of f(z) is called an essential singularity if its Laurent principal part has:",
    "latex": "\\sum_{n=1}^\\infty \\frac{b_n}{(z - z_0)^n} \\text{ contains infinitely many non-zero terms}",
    "options": [
      "Zero negative power terms",
      "A finite number of negative power terms",
      "Infinitely many non-zero negative power terms",
      "Only one negative power term"
    ],
    "correctIdx": 2,
    "explanation": "If the principal part of the Laurent series has infinitely many terms, z₀ is an essential singularity (e.g. e^(1/z) at z = 0).",
    "difficulty": "Basic"
  },
  {
    "id": 215,
    "stage": "graduation",
    "topic": "Complex Analysis — Casorati-Weierstrass Theorem",
    "category": "Complex Analysis",
    "problem": "Near an essential singularity z₀, the Casorati-Weierstrass theorem asserts that the image f(U \\ {z₀}) is:",
    "latex": "f(U \\setminus \\{z_0\\}) \\text{ is dense in } \\mathbb{C}",
    "options": [
      "An empty set",
      "A single point",
      "Bounded by 1",
      "Dense in the entire complex plane ℂ"
    ],
    "correctIdx": 3,
    "explanation": "In every neighborhood of an essential singularity, the values of f come arbitrarily close to any complex number.",
    "difficulty": "Intermediate"
  },
  {
    "id": 216,
    "stage": "graduation",
    "topic": "Topology — Hausdorff (T2) Space Separation Axiom",
    "category": "General Topology",
    "problem": "A topological space X is Hausdorff (T2) if for any two distinct points x ≠ y in X, there exist open sets U and V such that:",
    "latex": "x \\in U, \\, y \\in V \\quad \\text{and} \\quad U \\cap V = \\emptyset",
    "options": [
      "x ∈ U, y ∈ V with U ∩ V = ∅ (disjoint neighborhoods)",
      "x ∈ U and y ∈ U",
      "U ⊆ V",
      "X = U ∪ V"
    ],
    "correctIdx": 0,
    "explanation": "Hausdorff property: Distinct points can be separated by disjoint open neighborhoods.",
    "difficulty": "Basic"
  },
  {
    "id": 217,
    "stage": "graduation",
    "topic": "Topology — Compactness Definition by Open Covers",
    "category": "General Topology",
    "problem": "A topological space X is compact if and only if:",
    "latex": "\\text{Every open cover has a finite subcover}",
    "options": [
      "Every closed set is bounded",
      "Every open cover of X contains a finite subcover",
      "Every sequence has a unique limit",
      "X is homeomorphic to [0, 1]"
    ],
    "correctIdx": 1,
    "explanation": "Fundamental topological definition: Every open cover admits a finite subcover.",
    "difficulty": "Basic"
  },
  {
    "id": 218,
    "stage": "graduation",
    "topic": "Topology — Connected Space Property",
    "category": "General Topology",
    "problem": "A topological space X is connected if and only if the only subsets that are simultaneously open and closed (clopen) are:",
    "latex": "\\emptyset \\quad \\text{and} \\quad X",
    "options": [
      "Single points",
      "All compact sets",
      "∅ and X only",
      "All open balls"
    ],
    "correctIdx": 2,
    "explanation": "A space is connected if it cannot be partitioned into two disjoint non-empty open sets, meaning ∅ and X are the only clopen subsets.",
    "difficulty": "Basic"
  },
  {
    "id": 219,
    "stage": "graduation",
    "topic": "Functional Analysis — Banach Space Definition",
    "category": "Functional Analysis",
    "problem": "A Banach space is defined as a:",
    "latex": "\\text{Complete normed vector space}",
    "options": [
      "Finite dimensional vector space",
      "Inner product space only",
      "Metric space without norm",
      "Complete normed vector space"
    ],
    "correctIdx": 3,
    "explanation": "By definition, a Banach space is a normed linear space that is complete under the metric induced by the norm.",
    "difficulty": "Basic"
  },
  {
    "id": 220,
    "stage": "graduation",
    "topic": "Functional Analysis — Hilbert Space Definition",
    "category": "Functional Analysis",
    "problem": "A Hilbert space is defined as a:",
    "latex": "\\text{Complete inner product space}",
    "options": [
      "Complete inner product space",
      "Normed space without inner product",
      "Compact metric space",
      "Algebra over integers"
    ],
    "correctIdx": 0,
    "explanation": "A Hilbert space is a real or complex inner product space that is also a complete metric space under the metric d(x, y) = ||x − y||.",
    "difficulty": "Basic"
  },
  {
    "id": 221,
    "stage": "graduation",
    "topic": "Functional Analysis — Cauchy-Schwarz Inequality",
    "category": "Functional Analysis",
    "problem": "In any inner product space, the Cauchy-Schwarz inequality states that for all vectors x and y:",
    "latex": "|\\langle x, y \\rangle| \\le \\|x\\| \\|y\\|",
    "options": [
      "⟨x, y⟩ = ||x|| + ||y||",
      "|⟨x, y⟩| ≤ ||x|| ||y||",
      "||x + y|| = ||x|| ||y||",
      "⟨x, y⟩ ≥ 0"
    ],
    "correctIdx": 1,
    "explanation": "Cauchy-Schwarz inequality: |⟨x, y⟩| ≤ ||x|| ||y||, with equality iff x and y are linearly dependent.",
    "difficulty": "Basic"
  },
  {
    "id": 222,
    "stage": "graduation",
    "topic": "Functional Analysis — Parallelogram Law",
    "category": "Functional Analysis",
    "problem": "A norm ||·|| in a normed space arises from an inner product if and only if it satisfies:",
    "latex": "\\|x+y\\|^2 + \\|x-y\\|^2 = 2\\|x\\|^2 + 2\\|y\\|^2",
    "options": [
      "||x + y|| = ||x|| + ||y||",
      "||x − y|| ≤ ||x|| ||y||",
      "||x + y||² + ||x − y||² = 2||x||² + 2||y||²",
      "||x||² = ⟨x, x⟩²"
    ],
    "correctIdx": 2,
    "explanation": "Jordan-von Neumann Theorem: A norm is induced by an inner product iff the parallelogram law holds.",
    "difficulty": "Intermediate"
  },
  {
    "id": 223,
    "stage": "graduation",
    "topic": "Functional Analysis — Riesz Representation Theorem",
    "category": "Functional Analysis",
    "problem": "The Riesz Representation Theorem states that every continuous linear functional f on a Hilbert space H can be uniquely represented as:",
    "latex": "f(x) = \\langle x, y \\rangle \\quad \\text{for a unique } y \\in H",
    "options": [
      "f(x) = ||x||",
      "f(x) = 0",
      "f(x) = det(x)",
      "f(x) = ⟨x, y⟩ for a unique y ∈ H"
    ],
    "correctIdx": 3,
    "explanation": "Riesz Representation Theorem: For every f ∈ H*, there is a unique y ∈ H such that f(x) = ⟨x, y⟩ for all x in H.",
    "difficulty": "Intermediate"
  },
  {
    "id": 224,
    "stage": "graduation",
    "topic": "Discrete Mathematics — Handshaking Lemma for Graphs",
    "category": "Graph Theory",
    "problem": "For any undirected graph G = (V, E), the sum of degrees of all vertices ∑ deg(v) equals:",
    "latex": "\\sum_{v \\in V} \\deg(v) = 2 |E|",
    "options": [
      "2 |E| (twice the number of edges)",
      "|E|",
      "|V| + |E|",
      "|V| (|V| − 1)"
    ],
    "correctIdx": 0,
    "explanation": "Handshaking Lemma: Every edge contributes 1 to the degree of each of its two endpoint vertices, so the sum is 2|E|.",
    "difficulty": "Basic"
  },
  {
    "id": 225,
    "stage": "graduation",
    "topic": "Discrete Mathematics — Number of Odd Degree Vertices",
    "category": "Graph Theory",
    "problem": "In any undirected graph, the number of vertices with odd degree is always:",
    "latex": "\\text{Always an even number}",
    "options": [
      "An odd number",
      "An even number",
      "Equal to |E|",
      "Prime"
    ],
    "correctIdx": 1,
    "explanation": "Since the sum of all degrees is 2|E| (even), the sum of odd degrees must be even, implying an even count of odd-degree vertices.",
    "difficulty": "Basic"
  },
  {
    "id": 226,
    "stage": "graduation",
    "topic": "Discrete Mathematics — Euler’s Formula for Connected Planar Graphs",
    "category": "Graph Theory",
    "problem": "For any connected planar graph with V vertices, E edges, and F faces, Euler’s formula states:",
    "latex": "V - E + F = 2",
    "options": [
      "V + E + F = 2",
      "V − E − F = 1",
      "V − E + F = 2",
      "V · F = E"
    ],
    "correctIdx": 2,
    "explanation": "Euler’s characteristic formula for connected planar graphs embedded on a sphere or plane is V − E + F = 2.",
    "difficulty": "Basic"
  },
  {
    "id": 227,
    "stage": "graduation",
    "topic": "Discrete Mathematics — Eulerian Graph Characterization",
    "category": "Graph Theory",
    "problem": "A connected graph G has an Eulerian circuit (closed Eulerian trail) if and only if:",
    "latex": "\\text{Every vertex has even degree}",
    "options": [
      "Every vertex has odd degree",
      "It is a tree",
      "It has at least one Hamiltonian cycle",
      "Every vertex has even degree"
    ],
    "correctIdx": 3,
    "explanation": "Euler’s Theorem (1736): A connected graph has an Eulerian circuit iff every vertex has an even degree.",
    "difficulty": "Basic"
  },
  {
    "id": 228,
    "stage": "graduation",
    "topic": "Number Theory — Chinese Remainder Theorem Condition",
    "category": "Number Theory",
    "problem": "The Chinese Remainder Theorem guarantees a unique solution modulo m₁ m₂ ... m_k provided the moduli m_i are:",
    "latex": "\\gcd(m_i, m_j) = 1 \\quad \\text{for all } i \\neq j",
    "options": [
      "Pairwise coprime (gcd(m_i, m_j) = 1 for i ≠ j)",
      "All prime numbers",
      "All equal",
      "All odd"
    ],
    "correctIdx": 0,
    "explanation": "CRT requires pairwise coprime moduli gcd(m_i, m_j) = 1 to guarantee a unique solution modulo their product.",
    "difficulty": "Basic"
  },
  {
    "id": 229,
    "stage": "graduation",
    "topic": "Number Theory — Wilson’s Theorem",
    "category": "Number Theory",
    "problem": "A natural number p > 1 is prime if and only if (p − 1)! mod p equals:",
    "latex": "(p - 1)! \\equiv -1 \\pmod{p}",
    "options": [
      "1",
      "−1 (or p − 1)",
      "0",
      "p / 2"
    ],
    "correctIdx": 1,
    "explanation": "Wilson’s Theorem: (p − 1)! ≡ −1 (mod p) if and only if p is prime.",
    "difficulty": "Basic"
  },
  {
    "id": 230,
    "stage": "graduation",
    "topic": "Abstract Algebra — Kernel of Homomorphism is Normal",
    "category": "Abstract Algebra",
    "problem": "For any group homomorphism φ: G → H, the kernel ker(φ) is always:",
    "latex": "\\ker(\\phi) \\trianglelefteq G",
    "options": [
      "Any arbitrary subset",
      "A cyclic subgroup only",
      "A normal subgroup of G",
      "A maximal ideal"
    ],
    "correctIdx": 2,
    "explanation": "The kernel is closed under conjugation: φ(g k g⁻¹) = φ(g) e φ(g)⁻¹ = e, so ker(φ) ⊲ G.",
    "difficulty": "Basic"
  },
  {
    "id": 231,
    "stage": "graduation",
    "topic": "Abstract Algebra — Symmetric Group Order",
    "category": "Abstract Algebra",
    "problem": "What is the order of the symmetric group S_n of permutations on n symbols?",
    "latex": "|S_n| = n!",
    "options": [
      "2ⁿ",
      "n²",
      "n (n − 1) / 2",
      "n!"
    ],
    "correctIdx": 3,
    "explanation": "The number of bijections on a set of n elements is n!.",
    "difficulty": "Basic"
  },
  {
    "id": 232,
    "stage": "graduation",
    "topic": "Abstract Algebra — Alternating Group Order",
    "category": "Abstract Algebra",
    "problem": "What is the order of the alternating group A_n (even permutations) for n ≥ 2?",
    "latex": "|A_n| = \\frac{n!}{2}",
    "options": [
      "n! / 2",
      "n!",
      "(n − 1)!",
      "2ⁿ⁻¹"
    ],
    "correctIdx": 0,
    "explanation": "A_n is the kernel of the sign homomorphism sgn: S_n → {±1}, so |A_n| = |S_n| / 2 = n! / 2.",
    "difficulty": "Basic"
  },
  {
    "id": 233,
    "stage": "graduation",
    "topic": "Abstract Algebra — Principal Ideal Domain (PID) Definition",
    "category": "Ring Theory",
    "problem": "An integral domain R in which every ideal is generated by a single element is called a:",
    "latex": "\\text{Principal Ideal Domain (PID)}",
    "options": [
      "Euclidean domain",
      "Principal Ideal Domain (PID)",
      "Field",
      "Unique Factorization Domain only"
    ],
    "correctIdx": 1,
    "explanation": "In a PID, every ideal I is of the form ⟨a⟩ = a R for some element a ∈ R.",
    "difficulty": "Basic"
  },
  {
    "id": 234,
    "stage": "graduation",
    "topic": "Abstract Algebra — Division Algorithm in Euclidean Domain",
    "category": "Ring Theory",
    "problem": "Every Euclidean Domain (ED) is necessarily a:",
    "latex": "\\text{ED} \\implies \\text{PID} \\implies \\text{UFD}",
    "options": [
      "Finite field",
      "Vector space",
      "Principal Ideal Domain (PID)",
      "Non-commutative ring"
    ],
    "correctIdx": 2,
    "explanation": "Standard algebraic hierarchy: Fields ⊂ Euclidean Domains ⊂ Principal Ideal Domains ⊂ Unique Factorization Domains.",
    "difficulty": "Basic"
  },
  {
    "id": 235,
    "stage": "graduation",
    "topic": "Real Analysis — Archimedean Property of Real Numbers",
    "category": "Real Analysis",
    "problem": "The Archimedean property states that for any x ∈ ℝ, there exists a natural number n ∈ ℕ such that:",
    "latex": "n > x",
    "options": [
      "n < x",
      "n = x²",
      "n x = 1",
      "n > x"
    ],
    "correctIdx": 3,
    "explanation": "Archimedean property: The set of natural numbers ℕ is unbounded above in ℝ (for all x ∈ ℝ, ∃ n ∈ ℕ with n > x).",
    "difficulty": "Basic"
  },
  {
    "id": 236,
    "stage": "graduation",
    "topic": "Real Analysis — Cantor Intersection Theorem",
    "category": "Real Analysis",
    "problem": "In a complete metric space, if {F_n} is a decreasing sequence of non-empty closed sets with diam(F_n) → 0, then ⋂ F_n consists of:",
    "latex": "\\bigcap_{n=1}^\\infty F_n = \\{x\\} \\quad (\\text{Exactly one point})",
    "options": [
      "Exactly one point",
      "An empty set",
      "An infinite open ball",
      "The entire space"
    ],
    "correctIdx": 0,
    "explanation": "Cantor’s Intersection Theorem guarantees that the nested intersection contains precisely one point.",
    "difficulty": "Intermediate"
  },
  {
    "id": 237,
    "stage": "graduation",
    "topic": "Real Analysis — Riemann-Stieltjes Integral Linearity",
    "category": "Real Analysis",
    "problem": "In the Riemann-Stieltjes integral ∫_a^b f dα, if α(x) is continuously differentiable, the integral reduces to:",
    "latex": "\\int_a^b f(x) \\alpha'(x) dx",
    "options": [
      "∫_a^b f(x) dx",
      "∫_a^b f(x) α’(x) dx",
      "f(b) α(b) − f(a) α(a)",
      "∫_a^b f’(x) α(x) dx"
    ],
    "correctIdx": 1,
    "explanation": "When α is C¹, dα = α’(x) dx, converting the Riemann-Stieltjes integral to an ordinary Riemann integral.",
    "difficulty": "Basic"
  },
  {
    "id": 238,
    "stage": "graduation",
    "topic": "Real Analysis — Monotone Convergence Theorem for Sequences",
    "category": "Real Analysis",
    "problem": "Every bounded monotonic sequence of real numbers is:",
    "latex": "\\text{Convergent}",
    "options": [
      "Divergent to infinity",
      "Oscillating",
      "Convergent",
      "Unbounded"
    ],
    "correctIdx": 2,
    "explanation": "Monotone Convergence Theorem: A monotonic sequence of real numbers converges if and only if it is bounded.",
    "difficulty": "Basic"
  },
  {
    "id": 239,
    "stage": "graduation",
    "topic": "Complex Analysis — Rouche’s Theorem",
    "category": "Complex Analysis",
    "problem": "Rouché’s Theorem states that if |f(z) − g(z)| < |f(z)| on simple closed contour C, then inside C:",
    "latex": "f(z) \\text{ and } g(z) \\text{ have the same number of zeros}",
    "options": [
      "f(z) has twice the zeros of g(z)",
      "f(z) and g(z) are identical",
      "Neither has any zeros",
      "f(z) and g(z) have the same number of zeros (counting multiplicity)"
    ],
    "correctIdx": 3,
    "explanation": "Rouché’s Theorem: Functions whose difference is strictly smaller than |f| on the boundary enclose the same number of zeros.",
    "difficulty": "Intermediate"
  },
  {
    "id": 240,
    "stage": "graduation",
    "topic": "Complex Analysis — Argument Principle",
    "category": "Complex Analysis",
    "problem": "The Argument Principle states that 1/(2πi) ∮_C [f’(z)/f(z)] dz equals:",
    "latex": "\\frac{1}{2\\pi i} \\oint_C \\frac{f'(z)}{f(z)} dz = N - P",
    "options": [
      "N − P (Number of zeros minus number of poles inside C)",
      "N + P",
      "Res(f, 0)",
      "0 always"
    ],
    "correctIdx": 0,
    "explanation": "Argument Principle: The logarithmic residue integral equals N − P, where N is the number of zeros and P is the number of poles.",
    "difficulty": "Intermediate"
  },
  {
    "id": 241,
    "stage": "graduation",
    "topic": "Complex Analysis — Conformal Mapping Angle Preservation",
    "category": "Complex Analysis",
    "problem": "A mapping w = f(z) by an analytic function is conformal at every point z₀ where:",
    "latex": "f'(z_0) \\neq 0",
    "options": [
      "f(z₀) = 0",
      "f’(z₀) ≠ 0",
      "f’’(z₀) = 0",
      "f(z₀) is purely imaginary"
    ],
    "correctIdx": 1,
    "explanation": "A mapping is conformal (preserves angles in magnitude and sense) at all points where f’(z) is non-zero.",
    "difficulty": "Basic"
  },
  {
    "id": 242,
    "stage": "graduation",
    "topic": "Topology — Product Topology Projection Continuity",
    "category": "General Topology",
    "problem": "In the product topology on X × Y, the canonical projection maps p_X: X × Y → X and p_Y: X × Y → Y are always:",
    "latex": "p_X \\text{ and } p_Y \\text{ are continuous and open maps}",
    "options": [
      "Closed maps only",
      "Bijective maps",
      "Continuous and open maps",
      "Homeomorphisms"
    ],
    "correctIdx": 2,
    "explanation": "The product topology is the coarsest topology such that all coordinate projections are continuous, and they are also open maps.",
    "difficulty": "Basic"
  },
  {
    "id": 243,
    "stage": "graduation",
    "topic": "Topology — Homeomorphism Definition",
    "category": "General Topology",
    "problem": "A map f: X → Y between topological spaces is a homeomorphism if f is a bijection, f is continuous, and:",
    "latex": "f^{-1} \\text{ is continuous}",
    "options": [
      "f is differentiable",
      "f is constant",
      "f is an isometry",
      "f⁻¹ is also continuous"
    ],
    "correctIdx": 3,
    "explanation": "A homeomorphism is a continuous bijection whose inverse f⁻¹ is also continuous.",
    "difficulty": "Basic"
  },
  {
    "id": 244,
    "stage": "graduation",
    "topic": "Functional Analysis — Dual Space Definition",
    "category": "Functional Analysis",
    "problem": "The dual space X* of a normed space X is the space of all:",
    "latex": "\\text{Continuous (bounded) linear functionals on } X",
    "options": [
      "Continuous (bounded) linear functionals on X",
      "Bijections from X to X",
      "Subspaces of X",
      "Inner products on X"
    ],
    "correctIdx": 0,
    "explanation": "Dual space X* = B(X, ℂ) consists of all continuous linear maps from X into the scalar field.",
    "difficulty": "Basic"
  },
  {
    "id": 245,
    "stage": "graduation",
    "topic": "Functional Analysis — Orthogonal Complement Intersection",
    "category": "Functional Analysis",
    "problem": "In a Hilbert space H, for any closed subspace M, what is M ∩ M^⊥?",
    "latex": "M \\cap M^\\perp = \\{0\\}",
    "options": [
      "M",
      "{0} (The zero vector only)",
      "H",
      "Empty set ∅"
    ],
    "correctIdx": 1,
    "explanation": "If x ∈ M ∩ M^⊥, then ⟨x, x⟩ = ||x||² = 0 => x = 0.",
    "difficulty": "Basic"
  },
  {
    "id": 246,
    "stage": "graduation",
    "topic": "Functional Analysis — Bessel’s Inequality",
    "category": "Functional Analysis",
    "problem": "If {e_k} is an orthonormal sequence in Hilbert space H, Bessel’s inequality states that for any x ∈ H:",
    "latex": "\\sum_{k} |\\langle x, e_k \\rangle|^2 \\le \\|x\\|^2",
    "options": [
      "∑ |⟨x, e_k⟩|² = 0",
      "∑ |⟨x, e_k⟩|² ≥ ||x||²",
      "∑ |⟨x, e_k⟩|² ≤ ||x||²",
      "∑ ⟨x, e_k⟩ = ||x||"
    ],
    "correctIdx": 2,
    "explanation": "Bessel’s inequality: The sum of squares of Fourier coefficients with respect to an orthonormal set never exceeds ||x||².",
    "difficulty": "Basic"
  },
  {
    "id": 247,
    "stage": "graduation",
    "topic": "Functional Analysis — Parseval’s Identity",
    "category": "Functional Analysis",
    "problem": "Parseval’s identity ∑ |⟨x, e_k⟩|² = ||x||² holds for all x in H if and only if the orthonormal set {e_k} is:",
    "latex": "\\text{Complete (an orthonormal basis)}",
    "options": [
      "Finite",
      "Orthogonal to 0 only",
      "Uncountable",
      "Complete (an orthonormal basis for H)"
    ],
    "correctIdx": 3,
    "explanation": "Parseval’s equality holds if and only if the orthonormal system is maximal / complete (a Hilbert basis).",
    "difficulty": "Basic"
  },
  {
    "id": 248,
    "stage": "graduation",
    "topic": "Discrete Mathematics — Tree Number of Edges",
    "category": "Graph Theory",
    "problem": "A tree with n vertices has exactly how many edges?",
    "latex": "|E| = n - 1",
    "options": [
      "n − 1 edges",
      "n edges",
      "n + 1 edges",
      "n(n − 1)/2 edges"
    ],
    "correctIdx": 0,
    "explanation": "Theorem: Any connected acyclic graph (tree) on n vertices has precisely n − 1 edges.",
    "difficulty": "Basic"
  },
  {
    "id": 249,
    "stage": "graduation",
    "topic": "Discrete Mathematics — Complete Graph K_n Edges",
    "category": "Graph Theory",
    "problem": "How many edges are there in the complete graph K_n on n vertices?",
    "latex": "\\binom{n}{2} = \\frac{n(n - 1)}{2}",
    "options": [
      "n",
      "n(n − 1) / 2",
      "n²",
      "2ⁿ"
    ],
    "correctIdx": 1,
    "explanation": "In K_n, every pair of distinct vertices has an edge between them: C(n, 2) = n(n − 1)/2.",
    "difficulty": "Basic"
  },
  {
    "id": 250,
    "stage": "graduation",
    "topic": "Discrete Mathematics — Bipartite Graph Odd Cycles",
    "category": "Graph Theory",
    "problem": "A graph G is bipartite if and only if it contains:",
    "latex": "\\text{No odd cycles}",
    "options": [
      "Only even vertices",
      "A Hamiltonian circuit",
      "No cycles of odd length",
      "No triangles only"
    ],
    "correctIdx": 2,
    "explanation": "Kőnig’s Theorem: A graph is bipartite (2-colorable) if and only if it contains no odd-length cycles.",
    "difficulty": "Basic"
  },
  {
    "id": 251,
    "stage": "graduation",
    "topic": "Discrete Mathematics — Chromatic Number of Planar Graphs (Four Color Theorem)",
    "category": "Graph Theory",
    "problem": "The famous Four Color Theorem states that the chromatic number χ(G) of any planar graph G is at most:",
    "latex": "\\chi(G) \\le 4",
    "options": [
      "3",
      "5",
      "6",
      "4"
    ],
    "correctIdx": 3,
    "explanation": "Appel and Haken (1976): Every planar graph can be properly vertex-colored using at most 4 colors.",
    "difficulty": "Basic"
  },
  {
    "id": 252,
    "stage": "graduation",
    "topic": "Abstract Algebra — Characteristic of a Field",
    "category": "Field Theory",
    "problem": "The characteristic of any field F must be either 0 or:",
    "latex": "\\text{char}(F) = 0 \\quad \\text{or a prime } p",
    "options": [
      "A prime number p",
      "Any composite integer",
      "Negative",
      "Infinite always"
    ],
    "correctIdx": 0,
    "explanation": "If char(F) were composite m = ab, then a · b = 0 in F, contradicting that F is an integral domain. Thus char(F) is 0 or prime.",
    "difficulty": "Basic"
  },
  {
    "id": 253,
    "stage": "graduation",
    "topic": "Abstract Algebra — Finite Field Order",
    "category": "Field Theory",
    "problem": "The number of elements in any finite field GF(q) must be of the form:",
    "latex": "q = p^n \\quad \\text{for some prime } p \\text{ and integer } n \\ge 1",
    "options": [
      "Any positive integer",
      "p^n for some prime p and integer n ≥ 1",
      "n! for some n",
      "2n + 1 always"
    ],
    "correctIdx": 1,
    "explanation": "Every finite field is a finite-dimensional vector space over its prime subfield ℤ_p, so its order is p^n.",
    "difficulty": "Basic"
  },
  {
    "id": 254,
    "stage": "graduation",
    "topic": "Topology — Discrete Topology Open Sets",
    "category": "General Topology",
    "problem": "In the discrete topology on a set X, which subsets of X are open?",
    "latex": "\\mathcal{T} = \\mathcal{P}(X) \\quad (\\text{Every subset is open})",
    "options": [
      "Only ∅ and X",
      "Only finite subsets",
      "Every subset of X (all subsets in power set)",
      "Only singletons"
    ],
    "correctIdx": 2,
    "explanation": "In the discrete topology, every singleton {x} is open, hence every subset is open and closed.",
    "difficulty": "Basic"
  },
  {
    "id": 255,
    "stage": "graduation",
    "topic": "Topology — Indiscrete (Trivial) Topology",
    "category": "General Topology",
    "problem": "In the indiscrete (trivial) topology on set X, what are the only open subsets?",
    "latex": "\\mathcal{T} = \\{\\emptyset, X\\}",
    "options": [
      "All countable subsets",
      "Singletons",
      "Every subset",
      "Only ∅ and X"
    ],
    "correctIdx": 3,
    "explanation": "By definition, the indiscrete topology consists exclusively of the empty set ∅ and the whole set X.",
    "difficulty": "Basic"
  }
];

function extractChapterQuestions(
  chapters: typeof CLASS_6_CHAPTERS,
  stage: AcademicStage,
  startId: number
): PracticeQuestion[] {
  const list: PracticeQuestion[] = [];
  let currId = startId;
  for (const ch of chapters) {
    ch.chapterQuiz.forEach((quiz, idx) => {
      list.push({
        id: currId++,
        stage,
        topic: `${ch.title} — Q${idx + 1}`,
        category: ch.unit,
        problem: quiz.question,
        latex: ch.formula || undefined,
        options: [...quiz.options],
        correctIdx: (quiz as any).correctIdx ?? (quiz as any).correctAnswer ?? 0,
        explanation: quiz.explanation,
        difficulty: idx === 0 ? 'Basic' : idx === 1 ? 'Intermediate' : 'Advanced',
      });
    });
  }
  return list;
}

const CLASS_6_QUESTIONS = extractChapterQuestions(CLASS_6_CHAPTERS, '6th', 256);
const CLASS_7_QUESTIONS = extractChapterQuestions(CLASS_7_CHAPTERS, '7th', 256 + CLASS_6_QUESTIONS.length);
const CLASS_8_QUESTIONS = extractChapterQuestions(CLASS_8_CHAPTERS, '8th', 256 + CLASS_6_QUESTIONS.length + CLASS_7_QUESTIONS.length);
const CLASS_9_QUESTIONS = extractChapterQuestions(CLASS_9_CHAPTERS, '9th', 256 + CLASS_6_QUESTIONS.length + CLASS_7_QUESTIONS.length + CLASS_8_QUESTIONS.length);

export const PRACTICE_QUESTIONS_BANK: PracticeQuestion[] = [
  ...RAW_PRACTICE_QUESTIONS_BANK,
  ...CLASS_6_QUESTIONS,
  ...CLASS_7_QUESTIONS,
  ...CLASS_8_QUESTIONS,
  ...CLASS_9_QUESTIONS,
];

/**
 * Samples count (default 6) random questions from the specified stage or across all questions
 */
export function sampleRandomQuestions(
  count: number = 6,
  stage: AcademicStage | 'all' = 'all'
): PracticeQuestion[] {
  let pool =
    stage && stage !== 'all'
      ? PRACTICE_QUESTIONS_BANK.filter((q) => q.stage === stage)
      : [...PRACTICE_QUESTIONS_BANK];

  if (!pool || pool.length === 0) {
    pool = [...PRACTICE_QUESTIONS_BANK];
  }

  // Fisher-Yates shuffle
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Returns total count of questions for a specific stage
 */
export function getQuestionCountByStage(stage: AcademicStage | 'all'): number {
  if (stage === 'all') return PRACTICE_QUESTIONS_BANK.length;
  return PRACTICE_QUESTIONS_BANK.filter((q) => q.stage === stage).length;
}
