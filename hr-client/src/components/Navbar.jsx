import React, { useState } from 'react';
import logo from './logo.png';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Store last 5 conversations

  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      console.log("Search query:", searchQuery);

      const apiKey = 'AIzaSyAxYku71BNvFMY0uy3arGEUmE-9tCCU_EM';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      // Generate chat history for context
      const chatContext = chatHistory.map(item => `Q: ${item.question}\nA: ${item.answer}`).join("\n");

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are an AI agent assisting in an HR dashboard. Use past context, but prioritize the latest query max of 20 phrase max.\n\n${chatContext}\n\nUser's latest question: "${searchQuery}"`
              },
            ],
          },
        ],
      };

      console.log("Request body:", JSON.stringify(requestBody));

      setLoading(true);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log("API response status:", response.status);
        const data = await response.json();

        if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          console.log("API response data:", data);
          const newResponse = data.candidates[0].content.parts[0].text;
          setAiResponse(newResponse);
          setShowResponse(true);

          // Update chat history, keeping only last 5 messages
          setChatHistory(prev => [...prev.slice(-4), { question: searchQuery, answer: newResponse }]);
        } else {
          console.error('Error from API:', data);
          setAiResponse("Sorry, there was an error with the AI response.");
          setShowResponse(true);
        }
      } catch (error) {
        console.error('Error during API call:', error);
        setAiResponse("Sorry, something went wrong.");
        setShowResponse(true);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Empty search query, nothing to send.");
    }
  };

  const handleCloseResponse = () => {
    setShowResponse(false);
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
        </div>
      </div>
      <div className="nav-right">
        <a href="#" title="Settings"><i className="fa-solid fa-gear"></i></a>
        <a href="#" title="Profile"><i className="fa-solid fa-user"></i></a>
      </div>

      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        showResponse && (
          <div className="ai-response">
            <button className="close-btn" onClick={handleCloseResponse}>X</button>
            <div className='box'>
              <h3>AI Response:</h3>
              <p>{aiResponse}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Navbar;
