import React from 'react';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { YearChartData } from '../types/vehicleTypes';

interface YearlyChartProps {
  data: YearChartData[];
}

const YearlyChart: React.FC<YearlyChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
        <Area type="monotone" dataKey="count" fill="#8884d8" fillOpacity={0.3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearlyChart;
