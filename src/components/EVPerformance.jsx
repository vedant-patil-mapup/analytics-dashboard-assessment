import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartCard } from './ChartCard';

const EVPerformance = ({ data }) => {
  return (
    <ChartCard title="Top Manufacturers">
      <BarChart
        width={1000}
        height={500}
        data={data.makeYearRange}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="range" fill="#37666d" />
      </BarChart>
    </ChartCard>
  );
};

export default EVPerformance;
