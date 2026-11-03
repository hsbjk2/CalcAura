import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MathSurface } from './MathSurface.tsx';

interface FinalCtaProps {
  onOpenWorkspace: () => void;
  onOpenAbout: () => void;
}

const GLYPHS = [
  { glyph: '∑', x: '8%', y: '18%', size: 'clamp(2rem, 5vw, 4.4rem)', rot: '-8deg', dur: '9s', delay: '-2s' },
  { glyph: '√x', x: '78%', y: '12%', size: 'clamp(1.6rem, 4vw, 3.4rem)', rot: '6deg', dur: '11s', delay: '-5s' },
  { glyph: '∫', x: '88%', y: '58%', size: 'clamp(2.2rem, 6vw, 5rem)', rot: '12deg', dur: '10s', delay: '-1s' },
  { glyph: 'π', x: '18%', y: '68%', size: 'clamp(1.8rem, 4.4vw, 3.8rem)', rot: '-14deg', dur: '12s', delay: '-7s' },
  { glyph: 'dy/dx', x: '62%', y: '76%', size: 'clamp(1.1rem, 2.6vw, 2rem)', rot: '4deg', dur: '13s', delay: '-9s' },
  { glyph: 'x²', x: '42%', y: '24%', size: 'clamp(1.2rem, 3vw, 2.4rem)', rot: '-5deg', dur: '8s', delay: '-3s' },
  { glyph: 'θ', x: '70%', y: '42%', size: 'clamp(1.4rem, 3.4vw, 2.8rem)', rot: '9deg', dur: '14s', delay: '-6s' },
];

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenWorkspace, onOpenAbout }) => {
  return (
    <section className="cta" data-nav-theme="ink">
      <div className="cta__glyphs" aria-hidden="true">
        {GLYPHS.map((item) => (
          <span
            key={item.glyph}
            className="cta__glyph"
            style={{
              ['--x' as string]: item.x,
              ['--y' as string]: item.y,
              ['--size' as string]: item.size,
              ['--rot' as string]: item.rot,
              ['--dur' as string]: item.dur,
              ['--delay' as string]: item.delay,
            }}
          >
            {item.glyph}
          </span>
        ))}
      </div>

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
