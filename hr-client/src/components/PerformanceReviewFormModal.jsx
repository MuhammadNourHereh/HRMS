import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import '../styles/Modal.css';
import '../styles/PerformanceReviewFormModal.css';

const PerformanceReviewFormModal = ({ isOpen, onClose, review }) => {
  const { 
    reviewCycles, 
    employees, 
    addOrUpdatePerformanceReview, 
    performanceReviewFormLoading, 
    fetchReviewCycles,
    fetchEmployees
  } = useContext(AppContext);
  
  const [formData, setFormData] = useState({
    employee_id: '',
    review_cycle_id: '',
    overall_rating: '',
    comments: ''
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Fetch review cycles and employees if not already loaded
  useEffect(() => {
    if (isOpen) {
      if (reviewCycles.length === 0) {
        fetchReviewCycles();
      }
      
      if (employees.length === 0) {
        fetchEmployees();
      }
    }
  }, [isOpen]);
  
  // Reset form when modal opens/closes or when review changes
  useEffect(() => {
    if (isOpen) {
      if (review) {
        // Edit mode: populate form with existing data
        setFormData({
          employee_id: review.employee_id || '',
          review_cycle_id: review.review_cycle_id || '',
          overall_rating: review.overall_rating || '',
          comments: review.comments || ''
        });
      } else {
        // Add mode: reset form
        setFormData({
          employee_id: '',
          review_cycle_id: '',
          overall_rating: '3.0',
          comments: ''
        });
      }
      
      // Clear previous messages
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, review]);
  
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
      // Validate form data
      if (!formData.employee_id) {
        setError('Please select an employee');
        return;
      }
      
      if (!formData.review_cycle_id) {
        setError('Please select a review cycle');
        return;
      }
      
      if (!formData.overall_rating) {
        setError('Please enter a rating');
        return;
      }
      
      if (!formData.comments) {
        setError('Please enter comments');
        return;
      }
      
      const id = review?.id || 'add';
      const result = await addOrUpdatePerformanceReview(id, formData);
      
      if (result.success) {
        setSuccess(result.message);
        // Close modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error saving performance review:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container modal-regular">
        <div className="modal-header">
          <h2 className="modal-title">
            {review ? 'Edit Performance Review' : 'Add New Performance Review'}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="performance-review-form">
            <div className="form-group">
              <label htmlFor="employee_id">Employee</label>
              <select
                id="employee_id"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Employee</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.first_name} {employee.last_name} - {employee.position?.position_name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="review_cycle_id">Review Cycle</label>
              <select
                id="review_cycle_id"
                name="review_cycle_id"
                value={formData.review_cycle_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Review Cycle</option>
                {reviewCycles.map(cycle => (
                  <option key={cycle.id} value={cycle.id}>
                    {cycle.cycle_name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="overall_rating">Overall Rating (1-5)</label>
              <div className="rating-input">
                <input
                  type="range"
                  id="overall_rating"
                  name="overall_rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.overall_rating}
                  onChange={handleChange}
                  required
                />
                <span className="rating-value">{parseFloat(formData.overall_rating || 0).toFixed(1)}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Provide detailed feedback on employee performance..."
                rows="6"
                required
              ></textarea>
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
                disabled={performanceReviewFormLoading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="button button-primary"
                disabled={performanceReviewFormLoading}
              >
                {performanceReviewFormLoading ? 'Saving...' : review ? 'Update Review' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReviewFormModal;