import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Download,
  Grid3X3,
  Layers,
  Lightbulb,
  PenTool,
  Type,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.tsx';
import { Aurora, GlassPanel, Reveal, Tilt3D } from './ui/Depth.tsx';
import '../styles/about.css';

interface AboutPageProps {
  onExplorePlatform: () => void;
  onNavigateHome?: () => void;
  onOpenWhiteboard?: () => void;
  darkMode?: boolean;
}

const WHITEBOARD_PILLARS = [
  {
    tag: '01 · Freeform STEM Surfaces',
    title: 'Beyond blank paper',
    desc: 'Switch seamlessly between pristine Plain White, dark obsidian chalkboard, college ruled lines, Cartesian graph paper, and bullet dotted matrices for any lesson or proof.',
    Icon: Grid3X3,
  },
  {
    tag: '02 · True Layer Stacking',
    title: 'Structured thinking',
    desc: 'Unlike simple drawing apps, every text block, diagram, shape, and sticker lives on an independent z-index layer with 4-tier stacking controls («, ↑, ↓, ») so explanations sit cleanly above visuals.',
    Icon: Layers,
  },
  {
    tag: '03 · Typography & Geometric Precision',
    title: 'Handwritten feel, publication polish',
    desc: 'Combine pressure-sensitive smooth inking with vector shapes, coordinate lines, and multiline typography across Serif, Sans-Serif, Monospace, and Handwritten typefaces.',
    Icon: Type,
  },
  {
    tag: '04 · Multi-Sheet Notebooks & Export',
    title: 'From lecture to handout',
    desc: 'Manage full multi-sheet projects with live visual thumbnail docks and export directly to 2x High-Resolution PNG, JPEG, SVG vector paths, or multi-page PDF documents.',
    Icon: Download,
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onExplorePlatform,
  onNavigateHome,
  onOpenWhiteboard,
  darkMode = false,
}) => {
  const { t } = useI18n();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const principles = [
    {
      tag: t.aboutCalcTag || '01 · Calculate',
      title: t.aboutCalcTitle || 'Precision in every step',
      desc: t.aboutCalcDesc || 'Perform mathematical and scientific calculations with clear inputs and meaningful results.',
      Icon: Calculator,
      index: '01',
    },
    {
      tag: t.aboutVisTag || '02 · Visualize',
      title: t.aboutVisTitle || 'Intuition through form',
      desc: t.aboutVisDesc || 'Explore functions, shapes, graphs, and mathematical relationships through interactive representations.',
      Icon: Grid3X3,
      index: '02',
    },
    {
      tag: t.aboutUndTag || '03 · Understand',
      title: t.aboutUndTitle || 'Depth behind the formula',
      desc: t.aboutUndDesc || 'Connect the result with its formula, explanation, or visual demonstration where the relevant feature supports it.',
      Icon: Lightbulb,
      index: '03',
    },
  ];

  const audience = [
    {
      title: t.aboutAudSchool || 'School Students',
      desc: t.aboutAudSchoolDesc || 'Foundational mathematics brought alive with intuitive visual representations, everyday arithmetic, and step-by-step guidance.',
    },
    {
      title: t.aboutAudSec || 'Higher-Secondary Students',
      desc: t.aboutAudSecDesc || 'Curriculum-aligned algebra, geometry proofs, trigonometry, quadratic systems, and calculus theorem derivations.',
    },
    {
      title: t.aboutAudEng || 'Engineering & Undergraduate Learners',
      desc: t.aboutAudEngDesc || 'Matrix operations, multivariable derivatives, kinematics, physics modeling, and computational scientific exploration.',
    },
    {
      title: t.aboutAudEdu || 'Educators & Curious Mathematics Learners',
      desc: t.aboutAudEduDesc || 'Interactive demonstration laboratories, printable student exploration sheets, and intuitive multi-dimensional visualizers.',
    },
  ];

  return (
    <div className="about-page" data-dark={darkMode ? 'true' : undefined}>
      {/* =====================================================================
          Hero — paper field, hairline grid, a floating stack of mathematics.
         ===================================================================== */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <Aurora className="about-hero__aurora" />
        <div className="about-hero__grid" aria-hidden="true" />

        <div className="shell about-hero__inner">
          <div className={`about-hero__copy ${mounted ? 'is-in' : ''}`}>
            <div className="about-hero__kicker glass-chip">
              <span className="about-hero__mark" aria-hidden="true">
                CA
              </span>
              <span>{t.aboutTitle || 'About CalcAura'}</span>
              <span className="about-hero__dot" aria-hidden="true" />
              <span className="about-hero__meta">{t.aboutSubtitle || 'Built by HSBJK'}</span>
            </div>

            <h1 id="about-hero-title" className="about-hero__title">
              {t.aboutHeroHeadline || 'Making mathematics clearer, one discovery at a time.'}
            </h1>

            <p className="about-hero__sub">
              {t.aboutHeroSub ||
                'CALCAURA brings calculations, equations, interactive visualizations, and learning together in one workspace—helping students and curious minds explore mathematics with greater clarity.'}
            </p>

            <div className="about-hero__actions">
              <button type="button" className="btn" onClick={onExplorePlatform}>
                <span>{t.aboutExploreCta || 'Explore CALCAURA'}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              {onNavigateHome && (
                <button type="button" className="text-link about-hero__home" onClick={onNavigateHome}>
                  <span>Back to the landing</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <ul className="about-hero__facts" aria-label="The workspace in three moves">
              <li>
                <span>01</span> Calculate
              </li>
              <li>
                <span>02</span> Visualize
              </li>
              <li>
                <span>03</span> Understand
              </li>
            </ul>
          </div>

          <div className={`about-hero__object depth-stage ${mounted ? 'is-in' : ''}`} aria-hidden="true">
            <Tilt3D className="about-object" strength={9}>
              <div className="about-object__stage">
                <span className="about-object__orb" />

                <div className="about-object__plane about-object__plane--grid">
                  <div className="about-object__plane-head">
                    <span>Surface</span>
                    <span>y = sin x</span>
                  </div>
                  <svg className="about-object__graph" viewBox="0 0 300 180" role="presentation">
                    <defs>
                      <pattern id="aboutGraphGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M30 0H0V30" className="about-object__grid-line" fill="none" />
                      </pattern>
                    </defs>
                    <rect width="300" height="180" fill="url(#aboutGraphGrid)" />
                    <line x1="0" y1="126" x2="300" y2="126" className="about-object__axis" />
                    <line x1="64" y1="0" x2="64" y2="180" className="about-object__axis" />
                    <path
                      d="M0 142 C 42 142, 52 58, 92 58 S 146 142, 190 142 S 246 58, 300 58"
                      className="about-object__curve"
                      fill="none"
                    />
                    <circle cx="92" cy="58" r="4" className="about-object__point" />
                    <circle cx="246" cy="58" r="4" className="about-object__point" />
                  </svg>
                  <span className="about-object__caption">Plot · Cartesian plane</span>
                </div>

                <div className="about-object__plane about-object__plane--formula">
                  <span className="about-object__eyebrow">Definite integral</span>
                  <div className="about-object__formula">
                    <span>∫</span>
                    <sub>0</sub>
                    <sup>1</sup>
                    <span>x² dx</span>
                    <span className="about-object__equals">=</span>
                    <span>⅓</span>
                  </div>
                  <span className="about-object__rule" />
                  <span className="about-object__caption">Area under the curve</span>
                </div>

                <div className="about-object__plane about-object__plane--shape">
                  <span className="about-object__eyebrow">Geometry</span>
                  <svg className="about-object__shape" viewBox="0 0 160 130" role="presentation">
                    <path d="M80 16 L140 112 L20 112 Z" className="about-object__shape-path" />
                    <path d="M80 16 L80 112" className="about-object__shape-alt" />
                    <circle cx="80" cy="112" r="3" className="about-object__point" />
                  </svg>
                  <span className="about-object__shape-label">a² + b² = c²</span>
                </div>

                <span className="about-object__chip about-object__chip--a">x² + y² = r²</span>
                <span className="about-object__chip about-object__chip--b">π · 3.14159</span>

                <span className="about-object__ring" />
                <span className="about-object__ring about-object__ring--b" />
              </div>
            </Tilt3D>
          </div>
        </div>

        <a className="about-hero__scroll" href="#about-philosophy">
          <span>Read the philosophy</span>
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </section>

      {/* =====================================================================
          Philosophy — ink field, one sentence given room to breathe.
         ===================================================================== */}
      <section className="about-philosophy" id="about-philosophy">
        <div className="about-philosophy__grid" aria-hidden="true" />
        <div className="shell about-philosophy__inner">
          <Reveal className="about-philosophy__head">
            <span className="section-kicker">{t.aboutPhilTag || 'Philosophy'}</span>
            <h2 className="about-philosophy__title">
              {t.aboutPhilHeading || 'Mathematics is more than an answer.'}
            </h2>
            <p className="about-philosophy__lead">
              {t.aboutPhilDesc ||
                'We believe mathematics becomes easier to explore when numbers, equations, and visual representations work together. CALCAURA brings these experiences into one accessible workspace.'}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <GlassPanel className="about-philosophy__quote">
              <span className="about-quote-mark" aria-hidden="true">
                “
              </span>
              <p>{t.aboutPhilosophyQuote || 'Calculate. Visualize. Understand. Verify.'}</p>
              <span className="about-philosophy__sig">
                {t.aboutSubtitle || 'Built by HSBJK'}
              </span>
            </GlassPanel>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          Core principles — Calculate, Visualize, Understand.
         ===================================================================== */}
      <section className="about-principles" aria-labelledby="about-principles-title">
        <div className="shell">
          <Reveal className="about-section-head">
            <div className="about-section-head__meta">
              <span className="section-kicker">{t.aboutPrinciplesTag || 'Core Principles'}</span>
              <span className="about-section-head__rule" aria-hidden="true" />
            </div>
            <h2 id="about-principles-title" className="h2 about-section-head__title">
              {t.aboutPrinciplesHeading || 'How we approach learning'}
            </h2>
          </Reveal>

          <div className="about-principles__grid">
            {principles.map((principle, index) => (
              <Reveal key={principle.tag} delay={index * 80}>
                <GlassPanel as="article" tilt className="principle">
                  <div className="principle__top">
                    <span className="principle__icon">
                      <principle.Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="principle__index" aria-hidden="true">
                      {principle.index}
                    </span>
                  </div>
                  <span className="principle__tag">{principle.tag}</span>
                  <h3 className="principle__title">{principle.title}</h3>
                  <p className="principle__desc">{principle.desc}</p>
                </GlassPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          Whiteboard — creative space, four pillars, one sheet of paper.
         ===================================================================== */}
      <section className="about-board" id="about-whiteboard" aria-labelledby="about-board-title">
        <div className="shell">
          <div className="about-board__head">
            <Reveal>
              <span className="section-kicker">Creative Space</span>
              <h2 id="about-board-title" className="about-board__title">
                The Whiteboard: Where intuition takes shape
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="about-board__intro">
                Calculators compute answers. Graphing engines plot formulas. But genuine mathematical
                insight often starts with a pen on a blank surface—sketching geometric figures, testing
                conjectures, and scribbling proof steps by hand.
              </p>
            </Reveal>
          </div>

          <div className="about-board__body">
            <Reveal className="about-board__visual" delay={80}>
              <div aria-hidden="true">
                <Tilt3D className="about-board__mock" strength={6}>
                  <div className="about-board__canvas">
                    <div className="about-board__toolbar">
                      <span className="about-board__dot" />
                      <span className="about-board__dot" />
                      <span className="about-board__dot" />
                      <span className="about-board__sheet">Sheet 02 — Proof</span>
                    </div>

                    <div className="about-board__paper">
                      <svg className="about-board__diagram" viewBox="0 0 320 220" role="presentation">
                        <path d="M60 172 L164 36 L268 172 Z" className="about-board__line" />
                        <path d="M164 36 L164 172" className="about-board__line about-board__line--dash" />
                        <circle cx="164" cy="36" r="3.5" className="about-board__point" />
                        <circle cx="60" cy="172" r="3.5" className="about-board__point" />
                        <circle cx="268" cy="172" r="3.5" className="about-board__point" />
                      </svg>
                      <span className="about-board__formula">a² + b² = c²</span>
                      <span className="about-board__hand">drop the altitude</span>
                      <span className="about-board__tag">Given △ABC</span>
                    </div>

                    <div className="about-board__layers">
                      <span>Text</span>
                      <span>Diagram</span>
                      <span>Shapes</span>
                      <span>Export</span>
                    </div>
                  </div>
                </Tilt3D>
              </div>
            </Reveal>

            <div className="about-board__pillars">
              {WHITEBOARD_PILLARS.map((pillar, index) => (
                <Reveal key={pillar.tag} delay={index * 70}>
                  <article className="board-pillar">
                    <div className="board-pillar__top">
                      <pillar.Icon className="board-pillar__icon h-3.5 w-3.5" aria-hidden="true" />
                      <span>{pillar.tag}</span>
                    </div>
                    <h3 className="board-pillar__title">{pillar.title}</h3>
                    <p className="board-pillar__desc">{pillar.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="about-board__cta" delay={120}>
            <button type="button" className="btn" onClick={onOpenWhiteboard}>
              <PenTool className="h-4 w-4" aria-hidden="true" />
              <span>Launch Whiteboard Workspace</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="about-board__note">
              Plain paper, ruled lines, graph grid, chalkboard and dotted matrix. Layer the
              explanation above the drawing, then export the sheet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          Audience — four honest learner profiles.
         ===================================================================== */}
      <section className="about-audience" aria-labelledby="about-audience-title">
        <div className="shell about-audience__inner">
          <Reveal className="about-audience__head">
            <span className="section-kicker">{t.aboutAudienceTag || 'Audience'}</span>
            <h2 id="about-audience-title" className="h2">
              {t.aboutAudienceHeading || 'Designed for learners at every stage'}
            </h2>
            <p className="about-audience__note">
              From first arithmetic to engineering mathematics, the same workspace keeps the numbers,
              the graph, and the explanation in view.
            </p>
            <span className="about-audience__rule" aria-hidden="true" />
          </Reveal>

          <div className="about-audience__grid">
            {audience.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <GlassPanel as="article" className="audience-card">
                  <div className="audience-card__top">
                    <span className="audience-card__index">{`0${index + 1}`}</span>
                    <span className="audience-card__mark" aria-hidden="true" />
                  </div>
                  <h3 className="audience-card__title">{item.title}</h3>
                  <p className="audience-card__desc">{item.desc}</p>
                </GlassPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          Creator note — one quiet attribution, no invented credentials.
         ===================================================================== */}
      <section className="about-creator" aria-labelledby="about-creator-title">
        <div className="shell">
          <Reveal>
            <div className="about-creator__card accent-edge">
              <span className="about-creator__mark" aria-hidden="true">
                H
              </span>
              <div className="about-creator__body">
                <span className="section-kicker about-creator__tag">
                  {t.aboutCreatorTag || 'Crafted with Care'}
                </span>
                <h2 id="about-creator-title" className="about-creator__title">
                  {t.aboutCreatorTitle || 'Built by HSBJK.'}
                </h2>
                <p className="about-creator__desc">
                  {t.aboutCreatorDesc ||
                    'CALCAURA is an evolving project focused on making mathematics easier to calculate, visualize, and understand.'}
                </p>
              </div>
              <span className="about-creator__glyph" aria-hidden="true">
                ∑
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          Final CTA — the one full-chartreuse surface on the page.
         ===================================================================== */}
      <section className="about-final" aria-labelledby="about-final-title">
        <div className="shell">
          <Reveal>
            <div className="about-final__panel">
              <div className="about-final__grid" aria-hidden="true" />
              <span className="about-final__glyph about-final__glyph--a" aria-hidden="true">
                π
              </span>
              <span className="about-final__glyph about-final__glyph--b" aria-hidden="true">
                √
              </span>

              <div className="about-final__inner">
                <h2 id="about-final-title" className="about-final__title">
                  {t.aboutFinalHeading || 'See mathematics differently.'}
                </h2>
                <p className="about-final__sub">
                  {t.aboutFinalSub || 'Discover a more visual way to explore mathematics.'}
                </p>
                <div className="about-final__actions">
                  <button type="button" className="btn btn--ink" onClick={onExplorePlatform}>
                    <span>{t.aboutExploreCta || 'Explore CALCAURA'}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {onNavigateHome && (
                    <button type="button" className="text-link about-final__home" onClick={onNavigateHome}>
                      <span>Return home</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="about-footer">
        <div className="shell about-footer__inner">
          <span className="about-footer__brand">
            <span className="about-footer__mark" aria-hidden="true">
              CA
            </span>
            CalcAura
          </span>
          <p>{t.aboutFooterCopy || 'CALCAURA · Built by HSBJK · All rights reserved'}</p>
          {onNavigateHome && (
            <button type="button" className="text-link about-footer__home" onClick={onNavigateHome}>
              <span>Back to top</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
