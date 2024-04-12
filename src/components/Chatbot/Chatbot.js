import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css'; 

const ChatBot = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState(``);
  const navigate = useNavigate();

  const url = "https://mediscan-model.onrender.com/get_chat"

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');
    if(!storedUser)
    {
        navigate("/login")
        return;
    }
    try {
      const response = await axios.post(url, { "input_prompt":prompt });
      console.log(response.data.response)
      setOutput(response.data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  function parseText(input) {
    const lines = input.split('\n'); // Split input by lines
  const result = lines.map((line, index) => {
    const boldRegex = /\*\*(.*?)\*\*/g; // Regular expression to find all occurrences of bold text
    let parts = line.split(boldRegex); // Split line by bold text occurrences
    parts = parts.map((part, i) => {
      if (part.match(boldRegex)) {
        // If part matches bold text, wrap it in <b> tags
        return <div key={i} className="bold-text" >{part.substring(2, part.length - 2)}</div>;
      } else {
        // If part doesn't match bold text, return as is
        return part;
      }
    });
    return <p key={index}>{parts}</p>; // Wrap the line in <p> tags
  });
  return <>{result}</>; // Use React fragment to return an array of elements
}

  return (
    <>
    <div className="chatbot-container">
      <h1>Medi Chat</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4} // Set the number of rows to allow multiline input
        />
        <button type="submit">Send</button>
      </form>
      {output && (
        <div className="chatbot-output">
          <div className='output-text'>{parseText(output)}</div>
        </div>
      )}
    </div>
    </>
  );
};

export default ChatBot;
