import React, { useState, useEffect } from "react";
import "../styles/orders.css";
import { parseCSVData } from "../data/InsightsHelper";
import { CSVLink } from "react-csv";

const Orders = () => {
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [displayData, setDisplayData] = useState([]); 
  const [filterType, setFilterType] = useState("yearwise");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [evType, setEvType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await parseCSVData();
      setData(csvData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data.length) return;

    let filtered = [];
    if (filterType === "yearwise" && year) {
      filtered = data.filter((item) => item["Model Year"] === year);
    } else if (filterType === "makeType" && make) {
      filtered = data.filter((item) =>
        item["Make"].toLowerCase().includes(make.toLowerCase())
      );
    } else if (filterType === "evType" && evType) {
      filtered = data.filter((item) => item["Electric Vehicle Type"] === evType);
    }

    setFilteredData(filtered);
    setDisplayData(filtered.slice(0, 1000)); 
  }, [filterType, year, make, evType, data]);

  return (
    <div className="orders">
      <h1><span style={{ color: "#ff9800" }}>Orders</span> Overview</h1>
      <div className="filters">
        <label htmlFor="filterType">Filter By:</label>
        <select
          id="filterType"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="yearwise">Yearwise</option>
          <option value="makeType">Make Type</option>
          <option value="evType">EV Type</option>
        </select>

        {filterType === "yearwise" && (
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            {[...new Set(data.map((item) => item["Model Year"]))]
              .sort()
              .map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
          </select>
        )}

        {filterType === "makeType" && (
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="Type Make"
            list="make-options"
          />
        )}

        {filterType === "evType" && (
          <select value={evType} onChange={(e) => setEvType(e.target.value)}>
            <option value="">Select EV Type</option>
            <option value="Battery Electric Vehicle (BEV)">
              Battery Electric Vehicle (BEV)
            </option>
            <option value="Plug-in Hybrid Electric Vehicle (PHEV)">
              Plug-in Hybrid Electric Vehicle (PHEV)
            </option>
          </select>
        )}

        <datalist id="make-options">
          {[...new Set(data.map((item) => item["Make"]))].sort().map((mk) => (
            <option key={mk} value={mk} />
          ))}
        </datalist>

        {/* Download button aligned with dropdowns */}
        {filteredData.length > 0 && (
          <CSVLink
            data={filteredData}
            filename={`${filterType}-filtered-data.csv`}
            className="download-btn"
          >
            Download Full Data ({filteredData.length} rows)
          </CSVLink>
        )}
      </div>

      {/* Table to display filtered data */}
      <div className="table">
        {displayData.length ? (
          <table>
            <thead>
              <tr>
                {Object.keys(displayData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available. Please select filters to see and download filtered data.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
