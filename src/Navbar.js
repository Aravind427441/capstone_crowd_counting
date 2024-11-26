import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <Link to="/" className="navbar-link">Capybaby</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/results" className="nav-item">Result</Link>

      </div>
    </nav>
  );
};

export default Navbar;
