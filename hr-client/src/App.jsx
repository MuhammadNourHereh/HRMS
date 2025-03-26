import "./App.css";
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
//import Navbar from './components/Navbar';
import Sidebar from './components/SideBar';
import LeaveRequests from "./pages/LeaveRequests";
import Content from './components/Content';
import GeolocationLogger from './components/GeolocationLogger';
import DocumentManagement from './components/DocumentManagement'; // Import DocumentManagement component
import LearningDashboard from "./pages/LearningDashboard";
import Login from "./pages/Login";

function App() {
    const { pathname } = useLocation();
  
  return (
    <>

      {/*<Navbar /> {/* Navbar will be at the top */}
      <div className="wrapper">
      {pathname !== "/login" && <Sidebar /> }{/* Sidebar on the left */}
        <div className="main-content">
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Content />} /> {/* Default route for Content */}
          <Route path="/leaves" element={<LeaveRequests />} /> 
          <Route path="/programs" element={<LearningDashboard />} /> 
          <Route path="/geolocation" element={<GeolocationLogger />} /> {/* Geolocation page route */}
          <Route path="/document-management" element={<DocumentManagement />} /> {/* Document Management route */}
        </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
