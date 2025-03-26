import React, { useState } from 'react';
// import './Navbar.css'; // Assuming you have a CSS file for styling
import logo from './logo.png';
import { Colors } from 'chart.js';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState(''); // Manage search query state
  const [aiResponse, setAiResponse] = useState(''); // Manage AI response state
  const [loading, setLoading] = useState(false); // Manage loading state
  const [showResponse, setShowResponse] = useState(false); // Manage visibility of the AI response box

  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      console.log("Search query:", searchQuery); // Log the search query entered by the user

      const apiKey = 'AIzaSyAxYku71BNvFMY0uy3arGEUmE-9tCCU_EM'; // Replace with your actual Gemini API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are an AI agent integrated into a Human Resources (HR) dashboard. Your role is to assist HR personnel by answering questions and providing guidance related to various HR tasks. Below is the structure of the HR dashboard that you are integrated into:
t always keep it short i max of 10phrases : "${searchQuery}"`
              },
            ],
          },
        ],
      };

      console.log("Request body:", JSON.stringify(requestBody)); // Log the request body being sent to the API

      setLoading(true); // Set loading to true when the request is sent

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log("API response status:", response.status); // Log the response status

        const data = await response.json();

        // Check if the API response contains valid data
        if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          console.log("API response data:", data); // Log the successful API response
          setAiResponse(data.candidates[0].content.parts[0].text); // Display the AI response
          setShowResponse(true); // Show the response box
        } else {
          console.error('Error from API:', data); // Log any error message from the API
          setAiResponse("Sorry, there was an error with the AI response.");
          setShowResponse(true);
        }
      } catch (error) {
        console.error('Error during API call:', error); // Log any error that occurs during the fetch call
        setAiResponse("Sorry, something went wrong.");
        setShowResponse(true);
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    } else {
      console.log("Empty search query, nothing to send.");
    }
  };

  const handleCloseResponse = () => {
    setShowResponse(false); // Hide the response box when the close button is clicked
  };

  return (
    <div className="navbar">
      <div className="logo">
        <a href="#">
          <img src={logo} alt="Company Logo" />
        </a>
      </div>
      <div className="nav-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query as user types
          />
          <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i> {/* Trigger AI on click */}
        </div>
      </div>
      <div className="nav-right">
        <a href="#" title="Settings"><i className="fa-solid fa-gear"></i></a>
        <a href="#" title="Profile"><i className="fa-solid fa-user"></i></a>
      </div>

      {/* Display loading message and AI response below the search bar */}
      {loading ? (
        <div className="loading-message">Loading...</div> // Show loading state
      ) : (
        showResponse && (
          <div className="ai-response">
              <button className="close-btn" onClick={handleCloseResponse}>X</button>
              <div className='box'>
            <h3>AI Response:</h3>
                <p >{aiResponse}</p> {/* Display AI response */}
                </div>
          </div>
        )
      )}
    </div>
  );
}

export default Navbar;
