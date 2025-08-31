import React from 'react';
import BarChartComponent from './charts/BarChartComponent';
import '../App.css';

const EVMakeModel = ({ byMake, byModel }) => (
  <div className="charts-section">
    <BarChartComponent title="Top Manufacturers" data={byMake} xKey="make" yKey="count" />
    <BarChartComponent title="Top Models" data={byModel} xKey="model" yKey="count" />
  </div>
);

export default EVMakeModel;
