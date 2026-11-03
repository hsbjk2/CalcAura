import React, { useId, useRef, useState } from 'react';
import { solveQuadratic, solveSystem2x2 } from '../math/algebra.ts';
import { MathView } from './MathView.tsx';
import { CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { GlassPanel, Reveal, Tilt3D } from './ui/Depth.tsx';
import '../styles/solver.css';

type SolverMode = 'quadratic' | 'system' | 'linear';

const MODES: { id: SolverMode; label: string }[] = [
  { id: 'quadratic', label: 'Quadratic' },
  { id: 'system', label: '2×2 system' },
  { id: 'linear', label: 'Linear · ax + b' },
];

const cleanStep = (step: string) => step.replace(/^\s*\d+\.\s*/, '').trim();

export const EquationSolver: React.FC = () => {
  const [mode, setMode] = useState<SolverMode>('quadratic');

  // Quadratic state
  const [qa, setQa] = useState<number>(1);
  const [qb, setQb] = useState<number>(-5);
  const [qc, setQc] = useState<number>(6);

  // System 2x2 state
  const [sA1, setSA1] = useState<number>(2);
  const [sB1, setSB1] = useState<number>(1);
  const [sC1, setSC1] = useState<number>(5);
  const [sA2, setSA2] = useState<number>(1);
  const [sB2, setSB2] = useState<number>(3);
  const [sC2, setSC2] = useState<number>(10);

  // Linear state
  const [la, setLa] = useState<number>(3);
  const [lb, setLb] = useState<number>(-12);

  // Clicking the solve action re-runs the worked-step entrance and moves
  // focus to the proof. The arithmetic itself is always live.
  const [solveTick, setSolveTick] = useState(0);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const outputId = useId();

  // Quadratic solution
  const quadSol = solveQuadratic(qa, qb, qc);

  // System solution
  const sysSol = solveSystem2x2(sA1, sB1, sC1, sA2, sB2, sC2);

  // Linear solution: ax + b = 0 => x = -b/a
  const linX = la !== 0 ? -lb / la : NaN;

  // Form input unique IDs
  const qaId = useId();
  const qbId = useId();
  const qcId = useId();
  const sA1Id = useId();
  const sB1Id = useId();
  const sC1Id = useId();
  const sA2Id = useId();
  const sB2Id = useId();
  const sC2Id = useId();
  const laId = useId();
  const lbId = useId();

  const quadExpression = `${qa}x^{2} ${qb >= 0 ? `+ ${qb}` : `- ${Math.abs(qb)}`}x ${
    qc >= 0 ? `+ ${qc}` : `- ${Math.abs(qc)}`
  } = 0`;

  const systemExpression = `\\begin{cases} ${sA1}x + ${sB1}y = ${sC1} \\\\ ${sA2}x + ${sB2}y = ${sC2} \\end{cases}`;

  const linearExpression = `${la}x ${lb >= 0 ? `+ ${lb}` : `- ${Math.abs(lb)}`} = 0`;

  const liveExpression =
    mode === 'quadratic' ? quadExpression : mode === 'system' ? systemExpression : linearExpression;

  const planeFormula =
    mode === 'quadratic'
      ? 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'
      : mode === 'system'
        ? 'x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}'
        : 'x = -\\frac{b}{a}';

  const planeBack =
    mode === 'quadratic'
      ? '\\Delta = b^2 - 4ac'
      : mode === 'system'
        ? 'D = a_1b_2 - a_2b_1'
        : 'ax = -b';

  const planeBackLabel =
    mode === 'quadratic' ? 'Discriminant' : mode === 'system' ? "Determinant" : 'Isolate';

  const inputTitle =
    mode === 'quadratic'
      ? 'Quadratic coefficients'
      : mode === 'system'
        ? 'System coefficients'
        : 'Linear coefficients';

  const systemStatus =
    sysSol.status === 'unique'
      ? 'Unique intersection'
      : sysSol.status === 'inconsistent'
        ? 'Parallel · no solution'
        : 'Coincident · infinite solutions';

  const linearSteps = [
    `Given linear equation: ${la}x + (${lb}) = 0`,
    `Isolate the variable: ${la}x = ${-lb}`,
    `Divide by the coefficient of x: x = (${-lb}) / ${la} = ${linX.toFixed(4)}`,
    `Substitute back: ${la} × (${linX.toFixed(4)}) + (${lb}) = ${(la * linX + lb).toFixed(4)} ≈ 0`,
  ];

  const quadraticPresets: { label: string; values: [number, number, number] }[] = [
    { label: 'x² − 5x + 6 = 0', values: [1, -5, 6] },
    { label: '(x − 2)² = 0', values: [1, -4, 4] },
    { label: 'x² + 2x + 5 = 0', values: [1, 2, 5] },
  ];

  const systemPresets: { label: string; values: [number, number, number, number, number, number] }[] = [
    { label: '2x + y = 5, x + 3y = 10', values: [2, 1, 5, 1, 3, 10] },
    { label: '2x + y = 5, 4x + 2y = 10', values: [2, 1, 5, 4, 2, 10] },
    { label: '2x + y = 5, 4x + 2y = 8', values: [2, 1, 5, 4, 2, 8] },
  ];

  const linearPresets: { label: string; values: [number, number] }[] = [
    { label: '3x − 12 = 0', values: [3, -12] },
    { label: '2x + 5 = 0', values: [2, 5] },
    { label: 'x − 7 = 0', values: [1, -7] },
  ];

  const readingNotes =
    mode === 'quadratic'
      ? [
          {
            lead: 'Δ decides the roots.',
            body: 'Positive gives two real roots, zero gives one repeated root, negative gives a conjugate pair.',
          },
          {
            lead: 'The vertex is the turning point.',
            body: 'V(h, k) sits on the axis x = h, halfway between the roots. The sign of a sets the opening direction.',
          },
          {
            lead: 'Read the cards in order.',
            body: 'Standard form, discriminant, roots, then the geometric checks. Derivation lines use 4 d.p.',
          },
        ]
      : mode === 'system'
        ? [
            {
              lead: 'Three determinants, one answer.',
              body: "Cramer's rule solves x = Dx / D and y = Dy / D when D is non-zero.",
            },
            {
              lead: 'D tells you the geometry.',
              body: 'D = 0 with Dx = Dy = 0 means the lines coincide; a non-zero numerator means they are parallel.',
            },
            {
              lead: 'The proof is the substitution.',
              body: 'The last cards put x and y back into both original equations to confirm both balances.',
            },
          ]
        : [
            {
              lead: 'One operation per card.',
              body: 'Move the constant across, then divide by the coefficient of x to isolate the root.',
            },
            {
              lead: 'A zero coefficient needs care.',
              body: 'If a = 0 there is no single root to divide into; the equation either has no solution or every x works.',
            },
            {
              lead: 'Check before you trust it.',
              body: 'The final card substitutes the root back into ax + b, so you can see the expression land on zero.',
            },
          ];

  const handleSolve = () => {
    setSolveTick((tick) => tick + 1);
    const node = resultRef.current;
    if (!node) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    node.focus({ preventScroll: true });
  };

  const renderSteps = (steps: string[], label: string) => (
    <div className="solver-steps">
      <div className="solver-steps__head">
        <span className="solver-kicker">{label}</span>
        <span className="solver-steps__count">{steps.length} steps</span>
      </div>
      <ol className="solver-steplist">
        {steps.map((step, index) => (
          <li
            key={index}
            className="solver-step"
            style={{ ['--step-delay' as string]: `${index * 55}ms` }}
          >
            <span className="solver-step__num" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="solver-step__text">{cleanStep(step)}</p>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <div className="solver-desk">
      {/* Header: editorial copy on one side, a real layered formula plane on the other. */}
      <div className="solver-head">
        <Reveal className="solver-head__copy">
          <span className="solver-eyebrow">Equation solver · algebra desk</span>
          <h2 className="solver-title">
            Solve it, <em>then read</em> the proof.
          </h2>
          <p className="solver-lead">
            Quadratic roots, 2×2 linear systems and simple linear equations — solved locally with
            discriminant analysis, Cramer&apos;s rule and a substitution check.
          </p>

          <div className="solver-modes" role="group" aria-label="Choose equation type">
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                className="solver-mode"
                aria-pressed={mode === item.id}
                onClick={() => setMode(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="solver-head__stage" delay={110}>
          <Tilt3D className="solver-plane" strength={8}>
            <span className="solver-plane__glow" aria-hidden="true" />
            <span className="solver-plane__glyph solver-plane__glyph--a" aria-hidden="true">
              Δ
            </span>
            <span className="solver-plane__glyph solver-plane__glyph--b" aria-hidden="true">
              √
            </span>

            <div className="solver-plane__sheet solver-plane__sheet--back">
              <span className="solver-plane__label">{planeBackLabel}</span>
              <MathView math={planeBack} displayMode className="solver-plane__math" />
            </div>

            <div className="solver-plane__sheet solver-plane__sheet--mid">
              <span className="solver-plane__label">
                {mode === 'system' ? "Cramer's rule" : mode === 'linear' ? 'Root' : 'Formula'}
              </span>
              <MathView math={planeFormula} displayMode className="solver-plane__math" />
            </div>

            <div className="solver-plane__sheet solver-plane__sheet--front">
              <span className="solver-plane__tag">Live equation</span>
              <MathView math={liveExpression} displayMode className="solver-plane__math" />
              <span className="solver-plane__foot">
                {mode === 'quadratic' ? 'a ≠ 0' : mode === 'system' ? 'two unknowns' : 'one unknown'}
              </span>
            </div>
          </Tilt3D>
        </Reveal>
      </div>

      {/* Desk: inputs on the left, the worked proof on the right. */}
      <div className="solver-grid">
        <Reveal className="solver-col solver-col--input" delay={80}>
          <GlassPanel className="solver-panel solver-panel--input">
            <div className="solver-panel__head">
              <div>
                <span className="solver-kicker">01 · Input</span>
                <h3 className="solver-panel__title">{inputTitle}</h3>
              </div>
              <button
                type="button"
                className="solver-reset"
                onClick={() => {
                  if (mode === 'quadratic') {
                    setQa(1);
                    setQb(-5);
                    setQc(6);
                  } else if (mode === 'system') {
                    setSA1(2);
                    setSB1(1);
                    setSC1(5);
                    setSA2(1);
                    setSB2(3);
                    setSC2(10);
                  } else {
                    setLa(3);
                    setLb(-12);
                  }
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>

            <div
              className={`solver-expression ${
                mode === 'system' ? 'solver-expression--system' : ''
              }`}
            >
              <span className="solver-expression__label">Live expression</span>
              <MathView math={liveExpression} displayMode className="solver-expression__math" />
            </div>

            {mode === 'quadratic' && (
              <div className="solver-fieldset">
                <div className="solver-fields">
                  <label className="solver-field" htmlFor={qaId}>
                    <span className="solver-field__label">
                      <strong>a</strong> · x² coefficient
                    </span>
                    <input
                      id={qaId}
                      className="solver-input"
                      type="number"
                      inputMode="decimal"
                      value={qa}
                      onChange={(e) => setQa(parseFloat(e.target.value) || 0)}
                    />
                  </label>
                  <label className="solver-field" htmlFor={qbId}>
                    <span className="solver-field__label">
                      <strong>b</strong> · x coefficient
                    </span>
                    <input
                      id={qbId}
                      className="solver-input"
                      type="number"
                      inputMode="decimal"
                      value={qb}
                      onChange={(e) => setQb(parseFloat(e.target.value) || 0)}
                    />
                  </label>
                  <label className="solver-field" htmlFor={qcId}>
                    <span className="solver-field__label">
                      <strong>c</strong> · constant
                    </span>
                    <input
                      id={qcId}
                      className="solver-input"
                      type="number"
                      inputMode="decimal"
                      value={qc}
                      onChange={(e) => setQc(parseFloat(e.target.value) || 0)}
                    />
                  </label>
                </div>

                <div className="solver-examples">
                  <span className="solver-examples__label">Example equations</span>
                  <div className="solver-chips">
                    {quadraticPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        className="solver-chip"
                        onClick={() => {
                          setQa(preset.values[0]);
                          setQb(preset.values[1]);
                          setQc(preset.values[2]);
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mode === 'system' && (
              <div className="solver-fieldset">
                <div className="solver-system">
                  <div className="solver-system__row">
                    <div className="solver-system__label">
                      <span>Equation 1</span>
                      <span>a₁x + b₁y = c₁</span>
                    </div>
                    <div className="solver-system__grid">
                      <label className="solver-coef" htmlFor={sA1Id}>
                        <span>a₁</span>
                        <input
                          id={sA1Id}
                          className="solver-input solver-input--coef"
                          type="number"
                          inputMode="decimal"
                          value={sA1}
                          onChange={(e) => setSA1(parseFloat(e.target.value) || 0)}
                        />
                      </label>
                      <label className="solver-coef" htmlFor={sB1Id}>
                        <span>b₁</span>
                        <input
                          id={sB1Id}
                          className="solver-input solver-input--coef"
                          type="number"
                          inputMode="decimal"
                          value={sB1}
                          onChange={(e) => setSB1(parseFloat(e.target.value) || 0)}
                        />
                      </label>
                      <label className="solver-coef" htmlFor={sC1Id}>
                        <span>c₁</span>
                        <input
                          id={sC1Id}
                          className="solver-input solver-input--coef solver-input--rhs"
                          type="number"
                          inputMode="decimal"
                          value={sC1}
                          onChange={(e) => setSC1(parseFloat(e.target.value) || 0)}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="solver-system__row">
                    <div className="solver-system__label">
                      <span>Equation 2</span>
                      <span>a₂x + b₂y = c₂</span>
                    </div>
                    <div className="solver-system__grid">
                      <label className="solver-coef" htmlFor={sA2Id}>
                        <span>a₂</span>
                        <input
                          id={sA2Id}
                          className="solver-input solver-input--coef"
                          type="number"
                          inputMode="decimal"
                          value={sA2}
                          onChange={(e) => setSA2(parseFloat(e.target.value) || 0)}
                        />
                      </label>
                      <label className="solver-coef" htmlFor={sB2Id}>
                        <span>b₂</span>
                        <input
                          id={sB2Id}
                          className="solver-input solver-input--coef"
                          type="number"
                          inputMode="decimal"
                          value={sB2}
                          onChange={(e) => setSB2(parseFloat(e.target.value) || 0)}
                        />
                      </label>
                      <label className="solver-coef" htmlFor={sC2Id}>
                        <span>c₂</span>
                        <input
                          id={sC2Id}
                          className="solver-input solver-input--coef solver-input--rhs"
                          type="number"
                          inputMode="decimal"
                          value={sC2}
                          onChange={(e) => setSC2(parseFloat(e.target.value) || 0)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="solver-examples">
                  <span className="solver-examples__label">Example systems</span>
                  <div className="solver-chips">
                    {systemPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        className="solver-chip"
                        onClick={() => {
                          setSA1(preset.values[0]);
                          setSB1(preset.values[1]);
                          setSC1(preset.values[2]);
                          setSA2(preset.values[3]);
                          setSB2(preset.values[4]);
                          setSC2(preset.values[5]);
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mode === 'linear' && (
              <div className="solver-fieldset">
                <div className="solver-fields solver-fields--linear">
                  <label className="solver-field" htmlFor={laId}>
                    <span className="solver-field__label">
                      <strong>a</strong> · coefficient of x
                    </span>
                    <input
                      id={laId}
                      className="solver-input"
                      type="number"
                      inputMode="decimal"
                      value={la}
                      onChange={(e) => setLa(parseFloat(e.target.value) || 0)}
                    />
                  </label>
                  <label className="solver-field" htmlFor={lbId}>
                    <span className="solver-field__label">
                      <strong>b</strong> · constant
                    </span>
                    <input
                      id={lbId}
                      className="solver-input"
                      type="number"
                      inputMode="decimal"
                      value={lb}
                      onChange={(e) => setLb(parseFloat(e.target.value) || 0)}
                    />
                  </label>
                </div>

                <div className="solver-examples">
                  <span className="solver-examples__label">Example equations</span>
                  <div className="solver-chips">
                    {linearPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        className="solver-chip"
                        onClick={() => {
                          setLa(preset.values[0]);
                          setLb(preset.values[1]);
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="solver-action">
              <button
                type="button"
                className="solver-solve"
                onClick={handleSolve}
                aria-controls={outputId}
              >
                <span>Solve &amp; show working</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="solver-action__hint">
                Results update live as you type — the action replays the proof.
              </span>
            </div>
          </GlassPanel>
        </Reveal>

        <Reveal className="solver-col solver-col--result" delay={150}>
          <div
            className="solver-result-anchor"
            id={outputId}
            ref={resultRef}
            tabIndex={-1}
            aria-label="Worked solution"
          >
            <GlassPanel className="solver-panel solver-panel--result">
              <div className="solver-panel__head">
                <div>
                  <span className="solver-kicker">02 · Working</span>
                  <h3 className="solver-panel__title">Mathematical solution</h3>
                </div>
                <span className="solver-verified">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Checked steps</span>
                </span>
              </div>

              <div className="solver-panel__body" key={`${mode}-${solveTick}`}>
                {mode === 'quadratic' && quadSol && (
                  <div className="solver-body">
                    <div className="solver-metrics">
                      <div className="solver-metric solver-metric--accent">
                        <span className="solver-metric__label">Discriminant</span>
                        <span className="solver-metric__value">{quadSol.discriminant}</span>
                        <span className="solver-metric__note">Δ = b² − 4ac</span>
                      </div>
                      <div className="solver-metric">
                        <span className="solver-metric__label">Nature of roots</span>
                        <span className="solver-metric__value solver-metric__value--text">
                          {quadSol.rootType === 'two-real'
                            ? 'Two real roots'
                            : quadSol.rootType === 'one-real'
                              ? 'One repeated root'
                              : 'Complex conjugates'}
                        </span>
                        <span className="solver-metric__note">from the sign of Δ</span>
                      </div>
                      <div className="solver-metric">
                        <span className="solver-metric__label">Vertex V(h, k)</span>
                        <span className="solver-metric__value">
                          ({quadSol.vertex.x.toFixed(2)}, {quadSol.vertex.y.toFixed(2)})
                        </span>
                        <span className="solver-metric__note">
                          axis x = {quadSol.axisOfSymmetry.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="solver-formula">
                      <span className="solver-formula__label">Standard quadratic formula</span>
                      <MathView
                        math={quadSol.latexFormula}
                        displayMode
                        className="solver-formula__math"
                      />
                    </div>

                    {renderSteps(quadSol.steps, 'Detailed derivation')}
                  </div>
                )}

                {mode === 'quadratic' && !quadSol && (
                  <div className="solver-empty">
                    <span className="solver-empty__mark" aria-hidden="true">
                      a = 0
                    </span>
                    <p>
                      A quadratic needs a non-zero x² coefficient. Set <strong>a</strong> to any
                      value other than zero, or switch to the linear desk.
                    </p>
                  </div>
                )}

                {mode === 'system' && (
                  <div className="solver-body">
                    <div className="solver-metrics">
                      <div className="solver-metric solver-metric--accent">
                        <span className="solver-metric__label">Solution for x</span>
                        <span className="solver-metric__value">
                          {sysSol.status === 'unique' ? sysSol.x.toFixed(4) : '—'}
                        </span>
                        <span className="solver-metric__note">
                          {sysSol.status === 'unique' ? 'x = Dx / D' : systemStatus}
                        </span>
                      </div>
                      <div className="solver-metric">
                        <span className="solver-metric__label">Solution for y</span>
                        <span className="solver-metric__value">
                          {sysSol.status === 'unique' ? sysSol.y.toFixed(4) : '—'}
                        </span>
                        <span className="solver-metric__note">
                          {sysSol.status === 'unique' ? 'y = Dy / D' : systemStatus}
                        </span>
                      </div>
                      <div className="solver-metric">
                        <span className="solver-metric__label">Determinant D</span>
                        <span className="solver-metric__value">{sysSol.D}</span>
                        <span className="solver-metric__note">{systemStatus}</span>
                      </div>
                    </div>

                    <div className="solver-formula">
                      <span className="solver-formula__label">Cramer&apos;s rule</span>
                      <MathView
                        math={'x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}'}
                        displayMode
                        className="solver-formula__math"
                      />
                    </div>

                    {renderSteps(sysSol.steps, "Cramer's rule determinants")}
                  </div>
                )}

                {mode === 'linear' && (
                  <div className="solver-body">
                    <div className="solver-root">
                      <span className="solver-root__label">Root x</span>
                      <span className="solver-root__value">
                        x = {isNaN(linX) ? 'Undefined' : linX.toFixed(4)}
                      </span>
                      <span className="solver-root__note">
                        {isNaN(linX) ? 'a = 0 · no single root' : 'one solution · x = −b / a'}
                      </span>
                    </div>

                    <div className="solver-formula">
                      <span className="solver-formula__label">Linear formula</span>
                      <MathView
                        math={'x = -\\frac{b}{a}'}
                        displayMode
                        className="solver-formula__math"
                      />
                    </div>

                    {renderSteps(linearSteps, 'Linear derivation')}
                  </div>
                )}
              </div>
            </GlassPanel>
          </div>
        </Reveal>
      </div>

      <Reveal className="solver-note-wrap" delay={200}>
        <GlassPanel className="solver-note">
          <div className="solver-note__head">
            <div>
              <span className="solver-kicker">Guide</span>
              <h3 className="solver-note__title">How to read this solution.</h3>
            </div>
            <span className="solver-note__stamp">4 d.p. · computed locally</span>
          </div>
          <ul className="solver-note__list">
            {readingNotes.map((note) => (
              <li key={note.lead}>
                <strong>{note.lead}</strong> {note.body}
              </li>
            ))}
          </ul>
        </GlassPanel>
      </Reveal>
    </div>
  );
};
