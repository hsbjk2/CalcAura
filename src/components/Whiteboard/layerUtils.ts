import { CanvasObject, Point } from './types.ts';

export type HandleType = 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w' | 'rot';

/**
 * Get next highest zIndex for a newly created object so it appears on top
 */
export function getNextZIndex(objects: { zIndex?: number }[]): number {
  if (!objects || objects.length === 0) return 1;
  return objects.reduce((max, obj) => Math.max(max, obj.zIndex || 0), 0) + 1;
}

/**
 * Get next highest zIndex across both objects and paths for a sheet
 */
export function getNextStackZIndex(sheet?: { objects?: { zIndex?: number }[]; paths?: { zIndex?: number }[] } | null): number {
  if (!sheet) return 1;
  const all = [...(sheet.objects || []), ...(sheet.paths || [])];
  return getNextZIndex(all);
}

/**
 * Normalizes objects into clean 1..N z-index order based on current zIndex or array index
 */
function normalizeObjects<T extends { id: string; zIndex?: number }>(objects: T[]): T[] {
  const sorted = [...objects].sort((a, b) => {
    const za = typeof a.zIndex === 'number' ? a.zIndex : 0;
    const zb = typeof b.zIndex === 'number' ? b.zIndex : 0;
    return za - zb;
  });
  return sorted.map((obj, idx) => ({ ...obj, zIndex: idx + 1 }));
}

/**
 * Bring object to the absolute top of the stack
 */
export function bringToFront<T extends { id: string; zIndex?: number }>(objects: T[], targetId: string): T[] {
  if (!objects || objects.length <= 1) return objects;
  const list = normalizeObjects(objects);
  const targetIndex = list.findIndex((o) => o.id === targetId);
  if (targetIndex === -1 || targetIndex === list.length - 1) return list;

  const [target] = list.splice(targetIndex, 1);
  list.push(target);
  return list.map((obj, idx) => ({ ...obj, zIndex: idx + 1 }));
}

/**
 * Send object to the absolute bottom of the stack
 */
export function sendToBack<T extends { id: string; zIndex?: number }>(objects: T[], targetId: string): T[] {
  if (!objects || objects.length <= 1) return objects;
  const list = normalizeObjects(objects);
  const targetIndex = list.findIndex((o) => o.id === targetId);
  if (targetIndex === -1 || targetIndex === 0) return list;

  const [target] = list.splice(targetIndex, 1);
  list.unshift(target);
  return list.map((obj, idx) => ({ ...obj, zIndex: idx + 1 }));
}

/**
 * Move object one step forward in stack order
 */
export function bringForward<T extends { id: string; zIndex?: number }>(objects: T[], targetId: string): T[] {
  if (!objects || objects.length <= 1) return objects;
  const list = normalizeObjects(objects);
  const targetIndex = list.findIndex((o) => o.id === targetId);
  if (targetIndex === -1 || targetIndex === list.length - 1) return list;

  // Swap with next element
  const temp = list[targetIndex];
  list[targetIndex] = list[targetIndex + 1];
  list[targetIndex + 1] = temp;

  return list.map((obj, idx) => ({ ...obj, zIndex: idx + 1 }));
}

/**
 * Move object one step backward in stack order
 */
export function sendBackward<T extends { id: string; zIndex?: number }>(objects: T[], targetId: string): T[] {
  if (!objects || objects.length <= 1) return objects;
  const list = normalizeObjects(objects);
  const targetIndex = list.findIndex((o) => o.id === targetId);
  if (targetIndex === -1 || targetIndex === 0) return list;

  // Swap with previous element
  const temp = list[targetIndex];
  list[targetIndex] = list[targetIndex - 1];
  list[targetIndex - 1] = temp;

  return list.map((obj, idx) => ({ ...obj, zIndex: idx + 1 }));
}

/**
 * Reorders a selected layer item (object or path) across the unified visual stack of both objects and paths
 */
export function reorderSheetLayers<O extends { id: string; zIndex?: number }, P extends { id: string; zIndex?: number }>(
  objects: O[],
  paths: P[],
  targetId: string,
  action: 'front' | 'back' | 'forward' | 'backward'
): { objects: O[]; paths: P[] } {
  type LayerItem = { id: string; zIndex: number; kind: 'object' | 'path' };

  const list: LayerItem[] = [
    ...objects.map((o, idx) => ({
      id: o.id,
      zIndex: typeof o.zIndex === 'number' ? o.zIndex : idx + 1,
      kind: 'object' as const,
    })),
    ...paths.map((p, idx) => ({
      id: p.id,
      zIndex: typeof p.zIndex === 'number' ? p.zIndex : idx + 1,
      kind: 'path' as const,
    })),
  ];

  list.sort((a, b) => a.zIndex - b.zIndex);
  const normalized = list.map((item, idx) => ({ ...item, zIndex: idx + 1 }));

  const targetIndex = normalized.findIndex((i) => i.id === targetId);
  if (targetIndex === -1) {
    return { objects, paths };
  }

  if (action === 'front') {
    if (targetIndex !== normalized.length - 1) {
      const [item] = normalized.splice(targetIndex, 1);
      normalized.push(item);
    }
  } else if (action === 'back') {
    if (targetIndex !== 0) {
      const [item] = normalized.splice(targetIndex, 1);
      normalized.unshift(item);
    }
  } else if (action === 'forward') {
    if (targetIndex < normalized.length - 1) {
      const temp = normalized[targetIndex];
      normalized[targetIndex] = normalized[targetIndex + 1];
      normalized[targetIndex + 1] = temp;
    }
  } else if (action === 'backward') {
    if (targetIndex > 0) {
      const temp = normalized[targetIndex];
      normalized[targetIndex] = normalized[targetIndex - 1];
      normalized[targetIndex - 1] = temp;
    }
  }

  const zMap = new Map<string, number>();
  normalized.forEach((item, idx) => {
    zMap.set(item.id, idx + 1);
  });

  const updatedObjects = objects.map((o) => ({
    ...o,
    zIndex: zMap.get(o.id) ?? o.zIndex ?? 1,
  }));

  const updatedPaths = paths.map((p) => ({
    ...p,
    zIndex: zMap.get(p.id) ?? p.zIndex ?? 1,
  }));

  return { objects: updatedObjects, paths: updatedPaths };
}

/**
 * Check if a point hits an object, accounting for rotation around center
 */
export function hitTestObject(obj: CanvasObject, point: Point): boolean {
  let px = point.x;
  let py = point.y;

  if (obj.rotation) {
    const cx = obj.x + obj.width / 2;
    const cy = obj.y + obj.height / 2;
    const rad = (-obj.rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = point.x - cx;
    const dy = point.y - cy;
    px = cx + (dx * cos - dy * sin);
    py = cy + (dx * sin + dy * cos);
  }

  // Add 4px tolerance for easy clicking
  return (
    px >= obj.x - 4 &&
    px <= obj.x + obj.width + 4 &&
    py >= obj.y - 4 &&
    py <= obj.y + obj.height + 4
  );
}

/**
 * Find top-most hit object; if already selected, cycle to object behind it
 */
export function hitTestTopObject(
  objects: CanvasObject[],
  point: Point,
  currentlySelectedId?: string | null
): CanvasObject | null {
  // Sort descending by zIndex (top to bottom)
  const sorted = [...objects].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));
  const hits = sorted.filter((o) => hitTestObject(o, point));

  if (hits.length === 0) return null;

  if (hits.length > 1 && currentlySelectedId) {
    const curIdx = hits.findIndex((o) => o.id === currentlySelectedId);
    if (curIdx !== -1 && curIdx < hits.length - 1) {
      return hits[curIdx + 1];
    }
  }

  return hits[0];
}

/**
 * Test if a point hits any corner, edge, or rotation handle of a selected object
 */
export function hitTestHandle(
  obj: CanvasObject,
  point: Point,
  zoom: number = 1
): HandleType | null {
  // Generous touch hit radius: at least 24px in screen coordinates for comfortable fingertip interaction
  const hitRadius = Math.max(16, 24 / zoom);

  const w = obj.width;
  const h = obj.height;
  const x = obj.x;
  const y = obj.y;

  const handles: { type: HandleType; x: number; y: number }[] = [
    // Corners
    { type: 'nw', x, y },
    { type: 'ne', x: x + w, y },
    { type: 'se', x: x + w, y: y + h },
    { type: 'sw', x, y: y + h },
    // Edges
    { type: 'n', x: x + w / 2, y },
    { type: 's', x: x + w / 2, y: y + h },
    { type: 'w', x, y: y + h / 2 },
    { type: 'e', x: x + w, y: y + h / 2 },
    // Rotation handle (centered 24px above top edge)
    { type: 'rot', x: x + w / 2, y: y - 24 / zoom },
  ];

  for (const handle of handles) {
    const distSq = (point.x - handle.x) ** 2 + (point.y - handle.y) ** 2;
    if (distSq <= hitRadius ** 2) {
      return handle.type;
    }
  }

  return null;
}
