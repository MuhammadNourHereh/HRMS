import "./App.css";
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Navbar from './components/Navbar';
import Sidebar from './components/SideBar';
import LeaveRequests from "./pages/LeaveRequests";
import Content from './components/Content';
import GeolocationLogger from './components/GeolocationLogger';
import DocumentManagement from './components/DocumentManagement'; // Import DocumentManagement component
import LearningDashboard from "./pages/LearningDashboard";

function App() {
  return (
    <Router>

      {/*<Navbar /> {/* Navbar will be at the top */}
      <div className="wrapper">
        <Sidebar /> {/* Sidebar on the left */}
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Content />} /> {/* Default route for Content */}
          <Route path="/leaves" element={<LeaveRequests />} /> 
          <Route path="/programs" element={<LearningDashboard />} /> 
          <Route path="/geolocation" element={<GeolocationLogger />} /> {/* Geolocation page route */}
          <Route path="/document-management" element={<DocumentManagement />} /> {/* Document Management route */}
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
