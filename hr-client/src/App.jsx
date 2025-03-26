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
<<<<<<< HEAD
import LearningDashboard from "./pages/LearningDashboard";
import Login from "./pages/Login";
=======
import LeaveRequests from './pages/LeaveRequests';
import LeaveDetails from './components/LeaveDetails';
import Employees from "./pages/Employees";
// import LeaveDisplay from './components/LeaveDisplay'; // Use PascalCase for consistency
>>>>>>> 187cbfba5a06b0aec135fc024ca4a0e335bb5716

function App() {
    const { pathname } = useLocation();
  
  return (
<<<<<<< HEAD
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
=======
    <Router>
      <AppProvider>
        <Navbar /> {/* Navbar will be at the top */}
        <div className="wrapper">
          <Sidebar /> {/* Sidebar on the left */}
          <Routes>
            <Route path="/" element={<Content />} /> {/* Default route for Content */}
            <Route path="/employees" element={<Employees />} /> {/* employees page route */}

            <Route path="/geolocation" element={<GeolocationLogger />} /> {/* Geolocation page route */}
            <Route path="/document-management" element={<DocumentManagement />} /> {/* Document Management route */}
            <Route path="/LeaveRequests" element={<LeaveRequests />} /> {/* LeaveRequests route */}
            <Route path="/LeaveDetails" element={<LeaveDetails />} /> {/* LeaveDetails route */}
            {/* <Route path="/leaveDisplay" element={<LeaveDisplay />} /> leaveDisplay route */}
          </Routes>
>>>>>>> 187cbfba5a06b0aec135fc024ca4a0e335bb5716
        </div>
      </div>
    </>
  );
}

export default App;
