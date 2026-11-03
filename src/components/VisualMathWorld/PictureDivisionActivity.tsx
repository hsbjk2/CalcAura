import React, { useState } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { RotateCw, CheckCircle2, Users } from 'lucide-react';
import { Reveal, Tilt3D } from '../ui/Depth.tsx';
import '../../styles/visual-activities-b.css';

export const PictureDivisionActivity: React.FC = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('strawberry');
  const [totalItems, setTotalItems] = useState<number>(12);
  const [numRecipients, setNumRecipients] = useState<number>(3);
  const [isShared, setIsShared] = useState<boolean>(false);
  const [userQuotient, setUserQuotient] = useState<number | null>(null);

  const quotient = Math.floor(totalItems / numRecipients);
  const remainder = totalItems % numRecipients;
  const meta = VISUAL_ASSETS[assetType];
  const isAnswered = userQuotient !== null;
  const isCorrect = userQuotient === quotient;
  const progress = isCorrect ? 100 : isAnswered ? 82 : isShared ? 68 : 38;

  const handleRandomize = () => {
    const assets: VisualAssetType[] = ['strawberry', 'apple', 'cookie', 'banana', 'orange', 'block', 'candy' as any];
    const newAsset = assets[Math.floor(Math.random() * (assets.length - 1))];
    const rec = Math.floor(Math.random() * 3) + 2; // 2, 3, 4 recipients
    const q = Math.floor(Math.random() * 4) + 2; // 2 to 5 per basket
    const hasRem = Math.random() > 0.5;
    const r = hasRem ? Math.floor(Math.random() * (rec - 1)) + 1 : 0;
    const total = rec * q + r;

    setAssetType(newAsset);
    setTotalItems(total);
    setNumRecipients(rec);
    setIsShared(false);
    setUserQuotient(null);
  };

  const handleShare = () => {
    setIsShared(true);
  };

  const options = Array.from(new Set([quotient, Math.max(1, quotient - 1), quotient + 1, quotient + 2])).sort(
    (a, b) => a - b
  );

  return (
    <Reveal as="article" className="vma">
      <header className="vma-head">
        <div className="vma-head__lead">
          <span className="vma-mark" aria-hidden="true">
            ÷
          </span>
          <div>
            <p className="vma-eyebrow">
              <span className="vma-eyebrow__rule" aria-hidden="true" />
              Visual Math World · 03
            </p>
            <h3 className="vma-title">Division with fair sharing</h3>
            <p className="vma-sub">Share objects equally between friends and read the remainder.</p>
          </div>
        </div>

        <div className="vma-head__tools">
          <span className="vma-chip">Class 2–4</span>
          <button type="button" onClick={handleRandomize} className="vma-btn vma-btn--ink">
            <RotateCw aria-hidden="true" />
            <span>New division</span>
          </button>
        </div>
      </header>

      <div className="vma-instruction">
        <span className="vma-instruction__dot" aria-hidden="true" />
        <p>
          <strong>{isShared ? 'Now name the share.' : 'Share first.'}</strong>{' '}
          {isShared
            ? 'Check each child’s tray, then choose how many each receives.'
            : 'Distribute the collection equally, then choose the quotient.'}
        </p>
        <span className="vma-instruction__meta">
          {totalItems} ÷ {numRecipients}
        </span>
      </div>

      <div className="vma-rail" role="group" aria-label="Activity progress">
        <span className="vma-rail__track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </span>
        <ol>
          <li className="is-done">
            <span className="vma-rail__dot" aria-hidden="true" />
            Read
          </li>
          <li className={isShared ? 'is-done' : 'is-active'} aria-current={isShared ? undefined : 'step'}>
            <span className="vma-rail__dot" aria-hidden="true" />
            Share
          </li>
          <li
            className={isCorrect ? 'is-done' : isAnswered || isShared ? 'is-active' : ''}
            aria-current={!isCorrect && (isAnswered || isShared) ? 'step' : undefined}
          >
            <span className="vma-rail__dot" aria-hidden="true" />
            Answer
          </li>
        </ol>
      </div>

      <div className="vma-facts" role="group" aria-label="Division setup">
        <div className="vma-fact">
          <span className="vma-fact__label">Collection</span>
          <strong className="vma-fact__value">{totalItems}</strong>
        </div>
        <div className="vma-fact">
          <span className="vma-fact__label">Children</span>
          <strong className="vma-fact__value">{numRecipients}</strong>
        </div>
        <div className="vma-fact">
          <span className="vma-fact__label">Per child</span>
          <strong className="vma-fact__value">{isAnswered ? quotient : '?'}</strong>
        </div>
      </div>

      {/* Visual distribution canvas */}
      {!isShared ? (
        <section className="vma-view">
          <div className="vma-view__head">
            <span className="vma-view__kicker">Initial collection</span>
            <h4 className="vma-view__title">
              {totalItems} {meta.plural} ready to share between {numRecipients} children
            </h4>
          </div>

          <Tilt3D className="vma-tray" strength={5}>
            <div className="vma-collection">
              <div className="vma-objects vma-objects--wide" aria-hidden="true">
                {Array.from({ length: totalItems }).map((_, i) => (
                  <VisualObject key={i} type={assetType} size="md" className="vma-obj" />
                ))}
              </div>

              <button type="button" onClick={handleShare} className="vma-btn vma-btn--primary">
                <Users aria-hidden="true" />
                <span>Share equally among {numRecipients} children</span>
              </button>
            </div>
          </Tilt3D>
        </section>
      ) : (
        <section className="vma-view">
          <div className="vma-view__head">
            <span className="vma-view__kicker">Each child’s share</span>
            <h4 className="vma-view__title">
              {quotient} {quotient === 1 ? meta.name : meta.plural} each
              {remainder > 0 ? `, with ${remainder} left over` : ', with none left over'}
            </h4>
          </div>

          <Tilt3D className="vma-tray" strength={4}>
            <div className="vma-shares">
              {Array.from({ length: numRecipients }).map((_, rIdx) => (
                <div
                  key={rIdx}
                  className="vma-share-card"
                  style={{ '--i': rIdx } as React.CSSProperties}
                >
                  <div className="vma-share-card__head">
                    <span className="vma-share-card__tag">
                      <Users aria-hidden="true" />
                      Child {String(rIdx + 1).padStart(2, '0')}
                    </span>
                    <span className="vma-share-card__count">{quotient}</span>
                  </div>

                  <div className="vma-objects" aria-hidden="true">
                    {Array.from({ length: quotient }).map((_, i) => (
                      <VisualObject key={i} type={assetType} size="md" className="vma-obj" />
                    ))}
                  </div>

                  <span className="vma-share-card__unit">
                    {quotient} {quotient === 1 ? meta.name : meta.plural}
                  </span>
                </div>
              ))}
            </div>

            {remainder > 0 && (
              <div className="vma-remainder">
                <span className="vma-remainder__tag">
                  Leftover tray · {remainder} {remainder === 1 ? meta.name : meta.plural} cannot be shared equally
                </span>
                <div className="vma-objects" aria-hidden="true">
                  {Array.from({ length: remainder }).map((_, i) => (
                    <VisualObject key={i} type={assetType} size="md" className="vma-obj" />
                  ))}
                </div>
              </div>
            )}
          </Tilt3D>
        </section>
      )}

      {/* Equation strip */}
      <div className="vma-equation-wrap">
        <div
          className="vma-equation"
          role="math"
          aria-label={`${totalItems} divided by ${numRecipients} equals ${userQuotient ?? 'unknown'}`}
        >
          <span className="vma-equation__num">{totalItems}</span>
          <span className="vma-equation__op" aria-hidden="true">
            ÷
          </span>
          <span className="vma-equation__num">{numRecipients}</span>
          <span className="vma-equation__op" aria-hidden="true">
            =
          </span>
          <span className={`vma-equation__answer ${isCorrect ? 'is-correct' : ''}`}>
            {userQuotient !== null ? userQuotient : '?'}
          </span>
          {remainder > 0 && isShared && <span className="vma-equation__rem">r {remainder}</span>}
        </div>
      </div>

      {/* Answer selector */}
      <section className="vma-quiz">
        <span className="vma-quiz__label" id="vma-div-answer-label">
          How many {meta.plural.toLowerCase()} does each child get?
        </span>

        <div className="vma-options" role="group" aria-labelledby="vma-div-answer-label">
          {options.map((opt) => {
            const isSelected = userQuotient === opt;
            const correct = isSelected && opt === quotient;
            const wrong = isSelected && opt !== quotient;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setUserQuotient(opt);
                  setIsShared(true);
                }}
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
        <div
          className={`vma-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}
          role="status"
          aria-live="polite"
        >
          {isCorrect && <CheckCircle2 aria-hidden="true" />}
          <div>
            {isCorrect ? (
              <>
                <strong>
                  Fair share complete — each child gets {quotient} {meta.plural.toLowerCase()}.
                </strong>
                <p>
                  {totalItems} ÷ {numRecipients} = {quotient}
                  {remainder > 0 ? ` with ${remainder} left over.` : ' with zero remainder.'}
                </p>
              </>
            ) : (
              <>
                <strong>Not quite. Test the share tray.</strong>
                <p>
                  When {totalItems} items are distributed equally among {numRecipients} recipients, each receives{' '}
                  {quotient}.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </Reveal>
  );
};
