/**
 * Class 7 — Intermediate Mathematics Curriculum Data
 * Complete, structured mathematical learning content with 15 chapters:
 *
 * Number systems and arithmetic:
 * 1. Large Numbers Around Us
 * 2. Arithmetic Expressions
 * 3. A Peek Beyond the Point
 * 4. Number Play
 * 5. Operations with Integers
 * 6. Finding Common Ground
 * 7. Another Peek Beyond the Point
 *
 * Algebra:
 * 8. Expressions Using Letter-Numbers
 * 9. Finding the Unknown
 *
 * Geometry:
 * 10. Parallel and Intersecting Lines
 * 11. A Tale of Three Intersecting Lines
 * 12. Geometric Twins
 * 13. Constructions and Tilings
 *
 * Fractions and data:
 * 14. Working with Fractions
 * 15. Connecting the Dots
 */

import { MiddleSchoolChapter } from './class6Data.ts';

export const CLASS_7_CHAPTERS: MiddleSchoolChapter[] = [
  // ================= UNIT: NUMBER SYSTEMS AND ARITHMETIC =================
  {
    id: 'c7-01',
    number: 'Chapter 01',
    title: 'Large Numbers Around Us',
    classLevel: 7,
    unit: 'Number Systems & Arithmetic',
    description: 'Explore astronomical distances, standard scientific form, orders of magnitude, power-of-ten expansions, and comparing massive numbers.',
    learningObjectives: [
      'Represent numbers in scientific standard notation a × 10^k where 1 ≤ a < 10',
      'Compare astronomical distances and microscopic quantities using orders of magnitude',
      'Multiply and divide powers of ten using exponent rules',
      'Estimate real-world vast quantities (population, distances to stars, planetary masses)'
    ],
    formula: 'N = m \\times 10^k \\quad (1 \\le m < 10, \\; k \\in \\mathbb{Z})',
    simpleExplanation: 'Writing out numbers like the distance from the Earth to the Sun (149,600,000 km) takes too many zeroes! In standard form, we write it as 1.496 × 10^8 km. The power of 10 tells you how many places the decimal point jumped.',
    detailedExplanation: 'Scientific standard form writes every positive number as m × 10^k, where m is a decimal with exactly one non-zero digit before the decimal point, and k is an integer exponent. When multiplying powers of 10 with the same base, exponents add (10^a × 10^b = 10^(a+b)). When dividing, exponents subtract (10^a ÷ 10^b = 10^(a-b)).',
    advancedReasoning: 'Orders of magnitude allow rapid logarithmic comparison. If quantity A is 10^8 and quantity B is 10^5, A is 10^(8-5) = 10^3 = 1,000 times larger than B. This logarithmic scale forms the mathematical basis for scientific measurement systems such as the Richter scale and pH scales.',
    workedExamples: [
      {
        title: 'Converting the speed of light to standard scientific form',
        description: 'The speed of light in vacuum is approximately 300,000,000 meters per second. Express this in standard form.',
        steps: [
          'Step 1: Place the decimal point after the first non-zero digit: 3.0.',
          'Step 2: Count the number of places the decimal moved from the end: 8 places.',
          'Step 3: Write as product with 10^8: 3.0 × 10^8 m/s.'
        ],
        result: '3.0 × 10^8 m/s.'
      },
      {
        title: 'Comparing two large quantities',
        description: 'Earth has a mass of 5.97 × 10^24 kg, while the Moon has a mass of 7.35 × 10^22 kg. How many times heavier is the Earth?',
        steps: [
          'Step 1: Divide Earth’s mass by Moon’s mass: (5.97 × 10^24) ÷ (7.35 × 10^22).',
          'Step 2: Separate the coefficients and powers of 10: (5.97 ÷ 7.35) × 10^(24 - 22).',
          'Step 3: 5.97 ÷ 7.35 ≈ 0.8122; 10^(24-22) = 10^2 = 100.',
          'Step 4: Multiply: 0.8122 × 100 ≈ 81.2 times.'
        ],
        result: 'Earth is approximately 81.2 times more massive than the Moon.'
      }
    ],
    guidedPractice: {
      question: 'Express 45,600,000 in standard form.',
      hint: 'Move the decimal point 7 places to the left to place it between 4 and 5.',
      solution: '4.56 × 10^7.'
    },
    independentQuestions: [
      'Write in standard form: 149,600,000; 5,870,000; 93,000,000.',
      'Multiply (2.5 × 10^4) × (4.0 × 10^5) and express the result in standard notation.',
      'The radius of the Earth is 6.37 × 10^6 m. Calculate its circumference using C = 2πr.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-01-1',
        question: 'Which of the following is written in correct scientific standard form?',
        options: ['3.45 × 10^6', '34.5 × 10^5', '0.345 × 10^7', '345 × 10^4'],
        correctIdx: 0,
        ruleOrFormula: '1 \\le m < 10',
        explanation: 'In standard form, the coefficient m must satisfy 1 ≤ m < 10. Only 3.45 meets this condition.',
        commonMistake: 'Accepting 34.5 × 10^5 because it has the same arithmetic value.'
      },
      {
        id: 'q-c7-01-2',
        question: 'What is the value of (10^7 ÷ 10^3)?',
        options: ['10^4', '10^10', '10^21', '10^2'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{10^a}{10^b} = 10^{a - b}',
        explanation: 'When dividing powers with the same base, subtract exponents: 7 - 3 = 4, so 10^4.',
        commonMistake: 'Dividing the exponents: 7 ÷ 3.'
      },
      {
        id: 'q-c7-01-3',
        question: 'What is 8.02 × 10^5 in usual decimal notation?',
        options: ['802,000', '80,200', '8,020,000', '800,200'],
        correctIdx: 0,
        ruleOrFormula: '8.02 \\times 100,000 = 802,000',
        explanation: 'Moving the decimal point 5 places to the right: 8.02 -> 80.2 (1) -> 802 (2) -> 8020 (3) -> 80200 (4) -> 802000 (5).',
        commonMistake: 'Adding 5 zeroes to the end of 802 without accounting for the two decimal places.'
      }
    ],
    interactiveToolId: 'tool-c7-large-numbers',
    relatedActivityLabel: 'Powers of Ten & Scientific Notation Explorer'
  },
  {
    id: 'c7-02',
    number: 'Chapter 02',
    title: 'Arithmetic Expressions',
    classLevel: 7,
    unit: 'Number Systems & Arithmetic',
    description: 'Master order of operations (BODMAS/PEMDAS), brackets handling (round, curly, square), nested evaluation, and algebraic structure of expressions.',
    learningObjectives: [
      'Evaluate multi-operation numerical expressions following strict precedence rules',
      'Resolve nested brackets from innermost () to {} to outer []',
      'Distribute factors over sums and differences correctly',
      'Identify and avoid common precedence pitfalls (subtraction and division associativity)'
    ],
    formula: '\\text{Precedence: Brackets } \\to \\text{Orders/Exponents } \\to \\text{Division/Multiplication } \\to \\text{Addition/Subtraction}',
    simpleExplanation: 'In math, we do operations in a strict order: Brackets first, then Powers, then Multiplication and Division (from left to right), and finally Addition and Subtraction. For example, in 3 + 4 × 2, you multiply first (4 × 2 = 8) and then add 3 to get 11, NOT 14!',
    detailedExplanation: 'Ambiguity in arithmetic is eliminated by operator precedence conventions (BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction). Multiplication and division hold equal precedence and are evaluated strictly from left to right. Similarly, addition and subtraction hold equal precedence and evaluate left to right. When brackets are nested within brackets: [a + {b - (c + d)}], always evaluate the innermost parentheses first.',
    advancedReasoning: 'Binary operations are parsed using syntax trees where operators with lower precedence sit closer to the root. While addition and multiplication are associative ((a + b) + c = a + (b + c)), subtraction and division are NOT associative: (8 - 4) - 2 = 2, whereas 8 - (4 - 2) = 6. Strict left-associativity must therefore be enforced.',
    workedExamples: [
      {
        title: 'Evaluating an expression with nested brackets',
        description: 'Evaluate: 25 - [16 + {12 - (8 - 3)}].',
        steps: [
          'Step 1: Innermost round brackets: (8 - 3) = 5.',
          'Step 2: Curly braces: {12 - 5} = 7.',
          'Step 3: Square brackets: [16 + 7] = 23.',
          'Step 4: Outer subtraction: 25 - 23 = 2.'
        ],
        result: 'The final value is 2.'
      },
      {
        title: 'Left-to-right evaluation of equal precedence operators',
        description: 'Evaluate: 36 ÷ 6 × 3 + 8 - 5.',
        steps: [
          'Step 1: Division and multiplication have equal precedence. Work left to right: 36 ÷ 6 = 6.',
          'Step 2: Next operation is multiplication: 6 × 3 = 18.',
          'Step 3: Addition and subtraction work left to right: 18 + 8 = 26.',
          'Step 4: Subtract 5: 26 - 5 = 21.'
        ],
        result: '21.'
      }
    ],
    guidedPractice: {
      question: 'Evaluate: 18 - 3 × (4 + 2) ÷ 2.',
      hint: 'Compute inside brackets first (4 + 2 = 6), then multiply and divide left-to-right before subtracting from 18.',
      solution: '18 - 3 × 6 ÷ 2 = 18 - 18 ÷ 2 = 18 - 9 = 9.'
    },
    independentQuestions: [
      'Evaluate: 48 ÷ (12 - 4) + 3 × 5.',
      'Insert brackets to make this statement true: 5 + 3 × 4 - 2 = 30.',
      'Evaluate: 100 - [40 + {25 - (15 - 5)}].'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-02-1',
        question: 'What is the correct value of 12 + 8 ÷ 4 × 2?',
        options: ['16', '10', '13', '20'],
        correctIdx: 0,
        ruleOrFormula: '8 \\div 4 \\times 2 = 2 \\times 2 = 4; \\quad 12 + 4 = 16',
        explanation: 'Evaluate division first: 8 ÷ 4 = 2. Then multiply: 2 × 2 = 4. Finally add: 12 + 4 = 16.',
        commonMistake: 'Adding 12 + 8 first to get 20, or multiplying 4 × 2 first to get 8.'
      },
      {
        id: 'q-c7-02-2',
        question: 'What is the value of 50 - 2 × (3 + 7)?',
        options: ['30', '480', '40', '25'],
        correctIdx: 0,
        ruleOrFormula: '3 + 7 = 10 \\implies 2 \\times 10 = 20 \\implies 50 - 20 = 30',
        explanation: 'Brackets first: 3 + 7 = 10. Multiply: 2 × 10 = 20. Subtract: 50 - 20 = 30.',
        commonMistake: 'Subtracting 50 - 2 = 48 before handling the bracket product.'
      },
      {
        id: 'q-c7-02-3',
        question: 'Which of the following operations is NOT associative?',
        options: ['Division', 'Multiplication', 'Addition', 'None of these'],
        correctIdx: 0,
        ruleOrFormula: '(a \\div b) \\div c \\ne a \\div (b \\div c)',
        explanation: 'Division is not associative: for example, (16 ÷ 4) ÷ 2 = 4 ÷ 2 = 2, whereas 16 ÷ (4 ÷ 2) = 16 ÷ 2 = 8.',
        commonMistake: 'Assuming all four arithmetic operations satisfy the associative law.'
      }
    ],
    interactiveToolId: 'tool-c7-arithmetic-expressions',
    relatedActivityLabel: 'BODMAS / PEMDAS Order of Operations Evaluator'
  },
  {
    id: 'c7-03',
    number: 'Chapter 03',
    title: 'A Peek Beyond the Point',
    classLevel: 7,
    unit: 'Number Systems & Arithmetic',
    description: 'Explore decimals, place values of tenths, hundredths, and thousandths, terminating and non-terminating decimals, and conversions to fractions.',
    learningObjectives: [
      'Interpret decimal digits as negative powers of ten (10^-1, 10^-2, 10^-3)',
      'Convert between fractions and decimals accurately',
      'Identify terminating decimals through prime factors of the simplified denominator (only 2 and 5)',
      'Multiply and divide decimal numbers with precision'
    ],
    formula: '0.d_1 d_2 d_3 = \\frac{d_1}{10} + \\frac{d_2}{100} + \\frac{d_3}{1000}',
    simpleExplanation: 'The decimal point is like a doorway. To the left are whole ones, tens, and hundreds. To the right are pieces smaller than one: tenths, hundredths, thousandths. 0.75 means 75 hundredths, which is the same as the fraction 3/4!',
    detailedExplanation: 'Decimals are fractions whose denominators are powers of 10. A fraction a/b in lowest terms has a terminating decimal expansion if and only if the prime factorization of denominator b contains only 2s and 5s (b = 2^m × 5^n). If any other prime factor exists (such as 3, 7, 11), the decimal expansion is recurring (periodic). When multiplying decimals, multiply ignoring decimal points, then count the total decimal digits in both factors and insert the point accordingly.',
    advancedReasoning: 'Every rational number has either a terminating or repeating decimal expansion because the remainder in long division by b must be an integer in {0, 1, ..., b-1}. By the Pigeonhole Principle, after at most b division steps, a remainder must recur, producing a periodic cycle of period length at most b - 1.',
    workedExamples: [
      {
        title: 'Multiplying two decimal numbers',
        description: 'Calculate 3.45 × 0.8.',
        steps: [
          'Step 1: Multiply whole numbers ignoring decimal points: 345 × 8 = 2,760.',
          'Step 2: Count decimal places: 3.45 has 2 decimal places; 0.8 has 1 decimal place. Total = 2 + 1 = 3 decimal places.',
          'Step 3: Move decimal point 3 places from right in 2,760: 2.760.',
          'Step 4: Drop trailing zero: 2.76.'
        ],
        result: '2.76.'
      },
      {
        title: 'Determining if a fraction terminates without dividing',
        description: 'Does the fraction 21/40 terminate or repeat?',
        steps: [
          'Step 1: Verify the fraction is in lowest terms: HCF(21, 40) = 1 (21 = 3×7, 40 = 2^3×5). Yes.',
          'Step 2: Prime factorize denominator: 40 = 2^3 × 5^1.',
          'Step 3: Since prime factors contain only 2 and 5, the decimal expansion terminates.',
          'Step 4: Find exact decimal: multiply numerator and denominator by 5^2 to make denominator 10^3 = 1000: 21 × 25 / 1000 = 525 / 1000 = 0.525.'
        ],
        result: 'Terminating decimal: 0.525.'
      }
    ],
    guidedPractice: {
      question: 'Convert 0.375 into a fraction in its simplest form.',
      hint: 'Write as 375/1000 and divide both numerator and denominator by their greatest common factor (125).',
      solution: '375/1000 = (375 ÷ 125) / (1000 ÷ 125) = 3/8.'
    },
    independentQuestions: [
      'Evaluate: 0.04 × 0.025.',
      'Divide 15.6 by 0.12.',
      'State with reasons which of these terminate: 7/16, 5/18, 9/25, 11/30.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-03-1',
        question: 'Which of the following fractions produces a terminating decimal?',
        options: ['7/20', '5/6', '4/15', '2/7'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Denominator } 20 = 2^2 \\times 5',
        explanation: 'In 7/20, the denominator 20 has only prime factors 2 and 5 (20 = 2^2 × 5). Hence its decimal terminates (0.35). The others contain 3 or 7.',
        commonMistake: 'Thinking 5/6 terminates because 6 is an even number.'
      },
      {
        id: 'q-c7-03-2',
        question: 'What is 4.8 ÷ 0.06?',
        options: ['80', '8', '0.8', '800'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{4.8}{0.06} = \\frac{480}{6} = 80',
        explanation: 'Multiply numerator and denominator by 100 to eliminate decimals: 480 ÷ 6 = 80.',
        commonMistake: 'Getting 8 by incorrectly placing the decimal shift.'
      },
      {
        id: 'q-c7-03-3',
        question: 'What is the fraction 5/8 written as a decimal?',
        options: ['0.625', '0.58', '0.65', '0.85'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{5 \\times 125}{8 \\times 125} = \\frac{625}{1000} = 0.625',
        explanation: 'Multiplying numerator and denominator by 125 gives 625/1000, which equals the terminating decimal 0.625.',
        commonMistake: 'Writing 0.58 directly from digits.'
      }
    ],
    interactiveToolId: 'tool-c7-decimals',
    relatedActivityLabel: 'Decimal Place Value & Fraction Converter'
  },
  {
    id: 'c7-04',
    number: 'Chapter 04',
    title: 'Number Play',
    classLevel: 7,
    unit: 'Number Systems & Arithmetic',
    description: 'Investigate divisibility tests with algebraic proofs, magic squares, palindromic numbers, digit reversals, and properties of 9 and 11.',
    learningObjectives: [
      'Prove divisibility rules for 3, 9, and 11 using place-value expansion',
      'Analyze the symmetry and constant magic constant M = n(n² + 1)/2 in magic squares',
      'Investigate properties of reversals: (ab - ba) is always a multiple of 9',
      'Construct digit-based mathematical puzzles and test hypotheses'
    ],
    formula: 'M = \\frac{n(n^2 + 1)}{2}, \\quad (10a + b) - (10b + a) = 9(a - b)',
    simpleExplanation: 'If you reverse any two-digit number and subtract the smaller from the larger (like 72 - 27 = 45), the answer is ALWAYS a multiple of 9! Math has hidden tricks like this built into our decimal place value system.',
    detailedExplanation: 'A two-digit number with tens digit a and units digit b is 10a + b. Reversing gives 10b + a. The difference is (10a + b) - (10b + a) = 9a - 9b = 9(a - b), proving divisibility by 9. A 3×3 magic square arranges numbers 1 to 9 such that every row, column, and diagonal sums to M = 3(9 + 1)/2 = 15, with the central cell always occupied by 5.',
    advancedReasoning: 'In any normal n×n magic square, the sum of all elements from 1 to n² is S = n²(n² + 1)/2. Because there are n rows each having identical sum M, we have n · M = S, which yields M = n(n² + 1)/2. For n = 3, M = 15; for n = 4, M = 34.',
    workedExamples: [
      {
        title: 'Algebraic proof that a three-digit reversal difference is divisible by 99',
        description: 'Prove that for any three-digit number abc (where a > c), subtracting its reverse cba results in a multiple of 99.',
        steps: [
          'Step 1: Write original number: N = 100a + 10b + c.',
          'Step 2: Write reversed number: R = 100c + 10b + a.',
          'Step 3: Subtract: N - R = (100a + 10b + c) - (100c + 10b + a).',
          'Step 4: Simplify: 100a - a + 10b - 10b + c - 100c = 99a - 99c = 99(a - c).',
          'Step 5: Since (a - c) is an integer, the difference is always a multiple of 99.'
        ],
        result: 'The difference is always 99(a - c), proving divisibility by 99.'
      },
      {
        title: 'Solving for the center number in a 3×3 magic square',
        description: 'Show why the center cell of a 3×3 magic square containing numbers 1 to 9 must be 5.',
        steps: [
          'Step 1: Row 2, column 2, and both diagonals all pass through the center cell x.',
          'Step 2: Sum of all 4 lines = 4 × 15 = 60.',
          'Step 3: Each of the 8 outer cells appears in these lines once, while the center cell x appears 4 times.',
          'Step 4: Sum of all 9 cells = 1 + 2 + ... + 9 = 45. Hence: 45 + 3x = 60.',
          'Step 5: Solve for x: 3x = 15 => x = 5.'
        ],
        result: 'The center cell must always be 5.'
      }
    ],
    guidedPractice: {
      question: 'Take the number 83. Reverse it, subtract the smaller from larger, and divide by 9. What is the quotient?',
      hint: 'The quotient will be the difference of the original digits: a - b = 8 - 3.',
      solution: '83 - 38 = 45. 45 ÷ 9 = 5. Note 8 - 3 = 5.'
    },
    independentQuestions: [
      'Show that the sum of a two-digit number and its reverse is always divisible by 11.',
      'Construct a 3×3 magic square with magic sum 15.',
      'Check if 4,563,219 is divisible by 9 without dividing.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-04-1',
        question: 'For any two-digit number, the sum of the number and its reverse (10a + b + 10b + a) is always divisible by:',
        options: ['11', '9', '7', '5'],
        correctIdx: 0,
        ruleOrFormula: '(10a + b) + (10b + a) = 11(a + b)',
        explanation: '10a + b + 10b + a = 11a + 11b = 11(a + b), which has 11 as a guaranteed factor.',
        commonMistake: 'Confusing sum (divisible by 11) with difference (divisible by 9).'
      },
      {
        id: 'q-c7-04-2',
        question: 'What is the magic constant for a 3×3 magic square containing numbers 1 to 9?',
        options: ['15', '12', '18', '21'],
        correctIdx: 0,
        ruleOrFormula: 'M = \\frac{3(3^2 + 1)}{2} = \\frac{3 \\times 10}{2} = 15',
        explanation: 'The sum of all numbers 1 to 9 is 45. Divided evenly among 3 rows, each row must sum to 45 / 3 = 15.',
        commonMistake: 'Guessing 9 or 18.'
      },
      {
        id: 'q-c7-04-3',
        question: 'If 7A3 is divisible by 9, what is the single digit A?',
        options: ['8', '7', '9', '5'],
        correctIdx: 0,
        ruleOrFormula: '7 + A + 3 = 10 + A = 18 \\implies A = 8',
        explanation: 'Sum of digits must be a multiple of 9. 7 + A + 3 = 10 + A. The nearest multiple of 9 greater than 10 is 18. So A = 18 - 10 = 8.',
        commonMistake: 'Selecting A = 7.'
      }
    ],
    interactiveToolId: 'tool-c7-common-ground',
    relatedActivityLabel: 'Magic Squares & Digit Logic Workshop'
  },
  {
    id: 'c7-05',
    number: 'Chapter 05',
    title: 'Operations with Integers',
    classLevel: 7,
    unit: 'Number Systems & Arithmetic',
    description: 'Master integer multiplication and division, sign rules, closure, commutativity, associativity, and distributivity of multiplication over addition.',
    learningObjectives: [
      'Multiply positive and negative integers with sign rules: (+)×(+)=(+), (+)×(-)=(-), (-)×(-)=(+)',
      'Divide integers and understand division by zero is undefined',
      'Verify algebraic properties of integers: Closure, Commutative, Associative, and Distributive',
      'Solve complex multi-step integer word problems with temperature, elevation, and financial balance'
    ],
    formula: '(-a) \\times (-b) = ab, \\quad a \\times (b + c) = a \\times b + a \\times c, \\quad \\frac{a}{0} \\text{ is undefined}',
    simpleExplanation: 'When multiplying integers: friends of friends are friends (+ × + = +), enemies of friends are enemies (- × + = -), and enemies of enemies are friends (- × - = +)! Two negative signs cancel each other out in multiplication.',
    detailedExplanation: 'Integer multiplication extends repeated addition. For positive integers, 3 × (-4) = (-4) + (-4) + (-4) = -12. For negative multipliers, (-3) × (-4) represents subtracting negative quantities: 0 - [(-4) + (-4) + (-4)] = +12. In division, the quotient of two integers with like signs is positive, and with unlike signs is negative. Division by zero is undefined because no unique number x satisfies 0 · x = a (for a ≠ 0).',
    advancedReasoning: 'Algebraic structure: Integers under addition and multiplication form an integral domain (a commutative ring with unity and no zero divisors). The distributive property a(b + c) = ab + ac bridges addition and multiplication, guaranteeing that arithmetic identities hold without exception.',
    workedExamples: [
      {
        title: 'Using distributive property for rapid integer multiplication',
        description: 'Evaluate (-25) × 98 using the distributive property.',
        steps: [
          'Step 1: Rewrite 98 as (100 - 2): (-25) × (100 - 2).',
          'Step 2: Distribute (-25): [(-25) × 100] - [(-25) × 2].',
          'Step 3: Calculate each term: -2500 - (-50).',
          'Step 4: Subtracting negative becomes addition: -2500 + 50 = -2450.'
        ],
        result: '-2450.'
      },
      {
        title: 'Evaluating multi-factor sign products',
        description: 'Find the product of: (-2) × (-3) × (-4) × (-5).',
        steps: [
          'Step 1: Count the number of negative factors: there are 4 negative factors.',
          'Step 2: Since 4 is an even number, the overall sign will be positive (+).',
          'Step 3: Multiply absolute values: 2 × 3 = 6; 6 × 4 = 24; 24 × 5 = 120.',
          'Step 4: Combine with positive sign: +120.'
        ],
        result: '+120.'
      }
    ],
    guidedPractice: {
      question: 'Evaluate: [(-36) ÷ 4] ÷ (-3).',
      hint: 'Evaluate inside brackets first: (-36) ÷ 4 = -9. Then divide -9 by -3.',
      solution: '(-9) ÷ (-3) = +3 (quotient of two negative numbers is positive).'
    },
    independentQuestions: [
      'Verify that a × (b + c) = (a × b) + (a × c) for a = -5, b = -2, c = 6.',
      'What is the sign of the product if we multiply 15 negative integers and 4 positive integers?',
      'In a test, +4 marks are given for every correct answer and -2 for every incorrect answer. If Rohan scored 28 marks with 10 correct answers, how many did he get incorrect?'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-05-1',
        question: 'What is the product of (-1) multiplied by itself 20 times: (-1)^20?',
        options: ['+1', '-1', '20', '-20'],
        correctIdx: 0,
        ruleOrFormula: '(-1)^{\\text{even}} = +1',
        explanation: 'Any negative number raised to an even integer power results in a positive value. (-1)^20 = +1.',
        commonMistake: 'Thinking the result is -1 because -1 is inside the bracket.'
      },
      {
        id: 'q-c7-05-2',
        question: 'Which property is demonstrated by: (-8) × [5 + (-3)] = [(-8) × 5] + [(-8) × (-3)]?',
        options: ['Distributive property', 'Associative property', 'Commutative property', 'Closure property'],
        correctIdx: 0,
        ruleOrFormula: 'a(b + c) = ab + ac',
        explanation: 'Multiplying a number by a sum equals the sum of multiplying each term individually: this is the distributive property of multiplication over addition.',
        commonMistake: 'Confusing distributive with associative.'
      },
      {
        id: 'q-c7-05-3',
        question: 'What is the value of 0 ÷ (-7)?',
        options: ['0', 'Undefined', '-7', '1'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{0}{a} = 0 \\quad (a \\ne 0)',
        explanation: 'Zero divided by any non-zero integer is always 0. (Only division BY zero is undefined).',
        commonMistake: 'Confusing 0 ÷ (-7) with (-7) ÷ 0 (which is undefined).'
      }
    ],
    interactiveToolId: 'tool-c7-integers',
    relatedActivityLabel: 'Integer Counter Chips & Operation Simulator'
  },
  {
    id: 'c7-06',
    number: 'Chapter 06',
    title: 'Finding Common Ground',
    classLevel: 7,
    unit: 'Number Systems & Arithmetic',
    description: 'Deepen understanding of common factors, greatest common divisors via Euclidean algorithm, common multiples, and Venn diagram representation of number sets.',
    learningObjectives: [
      'Apply the Euclidean algorithm to find the HCF of large integers efficiently',
      'Use Venn diagrams to sort prime factors into intersection (HCF) and union (LCM)',
      'Solve practical synchronization problems and tile optimization problems',
      'Prove that HCF divides the difference of any two numbers: HCF(a, b) = HCF(b, a mod b)'
    ],
    formula: '\\text{HCF}(a, b) = \\text{HCF}(b, r) \\quad \\text{where } a = bq + r',
    simpleExplanation: 'When two friends run around a track at different speeds, finding when they meet back at the start line uses LCM (Lowest Common Multiple). When tiling a floor with identical square tiles without cutting, finding the largest tile size uses HCF (Highest Common Factor)!',
    detailedExplanation: 'The Euclidean algorithm computes HCF through successive divisions: if a = bq + r (0 ≤ r < b), then any common divisor of a and b must also divide r = a - bq. The last non-zero remainder is the HCF. In a Venn diagram of prime factors, the intersection of prime factor multisets yields the HCF, while the union yields the LCM.',
    advancedReasoning: 'Bézout\'s Identity: For any non-zero integers a and b, there exist integers x and y such that ax + by = HCF(a, b). This fundamental theorem of number theory guarantees that the HCF is the smallest positive linear combination of the two numbers.',
    workedExamples: [
      {
        title: 'Computing HCF of 252 and 105 using Euclidean algorithm',
        description: 'Find HCF(252, 105) through successive division steps.',
        steps: [
          'Step 1: Divide 252 by 105: 252 = 105 × 2 + 42 (remainder = 42).',
          'Step 2: Divide previous divisor (105) by remainder (42): 105 = 42 × 2 + 21 (remainder = 21).',
          'Step 3: Divide previous divisor (42) by remainder (21): 42 = 21 × 2 + 0 (remainder = 0).',
          'Step 4: Since the remainder is now 0, the last non-zero divisor 21 is the HCF.'
        ],
        result: 'HCF(252, 105) = 21.'
      },
      {
        title: 'Tiling a rectangular hall with largest square tiles',
        description: 'A room measures 840 cm by 600 cm. Find the largest square tile that can tile it without cutting, and the number of tiles needed.',
        steps: [
          'Step 1: The side of the largest square tile is HCF(840, 600).',
          'Step 2: 840 = 600 × 1 + 240; 600 = 240 × 2 + 120; 240 = 120 × 2 + 0. Thus HCF = 120 cm.',
          'Step 3: Largest tile side = 120 cm (1.2 m).',
          'Step 4: Number of tiles = (840 ÷ 120) × (600 ÷ 120) = 7 × 5 = 35 tiles.'
        ],
        result: 'Tile side = 120 cm; 35 tiles required.'
      }
    ],
    guidedPractice: {
      question: 'Find the LCM of 18, 24, and 30 using prime factorization.',
      hint: '18 = 2 × 3^2, 24 = 2^3 × 3, 30 = 2 × 3 × 5. Take highest power of each prime factor.',
      solution: 'Highest powers: 2^3 × 3^2 × 5 = 8 × 9 × 5 = 360.'
    },
    independentQuestions: [
      'Use the Euclidean algorithm to find HCF(504, 336).',
      'Three bells toll at intervals of 9, 12, and 15 minutes. If they toll together at 9:00 AM, at what time will they next toll together?',
      'Explain using prime factors why HCF(a, b) always divides LCM(a, b).'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-06-1',
        question: 'What is the HCF of two consecutive integers n and n + 1?',
        options: ['1', '2', 'n', 'n(n + 1)'],
        correctIdx: 0,
        ruleOrFormula: '\\text{HCF}(n, n + 1) = \\text{HCF}(n, (n + 1) - n) = \\text{HCF}(n, 1) = 1',
        explanation: 'Any common factor must divide their difference (n + 1) - n = 1. The only positive divisor of 1 is 1, so consecutive integers are always coprime.',
        commonMistake: 'Assuming the HCF depends on whether n is odd or even.'
      },
      {
        id: 'q-c7-06-2',
        question: 'If HCF(a, b) = 8 and LCM(a, b) = 96, and one number is 32, what is the other number?',
        options: ['24', '16', '48', '12'],
        correctIdx: 0,
        ruleOrFormula: 'a \\times b = \\text{HCF} \\times \\text{LCM}',
        explanation: '32 × b = 8 × 96 = 768. Therefore b = 768 ÷ 32 = 24.',
        commonMistake: 'Dividing 96 by 8 instead of using the product relationship.'
      },
      {
        id: 'q-c7-06-3',
        question: 'In a Venn diagram showing prime factors of two numbers, what does the intersection represent?',
        options: ['The HCF (product of common prime factors)', 'The LCM', 'The difference', 'The sum'],
        correctIdx: 0,
        ruleOrFormula: '\\text{HCF} = \\prod (A \\cap B)',
        explanation: 'The common prime factors belonging to both numbers lie in the intersection of the sets; their product is the HCF.',
        commonMistake: 'Thinking the intersection gives the LCM (union gives the LCM).'
      }
    ],
    interactiveToolId: 'tool-c7-common-ground',
    relatedActivityLabel: 'Euclidean Algorithm & Venn Factorizer'
  },
  {
    id: 'c7-07',
    number: 'Chapter 07',
    title: 'Another Peek Beyond the Point',
    classLevel: 7,
    unit: 'Number Systems & Arithmetic',
    description: 'Explore recurring decimals, period and periodicity, converting repeating decimals into exact rational fractions p/q, and operations on repeating decimals.',
    learningObjectives: [
      'Express non-terminating repeating decimals using bar notation (e.g., 0.333... = 0.3̄)',
      'Identify the period and length of period (periodicity) of a repeating decimal',
      'Convert pure and mixed recurring decimals into p/q form algebraically',
      'Understand the rational nature of repeating decimals versus irrational decimals'
    ],
    formula: '0.\\overline{a_1 \\dots a_k} = \\frac{a_1 \\dots a_k}{10^k - 1} = \\frac{a_1 \\dots a_k}{99\\dots9}',
    simpleExplanation: 'When you divide 1 by 3, you get 0.33333... with 3 repeating forever! We write this with a line over the 3: 0.3̄. Even though it goes on forever, it is an exact fraction (1/3). We can convert any repeating decimal back into a fraction using a neat algebraic subtraction trick.',
    detailedExplanation: 'A decimal expansion is recurring if a block of digits repeats endlessly. In pure recurring decimals (like 0.7̄ = 0.777...), the repetition begins immediately after the point. In mixed recurring decimals (like 0.16̄ = 0.1666...), non-repeating digits precede the recurring block. To convert x = 0.7̄ to a fraction: 10x = 7.7̄. Subtracting gives 10x - x = 7.7̄ - 0.7̄, so 9x = 7, giving x = 7/9.',
    advancedReasoning: 'Why does 0.999... = 1? Let x = 0.999... Then 10x = 9.999... Subtracting x yields 9x = 9, so x = 1. Analytically, 0.999... is the sum of the infinite geometric series Σ 9/10^k = (9/10) / (1 - 1/10) = (9/10) / (9/10) = 1. In the real number system, both notations represent the identical real number.',
    workedExamples: [
      {
        title: 'Converting a pure recurring decimal to fraction form',
        description: 'Convert 0.27̄ (0.272727...) into a fraction p/q in simplest terms.',
        steps: [
          'Step 1: Let x = 0.272727... (periodicity = 2).',
          'Step 2: Multiply by 10^2 = 100: 100x = 27.272727...',
          'Step 3: Subtract x from 100x: 100x - x = 27.272727... - 0.272727...',
          'Step 4: 99x = 27, so x = 27 / 99.',
          'Step 5: Reduce to lowest terms by dividing by 9: 27/99 = 3/11.'
        ],
        result: '3/11.'
      },
      {
        title: 'Converting a mixed recurring decimal to fraction form',
        description: 'Express 0.235̄ (0.235555...) as a fraction in simplest form.',
        steps: [
          'Step 1: Let x = 0.235555...',
          'Step 2: Multiply by 100 to shift non-repeating part: 100x = 23.5555... (Equation 1).',
          'Step 3: Multiply by 1000 to include one repeating period: 1000x = 235.5555... (Equation 2).',
          'Step 4: Subtract Eq 1 from Eq 2: 1000x - 100x = 235.555... - 23.555...',
          'Step 5: 900x = 212 => x = 212 / 900.',
          'Step 6: Simplify by dividing by 4: 212 ÷ 4 = 53, 900 ÷ 4 = 225 => 53/225.'
        ],
        result: '53/225.'
      }
    ],
    guidedPractice: {
      question: 'Convert 0.4̄ into a fraction in lowest terms.',
      hint: 'Let x = 0.444... Multiply by 10: 10x = 4.444... Subtract x from 10x.',
      solution: '9x = 4 => x = 4/9.'
    },
    independentQuestions: [
      'Convert 0.54̄ (0.545454...) into a simplified fraction.',
      'Show that 0.123̄ (periodicity 3) equals 123/999 = 41/333.',
      'Evaluate 0.3̄ + 0.6̄ by converting each to a fraction first.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-07-1',
        question: 'What is the periodicity (length of the repeating cycle) of 0.142857̄?',
        options: ['6', '5', '7', '1'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Count digits under the repeating bar}',
        explanation: 'The block of digits repeating is 142857, which contains 6 digits. Therefore the periodicity is 6.',
        commonMistake: 'Counting 7 because 7 is the last digit in the cycle.'
      },
      {
        id: 'q-c7-07-2',
        question: 'What is 0.7̄ expressed as a rational fraction?',
        options: ['7/9', '7/10', '7/99', '70/99'],
        correctIdx: 0,
        ruleOrFormula: '10x - x = 7 \\implies 9x = 7 \\implies x = 7/9',
        explanation: 'Any single-digit pure recurring decimal 0.d̄ equals d/9. Thus 0.7̄ = 7/9.',
        commonMistake: 'Writing 7/10 (which is the terminating decimal 0.7).'
      },
      {
        id: 'q-c7-07-3',
        question: 'Which of the following is equal to 1?',
        options: ['0.9̄ (0.999...)', '0.9', '0.09̄', '0.99'],
        correctIdx: 0,
        ruleOrFormula: '9x = 9 \\implies x = 1',
        explanation: 'Let x = 0.999...; 10x = 9.999...; 10x - x = 9 => 9x = 9 => x = 1.',
        commonMistake: 'Believing 0.999... is infinitely close to 1 but strictly less than 1.'
      }
    ],
    interactiveToolId: 'tool-c7-decimals',
    relatedActivityLabel: 'Recurring Decimal to Fraction Visualizer'
  },

  // ================= UNIT: ALGEBRA =================
  {
    id: 'c7-08',
    number: 'Chapter 08',
    title: 'Expressions Using Letter-Numbers',
    classLevel: 7,
    unit: 'Algebraic Structures',
    description: 'Transition from arithmetic to generalized algebra: variables, constants, algebraic terms, coefficients, like/unlike terms, monomials, binomials, and polynomials.',
    learningObjectives: [
      'Translate English word statements into precise algebraic expressions',
      'Identify variables, constants, coefficients, and degree in algebraic terms',
      'Group and combine like terms using addition and subtraction',
      'Evaluate algebraic expressions by substituting numerical values for variables'
    ],
    formula: 'ax^n: \\quad a = \\text{coeff}, \\; x = \\text{var}, \\; n = \\text{power}; \\quad 3x + 5x = 8x',
    simpleExplanation: 'In algebra, we use letters like x or y to stand for unknown or changing numbers. Think of x as a mystery box. If you have 3 boxes plus 5 boxes, you have 8 boxes (3x + 5x = 8x). But you cannot combine boxes and apples (3x + 5y stays 3x + 5y)!',
    detailedExplanation: 'An algebraic expression is built from variables and constants connected by arithmetic operators. A term is a product of factors: in 7xy², 7 is the numerical coefficient, while x and y² are literal factors. Like terms share identical literal factors with identical powers (e.g., 4x²y and -9x²y). Only like terms can be combined by summing their numerical coefficients. Evaluating an expression means substituting specific numbers for each variable and following arithmetic precedence.',
    advancedReasoning: 'Polynomials form a ring under addition and multiplication. Combining like terms corresponds to applying the distributive law in reverse: ax + bx = (a + b)x. Since the real numbers form a field, the coefficient ring guarantees that algebraic simplification preserves numerical truth for all real substitutions.',
    workedExamples: [
      {
        title: 'Combining like terms in a multi-variable polynomial',
        description: 'Simplify the expression: 5x² - 3xy + 2y² - 2x² + 7xy - 4y² + 10.',
        steps: [
          'Step 1: Group like terms together: (5x² - 2x²) + (-3xy + 7xy) + (2y² - 4y²) + 10.',
          'Step 2: Combine coefficients of x²: (5 - 2)x² = 3x².',
          'Step 3: Combine coefficients of xy: (-3 + 7)xy = 4xy.',
          'Step 4: Combine coefficients of y²: (2 - 4)y² = -2y².',
          'Step 5: Attach constant: 3x² + 4xy - 2y² + 10.'
        ],
        result: '3x² + 4xy - 2y² + 10.'
      },
      {
        title: 'Evaluating an expression with negative variable values',
        description: 'Evaluate 2a² - 3ab + b² when a = -2 and b = 3.',
        steps: [
          'Step 1: Substitute values carefully with brackets: 2(-2)² - 3(-2)(3) + (3)²',
          'Step 2: Evaluate squares first: (-2)² = 4; (3)² = 9.',
          'Step 3: Substitute: 2(4) - 3(-6) + 9.',
          'Step 4: Multiply: 8 - (-18) + 9 = 8 + 18 + 9.',
          'Step 5: Add: 26 + 9 = 35.'
        ],
        result: '35.'
      }
    ],
    guidedPractice: {
      question: 'Subtract (3x - 5y + 7) from (7x - 2y - 4).',
      hint: 'Remember to reverse all signs of the expression being subtracted: (7x - 2y - 4) - 3x + 5y - 7.',
      solution: '(7x - 3x) + (-2y + 5y) + (-4 - 7) = 4x + 3y - 11.'
    },
    independentQuestions: [
      'Classify as monomial, binomial, or trinomial: 4x², 3x - 7, x² + 2x - 5, 12xy.',
      'Simplify: 12m² - 9m + 5m - 4m² - 7m + 10.',
      'If x = 2 and y = -1, evaluate: 4x²y - 2xy² + 5.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-08-1',
        question: 'Which of the following pairs are "like terms"?',
        options: ['-7xy² and 4xy²', '3x²y and 3xy²', '5x and 5y', '2a² and 2a³'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Literal factors must match exactly including exponents}',
        explanation: 'Both -7xy² and 4xy² have identical variables with identical powers (x^1 and y^2).',
        commonMistake: 'Confusing 3x²y and 3xy² (in one x is squared, in the other y is squared).'
      },
      {
        id: 'q-c7-08-2',
        question: 'What is the coefficient of x in the term -5x/3?',
        options: ['-5/3', '-5', '5/3', '1/3'],
        correctIdx: 0,
        ruleOrFormula: '-\\frac{5}{3}x \\implies \\text{coefficient is } -5/3',
        explanation: 'The term can be factored as (-5/3) × x, making -5/3 the numerical coefficient.',
        commonMistake: 'Omitting the denominator or the negative sign.'
      },
      {
        id: 'q-c7-08-3',
        question: 'Simplify: 4a - [2b - (3a - b)].',
        options: ['7a - 3b', 'a - 3b', '7a + 3b', 'a + b'],
        correctIdx: 0,
        ruleOrFormula: '2b - 3a + b = 3b - 3a; \\quad 4a - (3b - 3a) = 4a - 3b + 3a = 7a - 3b',
        explanation: 'Expand inner bracket: 2b - 3a + b = 3b - 3a. Then subtract from 4a: 4a - 3b + 3a = 7a - 3b.',
        commonMistake: 'Forgetting to flip the sign inside parentheses when preceded by a minus.'
      }
    ],
    interactiveToolId: 'tool-c7-algebra-letters',
    relatedActivityLabel: 'Algebraic Term & Variable Substitution Lab'
  },
  {
    id: 'c7-09',
    number: 'Chapter 09',
    title: 'Finding the Unknown',
    classLevel: 7,
    unit: 'Algebraic Structures',
    description: 'Solve simple linear equations in one variable using inverse operations, transposition, balance model, and real-life algebraic word problem modeling.',
    learningObjectives: [
      'Model balance scale equations: maintaining equality by performing identical operations on both sides',
      'Solve linear equations using inverse operations (addition/subtraction, multiplication/division)',
      'Apply the method of transposition (moving terms with opposite sign across the equal sign)',
      'Formulate and solve equations from word problems involving ages, consecutive numbers, and perimeter'
    ],
    formula: 'ax + b = c \\implies ax = c - b \\implies x = \\frac{c - b}{a} \\quad (a \\ne 0)',
    simpleExplanation: 'An equation is like a balanced seesaw. Whatever you do to one side, you MUST do to the exact same degree to the other side to keep it level! If you add 5 to one side, add 5 to the other. To isolate the unknown x, undo operations in reverse order.',
    detailedExplanation: 'A linear equation in one variable equates a first-degree algebraic expression to a constant or another first-degree expression: ax + b = c. Transposition is a shortcut for the balance method: adding -b to both sides eliminates +b on the left and produces -b on the right. Dividing both sides by a non-zero coefficient a isolates x = (c - b)/a. Solutions must be verified by substituting back into the left-hand side (LHS) and checking if LHS = RHS.',
    advancedReasoning: 'Existence and uniqueness: In a field, any linear equation ax + b = c with a ≠ 0 has a unique solution x = a⁻¹(c - b). If a = 0 and b = c, the equation is an identity with infinitely many solutions (0x = 0). If a = 0 and b ≠ c, the equation is inconsistent with zero solutions (e.g. 0x = 5).',
    workedExamples: [
      {
        title: 'Solving a two-step linear equation by transposition',
        description: 'Solve: 5x - 7 = 28 and verify the solution.',
        steps: [
          'Step 1: Transpose -7 to the RHS by adding 7 to both sides: 5x = 28 + 7.',
          'Step 2: Simplify RHS: 5x = 35.',
          'Step 3: Transpose multiplier 5 to the RHS by dividing: x = 35 / 5 = 7.',
          'Step 4: Check solution: LHS = 5(7) - 7 = 35 - 7 = 28 = RHS. Confirmed!'
        ],
        result: 'x = 7.'
      },
      {
        title: 'Word problem: consecutive integer sum',
        description: 'The sum of three consecutive integers is 72. Find the three integers.',
        steps: [
          'Step 1: Let the three consecutive integers be x, x + 1, and x + 2.',
          'Step 2: Form equation: x + (x + 1) + (x + 2) = 72.',
          'Step 3: Combine like terms: 3x + 3 = 72.',
          'Step 4: Transpose 3: 3x = 72 - 3 = 69.',
          'Step 5: Divide by 3: x = 23.',
          'Step 6: The three integers are 23, 24, and 25. Check: 23 + 24 + 25 = 72.'
        ],
        result: 'The integers are 23, 24, and 25.'
      }
    ],
    guidedPractice: {
      question: 'Solve for y: (3y + 4) / 5 = 8.',
      hint: 'Multiply both sides by 5 first to clear the denominator, then solve for 3y.',
      solution: '3y + 4 = 8 × 5 = 40. Then 3y = 40 - 4 = 36, giving y = 12.'
    },
    independentQuestions: [
      'Solve: 4(2x - 3) = 3(x + 6).',
      'A father is 3 times as old as his son. After 12 years, he will be twice as old as his son. Find their present ages.',
      'Solve and verify: (2x / 3) - (x / 2) = 5.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-09-1',
        question: 'What is the solution to 7x + 12 = 33?',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 21/7'],
        correctIdx: 0,
        ruleOrFormula: '7x = 33 - 12 = 21 \\implies x = 21/7 = 3',
        explanation: 'Subtract 12 from 33 to get 21. Then 21 divided by 7 yields x = 3.',
        commonMistake: 'Adding 12 instead of subtracting: 33 + 12 = 45.'
      },
      {
        id: 'q-c7-09-2',
        question: 'If 3(x - 2) = 15, what is x?',
        options: ['7', '5', '9', '3'],
        correctIdx: 0,
        ruleOrFormula: 'x - 2 = 15/3 = 5 \\implies x = 5 + 2 = 7',
        explanation: 'Divide both sides by 3 to get x - 2 = 5. Adding 2 gives x = 7.',
        commonMistake: 'Forgetting to distribute or add 2: reporting 5.'
      },
      {
        id: 'q-c7-09-3',
        question: 'When a term is transposed from one side of an equation to the other, what happens?',
        options: ['Its sign changes (+ becomes -, - becomes +)', 'Its sign remains unchanged', 'It is squared', 'It becomes zero'],
        correctIdx: 0,
        ruleOrFormula: 'A + B = C \\iff A = C - B',
        explanation: 'Transposition is mathematically adding the inverse, which reverses the sign of the term moved across the equals sign.',
        commonMistake: 'Forgetting to change sign during transposition.'
      }
    ],
    interactiveToolId: 'tool-c7-equation-balancer',
    relatedActivityLabel: 'Two-Pan Balance Scale Equation Solver'
  },

  // ================= UNIT: GEOMETRY =================
  {
    id: 'c7-10',
    number: 'Chapter 10',
    title: 'Parallel and Intersecting Lines',
    classLevel: 7,
    unit: 'Geometric Reasoning',
    description: 'Explore transversal lines cutting pairs of parallel and non-parallel lines, corresponding angles, alternate interior/exterior angles, and co-interior angles.',
    learningObjectives: [
      'Define a transversal as a line that intersects two or more lines at distinct points',
      'Identify and name corresponding angles, alternate interior angles, and consecutive interior angles',
      'Apply the parallel line theorems: alternate angles are equal, corresponding angles are equal',
      'Verify that consecutive interior angles are supplementary (sum = 180°)'
    ],
    formula: '\\angle 1 = \\angle 5 \\; (\\text{corr}), \\quad \\angle 3 = \\angle 5 \\; (\\text{alt int}), \\quad \\angle 3 + \\angle 6 = 180^\\circ \\; (\\text{co-int})',
    simpleExplanation: 'Imagine railroad tracks (parallel lines) crossed by a walking path (a transversal). The matching corners on the top track and bottom track have exactly the same angle! If one angle is 70°, its alternate interior angle across the track is also 70°!',
    detailedExplanation: 'When a transversal t cuts two parallel lines l || m: (1) Corresponding angles occupy identical relative positions at each intersection and are equal. (2) Alternate interior angles lie between the lines on opposite sides of the transversal (forming a Z-shape) and are equal. (3) Consecutive interior (co-interior) angles lie on the same side between the lines (forming a C-shape) and sum to 180°. Conversely, if any one of these conditions holds, the two lines must be parallel.',
    advancedReasoning: 'Euclid\'s Fifth Postulate: If a straight line falling on two straight lines makes the interior angles on the same side less than two right angles, the two lines, if produced indefinitely, meet on that side. The alternate and corresponding angle equality theorems are logically equivalent to this parallel postulate.',
    workedExamples: [
      {
        title: 'Finding unknown angles in a parallel line transversal system',
        description: 'Two parallel lines are cut by a transversal. One exterior angle is 115°. Find all other seven angles.',
        steps: [
          'Step 1: Let the given angle be ∠1 = 115°.',
          'Step 2: Vertically opposite angle ∠3 = ∠1 = 115°.',
          'Step 3: Linear pair with ∠1: ∠2 = 180° - 115° = 65°.',
          'Step 4: Vertically opposite angle ∠4 = ∠2 = 65°.',
          'Step 5: By corresponding angles: ∠5 = ∠1 = 115°, ∠6 = ∠2 = 65°, ∠7 = ∠3 = 115°, ∠8 = ∠4 = 65°.'
        ],
        result: 'Four angles are 115° and four angles are 65°.'
      },
      {
        title: 'Determining if lines are parallel using co-interior angles',
        description: 'Two lines are cut by a transversal such that co-interior angles are (2x + 15)° and (3x + 25)°. If x = 28, are the lines parallel?',
        steps: [
          'Step 1: Calculate first co-interior angle: 2(28) + 15 = 56 + 15 = 71°.',
          'Step 2: Calculate second co-interior angle: 3(28) + 25 = 84 + 25 = 109°.',
          'Step 3: Sum the co-interior angles: 71° + 109° = 180°.',
          'Step 4: Since consecutive interior angles sum to 180°, the lines are parallel.'
        ],
        result: 'Yes, the lines are parallel because co-interior angles are supplementary.'
      }
    ],
    guidedPractice: {
      question: 'In a figure with l || m, alternate interior angles are (4x - 10)° and (3x + 15)°. Find x.',
      hint: 'Because the lines are parallel, alternate interior angles are equal: set them equal to each other.',
      solution: '4x - 10 = 3x + 15. Subtract 3x: x - 10 = 15. Add 10: x = 25.'
    },
    independentQuestions: [
      'Draw two parallel lines cut by a transversal and shade alternate interior angles in green and corresponding in blue.',
      'If two parallel lines are intersected by a transversal and one angle is a right angle, prove that all eight angles are 90°.',
      'In a Z-shape, if ∠ABC = 62° and BC || DE, find ∠CDE if alternate.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-10-1',
        question: 'When two parallel lines are cut by a transversal, what is the sum of two interior angles on the same side?',
        options: ['180°', '90°', '360°', 'Depends on the transversal'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Co-interior angles are supplementary: } \\angle A + \\angle B = 180^\\circ',
        explanation: 'Consecutive interior (co-interior) angles formed by a transversal across parallel lines always sum to 180° (supplementary).',
        commonMistake: 'Thinking they are equal like alternate interior angles.'
      },
      {
        id: 'q-c7-10-2',
        question: 'If alternate interior angles are 75° and (2x + 15)°, what is x if lines are parallel?',
        options: ['30', '35', '45', '60'],
        correctIdx: 0,
        ruleOrFormula: '2x + 15 = 75 \\implies 2x = 60 \\implies x = 30',
        explanation: '2x + 15 = 75 => 2x = 60 => x = 30.',
        commonMistake: 'Adding 15 instead of subtracting: 2x = 90 => x = 45.'
      },
      {
        id: 'q-c7-10-3',
        question: 'Which letter shape visually resembles alternate interior angles?',
        options: ['Z', 'F', 'C', 'X'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Z-shape indicates alternate interior angles}',
        explanation: 'The Z-pattern captures alternate interior angles on opposite sides of the transversal. (F represents corresponding, C represents co-interior).',
        commonMistake: 'Selecting F (which represents corresponding angles).'
      }
    ],
    interactiveToolId: 'tool-c7-parallel-transversal',
    relatedActivityLabel: 'Parallel Lines & Transversal Dynamic Explorer'
  },
  {
    id: 'c7-11',
    number: 'Chapter 11',
    title: 'A Tale of Three Intersecting Lines',
    classLevel: 7,
    unit: 'Geometric Reasoning',
    description: 'Investigate triangles formed by three intersecting lines, angle sum property (180°), exterior angle theorem, triangle inequality theorem, and medians/altitudes.',
    learningObjectives: [
      'Prove that the interior angle sum of any triangle is exactly 180°',
      'Apply the exterior angle property: an exterior angle equals the sum of two opposite interior angles',
      'Verify the triangle inequality theorem: sum of lengths of any two sides > third side',
      'Distinguish between altitudes (perpendicular from vertex) and medians (connecting vertex to midpoint)'
    ],
    formula: '\\angle A + \\angle B + \\angle C = 180^\\circ, \\quad \\angle_{\\text{ext}} = \\angle_1 + \\angle_2, \\quad a + b > c',
    simpleExplanation: 'Whenever three lines cross to trap a space inside, they create a triangle. Tear the three corners off any paper triangle and line them up along a straight edge: they will ALWAYS form a perfect straight line (180°)! An outside corner (exterior angle) equals the sum of the two opposite inside corners.',
    detailedExplanation: 'The angle sum property (180°) is proved by drawing a line through one vertex parallel to the opposite base: alternate interior angles match the base angles, forming a 180° straight angle. The exterior angle theorem states that an exterior angle formed by extending a side equals the sum of the two interior opposite angles (θ_ext = α + β). The triangle inequality asserts that to form a triangle, the sum of any two side lengths must be strictly greater than the third side: a + b > c, b + c > a, c + a > b.',
    advancedReasoning: 'In non-Euclidean geometries, the angle sum deviates from 180°. On a sphere (elliptic geometry), the sum of angles of a spherical triangle is strictly greater than 180° (excess is proportional to area: E = A/R²). On a saddle surface (hyperbolic geometry), the sum is strictly less than 180°. Euclidean 180° reflects flat spacetime curvature.',
    workedExamples: [
      {
        title: 'Using the exterior angle theorem to find interior angles',
        description: 'An exterior angle of a triangle is 110°, and one of its interior opposite angles is 45°. Find the other two interior angles.',
        steps: [
          'Step 1: Exterior angle = sum of two interior opposite angles: 110° = 45° + ∠B.',
          'Step 2: Subtract 45° from 110°: ∠B = 110° - 45° = 65°.',
          'Step 3: The third interior angle ∠C forms a linear pair with the exterior angle: ∠C = 180° - 110° = 70°.',
          'Step 4: Check angle sum: 45° + 65° + 70° = 180°. Verified!'
        ],
        result: 'The interior angles are 45°, 65°, and 70°.'
      },
      {
        title: 'Testing triangle existence using the triangle inequality',
        description: 'Can a triangle have sides of lengths 6 cm, 8 cm, and 15 cm?',
        steps: [
          'Step 1: Identify the two smaller sides: 6 cm and 8 cm.',
          'Step 2: Sum the two smaller sides: 6 + 8 = 14 cm.',
          'Step 3: Compare with the third side: 14 cm is NOT greater than 15 cm (14 < 15).',
          'Step 4: By the triangle inequality theorem, a triangle cannot be formed.'
        ],
        result: 'No, a triangle cannot have these side lengths because 6 + 8 < 15.'
      }
    ],
    guidedPractice: {
      question: 'The three angles of a triangle are in the ratio 1 : 2 : 3. Find the measure of each angle.',
      hint: 'Let angles be x, 2x, 3x. Their sum must equal 180°.',
      solution: 'x + 2x + 3x = 6x = 180° => x = 30°. The angles are 30°, 60°, and 90° (a right triangle).'
    },
    independentQuestions: [
      'In a right triangle, one acute angle is 37°. What is the other acute angle?',
      'Is it possible to have a triangle with angles 75°, 65°, and 50°? Explain.',
      'Explain the difference between a median and an altitude of a triangle.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-11-1',
        question: 'What is the sum of the three interior angles of any planar triangle?',
        options: ['180°', '360°', '90°', '270°'],
        correctIdx: 0,
        ruleOrFormula: '\\sum \\angle = 180^\\circ',
        explanation: 'By the angle sum theorem of Euclidean geometry, the sum of all three interior angles in any triangle is always 180°.',
        commonMistake: 'Confusing triangle interior angle sum (180°) with quadrilateral angle sum (360°).'
      },
      {
        id: 'q-c7-11-2',
        question: 'Which of the following sets of side lengths CAN form a valid triangle?',
        options: ['5 cm, 7 cm, 10 cm', '2 cm, 3 cm, 6 cm', '4 cm, 4 cm, 8 cm', '1 cm, 2 cm, 4 cm'],
        correctIdx: 0,
        ruleOrFormula: 'a + b > c \\; (\\text{for all pairs})',
        explanation: '5 + 7 = 12 > 10; 5 + 10 = 15 > 7; 7 + 10 = 17 > 5. In all other options, the sum of the two shorter sides is ≤ the longest side.',
        commonMistake: 'Choosing 4, 4, 8 because 4 + 4 = 8 (equality does not form a triangle; it collapses into a line segment).'
      },
      {
        id: 'q-c7-11-3',
        question: 'An exterior angle of a triangle is 130°. The two opposite interior angles are equal. What is each?',
        options: ['65°', '50°', '75°', '60°'],
        correctIdx: 0,
        ruleOrFormula: '\\theta_{\\text{ext}} = x + x = 2x \\implies 2x = 130^\\circ',
        explanation: 'Since the exterior angle equals the sum of the two equal opposite angles: 2x = 130° => x = 65°.',
        commonMistake: 'Calculating 180° - 130° = 50° (which is the adjacent interior angle).'
      }
    ],
    interactiveToolId: 'tool-c7-triangles',
    relatedActivityLabel: 'Triangle Angle Sum & Exterior Angle Laboratory'
  },
  {
    id: 'c7-12',
    number: 'Chapter 12',
    title: 'Geometric Twins',
    classLevel: 7,
    unit: 'Geometric Reasoning',
    description: 'Master congruence of planar figures and triangles: SSS (Side-Side-Side), SAS (Side-Angle-Side), ASA (Angle-Side-Angle), and RHS (Right angle-Hypotenuse-Side) criteria.',
    learningObjectives: [
      'Define congruence as exact correspondence in shape and size (superposition)',
      'Write congruence statements matching corresponding vertices accurately (ΔABC ≅ ΔPQR)',
      'Apply SSS, SAS, ASA, and RHS congruence criteria to prove triangles congruent',
      'Understand why AAA (Angle-Angle-Angle) and SSA do NOT guarantee congruence'
    ],
    formula: '\\Delta ABC \\cong \\Delta DEF \\implies AB = DE, \\; BC = EF, \\; CA = FD, \\; \\angle A = \\angle D, \\dots',
    simpleExplanation: 'Two shapes are congruent ("geometric twins") if you can pick one up, rotate or flip it, and place it exactly over the other with nothing sticking out. For triangles, you only need to match 3 specific parts (like SSS or SAS) to know all 6 parts match!',
    detailedExplanation: 'Two figures are congruent if they coincide when superimposed. For triangles, congruence criteria establish that checking 3 corresponding elements guarantees congruence of all 6: (1) SSS: three corresponding sides equal. (2) SAS: two sides and the included angle equal. (3) ASA: two angles and the included side equal. (4) RHS: right angle, hypotenuse, and one leg equal. Corresponding parts of congruent triangles are congruent (CPCTC).',
    advancedReasoning: 'Why does SSA (Side-Side-Angle) fail? In the ambiguous case of trigonometry, given two sides a, b and a non-included acute angle A, if a < b and a > b sin A, there exist two non-congruent triangles satisfying these measurements (one acute, one obtuse). Hence SSA is invalid in general.',
    workedExamples: [
      {
        title: 'Proving triangle congruence via SAS criterion',
        description: 'In ΔABC and ΔDEF, AB = DE = 5 cm, AC = DF = 7 cm, and included angle ∠A = ∠D = 50°. Are they congruent? What can be concluded about BC and EF?',
        steps: [
          'Step 1: Check corresponding side 1: AB = DE = 5 cm.',
          'Step 2: Check included angle between sides: ∠A = ∠D = 50°.',
          'Step 3: Check corresponding side 2: AC = DF = 7 cm.',
          'Step 4: By the SAS congruence criterion, ΔABC ≅ ΔDEF.',
          'Step 5: By CPCTC (corresponding parts of congruent triangles), BC = EF, ∠B = ∠E, and ∠C = ∠F.'
        ],
        result: 'ΔABC ≅ ΔDEF (by SAS). Therefore BC = EF.'
      },
      {
        title: 'Applying RHS congruence in isosceles triangle altitude',
        description: 'In isosceles triangle ABC with AB = AC, altitude AD is drawn perpendicular to BC. Prove that AD bisects BC.',
        steps: [
          'Step 1: Consider right triangles ΔADB and ΔADC.',
          'Step 2: ∠ADB = ∠ADC = 90° (Right angle condition).',
          'Step 3: Hypotenuse AB = Hypotenuse AC (Given, since triangle is isosceles).',
          'Step 4: Side AD is common to both triangles: AD = AD (Common leg).',
          'Step 5: By the RHS criterion, ΔADB ≅ ΔADC.',
          'Step 6: By CPCTC, BD = CD. Hence altitude AD bisects BC.'
        ],
        result: 'BD = CD (proven via RHS congruence).'
      }
    ],
    guidedPractice: {
      question: 'Why does AAA (Angle-Angle-Angle) NOT prove triangle congruence?',
      hint: 'Think about magnifying or shrinking a triangle without changing its shape.',
      solution: 'Equal angles guarantee the same shape (similarity), but not the same size. An equilateral triangle of side 2 cm and another of side 10 cm both have angles 60°, 60°, 60° but are not congruent.'
    },
    independentQuestions: [
      'State which congruence criterion applies if XY = PQ, ∠X = ∠P, and XZ = PR.',
      'In ΔPQR, if PQ = PR, prove that angles opposite to these sides (∠Q and ∠R) are equal.',
      'Can two triangles with sides 4 cm, 5 cm, 6 cm and 4 cm, 6 cm, 5 cm be congruent? Write the correspondence.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-12-1',
        question: 'Which of the following is NOT a valid congruence criterion for triangles?',
        options: ['AAA (Angle-Angle-Angle)', 'SSS (Side-Side-Side)', 'SAS (Side-Angle-Side)', 'RHS (Right angle-Hypotenuse-Side)'],
        correctIdx: 0,
        ruleOrFormula: '\\text{AAA ensures similarity, not congruence}',
        explanation: 'AAA only proves that two triangles have the same shape (they are similar), but their sizes can be completely different.',
        commonMistake: 'Assuming that since SSS works, AAA must work too.'
      },
      {
        id: 'q-c7-12-2',
        question: 'In the SAS criterion, what does the A stand for?',
        options: ['The angle included strictly between the two equal sides', 'Any angle in the triangle', 'The largest angle', 'An acute angle'],
        correctIdx: 0,
        ruleOrFormula: '\\text{The angle must be included between the two sides}',
        explanation: 'In SAS, the angle must lie strictly between the two specified sides. If the angle is non-included (SSA), congruence cannot be guaranteed.',
        commonMistake: 'Accepting any arbitrary angle.'
      },
      {
        id: 'q-c7-12-3',
        question: 'If ΔABC ≅ ΔXYZ under the correspondence ABC ↔ XYZ, which side corresponds to BC?',
        options: ['YZ', 'XY', 'XZ', 'ZX'],
        correctIdx: 0,
        ruleOrFormula: 'BC \\leftrightarrow YZ',
        explanation: 'In the correspondence ABC ↔ XYZ, the second and third letters BC correspond directly to the second and third letters YZ.',
        commonMistake: 'Selecting XZ.'
      }
    ],
    interactiveToolId: 'tool-c7-congruence',
    relatedActivityLabel: 'Geometric Twins Congruence Criteria Tester'
  },
  {
    id: 'c7-13',
    number: 'Chapter 13',
    title: 'Constructions and Tilings',
    classLevel: 7,
    unit: 'Geometric Reasoning',
    description: 'Construct triangles using SSS, SAS, ASA, and RHS data; explore regular tessellations, tilings of the plane, and the mathematical requirement that angles around a vertex sum to 360°.',
    learningObjectives: [
      'Construct triangles using ruler and compass given three sides (SSS), two sides and included angle (SAS), or two angles and side (ASA)',
      'Calculate the interior angle of any regular n-sided polygon using (n - 2) × 180° / n',
      'Understand why only regular triangles, squares, and hexagons form monohedral regular tilings',
      'Create semi-regular and dual tessellation patterns'
    ],
    formula: '\\text{Interior Angle } \\theta = \\frac{(n - 2) \\times 180^\\circ}{n}, \\quad \\sum \\theta_{\\text{vertex}} = 360^\\circ',
    simpleExplanation: 'Tiling (tessellation) is covering a flat floor with tiles so there are no gaps and no overlaps. To fit together at a point, the corners of the tiles meeting there must add up to exactly 360°! That is why bathroom tiles are usually squares, rectangles, or hexagons.',
    detailedExplanation: 'Triangle construction requires satisfying existence conditions (e.g. triangle inequality for SSS). In tessellations, polygons tile the Euclidean plane if and only if around every vertex, the sum of meeting interior angles equals 360°. For a regular n-gon, interior angle is θ = (n - 2) × 180° / n. If k identical regular n-gons meet at a vertex: k × θ = 360°, giving k × (n - 2) × 180° / n = 360°, which simplifies to (n - 2)(k - 2) = 4. The only integer solutions are (n=3, k=6) triangles, (n=4, k=4) squares, and (n=6, k=3) hexagons.',
    advancedReasoning: 'Penrose tilings: Non-periodic tilings can cover the plane without translational symmetry using two shapes (dart and kite, or two rhombi) based on the golden ratio φ = (1 + √5)/2. This connects discrete geometry with 5-fold quasicrystal physics discovered in modern materials science.',
    workedExamples: [
      {
        title: 'Constructing ΔABC with AB = 6 cm, BC = 5 cm, and ∠B = 60° (SAS)',
        description: 'Provide the sequential construction steps using straightedge, compass, and protractor.',
        steps: [
          'Step 1: Draw base line segment AB of length 6 cm using ruler.',
          'Step 2: At vertex B, construct an angle of 60° using compass arcs or protractor.',
          'Step 3: Along the 60° ray from B, measure an arc of length 5 cm with the compass and mark point C.',
          'Step 4: Join point C to point A with a straightedge. ΔABC is the required triangle.'
        ],
        result: 'ΔABC constructed with AB = 6 cm, BC = 5 cm, ∠B = 60°.'
      },
      {
        title: 'Mathematical proof why regular pentagons cannot tile the plane alone',
        description: 'Show why a bathroom floor cannot be tiled using only regular pentagons.',
        steps: [
          'Step 1: Calculate the interior angle of a regular pentagon (n = 5): θ = (5 - 2) × 180° / 5 = 3 × 180° / 5 = 108°.',
          'Step 2: Check if 360° is divisible by 108°: 360° ÷ 108° = 3.333...',
          'Step 3: Three pentagons around a vertex sum to 3 × 108° = 324° (leaving a gap of 36°).',
          'Step 4: Four pentagons sum to 4 × 108° = 432° (overlapping by 72°).',
          'Step 5: Since no whole number of regular pentagons can sum to 360°, they cannot tile the plane.'
        ],
        result: 'Regular pentagons cannot tile because 360° is not an integer multiple of 108°.'
      }
    ],
    guidedPractice: {
      question: 'How many equilateral triangles meet at each vertex in a regular triangular tiling?',
      hint: 'The interior angle of an equilateral triangle is 60°. Divide 360° by 60°.',
      solution: '360° ÷ 60° = 6 equilateral triangles meet at each vertex.'
    },
    independentQuestions: [
      'Can a triangle be constructed with sides 3 cm, 4 cm, 8 cm? Justify.',
      'Calculate the interior angle of a regular octagon and explain what shape must combine with octagons to tile a floor.',
      'Draw the three regular tilings of the plane.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-13-1',
        question: 'Which of the following regular polygons CANNOT tile the plane by itself?',
        options: ['Regular pentagon', 'Square', 'Equilateral triangle', 'Regular hexagon'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Angle must divide } 360^\\circ: \\; 108^\\circ \\nmid 360^\\circ',
        explanation: 'A regular pentagon has interior angle 108°, which does not divide 360° evenly (360 / 108 = 3.33).',
        commonMistake: 'Selecting regular hexagon (its 120° angle divides 360° into 3).'
      },
      {
        id: 'q-c7-13-2',
        question: 'What is the interior angle of a regular hexagon?',
        options: ['120°', '108°', '135°', '90°'],
        correctIdx: 0,
        ruleOrFormula: '\\theta = \\frac{(6 - 2) \\times 180^\\circ}{6} = \\frac{4 \\times 180^\\circ}{6} = 120^\\circ',
        explanation: '(6 - 2) × 180° / 6 = 720° / 6 = 120°.',
        commonMistake: 'Confusing hexagon (120°) with pentagon (108°).'
      },
      {
        id: 'q-c7-13-3',
        question: 'To tile a floor completely without gaps or overlaps, the sum of angles around every vertex must equal:',
        options: ['360°', '180°', '720°', '540°'],
        correctIdx: 0,
        ruleOrFormula: '\\sum \\theta = 360^\\circ \\; (\\text{full circle})',
        explanation: 'A full rotation around any planar vertex forms a complete angle of 360°.',
        commonMistake: 'Choosing 180° (which is a straight line, not a complete vertex surrounding).'
      }
    ],
    interactiveToolId: 'tool-c7-tilings',
    relatedActivityLabel: 'Tessellation & Regular Polygon Tiling Studio'
  },

  // ================= UNIT: FRACTIONS AND DATA =================
  {
    id: 'c7-14',
    number: 'Chapter 14',
    title: 'Working with Fractions',
    classLevel: 7,
    unit: 'Fractions & Data Reasoning',
    description: 'Master fraction multiplication, fraction division via reciprocal (multiplicative inverse), operations with mixed numbers, and multi-step real-world proportional rate problems.',
    learningObjectives: [
      'Multiply fractions as taking parts of parts: a/b × c/d = (a×c)/(b×d)',
      'Define the reciprocal of a fraction and understand why product of reciprocals is 1',
      'Divide fractions by multiplying by the reciprocal: a/b ÷ c/d = a/b × d/c',
      'Solve complex multi-step word problems involving fractions of quantities'
    ],
    formula: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}, \\quad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} = \\frac{ad}{bc}',
    simpleExplanation: 'To multiply fractions, multiply tops with tops and bottoms with bottoms! To divide fractions, remember: "Keep, Change, Flip"! Keep the first fraction, change division to multiplication, and flip the second fraction upside down (its reciprocal).',
    detailedExplanation: 'Multiplication of fractions represents finding a fractional portion of an existing fraction: 1/2 × 3/4 represents half of three-quarters, giving 3/8. The reciprocal (multiplicative inverse) of a non-zero fraction a/b is b/a because (a/b) × (b/a) = 1. Dividing by a/b answers "how many groups of a/b fit inside the dividend", which is identical to scaling by its reciprocal b/a. Always simplify before multiplying by cancelling common factors between numerators and denominators.',
    advancedReasoning: 'Field axioms: In the field of rational numbers ℚ, every non-zero element has a unique multiplicative inverse. Division is formally defined as multiplication by this inverse: x ÷ y = x · y⁻¹. This maintains consistency with field multiplication properties and associativity.',
    workedExamples: [
      {
        title: 'Dividing mixed numbers',
        description: 'Evaluate: 3 1/3 ÷ 2 2/9 and express in simplest form.',
        steps: [
          'Step 1: Convert both mixed numbers to improper fractions: 3 1/3 = 10/3; 2 2/9 = 20/9.',
          'Step 2: Rewrite division as multiplication by the reciprocal: (10/3) ÷ (20/9) = (10/3) × (9/20).',
          'Step 3: Cross-cancel common factors: 10 and 20 divide by 10 (giving 1 and 2); 9 and 3 divide by 3 (giving 3 and 1).',
          'Step 4: Multiply simplified terms: (1 × 3) / (1 × 2) = 3/2.',
          'Step 5: Convert back to mixed number: 1 1/2.'
        ],
        result: '3/2 or 1 1/2.'
      },
      {
        title: 'Fraction of a quantity word problem',
        description: 'A drum contains 48 liters of milk. If 3/8 of the milk is sold in the morning and 1/4 of the original quantity is sold in the afternoon, how many liters remain?',
        steps: [
          'Step 1: Milk sold in morning = 3/8 × 48 = 3 × 6 = 18 liters.',
          'Step 2: Milk sold in afternoon = 1/4 × 48 = 12 liters.',
          'Step 3: Total milk sold = 18 + 12 = 30 liters.',
          'Step 4: Remaining milk = 48 - 30 = 18 liters.'
        ],
        result: '18 liters remain in the drum.'
      }
    ],
    guidedPractice: {
      question: 'Evaluate: 5/7 of 42/25.',
      hint: '"Of" indicates multiplication. Cancel common factors between 5 and 25, and 7 and 42.',
      solution: '(5/7) × (42/25) = (1/1) × (6/5) = 6/5 = 1 1/5.'
    },
    independentQuestions: [
      'Evaluate: (2/5) × (15/16) ÷ (3/8).',
      'The product of two fractions is 14/15. If one fraction is 7/10, find the other.',
      'A car travels 16 km on 1 liter of petrol. How far will it travel on 2 3/4 liters?'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-14-1',
        question: 'What is the reciprocal of 3 2/5?',
        options: ['5/17', '17/5', '5/3', '2 3/5'],
        correctIdx: 0,
        ruleOrFormula: '3 \\frac{2}{5} = \\frac{17}{5} \\implies \\text{Reciprocal} = \\frac{5}{17}',
        explanation: 'Convert to improper fraction first: 3 2/5 = 17/5. The reciprocal flips numerator and denominator, giving 5/17.',
        commonMistake: 'Flipping only the fractional part without converting whole number first.'
      },
      {
        id: 'q-c7-14-2',
        question: 'Evaluate: 4/9 ÷ 2/3.',
        options: ['2/3', '8/27', '3/2', '4/6'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{4}{9} \\times \\frac{3}{2} = \\frac{12}{18} = \\frac{2}{3}',
        explanation: '(4/9) × (3/2) = (4×3)/(9×2) = 12/18 = 2/3.',
        commonMistake: 'Multiplying directly without flipping: 4/9 × 2/3 = 8/27.'
      },
      {
        id: 'q-c7-14-3',
        question: 'What is 1/2 of 1/4 of a circle?',
        options: ['1/8 of the circle', '1/6 of the circle', '1/2 of the circle', '3/4 of the circle'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{1}{2} \\times \\frac{1}{4} = \\frac{1}{8}',
        explanation: 'Half of one-quarter is 1/8.',
        commonMistake: 'Adding fractions: 1/2 + 1/4 = 3/4.'
      }
    ],
    interactiveToolId: 'tool-c6-fractions',
    relatedActivityLabel: 'Fraction Arithmetic & Visual Strip Calculator'
  },
  {
    id: 'c7-15',
    number: 'Chapter 15',
    title: 'Connecting the Dots',
    classLevel: 7,
    unit: 'Fractions & Data Reasoning',
    description: 'Connect data points through line graphs, coordinate grids, continuous trends, reading double bar graphs, and introductory mean, median, mode, and range.',
    learningObjectives: [
      'Plot and read data on line graphs displaying continuous change over time (temperature, growth)',
      'Construct and interpret double bar graphs for comparing two categories side-by-side',
      'Compute central tendency metrics: Arithmetic Mean, Median, and Mode for datasets',
      'Calculate Range (Maximum - Minimum) to measure data spread'
    ],
    formula: '\\text{Mean } \\bar{x} = \\frac{\\sum x_i}{N}, \\quad \\text{Range} = x_{\\max} - x_{\\min}',
    simpleExplanation: 'A line graph connects dots with straight lines to show how something changes over time, like daily temperature or height growth. The slope of the line shows whether values are rising steeply, falling, or staying steady!',
    detailedExplanation: 'Data collected over regular continuous intervals of time (time-series data) is best visualized through line graphs, where the horizontal x-axis represents time and the vertical y-axis represents the dependent quantity. Double bar graphs allow direct side-by-side comparison of two independent groups (e.g. boys vs girls scores). Central tendency metrics summarize data: Mean = sum divided by count; Median = middle value when sorted; Mode = most frequent value; Range = difference between extreme values.',
    advancedReasoning: 'Sensitivity to outliers: The arithmetic mean is heavily skewed by extreme values (outliers), whereas the median is robust. In skewed distributions (such as household income), the median provides a far more representative measure of central tendency than the mean.',
    workedExamples: [
      {
        title: 'Calculating Mean, Median, Mode, and Range of test scores',
        description: 'Find the mean, median, mode, and range of the scores: 8, 5, 9, 7, 5, 6, 9, 5, 10.',
        steps: [
          'Step 1: Count total values: N = 9 scores.',
          'Step 2: Calculate Mean: Sum = 8 + 5 + 9 + 7 + 5 + 6 + 9 + 5 + 10 = 64. Mean = 64 / 9 ≈ 7.11.',
          'Step 3: Arrange in ascending order for Median: 5, 5, 5, 6, 7, 8, 9, 9, 10.',
          'Step 4: Median is the 5th value: Median = 7.',
          'Step 5: Mode is the value appearing most frequently: 5 appears 3 times. Mode = 5.',
          'Step 6: Range = Highest - Lowest = 10 - 5 = 5.'
        ],
        result: 'Mean ≈ 7.11, Median = 7, Mode = 5, Range = 5.'
      },
      {
        title: 'Interpreting a temperature line graph',
        description: 'Temperatures recorded from 6 AM to 12 PM are: 6 AM: 18°C, 8 AM: 22°C, 10 AM: 27°C, 12 PM: 31°C. Find the rate of warming between 6 AM and 10 AM.',
        steps: [
          'Step 1: Temperature at 6 AM = 18°C; at 10 AM = 27°C.',
          'Step 2: Temperature rise = 27°C - 18°C = 9°C.',
          'Step 3: Elapsed time = 10 AM - 6 AM = 4 hours.',
          'Step 4: Average rate of warming = 9°C / 4 hours = 2.25°C per hour.'
        ],
        result: 'Warming rate = 2.25°C per hour.'
      }
    ],
    guidedPractice: {
      question: 'The mean of 5 numbers is 20. If one number is excluded, their mean becomes 18. What was the excluded number?',
      hint: 'Sum of 5 numbers = 5 × 20 = 100. Sum of 4 numbers = 4 × 18 = 72.',
      solution: 'Excluded number = 100 - 72 = 28.'
    },
    independentQuestions: [
      'Draw a double bar graph comparing rainfall in two cities over four months.',
      'Explain how you would determine whether to use mean or median to report average house prices.',
      'The runs scored by 11 players in a cricket match are: 12, 105, 56, 15, 20, 0, 30, 48, 80, 20, 14. Find the median.'
    ],
    chapterQuiz: [
      {
        id: 'q-c7-15-1',
        question: 'What is the median of the numbers: 14, 6, 22, 18, 9, 12, 25?',
        options: ['14', '18', '12', '15'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Sort data: } 6, 9, 12, 14, 18, 22, 25 \\implies \\text{4th value is } 14',
        explanation: 'Sort data in ascending order: 6, 9, 12, 14, 18, 22, 25. With N = 7, the middle value is the 4th element, which is 14.',
        commonMistake: 'Picking the middle value without sorting first (which was 18).'
      },
      {
        id: 'q-c7-15-2',
        question: 'If the highest value in a dataset is 92 and the range is 45, what is the lowest value?',
        options: ['47', '57', '137', '45'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Range} = \\text{Max} - \\text{Min} \\implies \\text{Min} = 92 - 45 = 47',
        explanation: 'Min = Max - Range = 92 - 45 = 47.',
        commonMistake: 'Adding 92 + 45 = 137.'
      },
      {
        id: 'q-c7-15-3',
        question: 'Which graph type is best suited for showing changes continuously over time?',
        options: ['Line graph', 'Pictograph', 'Pie chart', 'Tally table'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Line graph displays continuous temporal trends}',
        explanation: 'Line graphs connect consecutive data points with line segments, highlighting trends, rates of increase, and fluctuations over time.',
        commonMistake: 'Choosing pictograph or pie chart (which show parts of a categorical whole).'
      }
    ],
    interactiveToolId: 'tool-c6-data-handling',
    relatedActivityLabel: 'Line Graph & Statistical Trend Explorer'
  }
];
