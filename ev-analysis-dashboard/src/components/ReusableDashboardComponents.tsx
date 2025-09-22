import React from "react";
import {
  Car,
  Globe,
  Award,
  MapPin,
  Download,
  Filter,
  Moon,
  Sun,
  CarFrontIcon,
} from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import type { ChartData } from "../types/EVTypes";
import { getThemeClasses } from "../constants/theme";

//error display component
interface ErrorDisplayProps {
  error: string;
  isDark: boolean;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  isDark,
}) => (
  <div
    className={`${
      isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    } min-h-screen flex items-center justify-center`}
  >
    <div className="text-center">
      <div className="text-red-500 text-xl mb-2">⚠️</div>
      <p className="text-red-500">{error}</p>
    </div>
  </div>
);

//summary cards component
interface SummaryCardsProps {
  filteredDataLength: number;
  chartData: ChartData;
  isDark: boolean;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  filteredDataLength,
  chartData,
  isDark,
}) => {
  const theme = getThemeClasses(isDark);

  const metrics = [
    {
      title: "Total Vehicles",
      value: filteredDataLength.toLocaleString(),
      icon: Car,
      color: "blue",
    },
    {
      title: "Unique States",
      value: chartData.stateData.length,
      icon: Globe,
      color: "green",
    },
    {
      title: "Top Manufacturers",
      value: chartData.makeData.length,
      icon: Award,
      color: "purple",
    },
    {
      title: "Cities Covered",
      value: chartData.topCities.length,
      icon: MapPin,
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-5">
      {metrics.map((metric) => (
        <Card
          key={metric.title}
          className={`${theme.card} hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1`}
        >
          <CardContent className="md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-[11.5px] sm:text-sm font-medium ${theme.text.secondary}`}>
                  {metric.title}
                </p>
                <p className="text-[15px] sm:text-[22px] font-bold mt-2">{metric.value}</p>
              </div>
              <div
                className={`p-1.5 sm:p-3 rounded-full ${
                  metric.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : metric.color === "green"
                    ? "bg-green-100 text-green-600"
                    : metric.color === "purple"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                <metric.icon className="h-4.5 sm:h-6 w-4.5 sm:w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

//header component
interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  exportData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  toggleTheme,
  showFilters,
  setShowFilters,
  exportData,
}) => {
  const theme = getThemeClasses(isDark);

  return (
    <div
      className={`sticky top-0 z-50 ${theme.header} backdrop-blur-sm border-b ${theme.border}`}
    >
      <div className= "px-4 sm:px-6 py-3 sm:py-2.5">
        <div className="flex flex-col sm:flex-row  sm:items-center justify-between gap-2.5 sm:gap-0">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-green-800 rounded-xl md:rounded-2xl">
              <CarFrontIcon className="h-4.5 md:h-6 w-4.5 md:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-[17px] md:text-[21px] font-semibold">EV Analytics Dashboard</h1>
              <p className={`text-[12px] md:text-[13.5px] ${theme.text.secondary}`}>
                Comprehensive Electric Vehicle Data Analysis
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={exportData}
              className={`flex items-center px-3 py-1.5 rounded-xl text-[13.5px] md:text-[14.5px] transition-colors cursor-pointer ${theme.button}`}
            >
              <Download className="h-3.5 md:h-4 w-3.5 md:w-4 mr-2" />
              Export
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-3 py-1.5 rounded-xl text-[13.5px] md:text-[14.5px] cursor-pointer transition-colors ${
                showFilters ? "bg-green-500 text-white" : theme.button
              }`}
            >
              <Filter className="h-3.5 md:h-4 w-3.5 md:w-4 mr-2" />
              Filters
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${theme.button}`}
            >
              {isDark ? (
                <Sun className="h-4 md:h-5 w-4 md:w-5" />
              ) : (
                <Moon className="h-4 md:h-5 w-4 md:w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//loading spinner component
interface LoadingSpinnerProps {
  isDark: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isDark }) => (
  <div
    className={`${
      isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    } min-h-screen flex items-center justify-center`}
  >
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p>Loading EV Data...</p>
    </div>
  </div>
);


// Metric Card Component 
export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  theme: any;
  hoverEffect?: boolean;
  className: string;
}> = ({ title, value, description, icon, gradient, theme, hoverEffect = true, className }) => (
  <div className={`${theme.card} px-3 sm:px-5 py-3 sm:py-4 rounded-2xl border ${theme.border} ${
    hoverEffect ? 'hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' : 'transition-all duration-200'
  }`}>
    <div className="flex items-center justify-between mb-1 ">
      <h3 className=" text-[13px] sm:text-[15px] leading-tight">{title}</h3>
      <div className={`p-1.5 sm:p-2 ${gradient} rounded-xl shadow-lg`}>
        {icon}
      </div>
    </div>
    <div className={`font-semibold mb-1 leading-tight ${className}`}>
      {value}
    </div>
    <p className={`text-[11px] sm:text-[12.5px]  ${theme.text.secondary} leading-tight`}>
      {description}
    </p>
  </div>
);