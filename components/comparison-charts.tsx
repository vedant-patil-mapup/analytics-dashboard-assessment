"use client";

import * as React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

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
import type { YearlyData, CountyData, MakeData, EVRecord } from "@/types/ev-data";

interface ComparisonChartsProps {
  processor: EVDataProcessor | null;
}

interface ComparisonDataPoint {
  year: number;
  [key: string]: number;
}

const chartConfig = {
  bev: {
    label: "Battery Electric (BEV)",
    color: "var(--chart-1)",
  },
  phev: {
    label: "Plug-in Hybrid (PHEV)",
    color: "var(--chart-2)",
  },
  total: {
    label: "Total EVs",
    color: "var(--chart-3)",
  },
  county1: {
    label: "Primary County",
    color: "var(--chart-1)",
  },
  county2: {
    label: "Comparison County",
    color: "var(--chart-2)",
  },
  make1: {
    label: "Primary Make",
    color: "var(--chart-1)",
  },
  make2: {
    label: "Comparison Make",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ComparisonCharts({ processor }: ComparisonChartsProps) {
  const [yearlyData, setYearlyData] = React.useState<YearlyData[]>([]);
  const [countyData, setCountyData] = React.useState<CountyData[]>([]);
  const [makeData, setMakeData] = React.useState<MakeData[]>([]);
  const [selectedCounties, setSelectedCounties] = React.useState<string[]>([]);
  const [selectedMakes, setSelectedMakes] = React.useState<string[]>([]);
  const [chartType, setChartType] = React.useState<"line" | "bar" | "area">("line");
  const [timeRange, setTimeRange] = React.useState("all");

  React.useEffect(() => {
    if (processor) {
      const yearly = processor.getYearlyTrends();
      const county = processor.getCountyDistribution();
      const make = processor.getMakeDistribution();

      setYearlyData(yearly);
      setCountyData(county);
      setMakeData(make);

      // Set default selections
      if (county.length >= 2) {
        setSelectedCounties([county[0].county, county[1].county]);
      }
      if (make.length >= 2) {
        setSelectedMakes([make[0].make, make[1].make]);
      }
    }
  }, [processor]);

  // Filter data based on time range
  const filteredYearlyData = React.useMemo(() => {
    if (timeRange === "all") return yearlyData;
    const currentYear = new Date().getFullYear();
    const years = parseInt(timeRange);
    return yearlyData.filter((d) => d.year >= currentYear - years);
  }, [yearlyData, timeRange]);

  // Prepare county comparison data
  const countyComparisonData = React.useMemo(() => {
    if (!processor || selectedCounties.length < 2) return [];

    const rawData = processor.getRawData();

    return filteredYearlyData.map((yearData) => {
      const result: ComparisonDataPoint = { year: yearData.year };

      selectedCounties.forEach((county, index) => {
        // Get vehicles for this county and year
        const countyVehicles = rawData.filter((v: EVRecord) => v.county === county && v.modelYear === yearData.year);
        result[`county${index + 1}`] = countyVehicles.length;
      });

      return result;
    });
  }, [processor, selectedCounties, filteredYearlyData]);

  // Prepare make comparison data
  const makeComparisonData = React.useMemo(() => {
    if (!processor || selectedMakes.length < 2) return [];

    const rawData = processor.getRawData();

    return filteredYearlyData.map((yearData) => {
      const result: ComparisonDataPoint = { year: yearData.year };

      selectedMakes.forEach((make, index) => {
        // Get vehicles for this make and year
        const makeVehicles = rawData.filter((v: EVRecord) => v.make === make && v.modelYear === yearData.year);
        result[`make${index + 1}`] = makeVehicles.length;
      });

      return result;
    });
  }, [processor, selectedMakes, filteredYearlyData]);

  // Calculate growth trends
  const calculateGrowth = (data: ComparisonDataPoint[], key: string) => {
    if (data.length < 2) return 0;
    const latest = data[data.length - 1][key] || 0;
    const previous = data[data.length - 2][key] || 0;
    if (previous === 0) return 0;
    return ((latest - previous) / previous) * 100;
  };

  const renderChart = (data: ComparisonDataPoint[], config: ChartConfig, keys: string[]) => {
    const ChartComponent = chartType === "line" ? LineChart : chartType === "bar" ? BarChart : AreaChart;

    return (
      <ChartContainer config={config} className="h-[350px] w-full">
        <ChartComponent data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          {chartType === "line" &&
            keys.map((key) => (
              <Line
                key={key}
                dataKey={key}
                type="monotone"
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={false}
              />
            ))}

          {chartType === "bar" &&
            keys.map((key) => <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} />)}

          {chartType === "area" &&
            keys.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`var(--color-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
                stackId="a"
              />
            ))}
        </ChartComponent>
      </ChartContainer>
    );
  };

  if (!processor) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading comparison charts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Chart Type:</label>
          <Select value={chartType} onValueChange={(value: "line" | "bar" | "area") => setChartType(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Time Range:</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="5">Last 5 Years</SelectItem>
              <SelectItem value="3">Last 3 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* EV Type Trends */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>EV Type Adoption Trends</CardTitle>
          <CardDescription>Compare Battery Electric (BEV) vs Plug-in Hybrid (PHEV) adoption over time</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChart(
            filteredYearlyData.map((d) => ({
              year: d.year,
              bev: d.bevCount,
              phev: d.phevCount,
            })),
            chartConfig,
            ["bev", "phev"],
          )}
        </CardContent>
      </Card>

      {/* County Comparison */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>County Comparison</CardTitle>
              <CardDescription>Compare EV adoption between different counties</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedCounties[0] || ""}
                onValueChange={(value) => setSelectedCounties([value, selectedCounties[1] || ""])}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select county 1" />
                </SelectTrigger>
                <SelectContent>
                  {countyData.slice(0, 10).map((county) => (
                    <SelectItem key={county.county} value={county.county}>
                      {county.county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCounties[1] || ""}
                onValueChange={(value) => setSelectedCounties([selectedCounties[0] || "", value])}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select county 2" />
                </SelectTrigger>
                <SelectContent>
                  {countyData.slice(0, 10).map((county) => (
                    <SelectItem key={county.county} value={county.county}>
                      {county.county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {countyComparisonData.length > 0 ? (
            <>
              {renderChart(countyComparisonData, chartConfig, ["county1", "county2"])}
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[--chart-1]" />
                  <span>{selectedCounties[0]}</span>
                  {countyComparisonData.length >= 2 && (
                    <span className="ml-auto flex items-center gap-1 text-xs">
                      {calculateGrowth(countyComparisonData, "county1") > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : calculateGrowth(countyComparisonData, "county1") < 0 ? (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      ) : (
                        <Minus className="h-3 w-3 text-gray-500" />
                      )}
                      {Math.abs(calculateGrowth(countyComparisonData, "county1")).toFixed(1)}%
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[--chart-2]" />
                  <span>{selectedCounties[1]}</span>
                  {countyComparisonData.length >= 2 && (
                    <span className="ml-auto flex items-center gap-1 text-xs">
                      {calculateGrowth(countyComparisonData, "county2") > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : calculateGrowth(countyComparisonData, "county2") < 0 ? (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      ) : (
                        <Minus className="h-3 w-3 text-gray-500" />
                      )}
                      {Math.abs(calculateGrowth(countyComparisonData, "county2")).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Please select two counties to compare</div>
          )}
        </CardContent>
      </Card>

      {/* Manufacturer Comparison */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manufacturer Comparison</CardTitle>
              <CardDescription>Compare market performance between different manufacturers</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedMakes[0] || ""}
                onValueChange={(value) => setSelectedMakes([value, selectedMakes[1] || ""])}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select make 1" />
                </SelectTrigger>
                <SelectContent>
                  {makeData.slice(0, 15).map((make) => (
                    <SelectItem key={make.make} value={make.make}>
                      {make.make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedMakes[1] || ""}
                onValueChange={(value) => setSelectedMakes([selectedMakes[0] || "", value])}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select make 2" />
                </SelectTrigger>
                <SelectContent>
                  {makeData.slice(0, 15).map((make) => (
                    <SelectItem key={make.make} value={make.make}>
                      {make.make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {makeComparisonData.length > 0 ? (
            <>
              {renderChart(makeComparisonData, chartConfig, ["make1", "make2"])}
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[--chart-1]" />
                  <span>{selectedMakes[0]}</span>
                  {makeComparisonData.length >= 2 && (
                    <span className="ml-auto flex items-center gap-1 text-xs">
                      {calculateGrowth(makeComparisonData, "make1") > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : calculateGrowth(makeComparisonData, "make1") < 0 ? (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      ) : (
                        <Minus className="h-3 w-3 text-gray-500" />
                      )}
                      {Math.abs(calculateGrowth(makeComparisonData, "make1")).toFixed(1)}%
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[--chart-2]" />
                  <span>{selectedMakes[1]}</span>
                  {makeComparisonData.length >= 2 && (
                    <span className="ml-auto flex items-center gap-1 text-xs">
                      {calculateGrowth(makeComparisonData, "make2") > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : calculateGrowth(makeComparisonData, "make2") < 0 ? (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      ) : (
                        <Minus className="h-3 w-3 text-gray-500" />
                      )}
                      {Math.abs(calculateGrowth(makeComparisonData, "make2")).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Please select two manufacturers to compare</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
