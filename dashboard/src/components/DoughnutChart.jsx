import React from 'react'
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
    const {data, options} = props;
    if (Object.keys(data).length <= 0) return <></>;
  return (
    <div style={{height: '100%'}}>
        <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutChart;