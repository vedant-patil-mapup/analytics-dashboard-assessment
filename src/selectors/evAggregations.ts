import type { EVRecord, EVDataAggregates, EVFilters } from '../types/ev';

export const computeAggregates = (records: EVRecord[]): EVDataAggregates => {
    return buildAggregates(records, {});
};

export const buildAggregates = (records: EVRecord[], filters: EVFilters): EVDataAggregates => {
    const { make, type, yearMin, yearMax } = filters;
    const filtered = records.filter((r) => {
        if (make && r.make !== make) return false;
        if (type && r.type !== type) return false;
        if (typeof yearMin === 'number' && r.year < yearMin) return false;
        if (typeof yearMax === 'number' && r.year > yearMax) return false;
        return true;
    });

    const makeCounts = filtered.reduce((acc, curr) => { acc[curr.make] = (acc[curr.make] || 0) + 1; return acc; }, {} as Record<string, number>);
    const sortedMakes = Object.entries(makeCounts).sort(([, a], [, b]) => b - a).slice(0, 10);
    const evsByMake = { labels: sortedMakes.map(([m]) => m), series: sortedMakes.map(([, c]) => c) };

    const typeCounts = filtered.reduce((acc, curr) => { acc[curr.type] = (acc[curr.type] || 0) + 1; return acc; }, {} as Record<string, number>);
    const evsByType = { labels: Object.keys(typeCounts), series: Object.values(typeCounts) };

    const yearCounts = filtered.reduce((acc, curr) => { const y = curr.year; acc[y] = (acc[y] || 0) + 1; return acc; }, {} as Record<number, number>);
    const sortedYears = Object.keys(yearCounts).map(Number).sort((a, b) => a - b);
    const evsByYear = { labels: sortedYears.map(String), series: sortedYears.map((y) => yearCounts[y]) };

    const types = Object.keys(typeCounts);
    const stackedLabels = sortedYears.map(String);
    const series = types.map((t) => ({ name: t, data: sortedYears.map((y) => filtered.filter((r) => r.type === t && r.year === y).length) }));

    const cafvCounts = filtered.reduce((acc, curr) => { const key = curr.cafv || 'Unknown'; acc[key] = (acc[key] || 0) + 1; return acc; }, {} as Record<string, number>);

    const bucketDefs: { label: string; min: number; max: number | null }[] = [
        { label: '0-99', min: 0, max: 99 },
        { label: '100-199', min: 100, max: 199 },
        { label: '200-299', min: 200, max: 299 },
        { label: '300-399', min: 300, max: 399 },
        { label: '400+', min: 400, max: null },
    ];
    const bucketCounts = new Array(bucketDefs.length).fill(0);
    filtered.forEach((r) => {
        if (r.electricRange == null) return;
        const idx = bucketDefs.findIndex((b) => (b.max == null ? r.electricRange! >= b.min : r.electricRange! >= b.min && r.electricRange! <= b.max));
        if (idx >= 0) bucketCounts[idx] += 1;
    });

    const modelCounts = filtered.reduce((acc, curr) => { const key = `${curr.make} ${curr.model}`.trim(); acc[key] = (acc[key] || 0) + 1; return acc; }, {} as Record<string, number>);
    const topModels = Object.entries(modelCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([model, count]) => ({ model, count }));

    const countyCounts = filtered.reduce((acc, curr) => { const key = curr.county || 'Unknown'; acc[key] = (acc[key] || 0) + 1; return acc; }, {} as Record<string, number>);
    const counties = Object.entries(countyCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([county, count]) => ({ county, count }));

    const ranges = filtered.map((r) => r.electricRange).filter((v): v is number => typeof v === 'number');
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
    filtered.forEach((r) => {
        if (r.msrp == null) return;
        const idx = msrpDefs.findIndex((b) => (b.max == null ? r.msrp! >= b.min : r.msrp! >= b.min && r.msrp! <= b.max));
        if (idx >= 0) msrpCounts[idx] += 1;
    });

    const yearVsRange = filtered.filter((r) => typeof r.electricRange === 'number').map((r) => ({ x: r.year, y: r.electricRange as number }));

    const topMakeNames = Object.entries(makeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([m]) => m);
    const topMakesSeries = topMakeNames.map((m) => ({ name: m, data: sortedYears.map((y) => filtered.filter((r) => r.make === m && r.year === y).length) }));

    return {
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
        totalEVs: filtered.length,
    };
};


