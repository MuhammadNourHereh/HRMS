import React, { useState } from 'react';
import { getDocumentById, updateDocument, deleteDocument } from './apiDocument'; // Adjust the import path as needed

function DocumentSearch() {
  const [searchId, setSearchId] = useState('');
  const [document, setDocument] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fileType, setFileType] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [error, setError] = useState(null);

  // Search for a document by ID.
  const handleSearch = () => {
    setError(null); // Reset any previous errors
    getDocumentById(searchId)
      .then((res) => {
        setDocument(res.data);
        setFileType(res.data.file_type || ''); // Ensure fileType is always a string
        setFileUrl(res.data.file_url || ''); // Ensure fileUrl is always a string
        setFileDescription(res.data.file_description || ''); // Ensure fileDescription is always a string
      })
      .catch((error) => {
        setError('Document not found.',error);
        setDocument(null);
      });
  };

  // Delete the current document.
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteDocument(document.id)
        .then(() => {
          setDocument(null);
          setSearchId('');
          setError('Document deleted successfully.');
        })
        .catch((error) => {
          setError('Error deleting document.',error);
        });
    }
  };

  // Update the current document.
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      file_type: fileType,
      file_url: fileUrl,
      file_description: fileDescription,
    };console.log("Sending data:", updatedData);


    updateDocument(document.id, updatedData)
      .then((res) => {
        console.log("Update response:", res.data);  // Debugging
        setDocument(res.data.document);
        setIsEditing(false);
        setError('Document updated successfully.');
      })
      .catch((err) => {
  console.error(err);
  setError(`Error updating document. Please try again. ${err.message}`);
});
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Search Document by Document_id</h2>
      <input
        type="text"
        placeholder="Enter Document ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

    {document && (
  <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
    <p><strong>This document belongs to employee:</strong> {document.employee_id}</p>

    <h3>Document Details</h3>
    {!isEditing ? (
      <div>
        <p>
          <strong>File Type:</strong> {document.file_type || 'N/A'}
        </p>
        <p>
          <strong>File URL:</strong>{' '}
          <a href={document.file_url} target="_blank" rel="noopener noreferrer">
            {document.file_url || 'No URL provided'}
          </a>
        </p>
        <p>
          <strong>Description:</strong> {document.file_description || 'No description provided'}
        </p>
        <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px' }}>
          Edit
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    ) : (
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: '10px' }}>
          <label>File Type: </label>
          <input
            type="text"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>File URL: </label>
          <input
            type="text"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description: </label>
          <textarea
            value={fileDescription}
            onChange={(e) => setFileDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginRight: '10px' }}>
          Update Document
        </button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </form>
    )}
  </div>
)}

    </div>
  );
}

export default DocumentSearch;
