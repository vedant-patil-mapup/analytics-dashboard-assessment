import React from 'react';
import VehicleTypePieChart from './charts/VehicleTypePieChart';
import GrowthLineChart from './charts/GrowthLineChart';
import '../App.css';

const Overview = ({ stats, byType, byYear }) => (
  <div>
    {/* Cards */}
    <div className="overview-cards">
      <div className="overview-card">
        <h3>{stats.marketLeader}</h3>
        <p>Top Brand</p>
      </div>
      <div className="overview-card">
        <h3>{stats.cafvEligible}%</h3>
        <p>CAFV Eligibility Rate</p>
      </div>
      <div className="overview-card">
        <h3>{stats.topCity}</h3>
        <p>City with Most EVs</p>
      </div>
    </div>

    {/* Charts */}
    <div className="charts-section">
      <VehicleTypePieChart title="Vehicle Type (BEV/PHEV)" data={byType} />
      <GrowthLineChart title="EVs Growth" data={byYear} />
    </div>
  </div>
);

export default Overview;
