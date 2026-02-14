import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Box, Typography, Card, CardContent, CardHeader, Button } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SpeedIcon from '@mui/icons-material/Speed';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import VehicleDetailsTable from './VehicleDetailsTable';

export default function EVDashboard() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            Papa.parse('/Electric_Vehicle_Population_Data.csv', {
                download: true,
                header: true,
                complete: (result) => {
                    const cleanedData = result.data
                        .filter((vehicle) => vehicle['Make'] && vehicle['Model Year']) // Remove empty rows
                        .map((vehicle) => ({
                            ...vehicle,
                            'Electric Range': parseFloat(vehicle['Electric Range']) || 0,
                            'Model Year': parseInt(vehicle['Model Year']) || new Date().getFullYear(),
                        }));
                    setData(cleanedData);
                },
                error: (error) => {
                    console.error('Error loading CSV data:', error);
                },
            });
        };
        fetchData();
    }, []);

    const totalVehicles = data.length;
    const averageElectricRange = totalVehicles
        ? data.reduce((sum, vehicle) => sum + vehicle['Electric Range'], 0) / totalVehicles
        : 0;
    const totalElectricRange = data.reduce((sum, vehicle) => sum + vehicle['Electric Range'], 0);
    const averageVehicleAge = totalVehicles
        ? new Date().getFullYear() - data.reduce((sum, vehicle) => sum + vehicle['Model Year'], 0) / totalVehicles
        : 0;

    const makeDistribution = data.reduce((acc, vehicle) => {
        acc[vehicle.Make] = (acc[vehicle.Make] || 0) + 1;
        return acc;
    }, {});
    const mostCommonMake = Object.entries(makeDistribution).reduce((a, b) => (b[1] > a[1] ? b : a), ['N/A', 0])[0];

    const makeData = Object.entries(makeDistribution)
        .map(([make, count]) => ({ make, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    const vehicleTypeDistribution = data.reduce((acc, vehicle) => {
        if (vehicle['Electric Vehicle Type']) { // Exclude undefined or empty vehicle types
            acc[vehicle['Electric Vehicle Type']] = (acc[vehicle['Electric Vehicle Type']] || 0) + 1;
        }
        return acc;
    }, {});
    const vehicleTypeData = Object.entries(vehicleTypeDistribution).map(([type, count]) => ({
        type,
        count,
        percentage: ((count / totalVehicles) * 100).toFixed(1),
    }));

    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    const stats = [
        { title: 'Total Vehicles', value: totalVehicles, icon: <DirectionsCarIcon sx={{ color: '#1976d2' }} /> },
        { title: 'Average Electric Range', value: `${averageElectricRange.toFixed(2)} miles`, icon: <SpeedIcon sx={{ color: '#1976d2' }} /> },
        { title: 'Total Electric Range', value: `${totalElectricRange.toFixed(2)} miles`, icon: <ElectricCarIcon sx={{ color: '#1976d2' }} /> },
        { title: 'Average Vehicle Age', value: `${averageVehicleAge.toFixed(0)} years`, icon: <EventIcon sx={{ color: '#1976d2' }} /> },
        { title: 'Most Common Make', value: mostCommonMake, icon: <StarIcon sx={{ color: '#1976d2' }} /> },
    ];

    return (
        <Box sx={{ padding: '16px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'blue', fontWeight: 'bold' }}>
                Electric Vehicle Dashboard
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={2}>
                {stats.map((item, index) => (
                    <Box key={index} flexBasis={{ xs: '100%', sm: '48%', md: '30%' }}>
                        <Card sx={{
                            backgroundColor: '#fff',
                            boxShadow: 3,
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 6,
                            },
                        }}>
                            <CardHeader
                                avatar={item.icon}
                                title={<Typography sx={{ color: '#1976d2' }}>{item.title}</Typography>}
                            />
                            <CardContent>
                                <Typography variant="h5" sx={{ color: '#333' }}>{item.value}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>

            <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                <Box flexBasis={{ xs: '100%', md: '48%' }}>
                    <Card sx={{ backgroundColor: '#fff', boxShadow: 3 }}>
                        <CardHeader title={<Typography sx={{ color: '#1976d2' }}>Top 10 Vehicle Makes</Typography>} />
                        <CardContent>
                            <Box sx={{ backgroundColor: '#e8f5e9', padding: 2 }}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={makeData}>
                                        <XAxis dataKey="make" tick={{ fill: '#333', fontSize: 12 }} />
                                        <YAxis tick={{ fill: '#333' }} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#1976d2" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <Box flexBasis={{ xs: '100%', md: '48%' }}>
                    <Card sx={{ backgroundColor: '#fff', boxShadow: 3 }}>
                        <CardHeader title={<Typography sx={{ color: '#1976d2' }}>Vehicle Type Distribution</Typography>} />
                        <CardContent>
                            <Box sx={{ backgroundColor: '#e8f5e9', padding: 2 }}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={vehicleTypeData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884D8"
                                            dataKey="count"
                                            label={({ type, percentage }) => `${type} ${percentage}%`}
                                        >
                                            {vehicleTypeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Box mt={2}>
                <VehicleDetailsTable data={paginatedData} currentPage={currentPage} itemsPerPage={itemsPerPage} />
                <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        startIcon={<ChevronLeftIcon />}
                    >
                        Previous
                    </Button>
                    <Typography variant="body1" sx={{ margin: '0 16px', color: '#333' }}>
                        Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
                    </Typography>
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                        endIcon={<ChevronRightIcon />}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
