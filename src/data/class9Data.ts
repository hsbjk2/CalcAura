/**
 * Class 9 — Secondary Mathematics Foundations Curriculum Data
 * Complete, structured mathematical learning content with 8 verified chapters:
 * 1. Orienting Yourself: The Use of Coordinates
 * 2. Introduction to Linear Polynomials
 * 3. The World of Numbers
 * 4. Exploring Algebraic Identities
 * 5. I'm Up and Down, and Round and Round
 * 6. Measuring Space: Perimeter and Area
 * 7. The Mathematics of Maybe: Introduction to Probability
 * 8. Predicting What Comes Next: Exploring Sequences and Progressions
 */

import { MiddleSchoolChapter } from './class6Data.ts';

export const CLASS_9_CHAPTERS: MiddleSchoolChapter[] = [
  {
    id: 'c9-01',
    number: 'Chapter 01',
    title: 'Orienting Yourself: The Use of Coordinates',
    classLevel: 9,
    unit: 'Coordinate Geometry',
    description: 'Master the 2D Cartesian plane, René Descartes’ coordinate geometry, quadrants I-IV, plotting points (x, y), Euclidean distance formula, and midpoint calculations.',
    learningObjectives: [
      'Locate points with signed coordinates (abscissa x, ordinate y) across four quadrants',
      'Derive and calculate Euclidean distance between two points using the Pythagorean theorem',
      'Compute the midpoint of a line segment connecting two Cartesian coordinates',
      'Model physical navigation, map projections, and geometric paths algebraically'
    ],
    formula: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}, \\quad M = \\left(\\frac{x_1 + x_2}{2}, \\; \\frac{y_1 + y_2}{2}\\right)',
    simpleExplanation: 'The Cartesian grid gives every spot on a flat plane an exact address with two numbers (x, y). The first number tells you how far left or right to walk from the center (0, 0), and the second tells you how far up or down to go. Using Pythagoras\' theorem, you can find the exact straight-line distance between any two points!',
    detailedExplanation: 'The coordinate plane consists of perpendicular axes X\'OX and Y\'OY intersecting at the origin O(0, 0). The four quadrants are: Quadrant I (+, +), Quadrant II (-, +), Quadrant III (-, -), Quadrant IV (+, -). By dropping perpendiculars to the axes from points P(x₁, y₁) and Q(x₂, y₂), a right-angled triangle is formed with horizontal leg |x₂ - x₁| and vertical leg |y₂ - y₁|. By the Pythagorean theorem, the distance is d = √[(x₂ - x₁)² + (y₂ - y₁)²]. The midpoint is the average of coordinates: M = ((x₁+x₂)/2, (y₁+y₂)/2).',
    advancedReasoning: 'Metric topology: The Euclidean distance d(P, Q) defines a metric space (ℝ², d) satisfying non-negativity, identity of indiscernibles, symmetry d(P,Q) = d(Q,P), and the triangle inequality d(P, R) ≤ d(P, Q) + d(Q, R). This coordinate framework grounds vector spaces and linear algebra.',
    workedExamples: [
      {
        title: 'Calculating distance between two coordinates in different quadrants',
        description: 'Find the distance between point A(-3, 4) in Quadrant II and point B(3, -4) in Quadrant IV.',
        steps: [
          'Step 1: Identify coordinates: x₁ = -3, y₁ = 4, x₂ = 3, y₂ = -4.',
          'Step 2: Difference in x: x₂ - x₁ = 3 - (-3) = 3 + 3 = 6.',
          'Step 3: Difference in y: y₂ - y₁ = -4 - 4 = -8.',
          'Step 4: Square differences: (6)² = 36; (-8)² = 64.',
          'Step 5: Sum of squares: 36 + 64 = 100.',
          'Step 6: Square root: d = √100 = 10 units.'
        ],
        result: 'Distance AB = 10 units.'
      },
      {
        title: 'Finding the midpoint of a line segment',
        description: 'Find the midpoint M of the segment joining P(2, -5) and Q(8, 7).',
        steps: [
          'Step 1: Formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).',
          'Step 2: x-coordinate of midpoint: (2 + 8) / 2 = 10 / 2 = 5.',
          'Step 3: y-coordinate of midpoint: (-5 + 7) / 2 = 2 / 2 = 1.',
          'Step 4: Combine: M(5, 1).'
        ],
        result: 'Midpoint M is (5, 1).'
      }
    ],
    guidedPractice: {
      question: 'Find the distance of point P(5, -12) from the origin (0, 0).',
      hint: 'Distance from origin formula: d = √(x² + y²).',
      solution: 'd = √(5² + (-12)²) = √(25 + 144) = √169 = 13 units.'
    },
    independentQuestions: [
      'Show that points A(1, 7), B(4, 2), C(-1, -1), and D(-4, 4) form the vertices of a square.',
      'Find the coordinates of a point on the x-axis which is equidistant from (2, -5) and (-2, 9).',
      'Name the quadrant or axis for: (-3, 0), (0, -4), (-2, -5), (4, -3).'
    ],
    chapterQuiz: [
      {
        id: 'q-c9-01-1',
        question: 'What is the distance between point (0, 3) and point (4, 0)?',
        options: ['5 units', '7 units', '1 unit', '25 units'],
        correctIdx: 0,
        ruleOrFormula: 'd = \\sqrt{(4 - 0)^2 + (0 - 3)^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5',
        explanation: 'd = √(4² + (-3)²) = √(16 + 9) = √25 = 5 units (the classic 3-4-5 right triangle).',
        commonMistake: 'Adding 4 + 3 = 7.'
      },
      {
        id: 'q-c9-01-2',
        question: 'In which quadrant does the point (-6, 5) lie?',
        options: ['Quadrant II', 'Quadrant I', 'Quadrant III', 'Quadrant IV'],
        correctIdx: 0,
        ruleOrFormula: 'x < 0, \\; y > 0 \\implies \\text{Quadrant II}',
        explanation: 'When x is negative and y is positive, the point is in Quadrant II (top-left).',
        commonMistake: 'Selecting Quadrant IV (which has x positive and y negative).'
      },
      {
        id: 'q-c9-01-3',
        question: 'What is the midpoint of the line segment joining (-4, 2) and (6, 8)?',
        options: ['(1, 5)', '(2, 10)', '(-1, 3)', '(5, 1)'],
        correctIdx: 0,
        ruleOrFormula: 'M = \\left(\\frac{-4 + 6}{2}, \\; \\frac{2 + 8}{2}\\right) = (1, 5)',
        explanation: 'x-midpoint = (-4 + 6)/2 = 2/2 = 1. y-midpoint = (2 + 8)/2 = 10/2 = 5. Hence (1, 5).',
        commonMistake: 'Subtracting coordinates instead of averaging: (-4-6)/2 = -5.'
      }
    ],
    interactiveToolId: 'tool-c9-coordinates',
    relatedActivityLabel: 'Cartesian Coordinate & Distance Plotter'
  },
  {
    id: 'c9-02',
    number: 'Chapter 02',
    title: 'Introduction to Linear Polynomials',
    classLevel: 9,
    unit: 'Algebraic Structures',
    description: 'Explore polynomials in one variable, degree, coefficients, linear polynomials P(x) = ax + b, zeroes of polynomials, and graphical interpretation as straight lines.',
    learningObjectives: [
      'Define a polynomial as an algebraic expression with non-negative integer exponents',
      'Determine degree, leading coefficient, and constant term of polynomials',
      'Calculate the zero (root) of a linear polynomial P(x) = ax + b: x = -b/a',
      'Interpret the zero geometrically as the x-intercept where the graph crosses the x-axis'
    ],
    formula: 'P(x) = ax + b \\quad (a \\ne 0), \\quad P(x) = 0 \\implies x = -\\frac{b}{a}',
    simpleExplanation: 'A linear polynomial is an algebraic expression where the highest power of x is 1 (like 2x - 6). The "zero" of a polynomial is the mystery number you plug in to make the whole expression equal zero! For 2x - 6, plugging in x = 3 gives 2(3) - 6 = 0, so 3 is the zero.',
    detailedExplanation: 'An expression P(x) = a_n x^n + a_{n-1} x^{n-1} + ... + a_1 x + a_0 is a polynomial if exponents n are whole numbers (n ∈ {0, 1, 2, ...}). If highest power is 1, it is a linear polynomial P(x) = ax + b with a ≠ 0. A real number k is a zero of P(x) if P(k) = 0. Solving ax + b = 0 gives unique zero x = -b/a. On a Cartesian graph, y = ax + b is a straight line, and its zero is the exact x-coordinate where the line intersects the horizontal axis (y = 0).',
    advancedReasoning: 'Degree theorem: A polynomial of degree n over a field has at most n distinct roots. A linear polynomial (degree 1) has exactly one unique real root. Furthermore, by the Remainder Theorem, dividing P(x) by (x - c) yields remainder R = P(c), meaning (x - c) divides P(x) evenly if and only if c is a zero.',
    workedExamples: [
      {
        title: 'Finding the zero of a linear polynomial',
        description: 'Find the zero of the linear polynomial P(x) = 3x - 12 and verify graphically.',
        steps: [
          'Step 1: Set P(x) equal to zero: 3x - 12 = 0.',
          'Step 2: Add 12 to both sides: 3x = 12.',
          'Step 3: Divide by 3: x = 12 / 3 = 4.',
          'Step 4: Check: P(4) = 3(4) - 12 = 12 - 12 = 0. Verified!',
          'Step 5: Graphical interpretation: The line y = 3x - 12 crosses the x-axis at coordinate (4, 0).'
        ],
        result: 'The zero of P(x) is x = 4.'
      },
      {
        title: 'Checking if an expression is a polynomial',
        description: 'Determine which of the following are polynomials: (a) x² + 2√x + 5, (b) 3x - 7, (c) 1/x + 4.',
        steps: [
          'Step 1: (a) contains √x = x^(1/2). Since 1/2 is not a non-negative integer, it is NOT a polynomial.',
          'Step 2: (b) 3x - 7 has powers x^1 and x^0 (both integers ≥ 0). This IS a linear polynomial of degree 1.',
          'Step 3: (c) 1/x = x^(-1). Since -1 is a negative integer, it is NOT a polynomial.'
        ],
        result: 'Only (b) 3x - 7 is a polynomial.'
      }
    ],
    guidedPractice: {
      question: 'Find the zero of the polynomial P(x) = 5x + 3.',
      hint: 'Set 5x + 3 = 0 and solve for x: x = -b/a.',
      solution: '5x = -3 => x = -3/5. Check: P(-3/5) = 5(-3/5) + 3 = -3 + 3 = 0.'
    },
    independentQuestions: [
      'Find the value of polynomial P(y) = 2y³ - 3y + 7 at y = -2.',
      'What is the degree of the zero polynomial?',
      'If x = 2 is a zero of polynomial 2x + k, find the value of k.'
    ],
    chapterQuiz: [
      {
        id: 'q-c9-02-1',
        question: 'What is the zero of the linear polynomial P(x) = 2x - 8?',
        options: ['4', '-4', '8', '2'],
        correctIdx: 0,
        ruleOrFormula: '2x - 8 = 0 \\implies 2x = 8 \\implies x = 4',
        explanation: 'Setting P(x) = 0 gives 2x - 8 = 0 => 2x = 8 => x = 4.',
        commonMistake: 'Flipping sign incorrectly to -4.'
      },
      {
        id: 'q-c9-02-2',
        question: 'Which of the following is NOT a polynomial?',
        options: ['x + 1/x', 'x³ - 5x + 2', '√3 x + 7', 'x² - 9'],
        correctIdx: 0,
        ruleOrFormula: '1/x = x^{-1} \\implies \\text{exponent is negative}',
        explanation: 'In polynomials, all exponents of the variable must be non-negative integers. 1/x = x^-1 has a negative exponent, so it is not a polynomial.',
        commonMistake: 'Thinking √3 x + 7 is not a polynomial (the coefficient is √3, but the variable x has power 1, which is valid).'
      },
      {
        id: 'q-c9-02-3',
        question: 'Geometrically, the zero of a linear polynomial P(x) = ax + b represents:',
        options: ['The x-coordinate where its graph crosses the x-axis', 'The y-intercept of the line', 'The slope of the line', 'The distance from origin'],
        correctIdx: 0,
        ruleOrFormula: 'y = 0 \\implies x = -b/a',
        explanation: 'At the x-axis, y = P(x) = 0. Therefore, the zero is precisely the x-intercept of the line.',
        commonMistake: 'Confusing x-intercept with y-intercept (which is (0, b)).'
      }
    ],
    interactiveToolId: 'tool-c9-linear-polynomials',
    relatedActivityLabel: 'Linear Polynomial Zeroes & Graphing Studio'
  },
  {
    id: 'c9-03',
    number: 'Chapter 03',
    title: 'The World of Numbers',
    classLevel: 9,
    unit: 'Real Number Systems',
    description: 'Explore the complete real number continuum: rational numbers, discovery of irrationals (√2, √3, π), non-terminating non-repeating decimals, rationalising surds, and laws of real exponents.',
    learningObjectives: [
      'Prove that irrational numbers cannot be written as p/q and have non-terminating, non-repeating decimal expansions',
      'Plot irrational numbers like √2, √3, and √5 on the number line using the spiral of Theodorus',
      'Rationalise denominators of binomial surds using conjugate multipliers: 1/(a + √b)',
      'Apply real exponent laws with fractional indices: a^(p/q) = ⁿ√(a^p)'
    ],
    formula: '\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}, \\quad \\frac{1}{a + \\sqrt{b}} \\times \\frac{a - \\sqrt{b}}{a - \\sqrt{b}} = \\frac{a - \\sqrt{b}}{a^2 - b}',
    simpleExplanation: 'Imagine the number line is a continuous ribbon. Rational fractions cover lots of points, but leave infinitely many gaps! Numbers like √2 (≈ 1.41421356...) go on forever without ever repeating a pattern. Together, rational and irrational numbers fill every single microscopic point on the number line—making the complete Real Numbers ℝ!',
    detailedExplanation: 'Real numbers ℝ comprise rational numbers ℚ and irrational numbers 𝕀. An irrational number has an infinite, non-terminating, non-repeating decimal expansion. By the Pythagorean theorem, a right triangle with legs of 1 unit has hypotenuse √2, allowing exact geometric plotting on the number line. Surd rationalisation multiplies numerator and denominator by the conjugate radical (a - √b) to exploit the difference of squares: (a + √b)(a - √b) = a² - b, eliminating radicals from the denominator.',
    advancedReasoning: 'Dedekind cuts: The real number system is constructed from the rationals by Dedekind cuts: a real number is a partition (A, B) of ℚ such that every element of A is less than every element of B. The completeness axiom states that every non-empty set of real numbers bounded above has a least upper bound (supremum), guaranteeing no gaps exist on the real line.',
    workedExamples: [
      {
        title: 'Rationalising the denominator of a binomial surd',
        description: 'Rationalise the denominator of 1 / (3 + √2).',
        steps: [
          'Step 1: Identify the conjugate of (3 + √2): it is (3 - √2).',
          'Step 2: Multiply numerator and denominator by conjugate: [1 × (3 - √2)] / [(3 + √2)(3 - √2)].',
          'Step 3: Expand denominator using (a + b)(a - b) = a² - b²: 3² - (√2)² = 9 - 2 = 7.',
          'Step 4: Combine with numerator: (3 - √2) / 7.'
        ],
        result: '(3 - √2) / 7.'
      },
      {
        title: 'Simplifying real exponent expressions',
        description: 'Evaluate: (64)^(1/2) × (27)^(1/3) ÷ (16)^(1/4).',
        steps: [
          'Step 1: Simplify 64^(1/2) = √64 = 8.',
          'Step 2: Simplify 27^(1/3) = ∛27 = 3.',
          'Step 3: Simplify 16^(1/4) = ⁴√16 = 2 (since 2^4 = 16).',
          'Step 4: Substitute and evaluate: (8 × 3) ÷ 2 = 24 ÷ 2 = 12.'
        ],
        result: '12.'
      }
    ],
    guidedPractice: {
      question: 'Classify as rational or irrational: (a) √23, (b) √225, (c) 0.3796, (d) 7.478478... (e) 1.1010010001...',
      hint: 'Square roots of non-perfect squares and non-repeating infinite decimals are irrational.',
      solution: '(a) √23 is irrational (23 is not a square); (b) √225 = 15 is rational; (c) 0.3796 is rational (terminating); (d) rational (repeating block 478); (e) irrational (infinite non-repeating pattern).'
    },
    independentQuestions: [
      'Show how to construct √5 on the number line using right triangles.',
      'Rationalise the denominator: 5 / (√3 - √5).',
      'Evaluate: (125)^(-1/3).'
    ],
    chapterQuiz: [
      {
        id: 'q-c9-03-1',
        question: 'Which of the following numbers is irrational?',
        options: ['√7', '√9', '0.25', '22/7'],
        correctIdx: 0,
        ruleOrFormula: '\\sqrt{p} \\text{ is irrational for prime } p',
        explanation: '7 is a prime (not a square), so √7 is an irrational number. (√9 = 3 is an integer, 0.25 = 1/4 is rational, and 22/7 is a rational fraction approximating π).',
        commonMistake: 'Thinking 22/7 is irrational because it approximates π.'
      },
      {
        id: 'q-c9-03-2',
        question: 'What is the rationalised form of 1 / √5?',
        options: ['√5 / 5', '5 / √5', '1/5', '√5'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{1}{\\sqrt{5}} \\times \\frac{\\sqrt{5}}{\\sqrt{5}} = \\frac{\\sqrt{5}}{5}',
        explanation: 'Multiply top and bottom by √5: 1×√5 / (√5×√5) = √5 / 5.',
        commonMistake: 'Squaring the fraction to 1/5 (which changes its value).'
      },
      {
        id: 'q-c9-03-3',
        question: 'What is the value of 32^(2/5)?',
        options: ['4', '2', '8', '16'],
        correctIdx: 0,
        ruleOrFormula: '32^{2/5} = (32^{1/5})^2 = (2)^2 = 4',
        explanation: 'The 5th root of 32 is 2 (2^5 = 32). Then squaring 2 yields 2² = 4.',
        commonMistake: 'Multiplying 32 × 2/5 = 12.8.'
      }
    ],
    interactiveToolId: 'tool-c9-real-numbers',
    relatedActivityLabel: 'Real Number Continuum & Surd Rationaliser'
  },
  {
    id: 'c9-04',
    number: 'Chapter 04',
    title: 'Exploring Algebraic Identities',
    classLevel: 9,
    unit: 'Algebraic Structures',
    description: 'Master core algebraic identities: (a+b)², (a-b)², a²-b², (x+a)(x+b), (a+b+c)², (a±b)³, and a³+b³+c³-3abc with geometric visual proofs and factorisation applications.',
    learningObjectives: [
      'Expand binomial and trinomial squares: (a + b)², (a - b)², and (a + b + c)²',
      'Expand and factorise cubic polynomials: (a + b)³ and a³ + b³ = (a + b)(a² - ab + b²)',
      'Construct visual geometric proofs of identities using partitioned squares and cubes',
      'Evaluate complex numerical arithmetic rapidly using suitable algebraic identities'
    ],
    formula: '(a+b)^2 = a^2 + 2ab + b^2, \\quad a^2 - b^2 = (a-b)(a+b), \\quad (a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3',
    simpleExplanation: 'An algebraic identity is an equation that is true for EVERY single number you could ever choose! For example, (a + b)² = a² + 2ab + b². If you draw a square of side (a + b), it splits into one a² square, one b² square, and two rectangular ab strips!',
    detailedExplanation: 'An identity is an equality between expressions that holds identically under all variable valuations. Core identities: (1) (a + b)² = a² + 2ab + b²; (2) (a - b)² = a² - 2ab + b²; (3) a² - b² = (a - b)(a + b); (4) (a + b + c)² = a² + b² + c² + 2(ab + bc + ca); (5) (a + b)³ = a³ + b³ + 3ab(a + b); (6) (a - b)³ = a³ - b³ - 3ab(a - b); (7) Conditional identity: If a + b + c = 0, then a³ + b³ + c³ = 3abc.',
    advancedReasoning: 'Binomial Theorem: For any positive integer n, (a + b)ⁿ = Σₖ₌₀ⁿ (ⁿCₖ) aⁿ⁻ᵏ bᵏ. Pascal\'s triangle generates the combinatorial coefficients ⁿCₖ = n! / (k!(n-k)!). Identities are fundamental invariants in polynomial ring quotient structures.',
    workedExamples: [
      {
        title: 'Expanding a trinomial square with mixed signs',
        description: 'Expand (2x - y + 3z)² using identity.',
        steps: [
          'Step 1: Write in form (a + b + c)² with a = 2x, b = -y, c = 3z.',
          'Step 2: Formula: a² + b² + c² + 2ab + 2bc + 2ca.',
          'Step 3: Compute square terms: (2x)² + (-y)² + (3z)² = 4x² + y² + 9z².',
          'Step 4: Compute cross terms: 2(2x)(-y) = -4xy; 2(-y)(3z) = -6yz; 2(3z)(2x) = 12zx.',
          'Step 5: Combine: 4x² + y² + 9z² - 4xy - 6yz + 12zx.'
        ],
        result: '4x² + y² + 9z² - 4xy - 6yz + 12zx.'
      },
      {
        title: 'Evaluating cubes without actual cubing',
        description: 'Calculate (-12)³ + 7³ + 5³ using conditional identity.',
        steps: [
          'Step 1: Check sum of base values: a = -12, b = 7, c = 5.',
          'Step 2: a + b + c = -12 + 7 + 5 = 0.',
          'Step 3: Since a + b + c = 0, use identity: a³ + b³ + c³ = 3abc.',
          'Step 4: Substitute: 3(-12)(7)(5) = -36 × 35 = -1260.'
        ],
        result: '-1260.'
      }
    ],
    guidedPractice: {
      question: 'Factorise: 8x³ + y³ + 27z³ - 18xyz.',
      hint: 'Recognize form a³ + b³ + c³ - 3abc = (a + b + c)(a² + b² + c² - ab - bc - ca) with a = 2x, b = y, c = 3z.',
      solution: '(2x + y + 3z)(4x² + y² + 9z² - 2xy - 3yz - 6zx).'
    },
    independentQuestions: [
      'Expand: (3a - 5b)³.',
      'Evaluate 105 × 95 using identity a² - b² = (a + b)(a - b).',
      'If x + 1/x = 4, find the value of x² + 1/x² and x⁴ + 1/x⁴.'
    ],
    chapterQuiz: [
      {
        id: 'q-c9-04-1',
        question: 'If a + b + c = 0, what is the value of a³ + b³ + c³?',
        options: ['3abc', '0', 'abc', 'a² + b² + c²'],
        correctIdx: 0,
        ruleOrFormula: 'a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2 - ab - bc - ca) = 0',
        explanation: 'When a + b + c = 0, the entire RHS vanishes, leaving a³ + b³ + c³ = 3abc.',
        commonMistake: 'Guessing 0 because a + b + c = 0.'
      },
      {
        id: 'q-c9-04-2',
        question: 'What is the expansion of (2x + 3y)²?',
        options: ['4x² + 12xy + 9y²', '4x² + 9y²', '4x² + 6xy + 9y²', '2x² + 12xy + 3y²'],
        correctIdx: 0,
        ruleOrFormula: '(a + b)^2 = a^2 + 2ab + b^2',
        explanation: '(2x)² + 2(2x)(3y) + (3y)² = 4x² + 12xy + 9y².',
        commonMistake: 'Writing 4x² + 9y² and forgetting the middle 2ab term.'
      },
      {
        id: 'q-c9-04-3',
        question: 'Calculate 102 × 98 using an algebraic identity:',
        options: ['9996', '9986', '10004', '9992'],
        correctIdx: 0,
        ruleOrFormula: '(100 + 2)(100 - 2) = 100^2 - 2^2 = 10000 - 4 = 9996',
        explanation: '(100 + 2)(100 - 2) = 100² - 2² = 10,000 - 4 = 9996.',
        commonMistake: 'Subtracting 2 instead of 2² = 4.'
      }
    ],
    interactiveToolId: 'tool-c9-algebraic-identities',
    relatedActivityLabel: 'Geometric Algebraic Identity Visualiser'
  },
  {
    id: 'c9-05',
    number: 'Chapter 05',
    title: "I'm Up and Down, and Round and Round",
    classLevel: 9,
    unit: 'Circle Geometry',
    description: 'Explore circles, radii, chords, secants, tangents, perpendicular bisector of a chord, angle subtended at center vs circumference, angles in the same segment, and cyclic quadrilaterals.',
    learningObjectives: [
      'Prove that the perpendicular from the center of a circle to a chord bisects the chord',
      'Prove the central angle theorem: angle subtended by an arc at the center is twice the angle subtended at any point on the remaining circumference',
      'Establish that angles in the same segment of a circle are equal',
      'Verify that the sum of either pair of opposite angles of a cyclic quadrilateral is 180°'
    ],
    formula: '\\angle AOB = 2 \\angle APB, \\quad \\angle \\text{ in semicircle} = 90^\\circ, \\quad \\angle A + \\angle C = 180^\\circ \\; (\\text{cyclic})',
    simpleExplanation: 'A circle is the set of all points at the exact same distance from the center. If you draw an angle from an arc to the center of the circle, it is ALWAYS twice as big as the angle drawn from the same arc to the outer edge! And any angle drawn inside a semicircle is always a right angle (90°).',
    detailedExplanation: 'Circle theorems: (1) Perpendicular from center to chord bisects the chord. (2) Congruent chords are equidistant from the center. (3) Central angle theorem: ∠AOB = 2∠APB for any point P on the major arc. (4) Angle in a semicircle is a right angle (90°). (5) Angles in the same segment of a circle are equal (∠APB = ∠AQB). (6) A quadrilateral whose 4 vertices lie on a circle is cyclic; opposite angles are supplementary (∠A + ∠C = 180°).',
    advancedReasoning: 'Ptolemy\'s Theorem: For any cyclic quadrilateral ABCD, the product of its diagonals equals the sum of the products of opposite sides: AC · BD = AB · CD + BC · AD. This powerful theorem connects circle geometry to spherical trigonometry and angle addition formulas.',
    workedExamples: [
      {
        title: 'Applying the central angle theorem',
        description: 'In a circle with center O, an arc AB subtends an angle of 130° at the center. Find the angle subtended by arc AB at point P on the circumference.',
        steps: [
          'Step 1: Identify given central angle: ∠AOB = 130°.',
          'Step 2: Theorem: Angle at circumference ∠APB is half the central angle.',
          'Step 3: ∠APB = 1/2 × ∠AOB = 1/2 × 130° = 65°.'
        ],
        result: '∠APB = 65°.'
      },
      {
        title: 'Finding opposite angle in a cyclic quadrilateral',
        description: 'ABCD is a cyclic quadrilateral. If ∠A = (2x + 10)° and ∠C = (3x + 20)°, find the value of x and the two angles.',
        steps: [
          'Step 1: In a cyclic quadrilateral, opposite angles are supplementary: ∠A + ∠C = 180°.',
          'Step 2: Form equation: (2x + 10) + (3x + 20) = 180.',
          'Step 3: Combine terms: 5x + 30 = 180.',
          'Step 4: Solve: 5x = 150 => x = 30.',
          'Step 5: Compute angles: ∠A = 2(30) + 10 = 70°; ∠C = 3(30) + 20 = 110°. Check: 70° + 110° = 180°.'
        ],
        result: 'x = 30; ∠A = 70° and ∠C = 110°.'
      }
    ],
    guidedPractice: {
      question: 'A chord of length 16 cm is drawn in a circle of radius 10 cm. Find the distance of the chord from the center.',
      hint: 'The perpendicular from the center bisects the chord into two 8 cm halves, forming a right triangle with radius 10 cm as hypotenuse.',
      solution: 'd² = r² - (chord/2)² = 10² - 8² = 100 - 64 = 36. Distance d = √36 = 6 cm.'
    },
    independentQuestions: [
      'Prove that the angle subtended by a diameter at any point on the circumference is 90°.',
      'If two circles intersect at two points, prove that their centers lie on the perpendicular bisector of the common chord.',
      'ABCD is a cyclic quadrilateral where diagonal BD bisects ∠B. Prove that AC = AD if AB = BC.'
    ],
    chapterQuiz: [
      {
        id: 'q-c9-05-1',
        question: 'What is the measure of an angle inscribed in a semicircle?',
        options: ['90°', '180°', '60°', '45°'],
        correctIdx: 0,
        ruleOrFormula: '\\angle \\text{ in semicircle} = \\frac{180^\\circ}{2} = 90^\\circ',
        explanation: 'A diameter subtends a straight angle (180°) at the center. The angle on the circumference is half the central angle: 180° / 2 = 90°.',
        commonMistake: 'Thinking it is 180° because a straight line is involved.'
      },
      {
        id: 'q-c9-05-2',
        question: 'If the central angle ∠AOB is 84°, what is the angle ∠APB subtended at the circumference?',
        options: ['42°', '84°', '168°', '96°'],
        correctIdx: 0,
        ruleOrFormula: '\\angle APB = \\frac{1}{2} \\angle AOB = \\frac{84^\\circ}{2} = 42^\\circ',
        explanation: 'The angle subtended at the circumference is half the angle subtended at the center: 84° / 2 = 42°.',
        commonMistake: 'Doubling the angle to 168° instead of halving.'
      },
      {
        id: 'q-c9-05-3',
        question: 'In a cyclic quadrilateral, what is the sum of opposite angles?',
        options: ['180°', '360°', '90°', '270°'],
        correctIdx: 0,
        ruleOrFormula: '\\angle A + \\angle C = 180^\\circ, \\quad \\angle B + \\angle D = 180^\\circ',
        explanation: 'Opposite angles of any quadrilateral inscribed in a circle are always supplementary (sum = 180°).',
        commonMistake: 'Confusing opposite angle sum (180°) with total quadrilateral angle sum (360°).'
      }
    ],
    interactiveToolId: 'tool-c9-circles',
    relatedActivityLabel: 'Circle Theorems & Cyclic Quadrilateral Studio'
  },
  {
    id: 'c9-06',
    number: 'Chapter 06',
    title: 'Measuring Space: Perimeter and Area',
    classLevel: 9,
    unit: 'Mensuration',
    description: 'Master Heron\'s formula for triangle area without altitude, areas of sectors and segments of circles, composite planar boundaries, and application to land surveying.',
    learningObjectives: [
      'Derive and apply Heron’s formula: A = √[s(s - a)(s - b)(s - c)] where s = (a + b + c)/2',
      'Calculate area of a sector: A = (θ/360°) × πr² and arc length: L = (θ/360°) × 2πr',
      'Compute area of circle segments by subtracting triangle area from sector area',
      'Solve practical surveying and triangular field partition problems'
    ],
    formula: 'A = \\sqrt{s(s - a)(s - b)(s - c)}, \\quad s = \\frac{a+b+c}{2}, \\quad A_{\\text{sector}} = \\frac{\\theta}{360^\\circ} \\pi r^2',
    simpleExplanation: 'What if you know all three sides of a triangle, but do NOT know its height? Over 2,000 years ago, Heron of Alexandria discovered a magic formula that gives the exact area using only the three side lengths and their half-perimeter s!',
    detailedExplanation: 'For a triangle with side lengths a, b, c, semi-perimeter is s = (a + b + c)/2. Heron\'s formula states Area = √[s(s - a)(s - b)(s - c)]. In circular mensuration, an arc of angle θ° subtends a sector of area (θ/360°) × πr². A segment is the region bounded by a chord and an arc. Minor segment area = Area of sector - Area of triangle formed by radii and chord: A_seg = (θ/360°)πr² - 1/2 r² sin θ.',
    advancedReasoning: 'Brahmagupta\'s Formula: For a cyclic quadrilateral with sides a, b, c, d and semi-perimeter s, Area = √[(s - a)(s - b)(s - c)(s - d)]. When one side d -> 0, the quadrilateral degenerates into a triangle, and Brahmagupta\'s formula reduces identically to Heron\'s formula.',
    workedExamples: [
      {
        title: 'Area of a scalene triangular park using Heron’s formula',
        description: 'Find the area of a triangular park whose sides measure 50 m, 78 m, and 112 m.',
        steps: [
          'Step 1: Calculate semi-perimeter s: s = (50 + 78 + 112) / 2 = 240 / 2 = 120 m.',
          'Step 2: Calculate differences: (s - a) = 120 - 50 = 70; (s - b) = 120 - 78 = 42; (s - c) = 120 - 112 = 8.',
          'Step 3: Substitute into Heron\'s formula: A = √[120 × 70 × 42 × 8].',
          'Step 4: Factorize for clean square root: 120 = 4 × 30 = 2^3 × 3 × 5; 70 = 2 × 5 × 7; 42 = 2 × 3 × 7; 8 = 2^3.',
          'Step 5: Prime factors: 2^8 × 3^2 × 5^2 × 7^2.',
          'Step 6: Root = 2^4 × 3 × 5 × 7 = 16 × 105 = 1,680 m².'
        ],
        result: 'The area is 1,680 m².'
      },
      {
        title: 'Calculating area of a circle sector',
        description: 'Find the area of a sector of a circle of radius 6 cm with a central angle of 60°. (Take π = 22/7 or 3.1416).',
        steps: [
          'Step 1: Formula for sector area: A = (θ / 360°) × πr².',
          'Step 2: Substitute: A = (60 / 360) × π × 6² = (1/6) × π × 36 = 6π cm².',
          'Step 3: Numerical value: 6 × 3.1416 ≈ 18.85 cm².'
        ],
        result: 'Area of sector is 6π cm² ≈ 18.85 cm².'
      }
    ],
    guidedPractice: {
      question: 'Find the area of an equilateral triangle of side 8 cm using Heron’s formula.',
      hint: 'a = b = c = 8. s = 24/2 = 12. Use √[12(4)(4)(4)].',
      solution: 'A = √[12 × 4³] = √[12 × 64] = √768 = 16√3 ≈ 27.71 cm².'
    },
    independentQuestions: [
      'The sides of a triangle are in the ratio 12 : 17 : 25 and its perimeter is 540 cm. Find its area.',
      'Find the area of a quadrant of a circle whose circumference is 22 cm.',
      'Explain how Brahmagupta\'s formula generalises Heron\'s formula.'
    ],
    chapterQuiz: [
      {
        id: 'q-c9-06-1',
        question: 'In Heron\'s formula A = √[s(s - a)(s - b)(s - c)], what does s represent?',
        options: ['Semi-perimeter: (a + b + c) / 2', 'Total perimeter: a + b + c', 'Side length', 'Surface area'],
        correctIdx: 0,
        ruleOrFormula: 's = \\frac{a + b + c}{2}',
        explanation: 's stands for the semi-perimeter, which is exactly half of the total perimeter of the triangle.',
        commonMistake: 'Using total perimeter without dividing by 2.'
      },
      {
        id: 'q-c9-06-2',
        question: 'What is the area of an equilateral triangle with side length a?',
        options: ['(√3 / 4) a²', '(1 / 2) a²', '(√3 / 2) a²', 'a²'],
        correctIdx: 0,
        ruleOrFormula: 'A = \\frac{\\sqrt{3}}{4} a^2',
        explanation: 'For an equilateral triangle, base = a and height = (√3/2)a. Area = 1/2 × base × height = (√3/4)a².',
        commonMistake: 'Confusing area ((√3/4)a²) with altitude ((√3/2)a).'
      },
      {
        id: 'q-c9-06-3',
        question: 'What fraction of a full circle\'s area is a sector with a 90° central angle?',
        options: ['1/4 (a quadrant)', '1/2', '1/3', '1/6'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{90^\\circ}{360^\\circ} = \\frac{1}{4}',
        explanation: '90° / 360° = 1/4 of the total circle, forming a quadrant.',
        commonMistake: 'Thinking 90° is 1/3.'
      }
    ],
    interactiveToolId: 'tool-c9-area-space',
    relatedActivityLabel: 'Heron Field Surveyor & Circle Sector Studio'
  },
  {
    id: 'c9-07',
    number: 'Chapter 07',
    title: 'The Mathematics of Maybe: Introduction to Probability',
    classLevel: 9,
    unit: 'Probability & Chance',
    description: 'Explore random experiments, sample spaces, outcomes, empirical (experimental) probability, theoretical probability, Law of Large Numbers, and impossible/certain events.',
    learningObjectives: [
      'Define sample space S and elementary events for random trials (coins, dice, cards)',
      'Calculate theoretical probability: P(E) = (Favorable outcomes) / (Total possible outcomes)',
      'Understand the probability scale: 0 ≤ P(E) ≤ 1, impossible event P(∅)=0, certain event P(S)=1',
      'Contrast empirical frequency with theoretical expectation (Law of Large Numbers)'
    ],
    formula: 'P(E) = \\frac{n(E)}{n(S)}, \\quad 0 \\le P(E) \\le 1, \\quad P(E) + P(\\bar{E}) = 1',
    simpleExplanation: 'Probability is the mathematics of chance! When you flip a fair coin, there are 2 equally likely outcomes: Heads or Tails. So the probability of getting Heads is 1 out of 2, or 1/2 (50%). If something is impossible, its probability is 0; if it is absolutely certain, its probability is 1.',
    detailedExplanation: 'A random experiment has well-defined outcomes that cannot be predicted with certainty in advance. The sample space S is the set of all possible outcomes. For equally likely outcomes, the classical probability of event E is P(E) = n(E) / n(S). Properties: (1) 0 ≤ P(E) ≤ 1; (2) P(Certain Event) = 1; (3) P(Impossible Event) = 0; (4) Complementary rule: P(E) + P(not E) = 1. By the Law of Large Numbers, as the number of trials approaches infinity, the relative empirical frequency approaches theoretical probability.',
    advancedReasoning: 'Kolmogorov\'s Axiomatic Foundation: Modern probability defines probability as a measure P: ℱ -> [0, 1] on a σ-algebra of events satisfying countable additivity for disjoint events: P(∪ Eᵢ) = Σ P(Eᵢ). This formalization avoids paradoxes of classical equiprobability and accommodates continuous distributions.',
    workedExamples: [
      {
        title: 'Probability of rolling a prime number on a fair standard 6-sided die',
        description: 'A fair die is rolled once. Find the probability of getting a prime number.',
        steps: [
          'Step 1: Write sample space S: S = {1, 2, 3, 4, 5, 6}. Total outcomes n(S) = 6.',
          'Step 2: Identify prime numbers in S: Primes are {2, 3, 5} (Note: 1 is not prime).',
          'Step 3: Count favorable outcomes: n(E) = 3.',
          'Step 4: Compute probability: P(Prime) = n(E) / n(S) = 3 / 6 = 1/2 (0.5 or 50%).'
        ],
        result: 'P(Prime) = 1/2.'
      },
      {
        title: 'Two coins tossed simultaneously',
        description: 'Two coins are tossed together. Find the probability of getting at least one head.',
        steps: [
          'Step 1: Sample space S = {HH, HT, TH, TT}. Total outcomes n(S) = 4.',
          'Step 2: "At least one head" means 1 or 2 heads: E = {HH, HT, TH}.',
          'Step 3: Favorable outcomes n(E) = 3.',
          'Step 4: Alternative method using complement: P(at least 1 H) = 1 - P(no H) = 1 - P(TT) = 1 - 1/4 = 3/4.'
        ],
        result: 'P(at least one head) = 3/4.'
      }
    ],
    guidedPractice: {
      question: 'A card is drawn from a well-shuffled standard pack of 52 playing cards. Find the probability of drawing an Ace.',
      hint: 'There are 4 Aces (Spades, Hearts, Diamonds, Clubs) in a standard deck of 52 cards.',
      solution: 'P(Ace) = 4 / 52 = 1 / 13.'
    },
    independentQuestions: [
      'A bag contains 5 red balls, 8 white balls, and 4 green balls. Find the probability of drawing a ball that is not green.',
      'If P(E) = 0.05, what is the probability of "not E"?',
      'Explain the difference between experimental probability and theoretical probability.'
    ],
    chapterQuiz: [
      {
        id: 'q-c9-07-1',
        question: 'Which of the following CANNOT be the probability of an event?',
        options: ['-1.5', '2/3', '15%', '0.7'],
        correctIdx: 0,
        ruleOrFormula: '0 \\le P(E) \\le 1',
        explanation: 'Probability is strictly bounded between 0 and 1 (0% to 100%). A negative number (-1.5) cannot be a probability.',
        commonMistake: 'Thinking 15% is invalid (15% = 0.15, which is valid).'
      },
      {
        id: 'q-c9-07-2',
        question: 'What is the sum of probabilities of all elementary events of an experiment?',
        options: ['1', '0', 'Depends on number of events', '100'],
        correctIdx: 0,
        ruleOrFormula: '\\sum_{i} P(E_i) = P(S) = 1',
        explanation: 'The sum of probabilities across all mutually exclusive elementary outcomes in a sample space is always exactly 1.',
        commonMistake: 'Selecting 100 (100 is percent, but probability is expressed as 1).'
      },
      {
        id: 'q-c9-07-3',
        question: 'If a coin is tossed 1000 times and heads occurs 455 times, what is the empirical probability of getting heads?',
        options: ['0.455', '0.500', '0.545', '455'],
        correctIdx: 0,
        ruleOrFormula: 'P_{\\text{empirical}} = \\frac{455}{1000} = 0.455',
        explanation: 'Empirical probability is the observed frequency divided by total trials: 455 / 1000 = 0.455.',
        commonMistake: 'Assuming theoretical 0.5 must override the actual experimental data.'
      }
    ],
    interactiveToolId: 'tool-c9-probability',
    relatedActivityLabel: 'Monte Carlo Probability & Chance Simulator'
  },
  {
    id: 'c9-08',
    number: 'Chapter 08',
    title: 'Predicting What Comes Next: Exploring Sequences and Progressions',
    classLevel: 9,
    unit: 'Sequences & Patterns',
    description: 'Explore recursive definitions, arithmetic progressions (AP), common difference d, nth term formula a_n = a + (n-1)d, summation of progressions S_n, geometric sequences, and real-world predictive modeling.',
    learningObjectives: [
      'Define a sequence formally as a function from natural numbers to real numbers',
      'Identify Arithmetic Progressions (AP) with constant common difference d',
      'Derive and calculate the nth term: a_n = a + (n - 1)d',
      'Derive and compute sum of the first n terms: S_n = n/2 [2a + (n - 1)d] = n/2 (a + l)'
    ],
    formula: 'a_n = a + (n - 1)d, \\quad S_n = \\frac{n}{2}\\left[2a + (n - 1)d\\right] = \\frac{n}{2}(a + l)',
    simpleExplanation: 'An Arithmetic Progression (AP) is a ladder of numbers where each step goes up or down by the exact same amount! For example: 5, 8, 11, 14, ... goes up by 3 every time. Using a simple formula, you can predict what the 1,000th number on the ladder will be without counting every step!',
    detailedExplanation: 'An Arithmetic Progression is a sequence a₁, a₂, a₃, ... where a_{k+1} - a_k = d (constant common difference). The general nth term is a_n = a + (n - 1)d, where a is the first term. Gauss\'s pairing method derives the sum of the first n terms: by writing the series forwards and backwards and adding corresponding terms, each pair sums to (a + l), where l is the last term. Since there are n pairs: 2S_n = n(a + l), yielding S_n = n/2 (a + l) = n/2 [2a + (n - 1)d].',
    advancedReasoning: 'Discrete calculus of finite differences: The difference operator Δa_n = a_{n+1} - a_n acts as the discrete analog of the derivative d/dx. An arithmetic progression has Δa_n = d (constant first difference), corresponding to linear functions f(x) = dx + c. Quadratic sequences have constant second difference Δ²a_n = 2a, linking discrete sequences to polynomial calculus.',
    workedExamples: [
      {
        title: 'Finding the 30th term of an arithmetic progression',
        description: 'Find the 30th term of the AP: 10, 7, 4, 1, -2, ...',
        steps: [
          'Step 1: First term a = 10.',
          'Step 2: Common difference d = a₂ - a₁ = 7 - 10 = -3.',
          'Step 3: Formula for nth term: a_n = a + (n - 1)d.',
          'Step 4: For n = 30: a_30 = 10 + (30 - 1)(-3) = 10 + 29(-3).',
          'Step 5: 29 × (-3) = -87. Thus a_30 = 10 - 87 = -77.'
        ],
        result: 'The 30th term is -77.'
      },
      {
        title: 'Summing the first 20 natural numbers using Gauss’s formula',
        description: 'Find the sum of the first 20 terms of the AP: 2, 5, 8, 11, ...',
        steps: [
          'Step 1: Identify parameters: a = 2, d = 3, n = 20.',
          'Step 2: Formula: S_n = n/2 [2a + (n - 1)d].',
          'Step 3: Substitute: S_20 = (20 / 2) [2(2) + (20 - 1) × 3].',
          'Step 4: Inside brackets: 4 + 19 × 3 = 4 + 57 = 61.',
          'Step 5: Multiply: 10 × 61 = 610.'
        ],
        result: 'S_20 = 610.'
      }
    ],
    guidedPractice: {
      question: 'Which term of the AP: 3, 8, 13, 18, ... is 78?',
      hint: 'Set a_n = 78 with a = 3 and d = 5. Solve for n.',
      solution: '3 + (n - 1) × 5 = 78 => 5(n - 1) = 75 => n - 1 = 15 => n = 16. The 16th term is 78.'
    },
    independentQuestions: [
      'Find the sum of all two-digit odd positive integers.',
      'If the 3rd and 9th terms of an AP are 4 and -8 respectively, which term of this AP is zero?',
      'Investigate the Fibonacci sequence 1, 1, 2, 3, 5, 8, ... and explain why it is NOT an Arithmetic Progression.'
    ],
    chapterQuiz: [
      {
        id: 'q-c9-08-1',
        question: 'What is the common difference d in the AP: -5, -1, 3, 7, ...?',
        options: ['4', '-4', '6', '-6'],
        correctIdx: 0,
        ruleOrFormula: 'd = a_2 - a_1 = -1 - (-5) = -1 + 5 = 4',
        explanation: 'Subtract the first term from the second: -1 - (-5) = -1 + 5 = 4.',
        commonMistake: 'Calculating -5 - (-1) = -4 by reversing subtraction order.'
      },
      {
        id: 'q-c9-08-2',
        question: 'What is the sum of the first 100 positive integers (1 + 2 + ... + 100)?',
        options: ['5,050', '5,000', '10,100', '5,100'],
        correctIdx: 0,
        ruleOrFormula: 'S = \\frac{n(n + 1)}{2} = \\frac{100 \\times 101}{2} = 5050',
        explanation: 'By Gauss\'s sum formula: 100 × 101 / 2 = 50 × 101 = 5,050.',
        commonMistake: 'Multiplying 100 × 50 = 5,000.'
      },
      {
        id: 'q-c9-08-3',
        question: 'If the nth term of a sequence is 3n + 2, is this sequence an Arithmetic Progression?',
        options: ['Yes, with first term 5 and common difference 3', 'Yes, with common difference 2', 'No, it is non-linear', 'Cannot be determined'],
        correctIdx: 0,
        ruleOrFormula: 'a_n = 3n + 2 \\implies d = a_{n+1} - a_n = 3',
        explanation: 'For n = 1, 2, 3: terms are 5, 8, 11... The difference between consecutive terms is constant (3), so it is an AP with a = 5 and d = 3.',
        commonMistake: 'Thinking the common difference is 2 because 2 is the constant term.'
      }
    ],
    interactiveToolId: 'tool-c9-sequences',
    relatedActivityLabel: 'Arithmetic & Geometric Sequence Pattern Predictor'
  }
];
