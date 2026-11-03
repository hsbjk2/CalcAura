import React, { useState } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { RotateCw, CheckCircle2 } from 'lucide-react';
import { Reveal, Tilt3D } from '../ui/Depth.tsx';
import '../../styles/visual-activities-b.css';

export const PictureMultiplicationActivity: React.FC = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('strawberry');
  const [numGroups, setNumGroups] = useState<number>(3);
  const [itemsPerGroup, setItemsPerGroup] = useState<number>(4);
  const [viewFormat, setViewFormat] = useState<'groups' | 'array' | 'repeatedAddition'>('groups');
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const totalProduct = numGroups * itemsPerGroup;
  const meta = VISUAL_ASSETS[assetType];
  const isAnswered = userAnswer !== null;
  const isCorrect = userAnswer === totalProduct;
  const progress = isAnswered ? (isCorrect ? 100 : 82) : 56;

  const handleRandomize = () => {
    const assets: VisualAssetType[] = ['strawberry', 'apple', 'banana', 'orange', 'cookie', 'block', 'car', 'star'];
    const newAsset = assets[Math.floor(Math.random() * assets.length)];
    const g = Math.floor(Math.random() * 4) + 2; // 2 to 5
    const i = Math.floor(Math.random() * 5) + 2; // 2 to 6
    setAssetType(newAsset);
    setNumGroups(g);
    setItemsPerGroup(i);
    setUserAnswer(null);
  };

  const options = Array.from(
    new Set([
      totalProduct,
      Math.max(2, totalProduct - itemsPerGroup),
      totalProduct + itemsPerGroup,
      totalProduct + 2,
    ])
  ).sort((a, b) => a - b);

  const viewOptions = [
    { id: 'groups' as const, label: 'Groups' },
    { id: 'array' as const, label: 'Array' },
    { id: 'repeatedAddition' as const, label: 'Addition' },
  ];

  return (
    <Reveal as="article" className="vma">
      <header className="vma-head">
        <div className="vma-head__lead">
          <span className="vma-mark" aria-hidden="true">
            ×
          </span>
          <div>
            <p className="vma-eyebrow">
              <span className="vma-eyebrow__rule" aria-hidden="true" />
              Visual Math World · 02
            </p>
            <h3 className="vma-title">Multiplication with groups &amp; arrays</h3>
            <p className="vma-sub">Read equal groups, arrays and repeated addition.</p>
          </div>
        </div>

        <div className="vma-head__tools">
          <span className="vma-chip">Class 2–4</span>
          <div className="vma-seg" role="group" aria-label="Representation">
            {viewOptions.map((view) => (
              <button
                key={view.id}
                type="button"
                onClick={() => setViewFormat(view.id)}
                aria-pressed={viewFormat === view.id}
                className={viewFormat === view.id ? 'is-active' : ''}
              >
                {view.label}
              </button>
            ))}
          </div>
          <button type="button" onClick={handleRandomize} className="vma-btn vma-btn--ink">
            <RotateCw aria-hidden="true" />
            <span>New set</span>
          </button>
        </div>
      </header>

      <div className="vma-instruction">
        <span className="vma-instruction__dot" aria-hidden="true" />
        <p>
          <strong>Explore first.</strong> Change the groups and objects, then choose the total at the bottom.
        </p>
        <span className="vma-instruction__meta">
          {numGroups} groups · {itemsPerGroup} each
        </span>
      </div>

      <div className="vma-rail" role="group" aria-label="Activity progress">
        <span className="vma-rail__track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </span>
        <ol>
          <li className="is-done">
            <span className="vma-rail__dot" aria-hidden="true" />
            Explore
          </li>
          <li className="is-done">
            <span className="vma-rail__dot" aria-hidden="true" />
            Model
          </li>
          <li className={isCorrect ? 'is-done' : 'is-active'} aria-current={isCorrect ? undefined : 'step'}>
            <span className="vma-rail__dot" aria-hidden="true" />
            Answer
          </li>
        </ol>
      </div>

      {/* Interactive controls for groups and items */}
      <section className="vma-controls" aria-label="Set the multiplication model">
        <div className="vma-control">
          <span className="vma-control__label" id="vma-groups-label">
            Number of groups
          </span>
          <div className="vma-num-row" role="group" aria-labelledby="vma-groups-label">
            {[2, 3, 4, 5].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setNumGroups(g);
                  setUserAnswer(null);
                }}
                aria-pressed={numGroups === g}
                className={`vma-num ${numGroups === g ? 'is-active' : ''}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="vma-control">
          <span className="vma-control__label" id="vma-items-label">
            Objects in each group
          </span>
          <div className="vma-num-row" role="group" aria-labelledby="vma-items-label">
            {[2, 3, 4, 5, 6].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setItemsPerGroup(i);
                  setUserAnswer(null);
                }}
                aria-pressed={itemsPerGroup === i}
                className={`vma-num ${itemsPerGroup === i ? 'is-active' : ''}`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Visualisation canvas */}
      {viewFormat === 'groups' && (
        <section className="vma-view">
          <div className="vma-view__head">
            <span className="vma-view__kicker">Equal groups</span>
            <h4 className="vma-view__title">
              {numGroups} baskets with {itemsPerGroup} {itemsPerGroup === 1 ? meta.name : meta.plural} in each
            </h4>
          </div>

          <Tilt3D className="vma-tray" strength={5}>
            <div className="vma-groups">
              {Array.from({ length: numGroups }).map((_, groupIdx) => (
                <div
                  key={groupIdx}
                  className="vma-basket"
                  style={{ '--i': groupIdx } as React.CSSProperties}
                >
                  <div className="vma-basket__head">
                    <span className="vma-basket__tag">Basket {String(groupIdx + 1).padStart(2, '0')}</span>
                    <span className="vma-basket__count">{itemsPerGroup} each</span>
                  </div>
                  <div className="vma-objects" aria-hidden="true">
                    {Array.from({ length: itemsPerGroup }).map((_, i) => (
                      <VisualObject key={i} type={assetType} size="md" className="vma-obj" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Tilt3D>
        </section>
      )}

      {viewFormat === 'array' && (
        <section className="vma-view">
          <div className="vma-view__head">
            <span className="vma-view__kicker">Rows × columns</span>
            <h4 className="vma-view__title">
              {numGroups} rows of {itemsPerGroup} columns
            </h4>
          </div>

          <Tilt3D className="vma-tray" strength={5}>
            <div className="vma-array">
              {Array.from({ length: numGroups }).map((_, rowIdx) => (
                <div key={rowIdx} className="vma-array__row">
                  <span className="vma-array__label">R{rowIdx + 1}</span>
                  {Array.from({ length: itemsPerGroup }).map((_, colIdx) => (
                    <VisualObject key={colIdx} type={assetType} size="md" className="vma-obj" />
                  ))}
                </div>
              ))}
            </div>
          </Tilt3D>
        </section>
      )}

      {viewFormat === 'repeatedAddition' && (
        <section className="vma-view">
          <div className="vma-view__head">
            <span className="vma-view__kicker">Repeated addition</span>
            <h4 className="vma-view__title">
              Adding {itemsPerGroup} again and again, {numGroups} times
            </h4>
          </div>

          <Tilt3D className="vma-tray" strength={5}>
            <div
              className="vma-sum"
              role="math"
              aria-label={`${itemsPerGroup} added ${numGroups} times equals ${totalProduct}`}
            >
              {Array.from({ length: numGroups }).map((_, i) => (
                <React.Fragment key={i}>
                  <span className="vma-sum__term">{itemsPerGroup}</span>
                  {i < numGroups - 1 && (
                    <span className="vma-sum__op" aria-hidden="true">
                      +
                    </span>
                  )}
                </React.Fragment>
              ))}
              <span className="vma-sum__op" aria-hidden="true">
                =
              </span>
              <span className="vma-sum__total">{totalProduct}</span>
            </div>
            <p className="vma-sum__note">
              Skip counting by {itemsPerGroup}:{' '}
              {Array.from({ length: numGroups }, (_, i) => (i + 1) * itemsPerGroup).join(', ')}
            </p>
          </Tilt3D>
        </section>
      )}

      {/* Equation strip */}
      <div className="vma-equation-wrap">
        <div
          className="vma-equation"
          role="math"
          aria-label={`${numGroups} times ${itemsPerGroup} equals ${userAnswer ?? 'unknown'}`}
        >
          <span className="vma-equation__num">{numGroups}</span>
          <span className="vma-equation__op" aria-hidden="true">
            ×
          </span>
          <span className="vma-equation__num">{itemsPerGroup}</span>
          <span className="vma-equation__op" aria-hidden="true">
            =
          </span>
          <span className={`vma-equation__answer ${isCorrect ? 'is-correct' : ''}`}>
            {userAnswer !== null ? userAnswer : '?'}
          </span>
        </div>
      </div>

      {/* Answer selector */}
      <section className="vma-quiz">
        <span className="vma-quiz__label" id="vma-mul-answer-label">
          What is the total number of {meta.plural.toLowerCase()}?
        </span>

        <div className="vma-options" role="group" aria-labelledby="vma-mul-answer-label">
          {options.map((opt) => {
            const isSelected = userAnswer === opt;
            const correct = isSelected && opt === totalProduct;
            const wrong = isSelected && opt !== totalProduct;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => setUserAnswer(opt)}
                aria-pressed={isSelected}
                className={`vma-option ${correct ? 'is-correct' : ''} ${wrong ? 'is-wrong' : ''}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </section>

      {/* Feedback */}
      {isAnswered && (
        <div className={`vma-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`} role="status" aria-live="polite">
          {isCorrect && <CheckCircle2 aria-hidden="true" />}
          <div>
            {isCorrect ? (
              <>
                <strong>
                  Correct — {numGroups} × {itemsPerGroup} = {totalProduct}.
                </strong>
                <p>
                  {numGroups} equal groups of {itemsPerGroup} add up to exactly {totalProduct} objects in total.
                </p>
              </>
            ) : (
              <>
                <strong>Not quite. Count across all {numGroups} groups.</strong>
                <p>
                  {numGroups} groups of {itemsPerGroup} equals {totalProduct}; each group adds {itemsPerGroup} more.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </Reveal>
  );
};
