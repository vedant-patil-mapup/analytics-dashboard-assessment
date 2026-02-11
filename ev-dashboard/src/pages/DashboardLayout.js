import React from "react";
import { Toolbar, Box, Grid } from "@mui/material";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MainContent from "./MainContent";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />

      <Box
        component="main"
        sx={{ flexGrow: 1, px: 3, py: 6 }}
      >
        <Toolbar />

        <MainContent />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
