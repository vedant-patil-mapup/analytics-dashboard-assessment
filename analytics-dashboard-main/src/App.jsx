import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { parseCSVData, processCSVData } from './data/processData';
import TabNavigation from './components/TabNavigation';

const App = () => {
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('EV Table');
  
  const tabs = ['EV Table', 'EV Stats', 'EV Make & Model', 'EV Country & City'];

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        //Fetching the CSV file
        const response = await fetch('/data-to-visualize/Electric_Vehicle_Population_Data.csv');
        const csvText = await response.text();

        //process data
        const parsedData = parseCSVData(csvText);
        const data = processCSVData(parsedData);

        setProcessedData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!processedData) {
    return <div>Error: Unable to load data.</div>;
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Electric Vehicle Analytics Dashboard</h1>
        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Dashboard processedData={processedData} activeTab={activeTab}/>
    </div>
  );
};

export default App;
