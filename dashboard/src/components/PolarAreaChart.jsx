import React from 'react'
import { PolarArea } from 'react-chartjs-2'

const PolarAreaChart = (props) => {
    const {data, options} = props;
    if (Object.keys(data).length <= 0) return <></>;
  return (
    <div style={{height:'100%'}}>
        <PolarArea data={data} options={options} />
    </div>
  )
}

export default PolarAreaChart