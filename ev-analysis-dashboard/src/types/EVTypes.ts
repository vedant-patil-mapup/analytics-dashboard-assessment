export interface EVRecord {
  "VIN (1-10)": string;
  County: string;
  City: string;
  State: string;
  "Postal Code": string;
  "Model Year": string;
  Make: string;
  Model: string;
  "Electric Vehicle Type": string;
  "Clean Alternative Fuel Vehicle (CAFV) Eligibility": string;
}

export interface FilterState {
  search: string;
  state: string;
  county: string;
  city: string;
  make: string;
  model: string;
  year: string;
  evType: string;
  cafvEligibility: string;
}

export interface ChartData {
  topCities: { name: string; value: number }[];
  stateData: { name: string; value: number }[];
  makeData: { name: string; value: number }[];
  yearData: { year: string; count: number }[];
  evTypeData: { name: string; value: number }[];
  cafvData: { name: string; value: number }[];
}
