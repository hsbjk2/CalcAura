import React, { useMemo, useState } from 'react';
import { evaluateExpression, formatNum } from '../../math/parser.ts';

const toMath = (value: string) => value.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');

export const CalculatorFragment: React.FC = () => {
  const [expression, setExpression] = useState('12.5 × 8 − 4');
  const [result, setResult] = useState('96');

  const preview = useMemo(() => {
    const value = evaluateExpression(toMath(expression));
    return Number.isFinite(value) ? formatNum(value, 4) : '';
  }, [expression]);

  const press = (key: string) => {
    if (key === 'C') {
      setExpression('');
      setResult('0');
      return;
    }
    if (key === '=') {
      const value = evaluateExpression(toMath(expression));
      setResult(Number.isFinite(value) ? formatNum(value, 6) : 'Check the expression');
      return;
    }
    setExpression((current) => `${current}${key}`);
  };

  const keys = ['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '='];

  return (
    <div className="calc-fragment" data-ui>
      <div className="calc-fragment__screen">
        <span className="calc-fragment__expr">{expression || '0'}</span>
        <span className="calc-fragment__result">{result || preview || '0'}</span>
      </div>
      <div className="calc-fragment__keys">
        {keys.map((key) => (
          <button
            key={key}
            type="button"
            className={`calc-fragment__key${
              key === '=' ? ' calc-fragment__key--eq' : /[÷×−+]/.test(key) ? ' calc-fragment__key--op' : ''
            }`}
            onClick={() => press(key)}
            aria-label={key === 'C' ? 'Clear' : key === '=' ? 'Equals' : key}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export const BoardFragment: React.FC = () => {
  return (
    <div className="board-fragment" data-ui>
      <div className="board-fragment__top">
        <span>Sheet 1 of 3 · Grid on</span>
        <span>Pen · 1.5 px</span>
      </div>
      <div className="board-fragment__surface">
        <svg viewBox="0 0 480 260" aria-label="A hand-drawn parabola with a tangent line on a grid">
          <g stroke="#0a0c09" strokeOpacity="0.16" strokeWidth="1">
            {Array.from({ length: 11 }, (_, index) => (
              <line key={`v${index}`} x1={index * 48} y1="0" x2={index * 48} y2="260" />
            ))}
            {Array.from({ length: 6 }, (_, index) => (
              <line key={`h${index}`} x1="0" y1={index * 52} x2="480" y2={index * 52} />
            ))}
          </g>
          <g stroke="#0a0c09" strokeOpacity="0.5" strokeWidth="1.4">
            <line x1="0" y1="200" x2="480" y2="200" />
            <line x1="96" y1="0" x2="96" y2="260" />
          </g>
          <path
            className="board-stroke"
            d="M 48 236 C 130 236 150 54 240 54 C 330 54 350 236 432 236"
            fill="none"
            stroke="#0a0c09"
            strokeWidth="2.6"
            strokeLinecap="round"
            pathLength="1"
          />
          <line x1="168" y1="132" x2="342" y2="132" stroke="#6f8f00" strokeWidth="2" strokeDasharray="6 5" />
          <circle cx="240" cy="132" r="5" fill="#0a0c09" />
          <text x="250" y="126" fill="#0a0c09" fontSize="13" fontFamily="Jost, sans-serif">
            vertex (2, 1)
          </text>
          <text x="286" y="154" fill="#555b4e" fontSize="12" fontFamily="Jost, sans-serif">
            tangent y = 1
          </text>
          <text x="108" y="222" fill="#555b4e" fontSize="12" fontFamily="Jost, sans-serif">
            y = x² − 4x + 5
          </text>
        </svg>
      </div>
      <div className="board-fragment__tools" aria-hidden="true">
        <span className="board-fragment__tool">Pen</span>
        <span className="board-fragment__tool">Line</span>
        <span className="board-fragment__tool">Text</span>
        <span className="board-fragment__tool">Erase</span>
      </div>
    </div>
  );
};

export const QuizFragment: React.FC = () => {
  const [choice, setChoice] = useState<string | null>(null);
  const options = [
    { id: 'a', text: '2 and 3', correct: true },
    { id: 'b', text: '−2 and −3', correct: false },
    { id: 'c', text: '1 and 6', correct: false },
  ];
  const selected = options.find((option) => option.id === choice);

  return (
    <div className="quiz-fragment" data-ui>
      <div className="quiz-fragment__meta">
        <span>Class 10 · Quadratic equations</span>
        <span>Question 4 of 8</span>
      </div>
      <p className="quiz-fragment__q">The roots of x² − 5x + 6 = 0 are</p>
      <div className="quiz-fragment__options">
        {options.map((option, index) => {
          const isRight = choice === option.id && option.correct;
          const isWrong = choice === option.id && !option.correct;
          return (
            <button
              key={option.id}
              type="button"
              className={`quiz-fragment__option${
                isRight ? ' quiz-fragment__option--right' : isWrong ? ' quiz-fragment__option--wrong' : ''
              }`}
              aria-pressed={choice === option.id}
              onClick={() => setChoice(option.id)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
      <div className="quiz-fragment__foot">
        <span>
          {choice
            ? selected?.correct
              ? 'Correct · +10'
              : 'Not quite · try the factor pair'
            : 'Choose one answer'}
        </span>
        <strong>4 / 8</strong>
      </div>
    </div>
  );
};
