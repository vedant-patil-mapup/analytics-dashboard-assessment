import React, { useMemo, useState } from 'react';
import type { ApexOptions } from 'apexcharts';
import { useEVData, buildAggregates } from '../hooks/useEVData';
import AnalyticsCard from '../components/AnalyticsCard';
import ChartCard from '../components/ChartCard';
import Header from '../components/Header';
import Filters from '../components/Filters';
import DataTable from '../components/DataTable';

const Dashboard: React.FC = () => {
    const { data, records, domain, loading, error } = useEVData();
    const [filters, setFilters] = useState<{ make?: string; type?: string; yearMin?: number; yearMax?: number }>({});
    const agg = useMemo(() => (records.length ? buildAggregates(records, filters) : data), [records, data, filters]);

    if (loading) return <div className="text-center mt-20 text-gray-700 text-lg">Loading dashboard data...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 text-lg">Error: {error}</div>;
    
    if (!agg) return null;


    const commonChartOptions: ApexOptions = {
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: 'system-ui, sans-serif',
            background: 'transparent',
            animations: { enabled: false },
        },
        dataLabels: { enabled: false },
        tooltip: { theme: 'dark' },
        theme: { mode: 'dark' },
        grid: {
            borderColor: '#374151',
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: false } }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
            }
        },
        colors: ['#4F46E5', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'],
    };

    const makeChartOptions: ApexOptions = {
        ...commonChartOptions,
        xaxis: { categories: agg.evsByMake.labels },
        title: {
            text: 'Top 10 EV Makes',
            align: 'center',
            style: { fontWeight: 'bold' }
        },
    };

    const typeChartOptions: ApexOptions = {
        ...commonChartOptions,
        labels: agg.evsByType.labels,
        responsive: [{
            breakpoint: 480,
            options: { chart: { width: 200 }, legend: { position: 'bottom' } }
        }],
    };

    const yearChartOptions: ApexOptions = {
        ...commonChartOptions,
        xaxis: {
            categories: agg.evsByYear.labels,
            title: { text: 'Model Year' },
        },
        title: {
            text: 'EV Growth Over Time',
            align: 'center',
            style: { fontWeight: 'bold' }
        },
    };

    const stackedOptions: ApexOptions = {
        ...commonChartOptions,
        chart: { ...commonChartOptions.chart, stacked: true },
        xaxis: { categories: agg.stackedByTypeOverYears.labels },
        legend: { position: 'bottom' },
        title: { text: 'EVs by Type over Years', align: 'center', style: { fontWeight: 'bold' } },
    };

    const cafvOptions: ApexOptions = {
        ...commonChartOptions,
        labels: agg.cafvBreakdown.labels,
    };

    const rangeBucketOptions: ApexOptions = {
        ...commonChartOptions,
        xaxis: { categories: agg.rangeBuckets.labels, title: { text: 'Electric Range (miles)' } },
        title: { text: 'EVs by Electric Range Buckets', align: 'center', style: { fontWeight: 'bold' } },
    };

    const msrpOptions: ApexOptions = {
        ...commonChartOptions,
        xaxis: { categories: agg.msrpBuckets.labels, title: { text: 'MSRP' } },
        title: { text: 'MSRP Distribution', align: 'center', style: { fontWeight: 'bold' } },
    };

    const yearRangeScatter: ApexOptions = {
        ...commonChartOptions,
        chart: { ...commonChartOptions.chart, type: 'scatter' },
        xaxis: { title: { text: 'Model Year' }, tickAmount: 10 },
        yaxis: { title: { text: 'Electric Range (mi)' } },
        title: { text: 'Year vs Electric Range', align: 'center', style: { fontWeight: 'bold' } },
    };

    const topMakesTrendOptions: ApexOptions = {
        ...commonChartOptions,
        xaxis: { categories: agg.topMakesTrend.labels, title: { text: 'Model Year' } },
        legend: { position: 'bottom' },
        title: { text: 'Top Makes Trend Over Years', align: 'center', style: { fontWeight: 'bold' } },
    };

    return (
        <div className="bg-gray-950 min-h-screen text-gray-100">
            <div className="w-full px-0 sm:px-4 lg:px-8 py-4 sm:py-8">
                <Header />
                <div className="mb-6">
                    <Filters makes={domain.makes} types={domain.types} years={domain.years} value={filters} onChange={setFilters} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnalyticsCard
                        title="Total EVs"
                        value={agg.totalEVs.toLocaleString()}
                        description="Total number of electric vehicles in the dataset"
                    />
                    <AnalyticsCard
                        title="Average Range"
                        value={agg.averageRange ? `${agg.averageRange} mi` : 'N/A'}
                        description="Average electric range of vehicles"
                    />
                    <AnalyticsCard
                        title="P50 Range"
                        value={agg.p50Range ? `${agg.p50Range} mi` : 'N/A'}
                        description="Median electric range"
                    />
                    <AnalyticsCard
                        title="P90 Range"
                        value={agg.p90Range ? `${agg.p90Range} mi` : 'N/A'}
                        description="90th percentile electric range"
                    />
                    <AnalyticsCard
                        title="Types"
                        value={agg.evsByType.labels.length}
                        description="Number of EV types represented"
                    />
                    <AnalyticsCard
                        title="Top Make"
                        value={agg.evsByMake.labels[0] ?? '—'}
                        description="Most common make"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <ChartCard
                        title="EV Population by Make"
                        options={makeChartOptions}
                        series={[{ name: 'Number of EVs', data: agg.evsByMake.series }]}
                        type="bar"
                    />
                    <ChartCard
                        title="EV Type Distribution"
                        options={typeChartOptions}
                        series={agg.evsByType.series}
                        type="pie"
                    />
                    <div className="lg:col-span-2">
                        <ChartCard
                            title="EVs by Model Year"
                            options={yearChartOptions}
                            series={[{ name: 'Number of EVs', data: agg.evsByYear.series }]}
                            type="line"
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <ChartCard
                            title="EV Types Over Time (Stacked)"
                            options={stackedOptions}
                            series={agg.stackedByTypeOverYears.series}
                            type="bar"
                        />
                    </div>
                    <ChartCard
                        title="CAFV Eligibility Breakdown"
                        options={cafvOptions}
                        series={agg.cafvBreakdown.series}
                        type="donut"
                    />
                    <ChartCard
                        title="Electric Range Distribution"
                        options={rangeBucketOptions}
                        series={[{ name: 'EVs', data: agg.rangeBuckets.series }]}
                        type="bar"
                    />
                    <ChartCard
                        title="MSRP Distribution"
                        options={msrpOptions}
                        series={[{ name: 'EVs', data: agg.msrpBuckets.series }]}
                        type="bar"
                    />
                    <ChartCard
                        title="Year vs Range (Scatter)"
                        options={yearRangeScatter}
                        series={[{ name: 'Vehicles', data: agg.yearVsRange }]}
                        type="scatter"
                    />
                    <div className="lg:col-span-2">
                        <ChartCard
                            title="Top Makes Trend"
                            options={topMakesTrendOptions}
                            series={agg.topMakesTrend.series}
                            type="line"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <DataTable
                        title="Top Models"
                        columns={[{ key: 'model', header: 'Model' }, { key: 'count', header: 'Count' }]}
                        data={agg.topModels}
                    />
                    <DataTable
                        title="Top Counties"
                        columns={[{ key: 'county', header: 'County' }, { key: 'count', header: 'Count' }]}
                        data={agg.counties}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;