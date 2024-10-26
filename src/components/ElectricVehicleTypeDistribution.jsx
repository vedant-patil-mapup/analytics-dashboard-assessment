// src/components/ElectricVehicleTypeDistribution.js
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

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ElectricVehicleTypeDistribution = ({ dataset }) => {
  // Prepare the data for the chart
  const vehicleTypes = dataset.reduce((acc, item) => {
    const type = item["Electric Vehicle Type"];
    if (type) {
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(vehicleTypes),
    datasets: [
      {
        label: "Number of Vehicles",
        data: Object.values(vehicleTypes),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution of Electric Vehicles by Type",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Vehicles",
        },
      },
      x: {
        title: {
          display: true,
          text: "Vehicle Type",
        },
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ElectricVehicleTypeDistribution;
