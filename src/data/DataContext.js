
import React, { createContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

// Create the context
export const DataContext = createContext();

// Create the provider component
export const DataProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch('/Electric_Vehicle_population_Data.csv') // Fetching file from public folder
      .then((response) => response.text()) // Getting raw text content
      .then((csvText) => {
        // Parse CSV to JSON
        Papa.parse(csvText, {
          header: true, 
          dynamicTyping: true,
          complete: (result) => {
            // Set parsed data into state
            setJsonData(result.data);
            console.log(result.data);
          },
        });
      })
      .catch((error) => {
        console.error('Error loading or parsing the CSV:', error);
      });
  }, []);

  return (
    <DataContext.Provider value={jsonData}>
      {children}
    </DataContext.Provider>
  );
};
