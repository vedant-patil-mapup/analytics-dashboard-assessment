// Types for Electric Vehicle Population Data
export interface EVRecord {
  vin: string;
  county: string;
  city: string;
  state: string;
  postalCode: string;
  modelYear: number;
  make: string;
  model: string;
  electricVehicleType: 'Battery Electric Vehicle (BEV)' | 'Plug-in Hybrid Electric Vehicle (PHEV)';
  cafvEligibility: string;
  electricRange: number;
  baseMsrp: number;
  legislativeDistrict: number;
  dolVehicleId: string;
  vehicleLocation: string;
  electricUtility: string;
  censusTract: string;
}

// Aggregated data types for dashboard
export interface CountyData {
  county: string;
  count: number;
  percentage: number;
}

export interface YearlyData {
  year: number;
  count: number;
  bevCount: number;
  phevCount: number;
}

export interface MakeData {
  make: string;
  count: number;
  percentage: number;
  avgRange: number;
}

export interface ModelData {
  make: string;
  model: string;
  count: number;
  avgRange: number;
  avgYear: number;
}

export interface RangeDistribution {
  rangeGroup: string;
  count: number;
  percentage: number;
}

export interface DashboardStats {
  totalVehicles: number;
  avgElectricRange: number;
  bevPercentage: number;
  phevPercentage: number;
  topCounty: string;
  topMake: string;
  latestYear: number;
  earliestYear: number;
}

export interface UtilityData {
  utility: string;
  count: number;
  percentage: number;
}
