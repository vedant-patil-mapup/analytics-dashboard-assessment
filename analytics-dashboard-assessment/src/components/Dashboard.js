import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line, Scatter, PolarArea, Radar } from 'react-chartjs-2';
import Papa from 'papaparse';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import './Dashboard.css';

// Register necessary components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale
);

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        country: 'All',
        model: 'All',
        city: 'All',
        year: { min: 2000, max: 2025 },
    });

    const [barChartData, setBarChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});
    const [lineChartData, setLineChartData] = useState({});
    const [scatterChartData, setScatterChartData] = useState({});
    const [polarAreaData, setPolarAreaData] = useState({});
    const [radarData, setRadarData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/Electric_Vehicle_Population_Data.csv');
                const text = await response.text();
                Papa.parse(text, {
                    header: true,
                    complete: (results) => {
                        setData(results.data);
                        setFilteredData(results.data); // Initially, all data
                        prepareCharts(results.data);
                    },
                    error: (error) => {
                        console.error("Error parsing CSV:", error);
                    },
                });
            } catch (error) {
                console.error("Error fetching CSV:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Apply filters whenever filters change
        const applyFilters = () => {
            const filtered = data.filter(vehicle => {
                const matchesCountry = filters.country === 'All' || vehicle.County === filters.country;
                const matchesModel = filters.model === 'All' || vehicle.Model === filters.model;
                const matchesCity = filters.city === 'All' || vehicle.City === filters.city;
                const matchesYear = 
                    vehicle['Model Year'] &&
                    parseInt(vehicle['Model Year'], 10) >= filters.year.min &&
                    parseInt(vehicle['Model Year'], 10) <= filters.year.max;
                return matchesCountry && matchesModel && matchesCity && matchesYear;
            });
            setFilteredData(filtered);
            prepareCharts(filtered);
        };

        applyFilters();
    }, [filters, data]);

    const prepareCharts = (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) return;

        // Bar Chart: Count of Vehicles by Make
        const makeCount = data.reduce((acc, vehicle) => {
            acc[vehicle.Make] = (acc[vehicle.Make] || 0) + 1;
            return acc;
        }, {});
        setBarChartData({
            labels: Object.keys(makeCount),
            datasets: [{
                label: 'Number of Vehicles',
                data: Object.values(makeCount),
                backgroundColor: 'rgba(75,192,192,.6)',
            }],
        });

        // Pie Chart: Electric Vehicle Types Distribution
        const typeCount = data.reduce((acc, vehicle) => {
            acc[vehicle['Electric Vehicle Type']] = (acc[vehicle['Electric Vehicle Type']] || 0) + 1;
            return acc;
        }, {});
        setPieChartData({
            labels: Object.keys(typeCount),
            datasets: [{
                data: Object.values(typeCount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }],
        });

        // Line Chart: Average Electric Range by Model Year
        const rangeByYear = data.reduce((acc, vehicle) => {
            if (vehicle['Model Year'] && vehicle['Electric Range']) {
                acc[vehicle['Model Year']] = acc[vehicle['Model Year']] || [];
                const electricRange = parseInt(vehicle['Electric Range'], 10);
                if (!isNaN(electricRange)) {
                    acc[vehicle['Model Year']].push(electricRange);
                }
            }
            return acc;
        }, {});
        const years = Object.keys(rangeByYear);
        const averageRange = years.map(year => {
            const totalRange = rangeByYear[year].reduce((sum, range) => sum + range, 0);
            return totalRange / rangeByYear[year].length;
        });
        setLineChartData({
            labels: years,
            datasets: [{
                label: 'Average Electric Range',
                data: averageRange,
                fill: false,
                borderColor: '#742774',
            }],
        });

        // Scatter Chart: Average MSRP by Make
        const msrpByMake = data.reduce((acc, vehicle) => {
            if (vehicle.Make && vehicle['Base MSRP']) {
                acc[vehicle.Make] = acc[vehicle.Make] || [];
                const msrpValue = parseFloat(vehicle['Base MSRP']);
                if (!isNaN(msrpValue)) {
                    acc[vehicle.Make].push(msrpValue);
                }
            }
            return acc;
        }, {});
        const averageMSRP = Object.keys(msrpByMake).map(make => ({
            make,
            averageMSRP: msrpByMake[make].reduce((sum, value) => sum + value, 0) / msrpByMake[make].length,
        }));
        setScatterChartData({
            datasets: averageMSRP.map(item => ({
                label: item.make,
                data: [{ x: item.averageMSRP || 0, y: item.averageMSRP || 0 }],
                backgroundColor: 'rgba(255,99,132,.6)',
            })),
        });

        // Polar Area Chart
        setPolarAreaData({
            labels: Object.keys(typeCount),
            datasets: [{
                label: 'Electric Vehicle Types',
                data: Object.values(typeCount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }],
        });

        // Radar Chart
        setRadarData({
            labels: ['Electric Range', 'MSRP', 'Vehicle Count'],
            datasets: [{
                label: 'Vehicle Metrics',
                data: [
                    averageRange.length > 0 ? Math.max(...averageRange) : 0,
                    averageMSRP.length > 0 ? Math.max(...averageMSRP.map(m => m.averageMSRP)) : 0,
                    Object.values(makeCount).length > 0 ? Math.max(...Object.values(makeCount)) : 0,
                ],
                backgroundColor: 'rgba(75,192,192,.2)',
                borderColor: '#742774',
                borderWidth: 1,
            }],
        });
    };

    return (
        <div className="dashboard">
            <h1>Electric Vehicle Dashboard</h1>
            <div className="filters">
                <select onChange={(e) => setFilters({ ...filters, country: e.target.value })}>
                    <option value="All">All Countries</option>
                    {[...new Set(data.map(vehicle => vehicle.County))].map(county => (
                        <option key={county} value={county}>{county}</option>
                    ))}
                </select>
                <select onChange={(e) => setFilters({ ...filters, model: e.target.value })}>
                    <option value="All">All Models</option>
                    {[...new Set(data.map(vehicle => vehicle.Model))].map(model => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
                <select onChange={(e) => setFilters({ ...filters, city: e.target.value })}>
                    <option value="All">All Cities</option>
                    {[...new Set(data.map(vehicle => vehicle.City))].map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <input
                    type="range"
                    min="2000"
                    max="2025"
                    value={filters.year.max}
                    onChange={(e) => setFilters({ ...filters, year: { ...filters.year, max: parseInt(e.target.value, 10) } })}
                />
                <span>Year: {filters.year.max}</span>
            </div>

            {/* Render charts */}
            <div className="chart-container">
                <div className="row-1">
                    <h2>Number of Vehicles by Make</h2>
                    {barChartData.labels && <div className="chart"><Bar data={barChartData} /></div>}
                </div>

                <div className="row-2">
                    <h2>Electric Vehicle Types Distribution</h2>
                    {pieChartData.labels && <div className="chart"><Pie data={pieChartData} /></div>}
                    <h2>Average Electric Range by Model Year</h2>
                    {lineChartData.labels && <div className="chart"><Line data={lineChartData} /></div>}
                </div>

                <div className="row-3">
                    <h2>Average MSRP by Make</h2>
                    {scatterChartData.datasets && <div className="chart"><Scatter data={scatterChartData} /></div>}
                    <h2>Electric Vehicle Types Polar Area</h2>
                    {polarAreaData.labels && <div className="chart"><PolarArea data={polarAreaData} /></div>}
                </div>

                <div className="row-4">
                    <h2>Vehicle Metrics Radar</h2>
                    {radarData.labels && <div className="chart"><Radar data={radarData} /></div>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;



