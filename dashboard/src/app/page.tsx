import React from 'react';
import path from 'path';
import { promises as fs } from 'fs';
import Papa from 'papaparse';
import { EVRecord } from '../types/ev-data';
import { DashboardStats } from '../components/DashboardStats';
import { AdoptionTrendChart, EVTypeDistributionChart, TopManufacturersChart } from '../components/Charts';
import { DataTable } from '../components/DataTable';
import { Search, Bell, Settings, ChevronDown, Calendar, BarChart3 } from 'lucide-react';

async function getEVData(): Promise<EVRecord[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'Electric_Vehicle_Population_Data.csv');
  const fileContent = await fs.readFile(filePath, 'utf8');

  const result = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
  });

  const formattedData: EVRecord[] = result.data.map((row: any) => ({
    vin: row["VIN (1-10)"],
    county: row.County,
    city: row.City,
    state: row.State,
    postalCode: row["Postal Code"],
    modelYear: parseInt(row["Model Year"], 10) || 0,
    make: row.Make,
    model: row.Model,
    evType: row["Electric Vehicle Type"],
    cafvEligibility: row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"],
    electricRange: parseInt(row["Electric Range"], 10) || 0,
    baseMsrp: parseInt(row["Base MSRP"], 10) || 0,
    legislativeDistrict: row["Legislative District"],
    dolVehicleId: row["DOL Vehicle ID"],
    vehicleLocation: row["Vehicle Location"],
    electricUtility: row["Electric Utility"],
    censusTract: row["2020 Census Tract"]
  })).filter((r: unknown) => (r as EVRecord).vin);

  return formattedData;
}

export default async function Home() {
  const data = await getEVData();

  // Calculate real insights for the "Insights" card
  const countyCounts: Record<string, number> = {};
  const modelCounts: Record<string, number> = {};

  data.forEach(r => {
    countyCounts[r.county] = (countyCounts[r.county] || 0) + 1;
    modelCounts[r.model] = (modelCounts[r.model] || 0) + 1;
  });

  const topCounty = Object.entries(countyCounts).sort((a, b) => b[1] - a[1])[0];
  const topModel = Object.entries(modelCounts).sort((a, b) => b[1] - a[1])[0];
  const topCountyPercent = topCounty ? ((topCounty[1] / data.length) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 pb-12 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Minimal Functional Header */}
      <nav className="sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-md px-6 py-4 border-b border-slate-100 mb-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <BarChart3 className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">EV Analytics</h1>
              <p className="text-xs text-slate-500 font-medium">Washington State Data</p>
            </div>
          </div>

          {/* Optional: Add a simple data source indicator instead of fake nav */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm text-xs font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Data
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-6 py-2 animate-fade-in-up">

        {/* Simple Title */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Executive Overview</h2>
          <p className="text-slate-500 mt-1 text-base">Key performance metrics and distribution analysis.</p>
        </div>

        {/* Stats Row */}
        <DashboardStats data={data} />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Left Column (2/3) */}
          <div className="xl:col-span-2 space-y-6">
            <AdoptionTrendChart data={data} />

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/60">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Vehicle Registry</h3>
                {/* Functional limitation: Download button needs client-side JS implementation usually, removing if strictly non-functional */}
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <DataTable data={data.slice(0, 50)} />
              </div>
            </div>
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            <EVTypeDistributionChart data={data} />
            <TopManufacturersChart data={data} />

            {/* Insight Card with Real Data */}
            <div className="relative overflow-hidden rounded-[2rem] p-8 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="relative z-10 text-white">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-4 border border-white/20">
                  TOP REGION
                </div>
                <h3 className="text-4xl font-bold mb-2">{topCounty ? topCounty[0] : 'N/A'}</h3>
                <p className="text-lg font-medium text-white/90 mb-6 leading-tight">
                  Accounting for {topCountyPercent}% of all registered Electric Vehicles.
                </p>
                <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ width: `${Math.min(Number(topCountyPercent), 100)}%` }}
                  ></div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/80">
                  <span>Most Popular Model:</span>
                  <span className="font-bold text-white">{topModel ? topModel[0] : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
