import React from 'react';
import '../App.css';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';


const generateColors = (count) => {
  const baseColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#82CA9D', '#FF6666', '#FFCC00', '#66CCFF', '#FF99CC'];
  const generatedColors = [];
  for (let i = 0; i < count; i++) {
    generatedColors.push(baseColors[i % baseColors.length]); 
  }
  return generatedColors;
};

const EVTable = ({ data, percentages }) => {
  const COLORS = generateColors(percentages.length);

  return (
    <div className="dashboard-container">
      {/* Donut Chart Section */}
      <div className="chart-section">
        <h2>Top 10 EV Brands Market Share </h2>
        <div className="chart-container">
          <PieChart width={300} height={300}>
            <Pie
              data={percentages}
              dataKey="percentage"
              nameKey="model"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60} 
              fill="#8884d8"
            >
              <Label
                value="Market Share"
                position="center"
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fill: '#333',
                }}
              />
              {percentages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          {/* Legend */}
          <div className="legend-container">
            {percentages.map((entry, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                {entry.model}: {entry.percentage}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <h2>Top 10 EV Models Manufactured</h2>
        <table className="ev-table">
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Electric Range</th>
              <th>CAFV Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.model}</td>
                <td>{row.range}</td>
                <td>{row.cafvEligibility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EVTable;
