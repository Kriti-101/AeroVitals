import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);  // Store chat history
  const [userMessage, setUserMessage] = useState('');  // Store the user's current message
  const [loading, setLoading] = useState(false);  // For loading state during the API request

  // Handle sending a message
  const sendMessage = async (e) => {
    e.preventDefault();

    // Check if the input is empty before sending a message
    if (!userMessage.trim()) {
      return;  // Don't send an empty message
    }

    // Add user message to chat history
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setUserMessage('');  // Clear the input field
    setLoading(true);  // Set loading state while awaiting response

    try {
      // Send the user's message to the Flask backend
      const response = await axios.post('http://localhost:5000/chat', {
        message: userMessage,  // message from the user input
      });

      // Get the chatbot's response
      const chatbotReply = response.data.response;

      // Add chatbot's reply to chat history
      setMessages([...newMessages, { sender: 'chatbot', text: chatbotReply }]);
    } catch (error) {
      console.error("There was an error!", error);
      // Add error message to chat history
      setMessages([...newMessages, { sender: 'chatbot', text: 'Sorry, there was an issue with the chatbot.' }]);
    } finally {
      setLoading(false);  // Reset loading state after the response
    }
  };

  return (
    <div>
      <h2>Chat with the chatbot</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'Chatbot'}:</strong>
            <p>{msg.text}</p>
          </div>
        ))}
        {/* Scroll to the bottom automatically when messages are added */}
        <div ref={(el) => el && (el.scrollTop = el.scrollHeight)} />
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message"
          style={{ width: '80%', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
