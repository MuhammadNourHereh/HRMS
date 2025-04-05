import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';


function Sidebar() {
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate()

  const toggleExpand = (item) => {
    if (expandedItem === item) {
      setExpandedItem(null);
    } else {
      setExpandedItem(item);
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/" title="Home">
            <i className="fa-solid fa-home"></i>
            <span className="sidebar-title">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/employees" title="Employee Management">
            <i className="fa-solid fa-user-tie"></i>
            <span className="sidebar-title">Employee Management</span>
          </Link>
        </li>
        <li>
          <a href="#attendance-tracking" title="Attendance Tracking">
            <i className="fa-solid fa-clock"></i>
            <span className="sidebar-title">Attendance Tracking</span>
          </a>
        </li>
        <li>
          <Link to="/leaves" title="Leave Management">
            <i className="fa-solid fa-plane-departure"></i>
            <span className="sidebar-title">Leave Management</span>
          </Link>
        </li>
        <li onClick={() => navigate('/payrolls')}>
          <a title="Payroll Integration">
            <i className="fa-solid fa-dollar-sign"></i>
            <span className="sidebar-title">Payroll Integration</span>
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              toggleExpand('recruitment');
            }}
            title="Recruitment &amp; Onboarding"
          >
            <i className="fa-solid fa-user-plus"></i>
            <span className="sidebar-title">Recruitment & Onboarding</span>
            <i className={`fa-solid ${expandedItem === 'recruitment' ? 'fa-chevron-down' : 'fa-chevron-right'} ml-auto`}></i>
          </a>
          {expandedItem === 'recruitment' && (
            <ul className="submenu">
              <li>
                <Link to="/candidates" title="Candidates">
                  <i className="fa-solid fa-users"></i>
                  <span className="sidebar-title">Candidates</span>
                </Link>
              </li>
              <li>
                <Link to="/onboarding-tasks" title="Onboarding Tasks">
                  <i className="fa-solid fa-list-check"></i>
                  <span className="sidebar-title">Onboarding Tasks</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

 <li>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              toggleExpand('project-management');
            }}
            title="Project Management"
          >
            <i className="fa-solid fa-project-diagram"></i>
            <span className="sidebar-title">Project Management</span>
            <i className={`fa-solid ${expandedItem === 'project-management' ? 'fa-chevron-down' : 'fa-chevron-right'} ml-auto`}></i>
          </a>
          {expandedItem === 'project-management' && (
            <ul className="submenu">
              <li>
                <Link to="/projects" title="Projects">
                  <i className="fa-solid fa-folder-open"></i>
                  <span className="sidebar-title">Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/tasks" title="Tasks">
                  <i className="fa-solid fa-tasks"></i>
                  <span className="sidebar-title">Tasks</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/review-cycles" title="Performance Management">
            <i className="fa-solid fa-chart-line"></i>
            <span className="sidebar-title">Performance Management</span>
          </Link>
        </li>
        <li>
          <Link to="/document-management" title="Document Management">
            <i className="fa-solid fa-folder"></i>
            <span className="sidebar-title">Document Management</span>
          </Link>
        </li>
        <li>
          <Link to="/programs" title="Training &amp; Development">
            <i className="fa-solid fa-graduation-cap"></i>
            <span className="sidebar-title">Training & Development</span>
          </Link>
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