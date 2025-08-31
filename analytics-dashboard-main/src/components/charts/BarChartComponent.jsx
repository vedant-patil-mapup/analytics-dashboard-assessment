import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const BarChartComponent = ({ title, data, xKey, yKey}) => (
    <div>
      <h3>{title}</h3>
      
      <BarChart
        width={600} 
        height={300}
        data={data.slice(0,5)}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} fill="#82ca9d" />
      </BarChart>
  </div>
);

export default BarChartComponent;
