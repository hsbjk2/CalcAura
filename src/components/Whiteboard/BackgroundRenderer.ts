import { BackgroundType } from './types.ts';

export interface BackgroundRenderOptions {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  zoom: number;
  pan: { x: number; y: number };
  background: BackgroundType;
  isExporting?: boolean;
  isTransparentExport?: boolean;
}

export function renderWhiteboardBackground(options: BackgroundRenderOptions) {
  const { ctx, width, height, zoom, pan, background, isExporting, isTransparentExport } = options;

  ctx.save();

  // 1. Plain Transparent
  if (background === 'plain-transparent') {
    if (isTransparentExport) {
      ctx.clearRect(0, 0, width, height);
      ctx.restore();
      return;
    }
    // Editor checkerboard to visualize transparency
    ctx.clearRect(0, 0, width, height);
    const checkSize = 16 * zoom;
    const cols = Math.ceil(width / checkSize) + 1;
    const rows = Math.ceil(height / checkSize) + 1;
    const offsetX = (pan.x % checkSize + checkSize) % checkSize;
    const offsetY = (pan.y % checkSize + checkSize) % checkSize;

    for (let r = -1; r < rows; r++) {
      for (let c = -1; c < cols; c++) {
        const isDark = (r + c) % 2 === 0;
        ctx.fillStyle = isDark ? '#F1F3F5' : '#FFFFFF';
        ctx.fillRect(offsetX + c * checkSize, offsetY + r * checkSize, checkSize, checkSize);
      }
    }
    ctx.restore();
    return;
  }

  // 2. Plain Dark
  if (background === 'plain-dark') {
    ctx.fillStyle = '#161618';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    return;
  }

  // 3. Plain White (completely clean white surface with zero markings)
  if (background === 'plain-white') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    return;
  }

  // Base background fill for paper types
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // 4. Ruled Paper
  if (background === 'ruled') {
    const lineSpacing = 32 * zoom;
    const startY = (pan.y % lineSpacing + lineSpacing) % lineSpacing;

    // Soft blue horizontal lines
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let y = startY; y < height; y += lineSpacing) {
      ctx.moveTo(0, Math.floor(y) + 0.5);
      ctx.lineTo(width, Math.floor(y) + 0.5);
    }
    ctx.stroke();

    // Red left margin line (at 80px * zoom + pan.x)
    const marginX = 80 * zoom + pan.x;
    if (marginX >= 0 && marginX <= width) {
      ctx.strokeStyle = '#FCA5A5';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.floor(marginX) + 0.5, 0);
      ctx.lineTo(Math.floor(marginX) + 0.5, height);
      ctx.stroke();
    }
  }

  // 5. Square Grid (Math Graph Paper)
  else if (background === 'grid') {
    const subStep = 10 * zoom;
    const majorStep = 50 * zoom;
    const startX = (pan.x % subStep + subStep) % subStep;
    const startY = (pan.y % subStep + subStep) % subStep;

    // Minor lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    for (let x = startX; x < width; x += subStep) {
      ctx.moveTo(Math.floor(x) + 0.5, 0);
      ctx.lineTo(Math.floor(x) + 0.5, height);
    }
    for (let y = startY; y < height; y += subStep) {
      ctx.moveTo(0, Math.floor(y) + 0.5);
      ctx.lineTo(width, Math.floor(y) + 0.5);
    }
    ctx.stroke();

    // Major lines
    const startMajorX = (pan.x % majorStep + majorStep) % majorStep;
    const startMajorY = (pan.y % majorStep + majorStep) % majorStep;
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    for (let x = startMajorX; x < width; x += majorStep) {
      ctx.moveTo(Math.floor(x) + 0.5, 0);
      ctx.lineTo(Math.floor(x) + 0.5, height);
    }
    for (let y = startMajorY; y < height; y += majorStep) {
      ctx.moveTo(0, Math.floor(y) + 0.5);
      ctx.lineTo(width, Math.floor(y) + 0.5);
    }
    ctx.stroke();
  }

  // 6. Dotted Paper
  else if (background === 'dotted') {
    const dotSpacing = 24 * zoom;
    const startX = (pan.x % dotSpacing + dotSpacing) % dotSpacing;
    const startY = (pan.y % dotSpacing + dotSpacing) % dotSpacing;

    ctx.fillStyle = '#94A3B8';
    for (let x = startX; x < width; x += dotSpacing) {
      for (let y = startY; y < height; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // 7. Isometric Grid (60 degree triangles)
  else if (background === 'isometric') {
    const isoSize = 30 * zoom;
    const h = isoSize * Math.sin(Math.PI / 3);
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;

    // Horizontal lines
    const startY = (pan.y % h + h) % h;
    ctx.beginPath();
    for (let y = startY; y < height; y += h) {
      ctx.moveTo(0, Math.floor(y) + 0.5);
      ctx.lineTo(width, Math.floor(y) + 0.5);
    }
    ctx.stroke();

    // Diagonal lines +60 and -60
    ctx.beginPath();
    for (let x = -width; x < width * 2; x += isoSize) {
      ctx.moveTo(x + pan.x, 0);
      ctx.lineTo(x + pan.x + height / Math.tan(Math.PI / 3), height);

      ctx.moveTo(x + pan.x, 0);
      ctx.lineTo(x + pan.x - height / Math.tan(Math.PI / 3), height);
    }
    ctx.stroke();
  }

  // 8. Coordinate Graph (Cartesian X and Y axes with numbers)
  else if (background === 'coordinate') {
    const originX = width / 2 + pan.x;
    const originY = height / 2 + pan.y;
    const unitStep = 40 * zoom;

    // Sub-grid
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = originX % unitStep; x < width; x += unitStep) {
      ctx.moveTo(Math.floor(x) + 0.5, 0);
      ctx.lineTo(Math.floor(x) + 0.5, height);
    }
    for (let y = originY % unitStep; y < height; y += unitStep) {
      ctx.moveTo(0, Math.floor(y) + 0.5);
      ctx.lineTo(width, Math.floor(y) + 0.5);
    }
    ctx.stroke();

    // Primary Axes (X and Y)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // X axis
    ctx.moveTo(0, Math.floor(originY) + 0.5);
    ctx.lineTo(width, Math.floor(originY) + 0.5);
    // Y axis
    ctx.moveTo(Math.floor(originX) + 0.5, 0);
    ctx.lineTo(Math.floor(originX) + 0.5, height);
    ctx.stroke();

    // Arrowheads
    ctx.fillStyle = '#334155';
    // X arrow right
    ctx.beginPath();
    ctx.moveTo(width - 8, originY - 4);
    ctx.lineTo(width, originY);
    ctx.lineTo(width - 8, originY + 4);
    ctx.fill();
    // Y arrow top
    ctx.beginPath();
    ctx.moveTo(originX - 4, 8);
    ctx.lineTo(originX, 0);
    ctx.lineTo(originX + 4, 8);
    ctx.fill();

    // Tick marks and integer labels
    ctx.font = '10px monospace';
    ctx.fillStyle = '#64748B';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const maxUnitsX = Math.ceil(width / unitStep / 2) + 2;
    for (let i = -maxUnitsX; i <= maxUnitsX; i++) {
      if (i === 0) continue;
      const x = originX + i * unitStep;
      if (x >= 0 && x <= width) {
        ctx.beginPath();
        ctx.moveTo(x, originY - 3);
        ctx.lineTo(x, originY + 3);
        ctx.stroke();
        ctx.fillText(i.toString(), x, originY + 5);
      }
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const maxUnitsY = Math.ceil(height / unitStep / 2) + 2;
    for (let i = -maxUnitsY; i <= maxUnitsY; i++) {
      if (i === 0) continue;
      const y = originY - i * unitStep; // math Y is upward
      if (y >= 0 && y <= height) {
        ctx.beginPath();
        ctx.moveTo(originX - 3, y);
        ctx.lineTo(originX + 3, y);
        ctx.stroke();
        ctx.fillText(i.toString(), originX - 6, y);
      }
    }

    // Origin label '0'
    ctx.fillText('0', originX - 6, originY + 6);
  }

  // 9. Polar Graph (Concentric circles with degree spokes)
  else if (background === 'polar') {
    const originX = width / 2 + pan.x;
    const originY = height / 2 + pan.y;
    const ringStep = 40 * zoom;
    const maxR = Math.hypot(width, height);

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;

    // Rings
    for (let r = ringStep; r < maxR; r += ringStep) {
      ctx.beginPath();
      ctx.arc(originX, originY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Degree spokes (every 30 degrees, plus 45s)
    const angles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
    angles.forEach((deg) => {
      const rad = (deg * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + Math.cos(rad) * maxR, originY + Math.sin(rad) * maxR);
      ctx.stroke();
    });

    // Darker crosshairs
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(originX - maxR, originY);
    ctx.lineTo(originX + maxR, originY);
    ctx.moveTo(originX, originY - maxR);
    ctx.lineTo(originX, originY + maxR);
    ctx.stroke();
  }

  // 10. Number Line
  else if (background === 'number-line') {
    const midY = height / 2 + pan.y;
    const step = 50 * zoom;
    const originX = width / 2 + pan.x;

    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(20, midY);
    ctx.lineTo(width - 20, midY);
    ctx.stroke();

    // Arrows
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.moveTo(width - 20, midY - 6);
    ctx.lineTo(width - 8, midY);
    ctx.lineTo(width - 20, midY + 6);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(20, midY - 6);
    ctx.lineTo(8, midY);
    ctx.lineTo(20, midY + 6);
    ctx.fill();

    // Integer ticks
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const maxTicks = Math.ceil(width / step / 2) + 2;
    for (let i = -maxTicks; i <= maxTicks; i++) {
      const x = originX + i * step;
      if (x >= 24 && x <= width - 24) {
        ctx.beginPath();
        ctx.moveTo(x, midY - 8);
        ctx.lineTo(x, midY + 8);
        ctx.stroke();
        ctx.fillText(i.toString(), x, midY + 12);
      }
    }
  }

  // 11. Fraction Grid / Wall
  else if (background === 'fraction') {
    const fractions = [1, 2, 3, 4, 5, 6, 8, 10, 12];
    const rowHeight = 36 * zoom;
    const margin = 40 * zoom;
    const gridW = width - margin * 2;
    const startY = 60 * zoom + pan.y;

    fractions.forEach((den, rIdx) => {
      const y = startY + rIdx * (rowHeight + 8 * zoom);
      const segW = gridW / den;

      for (let c = 0; c < den; c++) {
        const x = margin + c * segW + pan.x;
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 1.5;
        ctx.fillStyle = (rIdx + c) % 2 === 0 ? '#F8FAFC' : '#FFFFFF';
        ctx.fillRect(x, y, segW, rowHeight);
        ctx.strokeRect(x, y, segW, rowHeight);

        // Label
        ctx.font = `${Math.max(10, 11 * zoom)}px sans-serif`;
        ctx.fillStyle = '#475569';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`1/${den}`, x + segW / 2, y + rowHeight / 2);
      }
    });
  }

  // 12. A4 Portrait / Landscape boundary box
  else if (background === 'a4-portrait' || background === 'a4-landscape') {
    const isPortrait = background === 'a4-portrait';
    const a4W = (isPortrait ? 794 : 1123) * zoom;
    const a4H = (isPortrait ? 1123 : 794) * zoom;
    const pageX = (width - a4W) / 2 + pan.x;
    const pageY = (height - a4H) / 2 + pan.y;

    // Surrounding desk tone
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(0, 0, width, height);

    // Page drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 24 * zoom;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8 * zoom;

    // Pure White Page
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(pageX, pageY, a4W, a4H);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Subtle page border
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.strokeRect(pageX, pageY, a4W, a4H);
  }

  ctx.restore();
}
