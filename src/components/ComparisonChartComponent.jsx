// src/components/ComparisonChartComponent.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComparisonChartComponent = ({ dataset }) => {
  // Group and calculate average electric range by vehicle type
  const typeAverages = dataset.reduce((acc, item) => {
    const type = item["Electric Vehicle Type"];
    const range = item["Electric Range"];
    if (!acc[type]) {
      acc[type] = { totalRange: 0, count: 0 };
    }
    acc[type].totalRange += range;
    acc[type].count += 1;
    return acc;
  }, {});

  const labels = Object.keys(typeAverages);
  const dataValues = labels.map((type) =>
    (typeAverages[type].totalRange / typeAverages[type].count).toFixed(1)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Average Electric Range (miles)",
        data: dataValues,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Comparison of Average Electric Range by Vehicle Type",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Vehicle Type",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Electric Range (miles)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="comparison-chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ComparisonChartComponent;
