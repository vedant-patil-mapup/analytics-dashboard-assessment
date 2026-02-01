export interface EVData {
    'VIN (1-10)': string;
    County: string;
    City: string;
    State: string;
    'Postal Code': number;
    'Model Year': number;
    Make: string;
    Model: string;
    'Electric Vehicle Type': string;
    'Clean Alternative Fuel Vehicle (CAFV) Eligibility': string;
    'Electric Range': number;
    'Base MSRP': number;
    'Legislative District': number;
    'DOL Vehicle ID': number;
    'Vehicle Location': string;
    'Electric Utility': string;
    '2020 Census Tract': number;
}

export interface DashboardStats {
    totalEVs: number;
    avgRange: number;
    yearData: { year: number; count: number }[];
    makeData: { make: string; count: number }[];
    typeData: { name: string; value: number }[];
    cafvData: { name: string; value: number }[];
    rawData: EVData[];
}
