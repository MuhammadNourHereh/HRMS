import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="#employee-management" title="Employee Management">
            <i className="fa-solid fa-user-tie"></i>
            <span className="sidebar-title">Employee Management</span>
          </a>
        </li>
        <li>
          <a href="#attendance-tracking" title="Attendance Tracking">
            <i className="fa-solid fa-clock"></i>
            <span className="sidebar-title">Attendance Tracking</span>
          </a>
        </li>
        <li>
          <a href="#leave-management" title="Leave Management">
            <i className="fa-solid fa-plane-departure"></i>
            <span className="sidebar-title">Leave Management</span>
          </a>
        </li>
        <li>
          <a href="#payroll-integration" title="Payroll Integration">
            <i className="fa-solid fa-dollar-sign"></i>
            <span className="sidebar-title">Payroll Integration</span>
          </a>
        </li>
        <li>
          <a href="#recruitment-onboarding" title="Recruitment &amp; Onboarding">
            <i className="fa-solid fa-user-plus"></i>
            <span className="sidebar-title">Recruitment & Onboarding</span>
          </a>
        </li>
        <li>
          <a href="#performance-management" title="Performance Management">
            <i className="fa-solid fa-chart-line"></i>
            <span className="sidebar-title">Performance Management</span>
          </a>
        </li>
        <li>
          <a href="#document-management" title="Document Management">
            <i className="fa-solid fa-folder"></i>
            <span className="sidebar-title">Document Management</span>
          </a>
        </li>
        <li>
          <a href="#training-development" title="Training &amp; Development">
            <i className="fa-solid fa-graduation-cap"></i>
            <span className="sidebar-title">Training & Development</span>
          </a>
        </li>
        <li>
          <a href="#benefits-management" title="Benefits Management">
            <i className="fa-solid fa-heart"></i>
            <span className="sidebar-title">Benefits Management</span>
          </a>
        </li>
        <li>
          <a href="#compliance-reporting" title="Compliance & Reporting">
            <i className="fa-solid fa-file-contract"></i>
            <span className="sidebar-title">Compliance & Reporting</span>
          </a>
        </li>
        <li>
          <a href="#ai-agent-system" title="AI Agent System">
            <i className="fa-solid fa-robot"></i>
            <span className="sidebar-title">AI Agent System</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
