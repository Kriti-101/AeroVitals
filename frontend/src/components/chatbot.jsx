import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setUserMessage('');

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: userMessage,
      });

      const chatbotReply = response.data.response;
      setMessages([...newMessages, { sender: 'chatbot', text: chatbotReply }]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🛫 AeroVitals Chatbot</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#b74545' : '#683B4A',
              color: '#fff',
              borderTopLeftRadius: msg.sender === 'user' ? 16 : 4,
              borderTopRightRadius: msg.sender === 'user' ? 4 : 16,
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#B5FFE1',
    borderRadius: '16px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#36827F',
    marginBottom: '20px',
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '350px',
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '2px solid #36827F',
  },
  message: {
    maxWidth: '75%',
    padding: '12px',
    borderRadius: '16px',
    fontSize: '14px',
  },
  inputArea: {
    display: 'flex',
    marginTop: '16px',
    gap: '10px',
  },
  input: {
    flexGrow: 1,
    padding: '10px 12px',
    fontSize: '16px',
    border: '2px solidrgb(48, 185, 249)',
    borderRadius: '8px',
  },
  button: {
    backgroundColor: '#0E85FB',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Chatbot;

