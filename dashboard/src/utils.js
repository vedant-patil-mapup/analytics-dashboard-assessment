export const getDataBasedOnEVType = (csvDataList) => {
    const plugInVehicleCount = csvDataList.map(item => item['Electric Vehicle Type']).filter(item => item === 'Plug-in Hybrid Electric Vehicle (PHEV)').length;

    const dataOptions = {
      labels: ['Battery Electric Vehicle (BEV)', 'Plug-in Hybrid Electric Vehicle (PHEV)'],
      datasets: [
        {
          data: [csvDataList.length-plugInVehicleCount, plugInVehicleCount]
        }
      ],
    };

    return dataOptions;
}


export const getDataBasedOnModel = (csvDataList) => {
  const modelObj = {};
  const modelGroup = csvDataList.map(item => item['Model']);

  for (let item of modelGroup) {
    if (modelObj.hasOwnProperty(item)) {
      modelObj[item] = modelObj[item]+1;
    } else {
      modelObj[item] = 1;
    }
  }

  return {
    labels: Object.keys(modelObj),
    datasets: [{
      axis: 'y',
      label: 'Growth of EV based on Model',
      data: Object.values(modelObj)
    }]
  };

}

export const getElectricRangeVsBaseMSRPData = (csvDataList) => {
  const eletricVsBaseMSRPObject = {};

  for (let item of csvDataList) {
    const key = item['Electric Range'];
    const value = item['Base MSRP'];

    eletricVsBaseMSRPObject[key] = value;
  }

  return {
    labels: Object.keys(eletricVsBaseMSRPObject),
    datasets: [
      {
        label: 'Electric Range VS Base MSRP',
        data: Object.values(eletricVsBaseMSRPObject)
      }
    ]
  };
}

export const getVehicleEligibilityData = (csvDataList) => {
  const eligibilityObject = {};

  for (let item of csvDataList) {
    const key = item['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
    if (eligibilityObject.hasOwnProperty(key)) {
      eligibilityObject[key] += 1;
    } else {
      eligibilityObject[key] = 1;
    }
  }

  return {
    labels: Object.keys(eligibilityObject),
    datasets: [
      {
        label: 'Eligibility',
        data: Object.values(eligibilityObject)
      }
    ]
  };
}

export const getEVBasedOnLocation = (csvDataList) => {
  const locationObject = {};

  for (let item of csvDataList) {
    const key = item['County'];
    if (locationObject.hasOwnProperty(key)) {
      locationObject[key] += 1;
    } else {
      locationObject[key] = 1;
    }
  }

  return {
    labels: Object.keys(locationObject),
    datasets: [
      {
        label: 'Growth of EV based on County',
        data: Object.values(locationObject)
      }
    ]
  };
}

export const BACKGROUND_COLOR_LIST = [
  "rgb(133, 118, 255)",
  "rgb(123, 201, 255)",
  "rgb(163, 255, 214)",
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)'
];