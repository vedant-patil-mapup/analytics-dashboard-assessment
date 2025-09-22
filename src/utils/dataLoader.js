// src/utils/dataLoader.js
import { csv } from "d3-fetch";

export const loadEVData = async () => {
  const data = await csv(
    "/data-to-visualize/Electric_Vehicle_Population_Data.csv"
  );
  return data;
};
