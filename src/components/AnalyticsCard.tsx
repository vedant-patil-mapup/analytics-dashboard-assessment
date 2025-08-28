import React from 'react';

interface AnalyticsCardProps {
    title: string;
    value: string | number;
    description: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, description }) => (
    <div className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-gray-400 uppercase">{title}</h3>
        <p className="text-4xl font-extrabold text-indigo-400 mt-2">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
);

export default AnalyticsCard;