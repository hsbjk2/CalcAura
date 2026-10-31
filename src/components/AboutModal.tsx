import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Cpu,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Terminal,
  Mail,
  CheckCircle2,
  ExternalLink,
  Code2,
  Lock,
  FileText,
  Copy,
  Globe,
  Binary,
  Compass,
  PenTool,
} from 'lucide-react';
import { Translations, TRANSLATIONS } from '../i18n/translations.ts';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  t?: Translations;
  onOpenFullAbout?: () => void;
}

type AboutTab =
  | 'overview'
  | 'engineering'
  | 'curriculum'
  | 'privacy'
  | 'governance'
  | 'citation';

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  t = TRANSLATIONS.en,
  onOpenFullAbout,
}) => {
  const [activeTab, setActiveTab] = useState<AboutTab>('overview');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('support.hsbjk@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const citationBibtex = `@software{calc_aura_2026,
  author = {HSBJK Engineering},
  title = {CalcAura: Deterministic High-Precision Mathematical Computing Engine},
  year = {2026},
  version = {2.6.0},
  url = {https://calc-aura.local},
  note = {Verified STEM computing, up to 5x5 matrix solver, and step-by-step mathematical proofs}
}`;

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(citationBibtex);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/12 p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer z-10"
          aria-label="Close about dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-white/10 shrink-0 pr-8">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#7957F5] via-[#9D4EDD] to-[#D94BCB] p-0.5 shadow-lg shadow-[#7957F5]/25 flex items-center justify-center text-white font-mono font-black text-2xl shrink-0">
              ∑
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 id="about-modal-title" className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  CalcAura Platform
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Enterprise Verified
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                Deterministic High-Precision Mathematical Computing Engine · Architected by <span className="font-semibold text-slate-900 dark:text-slate-200">HSBJK Engineering</span>
              </p>
            </div>
          </div>

          {onOpenFullAbout && (
            <button
              onClick={onOpenFullAbout}
              className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 text-[#A65B91] dark:text-[#ECA0CE] border border-pink-300/40 dark:border-pink-800/40 flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-center shrink-0"
            >
              <span>Full About Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Executive Tab Switcher */}
        <div className="flex items-center gap-1.5 py-3 border-b border-slate-100 dark:border-white/10 overflow-x-auto shrink-0 text-xs font-medium custom-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Mission', icon: Sparkles },
            { id: 'engineering', label: 'Numerical Algorithms', icon: Cpu },
            { id: 'curriculum', label: 'Curriculum & Solvers', icon: BookOpen },
            { id: 'privacy', label: 'Privacy & Standards', icon: ShieldCheck },
            { id: 'governance', label: 'Governance & Team', icon: Award },
            { id: 'citation', label: 'Academic Citation', icon: FileText },
          ].map((tabItem) => {
            const Icon = tabItem.icon;
            const isActive = activeTab === tabItem.id;
            return (
              <button
                key={tabItem.id}
                onClick={() => setActiveTab(tabItem.id as AboutTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tabItem.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto py-5 space-y-6 pr-1 custom-scrollbar text-xs text-slate-600 dark:text-slate-300">
          {/* TAB 1: OVERVIEW & MISSION */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Mission Statement Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-pink-500/10 border border-slate-200 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7957F5] dark:text-[#D94BCB] block mb-1">
                  Executive Statement of Purpose
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  &ldquo;To democratize rigorous mathematics, spatial geometry, and STEM computation by providing students, educators, and engineers with an instant, verified, client-authoritative computing platform.&rdquo;
                </p>
                <p className="mt-2 text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                  CalcAura bridges the gap between abstract textbook formulas and deep intuitive understanding. Every computation delivers transparent formula substitution, verified proof steps, and interactive visualization without server latency.
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span>Zero-Latency Client Engine</span>
                  </div>
                  <p className="text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                    100% client-authoritative mathematical evaluation. Calculations execute locally in your browser with sub-millisecond execution times and zero round-trip lag.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <span>Step-by-Step Proof Verification</span>
                  </div>
                  <p className="text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                    Unlike opaque answer-only calculators, CalcAura breaks down every solution into transparent intermediate steps, algebraic substitutions, and rendered KaTeX proofs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Binary className="w-4 h-4" />
                    </div>
                    <span>Full 5×5 Matrix Solvers & Geometry</span>
                  </div>
                  <p className="text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                    Direct numeric value putting across Euclidean shapes, coordinate geometry, and full linear algebra solving from 2×2 up to 5×5 matrices with systems of equations ($AX = B$).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <span>Privacy & Offline Autonomy</span>
                  </div>
                  <p className="text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                    Zero user tracking, no telemetry logging, and zero student data collection. The platform functions seamlessly offline in disconnected classroom environments.
                  </p>
                </div>

                <div className="sm:col-span-2 p-4 rounded-2xl bg-gradient-to-r from-[#7957F5]/10 via-[#D94BCB]/10 to-transparent border border-[#7957F5]/30 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <div className="w-7 h-7 rounded-lg bg-[#7957F5]/20 text-[#7957F5] dark:text-[#D94BCB] flex items-center justify-center">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <span>CalcAura Whiteboard & Visual Mathematics</span>
                  </div>
                  <p className="text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                    A distraction-free, desktop drawing workspace combining the raw creative intuition of a chalkboard with modern digital precision: 6 STEM paper backgrounds (Plain White, Obsidian Dark, Ruled, Math Grid), true 4-tier layer stacking, custom typography, image/sticker insertion, and 2x high-resolution PNG, SVG & PDF export.
                  </p>
                </div>
              </div>

              {/* Platform Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">27</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#A6A9B8]">Syllabus Modules</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                  <div className="text-lg font-bold font-mono text-sky-600 dark:text-sky-400">5×5</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#A6A9B8]">Max Matrix Dim</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                  <div className="text-lg font-bold font-mono text-purple-600 dark:text-purple-400">44+</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#A6A9B8]">Verified Solvers</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                  <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#A6A9B8]">Client Precision</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENGINEERING & ACCURACY */}
          {activeTab === 'engineering' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#7957F5]" />
                  <span>Numerical Precision & Algorithmic Standards</span>
                </h4>
                <div className="space-y-2.5 text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                  <p>
                    <strong className="text-slate-900 dark:text-white">IEEE 754 Double Precision:</strong> All core arithmetic operations utilize 64-bit IEEE 754 floating-point representations with numerical epsilon stabilization (<code className="font-mono text-sky-600 dark:text-sky-400">ε = 1e-12</code>) to prevent catastrophic cancellation and round-off accumulation.
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">Gauss-Jordan Matrix Elimination (up to 5×5):</strong> Implements partial pivoting with row-swapping algorithms to compute exact determinants, inverses ($A^{-1}$), matrix rank, and unique solution vectors for linear systems of up to 5 simultaneous variables ($AX = B$).
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">Adaptive Simpson&apos;s 1/3 Quadrature:</strong> Compound parabolic integration with error boundary monitoring computes definite integrals with four-decimal certified accuracy.
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">Euclidean Inequality Constraints:</strong> The geometry engine rigorously verifies the triangle inequality theorem ($a + b &gt; c, b + c &gt; a, c + a &gt; b$) and positive boundary criteria prior to invoking Heron&apos;s formula or rendering vector diagrams.
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">Root Finding & Discriminant Categorization:</strong> Polynomial evaluation determines both real roots and complex conjugate pairs ($u \pm iv$) with step-by-step factorization logs.
                  </p>
                </div>
              </div>

              {/* Technical Specifications Spec Sheet */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Execution Engine</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">Client-Side SPA</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Matrix Capacity</span>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 block mt-0.5">2×2 to 5×5 Solvers</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Typesetting Engine</span>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mt-0.5">KaTeX Real-Time</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">3D Graphics Engine</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">Three.js WebGL</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CURRICULUM & SOLVERS */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                  <span>Comprehensive Mathematical Curriculum Coverage</span>
                </h4>
                <p className="text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                  CalcAura features 44+ verified interactive solvers organized systematically across foundational secondary, senior secondary, and engineering domains:
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10">
                    <span className="font-bold text-sky-600 dark:text-sky-400 text-xs block mb-1">
                      Secondary School Curriculum (Class 10) · 14 Complete Chapters
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                      Real Numbers (Euclidean Division & Fundamental Theorem), Polynomials, Linear Systems in 2 Variables, Quadratic Equations, Arithmetic Progressions ($n$-th term & sum), Triangles (Thales BPT & similarity), Coordinate Geometry (distance, section & centroid), Trigonometry (ratios, complementary angles & heights/distances), Circles, Mensuration (surface areas & combined volumes), and Statistics (mean, median, mode).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10">
                    <span className="font-bold text-purple-600 dark:text-purple-400 text-xs block mb-1">
                      Senior Secondary Curriculum (Class 12) · 13 Complete Chapters
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                      Relations & Functions, Inverse Trigonometric Functions, Matrices (addition, product, transpose, symmetry), Determinants (minors, cofactors, adjoint, Cramer&apos;s rule), Continuity & Differentiability, Applications of Derivatives, Indefinite & Definite Integrals, Differential Equations, Vector Algebra, Three-Dimensional Geometry (direction cosines, lines, planes), Linear Programming, and Probability Distributions (Bayes&apos; Theorem, Bernoulli trials).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B0D16] border border-slate-200 dark:border-white/10">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs block mb-1">
                      STEM Computing & Matrix Algebra (up to 5×5)
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                      Interactive 2×2 through 5×5 matrix inversion, matrix multiplication, determinant evaluation, rank computation, simultaneous linear system solvers ($AX = B$), Gaussian normal distribution and Z-score calculators, academic GPA & attendance planners, and land plot area conversions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY & STANDARDS */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Privacy, Security & Accessibility Compliance</span>
                </h4>
                <div className="space-y-3 text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                  <div className="p-3 bg-white dark:bg-[#0B0D16] rounded-xl border border-slate-200 dark:border-white/10">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">Zero Student Data Collection:</strong>
                    CalcAura does not collect names, emails, student IDs, input matrices, equation strings, or school affiliations. All computation is processed ephemeral in browser memory.
                  </div>
                  <div className="p-3 bg-white dark:bg-[#0B0D16] rounded-xl border border-slate-200 dark:border-white/10">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">No External Tracking or Third-Party Telemetry:</strong>
                    No marketing trackers, third-party analytics pixels, or ad networks are integrated. The application is completely clean and respectful of student privacy.
                  </div>
                  <div className="p-3 bg-white dark:bg-[#0B0D16] rounded-xl border border-slate-200 dark:border-white/10">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">WCAG 2.1 AA Accessibility Standards:</strong>
                    High-contrast color palettes, accessible semantic HTML, keyboard focus rings, and screen-reader descriptive labels across all interactive stages.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GOVERNANCE & TEAM */}
          {activeTab === 'governance' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Engineering Attribution & Maintainer
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-[#A6A9B8] mt-0.5">
                      Conceived, architected, and maintained by <strong className="text-slate-800 dark:text-slate-200">HSBJK Engineering</strong>.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold border border-emerald-500/20">
                    Active Release
                  </span>
                </div>

                <div className="p-3.5 bg-white dark:bg-[#0B0D16] rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#7957F5]" />
                      <span>Direct Official Support & Inquiries</span>
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="text-xs font-mono text-[#7957F5] dark:text-[#D94BCB] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {copiedEmail ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <span>Copy Email</span>
                      )}
                    </button>
                  </div>
                  <a
                    href="mailto:support.hsbjk@gmail.com"
                    className="font-mono text-sm font-bold text-slate-900 dark:text-white hover:text-[#7957F5] dark:hover:text-[#D94BCB] transition-colors block"
                  >
                    support.hsbjk@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    For institutional deployments, educator workshops, syllabus partnership requests, or verified bug disclosures.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 bg-white dark:bg-[#0B0D16] rounded-xl border border-slate-200 dark:border-white/10">
                    <span className="text-slate-400 block mb-0.5">Distribution Policy</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Open Educational Access
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#0B0D16] rounded-xl border border-slate-200 dark:border-white/10">
                    <span className="text-slate-400 block mb-0.5">Verification Status</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      19 Automated Test Suites Passing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CITATION & ACADEMIC ATTRIBUTION */}
          {activeTab === 'citation' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    <span>Academic Citation Format (BibTeX / APA)</span>
                  </h4>
                  <button
                    onClick={handleCopyCitation}
                    className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-[#7957F5]/10 text-[#7957F5] dark:text-[#D94BCB] hover:bg-[#7957F5]/20 cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCitation ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>Copied BibTeX!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy BibTeX</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-600 dark:text-[#A6A9B8]">
                  When utilizing CalcAura as a computational verification benchmark or reference in research papers, theses, or school science competitions, please cite using the standard reference below:
                </p>

                <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto border border-slate-800">
                  <pre>{citationBibtex}</pre>
                </div>

                <div className="p-3 bg-white dark:bg-[#0B0D16] rounded-xl border border-slate-200 dark:border-white/10 text-xs">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">APA Reference:</span>
                  <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                    HSBJK Engineering. (2026). <em>CalcAura: Deterministic High-Precision Mathematical Computing Engine</em> (Version 2.6.0). CalcAura STEM Platform.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Executive Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
              CalcAura Engine · Deterministic Precision
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
