import React, { useState } from 'react';
import axios from 'axios'; // Importing Axios directly

function DocumentSearch() {
  const [searchId, setSearchId] = useState('');
  const [document, setDocument] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fileType, setFileType] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Search for a document by ID.
  const handleSearch = () => {
    setError(null); // Reset any previous errors
    setSuccessMessage(null); // Reset success message
    axios.get(`http://127.0.0.1:8000/api/documents/${searchId}`,{
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false // Ensure credentials are not sent
  } )
      .then((res) => {
        setDocument(res.data);
        setFileType(res.data.file_type || '');
        setFileUrl(res.data.file_url || '');
        setFileDescription(res.data.file_description || '');
      })
      .catch((error) => {
        setError('Document not found. Please check the document ID.',error);
        setDocument(null);
      });
  };

 // Delete the current document.
const handleDelete = () => {
  if (window.confirm('Are you sure you want to delete this document?')) {
    // Send DELETE request using Axios to the correct URL
   axios.delete(`http://127.0.0.1:8000/api/documents/${document.id}/delete`, {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json", // Ensure response is JSON
  },
  withCredentials: false, // Ensure credentials are not sent
})
      .then(() => {
        setDocument(null); // Clear document state
        setSearchId(''); // Reset search ID
        setSuccessMessage('Document deleted successfully.'); // Success message
      })
      .catch((error) => {
        setError('Error deleting document. Please try again.',error); // Error message
      });
  }
};



  // Update the current document.
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission

    const updatedData = {
      file_type: fileType,
      file_url: fileUrl,
      file_description: fileDescription,
    };

    // Directly using Axios to send a PUT request
    console.log("Sending data for update:", updatedData);
    console.log("Sending PUT request to:", `http://127.0.0.1:8000/api/documents/${document.id}/update`,{
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false // Ensure credentials are not sent
  });

    axios.put(
  `http://127.0.0.1:8000/api/documents/${document.id}/update`, 
  updatedData, 
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: false, // Ensure this is placed outside the headers object
  }
)
    .then((res) => {
      console.log("Update response:", res.data); // Debugging
      setDocument(res.data.document);
      setIsEditing(false);
      setSuccessMessage('Document updated successfully.');
      setError(null); // Clear error after successful update
    })
    .catch((err) => {
      console.error(err);
      setError(`Error updating document. Please try again. ${err.message}`);
      setSuccessMessage(null); // Clear success message on error
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Search Document by Document ID</h2>
      <input
        type="text"
        placeholder="Enter Document ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Displaying error or success message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

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
