import React, { useState, useEffect, useRef } from 'react';
import { Sigma, X, Check, Copy } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { whiteboardSounds } from './soundEffects.ts';

interface MathEquationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertEquation: (latex: string) => void;
}

const PRESET_FORMULAS = [
  { label: 'Quadratic Formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
  { label: 'Pythagorean Theorem', latex: 'a^2 + b^2 = c^2' },
  { label: 'Definite Integral', latex: '\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)' },
  { label: 'Euler\'s Identity', latex: 'e^{i\\pi} + 1 = 0' },
  { label: 'Limit Definition', latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}' },
  { label: 'Summation Series', latex: '\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}' },
  { label: '2×2 Matrix', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
  { label: 'Binomial Theorem', latex: '(x+y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k' },
];

const MATH_SNIPPETS = [
  { label: 'Fraction', insert: '\\frac{a}{b}' },
  { label: 'Square Root', insert: '\\sqrt{x}' },
  { label: 'Nth Root', insert: '\\sqrt[n]{x}' },
  { label: 'Power', insert: 'x^{2}' },
  { label: 'Subscript', insert: 'x_{i}' },
  { label: 'Integral', insert: '\\int_{0}^{\\infty}' },
  { label: 'Sum', insert: '\\sum_{i=1}^{n}' },
  { label: 'Product', insert: '\\prod_{i=1}^{n}' },
  { label: 'Limit', insert: '\\lim_{x \\to 0}' },
  { label: 'Matrix', insert: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
  { label: 'π', insert: '\\pi' },
  { label: 'θ', insert: '\\theta' },
  { label: 'α', insert: '\\alpha' },
  { label: 'β', insert: '\\beta' },
  { label: 'Δ', insert: '\\Delta' },
  { label: 'λ', insert: '\\lambda' },
  { label: 'σ', insert: '\\sigma' },
  { label: '∞', insert: '\\infty' },
  { label: '±', insert: '\\pm' },
  { label: '≤', insert: '\\le' },
  { label: '≥', insert: '\\ge' },
  { label: '≠', insert: '\\ne' },
];

export const MathEquationModal: React.FC<MathEquationModalProps> = ({
  isOpen,
  onClose,
  onInsertEquation,
}) => {
  const [latex, setLatex] = useState<string>('f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}');
  const previewRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !previewRef.current) return;
    try {
      katex.render(latex || '...', previewRef.current, {
        throwOnError: true,
        displayMode: true,
      });
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Invalid LaTeX syntax');
    }
  }, [latex, isOpen]);

  if (!isOpen) return null;

  const handleSnippetClick = (snippet: string) => {
    whiteboardSounds.playTapSound();
    setLatex((prev) => prev + ' ' + snippet);
  };

  const handleInsert = () => {
    if (!latex.trim()) return;
    whiteboardSounds.playPopSound();
    onInsertEquation(latex.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-[#1E1E22] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Sigma className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Mathematical Equation Tool</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Typeset LaTeX formulas with live mathematical verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 thin-scrollbar">
          {/* Live KaTeX Render Preview Box */}
          <div className="min-h-24 p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-slate-900 dark:text-white overflow-x-auto">
            <div ref={previewRef} className="py-2 text-lg sm:text-xl" />
            {error && (
              <p className="text-xs text-rose-500 font-mono mt-1 text-center">{error}</p>
            )}
          </div>

          {/* Quick Snippets */}
          <div>
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Math Symbols & Structures
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MATH_SNIPPETS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSnippetClick(s.insert)}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* LaTeX Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              LaTeX Code
            </label>
            <textarea
              rows={3}
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              className="w-full px-3.5 py-2 font-mono text-xs rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7957F5]/40"
              placeholder="e.g. \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"
            />
          </div>

          {/* Preset Formulas */}
          <div>
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Standard Formula Presets
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_FORMULAS.map((f) => (
                <button
                  key={f.label}
                  onClick={() => {
                    setLatex(f.latex);
                    whiteboardSounds.playTapSound();
                  }}
                  className="p-2 text-left rounded-xl bg-slate-100/70 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
                >
                  <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                    {f.label}
                  </span>
                  <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {f.latex}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Insert to Whiteboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
