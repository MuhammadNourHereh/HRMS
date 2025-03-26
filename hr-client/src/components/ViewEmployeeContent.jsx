import React from 'react';
import '../styles/ViewEmployee.css';

const ViewEmployeeContent = ({employee}) => {
  if (!employee) return null;

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="employee-profile">
        <div className="employee-avatar-large">
          {getInitials(employee.first_name, employee.last_name)}
        </div>
        <div className="employee-name-title">
          <h3>{`${employee.first_name} ${employee.last_name}`}</h3>
          <div className="employee-position">
            {employee.position?.position_name || 'N/A'} • {employee.department?.department_name || 'N/A'}
          </div>
          <span className={`status-badge status-${employee.role.toLowerCase()}`}>
            {employee.role}
          </span>
        </div>
      </div>
      
      <div className="detail-sections">
        <div className="detail-section">
          <h4 className="detail-section-title">Personal Information</h4>
          
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">Email</div>
              <div className="detail-value">{employee.email}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Phone</div>
              <div className="detail-value">{employee.phone_number}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Gender</div>
              <div className="detail-value">{employee.gender === 'male' ? 'Male' : 'Female'}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Date of Birth</div>
              <div className="detail-value">{formatDate(employee.date_of_birth)}</div>
            </div>
            
            <div className="detail-item full-width">
              <div className="detail-label">Address</div>
              <div className="detail-value">{employee.address}</div>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <h4 className="detail-section-title">Employment Information</h4>
          
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">Department</div>
              <div className="detail-value">{employee.department?.department_name || 'N/A'}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Position</div>
              <div className="detail-value">{employee.position?.position_name || 'N/A'}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Role</div>
              <div className="detail-value">{employee.role}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Salary</div>
              <div className="detail-value">${parseFloat(employee.salary).toFixed(2)}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Joined Date</div>
              <div className="detail-value">{formatDate(employee.created_at)}</div>
            </div>
          </div>
        </div>
      </div>
      
     
    </>
  );
};

export default ViewEmployeeContent;