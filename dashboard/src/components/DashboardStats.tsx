import React from 'react';
import { EVRecord } from '../types/ev-data';
import { TrendingUp, Battery, Zap, Car } from 'lucide-react';

interface DashboardStatsProps {
    data: EVRecord[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
    const totalVehicles = data.length;

    const bevCount = data.filter(r => r.evType === 'Battery Electric Vehicle (BEV)').length;
    const bevPercentage = totalVehicles > 0 ? ((bevCount / totalVehicles) * 100).toFixed(1) : '0';

    const avgRange = totalVehicles > 0
        ? (data.reduce((acc, curr) => acc + curr.electricRange, 0) / totalVehicles).toFixed(1)
        : '0';

    // Quick calc for top make
    const makeCounts: Record<string, number> = {};
    data.forEach(r => { makeCounts[r.make] = (makeCounts[r.make] || 0) + 1; });
    const bestMake = Object.entries(makeCounts).sort((a, b) => b[1] - a[1])[0];

    // Helper for Stat Card
    const StatCard = ({ title, value, subtext, icon: Icon, trend }: any) => (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100/60 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <p className="text-slate-500 font-medium text-sm tracking-wide">{title}</p>
                <div className="p-2 bg-slate-50 rounded-full text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                    <Icon size={18} />
                </div>
            </div>
            <div className="flex items-end gap-2 mb-1">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
                {trend && (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full mb-1">
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-slate-400 text-xs font-medium">{subtext}</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Total Vehicles"
                value={totalVehicles.toLocaleString()}
                subtext="Registered EVs in Washington"
                icon={Car}
            />
            <StatCard
                title="BEV Adoption"
                value={`${bevPercentage}%`}
                subtext="Full battery electric vehicles"
                icon={Zap}
            />
            <StatCard
                title="Avg Range"
                value={avgRange}
                subtext="Miles per charge"
                icon={Battery}
            />
            <StatCard
                title="Top Manufacturer"
                value={bestMake ? bestMake[0] : 'N/A'}
                subtext={`${bestMake ? bestMake[1].toLocaleString() : 0} vehicles on road`}
                icon={TrendingUp}
            />
        </div>
    );
};
