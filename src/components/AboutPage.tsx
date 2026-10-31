import React, { useEffect, useState } from 'react';
import { ArrowRight, PenTool } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.tsx';

interface AboutPageProps {
  onExplorePlatform: () => void;
  onNavigateHome?: () => void;
  onOpenWhiteboard?: () => void;
  darkMode?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExplorePlatform,
  onOpenWhiteboard,
  darkMode = false,
}) => {
  const { t } = useI18n();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div
      className={`relative w-full ${
        darkMode ? 'text-[#FFF9FD] selection:bg-[#ECA0CE]/30 selection:text-[#FFF9FD]' : 'text-[#200D25] selection:bg-[#ECA0CE]/40 selection:text-[#200D25]'
      } overflow-x-hidden font-inter transition-colors duration-500`}
      style={{
        background: darkMode
          ? `
            radial-gradient(ellipse 100% 700px at 50% 0px, rgba(58, 20, 52, 0.7) 0%, rgba(35, 12, 38, 0.85) 45%, rgba(14, 7, 19, 0.98) 100%),
            radial-gradient(ellipse 90% 650px at 50% 600px, rgba(166, 91, 145, 0.2) 0%, rgba(53, 19, 51, 0.35) 60%, transparent 100%),
            radial-gradient(ellipse 100% 800px at 50% 1300px, rgba(88, 30, 80, 0.3) 0%, rgba(14, 7, 19, 0.95) 70%, transparent 100%),
            linear-gradient(180deg, 
              #1A0C22 0%, 
              #180A20 8%, 
              #14081B 20%, 
              #110617 35%, 
              #0E0513 48%, 
              #0B040F 62%, 
              #09030C 75%, 
              #07020A 88%, 
              #050107 100%
            )
          `
          : `
            radial-gradient(ellipse 100% 700px at 50% 0px, #FFF9FD 0%, #F8D7EC 40%, rgba(236, 160, 206, 0.4) 80%, transparent 100%),
            radial-gradient(ellipse 90% 650px at 50% 600px, rgba(236, 160, 206, 0.55) 0%, rgba(166, 91, 145, 0.4) 60%, transparent 100%),
            radial-gradient(ellipse 100% 800px at 50% 1300px, rgba(166, 91, 145, 0.5) 0%, rgba(53, 19, 51, 0.8) 70%, transparent 100%),
            linear-gradient(180deg, 
              #FFF9FD 0%, 
              #FFF5FA 8%, 
              #F8D7EC 20%, 
              #ECA0CE 35%, 
              #BA5795 48%, 
              #7A2565 62%, 
              #4D143F 75%, 
              #351333 88%, 
              #200D25 100%
            )
          `,
      }}
    >
      {/* ==============================================================
          1. HERO SECTION
          Spacious (approx 85-95vh tall), centered content, generous negative space,
          elegant editorial serif headline with balanced wrapping.
      ============================================================== */}
      <section className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-24 text-center max-w-4xl mx-auto">
        {/* Soft atmospheric blush glow behind hero content */}
        <div 
          className="pointer-events-none absolute inset-0 -top-16 max-w-4xl mx-auto -z-10 blur-2xl opacity-75"
          style={{
            background: darkMode
              ? 'radial-gradient(ellipse 85% 65% at 50% 35%, rgba(236, 160, 206, 0.35) 0%, rgba(166, 91, 145, 0.2) 45%, transparent 100%)'
              : 'radial-gradient(ellipse 85% 65% at 50% 35%, #FFF9FD 0%, #F8D7EC 45%, #ECA0CE 75%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        <div className="w-full flex flex-col items-center space-y-7 sm:space-y-9">
          
          {/* Subtle minimal indicator */}
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${
              darkMode
                ? 'bg-white/10 backdrop-blur-md border border-[#F8D7EC]/20 text-[#F8D7EC]'
                : 'bg-white/70 backdrop-blur-md border border-[#ECA0CE]/60 text-[#64295B]'
            } text-[11px] font-medium tracking-widest uppercase shadow-xs transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span>{t.aboutTitle || 'About CalcAura'}</span>
          </div>

          {/* Large, elegant, centered headline typography */}
          <h1
            className={`font-serif-display ${
              darkMode ? 'text-[#FFF9FD]' : 'text-[#200D25]'
            } text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.12] sm:leading-[1.08] max-w-3xl mx-auto transition-all duration-1000 delay-150 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.75rem)' }}
          >
            {t.aboutHeroHeadline || 'Making mathematics clearer, one discovery at a time.'}
          </h1>

          {/* Narrow centered supporting paragraph in restrained Inter */}
          <p
            className={`${
              darkMode ? 'text-[#F8D7EC]/90' : 'text-[#582E54]'
            } text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t.aboutHeroSub || 'CALCAURA brings calculations, equations, interactive visualizations, and learning together in one workspace—helping students and curious minds explore mathematics with greater clarity.'}
          </p>

          {/* Compact, understated white pill-shaped CTA button */}
          <div
            className={`pt-2 transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={onExplorePlatform}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#200D25] hover:text-[#351333] hover:bg-[#FFF9FD] text-xs sm:text-sm font-medium tracking-wide shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8D7EC]"
            >
              <span>{t.aboutExploreCta || 'Explore CALCAURA'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A65B91] group-hover:text-[#200D25] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>

        {/* Subtle hairline scroll cue */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none opacity-25">
          <div className={`w-[1px] h-9 bg-gradient-to-b ${darkMode ? 'from-[#FFF9FD]' : 'from-[#200D25]'} to-transparent`} />
        </div>
      </section>

      {/* ==============================================================
          2. SECTION A — WHY CALCAURA EXISTS
          Clean editorial text layout with generous whitespace.
          High-contrast radiant typography on atmospheric rose-plum canvas.
      ============================================================== */}
      <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <div className="space-y-6">
          <span
            className="text-[11px] font-medium tracking-widest uppercase block"
            style={{ color: '#FADCEF' }}
          >
            {t.aboutPhilTag || 'Philosophy'}
          </span>
          <h2
            className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.18]"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', color: '#FFF9FD' }}
          >
            {t.aboutPhilHeading || 'Mathematics is more than an answer.'}
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl mx-auto"
            style={{ color: '#FADCEF' }}
          >
            {t.aboutPhilDesc || 'We believe mathematics becomes easier to explore when numbers, equations, and visual representations work together. CALCAURA brings these experiences into one accessible workspace.'}
          </p>
        </div>
      </section>

      {/* ==============================================================
          3. SECTION B — OUR APPROACH
          Three well-spaced editorial blocks: Calculate, Visualize, Understand.
          Gradient smoothly deepens from rose into rich mauve and plum.
          Text transitions to soft white & blush.
      ============================================================== */}
      <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-[11px] font-medium tracking-widest uppercase block mb-3" style={{ color: '#F8D7EC' }}>
            {t.aboutPrinciplesTag || 'Core Principles'}
          </span>
          <h2
            className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', color: '#FFF9FD' }}
          >
            {t.aboutPrinciplesHeading || 'How we approach learning'}
          </h2>
        </div>

        {/* Three well-spaced editorial blocks with delicate divider lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 text-left">
          {/* Calculate */}
          <div className="space-y-3.5 border-t border-[#F8D7EC]/30 pt-6">
            <span className="text-xs font-mono uppercase tracking-wider block" style={{ color: '#F8D7EC' }}>
              {t.aboutCalcTag || '01 · Calculate'}
            </span>
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              {t.aboutCalcTitle || 'Precision in every step'}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              {t.aboutCalcDesc || 'Perform mathematical and scientific calculations with clear inputs and meaningful results.'}
            </p>
          </div>

          {/* Visualize */}
          <div className="space-y-3.5 border-t border-[#F8D7EC]/30 pt-6">
            <span className="text-xs font-mono uppercase tracking-wider block" style={{ color: '#F8D7EC' }}>
              {t.aboutVisTag || '02 · Visualize'}
            </span>
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              {t.aboutVisTitle || 'Intuition through form'}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              {t.aboutVisDesc || 'Explore functions, shapes, graphs, and mathematical relationships through interactive representations.'}
            </p>
          </div>

          {/* Understand */}
          <div className="space-y-3.5 border-t border-[#F8D7EC]/30 pt-6">
            <span className="text-xs font-mono uppercase tracking-wider block" style={{ color: '#F8D7EC' }}>
              {t.aboutUndTag || '03 · Understand'}
            </span>
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              {t.aboutUndTitle || 'Depth behind the formula'}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              {t.aboutUndDesc || 'Connect the result with its formula, explanation, or visual demonstration where the relevant feature supports it.'}
            </p>
          </div>
        </div>
      </section>

      {/* ==============================================================
          3.5 SECTION — THE WHITEBOARD: WHERE INTUITION TAKES SHAPE
          Tactile exploration, STEM paper templates, layer ordering, and publication exports.
      ============================================================== */}
      <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#F8D7EC]/15">
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-[11px] font-medium tracking-widest uppercase block mb-3" style={{ color: '#ECA0CE' }}>
            Creative Space
          </span>
          <h2
            className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', color: '#FFF9FD' }}
          >
            The Whiteboard: Where intuition takes shape
          </h2>
          <p
            className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl mx-auto"
            style={{ color: '#FADCEF' }}
          >
            Calculators compute answers. Graphing engines plot formulas. But genuine mathematical insight often starts with a pen on a blank surface—sketching geometric figures, testing conjectures, and scribbling proof steps by hand.
          </p>
        </div>

        {/* 4 Editorial Whiteboard Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 text-left mb-14">
          <div className="space-y-2.5 border-t border-[#F8D7EC]/25 pt-6">
            <span className="text-xs font-mono uppercase tracking-wider block" style={{ color: '#ECA0CE' }}>
              01 · Freeform STEM Surfaces
            </span>
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              Beyond blank paper
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              Switch seamlessly between pristine Plain White, dark obsidian chalkboard, college ruled lines, Cartesian graph paper, and bullet dotted matrices for any lesson or proof.
            </p>
          </div>

          <div className="space-y-2.5 border-t border-[#F8D7EC]/25 pt-6">
            <span className="text-xs font-mono uppercase tracking-wider block" style={{ color: '#ECA0CE' }}>
              02 · True Layer Stacking
            </span>
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              Structured thinking
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              Unlike simple drawing apps, every text block, diagram, shape, and sticker lives on an independent z-index layer with 4-tier stacking controls («, ↑, ↓, ») so explanations sit cleanly above visuals.
            </p>
          </div>

          <div className="space-y-2.5 border-t border-[#F8D7EC]/25 pt-6">
            <span className="text-xs font-mono uppercase tracking-wider block" style={{ color: '#ECA0CE' }}>
              03 · Typography & Geometric Precision
            </span>
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              Handwritten feel, publication polish
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              Combine pressure-sensitive smooth inking with vector shapes, coordinate lines, and multiline typography across Serif, Sans-Serif, Monospace, and Handwritten typefaces.
            </p>
          </div>

          <div className="space-y-2.5 border-t border-[#F8D7EC]/25 pt-6">
            <span className="text-xs font-mono uppercase tracking-wider block" style={{ color: '#ECA0CE' }}>
              04 · Multi-Sheet Notebooks & Export
            </span>
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              From lecture to handout
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              Manage full multi-sheet projects with live visual thumbnail docks and export directly to 2x High-Resolution PNG, JPEG, SVG vector paths, or multi-page PDF documents.
            </p>
          </div>
        </div>

        {/* Dedicated Whiteboard Action Link */}
        <div className="text-center pt-2">
          <button
            onClick={onOpenWhiteboard}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-[#F8D7EC]/30 text-[#FFF9FD] text-xs sm:text-sm font-medium tracking-wide shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer backdrop-blur-md"
          >
            <PenTool className="w-3.5 h-3.5 text-[#ECA0CE]" />
            <span>Launch Whiteboard Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ECA0CE] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ==============================================================
          4. SECTION C — WHO CALCAURA IS FOR
          Clean editorial text layout with generous whitespace.
          Completely borderless, no cards. On rich deep plum background.
      ============================================================== */}
      <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-[11px] font-medium tracking-widest uppercase block mb-3" style={{ color: '#F8D7EC' }}>
            {t.aboutAudienceTag || 'Audience'}
          </span>
          <h2
            className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', color: '#FFF9FD' }}
          >
            {t.aboutAudienceHeading || 'Designed for learners at every stage'}
          </h2>
        </div>

        {/* Clean, borderless editorial blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 text-left">
          <div className="space-y-2">
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              {t.aboutAudSchool || 'School Students'}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              {t.aboutAudSchoolDesc || 'Foundational mathematics brought alive with intuitive visual representations, everyday arithmetic, and step-by-step guidance.'}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              {t.aboutAudSec || 'Higher-Secondary Students'}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              {t.aboutAudSecDesc || 'Curriculum-aligned algebra, geometry proofs, trigonometry, quadratic systems, and calculus theorem derivations.'}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              {t.aboutAudEng || 'Engineering & Undergraduate Learners'}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              {t.aboutAudEngDesc || 'Matrix operations, multivariable derivatives, kinematics, physics modeling, and computational scientific exploration.'}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif-display text-2xl font-normal" style={{ color: '#FFF9FD' }}>
              {t.aboutAudEdu || 'Educators & Curious Mathematics Learners'}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: '#F8D7EC' }}>
              {t.aboutAudEduDesc || 'Interactive demonstration laboratories, printable student exploration sheets, and intuitive multi-dimensional visualizers.'}
            </p>
          </div>
        </div>
      </section>

      {/* ==============================================================
          5. SECTION D — ABOUT THE CREATOR
          Subtle attribution: “Built by HSBJK.”
          Understated, honest copy on deep plum background.
      ============================================================== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center border-t border-[#F8D7EC]/15">
        <div className="space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-widest block" style={{ color: '#ECA0CE' }}>
            {t.aboutCreatorTag || 'Crafted with Care'}
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-normal" style={{ color: '#FFF9FD' }}>
            {t.aboutCreatorTitle || 'Built by HSBJK.'}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-normal" style={{ color: '#F8D7EC' }}>
            {t.aboutCreatorDesc || 'CALCAURA is an evolving project focused on making mathematics easier to calculate, visualize, and understand.'}
          </p>
        </div>
      </section>

      {/* ==============================================================
          6. SECTION E — FINAL CTA
          Visually cohesive with the plum-to-near-black aesthetic.
          Understated white pill button.
      ============================================================== */}
      <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <div className="space-y-6">
          <h2
            className="font-serif-display text-3xl sm:text-5xl font-normal tracking-tight leading-[1.15]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: '#FFF9FD' }}
          >
            {t.aboutFinalHeading || 'See mathematics differently.'}
          </h2>
          <p className="text-sm sm:text-base max-w-md mx-auto font-normal leading-relaxed" style={{ color: '#F8D7EC' }}>
            {t.aboutFinalSub || 'Discover a more visual way to explore mathematics.'}
          </p>

          <div className="pt-2">
            <button
              onClick={onExplorePlatform}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#200D25] hover:text-[#351333] text-xs sm:text-sm font-medium tracking-wide shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8D7EC]"
            >
              <span>{t.aboutExploreCta || 'Explore CALCAURA'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A65B91] group-hover:text-[#200D25] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-4 text-center border-t border-[#351333] text-[11px] font-mono text-[#F8D7EC]/40">
        <p>{t.aboutFooterCopy || 'CALCAURA · Built by HSBJK · All rights reserved'}</p>
      </footer>
    </div>
  );
};
