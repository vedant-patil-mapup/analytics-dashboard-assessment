
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import SummaryCard from "../components/SummaryCard";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import DataTable from "../components/DataTable";
import Papa from "papaparse";
import Map from "../components/Map"; 
import EVChart from "../components/EVChart";

const MainContent = () => {
  const [evData, setEvData] = useState([]);
  const [vehicleLocations, setVehicleLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Seattle"); 
  const [filters, setFilters] = useState({
    vin: '',
    country: '',
    city: '',
    make: '',
    model: '',
    evType: '',
  });

  useEffect(() => {
   
    Papa.parse("/Electric_Vehicle_Population_Data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        setEvData(results.data);
        const locations = results.data
          .filter(item => item['Vehicle Location'])
          .map(item => {
            const match = item['Vehicle Location'].match(/POINT \(([^ ]+) ([^ ]+)\)/);
            return match
              ? { lon: parseFloat(match[1]), lat: parseFloat(match[2]), city: item['City'] || 'Unknown' }
              : null;
          })
          .filter(location => location);
          
        setVehicleLocations(locations);
      },
      error: (error) => {
        console.error("Error loading CSV data: ", error);
      },
    });
  }, []);

  const filteredData = evData.filter(item => {
    return (
      
      (filters.country ? item['Country'] && item['Country'].toLowerCase().includes(filters.country.toLowerCase()) : true) &&
      (filters.city ? item['City'] && item['City'].toLowerCase().includes(filters.city.toLowerCase()) : true) &&
      (filters.make ? item['Make'] && item['Make'].toLowerCase().includes(filters.make.toLowerCase()) : true) &&
      (filters.model ? item['Model'] && item['Model'].toLowerCase().includes(filters.model.toLowerCase()) : true) &&
      (filters.evType ? item['Electric Vehicle Type'] && item['Electric Vehicle Type'].toLowerCase().includes(filters.evType.toLowerCase()) : true)
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));

    if (name === 'city') {
      setSelectedCity(value); 
    }
  };

  const countries = [...new Set(evData.map(item => item['County']))];
  const cities = [...new Set(evData.map(item => item['City']))];
  const makes = [...new Set(evData.map(item => item['Make']))];
  const models = [...new Set(evData.map(item => item['Model']))];
  const evTypes = [...new Set(evData.map(item => item['Electric Vehicle Type']))];
  

  const filteredLocations = vehicleLocations.filter(location => location.city === selectedCity);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Electric Vehicle Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Total EVs" value={evData.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Unique Models"
            value={new Set(evData.map((item) => item["Model"])).size}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Total Manufacturers"
            value={new Set(evData.map((item) => item["Make"])).size}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Total EV Types"
            value={new Set(evData.map((item) => item["Electric Vehicle Type"])).size}
          />
        </Grid>
      </Grid>



   
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <BarChart data={evData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <DoughnutChart data={filteredData} />
          </Paper>
        </Grid>
      </Grid>
     
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Map locations={filteredLocations} /> 
          </Paper>
        </Grid>
      </Grid>
      <Box mt={4}>

      <EVChart data={evData} />
      </Box>
     
      <Grid container spacing={3} sx={{ mt: 4 }}>
     
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value=""><em></em></MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index} value={country}>{country}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value=""><em></em></MenuItem>
              {cities.map((city, index) => (
                <MenuItem key={index} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Make</InputLabel>
            <Select
              name="make"
              value={filters.make}
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value=""><em></em></MenuItem>
              {makes.map((make, index) => (
                <MenuItem key={index} value={make}>{make}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Model</InputLabel>
            <Select
              name="model"
              value={filters.model}
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value=""><em></em></MenuItem>
              {models.map((model, index) => (
                <MenuItem key={index} value={model}>{model}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>EV Type</InputLabel>
            <Select
              name="evType"
              value={filters.evType}
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value=""><em></em></MenuItem>
              {evTypes.map((evType, index) => (
                <MenuItem key={index} value={evType}>{evType}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
   
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          
            <DataTable data={filteredData} />
         
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContent;
