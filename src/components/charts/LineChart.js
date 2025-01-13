import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
// import "../styles/LineChart.css";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register all necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement, // Register the PointElement
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ data }) => {
    useEffect(() => {
        // Cleanup function to destroy the chart when the component is unmounted
        return () => {
            if (window.myChart) {
                window.myChart.destroy();
            }
        };
    }, []);

    // Prepare data for the line chart
    const chartData = {
        labels: Object.keys(data), // Years
        datasets: [
            {
                label: 'EV Adoption by Year',
                data: Object.values(data), // Number of EVs per year
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'EV Adoption by Year',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `EVs: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of EVs',
                },
            },
        },
    };

    return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
