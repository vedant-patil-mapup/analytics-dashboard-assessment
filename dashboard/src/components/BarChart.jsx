import React from 'react'
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
    const {data, options} = props;
    if (Object.keys(data).length <= 0) return <></>;
  return (
    <div style={{height: '100%'}}>
        <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart