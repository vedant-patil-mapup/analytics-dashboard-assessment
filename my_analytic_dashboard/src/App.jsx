import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// EV dataset (same small sample)
const evData = [
  { vin: "5YJYGDEE1L", county: "King", city: "Seattle", state: "WA", postalCode: "98122", modelYear: 2020, make: "TESLA", model: "MODEL Y", evType: "Battery Electric Vehicle (BEV)", cafvEligibility: "Clean Alternative Fuel Vehicle Eligible", electricRange: 291, baseMSRP: 0 },
  { vin: "7SAYGDEE9P", county: "Snohomish", city: "Bothell", state: "WA", postalCode: "98021", modelYear: 2023, make: "TESLA", model: "MODEL Y", evType: "Battery Electric Vehicle (BEV)", cafvEligibility: "Eligibility unknown", electricRange: 0, baseMSRP: 0 },
  { vin: "5YJSA1E4XK", county: "King", city: "Seattle", state: "WA", postalCode: "98109", modelYear: 2019, make: "TESLA", model: "MODEL S", evType: "Battery Electric Vehicle (BEV)", cafvEligibility: "Clean Alternative Fuel Vehicle Eligible", electricRange: 270, baseMSRP: 0 },
  { vin: "5YJSA1E27G", county: "King", city: "Issaquah", state: "WA", postalCode: "98027", modelYear: 2016, make: "TESLA", model: "MODEL S", evType: "Battery Electric Vehicle (BEV)", cafvEligibility: "Clean Alternative Fuel Vehicle Eligible", electricRange: 210, baseMSRP: 0 },
  { vin: "5YJYGDEE5M", county: "Kitsap", city: "Suquamish", state: "WA", postalCode: "98392", modelYear: 2021, make: "TESLA", model: "MODEL Y", evType: "Battery Electric Vehicle (BEV)", cafvEligibility: "Eligibility unknown", electricRange: 0, baseMSRP: 0 },
  { vin: "3FA6P0SU8H", county: "Thurston", city: "Yelm", state: "WA", postalCode: "98597", modelYear: 2017, make: "FORD", model: "FUSION", evType: "Plug-in Hybrid Electric Vehicle (PHEV)", cafvEligibility: "Not eligible", electricRange: 21, baseMSRP: 0 },
  { vin: "1N4AZ0CP2D", county: "Yakima", city: "Yakima", state: "WA", postalCode: "98903", modelYear: 2013, make: "NISSAN", model: "LEAF", evType: "Battery Electric Vehicle (BEV)", cafvEligibility: "Clean Alternative Fuel Vehicle Eligible", electricRange: 75, baseMSRP: 0 },
  { vin: "KNAGV4LD9J", county: "Snohomish", city: "Bothell", state: "WA", postalCode: "98012", modelYear: 2018, make: "KIA", model: "OPTIMA", evType: "Plug-in Hybrid Electric Vehicle (PHEV)", cafvEligibility: "Not eligible", electricRange: 29, baseMSRP: 0 },
  { vin: "1N4AZ0CP8F", county: "Kitsap", city: "Port Orchard", state: "WA", postalCode: "98366", modelYear: 2015, make: "NISSAN", model: "LEAF", evType: "Battery Electric Vehicle (BEV)", cafvEligibility: "Clean Alternative Fuel Vehicle Eligible", electricRange: 84, baseMSRP: 0 },
  { vin: "5UXTA6C03N", county: "King", city: "Auburn", state: "WA", postalCode: "98001", modelYear: 2022, make: "BMW", model: "X5", evType: "Plug-in Hybrid Electric Vehicle (PHEV)", cafvEligibility: "Clean Alternative Fuel Vehicle Eligible", electricRange: 30, baseMSRP: 0 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

// Helper: download CSV
function downloadCSV(filename, rows) {
  // handle empty
  if (!rows || rows.length === 0) {
    const blob = new Blob([""], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  const header = Object.keys(rows[0] || {}).join(",");
  const csv = [header]
    .concat(rows.map((r) => Object.values(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")))
    .join("");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function App() {
  // Filters
  const [selectedCounty, setSelectedCounty] = useState("All");
  const [selectedYears, setSelectedYears] = useState(["All"]);
  const [selectedMakes, setSelectedMakes] = useState([]); // multi select via checkboxes

  // Comparison specific (choose up to 2)
  const [compareMakes, setCompareMakes] = useState([]);

  // derive lists
  const uniqueCounties = ["All", ...Array.from(new Set(evData.map((v) => v.county))).sort()];
  const uniqueMakes = Array.from(new Set(evData.map((v) => v.make))).sort();
  const uniqueYears = ["All", ...Array.from(new Set(evData.map((v) => v.modelYear))).sort((a, b) => a - b)];

  // Processed data memo
  const processedData = useMemo(() => {
    const filtered = evData.filter((vehicle) => {
      const countyOK = selectedCounty === "All" || vehicle.county === selectedCounty;
      const yearOK = selectedYears.includes("All") || selectedYears.includes(String(vehicle.modelYear));
      const makeOK = selectedMakes.length === 0 || selectedMakes.includes(vehicle.make);
      return countyOK && yearOK && makeOK;
    });

    // Aggregations
    const makeCountMap = {};
    const typeCountMap = {};
    const countyCountMap = {};
    const rangeByMake = {};
    const yearCountMap = {};

    filtered.forEach((v) => {
      makeCountMap[v.make] = (makeCountMap[v.make] || 0) + 1;
      typeCountMap[v.evType] = (typeCountMap[v.evType] || 0) + 1;
      countyCountMap[v.county] = (countyCountMap[v.county] || 0) + 1;
      if (!rangeByMake[v.make]) rangeByMake[v.make] = { total: 0, count: 0 };
      rangeByMake[v.make].total += v.electricRange;
      rangeByMake[v.make].count += 1;
      yearCountMap[v.modelYear] = (yearCountMap[v.modelYear] || 0) + 1;
    });

    const makeCount = Object.entries(makeCountMap).map(([make, count]) => ({ make, count }));
    const typeCount = Object.entries(typeCountMap).map(([type, count]) => ({ type, count }));
    const countyCount = Object.entries(countyCountMap).map(([county, count]) => ({ county, count }));
    const avgRangeByMake = Object.entries(rangeByMake).map(([make, d]) => ({ make, averageRange: d.count ? d.total / d.count : 0 }));
    const yearCount = Object.entries(yearCountMap).map(([year, count]) => ({ year: parseInt(year, 10), count })).sort((a, b) => a.year - b.year);

    return { filtered, makeCount, typeCount, countyCount, avgRangeByMake, yearCount };
  }, [selectedCounty, selectedYears, selectedMakes]);

  // KPIs & Insights
  const totalVehicles = processedData.filtered.length;
  const avgRange = totalVehicles ? Math.round(processedData.filtered.reduce((s, v) => s + v.electricRange, 0) / totalVehicles) : 0;
  const topManufacturer = processedData.makeCount.sort((a, b) => b.count - a.count)[0] || { make: "—", count: 0 };

  function computeYoYGrowth() {
    // crude YoY growth computed from yearCount (if at least 2 years present)
    const yc = processedData.yearCount;
    if (yc.length < 2) return null;
    const first = yc[0];
    const last = yc[yc.length - 1];
    const growth = first.count === 0 ? null : ((last.count - first.count) / (first.count || 1)) * 100;
    return Math.round(growth * 10) / 10; // one decimal
  }

  const yoyGrowthPercent = computeYoYGrowth();

  // Manufacturer comparison helper
  const comparisonData = useMemo(() => {
    if (compareMakes.length === 0) return [];
    return compareMakes.map((make) => {
      const filtered = evData.filter((v) => v.make === make && (selectedYears.includes("All") || selectedYears.includes(String(v.modelYear))) && (selectedCounty === "All" || v.county === selectedCounty));
      const total = filtered.length;
      const avgR = total ? Math.round(filtered.reduce((s, v) => s + v.electricRange, 0) / total) : 0;
      const byYear = filtered.reduce((acc, v) => { acc[v.modelYear] = (acc[v.modelYear] || 0) + 1; return acc; }, {});
      const trend = Object.entries(byYear).map(([year, count]) => ({ year: parseInt(year, 10), count })).sort((a, b) => a.year - b.year);
      return { make, total, avgRange: avgR, trend };
    });
  }, [compareMakes, selectedYears, selectedCounty]);

  // Insights generation (simple heuristics)
  function generateInsights() {
    const insights = [];
    insights.push(`Total vehicles shown: ${totalVehicles}`);
    insights.push(`Average electric range (filtered): ${avgRange} miles`);
    insights.push(`Top manufacturer: ${topManufacturer.make} (${topManufacturer.count})`);
    if (yoyGrowthPercent !== null) insights.push(`YoY registration change between earliest and latest year: ${yoyGrowthPercent}%`);

    // fastest growing manufacturer across years (simple comparison)
    const makeYearMap = {};
    processedData.filtered.forEach((v) => {
      makeYearMap[v.make] = makeYearMap[v.make] || {};
      makeYearMap[v.make][v.modelYear] = (makeYearMap[v.make][v.modelYear] || 0) + 1;
    });
    const growths = Object.entries(makeYearMap).map(([make, years]) => {
      const ys = Object.entries(years).map(([y, c]) => ({ y: parseInt(y, 10), c })).sort((a, b) => a.y - b.y);
      if (ys.length < 2) return { make, growth: -Infinity };
      const growth = (ys[ys.length - 1].c - ys[0].c) / (ys[0].c || 1);
      return { make, growth };
    }).filter((r) => r.growth !== -Infinity);
    if (growths.length) {
      const fastest = growths.sort((a, b) => b.growth - a.growth)[0];
      insights.push(`Fastest relative growth (by count): ${fastest.make} (${Math.round(fastest.growth * 100)}%)`);
    }

    if (compareMakes.length === 2) {
      insights.push(`Comparing ${compareMakes[0]} vs ${compareMakes[1]}: check the comparison cards and trend line.`);
    }

    return insights;
  }

  // Export handlers
  function handleExportCSV() {
    if (processedData.filtered.length === 0) return alert("No data to export");
    downloadCSV("ev-data.csv", processedData.filtered);
  }

  async function handleExportPDF() {
    const el = document.getElementById("dashboard-root");
    if (!el) return alert("Unable to find dashboard root");
    const canvas = await html2canvas(el, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape" });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ev-dashboard.pdf");
  }

  // UI helpers for multi-select checkboxes
  function toggleMakeSelection(make) {
    setSelectedMakes((prev) => (prev.includes(make) ? prev.filter((m) => m !== make) : [...prev, make]));
  }

  function toggleCompareMake(make) {
    setCompareMakes((prev) => {
      if (prev.includes(make)) return prev.filter((m) => m !== make);
      if (prev.length >= 2) return prev; // keep max 2
      return [...prev, make];
    });
  }

  // UI: the canvas root id used by PDF export
  return (
    <div id="dashboard-root" className="min-h-screen bg-gray-300 p-6"
    // style={{ background: "linear-gradient(to bottom, #8B5CF6, #E9D5FF)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex justify-center items-center space-x-2">
              <h1 className="text-3xl font-bold tracking-tight">EV Population Insights</h1>
              <div className="-mt-4.5">
                <svg width="100" height="60" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">

                  <rect x="10" y="40" width="10" height="20" fill="#4F46E5">
                    <animate attributeName="height" values="10;20;10" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="50;40;50" dur="1s" repeatCount="indefinite" />
                  </rect>

                  <rect x="30" y="30" width="10" height="30" fill="#6366F1">
                    <animate attributeName="height" values="20;30;20" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="40;30;40" dur="1s" repeatCount="indefinite" />
                  </rect>

                  <rect x="50" y="20" width="10" height="40" fill="#A5B4FC">
                    <animate attributeName="height" values="30;40;30" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="30;20;30" dur="1s" repeatCount="indefinite" />
                  </rect>

                  <rect x="70" y="25" width="10" height="35" fill="#4F46E5">
                    <animate attributeName="height" values="25;35;25" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="35;25;35" dur="1s" repeatCount="indefinite" />
                  </rect>
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600">Interactive, exportable dashboard — filtered in real-time</p>
          </div>

          <div className="flex gap-2 items-center">
            <button onClick={handleExportCSV} className="px-3 py-2 bg-blue-600 text-white rounded shadow hover:opacity-90">Export CSV</button>
            <button onClick={handleExportPDF} className="px-3 py-2 bg-gray-800 text-white rounded shadow hover:opacity-90">Export PDF</button>
          </div>
        </div>

        {/* Filters and compare controls */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">County</label>
              <select value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)} className="w-full px-3 py-2 border rounded">
                {uniqueCounties.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <select value={selectedYears[0]} onChange={(e) => setSelectedYears([e.target.value])} className="w-full px-3 py-2 border rounded">
                {uniqueYears.map((y) => (<option key={y} value={y}>{y}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Filter Manufacturers</label>
              <div className="flex flex-wrap gap-2 p-2 border rounded max-h-36 overflow-auto">
                {uniqueMakes.map((make) => (
                  <label key={make} className="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={selectedMakes.includes(make)} onChange={() => toggleMakeSelection(make)} />
                    <span>{make}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KPI & Insights row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Total Vehicles</div>
            <div className="text-2xl font-bold">{totalVehicles}</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Average Range</div>
            <div className="text-2xl font-bold">{avgRange} mi</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Top Manufacturer</div>
            <div className="text-2xl font-bold">{topManufacturer.make}</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">YoY Change</div>
            <div className="text-2xl font-bold">{yoyGrowthPercent !== null ? yoyGrowthPercent + '%' : '—'}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main charts */}
          <div className="col-span-2 bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Vehicles by Make</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={processedData.makeCount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="make" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">EV Type Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={processedData.typeCount} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={70} labelLine={false} label={({ name, percent }) => `${percent ? (percent * 100).toFixed(0) : 0}%`}>
                    {processedData.typeCount.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights + comparison */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Insights</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {generateInsights().map((ins, idx) => (<li key={idx} className="mb-1">{ins}</li>))}
            </ul>

            {/* Comparison cards */}
            <div className="mt-4">
              <h4 className="font-medium mb-2">Comparison</h4>
              {comparisonData.length === 0 && <div className="text-sm text-gray-500">Select up to 2 manufacturers above to compare.</div>}
              {comparisonData.map((c) => (
                <div key={c.make} className="p-3 border rounded mb-3">
                  <div className="text-sm text-gray-500">{c.make}</div>
                  <div className="text-xl font-bold">{c.total} vehicles</div>
                  <div className="text-sm mt-1">Avg range: {c.avgRange} mi</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend compare line (if 2 selected) */}
        {comparisonData.length === 2 && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="font-semibold mb-3">Compare Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line data={comparisonData[0].trend} dataKey="count" name={comparisonData[0].make} stroke="#0ea5e9" strokeWidth={2} />
                <Line data={comparisonData[1].trend} dataKey="count" name={comparisonData[1].make} stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-3">Vehicle Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Make</th>
                  <th className="px-4 py-2 text-left">Model</th>
                  <th className="px-4 py-2 text-left">Year</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Range</th>
                  <th className="px-4 py-2 text-left">County</th>
                </tr>
              </thead>
              <tbody>
                {processedData.filtered.slice(0, 50).map((vehicle, i) => (
                  <tr key={vehicle.vin || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2">{vehicle.make}</td>
                    <td className="px-4 py-2">{vehicle.model}</td>
                    <td className="px-4 py-2">{vehicle.modelYear}</td>
                    <td className="px-4 py-2">{vehicle.evType.split(' ')[0]}</td>
                    <td className="px-4 py-2">{vehicle.electricRange} mi</td>
                    <td className="px-4 py-2">{vehicle.county}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}

export default App;
