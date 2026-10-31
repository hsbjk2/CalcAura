import React from 'react';

export type BackgroundType =
  | 'plain-white'
  | 'plain-dark'
  | 'plain-transparent'
  | 'ruled'
  | 'grid'
  | 'dotted'
  | 'isometric'
  | 'coordinate'
  | 'polar'
  | 'geometry'
  | 'fraction'
  | 'number-line'
  | 'a4-portrait'
  | 'a4-landscape'
  | 'custom';

export type ToolType =
  | 'select'
  | 'pan'
  | 'pen'
  | 'pencil'
  | 'highlighter'
  | 'eraser'
  | 'line'
  | 'arrow'
  | 'double-arrow'
  | 'rect'
  | 'circle'
  | 'ellipse'
  | 'triangle'
  | 'right-triangle'
  | 'diamond'
  | 'star'
  | 'star-4'
  | 'pentagon'
  | 'hexagon'
  | 'octagon'
  | 'parallelogram'
  | 'trapezoid'
  | 'heart'
  | 'cube'
  | 'cylinder'
  | 'cone'
  | 'speech-bubble'
  | 'coordinate-axes'
  | 'text'
  | 'sticky'
  | 'math'
  | 'learning-object'
  | 'graph'
  | 'ruler'
  | 'protractor'
  | 'image';

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface DrawingPath {
  id: string;
  tool: 'pen' | 'pencil' | 'highlighter' | 'eraser';
  points: Point[];
  color: string;
  width: number;
  opacity: number;
  smoothed?: boolean;
  zIndex?: number;
}

export type ShapeType =
  | 'rect'
  | 'circle'
  | 'ellipse'
  | 'triangle'
  | 'right-triangle'
  | 'diamond'
  | 'star'
  | 'star-4'
  | 'pentagon'
  | 'hexagon'
  | 'octagon'
  | 'parallelogram'
  | 'trapezoid'
  | 'heart'
  | 'cube'
  | 'cylinder'
  | 'cone'
  | 'speech-bubble'
  | 'coordinate-axes'
  | 'line'
  | 'arrow'
  | 'double-arrow';

export interface BaseObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number; // degrees
  zIndex: number;
}

export interface ShapeObject extends BaseObject {
  type: 'shape';
  shapeType: ShapeType;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
}

export interface TextObject extends BaseObject {
  type: 'text';
  text: string;
  color: string;
  fontSize: number;
  fontFamily: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface StickerObject extends BaseObject {
  type: 'sticker';
  emoji: string;
  label?: string;
  category?: string;
}

export interface StickyObject extends BaseObject {
  type: 'sticky';
  text: string;
  bgColor: string;
  textColor: string;
  fontSize: number;
}

export interface MathObject extends BaseObject {
  type: 'math';
  latex: string;
  rawText?: string;
  color: string;
  fontSize: number;
  bgCard?: boolean;
}

export interface GraphObject extends BaseObject {
  type: 'graph';
  fnString: string;
  label?: string;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  strokeColor: string;
  showGrid?: boolean;
}

export interface VisualLearningObject extends BaseObject {
  type: 'visual-learning';
  emoji: string;
  label: string;
  category: 'fruits' | 'animals' | 'toys' | 'school' | 'math';
  quantity: number;
  groups?: number;
  itemsPerGroup?: number;
  equationCaption?: string;
}

export interface ImageObject extends BaseObject {
  type: 'image';
  src: string;
  aspectRatio: number;
}

export interface MeasurementToolObject extends BaseObject {
  type: 'measurement';
  subType: 'ruler' | 'protractor';
  angle?: number;
  lengthUnits?: number; // e.g. 15cm
}

export type CanvasObject =
  | ShapeObject
  | TextObject
  | StickerObject
  | StickyObject
  | MathObject
  | GraphObject
  | VisualLearningObject
  | ImageObject
  | MeasurementToolObject;

export interface Sheet {
  id: string;
  name: string;
  background: BackgroundType;
  width?: number; // for fixed sheets (e.g. A4: 794x1123 at 96dpi)
  height?: number;
  isInfinite?: boolean;
  paths: DrawingPath[];
  objects: CanvasObject[];
  zoom: number;
  pan: { x: number; y: number };
  thumbnail?: string;
  createdAt: number;
  updatedAt: number;
}

export type BoardType =
  | 'simple'
  | 'junior'
  | 'school'
  | 'secondary'
  | 'engineering'
  | 'geometry';

export interface BoardPreset {
  id: BoardType;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  defaultName: string;
  defaultBackground: BackgroundType;
  accentColor: string;
  gradient: string;
  suitableTools: string[];
}

export interface Notebook {
  id: string;
  name: string;
  boardType?: BoardType;
  description?: string;
  sheets: Sheet[];
  activeSheetId: string;
  createdAt: number;
  updatedAt: number;
}

export interface HistoryStep {
  paths: DrawingPath[];
  objects: CanvasObject[];
}
