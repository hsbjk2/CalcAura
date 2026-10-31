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
    if (len <= 7) return 'text-4xl sm:text-5xl';
    if (len <= 10) return 'text-3xl sm:text-4xl';
    if (len <= 14) return 'text-2xl sm:text-3xl';
    return 'text-xl sm:text-2xl';
  }, [formattedDisplay]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 hover:border-[#7957F5]/50 text-slate-700 dark:text-slate-200 hover:text-[#7957F5] dark:hover:text-white transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            title="Return to Calculators and Platform Workspace"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-semibold">Back to Calculators</span>
          </button>

          <div className="h-5 w-px bg-slate-200 dark:bg-white/10" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7957F5] to-[#D94BCB] text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Basic Calculator
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-[#7957F5]/10 text-[#7957F5] dark:text-[#A78BFA] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Basic Arithmetic
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-[#A6A9B8]">
                Everyday calculations, arithmetic, percentages and quick numerical operations.
              </p>
            </div>
          </div>
        </div>

        {/* Settings Pill: Sound, Precision, Thousands Separator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Decimal Precision Control */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-[#A6A9B8]">
            <Sliders className="w-3.5 h-3.5 text-[#7957F5]" />
            <span className="text-[11px] font-medium hidden sm:inline">Decimals:</span>
            <select
              value={precision}
              onChange={(e) => setPrecision(Number(e.target.value))}
              className="bg-transparent text-slate-900 dark:text-white font-mono text-xs focus:outline-none cursor-pointer"
              title="Set decimal precision"
            >
              <option value={0}>0</option>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
            </select>
          </div>

          {/* Grouping Comma Toggle */}
          <button
            onClick={() => setUseGrouping(!useGrouping)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              useGrouping
                ? 'bg-[#7957F5]/10 border-[#7957F5]/30 text-[#7957F5] dark:text-[#A78BFA]'
                : 'bg-white dark:bg-[#111321] border-slate-200 dark:border-white/10 text-slate-500'
            }`}
            title="Toggle thousands separators (commas)"
          >
            <Hash className="w-3.5 h-3.5" />
            <span className="text-[11px]">{useGrouping ? '1,000' : '1000'}</span>
          </button>

          {/* Audio Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-white dark:bg-[#111321] border-slate-200 dark:border-white/10 text-slate-400'
            }`}
            title={soundEnabled ? 'Keypad sound enabled' : 'Keypad sound muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Center Smartphone-Style Calculator Body */}
      <div className="flex justify-center items-center py-2 sm:py-6">
        <div className="w-full max-w-[360px] sm:max-w-[400px] bg-white/95 dark:bg-[#10121E]/95 backdrop-blur-xl border border-slate-200 dark:border-white/12 rounded-3xl sm:rounded-4xl p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all">
          {/* CALCULATOR SCREEN DISPLAY */}
          <div className="bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/8 rounded-2xl sm:rounded-3xl p-4 sm:p-5 mb-5 flex flex-col justify-between min-h-[120px] sm:min-h-[140px] relative transition-all">
            {/* Top row: Expression trail & Copy action */}
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs sm:text-sm font-mono text-slate-500 dark:text-[#A6A9B8] overflow-x-auto whitespace-nowrap thin-scrollbar pr-2 min-h-[20px]">
                {expression || ' '}
              </div>

              {/* Copy Result Button */}
              <button
                onClick={handleCopyResult}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                title="Copy result to clipboard"
                aria-label="Copy result"
              >
                {copied ? (
                  <span className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Main Numerical Display */}
            <div className="text-right overflow-x-auto whitespace-nowrap thin-scrollbar mt-2 select-all">
              <span
                className={`font-mono font-bold tracking-tight transition-all ${
                  errorMessage
                    ? 'text-rose-500 text-xl sm:text-2xl'
                    : `text-slate-900 dark:text-[#F6F7FB] ${displayFontSize}`
                }`}
              >
                {formattedDisplay}
              </span>
            </div>
          </div>

          {/* 4-COLUMN PHONE KEYPAD */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3 select-none">
            {/* Row 1: AC, +/-, %, ÷ */}
            <button
              onClick={displayValue !== '0' && !lastEvaluated ? handleClearEntry : handleAllClear}
              className="h-13 sm:h-15 rounded-2xl bg-slate-200/80 dark:bg-white/[0.12] hover:bg-slate-300/80 dark:hover:bg-white/[0.18] text-slate-900 dark:text-white font-semibold text-sm sm:text-base active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              title={displayValue !== '0' && !lastEvaluated ? 'Clear Entry (C)' : 'All Clear (AC)'}
            >
              {displayValue !== '0' && !lastEvaluated ? 'C' : 'AC'}
            </button>
            <button
              onClick={handleToggleSign}
              className="h-13 sm:h-15 rounded-2xl bg-slate-200/80 dark:bg-white/[0.12] hover:bg-slate-300/80 dark:hover:bg-white/[0.18] text-slate-900 dark:text-white font-semibold text-sm sm:text-base active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              title="Change Sign (+/-)"
            >
              ±
            </button>
            <button
              onClick={handlePercentage}
              className="h-13 sm:h-15 rounded-2xl bg-slate-200/80 dark:bg-white/[0.12] hover:bg-slate-300/80 dark:hover:bg-white/[0.18] text-slate-900 dark:text-white font-semibold text-sm sm:text-base active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              title="Percentage (%)"
            >
              %
            </button>
            <button
              onClick={() => handleOperator('/')}
              className={`h-13 sm:h-15 rounded-2xl font-bold text-lg sm:text-xl active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs ${
                currentOperator === '/' && waitingForOperand
                  ? 'bg-[#7957F5] text-white shadow-md'
                  : 'bg-[#7957F5]/15 text-[#7957F5] dark:text-[#A78BFA] hover:bg-[#7957F5]/25'
              }`}
              title="Divide (÷)"
            >
              ÷
            </button>

            {/* Row 2: 7, 8, 9, × */}
            <button
              onClick={() => handleDigit('7')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              7
            </button>
            <button
              onClick={() => handleDigit('8')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              8
            </button>
            <button
              onClick={() => handleDigit('9')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              9
            </button>
            <button
              onClick={() => handleOperator('*')}
              className={`h-13 sm:h-15 rounded-2xl font-bold text-lg sm:text-xl active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs ${
                currentOperator === '*' && waitingForOperand
                  ? 'bg-[#7957F5] text-white shadow-md'
                  : 'bg-[#7957F5]/15 text-[#7957F5] dark:text-[#A78BFA] hover:bg-[#7957F5]/25'
              }`}
              title="Multiply (×)"
            >
              ×
            </button>

            {/* Row 3: 4, 5, 6, − */}
            <button
              onClick={() => handleDigit('4')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              4
            </button>
            <button
              onClick={() => handleDigit('5')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              5
            </button>
            <button
              onClick={() => handleDigit('6')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              6
            </button>
            <button
              onClick={() => handleOperator('-')}
              className={`h-13 sm:h-15 rounded-2xl font-bold text-lg sm:text-xl active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs ${
                currentOperator === '-' && waitingForOperand
                  ? 'bg-[#7957F5] text-white shadow-md'
                  : 'bg-[#7957F5]/15 text-[#7957F5] dark:text-[#A78BFA] hover:bg-[#7957F5]/25'
              }`}
              title="Subtract (−)"
            >
              −
            </button>

            {/* Row 4: 1, 2, 3, + */}
            <button
              onClick={() => handleDigit('1')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              1
            </button>
            <button
              onClick={() => handleDigit('2')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              2
            </button>
            <button
              onClick={() => handleDigit('3')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              3
            </button>
            <button
              onClick={() => handleOperator('+')}
              className={`h-13 sm:h-15 rounded-2xl font-bold text-lg sm:text-xl active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs ${
                currentOperator === '+' && waitingForOperand
                  ? 'bg-[#7957F5] text-white shadow-md'
                  : 'bg-[#7957F5]/15 text-[#7957F5] dark:text-[#A78BFA] hover:bg-[#7957F5]/25'
              }`}
              title="Add (+)"
            >
              +
            </button>

            {/* Row 5: 0, ., Backspace, = */}
            <button
              onClick={() => handleDigit('0')}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="h-13 sm:h-15 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.10] text-slate-900 dark:text-[#F6F7FB] font-semibold text-lg sm:text-xl border border-slate-200/60 dark:border-white/8 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              title="Decimal point"
            >
              .
            </button>
            <button
              onClick={handleBackspace}
              className="h-13 sm:h-15 rounded-2xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.14] text-slate-700 dark:text-slate-300 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              title="Backspace / Delete (⌫)"
              aria-label="Backspace"
            >
              <Delete className="w-5 h-5" />
            </button>
            <button
              onClick={handleEquals}
              className="h-13 sm:h-15 rounded-2xl bg-gradient-to-tr from-[#7957F5] to-[#D94BCB] text-white font-bold text-xl active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(121,87,245,0.35)] hover:brightness-105"
              title="Equals (=)"
            >
              =
            </button>
          </div>

          {/* Auxiliary row: 00, Quick clear & Keyboard hints */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-[#A6A9B8]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Keyboard: 0–9, + - * /, Enter, Esc</span>
            </div>
            <button
              onClick={() => handleDigit('00')}
              className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
              title="Insert double zero"
            >
              00
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
