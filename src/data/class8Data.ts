/**
 * Class 8 — Advanced Middle-School Mathematics Curriculum Data
 * Complete, structured mathematical learning content with 14 chapters:
 *
 * Part A:
 * 1. A Square and A Cube
 * 2. Power Play
 * 3. A Story of Numbers
 * 4. Quadrilaterals
 * 5. Number Play
 * 6. We Distribute, Yet Things Multiply
 * 7. Proportional Reasoning-1
 *
 * Part B:
 * 8. Fractions in Disguise
 * 9. The Baudhayana-Pythagoras Theorem
 * 10. Proportional Reasoning-2
 * 11. Exploring Some Geometric Themes
 * 12. Tales by Dots and Lines
 * 13. Algebra Play
 * 14. Area
 */

import { MiddleSchoolChapter } from './class6Data.ts';

export const CLASS_8_CHAPTERS: MiddleSchoolChapter[] = [
  // ================= PART A =================
  {
    id: 'c8-01',
    number: 'Chapter 01',
    title: 'A Square and A Cube',
    classLevel: 8,
    unit: 'Part A — Foundations & Structures',
    description: 'Explore square numbers, square roots via prime factorization and long division, cube numbers, cube roots, and geometric interpretations as 2D area and 3D volume.',
    learningObjectives: [
      'Recognize properties of square numbers (ending digits 0, 1, 4, 5, 6, 9 only)',
      'Calculate square roots using prime factorization and the division algorithm',
      'Compute cube numbers and determine cube roots through grouping triples of prime factors',
      'Solve geometric word problems involving square plots and cubic tanks'
    ],
    formula: 's = \\sqrt{A}, \\quad V = s^3 \\iff s = \\sqrt[3]{V}, \\quad \\sum_{k=1}^n (2k - 1) = n^2',
    simpleExplanation: 'When you multiply a number by itself, you get a square number (like 5 × 5 = 25), named after a square tile whose area is side × side. When you multiply three of them together (5 × 5 × 5 = 125), you get a cube, named after a 3D block whose volume is side × side × side!',
    detailedExplanation: 'A square number is an integer n = k². Properties: no square number ends in 2, 3, 7, or 8. The square of an odd number is always odd, and an even number is even. The sum of the first n consecutive odd numbers is n²: 1 + 3 + 5 + ... + (2n-1) = n². Cube numbers n = k³ can end in any digit. To find the square root by prime factorization, group prime factors into identical pairs; for cube roots, group factors into triples.',
    advancedReasoning: 'Uniqueness of prime factorization: If a prime p divides n², it must divide n. This property is the cornerstone for proving that the square root of any non-square integer (like √2, √3, √5) is irrational, because if √2 = a/b, then 2b² = a², requiring the prime factor 2 to appear with even multiplicity on the right and odd on the left, a contradiction.',
    workedExamples: [
      {
        title: 'Finding the square root of 7056 using prime factorization',
        description: 'Calculate √7056 by expressing it as a product of prime factors.',
        steps: [
          'Step 1: Divide by 2: 7056 ÷ 2 = 3528 ÷ 2 = 1764 ÷ 2 = 882 ÷ 2 = 441 (four 2s).',
          'Step 2: Divide 441 by 3: 441 ÷ 3 = 147 ÷ 3 = 49 (two 3s).',
          'Step 3: Divide 49 by 7: 49 ÷ 7 = 7 ÷ 7 = 1 (two 7s).',
          'Step 4: Prime factorization: 7056 = 2^4 × 3^2 × 7^2.',
          'Step 5: Take one factor from each pair: √7056 = 2^2 × 3^1 × 7^1 = 4 × 3 × 7 = 84.'
        ],
        result: '√7056 = 84.'
      },
      {
        title: 'Finding the cube root of 1728',
        description: 'Find ∛1728 using prime factorization.',
        steps: [
          'Step 1: 1728 = 2^6 × 3^3.',
          'Step 2: Group factors into triples: (2 × 2 × 2) × (2 × 2 × 2) × (3 × 3 × 3).',
          'Step 3: Take one factor from each group of three: ∛1728 = 2 × 2 × 3 = 12.',
          'Step 4: Verify: 12^3 = 12 × 12 × 12 = 144 × 12 = 1728.'
        ],
        result: '∛1728 = 12.'
      }
    ],
    guidedPractice: {
      question: 'Find the smallest number by which 180 must be multiplied to make it a perfect square.',
      hint: 'Prime factorize 180 and find which prime factor lacks a matching pair.',
      solution: '180 = 2^2 × 3^2 × 5^1. The factor 5 is unpaired. Multiplying by 5 gives 180 × 5 = 900 = 30^2.'
    },
    independentQuestions: [
      'Find the square root of 7.29.',
      'What is the side of a cube whose volume is 3375 cm³?',
      'Show that 1 + 3 + 5 + 7 + 9 + 11 = 6² without adding one by one.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-01-1',
        question: 'Which of the following numbers CANNOT be a perfect square based on its unit digit?',
        options: ['1057', '1024', '2025', '1296'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Square numbers never end in } 2, 3, 7, \\text{ or } 8',
        explanation: 'The unit digit of 1057 is 7. No square of an integer can end in 2, 3, 7, or 8.',
        commonMistake: 'Checking divisibility instead of the last-digit constraint.'
      },
      {
        id: 'q-c8-01-2',
        question: 'What is the cube root of 216?',
        options: ['6', '4', '8', '16'],
        correctIdx: 0,
        ruleOrFormula: '6^3 = 6 \\times 6 \\times 6 = 216',
        explanation: '6 × 6 × 6 = 216, so ∛216 = 6.',
        commonMistake: 'Confusing square root (which is not an integer for 216) with cube root.'
      },
      {
        id: 'q-c8-01-3',
        question: 'How many non-square natural numbers lie between 12² and 13²?',
        options: ['24', '25', '26', '23'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Between } n^2 \\text{ and } (n+1)^2 \\text{ there are } 2n \\text{ numbers}',
        explanation: 'There are 2n non-square numbers between n² and (n + 1)². For n = 12: 2(12) = 24.',
        commonMistake: 'Subtracting 169 - 144 = 25 and forgetting to exclude 169 itself.'
      }
    ],
    interactiveToolId: 'tool-c8-square-cube',
    relatedActivityLabel: 'Square Area & 3D Cube Roots Visualizer'
  },
  {
    id: 'c8-02',
    number: 'Chapter 02',
    title: 'Power Play',
    classLevel: 8,
    unit: 'Part A — Foundations & Structures',
    description: 'Master exponents and powers with negative and fractional exponents, laws of exponents, zero exponent, and scientific notation for microscopic measurements.',
    learningObjectives: [
      'Apply all laws of exponents: product rule, quotient rule, power of a power, power of a product',
      'Understand negative exponents as reciprocals: a^-n = 1/a^n',
      'Establish that any non-zero base to the power 0 equals 1: a^0 = 1',
      'Express microscopic dimensions (nanometers, cell sizes) in standard scientific form'
    ],
    formula: 'a^m \\cdot a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}, \\quad a^{-n} = \\frac{1}{a^n}, \\quad a^0 = 1',
    simpleExplanation: 'Exponents are repeated multiplication. A negative exponent doesn\'t make a number negative—it flips it into a fraction! For example, 10^-3 means 1 / 10^3 = 1/1,000 = 0.001. That is how scientists measure things as tiny as bacteria and atoms!',
    detailedExplanation: 'Exponentiation satisfies the fundamental homomorphism a^(x+y) = a^x · a^y. From this, consistency dictates that a^0 = a^(n - n) = a^n / a^n = 1 (for a ≠ 0). Similarly, a^-n = a^(0 - n) = a^0 / a^n = 1/a^n. Fractional exponents represent roots: a^(1/n) = ⁿ√a, and a^(m/n) = ⁿ√(a^m). Very small numbers are written as m × 10^-k (e.g. size of a virus = 1.2 × 10^-7 m).',
    advancedReasoning: 'Continuous exponentiation: The index laws extend from integers to rationals and finally to real exponents via limit sequences: a^x = exp(x ln a). The fundamental property d/dx [a^x] = a^x ln a connects powers to differential calculus and continuous exponential growth models in nature.',
    workedExamples: [
      {
        title: 'Simplifying an expression with mixed negative exponents',
        description: 'Simplify and express in positive exponent form: (2^-3 × 3^-4) / (2^-5 × 3^-2).',
        steps: [
          'Step 1: Separate like bases: (2^-3 / 2^-5) × (3^-4 / 3^-2).',
          'Step 2: Apply quotient rule a^m / a^n = a^(m - n): 2^(-3 - (-5)) × 3^(-4 - (-2)).',
          'Step 3: Simplify exponents: 2^(-3 + 5) × 3^(-4 + 2) = 2^2 × 3^-2.',
          'Step 4: Convert negative exponent to fraction: 2^2 / 3^2 = 4 / 9.'
        ],
        result: '4/9 or (2/3)^2.'
      },
      {
        title: 'Writing the size of a plant cell in scientific notation',
        description: 'The size of a typical plant cell is 0.00001275 meters. Write this in standard scientific form.',
        steps: [
          'Step 1: Shift decimal point to the right until there is one non-zero digit before it: 1.275.',
          'Step 2: Count the number of places shifted to the right: 5 places.',
          'Step 3: Moving right corresponds to a negative power of ten: 10^-5.',
          'Step 4: Combine: 1.275 × 10^-5 m.'
        ],
        result: '1.275 × 10^-5 m.'
      }
    ],
    guidedPractice: {
      question: 'Evaluate: (1/3)^-2 + (1/4)^-2 + (1/2)^-3.',
      hint: '(1/a)^-n = a^n. Invert each fraction and change the exponent to positive.',
      solution: '3^2 + 4^2 + 2^3 = 9 + 16 + 8 = 33.'
    },
    independentQuestions: [
      'Find x if 5^(2x - 1) = 125.',
      'Simplify: [(2/3)^2]^-3 × (3/2)^-4.',
      'The thickness of a sheet of paper is 0.0016 cm. Express in standard scientific notation.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-02-1',
        question: 'What is the value of 5^-3?',
        options: ['1/125', '-125', '-15', '1/15'],
        correctIdx: 0,
        ruleOrFormula: 'a^{-n} = \\frac{1}{a^n} \\implies 5^{-3} = \\frac{1}{5^3} = \\frac{1}{125}',
        explanation: 'A negative exponent indicates the reciprocal of the positive power: 1 / 5^3 = 1 / 125.',
        commonMistake: 'Making the result a negative number: -125 or -15.'
      },
      {
        id: 'q-c8-02-2',
        question: 'What is any non-zero number raised to the power 0 equal to?',
        options: ['1', '0', 'The number itself', 'Undefined'],
        correctIdx: 0,
        ruleOrFormula: 'a^0 = 1 \\quad (a \\ne 0)',
        explanation: 'By the quotient rule a^n / a^n = a^(n - n) = a^0 = 1.',
        commonMistake: 'Thinking anything with power 0 must equal 0.'
      },
      {
        id: 'q-c8-02-3',
        question: 'Simplify: (3^4)^2 ÷ 3^5.',
        options: ['3^3 = 27', '3^1 = 3', '3^8', '3^11'],
        correctIdx: 0,
        ruleOrFormula: '(3^4)^2 = 3^8; \\quad 3^8 \\div 3^5 = 3^{8-5} = 3^3 = 27',
        explanation: 'Power of a power multiplies: 4 × 2 = 8. Quotient rule subtracts: 8 - 5 = 3. 3^3 = 27.',
        commonMistake: 'Adding exponents in power of power (giving 3^6).'
      }
    ],
    interactiveToolId: 'tool-c8-powers',
    relatedActivityLabel: 'Exponent Laws & Scientific Micro-Scale Explorer'
  },
  {
    id: 'c8-03',
    number: 'Chapter 03',
    title: 'A Story of Numbers',
    classLevel: 8,
    unit: 'Part A — Foundations & Structures',
    description: 'Explore the historical evolution of numbers from natural counting to rational numbers, dense placement on the number line, closure properties, and representations.',
    learningObjectives: [
      'Trace the inclusion hierarchy: ℕ ⊂ 𝕎 ⊂ ℤ ⊂ ℚ',
      'Verify closure, commutative, associative, and distributive properties in rational numbers ℚ',
      'Find rational numbers between any two given rational numbers (density property)',
      'Represent positive and negative rational numbers on the continuous number line'
    ],
    formula: '\\mathbb{N} \\subset \\mathbb{W} \\subset \\mathbb{Z} \\subset \\mathbb{Q}, \\quad x = \\frac{a+b}{2} \\in (a, b)',
    simpleExplanation: 'First, humans needed counting numbers (1, 2, 3). Then came zero (whole numbers), then debts and temperatures below zero (integers), and finally parts of wholes (rational numbers like -3/4 or 5/2). Between any two fractions, there is ALWAYS another fraction!',
    detailedExplanation: 'Rational numbers ℚ are numbers expressible as p/q where p, q ∈ ℤ and q ≠ 0. The rationals form an ordered Archimedean field. Density property: between any two distinct rational numbers a < b, the arithmetic mean (a + b)/2 is a rational number strictly between them: a < (a + b)/2 < b. By repeating this process, infinitely many rational numbers can be inserted between any two numbers.',
    advancedReasoning: 'While ℚ is dense on the number line, it has "holes" (gaps) where irrational numbers like √2, e, and π sit. The set of rational numbers is countably infinite (cardinality ℵ₀), proved by Cantor\'s diagonal argument pairing ℚ with ℕ.',
    workedExamples: [
      {
        title: 'Finding three rational numbers between 1/3 and 1/2',
        description: 'Insert 3 rational numbers between 1/3 and 1/2.',
        steps: [
          'Step 1: Write with a larger common denominator: LCM(3, 2) = 6.',
          'Step 2: 1/3 = 2/6 and 1/2 = 3/6. There is no integer between 2 and 3.',
          'Step 3: Multiply numerator and denominator by (3 + 1) = 4: 1/3 = 8/24, 1/2 = 12/24.',
          'Step 4: Select integers between 8 and 12: 9, 10, 11.',
          'Step 5: Three rational numbers are 9/24, 10/24, 11/24 (simplifying to 3/8, 5/12, 11/24).'
        ],
        result: '3/8, 5/12, and 11/24.'
      },
      {
        title: 'Verifying the associative property of rational addition',
        description: 'Verify [a + b] + c = a + [b + c] for a = -2/3, b = 1/4, c = -5/6.',
        steps: [
          'Step 1: LHS = [(-2/3) + 1/4] + (-5/6) = [(-8 + 3)/12] - 5/6 = -5/12 - 10/12 = -15/12 = -5/4.',
          'Step 2: RHS = (-2/3) + [1/4 + (-5/6)] = -2/3 + [(3 - 10)/12] = -2/3 - 7/12 = -8/12 - 7/12 = -15/12 = -5/4.',
          'Step 3: LHS = RHS = -5/4. Associative property verified.'
        ],
        result: 'LHS = RHS = -5/4.'
      }
    ],
    guidedPractice: {
      question: 'Find the multiplicative inverse of -13/19.',
      hint: 'The product of a number and its multiplicative inverse must equal 1.',
      solution: 'The multiplicative inverse is -19/13, because (-13/19) × (-19/13) = +1.'
    },
    independentQuestions: [
      'Write five rational numbers greater than -2.',
      'Show that subtraction of rational numbers is not commutative by testing 2/3 - 1/4 vs 1/4 - 2/3.',
      'Represent -5/8 on the number line.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-03-1',
        question: 'Which property is NOT satisfied by rational numbers under division?',
        options: ['Closure property', 'Commutative property', 'Associative property', 'All of these'],
        correctIdx: 3,
        ruleOrFormula: '\\text{Division by zero fails closure; division fails commutativity and associativity}',
        explanation: 'Division by zero is undefined (failing closure). Furthermore, a ÷ b ≠ b ÷ a (fails commutativity) and (a ÷ b) ÷ c ≠ a ÷ (b ÷ c) (fails associativity). Hence none of these hold.',
        commonMistake: 'Thinking closure holds without remembering that 0 has no multiplicative inverse.'
      },
      {
        id: 'q-c8-03-2',
        question: 'What is the additive identity of the set of rational numbers?',
        options: ['0', '1', '-1', 'Undefined'],
        correctIdx: 0,
        ruleOrFormula: 'a + 0 = a \\quad \\forall a \\in \\mathbb{Q}',
        explanation: 'Adding 0 to any rational number leaves it unchanged: 0 is the additive identity.',
        commonMistake: 'Confusing additive identity (0) with multiplicative identity (1).'
      },
      {
        id: 'q-c8-03-3',
        question: 'How many rational numbers exist between any two distinct rational numbers?',
        options: ['Infinitely many', 'Exactly one', 'A finite count', 'Depends on the denominators'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Density of } \\mathbb{Q}',
        explanation: 'Due to the density property of rational numbers, there are infinitely many rational numbers between any two distinct rational numbers.',
        commonMistake: 'Assuming only a finite number exist because of common denominators.'
      }
    ],
    interactiveToolId: 'tool-c9-real-numbers',
    relatedActivityLabel: 'Rational Number Density & Line Explorer'
  },
  {
    id: 'c8-04',
    number: 'Chapter 04',
    title: 'Quadrilaterals',
    classLevel: 8,
    unit: 'Part A — Foundations & Structures',
    description: 'Classify polygons, understand convex/concave quadrilaterals, interior angle sum (360°), exterior angle sum (360°), and properties of parallelograms, rhombi, rectangles, squares, and kites.',
    learningObjectives: [
      'Prove that the interior angle sum of any convex quadrilateral is 360°',
      'Verify that the sum of exterior angles of any convex polygon is always 360°',
      'Distinguish properties of special parallelograms (rhombus diagonals are perpendicular, rectangle diagonals are equal)',
      'Solve geometric proof problems using quadrilateral diagonal and angle properties'
    ],
    formula: '\\sum \\angle_{\\text{int}} = (n - 2) \\times 180^\\circ, \\quad \\sum \\angle_{\\text{ext}} = 360^\\circ, \\quad \\text{Rhombus: } d_1 \\perp d_2',
    simpleExplanation: 'Any 4-sided shape is a quadrilateral. If you cut it along one diagonal, you get two triangles. Since each triangle has 180°, the quadrilateral has 180° + 180° = 360°! In a parallelogram, opposite sides are parallel and equal, and opposite angles match.',
    detailedExplanation: 'Polygons are closed curves made of line segments. In a convex polygon, all diagonals lie entirely in the interior. Angle sum for an n-gon: S_int = (n - 2) × 180°. For a quadrilateral (n = 4), S_int = 360°. The sum of exterior angles of any convex polygon is always 360°. Parallelogram properties: opposite sides are equal, opposite angles are equal, adjacent angles are supplementary, and diagonals bisect each other. A rhombus has all 4 sides equal and diagonals bisect at right angles (90°). A rectangle has equal diagonals and 90° angles.',
    advancedReasoning: 'Varignon\'s Theorem: Connecting the midpoints of the sides of any arbitrary quadrilateral in order always forms a parallelogram, whose area is exactly half the area of the original quadrilateral. This is proved by drawing a diagonal of the quadrilateral and applying the Midpoint Theorem to the two resulting triangles.',
    workedExamples: [
      {
        title: 'Finding angles of a parallelogram with adjacent angle ratio',
        description: 'Two adjacent angles of a parallelogram are in the ratio 4 : 5. Find the measure of all four angles.',
        steps: [
          'Step 1: Let the two adjacent angles be 4x and 5x.',
          'Step 2: Adjacent angles of a parallelogram are supplementary: 4x + 5x = 180°.',
          'Step 3: 9x = 180° => x = 20°.',
          'Step 4: Angle 1 = 4(20°) = 80°; Angle 2 = 5(20°) = 100°.',
          'Step 5: Opposite angles are equal in a parallelogram: Angle 3 = 80°, Angle 4 = 100°.'
        ],
        result: 'The four angles are 80°, 100°, 80°, and 100°.'
      },
      {
        title: 'Calculating side length of a rhombus from diagonal lengths',
        description: 'The diagonals of a rhombus measure 16 cm and 12 cm. Find the length of its side.',
        steps: [
          'Step 1: Diagonals of a rhombus bisect each other at right angles (90°).',
          'Step 2: Half-lengths of diagonals form legs of a right triangle: a = 16 / 2 = 8 cm, b = 12 / 2 = 6 cm.',
          'Step 3: The side s of the rhombus is the hypotenuse: s² = a² + b².',
          'Step 4: s² = 8² + 6² = 64 + 36 = 100.',
          'Step 5: s = √100 = 10 cm.'
        ],
        result: 'Each side of the rhombus is 10 cm.'
      }
    ],
    guidedPractice: {
      question: 'Three angles of a quadrilateral are 75°, 90°, and 115°. Find the fourth angle.',
      hint: 'The sum of all four interior angles in any quadrilateral is 360°.',
      solution: 'Fourth angle = 360° - (75° + 90° + 115°) = 360° - 280° = 80°.'
    },
    independentQuestions: [
      'How many sides does a regular polygon have if each exterior angle is 24°?',
      'Prove that the diagonals of a rectangle are equal in length.',
      'A kite has two pairs of equal adjacent sides. Explain why its diagonals are perpendicular.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-04-1',
        question: 'What is the sum of the exterior angles of any convex polygon?',
        options: ['360°', '180°', '(n - 2) × 180°', '720°'],
        correctIdx: 0,
        ruleOrFormula: '\\sum \\theta_{\\text{ext}} = 360^\\circ \\; (\\text{constant for all } n)',
        explanation: 'Regardless of whether a convex polygon has 3, 4, 10, or 100 sides, its exterior angles always sum to exactly 360° (one full turn).',
        commonMistake: 'Using (n - 2) × 180° (which is the formula for interior angles).'
      },
      {
        id: 'q-c8-04-2',
        question: 'In which of the following quadrilaterals do diagonals bisect each other at 90°?',
        options: ['Rhombus', 'Rectangle', 'General Parallelogram', 'Trapezium'],
        correctIdx: 0,
        ruleOrFormula: 'd_1 \\perp d_2 \\iff \\text{Rhombus or Square}',
        explanation: 'A rhombus (and a square, which is a regular rhombus) has perpendicular bisecting diagonals.',
        commonMistake: 'Choosing rectangle (rectangle diagonals bisect each other and are equal, but not at 90° unless it is a square).'
      },
      {
        id: 'q-c8-04-3',
        question: 'If each exterior angle of a regular polygon is 45°, how many sides does the polygon have?',
        options: ['8', '6', '10', '12'],
        correctIdx: 0,
        ruleOrFormula: 'n = \\frac{360^\\circ}{\\theta_{\\text{ext}}} = \\frac{360^\\circ}{45^\\circ} = 8',
        explanation: '360° ÷ 45° = 8 sides (a regular octagon).',
        commonMistake: 'Dividing 180 by 45 to get 4.'
      }
    ],
    interactiveToolId: 'tool-c8-quadrilaterals',
    relatedActivityLabel: 'Quadrilateral Builder & Diagonal Inspector'
  },
  {
    id: 'c8-05',
    number: 'Chapter 05',
    title: 'Number Play',
    classLevel: 8,
    unit: 'Part A — Foundations & Structures',
    description: 'Explore algebraic representations of two- and three-digit numbers, advanced divisibility proofs, games with digits, and cryptarithmetic alphametics.',
    learningObjectives: [
      'Express generalized numbers in positional algebraic notation: 10a + b and 100a + 10b + c',
      'Construct formal algebraic proofs for divisibility tests of 3, 9, and 11',
      'Solve alphametic addition and multiplication cryptarithms systematically',
      'Analyze digital roots and casting out nines for arithmetic verification'
    ],
    formula: 'N = 100a + 10b + c = 99a + 9b + (a + b + c) = 9(11a + b) + (a + b + c)',
    simpleExplanation: 'When you write the number 384, it really means 3 × 100 + 8 × 10 + 4 × 1. Notice that 100 is 99 + 1, and 10 is 9 + 1! By pulling out the 9s, you can prove why adding the digits tells you whether the whole number divides by 9 or 3!',
    detailedExplanation: 'Writing N = 100a + 10b + c = (99a + 9b) + (a + b + c). Since 99a + 9b = 9(11a + b) is always divisible by 9 (and 3), N is divisible by 9 if and only if the sum of its digits (a + b + c) is divisible by 9. In cryptarithms, each letter stands for a unique digit from 0 to 9, no leading digit can be 0, and carry values in column additions cannot exceed the number of addends minus 1.',
    advancedReasoning: 'Modular arithmetic formalization: For base b, b ≡ 1 (mod b - 1). Therefore, any polynomial in base 10 satisfies Σ d_k 10^k ≡ Σ d_k (1)^k = Σ d_k (mod 9). Similarly, since 10 ≡ -1 (mod 11), 10^k ≡ (-1)^k (mod 11), directly establishing the alternating sum divisibility rule for 11.',
    workedExamples: [
      {
        title: 'Proving divisibility by 3 using algebraic place value',
        description: 'Prove that any two-digit number 10a + b is divisible by 3 if and only if (a + b) is divisible by 3.',
        steps: [
          'Step 1: Write the number in expanded form: N = 10a + b.',
          'Step 2: Rewrite 10a as 9a + a: N = 9a + a + b = 9a + (a + b).',
          'Step 3: Notice that 9a = 3(3a), which is always divisible by 3 for any integer a.',
          'Step 4: Therefore, N is a multiple of 3 if and only if the remaining term (a + b) is a multiple of 3.'
        ],
        result: 'Proven: N is divisible by 3 iff (a + b) is divisible by 3.'
      },
      {
        title: 'Solving a classic alphametic cryptarithm',
        description: 'Find digits A and B such that: 4A + 98 = 1CB, where each letter is a unique digit.',
        steps: [
          'Step 1: Write column addition: 40 + A + 98 = 100 + 10C + B.',
          'Step 2: 138 + A = 100 + 10C + B.',
          'Step 3: Since 138 + A has 1 in the hundreds place, 138 + A is between 138 (if A=0) and 147 (if A=9).',
          'Step 4: Therefore C must be 3 or 4. If A = 5: 138 + 5 = 143 => C = 4, B = 3. Check: 45 + 98 = 143. All digits (4, 5, 9, 8, 1, 4, 3) are valid.'
        ],
        result: 'A = 5, B = 3, C = 4 (45 + 98 = 143).'
      }
    ],
    guidedPractice: {
      question: 'If the 4-digit number 24x8 is divisible by 9, find the digit x.',
      hint: 'The sum of all digits 2 + 4 + x + 8 must be a multiple of 9.',
      solution: '2 + 4 + x + 8 = 14 + x. The next multiple of 9 after 14 is 18. So 14 + x = 18 => x = 4.'
    },
    independentQuestions: [
      'If 31z5 is a multiple of 9, where z is a digit, what might be the values of z?',
      'Solve the cryptarithm: BA × B3 = 57A.',
      'Show that the difference between any three-digit number and the sum of its digits is always divisible by 9.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-05-1',
        question: 'If the number 51y3 is a multiple of 9, what is the value of digit y?',
        options: ['0', '9', 'either 0 or 9', '4'],
        correctIdx: 2,
        ruleOrFormula: '5 + 1 + y + 3 = 9 + y \\implies y = 0 \\text{ or } 9',
        explanation: 'The sum of digits is 9 + y. For 9 + y to be a multiple of 9 where y is a single digit (0-9), y can be 0 (sum=9) or 9 (sum=18). Both 5103 and 5193 are multiples of 9.',
        commonMistake: 'Forgetting that 0 is a valid non-leading digit.'
      },
      {
        id: 'q-c8-05-2',
        question: 'In the alphametic addition 3A + 25 = B2, what are digits A and B?',
        options: ['A = 7, B = 6', 'A = 8, B = 6', 'A = 7, B = 5', 'A = 2, B = 5'],
        correctIdx: 0,
        ruleOrFormula: 'A + 5 \\text{ ends in 2} \\implies A = 7 \\; (\\text{carry } 1); \\quad 3 + 2 + 1 = 6 = B',
        explanation: 'In the units column, A + 5 ends in 2, so A = 7 (7 + 5 = 12, write 2 carry 1). Tens column: 3 + 2 + 1 = 6 = B. Check: 37 + 25 = 62.',
        commonMistake: 'Forgetting the carry of 1 to the tens place.'
      },
      {
        id: 'q-c8-05-3',
        question: 'Why is any number of the form 100a + 10b + c minus (a + b + c) always divisible by 9?',
        options: ['Because 100a - a = 99a and 10b - b = 9b, both multiples of 9', 'Because all three-digit numbers are divisible by 9', 'Because c cancels out', 'Only if a = b = c'],
        correctIdx: 0,
        ruleOrFormula: '99a + 9b = 9(11a + b)',
        explanation: '(100a + 10b + c) - (a + b + c) = 99a + 9b = 9(11a + b), which is guaranteed to be a multiple of 9 for all integers a and b.',
        commonMistake: 'Thinking it only works for special symmetric numbers.'
      }
    ],
    interactiveToolId: 'tool-c7-common-ground',
    relatedActivityLabel: 'Alphametic Cryptarithm & Digit Logic Solver'
  },
  {
    id: 'c8-06',
    number: 'Chapter 06',
    title: 'We Distribute, Yet Things Multiply',
    classLevel: 8,
    unit: 'Part A — Foundations & Structures',
    description: 'Master polynomial multiplication: monomial by monomial, monomial by polynomial, binomial by binomial, FOIL method, and geometric visual area proofs of distributivity.',
    learningObjectives: [
      'Multiply monomials using index laws: (ax^m)(bx^n) = (ab)x^(m+n)',
      'Apply the distributive property across polynomials: a(b + c + d) = ab + ac + ad',
      'Multiply binomial by binomial using FOIL: (a + b)(c + d) = ac + ad + bc + bd',
      'Interpret polynomial multiplication geometrically as the area of partitioned rectangles'
    ],
    formula: '(a + b)(c + d) = ac + ad + bc + bd, \\quad (x + a)(x + b) = x^2 + (a + b)x + ab',
    simpleExplanation: 'Imagine a garden measuring (a + b) by (c + d). If you split it into 4 smaller plots, their areas are ac, ad, bc, and bd. The total area of the whole garden is simply the sum of all 4 small plots! Distributing is multiplying every term in the first bracket by every term in the second.',
    detailedExplanation: 'Multiplication distributes over addition. When multiplying binomials (a + b)(c + d), each term of the first polynomial multiplies every term of the second: a(c + d) + b(c + d) = ac + ad + bc + bd. For the special product (x + a)(x + b), expanding yields x² + bx + ax + ab = x² + (a + b)x + ab, where the coefficient of x is the sum of constants and the constant term is their product.',
    advancedReasoning: 'Geometric algebra: In Euclid\'s Elements Book II, algebraic identities were conceptualized as propositions regarding geometric rectangles. A partitioned rectangle of dimensions (x + a) and (x + b) proves that the algebraic ring ℝ[x] is geometrically isomorphic to planar area partitions.',
    workedExamples: [
      {
        title: 'Multiplying two binomials with negative terms',
        description: 'Expand and simplify: (2x - 3)(3x + 5).',
        steps: [
          'Step 1: Distribute first term 2x: 2x(3x + 5) = 6x² + 10x.',
          'Step 2: Distribute second term -3: -3(3x + 5) = -9x - 15.',
          'Step 3: Combine all terms: 6x² + 10x - 9x - 15.',
          'Step 4: Combine like terms (10x - 9x = x): 6x² + x - 15.'
        ],
        result: '6x² + x - 15.'
      },
      {
        title: 'Multiplying a binomial by a trinomial',
        description: 'Expand: (x + 2)(x² - 3x + 4).',
        steps: [
          'Step 1: Distribute x: x(x² - 3x + 4) = x³ - 3x² + 4x.',
          'Step 2: Distribute 2: 2(x² - 3x + 4) = 2x² - 6x + 8.',
          'Step 3: Group like terms: x³ + (-3x² + 2x²) + (4x - 6x) + 8.',
          'Step 4: Simplify: x³ - x² - 2x + 8.'
        ],
        result: 'x³ - x² - 2x + 8.'
      }
    ],
    guidedPractice: {
      question: 'Use the identity (x + a)(x + b) = x² + (a + b)x + ab to evaluate 103 × 104.',
      hint: 'Rewrite as (100 + 3)(100 + 4) with x = 100, a = 3, b = 4.',
      solution: '100² + (3 + 4)100 + (3 × 4) = 10,000 + 700 + 12 = 10,712.'
    },
    independentQuestions: [
      'Multiply: (3a²b)( -2ab³)(5a).',
      'Expand: (2a + 3b)(4a - 5b).',
      'Simplify: (x + y)(2x + y) + (x + 2y)(x - y).'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-06-1',
        question: 'What is the product of (x + 5)(x - 3)?',
        options: ['x² + 2x - 15', 'x² - 2x - 15', 'x² + 8x - 15', 'x² - 15'],
        correctIdx: 0,
        ruleOrFormula: '(x + a)(x + b) = x^2 + (a + b)x + ab',
        explanation: 'x² + (5 + (-3))x + (5 × (-3)) = x² + 2x - 15.',
        commonMistake: 'Multiplying only the first and last terms (x² - 15) and omitting the middle cross terms.'
      },
      {
        id: 'q-c8-06-2',
        question: 'What is the product of monomials (-4xy) and (3x²y)?',
        options: ['-12x³y²', '12x³y²', '-12x²y', '-7x³y²'],
        correctIdx: 0,
        ruleOrFormula: '(-4 \\times 3) \\cdot (x \\cdot x^2) \\cdot (y \\cdot y) = -12x^3y^2',
        explanation: 'Multiply coefficients: -4 × 3 = -12. Add powers of x: 1 + 2 = 3. Add powers of y: 1 + 1 = 2. Result is -12x³y².',
        commonMistake: 'Adding coefficients (-4 + 3 = -1) or multiplying exponents.'
      },
      {
        id: 'q-c8-06-3',
        question: 'In the geometric area model of (a + b)(c + d), how many non-overlapping sub-rectangles are formed?',
        options: ['4', '2', '3', '6'],
        correctIdx: 0,
        ruleOrFormula: '2 \\text{ rows} \\times 2 \\text{ columns} = 4 \\text{ cells}',
        explanation: 'Partitioning length (a + b) and width (c + d) splits the rectangle into 4 smaller sub-rectangles with areas ac, ad, bc, and bd.',
        commonMistake: 'Thinking only 2 pieces exist because there are two brackets.'
      }
    ],
    interactiveToolId: 'tool-c8-distributive',
    relatedActivityLabel: 'Geometric Polynomial Multiplication Lab'
  },
  {
    id: 'c8-07',
    number: 'Chapter 07',
    title: 'Proportional Reasoning-1',
    classLevel: 8,
    unit: 'Part A — Foundations & Structures',
    description: 'Master ratios, proportions, direct variation, unit rates, unitary method, map scale models, and proportional thinking in speed, distance, and time.',
    learningObjectives: [
      'Distinguish between ratio (comparison of two quantities) and proportion (equality of two ratios)',
      'Identify direct variation: y/x = k (as x increases, y increases proportionally)',
      'Apply the unitary method: compute unit rate first, then scale to desired quantity',
      'Solve scale drawings and map distance scaling problems using proportional ratios'
    ],
    formula: '\\frac{a}{b} = \\frac{c}{d} \\iff ad = bc, \\quad y = kx \\iff \\frac{y_1}{x_1} = \\frac{y_2}{x_2}',
    simpleExplanation: 'If 3 notebooks cost $12, then 1 notebook costs $12 ÷ 3 = $4 (the unit rate). So 7 notebooks will cost 7 × $4 = $28! In direct proportion, when one quantity doubles, the other quantity doubles too.',
    detailedExplanation: 'Two quantities x and y are in direct proportion if their quotient remains constant: y/x = k (constant of proportionality). Thus y₁/x₁ = y₂/x₂. Cross-multiplication solves any proportion with one missing variable: if a/b = c/d, then ad = bc. In speed problems with constant speed v, distance d is directly proportional to time t: d = v · t.',
    advancedReasoning: 'Linear vector spaces: Direct variation y = kx represents a 1-dimensional linear subspace passing through the origin (0, 0). The constant k is the slope (gradient). If an affine shift exists (y = kx + c with c ≠ 0), the relationship is linear but NOT directly proportional because doubling x does not double y.',
    workedExamples: [
      {
        title: 'Direct proportion in distance-fuel consumption',
        description: 'A car consumes 4 liters of petrol to travel 60 km. How much petrol will it need to travel 375 km at the same consumption rate?',
        steps: [
          'Step 1: Set up direct proportion: Petrol (y) is directly proportional to distance (x): y₁/x₁ = y₂/x₂.',
          'Step 2: Substitute given values: 4 / 60 = y₂ / 375.',
          'Step 3: Simplify rate: 4/60 = 1/15 liter per km.',
          'Step 4: Solve for y₂: y₂ = 375 × (1/15) = 25 liters.'
        ],
        result: '25 liters of petrol are needed.'
      },
      {
        title: 'Map scale proportional calculation',
        description: 'On a geographical map, a scale of 1 cm represents 250 km on the ground. If two cities are 4.8 cm apart on the map, find their actual distance.',
        steps: [
          'Step 1: Scale ratio is 1 cm : 250 km.',
          'Step 2: Actual distance = Map measurement × Scale factor.',
          'Step 3: Actual distance = 4.8 cm × 250 km/cm.',
          'Step 4: 4.8 × 250 = (4.8 × 1000) / 4 = 4800 / 4 = 1,200 km.'
        ],
        result: 'The actual distance is 1,200 km.'
      }
    ],
    guidedPractice: {
      question: 'If 15 men can build a wall in 48 hours, is the relationship between number of workers and hours to complete the job direct or inverse?',
      hint: 'More workers means fewer hours needed: as workers increase, time decreases.',
      solution: 'This is inverse variation, because the product (workers × hours) remains constant: 15 × 48 = 720 worker-hours.'
    },
    independentQuestions: [
      'If the cost of 7 meters of cloth is $294, find the cost of 5 meters of cloth.',
      'A pole 14 m high casts a shadow of 10 m. At the same time, what is the height of a tree casting a 15 m shadow?',
      'Check if x and y are in direct proportion: x: [2, 4, 6], y: [6, 12, 18]. Find k.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-07-1',
        question: 'Which equation describes direct variation between two variables x and y?',
        options: ['y = kx', 'xy = k', 'y = k/x', 'y = x + k'],
        correctIdx: 0,
        ruleOrFormula: 'y = kx \\iff \\frac{y}{x} = k',
        explanation: 'In direct variation, the ratio y/x is a constant k, which can be written as y = kx.',
        commonMistake: 'Confusing direct variation (y = kx) with inverse variation (xy = k).'
      },
      {
        id: 'q-c8-07-2',
        question: 'If a/12 = 5/4, what is the value of a?',
        options: ['15', '16', '12', '20'],
        correctIdx: 0,
        ruleOrFormula: '4a = 12 \\times 5 = 60 \\implies a = 60/4 = 15',
        explanation: 'Cross multiply: 4a = 12 × 5 = 60. Then a = 60 / 4 = 15.',
        commonMistake: 'Subtracting: 12 - 5 = 7.'
      },
      {
        id: 'q-c8-07-3',
        question: 'If 8 identical pens cost $24, how much do 14 pens cost?',
        options: ['$42', '$36', '$48', '$56'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Unit cost} = 24/8 = \\$3; \\quad 14 \\times 3 = \\$42',
        explanation: 'Unit cost per pen = 24 ÷ 8 = $3. For 14 pens: 14 × $3 = $42.',
        commonMistake: 'Calculating 14 × 2 = $28.'
      }
    ],
    interactiveToolId: 'tool-c8-proportions',
    relatedActivityLabel: 'Direct Proportional Reasoning & Unit Rate Lab'
  },

  // ================= PART B =================
  {
    id: 'c8-08',
    number: 'Chapter 08',
    title: 'Fractions in Disguise',
    classLevel: 8,
    unit: 'Part B — Analysis & Mensuration',
    description: 'Explore percentages as fractions in disguise (per-hundred parts), percentage change, profit & loss, discount, sales tax/GST, and simple vs compound interest concepts.',
    learningObjectives: [
      'Convert interchangeably between fractions, decimals, and percentages (p% = p/100)',
      'Calculate percentage increase and decrease: % change = (Change / Original) × 100',
      'Solve profit, loss, discount, and marked price commercial transactions',
      'Compute Compound Interest annually using the formula A = P(1 + r/100)^t'
    ],
    formula: 'A = P\\left(1 + \\frac{r}{100}\\right)^t, \\quad \\text{CI} = A - P, \\quad \\% \\Delta = \\frac{|x_2 - x_1|}{x_1} \\times 100',
    simpleExplanation: 'Percent literally means "per hundred". 25% is just the fraction 25/100 = 1/4 in disguise! In compound interest, your interest earns interest of its own, so your money grows like a snowball rolling downhill.',
    detailedExplanation: 'Commercial arithmetic translates rates to per-hundred benchmarks. Profit% = (Profit / CP) × 100; Discount% = (Discount / Marked Price) × 100. In Simple Interest (SI = Prt/100), interest is paid strictly on the principal P. In Compound Interest (CI), interest earned at the end of each period is added to the principal for the next period, producing geometric exponential growth: A = P(1 + r/100)^t.',
    advancedReasoning: 'Continuous compounding limit: As compounding frequency n -> ∞, the amount approaches A = P · e^(rt), where e = lim (1 + 1/n)^n ≈ 2.71828. This bridges discrete percentage compounding with the natural exponential base of calculus.',
    workedExamples: [
      {
        title: 'Calculating profit percentage on goods',
        description: 'A shopkeeper buys an article for $400 and spends $50 on repairs. He then sells it for $540. Find his profit percentage.',
        steps: [
          'Step 1: Total Cost Price (CP) = Purchase price + Overhead expenses = 400 + 50 = $450.',
          'Step 2: Selling Price (SP) = $540.',
          'Step 3: Profit = SP - CP = 540 - 450 = $90.',
          'Step 4: Profit% = (Profit / CP) × 100 = (90 / 450) × 100 = (1/5) × 100 = 20%.'
        ],
        result: 'Profit percentage is 20%.'
      },
      {
        title: 'Compound interest versus simple interest over 2 years',
        description: 'Find the compound interest on $10,000 for 2 years at 10% per annum compounded annually.',
        steps: [
          'Step 1: Use formula A = P(1 + r/100)^t with P = 10000, r = 10, t = 2.',
          'Step 2: A = 10000 × (1 + 10/100)^2 = 10000 × (1.1)^2 = 10000 × 1.21 = $12,100.',
          'Step 3: Compound Interest CI = Amount - Principal = 12100 - 10000 = $2,100.',
          'Step 4: (Comparison: Simple Interest SI = 10000 × 10 × 2 / 100 = $2,000. CI earned $100 more).'
        ],
        result: 'Compound Interest = $2,100.'
      }
    ],
    guidedPractice: {
      question: 'An item marked at $80 is sold for $68. What is the discount percentage?',
      hint: 'Discount = Marked Price - Selling Price = 80 - 68 = $12. Discount% = (Discount / MP) × 100.',
      solution: 'Discount% = (12 / 80) × 100 = (3/20) × 100 = 15%.'
    },
    independentQuestions: [
      'A population of a town increased from 20,000 to 22,500. Find the percentage increase.',
      'Find the amount and compound interest on $8,000 for 1 year at 9% compounded half-yearly.',
      'Show that 15% of 80 is the same as 80% of 15.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-08-1',
        question: 'What is 3/5 expressed as a percentage?',
        options: ['60%', '35%', '75%', '30%'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{3}{5} \\times 100\\% = 60\\%',
        explanation: '(3 / 5) × 100% = 3 × 20% = 60%.',
        commonMistake: 'Writing 35% by stringing together digits.'
      },
      {
        id: 'q-c8-08-2',
        question: 'Discount is always calculated on which price?',
        options: ['Marked Price (List Price)', 'Cost Price', 'Selling Price', 'Profit'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Discount} = \\text{MP} - \\text{SP}',
        explanation: 'Discount is the reduction offered on the Marked Price (label price) of an item.',
        commonMistake: 'Assuming discount is calculated on Cost Price.'
      },
      {
        id: 'q-c8-08-3',
        question: 'Why does Compound Interest exceed Simple Interest after the first year?',
        options: ['Because interest itself earns interest in subsequent periods', 'Because the interest rate increases', 'Because the principal is doubled', 'Because the time doubles'],
        correctIdx: 0,
        ruleOrFormula: 'A_{n} = A_{n-1}(1 + r)',
        explanation: 'In compound interest, accumulated interest is added to the principal at each interval, so subsequent interest is calculated on a larger base.',
        commonMistake: 'Thinking the bank changes the percentage rate.'
      }
    ],
    interactiveToolId: 'tool-c8-proportions',
    relatedActivityLabel: 'Percentage & Compound Growth Calculator'
  },
  {
    id: 'c8-09',
    number: 'Chapter 09',
    title: 'The Baudhayana-Pythagoras Theorem',
    classLevel: 8,
    unit: 'Part B — Analysis & Mensuration',
    description: 'Explore the ancient Baudhayana Sulba-Sutra diagonal relationship, geometric dissection proof of Pythagoras theorem (a² + b² = c²), Pythagorean triples, and distance applications.',
    learningObjectives: [
      'State and prove the theorem geometrically: In a right triangle, square on the hypotenuse = sum of squares on legs',
      'Generate Pythagorean triples using Brahmagupta/Euler parameterization: (2m, m² - 1, m² + 1)',
      'Apply the converse of Pythagoras theorem to determine whether a triangle is acute, right, or obtuse',
      'Solve practical real-world problems: ladder heights, diagonal distances, kite string tensions'
    ],
    formula: 'a^2 + b^2 = c^2, \\quad \\text{Triples: } (2m)^2 + (m^2 - 1)^2 = (m^2 + 1)^2',
    simpleExplanation: 'Ancient Indian mathematician Baudhayana wrote over 2,800 years ago: "The rope stretched along the diagonal of a rectangle produces an area equal to the sum of the areas produced by the two sides." In any right triangle, if you build squares on the legs, their areas fill the square on the longest side (hypotenuse) completely!',
    detailedExplanation: 'For any right-angled triangle with legs a, b and hypotenuse c, a² + b² = c². The geometric dissection proof places four identical right triangles inside a square of side (a + b): the large area is (a + b)² = a² + 2ab + b². The four triangles have area 4 × (1/2 ab) = 2ab. Subtracting the triangles leaves the tilted central square of area c², proving a² + b² = c². Pythagorean triples are integers (a, b, c) satisfying the equation (e.g. 3-4-5, 5-12-13, 8-15-17).',
    advancedReasoning: 'Fermat\'s Last Theorem: For integers n > 2, the equation aⁿ + bⁿ = cⁿ has no non-zero integer solutions. The right triangle quadratic relation n = 2 is the unique integer exponent that supports non-trivial integer triples, a deep theorem proved by Andrew Wiles using elliptic modular curves.',
    workedExamples: [
      {
        title: 'Verifying a right triangle and finding hypotenuse',
        description: 'A right triangle has legs of length 9 cm and 12 cm. Find the hypotenuse.',
        steps: [
          'Step 1: Identify legs: a = 9 cm, b = 12 cm.',
          'Step 2: Apply theorem: c² = a² + b² = 9² + 12².',
          'Step 3: Calculate squares: 9² = 81; 12² = 144.',
          'Step 4: Sum squares: c² = 81 + 144 = 225.',
          'Step 5: Take square root: c = √225 = 15 cm.'
        ],
        result: 'Hypotenuse is 15 cm.'
      },
      {
        title: 'Generating a Pythagorean triple with smallest member 14',
        description: 'Find a Pythagorean triple whose smallest member is 14.',
        steps: [
          'Step 1: Use parameterization: let 2m = 14 => m = 7.',
          'Step 2: Calculate second member: m² - 1 = 7² - 1 = 49 - 1 = 48.',
          'Step 3: Calculate third member (hypotenuse): m² + 1 = 7² + 1 = 49 + 1 = 50.',
          'Step 4: Verify: 14² + 48² = 196 + 2304 = 2500 = 50². Valid triple!'
        ],
        result: 'The Pythagorean triple is (14, 48, 50).'
      }
    ],
    guidedPractice: {
      question: 'A ladder 25 m long reaches a window 20 m above the ground. How far is the foot of the ladder from the wall?',
      hint: 'The ladder is the hypotenuse c = 25 m, wall height is leg a = 20 m. Solve for leg b.',
      solution: 'b² = c² - a² = 25² - 20² = 625 - 400 = 225. Thus b = √225 = 15 m.'
    },
    independentQuestions: [
      'Is a triangle with sides 7 cm, 24 cm, 25 cm a right triangle? Show proof.',
      'Find the length of the diagonal of a rectangle measuring 15 cm by 8 cm.',
      'Explain the visual area proof of a² + b² = c² using four congruent right triangles.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-09-1',
        question: 'Which of the following is a primitive Pythagorean triple?',
        options: ['5, 12, 13', '6, 8, 10', '4, 5, 6', '7, 10, 12'],
        correctIdx: 0,
        ruleOrFormula: '5^2 + 12^2 = 25 + 144 = 169 = 13^2',
        explanation: '5² + 12² = 25 + 144 = 169 = 13². Its members share no common factor (primitive). (6-8-10 is a multiple of 3-4-5).',
        commonMistake: 'Picking 4, 5, 6 because they are consecutive integers.'
      },
      {
        id: 'q-c8-09-2',
        question: 'In a right triangle, the longest side is always the:',
        options: ['Hypotenuse (opposite the 90° right angle)', 'Adjacent side', 'Opposite side', 'Altitude'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Side opposite largest angle (90°) is longest}',
        explanation: 'Since the right angle (90°) is the largest angle in any right triangle, the side opposite it (the hypotenuse) is strictly the longest side.',
        commonMistake: 'Thinking the base can be longer than the hypotenuse.'
      },
      {
        id: 'q-c8-09-3',
        question: 'If the legs of an isosceles right triangle are each 1 unit, what is the hypotenuse?',
        options: ['√2', '2', '1.5', '√3'],
        correctIdx: 0,
        ruleOrFormula: 'c^2 = 1^2 + 1^2 = 2 \\implies c = \\sqrt{2}',
        explanation: 'c² = 1² + 1² = 2 => c = √2 ≈ 1.414.',
        commonMistake: 'Adding 1 + 1 = 2 and forgetting to take the square root.'
      }
    ],
    interactiveToolId: 'tool-c8-pythagoras',
    relatedActivityLabel: 'Baudhayana-Pythagoras Visual Proof Studio'
  },
  {
    id: 'c8-10',
    number: 'Chapter 10',
    title: 'Proportional Reasoning-2',
    classLevel: 8,
    unit: 'Part B — Analysis & Mensuration',
    description: 'Master inverse variation (xy = k), speed-time trade-offs, worker-days productivity calculations, pipes & cisterns, and compound proportional reasoning.',
    learningObjectives: [
      'Identify inverse variation: as one quantity increases, the other decreases such that their product xy = k remains constant',
      'Distinguish between direct variation scenarios and inverse variation scenarios',
      'Solve multi-person work and time problems (Worker-Days method)',
      'Analyze hyperbolic inverse variation graphs (y = k/x)'
    ],
    formula: 'x_1 y_1 = x_2 y_2 = k, \\quad \\text{Rate of work } W = \\frac{1}{T}',
    simpleExplanation: 'If you drive faster, you get there in LESS time! When speed doubles, travel time is cut in half. If 4 people paint a fence in 6 hours, 8 people can do it in 3 hours. That is inverse proportion: their product (people × hours = 24) stays constant.',
    detailedExplanation: 'Two quantities x and y vary inversely if their product is a non-zero constant: x · y = k, or y = k/x. Therefore, x₁y₁ = x₂y₂. Real-world applications include: (1) Speed and time for a fixed journey; (2) Number of laborers and time taken to complete a fixed task; (3) Pressure and volume of a gas at constant temperature (Boyle’s Law: PV = k).',
    advancedReasoning: 'In thermodynamic systems, Boyle\'s Law P · V = nRT demonstrates physical inverse proportionality. On Cartesian axes, the graph of y = k/x is a rectangular hyperbola whose asymptotes are the coordinate axes, asymptotically approaching infinity near zero.',
    workedExamples: [
      {
        title: 'Work and time inverse variation problem',
        description: 'A team of 12 workers can build a bridge in 20 days. If the project must be finished in 15 days, how many workers are needed?',
        steps: [
          'Step 1: Identify variation: More workers -> fewer days. This is inverse variation: workers × days = k.',
          'Step 2: Calculate total worker-days constant: k = 12 × 20 = 240 worker-days.',
          'Step 3: Let required workers be w: w × 15 = 240.',
          'Step 4: Solve for w: w = 240 / 15 = 16 workers.',
          'Step 5: Additional workers needed = 16 - 12 = 4 workers.'
        ],
        result: '16 workers are needed (4 additional workers).'
      },
      {
        title: 'Speed-time inverse proportion for fixed distance',
        description: 'A car travelling at 60 km/h reaches its destination in 3 hours 30 minutes. How long will it take if the speed is increased to 70 km/h?',
        steps: [
          'Step 1: Convert time to hours: 3 hours 30 minutes = 3.5 hours.',
          'Step 2: Total fixed distance = speed × time = 60 × 3.5 = 210 km.',
          'Step 3: At new speed 70 km/h: time = distance / speed = 210 / 70 = 3 hours.'
        ],
        result: 'It will take 3 hours (saving 30 minutes).'
      }
    ],
    guidedPractice: {
      question: 'If 36 men can reap a field in 25 days, in how many days can 15 men reap it?',
      hint: 'Men and days are inversely proportional: 36 × 25 = 15 × d.',
      solution: '36 × 25 = 900. Days d = 900 / 15 = 60 days.'
    },
    independentQuestions: [
      'A school hostel has food provisions for 150 students for 45 days. If 25 students leave, how long will the food last?',
      'Check if x and y vary inversely: x: [2, 5, 10, 25], y: [50, 20, 10, 4]. Find k.',
      'Plot the graph of y = 12/x for x = 1, 2, 3, 4, 6, 12.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-10-1',
        question: 'Which of the following situations is an example of INVERSE proportion?',
        options: [
          'Number of pipes filling a tank and time taken to fill it',
          'Distance travelled and petrol consumed at constant speed',
          'Number of books purchased and total price',
          'Age of a tree and its height'
        ],
        correctIdx: 0,
        ruleOrFormula: 'x \\cdot y = k \\implies \\text{more pipes mean less time}',
        explanation: 'As the number of pipes increases, the time required to fill the reservoir decreases proportionally: their product is constant.',
        commonMistake: 'Selecting distance and petrol (which is direct proportion).'
      },
      {
        id: 'q-c8-10-2',
        question: 'If x and y vary inversely, and x = 8 when y = 15, what is y when x = 12?',
        options: ['10', '12', '18', '20'],
        correctIdx: 0,
        ruleOrFormula: 'x_1 y_1 = x_2 y_2 \\implies 8 \\times 15 = 12 \\times y_2',
        explanation: '8 × 15 = 120. Then y₂ = 120 / 12 = 10.',
        commonMistake: 'Setting up direct proportion: 8/15 = 12/y (giving 22.5).'
      },
      {
        id: 'q-c8-10-3',
        question: 'What is the shape of the graph of y = k/x (inverse variation)?',
        options: ['A rectangular hyperbola', 'A straight line through the origin', 'A parabola', 'A circle'],
        correctIdx: 0,
        ruleOrFormula: 'xy = k \\implies \\text{hyperbola}',
        explanation: 'The graph of inverse variation xy = k is a smooth curve known as a rectangular hyperbola.',
        commonMistake: 'Assuming all mathematical relationships graph as straight lines.'
      }
    ],
    interactiveToolId: 'tool-c8-proportions',
    relatedActivityLabel: 'Inverse Variation & Worker-Day Simulator'
  },
  {
    id: 'c8-11',
    number: 'Chapter 11',
    title: 'Exploring Some Geometric Themes',
    classLevel: 8,
    unit: 'Part B — Analysis & Mensuration',
    description: 'Explore geometric transformations, fractals, self-similarity, Euler\'s polyhedral formula (V - E + F = 2), 3D solid views (front, side, top), and nets.',
    learningObjectives: [
      'Verify Euler\'s formula for convex polyhedra: Vertices - Edges + Faces = 2',
      'Analyze 3D solids (prisms, pyramids, platonic solids) through nets and isometric projections',
      'Draw orthographic views: front, top, and side perspectives of compound 3D block assemblies',
      'Discover fractal self-similarity (Sierpinski triangle, Koch snowflake)'
    ],
    formula: 'V - E + F = 2 \\quad (\\text{Euler\'s Polyhedral Formula})',
    simpleExplanation: 'Every solid 3D shape with flat faces (like a cube, pyramid, or prism) obeys Euler\'s secret formula: Vertices (corners) minus Edges (lines) plus Faces (flat walls) ALWAYS equals 2! For a cube: 8 corners - 12 edges + 6 faces = 2.',
    detailedExplanation: 'Euler\'s formula V - E + F = 2 holds for all simple convex polyhedra (topological sphere homeomorphic). For a triangular prism: V = 6, E = 9, F = 5 => 6 - 9 + 5 = 2. Orthographic projection represents 3D objects in two dimensions through plan (top view), front elevation, and side elevation. Fractals exhibit self-similarity: zooming in on any small part reveals an exact copy of the whole shape.',
    advancedReasoning: 'Topological invariant: Euler\'s characteristic χ = V - E + F is a fundamental topological invariant. For a sphere and any convex polyhedron, χ = 2. For a torus (doughnut shape with one hole), χ = 0. This insight founded algebraic topology and Poincaré duality.',
    workedExamples: [
      {
        title: 'Verifying Euler\'s formula for a square pyramid',
        description: 'Verify V - E + F = 2 for a square pyramid (like the Great Pyramid of Giza).',
        steps: [
          'Step 1: Count Vertices (corners): 4 on square base + 1 apex at top = 5 vertices (V = 5).',
          'Step 2: Count Edges: 4 base edges + 4 sloped edges meeting at apex = 8 edges (E = 8).',
          'Step 3: Count Faces: 1 square base + 4 triangular sides = 5 faces (F = 5).',
          'Step 4: Substitute into Euler’s formula: V - E + F = 5 - 8 + 5 = 2. Verified!'
        ],
        result: '5 - 8 + 5 = 2. Euler’s formula holds.'
      },
      {
        title: 'Finding number of edges of a polyhedron',
        description: 'A polyhedron has 20 faces and 12 vertices. How many edges does it have?',
        steps: [
          'Step 1: Write Euler\'s formula: V - E + F = 2.',
          'Step 2: Substitute given values: 12 - E + 20 = 2.',
          'Step 3: Combine numbers: 32 - E = 2.',
          'Step 4: Solve for E: E = 32 - 2 = 30 edges. (This is a regular icosahedron!).'
        ],
        result: 'The polyhedron has 30 edges.'
      }
    ],
    guidedPractice: {
      question: 'Can a polyhedron have 10 faces, 20 edges, and 15 vertices?',
      hint: 'Check if V - E + F equals 2.',
      solution: 'V - E + F = 15 - 20 + 10 = 5 ≠ 2. No, such a polyhedron cannot exist.'
    },
    independentQuestions: [
      'Draw the net of a cylinder and a triangular prism.',
      'Draw the top, front, and side view of an assembly of 4 unit cubes in an L-shape.',
      'Calculate the number of faces of a polyhedron having 6 vertices and 12 edges.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-11-1',
        question: 'What is Euler\'s formula for convex polyhedra?',
        options: ['V - E + F = 2', 'V + E - F = 2', 'V + E + F = 2', 'V - F + E = 2'],
        correctIdx: 0,
        ruleOrFormula: 'V - E + F = 2',
        explanation: 'Euler\'s formula states that the number of Vertices (V) minus Edges (E) plus Faces (F) is always equal to 2.',
        commonMistake: 'Mixing up the plus and minus signs.'
      },
      {
        id: 'q-c8-11-2',
        question: 'How many faces, vertices, and edges does a standard cube have?',
        options: ['6 faces, 8 vertices, 12 edges', '8 faces, 6 vertices, 12 edges', '6 faces, 12 vertices, 8 edges', '6 faces, 8 vertices, 10 edges'],
        correctIdx: 0,
        ruleOrFormula: 'V = 8, \\; E = 12, \\; F = 6 \\implies 8 - 12 + 6 = 2',
        explanation: 'A cube has 6 square faces, 8 vertex corners, and 12 straight edges.',
        commonMistake: 'Swapping vertices and faces.'
      },
      {
        id: 'q-c8-11-3',
        question: 'Which 2D view shows what a 3D building looks like directly from directly above?',
        options: ['Top view (Plan)', 'Front view (Elevation)', 'Side view', 'Isometric view'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Top view} = \\text{Plan view looking from above}',
        explanation: 'The top view (also called the plan view) displays the outline looking straight down from above.',
        commonMistake: 'Selecting front elevation.'
      }
    ],
    interactiveToolId: 'tool-c8-fractals',
    relatedActivityLabel: '3D Solid Explorer & Euler Polyhedral Lab'
  },
  {
    id: 'c8-12',
    number: 'Chapter 12',
    title: 'Tales by Dots and Lines',
    classLevel: 8,
    unit: 'Part B — Analysis & Mensuration',
    description: 'Explore coordinate axes, Cartesian plane, plotting points (x, y), linear graphs, interpreting slopes, and relationships between independent and dependent variables.',
    learningObjectives: [
      'Locate and plot coordinates (x, y) across all four quadrants',
      'Distinguish abscissa (x-coordinate) and ordinate (y-coordinate)',
      'Construct linear graphs from tables of values (time-distance, cost-quantity)',
      'Interpret slope (rate of change) and intercept from line graphs'
    ],
    formula: '(x, y): \\quad x = \\text{abscissa}, \\; y = \\text{ordinate}; \\quad m = \\frac{y_2 - y_1}{x_2 - x_1}',
    simpleExplanation: 'A coordinate grid is like a map where you give directions: "Walk 3 blocks East (x), then 4 blocks North (y)" gives point (3, 4). When you plot points from real life and connect them, a straight line tells you things are changing at a steady rate!',
    detailedExplanation: 'The Cartesian coordinate system consists of two perpendicular number lines: horizontal x-axis and vertical y-axis intersecting at the origin (0, 0). The axes divide the plane into four quadrants (I: +,+; II: -,+; III: -,-; IV: +,-). Any point on the x-axis has ordinate y = 0; any point on the y-axis has abscissa x = 0. The slope m = (y₂ - y₁) / (x₂ - x₁) represents the unit rate of change.',
    advancedReasoning: 'René Descartes synthesized algebra and geometry through coordinates (analytic geometry). Curves are formalized as loci of points satisfying f(x, y) = 0. A straight line is the geometric locus of any first-degree algebraic relation Ax + By + C = 0.',
    workedExamples: [
      {
        title: 'Plotting a linear graph from a deposit-interest table',
        description: 'A bank offers simple interest at 8% per annum. Plot a graph of Interest vs Deposit for $100, $200, $300, $400.',
        steps: [
          'Step 1: Compute interest values: Deposit $100 -> $8; $200 -> $16; $300 -> $24; $400 -> $32.',
          'Step 2: Coordinates to plot: (100, 8), (200, 16), (300, 24), (400, 32).',
          'Step 3: Plot points on graph paper with x-axis: 1 cm = $100, y-axis: 1 cm = $8.',
          'Step 4: Connect the points. They form a straight line passing through the origin (0, 0).'
        ],
        result: 'The relationship forms a straight linear graph passing through (0, 0).'
      },
      {
        title: 'Identifying coordinates on the axes',
        description: 'State which axis each of the following points lies on: P(0, 5), Q(-3, 0), R(0, -7), S(4, 0).',
        steps: [
          'Step 1: P(0, 5) has x = 0, so it lies on the y-axis (positive side).',
          'Step 2: Q(-3, 0) has y = 0, so it lies on the x-axis (negative side).',
          'Step 3: R(0, -7) has x = 0, so it lies on the y-axis (negative side).',
          'Step 4: S(4, 0) has y = 0, so it lies on the x-axis (positive side).'
        ],
        result: 'P and R lie on the y-axis; Q and S lie on the x-axis.'
      }
    ],
    guidedPractice: {
      question: 'Which quadrant does the point (-4, 7) lie in?',
      hint: 'Check signs: x is negative (-) and y is positive (+).',
      solution: 'Quadrant II contains points where x < 0 and y > 0.'
    },
    independentQuestions: [
      'Plot the points A(1, 1), B(1, 4), C(4, 4), D(4, 1) and identify the shape ABCD.',
      'From a distance-time graph, explain how you can tell which car is travelling faster.',
      'Write the coordinates of the origin.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-12-1',
        question: 'What are the coordinates of the origin where the axes intersect?',
        options: ['(0, 0)', '(1, 1)', '(0, 1)', '(1, 0)'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Origin } O = (0, 0)',
        explanation: 'The origin is the intersection of the two zero marks on the x and y axes: (0, 0).',
        commonMistake: 'Selecting (1, 1).'
      },
      {
        id: 'q-c8-12-2',
        question: 'Any point whose y-coordinate is 0 lies on the:',
        options: ['x-axis', 'y-axis', 'Origin', 'Quadrant I'],
        correctIdx: 0,
        ruleOrFormula: 'y = 0 \\iff (x, 0) \\in x\\text{-axis}',
        explanation: 'When y = 0, there is zero vertical displacement, meaning the point sits directly on the horizontal x-axis.',
        commonMistake: 'Thinking it lies on the y-axis because y is mentioned.'
      },
      {
        id: 'q-c8-12-3',
        question: 'In which quadrant do both x and y coordinates have negative values (-x, -y)?',
        options: ['Quadrant III', 'Quadrant II', 'Quadrant IV', 'Quadrant I'],
        correctIdx: 0,
        ruleOrFormula: 'x < 0, \\; y < 0 \\implies \\text{Quadrant III}',
        explanation: 'Bottom-left is Quadrant III, where both x and y are negative.',
        commonMistake: 'Confusing Quadrant II (-x, +y) with Quadrant III (-x, -y).'
      }
    ],
    interactiveToolId: 'tool-c9-coordinates',
    relatedActivityLabel: 'Cartesian Coordinate & Line Graph Plotter'
  },
  {
    id: 'c8-13',
    number: 'Chapter 13',
    title: 'Algebra Play',
    classLevel: 8,
    unit: 'Part B — Analysis & Mensuration',
    description: 'Master algebraic factorisation: common factors, grouping terms, factorising quadratic trinomials by splitting the middle term, and division of polynomials.',
    learningObjectives: [
      'Factorise algebraic expressions by taking out highest common monomial factors',
      'Factorise polynomials by grouping terms in pairs',
      'Apply standard identities for factorisation: a² - b² = (a - b)(a + b)',
      'Factorise quadratic trinomials x² + (a + b)x + ab by splitting the middle term'
    ],
    formula: 'a^2 - b^2 = (a - b)(a + b), \\quad x^2 + (p + q)x + pq = (x + p)(x + q)',
    simpleExplanation: 'Factorising is the exact reverse of multiplying brackets! If multiplying turns (x + 2)(x + 3) into x² + 5x + 6, factorising takes x² + 5x + 6 and breaks it back down into its building blocks (x + 2) and (x + 3).',
    detailedExplanation: 'Factorisation decomposes an expression into a product of irreducible factors. Methods: (1) Common factor: 3x² + 6x = 3x(x + 2). (2) Regrouping: ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y). (3) Difference of squares: a² - b² = (a - b)(a + b). (4) Splitting middle term: in x² + bx + c, find two numbers p, q such that p + q = b and pq = c; then write x² + px + qx + c = (x + p)(x + q). In polynomial division, factor numerator and cancel common factors.',
    advancedReasoning: 'Fundamental Theorem of Algebra: Over the complex numbers ℂ, every polynomial of degree n can be completely factored into exactly n linear factors: P(x) = a_n (x - r_1)(x - r_2)...(x - r_n). Over the real numbers ℝ, every polynomial factors into linear and irreducible quadratic factors.',
    workedExamples: [
      {
        title: 'Factorising by splitting the middle term',
        description: 'Factorise the quadratic expression: x² + 9x + 20.',
        steps: [
          'Step 1: Identify coefficients: b = 9, c = 20.',
          'Step 2: Find two numbers whose product is 20 and sum is 9: 4 × 5 = 20, and 4 + 5 = 9.',
          'Step 3: Split the middle term 9x into 4x + 5x: x² + 4x + 5x + 20.',
          'Step 4: Group in pairs: x(x + 4) + 5(x + 4).',
          'Step 5: Factor out common binomial (x + 4): (x + 4)(x + 5).'
        ],
        result: '(x + 4)(x + 5).'
      },
      {
        title: 'Factorising using difference of two squares',
        description: 'Factorise: 49x² - 36y².',
        steps: [
          'Step 1: Recognize each term as a perfect square: 49x² = (7x)² and 36y² = (6y)².',
          'Step 2: Apply identity a² - b² = (a - b)(a + b).',
          'Step 3: Substitute a = 7x and b = 6y: (7x - 6y)(7x + 6y).'
        ],
        result: '(7x - 6y)(7x + 6y).'
      }
    ],
    guidedPractice: {
      question: 'Divide (x² + 7x + 12) by (x + 3).',
      hint: 'Factorise the numerator first: find two numbers that multiply to 12 and add to 7 (3 and 4).',
      solution: 'x² + 7x + 12 = (x + 3)(x + 4). Dividing by (x + 3) leaves (x + 4).'
    },
    independentQuestions: [
      'Factorise: 16a² - 25b².',
      'Factorise: y² - 7y + 12.',
      'Divide: 44(x^4 - 5x^3 - 24x^2) by 11x(x - 8).'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-13-1',
        question: 'What are the factors of x² - 16?',
        options: ['(x - 4)(x + 4)', '(x - 4)²', '(x + 4)²', '(x - 8)(x + 2)'],
        correctIdx: 0,
        ruleOrFormula: 'a^2 - b^2 = (a - b)(a + b)',
        explanation: 'x² - 16 = x² - 4² = (x - 4)(x + 4) using the difference of two squares identity.',
        commonMistake: 'Confusing (x - 4)(x + 4) with (x - 4)² = x² - 8x + 16.'
      },
      {
        id: 'q-c8-13-2',
        question: 'What are the factors of x² + 5x + 6?',
        options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x - 2)(x - 3)', '(x + 5)(x + 1)'],
        correctIdx: 0,
        ruleOrFormula: '2 \\times 3 = 6 \\land 2 + 3 = 5',
        explanation: 'We need two numbers that multiply to 6 and add to 5: 2 and 3. Hence (x + 2)(x + 3).',
        commonMistake: 'Choosing (x + 1)(x + 6) because 1 + 6 = 7 (not 5).'
      },
      {
        id: 'q-c8-13-3',
        question: 'Simplify: (10x - 25) ÷ 5.',
        options: ['2x - 5', '2x - 25', '10x - 5', '2x + 5'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{5(2x - 5)}{5} = 2x - 5',
        explanation: 'Factor 5 out from both terms: 5(2x - 5) / 5 = 2x - 5.',
        commonMistake: 'Dividing only the first term and keeping 25 unchanged.'
      }
    ],
    interactiveToolId: 'tool-c9-algebraic-identities',
    relatedActivityLabel: 'Polynomial Factorisation & Binomial Splitter'
  },
  {
    id: 'c8-14',
    number: 'Chapter 14',
    title: 'Area',
    classLevel: 8,
    unit: 'Part B — Analysis & Mensuration',
    description: 'Calculate areas of trapezia, rhombi, general quadrilaterals, polygons by triangulation, and surface area & volume of cuboids, cubes, and cylinders.',
    learningObjectives: [
      'Calculate the area of a trapezium: A = 1/2 (a + b) h',
      'Compute the area of a rhombus using diagonals: A = 1/2 d_1 d_2',
      'Determine the surface area and volume of cuboids, cubes, and right circular cylinders',
      'Solve practical water tank and packaging mensuration problems'
    ],
    formula: 'A_{\\text{trap}} = \\frac{1}{2}(a + b)h, \\quad A_{\\text{rhombus}} = \\frac{1}{2}d_1 d_2, \\quad V_{\\text{cyl}} = \\pi r^2 h, \\quad A_{\\text{cyl, curved}} = 2\\pi rh',
    simpleExplanation: 'A trapezium is a 4-sided shape with one pair of parallel sides (like a handbag). Its area is the average of the two parallel sides multiplied by the height between them! For 3D cylinders (like a soda can), volume is simply the circle base area (πr²) multiplied by height h.',
    detailedExplanation: 'Area of trapezium: Dissect into a parallelogram of base a and a triangle of base (b - a): Area = ah + 1/2 (b - a)h = 1/2 h (2a + b - a) = 1/2 (a + b)h. For a rhombus with perpendicular diagonals, dissect into 4 right triangles: A = 4 × [1/2 × (d₁/2) × (d₂/2)] = 1/2 d₁d₂. Solid mensuration: Cuboid V = l·b·h, Surface Area = 2(lb + bh + hl). Cylinder curved surface area = 2πrh; total surface area = 2πr(r + h); volume = πr²h.',
    advancedReasoning: 'Cavalieri\'s Principle: If two 3D solids have the same height and equal cross-sectional areas at every level parallel to their bases, they have equal volumes. This principle proves that formulas for right cylinders and prisms hold identically for oblique cylinders and sheared prisms.',
    workedExamples: [
      {
        title: 'Area of a trapezium field',
        description: 'The parallel sides of a trapezium are 25 cm and 15 cm, and the perpendicular distance between them is 10 cm. Find its area.',
        steps: [
          'Step 1: Identify parameters: a = 25 cm, b = 15 cm, h = 10 cm.',
          'Step 2: Apply formula: A = 1/2 × (a + b) × h.',
          'Step 3: Sum parallel sides: 25 + 15 = 40 cm.',
          'Step 4: Multiply: A = 1/2 × 40 × 10 = 20 × 10 = 200 cm².'
        ],
        result: 'Area of the trapezium is 200 cm².'
      },
      {
        title: 'Volume and capacity of a cylindrical water tank',
        description: 'A cylindrical water tank has radius 1.4 m and height 3 m. How many liters of water can it hold? (Take π = 22/7; 1 m³ = 1000 L).',
        steps: [
          'Step 1: Formula for volume of cylinder: V = πr²h.',
          'Step 2: Substitute: V = (22/7) × (1.4)² × 3.',
          'Step 3: (1.4)² = 1.96. (22/7) × 1.96 = 22 × 0.28 = 6.16 m².',
          'Step 4: Multiply by height: 6.16 × 3 = 18.48 m³.',
          'Step 5: Convert m³ to liters: 18.48 × 1000 = 18,480 liters.'
        ],
        result: 'The tank holds 18,480 liters of water.'
      }
    ],
    guidedPractice: {
      question: 'Find the area of a rhombus whose diagonals are 10 cm and 8.2 cm.',
      hint: 'Area of a rhombus = 1/2 × d_1 × d_2.',
      solution: 'Area = 1/2 × 10 × 8.2 = 5 × 8.2 = 41 cm².'
    },
    independentQuestions: [
      'The floor of a building consists of 3,000 rhombus-shaped tiles with diagonals 45 cm and 30 cm. Find the total cost of polishing at $4 per m².',
      'A rectangular piece of paper 22 cm by 10 cm is rolled along its length to form a cylinder. Find the volume of the cylinder.',
      'Find the height of a cuboid whose base area is 180 cm² and volume is 900 cm³.'
    ],
    chapterQuiz: [
      {
        id: 'q-c8-14-1',
        question: 'What is the formula for the area of a trapezium with parallel sides a and b and height h?',
        options: ['1/2 (a + b) h', '(a + b) h', '1/2 a b h', 'a × b × h'],
        correctIdx: 0,
        ruleOrFormula: 'A = \\frac{1}{2}(a + b)h',
        explanation: 'The area of a trapezium equals half the sum of the parallel sides multiplied by the perpendicular height between them.',
        commonMistake: 'Forgetting the 1/2 factor.'
      },
      {
        id: 'q-c8-14-2',
        question: 'What is the volume of a cylinder with radius r and height h?',
        options: ['πr²h', '2πrh', '1/3 πr²h', '4/3 πr³'],
        correctIdx: 0,
        ruleOrFormula: 'V = \\pi r^2 h',
        explanation: 'Volume equals base circle area (πr²) times height (h): πr²h.',
        commonMistake: 'Confusing volume (πr²h) with curved surface area (2πrh) or cone volume (1/3 πr²h).'
      },
      {
        id: 'q-c8-14-3',
        question: 'How many liters of water are in 1 cubic meter (1 m³)?',
        options: ['1,000 L', '100 L', '10,000 L', '10 L'],
        correctIdx: 0,
        ruleOrFormula: '1 \\text{ m}^3 = 100 \\times 100 \\times 100 \\text{ cm}^3 = 10^6 \\text{ cm}^3 = 1,000 \\text{ L}',
        explanation: '1 m³ contains 1,000,000 cm³, and since 1,000 cm³ = 1 L, 1 m³ = 1,000 liters.',
        commonMistake: 'Thinking 1 m³ = 100 liters.'
      }
    ],
    interactiveToolId: 'tool-c8-area-solids',
    relatedActivityLabel: 'Trapezium & 3D Cylinder Mensuration Lab'
  }
];
