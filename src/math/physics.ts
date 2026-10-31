/**
 * Physics kinematics, harmonic motion, and electrical formulas
 */

export interface ProjectileResult {
  v0: number;
  thetaDeg: number;
  h0: number;
  g: number;
  timeOfFlight: number;
  maxHeight: number;
  range: number;
  apexTime: number;
  points: { t: number; x: number; y: number }[];
}

export function calcProjectile(v0: number, thetaDeg: number, h0: number = 0, g: number = 9.80665): ProjectileResult {
  const thetaRad = (thetaDeg * Math.PI) / 180;
  const vx0 = v0 * Math.cos(thetaRad);
  const vy0 = v0 * Math.sin(thetaRad);

  const apexTime = vy0 / g;
  const maxHeight = h0 + (vy0 * vy0) / (2 * g);

  // Quadratic equation for y(t) = h0 + vy0*t - 0.5*g*t^2 = 0
  const timeOfFlight = (vy0 + Math.sqrt(vy0 * vy0 + 2 * g * h0)) / g;
  const range = vx0 * timeOfFlight;

  // Generate 80 trajectory points
  const points: { t: number; x: number; y: number }[] = [];
  const numSteps = 80;
  for (let i = 0; i <= numSteps; i++) {
    const t = (i / numSteps) * timeOfFlight;
    const x = vx0 * t;
    const y = Math.max(0, h0 + vy0 * t - 0.5 * g * t * t);
    points.push({ t, x, y });
  }

  return {
    v0,
    thetaDeg,
    h0,
    g,
    timeOfFlight,
    maxHeight,
    range,
    apexTime,
    points,
  };
}

export interface PendulumResult {
  length: number; // meters
  gravity: number; // m/s^2
  amplitudeDeg: number;
  period: number; // seconds
  frequency: number; // Hz
  angularFreq: number; // rad/s
}

export function calcPendulum(length: number, gravity: number = 9.80665, amplitudeDeg: number = 15): PendulumResult {
  if (length <= 0) length = 1;
  const omega = Math.sqrt(gravity / length);
  const period = (2 * Math.PI) / omega;
  const frequency = 1 / period;

  return {
    length,
    gravity,
    amplitudeDeg,
    period,
    frequency,
    angularFreq: omega,
  };
}

export interface OhmsLawResult {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
  formula: string;
}

export function calcOhmsLaw(params: { v?: number; i?: number; r?: number }): OhmsLawResult {
  let { v, i, r } = params;

  if (v !== undefined && r !== undefined && r > 0) {
    i = v / r;
  } else if (v !== undefined && i !== undefined && i > 0) {
    r = v / i;
  } else if (i !== undefined && r !== undefined) {
    v = i * r;
  } else {
    v = 12;
    r = 10;
    i = 1.2;
  }

  const power = v * i;

  return {
    voltage: v,
    current: i,
    resistance: r,
    power,
    formula: `V = I \\times R \\implies ${v.toFixed(2)}\\text{V} = ${i.toFixed(2)}\\text{A} \\times ${r.toFixed(2)}\\Omega`,
  };
}
