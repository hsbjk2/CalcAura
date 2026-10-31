import React, { useState, useRef, useEffect } from 'react';
import {
  MousePointer,
  Hand,
  Pen,
  Pencil,
  Highlighter,
  Eraser,
  Square,
  Circle,
  Triangle,
  Star,
  Minus,
  ArrowRight,
  MoveHorizontal,
  Type,
  Image as ImageIcon,
  Smile,
  Hexagon,
} from 'lucide-react';
import { ToolType, ShapeType } from './types.ts';
import { whiteboardSounds } from './soundEffects.ts';
import { ShapesLibraryModal } from './ShapesLibraryModal.tsx';

export interface LeftToolbarProps {
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  activeShape: ShapeType;
  onSelectShape: (shape: ShapeType) => void;
  onOpenImageUpload: () => void;
  onOpenStickerModal: () => void;
  onInsertShape?: (shape: ShapeType) => void;
  className?: string;
}

const SHAPE_TOOLS = [
  'rect',
  'circle',
  'ellipse',
  'triangle',
  'right-triangle',
  'star',
  'star-4',
  'diamond',
  'pentagon',
  'hexagon',
  'octagon',
  'parallelogram',
  'trapezoid',
  'heart',
  'cube',
  'cylinder',
  'cone',
  'speech-bubble',
  'coordinate-axes',
  'line',
  'arrow',
  'double-arrow',
];

/**
 * Desktop & Tablet Vertical Sidebar Toolbar
 */
export const LeftToolbar: React.FC<LeftToolbarProps> = ({
  activeTool,
  onSelectTool,
  activeShape,
  onSelectShape,
  onOpenImageUpload,
  onOpenStickerModal,
  onInsertShape,
  className = '',
}) => {
  const [shapesMenuOpen, setShapesMenuOpen] = useState<boolean>(false);
  const shapesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (shapesMenuRef.current && !shapesMenuRef.current.contains(e.target as Node)) {
        setShapesMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutside);
    return () => window.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleToolClick = (tool: ToolType) => {
    whiteboardSounds.playTapSound();
    onSelectTool(tool);
    setShapesMenuOpen(false);
  };

  const isShapeActive = SHAPE_TOOLS.includes(activeTool);

  return (
    <aside
      className={`hidden md:flex w-12 lg:w-14 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md border-r border-slate-200 dark:border-white/10 py-3 flex-col items-center gap-1.5 shrink-0 z-30 select-none overflow-y-auto thin-scrollbar ${className}`}
    >
      {/* 1. Select / Pointer */}
      <button
        onClick={() => handleToolClick('select')}
        className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          activeTool === 'select'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Select & Move (V)"
        aria-label="Select Tool"
      >
        <MousePointer className="w-4 h-4" />
      </button>

      {/* 2. Hand / Pan */}
      <button
        onClick={() => handleToolClick('pan')}
        className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          activeTool === 'pan'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Pan Canvas (H)"
        aria-label="Pan Tool"
      >
        <Hand className="w-4 h-4" />
      </button>

      <div className="w-6 h-px bg-slate-200 dark:bg-white/10 my-0.5" />

      {/* 3. Pen */}
      <button
        onClick={() => handleToolClick('pen')}
        className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          activeTool === 'pen'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Smooth Pen (P)"
        aria-label="Pen Tool"
      >
        <Pen className="w-4 h-4" />
      </button>

      {/* 4. Pencil */}
      <button
        onClick={() => handleToolClick('pencil')}
        className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          activeTool === 'pencil'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Pencil"
        aria-label="Pencil Tool"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {/* 5. Highlighter */}
      <button
        onClick={() => handleToolClick('highlighter')}
        className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          activeTool === 'highlighter'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Translucent Highlighter"
        aria-label="Highlighter Tool"
      >
        <Highlighter className="w-4 h-4" />
      </button>

      {/* 6. Eraser */}
      <button
        onClick={() => handleToolClick('eraser')}
        className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          activeTool === 'eraser'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Eraser (E)"
        aria-label="Eraser Tool"
      >
        <Eraser className="w-4 h-4" />
      </button>

      <div className="w-6 h-px bg-slate-200 dark:bg-white/10 my-0.5" />

      {/* 7. Geometric Shapes Library */}
      <div className="relative" ref={shapesMenuRef}>
        <button
          onClick={() => {
            whiteboardSounds.playTapSound();
            setShapesMenuOpen(!shapesMenuOpen);
          }}
          className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative group ${
            isShapeActive
              ? 'bg-[#7957F5] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
          title="Shapes Library"
          aria-label="Shapes Library"
        >
          {activeShape === 'circle' || activeShape === 'ellipse' ? (
            <Circle className="w-4 h-4" />
          ) : activeShape === 'triangle' || activeShape === 'right-triangle' ? (
            <Triangle className="w-4 h-4" />
          ) : activeShape === 'star' || activeShape === 'star-4' ? (
            <Star className="w-4 h-4" />
          ) : activeShape === 'line' ? (
            <Minus className="w-4 h-4" />
          ) : activeShape === 'arrow' ? (
            <ArrowRight className="w-4 h-4" />
          ) : activeShape === 'double-arrow' ? (
            <MoveHorizontal className="w-4 h-4" />
          ) : activeShape === 'diamond' ||
            activeShape === 'pentagon' ||
            activeShape === 'hexagon' ||
            activeShape === 'octagon' ? (
            <Hexagon className="w-4 h-4" />
          ) : (
            <Square className="w-4 h-4" />
          )}
        </button>

        {/* Shapes Library Modal */}
        <ShapesLibraryModal
          isOpen={shapesMenuOpen}
          onClose={() => setShapesMenuOpen(false)}
          activeShape={activeShape}
          onSelectShape={(shape) => {
            onSelectShape(shape);
            onSelectTool(shape as ToolType);
          }}
          onInsertShape={(shape) => {
            onSelectShape(shape);
            if (onInsertShape) {
              onInsertShape(shape);
            } else {
              onSelectTool(shape as ToolType);
            }
          }}
        />
      </div>

      {/* 8. Text Tool */}
      <button
        onClick={() => handleToolClick('text')}
        className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          activeTool === 'text'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Text Box (T)"
        aria-label="Text Tool"
      >
        <Type className="w-4 h-4" />
      </button>

      <div className="w-6 h-px bg-slate-200 dark:bg-white/10 my-0.5" />

      {/* 9. Image Upload */}
      <button
        onClick={onOpenImageUpload}
        className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
        title="Insert Image (Upload PNG, JPG)"
        aria-label="Upload Image"
      >
        <ImageIcon className="w-4 h-4" />
      </button>

      {/* 10. Stickers & Emojis */}
      <button
        onClick={() => {
          whiteboardSounds.playTapSound();
          onOpenStickerModal();
        }}
        className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#7957F5]"
        title="Stickers & Emojis"
        aria-label="Stickers & Emojis"
      >
        <Smile className="w-4 h-4" />
      </button>
    </aside>
  );
};

/**
 * Mobile-Specific Horizontal Tool Strip (Shown below TopToolbar on screens < 768px)
 */
export const MobileToolStrip: React.FC<LeftToolbarProps> = ({
  activeTool,
  onSelectTool,
  activeShape,
  onSelectShape,
  onOpenImageUpload,
  onOpenStickerModal,
  onInsertShape,
  className = '',
}) => {
  const [shapesMenuOpen, setShapesMenuOpen] = useState<boolean>(false);

  const handleToolClick = (tool: ToolType) => {
    whiteboardSounds.playTapSound();
    onSelectTool(tool);
    setShapesMenuOpen(false);
  };

  const isShapeActive = SHAPE_TOOLS.includes(activeTool);

  return (
    <div
      className={`flex md:hidden h-12 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-2 items-center gap-1 overflow-x-auto thin-scrollbar shrink-0 z-30 select-none ${className}`}
    >
      {/* 1. Select */}
      <button
        onClick={() => handleToolClick('select')}
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
          activeTool === 'select'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Select"
        aria-label="Select Tool"
      >
        <MousePointer className="w-4 h-4" />
      </button>

      {/* 2. Pan */}
      <button
        onClick={() => handleToolClick('pan')}
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
          activeTool === 'pan'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Pan"
        aria-label="Pan Tool"
      >
        <Hand className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-0.5 shrink-0" />

      {/* 3. Pen */}
      <button
        onClick={() => handleToolClick('pen')}
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
          activeTool === 'pen'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Pen"
        aria-label="Pen Tool"
      >
        <Pen className="w-4 h-4" />
      </button>

      {/* 4. Pencil */}
      <button
        onClick={() => handleToolClick('pencil')}
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
          activeTool === 'pencil'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Pencil"
        aria-label="Pencil Tool"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {/* 5. Highlighter */}
      <button
        onClick={() => handleToolClick('highlighter')}
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
          activeTool === 'highlighter'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Highlighter"
        aria-label="Highlighter Tool"
      >
        <Highlighter className="w-4 h-4" />
      </button>

      {/* 6. Eraser */}
      <button
        onClick={() => handleToolClick('eraser')}
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
          activeTool === 'eraser'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Eraser"
        aria-label="Eraser Tool"
      >
        <Eraser className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-0.5 shrink-0" />

      {/* 7. Shapes */}
      <div className="relative shrink-0">
        <button
          onClick={() => {
            whiteboardSounds.playTapSound();
            setShapesMenuOpen(true);
          }}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isShapeActive
              ? 'bg-[#7957F5] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
          title="Shapes"
          aria-label="Shapes Library"
        >
          {activeShape === 'circle' || activeShape === 'ellipse' ? (
            <Circle className="w-4 h-4" />
          ) : activeShape === 'triangle' || activeShape === 'right-triangle' ? (
            <Triangle className="w-4 h-4" />
          ) : activeShape === 'star' || activeShape === 'star-4' ? (
            <Star className="w-4 h-4" />
          ) : activeShape === 'line' ? (
            <Minus className="w-4 h-4" />
          ) : activeShape === 'arrow' ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <Square className="w-4 h-4" />
          )}
        </button>

        <ShapesLibraryModal
          isOpen={shapesMenuOpen}
          onClose={() => setShapesMenuOpen(false)}
          activeShape={activeShape}
          onSelectShape={(shape) => {
            onSelectShape(shape);
            onSelectTool(shape as ToolType);
          }}
          onInsertShape={(shape) => {
            onSelectShape(shape);
            if (onInsertShape) {
              onInsertShape(shape);
            } else {
              onSelectTool(shape as ToolType);
            }
          }}
        />
      </div>

      {/* 8. Text */}
      <button
        onClick={() => handleToolClick('text')}
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
          activeTool === 'text'
            ? 'bg-[#7957F5] text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
        }`}
        title="Text"
        aria-label="Text Tool"
      >
        <Type className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-0.5 shrink-0" />

      {/* 9. Image Upload */}
      <button
        onClick={onOpenImageUpload}
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
        title="Image"
        aria-label="Upload Image"
      >
        <ImageIcon className="w-4 h-4" />
      </button>

      {/* 10. Stickers & Emojis */}
      <button
        onClick={() => {
          whiteboardSounds.playTapSound();
          onOpenStickerModal();
        }}
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
        title="Stickers & Emojis"
        aria-label="Stickers & Emojis"
      >
        <Smile className="w-4 h-4" />
      </button>
    </div>
  );
};
