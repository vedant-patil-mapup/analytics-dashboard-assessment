import { useState, useEffect } from "react";
import Papa from "papaparse";
import { ArrowLeft } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import file from "../../../../data-to-visualize/Electric_Vehicle_Population_Data.csv";
import { useNavigate } from "react-router-dom";

const BarChartDisplay = () => {
  const [modelYearData, setModelYearData] = useState([]);
  const navigate = useNavigate();

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
      });
  }, []);

  const processChartData = (data) => {
    const modelYearCounts = data.reduce((acc, row) => {
      const year = row["Model Year"];
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});
    const modelYearChartData = Object.entries(modelYearCounts).map(
      ([year, count]) => ({
        year,
        count,
      })
    );
    setModelYearData(modelYearChartData);
  };
  return (
    <>
      <div className="p-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-8 h-8 border-2 border-gray-700 rounded-full" />
          <span className="text-lg font-semibold">Back</span>
        </button>

        {modelYearData.length == 0 ? (
          <div className="text-center text-gray-600">Loading data...</div>
        ) : (
          <section className="section p-8 bg-gray-50">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              EVs by Model Year
            </h2>
            <div className="chart-container w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelYearData} margin={{ bottom: 67 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" name="Count of EVs" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BarChartDisplay;
