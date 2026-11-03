import React from 'react';

const QUESTIONS = [
  {
    q: 'Is it free to start?',
    a: 'Yes. Open the workspace and use the calculators, graphing and geometry tools without an account. A free account adds saved whiteboards and practice history.',
  },
  {
    q: 'Which boards and classes are covered?',
    a: 'Class 1 to Class 12, mapped to CBSE, ICSE and the major state boards, then engineering and undergraduate mathematics. The table above lists every group.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. An account is only needed for work that should follow you between devices: notebooks, attempts and results, stored through Supabase under your Clerk user ID.',
  },
  {
    q: 'Does it work on a phone?',
    a: 'Yes. The calculator, practice and whiteboard are built for touch. Long proofs and multi-panel graphing are still easier on a laptop, so the layout adapts rather than shrinking the desk.',
  },
  {
    q: 'Can it handle engineering and higher mathematics?',
    a: 'Yes. Matrices, statistics, calculus, differential equations and scientific computing sit beside the school syllabus, using the same expression parser and canvas.',
  },
  {
    q: 'Where is my work saved?',
    a: 'Notebooks and practice attempts are stored in Supabase under your authenticated Clerk user ID. Your work is not sold, and it is not shared with other students.',
  },
];

export const Faq: React.FC = () => {
  return (
    <section className="faq" id="faq" data-nav-theme="paper">
      <div className="shell">
        <div className="faq__grid">
          <h2 className="faq__title" data-reveal>
            Questions, answered.
          </h2>

          <div className="faq__list" data-reveal style={{ ['--reveal-delay' as string]: '90ms' }}>
            {QUESTIONS.map((item, index) => (
              <details className="faq__item" key={item.q} open={index === 0}>
                <summary>{item.q}</summary>
                <div className="faq__answer">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
