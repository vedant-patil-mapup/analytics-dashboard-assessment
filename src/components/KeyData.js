 
import React from "react";

const KeyData = () => {
  return (
    <div className="shadow-lg text-dark rounded-lg h-auto m-auto p-4 max-w-4xl">
      <h5 className="text-xl font-bold mb-6 text-center">Key Statistics</h5>
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-5">
        {/* Grid items */}
        <div className="shadow-md rounded-xl bg-cyan-200 p-4 text-center">
          <h5 className="font-semibold">Average Range</h5>
          <p>119 mi</p>
        </div>
        <div className="shadow-md rounded-xl bg-yellow-50 p-4 text-center">
          <p>
            The manufacturer with the most vehicles is <strong>TESLA</strong>
          </p>
        </div>
        <div className="shadow-md rounded-xl bg-yellow-50 p-4 text-center">
          <h5 className="font-semibold">Latest Year</h5>
          <p>2023</p>
        </div>
        <div className="shadow-md rounded-xl bg-cyan-200 p-4 text-center">
          <h5 className="font-semibold">Total Eligible Vehicles</h5>
          <p>37.50%</p>
        </div>
      </div>
    </div>
  );
};

export default KeyData;
