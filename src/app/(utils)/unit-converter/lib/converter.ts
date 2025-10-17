// Unit conversion configuration
export type ConversionCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'energy';

export interface UnitConfig {
  name: string;
  symbol: string;
  toBase: number; // conversion factor to base unit
}

export interface CategoryConfig {
  label: string;
  units: Record<string, UnitConfig>;
  baseUnit: string;
}

export const converterConfig: Record<ConversionCategory, CategoryConfig> = {
  length: {
    label: 'Length',
    baseUnit: 'meter',
    units: {
      millimeter: { name: 'Millimeter', symbol: 'mm', toBase: 0.001 },
      centimeter: { name: 'Centimeter', symbol: 'cm', toBase: 0.01 },
      meter: { name: 'Meter', symbol: 'm', toBase: 1 },
      kilometer: { name: 'Kilometer', symbol: 'km', toBase: 1000 },
      inch: { name: 'Inch', symbol: 'in', toBase: 0.0254 },
      foot: { name: 'Foot', symbol: 'ft', toBase: 0.3048 },
      yard: { name: 'Yard', symbol: 'yd', toBase: 0.9144 },
      mile: { name: 'Mile', symbol: 'mi', toBase: 1609.34 },
      nautical_mile: { name: 'Nautical Mile', symbol: 'nmi', toBase: 1852 },
    },
  },
  weight: {
    label: 'Weight',
    baseUnit: 'kilogram',
    units: {
      milligram: { name: 'Milligram', symbol: 'mg', toBase: 0.000001 },
      gram: { name: 'Gram', symbol: 'g', toBase: 0.001 },
      kilogram: { name: 'Kilogram', symbol: 'kg', toBase: 1 },
      metric_ton: { name: 'Metric Ton', symbol: 't', toBase: 1000 },
      ounce: { name: 'Ounce', symbol: 'oz', toBase: 0.0283495 },
      pound: { name: 'Pound', symbol: 'lb', toBase: 0.453592 },
      stone: { name: 'Stone', symbol: 'st', toBase: 6.35029 },
      ton: { name: 'Ton (US)', symbol: 'ton', toBase: 907.185 },
    },
  },
  temperature: {
    label: 'Temperature',
    baseUnit: 'celsius',
    units: {
      celsius: { name: 'Celsius', symbol: '°C', toBase: 1 },
      fahrenheit: { name: 'Fahrenheit', symbol: '°F', toBase: 1 },
      kelvin: { name: 'Kelvin', symbol: 'K', toBase: 1 },
    },
  },
  volume: {
    label: 'Volume',
    baseUnit: 'liter',
    units: {
      milliliter: { name: 'Milliliter', symbol: 'mL', toBase: 0.001 },
      liter: { name: 'Liter', symbol: 'L', toBase: 1 },
      gallon_us: { name: 'Gallon (US)', symbol: 'gal', toBase: 3.78541 },
      gallon_uk: { name: 'Gallon (UK)', symbol: 'gal (UK)', toBase: 4.54609 },
      fluid_ounce_us: { name: 'Fluid Ounce (US)', symbol: 'fl oz', toBase: 0.0295735 },
      fluid_ounce_uk: { name: 'Fluid Ounce (UK)', symbol: 'fl oz (UK)', toBase: 0.0284131 },
      pint_us: { name: 'Pint (US)', symbol: 'pt', toBase: 0.473176 },
      pint_uk: { name: 'Pint (UK)', symbol: 'pt (UK)', toBase: 0.568261 },
      cubic_meter: { name: 'Cubic Meter', symbol: 'm³', toBase: 1000 },
      cubic_centimeter: { name: 'Cubic Centimeter', symbol: 'cm³', toBase: 0.001 },
    },
  },
  area: {
    label: 'Area',
    baseUnit: 'square_meter',
    units: {
      square_millimeter: { name: 'Square Millimeter', symbol: 'mm²', toBase: 0.000001 },
      square_centimeter: { name: 'Square Centimeter', symbol: 'cm²', toBase: 0.0001 },
      square_meter: { name: 'Square Meter', symbol: 'm²', toBase: 1 },
      hectare: { name: 'Hectare', symbol: 'ha', toBase: 10000 },
      square_kilometer: { name: 'Square Kilometer', symbol: 'km²', toBase: 1000000 },
      square_inch: { name: 'Square Inch', symbol: 'in²', toBase: 0.00064516 },
      square_foot: { name: 'Square Foot', symbol: 'ft²', toBase: 0.092903 },
      square_yard: { name: 'Square Yard', symbol: 'yd²', toBase: 0.836127 },
      square_mile: { name: 'Square Mile', symbol: 'mi²', toBase: 2589988 },
      acre: { name: 'Acre', symbol: 'ac', toBase: 4046.86 },
    },
  },
  speed: {
    label: 'Speed',
    baseUnit: 'meter_per_second',
    units: {
      meter_per_second: { name: 'Meter per Second', symbol: 'm/s', toBase: 1 },
      kilometer_per_hour: { name: 'Kilometer per Hour', symbol: 'km/h', toBase: 0.277778 },
      mile_per_hour: { name: 'Mile per Hour', symbol: 'mph', toBase: 0.44704 },
      foot_per_second: { name: 'Foot per Second', symbol: 'ft/s', toBase: 0.3048 },
      knot: { name: 'Knot', symbol: 'kn', toBase: 0.51444 },
    },
  },
  energy: {
    label: 'Energy',
    baseUnit: 'joule',
    units: {
      joule: { name: 'Joule', symbol: 'J', toBase: 1 },
      kilojoule: { name: 'Kilojoule', symbol: 'kJ', toBase: 1000 },
      megajoule: { name: 'Megajoule', symbol: 'MJ', toBase: 1000000 },
      calorie: { name: 'Calorie', symbol: 'cal', toBase: 4.184 },
      kilocalorie: { name: 'Kilocalorie', symbol: 'kcal', toBase: 4184 },
      watt_hour: { name: 'Watt-hour', symbol: 'Wh', toBase: 3600 },
      kilowatt_hour: { name: 'Kilowatt-hour', symbol: 'kWh', toBase: 3600000 },
      electron_volt: { name: 'Electron Volt', symbol: 'eV', toBase: 1.602e-19 },
      btu: { name: 'BTU', symbol: 'BTU', toBase: 1055.06 },
    },
  },
};

// Temperature conversion is special - not linear
const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
  let celsius: number;

  // Convert to Celsius
  if (fromUnit === 'celsius') {
    celsius = value;
  } else if (fromUnit === 'fahrenheit') {
    celsius = (value - 32) * (5 / 9);
  } else if (fromUnit === 'kelvin') {
    celsius = value - 273.15;
  } else {
    return value;
  }

  // Convert from Celsius
  if (toUnit === 'celsius') {
    return celsius;
  } else if (toUnit === 'fahrenheit') {
    return celsius * (9 / 5) + 32;
  } else if (toUnit === 'kelvin') {
    return celsius + 273.15;
  }

  return celsius;
};

export const convert = (value: number, category: ConversionCategory, fromUnit: string, toUnit: string): number => {
  if (value === 0) return 0;
  if (fromUnit === toUnit) return value;

  // Special handling for temperature
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const config = converterConfig[category];
  const fromConfig = config.units[fromUnit];
  const toConfig = config.units[toUnit];

  if (!fromConfig || !toConfig) return value;

  // Convert to base unit, then to target unit
  const baseValue = value * fromConfig.toBase;
  const result = baseValue / toConfig.toBase;

  return parseFloat(result.toFixed(10)); // Remove floating point errors
};

export const getCategories = (): ConversionCategory[] => {
  return Object.keys(converterConfig) as ConversionCategory[];
};

export const getUnits = (category: ConversionCategory): string[] => {
  return Object.keys(converterConfig[category].units);
};

export const getUnitLabel = (category: ConversionCategory, unit: string): string => {
  return converterConfig[category].units[unit]?.name || unit;
};

export const getUnitSymbol = (category: ConversionCategory, unit: string): string => {
  return converterConfig[category].units[unit]?.symbol || unit;
};
