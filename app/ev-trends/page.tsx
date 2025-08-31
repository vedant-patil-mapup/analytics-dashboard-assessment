"use client";

import * as React from "react";
import { EVDataProcessor } from "@/lib/data-processor";
import { ErrorBoundary } from "@/components/error-boundary";
import { Card, CardContent } from "@/components/ui/card";
import { EVTrendsAnalysis } from "@/components/ev-trends-analysis";

export default function EVTrends() {
  const [processor, setProcessor] = React.useState<EVDataProcessor | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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
          <h2 className="text-2xl font-bold tracking-tight">EV Market Trends</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of electric vehicle adoption trends and market dynamics
          </p>
        </div>

        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading trends data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">EV Market Trends</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of electric vehicle adoption trends and market dynamics
          </p>
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
      <div>
        <h2 className="text-2xl font-bold tracking-tight">EV Market Trends</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of electric vehicle adoption trends and market dynamics
        </p>
      </div>

      <ErrorBoundary>
        <EVTrendsAnalysis processor={processor} />
      </ErrorBoundary>
    </div>
  );
}
