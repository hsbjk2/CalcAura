import React from 'react';
import {
  Calculator,
  AreaChart,
  PenTool,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Reveal, Tilt3D } from './Depth.tsx';
import '../../styles/outro.css';

interface PageOutroProps {
  onSelectTab: (tabId: string) => void;
}

const LINKS = [
  {
    id: 'basic-calculator',
    label: 'Calculator',
    title: 'The everyday desk',
    body: 'Arithmetic, scientific functions, grouped results and a readable tape of your last sums.',
    Icon: Calculator,
    mark: '±',
  },
  {
    id: 'graphing',
    label: 'Graphing',
    title: 'See the function',
    body: 'Plot expressions, pan and zoom, then read roots, slopes and turning points off the curve.',
    Icon: AreaChart,
    mark: 'ƒ',
  },
  {
    id: 'whiteboard',
    label: 'Whiteboard',
    title: 'Think on paper',
    body: 'Graph paper, chalkboard, rulers and layers — sketch the proof before you write it up.',
    Icon: PenTool,
    mark: '△',
  },
  {
    id: 'curriculum',
    label: 'Curriculum',
    title: 'Climb the syllabus',
    body: 'Class 1 to higher secondary, with chapters, worked examples and practice kept together.',
    Icon: GraduationCap,
    mark: '∑',
  },
];

export const PageOutro: React.FC<PageOutroProps> = ({ onSelectTab }) => {
  return (
    <section className="page-outro" aria-labelledby="page-outro-title">
      <span className="page-outro__ring" aria-hidden="true" />

      <div className="page-outro__inner shell">
        <Reveal className="page-outro__head">
          <span className="page-outro__tag">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Keep going
          </span>
          <h2 id="page-outro-title" className="page-outro__title">
            One desk. Every kind of mathematics.
          </h2>
          <p className="page-outro__lead">
            Move between calculating, graphing, proving and practising without losing your place.
            Each surface reads the same notation and keeps the same honest, client-side maths.
          </p>
        </Reveal>

        <div className="page-outro__grid">
          {LINKS.map(({ id, label, title, body, Icon, mark }, index) => (
            <Reveal key={id} delay={index * 70}>
              <Tilt3D className="outro-card" strength={6}>
                <span className="outro-card__mark" aria-hidden="true">
                  {mark}
                </span>
                <span className="outro-card__icon" aria-hidden="true">
                  <Icon className="w-4 h-4" />
                </span>
                <span className="outro-card__label">{label}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <button
                  type="button"
                  className="outro-card__action"
                  onClick={() => onSelectTab(id)}
                >
                  Open
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
