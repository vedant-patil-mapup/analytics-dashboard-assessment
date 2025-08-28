import React, { memo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface ChartCardProps {
    title: string;
    options: ApexOptions;
    series: ApexOptions['series'];
    type: NonNullable<ApexOptions['chart']>['type'];
}

const ChartCardComponent: React.FC<ChartCardProps> = ({ title, options, series, type }) => (
    <div className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-800">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">{title}</h2>
        <Chart
            options={options}
            series={series}
            type={type}
            width="100%"
            height="350px"
        />
    </div>
);

const ChartCard = memo(ChartCardComponent);
export default ChartCard;