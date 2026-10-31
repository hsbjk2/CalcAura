/**
 * Real-time geometry calculations for 2D and 3D shapes
 */

export interface GeometryResult {
  valid: boolean;
  error?: string;
  shapeName: string;
  properties: { label: string; value: string; unit: string }[];
  formula: string;
  substitution: string;
  steps: string[];
}

export function calcTriangle(a: number, b: number, c: number): GeometryResult {
  if (a <= 0 || b <= 0 || c <= 0) {
    return { valid: false, error: 'All side lengths must be positive numbers', shapeName: 'Triangle', properties: [], formula: '', substitution: '', steps: [] };
  }
  // Triangle inequality
  if (a + b <= c || a + c <= b || b + c <= a) {
    return { valid: false, error: 'Triangle Inequality Violation: The sum of any two sides must be strictly greater than the third side (a + b > c).', shapeName: 'Triangle', properties: [], formula: '', substitution: '', steps: [] };
  }

  const perimeter = a + b + c;
  const s = perimeter / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  // Angles via Law of Cosines
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const cosB = (a * a + c * c - b * b) / (2 * a * c);
  const cosC = (a * a + b * b - c * c) / (2 * a * b);

  const angleA = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
  const angleB = Math.acos(Math.max(-1, Math.min(1, cosB))) * (180 / Math.PI);
  const angleC = Math.acos(Math.max(-1, Math.min(1, cosC))) * (180 / Math.PI);

  const heightA = (2 * area) / a;
  const inradius = area / s;
  const circumradius = (a * b * c) / (4 * area);

  return {
    valid: true,
    shapeName: 'Triangle',
    properties: [
      { label: 'Area', value: area.toFixed(4), unit: 'sq units' },
      { label: 'Perimeter', value: perimeter.toFixed(4), unit: 'units' },
      { label: 'Semi-perimeter (s)', value: s.toFixed(4), unit: 'units' },
      { label: 'Angle A (opposite side a)', value: angleA.toFixed(2), unit: '°' },
      { label: 'Angle B (opposite side b)', value: angleB.toFixed(2), unit: '°' },
      { label: 'Angle C (opposite side c)', value: angleC.toFixed(2), unit: '°' },
      { label: 'Altitude to side a', value: heightA.toFixed(4), unit: 'units' },
      { label: 'Inradius (r)', value: inradius.toFixed(4), unit: 'units' },
      { label: 'Circumradius (R)', value: circumradius.toFixed(4), unit: 'units' },
    ],
    formula: 'Area = \\sqrt{s(s - a)(s - b)(s - c)}, \\quad s = \\frac{a+b+c}{2}',
    substitution: `Area = \\sqrt{${s.toFixed(2)}(${s.toFixed(2)}-${a})(${s.toFixed(2)}-${b})(${s.toFixed(2)}-${c})} = ${area.toFixed(4)}`,
    steps: [
      `1. Compute semi-perimeter: s = (${a} + ${b} + ${c}) / 2 = ${s.toFixed(4)}`,
      `2. Apply Heron's Formula: Area = √[${s.toFixed(2)} × ${(s - a).toFixed(2)} × ${(s - b).toFixed(2)} × ${(s - c).toFixed(2)}]`,
      `3. Computed Area = ${area.toFixed(4)} sq units`,
      `4. Angles via Law of Cosines: ∠A = ${angleA.toFixed(2)}°, ∠B = ${angleB.toFixed(2)}°, ∠C = ${angleC.toFixed(2)}°`,
    ],
  };
}

export function calcCircle(radius: number): GeometryResult {
  if (radius <= 0) {
    return { valid: false, error: 'Radius must be greater than zero', shapeName: 'Circle', properties: [], formula: '', substitution: '', steps: [] };
  }
  const diameter = radius * 2;
  const circumference = 2 * Math.PI * radius;
  const area = Math.PI * radius * radius;

  return {
    valid: true,
    shapeName: 'Circle',
    properties: [
      { label: 'Radius (r)', value: radius.toString(), unit: 'units' },
      { label: 'Diameter (d)', value: diameter.toFixed(4), unit: 'units' },
      { label: 'Circumference (C)', value: circumference.toFixed(4), unit: 'units' },
      { label: 'Area (A)', value: area.toFixed(4), unit: 'sq units' },
    ],
    formula: 'A = \\pi r^2, \\quad C = 2\\pi r, \\quad d = 2r',
    substitution: `A = \\pi \\times ${radius}^2 = ${area.toFixed(4)}, \\quad C = 2 \\times \\pi \\times ${radius} = ${circumference.toFixed(4)}`,
    steps: [
      `1. Diameter: d = 2 × ${radius} = ${diameter.toFixed(4)}`,
      `2. Circumference: C = 2 × π × ${radius} = ${circumference.toFixed(4)}`,
      `3. Area: A = π × ${radius}² = ${area.toFixed(4)} sq units`,
    ],
  };
}

export function calcRectangle(length: number, width: number): GeometryResult {
  if (length <= 0 || width <= 0) {
    return { valid: false, error: 'Length and width must be greater than zero', shapeName: 'Rectangle', properties: [], formula: '', substitution: '', steps: [] };
  }
  const area = length * width;
  const perimeter = 2 * (length + width);
  const diagonal = Math.sqrt(length * length + width * width);

  return {
    valid: true,
    shapeName: 'Rectangle',
    properties: [
      { label: 'Area', value: area.toFixed(4), unit: 'sq units' },
      { label: 'Perimeter', value: perimeter.toFixed(4), unit: 'units' },
      { label: 'Diagonal', value: diagonal.toFixed(4), unit: 'units' },
    ],
    formula: 'A = l \\times w, \\quad P = 2(l + w), \\quad d = \\sqrt{l^2 + w^2}',
    substitution: `A = ${length} \\times ${width} = ${area.toFixed(4)}, \\quad P = 2(${length} + ${width}) = ${perimeter.toFixed(4)}`,
    steps: [
      `1. Area = ${length} × ${width} = ${area.toFixed(4)}`,
      `2. Perimeter = 2 × (${length} + ${width}) = ${perimeter.toFixed(4)}`,
      `3. Diagonal = √(${length}² + ${width}²) = ${diagonal.toFixed(4)}`,
    ],
  };
}

export function calcCylinder(radius: number, height: number): GeometryResult {
  if (radius <= 0 || height <= 0) {
    return { valid: false, error: 'Radius and height must be positive numbers', shapeName: 'Cylinder', properties: [], formula: '', substitution: '', steps: [] };
  }
  const baseArea = Math.PI * radius * radius;
  const lateralArea = 2 * Math.PI * radius * height;
  const totalArea = 2 * baseArea + lateralArea;
  const volume = baseArea * height;

  return {
    valid: true,
    shapeName: 'Cylinder',
    properties: [
      { label: 'Volume (V)', value: volume.toFixed(4), unit: 'cubic units' },
      { label: 'Curved Surface Area', value: lateralArea.toFixed(4), unit: 'sq units' },
      { label: 'Total Surface Area', value: totalArea.toFixed(4), unit: 'sq units' },
      { label: 'Base Area', value: baseArea.toFixed(4), unit: 'sq units' },
    ],
    formula: 'V = \\pi r^2 h, \\quad A_{curved} = 2\\pi rh, \\quad A_{total} = 2\\pi r(r + h)',
    substitution: `V = \\pi \\times ${radius}^2 \\times ${height} = ${volume.toFixed(4)}, \\quad A_{total} = 2\\pi(${radius})(${radius}+${height}) = ${totalArea.toFixed(4)}`,
    steps: [
      `1. Base Area = π × ${radius}² = ${baseArea.toFixed(4)}`,
      `2. Curved Surface Area = 2π × ${radius} × ${height} = ${lateralArea.toFixed(4)}`,
      `3. Total Surface Area = ${totalArea.toFixed(4)}`,
      `4. Volume = π × ${radius}² × ${height} = ${volume.toFixed(4)} cubic units`,
    ],
  };
}

export function calcSphere(radius: number): GeometryResult {
  if (radius <= 0) {
    return { valid: false, error: 'Radius must be a positive number', shapeName: 'Sphere', properties: [], formula: '', substitution: '', steps: [] };
  }
  const surfaceArea = 4 * Math.PI * radius * radius;
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

  return {
    valid: true,
    shapeName: 'Sphere',
    properties: [
      { label: 'Volume (V)', value: volume.toFixed(4), unit: 'cubic units' },
      { label: 'Surface Area (A)', value: surfaceArea.toFixed(4), unit: 'sq units' },
      { label: 'Diameter (d)', value: (2 * radius).toFixed(4), unit: 'units' },
    ],
    formula: 'V = \\frac{4}{3}\\pi r^3, \\quad A = 4\\pi r^2',
    substitution: `V = \\frac{4}{3}\\pi(${radius})^3 = ${volume.toFixed(4)}, \\quad A = 4\\pi(${radius})^2 = ${surfaceArea.toFixed(4)}`,
    steps: [
      `1. Surface Area = 4 × π × ${radius}² = ${surfaceArea.toFixed(4)} sq units`,
      `2. Volume = (4/3) × π × ${radius}³ = ${volume.toFixed(4)} cubic units`,
    ],
  };
}

export function calcCone(radius: number, height: number): GeometryResult {
  if (radius <= 0 || height <= 0) {
    return { valid: false, error: 'Radius and height must be positive', shapeName: 'Cone', properties: [], formula: '', substitution: '', steps: [] };
  }
  const slantHeight = Math.sqrt(radius * radius + height * height);
  const baseArea = Math.PI * radius * radius;
  const lateralArea = Math.PI * radius * slantHeight;
  const totalArea = baseArea + lateralArea;
  const volume = (1 / 3) * Math.PI * radius * radius * height;

  return {
    valid: true,
    shapeName: 'Cone',
    properties: [
      { label: 'Slant Height (l)', value: slantHeight.toFixed(4), unit: 'units' },
      { label: 'Volume (V)', value: volume.toFixed(4), unit: 'cubic units' },
      { label: 'Lateral Area', value: lateralArea.toFixed(4), unit: 'sq units' },
      { label: 'Total Surface Area', value: totalArea.toFixed(4), unit: 'sq units' },
    ],
    formula: 'l = \\sqrt{r^2 + h^2}, \\quad V = \\frac{1}{3}\\pi r^2 h, \\quad A_{total} = \\pi r(r + l)',
    substitution: `l = \\sqrt{${radius}^2 + ${height}^2} = ${slantHeight.toFixed(4)}, \\quad V = \\frac{1}{3}\\pi(${radius}^2)(${height}) = ${volume.toFixed(4)}`,
    steps: [
      `1. Slant height: l = √(${radius}² + ${height}²) = ${slantHeight.toFixed(4)}`,
      `2. Lateral Area = π × ${radius} × ${slantHeight.toFixed(4)} = ${lateralArea.toFixed(4)}`,
      `3. Total Area = π × ${radius} × (${radius} + ${slantHeight.toFixed(4)}) = ${totalArea.toFixed(4)}`,
      `4. Volume = (1/3) × π × ${radius}² × ${height} = ${volume.toFixed(4)} cubic units`,
    ],
  };
}

export function calcRightTriangle(legA: number, legB: number): GeometryResult {
  if (legA <= 0 || legB <= 0) {
    return {
      valid: false,
      error: 'Both leg lengths must be greater than zero',
      shapeName: 'Right Triangle',
      properties: [],
      formula: '',
      substitution: '',
      steps: [],
    };
  }
  const c = Math.sqrt(legA * legA + legB * legB);
  const area = 0.5 * legA * legB;
  const perimeter = legA + legB + c;
  const angleA = Math.atan(legA / legB) * (180 / Math.PI);
  const angleB = 90 - angleA;
  const altitude = (legA * legB) / c;

  return {
    valid: true,
    shapeName: 'Right-Angled Triangle',
    properties: [
      { label: 'Hypotenuse (c)', value: c.toFixed(4), unit: 'units' },
      { label: 'Area', value: area.toFixed(4), unit: 'sq units' },
      { label: 'Perimeter', value: perimeter.toFixed(4), unit: 'units' },
      { label: 'Angle opposite Leg a (∠A)', value: angleA.toFixed(2), unit: '°' },
      { label: 'Angle opposite Leg b (∠B)', value: angleB.toFixed(2), unit: '°' },
      { label: 'Altitude to Hypotenuse', value: altitude.toFixed(4), unit: 'units' },
    ],
    formula: 'c = \\sqrt{a^2 + b^2}, \\quad \\text{Area} = \\frac{1}{2}ab, \\quad \\angle A = \\arctan\\left(\\frac{a}{b}\\right)',
    substitution: `c = \\sqrt{${legA}^2 + ${legB}^2} = ${c.toFixed(4)}, \\quad \\text{Area} = \\frac{1}{2}(${legA})(${legB}) = ${area.toFixed(4)}`,
    steps: [
      `1. Apply Pythagorean Theorem: c² = a² + b² = ${legA}² + ${legB}² = ${(legA*legA + legB*legB).toFixed(2)}`,
      `2. Hypotenuse: c = √${(legA*legA + legB*legB).toFixed(2)} = ${c.toFixed(4)} units`,
      `3. Area = 0.5 × ${legA} × ${legB} = ${area.toFixed(4)} sq units`,
      `4. Acute Angles: ∠A = ${angleA.toFixed(2)}°, ∠B = ${angleB.toFixed(2)}°, ∠C = 90°`,
    ],
  };
}

export function calcCoordinateGeometry(x1: number, y1: number, x2: number, y2: number): GeometryResult {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const isVertical = Math.abs(dx) < 1e-9;
  const slope = isVertical ? 'Undefined (Vertical Line)' : (dy / dx).toFixed(4);
  const angleRad = Math.atan2(dy, dx);
  const angleDeg = ((angleRad * 180) / Math.PI + 360) % 360;

  return {
    valid: true,
    shapeName: 'Coordinate Line Segment',
    properties: [
      { label: 'Distance d(A, B)', value: dist.toFixed(4), unit: 'units' },
      { label: 'Midpoint M(x, y)', value: `(${midX.toFixed(2)}, ${midY.toFixed(2)})`, unit: 'coord' },
      { label: 'Slope (m = Δy/Δx)', value: slope, unit: '' },
      { label: 'Direction Angle (θ)', value: angleDeg.toFixed(2), unit: '°' },
      { label: 'Horizontal Offset (Δx)', value: dx.toFixed(2), unit: 'units' },
      { label: 'Vertical Offset (Δy)', value: dy.toFixed(2), unit: 'units' },
    ],
    formula: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}, \\quad M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right), \\quad m = \\frac{y_2-y_1}{x_2-x_1}',
    substitution: `d = \\sqrt{(${x2} - ${x1})^2 + (${y2} - ${y1})^2} = \\sqrt{${(dx*dx + dy*dy).toFixed(2)}} = ${dist.toFixed(4)}`,
    steps: [
      `1. Δx = ${x2} - (${x1}) = ${dx.toFixed(2)}, Δy = ${y2} - (${y1}) = ${dy.toFixed(2)}`,
      `2. Distance d = √[(${dx.toFixed(2)})² + (${dy.toFixed(2)})²] = ${dist.toFixed(4)} units`,
      `3. Midpoint M = ((${x1}+${x2})/2, (${y1}+${y2})/2) = (${midX.toFixed(2)}, ${midY.toFixed(2)})`,
      `4. Slope m = ${isVertical ? 'undefined (vertical line x = ' + x1 + ')' : (dy/dx).toFixed(4)}`,
    ],
  };
}

export function calcPolygon(sides: number, sideLength: number): GeometryResult {
  const n = Math.round(sides);
  if (n < 3) {
    return {
      valid: false,
      error: 'A polygon must have at least 3 sides',
      shapeName: 'Regular Polygon',
      properties: [],
      formula: '',
      substitution: '',
      steps: [],
    };
  }
  if (sideLength <= 0) {
    return {
      valid: false,
      error: 'Side length must be greater than zero',
      shapeName: 'Regular Polygon',
      properties: [],
      formula: '',
      substitution: '',
      steps: [],
    };
  }

  const perimeter = n * sideLength;
  const interiorAngle = ((n - 2) * 180) / n;
  const centralAngle = 360 / n;
  const apothem = sideLength / (2 * Math.tan(Math.PI / n));
  const area = 0.5 * perimeter * apothem;
  const circumradius = sideLength / (2 * Math.sin(Math.PI / n));

  return {
    valid: true,
    shapeName: `Regular ${n}-gon (${n === 5 ? 'Pentagon' : n === 6 ? 'Hexagon' : n === 8 ? 'Octagon' : 'Polygon'})`,
    properties: [
      { label: 'Area', value: area.toFixed(4), unit: 'sq units' },
      { label: 'Perimeter', value: perimeter.toFixed(4), unit: 'units' },
      { label: 'Apothem (Inradius r)', value: apothem.toFixed(4), unit: 'units' },
      { label: 'Circumradius (R)', value: circumradius.toFixed(4), unit: 'units' },
      { label: 'Interior Angle', value: interiorAngle.toFixed(2), unit: '°' },
      { label: 'Central Angle', value: centralAngle.toFixed(2), unit: '°' },
    ],
    formula: 'A = \\frac{1}{2} n s a, \\quad a = \\frac{s}{2\\tan(\\pi/n)}, \\quad \\theta_{int} = \\frac{(n-2)180^\\circ}{n}',
    substitution: `A = \\frac{1}{2}(${n})(${sideLength})(${apothem.toFixed(4)}) = ${area.toFixed(4)}, \\quad a = ${apothem.toFixed(4)}`,
    steps: [
      `1. Perimeter P = ${n} × ${sideLength} = ${perimeter.toFixed(4)}`,
      `2. Apothem a = ${sideLength} / [2 × tan(180°/${n})] = ${apothem.toFixed(4)} units`,
      `3. Area = (1/2) × Perimeter × Apothem = ${area.toFixed(4)} sq units`,
      `4. Interior Angle = (${n} - 2) × 180° / ${n} = ${interiorAngle.toFixed(2)}°`,
    ],
  };
}

