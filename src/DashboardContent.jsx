/* eslint-disable react/prop-types */
import { StatsOverview } from './component/StatsOverview ';
import { OverviewCharts } from './component/charts/OverviewCharts';
import { GeographyCharts } from './component/charts/GeographyCharts';
import { ModelsCharts } from './component/charts/ModelsCharts';
import { TimelineCharts } from './component/charts/TimelineCharts';
import { UtilitiesCharts } from './component/charts/UtilitiesCharts';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 48, className = '' }) => (
  <div className="animate-pulse">
    <Loader2 
      className={`animate-[spin_1s_linear_infinite] ${className} z-10`} 
      size={size} 
    />
  </div>
);

const LoadingSection = ({ layout = 'default' }) => {
  if (layout === 'single') {
    return (
      <div className="grid grid-cols-1 gap-8">
        <div className="h-96 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 flex items-center justify-center animate-pulse">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[...Array(2)].map((_, i) => (
        <div 
          key={i}
          className="h-96 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 flex items-center justify-center animate-pulse"
        >
          <LoadingSpinner />
        </div>
      ))}
    </div>
  );
};

const StatsLoadingSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, i) => (
      <div 
        key={i} 
        className="h-32 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 flex items-center justify-center animate-pulse"
      >
        <LoadingSpinner size={32} />
      </div>
    ))}
  </div>
);

export const DashboardContent = ({ data, activeTab, isLoading = false }) => {
  const renderLoadingState = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <StatsLoadingSection />
            <LoadingSection />
          </>
        );
      case 'timeline':
      case 'utilities':
        return <LoadingSection layout="single" />;
      default:
        return <LoadingSection />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <StatsOverview stats={data.stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <OverviewCharts data={data} />
            </div>
          </>
        );
      
      case 'geography':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GeographyCharts data={data} />
          </div>
        );
      
      case 'models':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ModelsCharts data={data} />
          </div>
        );
      
      case 'timeline':
        return (
          <div className="grid grid-cols-1 gap-8">
            <TimelineCharts data={data} />
          </div>
        );
      
      case 'utilities':
        return (
          <div className="grid grid-cols-1 gap-8">
            <UtilitiesCharts data={data} />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {isLoading ? renderLoadingState() : renderContent()}
    </div>
  );
};