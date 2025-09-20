import { useCallback, useEffect, useState } from "react";
import Electric_Vehicle_Population_Data from "../data-to-visualize/Electric_Vehicle_Population_Data.csv"
import { parseCSVData, processCSVData } from "./component/utils/dataProcessing";
import { Header } from "./component/Header";
import { TabNavigation } from "./component/TabNavigation";
import { DashboardContent } from "./DashboardContent";

export default function App() {
  const [processedData, setProcessedData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      fetch(Electric_Vehicle_Population_Data)
        .then(response => response.text())
        .then(csvText => {
          const parsedData = parseCSVData(csvText);
          const processed = processCSVData(parsedData);
          setProcessedData(processed);
        })
        .catch(err => {
          setError("Error loading default data: " + err.message);
        });
    } catch (err) {
      setError("Error loading default data: " + err.message);
    }
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
      {error && <p>{error}</p>}
      {processedData && <Header data={processedData} />}
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        {processedData && (
          <DashboardContent 
            data={processedData}
            activeTab={activeTab}
            isLoading={!processedData || isLoading} 
          />
        )}
      </div>
    </div>
  );
}