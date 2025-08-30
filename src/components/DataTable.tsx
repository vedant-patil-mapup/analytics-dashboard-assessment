import React from 'react';
import type { VehicleData } from '../types/vehicleTypes';
import { PAGE_SIZE_OPTIONS } from '../constants/chartConstants';

interface DataTableProps {
  data: VehicleData[];
  currentPage: number;
  pageSize: number;
  sortField: keyof VehicleData;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof VehicleData) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  currentPage,
  pageSize,
  sortField,
  sortDirection,
  onSort,
  onPageSizeChange,
  onPageChange
}) => {
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const renderSortIndicator = (field: keyof VehicleData) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? '↑' : '↓';
    }
    return null;
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    
    return buttons;
  };

  if (data.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">🔍</div>
        <h3>No Results Found</h3>
        <p>Try adjusting your filters to see more data.</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => onSort('Make')} className="sortable">
                Make {renderSortIndicator('Make')}
              </th>
              <th onClick={() => onSort('Model')} className="sortable">
                Model {renderSortIndicator('Model')}
              </th>
              <th onClick={() => onSort('Model Year')} className="sortable">
                Year {renderSortIndicator('Model Year')}
              </th>
              <th onClick={() => onSort('City')} className="sortable">
                City {renderSortIndicator('City')}
              </th>
              <th onClick={() => onSort('Electric Range')} className="sortable">
                Range {renderSortIndicator('Electric Range')}
              </th>
              <th onClick={() => onSort('Electric Vehicle Type')} className="sortable">
                Type {renderSortIndicator('Electric Vehicle Type')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.Make}</td>
                <td>{item.Model}</td>
                <td>{item['Model Year']}</td>
                <td>{item.City}</td>
                <td>{item['Electric Range']} miles</td>
                <td>{item['Electric Vehicle Type']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
        </div>
        <div className="pagination-controls">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-numbers">
            {renderPaginationButtons()}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
