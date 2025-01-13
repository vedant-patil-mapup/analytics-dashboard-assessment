import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import {
  parseCSVData,
  calculateTotalOrders,
  calculateEVOrders,
  calculateNonEVOrders,
  groupDataByYear,
  groupDataByMake,
  calculateTopModel,
} from "../data/InsightsHelper";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [insights, setInsights] = useState({
    totalOrders: 0,
    evOrders: 0,
    nonEvOrders: 0,
    ordersByYear: {},
    makeDistribution: {},
    topModel: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await parseCSVData(); // Wait for parsed CSV data
      setData(csvData);

      setInsights({
        totalOrders: calculateTotalOrders(csvData),
        evOrders: calculateEVOrders(csvData),
        nonEvOrders: calculateNonEVOrders(csvData),
        ordersByYear: groupDataByYear(csvData),
        makeDistribution: groupDataByMake(csvData),
        topModel: calculateTopModel(csvData),
      });
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="insights">
  <div className="insight-card totalOrders">
    <h2>Total Orders till Date</h2>
    <p>{insights.totalOrders}  <i className="fas fa-shopping-cart"></i></p>
  </div>
  <div className="insight-card evOrders">
    <h2>Battery Electric Vehicle (BEV) Orders</h2>
    <p>{insights.evOrders}  <i className="fas fa-battery-full"></i></p>
  </div>
  <div className="insight-card nonEvOrders">
    <h2>Plug-in Hybrid Electric Vehicle (PHEV) Orders</h2>
    <p>{insights.nonEvOrders}  <i className="fas fa-gas-pump"></i></p>
  </div>
  <div className="insight-card ordersByYear">
    <h2>Total Orders by Year</h2>
    <p>{Object.keys(insights.ordersByYear).length}  <i className="fas fa-calendar-day"></i></p>
  </div>
  <div className="insight-card makeDistribution">
    <h2>Unique Makes</h2>
    <p>{Object.keys(insights.makeDistribution).length}  <i className="fas fa-cogs"></i></p>
  </div>
  <div className="insight-card topModel">
    <h2>Top Model Name</h2>
    <p>{insights.topModel}  <i className="fas fa-car"></i></p>
  </div>
</div>

    </div>
  );
};

export default Dashboard;