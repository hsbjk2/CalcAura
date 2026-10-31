import React, { useState } from 'react';
import {
  FileSpreadsheet,
  X,
  Sparkles,
  Check,
  CheckCircle2,
  Table as TableIcon,
  Calculator,
  Shapes,
  Divide
} from 'lucide-react';
import { BackgroundType, CanvasObject } from './types.ts';
import { generateId } from './storage.ts';
import { whiteboardSounds } from './soundEffects.ts';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (sheetName: string, background: BackgroundType, starterObjects: CanvasObject[]) => void;
}

interface WorksheetTemplate {
  id: string;
  title: string;
  category: 'math-drill' | 'geometry' | 'fractions' | 'papers';
  description: string;
  background: BackgroundType;
  icon: React.ElementType;
  badge?: string;
  createObjects: () => CanvasObject[];
}

const WORKSHEET_TEMPLATES: WorksheetTemplate[] = [
  {
    id: 'multiplication-worksheet',
    title: 'Multiplication Speed Practice Sheet',
    category: 'math-drill',
    description: 'Pre-formatted arithmetic grid with problems ready for solving and handwriting practice.',
    background: 'ruled',
    icon: TableIcon,
    badge: 'Grades 2–6',
    createObjects: () => [
      {
        id: generateId(),
        type: 'text',
        x: 80,
        y: 60,
        width: 500,
        height: 40,
        text: 'Multiplication Drill Practice Worksheet',
        color: '#1E293B',
        fontSize: 22,
        fontFamily: 'sans-serif',
        bold: true,
        zIndex: 1,
      },
      {
        id: generateId(),
        type: 'text',
        x: 80,
        y: 100,
        width: 500,
        height: 30,
        text: 'Name: ______________________  Date: ____________  Score: _____ / 10',
        color: '#64748B',
        fontSize: 13,
        fontFamily: 'sans-serif',
        zIndex: 2,
      },
      {
        id: generateId(),
        type: 'text',
        x: 100,
        y: 160,
        width: 200,
        height: 180,
        text: '1)  7 × 6 = _____\n\n2)  8 × 9 = _____\n\n3)  12 × 4 = _____\n\n4)  15 × 3 = _____\n\n5)  9 × 9 = _____',
        color: '#1E293B',
        fontSize: 16,
        fontFamily: 'monospace',
        bold: true,
        zIndex: 3,
      },
      {
        id: generateId(),
        type: 'text',
        x: 360,
        y: 160,
        width: 200,
        height: 180,
        text: '6)  11 × 7 = _____\n\n7)  6 × 8 = _____\n\n8)  14 × 5 = _____\n\n9)  13 × 4 = _____\n\n10) 16 × 2 = _____',
        color: '#1E293B',
        fontSize: 16,
        fontFamily: 'monospace',
        bold: true,
        zIndex: 4,
      },
      {
        id: generateId(),
        type: 'sticky',
        x: 620,
        y: 160,
        width: 220,
        height: 180,
        text: 'Teacher\'s Note:\nShow your work in the blank area below or use the pen tool for column multiplication!',
        bgColor: '#FEF08A',
        textColor: '#854D0E',
        fontSize: 13,
        zIndex: 5,
      },
    ],
  },
  {
    id: 'geometry-exercise',
    title: 'Euclidean Geometry & Theorem Proof Sheet',
    category: 'geometry',
    description: 'Statement & reason proof columns with ready geometric triangle and angle diagram.',
    background: 'grid',
    icon: Shapes,
    badge: 'Secondary Math',
    createObjects: () => [
      {
        id: generateId(),
        type: 'text',
        x: 80,
        y: 60,
        width: 600,
        height: 40,
        text: 'Theorem Proof: Triangle Angle Sum is 180°',
        color: '#1E293B',
        fontSize: 22,
        fontFamily: 'sans-serif',
        bold: true,
        zIndex: 1,
      },
      {
        id: generateId(),
        type: 'shape',
        shapeType: 'triangle',
        x: 100,
        y: 120,
        width: 240,
        height: 180,
        strokeColor: '#4F46E5',
        fillColor: 'rgba(79, 70, 229, 0.08)',
        strokeWidth: 3,
        zIndex: 2,
      },
      {
        id: generateId(),
        type: 'text',
        x: 210,
        y: 95,
        width: 40,
        height: 30,
        text: 'A',
        color: '#4F46E5',
        fontSize: 18,
        fontFamily: 'sans-serif',
        bold: true,
        zIndex: 3,
      },
      {
        id: generateId(),
        type: 'text',
        x: 80,
        y: 305,
        width: 40,
        height: 30,
        text: 'B',
        color: '#4F46E5',
        fontSize: 18,
        fontFamily: 'sans-serif',
        bold: true,
        zIndex: 4,
      },
      {
        id: generateId(),
        type: 'text',
        x: 345,
        y: 305,
        width: 40,
        height: 30,
        text: 'C',
        color: '#4F46E5',
        fontSize: 18,
        fontFamily: 'sans-serif',
        bold: true,
        zIndex: 5,
      },
      {
        id: generateId(),
        type: 'math',
        x: 400,
        y: 130,
        width: 320,
        height: 80,
        latex: '\\angle A + \\angle B + \\angle C = 180^\\circ',
        color: '#4F46E5',
        fontSize: 20,
        bgCard: true,
        zIndex: 6,
      },
      {
        id: generateId(),
        type: 'text',
        x: 400,
        y: 230,
        width: 360,
        height: 120,
        text: 'Given: Triangle ABC with vertices A, B, C.\nTo Prove: ∠A + ∠B + ∠C = 180°\nConstruction: Draw line XY parallel to BC through A.\nProof: Use alternate interior angles.',
        color: '#334155',
        fontSize: 13,
        fontFamily: 'sans-serif',
        zIndex: 7,
      },
    ],
  },
  {
    id: 'fraction-comparison',
    title: 'Visual Fraction Practice & Comparison',
    category: 'fractions',
    description: 'Fraction wall grid with comparison tasks and equivalent fraction working.',
    background: 'fraction',
    icon: Divide,
    badge: 'Visual Math',
    createObjects: () => [
      {
        id: generateId(),
        type: 'text',
        x: 80,
        y: 20,
        width: 600,
        height: 35,
        text: 'Fraction Wall: Equivalence & Comparison',
        color: '#0F172A',
        fontSize: 20,
        fontFamily: 'sans-serif',
        bold: true,
        zIndex: 1,
      },
      {
        id: generateId(),
        type: 'sticky',
        x: 80,
        y: 440,
        width: 260,
        height: 140,
        text: 'Task 1: Which is greater?\n1/2 or 2/4?\n1/3 or 1/4?\nUse your pen to color and compare rows!',
        bgColor: '#E0E7FF',
        textColor: '#3730A3',
        fontSize: 13,
        zIndex: 2,
      },
      {
        id: generateId(),
        type: 'math',
        x: 370,
        y: 450,
        width: 260,
        height: 80,
        latex: '\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8}',
        color: '#4F46E5',
        fontSize: 18,
        bgCard: true,
        zIndex: 3,
      },
    ],
  },
  {
    id: 'step-equation-sheet',
    title: 'Quadratic & Equation Working Sheet',
    category: 'math-drill',
    description: 'Structured quadratic derivation sheet with substitution steps and root checks.',
    background: 'ruled',
    icon: Calculator,
    badge: 'Algebra',
    createObjects: () => [
      {
        id: generateId(),
        type: 'text',
        x: 80,
        y: 60,
        width: 600,
        height: 40,
        text: 'Algebraic Working: Step-by-Step Solver',
        color: '#1E293B',
        fontSize: 22,
        fontFamily: 'sans-serif',
        bold: true,
        zIndex: 1,
      },
      {
        id: generateId(),
        type: 'math',
        x: 100,
        y: 120,
        width: 280,
        height: 80,
        latex: '2x^2 - 7x + 3 = 0',
        color: '#7957F5',
        fontSize: 20,
        bgCard: true,
        zIndex: 2,
      },
      {
        id: generateId(),
        type: 'math',
        x: 420,
        y: 120,
        width: 320,
        height: 80,
        latex: 'x = \\frac{7 \\pm \\sqrt{49 - 4(2)(3)}}{2(2)}',
        color: '#059669',
        fontSize: 18,
        bgCard: true,
        zIndex: 3,
      },
      {
        id: generateId(),
        type: 'text',
        x: 100,
        y: 230,
        width: 600,
        height: 100,
        text: 'Step 1: Identify coefficients: a = 2, b = -7, c = 3\nStep 2: Calculate Discriminant: Δ = b² - 4ac = 49 - 24 = 25\nStep 3: √25 = 5\nStep 4: x₁ = (7 + 5) / 4 = 3,   x₂ = (7 - 5) / 4 = 1/2',
        color: '#334155',
        fontSize: 14,
        fontFamily: 'monospace',
        zIndex: 4,
      },
    ],
  },
];

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1E1E22] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Paper & Worksheet Templates</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pre-built interactive worksheets for school, geometry, and STEM</p>
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
        <div className="p-6 overflow-y-auto space-y-3 flex-1 thin-scrollbar">
          {WORKSHEET_TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  whiteboardSounds.playPopSound();
                  onApplyTemplate(tmpl.title, tmpl.background, tmpl.createObjects());
                  onClose();
                }}
                className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-[#7957F5] dark:hover:border-[#7957F5] bg-white dark:bg-white/[0.02] hover:bg-[#7957F5]/5 dark:hover:bg-[#7957F5]/10 transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 group-hover:bg-[#7957F5]/10 text-slate-700 dark:text-slate-300 group-hover:text-[#7957F5] flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#7957F5] dark:group-hover:text-white transition-colors">
                        {tmpl.title}
                      </h3>
                      {tmpl.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400">
                          {tmpl.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {tmpl.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 group-hover:bg-[#7957F5] group-hover:text-white text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0 transition-all">
                  <span>Open Sheet</span>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
