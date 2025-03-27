import React, { useState, useEffect } from 'react';
import remote from '../apis/remote';
import '../styles/Modal.css';

const AddTaskModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_id: '',
    employee_id: '',
    due_date: '',
    status: 'pending'
  });
  
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch projects and employees when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchFormData();
    }
  }, [isOpen]);

  const fetchFormData = async () => {
    try {
      // Fetch projects for dropdown
      const projectsResponse = await remote.getProjects();
      setProjects(projectsResponse.data?.data || []);
      
      // Fetch employees for dropdown
      const employeesResponse = await remote.getEmployees();
      setEmployees(employeesResponse.data?.data || []);
    } catch (error) {
      console.error("Error fetching form data:", error);
      setError("Failed to load projects and employees. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Prepare data for API
      const data = { ...formData };
      
      // Convert IDs to numbers
      if (data.project_id) {
        data.project_id = parseInt(data.project_id);
      }
      
      if (data.employee_id) {
        data.employee_id = parseInt(data.employee_id);
      } else {
        // if no employee selected, set to null
        data.employee_id = null;
      }
      
      //  add a new task
      const response = await remote.addOrUpdateTask('add', data);
      
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      // Close the modal and reset form
      onClose();
      setFormData({
        title: '',
        description: '',
        project_id: '',
        employee_id: '',
        due_date: '',
        status: 'pending'
      });
    } catch (error) {
      console.error("Error adding task:", error);
      
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : error.response?.data?.message || "Failed to add task. Please try again.";
        
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxHeight: '90vh', overflow: 'auto', maxWidth: '600px' }}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Task</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="project_id">Project</label>
              <select
                id="project_id"
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employee_id">Assign To</label>
                <select
                  id="employee_id"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleChange}
                >
                  <option value="">Unassigned</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {`${employee.first_name} ${employee.last_name}`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="due_date">Due Date</label>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}
            
            <div className="form-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button button-primary"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;