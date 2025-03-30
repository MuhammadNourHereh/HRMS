import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import '../styles/Modal.css';
import '../styles/DeletePerformanceReviewModal.css';

const DeletePerformanceReviewModal = ({ isOpen, onClose, review }) => {
  const { deletePerformanceReview } = useContext(AppContext);
  
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !review) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const handleDelete = async () => {
    if (!confirmed) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await deletePerformanceReview(review.id);
      
      if (result.success) {
        onClose();
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error deleting performance review:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-regular">
        <div className="modal-header delete-header">
          <h2 className="modal-title">Delete Performance Review</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="delete-item-info">
            <div className="delete-item-icon">
              <div className="employee-avatar-mini">
                {getInitials(review.employee?.first_name, review.employee?.last_name)}
              </div>
            </div>
            <div className="delete-item-details">
              <div className="delete-item-name">
                {review.employee?.first_name} {review.employee?.last_name}'s Review
              </div>
              <div className="delete-item-description">
                {review.review_cycle?.cycle_name} • Rating: {parseFloat(review.overall_rating).toFixed(1)}/5
              </div>
            </div>
          </div>
          
          <div className="delete-message">
            Are you sure you want to delete this performance review? This action cannot be undone and will permanently remove all review data.
          </div>
          
          <div className="delete-confirmation">
            <label className="delete-confirmation-checkbox">
              <input 
                type="checkbox" 
                checked={confirmed} 
                onChange={() => setConfirmed(!confirmed)} 
              />
              <span className="checkbox-text">I understand that this action is irreversible</span>
            </label>
          </div>
          
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}
          
          <div className="delete-actions">
            <button 
              className="button button-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            
            <button 
              className={`delete-button ${!confirmed || loading ? 'disabled' : ''}`}
              onClick={handleDelete}
              disabled={!confirmed || loading}
            >
              {loading ? 'Deleting...' : 'Delete Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePerformanceReviewModal;