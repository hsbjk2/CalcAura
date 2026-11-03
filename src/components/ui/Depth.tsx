import React, { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------------------------------------------------------------
   Tilt3D — pointer-driven CSS perspective. No canvas, no dependency.
   ------------------------------------------------------------------------- */

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'div' | 'section' | 'article' | 'figure';
}

export const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  className = '',
  strength = 7,
  as: Tag = 'div',
}) => {
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch' || prefersReducedMotion()) return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--ry', `${(px * strength).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-py * strength * 0.8).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);
    el.dataset.tilting = 'true';
  };

  const onPointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
    delete el.dataset.tilting;
  };

  return (
    <Tag
      className={`depth-card ${className}`.trim()}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </Tag>
  );
};

/* -------------------------------------------------------------------------
   Reveal — progressive scroll entrance. Visible if the observer is absent.
   ------------------------------------------------------------------------- */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'figure' | 'li';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisible(true);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return React.createElement(
    Tag,
    {
      ref,
      className: `ui-reveal ${visible ? 'is-in' : ''} ${className}`.trim(),
      style: { ['--ui-delay' as string]: `${delay}ms` },
    },
    children,
  );
};

/* -------------------------------------------------------------------------
   Aurora — an ink-friendly atmospheric field built from CSS only.
   ------------------------------------------------------------------------- */

export const Aurora: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`aurora ${className}`.trim()} aria-hidden="true">
    <span className="aurora__blob aurora__blob--a" />
    <span className="aurora__blob aurora__blob--b" />
    <span className="aurora__blob aurora__blob--c" />
    <span className="aurora__ring" />
  </div>
);

/* -------------------------------------------------------------------------
   GlassPanel — a quiet translucent surface with a real inner highlight.
   ------------------------------------------------------------------------- */

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  as?: 'div' | 'section' | 'article';
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  tilt = false,
  as = 'div',
}) => {
  const classes = `glass-surface ${tilt ? 'depth-card' : ''} ${className}`.trim();
  if (!tilt) {
    const Tag = as;
    return <Tag className={classes}>{children}</Tag>;
  }
  return (
    <Tilt3D className={classes} as={as}>
      {children}
    </Tilt3D>
  );
};
