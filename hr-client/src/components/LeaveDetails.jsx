import React from "react";

const LeaveDetails = ({ leave, onClose }) => {
  if (!leave) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Leave Details</h3>
        <p><strong>Employee:</strong> {leave.employee.name}</p>
        <p><strong>Reason:</strong> {leave.reason}</p>
        <p><strong>Start Date:</strong> {leave.start_date}</p>
        <p><strong>End Date:</strong> {leave.end_date}</p>
        <p><strong>Status:</strong> {leave.status}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LeaveDetails;
