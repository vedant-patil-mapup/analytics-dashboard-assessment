import React, { useState } from 'react';

const Filters = ({ data, onFilterChange }) => {
  const [filters, setFilters] = useState({ year: ''});

  const handleFilterUpdate = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a);
  const makes = [...new Set(data.map((item) => item.make))].sort();

  return (
    <div className="filters">
      <select style={{marginRight: '20px', height:'30px', width:'100px'}} name="year" value={filters.year} onChange={handleFilterUpdate}>
        <option value="">Select Year</option>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select style={{marginRight: '20px', height:'30px', width:'100px'}} name="make" value={filters.make} onChange={handleFilterUpdate}>
        <option value="">Select Make</option>
        {makes.map((make, index) => (
          <option key={index} value={make}>
            {make}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
