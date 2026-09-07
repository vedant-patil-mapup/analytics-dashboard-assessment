import { Container, Grid } from "@mui/material";
import React from "react";
import teslaCar from "../../../assets/images/tesla_car_PNG47.png";
import mapev from "../../../assets/images/ev-map.jpg"; 
import FuelProgress from "./FuelProgress";
import { LifeBuoy, TriangleAlert } from "lucide-react";
import Tables from "./Tables";
import ChartWidget from "./ChartWidget";
import { Link } from "react-router-dom";
import CurrentConditions from "./CurrentConditions";

const Dashboard = () => {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

        <div className="mb-5"> 
            <Container maxWidth="xxl"> 
                <CurrentConditions />
            </Container>
        </div>
      <Container maxWidth="xxl">
        <Grid container spacing={2}> 
          <Grid item lg="8" md="8" sm="12" xs="12">
            <div className="bg-white p-4 rounded-xl border border-zinc-100">
              <Grid container spacing={1}>
                <Grid item lg="9">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <h4 className="text-md font-bold">Tesla Model X</h4>
                      <span className="text-slate-500 text-sm">
                        MPGHDRSNGA0954GSJ
                      </span>
                    </div>
                    <div className="my-9">
                      <FuelProgress />
                    </div>
                    <div className="">
                      <img
                        src={teslaCar}
                        alt=""
                        className="w-full object-contain"
                      />
                      {/* <video src={videos} width="100%" height="100%" autoPlay/> */}
                    </div>
                    <div className="my-5">
                      <div className="flex gap-10 items-center justify-around">
                        <div className="flex gap-10 items-center justify-center">
                          <div className="text-center">
                            <div className="flex items-center gap-2">
                              <LifeBuoy
                                size={15}
                                className="text-gray-500 m-auto"
                              />
                              <span className="text-xs">Left</span>
                            </div>
                            <h6 className="text-xl">35 psi</h6>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-2">
                              <LifeBuoy
                                size={15}
                                className="text-gray-500 m-auto"
                              />
                              <span className="text-xs">Right</span>
                            </div>
                            <h6 className="text-xl">40 psi</h6>
                          </div>
                        </div>
                        <div className="flex gap-10 items-center justify-center">
                          <div className="text-center">
                            <div className="flex items-center gap-2">
                              <LifeBuoy
                                size={15}
                                className="text-gray-500 m-auto"
                              />
                              <span className="text-xs">Left</span>
                            </div>
                            <h6 className="text-xl">29 psi</h6>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-2">
                              <TriangleAlert
                                size={15}
                                className="text-red-600 m-auto"
                              />
                              <span className="text-xs text-red-600">
                                Right
                              </span>
                            </div>
                            <h6 className="text-xl">15 psi</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item lg="3">
                  <div className="">
                    <div className="bg-slate-50 rounded-lg p-2 mb-2">
                      <img src={mapev} alt="" className="w-full rounded-lg" />
                    </div> 
                    <div className="bg-slate-50 rounded-lg p-3">
                      <ul>
                        <li className="mb-1 text-sm">
                          Body Type: <b>UTILITY CAB</b>
                        </li>
                        <li className="mb-1 text-sm">
                          Color: <b>White</b>
                        </li>
                        <li className="mb-1 text-sm">
                          GVM: <b>5 tons</b>
                        </li>
                        <li className="mb-1 text-sm">
                          Registration: <b>367VYJ</b>
                        </li>
                        <li className="mb-1 text-sm">
                          Registration Exp.: <b>2025/01/01</b>
                        </li>
                        <li className="mb-1 text-sm">
                          Registration State: <b>QLD</b>
                        </li>
                        <li className="mb-1 text-sm">
                          Registration Status: <b>Registed</b>
                        </li>
                        <li className="mb-1 text-sm">
                          Year: <b>2020</b>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item lg="4" md="4" sm="12" xs="12">
            <div className="bg-white p-2 rounded-xl border border-cyan-50 shadow-sm ">
              <ChartWidget />
                <div className="mt-2">
                    <div class="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold">Reminders</h4>
                        <Link to="/" className="text-sm text-amber-600">
                            View All
                        </Link>
                    </div>
                    <div className="mb-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="border-l-4 border-blue-500">
                                <h6 className="text-blue-500 ml-2">155 000km</h6>
                                <span className="text-xs ml-2 text-gray-500">18/07/2024</span>
                            </div>
                            <div className="border-l-4 border-blue-500">
                                <h6 className="text-blue-500 ml-2">155 000km</h6>
                                <span className="text-xs ml-2 text-gray-500">18/07/2024</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="border-l-4 border-blue-500 mb-2">
                                <h6 className="text-blue-500 ml-2">155 000km</h6>
                                <span className="text-xs ml-2 text-gray-500">18/07/2024</span>
                            </div>
                            <div className="border-l-4 border-blue-500 mb-2">
                                <h6 className="text-blue-500 ml-2">155 000km</h6>
                                <span className="text-xs ml-2 text-gray-500">18/07/2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </Grid>
          <Grid item lg="12" md="12" sm="12" xs="12">
            <div className="tableContainer">
              <Tables />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
