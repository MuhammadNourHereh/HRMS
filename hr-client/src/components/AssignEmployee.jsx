import React, { useState } from "react";
import "../styles/AssignEmployee.css";
import PropTypes from "prop-types"; 

const AssignEmployee = ({ 
  isOpen, 
  onClose, 
  employees=[], 
  program = {}, 
  onEnroll 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Filter employees based on search
  const filteredEmployees = Array.isArray(employees) 
    ? employees.filter(employee =>
        `${employee.first_name} ${employee.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];
  // Toggle selection
  const toggleEmployee = (employee) => {
    setSelectedEmployees(prev => 
      prev.some(e => e.id === employee.id) 
        ? prev.filter(e => e.id !== employee.id)
        : [...prev, employee]
    );
  };
  if (!isOpen) return null;

 
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Assign to {program?.name}</h3>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="employee-list">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(employee => (
              <div key={employee.id} className="employee-item">
                <img className="profile-img"
                  src={employee.image || 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid'} 
                  alt={`${employee.first_name} ${employee.last_name}`}
                  onError={(e) => e.target.src = 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid'}
                />
                <span>{employee.first_name} {employee.last_name}</span>
                <input
                  className="popup-input"
                  type="checkbox"
                  checked={selectedEmployees.some(e => e.id === employee.id)}
                  onChange={() => toggleEmployee(employee)}
                />
              </div>
            ))
          ) : (
            <p>No employees found</p>
          )}
        </div>

        <div className="popup-actions">
          <button className="close-assign" onClick={onClose}>Cancel</button>
          <button className="submit" 
            onClick={() => onEnroll(selectedEmployees)}
            disabled={!selectedEmployees.length}
          >
            Submit ({selectedEmployees.length})
          </button>
        </div>
      </div>
    </div>
  );
};

AssignEmployee.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  employees: PropTypes.array,
  program: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  onEnroll: PropTypes.func.isRequired
};

export default AssignEmployee;
