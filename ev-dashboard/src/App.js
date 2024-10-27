import React, { useState } from "react";
import './App.css';
import Login from "./components/logins/Login";
import SignIn from "./components/logins/SignIn"; // Ensure SignIn is imported
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from "react-router-dom"; 
import Sidebar from "./components/Sidebars/Sidebar";
import Dashboard from "./components/main/dashboard/Dashboard";
import { BellDot, Search } from "lucide-react";
import users from "./assets/images/Akhil.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import userid from './assets/images/Akhil.png';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Access the current route

    const shouldShowSidebar = !location.pathname.startsWith("/login"); // Determine if sidebar should be shown
    const shouldShowTopLayout = !location.pathname.startsWith("/login"); // Determine if top layout should be shown

    return (
        <div className="flex">
            {shouldShowSidebar && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
            <div className={`transition-all duration-300 ${isOpen && shouldShowSidebar ? 'ml-64' : 'ml-16'} w-full`}>
                {shouldShowTopLayout && (
                    <div className="flex items-center justify-between p-5 sticky top-0 z-10 bg-gradient-to-r from-blue-300 to-orange-300 shadow-lg mb-4">

                    {/* <div className="flex items-center justify-between p-5 sticky top-0 z-10 bg-gray-600 shadow-lg mb-4"> */}
                        <div className="flex items-center gap-5">
                            <img src={userid} alt="" className="rounded-full w-14 h-14" />
                            <div>
                                <h2 className="text-white font-bold text-xl text-600">Hello, Akhil!</h2>
                                <h2 className="text-white font-medium text-base text-500">Vehicle ID: 875934</h2>
                            </div>
                        </div>
                        <h1 className="text-white text-center text-3xl font-semibold">BEV_Model</h1>
                        <div className="flex items-center gap-2">
                            <button className="bg-lime-50 p-1 rounded-full">
                                <Search className="text-Black-600" />
                            </button>
                            <button className="bg-lime-50 p-1 rounded-full">
                                <BellDot className="text-Black-600" />
                            </button>
                            <Menu as="div" className="relative">
                                <MenuButton>
                                    <img className="h-8 w-8 rounded-full object-cover" src={users} alt="avatar" />
                                </MenuButton>
                                <MenuItems className="absolute right-0 z-10 w-56 rounded-lg bg-Black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem>
                                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700">Account settings</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700">Support</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700">License</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700">Sign out</button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                )}
                <Outlet />
            </div>
        </div>
    );
};

// Wrap the App component with the BrowserRouter and define routes
const AppWrapper = () => (
    <BrowserRouter basename="/electric-vehicle">
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<App />}>
                <Route index element={<Dashboard />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default AppWrapper;
