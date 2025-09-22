import React, { useState, useEffect} from "react";
import { loadEVData } from './utils/dataLoader';
import { getEVStats } from './utils/calculations';
import Header from "./components/Header"; 
import Insights from "./components/Insights";
// import Content from "./components/Content";
import Dashboard from "./components/Dashboard";
const App = () => {

    const [evData, setEvData] = useState([]);
    const [processedData, setProcessedData] = useState(null);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadEVData();
      setEvData(data);
      const processData = getEVStats(data);
      setProcessedData(processData);
    };
    fetchData();
  }, []);
      
  return (
    <div className="flex flex-col h-screen bg-bl">
    {/* Header */}
    <Header />
    
    {/* Main Content Area */}
    <main className="flex-1 bg-bl p-4 overflow-auto">
     
      <h1 className="text-white leading-relaxed text-3xl font-bold">Dashboard</h1>
      <h2 className=" text-white/50  font-semibold">MARKET INSIGHTS</h2>
      {processedData ? <Insights stats={processedData} /> : <p>Loading...</p>}
      {processedData ? <Dashboard data={processedData} evDataRaw={evData}/> : <p>Loading...</p>}
      </main>
  </div>
  );
};

export default App;
