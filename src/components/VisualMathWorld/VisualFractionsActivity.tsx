import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Reveal, Tilt3D } from '../ui/Depth.tsx';
import '../../styles/visual-activities-b.css';

export const VisualFractionsActivity: React.FC = () => {
  const [denominator, setDenominator] = useState<number>(4);
  const [selectedSlices, setSelectedSlices] = useState<Record<number, boolean>>({ 0: true });
  const [foodType, setFoodType] = useState<'pizza' | 'chocolate' | 'bar'>('pizza');

  const selectedCount = Object.keys(selectedSlices).length;
  const fractionValue = selectedCount / denominator;
  const hasSelection = selectedCount > 0;
  const progress = hasSelection ? 100 : 62;

  const toggleSlice = (idx: number) => {
    setSelectedSlices((prev) => {
      const next = { ...prev };
      if (next[idx]) {
        delete next[idx];
      } else {
        next[idx] = true;
      }
      return next;
    });
  };

  const handleSelectDenominator = (d: number) => {
    setDenominator(d);
    setSelectedSlices({ 0: true });
  };

  // Simplification for equivalent fraction
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const commonDiv = gcd(selectedCount, denominator);
  const simplifiedNum = selectedCount / commonDiv;
  const simplifiedDen = denominator / commonDiv;
  const isEquivalent = commonDiv > 1 && selectedCount > 0;

  const foodOptions = [
    { id: 'pizza' as const, label: 'Pizza' },
    { id: 'chocolate' as const, label: 'Chocolate' },
    { id: 'bar' as const, label: 'Fraction bar' },
  ];

  return (
    <Reveal as="article" className="vma">
      <header className="vma-head">
        <div className="vma-head__lead">
          <span className="vma-mark" aria-hidden="true">
            ½
          </span>
          <div>
            <p className="vma-eyebrow">
              <span className="vma-eyebrow__rule" aria-hidden="true" />
              Visual Math World · 05
            </p>
            <h3 className="vma-title">Visual fractions playground</h3>
            <p className="vma-sub">Shade equal parts of a whole and read the fraction you make.</p>
          </div>
        </div>

        <div className="vma-head__tools">
          <span className="vma-chip">Class 2–5</span>
          <div className="vma-seg" role="group" aria-label="Object model">
            {foodOptions.map((food) => (
              <button
                key={food.id}
                type="button"
                onClick={() => setFoodType(food.id)}
                aria-pressed={foodType === food.id}
                className={foodType === food.id ? 'is-active' : ''}
              >
                {food.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="vma-instruction">
        <span className="vma-instruction__dot" aria-hidden="true" />
        <p>
          <strong>Tap to shade.</strong> Choose the number of equal parts, then shade the fraction you want to
          name.
        </p>
        <span className="vma-instruction__meta">
          {selectedCount}/{denominator} shaded
        </span>
      </div>

      <div className="vma-rail" role="group" aria-label="Activity progress">
        <span className="vma-rail__track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </span>
        <ol>
          <li className="is-done">
            <span className="vma-rail__dot" aria-hidden="true" />
            Divide
          </li>
          <li className={hasSelection ? 'is-done' : 'is-active'} aria-current={hasSelection ? undefined : 'step'}>
            <span className="vma-rail__dot" aria-hidden="true" />
            Shade
          </li>
          <li className={hasSelection ? 'is-active' : ''} aria-current={hasSelection ? 'step' : undefined}>
            <span className="vma-rail__dot" aria-hidden="true" />
            Read
          </li>
        </ol>
      </div>

      {/* Denominator selector */}
      <section className="vma-controls vma-controls--single" aria-label="Choose equal parts">
        <div className="vma-control">
          <span className="vma-control__label" id="vma-den-label">
            Divide the whole into equal parts
          </span>
          <div className="vma-num-row" role="group" aria-labelledby="vma-den-label">
            {[2, 3, 4, 6, 8].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleSelectDenominator(d)}
                aria-pressed={denominator === d}
                className={`vma-num vma-num--wide ${denominator === d ? 'is-active' : ''}`}
              >
                {d} parts
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive slices visualiser */}
      <Tilt3D className="vma-tray vma-stage" strength={5}>
        {foodType === 'pizza' && (
          <div className="vma-food">
            <div className="vma-pizza">
              <svg
                viewBox="0 0 200 200"
                role="group"
                aria-label={`Pizza divided into ${denominator} equal parts`}
              >
                {Array.from({ length: denominator }).map((_, idx) => {
                  const anglePerSlice = 360 / denominator;
                  const startAngle = idx * anglePerSlice;
                  const endAngle = (idx + 1) * anglePerSlice;
                  const isSelected = selectedSlices[idx];

                  // Polar to Cartesian
                  const r = 90;
                  const cx = 100;
                  const cy = 100;
                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;
                  const x1 = cx + r * Math.cos(startRad);
                  const y1 = cy + r * Math.sin(startRad);
                  const x2 = cx + r * Math.cos(endRad);
                  const y2 = cy + r * Math.sin(endRad);

                  const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;

                  return (
                    <path
                      key={idx}
                      d={d}
                      role="button"
                      tabIndex={0}
                      aria-label={`Shade part ${idx + 1} of ${denominator}`}
                      aria-pressed={!!isSelected}
                      onClick={() => toggleSlice(idx)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          toggleSlice(idx);
                        }
                      }}
                      className={`vma-pizza__slice ${isSelected ? 'is-on' : ''}`}
                    />
                  );
                })}
                <circle className="vma-pizza__hub" cx="100" cy="100" r="8" aria-hidden="true" />
              </svg>
            </div>
            <p className="vma-food__hint">Tap a slice to shade it, or press Enter on a focused slice.</p>
          </div>
        )}

        {foodType === 'chocolate' && (
          <div className="vma-food vma-food--wide">
            <div className="vma-choc-wrap">
              <div
                className="vma-choc"
                style={{ gridTemplateColumns: `repeat(${denominator}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: denominator }).map((_, idx) => {
                  const isSelected = selectedSlices[idx];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleSlice(idx)}
                      aria-label={`Shade part ${idx + 1} of ${denominator}`}
                      aria-pressed={!!isSelected}
                      className={`vma-choc__piece ${isSelected ? 'is-on' : ''}`}
                    >
                      <span>1/{denominator}</span>
                      <span className="vma-piece__state">{isSelected ? 'Shaded' : 'Tap'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="vma-food__hint">Tap chocolate squares to break and shade them.</p>
          </div>
        )}

        {foodType === 'bar' && (
          <div className="vma-food vma-food--wide">
            <div className="vma-fbar">
              {Array.from({ length: denominator }).map((_, idx) => {
                const isSelected = selectedSlices[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleSlice(idx)}
                    aria-label={`Shade part ${idx + 1} of ${denominator}`}
                    aria-pressed={!!isSelected}
                    className={`vma-fbar__seg ${isSelected ? 'is-on' : ''}`}
                  >
                    <span>1/{denominator}</span>
                  </button>
                );
              })}
            </div>
            <p className="vma-food__hint">Tap fraction bar segments to shade them.</p>
          </div>
        )}
      </Tilt3D>

      {/* Fraction value and name card */}
      <div className="vma-fraction-card">
        <div className="vma-frac-readout">
          <div className="vma-frac-stack" aria-hidden="true">
            <span>{selectedCount}</span>
            <span className="vma-frac-stack__rule" />
            <span>{denominator}</span>
          </div>

          <div>
            <span className="vma-frac-label">Selected fraction</span>
            <h4 className="vma-frac-name">
              {selectedCount === 0
                ? 'Zero parts'
                : selectedCount === denominator
                ? 'One whole (1)'
                : selectedCount === 1 && denominator === 2
                ? 'One half (½)'
                : selectedCount === 1 && denominator === 4
                ? 'One quarter (¼)'
                : selectedCount === 3 && denominator === 4
                ? 'Three quarters (¾)'
                : `${selectedCount} out of ${denominator} equal parts`}
            </h4>
            <p className="vma-frac-meta">
              Decimal equivalent: <strong>{fractionValue.toFixed(2)}</strong> (
              {Math.round(fractionValue * 100)}%)
            </p>
          </div>
        </div>

        {/* Equivalent fraction badge */}
        {isEquivalent && (
          <div className="vma-equiv" role="status">
            <CheckCircle2 aria-hidden="true" />
            <div>
              <span className="vma-equiv__label">Equivalent fraction</span>
              <strong>
                {selectedCount}/{denominator} = {simplifiedNum}/{simplifiedDen}
              </strong>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
};
