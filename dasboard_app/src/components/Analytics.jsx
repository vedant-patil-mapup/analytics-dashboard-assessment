import React, { useState, useEffect } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import { parseCSVData } from "../data/InsightsHelper";
import Chart from "chart.js/auto";
import "../styles/analytics.css";


const Analytics = () => {
  const [activeChart, setActiveChart] = useState("chart1");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await parseCSVData(); // Wait for parsed CSV data
      setData(csvData);
    };
    fetchData();
  }, []);

  if (!data || !data.length)
    return <div className="loading-message">Data loading...</div>;

  // First Chart: Two-way Bar Chart (BEV vs PHEV by Year)
  const processChartData1 = () => {
    const years = {};
    data.forEach((row) => {
      const year = row["Model Year"];
      const vehicleType = row["Electric Vehicle Type"];
      if (year && vehicleType) {
        if (!years[year]) years[year] = { BEV: 0, PHEV: 0 };
        if (vehicleType === "Battery Electric Vehicle (BEV)") {
          years[year].BEV += 1;
        } else if (vehicleType === "Plug-in Hybrid Electric Vehicle (PHEV)") {
          years[year].PHEV += 1;
        }
      }
    });

    return {
      labels: Object.keys(years),
      datasets: [
        {
          label: "BEV",
          data: Object.values(years).map((y) => y.BEV),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "PHEV",
          data: Object.values(years).map((y) => y.PHEV),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    };
  };

  const chartData1 = processChartData1();

  // Second Chart: Pie Chart for Make with unique colors
  const processChartData2 = () => {
    const makeCounts = data.reduce((acc, vehicle) => {
      const make = vehicle["Make"];
      acc[make] = (acc[make] || 0) + 1;
      return acc;
    }, {});

    const uniqueColors = Array.from(
      { length: Object.keys(makeCounts).length },
      (_, i) =>
        `hsl(${(i * 360) / Object.keys(makeCounts).length}, 70%, 60%)` // Generate unique HSL colors
    );

    return {
      labels: Object.keys(makeCounts),
      datasets: [
        {
          data: Object.values(makeCounts),
          backgroundColor: uniqueColors,
        },
      ],
    };
  };

  const chartData2 = processChartData2();

  // Third Chart: Doughnut Chart for Vehicles by County
  const processChartData3 = () => {
    const counties = {};
    data.forEach((row) => {
      const county = row["County"];
      if (county) {
        counties[county] = (counties[county] || 0) + 1;
      }
    });

    return {
      labels: Object.keys(counties),
      datasets: [
        {
          label: "Vehicles by County",
          data: Object.values(counties),
          backgroundColor: Array.from(
            { length: Object.keys(counties).length },
            () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 0.7)`
          ),
        },
      ],
    };
  };

  const chartData3 = processChartData3();

  // Fourth Chart: Line Chart for Electric Vehicles by Year
  const electricVehicles = data.reduce((acc, vehicle) => {
    const year = vehicle["Model Year"];
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const chartData4 = {
    labels: Object.keys(electricVehicles),
    datasets: [
      {
        label: "Order count",
        data: Object.values(electricVehicles),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const renderChart = () => {
    switch (activeChart) {
      case "chart1":
        return <Bar data={chartData1}/>;
      case "chart2":
        return <Pie data={chartData2} />;
      case "chart3":
        return <Doughnut data={chartData3} />;
      case "chart4":
        return <Line data={chartData4} />;
      default:
        return null;
    }
  };

  return (
    <div className="analytics">
      <h1 className="">Analytics</h1>
      <div className="chart chart-buttons">
        <button onClick={() => setActiveChart("chart1")}>BEv v/s PHEv yearwise</button>
        <button onClick={() => setActiveChart("chart2")}>Makewise Piechart</button>
        <button onClick={() => setActiveChart("chart3")}>
          County Doughnut Chart
        </button>
        <button onClick={() => setActiveChart("chart4")}>Order over years</button>
      </div>
      <div className="rendering_chart">{renderChart()}</div>
    </div>
  );
};

export default Analytics;