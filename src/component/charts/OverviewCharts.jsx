import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "../ChartContainer";
import { COLORS } from "../utils/constants";

/* eslint-disable react/prop-types */
export const OverviewCharts = ({ data }) => (
    <>
      <ChartContainer title="Vehicle Type Distribution">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.byType}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="count"
              nameKey="type"
              label={({ type, percentage }) => `${type} (${percentage}%)`}
            >
              {data.byType.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
  
      <ChartContainer title="CAFV Eligibility Status">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.byEligibility}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );