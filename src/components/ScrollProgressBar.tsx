import React, { useState, useEffect, useRef } from 'react';
import { getPrefersReducedMotion } from '../motion/tokens.ts';

export const ScrollProgressBar: React.FC = () => {
  const [scaleX, setScaleX] = useState<number>(0);
  const [topOffset, setTopOffset] = useState<number>(() => {
    return typeof window !== 'undefined' && window.innerWidth < 640 ? 64 : 70;
  });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (getPrefersReducedMotion()) {
      return;
    }

    const update = () => {
      // 1. Measure navbar bottom position
      const navBar = document.getElementById('navbar-main-bar') || document.querySelector('header');
      if (navBar) {
        const rect = navBar.getBoundingClientRect();
        if (rect.bottom > 0) {
          setTopOffset(rect.bottom + 2);
        }
      }

      // 2. Compute scroll progress: scrollY / (scrollHeight - innerHeight)
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        setScaleX(1);
      } else {
        const ratio = Math.min(1, Math.max(0, scrollTop / maxScroll));
        setScaleX(ratio);
      }
    };

    const handleScrollOrResize = () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    update();

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  if (getPrefersReducedMotion()) {
    return null;
  }

  return (
    <div
      className="fixed left-0 right-0 z-40 pointer-events-none transition-[top] duration-150"
      style={{ top: `${topOffset}px` }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scaleX * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background Track: subtle translucent track */}
      <div
        className="w-full h-[2.5px] overflow-hidden"
        style={{ background: 'color-mix(in srgb, var(--ink) 12%, transparent)' }}
      >
        {/* Hairline indicator using scaleX and transformOrigin */}
        <div
          className="h-full w-full will-change-transform"
          style={{
            background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-strong) 100%)',
            boxShadow: '0 0 10px color-mix(in srgb, var(--accent) 55%, transparent)',
            transform: `scaleX(${scaleX})`,
            transformOrigin: '0% 50%',
            transition: 'transform 60ms linear',
          }}
        />
      </div>
    </div>
  );
};
