// src/components/BarChart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Tabs, Tab } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('Make');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  
  const processChartData = () => {
    let groupedData = {};

    if (selectedTab === 'Make') {
      groupedData = data.reduce((acc, item) => {
        acc[item['Make']] = (acc[item['Make']] || 0) + 1;
        return acc;
      }, {});
    } else if (selectedTab === 'Model') {
      groupedData = data.reduce((acc, item) => {
        acc[item['Model']] = (acc[item['Model']] || 0) + 1;
        return acc;
      }, {});
    } else if (selectedTab === 'Electric Utility') {
      groupedData = data.reduce((acc, item) => {
        acc[item['Electric Utility']] = (acc[item['Electric Utility']] || 0) + 1;
        return acc;
      }, {});
    }

    
    const sortedData = Object.entries(groupedData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    const labels = sortedData.map(([key]) => key);
    const values = sortedData.map(([, value]) => value);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: `Top 10 ${selectedTab}s`,
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };


  useEffect(() => {
    processChartData();
  }, [selectedTab, data]);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Make" value="Make" />
        <Tab label="Model" value="Model" />
        <Tab label="Electric Utility" value="Electric Utility" />
      </Tabs>

      <Box sx={{ padding: 2, marginTop: 2 }}>
        <div style={{ height: '425px' }}> 
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 10, 
                    },
                  },
                },
                tooltip: {
                  bodyFont: {
                    size: 10, 
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: 10, 
                    },
                    callback: function (value) {
                      const label = this.getLabelForValue(value);
                      return label.length > 8 ? label.slice(0, 8) + '...' : label; 
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 10, 
                    },
                  },
                },
              },
            }}
          />
        </div>
      </Box>
    </Box>
  );
};

export default BarChart;
