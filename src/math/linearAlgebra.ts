/**
 * Linear algebra, matrix arithmetic, determinants, inverses, eigenvalues and vectors
 */

export type Matrix2x2 = [[number, number], [number, number]];
export type Matrix3x3 = [[number, number, number], [number, number, number], [number, number, number]];
export type MatrixNxN = number[][];

export function det2x2(m: Matrix2x2): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

export function det3x3(m: Matrix3x3): number {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

/**
 * Computes determinant for arbitrary N x N square matrix (supports 2x2, 3x3, 4x4, 5x5)
 * using Gaussian elimination with partial pivoting.
 */
export function detNxN(m: number[][]): number {
  const n = m.length;
  if (n === 0) return 0;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  if (n === 3) {
    return (
      m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
      m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
      m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    );
  }

  // Clone matrix for Gaussian elimination
  const a: number[][] = m.map((row) => [...row]);
  let det = 1;
  const eps = 1e-12;

  for (let i = 0; i < n; i++) {
    // Pivot search
    let pivot = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(a[j][i]) > Math.abs(a[pivot][i])) {
        pivot = j;
      }
    }

    if (Math.abs(a[pivot][i]) < eps) {
      return 0; // Singular matrix
    }

    if (pivot !== i) {
      const temp = a[i];
      a[i] = a[pivot];
      a[pivot] = temp;
      det = -det; // Row swap flips sign of determinant
    }

    det *= a[i][i];

    for (let j = i + 1; j < n; j++) {
      const factor = a[j][i] / a[i][i];
      for (let k = i + 1; k < n; k++) {
        a[j][k] -= factor * a[i][k];
      }
    }
  }

  return Math.abs(det) < eps ? 0 : Math.round(det * 1e8) / 1e8;
}

export function inv2x2(m: Matrix2x2): Matrix2x2 | null {
  const d = det2x2(m);
  if (Math.abs(d) < 1e-12) return null; // Singular matrix
  return [
    [m[1][1] / d, -m[0][1] / d],
    [-m[1][0] / d, m[0][0] / d],
  ];
}

/**
 * Computes inverse for N x N matrix (up to 5x5) using Gauss-Jordan elimination.
 * Returns null if matrix is singular (det = 0).
 */
export function invNxN(m: number[][]): number[][] | null {
  const n = m.length;
  if (n === 0) return null;

  // Augmented matrix [A | I]
  const aug: number[][] = m.map((row, i) => {
    const identityRow = new Array(n).fill(0);
    identityRow[i] = 1;
    return [...row, ...identityRow];
  });

  const eps = 1e-12;

  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) {
        maxRow = k;
      }
    }

    if (Math.abs(aug[maxRow][i]) < eps) {
      return null; // Singular matrix
    }

    // Swap maxRow with current row
    if (maxRow !== i) {
      const temp = aug[i];
      aug[i] = aug[maxRow];
      aug[maxRow] = temp;
    }

    // Scale current row so pivot becomes 1
    const pivotVal = aug[i][i];
    for (let j = 0; j < 2 * n; j++) {
      aug[i][j] /= pivotVal;
    }

    // Eliminate other rows
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = aug[k][i];
        for (let j = 0; j < 2 * n; j++) {
          aug[k][j] -= factor * aug[i][j];
        }
      }
    }
  }

  // Extract right half of augmented matrix
  return aug.map((row) =>
    row.slice(n).map((v) => (Math.abs(v) < 1e-10 ? 0 : Math.round(v * 1e6) / 1e6))
  );
}

export function multiply2x2(a: Matrix2x2, b: Matrix2x2): Matrix2x2 {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
  ];
}

/**
 * Multiplies two N x N square matrices of matching size
 */
export function multiplyNxN(a: number[][], b: number[][]): number[][] {
  const n = a.length;
  const result: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = Math.round(sum * 1e6) / 1e6;
    }
  }
  return result;
}

/**
 * Computes matrix trace: sum of diagonal entries
 */
export function traceNxN(m: number[][]): number {
  let sum = 0;
  for (let i = 0; i < m.length; i++) {
    sum += m[i][i] || 0;
  }
  return Math.round(sum * 1e6) / 1e6;
}

/**
 * Computes matrix transpose A^T
 */
export function transposeNxN(m: number[][]): number[][] {
  const n = m.length;
  const res: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res[i][j] = m[j][i];
    }
  }
  return res;
}

/**
 * Computes matrix rank via row-echelon reduction
 */
export function rankNxN(m: number[][]): number {
  const n = m.length;
  const a = m.map((row) => [...row]);
  let rank = 0;
  const eps = 1e-10;

  for (let col = 0; col < n && rank < n; col++) {
    let pivotRow = -1;
    for (let row = rank; row < n; row++) {
      if (Math.abs(a[row][col]) > eps) {
        pivotRow = row;
        break;
      }
    }

    if (pivotRow !== -1) {
      // Swap rows
      const temp = a[rank];
      a[rank] = a[pivotRow];
      a[pivotRow] = temp;

      // Eliminate beneath
      for (let row = rank + 1; row < n; row++) {
        const factor = a[row][col] / a[rank][col];
        for (let k = col; k < n; k++) {
          a[row][k] -= factor * a[rank][k];
        }
      }
      rank++;
    }
  }
  return rank;
}

/**
 * Solves system of linear equations A * X = B for N unknowns (up to 5x5)
 */
export function solveLinearSystemNxN(
  A: number[][],
  B: number[]
): {
  status: 'unique' | 'singular';
  solution?: number[];
  error?: string;
  steps: string[];
} {
  const n = A.length;
  const aug: number[][] = A.map((row, i) => [...row, B[i] || 0]);
  const eps = 1e-12;
  const steps: string[] = [];

  steps.push(`1. Form augmented system [A | B] of size ${n}×${n + 1}.`);

  for (let i = 0; i < n; i++) {
    let pivot = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(aug[k][i]) > Math.abs(aug[pivot][i])) {
        pivot = k;
      }
    }

    if (Math.abs(aug[pivot][i]) < eps) {
      return {
        status: 'singular',
        error: 'Coefficient matrix is singular (det A = 0). System has no unique solution.',
        steps,
      };
    }

    if (pivot !== i) {
      const temp = aug[i];
      aug[i] = aug[pivot];
      aug[pivot] = temp;
      steps.push(`• Swap Row ${i + 1} with Row ${pivot + 1} for numerical stability.`);
    }

    const pivotVal = aug[i][i];
    for (let j = i; j <= n; j++) {
      aug[i][j] /= pivotVal;
    }

    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = aug[k][i];
        for (let j = i; j <= n; j++) {
          aug[k][j] -= factor * aug[i][j];
        }
      }
    }
  }

  const solution = aug.map((row) => Math.round(row[n] * 1e6) / 1e6);
  steps.push(`2. Gauss-Jordan elimination completed.`);
  steps.push(`3. Extracted unique solution vector X = [${solution.join(', ')}].`);

  return {
    status: 'unique',
    solution,
    steps,
  };
}

export function eigenvalues2x2(m: Matrix2x2): { real: number; imag?: number }[] {
  const trace = m[0][0] + m[1][1];
  const d = det2x2(m);
  const disc = trace * trace - 4 * d;

  if (disc >= 0) {
    const l1 = (trace + Math.sqrt(disc)) / 2;
    const l2 = (trace - Math.sqrt(disc)) / 2;
    return [{ real: l1 }, { real: l2 }];
  } else {
    const realPart = trace / 2;
    const imagPart = Math.sqrt(-disc) / 2;
    return [
      { real: realPart, imag: imagPart },
      { real: realPart, imag: -imagPart },
    ];
  }
}

export function vectorDot(u: [number, number, number], v: [number, number, number]): number {
  return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
}

export function vectorCross(u: [number, number, number], v: [number, number, number]): [number, number, number] {
  return [
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0],
  ];
}

export function vectorMagnitude(v: [number, number, number]): number {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}
