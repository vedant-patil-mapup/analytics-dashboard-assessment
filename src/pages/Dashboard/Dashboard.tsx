import React from 'react';
import './dashboard.scss';
import { useVehicleData } from '../../hooks/useVehicleData';
import {
  SummaryCards,
  ChartContainer,
  VehicleTypesChart,
  YearlyChart,
  Filters,
  DataTable,
  LoadingSpinner,
  ErrorDisplay
} from '../../components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../constants/chartConstants';

const Dashboard: React.FC = () => {
  const {
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
  } = useVehicleData();

  if (loading) {
    return (
      <div className="dashboard">
        <LoadingSpinner message="Loading electric vehicle data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <ErrorDisplay error={error} />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Electric Vehicle Analytics Dashboard</h1>
        <p>Comprehensive insights from {summaryStats.totalVehicles.toLocaleString()} vehicle records</p>
      </div>

      <SummaryCards stats={summaryStats} />

      <div className="charts-section">
        <div className="chart-row">
          <ChartContainer title="Top 10 Vehicle Makes">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData.makeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="make" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <ChartContainer title="Vehicle Types Distribution">
            <VehicleTypesChart 
              data={chartData.typeChartData} 
              totalVehicles={summaryStats.totalVehicles} 
            />
          </ChartContainer>
        </div>

                 <div className="chart-row secondary">
           <ChartContainer title="Vehicle Count by Model Year">
             <YearlyChart data={chartData.yearChartData} />
           </ChartContainer>
         </div>
      </div>

      <Filters
        makeFilter={makeFilter}
        cityFilter={cityFilter}
        yearFilter={yearFilter}
        typeFilter={typeFilter}
        onMakeFilterChange={setMakeFilter}
        onCityFilterChange={setCityFilter}
        onYearFilterChange={setYearFilter}
        onTypeFilterChange={setTypeFilter}
        data={data}
      />

      <div className="data-section">
        <div className="table-header">
          <h3>Vehicle Data</h3>
          <div className="table-controls">
            <label>Show:</label>
            <select value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <DataTable
          data={filteredData}
          currentPage={currentPage}
          pageSize={pageSize}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
