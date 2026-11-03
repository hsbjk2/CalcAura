import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  Compass,
  Star,
  Rocket,
  ShoppingBag,
  Pizza,
  Shapes,
  Brain,
  Search,
  Grid3X3,
  MapPin,
  Scale,
  Award,
  ChevronRight,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  generateNumberQuestStage,
  verifyNumberQuestSelection,
  calculateBasketTotal,
  calculateFruitMarketChange,
  FRUIT_CATALOG,
  FruitItem,
  generateSpaceMissionQuestion,
  checkFractionMatch,
  areFractionsEquivalent,
  SHAPE_PROPERTIES,
  calculateInteriorAngleSum,
  generateMemoryCards,
  MemoryCard,
  generatePatternDetective,
  generateNumberMaze,
  MazeCell,
  verifyMiniSudoku,
  generateBingoBoard,
  BingoCell,
  checkBingoWin,
  calculateDistance,
  getQuadrant,
  convertLength,
  convertWeight,
  convertVolume,
} from '../../math/playgroundGames.ts';

// -------------------------------------------------------------
// 1. NUMBER QUEST COMPONENT
// -------------------------------------------------------------
export const NumberQuestGame: React.FC = () => {
  const [stage, setStage] = useState<number>(1);
  const [stageData, setStageData] = useState(() => generateNumberQuestStage(1));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelect = (num: number) => {
    setSelectedOption(num);
    const isCorrect = verifyNumberQuestSelection(num, stageData.targetCount);
    if (isCorrect) {
      setScore((s) => s + 10);
      setFeedback('🎉 Correct! Gate unlocked! Next adventure awaits.');
    } else {
      setFeedback(`Not quite! You collected ${num}, but the quest needed ${stageData.targetCount}. Try again!`);
    }
  };

  const handleNextStage = () => {
    const nextSt = stage + 1;
    setStage(nextSt);
    setStageData(generateNumberQuestStage(nextSt));
    setSelectedOption(null);
    setFeedback(null);
  };

  const handleReset = () => {
    setStage(1);
    setStageData(generateNumberQuestStage(1));
    setSelectedOption(null);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl font-bold shadow-xs">
            🌟
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Number Quest: The Quantity Gateway
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold">
                Stage {stage}
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Solve number problems, collect correct quantities, and progress through fantasy stages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300">
            Score: <strong className="text-amber-500">{score} pts</strong>
          </span>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 cursor-pointer transition-colors"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quest Canvas Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-900/40 text-center space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Quest Objective:
        </span>
        <h5 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          {stageData.problemText}
        </h5>

        {/* Visual Item Display */}
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-md mx-auto py-2">
          {Array.from({ length: Math.min(stageData.targetCount, 25) }).map((_, i) => (
            <span key={i} className="text-2xl animate-bounce-gentle" style={{ animationDelay: `${i * 60}ms` }}>
              {stageData.itemEmoji}
            </span>
          ))}
          {stageData.targetCount > 25 && (
            <span className="text-xs font-mono font-bold text-amber-600">
              +{stageData.targetCount - 25} more!
            </span>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto pt-2">
          {stageData.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === stageData.targetCount;

            let btnStyle = 'bg-white dark:bg-[#1a1c2e] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:scale-105';
            if (isSelected) {
              btnStyle = isCorrect
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                : 'bg-rose-500 text-white border-rose-600 shadow-md scale-105';
            }

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`py-3.5 px-4 rounded-2xl border-2 text-base font-black font-mono transition-all cursor-pointer shadow-sm ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs font-bold transition-all ${
              selectedOption === stageData.targetCount
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
            }`}
          >
            {feedback}
          </div>
        )}

        {selectedOption === stageData.targetCount && (
          <button
            onClick={handleNextStage}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 shadow-md transition-all cursor-pointer flex items-center gap-2 mx-auto"
          >
            <span>Proceed to Stage {stage + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. FRUIT MARKET COMPONENT
// -------------------------------------------------------------
export const FruitMarketGame: React.FC = () => {
  const [basket, setBasket] = useState<Record<string, number>>({ apple: 2, banana: 4 });
  const [cashTendered, setCashTendered] = useState<number>(100);
  const [result, setResult] = useState<any>(null);

  const total = calculateBasketTotal(basket);

  const handleQuantity = (fruitId: string, delta: number) => {
    setBasket((prev) => {
      const current = prev[fruitId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [fruitId]: next };
    });
    setResult(null);
  };

  const handleCheckout = () => {
    const outcome = calculateFruitMarketChange(total, cashTendered);
    setResult(outcome);
  };

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-2xl font-bold shadow-xs">
            🍎
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Fruit Market: Cash Register & Change Calculation
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
                Indian Currency (₹)
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Add fruit to baskets, calculate billing totals, and give change using exact note denominations.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setBasket({ apple: 1, banana: 2 });
            setCashTendered(50);
            setResult(null);
          }}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 cursor-pointer"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Fruit Stalls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {FRUIT_CATALOG.map((f) => {
          const count = basket[f.id] || 0;
          return (
            <div
              key={f.id}
              className="p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-center space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl block mb-1">{f.emoji}</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                  {f.name}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  ₹{f.unitPrice} each
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => handleQuantity(f.id, -1)}
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center hover:bg-slate-300 cursor-pointer"
                >
                  -
                </button>
                <span className="font-mono text-xs font-bold min-w-[16px] text-center">
                  {count}
                </span>
                <button
                  onClick={() => handleQuantity(f.id, 1)}
                  className="w-6 h-6 rounded-lg bg-emerald-500 text-white font-bold text-xs flex items-center justify-center hover:bg-emerald-600 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cash Register Checkout Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-100 dark:bg-[#0c0e18] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">
            Cart Total Price:
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            ₹{total}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">Customer Paid:</span>
            <select
              value={cashTendered}
              onChange={(e) => {
                setCashTendered(Number(e.target.value));
                setResult(null);
              }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1a1c2e] border border-slate-300 dark:border-white/20 text-xs font-mono font-bold cursor-pointer"
            >
              {[20, 50, 100, 200, 500].map((v) => (
                <option key={v} value={v}>
                  ₹{v} Note
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCheckout}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Calculate Change</span>
          </button>
        </div>
      </div>

      {result && (
        <div
          className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in ${
            result.isValidPayment
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
          }`}
        >
          {result.isValidPayment ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">
                  Change Due: ₹{result.changeDue} (₹{cashTendered} - ₹{total})
                </span>
                <span className="font-mono">Transaction Approved</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <span className="font-semibold">Cash Tills Breakdown:</span>
                {result.notesChange.length === 0 ? (
                  <span>Exact payment tendered! No change needed.</span>
                ) : (
                  result.notesChange.map((n: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-black/30 border font-mono font-bold text-slate-800 dark:text-slate-100"
                    >
                      {n.count} × ₹{n.note} Note
                    </span>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="font-bold">
              Customer gave ₹{cashTendered}, which is less than the total bill of ₹{total}! Need ₹{total - cashTendered} more.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 3. MULTIPLICATION SPACE MISSION (Tables 1-30)
// -------------------------------------------------------------
export const MultiplicationSpaceMissionGame: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<number>(7);
  const [missionQ, setMissionQ] = useState(() => generateSpaceMissionQuestion(7));
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number>(140);
  const [warpLevel, setWarpLevel] = useState<number>(1);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (val: number) => {
    setSelectedProduct(val);
    if (val === missionQ.correctProduct) {
      setDistanceKm((prev) => prev + missionQ.speedBoostKm);
      setWarpLevel((w) => w + 1);
      setFeedback(`🚀 Thrusters engaged! +${missionQ.speedBoostKm} km warped!`);
    } else {
      setFeedback(`Asteroid collision warning! ${missionQ.tableNum} × ${missionQ.multiplier} is ${missionQ.correctProduct}.`);
    }
  };

  const handleNextQuestion = () => {
    setMissionQ(generateSpaceMissionQuestion(selectedTable));
    setSelectedProduct(null);
    setFeedback(null);
  };

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-2xl font-bold shadow-xs">
            🚀
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Multiplication Space Mission
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold">
                Tables 1–30 Interlinked
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Answer multiplication table questions to warp through deep space and power planetary relays.
            </p>
          </div>
        </div>

        {/* Table Selector (1 to 30) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Target Table:</span>
          <select
            value={selectedTable}
            onChange={(e) => {
              const tbl = Number(e.target.value);
              setSelectedTable(tbl);
              setMissionQ(generateSpaceMissionQuestion(tbl));
              setSelectedProduct(null);
              setFeedback(null);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold cursor-pointer"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Table {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cockpit HUD */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 text-white space-y-5 relative overflow-hidden border border-indigo-900/60 shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
          <span>Warp Sector: Alpha-{warpLevel}</span>
          <span>Mission Distance: <strong className="text-amber-400 font-bold">{distanceKm} km</strong></span>
        </div>

        {/* Big Formula Display */}
        <div className="text-center py-4 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            Navigation Challenge
          </span>
          <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white">
            {missionQ.tableNum} × {missionQ.multiplier} = ?
          </div>
        </div>

        {/* Answer Options Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
          {missionQ.options.map((opt) => {
            const isSelected = selectedProduct === opt;
            const isCorrect = opt === missionQ.correctProduct;

            let style = 'bg-white/10 hover:bg-white/20 border-white/20 text-white';
            if (isSelected) {
              style = isCorrect
                ? 'bg-emerald-500 border-emerald-400 text-white scale-105'
                : 'bg-rose-500 border-rose-400 text-white scale-105';
            }

            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={`py-3 px-4 rounded-xl border text-lg font-black font-mono transition-all cursor-pointer shadow-md ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs font-bold text-center ${
              selectedProduct === missionQ.correctProduct
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}
          >
            {feedback}
          </div>
        )}

        {selectedProduct === missionQ.correctProduct && (
          <div className="text-center pt-1">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Next Space Sector</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. FRACTION KITCHEN
// -------------------------------------------------------------
export const FractionKitchenGame: React.FC = () => {
  const [denominator, setDenominator] = useState<number>(4);
  const [selectedSlices, setSelectedSlices] = useState<number>(1);
  const [targetNumerator, setTargetNumerator] = useState<number>(3);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isMatched = selectedSlices === targetNumerator;

  const handleSliceClick = (sliceIdx: number) => {
    // Toggle slice selection
    if (selectedSlices === sliceIdx + 1) {
      setSelectedSlices(sliceIdx);
    } else {
      setSelectedSlices(sliceIdx + 1);
    }
  };

  const handleVerify = () => {
    if (isMatched) {
      setFeedback(`Chef's Kiss! You sliced exactly ${targetNumerator}/${denominator} of the pizza!`);
    } else {
      setFeedback(`Currently sliced ${selectedSlices}/${denominator}. Target was ${targetNumerator}/${denominator}. Adjust slices!`);
    }
  };

  const newChallenge = () => {
    const denoms = [2, 3, 4, 6, 8];
    const newDenom = denoms[Math.floor(Math.random() * denoms.length)];
    const newNum = Math.floor(Math.random() * (newDenom - 1)) + 1;
    setDenominator(newDenom);
    setTargetNumerator(newNum);
    setSelectedSlices(1);
    setFeedback(null);
  };

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-2xl font-bold shadow-xs">
            🍕
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Fraction Kitchen: Pizza Partitioner
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold">
                Parts & Wholes
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Divide pizzas into equal pieces, compare visual fractions, and complete chef orders.
            </p>
          </div>
        </div>

        <button
          onClick={newChallenge}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
        >
          New Order 🍕
        </button>
      </div>

      {/* Target Order Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👨‍🍳</span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            Customer Order: Slice exactly{' '}
            <strong className="text-rose-600 dark:text-rose-400 font-mono text-base">
              {targetNumerator}/{denominator}
            </strong>{' '}
            of the pizza!
          </span>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Decimal: {(targetNumerator / denominator).toFixed(2)}
        </span>
      </div>

      {/* Visual Pizza SVG */}
      <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#0c0e18] rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
        <svg viewBox="-110 -110 220 220" className="w-52 h-52 sm:w-60 sm:h-60 drop-shadow-lg cursor-pointer">
          {/* Pizza Crust */}
          <circle cx="0" cy="0" r="100" fill="#f59e0b" stroke="#b45309" strokeWidth="8" />
          <circle cx="0" cy="0" r="90" fill="#fde68a" />

          {/* Slices */}
          {Array.from({ length: denominator }).map((_, i) => {
            const angleStep = (2 * Math.PI) / denominator;
            const startAngle = i * angleStep;
            const endAngle = (i + 1) * angleStep;

            const x1 = 90 * Math.cos(startAngle);
            const y1 = 90 * Math.sin(startAngle);
            const x2 = 90 * Math.cos(endAngle);
            const y2 = 90 * Math.sin(endAngle);

            const isSelected = i < selectedSlices;

            const d = `M 0 0 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`;

            return (
              <path
                key={i}
                d={d}
                fill={isSelected ? '#ef4444' : '#fed7aa'}
                stroke="#78350f"
                strokeWidth="2"
                onClick={() => handleSliceClick(i)}
                className="transition-colors hover:brightness-110"
              />
            );
          })}

          {/* Center Hub */}
          <circle cx="0" cy="0" r="8" fill="#78350f" />
        </svg>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            Selected Slices: <strong className="text-rose-500">{selectedSlices} / {denominator}</strong>
          </span>
          <button
            onClick={handleVerify}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
          >
            Verify Slices
          </button>
        </div>

        {feedback && (
          <div
            className={`p-2.5 rounded-xl text-xs font-bold ${
              isMatched
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 5. SHAPE BUILDER & PROPERTIES
// -------------------------------------------------------------
export const ShapeBuilderGame: React.FC = () => {
  const [selectedShapeKey, setSelectedShapeKey] = useState<string>('triangle');
  const shape = SHAPE_PROPERTIES[selectedShapeKey] || SHAPE_PROPERTIES.triangle;

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center text-2xl font-bold shadow-xs">
          📐
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            Shape Builder: Euclidean Geometry & Solid Angles
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-bold">
              Spatial Reasoning
            </span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Construct shapes, identify edge vertices, interior angle sums (n-2)×180°, and 3D faces.
          </p>
        </div>
      </div>

      {/* Shape Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto thin-scrollbar pb-1">
        {Object.keys(SHAPE_PROPERTIES).map((key) => {
          const item = SHAPE_PROPERTIES[key];
          const isSelected = selectedShapeKey === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedShapeKey(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Shape Properties Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-center">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Sides / Edges</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">
            {shape.sides}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-center">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Vertices</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">
            {shape.vertices}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-center">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Interior Angles Sum</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">
            {shape.interiorAngleSum > 0 ? `${shape.interiorAngleSum}°` : 'Curved'}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-center">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">3D Faces</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">
            {shape.faces3D || '2D Plane'}
          </span>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 6. MEMORY MATCH
// -------------------------------------------------------------
export const MemoryMatchGame: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>(() => generateMemoryCards(6));
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchesCount, setMatchesCount] = useState<number>(0);

  const handleCardClick = (id: string) => {
    if (flippedIds.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.isMatched || flippedIds.includes(id)) return;

    const nextFlipped = [...flippedIds, id];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      const card1 = cards.find((c) => c.id === nextFlipped[0])!;
      const card2 = cards.find((c) => c.id === nextFlipped[1])!;

      if (card1.pairId === card2.pairId) {
        // Matched!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.pairId === card1.pairId ? { ...c, isMatched: true } : c))
          );
          setFlippedIds([]);
          setMatchesCount((m) => m + 1);
        }, 500);
      } else {
        // Not matched -> Flip back
        setTimeout(() => {
          setFlippedIds([]);
        }, 900);
      }
    }
  };

  const resetGame = () => {
    setCards(generateMemoryCards(6));
    setFlippedIds([]);
    setMatchesCount(0);
  };

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-2xl font-bold shadow-xs">
            🧠
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Memory Match: Equations & Equivalent Math
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold">
                Pairs ({matchesCount}/6)
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Flip tiles to match arithmetic expressions, multiplication facts, fractions, and square roots.
            </p>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 cursor-pointer"
          title="Shuffle Cards"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of 12 Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {cards.map((card) => {
          const isRevealed = card.isMatched || flippedIds.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`h-24 sm:h-28 rounded-2xl border-2 transition-all flex flex-col items-center justify-center p-2 text-center cursor-pointer select-none ${
                card.isMatched
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 scale-95 opacity-80'
                  : isRevealed
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg scale-105'
                  : 'bg-slate-100 dark:bg-[#181a29] border-slate-200 dark:border-white/10 text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {isRevealed ? (
                <>
                  <span className="text-sm sm:text-base font-extrabold font-mono">
                    {card.display}
                  </span>
                  {card.subText && (
                    <span className="text-[9px] opacity-80 block mt-1 truncate">
                      {card.subText}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xl">🎴</span>
              )}
            </button>
          );
        })}
      </div>

      {matchesCount === 6 && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
          <span className="text-xl">🏆</span>
          <h5 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
            Memory Mastery! You matched all mathematical pairs.
          </h5>
          <button
            onClick={resetGame}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 7. PATTERN DETECTIVE
// -------------------------------------------------------------
export const PatternDetectiveGame: React.FC = () => {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [pattern, setPattern] = useState(() => generatePatternDetective(1));
  const [selectedOpt, setSelectedOpt] = useState<any>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelect = (val: any) => {
    setSelectedOpt(val);
    if (val === pattern.correctAnswer) {
      setFeedback(`🔍 Case Solved! ${pattern.ruleExplanation}`);
    } else {
      setFeedback(`Incorrect deduction. Keep looking for the pattern rule!`);
    }
  };

  const handleNewPattern = (lvl: 1 | 2 | 3) => {
    setLevel(lvl);
    setPattern(generatePatternDetective(lvl));
    setSelectedOpt(null);
    setFeedback(null);
  };

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 text-fuchsia-600 flex items-center justify-center text-2xl font-bold shadow-xs">
            🔍
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Pattern Detective: Sequence Rule Deduction
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 font-bold">
                Level {level}
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Discover missing numbers, shapes, and repeating sequential mathematical rules.
            </p>
          </div>
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-xl">
          {[1, 2, 3].map((l) => (
            <button
              key={l}
              onClick={() => handleNewPattern(l as 1 | 2 | 3)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                level === l
                  ? 'bg-fuchsia-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Lvl {l}
            </button>
          ))}
        </div>
      </div>

      {/* Sequence Row */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c0e18] border border-slate-200 dark:border-white/10 text-center space-y-4">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {pattern.sequence.map((item, idx) => (
            <div
              key={idx}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center text-lg sm:text-xl font-mono font-black ${
                item === '?'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400 animate-pulse'
                  : 'bg-white dark:bg-[#1a1c2e] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Clue Options */}
        <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 block w-full">
            Choose the Missing Element:
          </span>
          {pattern.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className={`px-5 py-2.5 rounded-xl font-mono font-bold text-sm border-2 cursor-pointer transition-all ${
                selectedOpt === opt
                  ? opt === pattern.correctAnswer
                    ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                    : 'bg-rose-500 text-white border-rose-600 scale-105'
                  : 'bg-white dark:bg-[#181a29] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs font-bold ${
              selectedOpt === pattern.correctAnswer
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 8. NUMBER MAZE
// -------------------------------------------------------------
export const NumberMazeGame: React.FC = () => {
  const [mazeData, setMazeData] = useState(() => generateNumberMaze(4, 3));
  const [currentPos, setCurrentPos] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [hasWon, setHasWon] = useState<boolean>(false);

  const handleCellClick = (r: number, c: number) => {
    // Check if adjacent to currentPos
    const dr = Math.abs(r - currentPos.r);
    const dc = Math.abs(c - currentPos.c);
    if ((dr === 1 && dc === 0) || (dr === 0 && dc === 1)) {
      setCurrentPos({ r, c });
      if (r === 3 && c === 3) {
        setHasWon(true);
      }
    }
  };

  const handleReset = () => {
    setMazeData(generateNumberMaze(4, 3));
    setCurrentPos({ r: 0, c: 0 });
    setHasWon(false);
  };

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center text-2xl font-bold shadow-xs">
            🌀
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Number Maze: Arithmetic Hop & Path Navigation
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mazeData.ruleDescription}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 4x4 Grid */}
      <div className="p-4 bg-slate-50 dark:bg-[#0c0e18] rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center">
        <div className="grid grid-cols-4 gap-2.5 max-w-sm w-full">
          {mazeData.grid.map((row, r) =>
            row.map((cell, c) => {
              const isPlayer = r === currentPos.r && c === currentPos.c;
              const isGoal = r === 3 && c === 3;

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`h-16 rounded-xl border-2 font-mono font-bold text-sm transition-all flex flex-col items-center justify-center cursor-pointer ${
                    isPlayer
                      ? 'bg-teal-500 text-white border-teal-600 shadow-md scale-105'
                      : isGoal
                      ? 'bg-amber-400/20 border-amber-400 text-amber-700 dark:text-amber-300'
                      : 'bg-white dark:bg-[#1a1c2e] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{cell.value}</span>
                  {isPlayer ? <span className="text-[11px]">🚶 Here</span> : isGoal ? <span className="text-[11px]">🏁 Goal</span> : null}
                </button>
              );
            })
          )}
        </div>

        {hasWon && (
          <div className="mt-4 p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-bold text-center">
            🎉 Maze Conquered! You reached the goal using arithmetic logic.
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 9. LOGIC LAB (3x3 Mini Sudoku)
// -------------------------------------------------------------
export const LogicLabGame: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([
    [1, 0, 3],
    [0, 3, 1],
    [3, 1, 0],
  ]);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleCellChange = (r: number, c: number) => {
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = (next[r][c] % 3) + 1;
      return next;
    });
    setIsValid(null);
  };

  const handleVerify = () => {
    const passed = verifyMiniSudoku(grid);
    setIsValid(passed);
  };

  const handleReset = () => {
    setGrid([
      [1, 0, 3],
      [0, 3, 1],
      [3, 1, 0],
    ]);
    setIsValid(null);
  };

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-2xl font-bold shadow-xs">
            🧩
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Logic Lab: 3×3 Deductive Matrix
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Each row and column must contain digits 1, 2, and 3 exactly once without repetition!
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4 p-4 bg-slate-50 dark:bg-[#0c0e18] rounded-2xl border border-slate-200 dark:border-white/10">
        <div className="grid grid-cols-3 gap-2 max-w-[220px]">
          {grid.map((row, r) =>
            row.map((val, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellChange(r, c)}
                className="w-16 h-16 rounded-xl border-2 border-slate-300 dark:border-white/20 bg-white dark:bg-[#1a1c2e] text-xl font-mono font-black text-slate-900 dark:text-white flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-sm"
              >
                {val > 0 ? val : '•'}
              </button>
            ))
          )}
        </div>

        <button
          onClick={handleVerify}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
        >
          Verify Logic Matrix
        </button>

        {isValid !== null && (
          <div
            className={`p-2.5 rounded-xl text-xs font-bold ${
              isValid
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
            }`}
          >
            {isValid ? '🎉 Verified! Valid Latin square arrangement.' : 'Rows or columns contain duplicates or missing numbers!'}
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 10. MATH BINGO
// -------------------------------------------------------------
export const MathBingoGame: React.FC = () => {
  const [board, setBoard] = useState(() => generateBingoBoard(3));
  const [hasWon, setHasWon] = useState<boolean>(false);

  const handleCellToggle = (r: number, c: number) => {
    setBoard((prev) => {
      const next = prev.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === r && cIdx === c ? { ...cell, isMarked: !cell.isMarked } : cell
        )
      );
      setHasWon(checkBingoWin(next));
      return next;
    });
  };

  const handleReset = () => {
    setBoard(generateBingoBoard(3));
    setHasWon(false);
  };

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center text-2xl font-bold shadow-xs">
            🎯
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Math Bingo: Row, Column & Diagonal Patterns
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mark answers to complete any continuous 3-in-a-row line to shout BINGO!
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4 p-4 bg-slate-50 dark:bg-[#0c0e18] rounded-2xl border border-slate-200 dark:border-white/10">
        <div className="grid grid-cols-3 gap-2.5 max-w-[240px]">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellToggle(r, c)}
                className={`w-16 h-16 rounded-xl border-2 font-mono font-black text-lg transition-all flex items-center justify-center cursor-pointer ${
                  cell.isMarked
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-white border-amber-600 shadow-md scale-105'
                    : 'bg-white dark:bg-[#1a1c2e] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
                }`}
              >
                {cell.val}
              </button>
            ))
          )}
        </div>

        {hasWon && (
          <div className="p-3 bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-xl text-xs font-bold text-center animate-bounce-gentle">
            🎊 BINGO! You connected a complete mathematical line!
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 11. COORDINATE EXPLORER
// -------------------------------------------------------------
export const CoordinateExplorerGame: React.FC = () => {
  const [point, setPoint] = useState<{ x: number; y: number }>({ x: 3, y: 4 });
  const dist = calculateDistance(0, 0, point.x, point.y);
  const quadrant = getQuadrant(point.x, point.y);

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-xs">
          🧭
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            Coordinate Explorer: Cartesian Plane & Distance
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Plot points (x, y), find Euclidean distance d = √(x²+y²), and explore the 4 quadrants.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Interactive Plane SVG */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
          <svg viewBox="-60 -60 120 120" className="w-56 h-56 sm:w-64 sm:h-64">
            {/* Grid lines */}
            {[-40, -20, 20, 40].map((v) => (
              <g key={v}>
                <line x1={v} y1="-50" x2={v} y2="50" stroke="#334155" strokeWidth="0.5" />
                <line x1="-50" y1={v} x2="50" y2={v} stroke="#334155" strokeWidth="0.5" />
              </g>
            ))}

            {/* Axes */}
            <line x1="-55" y1="0" x2="55" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="0" y1="-55" x2="0" y2="55" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Distance Vector Line */}
            <line
              x1="0"
              y1="0"
              x2={point.x * 10}
              y2={-point.y * 10}
              stroke="#ec4899"
              strokeWidth="2"
              strokeDasharray="2,2"
            />

            {/* Target Coordinate Dot */}
            <circle cx={point.x * 10} cy={-point.y * 10} r="4" fill="#3b82f6" />
          </svg>
          <span className="text-[11px] font-mono text-slate-400 mt-2">
            Point P({point.x}, {point.y}) · {quadrant}
          </span>
        </div>

        {/* Controls & Metrics */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
              <span>X-Coordinate:</span>
              <span className="font-mono font-bold text-blue-500">{point.x}</span>
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              value={point.x}
              onChange={(e) => setPoint((p) => ({ ...p, x: Number(e.target.value) }))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
              <span>Y-Coordinate:</span>
              <span className="font-mono font-bold text-rose-500">{point.y}</span>
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              value={point.y}
              onChange={(e) => setPoint((p) => ({ ...p, y: Number(e.target.value) }))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/10 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Euclidean Distance d:</span>
              <strong className="text-pink-500">{dist.euclidean.toFixed(2)} units</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Manhattan Distance:</span>
              <strong>{dist.manhattan} units</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Location:</span>
              <span className="text-[#7957F5] font-bold">{quadrant}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 12. MEASUREMENT MISSION
// -------------------------------------------------------------
export const MeasurementMissionGame: React.FC = () => {
  const [val, setVal] = useState<number>(250);
  const [fromUnit, setFromUnit] = useState<'mm' | 'cm' | 'm' | 'km'>('cm');
  const [toUnit, setToUnit] = useState<'mm' | 'cm' | 'm' | 'km'>('m');

  const converted = convertLength(val, fromUnit, toUnit);

  return (
    <div className="bg-white dark:bg-[#111321] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl font-bold shadow-xs">
          ⚖️
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            Measurement Mission: Metric Unit Conversion Lab
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Convert millimeters, centimeters, meters, and kilometers with real-world scales.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* Input Value */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Quantity:
          </label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(Number(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-mono font-bold"
          />
        </div>

        {/* From Unit */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            From Unit:
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-bold cursor-pointer"
          >
            <option value="mm">Millimeters (mm)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="m">Meters (m)</option>
            <option value="km">Kilometers (km)</option>
          </select>
        </div>

        {/* To Unit */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            To Unit:
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-bold cursor-pointer"
          >
            <option value="mm">Millimeters (mm)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="m">Meters (m)</option>
            <option value="km">Kilometers (km)</option>
          </select>
        </div>
      </div>

      {/* Result Display */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
        <span className="text-xs font-bold text-amber-800 dark:text-amber-200">
          Conversion Result:
        </span>
        <span className="text-lg sm:text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
          {val} {fromUnit} = {converted} {toUnit}
        </span>
      </div>
    </div>
  );
};
