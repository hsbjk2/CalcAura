import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Calculator,
  ArrowLeft,
  Copy,
  Check,
  Delete,
  RotateCcw,
  Volume2,
  VolumeX,
  Hash,
  Sliders,
  Sparkles,
} from 'lucide-react';
import {
  evaluateBasicExpression,
  calculatePercentage,
  formatCalculatorNumber,
  stripPrecision,
  Operator,
} from '../../math/basicCalculatorEngine.ts';
import { whiteboardSounds } from '../Whiteboard/soundEffects.ts';
import { GlassPanel, Reveal, Tilt3D } from '../ui/Depth.tsx';
import '../../styles/calculator.css';

interface BasicCalculatorProps {
  onBack: () => void;
  darkMode?: boolean;
}

export const BasicCalculator: React.FC<BasicCalculatorProps> = ({ onBack, darkMode = true }) => {
  // Calculator state
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [previousOperand, setPreviousOperand] = useState<number | null>(null);
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [lastEvaluated, setLastEvaluated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Settings
  const [precision, setPrecision] = useState<number>(4); // default 4 decimal places
  const [useGrouping, setUseGrouping] = useState<boolean>(true); // 1,000s separator
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Repeated equals tracking
  const lastOpRef = useRef<{ operator: Operator; operand: number } | null>(null);

  const playFeedbackSound = useCallback(() => {
    if (soundEnabled) {
      whiteboardSounds.playTapSound();
    }
  }, [soundEnabled]);

  // Input a numeric digit (0-9, 00)
  const handleDigit = useCallback(
    (digit: string) => {
      playFeedbackSound();
      setErrorMessage(null);

      if (lastEvaluated || waitingForOperand) {
        setDisplayValue(digit === '00' ? '0' : digit);
        setWaitingForOperand(false);
        setLastEvaluated(false);
      } else {
        if (displayValue === '0' && digit !== '00') {
          setDisplayValue(digit);
        } else if (displayValue === '0' && digit === '00') {
          // Keep single 0
          setDisplayValue('0');
        } else {
          // Limit length to prevent overflow
          if (displayValue.replace(/[^0-9]/g, '').length < 15) {
            setDisplayValue((prev) => prev + digit);
          }
        }
      }
    },
    [displayValue, lastEvaluated, waitingForOperand, playFeedbackSound]
  );

  // Input decimal point (.)
  const handleDecimal = useCallback(() => {
    playFeedbackSound();
    setErrorMessage(null);

    if (lastEvaluated || waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      setLastEvaluated(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue((prev) => prev + '.');
    }
  }, [displayValue, lastEvaluated, waitingForOperand, playFeedbackSound]);

  // All Clear (AC)
  const handleAllClear = useCallback(() => {
    playFeedbackSound();
    setDisplayValue('0');
    setExpression('');
    setPreviousOperand(null);
    setCurrentOperator(null);
    setWaitingForOperand(false);
    setLastEvaluated(false);
    setErrorMessage(null);
    lastOpRef.current = null;
  }, [playFeedbackSound]);

  // Clear current entry (C)
  const handleClearEntry = useCallback(() => {
    playFeedbackSound();
    setDisplayValue('0');
    setErrorMessage(null);
    setLastEvaluated(false);
  }, [playFeedbackSound]);

  // Backspace (Delete last character)
  const handleBackspace = useCallback(() => {
    playFeedbackSound();
    setErrorMessage(null);

    if (lastEvaluated) {
      handleAllClear();
      return;
    }

    if (displayValue.length > 1) {
      const next = displayValue.slice(0, -1);
      if (next === '-' || next === '-0') {
        setDisplayValue('0');
      } else {
        setDisplayValue(next);
      }
    } else {
      setDisplayValue('0');
    }
  }, [displayValue, lastEvaluated, handleAllClear, playFeedbackSound]);

  // Change Sign (+/-)
  const handleToggleSign = useCallback(() => {
    playFeedbackSound();
    setErrorMessage(null);

    const num = parseFloat(displayValue);
    if (isNaN(num) || num === 0) return;

    if (displayValue.startsWith('-')) {
      setDisplayValue(displayValue.slice(1));
    } else {
      setDisplayValue('-' + displayValue);
    }
  }, [displayValue, playFeedbackSound]);

  // Percentage (%)
  const handlePercentage = useCallback(() => {
    playFeedbackSound();
    setErrorMessage(null);

    const current = parseFloat(displayValue);
    if (isNaN(current)) return;

    const pct = calculatePercentage(previousOperand, current, currentOperator);
    setDisplayValue(stripPrecision(pct, 12).toString());
    setLastEvaluated(false);
  }, [displayValue, previousOperand, currentOperator, playFeedbackSound]);

  // Operator (+, -, *, /)
  const handleOperator = useCallback(
    (op: Operator) => {
      playFeedbackSound();
      setErrorMessage(null);

      const opSymbol = op === '*' ? '×' : op === '/' ? '÷' : op === '-' ? '−' : '+';
      const current = parseFloat(displayValue);

      if (isNaN(current)) return;

      if (previousOperand === null) {
        setPreviousOperand(current);
        setExpression(`${formatCalculatorNumber(current, precision, useGrouping)} ${opSymbol}`);
      } else if (currentOperator && !waitingForOperand) {
        // Chained calculation (e.g. 10 + 5 + -> evaluates 10 + 5 = 15, then puts 15 +)
        const subExpr = `${previousOperand} ${currentOperator} ${current}`;
        const result = evaluateBasicExpression(subExpr);
        if (result.success && result.value !== undefined) {
          setPreviousOperand(result.value);
          setDisplayValue(result.value.toString());
          setExpression(`${formatCalculatorNumber(result.value, precision, useGrouping)} ${opSymbol}`);
        } else {
          setErrorMessage(result.error || 'Error');
          return;
        }
      } else {
        // Just changing the operator
        setExpression(`${formatCalculatorNumber(previousOperand, precision, useGrouping)} ${opSymbol}`);
      }

      setCurrentOperator(op);
      setWaitingForOperand(true);
      setLastEvaluated(false);
      lastOpRef.current = null;
    },
    [displayValue, previousOperand, currentOperator, waitingForOperand, precision, useGrouping, playFeedbackSound]
  );

  // Equals (=)
  const handleEquals = useCallback(() => {
    playFeedbackSound();

    const current = parseFloat(displayValue);
    if (isNaN(current)) return;

    // Repeated equals handling (pressing = multiple times applies the last operator and operand)
    if (lastEvaluated && lastOpRef.current) {
      const { operator, operand } = lastOpRef.current;
      const subExpr = `${current} ${operator} ${operand}`;
      const result = evaluateBasicExpression(subExpr);
      if (result.success && result.value !== undefined) {
        const opSymbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator === '-' ? '−' : '+';
        setExpression(`${formatCalculatorNumber(current, precision, useGrouping)} ${opSymbol} ${formatCalculatorNumber(operand, precision, useGrouping)} =`);
        setDisplayValue(result.value.toString());
        setPreviousOperand(result.value);
      } else {
        setErrorMessage(result.error || 'Error');
      }
      return;
    }

    if (previousOperand !== null && currentOperator) {
      const subExpr = `${previousOperand} ${currentOperator} ${current}`;
      const result = evaluateBasicExpression(subExpr);

      if (result.success && result.value !== undefined) {
        const opSymbol = currentOperator === '*' ? '×' : currentOperator === '/' ? '÷' : currentOperator === '-' ? '−' : '+';
        setExpression(
          `${formatCalculatorNumber(previousOperand, precision, useGrouping)} ${opSymbol} ${formatCalculatorNumber(current, precision, useGrouping)} =`
        );
        setDisplayValue(result.value.toString());
        setPreviousOperand(result.value);
        lastOpRef.current = { operator: currentOperator, operand: current };
        setCurrentOperator(null);
        setWaitingForOperand(true);
        setLastEvaluated(true);
        setErrorMessage(null);
      } else {
        setErrorMessage(result.error || 'Error');
      }
    }
  }, [displayValue, previousOperand, currentOperator, lastEvaluated, precision, useGrouping, playFeedbackSound]);

  // Copy result to clipboard
  const handleCopyResult = useCallback(() => {
    try {
      const text = errorMessage ? errorMessage : displayValue;
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        playFeedbackSound();
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      // Fallback
    }
  }, [displayValue, errorMessage, playFeedbackSound]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) {
        return;
      }

      const key = e.key;

      if (/[0-9]/.test(key)) {
        e.preventDefault();
        handleDigit(key);
      } else if (key === '.' || key === ',') {
        e.preventDefault();
        handleDecimal();
      } else if (key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (key === '-' || key === '−') {
        e.preventDefault();
        handleOperator('-');
      } else if (key === '*' || key === 'x' || key === 'X') {
        e.preventDefault();
        handleOperator('*');
      } else if (key === '/') {
        e.preventDefault();
        handleOperator('/');
      } else if (key === '=' || key === 'Enter') {
        e.preventDefault();
        handleEquals();
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        e.preventDefault();
        handleAllClear();
      } else if (key === '%') {
        e.preventDefault();
        handlePercentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDecimal, handleOperator, handleEquals, handleBackspace, handleAllClear, handlePercentage]);

  // Formatted display number
  const formattedDisplay = React.useMemo(() => {
    if (errorMessage) return errorMessage;
    const num = parseFloat(displayValue);
    if (isNaN(num)) return displayValue;

    // Preserve trailing decimal point while user is typing
    if (displayValue.endsWith('.')) {
      return formatCalculatorNumber(num, precision, useGrouping) + '.';
    }

    // Preserve trailing zeros after decimal while typing (e.g., 3.0, 3.00)
    if (displayValue.includes('.')) {
      const [, dec] = displayValue.split('.');
      const intFormatted = formatCalculatorNumber(Math.trunc(num), precision, useGrouping);
      return `${intFormatted}.${dec}`;
    }

    return formatCalculatorNumber(num, precision, useGrouping);
  }, [displayValue, errorMessage, precision, useGrouping]);

  // Dynamic font sizing for large numbers so it never overflows
  const displayFontSize = React.useMemo(() => {
    const len = formattedDisplay.length;
    if (len <= 7) return 'clamp(2.5rem, 7vw, 3.4rem)';
    if (len <= 10) return 'clamp(2rem, 6vw, 2.8rem)';
    if (len <= 14) return 'clamp(1.6rem, 5vw, 2.2rem)';
    return 'clamp(1.25rem, 4vw, 1.75rem)';
  }, [formattedDisplay]);

  // Real, derived state copy for the display footer and the desk panel
  const operatorStatus =
    currentOperator === '*' ? '×' : currentOperator === '/' ? '÷' : currentOperator === '-' ? '−' : currentOperator === '+' ? '+' : '—';
  const displayState = errorMessage
    ? 'Check expression'
    : lastEvaluated
      ? 'Result'
      : waitingForOperand
        ? 'Awaiting operand'
        : 'Editing';

  return (
    <div className="bc-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* PAGE HEADER: clears the fixed nav, reads as the top of this page */}
      <header className="bc-pagehead page-head">
        <div className="bc-breadcrumb">
          <button type="button" onClick={onBack} className="bc-back" title="Return to Calculators and Platform Workspace">
            <ArrowLeft aria-hidden="true" />
            <span>Back to calculators</span>
          </button>
          <span className="bc-crumb-sep" aria-hidden="true">
            /
          </span>
          <span className="bc-crumb">Workspace · Basic arithmetic</span>
        </div>

        <div className="bc-title-row">
          <div className="bc-intro">
            <p className="bc-kicker">
              <span className="bc-kicker__dot" aria-hidden="true" />
              Everyday arithmetic
            </p>
            <h1 className="bc-title">
              Basic <em>calculator</em>
              <span className="bc-title__dot" aria-hidden="true">
                .
              </span>
            </h1>
            <p className="bc-sub">
              A quiet desk for sums, percentages and quick checks — keyboard-first, with the precision,
              grouping and sound you choose.
            </p>
          </div>

          {/* Glass-chip settings rail */}
          <div className="bc-settings glass-chip" role="group" aria-label="Calculator preferences">
            <label className="bc-setting" title="Set decimal precision">
              <Sliders aria-hidden="true" />
              <span className="bc-setting__label">Decimals</span>
              <span className="bc-select-wrap">
                <select
                  value={precision}
                  onChange={(e) => setPrecision(Number(e.target.value))}
                  className="bc-select"
                  aria-label="Decimal precision"
                  title="Set decimal precision"
                >
                  <option value={0}>0</option>
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                </select>
                <span className="bc-select-caret" aria-hidden="true" />
              </span>
            </label>

            <button
              type="button"
              onClick={() => setUseGrouping(!useGrouping)}
              className={`bc-setting ${useGrouping ? 'is-on' : ''}`}
              title="Toggle thousands separators (commas)"
              aria-pressed={useGrouping}
            >
              <Hash aria-hidden="true" />
              <span className="bc-setting__label">Grouping</span>
              <span className="bc-setting__value">{useGrouping ? '1,000' : '1000'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`bc-setting ${soundEnabled ? 'is-on' : ''}`}
              title={soundEnabled ? 'Keypad sound enabled' : 'Keypad sound muted'}
              aria-pressed={soundEnabled}
            >
              {soundEnabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
              <span className="bc-setting__label">Sound</span>
              <span className="bc-setting__value">{soundEnabled ? 'On' : 'Off'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="bc-workbench">
        <Reveal className="bc-stage" delay={60}>
          <Tilt3D className="bc-tilt" strength={3.4}>
            <GlassPanel className="bc-shell">
              <div className="bc-shell__topline">
                <span className="bc-shell__brand">
                  <Calculator aria-hidden="true" />
                  Basic desk
                </span>
                <span className="bc-shell__meta">Keyboard ready</span>
              </div>

              {/* INK DISPLAY */}
              <div className="bc-screen" role="group" aria-label="Calculator display">
                <div className="bc-screen__top">
                  <span className="bc-screen__tag">Expression</span>
                  <div
                    key={expression || 'empty'}
                    className={`bc-screen__expr ${expression ? '' : 'is-idle'}`}
                    title={expression || undefined}
                  >
                    {expression || 'Ready for the next sum'}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyResult}
                    className={`bc-copy ${copied ? 'is-copied' : ''}`}
                    title="Copy result to clipboard"
                    aria-label="Copy result"
                  >
                    {copied ? (
                      <>
                        <Check aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <Copy aria-hidden="true" />
                    )}
                  </button>
                </div>

                <div className="bc-screen__main" aria-live="polite">
                  <span
                    key={formattedDisplay}
                    className={`bc-readout ${errorMessage ? 'is-error' : ''}`}
                    style={errorMessage ? undefined : { fontSize: displayFontSize }}
                  >
                    {formattedDisplay}
                  </span>
                </div>

                <div className="bc-screen__foot">
                  <span className="bc-screen__state">{displayState}</span>
                  <span className="bc-screen__meta">
                    DEC {precision} · {useGrouping ? 'grouped' : 'plain'}
                  </span>
                </div>
              </div>

              {/* 4-COLUMN KEYPAD */}
              <div className="bc-keypad" role="group" aria-label="Calculator keypad">
                {/* Row 1: AC, +/-, %, ÷ */}
                <button
                  type="button"
                  onClick={displayValue !== '0' && !lastEvaluated ? handleClearEntry : handleAllClear}
                  className="bc-key bc-key--util"
                  title={displayValue !== '0' && !lastEvaluated ? 'Clear Entry (C)' : 'All Clear (AC)'}
                >
                  {displayValue !== '0' && !lastEvaluated ? 'C' : 'AC'}
                </button>
                <button
                  type="button"
                  onClick={handleToggleSign}
                  className="bc-key bc-key--util"
                  title="Change Sign (+/-)"
                >
                  ±
                </button>
                <button
                  type="button"
                  onClick={handlePercentage}
                  className="bc-key bc-key--util"
                  title="Percentage (%)"
                >
                  %
                </button>
                <button
                  type="button"
                  onClick={() => handleOperator('/')}
                  className={`bc-key bc-key--op ${currentOperator === '/' && waitingForOperand ? 'is-armed' : ''}`}
                  title="Divide (÷)"
                  aria-pressed={currentOperator === '/' && waitingForOperand}
                >
                  ÷
                </button>

                {/* Row 2: 7, 8, 9, × */}
                <button type="button" onClick={() => handleDigit('7')} className="bc-key bc-key--digit">
                  7
                </button>
                <button type="button" onClick={() => handleDigit('8')} className="bc-key bc-key--digit">
                  8
                </button>
                <button type="button" onClick={() => handleDigit('9')} className="bc-key bc-key--digit">
                  9
                </button>
                <button
                  type="button"
                  onClick={() => handleOperator('*')}
                  className={`bc-key bc-key--op ${currentOperator === '*' && waitingForOperand ? 'is-armed' : ''}`}
                  title="Multiply (×)"
                  aria-pressed={currentOperator === '*' && waitingForOperand}
                >
                  ×
                </button>

                {/* Row 3: 4, 5, 6, − */}
                <button type="button" onClick={() => handleDigit('4')} className="bc-key bc-key--digit">
                  4
                </button>
                <button type="button" onClick={() => handleDigit('5')} className="bc-key bc-key--digit">
                  5
                </button>
                <button type="button" onClick={() => handleDigit('6')} className="bc-key bc-key--digit">
                  6
                </button>
                <button
                  type="button"
                  onClick={() => handleOperator('-')}
                  className={`bc-key bc-key--op ${currentOperator === '-' && waitingForOperand ? 'is-armed' : ''}`}
                  title="Subtract (−)"
                  aria-pressed={currentOperator === '-' && waitingForOperand}
                >
                  −
                </button>

                {/* Row 4: 1, 2, 3, + */}
                <button type="button" onClick={() => handleDigit('1')} className="bc-key bc-key--digit">
                  1
                </button>
                <button type="button" onClick={() => handleDigit('2')} className="bc-key bc-key--digit">
                  2
                </button>
                <button type="button" onClick={() => handleDigit('3')} className="bc-key bc-key--digit">
                  3
                </button>
                <button
                  type="button"
                  onClick={() => handleOperator('+')}
                  className={`bc-key bc-key--op ${currentOperator === '+' && waitingForOperand ? 'is-armed' : ''}`}
                  title="Add (+)"
                  aria-pressed={currentOperator === '+' && waitingForOperand}
                >
                  +
                </button>

                {/* Row 5: 0, ., Backspace, = */}
                <button type="button" onClick={() => handleDigit('0')} className="bc-key bc-key--digit">
                  0
                </button>
                <button type="button" onClick={handleDecimal} className="bc-key bc-key--digit" title="Decimal point">
                  .
                </button>
                <button
                  type="button"
                  onClick={handleBackspace}
                  className="bc-key bc-key--util bc-key--icon"
                  title="Backspace / Delete (⌫)"
                  aria-label="Backspace"
                >
                  <Delete aria-hidden="true" />
                </button>
                <button type="button" onClick={handleEquals} className="bc-key bc-key--equals" title="Equals (=)">
                  =
                </button>
              </div>

              {/* Auxiliary row: 00 & keyboard hints */}
              <div className="bc-shell__foot">
                <span className="bc-shell__hint">
                  <span className="bc-live-dot" aria-hidden="true" />
                  <span>Keyboard: 0–9, + − × ÷, Enter, Esc</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleDigit('00')}
                  className="bc-key bc-key--mini"
                  title="Insert double zero"
                >
                  00
                </button>
              </div>
            </GlassPanel>
          </Tilt3D>
        </Reveal>

        {/* WHAT THIS DESK CAN DO */}
        <Reveal className="bc-side" delay={120}>
          <GlassPanel className="bc-panel accent-edge">
            <p className="bc-panel__eyebrow">
              <Sparkles aria-hidden="true" />
              What this desk can do
            </p>
            <h2 className="bc-panel__title">
              Small surface.
              <br />
              <em>Exact habits.</em>
            </h2>
            <p className="bc-panel__lede">
              Arithmetic, percentages and repeated equals, with keyboard entry and a result you can
              copy in one click.
            </p>

            <ul className="bc-capabilities">
              <li>
                <span className="bc-capabilities__index" aria-hidden="true">
                  01
                </span>
                <div>
                  <strong>Expression-first arithmetic</strong>
                  <p>× and ÷ resolve before + and −, while the full expression stays in view.</p>
                </div>
              </li>
              <li>
                <span className="bc-capabilities__index" aria-hidden="true">
                  02
                </span>
                <div>
                  <strong>Context-aware percent</strong>
                  <p>200 + 10% adds 20; 200 × 10% takes ten percent of the operand.</p>
                </div>
              </li>
              <li>
                <span className="bc-capabilities__index" aria-hidden="true">
                  03
                </span>
                <div>
                  <strong>Repeated equals</strong>
                  <p>Press = again to reapply the last operator and operand.</p>
                </div>
              </li>
              <li>
                <span className="bc-capabilities__index" aria-hidden="true">
                  04
                </span>
                <div>
                  <strong>Precision, grouping, copy</strong>
                  <p>0, 2, 4, 6 or 8 decimal places, optional thousands separators, and one-click copy.</p>
                </div>
              </li>
            </ul>

            <div className="bc-keyboard">
              <div className="bc-keyboard__head">
                <span>Keyboard map</span>
                <span>Global</span>
              </div>
              <div className="bc-keyboard__keys">
                <span className="bc-kbd">
                  <kbd>0–9</kbd> digits
                </span>
                <span className="bc-kbd">
                  <kbd>+ − × ÷</kbd> operators
                </span>
                <span className="bc-kbd">
                  <kbd>Enter</kbd> equals
                </span>
                <span className="bc-kbd">
                  <kbd>Esc</kbd> clear
                </span>
                <span className="bc-kbd">
                  <kbd>⌫</kbd> delete
                </span>
              </div>
            </div>

            <div className="bc-panel__status" role="group" aria-label="Current calculator settings">
              <span>
                Precision <b>{precision}</b>
              </span>
              <span>
                Grouping <b>{useGrouping ? 'On' : 'Off'}</b>
              </span>
              <span>
                Operator <b>{operatorStatus}</b>
              </span>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </div>
  );
};
