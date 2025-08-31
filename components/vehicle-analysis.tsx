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
import { MakeData, ModelData, RangeDistribution } from "@/types/ev-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const chartConfig = {
  count: {
    label: "Vehicle Count",
    color: "var(--chart-1)",
  },
  avgRange: {
    label: "Average Range",
    color: "var(--chart-2)",
  },
  percentage: {
    label: "Percentage",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface VehicleAnalysisProps {
  makeData: MakeData[];
  modelData: ModelData[];
  rangeData: RangeDistribution[];
  loading?: boolean;
}

export function VehicleAnalysis({ makeData, modelData, rangeData, loading = false }: VehicleAnalysisProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
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

  const topMakes = makeData.slice(0, 8);
  const topModels = modelData.slice(0, 10);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Top Manufacturers */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Manufacturers</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={topMakes} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="make" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={60} interval={0} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(value) => new Intl.NumberFormat().format(value)} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Electric Range Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Range Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={rangeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="var(--color-count)"
                dataKey="count"
                nameKey="rangeGroup"
              >
                {rangeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`var(--chart-${(index % 5) + 1})`} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Models Table */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Most Popular Models</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Rank</th>
                  <th className="text-left p-2">Make</th>
                  <th className="text-left p-2">Model</th>
                  <th className="text-right p-2">Count</th>
                  <th className="text-right p-2">Avg Range</th>
                  <th className="text-right p-2">Avg Year</th>
                  <th className="text-right p-2">Market Share</th>
                </tr>
              </thead>
              <tbody>
                {topModels.map((model, index) => {
                  const totalVehicles = modelData.reduce((sum, m) => sum + m.count, 0);
                  const marketShare = ((model.count / totalVehicles) * 100).toFixed(1);
                  return (
                    <tr key={`${model.make}-${model.model}`} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">#{index + 1}</td>
                      <td className="p-2 font-medium">{model.make}</td>
                      <td className="p-2">{model.model}</td>
                      <td className="p-2 text-right font-mono">{new Intl.NumberFormat().format(model.count)}</td>
                      <td className="p-2 text-right">{model.avgRange > 0 ? `${model.avgRange} mi` : "N/A"}</td>
                      <td className="p-2 text-right">{model.avgYear}</td>
                      <td className="p-2 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <span>{marketShare}%</span>
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${Math.min(parseFloat(marketShare) * 4, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Manufacturer Statistics */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Manufacturer Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {topMakes.slice(0, 4).map((make) => (
              <div key={make.make} className="border rounded-lg p-4">
                <h4 className="font-semibold text-lg">{make.make}</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicles:</span>
                    <span className="font-medium">{new Intl.NumberFormat().format(make.count)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Share:</span>
                    <span className="font-medium">{make.percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Range:</span>
                    <span className="font-medium">{make.avgRange} mi</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
