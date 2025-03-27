import React, { useState } from 'react';
import remote from '../apis/remote';
import '../styles/ViewEmployee.css';

const ViewCandidateModal = ({ isOpen, onClose, candidate, onStatusChange, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !candidate) return null;

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await remote.updateCandidateStatus(candidate.id, {
        status: newStatus
      });
      
      if (onStatusChange) {
        onStatusChange(response.data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'applied': return 'status-applied';
      case 'interview': return 'status-interview';
      case 'accepted': return 'status-accepted';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Candidate Details</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="employee-profile">
            <div className="employee-avatar-large">
              {candidate.name.charAt(0).toUpperCase()}
            </div>
            <div className="employee-name-title">
              <h3>{candidate.name}</h3>
              <div className="employee-position">
                <span className={`status-badge ${getStatusBadgeClass(candidate.status)}`}>
                  {candidate.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="detail-sections">
            <div className="detail-section">
              <h4 className="detail-section-title">Contact Information</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-label">Email</div>
                  <div className="detail-value">{candidate.email}</div>
                </div>
              </div>
            </div>
            
            <div className="detail-section">
              <h4 className="detail-section-title">Application Details</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-label">Application Date</div>
                  <div className="detail-value">{formatDate(candidate.created_at)}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Resume</div>
                  <div className="detail-value">
                    {candidate.document ? (
                      <a 
                        href={candidate.document.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="document-link"
                      >
                        <i className="fas fa-file-pdf"></i> View Resume
                      </a>
                    ) : (
                      <span className="no-document">No resume uploaded</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}
          
          <div className="modal-actions">
            <div className="status-actions">
              <span className="action-label">Change Status:</span>
              <div className="status-buttons">
                <button 
                  className={`status-button ${candidate.status === 'applied' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('applied')}
                  disabled={loading || candidate.status === 'applied'}
                >
                  Applied
                </button>
                <button 
                  className={`status-button ${candidate.status === 'interview' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('interview')}
                  disabled={loading || candidate.status === 'interview'}
                >
                  Interview
                </button>
                <button 
                  className={`status-button ${candidate.status === 'accepted' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('accepted')}
                  disabled={loading || candidate.status === 'accepted'}
                >
                  Accept
                </button>
                <button 
                  className={`status-button ${candidate.status === 'rejected' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('rejected')}
                  disabled={loading || candidate.status === 'rejected'}
                >
                  Reject
                </button>
              </div>
            </div>
            
            <div className="primary-actions">
              <button 
                className="button button-secondary" 
                onClick={onClose}
              >
                Close
              </button>
              <button 
                className="button button-primary" 
                onClick={onEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCandidateModal;