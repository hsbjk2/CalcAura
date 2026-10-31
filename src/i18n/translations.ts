export type Language = 'en' | 'de' | 'fr' | 'es' | 'it' | 'ja' | 'hi';

export interface Translations {
  tagline: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroSubtitle: string;
  exploreTools: string;
  openSolver: string;
  view3dSpace: string;
  scrollHint: string;

  // Navigation
  navOverview: string;
  navTools: string;
  navGraphing: string;
  navGeometry: string;
  navSolver: string;
  navPhysics: string;
  navStem: string;
  navFormulas: string;
  navPractice: string;
  navCurriculum: string;
  navWhiteboard: string;
  navClasses1to5: string;
  navVisualMaths: string;
  navTables: string;
  navPlayground: string;
  navAbout: string;
  navHistory: string;
  workspace: string;
  search: string;

  // 3D Scroll Section
  threeDTitle: string;
  threeDSubtitle: string;
  threeDHint: string;
  stageHero: string;
  stageSolver: string;
  stageGeometry: string;
  stageCalculus: string;
  surfaceSaddle: string;
  surfaceWave: string;
  surfaceTorus: string;
  surfaceBowl: string;

  // Tools
  geometryTitle: string;
  geometrySubtitle: string;
  solverTitle: string;
  solverSubtitle: string;
  graphingTitle: string;
  graphingSubtitle: string;
  physicsTitle: string;
  physicsSubtitle: string;
  stemTitle: string;
  stemSubtitle: string;
  formulaTitle: string;
  practiceTitle: string;

  // Navigation & Mode
  focusedMode: string;
  stageNumber: string;
  nextStage: string;
  prevStage: string;
  quickJump: string;
  currentStage: string;
  allStages: string;

  // School Curriculum Sections
  curriculumTitle: string;
  curriculumSubtitle: string;
  class10Title: string;
  class10Subtitle: string;
  class12Title: string;
  class12Subtitle: string;
  selectClass: string;
  classLevelFoundation: string;
  classLevelExplorer: string;
  classLevelSecondary: string;
  classLevelSenior: string;
  allCurriculum: string;
  launchModule: string;
  exploreChapter: string;

  // Badges, Modals & Footer
  builtBy: string;
  clientSideBadge: string;
  formulaVerified: string;
  searchPlaceholder: string;
  searchPopularTools: string;
  searchLearningEducation: string;
  searchFormulasTopics: string;
  searchRecentSearches: string;
  searchClear: string;
  searchNoResults: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutPhilosophyTitle: string;
  aboutPhilosophyQuote: string;
  aboutPhilosophyBody: string;
  zeroLatencyTitle: string;
  zeroLatencyDesc: string;
  liveTypesettingTitle: string;
  liveTypesettingDesc: string;
  privacyTitle: string;
  privacyDesc: string;
  contactLink: string;
  privacyTerms: string;
  footerDesc: string;
  footerRights: string;

  // --- NEW: About Page Redesign (Editorial) ---
  aboutHeroHeadline: string;
  aboutHeroSub: string;
  aboutExploreCta: string;
  aboutPhilTag: string;
  aboutPhilHeading: string;
  aboutPhilDesc: string;
  aboutPrinciplesTag: string;
  aboutPrinciplesHeading: string;
  aboutCalcTag: string;
  aboutCalcTitle: string;
  aboutCalcDesc: string;
  aboutVisTag: string;
  aboutVisTitle: string;
  aboutVisDesc: string;
  aboutUndTag: string;
  aboutUndTitle: string;
  aboutUndDesc: string;
  aboutAudienceTag: string;
  aboutAudienceHeading: string;
  aboutAudSchool: string;
  aboutAudSchoolDesc: string;
  aboutAudSec: string;
  aboutAudSecDesc: string;
  aboutAudEng: string;
  aboutAudEngDesc: string;
  aboutAudEdu: string;
  aboutAudEduDesc: string;
  aboutCreatorTag: string;
  aboutCreatorTitle: string;
  aboutCreatorDesc: string;
  aboutFinalHeading: string;
  aboutFinalSub: string;
  aboutFooterCopy: string;

  // --- NEW: Classes 1-5 Toy Shop Theme & Playful Math ---
  kidsFoundationBadge: string;
  kidsHeroTitle: string;
  kidsHeroSubtitle: string;
  kidsOpenVisual: string;
  kidsOpenTables: string;
  kidsOpenPlayground: string;
  kidsSelectGrade: string;
  kidsClass1Title: string;
  kidsClass2Title: string;
  kidsClass3Title: string;
  kidsClass4Title: string;
  kidsClass5Title: string;
  kidsPlayNow: string;
  kidsTapToCount: string;
  kidsAwesomeJob: string;
  kidsTryAgain: string;
  kidsPopBalloons: string;
  kidsMatchShapes: string;
  kidsToysAndAnimals: string;
  kidsInteractiveGarden: string;

  // --- NEW: Math Playground ---
  playgroundTitle: string;
  playgroundSubtitle: string;
  playgroundHeroTag: string;
  playgroundScaleTitle: string;
  playgroundScaleDesc: string;
  playgroundAdjustTeddy: string;
  playgroundScaleBalanced: string;
  playgroundScaleNotBalanced: string;
  playgroundWaveTitle: string;
  playgroundWaveDesc: string;

  // --- NEW: Homepage & Product Showcase ---
  heroEyebrow: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroDescription: string;
  heroOpenApp: string;
  heroExploreMath: string;
  heroPlatformCrafted: string;
  canvasPreviewTag: string;
  canvasTitle: string;
  canvasSubtitle: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    tagline: 'Interactive STEM & Mathematics Engine',
    heroTitle1: 'Every Calculation.',
    heroTitleHighlight: 'Every Equation.',
    heroTitle2: 'One Workspace.',
    heroSubtitle: 'Explore mathematics, solve equations with verified proofs, visualize dynamic geometry, and compute scientific datasets in one elegant workspace.',
    exploreTools: 'Explore Calculators',
    openSolver: 'Equation Solver',
    view3dSpace: '3D Scroll Experience',
    scrollHint: 'Scroll down to travel through 3D mathematical dimensions',

    navOverview: 'Overview',
    navTools: 'Tools',
    navGraphing: 'Graphing',
    navGeometry: 'Geometry',
    navSolver: 'Solver',
    navPhysics: 'Physics',
    navStem: 'STEM',
    navFormulas: 'Formulas',
    navPractice: 'Practice',
    navCurriculum: 'Curriculum',
    navWhiteboard: 'Whiteboard',
    navClasses1to5: 'Classes 1–5',
    navVisualMaths: 'Visual Maths',
    navTables: 'Tables 1–30',
    navPlayground: 'Playground 🧸',
    navAbout: 'About',
    navHistory: 'History',
    workspace: 'Workspace',
    search: 'Search (⌘K)',

    threeDTitle: '3D Mathematical Dimension Scroll',
    threeDSubtitle: 'Perspective camera travel through parametric manifolds, geometries, and coordinate surfaces.',
    threeDHint: 'Scroll down to navigate through mathematical stages',
    stageHero: 'Parametric Manifold',
    stageSolver: 'Algebraic Space',
    stageGeometry: 'Euclidean Polyhedra',
    stageCalculus: 'Calculus Trajectory',
    surfaceSaddle: 'Hyperbolic Saddle',
    surfaceWave: 'Harmonic Wave',
    surfaceTorus: 'Toroidal Manifold',
    surfaceBowl: 'Elliptic Paraboloid',

    geometryTitle: 'Interactive Geometry & Mensuration',
    geometrySubtitle: 'Real-time vector diagrams generated directly from dimensions.',
    solverTitle: 'Equation Solver & Step Proofs',
    solverSubtitle: 'Rigorous polynomial and 2×2 linear system solvers with verified substitution.',
    graphingTitle: 'Real-Time Graphing & Calculus',
    graphingSubtitle: 'Plot multi-function curves, inspect tangent slopes, and shade definite integrals.',
    physicsTitle: 'Physics & STEM Simulations',
    physicsSubtitle: 'Ballistic trajectory kinematics, harmonic pendulum, and Ohm circuit laws.',
    stemTitle: 'STEM & Student Utilities',
    stemSubtitle: 'Matrix algebra, Gaussian distributions, land plot surveys, and GPA planner.',
    formulaTitle: 'Comprehensive Formula Library',
    practiceTitle: 'Interactive Practice Worksheet',

    focusedMode: 'Focused Desk',
    stageNumber: 'Stage',
    nextStage: 'Next Stage',
    prevStage: 'Previous Stage',
    quickJump: 'Quick Jump',
    currentStage: 'Active Module',
    allStages: 'All Workspace Stages',

    curriculumTitle: 'School Mathematics Curriculum',
    curriculumSubtitle: 'Structured syllabus-aligned modules for Class 10 and Class 12 with verified proofs and interactive calculators.',
    class10Title: 'Class 10 Mathematics',
    class10Subtitle: 'Secondary school foundation: real numbers, polynomials, linear systems, quadratic equations, trigonometry, coordinate geometry, and mensuration.',
    class12Title: 'Class 12 Mathematics',
    class12Subtitle: 'Senior secondary mathematics: relations, inverse trigonometry, matrices, determinants, continuity, derivatives, integrals, vectors, and 3D geometry.',
    selectClass: "Mathematics Learning Progression",
    classLevelFoundation: "Classes 1–5: Foundation Mathematics",
    classLevelExplorer: "Classes 6–8: Mathematics Explorer",
    classLevelSecondary: "Class 9–10: Secondary Mathematics",
    classLevelSenior: "Class 12 & Higher: Senior & Advanced Mathematics",
    allCurriculum: 'Both Classes',
    launchModule: 'Launch Interactive Module',
    exploreChapter: 'Explore Chapter',

    builtBy: 'Built by HSBJK',
    clientSideBadge: '100% Client-Side Engine',
    formulaVerified: 'Mathematically Verified',
    searchPlaceholder: 'Search calculators, formulas and topics…',
    searchPopularTools: 'Popular Tools',
    searchLearningEducation: 'Learning & Education',
    searchFormulasTopics: 'Formulas & Topics',
    searchRecentSearches: 'Recent Searches',
    searchClear: 'Clear',
    searchNoResults: 'No matching calculators, formulas or topics found.',
    aboutTitle: 'About CalcAura',
    aboutSubtitle: 'Built by HSBJK',
    aboutPhilosophyTitle: 'Core Philosophy',
    aboutPhilosophyQuote: 'Calculate. Visualize. Understand. Verify.',
    aboutPhilosophyBody: 'CalcAura was crafted by HSBJK to give students, educators, and engineers a trustworthy, zero-telemetry mathematical computation environment.',
    zeroLatencyTitle: 'Zero Latency Engine',
    zeroLatencyDesc: 'All algebraic solvers, numerical integrations, and 3D diagrams run natively in your browser.',
    liveTypesettingTitle: 'Crisp KaTeX Typesetting',
    liveTypesettingDesc: 'Formulas and proofs rendered with LaTeX typography without clipping or shrinkage.',
    privacyTitle: 'Privacy-First Architecture',
    privacyDesc: 'Zero analytics telemetry, no tracking cookies, and 100% client-side computing.',
    contactLink: 'Contact Creator',
    privacyTerms: 'Privacy & Terms',
    footerDesc: 'Precision mathematics, verified proofs, and scientific computing in one elegant workspace.',
    footerRights: 'Client-side computation. Zero telemetry.',

    // About Page Redesign
    aboutHeroHeadline: 'Making mathematics clearer, one discovery at a time.',
    aboutHeroSub: 'CALCAURA brings calculations, equations, interactive visualizations, and learning together in one workspace—helping students and curious minds explore mathematics with greater clarity.',
    aboutExploreCta: 'Explore CALCAURA',
    aboutPhilTag: 'Philosophy',
    aboutPhilHeading: 'Mathematics is more than an answer.',
    aboutPhilDesc: 'We believe mathematics becomes easier to explore when numbers, equations, and visual representations work together. CALCAURA brings these experiences into one accessible workspace.',
    aboutPrinciplesTag: 'Core Principles',
    aboutPrinciplesHeading: 'How we approach learning',
    aboutCalcTag: '01 · Calculate',
    aboutCalcTitle: 'Precision in every step',
    aboutCalcDesc: 'Perform mathematical and scientific calculations with clear inputs and meaningful results.',
    aboutVisTag: '02 · Visualize',
    aboutVisTitle: 'Intuition through form',
    aboutVisDesc: 'Explore functions, shapes, graphs, and mathematical relationships through interactive representations.',
    aboutUndTag: '03 · Understand',
    aboutUndTitle: 'Depth behind the formula',
    aboutUndDesc: 'Connect the result with its formula, explanation, or visual demonstration where the relevant feature supports it.',
    aboutAudienceTag: 'Audience',
    aboutAudienceHeading: 'Designed for learners at every stage',
    aboutAudSchool: 'School Students',
    aboutAudSchoolDesc: 'Foundational mathematics brought alive with intuitive visual representations, everyday arithmetic, and step-by-step guidance.',
    aboutAudSec: 'Higher-Secondary Students',
    aboutAudSecDesc: 'Curriculum-aligned algebra, geometry proofs, trigonometry, quadratic systems, and calculus theorem derivations.',
    aboutAudEng: 'Engineering & Undergraduate Learners',
    aboutAudEngDesc: 'Matrix operations, multivariable derivatives, kinematics, physics modeling, and computational scientific exploration.',
    aboutAudEdu: 'Educators & Curious Mathematics Learners',
    aboutAudEduDesc: 'Interactive demonstration laboratories, printable student exploration sheets, and intuitive multi-dimensional visualizers.',
    aboutCreatorTag: 'Crafted with Care',
    aboutCreatorTitle: 'Built by HSBJK.',
    aboutCreatorDesc: 'CALCAURA is an evolving project focused on making mathematics easier to calculate, visualize, and understand.',
    aboutFinalHeading: 'See mathematics differently.',
    aboutFinalSub: 'Discover a more visual way to explore mathematics.',
    aboutFooterCopy: 'CALCAURA · Built by HSBJK · All rights reserved',

    // Classes 1-5 Toy Shop Theme
    kidsFoundationBadge: 'Foundation Mathematics & Toy Shop 🎪',
    kidsHeroTitle: 'Little Steps. Big Discoveries! 🎈',
    kidsHeroSubtitle: 'Learn mathematics with friendly animals, blooming flowers, colorful toys, and playful interactive games!',
    kidsOpenVisual: 'Visual Math World 🎨',
    kidsOpenTables: 'Tables 1–30 Studio 🖩',
    kidsOpenPlayground: 'Toy Playground 🧸',
    kidsSelectGrade: 'Choose Grade:',
    kidsClass1Title: 'Class 1: Friendly Animals & Toys 🐶',
    kidsClass2Title: 'Class 2: Number Fun & Garden 🌻',
    kidsClass3Title: 'Class 3: Magic Shapes & Shop 🎁',
    kidsClass4Title: 'Class 4: Multiplication Adventure 🚀',
    kidsClass5Title: 'Class 5: Fractions & Time Journey ⏱️',
    kidsPlayNow: 'Play Now! 🚀',
    kidsTapToCount: 'Tap the toys to count!',
    kidsAwesomeJob: 'Awesome job! ⭐',
    kidsTryAgain: 'Let us count together!',
    kidsPopBalloons: 'Pop balloons to subtract!',
    kidsMatchShapes: 'Match the colorful shapes!',
    kidsToysAndAnimals: 'Toys, Animals & Flowers',
    kidsInteractiveGarden: 'Playful Math Garden',

    // Math Playground
    playgroundTitle: 'Interactive Toy & STEM Playground 🧸',
    playgroundSubtitle: 'Explore real-world toy balance scales with cute teddy bears, dynamic calculus tangents, and 3D wave meshes.',
    playgroundHeroTag: 'Interactive Math Experiments',
    playgroundScaleTitle: 'Teddy Bear & Toy Balance Scale 🧸',
    playgroundScaleDesc: 'Adjust the number of Teddy Bears to level the beam and solve 2x + 4 = 10!',
    playgroundAdjustTeddy: 'Adjust Value of Unknown x (Teddy Bears):',
    playgroundScaleBalanced: 'Hooray! 2(3) + 4 = 10! The beam levels perfectly! 🎉',
    playgroundScaleNotBalanced: 'Not balanced yet! Slide x to find the magic number of teddy bears.',
    playgroundWaveTitle: '3D Parametric Wave & Surface Visualizer',
    playgroundWaveDesc: 'Real-time interactive 3D wave mesh rendered in WebGL.',

    // Homepage & Product Showcase
    heroEyebrow: 'MATHEMATICS · SCIENCE · ENGINEERING',
    heroHeadline1: 'Mathematics,',
    heroHeadline2: 'Made Visual.',
    heroDescription: 'Explore equations, understand relationships, and experience mathematics through interactive scientific visualization.',
    heroOpenApp: 'Open CalcAura',
    heroExploreMath: 'Explore Mathematics',
    heroPlatformCrafted: 'Platform Crafted by HSBJK',
    canvasPreviewTag: 'Interactive Workspace Preview',
    canvasTitle: 'A Unified Mathematical Canvas',
    canvasSubtitle: 'Scroll to rotate the workspace into focus. Seamlessly navigate curves, tangent slopes, and real roots in real time.',
  },

  hi: {
    tagline: 'इंटरएक्टिव एसटीईएम एवं गणितीय इंजन',
    heroTitle1: 'प्रत्येक गणना।',
    heroTitleHighlight: 'प्रत्येक समीकरण।',
    heroTitle2: 'एक संपूर्ण वर्कस्पेस।',
    heroSubtitle: 'गणित सीखें, सत्यापित चरणों के साथ समीकरण हल करें, गतिशील ज्यामिति देखें और वैज्ञानिक डेटा की गणना एक सुंदर वर्कस्पेस में करें।',
    exploreTools: 'कैलकुलेटर देखें',
    openSolver: 'समीकरण सॉल्वर',
    view3dSpace: '3D अनुभव',
    scrollHint: '3D गणितीय आयामों में जाने के लिए नीचे स्क्रॉल करें',

    navOverview: 'अवलोकन',
    navTools: 'उपकरण',
    navGraphing: 'ग्राफ़िंग',
    navGeometry: 'ज्यामिति',
    navSolver: 'सॉल्वर',
    navPhysics: 'भौतिकी',
    navStem: 'एसटीईएम',
    navFormulas: 'सूत्र',
    navPractice: 'अभ्यास',
    navCurriculum: 'पाठ्यक्रम',
    navWhiteboard: 'व्हाइटबोर्ड',
    navClasses1to5: 'कक्षा 1–5',
    navVisualMaths: 'विज़ुअल गणित',
    navTables: 'पहाड़े 1–30',
    navPlayground: 'खेल का मैदान 🧸',
    navAbout: 'परिचय',
    navHistory: 'इतिहास',
    workspace: 'वर्कस्पेस',
    search: 'खोजें (⌘K)',

    threeDTitle: '3D गणितीय आयाम स्क्रोल',
    threeDSubtitle: 'पैरामीट्रिक मैनिफोल्ड्स, ज्यामितियों और निर्देशांक सतहों के माध्यम से कैमरा यात्रा।',
    threeDHint: 'गणितीय चरणों में जाने के लिए नीचे स्क्रॉल करें',
    stageHero: 'पैरामीट्रिक मैनिफोल्ड',
    stageSolver: 'बीजगणितीय क्षेत्र',
    stageGeometry: 'यूक्लिडियन बहुफलक',
    stageCalculus: 'कैलकुलस प्रक्षेपवक्र',
    surfaceSaddle: 'हाइपरबोलिक काठी',
    surfaceWave: 'हार्मोनिक तरंग',
    surfaceTorus: 'टोरस मैनिफोल्ड',
    surfaceBowl: 'दीर्घवृत्तीय कटोरा',

    geometryTitle: 'इंटरएक्टिव ज्यामिति एवं क्षेत्रमिति',
    geometrySubtitle: 'दर्ज आयामों से सीधे तैयार वास्तविक समय वेक्टर आरेख।',
    solverTitle: 'समीकरण सॉल्वर और चरणबद्ध हल',
    solverSubtitle: 'सत्यापन के साथ द्विघात और रैखिक समीकरण प्रणालियाँ।',
    graphingTitle: 'वास्तविक समय ग्राफ़िंग और कैलकुलस',
    graphingSubtitle: 'बहु-फ़ंक्शन वक्र, स्पर्शरेखा ढलान और निश्चित समाकलन।',
    physicsTitle: 'भौतिकी और एसटीईएम सिमुलेशन',
    physicsSubtitle: 'प्रक्षेप्य गति प्रक्षेपवक्र, दोलन पेंडुलम और विद्युत परिपथ नियम।',
    stemTitle: 'एसटीईएम और छात्र उपयोगिताएँ',
    stemSubtitle: 'मैट्रिक्स बीजगणित, गॉसियन वितरण, भूमि माप और जीपीए प्लानर।',
    formulaTitle: 'व्यापक सूत्र संग्रह',
    practiceTitle: 'इंटरएक्टिव अभ्यास पत्रक',

    focusedMode: 'केंद्रित डेस्क',
    stageNumber: 'चरण',
    nextStage: 'अगला चरण',
    prevStage: 'पिछला चरण',
    quickJump: 'चरण चयन',
    currentStage: 'सक्रिय मॉड्यूल',
    allStages: 'सभी वर्कस्पेस मॉड्यूल',

    curriculumTitle: 'स्कूली गणित पाठ्यक्रम',
    curriculumSubtitle: 'कक्षा 10 और कक्षा 12 के लिए संरचित पाठ्यक्रम मॉड्यूल, सत्यापित हल और इंटरएक्टिव कैलकुलेटर।',
    class10Title: 'कक्षा 10 गणित (Class 10)',
    class10Subtitle: 'माध्यमिक स्तर: वास्तविक संख्याएँ, बहुपद, दो चरों वाले रैखिक समीकरण, द्विघात समीकरण, समांतर श्रेढियाँ, त्रिभुज, त्रिकोणमिति, वृत्त, पृष्ठीय क्षेत्रफल और सांख्यिकी।',
    class12Title: 'कक्षा 12 गणित (Class 12)',
    class12Subtitle: 'उच्चतर माध्यमिक: संबंध एवं फलन, प्रतिलोम त्रिकोणमितीय फलन, आव्यूह (मैट्रिक्स), सारणिक, सांतत्य तथा अवकलनीयता, समाकलन, अवकल समीकरण, सदिश एवं त्रिविमीय ज्यामिति।',
    selectClass: "गणित शिक्षण प्रगति",
    classLevelFoundation: "कक्षा 1–5: बुनियादी गणित (Foundation Mathematics)",
    classLevelExplorer: "कक्षा 6–8: गणित खोजकर्ता (Mathematics Explorer)",
    classLevelSecondary: "कक्षा 9–10: माध्यमिक गणित (Secondary Mathematics)",
    classLevelSenior: "कक्षा 12 एवं उच्च: उच्च माध्यमिक गणित (Senior Mathematics)",
    allCurriculum: 'दोनों कक्षाएँ',
    launchModule: 'मॉड्यूल प्रारंभ करें',
    exploreChapter: 'अध्याय देखें',

    builtBy: 'HSBJK द्वारा निर्मित',
    clientSideBadge: '100% क्लाइंट-साइड इंजन',
    formulaVerified: 'गणितीय रूप से सत्यापित',
    searchPlaceholder: 'कैलकुलेटर, सूत्र और विषय खोजें…',
    searchPopularTools: 'लोकप्रिय उपकरण',
    searchLearningEducation: 'अध्ययन एवं पाठ्यक्रम',
    searchFormulasTopics: 'सूत्र एवं विषय',
    searchRecentSearches: 'हाल की खोजें',
    searchClear: 'साफ़ करें',
    searchNoResults: 'कोई मेल खाता उपकरण, सूत्र या विषय नहीं मिला।',
    aboutTitle: 'CalcAura के बारे में',
    aboutSubtitle: 'HSBJK द्वारा निर्मित',
    aboutPhilosophyTitle: 'मूल दर्शन',
    aboutPhilosophyQuote: 'गणना करें। कल्पना करें। समझें। सत्यापित करें।',
    aboutPhilosophyBody: 'CalcAura को HSBJK द्वारा छात्रों, शिक्षकों और इंजीनियरों के लिए एक विश्वसनीय गणितीय संगणना वातावरण के रूप में तैयार किया गया है।',
    zeroLatencyTitle: 'शून्य विलंबता इंजन',
    zeroLatencyDesc: 'सभी बीजगणितीय हल, संख्यात्मक समाकलन और 3D आरेख सीधे आपके ब्राउज़र में निष्पादित होते हैं।',
    liveTypesettingTitle: 'सटीक KaTeX टाइपसेटिंग',
    liveTypesettingDesc: 'बिना किसी सूत्र के कटे या छोटे हुए उच्च-गुणवत्ता LaTeX सूत्र प्रदर्शन।',
    privacyTitle: 'गोपनीयता सर्वोच्च प्राथमिकता',
    privacyDesc: 'शून्य टेलीमेट्री, कोई उपयोगकर्ता डेटा ट्रैकिंग नहीं और सभी गणनाएँ केवल आपके डिवाइस पर।',
    contactLink: 'संपर्क करें',
    privacyTerms: 'गोपनीयता एवं शर्तें',
    footerDesc: 'सटीक गणित, दृश्य प्रमाण और वैज्ञानिक कंप्यूटिंग एक विश्वसनीय क्लाइंट वर्कस्पेस में।',
    footerRights: 'क्लाइंट-साइड मूल्यांकन। शून्य टेलीमेट्री।',

    // About Page Redesign in Hindi
    aboutHeroHeadline: 'गणित को अधिक स्पष्ट बनाना, एक समय में एक खोज।',
    aboutHeroSub: 'CALCAURA गणनाओं, समीकरणों, इंटरएक्टिव विज़ुअलाइज़ेशन और सीखने को एक ही वर्कस्पेस में एक साथ लाता है—छात्रों और जिज्ञासु दिमागों को अधिक स्पष्टता के साथ गणित का अन्वेषण करने में मदद करता है।',
    aboutExploreCta: 'CALCAURA का अन्वेषण करें',
    aboutPhilTag: 'दर्शन',
    aboutPhilHeading: 'गणित केवल एक उत्तर से कहीं अधिक है।',
    aboutPhilDesc: 'हमारा मानना है कि गणित का अन्वेषण तब आसान हो जाता है जब संख्याएँ, समीकरण और दृश्य प्रतिनिधित्व एक साथ काम करते हैं। CALCAURA इन अनुभवों को एक सुलभ वर्कस्पेस में लाता है।',
    aboutPrinciplesTag: 'मूल सिद्धांत',
    aboutPrinciplesHeading: 'हम सीखने के प्रति हमारा दृष्टिकोण',
    aboutCalcTag: '01 · गणना (Calculate)',
    aboutCalcTitle: 'हर कदम में सटीकता',
    aboutCalcDesc: 'स्पष्ट इनपुट और सार्थक परिणामों के साथ गणितीय और वैज्ञानिक गणनाएँ करें।',
    aboutVisTag: '02 · कल्पना (Visualize)',
    aboutVisTitle: 'आकार के माध्यम से अंतर्ज्ञान',
    aboutVisDesc: 'इंटरएक्टिव प्रतिनिधित्व के माध्यम से फलनों, आकारों, रेखांकन और गणितीय संबंधों का अन्वेषण करें।',
    aboutUndTag: '03 · समझना (Understand)',
    aboutUndTitle: 'सूत्र के पीछे की गहराई',
    aboutUndDesc: 'परिणाम को उसके सूत्र, व्याख्या या व्यावहारिक प्रदर्शन से जोड़ें जहाँ संबंधित सुविधा इसका समर्थन करती है।',
    aboutAudienceTag: 'श्रोतागण',
    aboutAudienceHeading: 'हर स्तर के शिक्षार्थियों के लिए डिज़ाइन किया गया',
    aboutAudSchool: 'स्कूली छात्र (School Students)',
    aboutAudSchoolDesc: 'सहज दृश्य अभ्यावेदन, दैनिक अंकगणित और चरण-दर-चरण मार्गदर्शन के साथ बुनियादी गणित।',
    aboutAudSec: 'उच्च-माध्यमिक छात्र (Higher-Secondary Students)',
    aboutAudSecDesc: 'पाठ्यक्रम-संरेखित बीजगणित, ज्यामिति प्रमाण, त्रिकोणमिति, द्विघात समीकरण और कैलकुलस प्रमेय।',
    aboutAudEng: 'इंजीनियरिंग एवं स्नातक शिक्षार्थी',
    aboutAudEngDesc: 'मैट्रिक्स संचालन, बहुपरिवर्ती अवकलज, किनेमेटिक्स, भौतिकी मॉडलिंग और वैज्ञानिक कंप्यूटिंग।',
    aboutAudEdu: 'शिक्षक एवं जिज्ञासु गणित शिक्षार्थी',
    aboutAudEduDesc: 'इंटरएक्टिव प्रयोगशालाएँ, मुद्रण योग्य छात्र अभ्यास पत्रक और सहज 3D विज़ुअलाइज़र।',
    aboutCreatorTag: 'देखभाल से निर्मित',
    aboutCreatorTitle: 'HSBJK द्वारा निर्मित।',
    aboutCreatorDesc: 'CALCAURA एक विकसित होने वाला प्रोजेक्ट है जो गणित को गणना, कल्पना और समझने में आसान बनाने पर केंद्रित है।',
    aboutFinalHeading: 'गणित को एक अलग नज़रिए से देखें।',
    aboutFinalSub: 'गणित का अन्वेषण करने का अधिक दृश्य और स्पष्ट तरीका खोजें।',
    aboutFooterCopy: 'CALCAURA · HSBJK द्वारा निर्मित · सर्वाधिकार सुरक्षित',

    // Classes 1-5 Toy Shop Theme in Hindi
    kidsFoundationBadge: 'बुनियादी गणित एवं खिलौनों की दुकान 🎪',
    kidsHeroTitle: 'छोटे कदम। बड़ी खोजें! 🎈',
    kidsHeroSubtitle: 'प्यारे जानवरों, खिलते फूलों, रंग-बिरंगे खिलौनों और मज़ेदार खेलों के साथ गणित सीखें!',
    kidsOpenVisual: 'विज़ुअल गणित की दुनिया 🎨',
    kidsOpenTables: 'पहाड़े 1–30 स्टूडियो 🖩',
    kidsOpenPlayground: 'खिलौना खेल का मैदान 🧸',
    kidsSelectGrade: 'कक्षा चुनें:',
    kidsClass1Title: 'कक्षा 1: प्यारे जानवर और खिलौने 🐶',
    kidsClass2Title: 'कक्षा 2: संख्याओं का मज़ा और बगीचा 🌻',
    kidsClass3Title: 'कक्षा 3: जादुई आकार और दुकान 🎁',
    kidsClass4Title: 'कक्षा 4: गुणन साहसिक यात्रा 🚀',
    kidsClass5Title: 'कक्षा 5: भिन्न एवं समय की यात्रा ⏱️',
    kidsPlayNow: 'अभी खेलें! 🚀',
    kidsTapToCount: 'गिनने के लिए खिलौनों पर टैप करें!',
    kidsAwesomeJob: 'शानदार काम! ⭐',
    kidsTryAgain: 'आइए मिलकर गिनते हैं!',
    kidsPopBalloons: 'घटाने के लिए गुब्बारे फोड़ें!',
    kidsMatchShapes: 'रंगीन आकृतियों का मिलान करें!',
    kidsToysAndAnimals: 'खिलौने, जानवर और फूल',
    kidsInteractiveGarden: 'मज़ेदार गणित का बगीचा',

    // Math Playground in Hindi
    playgroundTitle: 'इंटरएक्टिव खिलौना और एसटीईएम खेल का मैदान 🧸',
    playgroundSubtitle: 'प्यारे टेडी बियर के साथ तराजू का संतुलन, गतिशील स्पर्शरेखाएँ और 3D तरंगें देखें।',
    playgroundHeroTag: 'इंटरएक्टिव गणितीय प्रयोग',
    playgroundScaleTitle: 'टेडी बियर तराजू संतुलन 🧸',
    playgroundScaleDesc: 'तराजू को बराबर करने और 2x + 4 = 10 हल करने के लिए टेडी बियर की संख्या समायोजित करें!',
    playgroundAdjustTeddy: 'अज्ञात x (टेडी बियर) का मान बदलें:',
    playgroundScaleBalanced: 'वाह! 2(3) + 4 = 10! तराजू एकदम संतुलित हो गया! 🎉',
    playgroundScaleNotBalanced: 'अभी संतुलित नहीं हुआ! सही टेडी बियर ढूँढने के लिए स्लाइडर हिलाएँ।',
    playgroundWaveTitle: '3D पैरामीट्रिक तरंग एवं सतह विज़ुअलाइज़र',
    playgroundWaveDesc: 'WebGL में वास्तविक समय में प्रस्तुत इंटरएक्टिव 3D तरंग जाली।',

    // Homepage & Product Showcase
    heroEyebrow: 'गणित · विज्ञान · इंजीनियरिंग',
    heroHeadline1: 'गणित,',
    heroHeadline2: 'अब प्रत्यक्ष और दृश्य।',
    heroDescription: 'समीकरणों का अन्वेषण करें, संबंधों को समझें, और इंटरएक्टिव वैज्ञानिक विज़ुअलाइज़ेशन के माध्यम से गणित का अनुभव करें।',
    heroOpenApp: 'CalcAura खोलें',
    heroExploreMath: 'गणित का अन्वेषण करें',
    heroPlatformCrafted: 'HSBJK द्वारा निर्मित प्लेटफॉर्म',
    canvasPreviewTag: 'इंटरएक्टिव वर्कस्पेस पूर्वावलोकन',
    canvasTitle: 'एक एकीकृत गणितीय कैनवास',
    canvasSubtitle: 'वर्कस्पेस को फोकस में लाने के लिए स्क्रॉल करें। वास्तविक समय में वक्रों, स्पर्श रेखाओं और मूलों का अन्वेषण करें।',
  },

  ja: {
    tagline: 'インタラクティブな数学・STEMエンジン',
    heroTitle1: 'すべての計算を。',
    heroTitleHighlight: 'すべての方程式を。',
    heroTitle2: 'ひとつのワークスペースで。',
    heroSubtitle: '検証済みのステップで数学を学び、動的幾何学を視覚化し、美しい単一ワークスペースで計算します。',
    exploreTools: '計算機一覧を見る',
    openSolver: '方程式ソルバー',
    view3dSpace: '3D空間体験',
    scrollHint: 'スクロールして3次元の数理空間を体験',

    navOverview: '概要',
    navTools: 'ツール',
    navGraphing: 'グラフ',
    navGeometry: '幾何学',
    navSolver: '方程式',
    navPhysics: '物理シミュレーション',
    navStem: 'STEM',
    navFormulas: '公式集',
    navPractice: '練習問題',
    navCurriculum: 'カリキュラム',
    navWhiteboard: 'ホワイトボード',
    navClasses1to5: '小学1–5年',
    navVisualMaths: 'ビジュアル算数',
    navTables: '九九・九九表',
    navPlayground: 'プレイグラウンド 🧸',
    navAbout: 'アバウト',
    navHistory: '履歴',
    workspace: 'ワークスペース',
    search: '検索 (⌘K)',

    threeDTitle: '3D数理次元スクロール',
    threeDSubtitle: 'パラメトリック多様体と幾何学表面を巡るカメラトラベル。',
    threeDHint: 'スクロールして各ステージを探索',
    stageHero: 'パラメトリック多様体',
    stageSolver: '代数空間',
    stageGeometry: 'ユークリッド多面体',
    stageCalculus: '微分積分軌道',
    surfaceSaddle: '双曲放物面',
    surfaceWave: '調和波',
    surfaceTorus: 'トーラス多様体',
    surfaceBowl: '楕円放物面',

    geometryTitle: 'インタラクティブ幾何学と求積法',
    geometrySubtitle: '入力寸法からリアルタイムに生成されるベクトル図。',
    solverTitle: '方程式ソルバーと証明ステップ',
    solverSubtitle: '代入検証付きの多項式および連立一次方程式ソルバー。',
    graphingTitle: 'リアルタイムグラフ・微積分',
    graphingSubtitle: '複数関数のプロット、接線スロープ、定積分面積。',
    physicsTitle: '物理・STEMシミュレーション',
    physicsSubtitle: '放物運動、単振子、電気回路の法則シミュレーター。',
    stemTitle: 'STEMユーティリティ',
    stemSubtitle: '行列代数、ガウス正規分布、土地面積、GPA計算。',
    formulaTitle: '総合数理公式ライブラリ',
    practiceTitle: 'インタラクティブ練習シート',

    focusedMode: 'フォーカス表示',
    stageNumber: 'ステージ',
    nextStage: '次のステージ',
    prevStage: '前のステージ',
    quickJump: 'クイック移動',
    currentStage: '選択中のモジュール',
    allStages: '全モジュール',

    curriculumTitle: '学校数学カリキュラム',
    curriculumSubtitle: '公式検証と対話型ツールを備えた体系的シラバス準拠モジュール。',
    class10Title: '中学3年・高校数学基礎',
    class10Subtitle: '実数、多項式、連立方程式、二次方程式、三角比、座標幾何学、立体求積。',
    class12Title: '高校数学・高等数学',
    class12Subtitle: '関係と関数、行列、行列式、極限と導関数、積分、ベクトル、3次元空間幾何学。',
    selectClass: "数学学習進度",
    classLevelFoundation: "1〜5年生：基礎数学 (Foundation Mathematics)",
    classLevelExplorer: "6〜8年生：探究数学 (Mathematics Explorer)",
    classLevelSecondary: "9〜10年生：中等数学 (Secondary Mathematics)",
    classLevelSenior: "12年生および高等数学 (Senior & Higher Mathematics)",
    allCurriculum: '全学年',
    launchModule: 'モジュールを起動',
    exploreChapter: '章を見る',

    builtBy: 'HSBJK 開発',
    clientSideBadge: '100% クライアントサイドエンジン',
    formulaVerified: '数学的に検証済み',
    searchPlaceholder: '計算機、公式、トピックを検索…',
    searchPopularTools: '人気のツール',
    searchLearningEducation: '学習と教育',
    searchFormulasTopics: '公式とトピック',
    searchRecentSearches: '最近の検索',
    searchClear: 'クリア',
    searchNoResults: '一致する計算機、公式、トピックが見つかりません。',
    aboutTitle: 'CalcAuraについて',
    aboutSubtitle: 'HSBJK 開発',
    aboutPhilosophyTitle: '開発思想',
    aboutPhilosophyQuote: '計算し、可視化し、理解し、検証する。',
    aboutPhilosophyBody: '学生、教育者、エンジニアが安全かつ信頼して使える数理ワークスペースです。',
    zeroLatencyTitle: 'ゼロレイテンシ',
    zeroLatencyDesc: 'ブラウザ上で直接高速に動作します。',
    liveTypesettingTitle: '美しい数式組版',
    liveTypesettingDesc: 'KaTeXによるクリアなLaTeXレンダリング。',
    privacyTitle: 'プライバシー重視',
    privacyDesc: 'データ送信なし、100%クライアントサイド実行。',
    contactLink: 'お問い合わせ',
    privacyTerms: 'プライバシーと利用規約',
    footerDesc: '精密数学、視覚的証明、科学技術計算の統合ワークスペース。',
    footerRights: 'クライアントサイド評価。テレメトリなし。',

    // About Page Redesign in Japanese
    aboutHeroHeadline: '数学をより明快に、発見の瞬間をあなたに。',
    aboutHeroSub: 'CALCAURAは計算、方程式、動的可視化、学習をひとつのワークスペースに集約し、数学を深く理解するための体験を提供します。',
    aboutExploreCta: 'CALCAURAを体験する',
    aboutPhilTag: 'フィロソフィー',
    aboutPhilHeading: '数学は、単なる「答え」以上のものです。',
    aboutPhilDesc: '数、数式、視覚表現が調和するとき、数学の美しさと本質が自然と浮かび上がります。CALCAURAはその探求をサポートします。',
    aboutPrinciplesTag: '基本指針',
    aboutPrinciplesHeading: '私たちの学習アプローチ',
    aboutCalcTag: '01 · 計算 (Calculate)',
    aboutCalcTitle: 'すべてのステップに精度を',
    aboutCalcDesc: '明確な入力と検証された結果による厳密な数理計算を実行します。',
    aboutVisTag: '02 · 可視化 (Visualize)',
    aboutVisTitle: 'かたちを通して直感を育む',
    aboutVisDesc: '関数、幾何図形、グラフの相互関係を対話的に可視化します。',
    aboutUndTag: '03 · 理解 (Understand)',
    aboutUndTitle: '公式の背景にある深みへ',
    aboutUndDesc: '計算結果を導出過程や視覚的デモンストレーションと結びつけます。',
    aboutAudienceTag: '対象ユーザー',
    aboutAudienceHeading: 'すべてのステージの学習者のために',
    aboutAudSchool: '小・中学生',
    aboutAudSchoolDesc: '直感的な視覚図形、身近な玩具、ステップごとの優しい算数学習。',
    aboutAudSec: '高校生・受験生',
    aboutAudSecDesc: 'シラバスに準拠した代数、幾何証明、三角関数、微分積分の導出。',
    aboutAudEng: '理工系大学生・高専生',
    aboutAudEngDesc: '行列演算、多変数微積分、力学シミュレーション、数値計算。',
    aboutAudEdu: '教育者・数学愛好家',
    aboutAudEduDesc: 'インタラクティブな実験ラボ、印刷可能な練習プリント、3D可視化。',
    aboutCreatorTag: '想いを込めて',
    aboutCreatorTitle: 'HSBJK 開発',
    aboutCreatorDesc: '数学をより計算しやすく、見やすく、分かりやすくするための継続的プロジェクトです。',
    aboutFinalHeading: '数学を、新しい視点で。',
    aboutFinalSub: '視覚的で直感的な数理の世界を体験してみましょう。',
    aboutFooterCopy: 'CALCAURA · HSBJK 開発 · All rights reserved',

    // Classes 1-5 Toy Shop Theme in Japanese
    kidsFoundationBadge: 'キッズ算数とおもちゃの国 🎪',
    kidsHeroTitle: '小さな一歩、大きな発見！ 🎈',
    kidsHeroSubtitle: 'かわいい動物たち、咲き誇るお花、カラフルなおもちゃと一緒に楽しく算数を学ぼう！',
    kidsOpenVisual: 'ビジュアル算数の世界 🎨',
    kidsOpenTables: '九九・計算スタジオ 🖩',
    kidsOpenPlayground: 'おもちゃの広場 🧸',
    kidsSelectGrade: '学年をえらぶ:',
    kidsClass1Title: '小学1年: かわいい動物とおもちゃ 🐶',
    kidsClass2Title: '小学2年: かずの冒険とお花畑 🌻',
    kidsClass3Title: '小学3年: まほうの図形とおみせやさん 🎁',
    kidsClass4Title: '小学4年: わり算と大きな数 🚀',
    kidsClass5Title: '小学5年: 分数と時間のたび ⏱️',
    kidsPlayNow: 'あそんでみる！ 🚀',
    kidsTapToCount: 'おもちゃをタップしてかぞえよう！',
    kidsAwesomeJob: 'よくできました！ ⭐',
    kidsTryAgain: 'もういちど数えてみよう！',
    kidsPopBalloons: '風船を割ってひき算しよう！',
    kidsMatchShapes: 'おなじ形を見つけよう！',
    kidsToysAndAnimals: 'おもちゃ・動物・お花',
    kidsInteractiveGarden: 'たのしい算数の庭',

    // Math Playground in Japanese
    playgroundTitle: 'おもちゃ＆STEMプレイグラウンド 🧸',
    playgroundSubtitle: 'かわいいテディベア天秤、動的接線スロープ、リアルタイム3D波形メッシュ。',
    playgroundHeroTag: '数理実験ラボ',
    playgroundScaleTitle: 'テディベアおもちゃ天秤 🧸',
    playgroundScaleDesc: 'テディベアの数を調整して天秤を水平にし、2x + 4 = 10を解いてみよう！',
    playgroundAdjustTeddy: 'テディベア (x) の数を調整:',
    playgroundScaleBalanced: 'やったね！ 2(3) + 4 = 10！ 天秤がぴったりつり合いました！ 🎉',
    playgroundScaleNotBalanced: 'まだつり合っていないよ。スライダーを動かしてみよう。',
    playgroundWaveTitle: '3Dパラメトリック波形・表面ビジュアライザー',
    playgroundWaveDesc: 'WebGLによるリアルタイム3次元波形メッシュ。',

    // Homepage & Product Showcase
    heroEyebrow: '数学 · 科学 · エンジニアリング',
    heroHeadline1: '数学を、',
    heroHeadline2: '直感的に視覚化。',
    heroDescription: '方程式を探求し、数学的関係を理解し、インタラクティブな科学的視覚化を通じて数学の美しさを体験しましょう。',
    heroOpenApp: 'CalcAura を開く',
    heroExploreMath: '数学を探求する',
    heroPlatformCrafted: 'HSBJK によって開発されたプラットフォーム',
    canvasPreviewTag: 'インタラクティブ ワークスペース プレビュー',
    canvasTitle: '統合された数学キャンバス',
    canvasSubtitle: 'スクロールしてワークスペースにフォーカス。リアルタイムで曲線、接線の傾き、実根を自在に探索できます。',
  },

  es: {
    tagline: 'Motor Interactivo de Matemáticas y STEM',
    heroTitle1: 'Cada Cálculo.',
    heroTitleHighlight: 'Cada Ecuación.',
    heroTitle2: 'Un Solo Espacio.',
    heroSubtitle: 'Explore matemáticas, resuelva ecuaciones con pasos verificados, visualice geometría dinámica y calcule datos científicos en un entorno elegante.',
    exploreTools: 'Explorar Calculadoras',
    openSolver: 'Solucionador de Ecuaciones',
    view3dSpace: 'Experiencia 3D',
    scrollHint: 'Desplácese hacia abajo para navegar por dimensiones 3D',

    navOverview: 'Inicio',
    navTools: 'Herramientas',
    navGraphing: 'Gráficas',
    navGeometry: 'Geometría',
    navSolver: 'Ecuaciones',
    navPhysics: 'Física',
    navStem: 'STEM',
    navFormulas: 'Fórmulas',
    navPractice: 'Práctica',
    navCurriculum: 'Currículo',
    navWhiteboard: 'Pizarra',
    navClasses1to5: 'Grados 1–5',
    navVisualMaths: 'Matemática Visual',
    navTables: 'Tablas 1–30',
    navPlayground: 'Patio de Juegos 🧸',
    navAbout: 'Acerca de',
    navHistory: 'Historial',
    workspace: 'Espacio de Trabajo',
    search: 'Buscar (⌘K)',

    threeDTitle: 'Desplazamiento Dimensional 3D',
    threeDSubtitle: 'Viaje de cámara a través de variedades paramétricas y superficies de coordenadas.',
    threeDHint: 'Desplácese hacia abajo para explorar etapas',
    stageHero: 'Variedad Paramétrica',
    stageSolver: 'Espacio Algebraico',
    stageGeometry: 'Poliedros Euclidianos',
    stageCalculus: 'Trayectoria de Cálculo',
    surfaceSaddle: 'Silla Hiperbólica',
    surfaceWave: 'Onda Armónica',
    surfaceTorus: 'Variedad Toroidal',
    surfaceBowl: 'Paraboloide Elíptico',

    geometryTitle: 'Geometría Interactiva y Mensuración',
    geometrySubtitle: 'Diagramas vectoriales generados directamente a partir de dimensiones.',
    solverTitle: 'Solucionador de Ecuaciones y Pasos',
    solverSubtitle: 'Sistemas lineales 2×2 y polinomios con comprobación por sustitución.',
    graphingTitle: 'Gráficas en Tiempo Real y Cálculo',
    graphingSubtitle: 'Curvas multifunción, pendientes tangentes e integración definida.',
    physicsTitle: 'Simulaciones de Física y STEM',
    physicsSubtitle: 'Tiro parabólico, péndulo armónico y leyes de circuitos eléctricos.',
    stemTitle: 'Utilidades STEM y Estudiantiles',
    stemSubtitle: 'Álgebra matricial, distribución gaussiana, medición de terrenos y GPA.',
    formulaTitle: 'Biblioteca Completa de Fórmulas',
    practiceTitle: 'Hoja de Práctica Interactiva',

    focusedMode: 'Escritorio Enfocado',
    stageNumber: 'Etapa',
    nextStage: 'Siguiente Etapa',
    prevStage: 'Etapa Anterior',
    quickJump: 'Salto Rápido',
    currentStage: 'Módulo Activo',
    allStages: 'Todos los Módulos',

    curriculumTitle: 'Currículo Escolar de Matemáticas',
    curriculumSubtitle: 'Módulos estructurados para secundaria con fórmulas verificadas y calculadoras interactivas.',
    class10Title: 'Matemáticas de Grado 10',
    class10Subtitle: 'Números reales, polinomios, sistemas lineales, ecuaciones cuadráticas, trigonometría y geometría.',
    class12Title: 'Matemáticas de Grado 12',
    class12Subtitle: 'Matrices, determinantes, continuidad, derivadas, integrales, vectores y geometría tridimensional.',
    selectClass: "Progresión de Aprendizaje Matemático",
    classLevelFoundation: "Clases 1–5: Matemáticas Fundamentales",
    classLevelExplorer: "Clases 6–8: Explorador Matemático",
    classLevelSecondary: "Clases 9–10: Matemáticas Secundarias",
    classLevelSenior: "Clase 12 y Superior: Matemáticas Avanzadas",
    allCurriculum: 'Ambos Grados',
    launchModule: 'Iniciar Módulo',
    exploreChapter: 'Explorar Capítulo',

    builtBy: 'Creado por HSBJK',
    clientSideBadge: 'Motor 100% en Cliente',
    formulaVerified: 'Verificado Matemáticamente',
    searchPlaceholder: 'Buscar calculadoras, fórmulas y temas…',
    searchPopularTools: 'Herramientas Populares',
    searchLearningEducation: 'Aprendizaje y Educación',
    searchFormulasTopics: 'Fórmulas y Temas',
    searchRecentSearches: 'Búsquedas Recientes',
    searchClear: 'Borrar',
    searchNoResults: 'No se encontraron calculadoras, fórmulas ni temas coincidentes.',
    aboutTitle: 'Acerca de CalcAura',
    aboutSubtitle: 'Creado por HSBJK',
    aboutPhilosophyTitle: 'Filosofía',
    aboutPhilosophyQuote: 'Calcular. Visualizar. Comprender. Verificar.',
    aboutPhilosophyBody: 'Diseñado para brindar a estudiantes y docentes una herramienta confiable y sin telemetría.',
    zeroLatencyTitle: 'Cero Latencia',
    zeroLatencyDesc: 'Todo se ejecuta directamente en su navegador web.',
    liveTypesettingTitle: 'Tipografía KaTeX Clara',
    liveTypesettingDesc: 'Fórmulas en LaTeX renderizadas con máxima nitidez.',
    privacyTitle: 'Privacidad Total',
    privacyDesc: 'Sin rastreo ni telemetría. Cálculos en su dispositivo.',
    contactLink: 'Contactar',
    privacyTerms: 'Privacidad y Términos',
    footerDesc: 'Matemáticas de precisión y computación científica en un espacio elegante.',
    footerRights: 'Ejecución en cliente. Cero telemetría.',

    // About Page Redesign in Spanish
    aboutHeroHeadline: 'Haciendo las matemáticas más claras, un descubrimiento a la vez.',
    aboutHeroSub: 'CALCAURA reúne cálculos, ecuaciones, visualizaciones interactivas y aprendizaje en un solo espacio de trabajo, ayudando a estudiantes y mentes curiosas a explorar las matemáticas con mayor claridad.',
    aboutExploreCta: 'Explorar CALCAURA',
    aboutPhilTag: 'Filosofía',
    aboutPhilHeading: 'Las matemáticas son más que una respuesta.',
    aboutPhilDesc: 'Creemos que las matemáticas se vuelven más fáciles de explorar cuando los números, las ecuaciones y las representaciones visuales trabajan juntos.',
    aboutPrinciplesTag: 'Principios Fundamentales',
    aboutPrinciplesHeading: 'Cómo abordamos el aprendizaje',
    aboutCalcTag: '01 · Calcular',
    aboutCalcTitle: 'Precisión en cada paso',
    aboutCalcDesc: 'Realice cálculos matemáticos y científicos con entradas claras y resultados significativos.',
    aboutVisTag: '02 · Visualizar',
    aboutVisTitle: 'Intuición a través de la forma',
    aboutVisDesc: 'Explore funciones, formas geométricas, gráficos y relaciones matemáticas mediante representaciones interactivas.',
    aboutUndTag: '03 · Comprender',
    aboutUndTitle: 'Profundidad detrás de la fórmula',
    aboutUndDesc: 'Conecte el resultado con su fórmula, deducción paso a paso o demostración visual.',
    aboutAudienceTag: 'Audiencia',
    aboutAudienceHeading: 'Diseñado para estudiantes en cada etapa',
    aboutAudSchool: 'Estudiantes de Primaria',
    aboutAudSchoolDesc: 'Matemáticas fundamentales con representaciones visuales intuitivas y objetos cotidianos.',
    aboutAudSec: 'Estudiantes de Secundaria y Bachillerato',
    aboutAudSecDesc: 'Álgebra, demostraciones geométricas, trigonometría y derivación de teoremas de cálculo.',
    aboutAudEng: 'Estudiantes Universitarios y de Ingeniería',
    aboutAudEngDesc: 'Operaciones matriciales, cálculo multivariable, cinemática y computación científica.',
    aboutAudEdu: 'Educadores y Mentes Curiosas',
    aboutAudEduDesc: 'Laboratorios interactivos, hojas de trabajo imprimibles y visualizadores 3D.',
    aboutCreatorTag: 'Hecho con Cuidado',
    aboutCreatorTitle: 'Creado por HSBJK.',
    aboutCreatorDesc: 'CALCAURA es un proyecto en constante evolución enfocado en hacer que las matemáticas sean más fáciles de calcular, visualizar y comprender.',
    aboutFinalHeading: 'Vea las matemáticas de manera diferente.',
    aboutFinalSub: 'Descubra una forma más visual de explorar las matemáticas.',
    aboutFooterCopy: 'CALCAURA · Creado por HSBJK · Todos los derechos reservados',

    // Classes 1-5 Toy Shop Theme in Spanish
    kidsFoundationBadge: 'Matemáticas Básicas y Tienda de Juguetes 🎪',
    kidsHeroTitle: 'Pequeños Pasos. ¡Grandes Descubrimientos! 🎈',
    kidsHeroSubtitle: '¡Aprende matemáticas con animales simpáticos, flores radiantes, juguetes coloridos y juegos interactivos!',
    kidsOpenVisual: 'Mundo de Matemática Visual 🎨',
    kidsOpenTables: 'Estudio de Tablas 1–30 🖩',
    kidsOpenPlayground: 'Parque de Juguetes 🧸',
    kidsSelectGrade: 'Elige tu Grado:',
    kidsClass1Title: 'Grado 1: Animales Tiernos y Juguetes 🐶',
    kidsClass2Title: 'Grado 2: Diversión con Números y Jardín 🌻',
    kidsClass3Title: 'Grado 3: Formas Mágicas y Tienda 🎁',
    kidsClass4Title: 'Grado 4: Aventura de Multiplicar 🚀',
    kidsClass5Title: 'Grado 5: Fracciones y Viaje del Tiempo ⏱️',
    kidsPlayNow: '¡Jugar Ahora! 🚀',
    kidsTapToCount: '¡Toca los juguetes para contar!',
    kidsAwesomeJob: '¡Excelente trabajo! ⭐',
    kidsTryAgain: '¡Contemos juntos de nuevo!',
    kidsPopBalloons: '¡Revienta globos para restar!',
    kidsMatchShapes: '¡Empareja las formas coloridas!',
    kidsToysAndAnimals: 'Juguetes, Animales y Flores',
    kidsInteractiveGarden: 'Jardín Matemático Divertido',

    // Math Playground in Spanish
    playgroundTitle: 'Patio de Juguetes y STEM 🧸',
    playgroundSubtitle: 'Balanza de ositos de peluche, pendientes dinámicas y mallas de ondas 3D.',
    playgroundHeroTag: 'Experimentos Matemáticos',
    playgroundScaleTitle: 'Balanza con Ositos de Peluche 🧸',
    playgroundScaleDesc: '¡Ajusta la cantidad de ositos para equilibrar la balanza y resolver 2x + 4 = 10!',
    playgroundAdjustTeddy: 'Ajustar valor de x (Ositos):',
    playgroundScaleBalanced: '¡Viva! 2(3) + 4 = 10! ¡La balanza está perfectamente equilibrada! 🎉',
    playgroundScaleNotBalanced: '¡Aún no está nivelada! Mueve el control deslizante.',
    playgroundWaveTitle: 'Visualizador de Ondas Paramétricas 3D',
    playgroundWaveDesc: 'Malla de ondas 3D en tiempo real renderizada con WebGL.',

    // Homepage & Product Showcase
    heroEyebrow: 'MATEMÁTICAS · CIENCIA · INGENIERÍA',
    heroHeadline1: 'Matemáticas,',
    heroHeadline2: 'Hechas Visuales.',
    heroDescription: 'Explora ecuaciones, comprende relaciones y experimenta las matemáticas mediante visualizaciones científicas interactivas.',
    heroOpenApp: 'Abrir CalcAura',
    heroExploreMath: 'Explorar Matemáticas',
    heroPlatformCrafted: 'Plataforma Desarrollada por HSBJK',
    canvasPreviewTag: 'Vista Previa Interactiva del Espacio de Trabajo',
    canvasTitle: 'Un Lienzo Matemático Unificado',
    canvasSubtitle: 'Desplázate para enfocar el espacio de trabajo. Explora curvas, pendientes tangentes y raíces reales en tiempo real.',
  },

  fr: {
    tagline: 'Moteur Mathématique et STEM Interactif',
    heroTitle1: 'Chaque Calcul.',
    heroTitleHighlight: 'Chaque Équation.',
    heroTitle2: 'Un Seul Espace.',
    heroSubtitle: 'Explorez les mathématiques, résolvez des équations avec étapes vérifiées, visualisez la géométrie dynamique et calculez vos données scientifiques.',
    exploreTools: 'Explorer les Outils',
    openSolver: 'Solveur d’Équations',
    view3dSpace: 'Expérience 3D',
    scrollHint: 'Faites défiler vers le bas pour voyager dans les dimensions 3D',

    navOverview: 'Aperçu',
    navTools: 'Outils',
    navGraphing: 'Graphiques',
    navGeometry: 'Géométrie',
    navSolver: 'Solveur',
    navPhysics: 'Physique',
    navStem: 'STEM',
    navFormulas: 'Formules',
    navPractice: 'Exercices',
    navCurriculum: 'Programme',
    navWhiteboard: 'Tableau blanc',
    navClasses1to5: 'Classes 1–5',
    navVisualMaths: 'Maths Visuelles',
    navTables: 'Tables 1–30',
    navPlayground: 'Aire de Jeux 🧸',
    navAbout: 'À propos',
    navHistory: 'Historique',
    workspace: 'Espace de Travail',
    search: 'Rechercher (⌘K)',

    threeDTitle: 'Navigation Dimensionnelle 3D',
    threeDSubtitle: 'Voyage de caméra à travers des variétés paramétriques et des surfaces coordonnées.',
    threeDHint: 'Faites défiler pour explorer les modules',
    stageHero: 'Variété Paramétrique',
    stageSolver: 'Espace Algébrique',
    stageGeometry: 'Polyèdres Euclidiens',
    stageCalculus: 'Trajectoire de Calcul',
    surfaceSaddle: 'Selle Hyperbolique',
    surfaceWave: 'Onde Harmonique',
    surfaceTorus: 'Variété Toroïdale',
    surfaceBowl: 'Paraboloïde Elliptique',

    geometryTitle: 'Géométrie Interactive & Mesure',
    geometrySubtitle: 'Schémas vectoriels générés instantanément à partir de vos dimensions.',
    solverTitle: 'Solveur d’Équations et Preuves',
    solverSubtitle: 'Polynômes et systèmes linéaires 2×2 avec substitution vérifiée.',
    graphingTitle: 'Graphiques en Temps Réel et Analyse',
    graphingSubtitle: 'Tracé de fonctions multiples, pentes tangentes et intégrales définies.',
    physicsTitle: 'Simulations Physiques et STEM',
    physicsSubtitle: 'Cinématique balistique, pendule harmonique et lois d’Ohm.',
    stemTitle: 'Utilitaires STEM et Étudiants',
    stemSubtitle: 'Algèbre matricielle, lois gaussiennes, calcul de parcelles et GPA.',
    formulaTitle: 'Bibliothèque Complète de Formules',
    practiceTitle: 'Feuille d’Exercices Interactive',

    focusedMode: 'Bureau Focalisé',
    stageNumber: 'Étape',
    nextStage: 'Étape Suivante',
    prevStage: 'Étape Précédente',
    quickJump: 'Accès Rapide',
    currentStage: 'Module Actif',
    allStages: 'Tous les Modules',

    curriculumTitle: 'Programme Scolaire de Mathématiques',
    curriculumSubtitle: 'Modules structurés conformes aux programmes avec calculatrices interactives.',
    class10Title: 'Mathématiques Classe de 3e / 2nde',
    class10Subtitle: 'Nombres réels, polynômes, systèmes linéaires, trigonométrie et géométrie.',
    class12Title: 'Mathématiques Terminale & Supérieur',
    class12Subtitle: 'Matrices, déterminants, dérivées, intégrales, vecteurs et géométrie dans l’espace.',
    selectClass: "Progression de l'Apprentissage Mathématique",
    classLevelFoundation: "Classes 1–5 : Mathématiques Fondamentales",
    classLevelExplorer: "Classes 6–8 : Explorateur Mathématique",
    classLevelSecondary: "Classes 9–10 : Mathématiques Secondaires",
    classLevelSenior: "Classe 12 et Supérieur : Mathématiques Avancées",
    allCurriculum: 'Tous Niveaux',
    launchModule: 'Lancer le Module',
    exploreChapter: 'Voir le Chapitre',

    builtBy: 'Conçu par HSBJK',
    clientSideBadge: '100% Côté Client',
    formulaVerified: 'Mathématiquement Vérifié',
    searchPlaceholder: 'Rechercher calculatrices, formules et sujets…',
    searchPopularTools: 'Outils Populaires',
    searchLearningEducation: 'Apprentissage et Éducation',
    searchFormulasTopics: 'Formules et Sujets',
    searchRecentSearches: 'Recherches Récentes',
    searchClear: 'Effacer',
    searchNoResults: 'Aucune calculatrice, formule ou sujet correspondant trouvé.',
    aboutTitle: 'À propos de CalcAura',
    aboutSubtitle: 'Conçu par HSBJK',
    aboutPhilosophyTitle: 'Philosophie Fondatrice',
    aboutPhilosophyQuote: 'Calculer. Visualiser. Comprendre. Vérifier.',
    aboutPhilosophyBody: 'Un environnement de calcul sans télémétrie conçu avec soin pour les étudiants et enseignants.',
    zeroLatencyTitle: 'Zéro Latence',
    zeroLatencyDesc: 'Tous les calculs s’exécutent localement dans votre navigateur.',
    liveTypesettingTitle: 'Typographie KaTeX Précise',
    liveTypesettingDesc: 'Formules LaTeX rendues avec une netteté remarquable.',
    privacyTitle: 'Confidentialité Totale',
    privacyDesc: 'Aucune donnée collectée, exécution 100% locale.',
    contactLink: 'Contact',
    privacyTerms: 'Confidentialité et Conditions',
    footerDesc: 'Mathématiques rigoureuses et visualisations dans un espace clair.',
    footerRights: 'Calcul côté client. Zéro télémétrie.',

    // About Page Redesign in French
    aboutHeroHeadline: 'Rendre les mathématiques plus claires, une découverte à la fois.',
    aboutHeroSub: 'CALCAURA réunit calculs, équations, visualisations interactives et apprentissage dans un même espace—pour aider les étudiants et les esprits curieux à explorer les mathématiques avec une clarté absolue.',
    aboutExploreCta: 'Explorer CALCAURA',
    aboutPhilTag: 'Philosophie',
    aboutPhilHeading: 'Les mathématiques sont bien plus qu’une simple réponse.',
    aboutPhilDesc: 'Nous croyons que les mathématiques deviennent plus accessibles lorsque nombres, équations et représentations visuelles dialoguent ensemble.',
    aboutPrinciplesTag: 'Principes Fondamentaux',
    aboutPrinciplesHeading: 'Notre approche pédagogique',
    aboutCalcTag: '01 · Calculer',
    aboutCalcTitle: 'La précision à chaque étape',
    aboutCalcDesc: 'Effectuez des calculs scientifiques et mathématiques rigoureux avec des résultats nets.',
    aboutVisTag: '02 · Visualiser',
    aboutVisTitle: 'L’intuition par la forme',
    aboutVisDesc: 'Explorez fonctions, figures géométriques et relations mathématiques via des représentations interactives.',
    aboutUndTag: '03 · Comprendre',
    aboutUndTitle: 'La profondeur derrière la formule',
    aboutUndDesc: 'Reliez le résultat final à sa formule, sa démonstration étape par étape ou sa modélisation.',
    aboutAudienceTag: 'Public',
    aboutAudienceHeading: 'Conçu pour chaque étape de l’apprentissage',
    aboutAudSchool: 'Écoliers & Collégiens',
    aboutAudSchoolDesc: 'Mathématiques fondamentales avec illustrations intuitives et objets familiers.',
    aboutAudSec: 'Lycéens & Candidats au Bac',
    aboutAudSecDesc: 'Algèbre, démonstrations géométriques, trigonométrie et dérivations de théorèmes.',
    aboutAudEng: 'Étudiants en Ingénierie & Sciences',
    aboutAudEngDesc: 'Calcul matriciel, analyse multivariée, cinématique et modélisation scientifique.',
    aboutAudEdu: 'Enseignants & Passionnés',
    aboutAudEduDesc: 'Laboratoires interactifs, fiches d’exercices imprimables et visualisations 3D.',
    aboutCreatorTag: 'Conçu avec Passion',
    aboutCreatorTitle: 'Créé par HSBJK.',
    aboutCreatorDesc: 'CALCAURA est un projet en constante évolution visant à rendre les mathématiques plus simples à calculer, visualiser et comprendre.',
    aboutFinalHeading: 'Voyez les mathématiques autrement.',
    aboutFinalSub: 'Découvrez une manière plus visuelle d’explorer les mathématiques.',
    aboutFooterCopy: 'CALCAURA · Créé par HSBJK · Tous droits réservés',

    // Classes 1-5 Toy Shop Theme in French
    kidsFoundationBadge: 'Maths Maternelle & Primaire · Magasin de Jouets 🎪',
    kidsHeroTitle: 'Petits Pas. Grandes Découvertes ! 🎈',
    kidsHeroSubtitle: 'Apprenez les maths avec des animaux mignons, des fleurs colorées, des jouets animés et des jeux amusants !',
    kidsOpenVisual: 'Monde des Maths Visuelles 🎨',
    kidsOpenTables: 'Studio Tables 1–30 🖩',
    kidsOpenPlayground: 'Parc de Jeux 🧸',
    kidsSelectGrade: 'Choisis ta Classe :',
    kidsClass1Title: 'Classe 1 : Animaux et Jouets Rigolos 🐶',
    kidsClass2Title: 'Classe 2 : Chiffres et Jardin Fleuri 🌻',
    kidsClass3Title: 'Classe 3 : Formes Magiques et Boutique 🎁',
    kidsClass4Title: 'Classe 4 : Aventure des Multiplications 🚀',
    kidsClass5Title: 'Classe 5 : Fractions et Voyage dans le Temps ⏱️',
    kidsPlayNow: 'Jouer Maintenant ! 🚀',
    kidsTapToCount: 'Touche les jouets pour compter !',
    kidsAwesomeJob: 'Bravo ! Tu es un champion ! ⭐',
    kidsTryAgain: 'Comptons ensemble à nouveau !',
    kidsPopBalloons: 'Éclate les ballons pour soustraire !',
    kidsMatchShapes: 'Associe les formes colorées !',
    kidsToysAndAnimals: 'Jouets, Animaux et Fleurs',
    kidsInteractiveGarden: 'Jardin Mathématique Magique',

    // Math Playground in French
    playgroundTitle: 'Aire de Jeux & STEM 🧸',
    playgroundSubtitle: 'Balance d’ours en peluche, tangentes dynamiques et maillages d’ondes 3D interactifs.',
    playgroundHeroTag: 'Expériences Mathématiques',
    playgroundScaleTitle: 'Balance d’Ours en Peluche 🧸',
    playgroundScaleDesc: 'Ajustez le nombre d’ours en peluche pour équilibrer la balance et résoudre 2x + 4 = 10 !',
    playgroundAdjustTeddy: 'Modifier x (Nombre d’Oursons) :',
    playgroundScaleBalanced: 'Hourra ! 2(3) + 4 = 10 ! La balance est parfaitement équilibrée ! 🎉',
    playgroundScaleNotBalanced: 'Pas encore équilibré ! Déplacez le curseur pour trouver le bon nombre.',
    playgroundWaveTitle: 'Visualiseur d’Ondes Paramétriques 3D',
    playgroundWaveDesc: 'Maillage d’ondes 3D en temps réel rendu avec WebGL.',

    // Homepage & Product Showcase
    heroEyebrow: 'MATHÉMATIQUES · SCIENCES · INGÉNIERIE',
    heroHeadline1: 'Les Mathématiques,',
    heroHeadline2: 'Rendues Visuelles.',
    heroDescription: 'Explorez des équations, comprenez les relations et vivez les mathématiques grâce à la visualisation scientifique interactive.',
    heroOpenApp: 'Ouvrir CalcAura',
    heroExploreMath: 'Explorer les Mathématiques',
    heroPlatformCrafted: 'Plateforme Conçue par HSBJK',
    canvasPreviewTag: 'Aperçu Interactif de l\'Espace de Travail',
    canvasTitle: 'Un Canevas Mathématique Unifié',
    canvasSubtitle: 'Faites défiler pour mettre l\'espace de travail au point. Naviguez en direct à travers courbes, pentes et racines réelles.',
  },

  de: {
    tagline: 'Interaktive STEM- & Mathematik-Engine',
    heroTitle1: 'Jede Rechnung.',
    heroTitleHighlight: 'Jede Gleichung.',
    heroTitle2: 'Ein Arbeitsbereich.',
    heroSubtitle: 'Mathematik erkunden, Gleichungen mit verifizierten Lösungsschritten lösen, dynamische Geometrie visualisieren und Datensätze berechnen.',
    exploreTools: 'Rechner Entdecken',
    openSolver: 'Gleichungslöser',
    view3dSpace: '3D-Erlebnis',
    scrollHint: 'Nach unten scrollen, um 3D-Dimensionen zu erleben',

    navOverview: 'Übersicht',
    navTools: 'Werkzeuge',
    navGraphing: 'Graphen',
    navGeometry: 'Geometrie',
    navSolver: 'Löser',
    navPhysics: 'Physik',
    navStem: 'STEM',
    navFormulas: 'Formeln',
    navPractice: 'Übung',
    navCurriculum: 'Lehrplan',
    navWhiteboard: 'Whiteboard',
    navClasses1to5: 'Klassen 1–5',
    navVisualMaths: 'Visuelle Mathe',
    navTables: 'Einmaleins 1–30',
    navPlayground: 'Spielplatz 🧸',
    navAbout: 'Über uns',
    navHistory: 'Verlauf',
    workspace: 'Arbeitsbereich',
    search: 'Suchen (⌘K)',

    threeDTitle: '3D-Mathematik-Dimensions-Scroll',
    threeDSubtitle: 'Kamerafahrt durch parametrische Mannigfaltigkeiten und Koordinatenflächen.',
    threeDHint: 'Nach unten scrollen, um Abschnitte zu erkunden',
    stageHero: 'Parametrische Mannigfaltigkeit',
    stageSolver: 'Algebraischer Raum',
    stageGeometry: 'Euklidische Polyeder',
    stageCalculus: 'Analysis-Trajektorie',
    surfaceSaddle: 'Hyperbolischer Sattel',
    surfaceWave: 'Harmonische Welle',
    surfaceTorus: 'Toroidale Mannigfaltigkeit',
    surfaceBowl: 'Elliptisches Paraboloid',

    geometryTitle: 'Interaktive Geometrie & Flächenberechnung',
    geometrySubtitle: 'Echtzeit-Vektordiagramme direkt aus eingegebenen Maßen generiert.',
    solverTitle: 'Gleichungslöser & Schritt-Beweise',
    solverSubtitle: 'Polynomische und lineare 2×2-Systeme mit überprüfter Einsetzprobe.',
    graphingTitle: 'Echtzeit-Funktionsgraphen & Analysis',
    graphingSubtitle: 'Mehrfachfunktionen, bewegliche Tangenten und bestimmte Integrale.',
    physicsTitle: 'Physik- & STEM-Simulationen',
    physicsSubtitle: 'Wurfparabeln, harmonisches Pendel und elektrische Schaltungen.',
    stemTitle: 'STEM- & Studenten-Werkzeuge',
    stemSubtitle: 'Matrizenrechnung, Gauß-Verteilung, Grundstücksvermessung und Notenrechner.',
    formulaTitle: 'Umfassende Formelsammlung',
    practiceTitle: 'Interaktives Übungsblatt',

    focusedMode: 'Fokussierter Schreibtisch',
    stageNumber: 'Stufe',
    nextStage: 'Nächste Stufe',
    prevStage: 'Vorherige Stufe',
    quickJump: 'Schnellwahl',
    currentStage: 'Aktives Modul',
    allStages: 'Alle Module',

    curriculumTitle: 'Schulmathematik-Lehrplan',
    curriculumSubtitle: 'Strukturierte lehrplankonforme Module mit verifizierten Beweisen und interaktiven Rechnern.',
    class10Title: 'Mathematik Klasse 10',
    class10Subtitle: 'Reelle Zahlen, Polynome, lineare Gleichungssysteme, quadratische Gleichungen und Trigonometrie.',
    class12Title: 'Mathematik Klasse 12 & Oberstufe',
    class12Subtitle: 'Matrizen, Determinanten, Stetigkeit, Ableitungen, Integrale, Vektoren und analytische Geometrie.',
    selectClass: "Mathematischer Lernfortschritt",
    classLevelFoundation: "Klassen 1–5: Grundlagenmathematik",
    classLevelExplorer: "Klassen 6–8: Mathe-Entdecker",
    classLevelSecondary: "Klassen 9–10: Sekundarstufenmathematik",
    classLevelSenior: "Klasse 12 & Höher: Fortgeschrittene Mathematik",
    allCurriculum: 'Alle Klassenstufen',
    launchModule: 'Modul Starten',
    exploreChapter: 'Kapitel Öffnen',

    builtBy: 'Entwickelt von HSBJK',
    clientSideBadge: '100% Clientseitige Engine',
    formulaVerified: 'Mathematisch Verifiziert',
    searchPlaceholder: 'Rechner, Formeln und Themen suchen…',
    searchPopularTools: 'Beliebte Werkzeuge',
    searchLearningEducation: 'Lernen & Bildung',
    searchFormulasTopics: 'Formeln & Themen',
    searchRecentSearches: 'Letzte Suchanfragen',
    searchClear: 'Löschen',
    searchNoResults: 'Keine passenden Rechner, Formeln oder Themen gefunden.',
    aboutTitle: 'Über CalcAura',
    aboutSubtitle: 'Entwickelt von HSBJK',
    aboutPhilosophyTitle: 'Grundphilosophie',
    aboutPhilosophyQuote: 'Berechnen. Visualisieren. Verstehen. Verifizieren.',
    aboutPhilosophyBody: 'Eine sichere mathematische Berechnungsumgebung ohne Telemetrie für Lernende und Lehrende.',
    zeroLatencyTitle: 'Keine Latenz',
    zeroLatencyDesc: 'Alle Berechnungen laufen direkt in Ihrem Browser.',
    liveTypesettingTitle: 'Gestochen scharfe KaTeX-Formeln',
    liveTypesettingDesc: 'Perfekte LaTeX-Formeldarstellung ohne Abschneiden.',
    privacyTitle: 'Datenschutz an erster Stelle',
    privacyDesc: 'Keine Telemetrie, kein Nutzertracking.',
    contactLink: 'Kontakt',
    privacyTerms: 'Datenschutz & Bedingungen',
    footerDesc: 'Präzise Mathematik und wissenschaftliche Berechnungen in einem eleganten Arbeitsbereich.',
    footerRights: 'Clientseitige Ausführung. Keine Telemetrie.',

    // About Page Redesign in German
    aboutHeroHeadline: 'Mathematik klarer machen, Entdeckung für Entdeckung.',
    aboutHeroSub: 'CALCAURA vereint Berechnungen, Gleichungen, interaktive Visualisierungen und Lernen in einem einzigen Arbeitsbereich—damit Lernende und Neugierige Mathematik mit wahrer Klarheit entdecken können.',
    aboutExploreCta: 'CALCAURA Erkunden',
    aboutPhilTag: 'Philosophie',
    aboutPhilHeading: 'Mathematik ist mehr als nur eine Antwort.',
    aboutPhilDesc: 'Wir glauben, dass Mathematik leichter verständlich wird, wenn Zahlen, Gleichungen und visuelle Darstellungen nahtlos zusammenspielen.',
    aboutPrinciplesTag: 'Grundprinzipien',
    aboutPrinciplesHeading: 'Wie wir Lernen gestalten',
    aboutCalcTag: '01 · Berechnen',
    aboutCalcTitle: 'Präzision bei jedem Schritt',
    aboutCalcDesc: 'Führen Sie mathematische und wissenschaftliche Berechnungen mit klaren Eingaben und aussagekräftigen Ergebnissen durch.',
    aboutVisTag: '02 · Visualisieren',
    aboutVisTitle: 'Intuition durch Form',
    aboutVisDesc: 'Erforschen Sie Funktionen, geometrische Körper, Graphen und mathematische Zusammenhänge interaktiv.',
    aboutUndTag: '03 · Verstehen',
    aboutUndTitle: 'Tiefe hinter der Formel',
    aboutUndDesc: 'Verbinden Sie das Ergebnis mit Herleitung, Erklärung und anschaulicher Demonstration.',
    aboutAudienceTag: 'Zielgruppe',
    aboutAudienceHeading: 'Für Lernende auf jeder Stufe',
    aboutAudSchool: 'Schüler der Grund- & Mittelstufe',
    aboutAudSchoolDesc: 'Grundlagen der Mathematik mit intuitiven visuellen Darstellungen und alltagsnahen Gegenständen.',
    aboutAudSec: 'Schüler der Oberstufe & Abiturienten',
    aboutAudSecDesc: 'Lehrplankonforme Algebra, geometrische Beweise, Trigonometrie und Analysis-Herleitungen.',
    aboutAudEng: 'Studenten der Ingenieur- & Naturwissenschaften',
    aboutAudEngDesc: 'Matrizenoperationen, mehrdimensionale Analysis, Kinematik und wissenschaftliches Rechnen.',
    aboutAudEdu: 'Lehrkräfte & Neugierige Köpfe',
    aboutAudEduDesc: 'Interaktive Experimentierlabore, druckbare Arbeitsblätter und intuitive 3D-Visualisierungen.',
    aboutCreatorTag: 'Mit Sorgfalt Gestaltet',
    aboutCreatorTitle: 'Entwickelt von HSBJK.',
    aboutCreatorDesc: 'CALCAURA ist ein stetig wachsendes Projekt, das Mathematik einfacher zu berechnen, zu visualisieren und zu verstehen macht.',
    aboutFinalHeading: 'Mathematik neu sehen.',
    aboutFinalSub: 'Entdecken Sie einen visuellen Weg, Mathematik zu begreifen.',
    aboutFooterCopy: 'CALCAURA · Entwickelt von HSBJK · Alle Rechte vorbehalten',

    // Classes 1-5 Toy Shop Theme in German
    kidsFoundationBadge: 'Grundschul-Mathematik & Spielzeugladen 🎪',
    kidsHeroTitle: 'Kleine Schritte. Große Entdeckungen! 🎈',
    kidsHeroSubtitle: 'Mathe lernen mit niedlichen Tieren, blühenden Blumen, bunten Spielzeugen und lustigen Lernspielen!',
    kidsOpenVisual: 'Visuelle Mathe-Welt 🎨',
    kidsOpenTables: 'Einmaleins 1–30 Studio 🖩',
    kidsOpenPlayground: 'Spielzeug-Spielplatz 🧸',
    kidsSelectGrade: 'Klasse wählen:',
    kidsClass1Title: 'Klasse 1: Lustige Tiere & Spielzeuge 🐶',
    kidsClass2Title: 'Klasse 2: Zahlenspaß & Blumengarten 🌻',
    kidsClass3Title: 'Klasse 3: Magische Formen & Kaufladen 🎁',
    kidsClass4Title: 'Klasse 4: Malnehmen-Abenteuer 🚀',
    kidsClass5Title: 'Klasse 5: Brüche & Zeitreise ⏱️',
    kidsPlayNow: 'Jetzt Spielen! 🚀',
    kidsTapToCount: 'Tippe auf das Spielzeug zum Zählen!',
    kidsAwesomeJob: 'Großartig gemacht! ⭐',
    kidsTryAgain: 'Lass uns noch einmal zusammen zählen!',
    kidsPopBalloons: 'Ballons platzen lassen zum Abziehen!',
    kidsMatchShapes: 'Finde die passenden Formen!',
    kidsToysAndAnimals: 'Spielzeuge, Tiere & Blumen',
    kidsInteractiveGarden: 'Zauberhafter Mathe-Garten',

    // Math Playground in German
    playgroundTitle: 'Spielzeug- & STEM-Spielplatz 🧸',
    playgroundSubtitle: 'Teddybären-Balkenwaage, dynamische Tangenten und 3D-Wellennetze.',
    playgroundHeroTag: 'Interaktive Experimente',
    playgroundScaleTitle: 'Teddybären-Balkenwaage 🧸',
    playgroundScaleDesc: 'Passe die Anzahl der Teddybären an, um die Waage ins Gleichgewicht zu bringen und 2x + 4 = 10 zu lösen!',
    playgroundAdjustTeddy: 'Wert für x (Teddybären) einstellen:',
    playgroundScaleBalanced: 'Hurra! 2(3) + 4 = 10! Die Waage ist perfekt im Gleichgewicht! 🎉',
    playgroundScaleNotBalanced: 'Noch nicht ausgeglichen! Bewege den Schieberegler.',
    playgroundWaveTitle: '3D-Parametrischer Wellen-Visualisierer',
    playgroundWaveDesc: 'Echtzeit-WebGL-Wellenmesh mit interaktiver 3D-Drehung.',

    // Homepage & Product Showcase
    heroEyebrow: 'MATHEMATIK · WISSENSCHAFT · INGENIEURWESEN',
    heroHeadline1: 'Mathematik,',
    heroHeadline2: 'Visuell Erlebbar.',
    heroDescription: 'Gleichungen erforschen, Zusammenhänge begreifen und Mathematik durch interaktive Visualisierungen erleben.',
    heroOpenApp: 'CalcAura Öffnen',
    heroExploreMath: 'Mathematik Erkunden',
    heroPlatformCrafted: 'Plattform Entwickelt von HSBJK',
    canvasPreviewTag: 'Interaktive Arbeitsbereich-Vorschau',
    canvasTitle: 'Ein Einheitlicher Mathematischer Canvas',
    canvasSubtitle: 'Scrollen Sie, um den Arbeitsbereich scharfzustellen. Untersuchen Sie Kurven, Tangenten und Nullstellen in Echtzeit.',
  },

  it: {
    tagline: 'Motore Matematico e STEM Interattivo',
    heroTitle1: 'Ogni Calcolo.',
    heroTitleHighlight: 'Ogni Equazione.',
    heroTitle2: 'Unico Spazio.',
    heroSubtitle: 'Esplora la matematica, risolvi equazioni con passaggi verificati, visualizza geometria dinamica e calcola dati scientifici in un ambiente elegante.',
    exploreTools: 'Esplora Calcolatori',
    openSolver: 'Risolutore di Equazioni',
    view3dSpace: 'Esperienza 3D',
    scrollHint: 'Scorri verso il basso per viaggiare nelle dimensioni 3D',

    navOverview: 'Panoramica',
    navTools: 'Strumenti',
    navGraphing: 'Grafici',
    navGeometry: 'Geometria',
    navSolver: 'Risolutore',
    navPhysics: 'Fisica',
    navStem: 'STEM',
    navFormulas: 'Formule',
    navPractice: 'Esercizi',
    navCurriculum: 'Curricolo',
    navWhiteboard: 'Lavagna',
    navClasses1to5: 'Classi 1–5',
    navVisualMaths: 'Matematica Visiva',
    navTables: 'Tabelline 1–30',
    navPlayground: 'Parco Giochi 🧸',
    navAbout: 'Chi siamo',
    navHistory: 'Cronologia',
    workspace: 'Spazio di Lavoro',
    search: 'Cerca (⌘K)',

    threeDTitle: 'Scorrimento Dimensionale 3D',
    threeDSubtitle: 'Viaggio di camera attraverso varietà parametriche e superfici di coordinate.',
    threeDHint: 'Scorri verso il basso per navigare tra le fasi',
    stageHero: 'Varietà Parametrica',
    stageSolver: 'Spazio Algebrico',
    stageGeometry: 'Poliedri Euclidei',
    stageCalculus: 'Traiettoria di Analisi',
    surfaceSaddle: 'Sella Iperbolica',
    surfaceWave: 'Onda Armonica',
    surfaceTorus: 'Varietà Toroidale',
    surfaceBowl: 'Paraboloide Ellittico',

    geometryTitle: 'Geometria Interattiva e Misurazione',
    geometrySubtitle: 'Diagrammi vettoriali in tempo reale generati direttamente dalle dimensioni.',
    solverTitle: 'Risolutore di Equazioni e Passaggi',
    solverSubtitle: 'Sistemi lineari 2×2 e polinomi con verifica di sostituzione.',
    graphingTitle: 'Grafici in Tempo Reale e Analisi',
    graphingSubtitle: 'Curve multifunzione, rette tangenti e integrali definiti.',
    physicsTitle: 'Simulazioni di Fisica e STEM',
    physicsSubtitle: 'Moto parabolico, pendolo armonico e leggi dei circuiti elettrici.',
    stemTitle: 'Utilità STEM e Studentesche',
    stemSubtitle: 'Algebra delle matrici, distribuzione gaussiana, calcolo terreni e media.',
    formulaTitle: 'Raccolta Completa di Formule',
    practiceTitle: 'Foglio di Esercizi Interattivo',

    focusedMode: 'Scrivania Focalizzata',
    stageNumber: 'Fase',
    nextStage: 'Fase Successiva',
    prevStage: 'Fase Precedente',
    quickJump: 'Salto Rapido',
    currentStage: 'Modulo Attivo',
    allStages: 'Tutti i Moduli',

    curriculumTitle: 'Curricolo Scolastico di Matematica',
    curriculumSubtitle: 'Moduli allineati ai programmi con formule verificate e calcolatori interattivi.',
    class10Title: 'Matematica Classe 10',
    class10Subtitle: 'Numeri reali, polinomi, sistemi lineari, equazioni di secondo grado e trigonometria.',
    class12Title: 'Matematica Classe 12 & Maturità',
    class12Subtitle: 'Matrici, determinanti, continuità, derivate, integrali, vettori e geometria analitica.',
    selectClass: "Progressione dell'Apprendimento Matematico",
    classLevelFoundation: "Classi 1–5: Matematica di Base",
    classLevelExplorer: "Classi 6–8: Esploratore Matematico",
    classLevelSecondary: "Classi 9–10: Matematica Secondaria",
    classLevelSenior: "Classe 12 e Superiore: Matematica Avanzata",
    allCurriculum: 'Tutti i Corsi',
    launchModule: 'Avvia Modulo',
    exploreChapter: 'Esplora Capitolo',

    builtBy: 'Creato da HSBJK',
    clientSideBadge: '100% Lato Client',
    formulaVerified: 'Matematicamente Verificato',
    searchPlaceholder: 'Cerca calcolatori, formule e argomenti…',
    searchPopularTools: 'Strumenti Popolari',
    searchLearningEducation: 'Apprendimento e Istruzione',
    searchFormulasTopics: 'Formule e Argomenti',
    searchRecentSearches: 'Ricerche Recenti',
    searchClear: 'Cancella',
    searchNoResults: 'Nessun calcolatore, formula o argomento corrispondente trovato.',
    aboutTitle: 'Informazioni su CalcAura',
    aboutSubtitle: 'Creato da HSBJK',
    aboutPhilosophyTitle: 'Filosofia Fondamentale',
    aboutPhilosophyQuote: 'Calcolare. Visualizzare. Comprendere. Verificare.',
    aboutPhilosophyBody: 'Uno spazio di calcolo affidabile e senza telemetria per studenti e docenti.',
    zeroLatencyTitle: 'Zero Latenza',
    zeroLatencyDesc: 'Tutti i calcoli avvengono direttamente nel browser.',
    liveTypesettingTitle: 'Tipografia KaTeX Nitida',
    liveTypesettingDesc: 'Formule LaTeX visualizzate con massima accuratezza.',
    privacyTitle: 'Massima Riservatezza',
    privacyDesc: 'Nessun tracciamento dati, esecuzione 100% locale.',
    contactLink: 'Contatto',
    privacyTerms: 'Privacy e Termini',
    footerDesc: 'Matematica di precisione e computazione scientifica in un ambiente ordinato.',
    footerRights: 'Esecuzione lato client. Zero telemetria.',

    // About Page Redesign in Italian
    aboutHeroHeadline: 'Rendere la matematica più chiara, una scoperta alla volta.',
    aboutHeroSub: 'CALCAURA unisce calcoli, equazioni, visualizzazioni interattive e apprendimento in un unico spazio di lavoro—aiutando studenti e menti curiose a esplorare la matematica con grande chiarezza.',
    aboutExploreCta: 'Esplora CALCAURA',
    aboutPhilTag: 'Filosofia',
    aboutPhilHeading: 'La matematica è molto più di una risposta.',
    aboutPhilDesc: 'Crediamo che la matematica diventi più facile da esplorare quando numeri, equazioni e rappresentazioni visive dialogano insieme.',
    aboutPrinciplesTag: 'Principi Fondamentali',
    aboutPrinciplesHeading: 'Il nostro approccio all’apprendimento',
    aboutCalcTag: '01 · Calcolare',
    aboutCalcTitle: 'Precisione in ogni passaggio',
    aboutCalcDesc: 'Esegui calcoli matematici e scientifici con parametri chiari e risultati rigorosi.',
    aboutVisTag: '02 · Visualizzare',
    aboutVisTitle: 'L’intuizione attraverso la forma',
    aboutVisDesc: 'Esplora funzioni, forme, grafici e relazioni matematiche tramite rappresentazioni interattive.',
    aboutUndTag: '03 · Comprendere',
    aboutUndTitle: 'Profondità dietro la formula',
    aboutUndDesc: 'Collega il risultato alla sua formula, dimostrazione o simulazione visiva.',
    aboutAudienceTag: 'Destinatari',
    aboutAudienceHeading: 'Pensato per ogni livello di apprendimento',
    aboutAudSchool: 'Studenti della Scuola Primaria e Media',
    aboutAudSchoolDesc: 'Matematica di base con rappresentazioni visive intuitive e oggetti della vita quotidiana.',
    aboutAudSec: 'Studenti delle Scuole Superiori e Maturandi',
    aboutAudSecDesc: 'Algebra, dimostrazioni geometriche, trigonometria e calcolo infinitesimale.',
    aboutAudEng: 'Studenti Universitari e di Ingegneria',
    aboutAudEngDesc: 'Algebra matriciale, calcolo multivariabile, cinematica e calcolo scientifico.',
    aboutAudEdu: 'Docenti e Appassionati di Matematica',
    aboutAudEduDesc: 'Laboratori dimostrativi, schede di lavoro stampabili e visualizzatori 3D.',
    aboutCreatorTag: 'Creato con Cura',
    aboutCreatorTitle: 'Creato da HSBJK.',
    aboutCreatorDesc: 'CALCAURA è un progetto in continua evoluzione focalizzato sul rendere la matematica più facile da calcolare, visualizzare e comprendere.',
    aboutFinalHeading: 'Guarda la matematica con occhi diversi.',
    aboutFinalSub: 'Scopri un modo più visivo di esplorare la matematica.',
    aboutFooterCopy: 'CALCAURA · Creato da HSBJK · Tutti i diritti riservati',

    // Classes 1-5 Toy Shop Theme in Italian
    kidsFoundationBadge: 'Matematica Elementare & Negozio di Giocattoli 🎪',
    kidsHeroTitle: 'Piccoli Passi. Grandi Scoperte! 🎈',
    kidsHeroSubtitle: 'Impara la matematica con simpatici cuccioli, fiori colorati, giocattoli e giochi interattivi!',
    kidsOpenVisual: 'Mondo della Matematica Visiva 🎨',
    kidsOpenTables: 'Studio Tabelline 1–30 🖩',
    kidsOpenPlayground: 'Parco Giochi 🧸',
    kidsSelectGrade: 'Scegli la Classe:',
    kidsClass1Title: 'Classe 1: Cuccioli e Giocattoli Felici 🐶',
    kidsClass2Title: 'Classe 2: Numeri e Giardino Fiorito 🌻',
    kidsClass3Title: 'Classe 3: Forme Magiche e Mercatino 🎁',
    kidsClass4Title: 'Classe 4: L’Avventura delle Tabelline 🚀',
    kidsClass5Title: 'Classe 5: Frazioni e Viaggio nel Tempo ⏱️',
    kidsPlayNow: 'Gioca Ora! 🚀',
    kidsTapToCount: 'Tocca i giocattoli per contare!',
    kidsAwesomeJob: 'Bravissimo! Ottimo lavoro! ⭐',
    kidsTryAgain: 'Contiamo ancora insieme!',
    kidsPopBalloons: 'Scoppia i palloncini per sottrarre!',
    kidsMatchShapes: 'Abbina le forme colorate!',
    kidsToysAndAnimals: 'Giocattoli, Animali e Fiori',
    kidsInteractiveGarden: 'Giardino Matematico Divertente',

    // Math Playground in Italian
    playgroundTitle: 'Parco Giochi & STEM 🧸',
    playgroundSubtitle: 'Bilancia con orsacchiotti di peluche, tangenti dinamiche e onde 3D interattive.',
    playgroundHeroTag: 'Esperimenti Matematici',
    playgroundScaleTitle: 'Bilancia degli Orsacchiotti 🧸',
    playgroundScaleDesc: 'Regola il numero di orsacchiotti per equilibrare la bilancia e risolvere 2x + 4 = 10!',
    playgroundAdjustTeddy: 'Regola il valore di x (Orsacchiotti):',
    playgroundScaleBalanced: 'Evviva! 2(3) + 4 = 10! La bilancia è perfettamente in equilibrio! 🎉',
    playgroundScaleNotBalanced: 'Non ancora in equilibrio! Sposta il cursore per trovare il numero giusto.',
    playgroundWaveTitle: 'Visualizzatore di Onde Parametriche 3D',
    playgroundWaveDesc: 'Mesh di onde tridimensionali in tempo reale con rendering WebGL.',

    // Homepage & Product Showcase
    heroEyebrow: 'MATEMATICA · SCIENZA · INGEGNERIA',
    heroHeadline1: 'La Matematica,',
    heroHeadline2: 'Resa Visiva.',
    heroDescription: 'Esplora equazioni, comprendi relazioni e vivi la matematica attraverso la visualizzazione scientifica interattiva.',
    heroOpenApp: 'Apri CalcAura',
    heroExploreMath: 'Esplora la Matematica',
    heroPlatformCrafted: 'Piattaforma Creata da HSBJK',
    canvasPreviewTag: 'Anteprima Interattiva dell\'Area di Lavoro',
    canvasTitle: 'Una Tela Matematica Unificata',
    canvasSubtitle: 'Scorri per mettere a fuoco l\'area di lavoro. Esplora curve, pendenze tangenti e radici reali in tempo reale.',
  },
};
