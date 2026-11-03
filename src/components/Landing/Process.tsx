import React from 'react';

const IMAGES = {
  solve: {
    src: '/images/history/bakhshali-manuscript.jpg',
    alt: 'A page of the Bakhshali manuscript, an early Indian mathematical text written on birch bark.',
    caption: 'Bakhshali manuscript. Public domain, via Wikimedia Commons.',
    width: 1220,
    height: 698,
  },
  sketch: {
    src: '/images/history/astrolabe.jpg',
    alt: 'A brass Qajar astrolabe with engraved rings and pointers for measuring the sky.',
    caption: 'Qajar astrolabe. Public domain, Art Institute of Chicago.',
    width: 1600,
    height: 2192,
  },
  prove: {
    src: '/images/history/title-page-of-sir-henry-billingsley-s.jpg',
    alt: 'The engraved title page of the first English translation of Euclid’s Elements, printed in 1570.',
    caption: 'Euclid’s Elements, first English edition, 1570. Public domain, via Wikimedia Commons.',
    width: 1766,
    height: 2702,
  },
};

interface PanelProps {
  verb: string;
  body: string;
  points: string[];
  image: (typeof IMAGES)[keyof typeof IMAGES];
  flip?: boolean;
}

const Panel: React.FC<PanelProps> = ({ verb, body, points, image, flip }) => (
  <div className={`process__panel${flip ? ' process__panel--flip' : ''}`}>
    <figure className="process__media" data-reveal="mask">
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
      <figcaption>{image.caption}</figcaption>
    </figure>

    <div className="process__copy">
      <h2 className="process__verb" data-reveal>
        {verb}
      </h2>
      <div className="process__body" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
        <p>{body}</p>
        <ul className="process__list">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const Process: React.FC = () => {
  return (
    <section className="process" id="process" data-nav-theme="paper">
      <Panel
        verb="Solve"
        body="Every tool answers on the same page. Type an expression, see the graph, open the steps, and keep the working beside it."
        points={[
          'Calculator, solver and graph share one expression',
          'Steps stay visible while you edit',
          'Answers copy as typeset maths',
        ]}
        image={IMAGES.solve}
      />
      <Panel
        verb="Sketch"
        body="The whiteboard is a real surface, not a scratch pad. Snap to the grid, label with KaTeX, and keep every sheet in the notebook."
        points={[
          'Infinite sheets with grid and snap',
          'Pen, line, text and formula tools',
          'Save to your account, reopen from history',
        ]}
        image={IMAGES.sketch}
        flip
      />
      <Panel
        verb="Prove"
        body="Practice is built from the chapter you are on. Tests do not leak the answer, and the review tells you which step failed."
        points={[
          'Class 1–12, board-mapped chapters',
          'Zero-leak practice with worked solutions',
          'Attempt history with retry',
        ]}
        image={IMAGES.prove}
      />
    </section>
  );
};
