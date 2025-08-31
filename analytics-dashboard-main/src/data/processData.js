

export const parseCSVData = (csvText) => {
  const lines = csvText.split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = line.split(",");
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index]?.trim() || "";
        return obj;
      }, {});
    });
};

export const processCSVData = (data) => {
  try {


    const makeCount = {};
    const modelCount = {};
    let totalVehicles = data.length;
    const yearCount = {};
    const countyCount = {};
    const eligibilityCount = {};
    const cityCount = {};
    const typeCount = {};
    let totalRange = 0;
    let validRangeCount = 0;
    let bevCount = 0;
    let phevCount = 0;
    let cafvEligibleCount = 0;



    const getTopTenUniqueModels = (data) => {
      // Filting vehicles with valid electric range
      const validVehicles = data.filter((vehicle) => parseFloat(vehicle["Electric Range"]) > 0);

      const sortedVehicles = validVehicles.sort(
        (a, b) => parseFloat(b["Electric Range"]) - parseFloat(a["Electric Range"])
      );

      //top 10
      const uniqueModels = new Set();
      const topTenUnique = [];

      for (const vehicle of sortedVehicles) {
        const model = vehicle["Model"];
        if (!uniqueModels.has(model)) {
          uniqueModels.add(model);
          topTenUnique.push(vehicle);
        }
        if (topTenUnique.length === 10) {
          break;
        }
      }

      return topTenUnique;
    };

    const topTenEVs = getTopTenUniqueModels(data);

     const calculateModelPercentages = (data) => {
      const validVehicles = data.filter((vehicle) => parseFloat(vehicle["Electric Range"]) > 0);
       const modelCounts = validVehicles.reduce((acc, vehicle) => {
         acc[vehicle["Make"]] = (acc[vehicle["Make"]] || 0) + 1;
         return acc;
       }, {});

      return Object.entries(modelCounts).map(([model, count]) => ({
        model,
        percentage: parseFloat(((count / totalVehicles) * 100).toFixed(2)),
      }));
    };

    //percentages for 10 models
    const modelPercentages = calculateModelPercentages(data).slice(0, 10);
    const topTenModalPercentages = getTopTenUniqueModels(modelPercentages);

    
    data.forEach((vehicle) => {
      
      makeCount[vehicle.Make] = (makeCount[vehicle.Make] || 0) + 1;

      const makeModel = `${vehicle.Make} ${vehicle.Model}`;
      modelCount[makeModel] = (modelCount[makeModel] || 0) + 1;

      cityCount[vehicle.City] = (cityCount[vehicle.City] || 0) + 1;

      countyCount[vehicle.County] = (countyCount[vehicle.County] || 0) + 1;

      const year = parseInt(vehicle["Model Year"]);
      if (year) {
        yearCount[year] = (yearCount[year] || 0) + 1;
      }

      const evType = vehicle["Electric Vehicle Type"];
      typeCount[evType] = (typeCount[evType] || 0) + 1;
      if (evType === "Battery Electric Vehicle (BEV)") bevCount++;
      if (evType === "Plug-in Hybrid Electric Vehicle (PHEV)") phevCount++;

      const eligibility = vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
        eligibilityCount[eligibility] = (eligibilityCount[eligibility] || 0) + 1;
        if (eligibility === "Clean Alternative Fuel Vehicle Eligible") cafvEligibleCount++;

      const range = parseFloat(vehicle["Electric Range"]);
      if (range > 0) {
        totalRange += range;
        validRangeCount++;
      }
    });

    
/*------retrun------*/
    return {
      byMake: Object.entries(makeCount)
        .map(([make, count]) => ({ make, count }))
        .sort((a, b) => b.count - a.count),
      
      byModel: Object.entries(modelCount)
        .map(([model, count]) => ({ model, count }))
        .sort((a, b) => b.count - a.count),
      
      byCity: Object.entries(cityCount)
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count),
      
      byCounty: Object.entries(countyCount)
        .map(([county, count]) => ({ county, count }))
        .sort((a, b) => b.count - a.count),
      
      byYear: Object.entries(yearCount)
        .map(([year, count]) => ({ year: parseInt(year), count }))
        .sort((a, b) => a.year - b.year),
      
      byType: [
        { type: "BEV", count: bevCount },
        { type: "PHEV", count: phevCount },
      ],
      
      stats: {
        marketLeader: Object.entries(makeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
        topCity: Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
        cafvEligible: ((cafvEligibleCount / data.length) * 100).toFixed(1),
      },
      
      topTenEVs,

      modelPercentages,
    };
  } catch (err) {
    console.error("Error processing CSV data:", err);
    throw err;
  }
};
