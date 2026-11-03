import React, { useState, useMemo } from 'react';
import { VisualObject, VisualAssetType, VISUAL_ASSETS } from './VisualAssetLibrary.tsx';
import { Reveal } from '../ui/Depth.tsx';
import { CheckCircle2, Lightbulb, RotateCw, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import '../../styles/visual-activities.css';

interface CountingActivityProps {
  onCompleteChapter?: () => void;
}

export const CountingActivity: React.FC<CountingActivityProps> = () => {
  const [assetType, setAssetType] = useState<VisualAssetType>('apple');
  const [targetCount, setTargetCount] = useState<number>(5);
  const [countedIndices, setCountedIndices] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [mode, setMode] = useState<'count' | 'compare'>('count');
  const [compareCount2, setCompareCount2] = useState<number>(3);
  const [compareAsset2, setCompareAsset2] = useState<VisualAssetType>('banana');
  const [score, setScore] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Play sound if enabled
  const playPop = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + Object.keys(countedIndices).length * 80, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  };

  // Generate a new random question
  const handleNewQuestion = () => {
    const assets: VisualAssetType[] = ['apple', 'banana', 'orange', 'strawberry', 'car', 'star', 'ball', 'cookie', 'cupcake', 'cat'];
    const newAsset = assets[Math.floor(Math.random() * assets.length)];
    const newCount = Math.floor(Math.random() * 8) + 2; // 2 to 9
    setAssetType(newAsset);
    setTargetCount(newCount);
    setCountedIndices({});
    setSelectedAnswer(null);
    setShowHint(false);

    const newAsset2 = assets.filter((a) => a !== newAsset)[Math.floor(Math.random() * (assets.length - 1))];
    let newCount2 = Math.floor(Math.random() * 8) + 2;
    while (newCount2 === newCount) {
      newCount2 = Math.floor(Math.random() * 8) + 2;
    }
    setCompareAsset2(newAsset2);
    setCompareCount2(newCount2);
  };

  // Tap an item to count it
  const handleTapItem = (idx: number) => {
    if (countedIndices[idx] !== undefined) return;
    const nextNum = Object.keys(countedIndices).length + 1;
    setCountedIndices((prev) => ({ ...prev, [idx]: nextNum }));
    playPop();
  };

  const countedTotal = Object.keys(countedIndices).length;
  const isAllCounted = countedTotal === targetCount;
  const meta = VISUAL_ASSETS[assetType];
  const meta2 = VISUAL_ASSETS[compareAsset2];

  // Answer options
  const answerOptions = useMemo(() => {
    const opts = new Set<number>();
    opts.add(targetCount);
    while (opts.size < 4) {
      const delta = Math.floor(Math.random() * 5) - 2;
      const val = targetCount + delta;
      if (val >= 1 && val <= 12) opts.add(val);
    }
    return Array.from(opts).sort((a, b) => a - b);
  }, [targetCount]);

  const handleSelectAnswer = (ans: number) => {
    setSelectedAnswer(ans);
    if (ans === targetCount) {
      setScore((s) => s + 1);
    }
  };

  const progress =
    mode === 'count'
      ? Math.round((countedTotal / Math.max(targetCount, 1)) * 100)
      : selectedAnswer !== null
        ? 100
        : 0;

  const progressLabel =
    mode === 'count'
      ? `${countedTotal} of ${targetCount} marked`
      : selectedAnswer !== null
        ? 'Group chosen'
        : 'Choose a group';

  const groupAState =
    selectedAnswer === 1 ? (targetCount > compareCount2 ? ' is-correct' : ' is-wrong') : '';
  const groupBState =
    selectedAnswer === 2 ? (compareCount2 > targetCount ? ' is-correct' : ' is-wrong') : '';

  return (
    <Reveal as="section" className="va-shell" delay={40}>
      {/* Activity header */}
      <div className="va-head">
        <div className="va-head__id">
          <div className="va-mark" aria-hidden="true">123</div>
          <div>
            <h3 className="va-title">
              <span>Counting World</span>
              <span className="va-chip">Class 1–2</span>
            </h3>
            <p className="va-sub">Count one object at a time. Every tap marks a number.</p>
          </div>
        </div>

        <div className="va-tools">
          <div className="va-seg" role="group" aria-label="Counting mode">
            <button
              type="button"
              onClick={() => {
                setMode('count');
                handleNewQuestion();
              }}
              className="va-seg__btn"
              data-active={mode === 'count'}
              aria-pressed={mode === 'count'}
            >
              Count
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('compare');
                handleNewQuestion();
              }}
              className="va-seg__btn"
              data-active={mode === 'compare'}
              aria-pressed={mode === 'compare'}
            >
              Compare
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`va-iconbtn${soundEnabled ? ' is-on' : ''}`}
            aria-pressed={soundEnabled}
            aria-label="Toggle counting sound effects"
            title="Toggle counting sound effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button type="button" onClick={handleNewQuestion} className="va-btn va-btn--ink va-btn--sm">
            <RotateCw className="w-3.5 h-3.5" />
            <span>New set</span>
          </button>
        </div>
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
          aria-label="Counting progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span className="va-rail__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* MODE 1: COUNT THE OBJECTS */}
      {mode === 'count' && (
        <div className="va-body">
          {/* Question prompt */}
          <div className="va-prompt">
            <span className="va-kicker">Activity instruction</span>
            <h4 className="va-question">How many {meta.plural.toLowerCase()} can you see?</h4>
            <p className="va-hintline">
              Tap each {meta.name.toLowerCase()} below and the count will appear beside it.
            </p>
          </div>

          {/* Interactive collection field */}
          <div className="va-tray">
            <span className="va-tray__surface" aria-hidden="true" />
            {Array.from({ length: targetCount }).map((_, idx) => (
              <VisualObject
                key={idx}
                type={assetType}
                size="lg"
                isCounted={countedIndices[idx] !== undefined}
                countedNumber={countedIndices[idx]}
                onClick={() => handleTapItem(idx)}
                className="va-object"
              />
            ))}
          </div>

          {/* Hint */}
          <div className="va-hint-row">
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="va-linkbtn"
              aria-expanded={showHint}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hint shown' : 'Need a hint?'}</span>
            </button>
          </div>

          {showHint && (
            <div className="va-hint" role="note">
              <Lightbulb className="w-4 h-4 shrink-0" />
              <div>
                <strong>Hint:</strong> Point your finger and count out loud: 1, 2, 3… Every time you tap
                an object, it will be marked as counted.
              </div>
            </div>
          )}

          {/* Answer selection */}
          <div className="va-answer-block">
            <span className="va-answer-caption">
              {isAllCounted ? 'All objects marked — choose the total' : 'Select your answer'}
            </span>

            <div className="va-answers">
              {answerOptions.map((opt) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = isSelected && opt === targetCount;
                const isWrong = isSelected && opt !== targetCount;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectAnswer(opt)}
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

          {/* Feedback */}
          {selectedAnswer !== null && (
            <div
              className={`va-feedback ${selectedAnswer === targetCount ? 'is-correct' : 'is-wrong'}`}
              role="status"
              aria-live="polite"
            >
              {selectedAnswer === targetCount ? (
                <>
                  <div className="va-feedback__title">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      Hooray — exactly {targetCount} {meta.plural.toLowerCase()}!
                    </span>
                  </div>
                  <p className="va-feedback__body">
                    Great counting. You marked every single one correctly.
                  </p>
                  <button type="button" onClick={handleNewQuestion} className="va-btn va-btn--sm">
                    <span>Try next collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <>
                  <div className="va-feedback__title">
                    <span>Almost there — keep trying.</span>
                  </div>
                  <p className="va-feedback__body">
                    Count again carefully: there are {targetCount} {meta.plural.toLowerCase()} in total.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: COMPARE TWO COLLECTIONS */}
      {mode === 'compare' && (
        <div className="va-body">
          <div className="va-prompt">
            <span className="va-kicker">Comparison challenge</span>
            <h4 className="va-question">Which group has more objects?</h4>
            <p className="va-hintline">Read both trays, then choose the fuller collection.</p>
          </div>

          <div className="va-compare">
            {/* Group A */}
            <div
              className={`va-group${groupAState}`}
              role="button"
              tabIndex={0}
              aria-pressed={selectedAnswer === 1}
              onClick={() => handleSelectAnswer(1)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleSelectAnswer(1);
                }
              }}
            >
              <span className="va-group__label">Group A · {meta.plural}</span>
              <div className="va-group__objects">
                {Array.from({ length: targetCount }).map((_, i) => (
                  <VisualObject key={i} type={assetType} size="md" className="va-object" />
                ))}
              </div>
              <span className="va-group__count">
                {targetCount} <small>objects</small>
              </span>
            </div>

            {/* Group B */}
            <div
              className={`va-group${groupBState}`}
              role="button"
              tabIndex={0}
              aria-pressed={selectedAnswer === 2}
              onClick={() => handleSelectAnswer(2)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleSelectAnswer(2);
                }
              }}
            >
              <span className="va-group__label">Group B · {meta2.plural}</span>
              <div className="va-group__objects">
                {Array.from({ length: compareCount2 }).map((_, i) => (
                  <VisualObject key={i} type={compareAsset2} size="md" className="va-object" />
                ))}
              </div>
              <span className="va-group__count">
                {compareCount2} <small>objects</small>
              </span>
            </div>
          </div>

          {/* Comparison result */}
          {selectedAnswer !== null && (
            <div className="va-fact" role="status" aria-live="polite">
              <span className="va-fact__label">Comparison fact</span>
              <p>
                {targetCount > compareCount2
                  ? `Group A has ${targetCount}, which is more than Group B's ${compareCount2} (${targetCount} > ${compareCount2}).`
                  : `Group B has ${compareCount2}, which is more than Group A's ${targetCount} (${compareCount2} > ${targetCount}).`}
              </p>
            </div>
          )}
        </div>
      )}
    </Reveal>
  );
};
