/**
 * CALCAURA Unified Motion Design System Tokens
 * Master Prompt v2 Specification
 */

export const MOTION_DURATIONS = {
  hover: 0.18,          // 180ms
  buttonPress: 0.14,    // 140ms
  smallReveal: 0.35,    // 350ms
  cardReveal: 0.45,     // 450ms
  sectionTransition: 0.65, // 650ms
  cinematicSettle: 0.8, // 800ms
} as const;

export const MOTION_EASINGS = {
  // Standard ease-out quint for natural deceleration
  easeOut: [0.22, 1, 0.36, 1] as const,
  // Standard ease-in-out for connected transitions
  easeInOut: [0.65, 0, 0.35, 1] as const,
  // Snappy ease-out for buttons and small interactive items
  snappy: [0.16, 1, 0.3, 1] as const,
  // Gentle spring configuration for Framer Motion
  springGentle: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 28,
    mass: 0.8,
  },
} as const;

export const MOTION_DISTANCES = {
  subtle: 16,
  standard: 24,
  generous: 36,
} as const;

export const MOTION_STAGGERS = {
  quick: 0.04,   // 40ms
  standard: 0.06, // 60ms
  relaxed: 0.08, // 80ms
  maxItems: 5,
} as const;

export const MOTION_3D = {
  perspectiveDesktop: 1200,
  perspectiveTablet: 900,
  maxPanelRotationDeg: 6, // 2-8°
  parallaxBg: 0.08,       // 0.05-0.15
  parallaxMid: 0.2,       // 0.15-0.3
  parallaxFg: 0.35,       // 0.3-0.5
} as const;

/**
 * Checks system prefers-reduced-motion media query
 */
export function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
