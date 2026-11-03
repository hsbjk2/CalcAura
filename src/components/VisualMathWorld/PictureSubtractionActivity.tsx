import React, { useState } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { Reveal } from '../ui/Depth.tsx';
import { Minus, RotateCw, CheckCircle2, ArrowRight, Trash2 } from 'lucide-react';
import '../../styles/visual-activities.css';

export const PictureSubtractionActivity: React.FC = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('orange');
  const [totalCount, setTotalCount] = useState<number>(8);
  const [removeCount, setRemoveCount] = useState<number>(3);
  const [removedIndices, setRemovedIndices] = useState<Record<number, boolean>>({});
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const remainingTarget = totalCount - removeCount;
  const meta = VISUAL_ASSETS[assetType];

  const handleNewPuzzle = () => {
    const assets: VisualAssetType[] = ['orange', 'apple', 'banana', 'strawberry', 'cookie', 'block', 'car', 'flower'];
    const newAsset = assets[Math.floor(Math.random() * assets.length)];
    const total = Math.floor(Math.random() * 6) + 4; // 4 to 9
    const rem = Math.floor(Math.random() * (total - 2)) + 1; // 1 to total - 2
    setAssetType(newAsset);
    setTotalCount(total);
    setRemoveCount(rem);
    setRemovedIndices({});
    setUserAnswer(null);
  };

  const handleTapToRemove = (idx: number) => {
    setRemovedIndices((prev) => {
      const next = { ...prev };
      if (next[idx]) {
        delete next[idx];
      } else {
        if (Object.keys(prev).length < removeCount) {
          next[idx] = true;
        }
      }
      return next;
    });
  };

  const removedCountNow = Object.keys(removedIndices).length;
  const remainingCountNow = totalCount - removedCountNow;

  // Answer options
  const uniqueOpts = Array.from(
    new Set([
      remainingTarget,
      Math.max(1, remainingTarget - 1),
      remainingTarget + 1,
      remainingTarget + 2,
    ])
  ).sort((a, b) => a - b);

  const progress =
    userAnswer !== null
      ? 100
      : Math.round(20 + (removedCountNow / Math.max(removeCount, 1)) * 65);

  const progressLabel =
    userAnswer !== null
      ? 'Answered'
      : `${removedCountNow} of ${removeCount} removed`;

  return (
    <Reveal as="section" className="va-shell" delay={40}>
      {/* Header */}
      <div className="va-head">
        <div className="va-head__id">
          <div className="va-mark" aria-hidden="true">−</div>
          <div>
            <h3 className="va-title">
              <span>Picture Subtraction</span>
              <span className="va-chip">Class 1–3</span>
            </h3>
            <p className="va-sub">Take objects away, then count what stays behind.</p>
          </div>
        </div>

        <button type="button" onClick={handleNewPuzzle} className="va-btn va-btn--ink va-btn--sm">
          <RotateCw className="w-3.5 h-3.5" />
          <span>New subtraction</span>
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
          aria-label="Subtraction progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span className="va-rail__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="va-body">
        {/* Scenario instruction */}
        <div className="va-prompt">
          <span className="va-kicker">Activity instruction</span>
          <h4 className="va-question">
            You have {totalCount} {meta.plural.toLowerCase()}. Take away {removeCount}. How many remain?
          </h4>
          <p className="va-hintline">
            Tap {removeCount} {meta.plural.toLowerCase()} to move them into the removed basket.
          </p>
        </div>

        {/* Subtraction stage */}
        <div className="va-split">
          {/* Main collection */}
          <div className="va-collection">
            <div className="va-collection__head">
              <span className="va-collection__label">
                Main collection · {totalCount} started
              </span>
              <span className="va-collection__status">{remainingCountNow} remaining</span>
            </div>

            <div className="va-tray va-collection__objects">
              <span className="va-tray__surface" aria-hidden="true" />
              {Array.from({ length: totalCount }).map((_, i) => {
                const isRem = removedIndices[i];
                return (
                  <VisualObject
                    key={i}
                    type={assetType}
                    size="lg"
                    isDimmed={isRem}
                    isRemoved={isRem}
                    onClick={() => handleTapToRemove(i)}
                    className={`va-object va-object--removable${isRem ? ' is-removed' : ''}`}
                  />
                );
              })}
            </div>

            <p className="va-collection__note">
              Tap an object to remove it or put it back. Removed count:{' '}
              <strong>
                {removedCountNow}/{removeCount}
              </strong>
            </p>
          </div>

          {/* Removed basket */}
          <aside className="va-basket">
            <div>
              <div className="va-basket__head">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Removed basket · {removeCount}</span>
              </div>
              <p className="va-basket__hint">Objects taken away wait here.</p>
            </div>

            <div className="va-basket__slot">
              {removedCountNow === 0 ? (
                <span className="va-basket__empty">Nothing removed yet</span>
              ) : (
                Object.keys(removedIndices).map((k) => (
                  <VisualObject key={k} type={assetType} size="md" className="va-object" />
                ))
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                // Auto remove requested count
                const rem: Record<number, boolean> = {};
                for (let i = 0; i < removeCount; i++) rem[i] = true;
                setRemovedIndices(rem);
              }}
              className="va-btn va-btn--ghost va-btn--sm"
            >
              <span>Auto-remove {removeCount}</span>
            </button>
          </aside>
        </div>

        {/* Equation banner */}
        <div className="va-equation" aria-label={`${totalCount} minus ${removeCount} equals ${userAnswer ?? 'unknown'}`}>
          <span>{totalCount}</span>
          <span className="va-equation__op">
            <Minus className="w-5 h-5" aria-hidden="true" />
          </span>
          <span>{removeCount}</span>
          <span className="va-equation__op">=</span>
          <span
            className={`va-equation__result${
              userAnswer === null
                ? ' is-pending'
                : userAnswer === remainingTarget
                  ? ' is-revealed'
                  : ''
            }`}
          >
            {userAnswer !== null ? userAnswer : '?'}
          </span>
        </div>

        {/* Answer selector */}
        <div className="va-answer-block">
          <span className="va-answer-caption">
            How many {meta.plural.toLowerCase()} are left?
          </span>

          <div className="va-answers">
            {uniqueOpts.map((opt) => {
              const isSelected = userAnswer === opt;
              const isCorrect = isSelected && opt === remainingTarget;
              const isWrong = isSelected && opt !== remainingTarget;

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setUserAnswer(opt)}
                  className={`va-answer${isCorrect ? ' is-correct' : ''}${isWrong ? ' is-wrong' : ''}`}
                  aria-pressed={isSelected}
                >
                  <span className="va-answer__value">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {userAnswer !== null && (
          <div
            className={`va-feedback ${userAnswer === remainingTarget ? 'is-correct' : 'is-wrong'}`}
            role="status"
            aria-live="polite"
          >
            {userAnswer === remainingTarget ? (
              <>
                <div className="va-feedback__title">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    Correct — {totalCount} − {removeCount} = {remainingTarget} remaining.
                  </span>
                </div>
                <p className="va-feedback__body">
                  Starting with {totalCount} and removing {removeCount} leaves exactly{' '}
                  {remainingTarget} {meta.plural}.
                </p>
                <button type="button" onClick={handleNewPuzzle} className="va-btn va-btn--sm">
                  <span>Next subtraction puzzle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <div className="va-feedback__title">
                  <span>Not quite — look at the main collection.</span>
                </div>
                <p className="va-feedback__body">
                  After removing {removeCount}, there are {remainingTarget} remaining.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
};
