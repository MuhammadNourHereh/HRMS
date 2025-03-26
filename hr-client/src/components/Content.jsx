import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

function Content() {
  return (
    <div className="content">
      <div id="modules">
        <h2>Project Modules</h2>
      </div>

      <section id="employee-management">
        <h3>Employee Management</h3>
        <p><strong>Employee Name:</strong> John Doe</p>
        <p><strong>Position:</strong> Software Engineer</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Hire Date:</strong> January 15, 2020</p>
        <p><strong>Status:</strong> Active</p>
      </section>

      <section className='' id="attendance-tracking">
        <h3>
          {/* Link to navigate to GeolocationLogger page */}
          <Link to="/geolocation">Attendance Tracking</Link>
        </h3>
        <p><strong>Last Clock-In:</strong> 9:00 AM, March 18, 2025</p>
        <p><strong>Status:</strong> On Time</p>
      </section>

      <section id="leave-management">
        <h3><Link to="/LeaveRequests">LeaveRequests </Link></h3>
        <p><strong>Leave Type:</strong> Annual Leave</p>
        <p><strong>Status:</strong> Pending Approval</p>
        <p><strong>Requested Dates:</strong> March 20-22, 2025</p>
      </section>

      <section id="payroll-integration">
        <h3>Payroll Integration</h3>
        <p><strong>Salary:</strong> $80,000/year</p>
        <p><strong>Last Pay Date:</strong> March 15, 2025</p>
        <p><strong>Next Pay Date:</strong> April 15, 2025</p>
      </section>

      <section id="recruitment-onboarding">
        <h3>Recruitment &amp; Onboarding</h3>
        <p><strong>Candidate Name:</strong> Sarah Lee</p>
        <p><strong>Position:</strong> Junior Developer</p>
        <p><strong>Status:</strong> Offer Extended</p>
      </section>

      <section id="performance-management">
        <h3>Performance Management</h3>
        <p><strong>Last Review:</strong> January 2025</p>
        <p><strong>Performance Rating:</strong> Exceeds Expectations</p>
      </section>

      <section id="document-management">
        <h3>
          <Link to="/document-management">Document Management</Link> {/* Link to DocumentManagement */}
        </h3>
        <p><strong>Last Document Uploaded:</strong> Employment Contract</p>
        <p><strong>Status:</strong> Verified</p>
      </section>

      <section id="training-development">
        <h3>Training &amp; Development</h3>
        <p><strong>Current Course:</strong> JavaScript for Beginners</p>
        <p><strong>Status:</strong> In Progress</p>
      </section>

      <section id="benefits-management">
        <h3>Benefits Management</h3>
        <p><strong>Health Plan:</strong> Gold Health Plan</p>
        <p><strong>Retirement Option:</strong> 401(k) Matching</p>
      </section>

      <section id="compliance-reporting">
        <h3>Compliance &amp; Reporting</h3>
        <p><strong>Last Compliance Check:</strong> February 2025</p>
        <p><strong>Status:</strong> Compliant</p>
      </section>

      <section id="ai-agent-system">
        <h3>AI Agent System</h3>
        <p><strong>Status:</strong> Active</p>
        <p><strong>Last Query Answered:</strong> Leave Request Status</p>
      </section>

      <section id="team-roles">
        <h2>Team Roles &amp; Responsibilities</h2>

        <section id="communication-lead">
          <h3>Communication Lead (Member 1)</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, odit.</p>
        </section>

        <section id="uix-frontend-lead">
          <h3>UIX &amp; Frontend Lead (Member 2)</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, modi.</p>
        </section>

        <section id="backend-lead">
          <h3>Backend Lead (Member 3)</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, sequi?</p>
        </section>

        <section id="ops-lead">
          <h3>Ops Lead (Member 4)</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, asperiores!</p>
        </section>

        <section id="product-owner">
          <h3>Product Owner (Member 5)</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, maxime..</p>
        </section>

        <section id="ai-agent-lead">
          <h3>AI Agent Lead (Member 6 or Member 4)</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, adipisci?.</p>
        </section>
      </section>
    </div>
  );
}

export default Content;
