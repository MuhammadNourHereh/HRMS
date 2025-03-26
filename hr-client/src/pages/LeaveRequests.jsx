import React, { useEffect, useState } from "react";
import { request } from "../utils/remote/axios"; 
import "../styles/LeaveRequests.css";
import LeaveDetails from "../components/LeaveDetails";

const LeaveRequests = () => {
    const [leaves, setLeaves] = useState([]);
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });

    useEffect(() => {
      getLeaves(meta.current_page);
    }, [meta.current_page]);
  
    const getLeaves = async (page = 1) => {
      const response = await request({
         method: "GET", 
         route: "/leaves",
         params: { per_page: 10, page }
        });
        
      if (!response.error) {
        setLeaves(response.data);
        setMeta(response.meta);
      } else {
        console.error(response.message);
      }
    };
  
    const handleAction = async (id, status) => {
      const response = await request({
        method: "PUT",
        route: `/leaves/${id}`,
        body: { status },
      });
  
      if (!response.error) {
        setLeaves(leaves.map(leave => 
          leave.id === id ? { ...leave, status } : leave
        ));
      } else {
        console.error(response.message);
      }
    };
  
    return (
<div className="leave-container">
      <h2>Leave Requests</h2>

      <div className="leave-list">
        {leaves.map((leave) => (
          <div className="leave-card" key={leave.id}>
            <img src="/profile-placeholder.png" alt="Employee" className="profile-pic" />
            <div className="leave-info">
              <h3>{leave.employee.name}</h3>
              <p>Requested leave on {leave.start_date} to {leave.end_date}</p>
            </div>
            <div className="leave-actions">
              <button className="approve-btn" onClick={() => handleAction(leave.id, "Approved")}>✅ APPROVE</button>
              <button className="reject-btn" onClick={() => handleAction(leave.id, "Rejected")}>❌ REJECT</button>
              <button className="open-btn">🔗 OPEN</button>
            </div>
          </div>
        ))}
      </div>

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