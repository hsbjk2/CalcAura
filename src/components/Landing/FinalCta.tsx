import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MathSurface } from './MathSurface.tsx';

interface FinalCtaProps {
  onOpenWorkspace: () => void;
  onOpenAbout: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenWorkspace, onOpenAbout }) => {
  return (
    <section className="cta" data-nav-theme="ink">
      <div className="cta__canvas" aria-hidden="true">
        <MathSurface expression="x^2 - y^2" interactive={false} amplitude={1.4} />
      </div>

      <div className="cta__inner">
        <h2 className="cta__title" data-reveal>
          Start with one sum.
        </h2>

        <div className="cta__foot" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
          <p>
            The calculator is open, the canvas is waiting. Bring the homework you are stuck on and
            take it apart one line at a time.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn" onClick={onOpenWorkspace}>
              Open the workspace
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" className="btn btn--ghost" onClick={onOpenAbout}>
              Read about CalcAura
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
