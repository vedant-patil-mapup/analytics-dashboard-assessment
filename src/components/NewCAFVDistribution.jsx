// src/components/NewCAFVDistribution.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"; // Import necessary elements

// Register the elements
Chart.register(ArcElement, Tooltip, Legend);

const NewCAFVDistribution = ({ dataset }) => {
  // Data preparation for the pie chart
  const cafvCounts = dataset.reduce((acc, curr) => {
    acc[curr["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]] =
      (acc[curr["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(cafvCounts),
    datasets: [
      {
        data: Object.values(cafvCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          // Add more colors if needed
        ],
      },
    ],
  };

  return (
    <div style={{ width: "380px", height: "300px" }}>
      {" "}
      {/* Adjusted size */}
      <h3>CAFV Eligibility Breakdown</h3>
      <Pie data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default NewCAFVDistribution;
