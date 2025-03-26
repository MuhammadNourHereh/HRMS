import React, { useEffect, useState } from 'react';
import '../styles/Modal.css';
import '../styles/EditEmployee.css';
import remote from '../apis/remote';

const EditEmployeeModal = ({ isOpen, onClose, employee, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    date_of_birth: '',
    address: '',
    phone_number: '',
    gender: 'male',
    role: 'employee',
    department_id: '',
    position_id: '',
    salary: ''
  });
  
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await remote.getDepartments();
        const positionsResponse = await remote.getPositions();
        
        setDepartments(departmentsResponse.data || []);
        setPositions(positionsResponse.data || []);
      } catch (error) {
        console.error("Error fetching form data:", error);
        setError("Failed to load departments and positions. Please try again.");
      }
    };
    
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (employee) {
      const birthDate = employee.date_of_birth ? new Date(employee.date_of_birth).toISOString().split('T')[0] : '';
      
      setFormData({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
        password: '', 
        date_of_birth: birthDate,
        address: employee.address || '',
        phone_number: employee.phone_number || '',
        gender: employee.gender || 'male',
        role: employee.role || 'employee',
        department_id: employee.department_id || '',
        position_id: employee.position_id || '',
        salary: employee.salary || ''
      });
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        date_of_birth: '',
        address: '',
        phone_number: '',
        gender: 'male',
        role: 'employee',
        department_id: '',
        position_id: '',
        salary: ''
      });
    }
    
    setActiveTab('personal');
    setError(null);
  }, [employee, isOpen]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const data = { ...formData };
      
      if (!data.password && employee?.id) {
        delete data.password;
      }
      
      data.department_id = parseInt(data.department_id);
      data.position_id = parseInt(data.position_id);
      data.salary = parseFloat(data.salary);
      
      const id = employee?.id || 'add';
      const response = await remote.addOrUpdateEmployee(id, data);
      
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      onClose();
      
    } catch (error) {
      console.error("Error saving employee:", error);
      
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : error.response?.data?.message || "Failed to save employee. Please try again.";
        
      setError(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-fullscreen">
        <div className="modal-header">
          <h2 className="modal-title">
            {employee?.id ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {/* Tab Navigation */}
          <div className="edit-tab-nav">
            <button 
              className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Information
            </button>
            <button 
              className={`tab-button ${activeTab === 'employment' ? 'active' : ''}`}
              onClick={() => setActiveTab('employment')}
            >
              Employment Details
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="edit-employee-form">
            {/* Personal Information Tab */}
            <div className={`tab-content ${activeTab === 'personal' ? 'active' : ''}`}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">
                    Password {employee?.id ? "(Leave blank to keep current)" : ""}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!employee?.id}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date_of_birth">Date of Birth</label>
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            {/* Employment Details Tab */}
            <div className={`tab-content ${activeTab === 'employment' ? 'active' : ''}`}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department_id">Department</label>
                  <select
                    id="department_id"
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.department_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="position_id">Position</label>
                  <select
                    id="position_id"
                    name="position_id"
                    value={formData.position_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Position</option>
                    {positions.map(pos => (
                      <option key={pos.id} value={pos.id}>
                        {pos.position_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="employee">Employee</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="salary">Salary</label>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}
            
            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              
              {activeTab === 'personal' && (
                <button
                  type="button"
                  className="btn-btn"
                  onClick={() => setActiveTab('employment')}
                >
                  Next
                </button>
              )}
              
              {activeTab === 'employment' && (
                <button
                  type="submit"
                  className="btn-btn"
                >
                  Save Employee
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;