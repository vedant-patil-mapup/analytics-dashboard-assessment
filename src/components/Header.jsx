import React from "react";
const Header = () => {
  return (
    <header className="bg-[#1f1f1f] text-white font-lato flex items-center justify-between px-6 py-4 shadow-md">
     
      <div className="text-2xl font-bold font-lato text-[#8b72ca] leading-loose">
       MAPUP
      </div>
      

     

      {/* Right: Icons and Profile */}
      <div className="flex items-center space-x-6">

        

        {/* Profile Dropdown */}
        <div className="relative group">
          <div className="cursor-pointer flex items-center space-x-2">
            <img
              src="./assets/profilepic.png"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="hidden md:block font-medium">Sadiya Parveen</span>
          </div>

        
        </div>
      </div>
    </header>
  );
};

export default Header;
