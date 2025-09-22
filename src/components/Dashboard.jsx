
import React, { useState } from 'react';
import EVMarketLandscape from './EVMarketLandscape';
// import EVPerformance from './EVPerformance';
import EVManufacturer from './EVManufacturer';
import RegionalAdoption from './RegionalAdoption';
import Tabs from './Tabs';

const Dashboard = ({ data, evDataRaw }) => {
  const [activeTab, setActiveTab] = useState('EV Market Landscape');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const tabs = ['EV Market Landscape', 'EV Maker Focus', 'Regional Adoption'];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="tab-content">
        {activeTab === 'EV Market Landscape' && (
          <EVMarketLandscape data={data} />
        )}
        {/* {activeTab === 'EV Performance' && (
          <EVPerformance data={data} />
        )} */}
        {activeTab === 'EV Maker Focus' && (
          <EVManufacturer data={data} />
        )}
        {activeTab === 'Regional Adoption' && (
          <RegionalAdoption data={data} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
