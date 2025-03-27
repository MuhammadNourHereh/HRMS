import React, { useEffect, useState } from 'react';
import remote from '../apis/remote';
import '../styles/Modal.css';
import '../styles/EditEmployee.css';

const EditCandidateModal = ({ isOpen, onClose, candidate, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'applied',
    resume: null
  });
  
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (candidate) {
      setFormData({
        name: candidate.name || '',
        email: candidate.email || '',
        status: candidate.status || 'applied',
        resume: null
      });
      
      // If there's an existing document, show it
      if (candidate.document?.file_url) {
        setFilePreview(candidate.document.file_url);
      } else {
        setFilePreview(null);
      }
    } else {
      setFormData({
        name: '',
        email: '',
        status: 'applied',
        resume: null
      });
      setFilePreview(null);
    }
    
    setError(null);
  }, [candidate, isOpen]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Preview for the file
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Create FormData 
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('status', formData.status);
      
      if (formData.resume) {
        data.append('resume', formData.resume);
      }
      
      const id = candidate?.id || 'add';
      const response = await remote.addOrUpdateCandidate(id, data);
      
      if (onSuccess) {
        onSuccess(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Error saving candidate:", error);
      setError("Failed to save candidate. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            {candidate?.id ? "Edit Candidate" : "Add New Candidate"}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="edit-employee-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="resume">Resume</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
              {filePreview && (
                <div className="file-preview">
                  <p>Current file: {candidate?.document?.file_description || 'Resume'}</p>
                </div>
              )}
              <small>Accepted formats: PDF, DOC, DOCX (Max 2MB)</small>
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
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="button button-primary"
              >
                {candidate?.id ? "Update Candidate" : "Add Candidate"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCandidateModal;