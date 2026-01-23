import React, { useState } from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
import { ImCross } from "react-icons/im";
import { GoDash } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa6";
import { FaPlugCircleBolt } from "react-icons/fa6";
import Pagination from '../Pagination/Pagination';

const EVTable = (props) => {
    const {evDataList} = props;

    const [filteredDataList, setFilteredDataList] = useState([]);
    if (evDataList.length <= 0) return <></>;


    const getEligibilityIcon = (eligibilityValue) => {
        switch(eligibilityValue) {
            case 'Clean Alternative Fuel Vehicle Eligible':
                return <FaCheck color='var(--success)' />;
            case 'Eligibility unknown as battery range has not been researched':
                return <GoDash color='var(--main1-color)' size={30} />;
            case 'Not eligible due to low battery range':
                return <ImCross color='var(--danger)' />;
            default:
                return '';
        }
    }

    const getElectricTypeIcon = (vehicleType) => {
        switch(vehicleType) {
            case 'Battery Electric Vehicle (BEV)':
                return (
                    <p>
                        <FaCarBattery color='var(--secondary-blue)' />
                        <p>BEV</p>
                    </p>
            );
            case 'Plug-in Hybrid Electric Vehicle (PHEV)':
                return (
                    <p>
                        <FaPlugCircleBolt color='var(--primary-blue)' />
                        <p>PHEV</p>
                    </p>
            )
            default: 
                return '';
        }
    }

    const handleDataList = (start, end) => {
        setFilteredDataList(evDataList.slice(start, end));
    }

  return (
    <div className='paginated-table'>
        
        <Pagination dataList={evDataList} perPage={30} handleDataList={handleDataList} />
        
        <div className='table-container'>
            <table>
                <thead>
                    <th>VIN(1-10)</th>
                    <th>County</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Postal Code</th>
                    <th>Model Year</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Electric Vehicle Type</th>
                    <th>Clean Alternative Fuel Vehicle (CAFV) Eligibility</th>
                    <th>Electric Range</th>
                    <th>Base MSRP</th>
                    <th>Legislative District</th>
                    <th>DOL Vehicle ID</th>
                    <th>Vehicle Location</th>
                    <th>Electric Utility</th>
                    <th>2020 Census Tract</th>
                </thead>
                <tbody>
                    {
                        filteredDataList.map(row => {
                            return (
                            <tr key={uuidv4()}>
                                <td>{row['VIN (1-10)']}</td>
                                <td>{row['County']}</td>
                                <td>{row['City']}</td>
                                <td>{row['State']}</td>
                                <td>{row['Postal Code']}</td>
                                <td>{row['Model Year']}</td>
                                <td>{row['Make']}</td>
                                <td>{row['Model']}</td>
                                <td>{getElectricTypeIcon(row['Electric Vehicle Type'])}
                                </td>
                                <td>{getEligibilityIcon(row['Clean Alternative Fuel Vehicle (CAFV) Eligibility'])}</td>
                                <td>{row['Electric Range']}</td>
                                <td>{row['Base MSRP']}</td>
                                <td>{row['Legislative District']}</td>
                                <td>{row['DOL Vehicle ID']}</td>
                                <td>{row['Vehicle Location']}</td>
                                <td>{row['Electric Utility']}</td>
                                <td>{row['2020 Census Tract']}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default EVTable