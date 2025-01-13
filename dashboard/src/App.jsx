import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BarChartPage from "./pages/BarChartPage";
import LineChartPage from "./pages/LineChartPage";
import PieChartPage from "./pages/PieChartPage";
import TableDisplay from "./pages/TableDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bar-chart" element={<BarChartPage />} />
        <Route path="/line-chart" element={<LineChartPage />} />
        <Route path="/pie-chart" element={<PieChartPage />} />
        <Route path="/table" element={<TableDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
