import React, { useState } from 'react';
import {
  Sparkles,
  Calculator,
  PieChart,
  Shapes,
  ShoppingBag,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Filter,
  Layers,
  Award
} from 'lucide-react';
import { CountingActivity } from './CountingActivity.tsx';
import { PictureAdditionActivity } from './PictureAdditionActivity.tsx';
import { PictureSubtractionActivity } from './PictureSubtractionActivity.tsx';
import { PictureMultiplicationActivity } from './PictureMultiplicationActivity.tsx';
import { PictureDivisionActivity } from './PictureDivisionActivity.tsx';
import { VisualFractionsActivity } from './VisualFractionsActivity.tsx';
import { ShapeDiscoveryActivity } from './ShapeDiscoveryActivity.tsx';
import { EverydayMathActivity } from './EverydayMathActivity.tsx';

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* If an activity is selected, show activity view with back button */}
      {activeActivity ? (
        <div className="space-y-6">
          {/* Responsive activity navigation */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setActiveActivity(null)}
              className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Back to Visual Math World</span>
            </button>

            {/* Quick switcher among activities */}
            <div className="flex w-full min-w-0 items-center gap-2 overflow-x-auto pb-1 sm:flex-1 sm:justify-end">
              {ACTIVITIES.map((act) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => setActiveActivity(act.id)}
                  title={act.title}
                  aria-pressed={activeActivity === act.id}
                  className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    activeActivity === act.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60'
                  }`}
                >
                  <span aria-hidden="true">{act.icon}</span>
                  <span className="hidden md:inline">{act.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Render Active Activity */}
          {activeActivity === 'counting' && <CountingActivity />}
          {activeActivity === 'addition' && <PictureAdditionActivity />}
          {activeActivity === 'subtraction' && <PictureSubtractionActivity />}
          {activeActivity === 'multiplication' && <PictureMultiplicationActivity />}
          {activeActivity === 'division' && <PictureDivisionActivity />}
          {activeActivity === 'fractions' && <VisualFractionsActivity />}
          {activeActivity === 'shapes' && <ShapeDiscoveryActivity />}
          {activeActivity === 'everyday' && <EverydayMathActivity />}
        </div>
      ) : (
        /* Master Hub View */
        <div className="space-y-8">
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-sky-900 text-white p-8 sm:p-10 shadow-2xl border border-indigo-700/50">
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Image-Based Mathematics Learning
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Visual Math World
              </h1>
              <p className="text-base sm:text-lg text-blue-100 font-medium leading-relaxed">
                Learn mathematics through original illustrations of fruits, animals, familiar toys, delicious food,
                and everyday objects. Every visual picture connects directly to true mathematical equations.
              </p>
              {/* Fast links */}
              <div className="pt-2 flex flex-wrap gap-3">
                {onNavigateTables && (
                  <button
                    onClick={onNavigateTables}
                    className="px-4 py-2 rounded-xl bg-white text-blue-900 font-bold text-xs uppercase tracking-wider hover:bg-blue-50 transition-all shadow-md"
                  >
                    Multiplication Tables (1–30) →
                  </button>
                )}
                {onNavigatePlayground && (
                  <button
                    onClick={onNavigatePlayground}
                    className="px-4 py-2 rounded-xl bg-blue-600/60 border border-blue-400/40 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition-all"
                  >
                    Open Math Playground 🧪
                  </button>
                )}
              </div>
            </div>
            {/* Decorative background visual elements */}
            <div className="absolute right-6 -bottom-6 opacity-20 pointer-events-none text-9xl select-none hidden md:block">
              🍎🍕📐
            </div>
          </div>

          {/* Filtering controls */}
          <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            {/* Class Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5" /> Class:
              </span>
              <button
                onClick={() => setSelectedClass('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedClass === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                All Classes (1–5)
              </button>
              {[1, 2, 3, 4, 5].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedClass === cls
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto">
              {[
                { id: 'all', label: 'All Topics' },
                { id: 'numbers', label: 'Counting' },
                { id: 'arithmetic', label: 'Arithmetic' },
                { id: 'fractions', label: 'Fractions' },
                { id: 'geometry', label: 'Shapes' },
                { id: 'applied', label: 'Everyday' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                onClick={() => setActiveActivity(act.id)}
                className="group cursor-pointer bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all transform hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {act.icon}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {act.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                      {act.subtitle}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                      {act.description}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>Start Activity</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
