import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/documents';

// Fetch a document by ID
export const getDocumentById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateDocument = (id, documentData) => {
  return axios.put(`${API_URL}/${id}`, documentData, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
};


// Delete a document by ID
export const deleteDocument = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
