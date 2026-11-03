import React, { useState } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { Reveal } from '../ui/Depth.tsx';
import { Plus, Equal, Sparkles, RotateCw, CheckCircle2, ArrowRight } from 'lucide-react';
import '../../styles/visual-activities.css';

export const PictureAdditionActivity: React.FC = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('apple');
  const [groupA, setGroupA] = useState<number>(3);
  const [groupB, setGroupB] = useState<number>(2);
  const [isCombined, setIsCombined] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const sum = groupA + groupB;
  const meta = VISUAL_ASSETS[assetType];

  const handleNewPuzzle = () => {
    const assets: VisualAssetType[] = ['apple', 'banana', 'orange', 'car', 'block', 'cookie', 'cupcake', 'star', 'flower'];
    const newAsset = assets[Math.floor(Math.random() * assets.length)];
    const a = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const b = Math.floor(Math.random() * 4) + 1; // 1 to 4
    setAssetType(newAsset);
    setGroupA(a);
    setGroupB(b);
    setIsCombined(false);
    setUserAnswer(null);
    setShowHint(false);
  };

  const handleCombine = () => {
    setIsCombined(true);
  };

  // Guarantee 4 unique options
  const uniqueOpts = Array.from(new Set([sum, sum + 1, Math.max(1, sum - 1), sum + 2])).sort((a, b) => a - b);

  const progress = userAnswer !== null ? 100 : isCombined ? 62 : 26;
  const progressLabel =
    userAnswer !== null ? 'Answered' : isCombined ? 'Groups combined' : 'Combine the groups';

  return (
    <Reveal as="section" className="va-shell" delay={40}>
      {/* Header */}
      <div className="va-head">
        <div className="va-head__id">
          <div className="va-mark" aria-hidden="true">+</div>
          <div>
            <h3 className="va-title">
              <span>Picture Addition</span>
              <span className="va-chip">Class 1–3</span>
            </h3>
            <p className="va-sub">Put two groups together. The total is the sum.</p>
          </div>
        </div>

        <button type="button" onClick={handleNewPuzzle} className="va-btn va-btn--ink va-btn--sm">
          <RotateCw className="w-3.5 h-3.5" />
          <span>New addition</span>
        </button>
      </div>

      {/* Progress rail */}
      <div className="va-progress">
        <div className="va-progress__meta">
          <span>Progress</span>
          <span>{progressLabel}</span>
        </div>
        <div
          className="va-rail"
          role="progressbar"
          aria-label="Addition progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span className="va-rail__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="va-body">
        {/* Instruction */}
        <div className="va-prompt">
          <span className="va-kicker">Activity instruction</span>
          <h4 className="va-question">
            {groupA} {groupA === 1 ? meta.name : meta.plural} + {groupB}{' '}
            {groupB === 1 ? meta.name : meta.plural} = ?
          </h4>
          <p className="va-hintline">Combine the groups, then choose the total below.</p>
        </div>

        {/* Visual addition stage */}
        {!isCombined ? (
          <div className="va-stage">
            {/* Group 1 */}
            <div className="va-groupcard">
              <span className="va-groupcard__label">Group 1 · {groupA}</span>
              <div className="va-groupcard__objects">
                {Array.from({ length: groupA }).map((_, i) => (
                  <VisualObject key={i} type={assetType} size="md" className="va-object" />
                ))}
              </div>
              <span className="va-groupcard__num">{groupA}</span>
            </div>

            {/* Plus sign */}
            <span className="va-op" aria-hidden="true">
              <Plus className="w-6 h-6 stroke-[3]" />
            </span>

            {/* Group 2 */}
            <div className="va-groupcard">
              <span className="va-groupcard__label">Group 2 · {groupB}</span>
              <div className="va-groupcard__objects">
                {Array.from({ length: groupB }).map((_, i) => (
                  <VisualObject key={i} type={assetType} size="md" className="va-object" />
                ))}
              </div>
              <span className="va-groupcard__num">{groupB}</span>
            </div>

            {/* Equals sign */}
            <span className="va-op va-op--muted" aria-hidden="true">
              <Equal className="w-6 h-6 stroke-[3]" />
            </span>

            {/* Combine action */}
            <button type="button" onClick={handleCombine} className="va-combine">
              <Sparkles className="va-combine__icon w-5 h-5" />
              <span className="va-combine__label">Combine groups</span>
              <span className="va-combine__hint">See the total</span>
            </button>
          </div>
        ) : (
          /* Combined view */
          <div className="va-combined">
            <span className="va-combined__kicker">Combined collection · total</span>

            <div className="va-tray va-tray--combined">
              <span className="va-tray__surface" aria-hidden="true" />
              {Array.from({ length: sum }).map((_, i) => (
                <VisualObject
                  key={i}
                  type={assetType}
                  size="lg"
                  isCounted={true}
                  countedNumber={i + 1}
                  className="va-object"
                />
              ))}
            </div>

            {/* Equation banner */}
            <div className="va-equation" aria-label={`${groupA} plus ${groupB} equals ${sum}`}>
              <span>{groupA}</span>
              <span className="va-equation__op">+</span>
              <span>{groupB}</span>
              <span className="va-equation__op">=</span>
              <span
                className={`va-equation__result${userAnswer === sum ? ' is-revealed' : ''}`}
              >
                {sum}
              </span>
            </div>
          </div>
        )}

        {/* Answer picking */}
        <div className="va-answer-block">
          <span className="va-answer-caption">What is the total sum?</span>

          <div className="va-answers">
            {uniqueOpts.map((opt) => {
              const isSelected = userAnswer === opt;
              const isCorrect = isSelected && opt === sum;
              const isWrong = isSelected && opt !== sum;

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setUserAnswer(opt);
                    setIsCombined(true);
                  }}
                  className={`va-answer${isCorrect ? ' is-correct' : ''}${isWrong ? ' is-wrong' : ''}`}
                  aria-pressed={isSelected}
                >
                  <span className="va-answer__value">{opt}</span>
                  <span className="va-answer__label">
                    {opt === 1 ? meta.name : meta.plural}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback & explanation */}
        {userAnswer !== null && (
          <div
            className={`va-feedback ${userAnswer === sum ? 'is-correct' : 'is-wrong'}`}
            role="status"
            aria-live="polite"
          >
            {userAnswer === sum ? (
              <>
                <div className="va-feedback__title">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    Superb — {groupA} + {groupB} = {sum} {meta.plural.toLowerCase()}!
                  </span>
                </div>
                <p className="va-feedback__body">
                  When you put {groupA} {groupA === 1 ? meta.name : meta.plural} and {groupB}{' '}
                  {groupB === 1 ? meta.name : meta.plural} together, you get exactly {sum}{' '}
                  {meta.plural}.
                </p>
                <button type="button" onClick={handleNewPuzzle} className="va-btn va-btn--sm">
                  <span>Next addition puzzle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <div className="va-feedback__title">
                  <span>Not quite — count once more.</span>
                </div>
                <p className="va-feedback__body">
                  Count the combined objects above: {groupA} plus {groupB} makes {sum}.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
};
