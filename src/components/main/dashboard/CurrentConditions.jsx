import { Grid } from '@mui/material'
import { BatteryMedium, Car, ThermometerSun } from 'lucide-react'
import React from 'react'

const CurrentConditions = () => {
  return (
    <Grid container spacing={1}>
        <Grid item lg="4" md="4" sm="12" xs="12">
            <div className="card p-5 bg-orange-50 border rounded-xl border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 p-3 bg-orange-100 rounded-full">
                    <BatteryMedium size={28} className='text-orange-600' />
                    </div>
                    <div className="">
                        <span className='text-gray-500'>Battery Percentage</span>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className='text-orange-600 font-bold text-3xl'>52%</h2>
                </div>
            </div>
        </Grid>
        <Grid item lg="4" md="4" sm="12" xs="12">
            <div className="card p-5 bg-blue-50 border rounded-xl border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 p-3 bg-blue-100 rounded-full">
                        <ThermometerSun size={28} className='text-blue-600' />
                    </div>
                    <div className="">
                        <span className='text-gray-500'>Engine Temperature</span>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className='text-blue-600 font-bold text-3xl'>48° C </h2>
                </div>
            </div>
        </Grid>
        <Grid item lg="4" md="4" sm="12" xs="12">
            <div className="card p-5 bg-green-50 border rounded-xl border-green-100 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 p-3 bg-green-100 rounded-full">
                    <Car size={28} className='text-green-600' />
                    </div>
                    <div className="">
                        <span className='text-gray-500'>Possible Mileage</span>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className='text-green-600 font-bold text-3xl'>35 km</h2>
                </div>
            </div>
        </Grid> 
    </Grid>
  )
}

export default CurrentConditions