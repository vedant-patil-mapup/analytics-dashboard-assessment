import Papa from "papaparse";

export const parseCSVData = () => {
  return new Promise((resolve, reject) => {
    const csvPath = new URL("../assets/Electric_Vehicle_Population_Data.csv", import.meta.url).href;

    Papa.parse(csvPath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data); // Resolve with the parsed data
      },
      error: (error) => {
        reject(error); // Reject on error
      },
    });
  });
};

export const calculateTotalOrders = (data) => {
  return data.length;
};

export const calculateEVOrders = (data) => {
  return data.filter((item) => item["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)").length;
};

export const calculateNonEVOrders = (data) => {
  return data.filter((item) => item["Electric Vehicle Type"] !== "Battery Electric Vehicle (BEV)").length;
};

export const groupDataByYear = (data) => {
  return data.reduce((acc, item) => {
    const year = new Date(item["Model Year"]).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});
};

export const groupDataByMake = (data) => {
  return data.reduce((acc, item) => {
    const make = item["Make"];
    if (!acc[make]) acc[make] = [];
    acc[make].push(item);
    return acc;
  }, {});
};

export const calculateTopModel = (data) => {
  const modelCounts = {};

  data.forEach((item) => {
    const model = item["Model"]; // Adjust the key to match your CSV column name.
    if (model) {
      modelCounts[model] = (modelCounts[model] || 0) + 1;
    }
  });

  // Find the model with the maximum count
  let topModel = "";
  let maxCount = 0;

  Object.entries(modelCounts).forEach(([model, count]) => {
    if (count > maxCount) {
      topModel = model;
      maxCount = count;
      console.log("2", topModel);
    }
  });
  console.log("3", topModel);
  return topModel;
};
