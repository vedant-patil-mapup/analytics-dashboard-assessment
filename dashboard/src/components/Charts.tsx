"use client";
import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import { EVRecord } from '../types/ev-data';

// Professional modern palette
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

interface ChartProps {
    data: EVRecord[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-slate-100 ring-1 ring-black/5 z-50">
                <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">{label}</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-slate-900 text-xl font-bold font-mono">
                        {payload[0].value.toLocaleString()}
                    </p>
                    <span className="text-slate-500 text-xs font-medium">vehicles</span>
                </div>
            </div>
        );
    }
    return null;
};

export const AdoptionTrendChart: React.FC<ChartProps> = ({ data }) => {
    // Aggregate data by Model Year
    const yearCounts = data.reduce((acc, curr) => {
        const year = curr.modelYear;
        // Focus on recent relevant history (e.g., 2013+) to show the steep growth curve
        if (year > 2012 && year <= new Date().getFullYear()) {
            acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
    }, {} as Record<number, number>);

    const chartData = Object.entries(yearCounts)
        .map(([year, count]) => ({ year, count }))
        .sort((a, b) => parseInt(a.year) - parseInt(b.year));

    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/60 h-[420px] flex flex-col">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Adoption Curve</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">Accelerating shift to electric (2013-Present)</p>
                </div>
                {/* Visual Indicator of growth */}
                <div className="hidden sm:block">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => <div key={i} className={`w-8 h-1 rounded-full bg-blue-${i * 200 + 300}`}></div>)}
                    </div>
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorSplit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="year"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                            minTickGap={30}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1.5, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="url(#colorSplit)"
                            activeDot={{ r: 6, strokeWidth: 4, stroke: '#dbeafe', fill: '#2563eb' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const EVTypeDistributionChart: React.FC<ChartProps> = ({ data }) => {
    const typeCounts = data.reduce((acc, curr) => {
        const type = curr.evType === 'Battery Electric Vehicle (BEV)' ? 'BEV' :
            curr.evType === 'Plug-in Hybrid Electric Vehicle (PHEV)' ? 'PHEV' : 'Other';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const total = data.length;
    const chartData = Object.entries(typeCounts)
        .map(([name, value]) => ({ name, value, percent: (value / total) * 100 }))
        .sort((a, b) => b.value - a.value);

    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/60 h-[420px] flex flex-col">
            <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Market Composition</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">BEV vs. PHEV Share</p>
            </div>

            <div className="space-y-8 flex-1">
                {chartData.map((item, index) => (
                    <div key={item.name} className="group cursor-default">
                        <div className="flex justify-between items-end mb-3">
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-indigo-500' : 'bg-teal-500'}`}></span>
                                <span className="text-sm font-bold text-slate-700">
                                    {item.name === 'BEV' ? 'Full Electric (BEV)' : 'Plug-in Hybrid (PHEV)'}
                                </span>
                            </div>
                            <span className="text-slate-900 font-bold font-mono text-lg">{item.value.toLocaleString()}</span>
                        </div>
                        <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-2"
                                style={{
                                    width: `${item.percent}%`,
                                    backgroundColor: index === 0 ? '#6366f1' : '#14b8a6'
                                }}
                            >
                            </div>
                        </div>
                        <div className="mt-2 text-right">
                            <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">{item.percent.toFixed(1)}% of fleet</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-50">
                <p className="text-xs text-slate-400 leading-relaxed text-center">
                    Data shows a clear preference for native electric platforms over hybridized powertrains.
                </p>
            </div>
        </div>
    );
};

export const TopManufacturersChart: React.FC<ChartProps> = ({ data }) => {
    const makeCounts = data.reduce((acc, curr) => {
        acc[curr.make] = (acc[curr.make] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(makeCounts)
        .map(([make, count]) => ({ make, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6); // Top 6

    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/60 h-[420px] flex flex-col">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Market Leaders</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">Top manufacturers by volume</p>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                        barSize={20}
                        barGap={4}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                        <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} hide />
                        <YAxis
                            dataKey="make"
                            type="category"
                            width={90}
                            stroke="#64748B"
                            fontSize={11}
                            fontWeight={600}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 4 }} />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : index === 1 ? '#60a5fa' : '#cbd5e1'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
