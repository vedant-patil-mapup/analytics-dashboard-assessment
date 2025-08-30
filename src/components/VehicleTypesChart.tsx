import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { TypeChartData } from '../types/vehicleTypes';
import { CHART_COLORS } from '../constants/chartConstants';

interface VehicleTypesChartProps {
  data: TypeChartData[];
  totalVehicles: number;
}

const VehicleTypesChart: React.FC<VehicleTypesChartProps> = ({ data, totalVehicles }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={310}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={false}
            outerRadius={100}
            innerRadius={30}
            fill="#8884d8"
            dataKey="count"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CHART_COLORS[index % CHART_COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any, name: any) => [
              value.toLocaleString(), 
              name
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="pie-chart-labels">
        {data.map((entry, index) => (
          <div key={index} className="label-item">
            <div 
              className="label-color" 
              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
            ></div>
            <span className="label-text">
              {entry.type} {((Number(entry.count) / totalVehicles) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default VehicleTypesChart;
