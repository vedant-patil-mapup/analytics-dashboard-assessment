import React, { useState } from 'react';
import TabNavigation from './components/TabNavigation';
import Overview from './components/EVStats';
import EVMakeModel from './components/EVMakeModel';
import EVCountryCity from './components/EVCountryCity';
import EVTable from './components/EVTable';

const Dashboard = ({ processedData,activeTab }) => {

  console.log(processedData.topTenEVs)
  console.log(processedData.modelPercentages)



  const formatTopTenEVs = (vehicles) =>
    vehicles.map((vehicle) => ({
      model: `${vehicle.Make} ${vehicle.Model}`,
      range: vehicle["Electric Range"] || 'N/A', 
      cafvEligibility: vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]==="Clean Alternative Fuel Vehicle Eligible"?'Eligible':'Not Eligible',
    }));
  
    
  return (
    <>
      {/* Render Components Based on Active Tab */}
      {activeTab === 'EV Table' && (
        <EVTable data={formatTopTenEVs(processedData.topTenEVs)} percentages={processedData.modelPercentages} />
      )}
      {activeTab === 'EV Stats' && (
        <Overview stats={processedData.stats} byType={processedData.byType} byYear={processedData.byYear} />
      )}
      {activeTab === 'EV Make & Model' && (
        <EVMakeModel byMake={processedData.byMake} byModel={processedData.byModel} />
      )}
      {activeTab === 'EV Country & City' && (
        <EVCountryCity byCounty={processedData.byCounty} byCity={processedData.byCity} />
      )}
      
    </>
  );
};

export default Dashboard;
