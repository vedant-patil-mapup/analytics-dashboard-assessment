import './App.css';
import Papa from 'papaparse';
import {useState, useEffect, useRef} from 'react';
import CSVData from './data-to-visualize/Electric_Vehicle_Population_Data.csv';
import 'chart.js/auto';
import { getDataBasedOnEVType, getDataBasedOnModel, getElectricRangeVsBaseMSRPData, getEVBasedOnLocation, getVehicleEligibilityData, BACKGROUND_COLOR_LIST } from './utils';
import DoughnutChart from './components/DoughnutChart';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PolarAreaChart from './components/PolarAreaChart';
import EVTable from './components/EVTable/EVTable';


function App() {
  const appMountRef = useRef(false);
  const [csvDataList, setCSVDataList] = useState([]);
  const [evTypeData, setEVTypeData] = useState({
    data: {}
  });

  const [modelData, setModelData] = useState({
    data: {}
  });

  const [electricBaseMSRP, setElectricBaseMSRP] = useState({
    data: {}
  });

  const [eligibilityData, setEligibilityData] = useState({
    data: {}
  });

  const [locationData, setLocationData] = useState({
    data: {}
  });

  useEffect(() => {
    if (!appMountRef.current) return;
    appMountRef.current = true;
    getCSVData();

    return () => appMountRef.current = false; 
  }, []);

  useEffect(() => {
    if (csvDataList.length <= 0) return;
    
    const evDataTypeOptions = getDataBasedOnEVType(csvDataList);

    const modelDataOptions = getDataBasedOnModel(csvDataList);

    const electricBaseMSRPOptions = getElectricRangeVsBaseMSRPData(csvDataList);

    const eligibilityOptions = getVehicleEligibilityData(csvDataList);

    const locationOptions = getEVBasedOnLocation(csvDataList);

    setEVTypeData(prev => ({...prev, 'data': {...evDataTypeOptions}}));

    setModelData(prev => ({...prev, 'data': {...modelDataOptions}}));

    setElectricBaseMSRP(prev => ({...prev, 'data': {...electricBaseMSRPOptions}}));

    setEligibilityData(prev => ({...prev, 'data': eligibilityOptions}));

    setLocationData(prev => ({...prev, 'data': locationOptions}));

  }, [csvDataList]);


  const getCSVData = () => {
    const csvRows = [];
    Papa.parse(CSVData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      download: true,
      step: function(row) {
        csvRows.push(row?.data);
      },
      complete: function(results) {
        setCSVDataList(csvRows);
      }
    });
  }

  return (
    <div className="App" ref={appMountRef}>
      <h1>Electric Vehicle Dashboard</h1>
      <div className='top-charts mb-90'>
        <div>
          <DoughnutChart data={evTypeData.data} options={{
            backgroundColor: BACKGROUND_COLOR_LIST,
            borderRadius: '10',
            color: '#fff'
          }} />
          <h4>Count of BEV Vs PHEV</h4>
        </div>

        <div>
          <PolarAreaChart data={eligibilityData.data} options={{
              backgroundColor: BACKGROUND_COLOR_LIST,
              borderRadius: '10',
              color: '#fff'
            }} />
          <h4>Clean Alternative Fuel Vehicle (CAFV) Eligibility</h4>
        </div>

      </div>
      
      <div className='mid-charts mb-90'>
       
          <LineChart data={electricBaseMSRP.data} options={{color: '#fff'}} />
          

          <BarChart data={modelData.data} options={{
            indexAxis: 'y',
            backgroundColor: BACKGROUND_COLOR_LIST,
            borderRadius: '5',
            color: '#fff'

          }} />
        
      </div>

      <div className='bottom-charts mb-90'>
        
        <BarChart data={locationData.data} options={{
            backgroundColor: BACKGROUND_COLOR_LIST,
            borderRadius: '5',
            color: '#fff'
          }} />
      </div>

      <div className='data-table mb-90'>
        <EVTable evDataList={csvDataList} />
      </div>

    </div>
  );
}

export default App;

// 2020 Census Tract
// : 
// 53033007800
// Base MSRP
// : 
// 0
// City
// : 
// "Seattle"
// Clean Alternative Fuel Vehicle (CAFV) Eligibility
// : 
// "Clean Alternative Fuel Vehicle Eligible"
// County
// : 
// "King"
// DOL Vehicle ID
// : 
// 125701579
// Electric Range
// : 
// 291
// Electric Utility
// : 
// "CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA)"
// Electric Vehicle Type
// : 
// "Battery Electric Vehicle (BEV)"
// Legislative District
// : 
// 37
// Make
// : 
// "TESLA"
// Model
// : 
// "MODEL Y"
// Model Year
// : 
// 2020
// Postal Code
// : 
// 98122
// State
// : 
// "WA"
// VIN (1-10)
// : 
// "5YJYGDEE1L"
// Vehicle Location
// : 
// "POINT (-122.30839 47.610365)"
