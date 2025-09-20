/* eslint-disable react/prop-types */
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '../ChartContainer';

export const UtilitiesCharts = ({ data }) => (
  <ChartContainer title="Top Electric Utilities">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data.byUtility}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="utility" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);