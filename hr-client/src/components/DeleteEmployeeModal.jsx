import React, { useState } from 'react';
import "../styles/DeleteEmployeeModal.css";

const DeleteEmployeeModal = ({ 
  isOpen, 
  onClose, 
  onDelete, 
  employee
}) => {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen || !employee) return null;

  const handleDelete = () => {
    if (confirmed) {
      onDelete(employee.id);
      onClose();
      setConfirmed(false);
    }
  };

  // Get initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        <div className="delete-modal-header">
          <h2 className="delete-modal-title">Delete Employee</h2>
          <button className="delete-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="delete-modal-body">
          <div className="delete-employee-info">
            <div className="delete-employee-avatar">
              {getInitials(employee.first_name, employee.last_name)}
            </div>
            <div className="delete-employee-details">
              <div className="delete-employee-name">{`${employee.first_name} ${employee.last_name}`}</div>
              <div className="delete-employee-position">{employee.position?.position_name || ''}</div>
            </div>
          </div>
          
          <div className="delete-modal-message">
            Are you sure you want to delete this employee record? This action cannot be undone and will permanently remove all associated data.
          </div>
          
          <div className="delete-modal-confirmation">
            <label className="delete-confirmation-checkbox">
              <input 
                type="checkbox" 
                checked={confirmed} 
                onChange={() => setConfirmed(!confirmed)} 
              />
              <span className="checkbox-text">I understand that this action is irreversible</span>
            </label>
          </div>
          
          <div className="delete-modal-actions">
            <button 
              className={`delete-button ${!confirmed ? 'disabled' : ''}`}
              onClick={handleDelete}
              disabled={!confirmed}
            >
              Delete Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;