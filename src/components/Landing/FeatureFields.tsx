import React from 'react';
import { CalculatorFragment, BoardFragment, QuizFragment } from './Fragments.tsx';
import { tiltProps } from './motion.ts';

export const FeatureFields: React.FC = () => {
  return (
    <div className="fields">
      <section className="field field--paper" data-nav-theme="paper">
        <h2 className="field__title" data-reveal>
          Solve the page.
        </h2>
        <div className="field__copy" data-reveal style={{ ['--reveal-delay' as string]: '100ms' }}>
          <p>
            A calculator that keeps the whole expression on screen, a solver that shows every step,
            and a graph that answers the next question without changing tab.
          </p>
        </div>
        <div className="field__ui" data-reveal style={{ ['--reveal-delay' as string]: '180ms' }}>
          <div className="tilt" {...tiltProps()}>
            <CalculatorFragment />
          </div>
        </div>
      </section>

      <section className="field field--ink" data-nav-theme="ink">
        <h2 className="field__title" data-reveal>
          Sketch it out.
        </h2>
        <div className="field__copy" data-reveal style={{ ['--reveal-delay' as string]: '100ms' }}>
          <p>
            An endless whiteboard with grids, snapping and typeset maths. Draw the construction,
            type the proof beside it, then keep the sheet with the rest of your work.
          </p>
        </div>
        <div className="field__ui" data-reveal style={{ ['--reveal-delay' as string]: '180ms' }}>
          <div className="tilt" {...tiltProps()}>
            <BoardFragment />
          </div>
        </div>
      </section>

      <section className="field field--lime" data-nav-theme="paper">
        <h2 className="field__title" data-reveal>
          Prove it.
        </h2>
        <div className="field__copy" data-reveal style={{ ['--reveal-delay' as string]: '100ms' }}>
          <p>
            Practice for Class 1 to 12 with zero-leak tests, worked solutions and a history that
            remembers which method you missed, not just the mark.
          </p>
        </div>
        <div className="field__ui field__ui--quiz" data-reveal style={{ ['--reveal-delay' as string]: '180ms' }}>
          <div className="tilt" {...tiltProps()}>
            <QuizFragment />
          </div>
        </div>
      </section>
    </div>
  );
};
