/**
 * Statistics and probability distribution calculations
 */

export interface StatSummary {
  count: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];
  min: number;
  max: number;
  range: number;
  variancePop: number;
  varianceSample: number;
  stdDevPop: number;
  stdDevSample: number;
  q1: number;
  q3: number;
  iqr: number;
}

export function computeStatistics(numbers: number[]): StatSummary | null {
  if (!numbers || numbers.length === 0) return null;

  const valid = numbers.filter((n) => typeof n === 'number' && !isNaN(n)).sort((a, b) => a - b);
  if (valid.length === 0) return null;

  const count = valid.length;
  const sum = valid.reduce((acc, curr) => acc + curr, 0);
  const mean = sum / count;

  // Median
  const mid = Math.floor(count / 2);
  const median = count % 2 !== 0 ? valid[mid] : (valid[mid - 1] + valid[mid]) / 2;

  // Mode
  const freqs: Record<number, number> = {};
  let maxFreq = 0;
  for (const n of valid) {
    freqs[n] = (freqs[n] || 0) + 1;
    if (freqs[n] > maxFreq) maxFreq = freqs[n];
  }
  const mode = maxFreq > 1 ? Object.keys(freqs).filter((k) => freqs[Number(k)] === maxFreq).map(Number) : [];

  const min = valid[0];
  const max = valid[count - 1];
  const range = max - min;

  // Variances
  const sqDiffs = valid.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0);
  const variancePop = sqDiffs / count;
  const varianceSample = count > 1 ? sqDiffs / (count - 1) : 0;
  const stdDevPop = Math.sqrt(variancePop);
  const stdDevSample = Math.sqrt(varianceSample);

  // Quartiles
  const getPercentile = (p: number) => {
    const idx = (count - 1) * p;
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    return valid[lower] * (1 - weight) + valid[upper] * weight;
  };

  const q1 = getPercentile(0.25);
  const q3 = getPercentile(0.75);
  const iqr = q3 - q1;

  return {
    count,
    sum,
    mean,
    median,
    mode,
    min,
    max,
    range,
    variancePop,
    varianceSample,
    stdDevPop,
    stdDevSample,
    q1,
    q3,
    iqr,
  };
}

export function normalPdf(x: number, mean: number = 0, stdDev: number = 1): number {
  if (stdDev <= 0) return 0;
  const exponent = -Math.pow(x - mean, 2) / (2 * stdDev * stdDev);
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
}
