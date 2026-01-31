export const calculateMetrics = (data) => {
    if (!data || data.length === 0) return null;

    // 1. Total EVs
    const totalEVs = data.length;

    // 2. Average Electric Range (excluding 0s which indicate unknown)
    const carsWithRange = data.filter(d => d['Electric Range'] > 0);
    const totalRange = carsWithRange.reduce((acc, curr) => acc + curr['Electric Range'], 0);
    const avgRange = carsWithRange.length ? Math.round(totalRange / carsWithRange.length) : 0;

    // 3. EV Type Breakdown
    const evTypeCounts = data.reduce((acc, curr) => {
        const type = curr['Electric Vehicle Type'];
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    // 4. CAFV Eligibility Breakdown
    const cafvCounts = data.reduce((acc, curr) => {
        const status = curr['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    // 5. Top Makes
    const makeCounts = data.reduce((acc, curr) => {
        const make = curr['Make'];
        acc[make] = (acc[make] || 0) + 1;
        return acc;
    }, {});

    const topMakes = Object.entries(makeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }));

    // 6. Model Year Distribution
    const yearCounts = data.reduce((acc, curr) => {
        const year = curr['Model Year'];
        if (year) {
            acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
    }, {});

    const yearDistribution = Object.entries(yearCounts)
        .sort((a, b) => a[0] - b[0]) // Sort by year ascending
        .map(([year, count]) => ({ year, count }));

    // 7. Range Distribution (Bins)
    const rangeBins = {
        '0-50': 0,
        '51-100': 0,
        '101-150': 0,
        '151-200': 0,
        '201-250': 0,
        '251-300': 0,
        '300+': 0
    };

    carsWithRange.forEach(car => {
        const r = car['Electric Range'];
        if (r <= 50) rangeBins['0-50']++;
        else if (r <= 100) rangeBins['51-100']++;
        else if (r <= 150) rangeBins['101-150']++;
        else if (r <= 200) rangeBins['151-200']++;
        else if (r <= 250) rangeBins['201-250']++;
        else if (r <= 300) rangeBins['251-300']++;
        else rangeBins['300+']++;
    });

    const rangeDistribution = Object.entries(rangeBins).map(([range, count]) => ({ range, count }));

    return {
        totalEVs,
        avgRange,
        evTypeCounts,
        cafvCounts,
        topMakes,
        yearDistribution,
        rangeDistribution
    };
};
