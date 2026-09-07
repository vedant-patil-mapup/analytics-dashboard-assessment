import React from "react";
import './App.css'
import Login from "./components/logins/Login";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./components/logins/SignIn";
import Dashboard from "./components/main/dashboard/Dashboard";
import Sidebar from "./components/Sidebars/Sidebar";
import { BellDot, Search } from "lucide-react";
import users from "./assets/images/rohit-kumar-saini-front-end-developer-in-jaipur.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import userid from './assets/images/rohit-kumar-saini-front-end-developer-in-jaipur.png'

const App = () => {
    const Layout = () => {
        return (
            <div className="main">
                <div className="flex">
                    <div className="menuContainer fixed">
                        <Sidebar />
                    </div>
                    <div className="ml-auto w-10/12">
                        <div className="flex items-center justify-between p-5 sticky top-0 z-10 bg-slate-50 mb-4 ">
                            <div className="flex items-center gap-5">
                                <div className="imges">
                                    <img src={userid} alt="" className="rounded-full w-14 h-14" />
                                </div>
                                <div className="">
                                    <h2 className="font-bold text-xl text-orange-600">Good Morning, Rohit !</h2>
                                    <h2 className="font-medium text-base text-gray-500">Vehicle ID: 1245875934</h2>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="">
                                    <button className="bg-lime-50 p-1 rounded-full">
                                        <Search absoluteStrokeWidth className="text-orange-600" />
                                    </button>
                                </div>
                                <div className="">
                                    <button className="bg-lime-50 p-1 rounded-full">
                                        <BellDot className="text-orange-600" />
                                    </button>
                                </div>
                                <Menu as="div" className="relative"> 
                                    <MenuButton className="">
                                      <img className="h-8 w-8 rounded-full object-cover" src={users} alt="avatar" />
                                    </MenuButton> 

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-1">
                                            <MenuItem>
                                                <Link to='/' className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                                    Account settings
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link to='/' className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                                    Support
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link to='/' className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                                    License
                                                </Link>
                                            </MenuItem>
                                            <form action="#" method="POST">
                                                <MenuItem>
                                                    <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                                        Sign out
                                                    </button>
                                                </MenuItem>
                                            </form>
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    };

    return ( 
        <BrowserRouter basename="/electric-vehicle">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />} />

                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter> 
    );
};

export default App;
