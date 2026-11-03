import React, { useMemo, useState } from 'react';
import { MathSurface } from './MathSurface.tsx';
import { evaluateExpressionXY, formatNum } from '../../math/parser.ts';

interface WorkspaceFrameProps {
  className?: string;
  initialExpression?: string;
}

const PRESETS = [
  { id: 'ripple', label: 'Ripple', expression: 'sin(x) * cos(y)' },
  { id: 'saddle', label: 'Saddle', expression: 'x^2 - y^2' },
  { id: 'bowl', label: 'Bowl', expression: 'x^2 + y^2' },
];

/**
 * A cropped, working fragment of the CalcAura surface lab: a real expression
 * field, real presets and a live Three.js mesh, not a drawn mock-up.
 */
export const WorkspaceFrame: React.FC<WorkspaceFrameProps> = ({
  className = '',
  initialExpression = 'sin(x) * cos(y)',
}) => {
  const [expression, setExpression] = useState(initialExpression);
  const [activePreset, setActivePreset] = useState(
    PRESETS.find((preset) => preset.expression === initialExpression)?.id ?? '',
  );

  const centerValue = useMemo(() => evaluateExpressionXY(expression, 0, 0), [expression]);

  const choosePreset = (preset: (typeof PRESETS)[number]) => {
    setExpression(preset.expression);
    setActivePreset(preset.id);
  };

  return (
    <div className={`workspace-frame ${className}`.trim()} data-ui>
      <div className="workspace-frame__bar">
        <span className="workspace-frame__title">
          <span className="workspace-frame__dot" aria-hidden="true" />
          CalcAura / Surface lab
        </span>
        <span>Live · WebGL</span>
      </div>

      <div className="workspace-frame__body">
        <div className="workspace-frame__canvas">
          <MathSurface
            expression={expression}
            ariaLabel={`Live surface plot of z equals ${expression}`}
          />
          <span className="workspace-frame__badge">z = f(x, y)</span>
          <div className="workspace-frame__readout">
            <span>
              f(0, 0) <strong>{formatNum(centerValue, 3)}</strong>
            </span>
            <span>
              domain <strong>−3…3</strong>
            </span>
            <span>
              mesh <strong>45 × 45</strong>
            </span>
          </div>
        </div>

        <div className="workspace-frame__panel">
          <span className="workspace-frame__label">Surface</span>

          <form className="workspace-frame__form" onSubmit={(event) => event.preventDefault()}>
            <span aria-hidden="true">z =</span>
            <input
              className="workspace-frame__input"
              type="text"
              value={expression}
              onChange={(event) => {
                setExpression(event.target.value);
                setActivePreset('');
              }}
              spellCheck={false}
              autoComplete="off"
              aria-label="Surface expression in x and y"
            />
          </form>

          <div className="workspace-frame__presets" role="group" aria-label="Surface presets">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="workspace-frame__preset"
                aria-pressed={activePreset === preset.id}
                onClick={() => choosePreset(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <p className="workspace-frame__note">
            Type an expression in x and y. The mesh redraws as you type, using the same safe
            evaluator that runs in the calculator.
          </p>

          <div className="workspace-frame__stats">
            <div className="workspace-frame__stat">
              <span>Derivative</span>
              <strong>live</strong>
            </div>
            <div className="workspace-frame__stat">
              <span>Evaluator</span>
              <strong>safe</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="workspace-frame__foot">
        <span>Drag the surface to turn it</span>
        <span>Class 1–12 · Engineering · Graduation</span>
      </div>
    </div>
  );
};
