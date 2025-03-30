import "./App.css";
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LeaveDetails from './components/LeaveDetails';
import Payrolls from "./pages/Payrolls";
import PayrollsApprove from "./pages/PayrollsApprove";
import PayrollsDone from "./pages/PayrollsDone";
import Sidebar from './components/SideBar';
import LeaveRequests from "./pages/LeaveRequests";
import Content from './components/Content';
import GeolocationLogger from './components/GeolocationLogger';
import DocumentManagement from './components/DocumentManagement';
import LearningDashboard from "./pages/LearningDashboard";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import Navbar from "./components/Navbar";
import Candidates from "./pages/Candidate";
import OnboardingTasks from "./pages/OnboardingTasks";
import Projects from "./pages/Projects";
import Tasks from "./pages/Task";
import ReviewCycles from "./pages/ReviewCycles";
import PerformanceReviews from "./pages/PerformanceReviews";

function App() {
  const { pathname } = useLocation();
  
  return (
    <AppProvider>
      {pathname !== "/login" && <Navbar />}
      <div className="wrapper">
        {pathname !== "/login" && <Sidebar />}
        <div className="main-content">
          <Routes>
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard */}
            <Route path="/" element={<Content />} />
            
            {/* Employee Management */}
            <Route path="/employees" element={<Employees />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/onboarding-tasks" element={<OnboardingTasks />} />
            
            {/* Project Management */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            
            {/* Performance Management */}
            <Route path="/review-cycles" element={<ReviewCycles />} />
            <Route path="/performance-reviews" element={<PerformanceReviews />} />
            
            {/* Leave Management */}
            <Route path="/leaves" element={<LeaveRequests />} />
            <Route path="/leave-details" element={<LeaveDetails />} />
            
            {/* Payroll */}
            <Route path="/payrolls" element={<Payrolls />} />
            <Route path="/payrolls-approve" element={<PayrollsApprove />} />
            <Route path="/payrolls-done" element={<PayrollsDone />} />
            
            {/* Learning & Development */}
            <Route path="/programs" element={<LearningDashboard />} />
            
            {/* Tools & Utilities */}
            <Route path="/geolocation" element={<GeolocationLogger />} />
            <Route path="/document-management" element={<DocumentManagement />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;