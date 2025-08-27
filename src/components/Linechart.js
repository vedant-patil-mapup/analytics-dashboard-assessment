import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { DataContext } from "../data/DataContext";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Linechart = () => {
  const jsonData = useContext(DataContext);

  if (!jsonData || jsonData.length === 0) {
    return <p>Loading data...</p>;
  }

  // Process the data
  const groupedData = jsonData.reduce((acc, item) => {
    const year = item["Model Year"];
    const range = parseInt(item["Electric Range"], 10);

    if (!acc[year]) {
      acc[year] = { totalRange: 0, count: 0 };
    }
    if (!isNaN(range) && range > 0) {
      acc[year].totalRange += range;
      acc[year].count += 1;
    }
    return acc;
  }, {});

  // Prepare chart data
  const modelYears = Object.keys(groupedData).sort((a, b) => a - b); // Sorted years
  const averageRanges = modelYears.map((year) =>
    groupedData[year].count > 0
      ? groupedData[year].totalRange / groupedData[year].count
      : 0
  );

  const data = {
    labels: modelYears,
    datasets: [
      {
        label: "Average Electric Range",
        data: averageRanges,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Smooth line
        fill: true, // Fill under the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Electric Range Trends Over Model Years",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Model Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Electric Range (miles)",
        },
      },
    },
  };

  return (
    
    <div className="  h-[300px]  bg-white mt-10 mx-auto p-4 mb-10 shadow-lg rounded-lg">
        <h2 className="text-gray-700 pb-3 text-xl font-bold">Electric Range Trends Over Model Years</h2>
  <Line className="p-2 " data={data} options={options} />
       </div>

   
  );
};

export default Linechart;
