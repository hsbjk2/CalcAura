import { useEffect } from 'react';

interface SeoProps {
  activeTab: string;
}

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

const PAGES: Record<string, PageMeta> = {
  home: {
    title: 'CalcAura — Every sum, one desk',
    description:
      'Calculators, graphing, geometry, a whiteboard and Class 1–12 practice in one browser workspace for Indian students.',
    path: '/',
  },
  platform: {
    title: 'Workspace — CalcAura',
    description:
      'Open the CalcAura desk: scientific calculators, graphing, geometry, equation solver, physics tools, whiteboard and practice.',
    path: '/platform',
  },
  'classes1-5': {
    title: 'Classes 1–5 Foundation Maths — CalcAura',
    description:
      'Foundation mathematics for Classes 1–5: number, shape and measure, with visual activities, multiplication tables and play.',
    path: '/platform/classes-1-5',
  },
  'classes6-9': {
    title: 'Classes 6–9 Maths — CalcAura',
    description:
      'Middle-school mathematics for Classes 6–9: chapters, worked examples, formulas and chapter-mapped practice.',
    path: '/curriculum/classes-6-9',
  },
  class6: {
    title: 'Class 6 Maths — CalcAura',
    description:
      'Class 6 mathematics: chapters, worked examples, formulas and practice in the same workspace as the calculators.',
    path: '/curriculum/class-6',
  },
  class7: {
    title: 'Class 7 Maths — CalcAura',
    description:
      'Class 7 mathematics: chapters, worked examples, formulas and practice in the same workspace as the calculators.',
    path: '/curriculum/class-7',
  },
  class8: {
    title: 'Class 8 Maths — CalcAura',
    description:
      'Class 8 mathematics: chapters, worked examples, formulas and practice in the same workspace as the calculators.',
    path: '/curriculum/class-8',
  },
  class9: {
    title: 'Class 9 Maths — CalcAura',
    description:
      'Class 9 mathematics: chapters, worked examples, formulas and practice in the same workspace as the calculators.',
    path: '/curriculum/class-9',
  },
  class10: {
    title: 'Class 10 Maths — CalcAura',
    description:
      'Class 10 mathematics: chapters, worked examples, formulas and board-exam practice in the same workspace as the calculators.',
    path: '/curriculum/class-10',
  },
  class12: {
    title: 'Class 12 Maths — CalcAura',
    description:
      'Class 12 mathematics: chapters, worked examples, formulas and board-exam practice in the same workspace as the calculators.',
    path: '/curriculum/class-12',
  },
  'visual-maths': {
    title: 'Visual Maths — CalcAura',
    description:
      'See how numbers and shapes behave: interactive visual mathematics activities for younger students.',
    path: '/platform/visual-maths',
  },
  'multiplication-tables': {
    title: 'Multiplication Tables — CalcAura',
    description:
      'Practise multiplication tables with quick, low-pressure rounds that build recall.',
    path: '/playground/multiplication-tables',
  },
  playground: {
    title: 'Playground — CalcAura',
    description:
      'A playful corner of CalcAura: visual maths activities and multiplication-table practice.',
    path: '/playground',
  },
  curriculum: {
    title: 'Curriculum — CalcAura',
    description:
      'Mathematics from Class 1 to Class 12, engineering and graduation: chapters, worked examples, formulas and zero-leak practice.',
    path: '/curriculum',
  },
  whiteboard: {
    title: 'Whiteboard — CalcAura',
    description:
      'An endless whiteboard with grid, snap, pen, line and typeset maths for drawing constructions and writing proofs.',
    path: '/whiteboard',
  },
  about: {
    title: 'About — CalcAura',
    description:
      'Why CalcAura exists: one continuous mathematics desk for school, engineering and higher study.',
    path: '/about',
  },
  'basic-calculator': {
    title: 'Basic Calculator — CalcAura',
    description:
      'A free browser calculator for arithmetic, percentages and everyday sums, with a visible expression line.',
    path: '/calculator/basic',
  },
  history: {
    title: 'History — CalcAura',
    description: 'Saved notebooks and practice attempts, kept in one place.',
    path: '/history',
  },
  'sign-in': {
    title: 'Sign in — CalcAura',
    description: 'Sign in to keep notebooks, practice attempts and results across devices.',
    path: '/sign-in',
  },
  'sign-up': {
    title: 'Create an account — CalcAura',
    description: 'Create a free CalcAura account to save whiteboards and practice history.',
    path: '/sign-up',
  },
};

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Keeps the document head in step with the tab the visitor is on. The landing
 * page is the only canonical entry point; every other route gets its own title
 * and description so shared links read correctly.
 */
export const Seo: React.FC<SeoProps> = ({ activeTab }) => {
  useEffect(() => {
    const pathname = window.location.pathname || '/';
    // Some routes share a tab (Classes 6–9, Class 10, Class 12), so trust an
    // exact path over the tab when the URL names the page directly.
    const byPath = Object.values(PAGES).find((entry) => entry.path === pathname);
    const page = byPath || PAGES[activeTab] || PAGES.home;
    const origin = window.location.origin;
    const canonical = `${origin}${byPath ? pathname : page.path}`;

    document.title = page.title;
    setMeta('meta[name="description"]', 'name', 'description', page.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [activeTab]);

  return null;
};
