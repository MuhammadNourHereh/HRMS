import "./App.css"; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Sidebar from './components/SideBar';
import Content from './components/Content';
import GeolocationLogger from './components/GeolocationLogger';
import DocumentManagement from './components/DocumentManagement'; // Import DocumentManagement component
import LeaveRequests from './pages/LeaveRequests';
import LeaveDetails from './components/LeaveDetails';
// import LeaveDisplay from './components/LeaveDisplay'; // Use PascalCase for consistency

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will be at the top */}
      <div className="wrapper">
        <Sidebar /> {/* Sidebar on the left */}
        <Routes>
          <Route path="/" element={<Content />} /> {/* Default route for Content */}
          <Route path="/geolocation" element={<GeolocationLogger />} /> {/* Geolocation page route */}
          <Route path="/document-management" element={<DocumentManagement />} /> {/* Document Management route */}
          <Route path="/LeaveRequests" element={<LeaveRequests />} /> {/* LeaveRequests route */}
          <Route path="/LeaveDetails" element={<LeaveDetails />} /> {/* LeaveDetails route */}
          {/* <Route path="/leaveDisplay" element={<LeaveDisplay />} /> leaveDisplay route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
