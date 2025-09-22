
import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart } from 'recharts';
import { ChartCard } from './ChartCard';

const RegionalAdoption = ({ data }) => {
  return (
    <div>
      <ChartCard title="Top Counties">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.byCounty.slice(0, 5)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="county" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Top Cities">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.byCity.slice(0, 5)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
    </div>
  );
};

export default RegionalAdoption;
