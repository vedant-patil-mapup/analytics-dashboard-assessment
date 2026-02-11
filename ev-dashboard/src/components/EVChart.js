
import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EVChart = ({ data }) => {

  const evsByYear = {};
  data.forEach((item) => {
    const year = item["Model Year"];
    if (year) evsByYear[year] = (evsByYear[year] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(evsByYear),
    datasets: [
      {
        label: 'EVs by Year',
        data: Object.values(evsByYear),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

 
  useEffect(() => {
    return () => {
      ChartJS.getChart("evChartCanvas")?.destroy();
    };
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>EV Distribution by Year</Typography>
        <Bar id="evChartCanvas" data={chartData} />
      </CardContent>
    </Card>
  );
};

export default EVChart;
