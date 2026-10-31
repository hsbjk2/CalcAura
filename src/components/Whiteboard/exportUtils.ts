import { Sheet, Notebook, CanvasObject, DrawingPath } from './types.ts';
import { renderWhiteboardBackground } from './BackgroundRenderer.ts';

// Helper to translate common LaTeX tokens into crisp readable mathematical notation for 2D Canvas rendering
export function formatLatexForCanvas(latex: string): string {
  if (!latex) return '';
  let str = latex;
  str = str.replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, '∫_{$1}^{$2} ');
  str = str.replace(/\\int/g, '∫');
  str = str.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, '∑_{$1}^{$2} ');
  str = str.replace(/\\sum/g, '∑');
  str = str.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)');
  str = str.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  str = str.replace(/\\sqrt/g, '√');
  str = str.replace(/\\pm/g, '±');
  str = str.replace(/\\times/g, '×');
  str = str.replace(/\\div/g, '÷');
  str = str.replace(/\\cdot/g, '·');
  str = str.replace(/\\pi/g, 'π');
  str = str.replace(/\\theta/g, 'θ');
  str = str.replace(/\\alpha/g, 'α');
  str = str.replace(/\\beta/g, 'β');
  str = str.replace(/\\lambda/g, 'λ');
  str = str.replace(/\\Delta/g, 'Δ');
  str = str.replace(/\\infty/g, '∞');
  str = str.replace(/\\sin/g, 'sin');
  str = str.replace(/\\cos/g, 'cos');
  str = str.replace(/\\tan/g, 'tan');
  str = str.replace(/\\log/g, 'log');
  str = str.replace(/\\ln/g, 'ln');
  str = str.replace(/\\,/g, ' ');
  str = str.replace(/\\ /g, ' ');
  str = str.replace(/\\;/g, ' ');
  str = str.replace(/\\quad/g, '  ');
  str = str.replace(/\\left\(/g, '(');
  str = str.replace(/\\right\)/g, ')');
  str = str.replace(/\\left\[/g, '[');
  str = str.replace(/\\right\]/g, ']');
  str = str.replace(/\^2/g, '²');
  str = str.replace(/\^3/g, '³');
  str = str.replace(/_0/g, '₀');
  str = str.replace(/_1/g, '₁');
  str = str.replace(/_2/g, '₂');
  str = str.replace(/_\{0\}/g, '₀');
  str = str.replace(/_\{1\}/g, '₁');
  str = str.replace(/\^\{2\}/g, '²');
  str = str.replace(/\{|\}/g, '');
  str = str.replace(/\\/g, '');
  return str.trim();
}

// Render full sheet onto an offscreen canvas
export function renderSheetToCanvas(
  sheet: Sheet,
  options: {
    scale?: number;
    isTransparentExport?: boolean;
    includeBackground?: boolean;
  } = {}
): HTMLCanvasElement {
  const scale = options.scale || 2; // high-res by default
  const width = (sheet.width || 1920);
  const height = (sheet.height || 1080);

  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(scale, scale);

  // 1. Background
  if (options.includeBackground !== false) {
    renderWhiteboardBackground({
      ctx,
      width,
      height,
      zoom: 1,
      pan: { x: 0, y: 0 },
      background: sheet.background,
      isExporting: true,
      isTransparentExport: options.isTransparentExport || (sheet.background === 'plain-transparent'),
    });
  }

  // 2. Unified Stacking: Render Paths & Objects sorted by zIndex ascending
  type UnifiedLayer =
    | { kind: 'path'; path: DrawingPath; zIndex: number }
    | { kind: 'object'; object: CanvasObject; zIndex: number };

  const layers: UnifiedLayer[] = [
    ...(sheet.paths || []).map((p, idx) => ({
      kind: 'path' as const,
      path: p,
      zIndex: typeof p.zIndex === 'number' ? p.zIndex : idx + 1,
    })),
    ...(sheet.objects || []).map((o) => ({
      kind: 'object' as const,
      object: o,
      zIndex: typeof o.zIndex === 'number' ? o.zIndex : 1,
    })),
  ];

  layers.sort((a, b) => a.zIndex - b.zIndex);

  layers.forEach((layer) => {
    if (layer.kind === 'path') {
      renderDrawingPath(ctx, layer.path, sheet.background);
    } else {
      renderCanvasObject(ctx, layer.object);
    }
  });

  return canvas;
}

// Render individual DrawingPath onto context
export function renderDrawingPath(
  ctx: CanvasRenderingContext2D,
  p: DrawingPath,
  background?: string
) {
  if (!p.points || p.points.length === 0) return;
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (p.tool === 'highlighter') {
    ctx.globalAlpha = 0.35;
    ctx.globalCompositeOperation = 'multiply';
    ctx.strokeStyle = p.color;
    ctx.lineWidth = p.width * 2.2;
  } else if (p.tool === 'eraser') {
    if (background === 'plain-transparent') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.strokeStyle = background === 'plain-dark' ? '#161618' : '#FFFFFF';
    }
    ctx.lineWidth = p.width;
  } else {
    ctx.globalAlpha = p.opacity || 1;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = p.width;
  }

  ctx.beginPath();
  ctx.moveTo(p.points[0].x, p.points[0].y);

  if (p.points.length < 3) {
    for (let i = 1; i < p.points.length; i++) {
      ctx.lineTo(p.points[i].x, p.points[i].y);
    }
  } else {
    for (let i = 1; i < p.points.length - 1; i++) {
      const xc = (p.points[i].x + p.points[i + 1].x) / 2;
      const yc = (p.points[i].y + p.points[i + 1].y) / 2;
      ctx.quadraticCurveTo(p.points[i].x, p.points[i].y, xc, yc);
    }
    ctx.lineTo(p.points[p.points.length - 1].x, p.points[p.points.length - 1].y);
  }
  ctx.stroke();
  ctx.restore();
}

// Render individual CanvasObject onto context
export function renderCanvasObject(ctx: CanvasRenderingContext2D, obj: CanvasObject) {
  ctx.save();
  ctx.translate(obj.x, obj.y);
  if (obj.rotation) {
    ctx.translate(obj.width / 2, obj.height / 2);
    ctx.rotate((obj.rotation * Math.PI) / 180);
    ctx.translate(-obj.width / 2, -obj.height / 2);
  }

  // --- SHAPES ---
  if (obj.type === 'shape') {
    ctx.strokeStyle = obj.strokeColor;
    ctx.fillStyle = obj.fillColor;
    ctx.lineWidth = obj.strokeWidth;
    if (obj.strokeStyle === 'dashed') ctx.setLineDash([8, 6]);
    else if (obj.strokeStyle === 'dotted') ctx.setLineDash([3, 4]);

    const w = obj.width;
    const h = obj.height;

    ctx.beginPath();
    if (obj.shapeType === 'rect') {
      ctx.roundRect(0, 0, w, h, 8);
    } else if (obj.shapeType === 'circle' || obj.shapeType === 'ellipse') {
      ctx.ellipse(w / 2, h / 2, Math.abs(w / 2), Math.abs(h / 2), 0, 0, Math.PI * 2);
    } else if (obj.shapeType === 'triangle') {
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
    } else if (obj.shapeType === 'right-triangle') {
      ctx.moveTo(0, 0);
      ctx.lineTo(0, h);
      ctx.lineTo(w, h);
      ctx.closePath();
    } else if (obj.shapeType === 'diamond') {
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w / 2, h);
      ctx.lineTo(0, h / 2);
      ctx.closePath();
    } else if (obj.shapeType === 'parallelogram') {
      const off = w * 0.22;
      ctx.moveTo(off, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w - off, h);
      ctx.lineTo(0, h);
      ctx.closePath();
    } else if (obj.shapeType === 'trapezoid') {
      const off = w * 0.2;
      ctx.moveTo(off, 0);
      ctx.lineTo(w - off, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
    } else if (obj.shapeType === 'pentagon') {
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) / 2;
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    } else if (obj.shapeType === 'hexagon') {
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) / 2;
      for (let i = 0; i < 6; i++) {
        const angle = (i * 2 * Math.PI) / 6;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    } else if (obj.shapeType === 'octagon') {
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) / 2;
      for (let i = 0; i < 8; i++) {
        const angle = (i * 2 * Math.PI) / 8 + Math.PI / 8;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    } else if (obj.shapeType === 'star') {
      const cx = w / 2;
      const cy = h / 2;
      const spikes = 5;
      const outerR = Math.min(w, h) / 2;
      const innerR = outerR / 2.2;
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      ctx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        let x = cx + Math.cos(rot) * outerR;
        let y = cy + Math.sin(rot) * outerR;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerR;
        y = cy + Math.sin(rot) * innerR;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerR);
      ctx.closePath();
    } else if (obj.shapeType === 'star-4') {
      const cx = w / 2;
      const cy = h / 2;
      const spikes = 4;
      const outerR = Math.min(w, h) / 2;
      const innerR = outerR / 3;
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      ctx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        let x = cx + Math.cos(rot) * outerR;
        let y = cy + Math.sin(rot) * outerR;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerR;
        y = cy + Math.sin(rot) * innerR;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerR);
      ctx.closePath();
    } else if (obj.shapeType === 'heart') {
      const topCurveHeight = h * 0.3;
      ctx.moveTo(w / 2, h);
      ctx.bezierCurveTo(w / 2, h * 0.7, 0, h * 0.6, 0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, w / 2, 0, w / 2, topCurveHeight);
      ctx.bezierCurveTo(w / 2, 0, w, 0, w, topCurveHeight);
      ctx.bezierCurveTo(w, h * 0.6, w / 2, h * 0.7, w / 2, h);
      ctx.closePath();
    } else if (obj.shapeType === 'speech-bubble') {
      const bh = h * 0.75;
      ctx.roundRect(0, 0, w, bh, 10);
      ctx.moveTo(w * 0.2, bh);
      ctx.lineTo(w * 0.1, h);
      ctx.lineTo(w * 0.35, bh);
      ctx.closePath();
    } else if (obj.shapeType === 'cube') {
      const d = Math.min(w, h) * 0.28;
      // Front face
      ctx.roundRect(0, d, w - d, h - d, 2);
      // Top & side lines
      ctx.moveTo(0, d); ctx.lineTo(d, 0);
      ctx.lineTo(w, 0); ctx.lineTo(w - d, d);
      ctx.moveTo(w, 0); ctx.lineTo(w, h - d); ctx.lineTo(w - d, h);
      ctx.moveTo(w - d, d); ctx.lineTo(w - d, h);
    } else if (obj.shapeType === 'cylinder') {
      const ry = Math.min(20, h * 0.16);
      ctx.ellipse(w / 2, ry, w / 2, ry, 0, 0, Math.PI * 2);
      ctx.moveTo(w, ry);
      ctx.lineTo(w, h - ry);
      ctx.ellipse(w / 2, h - ry, w / 2, ry, 0, 0, Math.PI);
      ctx.lineTo(0, ry);
    } else if (obj.shapeType === 'cone') {
      const ry = Math.min(20, h * 0.16);
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h - ry);
      ctx.ellipse(w / 2, h - ry, w / 2, ry, 0, 0, Math.PI);
      ctx.lineTo(0, h - ry);
      ctx.lineTo(w / 2, 0);
    } else if (obj.shapeType === 'coordinate-axes') {
      // X axis
      ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
      ctx.moveTo(w - 8, h / 2 - 5); ctx.lineTo(w, h / 2); ctx.lineTo(w - 8, h / 2 + 5);
      // Y axis
      ctx.moveTo(w / 2, h); ctx.lineTo(w / 2, 0);
      ctx.moveTo(w / 2 - 5, 8); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 2 + 5, 8);
      // Origin tick
      ctx.moveTo(w / 2 - 3, h / 2); ctx.lineTo(w / 2 + 3, h / 2);
    } else if (obj.shapeType === 'line' || obj.shapeType === 'arrow' || obj.shapeType === 'double-arrow') {
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      if (obj.shapeType === 'arrow' || obj.shapeType === 'double-arrow') {
        const headlen = 14;
        ctx.beginPath();
        ctx.moveTo(w - headlen, h / 2 - 7);
        ctx.lineTo(w, h / 2);
        ctx.lineTo(w - headlen, h / 2 + 7);
        ctx.stroke();
      }
      if (obj.shapeType === 'double-arrow') {
        const headlen = 14;
        ctx.beginPath();
        ctx.moveTo(headlen, h / 2 - 7);
        ctx.lineTo(0, h / 2);
        ctx.lineTo(headlen, h / 2 + 7);
        ctx.stroke();
      }
    }

    if (obj.shapeType !== 'line' && obj.shapeType !== 'arrow' && obj.shapeType !== 'double-arrow' && obj.shapeType !== 'coordinate-axes') {
      if (obj.fillColor && obj.fillColor !== 'transparent') ctx.fill();
      if (obj.strokeWidth > 0) ctx.stroke();
    } else if (obj.shapeType === 'coordinate-axes') {
      ctx.stroke();
    }
  }

  // --- TEXT ---
  else if (obj.type === 'text') {
    ctx.save();
    const fontStyle = obj.italic ? 'italic ' : '';
    const fontWeight = obj.bold ? 'bold ' : '';
    ctx.font = `${fontStyle}${fontWeight}${obj.fontSize}px ${obj.fontFamily || 'sans-serif'}`;
    ctx.fillStyle = obj.color;
    ctx.textBaseline = 'top';

    const lines = obj.text.split('\n');
    const lineHeight = obj.fontSize * 1.3;
    lines.forEach((line, idx) => {
      let x = 0;
      if (obj.align === 'center') {
        ctx.textAlign = 'center';
        x = obj.width / 2;
      } else if (obj.align === 'right') {
        ctx.textAlign = 'right';
        x = obj.width;
      } else {
        ctx.textAlign = 'left';
        x = 0;
      }
      const y = idx * lineHeight;
      ctx.fillText(line, x, y);

      if (obj.underline && line.trim().length > 0) {
        const metrics = ctx.measureText(line);
        let startX = x;
        if (obj.align === 'center') startX = x - metrics.width / 2;
        else if (obj.align === 'right') startX = x - metrics.width;
        ctx.beginPath();
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = Math.max(1.5, obj.fontSize / 15);
        ctx.moveTo(startX, y + lineHeight * 0.95);
        ctx.lineTo(startX + metrics.width, y + lineHeight * 0.95);
        ctx.stroke();
      }
    });
    ctx.restore();
  }

  // --- STICKER / EMOJI ---
  else if (obj.type === 'sticker') {
    ctx.save();
    const size = Math.min(obj.width, obj.height);
    ctx.font = `${size * 0.8}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(obj.emoji, obj.width / 2, obj.height / 2);
    ctx.restore();
  }

  // --- STICKY NOTE ---
  else if (obj.type === 'sticky') {
    // Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = obj.bgColor || '#FEF08A';
    ctx.beginPath();
    ctx.roundRect(0, 0, obj.width, obj.height, 12);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Subtle top fold line
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, obj.width, 18);

    // Sticky Text
    ctx.font = `${obj.fontSize || 14}px sans-serif`;
    ctx.fillStyle = obj.textColor || '#1E293B';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    const padding = 14;
    const words = obj.text.split('\n');
    let lineY = padding + 12;
    words.forEach((line) => {
      ctx.fillText(line, padding, lineY);
      lineY += (obj.fontSize || 14) * 1.4;
    });
  }

  // --- MATHEMATICAL FORMULA CARD ---
  else if (obj.type === 'math') {
    ctx.fillStyle = obj.bgCard !== false ? 'rgba(255, 255, 255, 0.95)' : 'transparent';
    if (obj.bgCard !== false) {
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 2;
      ctx.beginPath();
      ctx.roundRect(0, 0, obj.width, obj.height, 12);
      ctx.fill();
      ctx.stroke();
      ctx.shadowColor = 'transparent';
    }

    // Mathematical formula rendered text with unicode symbols
    const mathText = formatLatexForCanvas(obj.latex);
    ctx.font = `italic ${obj.fontSize || 18}px "Cambria Math", "STIX Two Math", "Times New Roman", serif`;
    ctx.fillStyle = obj.color || '#4338CA';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(mathText, obj.width / 2, obj.height / 2);
  }

  // --- FUNCTION GRAPH ---
  else if (obj.type === 'graph') {
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(0, 0, obj.width, obj.height, 12);
    ctx.fill();
    ctx.stroke();

    // Axes
    const midX = obj.width / 2;
    const midY = obj.height / 2;
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, midY);
    ctx.lineTo(obj.width - 10, midY);
    ctx.moveTo(midX, 10);
    ctx.lineTo(midX, obj.height - 10);
    ctx.stroke();

    // Plot simple function curve (e.g. sin(x), x^2)
    ctx.strokeStyle = obj.strokeColor || '#7957F5';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const rangeX = obj.maxX - obj.minX;
    const rangeY = obj.maxY - obj.minY;
    const isSin = obj.fnString.includes('sin');
    const isCos = obj.fnString.includes('cos');
    const isSquare = obj.fnString.includes('^2') || obj.fnString.includes('x*x');

    let first = true;
    for (let px = 15; px < obj.width - 15; px += 2) {
      const mathX = obj.minX + ((px - 15) / (obj.width - 30)) * rangeX;
      let mathY = 0;
      if (isSin) mathY = Math.sin(mathX);
      else if (isCos) mathY = Math.cos(mathX);
      else if (isSquare) mathY = mathX * mathX * 0.15;
      else mathY = mathX;

      const py = midY - (mathY / (rangeY / 2)) * (midY - 20);
      if (py >= 10 && py <= obj.height - 10) {
        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }
    }
    ctx.stroke();

    // Title label
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#1E293B';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(obj.label || obj.fnString, 14, 12);
  }

  // --- CHILDREN'S VISUAL LEARNING OBJECT ---
  else if (obj.type === 'visual-learning') {
    // Card container
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(0, 0, obj.width, obj.height, 14);
    ctx.fill();
    ctx.stroke();

    // Title & equation banner
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(obj.label, 14, 12);

    if (obj.equationCaption) {
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#7957F5';
      ctx.fillText(obj.equationCaption, 14, 30);
    }

    // Grid of emojis
    const groups = obj.groups || 1;
    const itemsPerGroup = obj.itemsPerGroup || Math.ceil(obj.quantity / groups);
    const emojiSize = 24;
    ctx.font = `${emojiSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const groupWidth = (obj.width - 28) / groups;
    for (let g = 0; g < groups; g++) {
      const gx = 14 + g * groupWidth;
      // Draw subtle dashed boundary for each group
      if (groups > 1) {
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(gx + 4, 52, groupWidth - 8, obj.height - 62);
        ctx.setLineDash([]);
      }

      for (let item = 0; item < itemsPerGroup; item++) {
        const itemIdx = g * itemsPerGroup + item;
        if (itemIdx < obj.quantity) {
          const colsInGroup = Math.min(4, itemsPerGroup);
          const row = Math.floor(item / colsInGroup);
          const col = item % colsInGroup;
          const ex = gx + 16 + col * (emojiSize + 6);
          const ey = 74 + row * (emojiSize + 6);
          ctx.fillText(obj.emoji, ex, ey);
        }
      }
    }
  }

  // --- IMAGE OBJECT ---
  else if (obj.type === 'image') {
    if (obj.src) {
      const cached = getImageFromCache(obj.src);
      if (cached && cached.complete && cached.naturalWidth > 0) {
        try {
          ctx.drawImage(cached, 0, 0, obj.width, obj.height);
        } catch {
          ctx.fillStyle = '#F1F5F9';
          ctx.fillRect(0, 0, obj.width, obj.height);
        }
      } else {
        // Placeholder while loading
        ctx.fillStyle = '#F8FAFC';
        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1;
        ctx.fillRect(0, 0, obj.width, obj.height);
        ctx.strokeRect(0, 0, obj.width, obj.height);
        ctx.fillStyle = '#94A3B8';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🖼️ Loading image...', obj.width / 2, obj.height / 2);
      }
    }
  }

  ctx.restore();
}

// Global Image Cache for instant canvas rendering without re-fetching
const imageElementCache = new Map<string, HTMLImageElement>();

export function getImageFromCache(src: string): HTMLImageElement {
  let img = imageElementCache.get(src);
  if (!img) {
    img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    imageElementCache.set(src, img);
  }
  return img;
}

// Generate thumbnail for a sheet
export function generateSheetThumbnail(sheet: Sheet): string {
  try {
    const thumbCanvas = document.createElement('canvas');
    thumbCanvas.width = 160;
    thumbCanvas.height = 100;
    const ctx = thumbCanvas.getContext('2d');
    if (!ctx) return '';

    // Render scaled down
    const scale = 160 / (sheet.width || 1920);
    ctx.scale(scale, scale);

    renderWhiteboardBackground({
      ctx,
      width: sheet.width || 1920,
      height: sheet.height || 1080,
      zoom: 1,
      pan: { x: 0, y: 0 },
      background: sheet.background,
      isExporting: true,
      isTransparentExport: sheet.background === 'plain-transparent',
    });

    // Render unified layers (paths and objects sorted by zIndex)
    type UnifiedLayer =
      | { kind: 'path'; path: DrawingPath; zIndex: number }
      | { kind: 'object'; object: CanvasObject; zIndex: number };

    const layers: UnifiedLayer[] = [
      ...(sheet.paths || []).map((p, idx) => ({
        kind: 'path' as const,
        path: p,
        zIndex: typeof p.zIndex === 'number' ? p.zIndex : idx + 1,
      })),
      ...(sheet.objects || []).map((o) => ({
        kind: 'object' as const,
        object: o,
        zIndex: typeof o.zIndex === 'number' ? o.zIndex : 1,
      })),
    ];

    layers.sort((a, b) => a.zIndex - b.zIndex);

    layers.forEach((layer) => {
      if (layer.kind === 'path') {
        const p = layer.path;
        if (!p.points || p.points.length === 0) return;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = Math.max(2, p.width);
        ctx.beginPath();
        ctx.moveTo(p.points[0].x, p.points[0].y);
        p.points.forEach((pt) => ctx.lineTo(pt.x, pt.y));
        ctx.stroke();
      } else {
        renderCanvasObject(ctx, layer.object);
      }
    });

    return thumbCanvas.toDataURL('image/jpeg', 0.6);
  } catch {
    return '';
  }
}

// Clean and sanitize filename for desktop/mobile file systems
export function sanitizeFileName(name: string): string {
  if (!name || !name.trim()) return 'CalcAura_Whiteboard';
  // Remove illegal characters: / \ : * ? " < > |
  const cleaned = name.trim().replace(/[/\\:*?"<>|]/g, '-').replace(/\s+/g, ' ');
  return cleaned.slice(0, 80) || 'CalcAura_Whiteboard';
}

// Export single sheet as PNG with the user's chosen board title
export function exportSheetAsPNG(sheet: Sheet, notebookName: string, transparent = false): Promise<string> {
  return new Promise((resolve) => {
    const canvas = renderSheetToCanvas(sheet, {
      scale: 2,
      isTransparentExport: transparent || sheet.background === 'plain-transparent',
    });
    const dataURL = canvas.toDataURL('image/png');
    const safeBase = sanitizeFileName(notebookName);
    const fileName = `${safeBase}.png`;

    const a = document.createElement('a');
    a.href = dataURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => resolve(fileName), 250);
  });
}

// Export single sheet as JPG
export function exportSheetAsJPG(sheet: Sheet, notebookName: string): Promise<string> {
  return new Promise((resolve) => {
    // For JPG, force non-transparent background (white or dark)
    const isDark = sheet.background === 'plain-dark';
    const canvas = renderSheetToCanvas(sheet, {
      scale: 2,
      isTransparentExport: false,
      includeBackground: true,
    });
    // Ensure opaque background if canvas was transparent
    if (sheet.background === 'plain-transparent') {
      const opaqueCanvas = document.createElement('canvas');
      opaqueCanvas.width = canvas.width;
      opaqueCanvas.height = canvas.height;
      const oCtx = opaqueCanvas.getContext('2d');
      if (oCtx) {
        oCtx.fillStyle = isDark ? '#161618' : '#FFFFFF';
        oCtx.fillRect(0, 0, opaqueCanvas.width, opaqueCanvas.height);
        oCtx.drawImage(canvas, 0, 0);
      }
      const dataURL = opaqueCanvas.toDataURL('image/jpeg', 0.95);
      const safeBase = sanitizeFileName(notebookName);
      const fileName = `${safeBase}.jpg`;
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => resolve(fileName), 250);
      return;
    }

    const dataURL = canvas.toDataURL('image/jpeg', 0.95);
    const safeBase = sanitizeFileName(notebookName);
    const fileName = `${safeBase}.jpg`;

    const a = document.createElement('a');
    a.href = dataURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => resolve(fileName), 250);
  });
}

// Export single sheet as SVG with user's chosen board title
export function exportSheetAsSVG(sheet: Sheet, notebookName: string): Promise<string> {
  return new Promise((resolve) => {
    const width = sheet.width || 1920;
    const height = sheet.height || 1080;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n`;

    // Background
    if (sheet.background === 'plain-dark') {
      svgContent += `  <rect width="${width}" height="${height}" fill="#161618"/>\n`;
    } else if (sheet.background !== 'plain-transparent') {
      svgContent += `  <rect width="${width}" height="${height}" fill="#FFFFFF"/>\n`;
    }

    // Unified layers for SVG export sorted by zIndex ascending
    type UnifiedLayer =
      | { kind: 'path'; path: DrawingPath; zIndex: number }
      | { kind: 'object'; object: CanvasObject; zIndex: number };

    const layers: UnifiedLayer[] = [
      ...(sheet.paths || []).map((p, idx) => ({
        kind: 'path' as const,
        path: p,
        zIndex: typeof p.zIndex === 'number' ? p.zIndex : idx + 1,
      })),
      ...(sheet.objects || []).map((o) => ({
        kind: 'object' as const,
        object: o,
        zIndex: typeof o.zIndex === 'number' ? o.zIndex : 1,
      })),
    ];

    layers.sort((a, b) => a.zIndex - b.zIndex);

    layers.forEach((layer) => {
      if (layer.kind === 'path') {
        const p = layer.path;
        if (!p.points || p.points.length === 0) return;
        const d = p.points.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
        const opacity = p.tool === 'highlighter' ? 0.35 : (p.opacity || 1);
        svgContent += `  <path d="${d}" fill="none" stroke="${p.color}" stroke-width="${p.width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/>\n`;
      } else {
        const obj = layer.object;
        if (obj.type === 'shape') {
          if (obj.shapeType === 'rect') {
            svgContent += `  <rect x="${obj.x}" y="${obj.y}" width="${obj.width}" height="${obj.height}" rx="8" fill="${obj.fillColor}" stroke="${obj.strokeColor}" stroke-width="${obj.strokeWidth}"/>\n`;
          } else if (obj.shapeType === 'circle' || obj.shapeType === 'ellipse') {
            svgContent += `  <ellipse cx="${obj.x + obj.width / 2}" cy="${obj.y + obj.height / 2}" rx="${obj.width / 2}" ry="${obj.height / 2}" fill="${obj.fillColor}" stroke="${obj.strokeColor}" stroke-width="${obj.strokeWidth}"/>\n`;
          }
        } else if (obj.type === 'text') {
          const textDecoration = obj.underline ? ' text-decoration="underline"' : '';
          const fontStyle = obj.italic ? ' font-style="italic"' : '';
          const fontWeight = obj.bold ? ' font-weight="bold"' : '';
          const fontFamily = obj.fontFamily || 'sans-serif';
          const lines = obj.text.split('\n');
          const lineHeight = obj.fontSize * 1.3;
          lines.forEach((line, idx) => {
            svgContent += `  <text x="${obj.x}" y="${obj.y + (idx + 1) * lineHeight}" fill="${obj.color}" font-size="${obj.fontSize}" font-family="${fontFamily}"${fontWeight}${fontStyle}${textDecoration}>${escapeXml(line)}</text>\n`;
          });
        } else if (obj.type === 'sticker') {
          svgContent += `  <text x="${obj.x + obj.width / 2}" y="${obj.y + obj.height / 2}" font-size="${Math.min(obj.width, obj.height) * 0.8}" text-anchor="middle" dominant-baseline="central">${obj.emoji}</text>\n`;
        }
      }
    });

    svgContent += `</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const safeBase = sanitizeFileName(notebookName);
    const fileName = `${safeBase}.svg`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      URL.revokeObjectURL(url);
      resolve(fileName);
    }, 250);
  });
}

// Print / Multi-sheet PDF export with user's chosen board title
export function printNotebook(notebook: Notebook): Promise<string> {
  return new Promise((resolve) => {
    const safeBase = sanitizeFileName(notebook.name);
    const fileName = `${safeBase}.pdf`;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      resolve(fileName);
      return;
    }

    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${escapeXml(safeBase)} - CalcAura Whiteboard</title>
          <style>
            @page { size: A4 landscape; margin: 1cm; }
            body { margin: 0; font-family: sans-serif; background: #FFF; color: #111; }
            .sheet-page { page-break-after: always; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 95vh; margin-bottom: 24px; }
            .sheet-header { width: 100%; display: flex; justify-content: space-between; font-size: 12px; color: #666; margin-bottom: 12px; border-bottom: 1px solid #EEE; padding-bottom: 4px; }
            img { max-width: 100%; max-height: 85vh; border: 1px solid #E2E8F0; border-radius: 8px; }
          </style>
        </head>
        <body>
    `;

    notebook.sheets.forEach((sheet, idx) => {
      const canvas = renderSheetToCanvas(sheet, { scale: 1.5, includeBackground: true });
      const imgData = canvas.toDataURL('image/png');
      html += `
        <div class="sheet-page">
          <div class="sheet-header">
            <span>${escapeXml(safeBase)} · <strong>${escapeXml(sheet.name)}</strong></span>
            <span>Page ${idx + 1} of ${notebook.sheets.length}</span>
          </div>
          <img src="${imgData}" alt="${escapeXml(sheet.name)}" />
        </div>
      `;
    });

    html += `
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 300);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    resolve(fileName);
  });
}

// Export whole notebook as JSON backup
export function exportNotebookJSON(notebook: Notebook): Promise<string> {
  return new Promise((resolve) => {
    const json = JSON.stringify(notebook, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const safeBase = sanitizeFileName(notebook.name);
    const fileName = `${safeBase}_backup.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      URL.revokeObjectURL(url);
      resolve(fileName);
    }, 250);
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
