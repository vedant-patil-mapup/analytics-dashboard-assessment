import React from 'react';
import { Car, Battery, Zap, CheckCircle2 } from 'lucide-react';

const Card = ({ title, value, icon: Icon, color }) => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex items-center justify-between">
        <div>
            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold mt-2 text-slate-100">{value}</p>
        </div>
        <div className={`p-4 rounded-full ${color} bg-opacity-20`}>
            <Icon className={`h-8 w-8 ${color.replace('bg-', 'text-')}`} />
        </div>
    </div>
);

const SummaryCards = ({ metrics }) => {
    if (!metrics) return null;

    const { totalEVs, avgRange, evTypeCounts, cafvCounts } = metrics;

    // Format numbers
    const formattedTotal = totalEVs.toLocaleString();

    // Get count of BEVs
    const bevCount = evTypeCounts['Battery Electric Vehicle (BEV)'] || 0;
    const bevPercentage = Math.round((bevCount / totalEVs) * 100);

    // Get count of Eligible cars
    const eligibleCount = cafvCounts['Clean Alternative Fuel Vehicle Eligible'] || 0;
    const eligiblePercentage = Math.round((eligibleCount / totalEVs) * 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card
                title="Total Vehicles"
                value={formattedTotal}
                icon={Car}
                color="text-blue-500 bg-blue-500"
            />
            <Card
                title="Avg Electric Range"
                value={`${avgRange} mi`}
                icon={Battery}
                color="text-emerald-500 bg-emerald-500"
            />
            <Card
                title="BEV Adoption"
                value={`${bevPercentage}%`}
                icon={Zap}
                color="text-yellow-500 bg-yellow-500"
            />
            <Card
                title="CAFV Eligible"
                value={`${eligiblePercentage}%`}
                icon={CheckCircle2}
                color="text-purple-500 bg-purple-500"
            />
        </div>
    );
};

export default SummaryCards;
