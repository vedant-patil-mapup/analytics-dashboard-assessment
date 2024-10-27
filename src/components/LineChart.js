import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
    const yearCounts = data.reduce((acc, item) => {
        if (item.year) { 
          acc[item.year] = (acc[item.year] || 0) + 1;
        }
        return acc;
      }, {});

  const chartData = {
    labels: Object.keys(yearCounts),
    datasets: [
      {
        label: 'EV Population Over Time',
        data: Object.values(yearCounts),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };
  if (!data || data.length === 0) {
    return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        No Data Available
        </div>;
  }
  return <Line data={chartData} />;
};

export default LineChart;
