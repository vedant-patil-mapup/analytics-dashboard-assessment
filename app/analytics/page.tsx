"use client";

import * as React from "react";
import { EVDataProcessor } from "@/lib/data-processor";
import { ComparisonCharts } from "@/components/comparison-charts";
import { RangeAnalysis } from "@/components/range-analysis";
import { TimeSeriesAnalysis } from "@/components/time-series-analysis";
import { ErrorBoundary } from "@/components/error-boundary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Analytics() {
  const [processor, setProcessor] = React.useState<EVDataProcessor | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeSection, setActiveSection] = React.useState<"comparison" | "range" | "timeseries" | "all">("all");

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const dataProcessor = new EVDataProcessor();
        await dataProcessor.loadData("/data.csv");
        setProcessor(dataProcessor);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
          <p className="text-muted-foreground">Interactive data exploration and comparison tools</p>
        </div>

        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
          <p className="text-muted-foreground">Interactive data exploration and comparison tools</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
          <p className="text-muted-foreground">Interactive data exploration and comparison tools</p>
        </div>

        <Select
          value={activeSection}
          onValueChange={(value: "comparison" | "range" | "timeseries" | "all") => setActiveSection(value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Analytics</SelectItem>
            <SelectItem value="comparison">Comparison Charts</SelectItem>
            <SelectItem value="range">Range Analysis</SelectItem>
            <SelectItem value="timeseries">Time Series</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Time Series Analysis Section */}
      {(activeSection === "timeseries" || activeSection === "all") && (
        <ErrorBoundary>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Series Analysis</CardTitle>
                <CardDescription>Interactive time-based analysis with customizable metrics and filters</CardDescription>
              </CardHeader>
              <CardContent>
                <TimeSeriesAnalysis processor={processor} />
              </CardContent>
            </Card>
          </div>
        </ErrorBoundary>
      )}

      {/* Comparison Charts Section */}
      {(activeSection === "comparison" || activeSection === "all") && (
        <ErrorBoundary>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparison Analytics</CardTitle>
                <CardDescription>
                  Compare EV adoption trends across different counties, manufacturers, and time periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComparisonCharts processor={processor} />
              </CardContent>
            </Card>
          </div>
        </ErrorBoundary>
      )}

      {/* Range Analysis Section */}
      {(activeSection === "range" || activeSection === "all") && (
        <ErrorBoundary>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Range Analysis</CardTitle>
                <CardDescription>
                  Analyze electric vehicle range capabilities and distributions across different categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RangeAnalysis processor={processor} />
              </CardContent>
            </Card>
          </div>
        </ErrorBoundary>
      )}

      {/* Additional Analytics Coming Soon */}
      <Card>
        <CardHeader>
          <CardTitle>Future Analytics</CardTitle>
          <CardDescription>Additional analytical capabilities coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Interactive Maps</h4>
              <p className="text-sm text-muted-foreground">Geographic visualization with clustering and heat maps</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Predictive Analytics</h4>
              <p className="text-sm text-muted-foreground">Machine learning models for trend forecasting</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Market Analysis</h4>
              <p className="text-sm text-muted-foreground">Deep dive into market share and competition analysis</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Utility Integration</h4>
              <p className="text-sm text-muted-foreground">Analysis of utility provider patterns and infrastructure</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Export Tools</h4>
              <p className="text-sm text-muted-foreground">Data export in multiple formats (CSV, PDF, PNG)</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Custom Filters</h4>
              <p className="text-sm text-muted-foreground">Advanced filtering and search capabilities</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
