import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const EVDataTable = ({ data }) => {
  data = data.filter((i) => i.year !== undefined);
  const columns = [
    { field: 'year', headerName: 'Year', width: 90 },
    { field: 'make', headerName: 'Make', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'fuelType', headerName: 'Fuel Type', width: 180 },
    { field: 'range', headerName: 'Range (Miles)', type: 'number', width: 150 },
    { field: 'county', headerName: 'County', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'electricUtility', headerName: 'Electric Utility', width: 150 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data.map((row, id) => ({ id, ...row }))}
        columns={columns}
        pageSize={5}
        disableColumnResize
        pagination
        // disableColumnFilter
        quickFilterIcon
        localeText={{
            toolbarDensity: 'Size',
            toolbarDensityLabel: 'Size',
            toolbarDensityCompact: 'Small',
            toolbarDensityStandard: 'Medium',
            toolbarDensityComfortable: 'Large',
          }}
          slots={{
            toolbar: GridToolbar,
          }}
        sx={{
          '& .MuiDataGrid-root': {
            '& .MuiDataGrid-cell': {
              color: 'rgba(0, 0, 0, 0.87)', // Set cell text color
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5', // Light background for header
            },
          },
        }}
      />
    </Box>
  );
};

export default EVDataTable;
