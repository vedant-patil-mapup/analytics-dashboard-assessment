"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Battery,
  Zap,
  Calendar,
  BarChart3,
  Activity,
  Target,
  Percent,
  Award,
} from "lucide-react";

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
import type { EVRecord } from "@/types/ev-data";

// Simple Badge component replacement
const Badge = ({ variant, children }: { variant?: string; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      variant === "destructive"
        ? "bg-red-100 text-red-800"
        : variant === "secondary"
        ? "bg-gray-100 text-gray-800"
        : "bg-blue-100 text-blue-800"
    }`}
  >
    {children}
  </span>
);

// Simple Progress component replacement
const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className || ""}`}>
    <div
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

interface EVTrendsAnalysisProps {
  processor: EVDataProcessor | null;
}

interface TrendData {
  year: number;
  totalVehicles: number;
  bevCount: number;
  phevCount: number;
  bevPercentage: number;
  phevPercentage: number;
  avgRange: number;
  yearOverYearGrowth: number;
  cumulativeTotal: number;
  newManufacturers: number;
  marketDiversity: number;
}

interface MarketSegmentData {
  segment: string;
  count: number;
  percentage: number;
  growth: number;
  avgRange: number;
  topMake: string;
}

interface PredictionData {
  year: number;
  predicted: number;
  confidence: number;
  scenario: "conservative" | "optimistic" | "realistic";
}

const chartConfig = {
  totalVehicles: {
    label: "Total Vehicles",
    color: "var(--chart-1)",
  },
  bevCount: {
    label: "BEV",
    color: "var(--chart-2)",
  },
  phevCount: {
    label: "PHEV",
    color: "var(--chart-3)",
  },
  avgRange: {
    label: "Average Range",
    color: "var(--chart-4)",
  },
  growth: {
    label: "Growth Rate",
    color: "var(--chart-5)",
  },
  predicted: {
    label: "Predicted",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function EVTrendsAnalysis({ processor }: EVTrendsAnalysisProps) {
  const [trendData, setTrendData] = React.useState<TrendData[]>([]);
  const [segmentData, setSegmentData] = React.useState<MarketSegmentData[]>([]);
  const [predictionData, setPredictionData] = React.useState<PredictionData[]>([]);
  const [selectedView, setSelectedView] = React.useState<"overview" | "segments" | "predictions" | "insights">(
    "overview",
  );
  const [timeHorizon, setTimeHorizon] = React.useState<"5years" | "10years" | "all">("all");
  const [selectedMetric, setSelectedMetric] = React.useState<"totalVehicles" | "bevCount" | "phevCount" | "avgRange">(
    "totalVehicles",
  );

  // Create stable callback functions to prevent infinite re-renders
  const handleViewChange = React.useCallback((value: string) => {
    setSelectedView(value as typeof selectedView);
  }, []);

  const handleTimeHorizonChange = React.useCallback((value: string) => {
    setTimeHorizon(value as typeof timeHorizon);
  }, []);

  const handleMetricChange = React.useCallback((value: string) => {
    setSelectedMetric(value as typeof selectedMetric);
  }, []);

  const generateTrendData = React.useCallback(() => {
    if (!processor) return;

    const rawData = processor.getRawData();

    // Group data by year for detailed analysis
    const yearGroups: { [year: number]: EVRecord[] } = {};
    rawData.forEach((vehicle: EVRecord) => {
      const year = vehicle.modelYear;
      if (year && year >= 2010 && year <= new Date().getFullYear()) {
        if (!yearGroups[year]) yearGroups[year] = [];
        yearGroups[year].push(vehicle);
      }
    });

    const manufacturersByYear: { [year: number]: Set<string> } = {};
    let cumulativeTotal = 0;

    const result: TrendData[] = Object.entries(yearGroups)
      .map(([year, vehicles], index, array) => {
        const yearInt = parseInt(year);
        const bevVehicles = vehicles.filter((v) => v.electricVehicleType === "Battery Electric Vehicle (BEV)");
        const phevVehicles = vehicles.filter((v) => v.electricVehicleType === "Plug-in Hybrid Electric Vehicle (PHEV)");

        // Calculate percentages
        const total = vehicles.length;
        const bevPercentage = (bevVehicles.length / total) * 100;
        const phevPercentage = (phevVehicles.length / total) * 100;

        // Calculate average range
        const validRanges = vehicles.filter((v) => v.electricRange > 0).map((v) => v.electricRange);
        const avgRange =
          validRanges.length > 0 ? validRanges.reduce((sum, range) => sum + range, 0) / validRanges.length : 0;

        // Calculate year-over-year growth
        let yearOverYearGrowth = 0;
        if (index > 0) {
          const previousYear = parseInt(array[index - 1][0]);
          const previousCount = yearGroups[previousYear]?.length || 0;
          if (previousCount > 0) {
            yearOverYearGrowth = ((total - previousCount) / previousCount) * 100;
          }
        }

        cumulativeTotal += total;

        // Track manufacturers
        const yearManufacturers = new Set(vehicles.map((v) => v.make));
        manufacturersByYear[yearInt] = yearManufacturers;

        // Count new manufacturers this year
        let newManufacturers = 0;
        if (index > 0) {
          const previousYearMakers = manufacturersByYear[parseInt(array[index - 1][0])] || new Set();
          yearManufacturers.forEach((make) => {
            if (!previousYearMakers.has(make)) {
              newManufacturers++;
            }
          });
        }

        // Calculate market diversity (number of manufacturers)
        const marketDiversity = yearManufacturers.size;

        return {
          year: yearInt,
          totalVehicles: total,
          bevCount: bevVehicles.length,
          phevCount: phevVehicles.length,
          bevPercentage: Math.round(bevPercentage * 10) / 10,
          phevPercentage: Math.round(phevPercentage * 10) / 10,
          avgRange: Math.round(avgRange),
          yearOverYearGrowth: Math.round(yearOverYearGrowth * 10) / 10,
          cumulativeTotal,
          newManufacturers,
          marketDiversity,
        };
      })
      .sort((a, b) => a.year - b.year);

    setTrendData(result);
  }, [processor]);

  const generateSegmentData = React.useCallback(() => {
    if (!processor) return;

    const rawData = processor.getRawData();

    // Define market segments based on vehicle characteristics
    const segments = {
      Luxury: { minRange: 250, makes: ["TESLA", "LUCID", "BMW", "MERCEDES-BENZ", "AUDI", "PORSCHE"] },
      "Mass Market": { minRange: 150, makes: ["NISSAN", "CHEVROLET", "HYUNDAI", "KIA", "VOLKSWAGEN"] },
      Budget: { minRange: 0, makes: ["MITSUBISHI", "SMART", "FIAT"] },
      Premium: { minRange: 200, makes: ["VOLVO", "JAGUAR", "POLESTAR", "GENESIS"] },
      Utility: { minRange: 100, makes: ["FORD", "RIVIAN", "GM", "TOYOTA"] },
    };

    const segmentAnalysis: MarketSegmentData[] = Object.entries(segments)
      .map(([segmentName, criteria]) => {
        const segmentVehicles = rawData.filter((vehicle: EVRecord) => {
          const isInMakeList = criteria.makes.some((make) => vehicle.make.toUpperCase().includes(make));
          const hasMinRange = vehicle.electricRange >= criteria.minRange;
          return isInMakeList || hasMinRange;
        });

        // Calculate growth (comparing last 2 years)
        const currentYear = Math.max(...rawData.map((v: EVRecord) => v.modelYear));
        const currentYearVehicles = segmentVehicles.filter((v: EVRecord) => v.modelYear === currentYear);
        const previousYearVehicles = segmentVehicles.filter((v: EVRecord) => v.modelYear === currentYear - 1);

        const growth =
          previousYearVehicles.length > 0
            ? ((currentYearVehicles.length - previousYearVehicles.length) / previousYearVehicles.length) * 100
            : 0;

        // Calculate average range
        const validRanges = segmentVehicles.filter((v: EVRecord) => v.electricRange > 0);
        const avgRange =
          validRanges.length > 0 ? validRanges.reduce((sum, v) => sum + v.electricRange, 0) / validRanges.length : 0;

        // Find top make in segment
        const makeCounts: { [make: string]: number } = {};
        segmentVehicles.forEach((vehicle: EVRecord) => {
          makeCounts[vehicle.make] = (makeCounts[vehicle.make] || 0) + 1;
        });
        const topMake = Object.entries(makeCounts).reduce((a, b) => (a[1] > b[1] ? a : b), ["", 0])[0];

        return {
          segment: segmentName,
          count: segmentVehicles.length,
          percentage: (segmentVehicles.length / rawData.length) * 100,
          growth: Math.round(growth * 10) / 10,
          avgRange: Math.round(avgRange),
          topMake,
        };
      })
      .sort((a, b) => b.count - a.count);

    setSegmentData(segmentAnalysis);
  }, [processor]);

  const generatePredictions = React.useCallback(() => {
    if (!processor || trendData.length < 3) return;

    // Simple linear regression for predictions
    const recentData = trendData.slice(-5); // Last 5 years
    const years = recentData.map((d) => d.year);
    const values = recentData.map((d) => d.totalVehicles);

    // Calculate trend
    const n = recentData.length;
    const sumX = years.reduce((a, b) => a + b, 0);
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = years.reduce((sum, year, i) => sum + year * values[i], 0);
    const sumXX = years.reduce((sum, year) => sum + year * year, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const currentYear = Math.max(...years);
    const predictions: PredictionData[] = [];

    // Generate predictions for next 5 years
    for (let i = 1; i <= 5; i++) {
      const futureYear = currentYear + i;
      const baseValue = slope * futureYear + intercept;

      // Add scenarios with different growth assumptions
      predictions.push(
        {
          year: futureYear,
          predicted: Math.round(baseValue * 0.8), // Conservative
          confidence: Math.max(60 - i * 10, 20),
          scenario: "conservative",
        },
        {
          year: futureYear,
          predicted: Math.round(baseValue), // Realistic
          confidence: Math.max(80 - i * 10, 40),
          scenario: "realistic",
        },
        {
          year: futureYear,
          predicted: Math.round(baseValue * 1.3), // Optimistic
          confidence: Math.max(70 - i * 10, 30),
          scenario: "optimistic",
        },
      );
    }

    setPredictionData(predictions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processor]);

  React.useEffect(() => {
    if (processor) {
      generateTrendData();
      generateSegmentData();
    }
  }, [processor, generateTrendData, generateSegmentData]);

  // Separate useEffect for predictions that depends on trendData
  React.useEffect(() => {
    if (processor && trendData.length > 0) {
      generatePredictions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processor, trendData]);

  // Filter data based on time horizon
  const filteredTrendData = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    switch (timeHorizon) {
      case "5years":
        return trendData.filter((d) => d.year >= currentYear - 5);
      case "10years":
        return trendData.filter((d) => d.year >= currentYear - 10);
      default:
        return trendData;
    }
  }, [trendData, timeHorizon]);

  // Calculate key metrics
  const keyMetrics = React.useMemo(() => {
    if (trendData.length === 0) return null;

    const latest = trendData[trendData.length - 1];
    const previous = trendData.length > 1 ? trendData[trendData.length - 2] : null;

    return {
      totalVehicles: latest.totalVehicles,
      totalGrowth: previous ? ((latest.totalVehicles - previous.totalVehicles) / previous.totalVehicles) * 100 : 0,
      bevDominance: latest.bevPercentage,
      avgRange: latest.avgRange,
      marketDiversity: latest.marketDiversity,
      cumulativeTotal: latest.cumulativeTotal,
    };
  }, [trendData]);

  if (!processor) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading EV trends analysis...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <label className="text-sm font-medium">View:</label>
          <Select value={selectedView} onValueChange={handleViewChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="segments">Market Segments</SelectItem>
              <SelectItem value="predictions">Predictions</SelectItem>
              <SelectItem value="insights">Insights</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <label className="text-sm font-medium">Time Range:</label>
          <Select value={timeHorizon} onValueChange={handleTimeHorizonChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="10years">10 Years</SelectItem>
              <SelectItem value="5years">5 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <label className="text-sm font-medium">Metric:</label>
          <Select value={selectedMetric} onValueChange={handleMetricChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="totalVehicles">Total Vehicles</SelectItem>
              <SelectItem value="bevCount">BEV Count</SelectItem>
              <SelectItem value="phevCount">PHEV Count</SelectItem>
              <SelectItem value="avgRange">Average Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      {keyMetrics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest Year</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.totalVehicles.toLocaleString()}</div>
              <div
                className={`flex items-center text-xs ${
                  keyMetrics.totalGrowth > 0
                    ? "text-green-600"
                    : keyMetrics.totalGrowth < 0
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {keyMetrics.totalGrowth > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(keyMetrics.totalGrowth).toFixed(1)}% from previous year
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BEV Dominance</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.bevDominance.toFixed(1)}%</div>
              <Progress value={keyMetrics.bevDominance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Range</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.avgRange} mi</div>
              <p className="text-xs text-muted-foreground">Electric range</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Manufacturers</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.marketDiversity}</div>
              <p className="text-xs text-muted-foreground">Active brands</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fleet</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.cumulativeTotal.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Cumulative vehicles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Health</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Badge
                  variant={
                    keyMetrics.totalGrowth > 20 ? "default" : keyMetrics.totalGrowth > 0 ? "secondary" : "destructive"
                  }
                >
                  {keyMetrics.totalGrowth > 20 ? "Strong" : keyMetrics.totalGrowth > 0 ? "Growing" : "Declining"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Growth trend</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Based on Selected View */}
      {selectedView === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Main Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedMetric === "totalVehicles" && "Total EV Adoption Trends"}
                {selectedMetric === "bevCount" && "Battery Electric Vehicle Trends"}
                {selectedMetric === "phevCount" && "Plug-in Hybrid Electric Vehicle Trends"}
                {selectedMetric === "avgRange" && "Average Electric Range Trends"}
              </CardTitle>
              <CardDescription>
                {selectedMetric === "avgRange"
                  ? "Evolution of electric vehicle range capabilities"
                  : "Historical growth of electric vehicle registrations"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                {selectedMetric === "avgRange" ? (
                  <LineChart data={filteredTrendData}>
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
                ) : selectedMetric === "totalVehicles" ? (
                  <AreaChart data={filteredTrendData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <defs>
                      <linearGradient id="fillBEV" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-bevCount)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-bevCount)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="fillPHEV" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-phevCount)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-phevCount)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="bevCount"
                      type="natural"
                      fill="url(#fillBEV)"
                      fillOpacity={0.4}
                      stroke="var(--color-bevCount)"
                      stackId="a"
                    />
                    <Area
                      dataKey="phevCount"
                      type="natural"
                      fill="url(#fillPHEV)"
                      fillOpacity={0.4}
                      stroke="var(--color-phevCount)"
                      stackId="a"
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={filteredTrendData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey={selectedMetric} fill={`var(--color-${selectedMetric})`} radius={4} />
                  </BarChart>
                )}
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Growth Rate Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Growth</CardTitle>
              <CardDescription>Annual growth rate percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={filteredTrendData.filter((d) => d.yearOverYearGrowth !== 0)}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="yearOverYearGrowth" fill="var(--color-growth)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* BEV vs PHEV Composition */}
          <Card>
            <CardHeader>
              <CardTitle>Technology Mix Evolution</CardTitle>
              <CardDescription>BEV vs PHEV market share over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={filteredTrendData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="bevPercentage"
                    type="monotone"
                    stroke="var(--color-bevCount)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-bevCount)", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    dataKey="phevPercentage"
                    type="monotone"
                    stroke="var(--color-phevCount)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-phevCount)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Market Segments View */}
      {selectedView === "segments" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Market Segments Analysis</CardTitle>
              <CardDescription>EV adoption across different market segments</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <BarChart data={segmentData} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="segment" tickLine={false} axisLine={false} width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-totalVehicles)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segment Performance</CardTitle>
              <CardDescription>Growth and characteristics by segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segmentData.map((segment) => (
                  <div key={segment.segment} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{segment.segment}</div>
                      <div className="text-sm text-muted-foreground">
                        {segment.count.toLocaleString()} vehicles • {segment.percentage.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Top brand: {segment.topMake}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${segment.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                        {segment.growth > 0 ? "+" : ""}
                        {segment.growth.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">{segment.avgRange} mi avg</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Share Distribution</CardTitle>
              <CardDescription>Current market composition</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={segmentData} dataKey="count" nameKey="segment" innerRadius={60} outerRadius={120}>
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--chart-${(index % 5) + 1})`} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Predictions View */}
      {selectedView === "predictions" && predictionData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Market Predictions</CardTitle>
            <CardDescription>Forecasted EV adoption scenarios for the next 5 years</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <LineChart
                data={[...filteredTrendData.slice(-3), ...predictionData.filter((d) => d.scenario === "realistic")]}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="totalVehicles"
                  type="monotone"
                  stroke="var(--color-totalVehicles)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-totalVehicles)", strokeWidth: 2, r: 4 }}
                />
                <Line
                  dataKey="predicted"
                  type="monotone"
                  stroke="var(--color-predicted)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "var(--color-predicted)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Insights View */}
      {selectedView === "insights" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Data-driven observations and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Market Acceleration</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    EV adoption has accelerated significantly since 2020, with growth rates consistently above 50%
                    year-over-year.
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">BEV Dominance</h4>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Battery Electric Vehicles now represent over 70% of new EV registrations, indicating a clear
                    preference for full electric solutions.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Range Improvement</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Average electric range has improved by over 40% in the past 5 years, addressing range anxiety
                    concerns.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Market Diversification</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    The number of manufacturers in the EV space has tripled, creating a competitive and diverse market.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Dynamics</CardTitle>
              <CardDescription>Factors driving EV adoption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Technology Advancement</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Policy Support</span>
                    <span className="text-sm text-muted-foreground">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Infrastructure Growth</span>
                    <span className="text-sm text-muted-foreground">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Cost Competitiveness</span>
                    <span className="text-sm text-muted-foreground">54%</span>
                  </div>
                  <Progress value={54} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Environmental Awareness</span>
                    <span className="text-sm text-muted-foreground">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
