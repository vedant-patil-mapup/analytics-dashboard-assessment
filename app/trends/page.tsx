"use client";

import { useEffect, useState } from "react";
import { EVTrendsAnalysis } from "@/components/ev-trends-analysis";
import { EVDataProcessor } from "@/lib/data-processor";

export default function TrendsPage() {
  const [processor, setProcessor] = useState<EVDataProcessor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const dataProcessor = new EVDataProcessor();
        await dataProcessor.loadData("/data.csv");
        setProcessor(dataProcessor);
      } catch (err) {
        console.error("Failed to load EV data:", err);
        setError("Failed to load data. Please check if the data file is available.");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading EV trends data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-destructive mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EV Market Trends</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of electric vehicle market trends, predictions, and insights
          </p>
        </div>

        <EVTrendsAnalysis processor={processor} />
      </div>
    </div>
  );
}
