import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const TopMakesChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="make" tick={{ fill: '#333', fontSize: 12 }} />
                <YAxis tick={{ fill: '#333' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#1976d2" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TopMakesChart;
