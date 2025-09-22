import React from "react";
import { Search, X, ChevronDown } from "lucide-react";
import type { FilterState } from "../types/EVTypes";
import { getThemeClasses } from "../constants/theme";

// Props type definition for FilterPanel
interface FilterPanelProps {
  filters: FilterState; 
  filterOptions: {
    states: string[];
    counties: string[];
    cities: string[];
    makes: string[];
    models: string[];
    years: string[];
    evTypes: string[];
    cafvEligibility: string[];
  };
  updateFilter: (key: keyof FilterState, value: string) => void; 
  clearFilters: () => void; 
  setShowFilters: (show: boolean) => void;
  isDark: boolean; 
}

//FilterPanel Component
const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  filterOptions,
  updateFilter,
  clearFilters,
  setShowFilters,
  isDark,
}) => {

  const theme = getThemeClasses(isDark);

  // Configurations for dropdown filters
  const filterConfigs = [
    { key: "state" as keyof FilterState, label: "State", options: filterOptions.states },
    { key: "county" as keyof FilterState, label: "County", options: filterOptions.counties },
    { key: "city" as keyof FilterState, label: "City", options: filterOptions.cities },
    { key: "make" as keyof FilterState, label: "Make", options: filterOptions.makes },
    { key: "year" as keyof FilterState, label: "Year", options: filterOptions.years },
    { key: "evType" as keyof FilterState, label: "EV Type", options: filterOptions.evTypes },
  ];

  return (
    <div
      className={`border-b shadow-sm ${theme.border} ${
        isDark ? "bg-gray-800" : "bg-gray-50"
      } px-4 sm:px-6 py-3 sm:py-4`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-[16px] sm:text-[17px] font-medium">Filters</h3>
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Clear all filters */}
          <button
            onClick={clearFilters}
            className="text-[13px] sm:text-sm text-red-500 hover:text-red-600 hover:scale-105 cursor-pointer hover:border-b border-dashed"
          >
            Clear All
          </button>

          {/* Close filter panel (for mobile/tablet views) */}
          <button
            onClick={() => setShowFilters(false)}
            className={`p-1 border border-gray-300 rounded-xl cursor-pointer shadow-md ${
              isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            <X className="h-3 sm:h-4 w-3 sm:w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {/*  Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-4.5 transform -translate-y-1/2 h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className={`pl-8 sm:pl-10 pr-4 py-1.5 text-[13.5px] sm:text-[14.5px] w-full rounded-xl border ${theme.input}`}
          />
        </div>

        {/* Filter Dropdowns */}
        {filterConfigs.map(({ key, label, options }) => (
          <div key={key} className="relative">
            <select
              value={filters[key]}
              onChange={(e) => updateFilter(key, e.target.value)}
              className={`w-full px-3 py-1.5 rounded-xl text-[13.5px] sm:text-[14.5px] border appearance-none ${theme.input}`}
            >
              {/* Default option for "All" */}
              <option value="">{label} (All)</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Dropdown arrow icon */}
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
