import React from 'react';
import "../App.css"

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => (
  <div className="tab-navigation">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={activeTab === tab ? 'active' : ''}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabNavigation;
