import React, { useState } from 'react';
import remote from '../apis/remote';
import '../styles/DeleteEmployeeModal.css'; // Reusing this CSS

const DeleteCandidateModal = ({ isOpen, onClose, candidate, onDelete }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !candidate) return null;

  const handleDelete = async () => {
    if (!confirmed) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await remote.deleteCandidate(candidate.id);
      
      if (onDelete) {
        onDelete();
      }
      onClose();
      setConfirmed(false);
    } catch (error) {
      console.error("Error deleting candidate:", error);
      setError("Failed to delete candidate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        <div className="delete-modal-header">
          <h2 className="delete-modal-title">Delete Candidate</h2>
          <button className="delete-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="delete-modal-body">
          <div className="delete-employee-info">
            <div className="delete-employee-avatar">
              {candidate.name.charAt(0).toUpperCase()}
            </div>
            <div className="delete-employee-details">
              <div className="delete-employee-name">{candidate.name}</div>
              <div className="delete-employee-position">{candidate.email}</div>
            </div>
          </div>
          
          <div className="delete-modal-message">
            Are you sure you want to delete this candidate? This action cannot be undone and will permanently remove all associated data.
          </div>
          
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}
          
          <div className="delete-modal-confirmation">
            <label className="delete-confirmation-checkbox">
              <input 
                type="checkbox" 
                checked={confirmed} 
                onChange={() => setConfirmed(!confirmed)} 
                disabled={loading}
              />
              <span className="checkbox-text">I understand that this action is irreversible</span>
            </label>
          </div>
          
          <div className="delete-modal-actions">
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
              {loading ? "Deleting..." : "Delete Candidate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCandidateModal;