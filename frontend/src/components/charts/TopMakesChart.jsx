import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TopMakesChart = ({ data }) => {
    // Pastel/Neon palette suitable for dark mode
    const colors = ['#60A5FA', '#34D399', '#A78BFA', '#F472B6', '#FBBF24', '#2DD4BF', '#FB923C', '#E879F9', '#4ADE80', '#22D3EE'];

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-slate-100">Top 10 Manufacturers</h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" />
                        <XAxis type="number" stroke="#9CA3AF" />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={100}
                            stroke="#9CA3AF"
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                            itemStyle={{ color: '#F3F4F6' }}
                            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopMakesChart;
