import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { CountingActivity } from './CountingActivity.tsx';
import { PictureAdditionActivity } from './PictureAdditionActivity.tsx';
import { PictureSubtractionActivity } from './PictureSubtractionActivity.tsx';
import { PictureMultiplicationActivity } from './PictureMultiplicationActivity.tsx';
import { PictureDivisionActivity } from './PictureDivisionActivity.tsx';
import { VisualFractionsActivity } from './VisualFractionsActivity.tsx';
import { ShapeDiscoveryActivity } from './ShapeDiscoveryActivity.tsx';
import { EverydayMathActivity } from './EverydayMathActivity.tsx';
import { Aurora, GlassPanel, Reveal, Tilt3D } from '../ui/Depth.tsx';
import '../../styles/visual-math.css';

export type VisualActivityId =
  | 'counting'
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'
  | 'fractions'
  | 'shapes'
  | 'everyday';

interface ActivityMeta {
  id: VisualActivityId;
  title: string;
  subtitle: string;
  classes: number[];
  category: 'numbers' | 'arithmetic' | 'fractions' | 'geometry' | 'applied';
  badge: string;
  iconBg: string;
  iconColor: string;
  description: string;
  icon: string;
}

const ACTIVITIES: ActivityMeta[] = [
  {
    id: 'counting',
    title: 'Count the Objects',
    subtitle: 'Tap to count, compare quantities',
    classes: [1, 2],
    category: 'numbers',
    badge: 'Class 1–2',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    description: 'Tap apples, teddy bears, and stars to build number sense up to 20 with audio feedback and comparison mode.',
    icon: '🍎'
  },
  {
    id: 'addition',
    title: 'Addition with Pictures',
    subtitle: 'Combine collections visually',
    classes: [1, 2, 3],
    category: 'arithmetic',
    badge: 'Class 1–3',
    iconBg: 'bg-blue-100 dark:bg-blue-950/60',
    iconColor: 'text-blue-600 dark:text-blue-400',
    description: 'Merge 3 bananas and 2 apples into one basket, discovering how equations correspond exactly to physical objects.',
    icon: '➕'
  },
  {
    id: 'subtraction',
    title: 'Subtraction with Pictures',
    subtitle: 'Take away objects & count leftovers',
    classes: [1, 2, 3],
    category: 'arithmetic',
    badge: 'Class 1–3',
    iconBg: 'bg-rose-100 dark:bg-rose-950/60',
    iconColor: 'text-rose-600 dark:text-rose-400',
    description: 'Remove cookies or toy cars into a separate tray to visually see remainder subtraction like 8 − 3 = 5.',
    icon: '➖'
  },
  {
    id: 'multiplication',
    title: 'Multiplication with Groups',
    subtitle: 'Equal baskets, arrays & repeated addition',
    classes: [2, 3, 4],
    category: 'arithmetic',
    badge: 'Class 2–4',
    iconBg: 'bg-purple-100 dark:bg-purple-950/60',
    iconColor: 'text-purple-600 dark:text-purple-400',
    description: 'Build 3 baskets of 4 apples each or dynamic dot arrays to visualize rows × columns = total items.',
    icon: '✖️'
  },
  {
    id: 'division',
    title: 'Division with Sharing',
    subtitle: 'Equal sharing among friends with remainders',
    classes: [2, 3, 4, 5],
    category: 'arithmetic',
    badge: 'Class 2–5',
    iconBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    description: 'Distribute 12 strawberries equally among 3 children or baskets, handling leftovers and fair distribution.',
    icon: '➗'
  },
  {
    id: 'fractions',
    title: 'Visual Fractions Lab',
    subtitle: 'Pizza slices, chocolate bars & equivalent bars',
    classes: [3, 4, 5],
    category: 'fractions',
    badge: 'Class 3–5',
    iconBg: 'bg-amber-100 dark:bg-amber-950/60',
    iconColor: 'text-amber-600 dark:text-amber-400',
    description: 'Slice interactive pizzas and chocolate breakables into equal portions (halves, quarters, eighths) and test equivalent fractions.',
    icon: '🍕'
  },
  {
    id: 'shapes',
    title: 'Shape Discovery & 3D Solids',
    subtitle: 'Polygons, symmetry, polyhedra & Euler formula',
    classes: [1, 2, 3, 4, 5],
    category: 'geometry',
    badge: 'Class 1–5',
    iconBg: 'bg-teal-100 dark:bg-teal-950/60',
    iconColor: 'text-teal-600 dark:text-teal-400',
    description: 'Inspect 2D shapes with fold lines of symmetry, rotate 3D solids (cubes, cylinders, cones), and play Shape Detective.',
    icon: '🔷'
  },
  {
    id: 'everyday',
    title: 'Everyday Mathematics',
    subtitle: 'Ruler measuring, clock time, ₹ Indian Rupee market',
    classes: [1, 2, 3, 4, 5],
    category: 'applied',
    badge: 'Class 1–5',
    iconBg: 'bg-orange-100 dark:bg-orange-950/60',
    iconColor: 'text-orange-600 dark:text-orange-400',
    description: 'Measure items with a 15-cm ruler, set clock hands, shop at the Indian Rupee ₹ bazaar with real change, and solve word problems.',
    icon: '🪙'
  }
];

const CATEGORY_LABELS: Record<ActivityMeta['category'], string> = {
  numbers: 'Counting',
  arithmetic: 'Arithmetic',
  fractions: 'Fractions',
  geometry: 'Geometry',
  applied: 'Everyday maths'
};

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All topics' },
  { id: 'numbers', label: 'Counting' },
  { id: 'arithmetic', label: 'Arithmetic' },
  { id: 'fractions', label: 'Fractions' },
  { id: 'geometry', label: 'Shapes' },
  { id: 'applied', label: 'Everyday' }
];

const AppleDots: React.FC<{ count: number }> = ({ count }) => (
  <span className="vm-apple-row">
    {Array.from({ length: count }, (_, index) => (
      <span key={index} className="vm-apple-dot" />
    ))}
  </span>
);

interface VisualMathWorldProps {
  initialActivity?: VisualActivityId;
  initialClass?: number;
  onNavigateTables?: () => void;
  onNavigatePlayground?: () => void;
}

export const VisualMathWorld: React.FC<VisualMathWorldProps> = ({
  initialActivity,
  initialClass,
  onNavigateTables,
  onNavigatePlayground
}) => {
  const [activeActivity, setActiveActivity] = useState<VisualActivityId | null>(initialActivity || null);
  const [selectedClass, setSelectedClass] = useState<number | 'all'>(initialClass || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredActivities = ACTIVITIES.filter((act) => {
    const classMatch = selectedClass === 'all' || act.classes.includes(selectedClass as number);
    const catMatch = selectedCategory === 'all' || act.category === selectedCategory;
    return classMatch && catMatch;
  });

  const hasFilters = selectedClass !== 'all' || selectedCategory !== 'all';

  const resetFilters = () => {
    setSelectedClass('all');
    setSelectedCategory('all');
  };

  return (
    <div className="vm-hub max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* If an activity is selected, show activity view with back button */}
      {activeActivity ? (
        <div className="vm-activity-view">
          {/* Responsive activity navigation */}
          <div className="vm-activity-bar">
            <button type="button" onClick={() => setActiveActivity(null)} className="vm-back">
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Back to Visual Math World</span>
            </button>

            {/* Quick switcher among activities */}
            <div className="vm-switcher" role="group" aria-label="Switch visual activity">
              {ACTIVITIES.map((act) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => setActiveActivity(act.id)}
                  title={act.title}
                  aria-label={`Switch to ${act.title}`}
                  aria-pressed={activeActivity === act.id}
                  className="vm-switch"
                >
                  <span aria-hidden="true">{act.icon}</span>
                  <span className="vm-switch__label">{act.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Render Active Activity */}
          <div className="vm-activity-body">
            {activeActivity === 'counting' && <CountingActivity />}
            {activeActivity === 'addition' && <PictureAdditionActivity />}
            {activeActivity === 'subtraction' && <PictureSubtractionActivity />}
            {activeActivity === 'multiplication' && <PictureMultiplicationActivity />}
            {activeActivity === 'division' && <PictureDivisionActivity />}
            {activeActivity === 'fractions' && <VisualFractionsActivity />}
            {activeActivity === 'shapes' && <ShapeDiscoveryActivity />}
            {activeActivity === 'everyday' && <EverydayMathActivity />}
          </div>
        </div>
      ) : (
        /* Master Hub View */
        <div className="vm-hub__view">
          {/* Editorial hero */}
          <Reveal>
            <section className="vm-hero" aria-labelledby="vm-hero-title">
              <Aurora />
              <div className="vm-hero__grid math-grid" aria-hidden="true" />

              <div className="vm-hero__inner">
                <div className="vm-hero__copy">
                  <p className="vm-kicker">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    Picture-based mathematics · Class 1–5
                  </p>

                  <h1 id="vm-hero-title" className="vm-hero__title">
                    <span className="vm-hero__title-line">Visual Math</span>
                    <span className="vm-hero__title-line vm-hero__title-line--last">
                      World<span className="vm-hero__dot">.</span>
                    </span>
                  </h1>

                  <p className="vm-hero__lead">
                    Count apples, split fractions, tilt solids. Every illustration in this room
                    becomes an equation you can read.
                  </p>

                  <div className="vm-hero__actions">
                    <a className="vm-btn" href="#vm-activities">
                      Browse activities
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                    {onNavigateTables && (
                      <button type="button" onClick={onNavigateTables} className="vm-quiet-btn">
                        Tables 1–30
                      </button>
                    )}
                    {onNavigatePlayground && (
                      <button type="button" onClick={onNavigatePlayground} className="vm-quiet-btn">
                        Math playground
                      </button>
                    )}
                  </div>

                  <p className="vm-hero__meta">
                    <span>{ACTIVITIES.length} hands-on activities</span>
                    <span>Picture → number</span>
                    <span>Class 1–5</span>
                  </p>
                </div>

                <div className="vm-hero__art">
                  <Tilt3D className="vm-hero__stage" strength={6}>
                    <span className="vm-stage__ring" aria-hidden="true" />
                    <span className="vm-stage__index" aria-hidden="true">
                      Fig. 01 / counting, fractions, solids
                    </span>

                    <div className="vm-stage__scene" aria-hidden="true">
                      <span className="vm-stage__caption vm-stage__caption--sum">3 + 2 = 5</span>
                      <span className="vm-stage__caption vm-stage__caption--half">1/2</span>
                      <span className="vm-stage__caption vm-stage__caption--area">4 × 3 = 12</span>

                      <div className="vm-stage__obj vm-stage__obj--apple">
                        <span className="vm-apple">
                          <span className="vm-apple__leaf" />
                          <span className="vm-apple__stem" />
                          <span className="vm-apple__highlight" />
                        </span>
                        <span className="vm-stage__tag">apple</span>
                      </div>

                      <div className="vm-stage__obj vm-stage__obj--cube">
                        <span className="vm-cube">
                          <span className="vm-cube__face vm-cube__face--front" />
                          <span className="vm-cube__face vm-cube__face--side" />
                          <span className="vm-cube__face vm-cube__face--top" />
                        </span>
                        <span className="vm-stage__tag">solid</span>
                      </div>

                      <div className="vm-stage__obj vm-stage__obj--fraction">
                        <span className="vm-fraction-bar">
                          {[0, 1, 2, 3].map((part) => (
                            <span key={part} className={part < 2 ? 'is-filled' : ''} />
                          ))}
                        </span>
                        <span className="vm-stage__tag">fraction bar</span>
                      </div>
                    </div>

                    <span className="vm-stage__foot" aria-hidden="true">
                      picture → number
                    </span>
                  </Tilt3D>
                </div>
              </div>
            </section>
          </Reveal>

          {/* Filters + activity shelf */}
          <div id="vm-activities" className="vm-shelf">
            <Reveal delay={70}>
              <GlassPanel as="section" className="vm-filters">
                <h2 className="sr-only">Filter visual math activities</h2>
                <div className="vm-filters__head">
                  <p className="vm-kicker">
                    <Filter className="w-3.5 h-3.5" aria-hidden="true" />
                    Filter the shelf
                  </p>
                  <p className="vm-filters__count" aria-live="polite">
                    {filteredActivities.length} of {ACTIVITIES.length} activities
                  </p>
                </div>

                <div className="vm-filters__row">
                  <span className="vm-filters__label" id="vm-class-label">Class</span>
                  <div className="vm-pills" role="group" aria-labelledby="vm-class-label">
                    <button
                      type="button"
                      onClick={() => setSelectedClass('all')}
                      aria-pressed={selectedClass === 'all'}
                      className="vm-pill"
                    >
                      All classes
                    </button>
                    {[1, 2, 3, 4, 5].map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setSelectedClass(cls)}
                        aria-pressed={selectedClass === cls}
                        className="vm-pill"
                      >
                        Class {cls}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="vm-filters__row">
                  <span className="vm-filters__label" id="vm-topic-label">Topic</span>
                  <div className="vm-pills vm-pills--topic" role="group" aria-labelledby="vm-topic-label">
                    {CATEGORY_FILTERS.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        aria-pressed={selectedCategory === cat.id}
                        className="vm-pill"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="vm-filters__foot">
                  <span>
                    {selectedClass === 'all' ? 'Every class' : `Class ${selectedClass}`}
                    {' · '}
                    {selectedCategory === 'all'
                      ? 'every topic'
                      : CATEGORY_LABELS[selectedCategory as ActivityMeta['category']] ?? selectedCategory}
                  </span>
                  {hasFilters && (
                    <button type="button" onClick={resetFilters} className="vm-reset">
                      Reset filters
                    </button>
                  )}
                </div>
              </GlassPanel>
            </Reveal>

            <Reveal delay={110}>
              <div className="vm-grid-head">
                <div>
                  <p className="vm-kicker">The shelf</p>
                  <h2 className="vm-section-title">Pick a picture. Read the maths.</h2>
                </div>
                <p className="vm-grid-head__note">
                  Each activity is an interactive model, not a worksheet. Open one and change it.
                </p>
              </div>
            </Reveal>

            <div className="vm-grid">
              {filteredActivities.map((act, index) => (
                <Reveal key={act.id} className="vm-grid__cell" delay={Math.min(index * 60, 360)}>
                  <Tilt3D as="article" className="vm-card glass-surface" strength={6}>
                    <button
                      type="button"
                      onClick={() => setActiveActivity(act.id)}
                      className="vm-card__button"
                      aria-label={`Open ${act.title} — ${act.badge}, ${CATEGORY_LABELS[act.category]}`}
                    >
                      <span className="vm-card__top">
                        <span className="vm-card__icon" aria-hidden="true">{act.icon}</span>
                        <span className="vm-card__badge">{act.badge}</span>
                      </span>

                      <span className="vm-card__category">{CATEGORY_LABELS[act.category]}</span>
                      <span className="vm-card__title">{act.title}</span>
                      <span className="vm-card__subtitle">{act.subtitle}</span>
                      <span className="vm-card__desc">{act.description}</span>

                      <span className="vm-card__foot">
                        <span>Open activity</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </button>
                  </Tilt3D>
                </Reveal>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <p className="vm-empty">
                Nothing matches that class and topic yet. <button type="button" onClick={resetFilters}>Clear the filters</button> to see all eight activities.
              </p>
            )}
          </div>

          {/* Visual → equation explainer */}
          <Reveal delay={60}>
            <section className="vm-explain" aria-labelledby="vm-explain-title">
              <div className="vm-section-head">
                <p className="vm-kicker">Visual → equation</p>
                <h2 id="vm-explain-title" className="vm-section-title">
                  The picture is the working.
                </h2>
                <p className="vm-section-sub">
                  A model earns its place when the symbols stop being a rule to memorise and start
                  being a description of what is already on the page.
                </p>
              </div>

              <div className="vm-explain__grid">
                <GlassPanel as="article" className="vm-explain__card">
                  <div className="vm-explain__art" aria-hidden="true">
                    <div className="vm-sum">
                      <AppleDots count={3} />
                      <span className="vm-op">+</span>
                      <AppleDots count={2} />
                      <span className="vm-op">=</span>
                      <span className="vm-sum__total">5</span>
                    </div>
                  </div>
                  <div className="vm-explain__body">
                    <span className="vm-explain__label">Counting · addition</span>
                    <p className="vm-explain__equation">3 + 2 = 5</p>
                    <p className="vm-explain__note">
                      Three apples in one basket, two in the other. Combine the baskets and the
                      total is visible before it is counted.
                    </p>
                  </div>
                </GlassPanel>

                <GlassPanel as="article" className="vm-explain__card">
                  <div className="vm-explain__art" aria-hidden="true">
                    <div className="vm-fraction-explain">
                      <span className="vm-frac-bar">
                        {[0, 1, 2, 3].map((part) => (
                          <span key={part} className={part < 2 ? 'is-filled' : ''} />
                        ))}
                      </span>
                      <span className="vm-frac-eq">2/4 = 1/2</span>
                    </div>
                  </div>
                  <div className="vm-explain__body">
                    <span className="vm-explain__label">Fractions · equivalence</span>
                    <p className="vm-explain__equation">1/2</p>
                    <p className="vm-explain__note">
                      Two of four equal parts shaded is the same region as one of two. The bar
                      shows why the fractions are equivalent.
                    </p>
                  </div>
                </GlassPanel>

                <GlassPanel as="article" className="vm-explain__card">
                  <div className="vm-explain__art" aria-hidden="true">
                    <div className="vm-area-explain">
                      <span className="vm-area-dim">4</span>
                      <div className="vm-area-grid">
                        {Array.from({ length: 12 }, (_, cell) => (
                          <span key={cell} />
                        ))}
                      </div>
                      <span className="vm-area-dim vm-area-dim--height">3</span>
                    </div>
                  </div>
                  <div className="vm-explain__body">
                    <span className="vm-explain__label">Geometry · area</span>
                    <p className="vm-explain__equation">4 × 3 = 12</p>
                    <p className="vm-explain__note">
                      Four squares across, three rows down. Multiply the sides and the twelve
                      squares are already on the grid.
                    </p>
                  </div>
                </GlassPanel>
              </div>
            </section>
          </Reveal>
        </div>
      )}
    </div>
  );
};
