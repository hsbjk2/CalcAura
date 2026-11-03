import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CurriculumTableProps {
  onSelectTab: (tabId: string) => void;
}

const ROWS: { group: string; covers: string; size: string; tab: string }[] = [
  { group: 'Classes 1–5', covers: 'Foundation: number, shape, measurement', size: '5 years', tab: 'classes1-5' },
  { group: 'Classes 6–8', covers: 'Explorer: integers, algebra, geometry', size: '39 chapters', tab: 'classes6-9' },
  { group: 'Class 9', covers: 'Pre-secondary: proofs, statistics, surfaces', size: '8 chapters', tab: 'class9' },
  { group: 'Class 10', covers: 'Secondary: trigonometry, circles, probability', size: 'Board year', tab: 'class10' },
  { group: 'Classes 11–12', covers: 'Senior secondary: calculus, vectors, matrices', size: 'Two years', tab: 'class12' },
  { group: 'Engineering', covers: 'Diploma and B.Tech: applied mathematics', size: 'Applied', tab: 'engineering' },
  { group: 'Graduation', covers: 'B.Sc. and beyond: higher mathematics', size: 'Higher', tab: 'graduation' },
];

export const CurriculumTable: React.FC<CurriculumTableProps> = ({ onSelectTab }) => {
  return (
    <section className="curriculum" id="curriculum" data-nav-theme="paper">
      <div className="shell">
        <div className="curriculum__head">
          <h2 className="curriculum__title" data-reveal>
            The whole syllabus.
          </h2>
          <p className="curriculum__note" data-reveal style={{ ['--reveal-delay' as string]: '100ms' }}>
            Seven groups, one sequence. Start at the class you are in, move up when the chapter is
            done. Classes 6–9 alone hold forty-seven chapters.
          </p>
        </div>

        <div className="curriculum__body">
          <figure className="curriculum__figure" data-reveal="mask">
            <img
              src="/images/history/lilavati-of-bhaskaracharya-ii-sanskrit-language-newar.jpg"
              alt="A page from a sixteenth-century manuscript of Bhaskara II’s Lilavati in Newar script."
              width={1920}
              height={2240}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Lilavati of Bhaskara II, a sixteenth-century copy in Newar script. Public domain, via
              Wikimedia Commons.
            </figcaption>
          </figure>

          <div className="curriculum__table-wrap" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            <table className="curriculum__table">
              <caption>Class groups and what each one covers</caption>
              <thead>
                <tr>
                  <th scope="col">Class group</th>
                  <th scope="col">Covers</th>
                  <th scope="col">Size</th>
                  <th scope="col">
                    <span className="sr-only">Open</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.group}>
                    <td>{row.group}</td>
                    <td>{row.covers}</td>
                    <td>{row.size}</td>
                    <td>
                      <button type="button" onClick={() => onSelectTab(row.tab)}>
                        Open
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
