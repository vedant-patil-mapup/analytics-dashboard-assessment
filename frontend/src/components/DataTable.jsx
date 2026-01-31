import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const DataTable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Header configuration
    const columns = [
        { key: 'VIN (1-10)', label: 'VIN' },
        { key: 'Make', label: 'Make' },
        { key: 'Model', label: 'Model' },
        { key: 'Model Year', label: 'Year' },
        { key: 'Electric Vehicle Type', label: 'Type' },
        { key: 'Electric Range', label: 'Range (mi)' },
        { key: 'State', label: 'State' },
        { key: 'City', label: 'City' },
    ];

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
    }, [data, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (!data || data.length === 0) return null;

    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-700">
                <h3 className="text-xl font-bold text-slate-100">Vehicle Data</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-700/50 text-xs uppercase text-slate-300">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-6 py-4 font-semibold tracking-wider">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {currentData.map((row, index) => (
                            <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-slate-300">
                                        {row[col.key] || '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-700 flex items-center justify-between">
                <div className="text-sm text-slate-400">
                    Page <span className="font-semibold text-slate-100">{currentPage}</span> of <span className="font-semibold text-slate-100">{totalPages.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronsLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronsRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
