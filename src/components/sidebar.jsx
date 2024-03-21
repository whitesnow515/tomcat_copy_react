import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/sidebar.css'; 
import logo from '../logo192.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        {/* Adjust the path to your logo's location */}
        <img src={logo} alt="Company Logo" className="logo" />
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/inbox" className="nav-link">Trade Copy</Link>
        <Link to="/docs" className="nav-link">Account</Link>
        <Link to="/FAQ" className="nav-link">FAQ</Link>
        <Link to="/login" className="nav-link">Logout</Link>
      </nav>
    </div>//
  );
};

export default Sidebar;
