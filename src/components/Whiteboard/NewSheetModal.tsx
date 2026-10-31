import React, { useState } from 'react';
import {
  FileText,
  Grid,
  Moon,
  Sun,
  Layers,
  Compass,
  CircleDot,
  Hash,
  Divide,
  X,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { BackgroundType } from './types.ts';
import { whiteboardSounds } from './soundEffects.ts';

interface NewSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSheet: (name: string, background: BackgroundType) => void;
}

interface TemplateOption {
  type: BackgroundType;
  title: string;
  description: string;
  category: 'plain' | 'paper' | 'math' | 'document';
  icon: React.ElementType;
  previewBg: string;
  tag?: string;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  // Plain
  {
    type: 'plain-white',
    title: 'Plain White',
    description: 'Completely clean, white drawing surface with zero grids, lines or dots.',
    category: 'plain',
    icon: Sun,
    previewBg: 'bg-white border-2 border-slate-300 shadow-xs',
    tag: 'Essential',
  },
  {
    type: 'plain-dark',
    title: 'Plain Dark',
    description: 'Deep obsidian charcoal surface for low-light drawing and glowing ink.',
    category: 'plain',
    icon: Moon,
    previewBg: 'bg-[#161618] border-2 border-white/20',
  },
  {
    type: 'plain-transparent',
    title: 'Plain Transparent',
    description: 'Checkerboard editor view. Exports as PNG with 100% transparent alpha channel.',
    category: 'plain',
    icon: Layers,
    previewBg: 'bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:8px_8px] bg-slate-100 border-2 border-slate-300',
    tag: 'Transparent PNG',
  },

  // Paper
  {
    type: 'ruled',
    title: 'Ruled Paper',
    description: 'Standard horizontal notebook lines with a red left margin line.',
    category: 'paper',
    icon: FileText,
    previewBg: 'bg-white [background:repeating-linear-gradient(transparent,transparent_7px,#E2E8F0_8px)] border-2 border-slate-300',
  },
  {
    type: 'grid',
    title: 'Square Grid',
    description: 'Mathematical graph paper with minor sub-divisions and major grid lines.',
    category: 'paper',
    icon: Grid,
    previewBg: 'bg-white [background:linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] [background-size:10px_10px] border-2 border-slate-300',
  },
  {
    type: 'dotted',
    title: 'Dotted Paper',
    description: 'Subtle dot grid for bullet sketching, diagrams, and flexible wireframing.',
    category: 'paper',
    icon: CircleDot,
    previewBg: 'bg-white [background:radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:10px_10px] border-2 border-slate-300',
  },
  {
    type: 'isometric',
    title: 'Isometric Grid',
    description: '60-degree triangular grid for 3D engineering sketches and polyhedra.',
    category: 'paper',
    icon: Compass,
    previewBg: 'bg-white border-2 border-slate-300',
  },

  // Math
  {
    type: 'coordinate',
    title: 'Coordinate Graph',
    description: 'Cartesian X and Y axes centered with integer numbers and tick marks.',
    category: 'math',
    icon: Hash,
    previewBg: 'bg-white border-2 border-indigo-200',
    tag: 'STEM',
  },
  {
    type: 'polar',
    title: 'Polar Graph',
    description: 'Concentric radius circles with radial angle spokes for trigonometry.',
    category: 'math',
    icon: CircleDot,
    previewBg: 'bg-white border-2 border-indigo-200',
  },
  {
    type: 'fraction',
    title: 'Fraction Grid',
    description: 'Visual fraction wall rows from 1/1 to 1/12 for proportional math.',
    category: 'math',
    icon: Divide,
    previewBg: 'bg-white border-2 border-purple-200',
  },
  {
    type: 'number-line',
    title: 'Number Line',
    description: 'Centered directional number axis with integer positions from -10 to +10.',
    category: 'math',
    icon: Hash,
    previewBg: 'bg-white border-2 border-blue-200',
  },

  // Document
  {
    type: 'a4-portrait',
    title: 'A4 Portrait',
    description: 'Fixed 210 × 297mm standard page layout with boundary drop-shadow.',
    category: 'document',
    icon: FileText,
    previewBg: 'bg-slate-200 border-2 border-slate-400',
    tag: 'Print Ready',
  },
  {
    type: 'a4-landscape',
    title: 'A4 Landscape',
    description: 'Horizontal A4 presentation sheet for wide diagrams and proofs.',
    category: 'document',
    icon: Maximize2,
    previewBg: 'bg-slate-200 border-2 border-slate-400',
  },
];

export const NewSheetModal: React.FC<NewSheetModalProps> = ({
  isOpen,
  onClose,
  onCreateSheet,
}) => {
  const [sheetName, setSheetName] = useState<string>('New Sheet');
  const [selectedType, setSelectedType] = useState<BackgroundType>('plain-white');
  const [activeCategory, setActiveCategory] = useState<'all' | 'plain' | 'paper' | 'math' | 'document'>('all');

  if (!isOpen) return null;

  const filteredOptions = TEMPLATE_OPTIONS.filter((opt) =>
    activeCategory === 'all' ? true : opt.category === activeCategory
  );

  const handleCreate = () => {
    whiteboardSounds.playPopSound();
    onCreateSheet(sheetName.trim() || 'Untitled Sheet', selectedType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1E1E22] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#7957F5]/10 dark:bg-[#7957F5]/20 text-[#7957F5] dark:text-[#D94BCB] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">New Whiteboard Sheet</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Choose a clean paper surface or mathematical template</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 thin-scrollbar">
          {/* Sheet Name Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Sheet Title
            </label>
            <input
              type="text"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              placeholder="e.g. Geometry Proofs, Scratchpad 1..."
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7957F5]/40"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Templates' },
              { id: 'plain', label: 'Plain Canvas' },
              { id: 'paper', label: 'Ruled & Grids' },
              { id: 'math', label: 'Mathematics' },
              { id: 'document', label: 'Print & A4' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#7957F5] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredOptions.map((opt) => {
              const isSelected = selectedType === opt.type;
              const Icon = opt.icon;

              return (
                <div
                  key={opt.type}
                  onClick={() => {
                    setSelectedType(opt.type);
                    whiteboardSounds.playTapSound();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative text-left flex flex-col justify-between h-32 ${
                    isSelected
                      ? 'border-[#7957F5] bg-[#7957F5]/5 dark:bg-[#7957F5]/10 ring-2 ring-[#7957F5]/20 shadow-sm'
                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${opt.previewBg}`}>
                        <Icon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {opt.title}
                      </span>
                    </div>
                    {opt.tag && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-[#7957F5]/10 text-[#7957F5] dark:text-[#D94BCB]">
                        {opt.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Create Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
