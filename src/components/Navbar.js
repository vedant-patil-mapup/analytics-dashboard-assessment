 

import React from "react";
import EVChart from "./EVChart";
import KeyData from "./KeyData";
import PieChart from "./PieChart";
import Linechart from "./Linechart";

const Navbar = () => {
  return (
    <nav>
      <div>
        {/* Navbar Header */}
        <div className="py-5 mb-5 bg-gray-400">
          <h1 className="text-xl font-bold text-white text-center">
            Electric Range Trends by Model Year
          </h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-[90%] sm:w-3/4 md:w-2/3 mx-auto">
          {/* Grid Items */}
          <div>
            <EVChart />
          </div>
          <div>
            <PieChart />
          </div>
          <div>
            <Linechart />
          </div>
          <div>
            <KeyData />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


