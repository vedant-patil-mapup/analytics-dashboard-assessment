import { useState, useEffect, useMemo, useCallback } from "react";
import Papa from "papaparse";
import type { EVRecord, FilterState } from "../types/EVTypes";

// Custom hook for managing light/dark theme preference.
export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDark(saved === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Toggle theme and update localStorage
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  }, []);

  return { isDark, toggleTheme };
};

// Custom hook for loading and parsing EV population CSV data.
export const useEVData = () => {
  const [data, setData] = useState<EVRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/Electric_Vehicle_Population_Data.csv");
        if (!response.ok) throw new Error("Failed to fetch data");

        const csvText = await response.text();

        // Parsing CSV text using PapaParse
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: false,
          complete: (result: any) => {
            if (result.errors.length > 0) {
              console.warn("CSV parsing warnings:", result.errors);
            }
            setData(result.data as EVRecord[]);
            setLoading(false);
          },
          error: (error: any) => {
            setError("Failed to parse CSV data");
            setLoading(false);
            console.error("CSV parsing error:", error);
          },
        });
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
        console.error("Data loading error:", err);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

//Custom hook for filtering EV data based on user-selected filters.
export const useProcessedData = (data: EVRecord[], filters: FilterState) => {
  return useMemo(() => {
    let filtered = data;

    // Global text search across all fields
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          value?.toLowerCase().includes(searchLower)
        )
      );
    }

    // Apply filters one by one if selected
    if (filters.state)
      filtered = filtered.filter((item) => item.State === filters.state);
    if (filters.county)
      filtered = filtered.filter((item) => item.County === filters.county);
    if (filters.city)
      filtered = filtered.filter((item) => item.City === filters.city);
    if (filters.make)
      filtered = filtered.filter((item) => item.Make === filters.make);
    if (filters.model)
      filtered = filtered.filter((item) => item.Model === filters.model);
    if (filters.year)
      filtered = filtered.filter((item) => item["Model Year"] === filters.year);
    if (filters.evType)
      filtered = filtered.filter(
        (item) => item["Electric Vehicle Type"] === filters.evType
      );
    if (filters.cafvEligibility)
      filtered = filtered.filter(
        (item) =>
          item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] ===
          filters.cafvEligibility
      );

    return filtered;
  }, [data, filters]);
};

//Custom hook fro extracting filter options from EV dataset.
export const useFilterOptions = (data: EVRecord[]) => {
  return useMemo(
    () => ({
      states: [...new Set(data.map((item) => item.State))]
        .filter(Boolean)
        .sort(),
      counties: [...new Set(data.map((item) => item.County))]
        .filter(Boolean)
        .sort(),
      cities: [...new Set(data.map((item) => item.City))]
        .filter(Boolean)
        .sort(),
      makes: [...new Set(data.map((item) => item.Make))].filter(Boolean).sort(),
      models: [...new Set(data.map((item) => item.Model))]
        .filter(Boolean)
        .sort(),
      years: [...new Set(data.map((item) => item["Model Year"]))]
        .filter(Boolean)
        .sort(),
      evTypes: [...new Set(data.map((item) => item["Electric Vehicle Type"]))]
        .filter(Boolean)
        .sort(),
      cafvEligibility: [
        ...new Set(
          data.map(
            (item) => item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]
          )
        ),
      ]
        .filter(Boolean)
        .sort(),
    }),
    [data]
  );
};

//Custom hook for preparing chart-ready data from filtered EV dataset.
export const useChartData = (filteredData: EVRecord[]) => {
  return useMemo(() => {
    // Count EVs per city
    const cityCount = filteredData.reduce((acc, item) => {
      if (item.City) acc[item.City] = (acc[item.City] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCities = Object.entries(cityCount)
      .sort(([, a], [, b]) => b - a) // Sort descending
      .slice(0, 10) // Keep top 10
      .map(([name, value]) => ({ name, value }));

    // Count EVs per state
    const stateCount = filteredData.reduce((acc, item) => {
      if (item.State) acc[item.State] = (acc[item.State] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const stateData = Object.entries(stateCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Count EVs by manufacturer (make)
    const makeCount = filteredData.reduce((acc, item) => {
      if (item.Make) acc[item.Make] = (acc[item.Make] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const makeData = Object.entries(makeCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8) // Keep top 8 makes
      .map(([name, value]) => ({ name, value }));

    // Count EVs by model year
    const yearCount = filteredData.reduce((acc, item) => {
      if (item["Model Year"])
        acc[item["Model Year"]] = (acc[item["Model Year"]] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const yearData = Object.entries(yearCount)
      .sort(([a], [b]) => a.localeCompare(b)) // Sort ascending by year
      .map(([year, count]) => ({ year, count }));

    // Count EVs by EV type (BEV, PHEV, etc.)
    const evTypeCount = filteredData.reduce((acc, item) => {
      if (item["Electric Vehicle Type"])
        acc[item["Electric Vehicle Type"]] =
          (acc[item["Electric Vehicle Type"]] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const evTypeData = Object.entries(evTypeCount).map(([name, value]) => ({
      name,
      value,
    }));

    // Count EVs by CAFV eligibility
    const cafvCount = filteredData.reduce((acc, item) => {
      if (item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]) {
        acc[item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]] =
          (acc[item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]] ||
            0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const cafvData = Object.entries(cafvCount).map(([name, value]) => ({
      name,
      value,
    }));

    return { topCities, stateData, makeData, yearData, evTypeData, cafvData };
  }, [filteredData]);
};
