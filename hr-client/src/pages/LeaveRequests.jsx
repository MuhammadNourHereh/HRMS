import React, { useEffect, useState } from "react";
import { request } from "../utils/remote/axios"; 
import "../styles/LeaveRequests.css";

const LeaveRequests = () => {
    const [leaves, setLeaves] = useState([]);
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
    const [selectedLeave, setSelectedLeave] = useState(null); 

    useEffect(() => {
      getLeaves(meta.current_page);
    }, [meta.current_page]);
  
    const getLeaves = async (page = 1) => {
        const token =localStorage.getItem('token');
        if (!token) {
            console.error("User ID not found. User might not be logged in.");
            return;
          }
      const response = await request({
         method: "GET", 
         route: "/leaves",
         params: { per_page: 10, page },
         token,
        });
        
      if (!response.error) {
        setLeaves(response.data);
        setMeta(response.meta);
      } else {
        console.error(response.message);
      }
    };
  
    const handleAction = async (id, action) => {
        const formattedAction = action.toLowerCase();
        const token =localStorage.getItem('token');
        if (!token) {
          console.error("User ID not found. User might not be logged in.");
          return;
        }
      const response = await request({
        method: "PATCH",
        route: `/leave/${id}/${formattedAction}`,
        token
      });
  
      if (!response.error) {
        setLeaves(leaves.filter(leave => leave.id !== id));
      } else {
        console.error(response.message);
      }
    };
  
    return (
<div className="leave-container margin-left">
      <h2>Leave Requests</h2>

      <div className="leave-list">
        {leaves.map((leave) => (
          <div className="leave-card" key={leave.id}>
            <img src="/profile-placeholder.png" alt="Employee" className="profile-pic" />
            <div className="leave-info">
              <h3>{leave.employee.first_name} {leave.employee.last_name}</h3>
              <p>Requested leave on {leave.start_date} to {leave.end_date}</p>
            </div>
            <div className="leave-actions">
              <button className="approve-btn" onClick={() => handleAction(leave.id, "Approve")}> APPROVE</button>
              <button className="reject-btn" onClick={() => handleAction(leave.id, "Reject")}> REJECT</button>
              <button className="open-btn" onClick={() => setSelectedLeave(leave)}> OPEN</button>
            </div>
          </div>
        ))}
      </div>
      {selectedLeave && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedLeave(null)}>&times;</span>
                        <h3>Leave Request Details{console.log(selectedLeave)}</h3>         
                        <p><strong>Employee:</strong> {selectedLeave.employee.first_name} {selectedLeave.employee.last_name}</p>
                        <p><strong>Type:</strong> {selectedLeave?.leave_policy?.leave_type ?? 'No leave policy'}</p>                        
                        <p><strong>End Date:</strong> {selectedLeave.end_date}</p>
                        <p><strong>Status:</strong> {selectedLeave.status}</p>
                        <p><strong>Reason:</strong> {selectedLeave.reason}</p>
                    </div>
                </div>
            )}
      {/* Pagination Controls */}
      <div className="pagination">
        <button disabled={meta.current_page === 1} onClick={() => setMeta({ ...meta, current_page: meta.current_page - 1 })}>
          Previous
        </button>
        <span> Page {meta.current_page} of {meta.last_page} </span>
        <button disabled={meta.current_page === meta.last_page} onClick={() => setMeta({ ...meta, current_page: meta.current_page + 1 })}>
          Next
        </button>
      </div>
    </div>
    );
  };
  
  export default LeaveRequests;