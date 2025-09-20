/* eslint-disable react/prop-types */
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "../ChartContainer";

export const GrowthCharts = ({ data }) => (
  <ChartContainer title="Growth Over Time">
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 100 }}  
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /> 
        <XAxis
          dataKey="year"
          tickMargin={10} 
          angle={-45} 
          textAnchor="end" 
          tick={{ fontSize: 12, fill: "#374151" }}
          label={{
            value: "Year",
            position: "insideBottom",
            dy: 40,
            fontSize: 14,
            fill: "#1F2937",
          }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#374151" }}
          label={{
            value: "Count",
            angle: -90,
            position: "insideLeft",
            dx: -10,
            fontSize: 14,
            fill: "#1F2937",
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D1D5DB",
            borderRadius: 8,
            padding: 10,
          }}
          itemStyle={{ color: "#1F2937" }}
          labelStyle={{ fontWeight: "bold", color: "#111827" }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#3B82F6"
          strokeWidth={3}
          dot={{ r: 4, stroke: "#3B82F6", fill: "#FFFFFF", strokeWidth: 2 }}
          activeDot={{ r: 6, fill: "#3B82F6" }}
        />
      </LineChart>
    </ResponsiveContainer>
  </ChartContainer>
);
