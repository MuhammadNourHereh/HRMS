import React from 'react';
import Navbar from './Navbar'; // Import Navbar
import Sidebar from './Sidebar'; // Import Sidebar
import Content from './Content'; // Import Content

function Dashboard() {
  return (
    <div>
      <Navbar /> {/* Navbar at the top */}
      <div className="wrapper">
        <Sidebar /> {/* Sidebar on the left */}
        <Content /> {/* Main content area */}
      </div>
    </div>
  );
}

export default Dashboard;
