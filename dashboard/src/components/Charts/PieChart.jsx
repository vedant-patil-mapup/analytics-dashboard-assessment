import { useState, useEffect } from "react";
import Papa from "papaparse";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import file from "../../../../data-to-visualize/Electric_Vehicle_Population_Data.csv";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

const PieChartDisplay = () => {
  const [makeData, setMakeData] = useState([]);

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
    const makeCounts = data.reduce((acc, row) => {
      const make = row["Make"];
      acc[make] = (acc[make] || 0) + 1;
      return acc;
    }, {});

    const makeChartData = Object.entries(makeCounts).map(([make, count]) => ({
      name: make,
      value: count,
    }));

    setMakeData(makeChartData);
  };

  const chartWidth = Math.min(1000, window.innerWidth - 40);
  const chartHeight = Math.min(800, window.innerHeight - 40);
  const navigate = useNavigate();

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
      </div>
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Electric Vehicle Distribution by Make
        </h1>
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
          {makeData.length === 0 ? (
            <div className="text-center text-gray-600">Loading data...</div>
          ) : (
            <PieChart width={chartWidth} height={chartHeight}>
              <Pie
                data={makeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={Math.min(chartWidth, chartHeight) * 0.35}
                fill="#8884d8"
              >
                {makeData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}`, name]} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  padding: "10px 0",
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  overflow: "auto",
                  maxHeight: "100px",
                }}
              />
            </PieChart>
          )}
        </div>
      </div>
    </>
  );
};

export default PieChartDisplay;
