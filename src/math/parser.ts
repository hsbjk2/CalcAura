/**
 * Safe and robust mathematical expression evaluator and numerical functions.
 */

export function evaluateExpression(expr: string, xVal?: number): number {
  if (!expr || expr.trim() === '') return NaN;
  let clean = expr.trim().toLowerCase();

  // Replace common math constants
  clean = clean.replace(/\bpi\b/g, `(${Math.PI})`);
  clean = clean.replace(/\be\b/g, `(${Math.E})`);

  if (xVal !== undefined) {
    // Replace variable x with value (handle implied multiplication like 2x, 3x^2)
    clean = clean.replace(/(\d)\s*x/g, '$1*(x)');
    clean = clean.replace(/x/g, `(${xVal})`);
  }

  // Replace power operator ^ with **
  clean = clean.replace(/\^/g, '**');

  // Replace math function aliases
  clean = clean.replace(/\bsin\b/g, 'Math.sin');
  clean = clean.replace(/\bcos\b/g, 'Math.cos');
  clean = clean.replace(/\btan\b/g, 'Math.tan');
  clean = clean.replace(/\basin\b/g, 'Math.asin');
  clean = clean.replace(/\bacos\b/g, 'Math.acos');
  clean = clean.replace(/\batan\b/g, 'Math.atan');
  clean = clean.replace(/\bsqrt\b/g, 'Math.sqrt');
  clean = clean.replace(/\bcbrt\b/g, 'Math.cbrt');
  clean = clean.replace(/\babs\b/g, 'Math.abs');
  clean = clean.replace(/\bln\b/g, 'Math.log');
  clean = clean.replace(/\blog10\b/g, 'Math.log10');
  clean = clean.replace(/\blog\b/g, 'Math.log10');
  clean = clean.replace(/\bexp\b/g, 'Math.exp');

  // Validate allowed characters: numbers, Math functions, operators, parentheses
  const allowed = /^[0-9+\-*/()., Mathsincoetaqrbexp**\s]+$/;
  if (!allowed.test(clean)) {
    return NaN;
  }

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${clean});`);
    const res = fn();
    return typeof res === 'number' && !isNaN(res) && isFinite(res) ? res : NaN;
  } catch {
    return NaN;
  }
}

/**
 * Format a number cleanly (up to 4-6 decimal places, omitting trailing zeros)
 */
export function formatNum(n: number, precision: number = 4): string {
  if (isNaN(n)) return 'Undefined';
  if (!isFinite(n)) return n > 0 ? '∞' : '-∞';
  if (Math.abs(n) < 1e-12) return '0';
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 1e-4 && Math.abs(n) > 0)) {
    return n.toExponential(precision);
  }
  const factor = Math.pow(10, precision);
  const rounded = Math.round(n * factor) / factor;
  return rounded.toString();
}
