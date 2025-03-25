import React from 'react';
import logo from './logo.png';

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <a href="#">
          <img src={logo} alt="Company Logo" />
        </a>
      </div>
      <div className="nav-center">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="nav-right">
        <a href="#" title="Settings"><i className="fa-solid fa-gear"></i></a>
        <a href="#" title="Profile"><i className="fa-solid fa-user"></i></a>
          </div>
          {/* <a href="#" title="Profile"><i className="fa-solid fa-user"></i></a> */}
    </div>
  );
}

export default Navbar;
