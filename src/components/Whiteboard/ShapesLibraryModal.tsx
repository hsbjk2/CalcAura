import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Search,
  Sparkles,
  Layers,
  Box,
  Compass,
  ArrowRight,
  Plus,
  Check,
} from 'lucide-react';
import { ShapeType } from './types.ts';
import { whiteboardSounds } from './soundEffects.ts';

interface ShapesLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeShape: ShapeType;
  onSelectShape: (shape: ShapeType) => void;
  onInsertShape: (shape: ShapeType) => void;
}

interface ShapeItem {
  id: ShapeType;
  name: string;
  category: '2D Geometry' | 'Polygons & Stars' | '3D STEM' | 'Lines & Arrows';
  description: string;
  svgPreview: React.ReactNode;
}

const SHAPES_CATALOG: ShapeItem[] = [
  // 1. 2D Geometry
  {
    id: 'rect',
    name: 'Square / Rectangle',
    category: '2D Geometry',
    description: 'Quadrilateral with 4 right angles and parallel opposite sides.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <rect x="8" y="10" width="32" height="28" rx="4" />
      </svg>
    ),
  },
  {
    id: 'circle',
    name: 'Circle',
    category: '2D Geometry',
    description: 'Set of all points in a plane at a constant distance r from the center.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <circle cx="24" cy="24" r="16" />
      </svg>
    ),
  },
  {
    id: 'ellipse',
    name: 'Ellipse / Oval',
    category: '2D Geometry',
    description: 'Smooth closed curve with two foci and unequal semi-major & semi-minor axes.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <ellipse cx="24" cy="24" rx="18" ry="12" />
      </svg>
    ),
  },
  {
    id: 'triangle',
    name: 'Equilateral Triangle',
    category: '2D Geometry',
    description: '3 equal sides and three 60° interior angles summing to 180°.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="24,8 40,38 8,38" />
      </svg>
    ),
  },
  {
    id: 'right-triangle',
    name: 'Right-Angled Triangle',
    category: '2D Geometry',
    description: 'Triangle containing a 90° right angle; satisfies Pythagorean theorem a² + b² = c².',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="10,8 10,38 40,38" />
        <polyline points="10,30 18,30 18,38" strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    id: 'diamond',
    name: 'Diamond / Rhombus',
    category: '2D Geometry',
    description: 'Parallelogram with four equal-length sides and perpendicular bisecting diagonals.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="24,6 40,24 24,42 8,24" />
      </svg>
    ),
  },
  {
    id: 'parallelogram',
    name: 'Parallelogram',
    category: '2D Geometry',
    description: 'Four-sided plane rectilinear figure having opposite sides parallel.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="14,12 42,12 34,36 6,36" />
      </svg>
    ),
  },
  {
    id: 'trapezoid',
    name: 'Trapezoid',
    category: '2D Geometry',
    description: 'Quadrilateral with at least one pair of parallel sides (bases).',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="14,12 34,12 42,36 6,36" />
      </svg>
    ),
  },

  // 2. Polygons & Stars
  {
    id: 'pentagon',
    name: 'Regular Pentagon',
    category: 'Polygons & Stars',
    description: '5-sided regular polygon with 108° interior angles.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="24,6 42,19 35,40 13,40 6,19" />
      </svg>
    ),
  },
  {
    id: 'hexagon',
    name: 'Regular Hexagon',
    category: 'Polygons & Stars',
    description: '6-sided honeycomb polygon with 120° interior angles.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="24,7 40,16 40,32 24,41 8,32 8,16" />
      </svg>
    ),
  },
  {
    id: 'octagon',
    name: 'Regular Octagon',
    category: 'Polygons & Stars',
    description: '8-sided polygon with 135° interior angles; ideal for stop signs & geometry proofs.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="16,8 32,8 40,16 40,32 32,40 16,40 8,32 8,16" />
      </svg>
    ),
  },
  {
    id: 'star',
    name: '5-Point Star',
    category: 'Polygons & Stars',
    description: 'Classic 5-point star with golden ratio proportioned vertices.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="24,6 29,18 42,19 32,28 35,41 24,34 13,41 16,28 6,19 19,18" />
      </svg>
    ),
  },
  {
    id: 'star-4',
    name: '4-Point Sparkle Star',
    category: 'Polygons & Stars',
    description: 'Geometric diamond sparkle star for emphasis and highlights.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <polygon points="24,6 28,20 42,24 28,28 24,42 20,28 6,24 20,20" />
      </svg>
    ),
  },
  {
    id: 'heart',
    name: 'Heart',
    category: 'Polygons & Stars',
    description: 'Symmetric cardioid heart curve for visual annotations.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2.5">
        <path d="M24,40 C24,40 7,29 7,17 C7,10 13,6 18,9 C21,11 24,15 24,15 C24,15 27,11 30,9 C35,6 41,10 41,17 C41,29 24,40 24,40 Z" />
      </svg>
    ),
  },

  // 3. 3D STEM Shapes
  {
    id: 'cube',
    name: '3D Isometric Cube',
    category: '3D STEM',
    description: '3D hexahedron box with visible parallel isometric edges and perspective.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2">
        <rect x="8" y="16" width="22" height="22" rx="1" />
        <polygon points="30,16 38,10 38,32 30,38" />
        <polygon points="8,16 16,10 38,10 30,16" />
      </svg>
    ),
  },
  {
    id: 'cylinder',
    name: '3D Cylinder',
    category: '3D STEM',
    description: 'Circular cylindrical solid with two congruent parallel bases.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2">
        <ellipse cx="24" cy="12" rx="14" ry="5" />
        <path d="M10,12 L10,34 C10,37 16,39 24,39 C32,39 38,37 38,34 L38,12" />
      </svg>
    ),
  },
  {
    id: 'cone',
    name: '3D Cone',
    category: '3D STEM',
    description: 'Three-dimensional geometric shape that tapers smoothly from a base to an apex point.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2">
        <path d="M24,8 L10,34 C10,37 16,40 24,40 C32,40 38,37 38,34 Z" />
      </svg>
    ),
  },
  {
    id: 'coordinate-axes',
    name: 'Cartesian X-Y Coordinate Axes',
    category: '3D STEM',
    description: 'Perpendicular Cartesian axes with directional arrows and origin point.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
        <line x1="6" y1="24" x2="42" y2="24" />
        <polyline points="36,20 42,24 36,28" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="24" y1="42" x2="24" y2="6" />
        <polyline points="20,12 24,6 28,12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },

  // 4. Lines & Arrows
  {
    id: 'speech-bubble',
    name: 'Speech Bubble Callout',
    category: 'Lines & Arrows',
    description: 'Annotation callout bubble with speech pointer tail for mathematical explanations.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current fill-current/15" strokeWidth="2">
        <path d="M8,12 C8,8.7 10.7,6 14,6 L34,6 C37.3,6 40,8.7 40,12 L40,28 C40,31.3 37.3,34 34,34 L20,34 L12,41 L14,34 L14,34 C10.7,34 8,31.3 8,28 Z" />
      </svg>
    ),
  },
  {
    id: 'line',
    name: 'Straight Line Segment',
    category: 'Lines & Arrows',
    description: 'Straight 1D path connecting two endpoints.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current" strokeWidth="3">
        <line x1="8" y1="36" x2="40" y2="12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'arrow',
    name: 'Directional Arrow',
    category: 'Lines & Arrows',
    description: 'Vector ray indicating direction or causal flow.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current" strokeWidth="2.5">
        <line x1="8" y1="24" x2="38" y2="24" strokeLinecap="round" />
        <polyline points="28,16 38,24 28,32" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'double-arrow',
    name: 'Bidirectional Arrow',
    category: 'Lines & Arrows',
    description: 'Dimension line or bidirectional relationship arrow.',
    svgPreview: (
      <svg viewBox="0 0 48 48" className="w-full h-full stroke-current" strokeWidth="2.5">
        <line x1="12" y1="24" x2="36" y2="24" strokeLinecap="round" />
        <polyline points="18,17 10,24 18,31" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="30,17 38,24 30,31" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export const ShapesLibraryModal: React.FC<ShapesLibraryModalProps> = ({
  isOpen,
  onClose,
  activeShape,
  onSelectShape,
  onInsertShape,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', '2D Geometry', 'Polygons & Stars', '3D STEM', 'Lines & Arrows'];

  const filteredShapes = useMemo(() => {
    return SHAPES_CATALOG.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-[#18181D] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7957F5]/10 text-[#7957F5] dark:text-[#D94BCB] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                Shapes Library
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7957F5]/15 text-[#7957F5] dark:text-[#D94BCB] font-mono font-semibold">
                  {SHAPES_CATALOG.length} shapes
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a shape to draw on canvas or insert directly at the center
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              whiteboardSounds.playTapSound();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-white/10 space-y-3 bg-white dark:bg-[#18181D]">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shapes (e.g. triangle, cylinder, star, axes)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7957F5]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto thin-scrollbar pb-0.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    whiteboardSounds.playTapSound();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white shadow-xs font-bold scale-[1.02]'
                      : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/[0.08]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Shapes Grid */}
        <div className="flex-1 overflow-y-auto thin-scrollbar p-4 sm:p-5">
          {filteredShapes.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Compass className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-sm font-medium">No shapes found matching &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#7957F5] hover:underline cursor-pointer"
              >
                Clear search query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredShapes.map((shape) => {
                const isCurrent = activeShape === shape.id;
                return (
                  <div
                    key={shape.id}
                    onClick={() => {
                      onInsertShape(shape.id);
                      onClose();
                      whiteboardSounds.playPopSound();
                    }}
                    className={`group relative p-3 rounded-2xl border transition-all flex flex-col items-center justify-between text-center cursor-pointer ${
                      isCurrent
                        ? 'border-[#7957F5] bg-[#7957F5]/5 dark:bg-[#7957F5]/10 shadow-md shadow-[#7957F5]/10'
                        : 'border-slate-200/80 dark:border-white/10 hover:border-[#7957F5]/50 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    {/* SVG Shape Icon Box */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center p-2 text-[#7957F5] dark:text-[#D94BCB] group-hover:scale-110 transition-transform pointer-events-none"
                      title={`Insert ${shape.name}`}
                    >
                      {shape.svgPreview}
                    </div>

                    {/* Shape Info */}
                    <div
                      className="mt-1.5 w-full pointer-events-none"
                      title={`Insert ${shape.name}`}
                    >
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#7957F5] transition-colors">
                        {shape.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {shape.category}
                      </div>
                    </div>

                    {/* Action Buttons: Insert (Primary) & Draw (Custom size) */}
                    <div className="mt-2.5 w-full flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onInsertShape(shape.id);
                          onClose();
                          whiteboardSounds.playPopSound();
                        }}
                        className="flex-1 py-1 px-2 rounded-lg text-[10px] font-bold bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-95 text-white transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1"
                        title="Insert directly into center of whiteboard"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Insert</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onSelectShape(shape.id);
                          onClose();
                          whiteboardSounds.playTapSound();
                        }}
                        className={`py-1 px-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#7957F5] text-white shadow-xs'
                            : 'bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20'
                        }`}
                        title="Select tool to drag-draw with custom size"
                      >
                        Draw
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info tip */}
        <div className="p-3 bg-slate-100 dark:bg-white/[0.03] border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>
            Tip: Click <strong>Insert</strong> to place shape at screen center, or <strong>Draw</strong> to drag-draw on canvas.
          </span>
          <button
            onClick={() => {
              whiteboardSounds.playTapSound();
              onClose();
            }}
            className="px-3 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
