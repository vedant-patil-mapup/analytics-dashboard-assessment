import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';
import { FaTachometerAlt, FaChartBar, FaShoppingCart, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2><span style={{ color: "#fff" }}>Me</span> Board</h2>
        <nav>
          <NavLink to="/" className="nav-item" onClick={handleNavLinkClick}>
            <FaTachometerAlt className="icon" />
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className="nav-item" onClick={handleNavLinkClick}>
            <FaChartBar className="icon" />
            Analytics
          </NavLink>
          <NavLink to="/orders" className="nav-item" onClick={handleNavLinkClick}>
            <FaShoppingCart className="icon" />
            Orders
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
