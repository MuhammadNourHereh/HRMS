import React, { useState } from 'react';
import axios from 'axios';

const DocumentUpload = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleFileDescriptionChange = (e) => {
    setFileDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!file || !employeeId || !fileType) {
      setMessage('Please provide all required fields.');
      console.log("Validation failed: Missing required fields.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        const base64File = reader.result.split(',')[1];

        // Prepare the data to be sent
        const requestData = {
          employee_id: employeeId,
          file_type: fileType,
          file_description: fileDescription,
          file: base64File,
        };

        // Log the data being sent
        console.log("Sending data:", requestData);

        // Send POST request to the backend
       const response = await axios.post(
  'http://127.0.0.1:8000/api/documents/upload',
  requestData,
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: false, // Ensure this is placed outside the headers object
  }
);


        // Log the response from the backend
        console.log("Response from server:", response.data);

        if (response.data.success) {
          setMessage('Document uploaded successfully');
        } else {
          setMessage('Error: ' + (response.data.error || 'Unknown error'));
        }
      };
    } catch (error) {
      // Log any error that occurs during the request
      console.error("Error uploading document:", error.response?.data || error.message);
      setMessage('Error uploading document');
    }
  };

  return (
    <div className="container-white">
      <h2 className="h-tag">Upload Document</h2>
      <form className="box-accent" onSubmit={handleSubmit}>
        <div>
          <label className="label-tag" htmlFor="employeeId">Employee ID:</label>
          <input
            className="input-tag"
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={handleEmployeeIdChange}
            placeholder="Enter Employee ID"
          />
        </div>

        <div>
          <label className="label-tag" htmlFor="file">Document:</label>
          <input
            className="input-tag"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label className="label-tag" htmlFor="fileType">File Type:</label>
          <select
            id="fileType"
            value={fileType}
            onChange={handleFileTypeChange}
            className="input-tag"
          >
            <option value="">Select File Type</option>
            <option value="pdf">PDF</option>
            <option value="jpg">JPG</option>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
          </select>
        </div>

        <div>
          <label className="label-tag" htmlFor="fileDescription">File Description:</label>
          <input
            type="text"
            id="fileDescription"
            value={fileDescription}
            onChange={handleFileDescriptionChange}
            placeholder="Enter file description"
            className="input-tag"
          />
        </div>

        <button className="btn-btn" type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default DocumentUpload;
