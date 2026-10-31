/**
 * Middle School (Classes 6–8) and Pre-Secondary (Class 9) Mathematics Curriculum
 * Pure class-based learning progression with authentic mathematical concepts,
 * step-by-step examples, guided practice, independent problems, and interactive quizzes.
 */

export interface MiddleChapter {
  id: string;
  number: string;
  title: string;
  classLevel: 'classes6-8' | 'class9';
  unit: string;
  description: string;
  formula: string;
  targetStageId: string;
  actionLabel: string;
  conceptExplanation: string;
  illustratedExample: {
    title: string;
    description: string;
    steps: string[];
    result: string;
  };
  guidedPractice: {
    question: string;
    hint: string;
    solution: string;
  };
  independentQuestions: string[];
  chapterQuiz: {
    id: string;
    question: string;
    options: string[];
    correctIdx: number;
    ruleOrFormula: string;
    explanation: string;
    commonMistake: string;
  }[];
}

export const MIDDLE_SCHOOL_CHAPTERS: MiddleChapter[] = [
  // ================= CLASSES 6–8: MATHEMATICS EXPLORER =================
  {
    id: 'm68-01',
    number: 'Chapter 01',
    title: 'Integers & Number Line Operations',
    classLevel: 'classes6-8',
    unit: 'Number Systems',
    description: 'Positive and negative numbers, additive inverses, absolute value, and rules for integer addition, subtraction, multiplication, and division.',
    formula: 'a - (-b) = a + b, \\quad (-a) \\times (-b) = ab',
    targetStageId: 'stage-04',
    actionLabel: 'Open Arithmetic Solver',
    conceptExplanation: 'Integers extend whole numbers to include negative values. On the horizontal number line, zero is the reference origin, positive integers lie to the right, and negative integers lie to the left. Moving right corresponds to addition, while moving left corresponds to subtraction.',
    illustratedExample: {
      title: 'Evaluating temperatures below freezing',
      description: 'The temperature in the evening was 4°C. Overnight it dropped by 9°C. What is the new temperature?',
      steps: [
        'Step 1: Start at +4 on the integer number line.',
        'Step 2: A temperature drop corresponds to subtracting 9: 4 - 9.',
        'Step 3: Rewriting as 4 + (-9) gives a net distance of 5 units to the left of 0.',
      ],
      result: 'The final temperature is -5°C.',
    },
    guidedPractice: {
      question: 'Calculate: (-15) + (-8) - (-12).',
      hint: 'Remember that subtracting a negative number is equivalent to adding its positive opposite: - (-12) = +12.',
      solution: '(-15) + (-8) = -23. Then -23 + 12 = -11.',
    },
    independentQuestions: [
      'Find the additive inverse of -47.',
      'A submarine is 250 meters below sea level (-250 m) and rises 90 meters. What is its new depth?',
      'Is the product of three negative integers always positive or negative? Explain why.',
    ],
    chapterQuiz: [
      {
        id: 'q-m68-1-1',
        question: 'What is the value of (-6) × (-7)?',
        options: ['-42', '+42', '-13', '+13'],
        correctIdx: 1,
        ruleOrFormula: 'Negative × Negative = Positive.',
        explanation: 'The product of two negative numbers is always positive: (-6) × (-7) = 42.',
        commonMistake: 'Thinking two negatives produce a negative answer.',
      },
      {
        id: 'q-m68-1-2',
        question: 'Which of the following is the additive inverse of 19?',
        options: ['1/19', '-19', '0', '19'],
        correctIdx: 1,
        ruleOrFormula: 'a + (-a) = 0.',
        explanation: 'The additive inverse of a number is the value that yields zero when added to it: 19 + (-19) = 0.',
        commonMistake: 'Confusing additive inverse (-a) with multiplicative inverse (1/a).',
      },
      {
        id: 'q-m68-1-3',
        question: 'Evaluate: 14 - (-8).',
        options: ['6', '-6', '22', '-22'],
        correctIdx: 2,
        ruleOrFormula: 'a - (-b) = a + b.',
        explanation: 'Subtracting negative 8 is the same as adding positive 8: 14 + 8 = 22.',
        commonMistake: 'Subtracting 8 from 14 to get 6.',
      },
    ],
  },
  {
    id: 'm68-02',
    number: 'Chapter 02',
    title: 'Fractions, Decimals & Rational Numbers',
    classLevel: 'classes6-8',
    unit: 'Rational Arithmetic',
    description: 'Representation of rational numbers p/q (q ≠ 0), finding LCM for unlike fractions, decimal conversions, and order of operations.',
    formula: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}, \\quad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}',
    targetStageId: 'stage-07',
    actionLabel: 'Open Fraction Compendium',
    conceptExplanation: 'A rational number is any number that can be expressed as a quotient or fraction p/q of two integers, with denominator q not equal to zero. All terminating and repeating decimals are rational numbers.',
    illustratedExample: {
      title: 'Adding fractions with different denominators',
      description: 'Calculate 3/4 + 2/5.',
      steps: [
        'Step 1: Find the Least Common Multiple (LCM) of denominators 4 and 5, which is 20.',
        'Step 2: Convert both fractions to equivalent forms with denominator 20: 3/4 = 15/20 and 2/5 = 8/20.',
        'Step 3: Add the numerators over the common denominator: (15 + 8) / 20 = 23/20.',
      ],
      result: 'The sum is 23/20 or 1 3/20.',
    },
    guidedPractice: {
      question: 'Evaluate (5/6) ÷ (2/3) in simplest fractional form.',
      hint: 'To divide by a fraction, multiply by its reciprocal: (a/b) ÷ (c/d) = (a/b) × (d/c).',
      solution: '(5/6) × (3/2) = 15/12 = 5/4 = 1 1/4.',
    },
    independentQuestions: [
      'Convert 7/8 into a decimal using long division.',
      'Find three rational numbers between 1/3 and 1/2.',
      'A recipe calls for 2 1/4 cups of flour. If you want to make half the recipe, how much flour do you need?',
    ],
    chapterQuiz: [
      {
        id: 'q-m68-2-1',
        question: 'What is the reciprocal of -3/7?',
        options: ['3/7', '-7/3', '7/3', '-1'],
        correctIdx: 1,
        ruleOrFormula: 'Reciprocal of p/q is q/p.',
        explanation: 'Inverting the numerator and denominator keeps the sign: reciprocal is -7/3.',
        commonMistake: 'Changing the sign to positive when finding a reciprocal.',
      },
      {
        id: 'q-m68-2-2',
        question: 'Which of the following is equivalent to 0.375?',
        options: ['3/8', '3/7', '7/16', '1/4'],
        correctIdx: 0,
        ruleOrFormula: '0.375 = 375/1000 = 3/8.',
        explanation: 'Dividing 3 by 8 gives exactly 0.375.',
        commonMistake: 'Confusing 0.375 with 3/7.',
      },
      {
        id: 'q-m68-2-3',
        question: 'Compute: 2/3 × 9/10.',
        options: ['18/30 = 3/5', '11/13', '20/27', '5/6'],
        correctIdx: 0,
        ruleOrFormula: '(a/b) × (c/d) = (ac)/(bd).',
        explanation: '2/3 × 9/10 = (2 × 9) / (3 × 10) = 18/30 = 3/5.',
        commonMistake: 'Cross-multiplying instead of multiplying across numerators and denominators.',
      },
    ],
  },
  {
    id: 'm68-03',
    number: 'Chapter 03',
    title: 'Linear Equations in One Variable',
    classLevel: 'classes6-8',
    unit: 'Algebraic Foundations',
    description: 'Setting up algebraic equations from word problems, balancing equations, transposition method, and solving ax + b = cx + d.',
    formula: 'ax + b = c \\implies x = \\frac{c - b}{a}',
    targetStageId: 'stage-04',
    actionLabel: 'Open Linear Solver',
    conceptExplanation: 'An algebraic equation is a statement of equality involving one or more variables. Solving an equation means finding the value of the variable that satisfies the equation by performing identical operations on both sides to isolate the unknown.',
    illustratedExample: {
      title: 'Solving a two-step linear equation',
      description: 'Solve for x: 3x - 7 = 14.',
      steps: [
        'Step 1: Add 7 to both sides to isolate the variable term: 3x - 7 + 7 = 14 + 7.',
        'Step 2: Simplify both sides: 3x = 21.',
        'Step 3: Divide both sides by 3: x = 21 / 3 = 7.',
        'Step 4: Check by substitution: 3(7) - 7 = 21 - 7 = 14 (Verified).',
      ],
      result: 'The solution is x = 7.',
    },
    guidedPractice: {
      question: 'Solve for y: 5y + 3 = 2y + 18.',
      hint: 'Transpose the variable terms to the left side and constant terms to the right side.',
      solution: '5y - 2y = 18 - 3 => 3y = 15 => y = 5.',
    },
    independentQuestions: [
      'The sum of three consecutive integers is 72. Find the three integers.',
      'A rectangular field has length 4 meters more than its width. If the perimeter is 48 meters, find the dimensions.',
      'Solve: (2x + 1) / 3 = 5.',
    ],
    chapterQuiz: [
      {
        id: 'q-m68-3-1',
        question: 'Solve for x: 4x + 9 = 25.',
        options: ['x = 4', 'x = 6', 'x = 8', 'x = 3.5'],
        correctIdx: 0,
        ruleOrFormula: '4x = 25 - 9 = 16 => x = 4.',
        explanation: 'Subtracting 9 gives 4x = 16. Dividing by 4 gives x = 4.',
        commonMistake: 'Adding 9 to 25 instead of subtracting.',
      },
      {
        id: 'q-m68-3-2',
        question: 'If twice a number plus 5 equals 21, what is the number?',
        options: ['6', '8', '10', '13'],
        correctIdx: 1,
        ruleOrFormula: '2n + 5 = 21 => 2n = 16 => n = 8.',
        explanation: '2n = 21 - 5 = 16, so n = 16 / 2 = 8.',
        commonMistake: 'Dividing 21 by 2 directly before subtracting 5.',
      },
      {
        id: 'q-m68-3-3',
        question: 'Which operation correctly isolates x in x / 4 = 12?',
        options: ['Divide both sides by 4', 'Multiply both sides by 4', 'Subtract 4 from both sides', 'Add 4 to both sides'],
        correctIdx: 1,
        ruleOrFormula: 'Inverse of division is multiplication.',
        explanation: 'Multiplying both sides by 4 gives (x / 4) × 4 = 12 × 4 => x = 48.',
        commonMistake: 'Dividing 12 by 4 to get 3.',
      },
    ],
  },
  {
    id: 'm68-04',
    number: 'Chapter 04',
    title: 'Ratio, Proportion & Percentage Applications',
    classLevel: 'classes6-8',
    unit: 'Commercial Arithmetic',
    description: 'Comparing quantities, unitary method, direct and inverse proportions, percentage increase/decrease, profit, loss, and simple interest.',
    formula: '\\text{SI} = \\frac{P \\times R \\times T}{100}, \\quad \\text{Percentage} = \\frac{\\text{Part}}{\\text{Whole}} \\times 100\\%',
    targetStageId: 'stage-06',
    actionLabel: 'Open Financial & Ratio Tools',
    conceptExplanation: 'A ratio compares two quantities of the same kind by division. An equality of two ratios is called a proportion (a:b = c:d). Percentages express fractions with a denominator of 100, widely used in financial calculations, markups, and discounts.',
    illustratedExample: {
      title: 'Calculating Simple Interest on savings',
      description: 'Calculate the Simple Interest on principal P = ₹5,000 invested at rate R = 6% per annum for T = 3 years.',
      steps: [
        'Step 1: Write the formula: SI = (P × R × T) / 100.',
        'Step 2: Substitute values: SI = (5000 × 6 × 3) / 100.',
        'Step 3: Simplify: (5000 × 18) / 100 = 50 × 18 = 900.',
      ],
      result: 'The simple interest earned is ₹900 (Total amount = ₹5,900).',
    },
    guidedPractice: {
      question: 'A shopkeeper bought an item for ₹400 and sold it for ₹480. What is the profit percentage?',
      hint: 'Profit = Selling Price - Cost Price. Profit % = (Profit / Cost Price) × 100%.',
      solution: 'Profit = ₹480 - ₹400 = ₹80. Profit % = (80 / 400) × 100% = 20%.',
    },
    independentQuestions: [
      'If 8 pens cost ₹96, what is the cost of 15 pens?',
      'A school has 480 girls and 320 boys. Find the ratio of girls to total students.',
      'Find the principal that yields ₹1,200 interest in 4 years at 5% simple interest per annum.',
    ],
    chapterQuiz: [
      {
        id: 'q-m68-4-1',
        question: 'What is 35% of 200?',
        options: ['50', '70', '65', '80'],
        correctIdx: 1,
        ruleOrFormula: '35% × 200 = (35/100) × 200 = 70.',
        explanation: '35/100 × 200 = 35 × 2 = 70.',
        commonMistake: 'Confusing 35% with 0.35 / 200.',
      },
      {
        id: 'q-m68-4-2',
        question: 'If a:b = 2:3 and b:c = 3:5, what is a:c?',
        options: ['2:5', '5:2', '6:15', '2:3'],
        correctIdx: 0,
        ruleOrFormula: 'Common term b is already equal (3), so a:b:c = 2:3:5 => a:c = 2:5.',
        explanation: 'Since the middle term b is identical in both ratios, a:c = 2:5.',
        commonMistake: 'Multiplying the ratios incorrectly.',
      },
      {
        id: 'q-m68-4-3',
        question: 'Calculate the Simple Interest on ₹2,000 at 5% per annum for 2 years.',
        options: ['₹100', '₹200', '₹400', '₹2,200'],
        correctIdx: 1,
        ruleOrFormula: 'SI = (P × R × T) / 100 = (2000 × 5 × 2) / 100 = 200.',
        explanation: '(2000 × 10) / 100 = 200.',
        commonMistake: 'Giving the total maturity amount (₹2,200) instead of the interest alone.',
      },
    ],
  },

  // ================= CLASS 9: PRE-SECONDARY MATHEMATICS =================
  {
    id: 'c9-01',
    number: 'Chapter 01',
    title: 'Number Systems & Irrational Numbers',
    classLevel: 'class9',
    unit: 'Real Numbers',
    description: 'Representation of real numbers on the number line, existence of irrational numbers like √2, √3, decimal expansion types, and rationalizing denominators.',
    formula: '\\frac{1}{\\sqrt{a} + \\sqrt{b}} = \\frac{\\sqrt{a} - \\sqrt{b}}{a - b}, \\quad a^{p} \\cdot a^{q} = a^{p+q}',
    targetStageId: 'stage-07',
    actionLabel: 'Open Real Number Tools',
    conceptExplanation: 'Real numbers comprise rational and irrational numbers. Rational numbers possess terminating or non-terminating recurring decimal expansions, while irrational numbers have non-terminating non-recurring expansions. To eliminate radicals from a denominator, we multiply by the conjugate radical expression.',
    illustratedExample: {
      title: 'Rationalizing the denominator of a surd',
      description: 'Rationalize the denominator of 1 / (√5 + √2).',
      steps: [
        'Step 1: Identify the conjugate of (√5 + √2), which is (√5 - √2).',
        'Step 2: Multiply both numerator and denominator by (√5 - √2).',
        'Step 3: Apply the difference of squares identity (a+b)(a-b) = a² - b² in denominator: (√5)² - (√2)² = 5 - 2 = 3.',
      ],
      result: 'The rationalized expression is (√5 - √2) / 3.',
    },
    guidedPractice: {
      question: 'Simplify: (3 + √3)(3 - √3).',
      hint: 'Use the algebraic identity (a + b)(a - b) = a² - b².',
      solution: '(3)² - (√3)² = 9 - 3 = 6.',
    },
    independentQuestions: [
      'Locate √2 on the number line using a right-angled triangle with legs of length 1 unit.',
      'Express 0.2353535... in p/q rational form.',
      'Simplify: 16^(3/4).',
    ],
    chapterQuiz: [
      {
        id: 'q-c9-1-1',
        question: 'Which of the following numbers is an irrational number?',
        options: ['√4', '0.333...', '√7', '22/7'],
        correctIdx: 2,
        ruleOrFormula: 'Square root of a non-square positive integer is irrational.',
        explanation: '7 is not a perfect square, so √7 has a non-terminating, non-recurring decimal expansion and cannot be written as p/q.',
        commonMistake: 'Thinking √4 is irrational (√4 = 2, which is rational).',
      },
      {
        id: 'q-c9-1-2',
        question: 'What is the value of 64^(1/3)?',
        options: ['4', '8', '16', '2'],
        correctIdx: 0,
        ruleOrFormula: '4 × 4 × 4 = 64 => 64^(1/3) = 4.',
        explanation: 'The cube root of 64 is 4 because 4³ = 64.',
        commonMistake: 'Taking the square root (8) instead of cube root.',
      },
      {
        id: 'q-c9-1-3',
        question: 'What is the conjugate used to rationalize 1 / (3 - √2)?',
        options: ['3 - √2', '3 + √2', '-3 - √2', '√2 - 3'],
        correctIdx: 1,
        ruleOrFormula: 'Conjugate of (a - √b) is (a + √b).',
        explanation: 'Multiplying by (3 + √2) uses the difference of squares identity (3)² - (√2)² = 9 - 2 = 7.',
        commonMistake: 'Negating both terms instead of only the radical term.',
      },
    ],
  },
  {
    id: 'c9-02',
    number: 'Chapter 02',
    title: 'Polynomials & Algebraic Identities',
    classLevel: 'class9',
    unit: 'Algebra',
    description: 'Polynomials in one variable, degree of polynomial, zeroes, Remainder Theorem, Factor Theorem, and factorization using standard 8 algebraic identities.',
    formula: '(x+y+z)^2 = x^2+y^2+z^2+2(xy+yz+zx), \\quad x^3+y^3 = (x+y)(x^2-xy+y^2)',
    targetStageId: 'stage-04',
    actionLabel: 'Open Polynomial Solver',
    conceptExplanation: 'A polynomial is an algebraic expression composed of variables and coefficients with non-negative integer exponents. The Factor Theorem states that (x - a) is a factor of polynomial P(x) if and only if P(a) = 0.',
    illustratedExample: {
      title: 'Factoring a quadratic polynomial by splitting the middle term',
      description: 'Factorize: x² + 7x + 12.',
      steps: [
        'Step 1: We look for two integers p and q such that p + q = 7 and p × q = 12.',
        'Step 2: The factor pairs of 12 are (1, 12), (2, 6), (3, 4). Notice 3 + 4 = 7.',
        'Step 3: Split the middle term: x² + 3x + 4x + 12.',
        'Step 4: Group terms: x(x + 3) + 4(x + 3) = (x + 3)(x + 4).',
      ],
      result: 'The factors are (x + 3)(x + 4).',
    },
    guidedPractice: {
      question: 'Find the zero of the polynomial P(x) = 3x - 15.',
      hint: 'Set P(x) = 0 and solve for x.',
      solution: '3x - 15 = 0 => 3x = 15 => x = 5.',
    },
    independentQuestions: [
      'Evaluate 103 × 107 without multiplying directly, using identity (x + a)(x + b).',
      'Verify whether x = -1 is a zero of P(x) = 2x³ - 3x² + 5x + 10.',
      'Expand: (2x - y + z)²',
    ],
    chapterQuiz: [
      {
        id: 'q-c9-2-1',
        question: 'What is the degree of the polynomial P(x) = 5x⁴ - 3x² + 7x + 1?',
        options: ['1', '2', '4', '5'],
        correctIdx: 2,
        ruleOrFormula: 'Degree is the highest power of the variable in the polynomial.',
        explanation: 'The highest exponent of x is 4, so the degree is 4.',
        commonMistake: 'Taking the leading coefficient 5 instead of the exponent 4.',
      },
      {
        id: 'q-c9-2-2',
        question: 'If P(2) = 0 for polynomial P(x), which of the following is a factor of P(x)?',
        options: ['(x + 2)', '(x - 2)', '(2x - 1)', '(x² - 4)'],
        correctIdx: 1,
        ruleOrFormula: 'Factor Theorem: If P(a) = 0, then (x - a) is a factor.',
        explanation: 'Because substituting 2 yields 0, (x - 2) must divide P(x) evenly.',
        commonMistake: 'Using (x + 2) instead of (x - 2).',
      },
      {
        id: 'q-c9-2-3',
        question: 'What is the expansion of (a - b)³?',
        options: ['a³ - b³', 'a³ - 3a²b + 3ab² - b³', 'a³ + 3a²b - 3ab² - b³', 'a³ - 3ab - b³'],
        correctIdx: 1,
        ruleOrFormula: '(a - b)³ = a³ - 3a²b + 3ab² - b³.',
        explanation: 'The cubic binomial expansion alternates signs in coefficients: +1, -3, +3, -1.',
        commonMistake: 'Thinking (a - b)³ equals simply a³ - b³ without the cross-product terms.',
      },
    ],
  },
  {
    id: 'c9-03',
    number: 'Chapter 03',
    title: 'Coordinate Geometry & Cartesian Plane',
    classLevel: 'class9',
    unit: 'Coordinate Geometry',
    description: 'Cartesian coordinate system, origin (0, 0), x-axis (abscissa), y-axis (ordinate), four quadrants, and plotting ordered pairs (x, y).',
    formula: 'P(x, y) \\in \\text{Quadrant I } (+, +), \\quad \\text{II } (-, +), \\quad \\text{III } (-, -), \\quad \\text{IV } (+, -)',
    targetStageId: 'stage-02',
    actionLabel: 'Open Cartesian Grapher',
    conceptExplanation: 'To locate a point on a plane, René Descartes established the Cartesian coordinate system consisting of two perpendicular lines: the horizontal X-axis and vertical Y-axis intersecting at the origin (0, 0). Any point is uniquely identified by the ordered pair (x, y).',
    illustratedExample: {
      title: 'Determining the quadrant of coordinates',
      description: 'Identify the location and quadrant of point A(-3, 4) and point B(5, -2).',
      steps: [
        'Step 1: Point A(-3, 4) has negative x-coordinate and positive y-coordinate.',
        'Step 2: Negative x and positive y corresponds to Quadrant II.',
        'Step 3: Point B(5, -2) has positive x-coordinate and negative y-coordinate.',
        'Step 4: Positive x and negative y corresponds to Quadrant IV.',
      ],
      result: 'Point A lies in Quadrant II; Point B lies in Quadrant IV.',
    },
    guidedPractice: {
      question: 'What are the coordinates of a point lying on the Y-axis at a distance of 6 units below the origin?',
      hint: 'Any point on the Y-axis has an x-coordinate of 0. Distance below the origin means negative y.',
      solution: 'The coordinates are (0, -6).',
    },
    independentQuestions: [
      'Plot the vertices of a rectangle: A(1, 1), B(5, 1), C(5, 4), D(1, 4) and compute its area.',
      'Which axis does the point (0, -8) lie on?',
      'In which quadrant do points with negative abscissa and negative ordinate lie?',
    ],
    chapterQuiz: [
      {
        id: 'q-c9-3-1',
        question: 'What is the abscissa of the point (-5, 8)?',
        options: ['8', '-5', '3', '13'],
        correctIdx: 1,
        ruleOrFormula: 'Abscissa = x-coordinate; Ordinate = y-coordinate.',
        explanation: 'In the ordered pair (x, y), the x-value is called the abscissa, which is -5.',
        commonMistake: 'Confusing abscissa (x) with ordinate (y).',
      },
      {
        id: 'q-c9-3-2',
        question: 'In which quadrant does the point (-4, -7) lie?',
        options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
        correctIdx: 2,
        ruleOrFormula: 'Quadrant III has x < 0 and y < 0.',
        explanation: 'Both coordinates are negative, so the point lies in Quadrant III.',
        commonMistake: 'Confusing Quadrant II (-, +) with Quadrant III (-, -).',
      },
      {
        id: 'q-c9-3-3',
        question: 'Where does any point of the form (x, 0) lie?',
        options: ['On the X-axis', 'On the Y-axis', 'In Quadrant I', 'At the origin only'],
        correctIdx: 0,
        ruleOrFormula: 'The equation of the X-axis is y = 0.',
        explanation: 'When the y-coordinate is 0, the point lies directly on the horizontal X-axis.',
        commonMistake: 'Saying Y-axis because y is mentioned.',
      },
    ],
  },
  {
    id: 'c9-04',
    number: 'Chapter 04',
    title: 'Lines, Angles & Geometric Triangles',
    classLevel: 'class9',
    unit: 'Geometry',
    description: 'Complementary & supplementary angles, linear pairs, vertically opposite angles, parallel lines with transversals, and triangle congruence criteria (SAS, ASA, AAS, SSS, RHS).',
    formula: '\\angle 1 + \\angle 2 = 180^\\circ \\quad (\\text{Linear Pair}), \\quad \\sum \\angle_{\\triangle} = 180^\\circ',
    targetStageId: 'stage-03',
    actionLabel: 'Open Geometry Engine',
    conceptExplanation: 'When two parallel lines are cut by a transversal, corresponding angles are equal, alternate interior angles are equal, and consecutive interior angles sum to 180°. Two triangles are congruent if they have identical shape and size, verified by standard congruence criteria.',
    illustratedExample: {
      title: 'Finding missing angle in parallel lines',
      description: 'Two parallel lines l and m are intersected by a transversal t. One interior angle is 65°. Find its consecutive co-interior angle.',
      steps: [
        'Step 1: State the geometric theorem: Consecutive interior angles on the same side of a transversal are supplementary.',
        'Step 2: Let the unknown angle be x: 65° + x = 180°.',
        'Step 3: Solve for x: x = 180° - 65° = 115°.',
      ],
      result: 'The consecutive interior angle is 115°.',
    },
    guidedPractice: {
      question: 'In a right triangle, one acute angle measures 34°. Find the measure of the other acute angle.',
      hint: 'The sum of all three angles in any triangle is 180°. Since one angle is 90°, the other two acute angles must sum to 90°.',
      solution: '90° - 34° = 56°.',
    },
    independentQuestions: [
      'Two supplementary angles are in the ratio 4:5. Find the angles.',
      'State the RHS congruence criterion for two right triangles.',
      'Prove that vertically opposite angles formed by two intersecting lines are equal.',
    ],
    chapterQuiz: [
      {
        id: 'q-c9-4-1',
        question: 'If two angles form a linear pair and one angle is 72°, what is the other angle?',
        options: ['18°', '108°', '72°', '288°'],
        correctIdx: 1,
        ruleOrFormula: 'Linear pair angles sum to 180°.',
        explanation: '180° - 72° = 108°.',
        commonMistake: 'Using complementary sum 90° (90 - 72 = 18) instead of 180°.',
      },
      {
        id: 'q-c9-4-2',
        question: 'Which of the following is NOT a valid triangle congruence criterion?',
        options: ['SAS', 'ASA', 'AAA', 'SSS'],
        correctIdx: 2,
        ruleOrFormula: 'AAA proves similarity, not congruence.',
        explanation: 'Two triangles with identical angles can have completely different sizes (scaling), so AAA does not guarantee congruence.',
        commonMistake: 'Believing AAA implies congruent triangles.',
      },
      {
        id: 'q-c9-4-3',
        question: 'What is the sum of interior angles of any triangle?',
        options: ['90°', '180°', '270°', '360°'],
        correctIdx: 1,
        ruleOrFormula: 'Angle sum property of a triangle = 180°.',
        explanation: 'The three interior angles of any Euclidean triangle always sum to 180° (π radians).',
        commonMistake: 'Confusing triangle angle sum (180°) with quadrilateral angle sum (360°).',
      },
    ],
  },
  {
    id: 'c9-05',
    number: 'Chapter 05',
    title: 'Heron’s Formula & Mensuration',
    classLevel: 'class9',
    unit: 'Mensuration',
    description: 'Calculating the area of any triangle using only its three side lengths (a, b, c) without needing the vertical altitude, and applied quad area calculations.',
    formula: 's = \\frac{a+b+c}{2}, \\quad \\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}',
    targetStageId: 'stage-03',
    actionLabel: 'Open Heron Calculator',
    conceptExplanation: 'Heron’s formula, established by Hero of Alexandria, calculates the area of any general scalene triangle using only the lengths of its three sides. We first determine the semi-perimeter s = (a + b + c)/2, and then evaluate the radical product.',
    illustratedExample: {
      title: 'Calculating area of a triangular garden',
      description: 'Find the area of a triangle with side lengths a = 13 cm, b = 14 cm, and c = 15 cm.',
      steps: [
        'Step 1: Calculate semi-perimeter: s = (13 + 14 + 15) / 2 = 42 / 2 = 21 cm.',
        'Step 2: Calculate differences: (s - a) = 21 - 13 = 8; (s - b) = 21 - 14 = 7; (s - c) = 21 - 15 = 6.',
        'Step 3: Multiply under radical: Area = √(21 × 8 × 7 × 6).',
        'Step 4: Factor: √( (3 × 7) × (8) × (7) × (2 × 3) ) = √( 7² × 3² × 16 ) = 7 × 3 × 4 = 84 cm².',
      ],
      result: 'The area of the triangle is 84 cm².',
    },
    guidedPractice: {
      question: 'Find the area of an equilateral triangle with side length 6 cm using Heron’s formula.',
      hint: 'a = b = c = 6 cm. Semi-perimeter s = 18 / 2 = 9 cm.',
      solution: 'Area = √[9 × (9-6) × (9-6) × (9-6)] = √[9 × 3 × 3 × 3] = √243 = 9√3 ≈ 15.59 cm².',
    },
    independentQuestions: [
      'The sides of a triangular plot are in the ratio 3:5:7 and its perimeter is 300 m. Find its area.',
      'Can a triangle have sides 4 cm, 5 cm, and 10 cm? Verify using the triangle inequality.',
      'Calculate the area of an isosceles triangle with base 12 cm and equal sides 10 cm each.',
    ],
    chapterQuiz: [
      {
        id: 'q-c9-5-1',
        question: 'In Heron’s formula, what does s represent?',
        options: ['Sum of all sides (Perimeter)', 'Semi-perimeter (Half of perimeter)', 'Square of hypotenuse', 'Smallest side length'],
        correctIdx: 1,
        ruleOrFormula: 's = (a + b + c) / 2.',
        explanation: 's is the semi-perimeter, calculated as half of the total perimeter.',
        commonMistake: 'Taking s as the full perimeter without dividing by 2.',
      },
      {
        id: 'q-c9-5-2',
        question: 'What is the area of a triangle with sides 3 cm, 4 cm, and 5 cm?',
        options: ['6 cm²', '12 cm²', '15 cm²', '7.5 cm²'],
        correctIdx: 0,
        ruleOrFormula: 'Right triangle: Area = (1/2) × 3 × 4 = 6 cm².',
        explanation: 'Since 3² + 4² = 5², it is a right triangle with area = (1/2) × 3 × 4 = 6 cm².',
        commonMistake: 'Multiplying 3 × 4 to get 12 without dividing by 2.',
      },
      {
        id: 'q-c9-5-3',
        question: 'Under what condition is Heron’s formula valid?',
        options: ['Only for right-angled triangles', 'Only for equilateral triangles', 'For any valid triangle satisfying triangle inequality (a + b > c)', 'Only for isosceles triangles'],
        correctIdx: 2,
        ruleOrFormula: 'Heron’s formula applies universally to all valid Euclidean triangles.',
        explanation: 'Heron’s formula works for scalene, isosceles, equilateral, or right triangles as long as the triangle inequality holds.',
        commonMistake: 'Believing Heron’s formula only works when an altitude is given.',
      },
    ],
  },
];
