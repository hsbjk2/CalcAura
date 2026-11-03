import React, { useEffect, useRef, useState } from 'react';
import { WorkspaceFrame } from './WorkspaceFrame.tsx';

const STAGES = ['Expression', 'Surface', 'Workspace'];

export const Showcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      const zoom = 0.84 + progress * 0.24;
      frame.style.setProperty('--zoom', zoom.toFixed(3));
      setStage(progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="showcase" id="showcase" ref={sectionRef} data-nav-theme="ink">
      <div className="showcase__pin">
        <div className="showcase__head">
          <h2 className="showcase__title" data-reveal>
            See what the symbols mean.
          </h2>
          <p className="showcase__hint" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            Type a surface, then turn it. This is the same canvas that runs inside the workspace,
            not a picture of one.
          </p>
        </div>

        <div className="showcase__frame" ref={frameRef} data-reveal="mask">
          <WorkspaceFrame />
        </div>

        <div className="showcase__caption" data-reveal>
          <span>
            <strong>One frame, three distances.</strong> From the expression to the mesh to the
            full desk.
          </span>
          <span className="showcase__stages" aria-hidden="true">
            {STAGES.map((label, index) => (
              <span key={label} className="showcase__stage" data-active={stage === index}>
                {label}
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
};
