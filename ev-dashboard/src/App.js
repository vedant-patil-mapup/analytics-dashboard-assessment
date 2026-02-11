import React from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import DashboardLayout from "./pages/DashboardLayout";

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <DashboardLayout />
  </ThemeProvider>
);

export default App;
