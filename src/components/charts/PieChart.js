import React from 'react';
import { Pie } from 'react-chartjs-2';
import "../styles/PieChart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
    const chartData = {
        labels: Object.keys(data), // Labels for pie slices
        datasets: [
            {
                data: Object.values(data), // Data values for each slice
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Disable default aspect ratio
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw} EVs`;
                    },
                },
            },
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="pie-chart-container">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
