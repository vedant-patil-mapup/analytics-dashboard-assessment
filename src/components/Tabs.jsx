import React, { useState } from 'react'
import "../index.css"
const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div>
          <div className="tab-buttons">
       {tabs.map((tab) => (
      <button
        key={tab}
        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
        onClick={() => onTabChange(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
</div>
  )
}

export default Tabs