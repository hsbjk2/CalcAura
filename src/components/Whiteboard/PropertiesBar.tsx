import React, { useState, useEffect, useRef } from 'react';
import {
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  RotateCw,
  RotateCcw,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  ChevronDown,
  ChevronUp,
  Check,
  Plus,
  Type,
  Eraser,
} from 'lucide-react';
import { CanvasObject, ToolType } from './types.ts';
import { whiteboardSounds } from './soundEffects.ts';

interface PropertiesBarProps {
  activeTool: ToolType;
  selectedObject: CanvasObject | null;
  strokeColor: string;
  onChangeStrokeColor: (color: string) => void;
  fillColor: string;
  onChangeFillColor: (color: string) => void;
  strokeWidth: number;
  onChangeStrokeWidth: (w: number) => void;
  eraserSize?: number;
  onChangeEraserSize?: (size: number) => void;
  onClearSheet?: () => void;
  onDuplicateSelected: () => void;
  onDeleteSelected: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onRotateSelected: (deltaDeg: number) => void;
  onUpdateSelectedProps: (props: Partial<CanvasObject>) => void;
}

const COLOR_PALETTE = [
  '#000000',
  '#475569',
  '#DC2626',
  '#EA580C',
  '#D97706',
  '#16A34A',
  '#0284C7',
  '#4F46E5',
  '#7C3AED',
  '#DB2777',
  '#FFFFFF',
];

const FILL_PALETTE = [
  { label: 'None', value: 'transparent' },
  { label: 'White', value: '#FFFFFF' },
  { label: 'Slate', value: 'rgba(71, 85, 105, 0.2)' },
  { label: 'Red', value: 'rgba(239, 68, 68, 0.2)' },
  { label: 'Orange', value: 'rgba(249, 115, 22, 0.2)' },
  { label: 'Amber', value: 'rgba(245, 158, 11, 0.2)' },
  { label: 'Green', value: 'rgba(34, 197, 94, 0.2)' },
  { label: 'Blue', value: 'rgba(14, 165, 233, 0.2)' },
  { label: 'Purple', value: 'rgba(121, 87, 245, 0.2)' },
];

const STROKE_WIDTHS = [1, 2, 4, 8, 14, 24];

const FONT_FAMILIES = [
  { label: 'Sans-Serif', value: 'sans-serif', desc: 'Modern Clean' },
  { label: 'Serif', value: 'Georgia, serif', desc: 'Editorial & Math' },
  { label: 'Monospace', value: 'monospace', desc: 'Code & Technical' },
  { label: 'Handwritten', value: '"Comic Sans MS", cursive', desc: 'Casual Sketch' },
];

const FONT_SIZES = [14, 18, 22, 28, 36, 48, 64];

export const PropertiesBar: React.FC<PropertiesBarProps> = ({
  activeTool,
  selectedObject,
  strokeColor,
  onChangeStrokeColor,
  fillColor,
  onChangeFillColor,
  strokeWidth,
  onChangeStrokeWidth,
  eraserSize = 36,
  onChangeEraserSize,
  onClearSheet,
  onDuplicateSelected,
  onDeleteSelected,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onRotateSelected,
  onUpdateSelectedProps,
}) => {
  const [fontFamilyMenuOpen, setFontFamilyMenuOpen] = useState(false);
  const [fontSizeMenuOpen, setFontSizeMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setFontFamilyMenuOpen(false);
        setFontSizeMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const isTextSelected = selectedObject?.type === 'text';
  const isShapeSelected = selectedObject?.type === 'shape';
  const isDrawingTool = ['pen', 'pencil', 'highlighter'].includes(activeTool);
  const isShapeTool = [
    'rect',
    'circle',
    'ellipse',
    'triangle',
    'star',
    'diamond',
    'line',
    'arrow',
    'double-arrow',
  ].includes(activeTool);

  const textObj = isTextSelected ? (selectedObject as any) : null;
  const shapeObj = isShapeSelected ? (selectedObject as any) : null;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={() => {
          whiteboardSounds.playTapSound();
          setIsCollapsed(false);
        }}
        className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 z-20 bg-white/90 dark:bg-[#1E1E22]/90 backdrop-blur-md border border-slate-200 dark:border-white/12 shadow-lg rounded-full px-3 py-1.5 flex items-center gap-2 text-xs select-none cursor-pointer hover:bg-slate-50 dark:hover:bg-[#25252A] transition-all"
        title="Expand tool properties"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-white/20 shrink-0"
          style={{ backgroundColor: activeTool === 'eraser' ? '#FFFFFF' : strokeColor }}
        />
        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 capitalize">
          {activeTool} {activeTool === 'eraser' ? `(${eraserSize}px)` : `(${strokeWidth}px)`}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>
    );
  }

  return (
    <div
      ref={barRef}
      className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 z-20 bg-white/95 dark:bg-[#1E1E22]/95 backdrop-blur-md border border-slate-200 dark:border-white/12 shadow-xl rounded-2xl px-2.5 sm:px-3 py-1.5 flex items-center gap-2 sm:gap-2.5 text-xs select-none max-w-[calc(100vw-16px)] sm:max-w-[92vw] overflow-x-auto thin-scrollbar animate-in fade-in"
    >
      {activeTool === 'eraser' ? (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Label & Active Size Display */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#7957F5]/10 text-[#7957F5] dark:text-[#D94BCB] font-bold text-xs shrink-0">
            <Eraser className="w-4 h-4" />
            <span className="font-semibold">Eraser Size</span>
            <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-white dark:bg-white/10 text-slate-800 dark:text-slate-100 shadow-2xs">
              {eraserSize}px
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 shrink-0" />

          {/* Quick Eraser Size Presets */}
          <div className="flex items-center gap-1 shrink-0">
            {[
              { label: 'Fine', size: 10 },
              { label: 'Small', size: 20 },
              { label: 'Medium', size: 36 },
              { label: 'Large', size: 60 },
              { label: 'Jumbo', size: 96 },
            ].map((p) => {
              const isSelected = Math.abs(eraserSize - p.size) <= 3;
              return (
                <button
                  key={p.size}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    whiteboardSounds.playTapSound();
                    if (onChangeEraserSize) onChangeEraserSize(p.size);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white shadow-xs font-bold scale-105'
                      : 'bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                  title={`${p.label} Eraser (${p.size}px)`}
                >
                  <span
                    className="rounded-full bg-current shrink-0"
                    style={{
                      width: Math.min(14, Math.max(3, p.size / 5)),
                      height: Math.min(14, Math.max(3, p.size / 5)),
                    }}
                  />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 shrink-0 hidden sm:block" />

          {/* Precision Slider to increase / decrease size */}
          <div className="items-center gap-2 shrink-0 hidden sm:flex">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Size</span>
            <input
              type="range"
              min="6"
              max="120"
              step="2"
              value={eraserSize}
              onChange={(e) => {
                if (onChangeEraserSize) onChangeEraserSize(Number(e.target.value));
              }}
              className="w-24 md:w-32 accent-[#7957F5] cursor-pointer h-1.5 bg-slate-200 dark:bg-white/20 rounded-lg"
              title={`Drag to adjust eraser size: ${eraserSize}px`}
            />
          </div>

          {/* Clear Board Shortcut */}
          {onClearSheet && (
            <>
              <div className="h-4 w-px bg-slate-200 dark:bg-white/10 shrink-0" />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (window.confirm('Clear all drawings on this sheet?')) {
                    whiteboardSounds.playPopSound();
                    onClearSheet();
                  }
                }}
                className="px-2.5 py-1 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                title="Clear all strokes on this sheet"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {/* 1. Color Palette (Stroke / Text Color) */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1 hidden sm:inline">
          {isTextSelected ? 'Text' : 'Color'}
        </span>
        {COLOR_PALETTE.map((c) => {
          const activeColor = isTextSelected
            ? textObj?.color || strokeColor
            : isShapeSelected
            ? shapeObj?.strokeColor || strokeColor
            : strokeColor;

          const isSelected = activeColor.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onChangeStrokeColor(c);
                if (isTextSelected) {
                  onUpdateSelectedProps({ color: c });
                } else if (isShapeSelected) {
                  onUpdateSelectedProps({ strokeColor: c });
                }
              }}
              style={{ backgroundColor: c }}
              className={`w-4.5 h-4.5 rounded-full border cursor-pointer transition-transform shrink-0 ${
                isSelected
                  ? 'ring-2 ring-[#7957F5] scale-110 border-white'
                  : 'border-slate-300 dark:border-white/20 hover:scale-105'
              }`}
              title={`Color: ${c}`}
            />
          );
        })}
      </div>

      {/* 2. Fill Color Palette (for shapes) */}
      {(isShapeSelected || isShapeTool) && (
        <>
          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 shrink-0" />
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1 hidden sm:inline">
              Fill
            </span>
            {FILL_PALETTE.map((f) => {
              const currentFill = isShapeSelected ? shapeObj?.fillColor : fillColor;
              const isSelected = currentFill === f.value;
              return (
                <button
                  key={f.label}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    whiteboardSounds.playTapSound();
                    onChangeFillColor(f.value);
                    if (isShapeSelected) {
                      onUpdateSelectedProps({ fillColor: f.value });
                    }
                  }}
                  className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center cursor-pointer transition-transform shrink-0 ${
                    isSelected
                      ? 'ring-2 ring-[#7957F5] scale-110 border-white'
                      : 'border-slate-300 dark:border-white/20 hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: f.value === 'transparent' ? 'transparent' : f.value,
                  }}
                  title={`Fill: ${f.label}`}
                >
                  {f.value === 'transparent' && (
                    <Minus className="w-3 h-3 text-red-500 rotate-45 stroke-2" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* 3. Stroke Width Selector */}
      {(isDrawingTool || isShapeTool || isShapeSelected) && (
        <>
          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 shrink-0" />
          <div className="flex items-center gap-1 shrink-0">
            {STROKE_WIDTHS.map((w) => {
              const activeW = isShapeSelected ? shapeObj?.strokeWidth : strokeWidth;
              const isSelected = activeW === w;
              return (
                <button
                  key={w}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    whiteboardSounds.playTapSound();
                    onChangeStrokeWidth(w);
                    if (isShapeSelected) {
                      onUpdateSelectedProps({ strokeWidth: w });
                    }
                  }}
                  className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center cursor-pointer transition-all shrink-0 ${
                    isSelected
                      ? 'bg-slate-200 dark:bg-white/20 font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                  title={`${w}px Thickness`}
                >
                  <div
                    style={{
                      width: Math.min(14, Math.max(2, w)),
                      height: Math.min(14, Math.max(2, w)),
                    }}
                    className="rounded-full bg-slate-800 dark:bg-slate-200"
                  />
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* 4. Complete Text Formatting Controls */}
      {isTextSelected && (
        <>
          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 shrink-0" />

          {/* Custom Font Family Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                setFontFamilyMenuOpen((prev) => !prev);
                setFontSizeMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 rounded-lg border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100 font-medium transition-colors cursor-pointer"
              title="Font Family"
            >
              <Type className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span
                className="truncate max-w-[85px]"
                style={{ fontFamily: textObj?.fontFamily || 'sans-serif' }}
              >
                {FONT_FAMILIES.find((f) => f.value === textObj?.fontFamily)?.label || 'Sans-Serif'}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform ${
                  fontFamilyMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {fontFamilyMenuOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#1E1E22] rounded-xl border border-slate-200 dark:border-white/12 shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100 space-y-1"
              >
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Font Family
                </div>
                {FONT_FAMILIES.map((f) => {
                  const isCurrent = (textObj?.fontFamily || 'sans-serif') === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        whiteboardSounds.playTapSound();
                        onUpdateSelectedProps({ fontFamily: f.value });
                        setFontFamilyMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#7957F5] text-white font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span style={{ fontFamily: f.value }} className="text-xs">
                          {f.label}
                        </span>
                        <span className={`text-[10px] ${isCurrent ? 'text-white/80' : 'text-slate-400'}`}>
                          {f.desc}
                        </span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Custom Font Size Selector & Stepper */}
          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-white/10 p-0.5 rounded-lg border border-slate-200 dark:border-white/10 shrink-0">
            {/* Decrease font size */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                const current = textObj?.fontSize || 22;
                const prevIdx = FONT_SIZES.findIndex((s) => s >= current) - 1;
                const nextSize = prevIdx >= 0 ? FONT_SIZES[prevIdx] : Math.max(12, current - 4);
                onUpdateSelectedProps({ fontSize: nextSize });
              }}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
              title="Decrease Font Size"
            >
              <Minus className="w-3 h-3" />
            </button>

            {/* Size Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  whiteboardSounds.playTapSound();
                  setFontSizeMenuOpen((prev) => !prev);
                  setFontFamilyMenuOpen(false);
                }}
                className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Font Size"
              >
                <span>{textObj?.fontSize || 22}px</span>
                <ChevronDown
                  className={`w-2.5 h-2.5 text-slate-400 transition-transform ${
                    fontSizeMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {fontSizeMenuOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-36 bg-white dark:bg-[#1E1E22] rounded-xl border border-slate-200 dark:border-white/12 shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                    Font Size
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-1">
                    {FONT_SIZES.map((s) => {
                      const isCurrent = (textObj?.fontSize || 22) === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            whiteboardSounds.playTapSound();
                            onUpdateSelectedProps({ fontSize: s });
                            setFontSizeMenuOpen(false);
                          }}
                          className={`py-1 px-1.5 rounded-md text-center font-mono text-xs transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#7957F5] text-white font-bold'
                              : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          {s}px
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Increase font size */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                const current = textObj?.fontSize || 22;
                const nextIdx = FONT_SIZES.findIndex((s) => s > current);
                const nextSize = nextIdx !== -1 ? FONT_SIZES[nextIdx] : current + 6;
                onUpdateSelectedProps({ fontSize: nextSize });
              }}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
              title="Increase Font Size"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Bold, Italic, Underline */}
          <div className="flex items-center gap-0.5 shrink-0 bg-slate-100 dark:bg-white/10 p-0.5 rounded-lg border border-slate-200 dark:border-white/10">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onUpdateSelectedProps({ bold: !textObj?.bold });
              }}
              className={`p-1 rounded cursor-pointer ${
                textObj?.bold
                  ? 'bg-[#7957F5] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onUpdateSelectedProps({ italic: !textObj?.italic });
              }}
              className={`p-1 rounded cursor-pointer ${
                textObj?.italic
                  ? 'bg-[#7957F5] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onUpdateSelectedProps({ underline: !textObj?.underline });
              }}
              className={`p-1 rounded cursor-pointer ${
                textObj?.underline
                  ? 'bg-[#7957F5] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
              title="Underline"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-0.5 shrink-0 bg-slate-100 dark:bg-white/10 p-0.5 rounded-lg border border-slate-200 dark:border-white/10">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onUpdateSelectedProps({ align: 'left' });
              }}
              className={`p-1 rounded cursor-pointer ${
                textObj?.align === 'left' || !textObj?.align
                  ? 'bg-[#7957F5] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
              title="Align Left"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onUpdateSelectedProps({ align: 'center' });
              }}
              className={`p-1 rounded cursor-pointer ${
                textObj?.align === 'center'
                  ? 'bg-[#7957F5] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
              title="Align Center"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onUpdateSelectedProps({ align: 'right' });
              }}
              className={`p-1 rounded cursor-pointer ${
                textObj?.align === 'right'
                  ? 'bg-[#7957F5] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
              title="Align Right"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}

      {/* 5. Object Layering, Rotation & Actions */}
      {selectedObject && (
        <>
          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 shrink-0" />
          <div className="flex items-center gap-0.5 shrink-0 bg-slate-100 dark:bg-white/10 p-0.5 rounded-lg border border-slate-200 dark:border-white/10">
            {/* Bring to Front (Top) */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onBringToFront();
              }}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15 active:scale-90 active:bg-[#7957F5]/20 transition-all cursor-pointer"
              title="Bring to Front (top layer)"
            >
              <ChevronsUp className="w-3.5 h-3.5" />
            </button>

            {/* Bring Forward (Up) */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onBringForward();
              }}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15 active:scale-90 active:bg-[#7957F5]/20 transition-all cursor-pointer"
              title="Bring Forward (up one layer)"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            {/* Send Backward (Down) */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onSendBackward();
              }}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15 active:scale-90 active:bg-[#7957F5]/20 transition-all cursor-pointer"
              title="Send Backward (down one layer)"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            {/* Send to Back (Bottom) */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onSendToBack();
              }}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15 active:scale-90 active:bg-[#7957F5]/20 transition-all cursor-pointer"
              title="Send to Back (bottom layer)"
            >
              <ChevronsDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Rotate Left / Right */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onRotateSelected(-15);
              }}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
              title="Rotate Left (-15°)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                whiteboardSounds.playTapSound();
                onRotateSelected(15);
              }}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
              title="Rotate Right (+15°)"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Duplicate */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={onDuplicateSelected}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
              title="Duplicate (Ctrl+D)"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            {/* Delete */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={onDeleteSelected}
              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 active:scale-90 transition-all cursor-pointer"
              title="Delete (Delete / Backspace)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
        </>
      )}

      {/* Collapse button for mobile and clean canvas mode */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          whiteboardSounds.playTapSound();
          setIsCollapsed(true);
        }}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors ml-auto shrink-0 cursor-pointer"
        title="Minimize properties bar"
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
