/* eslint-disable react/prop-types */
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '../ChartContainer';

export const ModelsCharts = ({ data }) => (
  <>
    <ChartContainer title="Top Manufacturers">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.byMake.slice(0, 5)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="make" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>

    <ChartContainer title="Top Models">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.byModel.slice(0, 5)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="model" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  </>
);