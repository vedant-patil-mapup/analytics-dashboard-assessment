"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { CountyData } from "@/types/ev-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { MapPin, TrendingUp, Users, Award } from "lucide-react";

const chartConfig = {
  count: {
    label: "Vehicle Count",
    color: "var(--chart-1)",
  },
  percentage: {
    label: "Percentage",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface GeographicAnalysisProps {
  data: CountyData[];
  loading?: boolean;
}

export function GeographicAnalysis({ data, loading = false }: GeographicAnalysisProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-5 bg-muted rounded animate-pulse w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Calculate summary statistics
  const totalVehicles = data.reduce((sum, county) => sum + county.count, 0);
  const totalCounties = data.length;
  const topCounty = data[0];
  const avgPerCounty = totalVehicles / totalCounties;

  // Top 10 counties for the bar chart
  const topCounties = data.slice(0, 10);

  // Top 5 counties for pie chart, group others
  const topCountiesForPie = data.slice(0, 5);
  const otherCount = data.slice(5).reduce((sum, county) => sum + county.count, 0);
  const otherPercentage = data.slice(5).reduce((sum, county) => sum + county.percentage, 0);

  const pieData = [
    ...topCountiesForPie,
    ...(otherCount > 0
      ? [
          {
            county: "Others",
            count: otherCount,
            percentage: Number(otherPercentage.toFixed(2)),
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVehicles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across Washington State</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Counties</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCounties}</div>
            <p className="text-xs text-muted-foreground">With EV registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top County</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topCounty?.county || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              {topCounty?.count.toLocaleString()} vehicles ({topCounty?.percentage}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgPerCounty).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Vehicles per county</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Counties Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Counties by EV Count</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <BarChart data={topCounties} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="county" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} interval={0} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(value) => new Intl.NumberFormat().format(value)} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* County Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>County Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="var(--color-count)"
                  dataKey="count"
                  nameKey="county"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`var(--chart-${(index % 5) + 1})`} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* County Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle>County Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Rank</th>
                  <th className="text-left p-2">County</th>
                  <th className="text-right p-2">Vehicle Count</th>
                  <th className="text-right p-2">Percentage</th>
                  <th className="text-right p-2">Market Share</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 15).map((county, index) => (
                  <tr key={county.county} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">#{index + 1}</td>
                    <td className="p-2">{county.county}</td>
                    <td className="p-2 text-right font-mono">{new Intl.NumberFormat().format(county.count)}</td>
                    <td className="p-2 text-right">{county.percentage}%</td>
                    <td className="p-2 text-right">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min(county.percentage * 2, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
