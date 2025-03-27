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
import LeaveRequests from './pages/LeaveRequests';
import LeaveDetails from './components/LeaveDetails';
import Employees from "./pages/Employees";
import Navbar from "./components/Navbar";
import ReviewCycles from "./pages/ReviewCycles";
// import LeaveDisplay from './components/LeaveDisplay'; // Use PascalCase for consistency

function App() {
    const { pathname } = useLocation();
  
  return (
    <>
<AppProvider>
      <Navbar /> 
      <div className="wrapper">
      {pathname !== "/login" && <Sidebar /> }{/* Sidebar on the left */}
        <div className="main-content">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/review-cycles" element={<ReviewCycles />} />

          <Route path="/" element={<Content />} /> {/* Default route for Content */}
          <Route path="/leaves" element={<LeaveRequests />} /> 
          <Route path="/programs" element={<LearningDashboard />} /> 
          <Route path="/geolocation" element={<GeolocationLogger />} /> {/* Geolocation page route */}
          <Route path="/document-management" element={<DocumentManagement />} /> {/* Document Management route */}
        </Routes>
        </div>
      </div>
      </AppProvider>
    </>
  );
}

export default App;
