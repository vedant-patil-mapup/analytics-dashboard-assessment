import Papa from 'papaparse';
import { EVRecord, CountyData, YearlyData, MakeData, ModelData, RangeDistribution, DashboardStats, UtilityData } from '@/types/ev-data';

export class EVDataProcessor {
  private rawData: EVRecord[] = [];

  // Parse CSV data
  async loadData(csvPath: string): Promise<EVRecord[]> {
    try {
      const response = await fetch(csvPath);
      const csvText = await response.text();

      const result = Papa.parse<string[]>(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: () => {
          console.log('CSV parsing completed');
        }
      });

      // Skip header row and process data
      const processedData = result.data.slice(1).map((row, index) => {
        try {
          return this.parseRow(row);
        } catch (error) {
          console.warn(`Error parsing row ${index + 2}:`, error);
          return null;
        }
      }).filter(Boolean) as EVRecord[];

      this.rawData = processedData;
      return processedData;
    } catch (error) {
      console.error('Error loading CSV data:', error);
      throw error;
    }
  }

  private parseRow(row: string[]): EVRecord {
    return {
      vin: row[0] || '',
      county: row[1] || '',
      city: row[2] || '',
      state: row[3] || '',
      postalCode: row[4] || '',
      modelYear: parseInt(row[5]) || 0,
      make: row[6] || '',
      model: row[7] || '',
      electricVehicleType: row[8] as EVRecord['electricVehicleType'],
      cafvEligibility: row[9] || '',
      electricRange: parseInt(row[10]) || 0,
      baseMsrp: parseInt(row[11]) || 0,
      legislativeDistrict: parseInt(row[12]) || 0,
      dolVehicleId: row[13] || '',
      vehicleLocation: row[14] || '',
      electricUtility: row[15] || '',
      censusTract: row[16] || ''
    };
  }

  // Calculate dashboard statistics
  getDashboardStats(): DashboardStats {
    const totalVehicles = this.rawData.length;
    const validRanges = this.rawData.filter(v => v.electricRange > 0);
    const avgElectricRange = validRanges.length > 0
      ? Math.round(validRanges.reduce((sum, v) => sum + v.electricRange, 0) / validRanges.length)
      : 0;

    const bevCount = this.rawData.filter(v => v.electricVehicleType === 'Battery Electric Vehicle (BEV)').length;
    const phevCount = this.rawData.filter(v => v.electricVehicleType === 'Plug-in Hybrid Electric Vehicle (PHEV)').length;

    const bevPercentage = Math.round((bevCount / totalVehicles) * 100);
    const phevPercentage = Math.round((phevCount / totalVehicles) * 100);

    const countyStats = this.getCountyDistribution();
    const makeStats = this.getMakeDistribution();
    const years = this.rawData.map(v => v.modelYear).filter(y => y > 0);

    return {
      totalVehicles,
      avgElectricRange,
      bevPercentage,
      phevPercentage,
      topCounty: countyStats[0]?.county || 'N/A',
      topMake: makeStats[0]?.make || 'N/A',
      latestYear: Math.max(...years) || 0,
      earliestYear: Math.min(...years) || 0
    };
  }

  // Get county distribution
  getCountyDistribution(): CountyData[] {
    const countMap = new Map<string, number>();

    this.rawData.forEach(vehicle => {
      if (vehicle.county) {
        countMap.set(vehicle.county, (countMap.get(vehicle.county) || 0) + 1);
      }
    });

    const total = this.rawData.length;
    return Array.from(countMap.entries())
      .map(([county, count]) => ({
        county,
        count,
        percentage: Math.round((count / total) * 100 * 100) / 100
      }))
      .sort((a, b) => b.count - a.count);
  }

  // Get yearly adoption trends
  getYearlyTrends(): YearlyData[] {
    const yearMap = new Map<number, { total: number; bev: number; phev: number }>();

    this.rawData.forEach(vehicle => {
      if (vehicle.modelYear > 0) {
        const existing = yearMap.get(vehicle.modelYear) || { total: 0, bev: 0, phev: 0 };
        existing.total++;

        if (vehicle.electricVehicleType === 'Battery Electric Vehicle (BEV)') {
          existing.bev++;
        } else if (vehicle.electricVehicleType === 'Plug-in Hybrid Electric Vehicle (PHEV)') {
          existing.phev++;
        }

        yearMap.set(vehicle.modelYear, existing);
      }
    });

    return Array.from(yearMap.entries())
      .map(([year, data]) => ({
        year,
        count: data.total,
        bevCount: data.bev,
        phevCount: data.phev
      }))
      .sort((a, b) => a.year - b.year);
  }

  // Get manufacturer distribution
  getMakeDistribution(): MakeData[] {
    const makeMap = new Map<string, { count: number; totalRange: number; rangeCount: number }>();

    this.rawData.forEach(vehicle => {
      if (vehicle.make) {
        const existing = makeMap.get(vehicle.make) || { count: 0, totalRange: 0, rangeCount: 0 };
        existing.count++;

        if (vehicle.electricRange > 0) {
          existing.totalRange += vehicle.electricRange;
          existing.rangeCount++;
        }

        makeMap.set(vehicle.make, existing);
      }
    });

    const total = this.rawData.length;
    return Array.from(makeMap.entries())
      .map(([make, data]) => ({
        make,
        count: data.count,
        percentage: Math.round((data.count / total) * 100 * 100) / 100,
        avgRange: data.rangeCount > 0 ? Math.round(data.totalRange / data.rangeCount) : 0
      }))
      .sort((a, b) => b.count - a.count);
  }

  // Get top models
  getTopModels(limit: number = 10): ModelData[] {
    const modelMap = new Map<string, { count: number; totalRange: number; rangeCount: number; totalYear: number; yearCount: number }>();

    this.rawData.forEach(vehicle => {
      if (vehicle.make && vehicle.model) {
        const key = `${vehicle.make}|${vehicle.model}`;
        const existing = modelMap.get(key) || { count: 0, totalRange: 0, rangeCount: 0, totalYear: 0, yearCount: 0 };
        existing.count++;

        if (vehicle.electricRange > 0) {
          existing.totalRange += vehicle.electricRange;
          existing.rangeCount++;
        }

        if (vehicle.modelYear > 0) {
          existing.totalYear += vehicle.modelYear;
          existing.yearCount++;
        }

        modelMap.set(key, existing);
      }
    });

    return Array.from(modelMap.entries())
      .map(([key, data]) => {
        const [make, model] = key.split('|');
        return {
          make,
          model,
          count: data.count,
          avgRange: data.rangeCount > 0 ? Math.round(data.totalRange / data.rangeCount) : 0,
          avgYear: data.yearCount > 0 ? Math.round(data.totalYear / data.yearCount) : 0
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  // Get electric range distribution
  getRangeDistribution(): RangeDistribution[] {
    const ranges = [
      { min: 0, max: 50, label: '0-50 miles' },
      { min: 51, max: 100, label: '51-100 miles' },
      { min: 101, max: 150, label: '101-150 miles' },
      { min: 151, max: 200, label: '151-200 miles' },
      { min: 201, max: 250, label: '201-250 miles' },
      { min: 251, max: 300, label: '251-300 miles' },
      { min: 301, max: Infinity, label: '300+ miles' }
    ];

    const validRanges = this.rawData.filter(v => v.electricRange > 0);
    const total = validRanges.length;

    return ranges.map(range => {
      const count = validRanges.filter(v =>
        v.electricRange >= range.min && v.electricRange <= range.max
      ).length;

      return {
        rangeGroup: range.label,
        count,
        percentage: Math.round((count / total) * 100 * 100) / 100
      };
    }).filter(r => r.count > 0);
  }

  // Get utility distribution
  getUtilityDistribution(): UtilityData[] {
    const utilityMap = new Map<string, number>();

    this.rawData.forEach(vehicle => {
      if (vehicle.electricUtility) {
        // Handle multiple utilities separated by |
        const utilities = vehicle.electricUtility.split('|').map(u => u.trim());
        utilities.forEach(utility => {
          if (utility) {
            utilityMap.set(utility, (utilityMap.get(utility) || 0) + 1);
          }
        });
      }
    });

    const total = this.rawData.length;
    return Array.from(utilityMap.entries())
      .map(([utility, count]) => ({
        utility,
        count,
        percentage: Math.round((count / total) * 100 * 100) / 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 utilities
  }

  // Get raw data for additional processing
  getRawData(): EVRecord[] {
    return this.rawData;
  }
}
