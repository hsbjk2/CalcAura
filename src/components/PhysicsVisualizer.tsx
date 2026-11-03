import React, { useState, useEffect, useRef, useId } from 'react';
import { calcProjectile, calcPendulum, calcOhmsLaw } from '../math/physics.ts';
import { MathView } from './MathView.tsx';
import { Play, Pause, RotateCcw, Zap, Compass, Activity } from 'lucide-react';
import '../styles/tools.css';

type PhysicsTab = 'projectile' | 'pendulum' | 'circuits';

export const PhysicsVisualizer: React.FC = () => {
  const [tab, setTab] = useState<PhysicsTab>('projectile');

  // Projectile state
  const [v0, setV0] = useState<number>(25);
  const [theta, setTheta] = useState<number>(45);
  const [h0, setH0] = useState<number>(0);
  const [gravityPreset, setGravityPreset] = useState<number>(9.81);
  const [animTime, setAnimTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Pendulum state
  const [pendLength, setPendLength] = useState<number>(1.5);
  const [pendAmp, setPendAmp] = useState<number>(25);
  const [pendTime, setPendTime] = useState<number>(0);

  // Circuits state
  const [voltage, setVoltage] = useState<number>(12);
  const [resistance, setResistance] = useState<number>(8);

  const proj = calcProjectile(v0, theta, h0, gravityPreset);
  const pend = calcPendulum(pendLength, gravityPreset, pendAmp);
  const ohm = calcOhmsLaw({ v: voltage, r: resistance });

  // Unique IDs for accessibility
  const v0Id = useId();
  const thetaId = useId();
  const h0Id = useId();
  const pendLengthId = useId();
  const pendAmpId = useId();
  const voltageId = useId();
  const resistanceId = useId();

  // Animation loop for Projectile Motion
  const reqRef = useRef<number | null>(null);
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAnimTime((prev) => {
        if (prev >= proj.timeOfFlight) return 0;
        return prev + 0.05;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, proj.timeOfFlight]);

  // Animation loop for Pendulum
  useEffect(() => {
    let frameId: number;
    const tick = () => {
      setPendTime((t) => t + 0.03);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Compute current position of projectile at animTime
  const thetaRad = (theta * Math.PI) / 180;
  const currentX = v0 * Math.cos(thetaRad) * animTime;
  const currentY = Math.max(0, h0 + v0 * Math.sin(thetaRad) * animTime - 0.5 * gravityPreset * animTime * animTime);

  // SVG scaling for projectile
  const svgW = 480;
  const svgH = 260;
  const maxX = Math.max(50, proj.range * 1.15);
  const maxY = Math.max(30, proj.maxHeight * 1.25);

  const toProjX = (x: number) => (x / maxX) * (svgW - 60) + 40;
  const toProjY = (y: number) => svgH - 40 - (y / maxY) * (svgH - 70);

  // Path string for projectile trajectory
  const pathD = proj.points.reduce((acc, p, idx) => {
    const px = toProjX(p.x);
    const py = toProjY(p.y);
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${px.toFixed(1)},${py.toFixed(1)}`;
  }, '');

  // Pendulum oscillation angle
  const currentPendAngle = pendAmp * Math.cos(pend.angularFreq * pendTime);
  const pendAngleRad = (currentPendAngle * Math.PI) / 180;
  const bobX = 150 + Math.sin(pendAngleRad) * 110;
  const bobY = 30 + Math.cos(pendAngleRad) * 110;

  return (
    <div className="tool-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="tool-head flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Physics & STEM Simulations
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Interactive kinematic trajectories, simple harmonic motion, and electrical circuit laws with animated visualizations.
          </p>
        </div>

        {/* Tab switch */}
        <div className="tool-tabs flex items-center gap-1.5 p-1">
          {[
            { id: 'projectile', label: 'Projectile Motion', icon: Compass },
            { id: 'pendulum', label: 'Harmonic Pendulum', icon: Activity },
            { id: 'circuits', label: "Ohm's Law & Circuit", icon: Zap },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id as PhysicsTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  tab === item.id
                    ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              {tab === 'projectile'
                ? 'Launch Parameters'
                : tab === 'pendulum'
                ? 'Oscillator Properties'
                : 'Circuit Parameters'}
            </h3>
            {tab === 'projectile' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 hover:bg-sky-100 transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setAnimTime(0)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {tab === 'projectile' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1 font-medium text-slate-700 dark:text-slate-300">
                  <label htmlFor={v0Id}>Initial Velocity (v₀)</label>
                  <span>{v0} m/s</span>
                </div>
                <input
                  id={v0Id}
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={v0}
                  onChange={(e) => setV0(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium text-slate-700 dark:text-slate-300">
                  <label htmlFor={thetaId}>Launch Angle (θ)</label>
                  <span>{theta}°</span>
                </div>
                <input
                  id={thetaId}
                  type="range"
                  min="5"
                  max="85"
                  step="1"
                  value={theta}
                  onChange={(e) => setTheta(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium text-slate-700 dark:text-slate-300">
                  <label htmlFor={h0Id}>Launch Height (h₀)</label>
                  <span>{h0} m</span>
                </div>
                <input
                  id={h0Id}
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={h0}
                  onChange={(e) => setH0(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5">Gravity Environment:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Earth (9.81)', g: 9.81 },
                    { label: 'Moon (1.62)', g: 1.62 },
                    { label: 'Mars (3.72)', g: 3.72 },
                  ].map((env) => (
                    <button
                      key={env.label}
                      onClick={() => setGravityPreset(env.g)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border transition-colors ${
                        gravityPreset === env.g
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {env.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'pendulum' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1 font-medium text-slate-700 dark:text-slate-300">
                  <label htmlFor={pendLengthId}>Rod Length (L)</label>
                  <span>{pendLength} m</span>
                </div>
                <input
                  id={pendLengthId}
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={pendLength}
                  onChange={(e) => setPendLength(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium text-slate-700 dark:text-slate-300">
                  <label htmlFor={pendAmpId}>Initial Amplitude (θ₀)</label>
                  <span>{pendAmp}°</span>
                </div>
                <input
                  id={pendAmpId}
                  type="range"
                  min="5"
                  max="45"
                  step="1"
                  value={pendAmp}
                  onChange={(e) => setPendAmp(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {tab === 'circuits' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1 font-medium text-slate-700 dark:text-slate-300">
                  <label htmlFor={voltageId}>Supply Voltage (V)</label>
                  <span>{voltage} V</span>
                </div>
                <input
                  id={voltageId}
                  type="range"
                  min="1"
                  max="48"
                  step="1"
                  value={voltage}
                  onChange={(e) => setVoltage(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium text-slate-700 dark:text-slate-300">
                  <label htmlFor={resistanceId}>Load Resistance (R)</label>
                  <span>{resistance} Ω</span>
                </div>
                <input
                  id={resistanceId}
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={resistance}
                  onChange={(e) => setResistance(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Visual Canvas & Solution Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Animated Graphical SVG Display */}
          <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
            {tab === 'projectile' && (
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
                  <span>Trajectory Curve</span>
                  <span className="text-sky-600 dark:text-sky-400">t = {animTime.toFixed(2)}s</span>
                </div>

                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-[240px] block">
                  {/* Ground */}
                  <line x1="20" y1={svgH - 40} x2={svgW - 20} y2={svgH - 40} stroke="#475569" strokeWidth="2" />

                  {/* Trajectory dotted path */}
                  <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

                  {/* Apex indicator */}
                  <circle
                    cx={toProjX(v0 * Math.cos(thetaRad) * proj.apexTime)}
                    cy={toProjY(proj.maxHeight)}
                    r="4"
                    fill="#f59e0b"
                  />
                  <text
                    x={toProjX(v0 * Math.cos(thetaRad) * proj.apexTime)}
                    y={toProjY(proj.maxHeight) - 8}
                    fill="#fcd34d"
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Apex: {proj.maxHeight.toFixed(1)}m
                  </text>

                  {/* Animated Projectile Ball */}
                  <circle cx={toProjX(currentX)} cy={toProjY(currentY)} r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>
            )}

            {tab === 'pendulum' && (
              <div className="flex flex-col items-center justify-center py-4">
                <svg viewBox="0 0 300 200" className="w-[280px] h-[190px]">
                  {/* Pivot Ceiling */}
                  <line x1="100" y1="30" x2="200" y2="30" stroke="#475569" strokeWidth="4" />
                  <circle cx="150" cy="30" r="4" fill="#94a3b8" />

                  {/* String */}
                  <line x1="150" y1="30" x2={bobX} y2={bobY} stroke="#38bdf8" strokeWidth="2" />

                  {/* Bob */}
                  <circle cx={bobX} cy={bobY} r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x={bobX} y={bobY + 4} fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    m
                  </text>
                </svg>
              </div>
            )}

            {tab === 'circuits' && (
              <div className="flex flex-col items-center justify-center py-6">
                <svg viewBox="0 0 320 160" className="w-[300px] h-[150px]">
                  <rect x="40" y="30" width="240" height="100" fill="none" stroke="#38bdf8" strokeWidth="2.5" rx="8" />

                  {/* Battery Symbol */}
                  <rect x="25" y="65" width="30" height="30" fill="#090d16" />
                  <line x1="30" y1="72" x2="30" y2="88" stroke="#f59e0b" strokeWidth="3" />
                  <line x1="40" y1="67" x2="40" y2="93" stroke="#f59e0b" strokeWidth="5" />
                  <text x="50" y="84" fill="#fcd34d" fontSize="11" fontFamily="monospace">
                    {voltage}V
                  </text>

                  {/* Resistor Symbol */}
                  <rect x="265" y="65" width="30" height="30" fill="#090d16" />
                  <rect x="268" y="70" width="24" height="20" fill="rgba(14, 165, 233, 0.2)" stroke="#38bdf8" strokeWidth="2" />
                  <text x="210" y="84" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                    {resistance}Ω
                  </text>

                  {/* Current flow indicator */}
                  <polygon points="170,26 160,30 170,34" fill="#10b981" />
                  <text x="160" y="20" fill="#34d399" fontSize="11" textAnchor="middle" fontFamily="monospace">
                    I = {ohm.current.toFixed(2)}A
                  </text>
                </svg>
              </div>
            )}
          </div>

          {/* Solution & Results Cards */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Computed Physical Metrics
            </h4>

            {tab === 'projectile' && (
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Flight Time</span>
                  <span className="text-base font-bold text-sky-600 dark:text-sky-400">
                    {proj.timeOfFlight.toFixed(2)}s
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Max Height</span>
                  <span className="text-base font-bold text-amber-600 dark:text-amber-400">
                    {proj.maxHeight.toFixed(2)}m
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Horizontal Range</span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {proj.range.toFixed(2)}m
                  </span>
                </div>
              </div>
            )}

            {tab === 'pendulum' && (
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Period (T)</span>
                  <span className="text-base font-bold text-sky-600 dark:text-sky-400">
                    {pend.period.toFixed(3)}s
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Frequency (f)</span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {pend.frequency.toFixed(3)} Hz
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Angular Freq (ω)</span>
                  <span className="text-base font-bold text-amber-600 dark:text-amber-400">
                    {pend.angularFreq.toFixed(3)} rad/s
                  </span>
                </div>
              </div>
            )}

            {tab === 'circuits' && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Current (I)</span>
                    <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                      {ohm.current.toFixed(2)} A
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Dissipated Power (P)</span>
                    <span className="text-base font-bold text-amber-600 dark:text-amber-400">
                      {ohm.power.toFixed(2)} W
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Conductance (G)</span>
                    <span className="text-base font-bold text-sky-600 dark:text-sky-400">
                      {(1 / resistance).toFixed(3)} S
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <MathView math={ohm.formula} displayMode={true} className="text-xs text-slate-800 dark:text-slate-200" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
