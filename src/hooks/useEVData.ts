import { useState, useEffect } from 'react';
import type { EVRecord, EVDataAggregates } from '../types/ev';
import { fetchCsvText, parseCsvToRows } from '../services/csv';
import { buildAggregates } from '../selectors/evAggregations';

export const useEVData = () => {
    const [records, setRecords] = useState<EVRecord[]>([]);
    const [data, setData] = useState<EVDataAggregates | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [domain, setDomain] = useState<{ makes: string[]; types: string[]; years: number[] }>({ makes: [], types: [], years: [] });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const csvText = await fetchCsvText('/Electric_Vehicle_Population_Data.csv');
                const rows = await parseCsvToRows(csvText);
                if (!rows || rows.length === 0) {
                    setRecords([]);
                    setData({
                        evsByMake: { labels: [], series: [] },
                        evsByType: { labels: [], series: [] },
                        evsByYear: { labels: [], series: [] },
                        stackedByTypeOverYears: { labels: [], series: [] },
                        cafvBreakdown: { labels: [], series: [] },
                        rangeBuckets: { labels: [], series: [] },
                        msrpBuckets: { labels: [], series: [] },
                        yearVsRange: [],
                        topMakesTrend: { labels: [], series: [] },
                        topModels: [],
                        counties: [],
                        averageRange: null,
                        p50Range: null,
                        p90Range: null,
                        totalEVs: 0,
                    });
                    setDomain({ makes: [], types: [], years: [] });
                    return;
                }

                
                const dataRows = rows.slice(1);
                const VIN_IDX = 0;
                const COUNTY_IDX = 1;
                const CITY_IDX = 2;
                const STATE_IDX = 3;
                const POSTAL_IDX = 4;
                const MODEL_YEAR_IDX = 5;
                const MAKE_IDX = 6;
                const MODEL_IDX = 7;
                const TYPE_IDX = 8;
                const CAFV_IDX = 9;
                const RANGE_IDX = 10;
                const MSRP_IDX = 11;

                const parsedRecords: EVRecord[] = dataRows
                    .map((cols) => {
                        const yearStr = cols[MODEL_YEAR_IDX]?.trim();
                        const rangeStr = cols[RANGE_IDX]?.trim();
                        const msrpStr = cols[MSRP_IDX]?.trim();
                        const year = Number.parseInt(yearStr ?? '', 10);
                        const electricRange = Number.isFinite(Number.parseInt(rangeStr ?? '', 10))
                            ? Number.parseInt(rangeStr ?? '', 10)
                            : null;
                        const msrp = Number.isFinite(Number.parseInt(msrpStr ?? '', 10))
                            ? Number.parseInt(msrpStr ?? '', 10)
                            : null;
                        return {
                            vin: (cols[VIN_IDX] ?? '').trim(),
                            county: (cols[COUNTY_IDX] ?? '').trim(),
                            city: (cols[CITY_IDX] ?? '').trim(),
                            state: (cols[STATE_IDX] ?? '').trim(),
                            postalCode: (cols[POSTAL_IDX] ?? '').trim(),
                            year: year,
                            make: (cols[MAKE_IDX] ?? '').trim(),
                            model: (cols[MODEL_IDX] ?? '').trim(),
                            type: (cols[TYPE_IDX] ?? '').trim(),
                            cafv: (cols[CAFV_IDX] ?? '').trim(),
                            electricRange,
                            msrp,
                        } as EVRecord;
                    })
                    .filter((r) => Number.isFinite(r.year) && r.make && r.type) as EVRecord[];

                const makeCounts = parsedRecords.reduce((acc, curr) => {
                    acc[curr.make] = (acc[curr.make] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                const sortedMakes = Object.entries(makeCounts).sort(([, a], [, b]) => b - a).slice(0, 10);
                const evsByMake = {
                    labels: sortedMakes.map(([make]) => make),
                    series: sortedMakes.map(([, count]) => count),
                };


                const typeCounts = parsedRecords.reduce((acc, curr) => {
                    acc[curr.type] = (acc[curr.type] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                const evsByType = {
                    labels: Object.keys(typeCounts),
                    series: Object.values(typeCounts),
                };


                const yearCounts = parsedRecords.reduce((acc, curr) => {
                    const year = curr.year;
                    if (year && typeof year === 'number') acc[year] = (acc[year] || 0) + 1;
                    return acc;
                }, {} as Record<number, number>);

                const sortedYears = Object.keys(yearCounts).map(Number).sort((a, b) => a - b);
                const evsByYear = {
                    labels: sortedYears.map(String),
                    series: sortedYears.map(year => yearCounts[year]),
                };

                const types = Object.keys(typeCounts);
                const stackedLabels = sortedYears.map(String);
                const series = types.map((t) => ({
                    name: t,
                    data: sortedYears.map((y) => parsedRecords.filter((r) => r.type === t && r.year === y).length),
                }));


                const cafvCounts = parsedRecords.reduce((acc, curr) => {
                    const key = curr.cafv || 'Unknown';
                    acc[key] = (acc[key] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);


                const bucketDefs: { label: string; min: number; max: number | null }[] = [
                    { label: '0-99', min: 0, max: 99 },
                    { label: '100-199', min: 100, max: 199 },
                    { label: '200-299', min: 200, max: 299 },
                    { label: '300-399', min: 300, max: 399 },
                    { label: '400+', min: 400, max: null },
                ];
                const bucketCounts = new Array(bucketDefs.length).fill(0);
                parsedRecords.forEach((r) => {
                    if (r.electricRange == null) return;
                    const idx = bucketDefs.findIndex((b) => (b.max == null ? r.electricRange! >= b.min : r.electricRange! >= b.min && r.electricRange! <= b.max));
                    if (idx >= 0) bucketCounts[idx] += 1;
                });


                const modelCounts = parsedRecords.reduce((acc, curr) => {
                    const key = `${curr.make} ${curr.model}`.trim();
                    acc[key] = (acc[key] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);
                const topModels = Object.entries(modelCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([model, count]) => ({ model, count }));


                const countyCounts = parsedRecords.reduce((acc, curr) => {
                    const key = curr.county || 'Unknown';
                    acc[key] = (acc[key] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);
                const counties = Object.entries(countyCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([county, count]) => ({ county, count }));


                const ranges = parsedRecords.map((r) => r.electricRange).filter((v): v is number => typeof v === 'number');
                const averageRange = ranges.length ? Math.round(ranges.reduce((a, b) => a + b, 0) / ranges.length) : null;
                const sortedRangeVals = [...ranges].sort((a, b) => a - b);
                const pct = (p: number) => {
                    if (!sortedRangeVals.length) return null;
                    const idx = Math.floor((p / 100) * (sortedRangeVals.length - 1));
                    return sortedRangeVals[idx] ?? null;
                };
                const p50Range = pct(50);
                const p90Range = pct(90);


                const msrpDefs: { label: string; min: number; max: number | null }[] = [
                    { label: '<$30k', min: 0, max: 29999 },
                    { label: '$30k-$49k', min: 30000, max: 49999 },
                    { label: '$50k-$69k', min: 50000, max: 69999 },
                    { label: '$70k-$99k', min: 70000, max: 99999 },
                    { label: '$100k+', min: 100000, max: null },
                ];
                const msrpCounts = new Array(msrpDefs.length).fill(0);
                parsedRecords.forEach((r) => {
                    if (r.msrp == null) return;
                    const idx = msrpDefs.findIndex((b) => (b.max == null ? r.msrp! >= b.min : r.msrp! >= b.min && r.msrp! <= b.max));
                    if (idx >= 0) msrpCounts[idx] += 1;
                });


                const yearVsRange = parsedRecords
                    .filter((r) => typeof r.electricRange === 'number')
                    .map((r) => ({ x: r.year, y: r.electricRange as number }));


                const topMakeNames = Object.entries(makeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([m]) => m);
                const topMakesSeries = topMakeNames.map((m) => ({
                    name: m,
                    data: sortedYears.map((y) => parsedRecords.filter((r) => r.make === m && r.year === y).length),
                }));

                setRecords(parsedRecords);
                setDomain({
                    makes: Array.from(new Set(parsedRecords.map((r) => r.make))).sort(),
                    types: Array.from(new Set(parsedRecords.map((r) => r.type))).sort(),
                    years: sortedYears,
                });
                setData({
                    evsByMake,
                    evsByType,
                    evsByYear,
                    stackedByTypeOverYears: { labels: stackedLabels, series },
                    cafvBreakdown: { labels: Object.keys(cafvCounts), series: Object.values(cafvCounts) },
                    rangeBuckets: { labels: bucketDefs.map((b) => b.label), series: bucketCounts },
                    msrpBuckets: { labels: msrpDefs.map((b) => b.label), series: msrpCounts },
                    yearVsRange,
                    topMakesTrend: { labels: stackedLabels, series: topMakesSeries },
                    topModels,
                    counties,
                    averageRange,
                    p50Range,
                    p90Range,
                    totalEVs: parsedRecords.length,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, records, domain, loading, error };
};

export { buildAggregates };