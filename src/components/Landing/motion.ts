import React, { useEffect } from 'react';

/**
 * Reveals are opt-in and progressive: the class that hides an element is only
 * added after the observer exists, so a failed script can never leave the page blank.
 */
export function useRevealObserver(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!targets.length) return;

    root.classList.add('reveal-ready');

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((target) => target.classList.add('is-in'));
      return () => root.classList.remove('reveal-ready');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, [rootRef]);
}

export function tiltProps(): {
  onPointerMove: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: React.PointerEvent<HTMLElement>) => void;
} {
  return {
    onPointerMove: (event) => {
      if (event.pointerType === 'touch') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`);
      element.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
      element.dataset.tilting = 'true';
    },
    onPointerLeave: (event) => {
      const element = event.currentTarget;
      element.style.setProperty('--ry', '0deg');
      element.style.setProperty('--rx', '0deg');
      delete element.dataset.tilting;
    },
  };
}
