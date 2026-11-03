import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { ScrollProgressBar } from './components/ScrollProgressBar.tsx';
import { LandingPage } from './components/Landing/LandingPage.tsx';
import { Seo } from './components/Seo.tsx';
import { ThreeCanvas3DScroll } from './components/ThreeCanvas3DScroll.tsx';
import { InteractiveGeometry } from './components/InteractiveGeometry.tsx';
import { GraphingEngine } from './components/GraphingEngine.tsx';
import { EquationSolver } from './components/EquationSolver.tsx';
import { PhysicsVisualizer } from './components/PhysicsVisualizer.tsx';
import { StemToolkit } from './components/StemToolkit.tsx';
import { FormulaLibrary } from './components/FormulaLibrary.tsx';
import { PracticeWorksheet } from './components/PracticeWorksheet.tsx';
import { SchoolCurriculumSection, Class10Section, Class12Section } from './components/SchoolCurriculumSection.tsx';
import { MiddleSchoolSection } from './components/MiddleSchoolSection.tsx';
import { ClassLearningHub } from './components/ClassLearningHub.tsx';
import { CLASS_6_CHAPTERS } from './data/class6Data.ts';
import { CLASS_7_CHAPTERS } from './data/class7Data.ts';
import { CLASS_8_CHAPTERS } from './data/class8Data.ts';
import { CLASS_9_CHAPTERS } from './data/class9Data.ts';
import { Classes1to5Section } from './components/Classes1to5Section.tsx';
import { VisualMathWorld, VisualActivityId } from './components/VisualMathWorld/VisualMathWorld.tsx';
import { MultiplicationTablesWorkspace } from './components/MultiplicationTables/MultiplicationTablesWorkspace.tsx';
import { MathPlayground } from './components/MathPlayground/MathPlayground.tsx';
import { PopularCalculators } from './components/PopularCalculators.tsx';
import { BasicCalculator } from './components/BasicCalculator/BasicCalculator.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { WhiteboardWorkspace } from './components/Whiteboard/WhiteboardWorkspace.tsx';
import { HistoryPage } from './components/History/HistoryPage.tsx';
import { Notebook } from './components/Whiteboard/types.ts';
import { PracticeHistoryEntry } from './data/historyStorage.ts';
import { LearningAndToolsSection } from './components/LearningAndToolsSection.tsx';
import { ToolDirectory } from './components/ToolDirectory.tsx';
import { Footer } from './components/Footer.tsx';
import { PageOutro } from './components/ui/PageOutro.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { ClerkAuthPage } from './components/Auth/ClerkAuthPage.tsx';
import { useI18n } from './i18n/I18nContext.tsx';
import { Language, TRANSLATIONS } from './i18n/translations.ts';
import {
  Layers,
  AreaChart,
  Shapes,
  Compass,
  Atom,
  Grid,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Cpu,
  Landmark,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface StageMeta {
  id: string;
  step: string;
  title: string;
  shortLabel: string;
  category: string;
  icon: React.ElementType;
}

const STAGES: StageMeta[] = [
  {
    id: 'stage-classes1-5',
    step: '01',
    title: 'Classes 1–5: Little Steps. Big Discoveries.',
    shortLabel: 'Classes 1–5',
    category: 'Foundation Mathematics',
    icon: Sparkles,
  },
  {
    id: 'stage-curriculum',
    step: '02',
    title: 'Class-Based Mathematics Progression (Classes 1–12 & Higher)',
    shortLabel: 'Curriculum',
    category: 'Class Learning Hub',
    icon: GraduationCap,
  },
  {
    id: 'stage-class6',
    step: '03',
    title: 'Class 6: Mathematics Explorer (10 Chapters)',
    shortLabel: 'Class 6',
    category: 'Middle School',
    icon: Compass,
  },
  {
    id: 'stage-class7',
    step: '04',
    title: 'Class 7: Intermediate Mathematics (15 Chapters)',
    shortLabel: 'Class 7',
    category: 'Middle School',
    icon: Layers,
  },
  {
    id: 'stage-class8',
    step: '05',
    title: 'Class 8: Advanced Middle-School Mathematics (14 Chapters)',
    shortLabel: 'Class 8',
    category: 'Middle School',
    icon: Sparkles,
  },
  {
    id: 'stage-class9',
    step: '06',
    title: 'Class 9: Secondary Mathematics Foundations (8 Chapters)',
    shortLabel: 'Class 9',
    category: 'Pre-Secondary',
    icon: BookOpen,
  },
  {
    id: 'stage-learning',
    step: '07',
    title: 'Interactive Calculators & Learning Tools Matrix',
    shortLabel: 'Calculators',
    category: 'Curriculum & Tools Hub',
    icon: Layers,
  },
  {
    id: 'stage-class10',
    step: '08',
    title: 'Class 10 Mathematics Tools',
    shortLabel: 'Class 10',
    category: 'Secondary Curriculum',
    icon: GraduationCap,
  },
  {
    id: 'stage-class12',
    step: '04',
    title: 'Class 12 Mathematics Tools',
    shortLabel: 'Class 12',
    category: 'Higher Secondary',
    icon: BookOpen,
  },
  {
    id: 'stage-engineering',
    step: '05',
    title: 'Engineering Tools & Scientific Computing',
    shortLabel: 'Engineering',
    category: 'Diploma & B.Tech STEM',
    icon: Cpu,
  },
  {
    id: 'stage-graduation',
    step: '06',
    title: 'Graduation Tools & Higher Mathematics',
    shortLabel: 'Graduation',
    category: 'B.Sc. / Undergrad Math',
    icon: Landmark,
  },
  {
    id: 'stage-01',
    step: '07',
    title: '3D Spatial Dimensions & Manifold Scroll',
    shortLabel: '3D Space',
    category: 'Spatial Geometry',
    icon: Layers,
  },
  {
    id: 'stage-02',
    step: '08',
    title: 'Cartesian Coordinate Graphing & Calculus Slopes',
    shortLabel: 'Graphing',
    category: 'Analysis & Slopes',
    icon: AreaChart,
  },
  {
    id: 'stage-03',
    step: '09',
    title: 'Parametric Euclidean Geometry & Vector Mensuration',
    shortLabel: 'Geometry',
    category: '2D / 3D Mensuration',
    icon: Shapes,
  },
  {
    id: 'stage-04',
    step: '10',
    title: 'Rigorous Equation Solver & Step Proofs',
    shortLabel: 'Solver',
    category: 'Algebra & Proofs',
    icon: Compass,
  },
  {
    id: 'stage-05',
    step: '11',
    title: 'Physics Kinematics, Oscillators & Circuits',
    shortLabel: 'Physics',
    category: 'Dynamic Simulations',
    icon: Atom,
  },
  {
    id: 'stage-06',
    step: '12',
    title: 'STEM Computing, Matrix Algebra & Statistics',
    shortLabel: 'STEM',
    category: 'Matrices & Data',
    icon: Grid,
  },
  {
    id: 'stage-07',
    step: '13',
    title: 'Comprehensive Mathematical Formula Compendium',
    shortLabel: 'Formulas',
    category: 'Reference Catalog',
    icon: BookOpen,
  },
  {
    id: 'stage-08',
    step: '14',
    title: 'Interactive Examination & Practice Solver (255 Qs across 4 Stages)',
    shortLabel: 'Practice Exam',
    category: 'Assessment & Proofs',
    icon: CheckCircle2,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window === 'undefined') return 'home';
    const path = (window.location.pathname || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();
    const combined = `${path} ${hash}`;
    if (combined.includes('calculator/basic') || combined.includes('basic-calculator') || combined.includes('calculator-basic')) {
      return 'basic-calculator';
    }
    if (combined.includes('sign-in') || combined.includes('signin') || combined.includes('login')) {
      return 'sign-in';
    }
    if (combined.includes('sign-up') || combined.includes('signup') || combined.includes('register')) {
      return 'sign-up';
    }
    if (combined.includes('history')) return 'history';
    if (combined.includes('whiteboard') || combined.includes('canvas')) return 'whiteboard';
    if (combined.includes('table') || combined.includes('multiplication')) return 'multiplication-tables';
    if (combined.includes('playground')) return 'playground';
    if (combined.includes('about')) return 'about';
    if (combined.includes('visual-math')) return 'visual-maths';
    if (combined.includes('classes1-5') || combined.includes('classes-1-5') || combined.includes('junior')) {
      return 'classes1-5';
    }
    if (combined.includes('classes6-9') || combined.includes('classes-6-9') || combined.includes('classes6-8') || combined.includes('classes-6-8')) {
      return 'classes6-9';
    }
    if (combined.includes('class-6') || combined.includes('class6')) {
      return 'class6';
    }
    if (combined.includes('class-7') || combined.includes('class7')) {
      return 'class7';
    }
    if (combined.includes('class-8') || combined.includes('class8')) {
      return 'class8';
    }
    if (combined.includes('class-9') || combined.includes('class9')) {
      return 'class9';
    }
    if (combined.includes('curriculum') || combined.includes('class-10') || combined.includes('class10') || combined.includes('class-12') || combined.includes('class12')) {
      return 'curriculum';
    }
    if (combined.includes('platform')) {
      return 'platform';
    }
    return 'home';
  });
  const [historyNotebookToOpen, setHistoryNotebookToOpen] = useState<Notebook | null>(null);
  const [historyReviewAttempt, setHistoryReviewAttempt] = useState<PracticeHistoryEntry | null>(null);
  const { currentLang, setLang: setCurrentLang, t } = useI18n();
  const [currentStageId, setCurrentStageId] = useState<string>('stage-learning');
  const [selectedVisualActivity, setSelectedVisualActivity] = useState<VisualActivityId | undefined>(undefined);
  const [selectedJuniorClass, setSelectedJuniorClass] = useState<number | undefined>(undefined);
  const [curriculumClass, setCurriculumClass] = useState<
    | 'both'
    | 'classes1-5'
    | 'classes6-8'
    | 'class6'
    | 'class7'
    | 'class8'
    | 'class9'
    | 'class10'
    | 'class12'
    | 'engineering'
    | 'graduation'
  >(() => {
    if (typeof window === 'undefined') return 'both';
    const combined = `${window.location.pathname} ${window.location.hash}`.toLowerCase();
    if (combined.includes('class-6') || combined.includes('class6')) return 'class6';
    if (combined.includes('class-7') || combined.includes('class7')) return 'class7';
    if (combined.includes('class-8') || combined.includes('class8')) return 'class8';
    if (combined.includes('class-9') || combined.includes('class9')) return 'class9';
    if (combined.includes('classes6-8') || combined.includes('classes-6-8')) return 'classes6-8';
    if (combined.includes('class-10') || combined.includes('class10')) return 'class10';
    if (combined.includes('class-12') || combined.includes('class12')) return 'class12';
    if (combined.includes('engineering')) return 'engineering';
    if (combined.includes('graduation')) return 'graduation';
    return 'both';
  });

  // Theme state with localStorage persistence and system color scheme fallback
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('calcaura_theme') || localStorage.getItem('calclogic_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
      return false;
    } catch {
      return false;
    }
  });

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);

  // Sync theme with document class and persist
  useEffect(() => {
    try {
      localStorage.setItem('calcaura_theme', darkMode ? 'dark' : 'light');
    } catch {}
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Direct URL route listener on mount and back/forward navigation
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = (typeof window !== 'undefined' ? window.location.pathname : '').toLowerCase();
      const hash = (typeof window !== 'undefined' ? window.location.hash : '').toLowerCase();
      const combined = `${path} ${hash}`;
      // IMPORTANT: Let Clerk control its own internal authentication routes.
// Never rewrite nested verification URLs such as /sign-in/... or /sign-up/...
if (path === '/sign-in' || path.startsWith('/sign-in/')) {
  setActiveTab('sign-in');
  return;
}

if (path === '/sign-up' || path.startsWith('/sign-up/')) {
  setActiveTab('sign-up');
  return;
}

      if (combined.includes('calculator/basic') || combined.includes('basic-calculator') || combined.includes('calculator-basic')) {
        handleSelectTab('basic-calculator');
      } else if (combined.includes('history')) {
        handleSelectTab('history');
      } else if (combined.includes('whiteboard') || combined.includes('canvas') || combined.includes('drawing')) {
        handleSelectTab('whiteboard');
      } else if (combined.includes('table') || combined.includes('multiplication')) {
        handleSelectTab('multiplication-tables');
      } else if (combined.includes('playground')) {
        handleSelectTab('playground');
      } else if (combined.includes('about')) {
        handleSelectTab('about');
      } else if (combined.includes('visual-math')) {
        handleSelectTab('visual-maths');
      } else if (combined.includes('classes1-5') || combined.includes('classes-1-5') || combined.includes('junior')) {
        handleSelectTab('classes1-5');
      } else if (combined.includes('classes6-9') || combined.includes('classes-6-9')) {
        handleSelectTab('classes6-9');
      } else if (combined.includes('class-6') || combined.includes('class6')) {
        handleSelectTab('class6');
      } else if (combined.includes('class-7') || combined.includes('class7')) {
        handleSelectTab('class7');
      } else if (combined.includes('class-8') || combined.includes('class8')) {
        handleSelectTab('class8');
      } else if (combined.includes('class-9') || combined.includes('class9')) {
        handleSelectTab('class9');
      } else if (combined.includes('classes6-8') || combined.includes('classes-6-8')) {
        handleSelectTab('classes6-9');
      } else if (combined.includes('class-10') || combined.includes('class10')) {
        handleSelectTab('class-10');
      } else if (combined.includes('class-12') || combined.includes('class12')) {
        handleSelectTab('class-12');
      } else if (combined.includes('curriculum')) {
        handleSelectTab('curriculum');
      } else if (combined.includes('engineering')) {
        handleSelectTab('engineering');
      } else if (combined.includes('graduation')) {
        handleSelectTab('graduation');
      } else if (combined.includes('calculator')) {
        handleSelectTab('calculators');
      } else if (combined.includes('learning')) {
        handleSelectTab('learning');
      } else if (combined.includes('sign-in') || combined.includes('signin') || combined.includes('login')) {
        handleSelectTab('sign-in');
      } else if (combined.includes('sign-up') || combined.includes('signup') || combined.includes('register')) {
        handleSelectTab('sign-up');
      } else if (combined.includes('platform')) {
        handleSelectTab('platform');
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, []);

  const handleScrollToStage = (stageId: string) => {
    setActiveTab('platform');
    setCurrentStageId(stageId);
    try {
      window.history.replaceState(null, '', '/platform');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tabId: string) => {
    if (tabId === 'home') {
      setActiveTab('home');
      try {
        window.history.replaceState(null, '', '/');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'basic-calculator' || tabId === 'calculator/basic' || tabId === 'basic') {
      setActiveTab('basic-calculator');
      try {
        window.history.replaceState(null, '', '/calculator/basic');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'sign-in' || tabId === 'signin' || tabId === 'login') {
      setActiveTab('sign-in');
      try {
        window.history.replaceState(null, '', '/sign-in');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'sign-up' || tabId === 'signup' || tabId === 'register') {
      setActiveTab('sign-up');
      try {
        window.history.replaceState(null, '', '/sign-up');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'history') {
      setActiveTab('history');
      try {
        window.history.replaceState(null, '', '/history');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'about') {
      setActiveTab('about');
      try {
        window.history.replaceState(null, '', '/about');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'whiteboard' || tabId === 'canvas') {
      setActiveTab('whiteboard');
      try {
        window.history.replaceState(null, '', '/whiteboard');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'playground') {
      setActiveTab('playground');
      try {
        window.history.replaceState(null, '', '/playground');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'visual-maths' || tabId === 'visual-math') {
      setActiveTab('visual-maths');
      try {
        window.history.replaceState(null, '', '/platform/visual-maths');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'multiplication-tables' || tabId === 'tables') {
      setActiveTab('multiplication-tables');
      try {
        window.history.replaceState(null, '', '/playground/multiplication-tables');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'classes1-5' || tabId === 'classes-1-5') {
      setActiveTab('classes1-5');
      try {
        window.history.replaceState(null, '', '/platform/classes-1-5');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'curriculum') {
      setActiveTab('curriculum');
      setCurriculumClass('both');
      try {
        window.history.replaceState(null, '', '/curriculum');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      tabId === 'classes6-9' ||
      tabId === 'classes-6-9' ||
      tabId === 'classes6-8' ||
      tabId === 'classes-6-8' ||
      tabId === 'middle-school'
    ) {
      setActiveTab('classes6-9');
      setCurriculumClass('class6');
      try {
        window.history.replaceState(null, '', '/curriculum/classes-6-9');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'class6' || tabId === 'class-6') {
      setActiveTab('classes6-9');
      setCurriculumClass('class6');
      try {
        window.history.replaceState(null, '', '/curriculum/class-6');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'class7' || tabId === 'class-7') {
      setActiveTab('classes6-9');
      setCurriculumClass('class7');
      try {
        window.history.replaceState(null, '', '/curriculum/class-7');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'class8' || tabId === 'class-8') {
      setActiveTab('classes6-9');
      setCurriculumClass('class8');
      try {
        window.history.replaceState(null, '', '/curriculum/class-8');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'class9' || tabId === 'class-9') {
      setActiveTab('classes6-9');
      setCurriculumClass('class9');
      try {
        window.history.replaceState(null, '', '/curriculum/class-9');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'class10' || tabId === 'class-10') {
      setActiveTab('curriculum');
      setCurriculumClass('class10');
      try {
        window.history.replaceState(null, '', '/curriculum/class-10');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'class12' || tabId === 'class-12') {
      setActiveTab('curriculum');
      setCurriculumClass('class12');
      try {
        window.history.replaceState(null, '', '/curriculum/class-12');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'calculators') {
      setActiveTab('platform');
      setCurrentStageId('stage-learning');
      try {
        if (window.location.pathname !== '/platform/calculators') {
          window.history.pushState(null, '', '/platform/calculators');
        }
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId === 'platform') {
      setActiveTab('platform');
      try {
        window.history.replaceState(null, '', '/platform');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Direct routing to specific modules
    const stageMap: Record<string, string> = {
      'classes-1-5': 'stage-classes1-5',
      'classes1-5': 'stage-classes1-5',
      junior: 'stage-classes1-5',
      curriculum: 'stage-curriculum',
      class6: 'stage-class6',
      'class-6': 'stage-class6',
      class7: 'stage-class7',
      'class-7': 'stage-class7',
      class8: 'stage-class8',
      'class-8': 'stage-class8',
      class9: 'stage-class9',
      'class-9': 'stage-class9',
      'classes6-8': 'stage-class6',
      'classes6-9': 'stage-class6',
      'middle-school': 'stage-class6',
      learning: 'stage-learning',
      'learning-tools': 'stage-learning',
      tools: 'stage-learning',
      class10: 'stage-class10',
      'class-10': 'stage-class10',
      class12: 'stage-class12',
      'class-12': 'stage-class12',
      engineering: 'stage-engineering',
      'engineering-tools': 'stage-engineering',
      graduation: 'stage-graduation',
      'graduation-tools': 'stage-graduation',
      graphing: 'stage-02',
      geometry: 'stage-03',
      solver: 'stage-04',
      physics: 'stage-05',
      stem: 'stage-06',
      formulas: 'stage-07',
      practice: 'stage-08',
      calculators: 'stage-learning',
    };

    setActiveTab('platform');
    const targetId = stageMap[tabId];
    if (targetId) {
      // Sync URL if target is an education route
      try {
        if (['classes-1-5', 'class-10', 'class-12', 'engineering', 'graduation'].includes(tabId)) {
          window.history.replaceState(null, '', `/platform/${tabId}`);
        } else if (tabId === 'learning' || tabId === 'platform') {
          window.history.replaceState(null, '', '/platform');
        }
      } catch {}

      setCurrentStageId(targetId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentStageIndex = STAGES.findIndex((s) => s.id === currentStageId);
  const prevStage = currentStageIndex > 0 ? STAGES[currentStageIndex - 1] : null;
  const nextStage = currentStageIndex < STAGES.length - 1 ? STAGES[currentStageIndex + 1] : null;

  const getStageLabel = (stageId: string, fallback: string): string => {
    switch (stageId) {
      case 'stage-classes1-5': return t.navClasses1to5;
      case 'stage-curriculum': return t.navCurriculum;
      case 'stage-class6': return 'Class 6';
      case 'stage-class7': return 'Class 7';
      case 'stage-class8': return 'Class 8';
      case 'stage-class9': return 'Class 9';
      case 'stage-learning': return t.allStages || 'All Tools';
      case 'stage-class10': return t.class10Title ? t.class10Title.split(/[:|]/)[0].trim() : fallback;
      case 'stage-class12': return t.class12Title ? t.class12Title.split(/[:|]/)[0].trim() : fallback;
      case 'stage-engineering': return t.stemTitle || fallback;
      case 'stage-graduation': return fallback;
      case 'stage-01': return t.view3dSpace || fallback;
      case 'stage-02': return t.graphingTitle || fallback;
      case 'stage-03': return t.geometryTitle || fallback;
      case 'stage-04': return t.openSolver || fallback;
      case 'stage-05': return t.physicsTitle || fallback;
      case 'stage-06': return t.stemTitle || fallback;
      case 'stage-07': return t.formulaTitle || fallback;
      case 'stage-08': return t.practiceTitle || fallback;
      default: return fallback;
    }
  };

  const isLanding = activeTab === 'home';
  const isCurriculum = activeTab === 'curriculum';
  const isClasses1to5 = activeTab === 'classes1-5';
  const isClasses6to9 =
    activeTab === 'classes6-9' ||
    activeTab === 'class6' ||
    activeTab === 'class7' ||
    activeTab === 'class8' ||
    activeTab === 'class9';
  const isVisualMaths = activeTab === 'visual-maths';
  const isMultiplicationTables = activeTab === 'multiplication-tables';
  const isPlayground = activeTab === 'playground';
  const isAbout = activeTab === 'about';
  const isHistory = activeTab === 'history';
  const isBasicCalculator = activeTab === 'basic-calculator';
  const isSignIn = activeTab === 'sign-in';
  const isSignUp = activeTab === 'sign-up';

  if (activeTab === 'whiteboard') {
    return (
      <>
        <Seo activeTab="whiteboard" />
        <h1 className="sr-only">CalcAura whiteboard</h1>
        <WhiteboardWorkspace
          onExit={() => handleSelectTab('home')}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          initialNotebook={historyNotebookToOpen}
          onNavigateToHistory={() => handleSelectTab('history')}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-[#F6F7FB] transition-colors overflow-x-hidden w-full max-w-full relative">
      <Seo activeTab={activeTab} />

      {/* Floating Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setSearchOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenAbout={() => handleSelectTab('about')}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        t={t}
        isLandingView={isLanding}
        isAboutView={isAbout}
      />

      {/* Fixed Scroll Progress Indicator Line beneath the navigation bar */}
      <ScrollProgressBar />

      {/* Main Content Area */}
      <main
        key={isLanding ? 'landing' : activeTab}
        className={`flex-1 w-full max-w-full overflow-x-hidden ${isLanding ? '' : 'page-shell'}`}
      >
        {/* VIEW 1: THE DESK — one continuous surface from Class 1 to engineering */}
        {isLanding && (
          <LandingPage
            onOpenWorkspace={() => handleSelectTab('platform')}
            onSelectTab={handleSelectTab}
          />
        )}

        {/* VIEW 2: DEDICATED SCHOOL MATHEMATICS CURRICULUM (Class 10 & Class 12) */}
        {isCurriculum && (
          <div className="page-surface space-y-8 animate-in fade-in">
            <header className="page-head">
              <div>
                <h1>{t.curriculumTitle || 'Class-based mathematics progression'}</h1>
                <p>
                  {t.curriculumSubtitle ||
                    'Foundation, middle school, secondary, senior secondary, engineering and undergraduate mathematics in one sequence.'}
                </p>
              </div>

              <div className="page-head__actions">
                <button type="button" className="btn btn--sm" onClick={() => handleSelectTab('platform')}>
                  <span>{t.workspace}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </header>

            <SchoolCurriculumSection
              t={t}
              onNavigateStage={handleScrollToStage}
              initialClass={curriculumClass}
            />
          </div>
        )}

        {/* VIEW: CLASSES 1-5 FOUNDATION MATHEMATICS */}
        {isClasses1to5 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in">
            <Classes1to5Section
              onOpenVisualMath={(activityId, cls) => {
                setSelectedVisualActivity(activityId);
                setSelectedJuniorClass(cls);
                handleSelectTab('visual-maths');
              }}
              onOpenTables={() => handleSelectTab('multiplication-tables')}
              onOpenPlayground={() => handleSelectTab('playground')}
            />
          </div>
        )}

        {/* VIEW: CLASSES 6-9 MATHEMATICS EXPLORER & PRE-SECONDARY */}
        {isClasses6to9 && (
          <div className="page-surface space-y-8 animate-in fade-in">
            <header className="page-head">
              <div>
                <h1>Middle school, one shelf.</h1>
                <p>
                  Classes 6 to 9: chapters, worked examples, formulas and zero-leak practice, kept
                  in the same workspace as the calculators.
                </p>
              </div>

              <div className="page-head__actions">
                <button
                  type="button"
                  className="btn btn--sm btn--ghost"
                  onClick={() => handleSelectTab('curriculum')}
                >
                  <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>All classes</span>
                </button>
                <button type="button" className="btn btn--sm" onClick={() => handleSelectTab('platform')}>
                  <span>{t.workspace}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </header>

            <MiddleSchoolSection
              onNavigateStage={handleScrollToStage}
              initialGrade={
                activeTab === 'class7' ? 'class7' :
                activeTab === 'class8' ? 'class8' :
                activeTab === 'class9' ? 'class9' : 'class6'
              }
            />
          </div>
        )}

        {/* VIEW: VISUAL MATH WORLD */}
        {isVisualMaths && (
          <div className="animate-in fade-in">
            <VisualMathWorld
              initialActivity={selectedVisualActivity}
              initialClass={selectedJuniorClass}
              onNavigateTables={() => handleSelectTab('multiplication-tables')}
              onNavigatePlayground={() => handleSelectTab('playground')}
            />
          </div>
        )}

        {/* VIEW: MULTIPLICATION TABLES 1-30 STUDIO */}
        {isMultiplicationTables && (
          <div className="animate-in fade-in">
            <MultiplicationTablesWorkspace />
          </div>
        )}

        {/* VIEW: IMMERSIVE MATH PLAYGROUND */}
        {isPlayground && (
          <div className="animate-in fade-in">
            <MathPlayground />
          </div>
        )}

        {/* VIEW: PREMIUM ABOUT PAGE */}
        {isAbout && (
          <div className="animate-in fade-in duration-500">
            <AboutPage
              onExplorePlatform={() => handleSelectTab('platform')}
              onNavigateHome={() => handleSelectTab('home')}
              onOpenWhiteboard={() => handleSelectTab('whiteboard')}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* VIEW: TWO-CATEGORY HISTORY PAGE */}
        {isHistory && (
          <div className="animate-in fade-in">
            <HistoryPage
              onOpenWhiteboard={(nb) => {
                setHistoryNotebookToOpen(nb);
                handleSelectTab('whiteboard');
              }}
              onReviewPracticeAttempt={(entry) => {
                setHistoryReviewAttempt(entry);
                handleScrollToStage('stage-08');
              }}
              onRetryPracticeQuestions={(_qs, _title) => {
                setHistoryReviewAttempt(null);
                handleScrollToStage('stage-08');
              }}
              onNavigateToPractice={() => {
                setHistoryReviewAttempt(null);
                handleScrollToStage('stage-08');
              }}
              onNavigateToWhiteboard={() => {
                setHistoryNotebookToOpen(null);
                handleSelectTab('whiteboard');
              }}
              onNavigateToAuth={(mode) => handleSelectTab(mode)}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* VIEW: SMARTPHONE BASIC CALCULATOR */}
        {isBasicCalculator && (
          <div className="animate-in fade-in">
            <BasicCalculator
              onBack={() => handleSelectTab('platform')}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* VIEW: CLERK AUTHENTICATION (SIGN-IN & SIGN-UP) */}
        {(isSignIn || isSignUp) && (
          <div className="animate-in fade-in">
            <ClerkAuthPage
              mode={isSignIn ? 'sign-in' : 'sign-up'}
              onNavigateHome={() => handleSelectTab('home')}
              onSwitchMode={(mode) => handleSelectTab(mode)}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* VIEW 3: FULL CALCAURA WORKSPACE PLATFORM (Working Calculators & Tools) */}
        {!isLanding && !isCurriculum && !isClasses1to5 && !isVisualMaths && !isMultiplicationTables && !isPlayground && !isAbout && !isHistory && !isBasicCalculator && !isSignIn && !isSignUp && (
          <div>
            <h1 className="sr-only">CalcAura workspace</h1>
            {/* Sequential Milestone Ribbon (begins cleanly at the top of the Platform section) */}
            <div className="workspace-ribbon sticky top-16 sm:top-[72px] z-30 w-full max-w-full py-2 transition-all overflow-hidden">
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
                {/* Stage Indicators */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 thin-scrollbar max-w-full">
                  {STAGES.map((s) => {
                    const isActive = currentStageId === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleScrollToStage(s.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#c9f04e] text-[#0a0c09] font-bold'
                            : 'text-slate-600 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                        }`}
                        title={`${s.step}: ${s.title}`}
                      >
                        <span className={`text-[10px] ${isActive ? 'opacity-95' : 'opacity-60'}`}>
                          {s.step}
                        </span>
                        <span>{getStageLabel(s.id, s.shortLabel)}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Module Stepper Navigation */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {prevStage && (
                    <button
                      onClick={() => handleScrollToStage(prevStage.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/12 text-slate-700 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer text-xs font-medium"
                      title={`Previous: ${prevStage.step} ${getStageLabel(prevStage.id, prevStage.shortLabel)}`}
                    >
                      <ChevronUp className="w-3.5 h-3.5 rotate-[-90deg]" />
                      <span className="hidden sm:inline">{getStageLabel(prevStage.id, prevStage.shortLabel)}</span>
                    </button>
                  )}

                  {nextStage && (
                    <button
                      onClick={() => handleScrollToStage(nextStage.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/12 text-slate-700 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer text-xs font-medium"
                      title={`Next: ${nextStage.step} ${getStageLabel(nextStage.id, nextStage.shortLabel)}`}
                    >
                      <span className="hidden sm:inline">{getStageLabel(nextStage.id, nextStage.shortLabel)}</span>
                      <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" />
                    </button>
                  )}
                </div>
              </div>
            </div>


            {/* Focused Desk Workspace */}
            <div className="py-6 sm:py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="p-3.5 sm:p-4 bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/12 flex items-center justify-between gap-3 text-xs font-mono shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-slate-600 dark:text-[#A6A9B8]">
                      {t.focusedMode}:{' '}
                      <strong className="text-slate-900 dark:text-white font-semibold">
                        {STAGES.find((s) => s.id === currentStageId)?.title}
                      </strong>
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#c9f04e]/20 text-[#4f6900] dark:text-[#c9f04e] font-semibold text-[11px] shrink-0">
                    {STAGES.find((s) => s.id === currentStageId)?.category}
                  </span>
                </div>
              </div>

                {currentStageId === 'stage-classes1-5' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <Classes1to5Section
                      onOpenVisualMath={(activityId, cls) => {
                        setSelectedVisualActivity(activityId);
                        setSelectedJuniorClass(cls);
                        handleSelectTab('visual-maths');
                      }}
                      onOpenTables={() => handleSelectTab('multiplication-tables')}
                      onOpenPlayground={() => handleSelectTab('playground')}
                    />
                  </div>
                )}
                {currentStageId === 'stage-curriculum' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <SchoolCurriculumSection t={t} onNavigateStage={handleScrollToStage} />
                  </div>
                )}
                {currentStageId === 'stage-class6' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <ClassLearningHub
                      classLevelTitle="Class 6"
                      classLevelSubtitle="Mathematics Explorer"
                      badgeLabel="Class 6 · 10 Chapters"
                      chapters={CLASS_6_CHAPTERS}
                      onNavigateStage={handleScrollToStage}
                    />
                  </div>
                )}
                {currentStageId === 'stage-class7' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <ClassLearningHub
                      classLevelTitle="Class 7"
                      classLevelSubtitle="Intermediate Mathematics"
                      badgeLabel="Class 7 · 15 Chapters"
                      chapters={CLASS_7_CHAPTERS}
                      onNavigateStage={handleScrollToStage}
                    />
                  </div>
                )}
                {currentStageId === 'stage-class8' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <ClassLearningHub
                      classLevelTitle="Class 8"
                      classLevelSubtitle="Advanced Middle-School Mathematics"
                      badgeLabel="Class 8 · 14 Chapters"
                      chapters={CLASS_8_CHAPTERS}
                      onNavigateStage={handleScrollToStage}
                    />
                  </div>
                )}
                {currentStageId === 'stage-class9' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <ClassLearningHub
                      classLevelTitle="Class 9"
                      classLevelSubtitle="Secondary Mathematics Foundations"
                      badgeLabel="Class 9 · 8 Chapters"
                      chapters={CLASS_9_CHAPTERS}
                      onNavigateStage={handleScrollToStage}
                    />
                  </div>
                )}
                {currentStageId === 'stage-learning' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <PopularCalculators onSelectTab={handleSelectTab} />
                    <LearningAndToolsSection t={t} onNavigateStage={handleScrollToStage} initialLevel="all" />
                  </div>
                )}
                {currentStageId === 'stage-class10' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <LearningAndToolsSection t={t} onNavigateStage={handleScrollToStage} initialLevel="class10" />
                    <Class10Section t={t} onNavigateStage={handleScrollToStage} />
                  </div>
                )}
                {currentStageId === 'stage-class12' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <LearningAndToolsSection t={t} onNavigateStage={handleScrollToStage} initialLevel="class12" />
                    <Class12Section t={t} onNavigateStage={handleScrollToStage} />
                  </div>
                )}
                {currentStageId === 'stage-engineering' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <LearningAndToolsSection t={t} onNavigateStage={handleScrollToStage} initialLevel="engineering" />
                  </div>
                )}
                {currentStageId === 'stage-graduation' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <LearningAndToolsSection t={t} onNavigateStage={handleScrollToStage} initialLevel="graduation" />
                  </div>
                )}
                {currentStageId === 'stage-01' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ThreeCanvas3DScroll t={t} onSelectStage={handleScrollToStage} />
                  </div>
                )}
                {currentStageId === 'stage-02' && <GraphingEngine />}
                {currentStageId === 'stage-03' && <InteractiveGeometry />}
                {currentStageId === 'stage-04' && <EquationSolver />}
                {currentStageId === 'stage-05' && <PhysicsVisualizer />}
                {currentStageId === 'stage-06' && <StemToolkit />}
                {currentStageId === 'stage-07' && <FormulaLibrary onNavigateTab={handleSelectTab} />}
                {currentStageId === 'stage-08' && (
                  <PracticeWorksheet
                    initialAttemptToReview={historyReviewAttempt}
                    onExitReview={() => setHistoryReviewAttempt(null)}
                    onNavigateToHistory={() => handleSelectTab('history')}
                    onNavigateToAuth={() => handleSelectTab('sign-in')}
                  />
                )}

                {/* Tool Directory in Workspace */}
                <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ToolDirectory onSelectTab={handleSelectTab} />
                </div>
              </div>
          </div>
        )}
      </main>

      {/* Shared closing panel: one desk, every kind of mathematics */}
      {!isLanding && !isAbout && !isSignIn && !isSignUp && (
        <PageOutro onSelectTab={handleSelectTab} />
      )}

      {/* Minimal Footer (About page has its own dedicated minimal footer) */}
      {!isAbout && (
        <Footer t={t} onSelectTab={handleSelectTab} onOpenAbout={() => handleSelectTab('about')} />
      )}

      {/* Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTab={handleSelectTab}
        t={t}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        t={t}
        onOpenFullAbout={() => {
          setAboutOpen(false);
          handleSelectTab('about');
        }}
      />

    </div>
  );
}
