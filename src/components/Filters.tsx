import React from 'react';
import type { VehicleData } from '../types/vehicleTypes';

interface FiltersProps {
  makeFilter: string;
  cityFilter: string;
  yearFilter: string;
  typeFilter: string;
  onMakeFilterChange: (value: string) => void;
  onCityFilterChange: (value: string) => void;
  onYearFilterChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  data: VehicleData[];
}

const Filters: React.FC<FiltersProps> = ({
  makeFilter,
  cityFilter,
  yearFilter,
  typeFilter,
  onMakeFilterChange,
  onCityFilterChange,
  onYearFilterChange,
  onTypeFilterChange,
  data
}) => {
  const uniqueYears = Array.from(new Set(data.map(item => item['Model Year']))).sort();
  const uniqueTypes = Array.from(new Set(data.map(item => item['Electric Vehicle Type'])));

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Make:</label>
        <input
          type="text"
          placeholder="Filter by make..."
          value={makeFilter}
          onChange={(e) => onMakeFilterChange(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>City:</label>
        <input
          type="text"
          placeholder="Filter by city..."
          value={cityFilter}
          onChange={(e) => onCityFilterChange(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Year:</label>
        <select value={yearFilter} onChange={(e) => onYearFilterChange(e.target.value)}>
          <option value="">All Years</option>
          {uniqueYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Type:</label>
        <select value={typeFilter} onChange={(e) => onTypeFilterChange(e.target.value)}>
          <option value="">All Types</option>
          {uniqueTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
