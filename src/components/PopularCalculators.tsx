import React from 'react';
import {
  Calculator,
  Compass,
  Shapes,
  AreaChart,
  TrendingUp,
  Grid,
  BarChart2,
  Ruler,
  ArrowUpRight,
} from 'lucide-react';
import { GlassPanel, Reveal, Tilt3D } from './ui/Depth.tsx';
import '../styles/tool-directory.css';

interface PopularCalculatorsProps {
  onSelectTab: (tabId: string) => void;
}

interface PopularTool {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  tabId: string;
  badge: string;
  featured?: boolean;
}

const TOOLS: PopularTool[] = [
  {
    id: 'basic-calculator',
    name: 'Basic Calculator',
    subtitle: 'Everyday calculations, arithmetic, percentages and quick numerical operations.',
    icon: Calculator,
    tabId: 'basic-calculator',
    badge: 'Basic Arithmetic',
    featured: true,
  },
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    subtitle: 'Standard, scientific & transcendental operations with memory registers',
    icon: Calculator,
    tabId: 'stem',
    badge: 'Standard & Sci',
  },
  {
    id: 'solver',
    name: 'Equation Solver',
    subtitle: 'Polynomial roots, linear 2×2 systems & discriminant verification',
    icon: Compass,
    tabId: 'solver',
    badge: 'Algebra Proofs',
    featured: true,
  },
  {
    id: 'geometry',
    name: 'Area and Geometry',
    subtitle: 'Heron’s formula, circle sectors, triangles & 3D solid mensuration',
    icon: Shapes,
    tabId: 'geometry',
    badge: 'Vector SVG',
  },
  {
    id: 'graphing',
    name: 'Graphing Calculator',
    subtitle: 'Multi-function Cartesian plotter, movable probe & value tables',
    icon: AreaChart,
    tabId: 'graphing',
    badge: 'Cartesian Engine',
    featured: true,
  },
  {
    id: 'calculus',
    name: 'Calculus & Derivatives',
    subtitle: 'Real-time tangent lines, slopes, derivative curves & Riemann sums',
    icon: TrendingUp,
    tabId: 'graphing',
    badge: 'Analytic Slopes',
  },
  {
    id: 'matrices',
    name: 'Matrices and Vectors',
    subtitle: 'Matrix determinants (det A), inversion A^-1, and characteristic eigenvalues (λ)',
    icon: Grid,
    tabId: 'stem',
    badge: 'Linear Algebra',
  },
  {
    id: 'statistics',
    name: 'Statistics & Probability',
    subtitle: 'Mean, sample variance, standard deviation & Gaussian normal distribution',
    icon: BarChart2,
    tabId: 'stem',
    badge: 'Data Inference',
  },
  {
    id: 'conversions',
    name: 'Unit Converter',
    subtitle: 'Precise scientific conversion across length, area, mass, and velocity',
    icon: Ruler,
    tabId: 'stem',
    badge: 'SI / Imperial',
  },
];

export const PopularCalculators: React.FC<PopularCalculatorsProps> = ({ onSelectTab }) => {
  return (
    <section id="popular-calculators" className="pop-section scroll-mt-32">
      <div className="pop-section__inner">
        <Reveal className="pop-head">
          <div className="pop-head__main">
            <span className="pop-kicker">
              <span className="pop-kicker__dot" aria-hidden="true" />
              Core instruments
            </span>
            <h2 className="pop-title">
              Popular <em>calculators</em>
            </h2>
            <p className="pop-lead">
              Direct access to CalcAura&rsquo;s most-used mathematical instruments — arithmetic,
              graphing, geometry and proof.
            </p>
          </div>

          <div className="pop-meta" aria-label={`${TOOLS.length} core modules available`}>
            <span className="pop-meta__label">Index</span>
            <span className="pop-meta__count">{String(TOOLS.length).padStart(2, '0')}</span>
            <span className="pop-meta__sub">
              core modules
              <br />
              available now
            </span>
          </div>
        </Reveal>

        <div className="pop-grid">
          {TOOLS.map((tool, index) => {
            const Icon = tool.icon;
            const card = (
              <>
                <div className="pop-card__inner">
                  <div className="pop-card__top">
                    <span className="pop-card__index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="pop-card__icon" aria-hidden="true">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="pop-card__badge">{tool.badge}</span>
                  </div>

                  <h3 className="pop-card__name">{tool.name}</h3>
                  <p className="pop-card__desc">{tool.subtitle}</p>

                  <div className="pop-card__foot">
                    <span>Launch tool</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>

                <button
                  type="button"
                  className="pop-card__hit"
                  aria-label={`Launch ${tool.name}`}
                  onClick={() => onSelectTab(tool.tabId)}
                />
              </>
            );

            return (
              <Reveal
                key={tool.id}
                className="pop-cell"
                delay={(index % 4) * 60}
                as="div"
              >
                {tool.featured ? (
                  <Tilt3D
                    as="article"
                    className="pop-card glass-surface pop-card--featured"
                    strength={6}
                  >
                    {card}
                  </Tilt3D>
                ) : (
                  <GlassPanel as="article" className="pop-card pop-card--lift">
                    {card}
                  </GlassPanel>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
