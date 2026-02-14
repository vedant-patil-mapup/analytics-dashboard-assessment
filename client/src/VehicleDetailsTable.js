import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const VehicleDetailsTable = ({ data, currentPage, itemsPerPage }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {['Serial Number', 'Make', 'Model', 'Year', 'Electric Range (miles)', 'DOL Vehicle ID', '2020 Census Tract', 'Type'].map((header, index) => (
                        <TableCell key={index} sx={{ textAlign: 'center', fontWeight: 700, color: '#1976d2' }}>{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((vehicle, index) => (
                    <TableRow key={vehicle.VIN}>
                        <TableCell sx={{ textAlign: 'center' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                        <TableCell sx={{ textAlign: 'center', color: '#333' }}>{vehicle.Make}</TableCell>
                        <TableCell sx={{ textAlign: 'center', color: '#333' }}>{vehicle.Model}</TableCell>
                        <TableCell sx={{ textAlign: 'center', color: '#333' }}>{vehicle['Model Year']}</TableCell>
                        <TableCell sx={{ textAlign: 'center', color: '#333' }}>{vehicle['Electric Range']}</TableCell>
                        <TableCell sx={{ textAlign: 'center', color: '#333' }}>{vehicle['DOL Vehicle ID']}</TableCell>
                        <TableCell sx={{ textAlign: 'center', color: '#333' }}>{vehicle['2020 Census Tract']}</TableCell>
                        <TableCell sx={{ textAlign: 'center', color: '#333' }}>{vehicle['Electric Vehicle Type']}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default VehicleDetailsTable;
