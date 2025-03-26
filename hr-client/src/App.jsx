import "./App.css";
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/SideBar';
import Content from './components/Content';
import GeolocationLogger from './components/GeolocationLogger';
import DocumentManagement from './components/DocumentManagement'; // Import DocumentManagement component
import LeaveRequests from './pages/LeaveRequests';
import LeaveDetails from './components/LeaveDetails';
import Payrolls from "./pages/Payrolls";
import PayrollsAprove from "./pages/PayrollsAprove";
import PayrollsDone from "./pages/PayrollsDone";
import Employees from "./pages/Employees";
// import LeaveDisplay from './components/LeaveDisplay'; // Use PascalCase for consistency

function App() {
  return (
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
            {/**
             * these are payrolls pages   
             * @auther muhammad nour hereh 
             */}

            <Route path="/Payrolls" element={<Payrolls />} />
            <Route path="/PayrollsApprove" element={<PayrollsAprove />} />
            <Route path="/PayrollsDone" element={<PayrollsDone />} />

            {/* <Route path="/leaveDisplay" element={<LeaveDisplay />} /> leaveDisplay route */}
          </Routes>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
