import "./App.css";
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/SideBar';
import LeaveRequests from "./pages/LeaveRequests";
import Content from './components/Content';
import GeolocationLogger from './components/GeolocationLogger';
import DocumentManagement from './components/DocumentManagement'; // Import DocumentManagement component
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
// import LeaveDisplay from './components/LeaveDisplay'; // Use PascalCase for consistency

function App() {
  const { pathname } = useLocation();
  
  return (
    <>
      <AppProvider>
        <Navbar />   
        <div className="wrapper">
          {pathname !== "/login" && <Sidebar />}
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Content />} />
              <Route path="/leaves" element={<LeaveRequests />} /> 
              <Route path="/employees" element={<Employees />} /> 
              <Route path="/programs" element={<LearningDashboard />} /> 
              <Route path="/geolocation" element={<GeolocationLogger />} />
              <Route path="/document-management" element={<DocumentManagement />} />
              <Route path="/candidates" element={<Candidates />} /> 
              <Route path="/onboarding-tasks" element={<OnboardingTasks />} /> 
              <Route path="/projects" element={<Projects />} /> 
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/review-cycles" element={<ReviewCycles />} />
              <Route path="/performance-reviews" element={<PerformanceReviews />} />
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