// utils/calculations.js
const getEVStats = (vehicles) => {
  let totalRange = 0;
  let validRangeCount = 0;
  let minRange = Infinity;
  let maxRange = -Infinity;
  const yearCount = {};
  const typeCount = {};
  let bevCount = 0;
  let phevCount = 0;
  const makeCount = {};
  const modelCount = {};
  const countyCount = {};
  const cityCount = {};

  const makeRange = vehicles.map((row) => ({
    name: `${row.Make} ${row.Model} ${row["Model Year"]}`,
    range: parseInt(row["Electric Range"], 10),
  }));

  const validMakeRange = makeRange.filter(
    (d) => !isNaN(d.range) && d.range > 0
  );

  // 1. Most Popular Manufacturer
  const manufacturerCount = {};
  vehicles.forEach((vehicle) => {
    manufacturerCount[vehicle["Make"]] =
      (manufacturerCount[vehicle["Make"]] || 0) + 1;
  });
  const mostPopularManufacturer = Object.entries(manufacturerCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // 2. Most Common Vehicle Type
  const vehicleTypeCount = {};
  vehicles.forEach((vehicle) => {
    vehicleTypeCount[vehicle["Electric Vehicle Type"]] =
      (vehicleTypeCount[vehicle["Electric Vehicle Type"]] || 0) + 1;
  });
  const mostCommonVehicleType = Object.entries(vehicleTypeCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // 3. Average Electric Range
  vehicles.forEach((vehicle) => {
    const range = parseFloat(vehicle["Electric Range"]);
    if (range > 0) {
      totalRange += range;
      validRangeCount++;
    }
  });

  // 4. City with Most EVs
  vehicles.forEach((vehicle) => {
    cityCount[vehicle["City"]] = (cityCount[vehicle["City"]] || 0) + 1;
  });
  const cityWithMostEVs = Object.entries(cityCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  vehicles.forEach((vehicle) => {
    const year = parseInt(vehicle["Model Year"]);
    if (year) {
      yearCount[year] = (yearCount[year] || 0) + 1;
    }
    const evType = vehicle["Electric Vehicle Type"];
    typeCount[evType] = (typeCount[evType] || 0) + 1;
    if (evType === "Battery Electric Vehicle (BEV)") bevCount++;
    if (evType === "Plug-in Hybrid Electric Vehicle (PHEV)") phevCount++;

    makeCount[vehicle["Make"]] = (makeCount[vehicle["Make"]] || 0) + 1;
    const makeModel = `${vehicle.Make} ${vehicle.Model}`;
    modelCount[makeModel] = (modelCount[makeModel] || 0) + 1;

    countyCount[vehicle["County"]] = (countyCount[vehicle["County"]] || 0) + 1;

    cityCount[vehicle.City] = (cityCount[vehicle.City] || 0) + 1;
  });

  // Return the statistics as an object
  return {
    topManufacturer: mostPopularManufacturer[0],
    manufacturerPercentage: (
      (mostPopularManufacturer[1] / vehicles.length) *
      100
    ).toFixed(2),
    topVehicleType: mostCommonVehicleType[0],
    vehicleTypePercentage: (
      (mostCommonVehicleType[1] / vehicles.length) *
      100
    ).toFixed(2),
    averageRange: validRangeCount
      ? (totalRange / validRangeCount).toFixed(1)
      : 0,
    electricRangeStats: {
      max: Math.max(...vehicles.map((v) => v["Electric Range"])),
    },
    makeYearRange: validMakeRange,
    topCity: cityWithMostEVs[0],
    cityEVPercentage: ((cityWithMostEVs[1] / vehicles.length) * 100).toFixed(2),
    byYear: Object.entries(yearCount)
      .map(([year, count]) => ({ year: parseInt(year), count, total: 0 }))
      .sort((a, b) => a.year - b.year),
    byType: Object.entries(typeCount)
      .map(([type, count]) => ({
        type: type === "Battery Electric Vehicle (BEV)" ? "BEV" : "PHEV",
        count,
        percentage: ((count / vehicles.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count),
    byMake: Object.entries(makeCount)
      .map(([make, count]) => ({ make, count }))
      .sort((a, b) => b.count - a.count),
    byModel: Object.entries(modelCount)
      .map(([model, count]) => ({ model, count }))
      .sort((a, b) => b.count - a.count),
    byCounty: Object.entries(countyCount)
      .map(([county, count]) => ({ county, count }))
      .sort((a, b) => b.count - a.count),
    byCity: Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count),
  };
};

export { getEVStats };
