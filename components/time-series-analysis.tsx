"use client";

import * as React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Calendar, Filter, Download, TrendingUp } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EVDataProcessor } from "@/lib/data-processor";
import type { EVRecord } from "@/types/ev-data";

interface TimeSeriesAnalysisProps {
  processor: EVDataProcessor | null;
}

interface TimeSeriesData {
  year: number;
  count: number;
  bevCount: number;
  phevCount: number;
  avgRange: number;
  newMakes: number;
  cumulativeCount: number;
}

const chartConfig = {
  count: {
    label: "Total Vehicles",
    color: "var(--chart-1)",
  },
  bevCount: {
    label: "BEV Count",
    color: "var(--chart-2)",
  },
  phevCount: {
    label: "PHEV Count",
    color: "var(--chart-3)",
  },
  avgRange: {
    label: "Average Range",
    color: "var(--chart-4)",
  },
  cumulativeCount: {
    label: "Cumulative Total",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function TimeSeriesAnalysis({ processor }: TimeSeriesAnalysisProps) {
  const [timeSeriesData, setTimeSeriesData] = React.useState<TimeSeriesData[]>([]);
  const [selectedMetric, setSelectedMetric] = React.useState<keyof TimeSeriesData>("count");
  const [chartType, setChartType] = React.useState<"line" | "bar" | "area">("line");
  const [timeRange, setTimeRange] = React.useState<"all" | "recent" | "growth">("all");
  const [county, setCounty] = React.useState<string>("All");
  const [make, setMake] = React.useState<string>("All");

  const generateTimeSeriesData = React.useCallback(() => {
    if (!processor) return;

    const rawData = processor.getRawData();

    // Filter data based on selections
    let filteredData = rawData;
    if (county !== "All") {
      filteredData = filteredData.filter((v: EVRecord) => v.county === county);
    }
    if (make !== "All") {
      filteredData = filteredData.filter((v: EVRecord) => v.make === make);
    }

    // Group by year
    const yearGroups: { [year: number]: EVRecord[] } = {};
    filteredData.forEach((vehicle: EVRecord) => {
      const year = vehicle.modelYear;
      if (year >= 2010) {
        // Focus on recent years
        if (!yearGroups[year]) yearGroups[year] = [];
        yearGroups[year].push(vehicle);
      }
    });

    // Calculate metrics for each year
    const allMakes = new Set<string>();
    let cumulativeTotal = 0;

    const result: TimeSeriesData[] = Object.entries(yearGroups)
      .map(([year, vehicles]) => {
        const yearInt = parseInt(year);
        const bevVehicles = vehicles.filter((v) => v.electricVehicleType === "Battery Electric Vehicle (BEV)");
        const phevVehicles = vehicles.filter((v) => v.electricVehicleType === "Plug-in Hybrid Electric Vehicle (PHEV)");

        // Calculate average range
        const validRanges = vehicles.filter((v) => v.electricRange > 0).map((v) => v.electricRange);
        const avgRange =
          validRanges.length > 0 ? validRanges.reduce((sum, range) => sum + range, 0) / validRanges.length : 0;

        // Count new makes introduced this year
        const yearMakes = new Set(vehicles.map((v) => v.make));
        let newMakes = 0;
        yearMakes.forEach((make) => {
          if (!allMakes.has(make)) {
            newMakes++;
            allMakes.add(make);
          }
        });

        cumulativeTotal += vehicles.length;

        return {
          year: yearInt,
          count: vehicles.length,
          bevCount: bevVehicles.length,
          phevCount: phevVehicles.length,
          avgRange: Math.round(avgRange),
          newMakes,
          cumulativeCount: cumulativeTotal,
        };
      })
      .sort((a, b) => a.year - b.year);

    setTimeSeriesData(result);
  }, [processor, county, make]);

  React.useEffect(() => {
    if (processor) {
      generateTimeSeriesData();
    }
  }, [processor, generateTimeSeriesData]);

  // Filter data based on time range
  const filteredData = React.useMemo(() => {
    switch (timeRange) {
      case "recent":
        return timeSeriesData.filter((d) => d.year >= 2015);
      case "growth":
        return timeSeriesData.filter((d) => d.year >= 2020);
      default:
        return timeSeriesData;
    }
  }, [timeSeriesData, timeRange]);

  // Get available counties and makes
  const availableCounties = React.useMemo(() => {
    if (!processor) return [];
    return processor.getCountyDistribution().slice(0, 10);
  }, [processor]);

  const availableMakes = React.useMemo(() => {
    if (!processor) return [];
    return processor.getMakeDistribution().slice(0, 15);
  }, [processor]);

  // Calculate growth rate for selected metric
  const growthRate = React.useMemo(() => {
    if (filteredData.length < 2) return 0;
    const latest = filteredData[filteredData.length - 1][selectedMetric] as number;
    const previous = filteredData[filteredData.length - 2][selectedMetric] as number;
    if (previous === 0) return 0;
    return ((latest - previous) / previous) * 100;
  }, [filteredData, selectedMetric]);

  const exportData = () => {
    const csvContent = [
      Object.keys(filteredData[0]).join(","),
      ...filteredData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ev-timeseries-${selectedMetric}-${Date.now()}.csv`;
    a.click();
  };

  const renderChart = () => {
    const data = filteredData;

    if (chartType === "line") {
      return (
        <LineChart data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey={selectedMetric}
            type="monotone"
            stroke={`var(--color-${selectedMetric})`}
            strokeWidth={3}
            dot={{ fill: `var(--color-${selectedMetric})`, strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      );
    }

    if (chartType === "bar") {
      return (
        <BarChart data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey={selectedMetric} fill={`var(--color-${selectedMetric})`} radius={4} />
        </BarChart>
      );
    }

    return (
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id={`fill-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={`var(--color-${selectedMetric})`} stopOpacity={0.8} />
            <stop offset="95%" stopColor={`var(--color-${selectedMetric})`} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey={selectedMetric}
          type="natural"
          fill={`url(#fill-${selectedMetric})`}
          fillOpacity={0.4}
          stroke={`var(--color-${selectedMetric})`}
          strokeWidth={2}
        />
      </AreaChart>
    );
  };

  if (!processor) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading time series analysis...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <label className="text-sm font-medium">Metric:</label>
          <Select value={selectedMetric} onValueChange={(value: keyof TimeSeriesData) => setSelectedMetric(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="count">Total Vehicles</SelectItem>
              <SelectItem value="bevCount">BEV Count</SelectItem>
              <SelectItem value="phevCount">PHEV Count</SelectItem>
              <SelectItem value="avgRange">Average Range</SelectItem>
              <SelectItem value="cumulativeCount">Cumulative Total</SelectItem>
              <SelectItem value="newMakes">New Makes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <label className="text-sm font-medium">Period:</label>
          <Select value={timeRange} onValueChange={(value: "all" | "recent" | "growth") => setTimeRange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="recent">2015+</SelectItem>
              <SelectItem value="growth">2020+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Chart Type:</label>
          <Select value={chartType} onValueChange={(value: "line" | "bar" | "area") => setChartType(value)}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
              <SelectItem value="area">Area</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">County:</label>
          <Select value={county} onValueChange={setCounty}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Counties</SelectItem>
              {availableCounties.map((c) => (
                <SelectItem key={c.county} value={c.county}>
                  {c.county}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Make:</label>
          <Select value={make} onValueChange={setMake}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Makes</SelectItem>
              {availableMakes.map((m) => (
                <SelectItem key={m.make} value={m.make}>
                  {m.make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={exportData} variant="outline" size="sm" className="ml-auto">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {selectedMetric === "year"
                  ? "Year"
                  : selectedMetric === "newMakes"
                  ? "New Makes"
                  : chartConfig[selectedMetric as keyof typeof chartConfig]?.label || selectedMetric}{" "}
                Over Time
              </CardTitle>
              <CardDescription>
                {county !== "All" && `${county} County • `}
                {make !== "All" && `${make} • `}
                {timeRange === "recent" ? "2015-Present" : timeRange === "growth" ? "2020-Present" : "All Years"}
              </CardDescription>
            </div>

            {filteredData.length >= 2 && (
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">YoY Growth</div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      growthRate > 0 ? "text-green-600" : growthRate < 0 ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    <TrendingUp className={`h-3 w-3 ${growthRate < 0 ? "rotate-180" : ""}`} />
                    {Math.abs(growthRate).toFixed(1)}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            {renderChart()}
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      {filteredData.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Latest Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(filteredData[filteredData.length - 1][selectedMetric] as number).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Year {filteredData[filteredData.length - 1].year}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Peak Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(...filteredData.map((d) => d[selectedMetric] as number)).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Maximum recorded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  filteredData.reduce((sum, d) => sum + (d[selectedMetric] as number), 0) / filteredData.length,
                ).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Over selected period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredData.length >= 2
                  ? (
                      ((((filteredData[filteredData.length - 1][selectedMetric] as number) -
                        filteredData[0][selectedMetric]) as number) /
                        (filteredData[0][selectedMetric] as number)) *
                      100
                    ).toFixed(1) + "%"
                  : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Since {filteredData[0]?.year}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
