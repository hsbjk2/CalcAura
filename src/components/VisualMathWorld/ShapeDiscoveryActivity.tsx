import React, { useState } from 'react';
import { Shapes, RotateCw, CheckCircle2, Lightbulb, Trophy, Sparkles, HelpCircle, Eye } from 'lucide-react';

interface Shape2D {
  id: string;
  name: string;
  sides: number;
  vertices: number;
  symmetryLines: number;
  realWorldExamples: string[];
  description: string;
  render: (highlightSymmetry: boolean) => React.ReactNode;
}

interface Shape3D {
  id: string;
  name: string;
  faces: number;
  edges: number;
  vertices: number;
  flatFaces: string;
  curvedFaces: string;
  realWorldExamples: string[];
  description: string;
  render3D: (rotationAngle: number) => React.ReactNode;
}

export const ShapeDiscoveryActivity: React.FC = () => {
  const [tab, setTab] = useState<'2d' | '3d' | 'match_game'>('2d');
  const [selectedShapeId, setSelectedShapeId] = useState<string>('triangle');
  const [showSymmetry, setShowSymmetry] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(25);
  const [score, setScore] = useState<number>(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState<number>(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<string | null>(null);
  const [showQuizHint, setShowQuizHint] = useState<boolean>(false);

  // 2D Shapes definitions
  const shapes2D: Shape2D[] = [
    {
      id: 'circle',
      name: 'Circle',
      sides: 0,
      vertices: 0,
      symmetryLines: 999, // Infinite
      realWorldExamples: ['Coin (₹5)', 'Wall Clock', 'Bicycle Wheel', 'Full Moon'],
      description: 'A round shape where every point on the edge is the exact same distance from the center.',
      render: (sym) => (
        <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-md">
          <circle cx="80" cy="80" r="60" fill="#38bdf8" stroke="#0284c7" strokeWidth="4" />
          {sym && (
            <>
              <line x1="80" y1="10" x2="80" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="10" y1="80" x2="150" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="30" y1="30" x2="130" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="30" y1="130" x2="130" y2="30" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            </>
          )}
          <circle cx="80" cy="80" r="4" fill="#0369a1" />
        </svg>
      )
    },
    {
      id: 'triangle',
      name: 'Triangle',
      sides: 3,
      vertices: 3,
      symmetryLines: 3,
      realWorldExamples: ['Pizza Slice', 'Traffic Sign', 'Sandwich Half', 'Roof Gable'],
      description: 'A three-sided polygon. The sum of all its three angles is always 180 degrees.',
      render: (sym) => (
        <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-md">
          <polygon points="80,20 140,130 20,130" fill="#facc15" stroke="#ca8a04" strokeWidth="4" />
          {sym && (
            <>
              <line x1="80" y1="15" x2="80" y2="135" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="20" y1="130" x2="110" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="140" y1="130" x2="50" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            </>
          )}
        </svg>
      )
    },
    {
      id: 'square',
      name: 'Square',
      sides: 4,
      vertices: 4,
      symmetryLines: 4,
      realWorldExamples: ['Chessboard', 'Bread Slice', 'Carrom Board', 'Window Frame'],
      description: 'A quadrilateral with 4 equal sides and 4 right angles (90 degrees each).',
      render: (sym) => (
        <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-md">
          <rect x="30" y="30" width="100" height="100" rx="4" fill="#4ade80" stroke="#16a34a" strokeWidth="4" />
          {sym && (
            <>
              <line x1="80" y1="20" x2="80" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="20" y1="80" x2="140" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="25" y1="25" x2="135" y2="135" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="25" y1="135" x2="135" y2="25" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            </>
          )}
        </svg>
      )
    },
    {
      id: 'rectangle',
      name: 'Rectangle',
      sides: 4,
      vertices: 4,
      symmetryLines: 2,
      realWorldExamples: ['School Notebook', 'Door', 'Smartphone Screen', 'Currency Note'],
      description: 'A 4-sided polygon with opposite sides equal in length and 4 right angles.',
      render: (sym) => (
        <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-md">
          <rect x="15" y="45" width="130" height="70" rx="4" fill="#fb923c" stroke="#c2410c" strokeWidth="4" />
          {sym && (
            <>
              <line x1="80" y1="35" x2="80" y2="125" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="10" y1="80" x2="150" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            </>
          )}
        </svg>
      )
    },
    {
      id: 'pentagon',
      name: 'Pentagon',
      sides: 5,
      vertices: 5,
      symmetryLines: 5,
      realWorldExamples: ['Home Outline Sign', 'School Crossing Sign', 'Soccer Ball Patches'],
      description: 'A polygon with 5 straight sides and 5 angles.',
      render: (sym) => (
        <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-md">
          <polygon points="80,20 142,65 118,135 42,135 18,65" fill="#c084fc" stroke="#7e22ce" strokeWidth="4" />
          {sym && (
            <line x1="80" y1="10" x2="80" y2="145" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
          )}
        </svg>
      )
    },
    {
      id: 'hexagon',
      name: 'Hexagon',
      sides: 6,
      vertices: 6,
      symmetryLines: 6,
      realWorldExamples: ['Bee Honeycomb', 'Nut Bolt Head', 'Snowflake Pattern'],
      description: 'A 6-sided polygon. Nature uses hexagons to tile space perfectly without gaps.',
      render: (sym) => (
        <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-md">
          <polygon points="80,18 135,50 135,110 80,142 25,110 25,50" fill="#f43f5e" stroke="#be123c" strokeWidth="4" />
          {sym && (
            <>
              <line x1="80" y1="10" x2="80" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="20" y1="80" x2="140" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            </>
          )}
        </svg>
      )
    }
  ];

  // 3D Solids definitions
  const shapes3D: Shape3D[] = [
    {
      id: 'cube',
      name: 'Cube',
      faces: 6,
      edges: 12,
      vertices: 8,
      flatFaces: '6 identical square faces',
      curvedFaces: '0',
      realWorldExamples: ['Playing Die', 'Rubik’s Cube', 'Sugar Cube', 'Gift Box'],
      description: 'A 3D solid bounded by six identical square faces meeting at right angles.',
      render3D: (rot) => (
        <svg viewBox="0 0 180 180" className="w-44 h-44 drop-shadow-xl" style={{ transform: `rotate(${rot * 0.2}deg)` }}>
          {/* Top Face */}
          <polygon points="90,30 145,55 90,80 35,55" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="3" />
          {/* Left Face */}
          <polygon points="35,55 90,80 90,145 35,120" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
          {/* Right Face */}
          <polygon points="145,55 90,80 90,145 145,120" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3" />
          {/* Internal dashed edges */}
          <line x1="35" y1="55" x2="90" y2="30" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      id: 'cuboid',
      name: 'Cuboid / Rectangular Prism',
      faces: 6,
      edges: 12,
      vertices: 8,
      flatFaces: '6 rectangular faces',
      curvedFaces: '0',
      realWorldExamples: ['Shoebox', 'Brick', 'Pencil Box', 'Book'],
      description: 'A 3D box shape with rectangular faces of varying lengths, widths, and heights.',
      render3D: (rot) => (
        <svg viewBox="0 0 200 180" className="w-48 h-44 drop-shadow-xl" style={{ transform: `rotate(${rot * 0.15}deg)` }}>
          <polygon points="100,25 175,45 100,75 25,55" fill="#34d399" stroke="#047857" strokeWidth="3" />
          <polygon points="25,55 100,75 100,150 25,130" fill="#10b981" stroke="#047857" strokeWidth="3" />
          <polygon points="175,45 100,75 100,150 175,120" fill="#059669" stroke="#047857" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: 'sphere',
      name: 'Sphere',
      faces: 1,
      edges: 0,
      vertices: 0,
      flatFaces: '0',
      curvedFaces: '1 continuous smooth surface',
      realWorldExamples: ['Cricket Ball', 'Globe', 'Orange', 'Marble'],
      description: 'A perfectly round 3D solid where every surface point is equidistant from the center.',
      render3D: () => (
        <svg viewBox="0 0 180 180" className="w-44 h-44 drop-shadow-xl">
          <defs>
            <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#831843" />
            </radialGradient>
          </defs>
          <circle cx="90" cy="90" r="65" fill="url(#sphereGrad)" stroke="#9d174d" strokeWidth="2" />
          <ellipse cx="90" cy="90" rx="65" ry="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeDasharray="4 4" />
        </svg>
      )
    },
    {
      id: 'cylinder',
      name: 'Cylinder',
      faces: 3,
      edges: 2,
      vertices: 0,
      flatFaces: '2 circular flat faces (top and bottom)',
      curvedFaces: '1 curved side surface',
      realWorldExamples: ['Food Can', 'Water Bottle', 'Candle', 'Pencil Battery'],
      description: 'A solid with two congruent parallel circular bases connected by a curved surface.',
      render3D: () => (
        <svg viewBox="0 0 180 180" className="w-44 h-44 drop-shadow-xl">
          {/* Cylinder Body */}
          <path d="M 45,50 L 45,130 A 45,16 0 0,0 135,130 L 135,50 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
          {/* Bottom Ellipse */}
          <ellipse cx="90" cy="130" rx="45" ry="16" fill="#f59e0b" stroke="#d97706" strokeWidth="3" />
          {/* Top Ellipse */}
          <ellipse cx="90" cy="50" rx="45" ry="16" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: 'cone',
      name: 'Cone',
      faces: 2,
      edges: 1,
      vertices: 1,
      flatFaces: '1 flat circular base',
      curvedFaces: '1 curved surface tapering to an apex',
      realWorldExamples: ['Ice Cream Cone', 'Party Hat', 'Traffic Cone', 'Funnel'],
      description: 'A 3D solid that tapers smoothly from a flat circular base to a sharp tip called the apex.',
      render3D: () => (
        <svg viewBox="0 0 180 180" className="w-44 h-44 drop-shadow-xl">
          <polygon points="90,25 45,135 135,135" fill="#a78bfa" stroke="#7c3aed" strokeWidth="3" />
          <ellipse cx="90" cy="135" rx="45" ry="16" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3" />
          <circle cx="90" cy="25" r="4" fill="#5b21b6" />
        </svg>
      )
    }
  ];

  // Quiz game questions
  const quizQuestions = [
    {
      question: 'Which 3D shape has 6 flat square faces and 8 vertices?',
      options: ['Cube', 'Sphere', 'Cylinder', 'Cone'],
      correct: 'Cube',
      hint: 'Think of a playing die or a Rubik’s cube!',
      realObj: '🎲 Playing Die'
    },
    {
      question: 'How many sides and vertices does a triangle have?',
      options: ['3 sides, 3 vertices', '4 sides, 4 vertices', '5 sides, 5 vertices', '0 sides, 0 vertices'],
      correct: '3 sides, 3 vertices',
      hint: 'Tri- means three, like a tricycle!',
      realObj: '🍕 Pizza Slice'
    },
    {
      question: 'What shape is a standard soccer ball patch?',
      options: ['Hexagon / Pentagon', 'Circle', 'Triangle', 'Oval'],
      correct: 'Hexagon / Pentagon',
      hint: 'It has 5 or 6 straight sides stitched together.',
      realObj: '⚽ Soccer Ball'
    },
    {
      question: 'Which shape has NO straight edges and NO sharp corners?',
      options: ['Sphere', 'Cuboid', 'Pyramid', 'Cube'],
      correct: 'Sphere',
      hint: 'It rolls smoothly in any direction like a cricket ball.',
      realObj: '🏀 Basketball'
    },
    {
      question: 'A birthday party hat is an example of which 3D shape?',
      options: ['Cone', 'Cylinder', 'Cube', 'Sphere'],
      correct: 'Cone',
      hint: 'It has a circular base at the bottom and a pointy apex on top.',
      realObj: '🎉 Party Hat'
    }
  ];

  const current2D = shapes2D.find((s) => s.id === selectedShapeId) || shapes2D[1];
  const current3D = shapes3D.find((s) => s.id === selectedShapeId) || shapes3D[0];
  const currentQuiz = quizQuestions[quizQuestionIndex];

  const handleQuizAnswer = (option: string) => {
    setQuizSelectedAnswer(option);
    if (option === currentQuiz.correct) {
      setScore((prev) => prev + 10);
    }
  };

  const handleNextQuiz = () => {
    setQuizSelectedAnswer(null);
    setShowQuizHint(false);
    setQuizQuestionIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  return (
    <div className="space-y-6">
      {/* Activity Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-cyan-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <Shapes className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Activity G — Shape Discovery Lab
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 font-semibold">
                  Classes 1–5
                </span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Explore 2D polygons, 3D solids, symmetry lines, and connect shapes to real-world objects.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTab('2d');
                setSelectedShapeId('triangle');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === '2d'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              2D Shapes
            </button>
            <button
              onClick={() => {
                setTab('3d');
                setSelectedShapeId('cube');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === '3d'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              3D Solids
            </button>
            <button
              onClick={() => setTab('match_game')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === 'match_game'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              Shape Detective Quiz 🏆
            </button>
          </div>
        </div>
      </div>

      {/* 2D Shapes Mode */}
      {tab === '2d' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Selector column */}
          <div className="lg:col-span-4 bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              Choose a 2D Shape
            </h3>
            {shapes2D.map((shape) => (
              <button
                key={shape.id}
                onClick={() => setSelectedShapeId(shape.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                  selectedShapeId === shape.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-sm'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm">{shape.name}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {shape.sides > 0 ? `${shape.sides} sides` : '0 sides (round)'}
                </span>
              </button>
            ))}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={showSymmetry}
                  onChange={(e) => setShowSymmetry(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                Show Symmetry Lines (Fold lines)
              </label>
            </div>
          </div>

          {/* Interactive display */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-6">
            <div className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/40 w-full flex flex-col items-center justify-center min-h-[220px]">
              {current2D.render(showSymmetry)}
              {showSymmetry && (
                <p className="text-xs text-red-500 font-medium mt-3 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  Red dashed lines show axes of symmetry ({current2D.symmetryLines === 999 ? 'Infinite' : current2D.symmetryLines} lines)
                </p>
              )}
            </div>

            <div className="w-full text-left space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{current2D.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{current2D.description}</p>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Sides / Edges</div>
                  <div className="text-xl font-black text-emerald-700 dark:text-emerald-300">{current2D.sides}</div>
                </div>
                <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Vertices (Corners)</div>
                  <div className="text-xl font-black text-sky-700 dark:text-sky-300">{current2D.vertices}</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Lines of Symmetry</div>
                  <div className="text-xl font-black text-purple-700 dark:text-purple-300">
                    {current2D.symmetryLines === 999 ? '∞' : current2D.symmetryLines}
                  </div>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4">
                <div className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider mb-2">
                  Real-World Objects shaped like a {current2D.name}:
                </div>
                <div className="flex flex-wrap gap-2">
                  {current2D.realWorldExamples.map((ex, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 rounded-lg text-xs font-medium text-amber-800 dark:text-amber-300"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Solids Mode */}
      {tab === '3d' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              Choose a 3D Solid
            </h3>
            {shapes3D.map((solid) => (
              <button
                key={solid.id}
                onClick={() => setSelectedShapeId(solid.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                  selectedShapeId === solid.id
                    ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-400 text-blue-900 dark:text-blue-200 shadow-sm'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200'
                }`}
              >
                <div className="font-semibold text-sm">{solid.name}</div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{solid.faces} faces</span>
              </button>
            ))}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 font-medium">
                <span>View Angle</span>
                <span>{rotationAngle}°</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          <div className="lg:col-span-8 bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-6">
            <div className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/40 w-full flex flex-col items-center justify-center min-h-[220px]">
              {current3D.render3D(rotationAngle)}
            </div>

            <div className="w-full text-left space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{current3D.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{current3D.description}</p>
              </div>

              {/* Euler / Solid Formula Stats: Faces, Edges, Vertices */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Faces (F)</div>
                  <div className="text-xl font-black text-indigo-700 dark:text-indigo-300">{current3D.faces}</div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Edges (E)</div>
                  <div className="text-xl font-black text-rose-700 dark:text-rose-300">{current3D.edges}</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Vertices (V)</div>
                  <div className="text-xl font-black text-amber-700 dark:text-amber-300">{current3D.vertices}</div>
                </div>
              </div>

              {/* Euler relation check for polyhedra */}
              {current3D.edges > 0 && current3D.vertices > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2.5 rounded-lg text-center font-mono">
                  Euler’s Formula for Polyhedra: Faces ({current3D.faces}) + Vertices ({current3D.vertices}) − Edges ({current3D.edges}) = {current3D.faces + current3D.vertices - current3D.edges}
                </div>
              )}

              {/* Real World Examples */}
              <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/50 rounded-xl p-4">
                <div className="text-xs font-bold text-teal-900 dark:text-teal-200 uppercase tracking-wider mb-2">
                  Everyday Objects shaped like a {current3D.name}:
                </div>
                <div className="flex flex-wrap gap-2">
                  {current3D.realWorldExamples.map((ex, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white dark:bg-gray-800 border border-teal-300 dark:border-teal-700 rounded-lg text-xs font-medium text-teal-800 dark:text-teal-300"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shape Detective Quiz Mode */}
      {tab === 'match_game' && (
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300">
              Question {quizQuestionIndex + 1} of {quizQuestions.length}
            </span>
            <span className="text-xs font-bold flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Trophy className="w-4 h-4" /> Score: {score} pts
            </span>
          </div>

          <div className="text-center p-6 bg-purple-50/50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-800/40 space-y-3">
            <div className="text-4xl">{currentQuiz.realObj.split(' ')[0]}</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {currentQuiz.question}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Hint object: {currentQuiz.realObj}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuiz.options.map((opt, i) => {
              const isSelected = quizSelectedAnswer === opt;
              const isCorrect = opt === currentQuiz.correct;
              let btnClass = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-purple-400';

              if (quizSelectedAnswer) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={i}
                  disabled={quizSelectedAnswer !== null}
                  onClick={() => handleQuizAnswer(opt)}
                  className={`p-4 rounded-xl border text-sm font-semibold transition-all text-center flex items-center justify-center gap-2 ${btnClass}`}
                >
                  {opt}
                  {quizSelectedAnswer && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {quizSelectedAnswer && (
            <div className={`p-4 rounded-xl text-sm font-medium ${
              quizSelectedAnswer === currentQuiz.correct
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200'
            }`}>
              {quizSelectedAnswer === currentQuiz.correct ? (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>Brilliant! That is correct. +10 points!</span>
                </div>
              ) : (
                <div>
                  Not quite! The correct answer is <strong>{currentQuiz.correct}</strong>.
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setShowQuizHint(!showQuizHint)}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showQuizHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>

            {quizSelectedAnswer && (
              <button
                onClick={handleNextQuiz}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md"
              >
                Next Shape Challenge →
              </button>
            )}
          </div>

          {showQuizHint && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 rounded-lg">
              💡 {currentQuiz.hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
