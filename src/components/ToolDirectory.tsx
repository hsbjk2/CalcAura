import React, { useState } from 'react';
import {
  Compass,
  AreaChart,
  Shapes,
  Atom,
  BarChart2,
  Grid,
  Ruler,
  GraduationCap,
  MapPin,
  ArrowRight,
  Search,
  X,
} from 'lucide-react';
import { GlassPanel, Reveal, Tilt3D } from './ui/Depth.tsx';
import '../styles/tool-directory.css';

interface ToolDirectoryProps {
  onSelectTab: (tabId: string) => void;
}

interface DirectoryTool {
  name: string;
  note: string;
}

interface ToolCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ElementType;
  tabId: string;
  tools: DirectoryTool[];
  featured?: boolean;
}

const CATEGORIES: ToolCategory[] = [
  {
    id: 'algebra',
    name: 'Algebra & Equation Systems',
    shortName: 'Algebra',
    description:
      'Quadratic equation solver with discriminant classification, 2×2 Cramer’s linear systems, and verified substitution proofs.',
    icon: Compass,
    tabId: 'solver',
    tools: [
      { name: 'Quadratic Formula', note: 'Roots, discriminant, and the nature of each solution.' },
      { name: 'Linear Systems (2×2)', note: 'Cramer’s rule with a substitution check.' },
      { name: 'Discriminant Ledger', note: 'b² − 4ac, recorded sign by sign.' },
      { name: 'Substitution Verifier', note: 'Plug the roots back into the original equation.' },
    ],
  },
  {
    id: 'graphing',
    name: 'Coordinate Graphing & Calculus',
    shortName: 'Graphing & calculus',
    description:
      'Multi-function Cartesian plane with real-time tangent slope interrogation, derivative curve, and shaded definite integrals.',
    icon: AreaChart,
    tabId: 'graphing',
    featured: true,
    tools: [
      { name: 'Function Plotter', note: 'Several expressions on one Cartesian plane.' },
      { name: 'Tangent Line Tracer', note: 'Slope and tangent at a movable point.' },
      { name: 'Definite Integral Area', note: 'Shade and evaluate the area under the curve.' },
      { name: 'Discrete Value Table', note: 'Sample the function at fixed intervals.' },
    ],
  },
  {
    id: 'geometry',
    name: 'Euclidean Geometry & Mensuration',
    shortName: 'Geometry',
    description:
      'Parameter-driven vector diagrams computing perimeter, inradius, circumradius, surface areas, and 3D solid volumes.',
    icon: Shapes,
    tabId: 'geometry',
    featured: true,
    tools: [
      { name: 'Heron’s Triangle', note: 'Area from three sides, no height needed.' },
      { name: 'Circle & Sector', note: 'Arc length, sector area, and radians.' },
      { name: 'Cylinder & Cone (3D)', note: 'Surface area and volume from radius and height.' },
      { name: 'Sphere & Solid Mensuration', note: 'Volume and surface for round solids.' },
    ],
  },
  {
    id: 'physics',
    name: 'Physics & STEM Dynamics',
    shortName: 'Physics & STEM',
    description:
      'Kinematic projectile trajectories with Earth/Moon/Mars gravity parameters, harmonic oscillators, and electrical circuit laws.',
    icon: Atom,
    tabId: 'physics',
    featured: true,
    tools: [
      { name: 'Ballistic Trajectory', note: 'Projectile path under adjustable gravity.' },
      { name: 'Harmonic Pendulum', note: 'Period and restoring force for small swings.' },
      { name: "Ohm's Law Circuit", note: 'Voltage, current, and resistance together.' },
      { name: 'Multi-Gravity Environment', note: 'Compare Earth, Moon, and Mars in one run.' },
    ],
  },
  {
    id: 'statistics',
    name: 'Statistical Distribution & Inference',
    shortName: 'Statistics',
    description:
      'Full descriptive dataset metrics, sample variance, standard deviation, and interactive Gaussian normal distribution curves.',
    icon: BarChart2,
    tabId: 'stem',
    tools: [
      { name: 'Mean, Median, Mode', note: 'The centre of a dataset, three ways.' },
      { name: 'Variance & Std Dev', note: 'Sample spread with worked steps.' },
      { name: 'Gaussian PDF Curve', note: 'Normal density over a chosen mean and sigma.' },
      { name: 'Quartile Spread (IQR)', note: 'Q1, Q3, and the interquartile range.' },
    ],
  },
  {
    id: 'matrices',
    name: 'Matrix Algebra & Linear Systems',
    shortName: 'Matrices',
    description:
      'Determinants for 2×2 and 3×3 matrices, formal matrix inversion A^-1, matrix products, and characteristic eigenvalues.',
    icon: Grid,
    tabId: 'stem',
    tools: [
      { name: 'Determinants (det A)', note: '2×2 and 3×3 expansion, step by step.' },
      { name: 'Matrix Inverse (A^-1)', note: 'Adjugate method with a determinant check.' },
      { name: 'Matrix Multiplication', note: 'Row-by-column products with dimension checks.' },
      { name: 'Eigenvalues (λ)', note: 'Characteristic polynomial and its roots.' },
    ],
  },
  {
    id: 'land',
    name: 'Land & Construction Mensuration',
    shortName: 'Land & construction',
    description:
      'Boundary dimension calculation and land-unit conversions across Square Feet, Gaj, Acres, Hectares, Guntha, and Bigha.',
    icon: MapPin,
    tabId: 'stem',
    tools: [
      { name: 'Square Feet & Gaj', note: 'Plot area and the common land conversion.' },
      { name: 'Acres & Hectares', note: 'Large land parcels in metric and imperial.' },
      { name: 'Bigha & Guntha', note: 'Regional units normalised to square feet.' },
      { name: 'Perimeter Calculations', note: 'Fence length from the boundary dimensions.' },
    ],
  },
  {
    id: 'conversions',
    name: 'Scientific Unit Systems',
    shortName: 'Unit systems',
    description:
      'Exact conversion factors across Length, Surface Area, Mass, Temperature, and Angular Velocity.',
    icon: Ruler,
    tabId: 'stem',
    tools: [
      { name: 'Metric / Imperial Length', note: 'Millimetres to miles, with exact factors.' },
      { name: 'Surface Area Units', note: 'Square metres, feet, and acres.' },
      { name: 'Celsius / Kelvin', note: 'Temperature scales, including Fahrenheit.' },
      { name: 'Kinematic Velocity', note: 'm/s, km/h, and mph in one pass.' },
    ],
  },
  {
    id: 'student',
    name: 'Academic Ledger & Attendance',
    shortName: 'Academic ledger',
    description:
      'Weighted credit-hour GPA/CGPA conversions and institutional attendance threshold calculation.',
    icon: GraduationCap,
    tabId: 'stem',
    tools: [
      { name: 'Weighted CGPA Ledger', note: 'Credit-weighted grade point average.' },
      { name: 'Institutional Minimum %', note: 'The attendance floor your college sets.' },
      { name: 'Absence Shortage Deficit', note: 'How many classes are still owed.' },
      { name: 'Safe-to-Skip Buffer', note: 'Remaining leave before the threshold.' },
    ],
  },
];

const FILTERS = [
  { id: 'all', label: 'All modules' },
  { id: 'math', label: 'Mathematics' },
  { id: 'stem', label: 'Physics & STEM' },
  { id: 'student', label: 'Applied & student' },
];

const GROUP_IDS: Record<string, string[]> = {
  math: ['algebra', 'graphing', 'geometry', 'matrices'],
  stem: ['physics', 'statistics', 'conversions'],
  student: ['land', 'student'],
};

const TOTAL_TOOLS = CATEGORIES.reduce((count, category) => count + category.tools.length, 0);

export const ToolDirectory: React.FC<ToolDirectoryProps> = ({ onSelectTab }) => {
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const trimmedQuery = query.trim().toLowerCase();

  const filtered = CATEGORIES.filter((category) => {
    const group = GROUP_IDS[filter];
    const inFilter =
      filter === 'all' ? true : group ? group.includes(category.id) : category.id === filter;
    if (!inFilter) return false;
    if (!trimmedQuery) return true;

    return [category.name, category.description, ...category.tools.flatMap((tool) => [tool.name, tool.note])]
      .join(' ')
      .toLowerCase()
      .includes(trimmedQuery);
  });

  const activeFilterLabel =
    FILTERS.find((item) => item.id === filter)?.label ??
    CATEGORIES.find((category) => category.id === filter)?.name ??
    'All modules';

  const visibleTools = filtered.reduce((count, category) => count + category.tools.length, 0);

  return (
    <section className="dir-section" aria-labelledby="tool-directory-title">
      <Reveal className="dir-head">
        <div className="dir-head__main">
          <span className="dir-kicker">
            <span className="dir-kicker__dot" aria-hidden="true" />
            Computing modules
          </span>
          <h2 className="dir-title" id="tool-directory-title">
            Tool <em>directory</em>
          </h2>
          <p className="dir-lead">
            Browse mathematical disciplines, physical simulations, and academic computing suites.
          </p>
        </div>

        <div className="dir-head__tools">
          <div className="dir-search">
            <Search className="dir-search__icon h-4 w-4" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter modules and tools"
              aria-label="Filter modules and tools"
            />
            {query ? (
              <button
                type="button"
                className="dir-search__clear"
                aria-label="Clear filter"
                onClick={() => setQuery('')}
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <p className="dir-head__stat" aria-live="polite">
            <span>{String(CATEGORIES.length).padStart(2, '0')}</span> modules
            <span className="dir-head__stat-sep" aria-hidden="true">/</span>
            <span>{String(TOTAL_TOOLS).padStart(2, '0')}</span> tools
          </p>
        </div>
      </Reveal>

      <Reveal className="dir-controls" delay={70}>
        <div className="dir-pills" role="group" aria-label="Filter by field">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="dir-pill"
              data-active={filter === item.id}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="dir-controls__hint">Search or pick a discipline</span>
      </Reveal>

      <div className="dir-body">
        <Reveal className="dir-rail" delay={90}>
          <nav aria-label="Tool categories">
            <div className="dir-rail__head">
              <span>Disciplines</span>
              <span>{String(CATEGORIES.length).padStart(2, '0')}</span>
            </div>
            <ul className="dir-rail__list">
              <li>
                <button
                  type="button"
                  data-active={filter === 'all'}
                  aria-pressed={filter === 'all'}
                  onClick={() => setFilter('all')}
                >
                  <span className="dir-rail__num">00</span>
                  <span className="dir-rail__name">All modules</span>
                  <span className="dir-rail__count">{String(CATEGORIES.length).padStart(2, '0')}</span>
                </button>
              </li>
              {CATEGORIES.map((category, index) => (
                <li key={category.id}>
                  <button
                    type="button"
                    data-active={filter === category.id}
                    aria-pressed={filter === category.id}
                    onClick={() => setFilter(filter === category.id ? 'all' : category.id)}
                  >
                    <span className="dir-rail__num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="dir-rail__name">{category.shortName}</span>
                    <span className="dir-rail__count">
                      {String(category.tools.length).padStart(2, '0')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <div className="dir-results">
          <div className="dir-results__bar">
            <span className="dir-results__label">
              Index / <b>{activeFilterLabel}</b>
              {trimmedQuery ? <span className="dir-results__query"> “{query.trim()}”</span> : null}
            </span>
            <span className="dir-results__count" aria-live="polite">
              {String(filtered.length).padStart(2, '0')} of {String(CATEGORIES.length).padStart(2, '0')} ·{' '}
              {String(visibleTools).padStart(2, '0')} tools
            </span>
          </div>

          {filtered.length ? (
            <div className="dir-grid">
              {filtered.map((category, index) => {
                const Icon = category.icon;
                const categoryNumber = String(CATEGORIES.indexOf(category) + 1).padStart(2, '0');

                const card = (
                  <>
                    <div className="dir-card__inner">
                      <div className="dir-card__top">
                        <span className="dir-card__index">{categoryNumber}</span>
                        <span className="dir-card__icon" aria-hidden="true">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="dir-card__count">
                          {String(category.tools.length).padStart(2, '0')} tools
                        </span>
                      </div>

                      <h3 className="dir-card__title">{category.name}</h3>
                      <p className="dir-card__desc">{category.description}</p>

                      <ul className="dir-tools">
                        {category.tools.map((tool) => (
                          <li className="dir-tools__item" key={tool.name}>
                            <span className="dir-tools__dot" aria-hidden="true" />
                            <span>
                              <span className="dir-tools__name">{tool.name}</span>
                              <span className="dir-tools__note">{tool.note}</span>
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="dir-card__foot">
                        <span>Launch workspace</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="dir-card__hit"
                      aria-label={`Launch ${category.name} workspace`}
                      onClick={() => onSelectTab(category.tabId)}
                    />
                  </>
                );

                return (
                  <Reveal
                    key={category.id}
                    className="dir-cell"
                    delay={(index % 3) * 70}
                    as="div"
                  >
                    {category.featured ? (
                      <Tilt3D
                        as="article"
                        className="dir-card glass-surface dir-card--featured"
                        strength={5}
                      >
                        {card}
                      </Tilt3D>
                    ) : (
                      <GlassPanel as="article" className="dir-card dir-card--lift">
                        {card}
                      </GlassPanel>
                    )}
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="dir-empty">
              <p className="dir-empty__title">No modules match “{query.trim()}”.</p>
              <p className="dir-empty__copy">
                Try a broader term such as graphing, geometry, matrices or attendance.
              </p>
              <button
                type="button"
                className="dir-empty__reset"
                onClick={() => {
                  setQuery('');
                  setFilter('all');
                }}
              >
                Reset the index
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
