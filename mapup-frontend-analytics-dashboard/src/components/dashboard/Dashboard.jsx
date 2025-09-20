/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import StatCard from "../cards/StatCard";
import EVTypesPieChart from "../charts/EVTypesPieChart";
import ManufacturerBarChart from "../charts/ManufacturerBarChart";
import TopModelsCard from "../cards/TopModelsCard";
import GrowthTrendChart from "../charts/GrowthTrendChart";
import Papa from "papaparse";
import { Car, Battery, Building2, Zap, MapPin, Factory } from "lucide-react";
import _ from "lodash";
import RangeBarChart from "../charts/RangeBarChart";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the CSV file from the public folder
        const response = await fetch(
          "/data/Electric_Vehicle_Population_Data.csv"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();

        // Parsing the CSV file
        const result = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        const manufacturerCounts = _.countBy(result.data, "Make");
        const topManufacturer = _.chain(manufacturerCounts)
          .toPairs()
          .maxBy(([make, count]) => count)
          .head()
          .value();

        const processedData = {
          evTypes: _.countBy(result.data, "Electric Vehicle Type"),
          manufacturerCounts,
          topManufacturer,
          manufacturerData: _.chain(result.data)
            .groupBy("Make")
            .map((group, make) => ({
              make,
              count: group.length,
              avgRange: _.meanBy(group, "Electric Range"),
            }))
            .orderBy("count", "desc")
            .take(5)
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
          avgRange: Math.round(_.meanBy(result.data, "Electric Range")),
          totalMakes: _.uniqBy(result.data, "Make").length,
          vehiclesByYear: _.chain(result.data)
            .countBy("Model Year")
            .map((count, year) => ({ year: parseInt(year), count }))
            .sortBy("year")
            .value(),
          vehiclesByCounty: _.chain(result.data)
            .countBy("County")
            .map((count, county) => ({ county, count }))
            .sortBy("count")
            .reverse()
            .take(10)
            .value(),
        };

        setData(processedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading data: {error.message}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: Unable to load data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-6">
        <StatCard
          title="Total Vehicles"
          value={data.totalVehicles.toLocaleString()}
          icon={Car}
          trend={12}
        />
        <StatCard
          title="Average Range"
          value={`${data.avgRange} miles`}
          icon={Battery}
        />
        <StatCard
          title="Manufacturers"
          value={data.totalMakes}
          icon={Building2}
        />
        {/* <StatCard
          title="BEV Percentage"
          value={`${(
            (data.evTypes["Battery Electric Vehicle (BEV)"] /
              data.totalVehicles) *
            100
          ).toFixed(1)}%`}
          icon={Zap}
        /> */}
        <StatCard
          title="Top County"
          value={data.vehiclesByCounty[0]?.county}
          icon={MapPin}
        />
        <StatCard
          title="Top Manufacturer"
          value={data.topManufacturer}
          icon={Factory}
        />
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Market Insights</h3>
          <p className="text-gray-600">
            {" "}
            Analysis shows that{" "}
            {(
              (data.evTypes["Battery Electric Vehicle (BEV)"] /
                data.totalVehicles) *
              100
            ).toFixed(1)}
            % of electric vehicles are Battery Electric Vehicles (BEVs), while
            the remaining{" "}
            {(
              (data.evTypes["Plug-in Hybrid Electric Vehicle (PHEV)"] /
                data.totalVehicles) *
              100
            ).toFixed(1)}
            % are Plug-in Hybrid Electric Vehicles (PHEVs).
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
        <ManufacturerBarChart data={data.manufacturerCounts} />
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
          <TopModelsCard models={data.topModels} />
        </div>
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
          <RangeBarChart data={data.manufacturerData} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <EVTypesPieChart data={data.evTypes} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <GrowthTrendChart data={data.vehiclesByYear} />
      </div>
    </div>
  );
};

export default Dashboard;
