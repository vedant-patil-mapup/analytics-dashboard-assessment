import { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Car, Battery, Plug } from "lucide-react";
import file from "../../../../data-to-visualize/Electric_Vehicle_Population_Data.csv";

const EVTypeDistribution = () => {
  const [evTypeData, setEvTypeData] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    bev: 0,
    phev: 0,
  });

  useEffect(() => {
    fetch(file)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            processChartData(result.data);
          },
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const processChartData = (data) => {
    const typeCounts = data.reduce((acc, row) => {
      const type = row["Electric Vehicle Type"] || row["Electric_Vehicle_Type"];
      if (type) {
        acc[type] = (acc[type] || 0) + 1;
      }
      return acc;
    }, {});

    const total = data.length;
    const bev = typeCounts["Battery Electric Vehicle (BEV)"] || 0;
    const phev = typeCounts["Plug-in Hybrid Electric Vehicle (PHEV)"] || 0;

    setSummary({
      total,
      bev,
      phev,
    });

    const chartData = [
      { type: "Total EVs", count: total },
      { type: "BEV", count: bev },
      { type: "PHEV", count: phev },
    ];

    setEvTypeData(chartData);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Car size={24} className="text-blue-600" />
            <div>
              <span className="font-semibold">Total EVs: </span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
                {summary.total}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Battery size={24} className="text-blue-600" />
            <div>
              <span className="font-semibold">BEVs: </span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
                {summary.bev}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Plug size={24} className="text-blue-600" />
            <div>
              <span className="font-semibold">PHEVs: </span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
                {summary.phev}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Distribution of Electric Vehicle Types
            </h2>
            {evTypeData.length === 0 ? (
              <div className="text-center text-gray-600">Loading data...</div>
            ) : (
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={evTypeData}
                    margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#8884d8"
                      name="Number of Vehicles"
                      radius={[4, 4, 0, 0]}
                    >
                      <LabelList
                        dataKey="count"
                        position="top"
                        fill="#8884d8"
                        fontSize={16}
                        fontWeight="bold"
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EVTypeDistribution;
