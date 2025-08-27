 

import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { DataContext } from "../data/DataContext";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

// Register required components for Chart.js
ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = () => {
  const jsonData = useContext(DataContext);

  if (!jsonData || jsonData.length === 0) {
    return <p>Loading data...</p>;
  }

  // Calculate eligible and not eligible counts
  const totalVehicles = jsonData.length;
  const eligibleVehicles = jsonData.filter(
    (item) =>
      item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] ===
      "Clean Alternative Fuel Vehicle Eligible"
  ).length;

  // Calculate percentages
  const eligiblePercentage = ((eligibleVehicles / totalVehicles) * 100).toFixed(
    2
  );
  const notEligiblePercentage = (100 - eligiblePercentage).toFixed(2);

  // Chart data
  const data = {
    labels: ["Eligible", "Not Eligible"],
    datasets: [
      {
        data: [eligiblePercentage, notEligiblePercentage],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        hoverBackgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "CAFV Eligibility Breakdown",
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row h-[300px] mx-auto shadow-lg p-3 rounded-lg items-center gap-4">
      {/* Chart Section */}
      <div className="w-full md:w-1/2">
        <Pie data={data} options={options} />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center text-center">
        <p className="text-xl text-gray-900 font-bold">
          This chart shows the distribution of electric vehicle types across
          manufacturers.
        </p>
      </div>
    </div>
  );
};

export default PieChart;
