/**
 * Unit conversions and land plot measurement calculations
 */

export interface UnitCategory {
  name: string;
  units: { id: string; label: string; toBase: (v: number) => number; fromBase: (b: number) => number }[];
}

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    name: 'Length',
    units: [
      { id: 'm', label: 'Meters (m)', toBase: (v) => v, fromBase: (b) => b },
      { id: 'km', label: 'Kilometers (km)', toBase: (v) => v * 1000, fromBase: (b) => b / 1000 },
      { id: 'cm', label: 'Centimeters (cm)', toBase: (v) => v / 100, fromBase: (b) => b * 100 },
      { id: 'mm', label: 'Millimeters (mm)', toBase: (v) => v / 1000, fromBase: (b) => b * 1000 },
      { id: 'mi', label: 'Miles (mi)', toBase: (v) => v * 1609.344, fromBase: (b) => b / 1609.344 },
      { id: 'ft', label: 'Feet (ft)', toBase: (v) => v * 0.3048, fromBase: (b) => b / 0.3048 },
      { id: 'in', label: 'Inches (in)', toBase: (v) => v * 0.0254, fromBase: (b) => b / 0.0254 },
      { id: 'yd', label: 'Yards (yd)', toBase: (v) => v * 0.9144, fromBase: (b) => b / 0.9144 },
    ],
  },
  {
    name: 'Area & Land Plot',
    units: [
      { id: 'sq_m', label: 'Square Meters (m²)', toBase: (v) => v, fromBase: (b) => b },
      { id: 'sq_ft', label: 'Square Feet (sq ft)', toBase: (v) => v * 0.092903, fromBase: (b) => b / 0.092903 },
      { id: 'sq_yd', label: 'Square Yards (gaj)', toBase: (v) => v * 0.836127, fromBase: (b) => b / 0.836127 },
      { id: 'acre', label: 'Acres (ac)', toBase: (v) => v * 4046.8564, fromBase: (b) => b / 4046.8564 },
      { id: 'hectare', label: 'Hectares (ha)', toBase: (v) => v * 10000, fromBase: (b) => b / 10000 },
      { id: 'guntha', label: 'Guntha (India)', toBase: (v) => v * 101.17, fromBase: (b) => b / 101.17 },
      { id: 'bigha', label: 'Bigha (Standard)', toBase: (v) => v * 2529.285, fromBase: (b) => b / 2529.285 },
      { id: 'sq_km', label: 'Square Kilometers (km²)', toBase: (v) => v * 1000000, fromBase: (b) => b / 1000000 },
    ],
  },
  {
    name: 'Mass & Weight',
    units: [
      { id: 'kg', label: 'Kilograms (kg)', toBase: (v) => v, fromBase: (b) => b },
      { id: 'g', label: 'Grams (g)', toBase: (v) => v / 1000, fromBase: (b) => b * 1000 },
      { id: 'mg', label: 'Milligrams (mg)', toBase: (v) => v / 1e6, fromBase: (b) => b * 1e6 },
      { id: 'lb', label: 'Pounds (lbs)', toBase: (v) => v * 0.45359237, fromBase: (b) => b / 0.45359237 },
      { id: 'oz', label: 'Ounces (oz)', toBase: (v) => v * 0.02834952, fromBase: (b) => b / 0.02834952 },
      { id: 'tonne', label: 'Metric Tonne (t)', toBase: (v) => v * 1000, fromBase: (b) => b / 1000 },
    ],
  },
  {
    name: 'Temperature',
    units: [
      { id: 'c', label: 'Celsius (°C)', toBase: (v) => v, fromBase: (b) => b },
      { id: 'f', label: 'Fahrenheit (°F)', toBase: (v) => ((v - 32) * 5) / 9, fromBase: (b) => (b * 9) / 5 + 32 },
      { id: 'k', label: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (b) => b + 273.15 },
    ],
  },
  {
    name: 'Speed',
    units: [
      { id: 'mps', label: 'Meters per sec (m/s)', toBase: (v) => v, fromBase: (b) => b },
      { id: 'kmh', label: 'Kilometers per hour (km/h)', toBase: (v) => v / 3.6, fromBase: (b) => b * 3.6 },
      { id: 'mph', label: 'Miles per hour (mph)', toBase: (v) => v * 0.44704, fromBase: (b) => b / 0.44704 },
      { id: 'knot', label: 'Knots (kn)', toBase: (v) => v * 0.514444, fromBase: (b) => b / 0.514444 },
    ],
  },
];

export function convertUnits(value: number, fromUnitId: string, toUnitId: string, categoryName: string): number {
  const cat = UNIT_CATEGORIES.find((c) => c.name === categoryName);
  if (!cat) return value;
  const uFrom = cat.units.find((u) => u.id === fromUnitId);
  const uTo = cat.units.find((u) => u.id === toUnitId);
  if (!uFrom || !uTo) return value;

  const baseVal = uFrom.toBase(value);
  return uTo.fromBase(baseVal);
}
