import React from "react";
import { Link } from "react-router-dom";

const Tables = () => {
    const people = [
        {
            id:'1',
            customer: "#456436546",
            name: "Devid Baker ",
            address:'Jaipur Rajasthan, India',
            date: "18/07/2024", 
            type: "Tesla Model X EV", 
        }, 
        {
            id:'2',
            customer: "#456436546",
            name: "Devid Baker ",
            address:'Jaipur Rajasthan, India',
            date: "18/07/2024", 
            type: "TATA Punch.ev", 
        }, 
        {
            id:'2',
            customer: "#456436546",
            name: "Devid Baker ",
            address:'Jaipur Rajasthan, India',
            date: "18/07/2024", 
            type: "Tata Tiago EV", 
        }, 
    ];

    return (
        <>
            <section className="mx-auto w-full px-4 py-4">
                <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-orange-500 font-semibold text-xl">Tesla Model X</h2> 
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
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                <span>No</span>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Id Customer
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Customer Name
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Address
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Date
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Type
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                                                Status
                                            </th>
                                            <th scope="col" className="relative px-4 py-3.5">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {people.map((person) => (
                                            <tr key={person.name}> 
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{person.id}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-gray-700">{person.customer}</td> 
                                                
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{person.name}</td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className="whitespace-nowrap py-4 text-sm text-gray-700">{person.address}</span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{person.date}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{person.type}</td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                                                    <Link className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                        Active
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center pt-6">
                    <Link className="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900">
                        <span className="hidden lg:block">&larr; Previous</span>
                        <span className="block lg:hidden">&larr;</span>
                    </Link>
                    <Link className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105">
                        1
                    </Link>
                    <Link className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105">
                        2
                    </Link>
                    <Link className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105">
                        3
                    </Link>
                    <Link className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105">
                        4
                    </Link>
                    <Link className="mx-2 text-sm font-semibold text-gray-900">
                        <span className="hidden lg:block">Next &rarr;</span>
                        <span className="block lg:hidden">&rarr;</span>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Tables;
