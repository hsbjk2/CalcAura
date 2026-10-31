/**
 * Class-Specific Foundation Mathematics Learning Modules
 * Pure class-based learning progression:
 * - Structured concepts, real-world examples, guided practice, quizzes, and revision.
 */

export interface ChapterCurriculumContent {
  classGrade: number;
  chapterNumber: number;
  chapterTitle: string;
  learningObjective: string;
  conceptIntroduction: string;
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
  revisionExercises: string[];
}

export const CHAPTER_CURRICULUM_MAP: Record<string, ChapterCurriculumContent> = {
  // Class 1 Chapter 1: Shapes & Space
  'g1-ch1': {
    classGrade: 1,
    chapterNumber: 1,
    chapterTitle: 'Shapes & Space (Spatial Understanding)',
    learningObjective: 'Develop spatial vocabulary (inside/outside, bigger/smaller, top/bottom) and classify 2D shapes (circle, square, triangle) in real toys and everyday objects.',
    conceptIntroduction: 'Shapes are all around us! Some objects have round, smooth edges that roll easily (like a football or an orange), while other objects have flat surfaces and sharp corners that slide or stack (like a toy building block or a book).',
    illustratedExample: {
      title: 'Puppy sorting his toys into baskets',
      description: 'Puppy has a toy ball ⚽ and a square building block 🟦. Which toy can roll across the room?',
      steps: [
        'Step 1: Check the surface of the ball. It is completely curved with zero sharp corners.',
        'Step 2: Check the building block. It has flat rectangular faces and 8 sharp corners.',
        'Step 3: Curved objects roll when pushed on a slope.',
      ],
      result: 'The round ball ⚽ rolls smoothly, while the square block 🟦 slides.',
    },
    guidedPractice: {
      question: 'Is an orange 🍊 more like a circle or a square? Will it roll or slide?',
      hint: 'Think about whether an orange has flat edges or round curved edges.',
      solution: 'An orange is round like a circle and sphere, so it rolls smoothly across the floor!',
    },
    independentQuestions: [
      'Name two things in your classroom that have flat surfaces and can be stacked.',
      'Can you stack round balls on top of each other without them falling? Why or why not?',
      'Draw one shape that rolls and one shape that slides.',
    ],
    chapterQuiz: [
      {
        id: 'q1-1',
        question: 'Which of these objects rolls when pushed on a floor?',
        options: ['A square storybook', 'A round tennis ball', 'A wooden pencil box', 'A square brick'],
        correctIdx: 1,
        ruleOrFormula: 'Curved boundary objects roll along smooth planes.',
        explanation: 'A tennis ball is circular and spherical with no sharp corners, so it rolls.',
        commonMistake: 'Confusing sliding flat objects with rolling curved objects.',
      },
      {
        id: 'q1-2',
        question: 'Look at a slice of fresh pizza 🍕. What shape does it look like most?',
        options: ['Circle', 'Triangle', 'Square', 'Rectangle'],
        correctIdx: 1,
        ruleOrFormula: '3 straight edges meeting at 3 corners form a triangle.',
        explanation: 'A pizza slice has 3 corners and 3 sides, forming a triangular shape.',
        commonMistake: 'Calling the whole round pizza when asking about a single cut slice.',
      },
      {
        id: 'q1-3',
        question: 'Which word describes the kitten sitting under the table?',
        options: ['Top', 'Inside', 'Bottom / Under', 'Outside'],
        correctIdx: 2,
        ruleOrFormula: 'Spatial position: below a surface is "under / bottom".',
        explanation: 'Sitting below the table tabletop means the kitten is "under" or at the "bottom".',
        commonMistake: 'Mixing up "under" with "inside".',
      },
    ],
    revisionExercises: [
      'Look around your room: Point to 3 round objects and 3 square objects.',
      'Check if your water bottle can both slide on its flat base and roll on its curved side.',
    ],
  },

  // Class 1 Chapter 2: Numbers 1 to 9
  'g1-ch2': {
    classGrade: 1,
    chapterNumber: 2,
    chapterTitle: 'Numbers from One to Nine (Quantity Association)',
    learningObjective: 'Establish one-to-one counting correspondence, numeral identification from 1 to 9, and the concept of zero as an empty collection.',
    conceptIntroduction: 'Every number tells us "how many" objects are in a group. When we count, we touch each toy one time and say the number name in order: 1 (One), 2 (Two), 3 (Three), up to 9 (Nine).',
    illustratedExample: {
      title: 'Counting ripe apples on a branch',
      description: 'Count the apples: 🍎 🍎 🍎. How many apples are there?',
      steps: [
        'Step 1: Point to the first apple and say "1".',
        'Step 2: Point to the second apple and say "2".',
        'Step 3: Point to the third apple and say "3".',
      ],
      result: 'The last number said is 3, so there are exactly 3 apples.',
    },
    guidedPractice: {
      question: 'If you have 4 toy cars and you give 1 car to a friend, how many cars are left in your hands?',
      hint: 'Count backward by 1 starting from 4: 4, 3...',
      solution: '4 take away 1 leaves 3 toy cars left!',
    },
    independentQuestions: [
      'Write down numbers from 1 to 9 in ascending order.',
      'Which number comes immediately before 7?',
      'If a fruit basket has zero mangoes, what does zero mean?',
    ],
    chapterQuiz: [
      {
        id: 'q2-1',
        question: 'How many fingers do you have on one hand?',
        options: ['4 fingers', '5 fingers', '6 fingers', '10 fingers'],
        correctIdx: 1,
        ruleOrFormula: 'Standard human hand cardinal count = 5 digits.',
        explanation: 'One hand has 1 thumb + 4 fingers = 5 fingers.',
        commonMistake: 'Counting fingers on both hands (which is 10) instead of one hand.',
      },
      {
        id: 'q2-2',
        question: 'Which number is greater: 8 or 5?',
        options: ['5 is greater', '8 is greater', 'Both are equal', 'Neither'],
        correctIdx: 1,
        ruleOrFormula: 'On the number line, numbers farther to the right have greater magnitude.',
        explanation: '8 is more than 5 because 8 comes after 5 when counting forward.',
        commonMistake: 'Confusing before and after on the number sequence.',
      },
      {
        id: 'q2-3',
        question: 'What number represents an empty plate with no cookies left?',
        options: ['1', '0 (Zero)', '9', '10'],
        correctIdx: 1,
        ruleOrFormula: 'Zero (0) denotes an empty set or absence of items.',
        explanation: 'When nothing is present in a collection, the count is zero (0).',
        commonMistake: 'Saying 1 instead of 0 for nothing.',
      },
    ],
    revisionExercises: [
      'Count 7 pencils in your pencil case and put them in a row.',
      'Practice writing numerals 1, 2, 3, 4, 5, 6, 7, 8, 9 clearly.',
    ],
  },
};

/**
 * Return curriculum metadata and learning modules for any chapter
 */
export function getCurriculumLearningContent(
  chapterId: string,
  classGrade: number,
  chapterNum: number,
  title: string
): ChapterCurriculumContent {
  if (CHAPTER_CURRICULUM_MAP[chapterId]) {
    return CHAPTER_CURRICULUM_MAP[chapterId];
  }

  // General age-appropriate mathematical progression generator
  return {
    classGrade,
    chapterNumber: chapterNum,
    chapterTitle: title,
    learningObjective: `Master core mathematical thinking, spatial/numerical representation, and problem-solving for ${title}.`,
    conceptIntroduction: `In this chapter, students explore ${title}. We learn step-by-step using visual demonstrations, real-world models, and structured mathematical representations.`,
    illustratedExample: {
      title: `Step-by-step example for ${title}`,
      description: `Learn how to model and solve practical problems in ${title}.`,
      steps: [
        'Step 1: Read the problem carefully and identify the quantities given.',
        'Step 2: Choose the appropriate mathematical operation or visual representation.',
        'Step 3: Solve systematically and check your answer with real-world verification.',
      ],
      result: `Verified solution for ${title} complete!`,
    },
    guidedPractice: {
      question: `Try solving a guided example for ${title}: What is the primary mathematical principle used here?`,
      hint: `Think about the definition and properties learned in the chapter introduction.`,
      solution: `Apply standard mathematical reasoning to verify the result step-by-step.`,
    },
    independentQuestions: [
      `Practice Question 1 on ${title}: Solve using visual arrays, diagrams, or number lines.`,
      `Practice Question 2 on ${title}: Compare your answer with a real-world example.`,
      `Practice Question 3 on ${title}: Explain your method step-by-step.`,
    ],
    chapterQuiz: [
      {
        id: `${chapterId}-q1`,
        question: `What is the central mathematical concept behind ${title}?`,
        options: [
          'Systematic logical calculation and pattern recognition',
          'Guessing random numbers without checking',
          'Ignoring units and measurements',
          'Skipping step-by-step proofs',
        ],
        correctIdx: 0,
        ruleOrFormula: `Core concept: ${title} foundation principles.`,
        explanation: 'Mathematical mastery relies on structured logic, verified steps, and pattern recognition.',
        commonMistake: 'Rushing without observing the mathematical pattern.',
      },
      {
        id: `${chapterId}-q2`,
        question: `When checking your answer in ${title}, which step is best practice?`,
        options: [
          'Verify using the inverse operation or visual representation',
          'Close the book immediately without reviewing',
          'Change the numbers to make it simpler',
          'Only check if someone tells you to',
        ],
        correctIdx: 0,
        ruleOrFormula: 'Self-verification through inverse operations.',
        explanation: 'Checking work with an inverse operation (like addition checking subtraction) guarantees accuracy.',
        commonMistake: 'Skipping the verification check.',
      },
      {
        id: `${chapterId}-q3`,
        question: `How does progressive practice support problem solving in Class ${classGrade}?`,
        options: [
          'Builds conceptual mastery from visual models to abstract calculations',
          'Relying solely on calculators without foundational skills',
          'Memorizing numbers without understanding their meaning',
          'Skipping practical word problems',
        ],
        correctIdx: 0,
        ruleOrFormula: 'Progressive mathematical reasoning and foundation building.',
        explanation: 'Understanding foundational concepts with visual representations allows learners to solve increasingly complex problems with confidence.',
        commonMistake: 'Prioritizing mechanical drills over conceptual understanding.',
      },
    ],
    revisionExercises: [
      `Summarize the key mathematical rules of ${title} in your notebook.`,
      `Solve 2 practice problems from the chapter using everyday objects or sketches.`,
    ],
  };
}
