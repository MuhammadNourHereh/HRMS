import React from 'react';
import DocumentUpload from './DocumentUpload'; // Import DocumentUpload component
import DocumentSearch from './DocumentSearch'; // Import DocumentSearch component

function DocumentManagement() {
  return (
    <div className='container center'>
      <h1>Employee Document Management</h1>
      <div className='box'>
      <DocumentUpload /> {/* Render DocumentUpload component */}
      </div>
      <div className="box-accent"></div>
      <div className='box'>
      <DocumentSearch /> {/* Render DocumentSearch component */}</div>
    </div>
  );
}

export default DocumentManagement;
