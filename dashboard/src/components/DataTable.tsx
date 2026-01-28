"use client";

import React, { useState } from 'react';
import { EVRecord } from '../types/ev-data';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface DataTableProps {
    data: EVRecord[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof EVRecord; direction: 'asc' | 'desc' } | null>(null);

    const itemsPerPage = 10;

    // Filter
    const filteredData = data.filter(record =>
        record.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort
    const sortedData = React.useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    // Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const requestSort = (key: keyof EVRecord) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (name: keyof EVRecord) => {
        if (!sortConfig || sortConfig.key !== name) return null;
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="text-lg font-semibold text-slate-800">Vehicle Data Exploration</h3>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search make, model, city..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-800 font-medium">
                        <tr>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('vin')}>VIN {getSortIcon('vin')}</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('make')}>Make {getSortIcon('make')}</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('model')}>Model {getSortIcon('model')}</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('modelYear')}>Year {getSortIcon('modelYear')}</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('city')}>City {getSortIcon('city')}</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('evType')}>Type {getSortIcon('evType')}</th>
                            <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('electricRange')}>Range (mi) {getSortIcon('electricRange')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {currentData.length > 0 ? currentData.map((record) => (
                            <tr key={record.vin} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">{record.vin}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{record.make}</td>
                                <td className="px-6 py-4">{record.model}</td>
                                <td className="px-6 py-4">{record.modelYear}</td>
                                <td className="px-6 py-4">{record.city}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.evType === 'Battery Electric Vehicle (BEV)'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {record.evType === 'Battery Electric Vehicle (BEV)' ? 'BEV' : 'PHEV'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{record.electricRange}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                                    No results found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                    Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, sortedData.length)}</span> of <span className="font-medium">{sortedData.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-medium text-slate-700">Page {currentPage} of {totalPages || 1}</span>
                    <button
                        className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
