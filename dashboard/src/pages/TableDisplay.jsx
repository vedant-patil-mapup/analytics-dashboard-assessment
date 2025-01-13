import { useState, useEffect } from "react";
import Papa from "papaparse";
import { ArrowLeft } from "lucide-react";
import file from "../assets/Electric_Vehicle_Population_Data.csv";
import { useNavigate } from "react-router-dom";
import EVsByMakeTable from "../components/Charts/Table";

const TableDisplay = () => {
  const [makeData, setMakeData] = useState([]);
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
    const makeCounts = data.reduce((acc, row) => {
      const make = row["Make"];
      acc[make] = (acc[make] || 0) + 1;
      return acc;
    }, {});
    const makeChartData = Object.entries(makeCounts).map(([make, count]) => ({
      make,
      count,
    }));
    setMakeData(makeChartData);
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
        <section className="section">
          {makeData.length === 0 ? (
            <div className="text-center text-gray-600">Loading data...</div>
          ) : (
            <EVsByMakeTable makeData={makeData} />
          )}
        </section>
      </div>
    </>
  );
};

export default TableDisplay;
