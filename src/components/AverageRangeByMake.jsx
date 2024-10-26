// src/components/AverageRangeByMake.js
import React from "react";
import "./AverageRangeByMake.css";

const AverageRangeByMake = ({ dataset }) => {
  // Calculate average electric range per make
  const makeRangeData = dataset.reduce((acc, curr) => {
    const make = curr.Make;
    const range = curr["Electric Range"];
    if (make && range) {
      acc[make] = acc[make] || { totalRange: 0, count: 0 };
      acc[make].totalRange += range;
      acc[make].count += 1;
    }
    return acc;
  }, {});

  // Calculate the average and store in an array for rendering
  const makeAverageRanges = Object.entries(makeRangeData).map(
    ([make, data]) => ({
      make,
      averageRange: (data.totalRange / data.count).toFixed(1),
    })
  );

  return (
    <div className="average-range-table-container">
      <h3 className="average-range-header">Average Range by Make</h3>
      <table className="average-range-table">
        <thead>
          <tr>
            <th>Make</th>
            <th>Average Range (miles)</th>
          </tr>
        </thead>
        <tbody>
          {makeAverageRanges.map(({ make, averageRange }) => (
            <tr key={make}>
              <td className="make-name">{make}</td>
              <td className="range-value">{averageRange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AverageRangeByMake;
