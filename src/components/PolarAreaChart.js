import React, { useRef, useState, useEffect } from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = ({ data }) => {
  const chartRef = useRef(null);
  const [selectedMake, setSelectedMake] = useState('');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedMake(data[0].make);
    }
  }, [data]);

  useEffect(() => {
    if (selectedMake) {
      const filtered = data.filter(item => item.make === selectedMake);
      setFilterData(filtered);
    }
  }, [selectedMake, data]);

  if (!data || data.length === 0) {
    return     <div style={{ width: '100%', height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    {/* <Typography variant="h6" gutterBottom>
        {headerText}
    </Typography> */}
    No Data Available
        </div>;
  }

  const makes = [...new Set(data.map((item) => item.make))].sort();

  const modelCounts = filterData.reduce((acc, item) => {
    if (item.model) {
      acc[item.model] = (acc[item.model] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(modelCounts),
    datasets: [
      {
        label: 'All Models Sold',
        data: Object.values(modelCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      r: {
        ticks: {
          color: '#333',
        },
        grid: {
          color: '#ccc',
        },
      },
    },
  };

  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Radar ref={chartRef} data={chartData} options={options} />
      <select style={{ margin: '10px', height: '30px', width: '150px' }} value={selectedMake} onChange={handleMakeChange}>
        <option value="">Select Make</option>
        {makes.map((make, index) => (
          <option key={index} value={make}>
            {make}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PolarAreaChart;
