import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Card, CardContent, Typography } from '@mui/material';
import Papa from 'papaparse';
import { useTheme } from './components/ThemeContext';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import EVDataTable from './components/DataTable';
import './App.css';
import Doughnut from './components/DoughnutChart';
import Filters from './components/Filters';
import PolarAreaChart from './components/PolarAreaChart';

function App() {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    Papa.parse('/Electric_Vehicle_Population_Data.csv', {
      download: true,
      header: true,
      complete: function(results) {
        const parsedData = results.data.map(item => ({
          year: item['Model Year'],
          make: item['Make'],
          model: item['Model'],
          fuelType: item['Electric Vehicle Type'],
          range: parseInt(item['Electric Range'], 10),
          county: item['County'],
          city: item['City'],
          electricUtility: item['Electric Utility'],
          id: item['VIN (1-10)'],
        }));
        setData(parsedData);
        setFilteredData(parsedData);
      },
    });
  }, []);

  const handleFilterChange = (filters) => {
    const filtered = data.filter(item => {
      return (
        (filters.year ? item.year === filters.year : true) &&
        (filters.make ? item.make === filters.make : true)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4, mb: 4 }}>
          Electric Vehicle Population Dashboard
        </Typography>
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mb={5}>
        <Filters data={data} onFilterChange={handleFilterChange} />
      </Box>

      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                EV Population Over Time
              </Typography>
              <LineChart data={filteredData} />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Top EV Manufacturers
              </Typography>
              <BarChart data={filteredData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Fuel Type
              </Typography>
              <Doughnut data={filteredData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                EV Models by Make
              </Typography>
              <PolarAreaChart data={filteredData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                EV Data Table
              </Typography>
              <EVDataTable data={filteredData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
