// src/components/MetricCard.js
import React from "react";
import "./MetricCard.css"; // Import CSS module for styling

const MetricCard = ({ title, value }) => {
  return (
    <div className="metricCard">
      <h3 className="title">{title}</h3>
      <p className="value">{value}</p>
    </div>
  );
};

export default MetricCard;
