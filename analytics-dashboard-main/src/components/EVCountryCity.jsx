import React from 'react';
import BarChartComponent from './charts/BarChartComponent';
import '../App.css';

const EVCountryCity = ({ byCounty, byCity }) => (
  <div className="charts-section">
    <BarChartComponent title="Top Counties" data={byCounty} xKey="county" yKey="count" />
    <BarChartComponent title="Top Cities" data={byCity} xKey="city" yKey="count" />
  </div>
);

export default EVCountryCity;
