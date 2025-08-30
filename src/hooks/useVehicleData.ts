import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import type { VehicleData, ChartData, SummaryStats } from '../types/vehicleTypes';
import { INITIAL_PAGE_SIZE, INITIAL_SORT_FIELD, INITIAL_SORT_DIRECTION } from '../constants/chartConstants';

export const useVehicleData = () => {
  const [data, setData] = useState<VehicleData[]>([]);
  const [filteredData, setFilteredData] = useState<VehicleData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [sortField, setSortField] = useState<keyof VehicleData>(INITIAL_SORT_FIELD);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(INITIAL_SORT_DIRECTION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [makeFilter, setMakeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch('/Electric_Vehicle_Population_Data.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch CSV data');
        }
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            if (results.errors && results.errors.length > 0) {
              setError('Error parsing CSV data');
              return;
            }
            setData(results.data);
            setFilteredData(results.data);
            setLoading(false);
          },
          error: (error: any) => {
            setError('Error parsing CSV data');
            setLoading(false);
          }
        });
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...data];
    
    if (makeFilter) {
      filtered = filtered.filter(item => 
        item.Make.toLowerCase().includes(makeFilter.toLowerCase())
      );
    }
    
    if (cityFilter) {
      filtered = filtered.filter(item => 
        item.City.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }
    
    if (yearFilter) {
      filtered = filtered.filter(item => item['Model Year'] === yearFilter);
    }
    
    if (typeFilter) {
      filtered = filtered.filter(item => item['Electric Vehicle Type'] === typeFilter);
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, makeFilter, cityFilter, yearFilter, typeFilter, sortField, sortDirection]);

  const chartData = useMemo((): ChartData => {
    const makeDistribution = data.reduce((acc: any, item) => {
      acc[item.Make] = (acc[item.Make] || 0) + 1;
      return acc;
    }, {});
    
    const makeChartData = Object.entries(makeDistribution)
      .map(([make, count]) => ({ make, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const cityDistribution = data.reduce((acc: any, item) => {
      acc[item.City] = (acc[item.City] || 0) + 1;
      return acc;
    }, {});
    
    const cityChartData = Object.entries(cityDistribution)
      .map(([city, count]) => ({ city, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const yearDistribution = data.reduce((acc: any, item) => {
      acc[item['Model Year']] = (acc[item['Model Year']] || 0) + 1;
      return acc;
    }, {});
    
    const yearChartData = Object.entries(yearDistribution)
      .map(([year, count]) => ({ year, count: count as number }))
      .sort((a, b) => a.year.localeCompare(b.year));

    const rangeData = data
      .filter(item => item['Electric Range'] && item['Electric Range'] !== '0')
      .map(item => ({
        range: parseInt(item['Electric Range']),
        make: item.Make
      }))
      .filter(item => !isNaN(item.range));

    const typeDistribution = data.reduce((acc: any, item) => {
      acc[item['Electric Vehicle Type']] = (acc[item['Electric Vehicle Type']] || 0) + 1;
      return acc;
    }, {});

    const typeChartData = Object.entries(typeDistribution)
      .map(([type, count]) => ({ type, count: count as number }));

    return {
      makeChartData,
      cityChartData,
      yearChartData,
      rangeData,
      typeChartData
    };
  }, [data]);

  const summaryStats = useMemo((): SummaryStats => {
    const totalVehicles = data.length;
    const uniqueMakes = new Set(data.map(item => item.Make)).size;
    const uniqueCities = new Set(data.map(item => item.City)).size;
    const avgRange = data
      .filter(item => item['Electric Range'] && item['Electric Range'] !== '0')
      .reduce((sum, item) => sum + parseInt(item['Electric Range']), 0) / 
      data.filter(item => item['Electric Range'] && item['Electric Range'] !== '0').length;

    return {
      totalVehicles,
      uniqueMakes,
      uniqueCities,
      avgRange: Math.round(avgRange) || 0
    };
  }, [data]);

  const handleSort = (field: keyof VehicleData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    filteredData,
    currentPage,
    pageSize,
    sortField,
    sortDirection,
    loading,
    error,
    makeFilter,
    cityFilter,
    yearFilter,
    typeFilter,
    chartData,
    summaryStats,
    setMakeFilter,
    setCityFilter,
    setYearFilter,
    setTypeFilter,
    handleSort,
    handlePageSizeChange,
    handlePageChange
  };
};
