/**
 * CALCAURA BASIC CALCULATOR MATHEMATICAL ENGINE
 * Safe, robust tokenization and evaluation without JavaScript eval() or new Function().
 * Supports standard smartphone arithmetic, percentages, operator precedence,
 * parentheses, negative numbers, repeated equals, and division-by-zero handling.
 */

export type Operator = '+' | '-' | '*' | '/';

export interface EvaluationResult {
  success: boolean;
  value?: number;
  error?: string;
  formatted?: string;
}

/**
 * Strip floating-point rounding quirks (e.g., 0.1 + 0.2 = 0.30000000000000004 -> 0.3)
 */
export function stripPrecision(num: number, precision: number = 12): number {
  if (!isFinite(num) || isNaN(num)) return num;
  return parseFloat(num.toPrecision(precision));
}

/**
 * Format a number for smartphone-style display with grouping separators and decimal control.
 */
export function formatCalculatorNumber(
  num: number,
  maxDecimals: number = 8,
  useGrouping: boolean = true
): string {
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return num > 0 ? 'Infinity' : '-Infinity';
  if (Math.abs(num) === 0) return '0';

  // For very large or microscopic numbers, use compact scientific notation
  if (Math.abs(num) >= 1e14 || (Math.abs(num) < 1e-7 && Math.abs(num) > 0)) {
    return num.toExponential(6);
  }

  const cleaned = stripPrecision(num, 12);
  const parts = cleaned.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  let formattedInt = integerPart;
  if (useGrouping) {
    const isNeg = integerPart.startsWith('-');
    const rawInt = isNeg ? integerPart.slice(1) : integerPart;
    const grouped = rawInt.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    formattedInt = isNeg ? `-${grouped}` : grouped;
  }

  if (parts.length > 1) {
    const limitedDec = decimalPart.slice(0, maxDecimals);
    return limitedDec.length > 0 ? `${formattedInt}.${limitedDec}` : formattedInt;
  }

  return formattedInt;
}

/**
 * Token types for expression parsing
 */
type TokenType = 'NUMBER' | 'OP' | 'LPAREN' | 'RPAREN';

interface Token {
  type: TokenType;
  value: string;
  numberVal?: number;
}

/**
 * Tokenize a mathematical string (e.g., "12.5 + (-3) * 4")
 */
export function tokenizeExpression(expr: string): Token[] {
  const tokens: Token[] = [];
  // Normalize symbols: '×' -> '*', '÷' -> '/', '−' -> '-'
  const normalized = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/\s+/g, '');

  let i = 0;
  while (i < normalized.length) {
    const ch = normalized[i];

    // Numbers & Decimals
    if (/[0-9.]/.test(ch)) {
      let numStr = ch;
      i++;
      while (i < normalized.length && /[0-9.]/.test(normalized[i])) {
        // Only allow one decimal point per number token
        if (normalized[i] === '.' && numStr.includes('.')) break;
        numStr += normalized[i];
        i++;
      }
      tokens.push({
        type: 'NUMBER',
        value: numStr,
        numberVal: parseFloat(numStr),
      });
      continue;
    }

    // Left Parenthesis
    if (ch === '(') {
      // Check for implicit multiplication like 2(3) or (2)(3)
      if (tokens.length > 0) {
        const last = tokens[tokens.length - 1];
        if (last.type === 'NUMBER' || last.type === 'RPAREN') {
          tokens.push({ type: 'OP', value: '*' });
        }
      }
      tokens.push({ type: 'LPAREN', value: '(' });
      i++;
      continue;
    }

    // Right Parenthesis
    if (ch === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      i++;
      continue;
    }

    // Operators (+, -, *, /)
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
      // Unary minus detection: minus at start of string or right after an operator or '('
      const isUnary =
        ch === '-' &&
        (tokens.length === 0 ||
          tokens[tokens.length - 1].type === 'OP' ||
          tokens[tokens.length - 1].type === 'LPAREN');

      if (isUnary) {
        // Read next number as negative
        i++;
        if (i < normalized.length && /[0-9.]/.test(normalized[i])) {
          let numStr = '-' + normalized[i];
          i++;
          while (i < normalized.length && /[0-9.]/.test(normalized[i])) {
            if (normalized[i] === '.' && numStr.includes('.')) break;
            numStr += normalized[i];
            i++;
          }
          tokens.push({
            type: 'NUMBER',
            value: numStr,
            numberVal: parseFloat(numStr),
          });
          continue;
        } else if (i < normalized.length && normalized[i] === '(') {
          // Negative parenthesized expression: -1 * (...)
          tokens.push({ type: 'NUMBER', value: '-1', numberVal: -1 });
          tokens.push({ type: 'OP', value: '*' });
          continue;
        }
      }

      tokens.push({ type: 'OP', value: ch });
      i++;
      continue;
    }

    // Unknown character, skip
    i++;
  }

  return tokens;
}

/**
 * Standard Shunting-Yard parser + Reverse Polish Notation evaluator
 * Respects strict operator precedence: * and / before + and -, and parentheses.
 */
export function evaluateTokens(tokens: Token[]): EvaluationResult {
  if (tokens.length === 0) {
    return { success: true, value: 0 };
  }

  const precedence: Record<string, number> = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  const outputQueue: Token[] = [];
  const opStack: Token[] = [];

  for (const token of tokens) {
    if (token.type === 'NUMBER') {
      outputQueue.push(token);
    } else if (token.type === 'OP') {
      while (
        opStack.length > 0 &&
        opStack[opStack.length - 1].type === 'OP' &&
        precedence[opStack[opStack.length - 1].value] >= precedence[token.value]
      ) {
        outputQueue.push(opStack.pop()!);
      }
      opStack.push(token);
    } else if (token.type === 'LPAREN') {
      opStack.push(token);
    } else if (token.type === 'RPAREN') {
      while (opStack.length > 0 && opStack[opStack.length - 1].type !== 'LPAREN') {
        outputQueue.push(opStack.pop()!);
      }
      if (opStack.length > 0 && opStack[opStack.length - 1].type === 'LPAREN') {
        opStack.pop(); // discard '('
      } else {
        return { success: false, error: 'Mismatched parentheses' };
      }
    }
  }

  while (opStack.length > 0) {
    const top = opStack.pop()!;
    if (top.type === 'LPAREN' || top.type === 'RPAREN') {
      return { success: false, error: 'Mismatched parentheses' };
    }
    outputQueue.push(top);
  }

  // Evaluate RPN
  const evalStack: number[] = [];

  for (const token of outputQueue) {
    if (token.type === 'NUMBER') {
      evalStack.push(token.numberVal ?? parseFloat(token.value));
    } else if (token.type === 'OP') {
      if (evalStack.length < 2) {
        return { success: false, error: 'Invalid expression' };
      }
      const b = evalStack.pop()!;
      const a = evalStack.pop()!;

      let res = 0;
      switch (token.value) {
        case '+':
          res = a + b;
          break;
        case '-':
          res = a - b;
          break;
        case '*':
          res = a * b;
          break;
        case '/':
          if (Math.abs(b) < 1e-15) {
            return { success: false, error: 'Cannot divide by zero' };
          }
          res = a / b;
          break;
        default:
          return { success: false, error: `Unknown operator: ${token.value}` };
      }

      evalStack.push(stripPrecision(res, 12));
    }
  }

  if (evalStack.length !== 1) {
    return { success: false, error: 'Incomplete expression' };
  }

  const finalValue = stripPrecision(evalStack[0], 12);
  return {
    success: true,
    value: finalValue,
  };
}

/**
 * Evaluate an arithmetic expression string with full operator precedence & safety.
 */
export function evaluateBasicExpression(expr: string): EvaluationResult {
  if (!expr || !expr.trim()) {
    return { success: true, value: 0 };
  }

  // Pre-clean trailing operators for smooth evaluation (e.g., "5 + " -> "5")
  let clean = expr.trim();
  while (/[+\-*/×÷−]$/.test(clean)) {
    clean = clean.slice(0, -1).trim();
  }

  if (!clean) {
    return { success: true, value: 0 };
  }

  // Auto-close open parentheses if user didn't close them
  let openCount = 0;
  for (const ch of clean) {
    if (ch === '(') openCount++;
    if (ch === ')') openCount--;
  }
  while (openCount > 0) {
    clean += ')';
    openCount--;
  }

  try {
    const tokens = tokenizeExpression(clean);
    return evaluateTokens(tokens);
  } catch (err: any) {
    return { success: false, error: err?.message || 'Calculation error' };
  }
}

/**
 * Handle mobile-style percentage calculation.
 * Standard Smartphone Behavior:
 * 1. "200 + 10%" -> 10% of 200 = 20 -> 200 + 20 = 220
 * 2. "200 - 10%" -> 10% of 200 = 20 -> 200 - 20 = 180
 * 3. "200 * 10%" -> 200 * 0.10 = 20
 * 4. "200 / 10%" -> 200 / 0.10 = 2000
 * 5. Standalone "50%" -> 0.5
 */
export function calculatePercentage(
  baseValue: number | null,
  currentValue: number,
  operator: Operator | null
): number {
  if (baseValue === null || operator === null) {
    return stripPrecision(currentValue / 100, 12);
  }

  if (operator === '+' || operator === '-') {
    // Percentage relative to the base value
    return stripPrecision(Math.abs(baseValue) * (currentValue / 100), 12);
  }

  // For multiplication or division, it acts as a direct fraction (e.g. 10% = 0.10)
  return stripPrecision(currentValue / 100, 12);
}
