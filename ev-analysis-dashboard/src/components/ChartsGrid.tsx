import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Calendar, MapPin, Users, Zap, Globe, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import type { ChartData } from "../types/EVTypes";
import { getThemeClasses } from "../constants/theme";

interface ChartsGridProps {
  chartData: ChartData;
  colors: string[];
  isDark: boolean;
}

const ChartsGrid: React.FC<ChartsGridProps> = ({
  chartData,
  colors,
  isDark,
}) => {
  const theme = getThemeClasses(isDark);

  const tooltipStyle = {
    backgroundColor: isDark ? "rgba(17, 24, 39, 0.95)" : "rgba(255, 255, 255, 0.95)",
    border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
    borderRadius: "12px",
    color: isDark ? "#F9FAFB" : "#374151",
    backdropFilter: "blur(8px)",
    boxShadow: isDark 
      ? "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" 
      : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "12px 16px",
    fontSize: "13px",
    fontWeight: "500",
  };

  const axisProps = {
    tick: { 
      fill: isDark ? "#9CA3AF" : "#6B7280",
      fontSize: 12,
      fontWeight: 500
    },
    axisLine: { 
      stroke: isDark ? "#374151" : "#E5E7EB",
      strokeWidth: 1
    },
    tickLine: { 
      stroke: isDark ? "#4B5563" : "#D1D5DB",
      strokeWidth: 1
    },
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={tooltipStyle}>
          <p className="font-semibold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
              {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Top Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-5 xl:gap-6 mb-6 sm:mb-8">
        {/* Year Trends */}
        <Card className={`${theme.card} group hover:shadow-xl transition-all duration-500 border-2 hover:border-blue-500/30 overflow-hidden relative`}>
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center justify-between" isDark={isDark}>
              <div className="flex items-center">
                <div className="p-1.5 sm:p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-3 shadow-lg">
                  <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    EV Adoption Trends
                  </h3>
                  <p className={`text-xs ${theme.text.secondary} mt-0.5`}>Year-over-year growth</p>
                </div>
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData.yearData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[0]} stopOpacity={0.9} />
                    <stop offset="50%" stopColor={colors[0]} stopOpacity={0.6} />
                    <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <XAxis 
                  dataKey="year" 
                  {...axisProps}
                  tick={{ ...axisProps.tick, dy: 10 }}
                />
                <YAxis 
                  {...axisProps}
                  tick={{ ...axisProps.tick, dx: -10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke={colors[0]}
                  strokeWidth={3}
                  fill="url(#colorCount)"
                  filter="url(#glow)"
                  dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: colors[0], strokeWidth: 2, fill: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Cities */}
        <Card className={`${theme.card} group hover:shadow-xl transition-all duration-500 border-2 hover:border-green-500/30 overflow-hidden relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center justify-between" isDark={isDark}>
              <div className="flex items-center">
                <div className="p-1.5 sm:p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mr-3 shadow-lg">
                  <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Top Cities by EV Count
                  </h3>
                  <p className={`text-xs ${theme.text.secondary} mt-0.5`}>Leading metropolitan areas</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData.topCities} layout="horizontal" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                <XAxis 
                  type="number" 
                  {...axisProps}
                  tick={{ ...axisProps.tick, dx: 10 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={90}
                  tick={{ ...axisProps.tick, fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  radius={[0, 8, 8, 0]}
                  fill="url(#barGradient)"
                >
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={colors[1]} stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  {chartData.topCities.map((_, index) => (
                    <Cell key={index} fill={colors[1]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-5 xl:gap-6 mb-6 sm:mb-8">
        {/* Make Distribution */}
        <Card className={`${theme.card} group hover:shadow-xl transition-all duration-500 border-2 hover:border-purple-500/30 overflow-hidden relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center" isDark={isDark}>
              <div className="p-1.5 sm:p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mr-3 shadow-lg">
                <Users className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
              </div>
              <div>
                <h3 className="text-[16px] sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Top Manufacturers
                </h3>
                <p className={`text-xs ${theme.text.secondary} mt-0.5`}>Market share breakdown</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <defs>
                  {colors.map((color, index) => (
                    <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={color} stopOpacity={1} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={chartData.makeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={3}
                  strokeWidth={2}
                  stroke={isDark ? "#1F2937" : "#FFFFFF"}
                >
                  {chartData.makeData.map((_, index) => (
                    <Cell 
                      key={index} 
                      fill={`url(#gradient${index % colors.length})`}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: theme.text.muted,
                    paddingTop: "20px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* EV Type Distribution */}
        <Card className={`${theme.card} group hover:shadow-xl transition-all duration-500 border-2 hover:border-orange-500/30 overflow-hidden relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center" isDark={isDark}>
              <div className="p-1.5 sm:p-2.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mr-3 shadow-lg">
                <Zap className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
              </div>
              <div>
                <h3 className="text-[16px] sm:text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  EV Types
                </h3>
                <p className={`text-xs ${theme.text.secondary} mt-0.5`}>Vehicle categorization</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <defs>
                  {colors.map((color, index) => (
                    <linearGradient key={index} id={`gradientEV${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={color} stopOpacity={1} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={chartData.evTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={3}
                  strokeWidth={2}
                  stroke={isDark ? "#1F2937" : "#FFFFFF"}
                >
                  {chartData.evTypeData.map((_, index) => (
                    <Cell 
                      key={index} 
                      fill={`url(#gradientEV${index % colors.length})`}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: theme.text.muted,
                    paddingTop: "20px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* State Distribution */}
        <Card className={`${theme.card} group hover:shadow-xl transition-all duration-500 border-2 hover:border-teal-500/30 overflow-hidden relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center" isDark={isDark}>
              <div className="p-2.5 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl mr-3 shadow-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  State Distribution
                </h3>
                <p className={`text-xs ${theme.text.secondary} mt-0.5`}>Geographic coverage</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData.stateData.slice(0, 8)} margin={{ top: 5, right: 30, left: 0, bottom: 60 }}>
                <defs>
                  <linearGradient id="stateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[2]} stopOpacity={0.9} />
                    <stop offset="95%" stopColor={colors[2]} stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  tick={{ ...axisProps.tick, fontSize: 10, fontWeight: 600 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis 
                  {...axisProps}
                  tick={{ ...axisProps.tick, dx: -10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="url(#stateGradient)"
                  radius={[8, 8, 0, 0]}
                  strokeWidth={2}
                  stroke={colors[2]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ChartsGrid;