import { ArrowLeftRight, Flame, PlugZap } from 'lucide-react'
import React from 'react'

const FuelProgress = () => {
  return (
    <div className='flex items-center justify-center gap-10'> 
      <div className="w-24 h-24 border-4 rounded-full items-center justify-center flex bg-orange-50">
          <div className="text-center m-auto"> 
              <Flame size={20} className='text-gray-500 m-auto text-xs'  />
              <span className='text-orange-600 text-xl font-bold'>
                32%
              </span>
              <h6 className='text-xs'>Fuel</h6>
          </div>
      </div>  
      <div className="w-24 h-24 border-4 rounded-full items-center justify-center flex bg-blue-50">
          <div className="text-center">
              <ArrowLeftRight size={20} className='text-gray-500 m-auto text-xs'  />
              <span className='text-blue-700 text-xl font-bold'>
                157KM
              </span>
              <h6 className='text-xs'>Range</h6>
          </div>
      </div>  
      <div className="w-24 h-24 border-4 rounded-full items-center justify-center flex bg-red-50">
          <div className="text-center"> 
              <PlugZap size={20} absoluteStrokeWidth className='text-gray-500 m-auto text-xs'   />
              <span className='text-orange-600 text-xl font-bold'>
                8%
              </span>
              <h6 className='text-xs'>Break Fuel</h6>
          </div>
      </div> 
    </div>
  )
}

export default FuelProgress