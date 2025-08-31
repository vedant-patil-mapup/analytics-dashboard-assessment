"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { YearlyData } from "@/types/ev-data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, AreaChart, Area } from "recharts";

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
  cumulativeBEV: {
    label: "Cumulative BEV",
    color: "var(--chart-2)",
  },
  cumulativePHEV: {
    label: "Cumulative PHEV",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface AdoptionTrendsProps {
  data: YearlyData[];
  loading?: boolean;
}

export function AdoptionTrends({ data, loading = false }: AdoptionTrendsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-5 bg-muted rounded animate-pulse w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      {/* Total EV Registrations Over Time */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>EV Adoption Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => new Intl.NumberFormat().format(value)} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--color-count)"
                strokeWidth={2}
                dot={{ fill: "var(--color-count)", strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* BEV vs PHEV Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>BEV vs PHEV</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(value) => value.toString()} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="bevCount" stackId="a" fill="var(--color-bevCount)" />
              <Bar dataKey="phevCount" stackId="a" fill="var(--color-phevCount)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Cumulative Growth */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Cumulative EV Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart
              data={data.map((item, index) => ({
                ...item,
                cumulativeTotal: data.slice(0, index + 1).reduce((sum, d) => sum + d.count, 0),
                cumulativeBEV: data.slice(0, index + 1).reduce((sum, d) => sum + d.bevCount, 0),
                cumulativePHEV: data.slice(0, index + 1).reduce((sum, d) => sum + d.phevCount, 0),
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => new Intl.NumberFormat().format(value)} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="cumulativeBEV"
                stackId="1"
                stroke="var(--color-cumulativeBEV)"
                fill="var(--color-cumulativeBEV)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="cumulativePHEV"
                stackId="1"
                stroke="var(--color-cumulativePHEV)"
                fill="var(--color-cumulativePHEV)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
