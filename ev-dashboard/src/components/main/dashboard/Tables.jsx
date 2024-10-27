import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import ElectricVehicleData from "../../../data-to-visualize/Electric_Vehicle_Population_Data.csv"; 

const Tables = () => {
    const [people, setPeople] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ElectricVehicleData);
                const text = await response.text();
                Papa.parse(text, {
                    header: true,
                    complete: (results) => {
                        const formattedData = results.data.map((item, index) => ({
                            id: (index + 1).toString(),
                            vin: item["VIN"],
                            county: item["County"],
                            city: item["City"],
                            state: item["State"],
                            postalCode: item["Postal Code"],
                            modelYear: item["Model Year"],
                            make: item["Make"],
                            model: item["Model"],
                            vehicleType: item["Electric Vehicle Type"],
                            eligibility: item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"],
                        }));
                        setPeople(formattedData);
                    },
                });
            } catch (error) {
                console.error("Error fetching or parsing the CSV data:", error);
            }
        };

        fetchData();
    }, []);

    // Logic for pagination
    const totalEntries = people.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const currentEntries = people.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    return (
        <>
            <section className="mx-auto w-full px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-Black-500 font-bold text-xl"> Electric_Vehicle_Population_Data Table </h2> 
                    </div>
                    <div>
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Add New
                        </button>
                    </div>
                </div>
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    {/* <thead className="bg-gray-50"> */}
                                    <thead className="bg-gradient-to-r from-blue-200 to-orange-200">

                                        <tr>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                <span>No</span>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                VIN
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                County
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                City
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                State
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Postal Code
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Model Year
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Make
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Model
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Type
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                CAFV Eligibility
                                            </th>
                                            <th scope="col" className="relative px-4 py-3.5">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {currentEntries.map((vehicle) => (
                                            <tr key={vehicle.id}> 
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.id}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-gray-700">{vehicle.vin}</td> 
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.county}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.city}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.state}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.postalCode}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.modelYear}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.make}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.model}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.vehicleType}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{vehicle.eligibility}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center pt-6">
                    <button 
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                        disabled={currentPage === 1} 
                        className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
                    >
                        <span className="hidden lg:block">&larr; Previous</span>
                        <span className="block lg:hidden">&larr;</span>
                    </button>

                    <button 
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                        disabled={currentPage === totalPages} 
                        className={`mx-2 text-sm font-semibold text-gray-900 ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
                    >
                        <span className="hidden lg:block">Next &rarr;</span>
                        <span className="block lg:hidden">&rarr;</span>
                    </button>
                </div>
            </section>
        </>
    );
};

export default Tables;