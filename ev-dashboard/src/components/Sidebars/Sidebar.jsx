import React from "react";
import { Link } from "react-router-dom";
// import { Home, Settings, LogIn, PlusCircle } from 'lucide-react';
import { Home, Settings, LogIn, PlusCircle, Database, Globe, MapPin, MinusCircle, Truck } from 'lucide-react'; // Replacing Car with Truck

const Sidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 h-full transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-gradient-to-b from-blue-300 to-orange-300 shadow-lg text-white`}>

    {/* <div className={`fixed top-0 left-0 h-full transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-gray-600 shadow-lg text-white shadow-lg`}> */}
      <div className="flex items-center justify-between p-4">
        <button onClick={toggleSidebar} className="p-1 rounded-full bg-White-500">
          <PlusCircle size={34} />
        </button>
        {isOpen && (
          <Link
          to="/login"
          className="bg-gradient-to-b from-orange-400 to-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:from-green-500 hover:to-blue-600 transition-colors duration-300"
        >
          Log In
        </Link>
        )}
      </div>
      {isOpen && (
        <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded">
              <Home size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded">
              <Truck size={20} />
              Models
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded">
              <Globe size={20} />
              Population
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded">
              <MapPin size={20} />
              Electric Stations
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded">
              <Database size={20} />
              Datasets
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded">
              <MinusCircle size={20} />
              License
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded">
              <Settings size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    )}
  </div>
);
};

export default Sidebar;