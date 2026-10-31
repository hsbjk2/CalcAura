import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  PenTool,
  Layers,
  FileText,
  Grid,
  Moon,
  Sun,
  Maximize2,
  Sparkles,
  ArrowRight,
  Type,
  ChevronsUp,
  Download,
  Image as ImageIcon,
  Smile,
  Shapes,
  Palette
} from 'lucide-react';

interface WhiteboardShowcaseSectionProps {
  onOpenWhiteboard: () => void;
}

export const WhiteboardShowcaseSection: React.FC<WhiteboardShowcaseSectionProps> = ({
  onOpenWhiteboard,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [activePreviewBg, setActivePreviewBg] = useState<'white' | 'dark' | 'grid' | 'ruled'>('white');

  const bgStyles = {
    white: 'bg-white text-slate-900 border-slate-200',
    dark: 'bg-[#161618] text-white border-white/15',
    grid: 'bg-white text-slate-900 [background:linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] [background-size:18px_18px] border-slate-200',
    ruled: 'bg-white text-slate-900 [background:repeating-linear-gradient(transparent,transparent_23px,#E2E8F0_24px)] border-slate-200',
  };

  const features = [
    {
      icon: Sun,
      title: 'Versatile STEM Paper Templates',
      desc: 'Switch instantly between Plain White, Obsidian Dark chalkboard, Ruled notebook paper, and mathematical Square Grid.',
      tag: '6 Surface Types',
    },
    {
      icon: Layers,
      title: 'True 4-Tier Layer Stacking',
      desc: 'Organize overlapping objects with Bring to Front, Send to Back, and step-by-step layer reordering so annotations never get lost.',
      tag: 'Deterministic Layers',
    },
    {
      icon: Type,
      title: 'Rich Multiline Typography',
      desc: 'Write equations and proof annotations in Serif, Sans-Serif, Monospace, or Handwritten typefaces with quick size steppers.',
      tag: 'Custom Fonts & Sizes',
    },
    {
      icon: Shapes,
      title: 'Vector Geometry & Smooth Inking',
      desc: 'Pressure-sensitive pens, translucent highlighters, geometric shapes (triangles, diamonds, stars, arrows), and precision eraser.',
      tag: 'Freehand & Vectors',
    },
    {
      icon: ImageIcon,
      title: 'Diagrams & Sticker Library',
      desc: 'Paste images directly from the clipboard, upload textbook diagrams, or stamp learning emojis and badges onto any sheet.',
      tag: 'Image Import & Stickers',
    },
    {
      icon: Download,
      title: 'Multi-Sheet & Publication Exports',
      desc: 'Maintain unlimited sheets in a bottom thumbnail dock and export to 2x High-Res PNG, JPEG, SVG, or multi-page PDF.',
      tag: 'PNG · SVG · PDF',
    },
  ];

  return (
    <section id="whiteboard-showcase" className="relative py-24 sm:py-36 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7957F5]/12 via-[#D94BCB]/8 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7957F5]/10 dark:bg-white/[0.06] border border-[#7957F5]/30 dark:border-white/12 text-[11px] font-mono font-semibold tracking-wider text-[#7957F5] dark:text-[#D94BCB] uppercase mb-4 shadow-xs">
            <PenTool className="w-3.5 h-3.5" />
            <span>CalcAura Whiteboard · Freehand Drawing & Visual Mathematics</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB] leading-[1.15]">
            Your Digital Blackboard.
            <br />
            <span className="bg-gradient-to-r from-[#7957F5] via-[#5558E8] to-[#D94BCB] bg-clip-text text-transparent">
              Unconstrained Thinking.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-[#A6A9B8] leading-relaxed max-w-2xl mx-auto">
            A distraction-free, desktop drawing workspace combining the raw creative intuition of a chalkboard with modern digital precision, true layer stacking, and STEM paper templates.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenWhiteboard}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-[0.98] text-white text-sm font-semibold shadow-[0_4px_20px_rgba(121,87,245,0.35)] transition-all cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>Launch Whiteboard Workspace</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Interactive Whiteboard Canvas Preview Showcase */}
        <div className="relative mb-16 sm:mb-24 rounded-3xl bg-slate-100 dark:bg-[#111321] border border-slate-200 dark:border-white/12 p-3 sm:p-5 shadow-2xl overflow-hidden">
          {/* Top Bar of the Mock Preview */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-2 py-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                Whiteboard Preview · Sheet 1 (Geometry & Proofs)
              </span>
            </div>

            {/* Background Template Switcher on the Mock */}
            <div className="flex items-center gap-1 bg-white dark:bg-white/[0.06] p-1 rounded-xl border border-slate-200 dark:border-white/10 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5 hidden sm:inline">
                Paper:
              </span>
              {[
                { id: 'white', label: 'Plain White', icon: Sun },
                { id: 'dark', label: 'Chalkboard', icon: Moon },
                { id: 'grid', label: 'Math Grid', icon: Grid },
                { id: 'ruled', label: 'Ruled Paper', icon: FileText },
              ].map((bg) => {
                const Icon = bg.icon;
                const isSelected = activePreviewBg === bg.id;
                return (
                  <button
                    key={bg.id}
                    onClick={() => setActivePreviewBg(bg.id as any)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7957F5] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="text-[11px]">{bg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulated Whiteboard Surface with Drawing Objects */}
          <div
            className={`relative w-full h-[360px] sm:h-[440px] rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-8 ${bgStyles[activePreviewBg]}`}
          >
            {/* Mock Floating Properties Bar */}
            <div className="self-center bg-white/95 dark:bg-[#1E1E22]/95 backdrop-blur-md border border-slate-200 dark:border-white/12 shadow-lg rounded-2xl px-3.5 py-1.5 flex items-center gap-2.5 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                TEXT
              </span>
              <div className="flex items-center gap-1">
                {['#000000', '#DC2626', '#16A34A', '#0284C7', '#4F46E5', '#D94BCB'].map((c, i) => (
                  <span
                    key={c}
                    style={{ backgroundColor: c }}
                    className={`w-3.5 h-3.5 rounded-full border border-slate-300 ${i === 4 ? 'ring-2 ring-[#7957F5] scale-110' : ''}`}
                  />
                ))}
              </div>
              <div className="h-3 w-px bg-slate-200 dark:bg-white/10" />
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-serif text-[11px]">
                Serif (Georgia)
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-mono text-[11px] font-semibold">
                36px
              </span>
              <div className="h-3 w-px bg-slate-200 dark:bg-white/10" />
              <div className="flex items-center gap-1 text-slate-500">
                <span className="p-1 rounded bg-slate-100 dark:bg-white/10 text-[#7957F5] font-bold text-[10px]">
                  « Top
                </span>
                <span className="p-1 rounded bg-slate-100 dark:bg-white/10 text-[10px]">
                  ↑ Up
                </span>
              </div>
            </div>

            {/* Illustrative Mathematical Annotations on the Canvas */}
            <div className="relative w-full flex-1 mt-4">
              {/* Geometric Triangle Illustration */}
              <svg className="absolute left-6 top-4 w-52 h-44 pointer-events-none" viewBox="0 0 200 160">
                <polygon
                  points="30,140 170,140 170,20"
                  fill="rgba(121, 87, 245, 0.08)"
                  stroke="#7957F5"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <rect x="150" y="120" width="20" height="20" fill="none" stroke="#7957F5" strokeWidth="1.5" />
                <path d="M 50,140 A 25,25 0 0,0 45,128" fill="none" stroke="#D94BCB" strokeWidth="2" />
                <text x="56" y="126" fontSize="12" fill={activePreviewBg === 'dark' ? '#F6F7FB' : '#475569'} fontFamily="sans-serif">θ</text>
                <text x="95" y="155" fontSize="11" fill={activePreviewBg === 'dark' ? '#F6F7FB' : '#475569'} fontFamily="sans-serif">b = 12 cm</text>
                <text x="178" y="85" fontSize="11" fill={activePreviewBg === 'dark' ? '#F6F7FB' : '#475569'} fontFamily="sans-serif">a = 5 cm</text>
                <text x="80" y="70" fontSize="11" fill="#7957F5" fontWeight="bold" fontFamily="sans-serif">c = √(a² + b²) = 13</text>
              </svg>

              {/* Freeform Formula Text Card */}
              <div className="absolute right-6 top-8 max-w-xs sm:max-w-sm p-4 rounded-2xl bg-white/90 dark:bg-black/60 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg">
                <span className="text-[10px] font-mono font-bold text-[#7957F5] uppercase tracking-wider block mb-1">
                  Step 2 · Pythagorean Derivation
                </span>
                <p className="font-serif text-base sm:text-lg leading-snug font-normal text-slate-900 dark:text-white">
                  c² = a² + b² = 5² + 12² = 169
                  <br />
                  <span className="font-sans font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                    ⇒ Hypotenuse c = 13 cm
                  </span>
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Verified with Step-by-Step Proof</span>
                </div>
              </div>

              {/* Learning Sticker Stamp */}
              <div className="absolute left-1/2 bottom-3 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 shadow-sm text-amber-800 dark:text-amber-200 text-xs">
                <span className="text-base">🚀</span>
                <span className="font-semibold">Interactive STEM Exploration</span>
              </div>
            </div>

            {/* Bottom Sheet Dock in the Mock */}
            <div className="self-start flex items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-white/10 w-full text-xs">
              <span className="text-[10px] font-mono text-slate-400 font-semibold hidden sm:inline">
                Sheets (2):
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#7957F5] text-white font-medium text-[11px]">
                1 · Geometry Proofs
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[11px]">
                2 · Coordinate Grid Scratchpad
              </span>
            </div>
          </div>
        </div>

        {/* 6 Core Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: 0.05 * idx }}
                className="group relative bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/10 p-6 hover:border-[#7957F5]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#7957F5] dark:text-[#D94BCB]">
                      {feat.tag}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#7957F5]/10 dark:bg-white/[0.06] text-[#7957F5] dark:text-[#D94BCB] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F6F7FB] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
