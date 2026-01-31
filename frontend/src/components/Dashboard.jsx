import React, { useMemo } from 'react';
import { useEVData } from '../hooks/useEVData';
import { Loader2 } from 'lucide-react';
import { calculateMetrics } from '../utils/metrics';
import SummaryCards from './SummaryCards';
import TopMakesChart from './charts/TopMakesChart';
import GrowthChart from './charts/GrowthChart';
import RangeChart from './charts/RangeChart';
import DataTable from './DataTable';

const Dashboard = () => {
    const { data, loading, error } = useEVData();

    const metrics = useMemo(() => calculateMetrics(data), [data]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-white">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <span className="ml-3 text-lg font-medium">Loading Dataset...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-red-500">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Error Loading Data</h2>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        EV Analytics Dashboard
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Detailed insights into {metrics?.totalEVs.toLocaleString()} electric vehicle records.
                    </p>
                </header>

                <SummaryCards metrics={metrics} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <GrowthChart data={metrics?.yearDistribution} />
                    <TopMakesChart data={metrics?.topMakes} />
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <RangeChart data={metrics?.rangeDistribution} />
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <DataTable data={data} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
