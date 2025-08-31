"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis, Cell } from "recharts";
import { Battery, Zap, Car, TrendingUp } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EVDataProcessor } from "@/lib/data-processor";
import type { RangeDistribution, MakeData, EVRecord } from "@/types/ev-data";

interface RangeAnalysisProps {
  processor: EVDataProcessor | null;
}

interface RangeComparisonData {
  range: string;
  count: number;
  make: string;
}

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
  avgRange: {
    label: "Average Range",
    color: "var(--chart-2)",
  },
  "0-50": {
    label: "0-50 miles",
    color: "var(--chart-1)",
  },
  "51-100": {
    label: "51-100 miles",
    color: "var(--chart-2)",
  },
  "101-200": {
    label: "101-200 miles",
    color: "var(--chart-3)",
  },
  "201-300": {
    label: "201-300 miles",
    color: "var(--chart-4)",
  },
  "300+": {
    label: "300+ miles",
    color: "var(--chart-5)",
  },
  // Range distribution groups
  "0-50 miles": {
    label: "0-50 miles",
    color: "var(--chart-1)",
  },
  "51-100 miles": {
    label: "51-100 miles",
    color: "var(--chart-2)",
  },
  "101-200 miles": {
    label: "101-200 miles",
    color: "var(--chart-3)",
  },
  "201-300 miles": {
    label: "201-300 miles",
    color: "var(--chart-4)",
  },
  "300+ miles": {
    label: "300+ miles",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function RangeAnalysis({ processor }: RangeAnalysisProps) {
  const [rangeData, setRangeData] = React.useState<RangeDistribution[]>([]);
  const [makeData, setMakeData] = React.useState<MakeData[]>([]);
  const [selectedMake, setSelectedMake] = React.useState<string>("All");
  const [selectedRange, setSelectedRange] = React.useState<string>("All");
  const [viewType, setViewType] = React.useState<"overview" | "comparison" | "trends">("overview");

  React.useEffect(() => {
    if (processor) {
      const range = processor.getRangeDistribution();
      const make = processor.getMakeDistribution();

      setRangeData(range);
      setMakeData(make);
    }
  }, [processor]);

  // Get range breakdown by manufacturer
  const getRangeByMake = React.useMemo((): { [key: string]: RangeComparisonData[] } => {
    if (!processor) return {};

    const rawData = processor.getRawData();
    const result: { [key: string]: RangeComparisonData[] } = {};

    makeData.forEach((make) => {
      const makeVehicles = rawData.filter((v: EVRecord) => v.make === make.make);
      const ranges = {
        "0-50": 0,
        "51-100": 0,
        "101-200": 0,
        "201-300": 0,
        "300+": 0,
      };

      makeVehicles.forEach((vehicle) => {
        const range = vehicle.electricRange;
        if (range <= 50) ranges["0-50"]++;
        else if (range <= 100) ranges["51-100"]++;
        else if (range <= 200) ranges["101-200"]++;
        else if (range <= 300) ranges["201-300"]++;
        else ranges["300+"]++;
      });

      result[make.make] = Object.entries(ranges).map(([range, count]) => ({
        range,
        count,
        make: make.make,
      }));
    });

    return result;
  }, [processor, makeData]);

  // Get average range by year
  const getRangeByYear = React.useMemo(() => {
    if (!processor) return [];

    const rawData = processor.getRawData();
    const yearRanges: { [key: number]: number[] } = {};

    rawData.forEach((vehicle: EVRecord) => {
      if (vehicle.electricRange > 0) {
        if (!yearRanges[vehicle.modelYear]) {
          yearRanges[vehicle.modelYear] = [];
        }
        yearRanges[vehicle.modelYear].push(vehicle.electricRange);
      }
    });

    return Object.entries(yearRanges)
      .map(([year, ranges]) => ({
        year: parseInt(year),
        avgRange: ranges.reduce((sum, range) => sum + range, 0) / ranges.length,
        maxRange: Math.max(...ranges),
        minRange: Math.min(...ranges),
        count: ranges.length,
      }))
      .filter((d) => d.year >= 2010)
      .sort((a, b) => a.year - b.year);
  }, [processor]);

  // Filter data based on selections
  const filteredData = React.useMemo(() => {
    if (!processor) return [];

    let data = processor.getRawData();

    if (selectedMake !== "All") {
      data = data.filter((v: EVRecord) => v.make === selectedMake);
    }

    if (selectedRange !== "All") {
      const [min, max] = selectedRange.split("-").map((s) => parseInt(s.replace("+", "")));
      data = data.filter((v: EVRecord) => {
        if (selectedRange === "300+") return v.electricRange > 300;
        return v.electricRange >= min && v.electricRange <= max;
      });
    }

    return data;
  }, [processor, selectedMake, selectedRange]);

  // Calculate statistics for filtered data
  const filteredStats = React.useMemo(() => {
    if (filteredData.length === 0) return null;

    const ranges = filteredData.map((v: EVRecord) => v.electricRange).filter((r) => r > 0);

    return {
      count: filteredData.length,
      avgRange: ranges.reduce((sum, range) => sum + range, 0) / ranges.length,
      maxRange: Math.max(...ranges),
      minRange: Math.min(...ranges),
      medianRange: ranges.sort((a, b) => a - b)[Math.floor(ranges.length / 2)],
    };
  }, [filteredData]);

  if (!processor) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading range analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">View:</label>
          <Select value={viewType} onValueChange={(value: "overview" | "comparison" | "trends") => setViewType(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="comparison">Comparison</SelectItem>
              <SelectItem value="trends">Trends</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Manufacturer:</label>
          <Select value={selectedMake} onValueChange={setSelectedMake}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Makes</SelectItem>
              {makeData.slice(0, 15).map((make) => (
                <SelectItem key={make.make} value={make.make}>
                  {make.make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Range:</label>
          <Select value={selectedRange} onValueChange={setSelectedRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Ranges</SelectItem>
              <SelectItem value="0-50">0-50 miles</SelectItem>
              <SelectItem value="51-100">51-100 miles</SelectItem>
              <SelectItem value="101-200">101-200 miles</SelectItem>
              <SelectItem value="201-300">201-300 miles</SelectItem>
              <SelectItem value="300+">300+ miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics Cards */}
      {filteredStats && (
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredStats.count.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Range</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(filteredStats.avgRange)} mi</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Max Range</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredStats.maxRange} mi</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Min Range</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredStats.minRange} mi</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Median Range</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(filteredStats.medianRange)} mi</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overview Charts */}
      {viewType === "overview" && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Range Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Range Distribution</CardTitle>
                <CardDescription>Distribution of vehicles by electric range categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[400px]">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie data={rangeData} dataKey="count" nameKey="rangeGroup" innerRadius={60}>
                      {rangeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            chartConfig[entry.rangeGroup as keyof typeof chartConfig]?.color ||
                            `var(--chart-${(index % 5) + 1})`
                          }
                        />
                      ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Range by Top Manufacturers */}
            <Card>
              <CardHeader>
                <CardTitle>Range by Manufacturer</CardTitle>
                <CardDescription>Average electric range for top manufacturers</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px] w-full">
                  <BarChart data={makeData.slice(0, 10)} layout="vertical">
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis
                      type="category"
                      dataKey="make"
                      tickLine={false}
                      axisLine={false}
                      width={80}
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="avgRange" fill="var(--color-avgRange)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Range Trends */}
      {viewType === "trends" && (
        <Card>
          <CardHeader>
            <CardTitle>Range Evolution Over Time</CardTitle>
            <CardDescription>How electric vehicle range has improved over the years</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <LineChart data={getRangeByYear}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="avgRange"
                  type="monotone"
                  stroke="var(--color-avgRange)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-avgRange)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Manufacturer Comparison */}
      {viewType === "comparison" && selectedMake !== "All" && getRangeByMake[selectedMake] && (
        <Card>
          <CardHeader>
            <CardTitle>Range Breakdown - {selectedMake}</CardTitle>
            <CardDescription>Distribution of range categories for {selectedMake} vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <BarChart data={getRangeByMake[selectedMake]}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="range" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
