import Papa from 'papaparse';
import type { EVData, DashboardStats } from '../types/ev';

export const fetchData = async (): Promise<EVData[]> => {
  try {
    const response = await fetch('/Electric_Vehicle_Population_Data.csv');
    const reader = response.body?.getReader();
    if (!reader) return [];

    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value);

    return new Promise((resolve) => {
      Papa.parse<EVData>(csv, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return [];
  }
};

export const processDashboardData = (data: EVData[]): DashboardStats => {
  if (!data || data.length === 0) {
    return {
      totalEVs: 0,
      avgRange: 0,
      yearData: [],
      makeData: [],
      typeData: [],
      cafvData: [],
      rawData: []
    };
  }

  const totalEVs = data.length;

  // EVs by Model Year
  const yearCounts = data.reduce((acc: Record<number, number>, curr) => {
    const year = curr['Model Year'];
    if (year) acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});
  const yearData = Object.keys(yearCounts)
    .map(year => ({ year: parseInt(year), count: yearCounts[parseInt(year)] }))
    .sort((a, b) => a.year - b.year);

  // Top Manufacturers
  const makeCounts = data.reduce((acc: Record<string, number>, curr) => {
    const make = curr['Make'];
    if (make) acc[make] = (acc[make] || 0) + 1;
    return acc;
  }, {});
  const makeData = Object.keys(makeCounts)
    .map(make => ({ make, count: makeCounts[make] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // EV Types - Aggregated
  const typeCounts = data.reduce((acc: Record<string, number>, curr) => {
    const rawType = curr['Electric Vehicle Type'];
    if (rawType) {
      const type = rawType.includes('Battery') ? 'BEV' : 'PHEV';
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {});

  const typeData = Object.keys(typeCounts).map(type => ({
    name: type,
    value: typeCounts[type]
  }));

  // CAFV Eligibility
  const cafvCounts = data.reduce((acc: Record<string, number>, curr) => {
    const status = curr['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
    if (status) acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const cafvData = Object.keys(cafvCounts).map(status => ({
    name: status.split('(')[0].trim(),
    value: cafvCounts[status]
  }));

  const avgRange = Math.round(data.reduce((acc, curr) => acc + (curr['Electric Range'] || 0), 0) / totalEVs);

  return {
    totalEVs,
    avgRange,
    yearData,
    makeData,
    typeData,
    cafvData,
    rawData: data
  };
};
