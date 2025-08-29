import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import Papa from 'papaparse';

const Dashboard: React.FC = () => {

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetch('/Electric_Vehicle_Population_Data.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            console.log(results.data);
            setData(results.data);
          }
        });
      });
  }, []);


  return (
    <h1>Dashboard</h1>
  );
};

export default Dashboard;
