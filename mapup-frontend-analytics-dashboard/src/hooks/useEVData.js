import { useState, useEffect } from "react";
import Papa from "papaparse";
import _ from "lodash";

export const useEVData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fs.readFile(
          "Electric_Vehicle_Population_Data.csv",
          { encoding: "utf8" }
        );
        const result = Papa.parse(response, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        const processedData = {
          raw: result.data,
          evTypes: _.countBy(result.data, "Electric Vehicle Type"),
          manufacturerCounts: _.countBy(result.data, "Make"),
          modelYearTrend: _.countBy(result.data, "Model Year"),
          averageRangeByMake: _.chain(result.data)
            .groupBy("Make")
            .mapValues((group) => _.meanBy(group, "Electric Range"))
            .value(),
          topModels: _.chain(result.data)
            .groupBy("Model")
            .map((group, model) => ({
              model,
              count: group.length,
              make: group[0].Make,
            }))
            .orderBy(["count"], ["desc"])
            .take(5)
            .value(),
          totalVehicles: result.data.length,
          avgRange: _.meanBy(result.data, "Electric Range"),
          totalMakes: _.uniqBy(result.data, "Make").length,
        };

        setData(processedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
