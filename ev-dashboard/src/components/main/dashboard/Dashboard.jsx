import { Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import teslaCar from "../../../assets/images/tesla_car_PNG47.png";
import mapev1 from "../../../assets/images/pexel1.png"; 
import mapev2 from "../../../assets/images/pexel2.png"; 
import FuelProgress from "./FuelProgress";
import { LifeBuoy, TriangleAlert } from "lucide-react";
import Tables from "./Tables";
import ChartWidget from "./ChartWidget";
import { Link } from "react-router-dom";
import CurrentConditions from "./CurrentConditions";

// Sample car data for demonstration
const carData = [
  {
    image: teslaCar,
    model: "Tesla Model X",
    vin: "5YJYGDEE1L",
    details: {
      bodyType: "SEDAN",
      color: "Red",
      gvm: "4 tons",
      registration: "123ABC",
      regExp: "2026/01/01",
      regState: "QLD",
      regStatus: "Registered",
      year: "2021",
    },
  },
  {
    image: mapev1,
    model: "Tesla Model Y",
    vin: "5YJYGDEE1L",
    details: {
      bodyType: "SEDAN",
      color: "Red",
      gvm: "4 tons",
      registration: "123ABC",
      regExp: "2026/01/01",
      regState: "QLD",
      regStatus: "Registered",
      year: "2021",
    },
  },
  {
    image: mapev2,
    model: "Tesla Model Z",
    vin: "5YJYGDEE1L",
    details: {
      bodyType: "SEDAN",
      color: "Red",
      gvm: "4 tons",
      registration: "123ABC",
      regExp: "2026/01/01",
      regState: "QLD",
      regStatus: "Registered",
      year: "2021",
    },
  },
];

const Dashboard = () => {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prevIndex) => (prevIndex + 1) % carData.length);
    }, 5000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const currentCar = carData[currentCarIndex];

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mb-5"> 
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row mt-4">
            <img src={currentCar.image} alt={currentCar.model} className="object-cover w-full h-48 md:h-80" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">{currentCar.model}</h2>
              <p className="text-sm">VIN: {currentCar.vin}</p>
              <ul className="text-sm mt-2">
                {Object.entries(currentCar.details).map(([key, value]) => (
                  <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                ))}
              </ul>
            </div>
          </div>
          <CurrentConditions />
          <Grid container spacing={2} className="mt-4">
            <Grid item xs={12} sm={6}>
              <FuelProgress />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ChartWidget />
            </Grid>
          </Grid>
          <Tables />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
