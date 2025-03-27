import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import '../styles/Modal.css';
import '../styles/EditReviewFormModal.css';

const ReviewCycleFormModal = ({ isOpen, onClose, reviewCycle }) => {
  const { reviewCycleFormLoading, employees, addOrUpdateReviewCycle } = useContext(AppContext);
  
  const [formData, setFormData] = useState({
    provided_hr_id: '',
    cycle_name: '',
    start_date: '',
    end_date: ''
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  useEffect(() => {
    if (isOpen) {
      if (reviewCycle) {
        setFormData({
          provided_hr_id: reviewCycle.provided_hr_id || '',
          cycle_name: reviewCycle.cycle_name || '',
          start_date: reviewCycle.start_date ? new Date(reviewCycle.start_date).toISOString().split('T')[0] : '',
          end_date: reviewCycle.end_date ? new Date(reviewCycle.end_date).toISOString().split('T')[0] : ''
        });
      } else {
        setFormData({
          provided_hr_id: '',
          cycle_name: '',
          start_date: '',
          end_date: ''
        });
      }
      
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, reviewCycle]);
  
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
    setSuccess(null);
    
    try {
      if (!formData.provided_hr_id) {
        setError('Please select an HR manager');
        return;
      }
      
      if (!formData.cycle_name) {
        setError('Please enter a cycle name');
        return;
      }
      
      if (!formData.start_date) {
        setError('Please select a start date');
        return;
      }
      
      if (!formData.end_date) {
        setError('Please select an end date');
        return;
      }
      
      if (new Date(formData.end_date) <= new Date(formData.start_date)) {
        setError('End date must be after start date');
        return;
      }
      
      const id = reviewCycle?.id || 'add';
      const result = await addOrUpdateReviewCycle(id, formData);
      
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error saving review cycle:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  
  const hrEmployees = employees.filter(emp => emp.role === 'hr');
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container modal-regular">
        <div className="modal-header">
          <h2 className="modal-title">
            {reviewCycle ? 'Edit Review Cycle' : 'Add New Review Cycle'}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="review-cycle-form">
            <div className="form-group">
              <label htmlFor="cycle_name">Cycle Name</label>
              <input
                type="text"
                id="cycle_name"
                name="cycle_name"
                value={formData.cycle_name}
                onChange={handleChange}
                placeholder="e.g. Q1 2025 Performance Review"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start_date">Start Date</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="end_date">End Date</label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="provided_hr_id">HR Manager</label>
              <select
                id="provided_hr_id"
                name="provided_hr_id"
                value={formData.provided_hr_id}
                onChange={handleChange}
                required
              >
                <option value="">Select HR Manager</option>
                {hrEmployees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.first_name} {employee.last_name}
                  </option>
                ))}
              </select>
            </div>
            
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}
            
            {success && (
              <div className="alert alert-success">
                {success}
              </div>
            )}
            
            <div className="form-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={onClose}
                disabled={reviewCycleFormLoading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="button button-primary"
                disabled={reviewCycleFormLoading}
              >
                {reviewCycleFormLoading ? 'Saving...' : reviewCycle ? 'Update Cycle' : 'Create Cycle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewCycleFormModal;