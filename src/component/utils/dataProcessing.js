export const getTopUtilities = (data) => {
    const utilityCount = {};
    data.forEach(vehicle => {
      const utilities = vehicle["Electric Utility"].split("|");
      utilities.forEach(utility => {
        utilityCount[utility] = (utilityCount[utility] || 0) + 1;
      });
    });
    return Object.entries(utilityCount)
      .map(([utility, count]) => ({ utility, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };
  
  export const parseCSVData = (csvText) => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map(h => h.trim());
    return lines
      .slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(",");
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index]?.trim() || "";
          return obj;
        }, {});
      });
  };
  
  export const processCSVData = (data) => {
    try {
      // Basic counting metrics
      const makeCount = {};
      const modelCount = {};
      const yearCount = {};
      const countyCount = {};
      const typeCount = {};
      const eligibilityCount = {};
      const cityCount = {};
      let totalRange = 0;
      let validRangeCount = 0;
      let cafvEligibleCount = 0;
      let bevCount = 0;
      let phevCount = 0;
      let minRange = Infinity;
      let maxRange = -Infinity;
      let totalMSRP = 0;
      let validMSRPCount = 0;
  
      data.forEach(vehicle => {
        // Make & Model counting
        makeCount[vehicle.Make] = (makeCount[vehicle.Make] || 0) + 1;
        const makeModel = `${vehicle.Make} ${vehicle.Model}`;
        modelCount[makeModel] = (modelCount[makeModel] || 0) + 1;
  
        // City counting
        cityCount[vehicle.City] = (cityCount[vehicle.City] || 0) + 1;
  
        // Year counting
        const year = parseInt(vehicle["Model Year"]);
        if (year) {
          yearCount[year] = (yearCount[year] || 0) + 1;
        }
  
        // County counting
        countyCount[vehicle.County] = (countyCount[vehicle.County] || 0) + 1;
  
        // Vehicle type counting
        const evType = vehicle["Electric Vehicle Type"];
        typeCount[evType] = (typeCount[evType] || 0) + 1;
        if (evType === "Battery Electric Vehicle (BEV)") bevCount++;
        if (evType === "Plug-in Hybrid Electric Vehicle (PHEV)") phevCount++;
  
        // MSRP tracking
        const msrp = Number(vehicle["Base MSRP"]);
        if (msrp > 0) {
          totalMSRP += msrp;
          validMSRPCount++;
        }
  
        // CAFV eligibility
        const eligibility = vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
        eligibilityCount[eligibility] = (eligibilityCount[eligibility] || 0) + 1;
        if (eligibility === "Clean Alternative Fuel Vehicle Eligible") cafvEligibleCount++;
  
        // Electric range statistics
        const range = parseFloat(vehicle["Electric Range"]);
        if (range > 0) {
          totalRange += range;
          validRangeCount++;
          minRange = Math.min(minRange, range);
          maxRange = Math.max(maxRange, range);
        }
      });
  
      // Process data for visualizations
      const processedData = {
        byMake: Object.entries(makeCount)
          .map(([make, count]) => ({ make, count }))
          .sort((a, b) => b.count - a.count),
        byModel: Object.entries(modelCount)
          .map(([model, count]) => ({ model, count }))
          .sort((a, b) => b.count - a.count),
        byCity: Object.entries(cityCount)
          .map(([city, count]) => ({ city, count }))
          .sort((a, b) => b.count - a.count),
        byYear: Object.entries(yearCount)
          .map(([year, count]) => ({ year: parseInt(year), count, total: 0 }))
          .sort((a, b) => a.year - b.year),
        byCounty: Object.entries(countyCount)
          .map(([county, count]) => ({ county, count }))
          .sort((a, b) => b.count - a.count),
        byType: Object.entries(typeCount)
          .map(([type, count]) => ({
            type: type === "Battery Electric Vehicle (BEV)" ? "BEV" : "PHEV",
            count,
            percentage: ((count / data.length) * 100).toFixed(1),
          }))
          .sort((a, b) => b.count - a.count),
        byEligibility: Object.entries(eligibilityCount)
          .map(([status, count]) => ({
            status,
            count,
            percentage: ((count / data.length) * 100).toFixed(1),
          }))
          .sort((a, b) => b.count - a.count),
        byUtility: getTopUtilities(data),
        stats: {
          totalCount: data.length,
          uniqueMakes: Object.keys(makeCount).length,
          uniqueModels: Object.keys(modelCount).length,
          averageRange: validRangeCount ? (totalRange / validRangeCount).toFixed(1) : 0,
          averageMSRP: validMSRPCount ? (totalMSRP / validMSRPCount).toFixed(2) : 0,
          marketLeader: Object.entries(makeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
          topCity: Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
          electricRangeStats: {
            min: minRange === Infinity ? 0 : minRange,
            max: maxRange === -Infinity ? 0 : maxRange,
            avg: validRangeCount ? (totalRange / validRangeCount).toFixed(1) : 0,
          },
          cafvEligible: ((cafvEligibleCount / data.length) * 100).toFixed(1),
          bev: ((bevCount / data.length) * 100).toFixed(1),
          phev: ((phevCount / data.length) * 100).toFixed(1),
        }
      };
  
      // Calculate cumulative totals for year data
      let runningTotal = 0;
      processedData.byYear.forEach(item => {
        runningTotal += item.count;
        item.total = runningTotal;
      });
  
      return processedData;
    } catch (err) {
      console.error("Data processing error:", err);
      throw err;
    }
  };