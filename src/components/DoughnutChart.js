import React, { useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  const fuelTypes = data.reduce((acc, item) => {
    if(item.fuelType){
        acc[item.fuelType] = (acc[item.fuelType] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(fuelTypes),
    datasets: [
      {
        label: 'Fuel Type Distribution',
        data: Object.values(fuelTypes),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    cutout: '40%',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  if (!data || data.length === 0) {
    return <div style={{ width: '100%', height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        No Data Available
        </div>;
  }

  return (
    <div style={{width: '100%', height: '100%', display:'flex',  justifyContent:'center', alignItems:'center'}}>
      <Doughnut ref={chartRef} data={chartData} options={options} />
    </div>
)
};

export default PieChart;
