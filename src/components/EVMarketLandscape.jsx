import React from 'react';
import { Cell, Legend, Pie, PieChart, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartCard } from "./ChartCard";

const EVMarketLandscape = ({ data }) => {
  const colors = ["#753dfe","#9e77fe","#8350fe","#9164fe"];
  return (
    <div>
        <ChartCard title="Evolution Of EV">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data.byYear}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}  
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /> 
              <XAxis
                dataKey="year"
                tickMargin={10} 
                angle={-45} 
                textAnchor="end" 
                tick={{ fontSize: 12, fill: "#ffffff" }}
                label={{
                  value: "Year",
                  position: "insideBottom",
                  dy: 40,
                  fontSize: 14,
                  fill: "#ffffff",
                }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#ffffff" }}
                label={{
                  value: "Count",
                  angle: -90,
                  position: "insideLeft",
                  dx: -10,
                  fontSize: 14,
                  fill: "#ffffff",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D1D5DB",
                  borderRadius: 8,
                  padding: 10,
                }}
                itemStyle={{ color: "#5641f5" }}
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
         </ChartCard>
         <ChartCard title="Vehicle Type Distribution">
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
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default EVMarketLandscape;
