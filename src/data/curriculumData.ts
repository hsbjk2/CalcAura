export interface CurriculumChapter {
  id: string;
  number: string;
  title: string;
  description: string;
  latex: string;
  targetStageId: string;
  actionLabel: string;
  unit: string;
}

export interface CurriculumUnit {
  id: string;
  title: string;
  chapters: CurriculumChapter[];
}


export const CLASS_10_CHAPTERS: CurriculumChapter[] = [
  {
    id: 'c10-01',
    number: 'Chapter 01',
    title: 'Real Numbers',
    unit: 'Unit 1: Number Systems & Algebra',
    description: 'Euclidean division lemma, Fundamental Theorem of Arithmetic, and algebraic irrationality proofs.',
    latex: 'a = bq + r, \\quad 0 \\le r < b',
    targetStageId: 'stage-07',
    actionLabel: 'Open Formula Compendium',
  },
  {
    id: 'c10-02',
    number: 'Chapter 02',
    title: 'Polynomials',
    unit: 'Unit 1: Number Systems & Algebra',
    description: 'Zeroes of quadratic and cubic polynomials, relation between coefficients and roots.',
    latex: 'P(x) = ax^2 + bx + c, \\quad \\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}',
    targetStageId: 'stage-04',
    actionLabel: 'Solve in Equation Solver',
  },
  {
    id: 'c10-03',
    number: 'Chapter 03',
    title: 'Pair of Linear Equations in Two Variables',
    unit: 'Unit 1: Number Systems & Algebra',
    description: 'Algebraic substitution, elimination proofs, and Cramer’s determinant classification for 2×2 systems.',
    latex: '\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}',
    targetStageId: 'stage-04',
    actionLabel: 'Open 2×2 Linear Solver',
  },
  {
    id: 'c10-04',
    number: 'Chapter 04',
    title: 'Quadratic Equations',
    unit: 'Unit 1: Number Systems & Algebra',
    description: 'Discriminant analysis (Δ = b² - 4ac), quadratic formula derivation, and real/complex nature of roots.',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac',
    targetStageId: 'stage-04',
    actionLabel: 'Open Quadratic Engine',
  },
  {
    id: 'c10-05',
    number: 'Chapter 05',
    title: 'Arithmetic Progressions',
    unit: 'Unit 1: Number Systems & Algebra',
    description: 'Common difference, general nth term progression, and cumulative sum of first n terms.',
    latex: 'a_n = a + (n-1)d, \\quad S_n = \\frac{n}{2}[2a + (n-1)d]',
    targetStageId: 'stage-08',
    actionLabel: 'Practice AP Exercises',
  },
  {
    id: 'c10-06',
    number: 'Chapter 06',
    title: 'Triangles',
    unit: 'Unit 2: Euclidean Geometry',
    description: 'Criteria for similarity of triangles, Thales’ basic proportionality theorem, and Euclidean Pythagorean proof.',
    latex: 'a^2 + b^2 = c^2, \\quad \\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}',
    targetStageId: 'stage-03',
    actionLabel: 'Interactive Triangle Geometry',
  },
  {
    id: 'c10-07',
    number: 'Chapter 07',
    title: 'Coordinate Geometry',
    unit: 'Unit 3: Coordinate Systems',
    description: 'Distance formula between points, section ratio formula, and coordinate Cartesian plotting.',
    latex: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}, \\quad P\\left(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n}\\right)',
    targetStageId: 'stage-02',
    actionLabel: 'Open Graphing Engine',
  },
  {
    id: 'c10-08',
    number: 'Chapter 08',
    title: 'Introduction to Trigonometry',
    unit: 'Unit 4: Trigonometry',
    description: 'Right-angled trigonometric ratios (sin, cos, tan), standard angle evaluations, and fundamental identities.',
    latex: '\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta',
    targetStageId: 'stage-07',
    actionLabel: 'Trigonometric Identities',
  },
  {
    id: 'c10-09',
    number: 'Chapter 09',
    title: 'Applications of Trigonometry',
    unit: 'Unit 4: Trigonometry',
    description: 'Heights and distances, angles of elevation and depression with dynamic right-triangle visualization.',
    latex: 'h = d \\cdot \\tan\\theta, \\quad \\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}}',
    targetStageId: 'stage-03',
    actionLabel: 'Model Triangle Heights',
  },
  {
    id: 'c10-10',
    number: 'Chapter 10',
    title: 'Circles',
    unit: 'Unit 2: Euclidean Geometry',
    description: 'Tangents to a circle, radius-tangent perpendicularity, and equality of tangent lengths from an external point.',
    latex: 'PT^2 = PA \\cdot PB, \\quad \\angle OPT = 90^\\circ',
    targetStageId: 'stage-03',
    actionLabel: 'Explore Circle Geometry',
  },
  {
    id: 'c10-11',
    number: 'Chapter 11',
    title: 'Areas Related to Circles',
    unit: 'Unit 5: Mensuration',
    description: 'Arc length, sector area, and segment geometry of circular boundaries and planar composite regions.',
    latex: 'A_{\\text{sector}} = \\frac{\\theta}{360^\\circ} \\pi r^2, \\quad L = \\frac{\\theta}{360^\\circ} 2\\pi r',
    targetStageId: 'stage-03',
    actionLabel: 'Sector Area Mensuration',
  },
  {
    id: 'c10-12',
    number: 'Chapter 12',
    title: 'Surface Areas and Volumes',
    unit: 'Unit 5: Mensuration',
    description: 'Solid mensuration of cylinders, cones, spheres, hemispheres, and combined composite bodies.',
    latex: 'V_{\\text{cyl}} = \\pi r^2 h, \\quad V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h, \\quad V_{\\text{sph}} = \\frac{4}{3}\\pi r^3',
    targetStageId: 'stage-03',
    actionLabel: '3D Solid Mensuration',
  },
  {
    id: 'c10-13',
    number: 'Chapter 13',
    title: 'Statistics',
    unit: 'Unit 6: Statistics & Probability',
    description: 'Mean, median, and mode of grouped frequency distributions, cumulative frequency, and variance metrics.',
    latex: '\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}, \\quad \\sigma = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{N}}',
    targetStageId: 'stage-06',
    actionLabel: 'Launch Statistics Toolkit',
  },
  {
    id: 'c10-14',
    number: 'Chapter 14',
    title: 'Probability',
    unit: 'Unit 6: Statistics & Probability',
    description: 'Classical probability definition, sample spaces, complementary events, and experimental ratios.',
    latex: 'P(E) = \\frac{n(E)}{n(S)}, \\quad P(E) + P(\\bar{E}) = 1',
    targetStageId: 'stage-08',
    actionLabel: 'Practice Probability Sets',
  },
];

export const CLASS_12_CHAPTERS: CurriculumChapter[] = [
  {
    id: 'c12-01',
    number: 'Chapter 01',
    title: 'Relations and Functions',
    unit: 'Unit 1: Relations & Functions',
    description: 'Equivalence relations (reflexive, symmetric, transitive), injective, surjective, and bijective mappings.',
    latex: '(f \\circ g)(x) = f(g(x)), \\quad f: A \\to B',
    targetStageId: 'stage-02',
    actionLabel: 'Plot Functions in Grapher',
  },
  {
    id: 'c12-02',
    number: 'Chapter 02',
    title: 'Inverse Trigonometric Functions',
    unit: 'Unit 1: Relations & Functions',
    description: 'Principal value branches, domain and range restrictions, and algebraic identities of inverse trig functions.',
    latex: '\\arcsin(x) + \\arccos(x) = \\frac{\\pi}{2}, \\quad x \\in [-1, 1]',
    targetStageId: 'stage-02',
    actionLabel: 'Plot Inverse Curves',
  },
  {
    id: 'c12-03',
    number: 'Chapter 03',
    title: 'Matrices',
    unit: 'Unit 2: Linear Algebra',
    description: 'Matrix algebra, addition, scalar and matrix products, transpose properties, symmetric and skew-symmetric matrices.',
    latex: '(AB)^T = B^T A^T, \\quad A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
    targetStageId: 'stage-06',
    actionLabel: 'Open Matrix Calculator',
  },
  {
    id: 'c12-04',
    number: 'Chapter 04',
    title: 'Determinants',
    unit: 'Unit 2: Linear Algebra',
    description: 'Minors, cofactors, determinant evaluations, Cramer’s rule, and invertible matrix theorems.',
    latex: 'A^{-1} = \\frac{1}{\\det(A)}\\operatorname{adj}(A), \\quad \\det(AB) = \\det(A)\\det(B)',
    targetStageId: 'stage-06',
    actionLabel: 'Compute Determinants & Inverses',
  },
  {
    id: 'c12-05',
    number: 'Chapter 05',
    title: 'Continuity and Differentiability',
    unit: 'Unit 3: Calculus',
    description: 'Limits, continuity, chain rule, implicit differentiation, logarithmic differentiation, and second-order derivatives.',
    latex: '\\lim_{x \\to c} f(x) = f(c), \\quad \\frac{d}{dx}[f(g(x))] = f\'(g(x))g\'(x)',
    targetStageId: 'stage-02',
    actionLabel: 'Inspect Tangent Derivative',
  },
  {
    id: 'c12-06',
    number: 'Chapter 06',
    title: 'Applications of Derivatives',
    unit: 'Unit 3: Calculus',
    description: 'Rate of change, monotonic increasing/decreasing intervals, tangent and normal slopes, and local maxima/minima.',
    latex: 'y - y_0 = f\'(x_0)(x - x_0), \\quad f\'\'(x) = 0 \\implies \\text{Inflection Point}',
    targetStageId: 'stage-02',
    actionLabel: 'Tangent Slopes & Extrema',
  },
  {
    id: 'c12-07',
    number: 'Chapter 07',
    title: 'Integrals',
    unit: 'Unit 3: Calculus',
    description: 'Definite and indefinite integrals, integration by parts, partial fractions, and fundamental calculus theorem.',
    latex: '\\int u \\, dv = uv - \\int v \\, du, \\quad \\int_a^b f(x)dx = F(b) - F(a)',
    targetStageId: 'stage-02',
    actionLabel: 'Shade Definite Integral',
  },
  {
    id: 'c12-08',
    number: 'Chapter 08',
    title: 'Applications of Integrals',
    unit: 'Unit 3: Calculus',
    description: 'Area under single curves, parabolas, circles, and bounded region between intersecting functions.',
    latex: 'A = \\int_a^b [f_1(x) - f_2(x)] \\, dx',
    targetStageId: 'stage-02',
    actionLabel: 'Inspect Area Under Curve',
  },
  {
    id: 'c12-09',
    number: 'Chapter 09',
    title: 'Differential Equations',
    unit: 'Unit 3: Calculus',
    description: 'Order and degree, general and particular solutions, separable variables, and first-order linear integrating factors.',
    latex: '\\frac{dy}{dx} + P(x)y = Q(x), \\quad \\text{I.F.} = e^{\\int P(x)dx}',
    targetStageId: 'stage-07',
    actionLabel: 'Differential Eq Formulas',
  },
  {
    id: 'c12-10',
    number: 'Chapter 10',
    title: 'Vector Algebra',
    unit: 'Unit 4: Vectors & 3D Geometry',
    description: 'Position vectors, dot product, cross product, projection of vectors, and direction cosines in 3D Euclidean space.',
    latex: '\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad |\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta',
    targetStageId: 'stage-03',
    actionLabel: 'Interactive Vector Analysis',
  },
  {
    id: 'c12-11',
    number: 'Chapter 11',
    title: 'Three-Dimensional Geometry',
    unit: 'Unit 4: Vectors & 3D Geometry',
    description: 'Direction cosines and direction ratios of lines, Cartesian and vector equations of lines and planes, and shortest distance.',
    latex: '\\frac{x - x_1}{l} = \\frac{y - y_1}{m} = \\frac{z - z_1}{n}, \\quad ax + by + cz + d = 0',
    targetStageId: 'stage-01',
    actionLabel: 'Explore 3D Manifolds',
  },
  {
    id: 'c12-12',
    number: 'Chapter 12',
    title: 'Linear Programming',
    unit: 'Unit 5: Linear Programming & Probability',
    description: 'Linear objective functions, constraints inequalities, feasible regions, and corner point optimal solution.',
    latex: '\\max Z = c_1x_1 + c_2x_2 \\quad \\text{subject to } Ax \\le b, \\; x \\ge 0',
    targetStageId: 'stage-02',
    actionLabel: 'Graph Feasible Boundaries',
  },
  {
    id: 'c12-13',
    number: 'Chapter 13',
    title: 'Probability',
    unit: 'Unit 5: Linear Programming & Probability',
    description: 'Conditional probability, multiplication theorem, independent events, Bayes’ theorem, and Gaussian distributions.',
    latex: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum P(E_k)P(A|E_k)}',
    targetStageId: 'stage-06',
    actionLabel: 'Bayes & Gaussian Stats',
  },
];

export function groupChaptersByUnit(chapters: CurriculumChapter[]): CurriculumUnit[] {
  const unitsMap = new Map<string, CurriculumChapter[]>();
  for (const ch of chapters) {
    const existing = unitsMap.get(ch.unit) || [];
    existing.push(ch);
    unitsMap.set(ch.unit, existing);
  }

  return Array.from(unitsMap.entries()).map(([unitTitle, chs], idx) => ({
    id: `unit-${idx + 1}`,
    title: unitTitle,
    chapters: chs,
  }));
}
