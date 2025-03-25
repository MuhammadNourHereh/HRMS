import React from 'react';
import "../styles/Modal.css";

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  fullscreen = false 
}) => {
  if (!isOpen) return null;
  

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-container ${fullscreen ? 'modal-fullscreen' : ''}`}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;