import { TABS } from "./utils/constants";

/* eslint-disable react/prop-types */
export const TabButton = ({ label, icon: Icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 
      ${isActive 
        ? "bg-blue-100 text-blue-800 shadow-sm text-blue" 
        : "hover:bg-blue-50 text-gray-600 text-white" 
      }`}
  >
    <Icon className="w-4 h-4 mr-2" />
    {label}
  </button>
);

export const TabNavigation = ({ activeTab, onTabChange }) => (
  <div className="flex space-x-4 mb-8 overflow-x-auto">
    {TABS.map(({ id, label, Icon }) => (
      <TabButton
        key={id}
        tab={id}
        label={label}
        icon={Icon}
        isActive={activeTab === id}
        onClick={() => onTabChange(id)}
      />
    ))}
  </div>
);
