import React, { useState } from 'react';
import { Clock, Ruler, ShoppingBag, Grid, BookOpen, CheckCircle2, RotateCw, Lightbulb, Trophy, Sparkles } from 'lucide-react';
import { VisualObject, VisualAssetType } from './VisualAssetLibrary.tsx';

export const EverydayMathActivity: React.FC = () => {
  const [subActivity, setSubActivity] = useState<'ruler' | 'clock' | 'market' | 'patterns' | 'word_problems'>('ruler');

  // --- RULER STATE ---
  const [measuredItemIndex, setMeasuredItemIndex] = useState<number>(0);
  const [userLengthGuess, setUserLengthGuess] = useState<number | null>(null);
  const rulerItems = [
    { name: 'Crayon', asset: 'pencil' as VisualAssetType, lengthCm: 8, color: '#f59e0b' },
    { name: 'Eraser', asset: 'eraser' as VisualAssetType, lengthCm: 4, color: '#ec4899' },
    { name: 'Pencil', asset: 'pencil' as VisualAssetType, lengthCm: 12, color: '#3b82f6' },
    { name: 'Toy Car', asset: 'car' as VisualAssetType, lengthCm: 10, color: '#ef4444' }
  ];
  const currentRulerItem = rulerItems[measuredItemIndex];

  // --- CLOCK STATE ---
  const [clockHours, setClockHours] = useState<number>(3);
  const [clockMinutes, setClockMinutes] = useState<number>(15);
  const [clockTarget, setClockTarget] = useState<{ hours: number; minutes: number; label: string }>({
    hours: 4,
    minutes: 30,
    label: 'Half past 4 (4:30)'
  });
  const [clockFeedback, setClockFeedback] = useState<string | null>(null);

  // --- RUPEE SHOPPING MARKET STATE ---
  const shopItems = [
    { id: 'apple', name: 'Fresh Apple', price: 10, asset: 'apple' as VisualAssetType },
    { id: 'cookie', name: 'Choco Cookie', price: 5, asset: 'cookie' as VisualAssetType },
    { id: 'banana', name: 'Banana', price: 4, asset: 'banana' as VisualAssetType },
    { id: 'car', name: 'Toy Car', price: 25, asset: 'car' as VisualAssetType },
    { id: 'ball', name: 'Rubber Ball', price: 15, asset: 'ball' as VisualAssetType },
    { id: 'pencil', name: 'Color Pencil', price: 6, asset: 'pencil' as VisualAssetType }
  ];
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([
    { id: 'apple', qty: 1 },
    { id: 'cookie', qty: 2 }
  ]);
  const [paidCoins, setPaidCoins] = useState<{ [denom: number]: number }>({
    1: 0,
    2: 0,
    5: 0,
    10: 0,
    20: 0
  });

  const cartTotal = cart.reduce((sum, item) => {
    const p = shopItems.find((s) => s.id === item.id)?.price || 0;
    return sum + p * item.qty;
  }, 0);

  const totalPaid = Object.entries(paidCoins).reduce(
    (sum, [denom, count]) => sum + Number(denom) * count,
    0
  );

  const addToCart = (id: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const addCoin = (denom: number) => {
    setPaidCoins((prev) => ({ ...prev, [denom]: (prev[denom] || 0) + 1 }));
  };

  const resetCoins = () => {
    setPaidCoins({ 1: 0, 2: 0, 5: 0, 10: 0, 20: 0 });
  };

  // --- PATTERNS STATE ---
  const patterns = [
    {
      type: 'numbers',
      seq: [2, 4, 6, null, 10, 12],
      rule: 'Skip-counting by 2 (+2 each step)',
      correct: 8,
      options: [7, 8, 9, 14]
    },
    {
      type: 'numbers',
      seq: [5, 10, 15, 20, null, 30],
      rule: 'Skip-counting by 5 (+5 each step)',
      correct: 25,
      options: [22, 24, 25, 28]
    },
    {
      type: 'numbers',
      seq: [10, 20, 30, null, 50, 60],
      rule: 'Counting in tens (+10 each step)',
      correct: 40,
      options: [35, 40, 45, 55]
    },
    {
      type: 'numbers',
      seq: [1, 4, 9, 16, null, 36],
      rule: 'Square numbers (1x1, 2x2, 3x3, 4x4, 5x5...)',
      correct: 25,
      options: [20, 24, 25, 30]
    }
  ];
  const [patternIndex, setPatternIndex] = useState<number>(0);
  const [selectedPatternAnswer, setSelectedPatternAnswer] = useState<number | null>(null);

  // --- WORD PROBLEMS STATE ---
  const wordProblems = [
    {
      story: 'Aarav has 7 mangoes. His grandmother gives him 5 more mangoes from the orchard. How many mangoes does Aarav have altogether?',
      asset: 'mango' as VisualAssetType,
      op1: 7,
      op2: 5,
      operation: '+',
      correct: 12,
      unit: 'mangoes',
      explanation: 'Altogether means combining both sets: 7 mangoes + 5 mangoes = 12 mangoes.'
    },
    {
      story: 'Ananya bought a packet of 15 colourful balloons for a party. 4 balloons popped while blowing them up. How many balloons are left intact?',
      asset: 'star' as VisualAssetType,
      op1: 15,
      op2: 4,
      operation: '−',
      correct: 11,
      unit: 'balloons',
      explanation: 'Balloons left means taking away the popped ones: 15 − 4 = 11 balloons.'
    },
    {
      story: 'There are 4 study tables in a classroom. Each table has 3 books placed on it. How many books are there in total?',
      asset: 'book' as VisualAssetType,
      op1: 4,
      op2: 3,
      operation: '×',
      correct: 12,
      unit: 'books',
      explanation: 'Equal groups of books: 4 tables × 3 books = 12 books.'
    },
    {
      story: 'Grandfather brings 18 chocolates and shares them equally among 3 grandchildren. How many chocolates does each grandchild receive?',
      asset: 'chocolate' as VisualAssetType,
      op1: 18,
      op2: 3,
      operation: '÷',
      correct: 6,
      unit: 'chocolates',
      explanation: 'Sharing equally: 18 chocolates ÷ 3 children = 6 chocolates each.'
    }
  ];
  const [wpIndex, setWpIndex] = useState<number>(0);
  const [wpUserAnswer, setWpUserAnswer] = useState<string>('');
  const [wpChecked, setWpChecked] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Header with Sub-Activity Switcher */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 dark:from-amber-950/40 dark:via-orange-950/40 dark:to-yellow-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Activity H — Everyday Mathematics
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 font-semibold">
                  Classes 1–5 Real World
                </span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Measurement rulers, clocks, Indian Rupee (₹) shopping market, pattern sequences, and illustrated stories.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSubActivity('ruler')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                subActivity === 'ruler'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" /> Ruler (cm)
            </button>
            <button
              onClick={() => setSubActivity('clock')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                subActivity === 'clock'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> Clocks & Time
            </button>
            <button
              onClick={() => setSubActivity('market')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                subActivity === 'market'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Rupee (₹) Market
            </button>
            <button
              onClick={() => setSubActivity('patterns')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                subActivity === 'patterns'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Patterns
            </button>
            <button
              onClick={() => setSubActivity('word_problems')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                subActivity === 'word_problems'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Word Stories
            </button>
          </div>
        </div>
      </div>

      {/* 1. RULER MEASUREMENT */}
      {subActivity === 'ruler' && (
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Measure with a Centimetre Ruler
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Look where the object starts at 0 cm and where it ends on the ruler markings.
              </p>
            </div>
            <div className="flex gap-2">
              {rulerItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMeasuredItemIndex(idx);
                    setUserLengthGuess(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    measuredItemIndex === idx
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Ruler Viewport */}
          <div className="p-6 bg-amber-50/40 dark:bg-gray-900/60 rounded-2xl border border-amber-100 dark:border-gray-700/60 flex flex-col items-center justify-center space-y-4 overflow-x-auto">
            {/* The Item to measure */}
            <div className="w-full max-w-2xl flex items-center justify-start pl-6">
              <div
                className="h-14 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md transition-all duration-300"
                style={{
                  width: `${(currentRulerItem.lengthCm / 15) * 540}px`,
                  backgroundColor: currentRulerItem.color
                }}
              >
                <div className="flex items-center gap-2 px-3">
                  <VisualObject type={currentRulerItem.asset} size="sm" />
                  <span>{currentRulerItem.name}</span>
                </div>
              </div>
            </div>

            {/* SVG 15-cm Ruler */}
            <div className="w-full max-w-2xl flex justify-start pl-6">
              <svg viewBox="0 0 540 70" className="w-[540px] h-[70px] drop-shadow-md">
                <rect x="0" y="0" width="540" height="70" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                {/* 15 cm divisions: 540 / 15 = 36px per cm */}
                {Array.from({ length: 16 }).map((_, i) => {
                  const x = i * 36;
                  return (
                    <g key={i}>
                      {/* Major cm mark */}
                      <line x1={x} y1="0" x2={x} y2="28" stroke="#78350f" strokeWidth="2" />
                      <text x={x} y="44" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">
                        {i}
                      </text>
                      {/* Half cm tick */}
                      {i < 15 && (
                        <line x1={x + 18} y1="0" x2={x + 18} y2="18" stroke="#b45309" strokeWidth="1.5" />
                      )}
                      {/* Millimeter ticks */}
                      {i < 15 &&
                        [3.6, 7.2, 10.8, 14.4, 21.6, 25.2, 28.8, 32.4].map((offset, subIdx) => (
                          <line
                            key={subIdx}
                            x1={x + offset}
                            y1="0"
                            x2={x + offset}
                            y2="10"
                            stroke="#d97706"
                            strokeWidth="1"
                          />
                        ))}
                    </g>
                  );
                })}
                <text x="520" y="62" fontSize="9" fontWeight="bold" fill="#92400e">
                  cm
                </text>
              </svg>
            </div>
          </div>

          {/* Interactive Question */}
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              What is the length of this {currentRulerItem.name.toLowerCase()}?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[currentRulerItem.lengthCm - 2, currentRulerItem.lengthCm, currentRulerItem.lengthCm + 1, currentRulerItem.lengthCm + 3]
                .filter((v) => v > 0)
                .sort((a, b) => a - b)
                .map((val) => (
                  <button
                    key={val}
                    onClick={() => setUserLengthGuess(val)}
                    className={`px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                      userLengthGuess === val
                        ? val === currentRulerItem.lengthCm
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                          : 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-amber-400'
                    }`}
                  >
                    {val} cm
                  </button>
                ))}
            </div>

            {userLengthGuess !== null && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold max-w-md mx-auto ${
                  userLengthGuess === currentRulerItem.lengthCm
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                    : 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200'
                }`}
              >
                {userLengthGuess === currentRulerItem.lengthCm ? (
                  <span>🎉 Correct! The {currentRulerItem.name.toLowerCase()} measures exactly {currentRulerItem.lengthCm} cm.</span>
                ) : (
                  <span>Try again! Check where the right tip touches the centimetre line.</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. CLOCKS & TIME */}
      {subActivity === 'clock' && (
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Analog & Digital Clock Explorer
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Target Challenge: <span className="font-bold text-amber-600 dark:text-amber-400">{clockTarget.label}</span>
              </p>
            </div>
            <button
              onClick={() => {
                const randomHours = Math.floor(Math.random() * 12) + 1;
                const minOptions = [0, 15, 30, 45];
                const randomMin = minOptions[Math.floor(Math.random() * minOptions.length)];
                let lbl = `${randomHours}:${randomMin === 0 ? '00' : randomMin}`;
                if (randomMin === 0) lbl = `${randomHours} o’clock (${randomHours}:00)`;
                if (randomMin === 30) lbl = `Half past ${randomHours} (${randomHours}:30)`;
                if (randomMin === 15) lbl = `Quarter past ${randomHours} (${randomHours}:15)`;
                if (randomMin === 45) lbl = `Quarter to ${randomHours === 12 ? 1 : randomHours + 1} (${randomHours}:45)`;

                setClockTarget({ hours: randomHours, minutes: randomMin, label: lbl });
                setClockFeedback(null);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5 self-start"
            >
              <RotateCw className="w-3.5 h-3.5" /> New Time Challenge
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Analog Clock SVG */}
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
              <svg viewBox="0 0 240 240" className="w-56 h-56 drop-shadow-lg">
                {/* Clock Face */}
                <circle cx="120" cy="120" r="110" fill="#ffffff" stroke="#334155" strokeWidth="8" />
                <circle cx="120" cy="120" r="102" fill="#f8fafc" />

                {/* 12 Hour numbers */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const num = i + 1;
                  const angle = (num * 30 - 90) * (Math.PI / 180);
                  const x = 120 + 82 * Math.cos(angle);
                  const y = 120 + 82 * Math.sin(angle);
                  return (
                    <text
                      key={num}
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="bold"
                      fill="#1e293b"
                    >
                      {num}
                    </text>
                  );
                })}

                {/* Hour Hand */}
                {(() => {
                  const hourAngle = ((clockHours % 12) + clockMinutes / 60) * 30 - 90;
                  const rad = hourAngle * (Math.PI / 180);
                  const hx = 120 + 52 * Math.cos(rad);
                  const hy = 120 + 52 * Math.sin(rad);
                  return (
                    <line
                      x1="120"
                      y1="120"
                      x2={hx}
                      y2={hy}
                      stroke="#0284c7"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  );
                })()}

                {/* Minute Hand */}
                {(() => {
                  const minAngle = clockMinutes * 6 - 90;
                  const rad = minAngle * (Math.PI / 180);
                  const mx = 120 + 75 * Math.cos(rad);
                  const my = 120 + 75 * Math.sin(rad);
                  return (
                    <line
                      x1="120"
                      y1="120"
                      x2={mx}
                      y2={my}
                      stroke="#ef4444"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  );
                })()}

                {/* Center Pin */}
                <circle cx="120" cy="120" r="6" fill="#0f172a" />
              </svg>

              {/* Digital Representation */}
              <div className="mt-4 px-6 py-2 bg-gray-900 text-emerald-400 font-mono text-2xl font-bold rounded-xl tracking-widest border border-gray-700 shadow-inner">
                {String(clockHours).padStart(2, '0')}:{String(clockMinutes).padStart(2, '0')}
              </div>
            </div>

            {/* Hand Adjustment Controls */}
            <div className="space-y-5">
              <div>
                <label className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  <span>Hour Hand (Blue)</span>
                  <span className="text-sky-600">{clockHours}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={clockHours}
                  onChange={(e) => setClockHours(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  <span>Minute Hand (Red)</span>
                  <span className="text-red-500">{clockMinutes} minutes</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="55"
                  step="5"
                  value={clockMinutes}
                  onChange={(e) => setClockMinutes(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[0, 15, 30, 45].map((m) => (
                  <button
                    key={m}
                    onClick={() => setClockMinutes(m)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                  >
                    :{m === 0 ? '00' : m}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (clockHours === clockTarget.hours && clockMinutes === clockTarget.minutes) {
                    setClockFeedback('correct');
                  } else {
                    setClockFeedback('wrong');
                  }
                }}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Verify Time Matching
              </button>

              {clockFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    clockFeedback === 'correct'
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200'
                  }`}
                >
                  {clockFeedback === 'correct' ? (
                    <span>🌟 Excellent! You set the clock to {clockTarget.label}!</span>
                  ) : (
                    <span>Not quite yet! Target is {clockTarget.label}. Keep adjusting the sliders.</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. RUPEE (₹) SHOPPING MARKET */}
      {subActivity === 'market' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Shop Stall Items */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🛒 Little Bazaar Stall</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                  Sample educational prices
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {shopItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-400 bg-gray-50/50 dark:bg-gray-900/30 flex flex-col items-center text-center space-y-2"
                >
                  <VisualObject type={item.asset} size="md" />
                  <div className="font-semibold text-xs text-gray-900 dark:text-white">{item.name}</div>
                  <div className="text-sm font-extrabold text-amber-700 dark:text-amber-400">₹{item.price}</div>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all"
                  >
                    + Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart & Rupee Payment Register */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 space-y-5">
            <div className="border-b border-gray-100 dark:border-gray-700 pb-3 flex justify-between items-center">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">Shopping Bill</h4>
              <button
                onClick={() => setCart([])}
                className="text-xs text-rose-500 hover:underline"
              >
                Clear Cart
              </button>
            </div>

            {/* Cart Items list */}
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">Your cart is empty. Pick items from the bazaar!</p>
              ) : (
                cart.map((item) => {
                  const details = shopItems.find((s) => s.id === item.id)!;
                  return (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{details.name}</span>
                        <span className="text-gray-500">×{item.qty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">₹{details.price * item.qty}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center font-bold text-xs"
                        >
                          −
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bill Summary */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/50 flex justify-between items-center">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase">Total Bill to Pay</span>
              <span className="text-xl font-black text-amber-700 dark:text-amber-300">₹{cartTotal}</span>
            </div>

            {/* Rupee Coins Tray */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Pay with Indian Rupee Coins</span>
                <button onClick={resetCoins} className="text-xs text-amber-600 hover:underline">
                  Reset Coins
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 5, 10, 20].map((denom) => (
                  <button
                    key={denom}
                    onClick={() => addCoin(denom)}
                    className="p-2 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-900/60 dark:to-amber-800/60 border border-amber-300 dark:border-amber-700 flex flex-col items-center justify-center hover:scale-105 transition-all shadow-sm"
                  >
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-100">₹{denom}</span>
                    <span className="text-[10px] text-amber-700 dark:text-amber-300">({paidCoins[denom] || 0})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Check */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Total Money Given:</span>
                <span className="font-bold text-base text-gray-900 dark:text-white">₹{totalPaid}</span>
              </div>

              {totalPaid > 0 && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    totalPaid === cartTotal
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                      : totalPaid > cartTotal
                      ? 'bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200'
                      : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200'
                  }`}
                >
                  {totalPaid === cartTotal && (
                    <span>🎉 Exact payment! Bill paid in full (₹{cartTotal}).</span>
                  )}
                  {totalPaid > cartTotal && (
                    <span>
                      💵 You gave ₹{totalPaid}. Shopkeeper will return ₹{totalPaid - cartTotal} in change!
                    </span>
                  )}
                  {totalPaid < cartTotal && (
                    <span>Need ₹{cartTotal - totalPaid} more to pay the full bill.</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. PATTERNS */}
      {subActivity === 'patterns' && (
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
              Pattern Challenge {patternIndex + 1} of {patterns.length}
            </span>
          </div>

          <div className="text-center space-y-3">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              What number comes next in the pattern?
            </h3>
            <div className="flex items-center justify-center gap-3 py-6">
              {patterns[patternIndex].seq.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black shadow-md ${
                    item === null
                      ? 'border-2 border-dashed border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-600 animate-pulse'
                      : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  {item === null ? '?' : item}
                </div>
              ))}
            </div>
          </div>

          {/* Multiple choice options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {patterns[patternIndex].options.map((opt, i) => (
              <button
                key={i}
                disabled={selectedPatternAnswer !== null}
                onClick={() => setSelectedPatternAnswer(opt)}
                className={`py-3 rounded-xl border text-base font-bold transition-all ${
                  selectedPatternAnswer === opt
                    ? opt === patterns[patternIndex].correct
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-amber-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {selectedPatternAnswer !== null && (
            <div
              className={`p-4 rounded-xl text-xs font-medium space-y-1 ${
                selectedPatternAnswer === patterns[patternIndex].correct
                  ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200'
              }`}
            >
              <div className="font-bold">
                {selectedPatternAnswer === patterns[patternIndex].correct
                  ? '🎯 Spot on!'
                  : `Oops! The correct answer is ${patterns[patternIndex].correct}.`}
              </div>
              <div>Rule: {patterns[patternIndex].rule}</div>
            </div>
          )}

          <div className="flex justify-end pt-3 border-t border-gray-100 dark:border-gray-700">
            {selectedPatternAnswer !== null && (
              <button
                onClick={() => {
                  setSelectedPatternAnswer(null);
                  setPatternIndex((prev) => (prev + 1) % patterns.length);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all"
              >
                Next Pattern →
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. ILLUSTRATED WORD PROBLEMS */}
      {subActivity === 'word_problems' && (
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              Story Problem {wpIndex + 1} of {wordProblems.length}
            </span>
            <button
              onClick={() => {
                setWpUserAnswer('');
                setWpChecked(false);
                setWpIndex((prev) => (prev + 1) % wordProblems.length);
              }}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <RotateCw className="w-3.5 h-3.5" /> Skip / Next Story
            </button>
          </div>

          {/* Story Card */}
          <div className="p-5 bg-blue-50/50 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-800/50 space-y-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-relaxed">
              {wordProblems[wpIndex].story}
            </p>

            {/* Visual representation of problem */}
            <div className="p-4 bg-white dark:bg-gray-900/40 rounded-xl border border-blue-100 dark:border-gray-700 flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: Math.min(18, wordProblems[wpIndex].op1) }).map((_, i) => (
                <VisualObject key={i} type={wordProblems[wpIndex].asset} size="sm" />
              ))}
            </div>
          </div>

          {/* Answer input */}
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Your answer"
              value={wpUserAnswer}
              onChange={(e) => {
                setWpUserAnswer(e.target.value);
                setWpChecked(false);
              }}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold"
            />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
              {wordProblems[wpIndex].unit}
            </span>
            <button
              onClick={() => setWpChecked(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Check Answer
            </button>
          </div>

          {wpChecked && (
            <div
              className={`p-4 rounded-xl text-xs space-y-1 ${
                Number(wpUserAnswer) === wordProblems[wpIndex].correct
                  ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200'
              }`}
            >
              <div className="font-bold">
                {Number(wpUserAnswer) === wordProblems[wpIndex].correct
                  ? '🌟 Brilliant work!'
                  : `Not quite! The correct answer is ${wordProblems[wpIndex].correct} ${wordProblems[wpIndex].unit}.`}
              </div>
              <p>{wordProblems[wpIndex].explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
