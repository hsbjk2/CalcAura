import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { MathSurface } from './MathSurface.tsx';

interface HeroProps {
  onOpenWorkspace: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWorkspace }) => {
  return (
    <section className="hero" id="top" data-nav-theme="paper">
      <div className="hero__field--ink" aria-hidden="true" />

      <div className="hero__canvas" aria-hidden="true">
        <MathSurface expression="sin(x) * cos(y)" interactive={false} />
      </div>

      <div className="hero__inner">
        <h1 className="hero__title">
          <span className="hero__title-line">Every sum</span>
          <span className="hero__title-line hero__title-line--cut">
            <span className="hero__title-line__ink">one desk</span>
            <span className="hero__title-line__ghost" aria-hidden="true">
              one desk
            </span>
          </span>
        </h1>

        <div className="hero__bottom">
          <p className="hero__support">
            Calculators, graphing, geometry, a whiteboard and Class 1–12 practice — one browser
            workspace for Indian students.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn" onClick={onOpenWorkspace}>
              Open the workspace
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a className="text-link hero__link" href="#showcase">
              See it work
            </a>
          </div>
          <a className="hero__scroll" href="#showcase">
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            Scroll to the surface
          </a>
        </div>
      </div>
    </section>
  );
};
