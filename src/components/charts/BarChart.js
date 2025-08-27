import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, xAxisLabel, yAxisLabel, title }) => {
    const chartData = {
        labels: Object.keys(data), // X-axis labels
        datasets: [
            {
                label: 'Data',
                data: Object.values(data), // Y-axis values
                backgroundColor: 'rgba(75, 112, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
            title: {
                display: !!title,
                text: title,
                font: { size: 16 },
            },
        },
        scales: {
            x: {
                title: { display: true, text: xAxisLabel || 'X-Axis' }, // Dynamic X-axis label
            },
            y: {
                title: { display: true, text: yAxisLabel || 'Y-Axis' }, // Dynamic Y-axis label
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;
