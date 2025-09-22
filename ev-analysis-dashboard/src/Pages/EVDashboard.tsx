import React, { useState, useCallback, Suspense, lazy } from "react";
import Papa from "papaparse";
import {
  useTheme,
  useEVData,
  useProcessedData,
  useFilterOptions,
  useChartData,
} from "../customHooks/CustomHooks";
import type { FilterState } from "../types/EVTypes";
import { getThemeClasses, LIGHT_COLORS, DARK_COLORS } from "../constants/theme";
import {
  ErrorDisplay,
  Header,
  LoadingSpinner,
  MetricCard,
  SummaryCards,
} from "../components/ReusableDashboardComponents";
import {
  Activity,
  Layers,
  Target,
  Zap,
  TrendingUp,
  Calendar,
  Car,
  MapPin,
  Award,
} from "lucide-react";

// Lazy load heavy components
const FilterPanel = lazy(() => import("../components/FilterPanel"));
const ChartsGrid = lazy(() => import("../components/ChartsGrid"));

const EVDashboard: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { data, loading, error } = useEVData();
  const [showFilters, setShowFilters] = useState(false);
  const [activeInsight, setActiveInsight] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    state: "",
    county: "",
    city: "",
    make: "",
    model: "",
    year: "",
    evType: "",
    cafvEligibility: "",
  });

  const filteredData = useProcessedData(data, filters);
  const chartData = useChartData(filteredData);
  const filterOptions = useFilterOptions(data);

  const theme = getThemeClasses(isDark);
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      state: "",
      county: "",
      city: "",
      make: "",
      model: "",
      year: "",
      evType: "",
      cafvEligibility: "",
    });
  }, []);

  const exportData = useCallback(() => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ev_analytics_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [filteredData]);

  // Calculate advanced insights for rotating banner
  const insights = React.useMemo(() => {
    if (!filteredData.length) return [];

    const totalVehicles = filteredData.length;
    const uniqueStates = new Set(filteredData.map((item) => item.State)).size;
    const topMake = chartData.makeData[0]?.name || "N/A";
    const topMakePercentage = chartData.makeData[0]
      ? ((chartData.makeData[0].value / totalVehicles) * 100).toFixed(1)
      : "0";

    const recentYears = filteredData.filter(
      (item) => parseInt(item["Model Year"]) >= 2020
    ).length;
    const recentYearsPercentage = ((recentYears / totalVehicles) * 100).toFixed(
      1
    );

    return [
      {
        value: `${topMake} leads with ${topMakePercentage}%`,
        description: "of the total EV market share",
        trend: "up",
        color: "blue",
      },
      {
        value: `${recentYearsPercentage}% are from 2020+`,
        description: "showing accelerating EV adoption",
        trend: "up",
        color: "green",
      },
      {
        value: `${uniqueStates} states covered`,
        description: "demonstrating nationwide EV presence",
        trend: "neutral",
        color: "purple",
      },
      {
        value: `${totalVehicles.toLocaleString()} vehicles`,
        description: "in current dataset analysis",
        trend: "neutral",
        color: "orange",
      },
    ];
  }, [filteredData, chartData]);

  // Auto-rotate insights every 4 seconds for dynamic user engagement
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsight((prev) => (prev + 1) % insights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [insights.length]);

  if (loading) return <LoadingSpinner isDark={isDark} />;
  if (error) return <ErrorDisplay error={error} isDark={isDark} />;

  return (
    <div className={theme.main}>
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        exportData={exportData}
      />

      {/* Dynamic Insights Banner - shows rotating key metrics */}
      {insights.length > 0 && (
        <div
          className={`${
            isDark
              ? "bg-gradient-to-r from-green-300/30 to-purple-900/30"
              : "bg-gradient-to-r from-green-50 to-purple-100"
          } border-b ${theme.border} px-3 sm:px-6 py-1 sm:py-1.5`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div
                  className={`p-1 rounded-lg sm:rounded-xl ${
                    insights[activeInsight]?.color === "blue"
                      ? "bg-blue-500/20 text-blue-400"
                      : insights[activeInsight]?.color === "green"
                      ? "bg-green-500/20 text-green-400"
                      : insights[activeInsight]?.color === "purple"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-orange-500/20 text-orange-400"
                  }`}
                >
                  <Zap className="h-3.5 sm:h-5 w-3.5 sm:w-5" />
                </div>
                <div className="transition-all duration-500 ease-in-out">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:gap-1.5">
                    <p
                      className={`text-[13px] sm:text-[15px] font-bold ${theme.text.muted}`}
                    >
                      {insights[activeInsight]?.value}
                    </p>
                    <p
                      className={`text-[11px] sm:text-sm ${theme.text.secondary}`}
                    >
                      {insights[activeInsight]?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination dots for insights navigation */}
            <div className="flex space-x-2">
              {insights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveInsight(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeInsight
                      ? "bg-green-500 w-6"
                      : isDark
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lazy loading for filter panel to improve initial load performance */}
      <Suspense
        fallback={
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        {showFilters && (
          <FilterPanel
            filters={filters}
            filterOptions={filterOptions}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
            setShowFilters={setShowFilters}
            isDark={isDark}
          />
        )}
      </Suspense>

      <div className="px-4 sm:px-6 py-5 space-y-8 pb-8">
        {/* Main summary cards showing total vehicles and key breakdowns */}
        <SummaryCards
          filteredDataLength={filteredData.length}
          chartData={chartData}
          isDark={isDark}
        />

        {/* Performance Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-6">
          <MetricCard
            title="Market Penetration"
            value={`${(
              (filteredData.length / Math.max(data.length, 1)) *
              100
            ).toFixed(1)}%`}
            description="of total EV population analyzed"
            icon={<Activity className="h-4 sm:h-5 w-4 sm:w-5 text-white" />}
            gradient="bg-gradient-to-r from-blue-500 to-blue-600"
            theme={theme}
            className="text-[18px] sm:text-[22px]"
          />

          <MetricCard
            title="Data Coverage"
            value={chartData.stateData.length}
            description="states with EV registrations"
            icon={<Layers className="h-4 sm:h-5 w-4 sm:w-5 text-white" />}
            gradient="bg-gradient-to-r from-green-500 to-green-600"
            theme={theme}
            className="text-[18px] sm:text-[22px]"
          />

          <MetricCard
            title="Brand Diversity"
            value={chartData.makeData.length}
            description="unique manufacturers represented"
            icon={<Target className="h-4 sm:h-5 w-4 sm:w-5 text-white" />}
            gradient="bg-gradient-to-r from-purple-500 to-purple-600"
            theme={theme}
            className="text-[18px] sm:text-[22px]"
          />
        </div>

        {/* Charts section with loading fallback */}
        <Suspense
          fallback={
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="text-lg font-medium">
                  Loading interactive charts...
                </span>
              </div>
            </div>
          }
        >
          <ChartsGrid chartData={chartData} colors={colors} isDark={isDark} />
        </Suspense>

        {/* Footer with Data Insights Summary */}
        <div
          className={`${theme.card} rounded-3xl border ${theme.border} overflow-hidden shadow-xl`}
        >
          {/* footer title section  */}
          <div
            className={`${
              isDark
                ? "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"
                : "bg-gradient-to-r from-slate-100 via-white to-slate-100"
            } px-3 sm:px-6 py-3 border-b ${theme.border}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <TrendingUp className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[19px] sm:text-[22px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Executive Summary
                  </h3>
                  <p
                    className={`text-[12px] sm:text-[13px] ${theme.text.secondary} `}
                  >
                    Key performance indicators and market insights
                  </p>
                </div>
              </div>
              <div
                className={`px-4 py-1 sm:py-1.5 text-center rounded-full ${
                  isDark ? "bg-slate-700" : "bg-slate-200"
                } border ${theme.border}`}
              >
                <span
                  className={`text-[12px] sm:text-[13px]  font-medium ${theme.text.muted}`}
                >
                  {filteredData.length.toLocaleString()} Records Analyzed
                </span>
              </div>
            </div>
          </div>

          {/* Metrics grid  */}
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              <MetricCard
                title="Latest Technology"
                value={
                  Math.max(
                    ...filteredData.map(
                      (item) => parseInt(item["Model Year"]) || 0
                    )
                  ) || "N/A"
                }
                description="Most recent model year in dataset"
                icon={<Calendar className="h-4 w-4 text-white" />}
                gradient="bg-gradient-to-r from-emerald-500 to-teal-600"
                theme={theme}
                hoverEffect={false}
                className="text-[15px] sm:text-[17px]"
              />

              <MetricCard
                title="Popular Category"
                value={chartData.evTypeData[0]?.name || "N/A"}
                description="Most registered vehicle type"
                icon={<Car className="h-4 w-4  text-white" />}
                gradient="bg-gradient-to-r from-orange-500 to-red-600"
                theme={theme}
                hoverEffect={false}
                className="text-[15px] sm:text-[17px]"
              />

              <MetricCard
                title="Leading Market"
                value={chartData.topCities[0]?.name || "N/A"}
                description="City with highest EV adoption"
                icon={<MapPin className="h-4 w-4  text-white" />}
                gradient="bg-gradient-to-r from-cyan-500 to-blue-600"
                theme={theme}
                hoverEffect={false}
                className="text-[15px] sm:text-[17px]"
              />

              <MetricCard
                title="Regional Leader"
                value={chartData.stateData[0]?.name || "N/A"}
                description="State with most registrations"
                icon={<Award className="h-4 w-4 text-white" />}
                gradient="bg-gradient-to-r from-violet-500 to-purple-600"
                theme={theme}
                hoverEffect={false}
                className="text-[15px] sm:text-[17px]"
              />
            </div>

            {/* Bottom section with additional context */}
            <div
              className={`mt-6 sm:mt-8 pt-4 sm:pt-6 border-t ${theme.border}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span
                    className={`text-[13px] sm:text-sm ${theme.text.secondary}`}
                  >
                    Real-time analytics
                  </span>
                </div>
                <div
                  className={`text-[13px] sm:text-sm ${theme.text.secondary}`}
                >
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVDashboard;
