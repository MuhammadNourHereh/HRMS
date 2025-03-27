import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import '../styles/Modal.css';
import '../styles/DeleteReviewModal.css';

const DeleteReviewCycleModal = ({ isOpen, onClose, reviewCycle }) => {
  const { deleteReviewCycle } = useContext(AppContext);
  
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !reviewCycle) return null;

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return `${start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} to ${end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`;
  };

  const handleDelete = async () => {
    if (!confirmed) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await deleteReviewCycle(reviewCycle.id);
      
      if (result.success) {
        onClose();
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error deleting review cycle:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-regular">
        <div className="modal-header delete-header">
          <h2 className="modal-title">Delete Review Cycle</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="delete-item-info">
            <div className="delete-item-icon">
              <i className="far fa-calendar-alt"></i>
            </div>
            <div className="delete-item-details">
              <div className="delete-item-name">{reviewCycle.cycle_name}</div>
              <div className="delete-item-description">{formatDateRange(reviewCycle.start_date, reviewCycle.end_date)}</div>
            </div>
          </div>
          
          <div className="delete-message">
            Are you sure you want to delete this review cycle? This action cannot be undone and will permanently remove all associated performance reviews, goals, and feedback.
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
              {loading ? 'Deleting...' : 'Delete Review Cycle'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewCycleModal;