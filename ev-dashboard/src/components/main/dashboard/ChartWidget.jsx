import React, { useState } from "react";
import ReactApexChart from "react-apexcharts"; // Make sure you import from 'react-apexcharts'
import { Link } from "react-router-dom";

const ChartWidget = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Traveled last month",
        data: [
          [1327359600000, 30.95],
          [1327446000000, 31.34],
          [1327532400000, 31.18],
          [1327618800000, 31.05],
          [1327878000000, 31.0],
          [1327964400000, 30.95],
          [1328050800000, 31.24],
          [1328137200000, 31.29],
          [1328223600000, 31.85],
          [1328482800000, 31.86],
          [1328569200000, 32.28],
          [1328655600000, 32.1],
          [1328742000000, 32.65],
          [1328828400000, 32.21],
          [1329087600000, 32.35],
          [1329174000000, 32.44],
          [1329260400000, 32.46],
          [1329346800000, 32.86],
          [1329433200000, 32.75],
          [1329778800000, 32.54],
          [1329865200000, 32.33],
          [1329951600000, 32.97],
          [1330038000000, 33.41],
          [1330297200000, 33.27],
          [1330383600000, 33.27],
          [1330470000000, 32.89],
          [1330556400000, 33.1],
          [1330642800000, 33.73],
          [1330902000000, 33.22],
          [1330988400000, 31.99],
          [1331074800000, 32.41],
          [1331161200000, 33.05],
          [1331247600000, 33.64],
          [1331506800000, 33.56],
          [1331593200000, 34.22],
          [1331679600000, 33.77],
          [1331766000000, 34.17],
          [1331852400000, 33.82],
          [1332111600000, 34.51],
          [1332198000000, 33.16],
          [1332284400000, 33.56],
          [1332370800000, 33.71],
          [1332457200000, 33.81],
          [1332712800000, 34.4],
          [1332799200000, 34.63],
          [1332885600000, 34.46],
          [1332972000000, 34.48],
          [1333058400000, 34.31],
          [1333317600000, 34.7],
          [1333404000000, 34.31],
          [1333490400000, 33.46],
          [1333576800000, 33.59],
          [1333922400000, 33.22],
          [1334008800000, 32.61],
          [1334095200000, 33.01],
          [1334181600000, 33.55],
          [1334268000000, 33.18],
          [1334527200000, 32.84],
          [1334613600000, 33.84],
          [1334700000000, 33.39],
          [1334786400000, 32.91],
          [1334872800000, 33.06],
          [1335132000000, 32.62],
          [1335218400000, 32.4],
          [1335304800000, 33.13],
          [1335391200000, 33.26],
          [1335477600000, 33.58],
          [1335736800000, 33.55],
          [1335823200000, 33.77],
          [1335909600000, 33.76],
          [1335996000000, 33.32],
          [1336082400000, 32.61],
          [1336341600000, 32.52],
          [1336428000000, 32.67],
          [1336514400000, 32.52],
          [1336600800000, 31.92],
          [1336687200000, 32.2],
          [1336946400000, 32.23],
          [1337032800000, 32.33],
          [1337119200000, 32.36],
          [1337205600000, 32.01],
          [1337292000000, 31.31],
          [1337551200000, 32.01],
          [1337637600000, 32.01],
          [1337724000000, 32.18],
          [1337810400000, 31.54],
          [1337896800000, 31.6],
          [1338242400000, 32.05],
          [1338328800000, 31.29],
          [1338415200000, 31.05],
          [1338501600000, 29.82],
          [1338760800000, 30.31],
          [1338847200000, 30.7],
          [1338933600000, 31.69],
          [1339020000000, 31.32],
          [1339106400000, 31.65],
          [1339365600000, 31.13],
          [1339452000000, 31.77],
          [1339538400000, 31.79],
          [1339624800000, 31.67],
          [1339711200000, 32.39],
          [1339970400000, 32.63],
          [1340056800000, 32.89],
          [1340143200000, 31.99],
          [1340229600000, 31.23],
          [1340316000000, 31.57],
          [1340575200000, 30.84],
          [1340661600000, 31.07],
          [1340748000000, 31.41],
          [1340834400000, 31.17],
          [1340920800000, 32.37],
          [1341180000000, 32.19],
          [1341266400000, 32.51],
          [1341439200000, 32.53],
          [1341525600000, 31.37],
          [1341784800000, 30.43],
          [1341871200000, 30.44],
          [1341957600000, 30.2],
          [1342044000000, 30.14],
          [1342130400000, 30.65],
          [1342389600000, 30.4] 
        ],
        backgroundColor: "transparent",
        borderColor: "transparent",
        pointBorderColor: "transparent",
        pointBorderWidth: 1,
        tension: 0.5,
      },
    ],
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        height: 230,
        toolbar: "false",
        foreColor: "#111",
        background: "transparent",
        sparkline: {
          enabled: false,
        },
        zoom: {
          autoScaleYaxis: true,
        },
      },

      annotations: {
        yaxis: [
          {
            y: 3    ,
            borderColor: "transparent",
          },
        ],
        xaxis: [
          {
            x: new Date("14 Nov 2012").getTime(),
            borderColor: "transparent",
            yAxisIndex: 0,
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: "hollow",
        colors: "#556ee6",
        strokeColors: "transparent",
        strokeWidth: 0,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: undefined,
          sizeOffset: 5,
        },
      },

      xaxis: {
        type: "datetime",
        min: new Date("01 Mar 2012").getTime(),
        tickAmount: 12,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: "dark",
      },
      grid: {
        xaxis: { lines: { show: false } },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#ea580c"],
        opacity: 0.3,
      },
      fill: {
        type: "gradient",
        colors: "#ea580c",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0.05,
          stops: [42, 100, 100, 100],
        },
      },
    },
  });

  return (
    <>
      <div class="flex items-center justify-between my-3">
        <h4 className="text-lg font-bold">Activity</h4>
        <Link to="/" className="text-sm text-amber-600">
          View All
        </Link>
      </div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={265}
      />
    </>
  );
};

export default ChartWidget;
