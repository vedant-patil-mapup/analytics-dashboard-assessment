// src/components/LineChartComponent.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = ({ dataset }) => {
  // Prepare the data for the line chart
  const vehicleRegistrationsByYear = dataset.reduce((acc, item) => {
    const year = item["Model Year"];
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(vehicleRegistrationsByYear),
    datasets: [
      {
        label: "Vehicle Registrations",
        data: Object.values(vehicleRegistrationsByYear),
        borderColor: "rgba(54, 162, 235, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4, // Adds smoothness to the line
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
        text: "Electric Vehicle Registrations by Model Year",
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
          text: "Number of Registrations",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
