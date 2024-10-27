import { ArrowLeftRight, Flame, PlugZap } from 'lucide-react';
import React from 'react';
import sportsCarVideo from '../../../assets/images/animated-maps-electric-vehicle-charging-stations-and-us-interstates-2022_ZBpbC2uA.mp4'; // Correct path to the image

const FuelProgress = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center justify-center gap-8'> 
        {/* Fuel */}
        <div className="w-28 h-28 border-4 border-orange-400 rounded-full flex flex-col items-center justify-center bg-orange-50 shadow-lg">
            <Flame size={24} className='text-gray-500 mb-1' />
            <span className='text-orange-600 text-2xl font-bold'>
              32%
            </span>
            <h6 className='text-xs text-gray-700'>Fuel</h6>
        </div>  

        {/* Range */}
        <div className="w-28 h-28 border-4 border-blue-500 rounded-full flex flex-col items-center justify-center bg-blue-50 shadow-lg">
            <ArrowLeftRight size={24} className='text-gray-500 mb-1' />
            <span className='text-blue-700 text-2xl font-bold'>
              157KM
            </span>
            <h6 className='text-xs text-gray-700'>Range</h6>
        </div>  

        {/* Brake Fuel */}
        <div className="w-28 h-28 border-4 border-red-500 rounded-full flex flex-col items-center justify-center bg-red-50 shadow-lg">
            <PlugZap size={24} className='text-gray-500 mb-1' />
            <span className='text-orange-600 text-2xl font-bold'>
              8%
            </span>
            <h6 className='text-xs text-gray-700'>Brake Fuel</h6>
        </div> 
      </div>
      
      {/* Video Section */}
      <div className="mt-6">
        <video 
          src={sportsCarVideo} // Use the imported video here
          autoPlay 
          loop 
          muted 
          className="w-45 h-auto rounded-lg shadow-md" // Adjust width and styles as needed
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default FuelProgress;
