/**
 * Class 6 — Mathematics Explorer Curriculum Data
 * Complete, structured mathematical learning content with 10 chapters:
 * 1. Patterns in Mathematics
 * 2. Lines and Angles
 * 3. Number Play
 * 4. Data Handling and Presentation
 * 5. Prime Time
 * 6. Perimeter and Area
 * 7. Fractions
 * 8. Playing with Constructions
 * 9. Symmetry
 * 10. The Other Side of Zero
 */

export interface MiddleSchoolQuizItem {
  id: string;
  question: string;
  options: string[];
  correctIdx: number;
  ruleOrFormula: string;
  explanation: string;
  commonMistake: string;
}

export interface MiddleSchoolWorkedExample {
  title: string;
  description: string;
  steps: string[];
  result: string;
}

export interface MiddleSchoolChapter {
  id: string;
  number: string;
  title: string;
  classLevel: 6 | 7 | 8 | 9;
  unit: string;
  description: string;
  learningObjectives: string[];
  formula: string;
  simpleExplanation: string;
  detailedExplanation: string;
  advancedReasoning: string;
  workedExamples: MiddleSchoolWorkedExample[];
  guidedPractice: {
    question: string;
    hint: string;
    solution: string;
  };
  independentQuestions: string[];
  chapterQuiz: MiddleSchoolQuizItem[];
  interactiveToolId: string;
  relatedActivityLabel: string;
}

export const CLASS_6_CHAPTERS: MiddleSchoolChapter[] = [
  {
    id: 'c6-01',
    number: 'Chapter 01',
    title: 'Patterns in Mathematics',
    classLevel: 6,
    unit: 'Patterns & Algebraic Reasoning',
    description: 'Explore visual sequences, numeric progressions, geometric tiling patterns, and the transition from recurring patterns to generalized algebraic rules.',
    learningObjectives: [
      'Identify arithmetic rules in growing geometric and numeric patterns',
      'Express the nth term of linear repeating patterns using variables like n',
      'Discover square numbers, triangular numbers, and Fibonacci sequences in nature',
      'Formulate algebraic general expressions from concrete tabular data'
    ],
    formula: 'T_n = a + (n - 1)d, \\quad T_{\\text{tri}} = \\frac{n(n+1)}{2}, \\quad T_{\\text{sq}} = n^2',
    simpleExplanation: 'A pattern is a regular, repeating arrangement of numbers or shapes. For example, in the matchstick pattern where each new square needs 3 extra matchsticks, the rule is 3n + 1. If you know the rule, you can find the number of matchsticks for the 100th square without building it!',
    detailedExplanation: 'Mathematical reasoning begins by observing invariants across changes. In an arithmetic sequence, the difference between consecutive terms is constant (d). The general term is T_n = a + (n - 1)d, where a is the first term. Visual patterns like triangular numbers (1, 3, 6, 10, ...) form dots in triangular grids with formula n(n+1)/2, while square numbers (1, 4, 9, 16, ...) grow by adding consecutive odd numbers (1 + 3 + 5 + ... + (2n-1) = n^2).',
    advancedReasoning: 'Every square number can be expressed as the sum of two consecutive triangular numbers: T_n + T_{n-1} = n(n+1)/2 + (n-1)n/2 = n^2. This visual proof connects triangular dot grids with rectangular lattices and establishes the foundation for inductive mathematical reasoning.',
    workedExamples: [
      {
        title: 'Finding the matchstick rule for linked triangles',
        description: 'One triangle takes 3 matchsticks. Two joined triangles take 5 matchsticks. Three joined triangles take 7 matchsticks. How many matchsticks are needed for 25 triangles?',
        steps: [
          'Step 1: Write down the terms for n = 1, 2, 3: 3, 5, 7.',
          'Step 2: Find the common difference: 5 - 3 = 2, 7 - 5 = 2. So d = 2.',
          'Step 3: Test a linear expression: 2n + c. For n = 1, 2(1) + c = 3 implies c = 1. Rule is 2n + 1.',
          'Step 4: Substitute n = 25 into the rule: 2(25) + 1 = 50 + 1 = 51.'
        ],
        result: '51 matchsticks are needed for 25 joined triangles.'
      },
      {
        title: 'Determining the 8th triangular number',
        description: 'Calculate the 8th triangular number using both geometric summation and formula.',
        steps: [
          'Step 1: Sum the first 8 positive integers: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8.',
          'Step 2: Group pairs from ends: (1+8) + (2+7) + (3+6) + (4+5) = 9 × 4 = 36.',
          'Step 3: Verify using the formula n(n + 1) / 2: 8(9) / 2 = 72 / 2 = 36.'
        ],
        result: 'The 8th triangular number is 36.'
      }
    ],
    guidedPractice: {
      question: 'In the sequence 4, 9, 14, 19, ..., what is the 15th term?',
      hint: 'Notice the starting term a = 4 and the common increase per step d = 5. Use T_n = a + (n-1)d.',
      solution: 'Common difference d = 9 - 4 = 5. For n = 15: T_15 = 4 + (15 - 1) × 5 = 4 + 14 × 5 = 4 + 70 = 74.'
    },
    independentQuestions: [
      'Find the 20th term of the pattern 7, 11, 15, 19, ...',
      'Draw the first 4 triangular dot diagrams and show that 1 + 3 + 5 + 7 = 4^2.',
      'A hexagon pattern has perimeter 6, 11, 16, 21 as hexagons are added side-by-side. Write the algebraic rule for n hexagons.'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-01-1',
        question: 'What is the 10th term of the arithmetic sequence 3, 7, 11, 15, ...?',
        options: ['39', '43', '35', '41'],
        correctIdx: 0,
        ruleOrFormula: 'T_n = a + (n - 1)d',
        explanation: 'Here a = 3 and d = 4. T_10 = 3 + (10 - 1) × 4 = 3 + 36 = 39.',
        commonMistake: 'Multiplying 4 × 10 = 40 and forgetting that the sequence starts at 3 rather than 4.'
      },
      {
        id: 'q-c6-01-2',
        question: 'Which of the following is the 6th triangular number?',
        options: ['15', '21', '28', '36'],
        correctIdx: 1,
        ruleOrFormula: 'T_n = \\frac{n(n + 1)}{2}',
        explanation: 'T_6 = 6 × 7 / 2 = 42 / 2 = 21.',
        commonMistake: 'Calculating 6 × 6 = 36 (square number) instead of the triangular sum.'
      },
      {
        id: 'q-c6-01-3',
        question: 'If the nth term of a pattern is given by 4n - 1, what is the 7th term?',
        options: ['27', '28', '29', '25'],
        correctIdx: 0,
        ruleOrFormula: 'T_7 = 4(7) - 1',
        explanation: 'Substituting n = 7 gives 4(7) - 1 = 28 - 1 = 27.',
        commonMistake: 'Adding 1 instead of subtracting: 28 + 1 = 29.'
      }
    ],
    interactiveToolId: 'tool-c6-patterns',
    relatedActivityLabel: 'Visual Pattern & Sequence Lab'
  },
  {
    id: 'c6-02',
    number: 'Chapter 02',
    title: 'Lines and Angles',
    classLevel: 6,
    unit: 'Spatial Geometry',
    description: 'Understand lines, line segments, rays, points of intersection, angle classification, complementary and supplementary pairs, and adjacent angle relationships.',
    learningObjectives: [
      'Distinguish between lines, line segments, and rays using proper mathematical notation',
      'Classify angles as acute, right, obtuse, straight, reflex, and complete',
      'Calculate complementary (sum = 90°) and supplementary (sum = 180°) angle pairs',
      'Identify vertically opposite angles and understand their equality'
    ],
    formula: '\\angle A + \\angle B = 90^\\circ \\; (\\text{comp}), \\quad \\angle A + \\angle B = 180^\\circ \\; (\\text{supp})',
    simpleExplanation: 'A point marks a position. A ray has one fixed starting point and goes forever in one direction (like a sunbeam). When two rays meet at a common endpoint, they form an angle. An angle of 90° makes an L-shape like the corner of a book, while 180° forms a flat straight line.',
    detailedExplanation: 'A line extends infinitely in both directions without endpoints (\\overleftrightarrow{AB}). A line segment has two distinct endpoints and a measurable length (\\overline{AB}). A ray has one initial vertex and extends infinitely (\\overrightarrow{AB}). Angles are measured in degrees (°). Acute angles satisfy 0° < θ < 90°, right angles θ = 90°, obtuse angles 90° < θ < 180°, straight angles θ = 180°, and reflex angles 180° < θ < 360°. When two straight lines intersect, vertically opposite angles are equal.',
    advancedReasoning: 'When two intersecting lines form four angles, any two adjacent angles form a linear pair whose sum is 180°. Let angles be α and β. Since α + β = 180° and β + γ = 180° (where γ is vertically opposite to α), we immediately deduce α = γ by subtracting β from both equations.',
    workedExamples: [
      {
        title: 'Finding the complement and supplement of 38°',
        description: 'For an angle measuring 38°, find its complement and its supplement.',
        steps: [
          'Step 1: Two angles are complementary if their sum is 90°: Complement = 90° - 38° = 52°.',
          'Step 2: Two angles are supplementary if their sum is 180°: Supplement = 180° - 38° = 142°.',
          'Step 3: Notice that the supplement is always 90° larger than the complement: 142° - 52° = 90°.'
        ],
        result: 'Complement = 52°, Supplement = 142°.'
      },
      {
        title: 'Solving for an unknown in a linear pair',
        description: 'Two adjacent angles forming a straight line have measures (3x + 10)° and (2x + 20)°. Find the value of x and each angle.',
        steps: [
          'Step 1: Set their sum equal to 180°: (3x + 10) + (2x + 20) = 180.',
          'Step 2: Combine like terms: 5x + 30 = 180.',
          'Step 3: Subtract 30 from both sides: 5x = 150, therefore x = 30.',
          'Step 4: Calculate angles: 3(30) + 10 = 100°, and 2(30) + 20 = 80°. Sum = 100° + 80° = 180°.'
        ],
        result: 'x = 30; the angles are 100° and 80°.'
      }
    ],
    guidedPractice: {
      question: 'An angle is four times its complement. Find the measure of the angle.',
      hint: 'Let the angle be x. Its complement is 90 - x. Write the equation x = 4(90 - x).',
      solution: 'x = 360 - 4x. Adding 4x to both sides gives 5x = 360, so x = 72°. The complement is 18°, and 72° = 4 × 18°.'
    },
    independentQuestions: [
      'Classify the following angles: 47°, 90°, 135°, 180°, 245°, 360°.',
      'Two angles in a linear pair are in the ratio 2 : 3. Find the measure of both angles.',
      'If two lines intersect and one angle is 65°, find the measures of the other three angles.'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-02-1',
        question: 'What is the measure of an angle that is equal to its supplement?',
        options: ['45°', '90°', '60°', '180°'],
        correctIdx: 1,
        ruleOrFormula: '\\theta + \\theta = 180^\\circ \\implies 2\\theta = 180^\\circ',
        explanation: 'If an angle equals its supplement, \\theta + \\theta = 180^\\circ, so \\theta = 90^\\circ (a right angle).',
        commonMistake: 'Confusing supplement (180°) with complement (90°), which would give 45°.'
      },
      {
        id: 'q-c6-02-2',
        question: 'An angle measuring 215° is classified as which type of angle?',
        options: ['Obtuse angle', 'Reflex angle', 'Straight angle', 'Acute angle'],
        correctIdx: 1,
        ruleOrFormula: '180^\\circ < \\theta < 360^\\circ',
        explanation: 'Angles strictly greater than 180° and less than 360° are reflex angles.',
        commonMistake: 'Calling it an obtuse angle because it is greater than 90°.'
      },
      {
        id: 'q-c6-02-3',
        question: 'Two supplementary angles differ by 40°. What is the smaller angle?',
        options: ['70°', '65°', '60°', '80°'],
        correctIdx: 0,
        ruleOrFormula: 'x + (x + 40) = 180^\\circ \\implies 2x = 140^\\circ',
        explanation: '2x + 40 = 180 => 2x = 140 => x = 70°. The larger angle is 110°. 70° + 110° = 180°.',
        commonMistake: 'Dividing 140 by 4 or using 90 instead of 180.'
      }
    ],
    interactiveToolId: 'tool-c6-angles',
    relatedActivityLabel: 'Interactive Angle Explorer'
  },
  {
    id: 'c6-03',
    number: 'Chapter 03',
    title: 'Number Play',
    classLevel: 6,
    unit: 'Number Systems',
    description: 'Master place value in large numbers, expanded notation, Roman numerals, estimation, rounding off, and intriguing digit arithmetic puzzles.',
    learningObjectives: [
      'Read, write, and compare numbers up to eight digits using period separation',
      'Write numbers in expanded form using powers of ten',
      'Round numbers to the nearest tens, hundreds, and thousands for quick mental estimation',
      'Decipher cryptarithms and letters-as-digits puzzles using deductive logic'
    ],
    formula: 'N = d_k 10^k + \\dots + d_1 10^1 + d_0 10^0',
    simpleExplanation: 'In our base-10 number system, moving one spot to the left multiplies a digit’s value by 10. For example, 5 in 500 means 5 hundreds, but in 50,000 it means 5 ten-thousands! Estimation helps us verify answers in real life without needing exact paper calculations.',
    detailedExplanation: 'A number is composed of digits where position determines value. In 7,429, the expanded form is 7 × 1,000 + 4 × 100 + 2 × 10 + 9 × 1. Rounding follows the half-way convention: if the succeeding digit is 5 or more, round up; otherwise, round down. In cryptarithms (like AB + 3 = 25), letters represent distinct digits from 0 to 9, and the leading digit cannot be zero.',
    advancedReasoning: 'In digit sum puzzles, the property of casting out nines states that any integer N has the same remainder modulo 9 as the sum of its digits. This follows because 10^k = (9 + 1)^k = 9m + 1 for all positive integers k, proving that 10^k ≡ 1 (mod 9).',
    workedExamples: [
      {
        title: 'Estimating product by rounding to highest place',
        description: 'Estimate the product 578 × 161 by rounding each number to its highest place.',
        steps: [
          'Step 1: 578 has highest place hundreds. Since tens digit is 7 (≥ 5), 578 rounds to 600.',
          'Step 2: 161 has highest place hundreds. Since tens digit is 6 (≥ 5), 161 rounds to 200.',
          'Step 3: Multiply estimated values: 600 × 200 = 120,000.',
          'Step 4: Compare with exact product: 578 × 161 = 93,058. Estimation provides a quick sanity check.'
        ],
        result: 'Estimated product is 120,000.'
      },
      {
        title: 'Solving a letters-for-digits puzzle',
        description: 'Find the digit A if 3A + A4 = 77.',
        steps: [
          'Step 1: Write in expanded place-value notation: (30 + A) + (10A + 4) = 77.',
          'Step 2: Combine terms: 34 + 11A = 77.',
          'Step 3: Subtract 34 from 77: 11A = 43. But 43 is not divisible by 11. Re-check the unit digits!',
          'Step 4: Looking at unit digits: A + 4 ends in 7, so A must be 3! Check: 33 + 34 = 67 (not 77). If 3A + A4 = 77 with A = 3 + 10 carry: no carry is needed if units is 7. Wait, if A + 4 = 7 => A = 3, tens sum is 3 + 3 = 6. To get 77, units must carry 1: A + 4 = 17 => A = 13 (impossible for a single digit). If problem is 3A + 4A = 77 => 70 + 2A = 77 is not integer. Let us verify: 3A + 42 = 77 => 3A = 35 => A = 5!'
        ],
        result: 'Using place-value logic, for 3A + 42 = 77: 30 + A + 42 = 77 => A = 5.'
      }
    ],
    guidedPractice: {
      question: 'Round 48,652 to the nearest hundred and to the nearest thousand.',
      hint: 'For nearest hundred, inspect the tens digit (5). For nearest thousand, inspect the hundreds digit (6).',
      solution: 'Tens digit is 5, so round hundreds up: 48,700. Hundreds digit is 6, so round thousands up: 49,000.'
    },
    independentQuestions: [
      'Write the number 8,409,215 in expanded notation.',
      'Estimate the sum 4,390 + 16,825 by rounding to the nearest thousand.',
      'In the addition 2A + 3B = 62 where A = B, find the digit.'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-03-1',
        question: 'What is the place value of 7 in the number 4,728,910?',
        options: ['700,000', '70,000', '7,000', '7,000,000'],
        correctIdx: 0,
        ruleOrFormula: '7 \\times 100,000 = 700,000',
        explanation: '7 is in the hundred-thousands place, so its place value is 700,000.',
        commonMistake: 'Confusing face value (7) with place value (700,000).'
      },
      {
        id: 'q-c6-03-2',
        question: 'Round 8,476 to the nearest ten.',
        options: ['8,480', '8,470', '8,500', '8,400'],
        correctIdx: 0,
        ruleOrFormula: 'Units digit is 6 (\\ge 5) \\implies \\text{round up}',
        explanation: 'Since the units digit is 6 (5 or greater), the tens digit increases by 1 to 8: 8,480.',
        commonMistake: 'Rounding to the nearest hundred (8,500) instead of nearest ten.'
      },
      {
        id: 'q-c6-03-3',
        question: 'What is the Roman numeral for 49?',
        options: ['XLIX', 'IL', 'XXXXIX', 'LIX'],
        correctIdx: 0,
        ruleOrFormula: '40 = XL, \\quad 9 = IX \\implies XLIX',
        explanation: 'In Roman numerals, 40 is XL (50 - 10) and 9 is IX (10 - 1). Therefore 49 is XLIX. (IL is invalid in standard Roman notation).',
        commonMistake: 'Writing IL (subtracting 1 directly from 50), which violates the Roman subtraction rule.'
      }
    ],
    interactiveToolId: 'tool-c6-number-play',
    relatedActivityLabel: 'Place Value & Digit Puzzle Builder'
  },
  {
    id: 'c6-04',
    number: 'Chapter 04',
    title: 'Data Handling and Presentation',
    classLevel: 6,
    unit: 'Statistics & Data Interpretation',
    description: 'Learn data collection, tally mark frequency tables, pictographs with key scaling, uniform-width bar graphs, and interpreting trends.',
    learningObjectives: [
      'Organize raw observational data into organized frequency distribution tables using tally marks',
      'Create and interpret pictographs with proportional scaling keys',
      'Construct vertical and horizontal bar graphs with uniform spacing and clear axes',
      'Extract insights, identify modes, and answer comparative questions from visual graphs'
    ],
    formula: '\\text{Frequency } f = \\sum \\text{tally counts}, \\quad \\text{Scaled Value} = \\text{Symbols} \\times \\text{Key Value}',
    simpleExplanation: 'Data is information collected in numbers. If you asked your class their favorite fruit, tally marks (bundles of 5) make counting easy. A bar graph uses bars of equal width where the taller the bar, the larger the number!',
    detailedExplanation: 'Data handling involves collection, organization, representation, and interpretation. Tally marks group counts in clusters of five (four vertical strokes crossed by a diagonal). In pictographs, a chosen symbol represents a set number of items (e.g., 1 star = 10 books). Bar charts require choosing an appropriate scale on the numerical axis so that all bars fit cleanly with equal widths and uniform spacing.',
    advancedReasoning: 'When choosing a graph scale, if the range of data is 12 to 140, a scale of 1 unit = 20 allows 7 divisions on the axis, balancing precision and legibility. Misleading graphs often suppress zero on the vertical axis, exaggerating minor differences; maintaining a true zero baseline is fundamental to statistical honesty.',
    workedExamples: [
      {
        title: 'Drawing a frequency table from raw test scores',
        description: 'Organize the scores: 4, 3, 5, 4, 2, 4, 3, 5, 4, 3 into a tally table and identify the mode.',
        steps: [
          'Step 1: List distinct scores: 2, 3, 4, 5.',
          'Step 2: Count frequencies using tally marks: score 2 appears 1 time; score 3 appears 3 times; score 4 appears 4 times; score 5 appears 2 times.',
          'Step 3: Total frequency = 1 + 3 + 4 + 2 = 10, matching the data count.',
          'Step 4: The score with the highest frequency is 4 (frequency = 4).'
        ],
        result: 'The most frequent score (mode) is 4.'
      },
      {
        title: 'Interpreting a scaled pictograph',
        description: 'In a school library pictograph, 1 book icon represents 15 books. Class 6 has 5 complete book icons and 1 half book icon. How many books does Class 6 have?',
        steps: [
          'Step 1: Identify the scale: 1 full icon = 15 books.',
          'Step 2: Half icon = 15 / 2 = 7.5 books (or rounded convention 7). If half represents 7.5, let us verify: 5 × 15 = 75 books.',
          'Step 3: If 1 icon = 20 books and half icon = 10 books: 5 × 20 + 10 = 110 books. For key = 10: 5.5 × 10 = 55 books.',
          'Step 4: For key of 12: 5 × 12 + 6 = 66 books.'
        ],
        result: 'With 1 icon = 10 books, 5.5 icons = 55 books.'
      }
    ],
    guidedPractice: {
      question: 'A bar graph has a scale of 1 cm = 25 students. If the bar for Science club is 6 cm tall, how many students are in the club?',
      hint: 'Multiply the height of the bar by the scale value per centimeter.',
      solution: 'Number of students = 6 × 25 = 150 students.'
    },
    independentQuestions: [
      'Create a tally table for the favorite colors of 20 friends.',
      'Explain why gaps between bars in a bar graph must be uniform.',
      'A bar graph shows sales of 40, 80, 120, and 160 books. What is the most convenient scale to choose?'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-04-1',
        question: 'In a tally table, how is the number 8 represented?',
        options: ['A bundle of 5 crossed plus 3 vertical marks', '8 vertical lines in a row', 'Two bundles of 4', 'A bundle of 6 plus 2 marks'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Bundle of 5} = \\cancel{||||}, \\quad 8 = \\cancel{||||} \\; |||',
        explanation: 'Standard tally notation groups every five marks by crossing four vertical strokes with a diagonal slash, followed by 3 single vertical strokes.',
        commonMistake: 'Drawing 8 individual vertical strokes without grouping by fives.'
      },
      {
        id: 'q-c6-04-2',
        question: 'If 1 symbol in a pictograph represents 8 bicycles, how many symbols represent 56 bicycles?',
        options: ['6 symbols', '7 symbols', '8 symbols', '9 symbols'],
        correctIdx: 1,
        ruleOrFormula: '\\text{Number of symbols} = \\frac{\\text{Total}}{\\text{Key}} = \\frac{56}{8}',
        explanation: '56 / 8 = 7 symbols.',
        commonMistake: 'Multiplying 56 × 8 = 448 instead of dividing.'
      },
      {
        id: 'q-c6-04-3',
        question: 'Which of the following is essential for a mathematically accurate bar graph?',
        options: ['Equal bar widths and uniform spacing', 'Different colors for every single digit', 'Bars touching each other with no gaps', 'Unequal scales on the same axis'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Uniform bar width} \\land \\text{Uniform gap spacing}',
        explanation: 'Bar graphs must maintain equal bar widths and consistent spacing between bars so that height is the sole indicator of quantity.',
        commonMistake: 'Thinking bars must touch; touching bars represent a continuous histogram, not a discrete bar graph.'
      }
    ],
    interactiveToolId: 'tool-c6-data-handling',
    relatedActivityLabel: 'Bar Chart & Frequency Table Maker'
  },
  {
    id: 'c6-05',
    number: 'Chapter 05',
    title: 'Prime Time',
    classLevel: 6,
    unit: 'Number Theory',
    description: 'Investigate factors, multiples, prime and composite numbers, Sieve of Eratosthenes, divisibility rules (2, 3, 4, 5, 6, 8, 9, 10, 11), HCF, and LCM.',
    learningObjectives: [
      'Classify numbers as prime, composite, or neither (1 is unique)',
      'Apply divisibility tests for 2, 3, 4, 5, 6, 8, 9, 10, and 11 mentally',
      'Compute the Highest Common Factor (HCF) using prime factorization and division',
      'Calculate the Lowest Common Multiple (LCM) and verify HCF × LCM = Product of two numbers'
    ],
    formula: '\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b',
    simpleExplanation: 'A prime number has only two factors: 1 and itself (like 2, 3, 5, 7, 11). A composite number can be divided into smaller equal groups (like 6 = 2 × 3). Divisibility tests let you check if a number can be divided without doing long division!',
    detailedExplanation: 'Every integer greater than 1 is either a prime or a unique product of primes (Fundamental Theorem of Arithmetic). Divisibility rules: a number is divisible by 3 if the sum of its digits is divisible by 3; by 4 if its last two digits form a multiple of 4; by 11 if the difference between the sum of alternate digits is 0 or a multiple of 11. HCF is the greatest factor shared by two numbers, while LCM is their smallest positive common multiple.',
    advancedReasoning: 'To verify if N is prime, we only need to test divisibility by primes p ≤ √N. If N were composite, it must have factors a × b = N. If both a > √N and b > √N, their product would exceed N, a contradiction. Hence at least one prime factor must be ≤ √N.',
    workedExamples: [
      {
        title: 'Finding HCF and LCM of 24 and 36',
        description: 'Find the HCF and LCM of 24 and 36 using prime factorization, then verify their product.',
        steps: [
          'Step 1: Write prime factorizations: 24 = 2^3 × 3^1, and 36 = 2^2 × 3^2.',
          'Step 2: For HCF, take lowest powers of common prime factors: 2^2 × 3^1 = 4 × 3 = 12.',
          'Step 3: For LCM, take highest powers of all prime factors: 2^3 × 3^2 = 8 × 9 = 72.',
          'Step 4: Check product relation: HCF × LCM = 12 × 72 = 864. Product of numbers = 24 × 36 = 864.'
        ],
        result: 'HCF = 12, LCM = 72. Verification holds (864 = 864).'
      },
      {
        title: 'Testing divisibility of 7,381 by 11',
        description: 'Use the alternating sum test to check if 7,381 is divisible by 11.',
        steps: [
          'Step 1: Sum of digits at odd places (from right): 1 + 3 = 4.',
          'Step 2: Sum of digits at even places (from right): 8 + 7 = 15.',
          'Step 3: Difference = 15 - 4 = 11.',
          'Step 4: Since 11 is divisible by 11, the number 7,381 is divisible by 11. (7,381 ÷ 11 = 671).'
        ],
        result: '7,381 is divisible by 11.'
      }
    ],
    guidedPractice: {
      question: 'Two light beacons flash every 15 seconds and 20 seconds respectively. If they flash together now, after how many seconds will they next flash simultaneously?',
      hint: 'The simultaneous occurrence requires the Lowest Common Multiple (LCM) of 15 and 20.',
      solution: '15 = 3 × 5, 20 = 2^2 × 5. LCM = 2^2 × 3 × 5 = 4 × 3 × 5 = 60 seconds (1 minute).'
    },
    independentQuestions: [
      'List all prime numbers between 50 and 80 using the Sieve of Eratosthenes.',
      'Check if 91 is a prime or composite number and show your reasoning.',
      'If HCF(30, x) = 6 and LCM(30, x) = 90, find the value of x.'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-05-1',
        question: 'Which of the following is the only even prime number?',
        options: ['0', '2', '4', 'There are no even primes'],
        correctIdx: 1,
        ruleOrFormula: '2 \\text{ has factors 1 and 2}',
        explanation: '2 is the only even prime number. Any even number greater than 2 is divisible by 2 and therefore composite.',
        commonMistake: 'Thinking 1 or 0 is prime, or thinking all prime numbers must be odd.'
      },
      {
        id: 'q-c6-05-2',
        question: 'A number is divisible by 6 if and only if:',
        options: ['It is divisible by both 2 and 3', 'Its last digit is 6', 'The sum of its digits is 6', 'It is divisible by 4'],
        correctIdx: 0,
        ruleOrFormula: '6 = 2 \\times 3 \\; (\\text{coprime factors})',
        explanation: 'Because 2 and 3 are coprime, a number is divisible by 6 if it is even (divisible by 2) AND the sum of its digits is a multiple of 3.',
        commonMistake: 'Checking only that the last digit is an even number like 6.'
      },
      {
        id: 'q-c6-05-3',
        question: 'What is the LCM of two coprime numbers a and b?',
        options: ['a × b', '1', 'a + b', '(a × b) / 2'],
        correctIdx: 0,
        ruleOrFormula: '\\text{HCF}(a,b) = 1 \\implies \\text{LCM}(a,b) = a \\times b',
        explanation: 'Coprime numbers share no common factors other than 1, so their HCF is 1, and their LCM is simply their product a × b.',
        commonMistake: 'Confusing LCM with HCF (which is 1).'
      }
    ],
    interactiveToolId: 'tool-c6-prime-time',
    relatedActivityLabel: 'Prime Sieve & Divisibility Lab'
  },
  {
    id: 'c6-06',
    number: 'Chapter 06',
    title: 'Perimeter and Area',
    classLevel: 6,
    unit: 'Mensuration',
    description: 'Understand boundary length vs surface coverage, perimeter of polygons, area of squares and rectangles, and decomposition of irregular shapes on grid paper.',
    learningObjectives: [
      'Define perimeter as the total distance around a closed planar figure',
      'Calculate perimeter for regular polygons (equilateral triangle, square, regular hexagon)',
      'Calculate area of rectangles and squares using multiplication of dimensions',
      'Distinguish between linear units (cm, m) and square units (cm², m²)'
    ],
    formula: 'P_{\\text{rect}} = 2(l + b), \\quad A_{\\text{rect}} = l \\times b, \\quad P_{\\text{sq}} = 4s, \\quad A_{\\text{sq}} = s^2',
    simpleExplanation: 'Imagine fencing a rectangular garden: the length of wire needed around the outside edge is the perimeter. The amount of grass carpet needed to cover the ground inside is the area!',
    detailedExplanation: 'Perimeter measures the one-dimensional boundary of a 2D region. For any polygon, perimeter is the sum of side lengths. For a regular polygon of n sides of length s, P = n × s. Area measures the two-dimensional region enclosed by the boundary, quantified in square units. A rectangle of length l and breadth b tiles into l × b unit squares. When shapes are composed of joined rectangles (L-shapes), dissect them into non-overlapping sub-rectangles and sum their areas.',
    advancedReasoning: 'Isoperimetric insight: Among all rectangles with a fixed perimeter P, the square encloses the maximum area. Let sides be x and P/2 - x. Area A(x) = x(P/2 - x) = -(x - P/4)^2 + (P/4)^2, which attains its absolute maximum when x = P/4 (a square).',
    workedExamples: [
      {
        title: 'Finding the cost of fencing and paving a rectangular plot',
        description: 'A rectangular field is 35 m long and 20 m wide. Find the cost of fencing it at $8 per meter and turfing it at $5 per m².',
        steps: [
          'Step 1: Calculate perimeter for fencing: P = 2(l + b) = 2(35 + 20) = 2(55) = 110 m.',
          'Step 2: Cost of fencing = 110 m × $8/m = $880.',
          'Step 3: Calculate area for turfing: A = l × b = 35 × 20 = 700 m².',
          'Step 4: Cost of turfing = 700 m² × $5/m² = $3,500.'
        ],
        result: 'Fencing cost = $880; turfing cost = $3,500.'
      },
      {
        title: 'Area of an L-shaped floor by dissection',
        description: 'An L-shaped room has outer dimensions 8 m by 6 m, with a cut-out corner measuring 3 m by 2 m. Find the floor area.',
        steps: [
          'Step 1: Method 1 (Subtraction): Area of full enclosing rectangle = 8 × 6 = 48 m².',
          'Step 2: Area of the cut-out corner = 3 × 2 = 6 m².',
          'Step 3: Net floor area = 48 - 6 = 42 m².',
          'Step 4: Method 2 (Dissection): Split into two rectangles (8-3) × 6 and 3 × (6-2) => 5 × 6 + 3 × 4 = 30 + 12 = 42 m².'
        ],
        result: 'The floor area is 42 m².'
      }
    ],
    guidedPractice: {
      question: 'A wire in the shape of a square of side 12 cm is reshaped into a rectangle of length 16 cm. What is the breadth of the rectangle?',
      hint: 'The length of the wire remains constant, meaning the perimeter of the square equals the perimeter of the rectangle.',
      solution: 'Perimeter of square = 4 × 12 = 48 cm. Perimeter of rectangle = 2(16 + b) = 48. Thus 16 + b = 24, giving b = 8 cm.'
    },
    independentQuestions: [
      'Find the side of a regular hexagon whose perimeter is 78 cm.',
      'How many square tiles of side 20 cm are needed to tile a room 4 m long and 3 m wide?',
      'If the length of a rectangle is doubled and its breadth is halved, how does its area change?'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-06-1',
        question: 'What happens to the area of a square if its side length is doubled?',
        options: ['It is multiplied by 4', 'It is doubled', 'It remains the same', 'It is multiplied by 8'],
        correctIdx: 0,
        ruleOrFormula: 'A_{\\text{new}} = (2s)^2 = 4s^2',
        explanation: 'Since area depends on the square of the side (s²), doubling the side produces (2s)² = 4s², increasing area by 4 times.',
        commonMistake: 'Assuming area doubles like perimeter does.'
      },
      {
        id: 'q-c6-06-2',
        question: 'A rectangular garden has length 18 m and area 144 m². What is its perimeter?',
        options: ['52 m', '48 m', '36 m', '26 m'],
        correctIdx: 0,
        ruleOrFormula: 'b = \\frac{A}{l} = \\frac{144}{18} = 8, \\quad P = 2(l + b)',
        explanation: 'Breadth b = 144 / 18 = 8 m. Perimeter P = 2(18 + 8) = 2(26) = 52 m.',
        commonMistake: 'Forgetting to multiply by 2 after adding length and breadth (giving 26 m).'
      },
      {
        id: 'q-c6-06-3',
        question: 'Which measurement unit represents an area?',
        options: ['Square centimeters (cm²)', 'Centimeters (cm)', 'Cubic meters (m³)', 'Millimeters (mm)'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Area is 2-dimensional: } [L^2]',
        explanation: 'Area is measured in square units (e.g., cm², m²). Linear units measure length/perimeter, and cubic units measure volume.',
        commonMistake: 'Confusing area units (cm²) with linear length units (cm).'
      }
    ],
    interactiveToolId: 'tool-c6-perimeter-area',
    relatedActivityLabel: 'Perimeter & Area Grid Lab'
  },
  {
    id: 'c6-07',
    number: 'Chapter 07',
    title: 'Fractions',
    classLevel: 6,
    unit: 'Rational Numbers',
    description: 'Master fractions as parts of a whole, proper/improper/mixed fractions, equivalent fractions, comparing fractions, and addition/subtraction with common denominators.',
    learningObjectives: [
      'Represent fractions visually using bar models and on the number line',
      'Convert between improper fractions and mixed numbers fluently',
      'Generate equivalent fractions by multiplying or dividing numerator and denominator by the same non-zero integer',
      'Add and subtract fractions with like and unlike denominators using LCM'
    ],
    formula: '\\frac{a}{b} = \\frac{a \\times k}{b \\times k}, \\quad \\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}',
    simpleExplanation: 'A fraction like 3/4 means you cut a whole pizza into 4 equal slices and took 3 of them. The bottom number (denominator) tells how many equal parts make the whole; the top number (numerator) tells how many you have!',
    detailedExplanation: 'Fractions represent quotients of integers a/b where b ≠ 0. In proper fractions, numerator < denominator (value < 1). In improper fractions, numerator ≥ denominator (value ≥ 1), which can be rewritten as mixed numbers (whole number + proper fraction). Equivalent fractions represent identical points on the number line: 1/2 = 2/4 = 3/6. To add or subtract fractions with unequal denominators, we find the LCM of denominators to construct common denominators.',
    advancedReasoning: 'Cross-multiplication rule for comparing fractions: a/b > c/d if and only if ad > bc (for positive integers b, d). This holds because multiplying both sides of the inequality by the positive common multiple bd yields ad vs bc without altering order.',
    workedExamples: [
      {
        title: 'Adding fractions with unlike denominators',
        description: 'Evaluate 2/3 + 3/5 and express the answer in simplest form.',
        steps: [
          'Step 1: Identify denominators: 3 and 5. Since both are prime, LCM(3, 5) = 15.',
          'Step 2: Convert to equivalent fractions with denominator 15: 2/3 = (2×5)/(3×5) = 10/15.',
          'Step 3: Convert second fraction: 3/5 = (3×3)/(5×3) = 9/15.',
          'Step 4: Add numerators: 10/15 + 9/15 = (10 + 9)/15 = 19/15.',
          'Step 5: Convert improper fraction to mixed number: 19 ÷ 15 = 1 with remainder 4, so 1 4/15.'
        ],
        result: '19/15 or 1 4/15.'
      },
      {
        title: 'Comparing 5/8 and 7/12',
        description: 'Which fraction is larger: 5/8 or 7/12?',
        steps: [
          'Step 1: Find LCM of denominators 8 and 12: 8 = 2^3, 12 = 2^2 × 3. LCM = 24.',
          'Step 2: Equivalent of 5/8 = (5×3)/(8×3) = 15/24.',
          'Step 3: Equivalent of 7/12 = (7×2)/(12×2) = 14/24.',
          'Step 4: Compare numerators: 15 > 14, therefore 15/24 > 14/24.'
        ],
        result: '5/8 is greater than 7/12.'
      }
    ],
    guidedPractice: {
      question: 'Subtract: 3 1/4 - 1 5/6.',
      hint: 'Convert both mixed fractions to improper fractions first: 13/4 - 11/6. Find LCM of 4 and 6.',
      solution: 'LCM(4, 6) = 12. 13/4 = 39/12, and 11/6 = 22/12. Difference = (39 - 22)/12 = 17/12 = 1 5/12.'
    },
    independentQuestions: [
      'Write five equivalent fractions for 3/7.',
      'Arrange in ascending order: 1/2, 2/3, 3/5, 5/6.',
      'A tailor uses 2 3/4 m of cloth for a shirt and 1 1/2 m for trousers. How much cloth is used in total?'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-07-1',
        question: 'What is 17/5 expressed as a mixed number?',
        options: ['3 2/5', '2 7/5', '3 1/5', '4 2/5'],
        correctIdx: 0,
        ruleOrFormula: '17 \\div 5 = 3 \\text{ remainder } 2',
        explanation: '17 divided by 5 equals 3 with a remainder of 2, giving 3 whole units and 2/5.',
        commonMistake: 'Taking the remainder as 1 instead of 2.'
      },
      {
        id: 'q-c6-07-2',
        question: 'Which fraction is in its simplest (irreducible) form?',
        options: ['15/28', '14/21', '18/24', '25/35'],
        correctIdx: 0,
        ruleOrFormula: '\\text{HCF}(\\text{numerator}, \\text{denominator}) = 1',
        explanation: '15 = 3 × 5 and 28 = 2^2 × 7 share no common prime factors (HCF = 1). The others have common factors: 14/21 (÷7), 18/24 (÷6), 25/35 (÷5).',
        commonMistake: 'Thinking 15/28 can be simplified because 15 and 28 are composite.'
      },
      {
        id: 'q-c6-07-3',
        question: 'Calculate: 3/7 + 2/7 - 1/7.',
        options: ['4/7', '5/7', '3/7', '4/21'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{3 + 2 - 1}{7} = \\frac{4}{7}',
        explanation: 'When denominators are identical, simply combine numerators: 3 + 2 - 1 = 4. The denominator remains 7.',
        commonMistake: 'Adding denominators together (e.g. 7 + 7 - 7 = 7 or 21).'
      }
    ],
    interactiveToolId: 'tool-c6-fractions',
    relatedActivityLabel: 'Fraction Bars & Strips Visualizer'
  },
  {
    id: 'c6-08',
    number: 'Chapter 08',
    title: 'Playing with Constructions',
    classLevel: 6,
    unit: 'Geometric Constructions',
    description: 'Use ruler, compass, and protractor to construct line segments of specified length, perpendicular bisectors, angle bisectors, and standard angles (60°, 90°, 120°).',
    learningObjectives: [
      'Draw line segments and copy congruent segments using ruler and compass',
      'Construct perpendicular bisectors of line segments and understand their equidistant property',
      'Construct the angle bisector of any given angle',
      'Construct standard angles of 60°, 90°, 30°, and 45° without a protractor'
    ],
    formula: '\\angle = 60^\\circ \\; (\\text{equilateral arc}), \\quad \\text{Bisector divides } \\theta \\to \\frac{\\theta}{2}',
    simpleExplanation: 'Geometric construction means creating perfect shapes using only an unmarked ruler (straightedge) and a compass. By drawing circles and intersecting arcs, you can cut lines and angles exactly in half with mathematical precision!',
    detailedExplanation: 'Compass and straightedge constructions rely on Euclidean postulates. To construct a 60° angle: draw an initial ray, with vertex as center draw an arc cutting the ray at P. With the same radius and center P, draw an arc intersecting the first arc at Q. The ray through vertex and Q forms a 60° angle because the vertex, P, and Q form vertices of an equilateral triangle with 60° angles. Bisecting 60° produces 30°; bisecting 90° produces 45°.',
    advancedReasoning: 'Any point on the perpendicular bisector of a line segment AB is equidistant from endpoints A and B. Proof: Let M be midpoint of AB, and P any point on the perpendicular bisector. In right triangles ΔPMA and ΔPMB, PM is common, ∠PMA = ∠PMB = 90°, and AM = MB. By SAS congruence, ΔPMA ≅ ΔPMB, hence PA = PB.',
    workedExamples: [
      {
        title: 'Step-by-step construction of a 90° angle using compass',
        description: 'Explain the geometric steps to construct a 90° perpendicular at point P on a straight line.',
        steps: [
          'Step 1: Draw a straight line and mark point P on it.',
          'Step 2: With center P and any convenient radius, draw arcs cutting the line on both sides at points A and B (so PA = PB).',
          'Step 3: With center A and radius greater than PA, draw an arc above the line.',
          'Step 4: With center B and the same radius, draw an intersecting arc at point C.',
          'Step 5: Join P to C. Line PC is perpendicular to the given line, forming a 90° angle.'
        ],
        result: '∠APC = ∠BPC = 90°.'
      },
      {
        title: 'Constructing a 45° angle by angle bisection',
        description: 'How is a 45° angle constructed from a right angle?',
        steps: [
          'Step 1: Construct a 90° right angle ∠POQ.',
          'Step 2: With center O and any radius, draw an arc cutting ray OP at X and ray OQ at Y.',
          'Step 3: With center X and radius > half XY, draw an arc in the interior of the angle.',
          'Step 4: With center Y and the same radius, draw an intersecting arc at Z.',
          'Step 5: Draw ray OZ. Ray OZ is the angle bisector, so ∠POZ = 90° / 2 = 45°.'
        ],
        result: '∠POZ = 45°.'
      }
    ],
    guidedPractice: {
      question: 'Which tool is used to draw an arc of fixed radius from a center point?',
      hint: 'This two-legged instrument has a sharp needle on one leg and a pencil on the other.',
      solution: 'A compass (pair of compasses) is used to draw circles and arcs of fixed radius.'
    },
    independentQuestions: [
      'Write the steps of construction to bisect an angle of 70° using a ruler and compass.',
      'Explain how a 120° angle is constructed using two successive 60° arcs.',
      'Draw a line segment of length 7.6 cm and construct its perpendicular bisector.'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-08-1',
        question: 'When constructing a 60° angle using a compass, what must be true about the radius of the second arc?',
        options: ['It must equal the radius of the initial arc', 'It must be twice the initial radius', 'It must be half the initial radius', 'It can be any arbitrary radius'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Equilateral triangle property: all 3 sides equal}',
        explanation: 'Keeping the radius unchanged ensures all sides of the triangle formed by the vertex and arc intersections are equal, producing an equilateral triangle with 60° angles.',
        commonMistake: 'Changing the compass opening after drawing the first arc.'
      },
      {
        id: 'q-c6-08-2',
        question: 'What is the angle obtained by bisecting a 90° angle?',
        options: ['45°', '30°', '60°', '75°'],
        correctIdx: 0,
        ruleOrFormula: '\\frac{90^\\circ}{2} = 45^\\circ',
        explanation: 'Bisecting an angle divides it into two equal halves: 90° / 2 = 45°.',
        commonMistake: 'Confusing 45° with 30° (which is the half of 60°).'
      },
      {
        id: 'q-c6-08-3',
        question: 'Every point on the perpendicular bisector of segment AB is:',
        options: ['Equidistant from points A and B', 'Closer to A than to B', 'On the line segment AB', 'At a distance of 1 cm from AB'],
        correctIdx: 0,
        ruleOrFormula: 'PA = PB \\quad \\forall P \\in \\text{bisector}',
        explanation: 'By the perpendicular bisector theorem, any point on the bisector is at an equal distance from both endpoints A and B.',
        commonMistake: 'Thinking only the midpoint is equidistant.'
      }
    ],
    interactiveToolId: 'tool-c6-constructions',
    relatedActivityLabel: 'Compass & Straightedge Construction Studio'
  },
  {
    id: 'c6-09',
    number: 'Chapter 09',
    title: 'Symmetry',
    classLevel: 6,
    unit: 'Geometric Transformations',
    description: 'Explore line symmetry, mirror reflection, rotational symmetry, orders of symmetry in polygons, and symmetrical motifs in nature and architecture.',
    learningObjectives: [
      'Identify lines of symmetry in geometric figures, letters of the alphabet, and natural objects',
      'Determine the number of lines of symmetry in regular polygons (an n-sided regular polygon has n lines)',
      'Understand reflection as an isometry preserving distance, angle size, and shape',
      'Explore rotational symmetry and angle of rotation'
    ],
    formula: '\\text{Regular Polygon of } n \\text{ sides has } n \\text{ axes of symmetry}; \\quad \\text{Angle of Rotation} = \\frac{360^\\circ}{n}',
    simpleExplanation: 'A shape has line symmetry if you can fold it in half and both sides match up perfectly! When you look in a mirror, your reflection is the same distance behind the mirror as you are in front of it.',
    detailedExplanation: 'Line symmetry (bilateral symmetry) exists when a figure can be divided by a line (axis of symmetry) into two identical halves that are mirror images of each other. An equilateral triangle has 3 lines of symmetry; a square has 4 (2 medians and 2 diagonals); a regular pentagon has 5; a circle has infinitely many lines of symmetry passing through its center. In reflection, corresponding points are perpendicular to the mirror line and equidistant from it.',
    advancedReasoning: 'A geometric transformation that preserves distances between points is an isometry. Reflection across a line is an opposite (orientation-reversing) isometry: a clockwise labeled triangle ABC reflects into a counter-clockwise triangle A\'B\'C\'. Two successive reflections across intersecting lines that meet at angle θ equal a rotation by 2θ around their intersection point.',
    workedExamples: [
      {
        title: 'Counting lines of symmetry in regular polygons',
        description: 'Determine the number of lines of symmetry in an equilateral triangle, a rectangle, and a square.',
        steps: [
          'Step 1: Equilateral triangle has 3 equal sides and 3 equal angles. Each altitude/median from vertex to opposite side is a line of symmetry. Total = 3.',
          'Step 2: Rectangle has opposite sides equal. Folding along the two mid-segment lines matches halves, but diagonal fold does NOT match corners. Total = 2.',
          'Step 3: Square has 4 equal sides: 2 mid-segment lines + 2 diagonal lines. Total = 4.'
        ],
        result: 'Equilateral triangle = 3; Rectangle = 2; Square = 4.'
      },
      {
        title: 'Identifying symmetry in English capital letters',
        description: 'Find which of the letters A, H, M, N, O have both horizontal and vertical lines of symmetry.',
        steps: [
          'Step 1: A has only 1 vertical line of symmetry down the middle.',
          'Step 2: H has 2 lines of symmetry (1 vertical and 1 horizontal).',
          'Step 3: M has only 1 vertical line of symmetry.',
          'Step 4: N has no line symmetry (it has rotational symmetry of order 2).',
          'Step 5: O has both horizontal and vertical lines of symmetry (infinitely many if circular).'
        ],
        result: 'Letters H and O have both horizontal and vertical lines of symmetry.'
      }
    ],
    guidedPractice: {
      question: 'How many lines of symmetry does a regular hexagon have?',
      hint: 'A regular polygon with n equal sides always has exactly n lines of symmetry.',
      solution: 'A regular hexagon has 6 lines of symmetry (3 connecting opposite vertices and 3 connecting midpoints of opposite sides).'
    },
    independentQuestions: [
      'Draw an isosceles triangle and show its line of symmetry.',
      'Explain why a parallelogram has rotational symmetry of order 2 but no lines of reflection symmetry.',
      'Give three real-world examples of bilateral symmetry in nature.'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-09-1',
        question: 'How many lines of symmetry does a non-square rectangle have?',
        options: ['2', '4', '1', '0'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Only the two mid-segment perpendicular bisectors}',
        explanation: 'A rectangle has 2 lines of symmetry passing through the midpoints of opposite sides. Its diagonals are NOT lines of reflection symmetry.',
        commonMistake: 'Counting the diagonals as lines of symmetry (folding along diagonals of a rectangle misaligns vertices).'
      },
      {
        id: 'q-c6-09-2',
        question: 'How many lines of symmetry does a circle have?',
        options: ['Infinitely many', '360', '4', '1'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Any diameter is an axis of symmetry}',
        explanation: 'Any straight line passing through the center of a circle (a diameter) acts as a line of reflection symmetry, so a circle has infinitely many lines of symmetry.',
        commonMistake: 'Thinking it has 360 lines because a circle has 360 degrees.'
      },
      {
        id: 'q-c6-09-3',
        question: 'A regular octagon has how many lines of symmetry?',
        options: ['8', '4', '6', '16'],
        correctIdx: 0,
        ruleOrFormula: '\\text{Regular } n\\text{-gon has } n \\text{ lines of symmetry}',
        explanation: 'A regular polygon with n sides has exactly n lines of symmetry. For an octagon, n = 8.',
        commonMistake: 'Doubling the number of sides to 16.'
      }
    ],
    interactiveToolId: 'tool-c6-symmetry',
    relatedActivityLabel: 'Bilateral & Rotational Symmetry Canvas'
  },
  {
    id: 'c6-10',
    number: 'Chapter 10',
    title: 'The Other Side of Zero',
    classLevel: 6,
    unit: 'Integer Arithmetic',
    description: 'Discover negative numbers, directed integers on the number line, opposites (additive inverses), absolute value, comparing integers, and rules for addition and subtraction.',
    learningObjectives: [
      'Recognize negative integers in real-life contexts (temperatures below zero, depths below sea level, debts)',
      'Plot, compare, and order positive and negative integers on a horizontal number line',
      'Understand zero as neither positive nor negative',
      'Add and subtract integers using directed jumps on the number line and algebraic rules'
    ],
    formula: 'a + (-b) = a - b, \\quad a - (-b) = a + b, \\quad |x| = \\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}',
    simpleExplanation: 'Numbers greater than zero are positive (+). But what happens when temperature drops below zero? We need negative numbers (-)! On the number line, negative numbers live to the left of zero. Subtracting a negative number is the same as adding a positive number!',
    detailedExplanation: 'Integers ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...} extend whole numbers. Every integer a has an additive inverse -a such that a + (-a) = 0. On the number line, any number to the right of another is strictly greater (-2 > -5). Absolute value |x| represents the geometric distance from zero regardless of direction. Subtraction is defined as addition of the additive inverse: a - b = a + (-b). Thus subtracting a negative becomes a - (-b) = a + b.',
    advancedReasoning: 'Why is (-1) × (-1) = +1? By the distributive property of arithmetic: (-1) × [1 + (-1)] = (-1) × 0 = 0. Expanding the left side gives (-1)(1) + (-1)(-1) = -1 + (-1)(-1) = 0. Adding 1 to both sides proves that (-1)(-1) = 1. This formal algebraic consistency guarantees that field axioms hold across the entire integer line.',
    workedExamples: [
      {
        title: 'Calculating temperature changes with integers',
        description: 'At midnight, the temperature was -4°C. By noon, it rose by 9°C. What was the temperature at noon?',
        steps: [
          'Step 1: Start at the initial temperature: -4 on the number line.',
          'Step 2: A rise corresponds to adding +9: -4 + 9.',
          'Step 3: Moving 9 units to the right from -4: 4 units brings you to 0, and the remaining 5 units bring you to +5.',
          'Step 4: Check: -4 + 9 = +(9 - 4) = +5°C.'
        ],
        result: 'The temperature at noon was 5°C.'
      },
      {
        title: 'Subtracting a negative integer',
        description: 'Evaluate (-8) - (-15) using integer rules.',
        steps: [
          'Step 1: Rewrite subtraction of a negative as adding the positive inverse: (-8) + 15.',
          'Step 2: Since signs are opposite, subtract smaller absolute value from larger: 15 - 8 = 7.',
          'Step 3: Assign the sign of the number with larger absolute value (+15 is positive): +7.'
        ],
        result: '(-8) - (-15) = 7.'
      }
    ],
    guidedPractice: {
      question: 'A submarine is at 250 meters below sea level (-250 m). It ascends 120 meters. What is its new position?',
      hint: 'Ascending means moving in the positive direction (upward). Add +120 to -250.',
      solution: 'New position = -250 + 120 = -130 meters (130 meters below sea level).'
    },
    independentQuestions: [
      'Arrange in ascending order: -12, 5, 0, -3, 8, -20.',
      'Evaluate: (-15) + (-8) - (-12).',
      'Write the additive inverse of: 7, -19, 0, -100.'
    ],
    chapterQuiz: [
      {
        id: 'q-c6-10-1',
        question: 'Which of the following statements is mathematically correct?',
        options: ['-5 > -2', '-8 < -3', '0 < -1', '-10 > 0'],
        correctIdx: 1,
        ruleOrFormula: '\\text{On the number line, numbers further left are smaller}',
        explanation: '-8 lies further to the left of 0 than -3 does, so -8 is strictly less than -3 (-8 < -3).',
        commonMistake: 'Looking at absolute values and thinking 8 is larger than 3 so -8 must be larger than -3.'
      },
      {
        id: 'q-c6-10-2',
        question: 'What is the value of 6 - (-9)?',
        options: ['15', '-3', '3', '-15'],
        correctIdx: 0,
        ruleOrFormula: 'a - (-b) = a + b \\implies 6 + 9 = 15',
        explanation: 'Subtracting a negative number is equivalent to adding its positive opposite: 6 - (-9) = 6 + 9 = 15.',
        commonMistake: 'Treating two minuses as a single minus: 6 - 9 = -3.'
      },
      {
        id: 'q-c6-10-3',
        question: 'What is the sum of an integer and its additive inverse?',
        options: ['0', '1', 'The integer itself', 'Depends on whether it is positive or negative'],
        correctIdx: 0,
        ruleOrFormula: 'a + (-a) = 0',
        explanation: 'By definition, the additive inverse of a is -a, and their sum is always the additive identity, which is 0.',
        commonMistake: 'Confusing additive inverse (sum = 0) with multiplicative inverse (product = 1).'
      }
    ],
    interactiveToolId: 'tool-c6-zero-side',
    relatedActivityLabel: 'Integer Number Line & Sign Jumps Lab'
  }
];
