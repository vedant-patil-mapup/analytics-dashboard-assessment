import React from 'react'
import { Car, Battery, TrendingUp, MapPin } from 'lucide-react';
import { InsightCard} from './InsightCard.jsx';

const Insights = ({stats}) => {
  const colors = ["#097055","#24007e","#735300","#2b7400"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
   <InsightCard
    title="Most Popular Manufacturer"
    value={stats.topManufacturer}
    subtext={`${stats.manufacturerPercentage}% of all EVs`}
    icon={TrendingUp}
    style={{ backgroundColor: '#097055' }}
  />
  <InsightCard
    title="Most Common Vehicle Type"
    value={stats.topVehicleType}
    subtext={`${stats.vehicleTypePercentage}% of all EVs`}
    icon={Car}
    style={{ backgroundColor: '#24007e' }}
  />
   <InsightCard
    title="Average EV Range"
    value={`${stats.averageRange} mi`}
    subtext={`Maximum range: ${stats.electricRangeStats.max} mi`}
    icon={Battery}
    style={{ backgroundColor: '#2b7400' }}
  />
  <InsightCard
    title="City with Most EVs"
    value={stats.topCity}
    subtext={`City with the highest number of EVs`}
    icon={MapPin}
    style={{ backgroundColor: '#097055' }}
  />
  
</div>

  )
}

export default Insights