export interface VehicleData {
  '2020 Census Tract': string;
  'Base MSRP': string;
  'City': string;
  'Clean Alternative Fuel Vehicle (CAFV) Eligibility': string;
  'County': string;
  'DOL Vehicle ID': string;
  'Electric Range': string;
  'Electric Utility': string;
  'Electric Vehicle Type': string;
  'Legislative District': string;
  'Make': string;
  'Model': string;
  'Model Year': string;
  'Postal Code': string;
  'State': string;
  'VIN (1-10)': string;
  'Vehicle Location': string;
}

export interface ChartData {
  makeChartData: Array<{ make: string; count: number }>;
  cityChartData: Array<{ city: string; count: number }>;
  yearChartData: Array<{ year: string; count: number }>;
  rangeData: Array<{ range: number; make: string }>;
  typeChartData: Array<{ type: string; count: number }>;
}

export interface SummaryStats {
  totalVehicles: number;
  uniqueMakes: number;
  uniqueCities: number;
  avgRange: number;
}

export interface MakeChartData {
  make: string;
  count: number;
}

export interface CityChartData {
  city: string;
  count: number;
}

export interface YearChartData {
  year: string;
  count: number;
}

export interface TypeChartData {
  type: string;
  count: number;
}

export interface RangeData {
  range: number;
  make: string;
}
