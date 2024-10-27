// src/App.js
import React, { useEffect, useState } from "react";
import MetricCard from "./components/MetricCard";
import NewCAFVDistribution from "./components/NewCAFVDistribution";
import LineChartComponent from "./components/LineChartComponent";
import data from "../data-to-visualize/EV_Population_data.json";
import "./App.css";
import ComparisonChartComponent from "./components/ComparisonChartComponent";

const App = () => {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    setDataset(data); // Load the dataset from JSON
  }, []);

  // Calculate metrics
  const totalVehicles = dataset.length;
  const totalMakes = new Set(dataset.map((item) => item.Make)).size; // Count unique makes
  const avgBaseMSRP = (
    dataset.reduce((sum, item) => sum + item["Base MSRP"], 0) / totalVehicles
  ).toFixed(2);
  const totalElectricRange = dataset.reduce(
    (sum, item) => sum + item["Electric Range"],
    0
  );
  const percentageBEV = (
    (dataset.filter(
      (item) =>
        item["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)"
    ).length /
      totalVehicles) *
    100
  ).toFixed(1);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Electric Vehicles Dashboard</h1>
      </header>
      <div className="metrics">
        <MetricCard title="Total Vehicles" value={totalVehicles} />
        <MetricCard title="Total Makes" value={totalMakes} />
        <MetricCard title="Average Base MSRP" value={`$${avgBaseMSRP}`} />
        <MetricCard
          title="Total Electric Range"
          value={`${totalElectricRange} miles`}
        />
        <MetricCard title="% of BEV" value={`${percentageBEV}%`} />
        <MetricCard
          title="Average Electric Range"
          value={`${(totalElectricRange / totalVehicles).toFixed(1)} miles`}
        />
      </div>
      <div className="charts-container">
        <ComparisonChartComponent dataset={dataset} />
        <LineChartComponent dataset={dataset} />
        <NewCAFVDistribution dataset={dataset} />
      </div>
    </div>
  );
};

export default App;
