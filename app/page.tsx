"use client";

import { useEffect, useState } from "react";
import { EVDataProcessor } from "@/lib/data-processor";
import { DashboardStats, YearlyData, CountyData, MakeData, ModelData, RangeDistribution } from "@/types/ev-data";
import { KPICards } from "@/components/kpi-cards";
import { AdoptionTrends } from "@/components/adoption-trends";
import { GeographicAnalysis } from "@/components/geographic-analysis";
import { VehicleAnalysis } from "@/components/vehicle-analysis";
import { ErrorBoundary } from "@/components/error-boundary";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  const [countyData, setCountyData] = useState<CountyData[]>([]);
  const [makeData, setMakeData] = useState<MakeData[]>([]);
  const [modelData, setModelData] = useState<ModelData[]>([]);
  const [rangeData, setRangeData] = useState<RangeDistribution[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const processor = new EVDataProcessor();
        await processor.loadData("/data.csv");

        // Get all analytics data
        const dashboardStats = processor.getDashboardStats();
        const yearlyTrends = processor.getYearlyTrends();
        const countyDistribution = processor.getCountyDistribution();
        const makeDistribution = processor.getMakeDistribution();
        const topModels = processor.getTopModels(15);
        const rangeDistribution = processor.getRangeDistribution();

        // Update state
        setStats(dashboardStats);
        setYearlyData(yearlyTrends);
        setCountyData(countyDistribution);
        setMakeData(makeDistribution);
        setModelData(topModels);
        setRangeData(rangeDistribution);

        console.log("Data loaded successfully:", {
          totalVehicles: dashboardStats.totalVehicles,
          yearsRange: `${dashboardStats.earliestYear}-${dashboardStats.latestYear}`,
          topCounty: dashboardStats.topCounty,
          topMake: dashboardStats.topMake,
        });
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-destructive">Error Loading Data</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-sm text-muted-foreground">
            Please check that the data file is available and try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Electric Vehicle Analytics</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of Washington State EV population data
          {stats && ` • ${stats.earliestYear}-${stats.latestYear}`}
        </p>
      </div>

      {/* KPI Cards */}
      <section>
        <ErrorBoundary>
          <KPICards stats={stats} loading={loading} />
        </ErrorBoundary>
      </section>

      <Separator />

      {/* Adoption Trends Section */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold tracking-tight">Adoption Trends</h3>
          <p className="text-muted-foreground">Electric vehicle registration patterns and growth over time</p>
        </div>
        <ErrorBoundary>
          <AdoptionTrends data={yearlyData} loading={loading} />
        </ErrorBoundary>
      </section>

      <Separator />

      {/* Geographic Analysis Section */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold tracking-tight">Geographic Distribution</h3>
          <p className="text-muted-foreground">Regional adoption patterns across Washington State counties</p>
        </div>
        <ErrorBoundary>
          <GeographicAnalysis data={countyData} loading={loading} />
        </ErrorBoundary>
      </section>

      <Separator />

      {/* Vehicle Analysis Section */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold tracking-tight">Vehicle & Market Analysis</h3>
          <p className="text-muted-foreground">Manufacturer market share, popular models, and vehicle specifications</p>
        </div>
        <ErrorBoundary>
          <VehicleAnalysis makeData={makeData} modelData={modelData} rangeData={rangeData} loading={loading} />
        </ErrorBoundary>
      </section>

      {/* Footer */}
      {/* <footer className="pt-8 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Data sourced from Washington State Department of Licensing • Last updated: {new Date().toLocaleDateString()}
          </p>
 
        </div>
      </footer> */}
    </div>
  );
}
