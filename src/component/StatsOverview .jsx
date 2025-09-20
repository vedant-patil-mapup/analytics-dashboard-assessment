/* eslint-disable react/prop-types */
import { Car, Battery, TrendingUp, Zap } from 'lucide-react';
import { StatsCard } from './StatsCard';

export const StatsOverview = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatsCard
      title="Most EVs in City"
      value={stats.topCity}
      subtext={`City with the highest number of EVs`}
      icon={Car}
    />
    <StatsCard
      title="Average EV Range"
      value={`${stats.averageRange} mi`}
      subtext={`Maximum range: ${stats.electricRangeStats.max} mi`}
      icon={Battery}
    />
    <StatsCard
      title="Top Market Leader"
      value={stats.marketLeader}
      subtext={`${stats.uniqueMakes} Makes Available`}
      icon={TrendingUp}
    />
    <StatsCard
      title="CAFV Eligibility Rate"
      value={`${stats.cafvEligible}%`}
      subtext="Clean Alternative Fuel Vehicles"
      icon={Zap}
    />
  </div>
);
