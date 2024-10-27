import React, { useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  const manufacturers = data.reduce((acc, item) => {
    if(item.make){
        acc[item.make] = (acc[item.make] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(manufacturers),
    datasets: [
      {
        label: 'Top Manufacturers',
        data: Object.values(manufacturers),
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)'
        ],
      },
    ],
  };
  
  if (!data || data.length === 0) {
    return <div style={{ width: '100%', height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        No Data Available
        </div>;
  }

  return <Bar ref={chartRef} data={chartData} />;
};

export default BarChart;
