import React, { useState } from 'react';
import HeartRateMonitor from './components/heartratemonitor';
import Chatbot from './components/chatbot';
import MusicPlayer from './components/music';

function App() {
  const [playMusic, setPlayMusic] = useState(false);

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>AeroVitals</h1>
        <p style={styles.subtitle}>Your in-flight personal health monitoring platform</p>
      </header>
      
      <div style={styles.mainContent}>
        <div style={styles.column}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Heart Rate Monitor</h2>
            <HeartRateMonitor />
          </div>
        </div>
        
        <div style={styles.column}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>First Aid Assistant</h2>
            <Chatbot />
          </div>
        </div>
      </div>
      
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} AeroVitals</p>
      </footer>
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1.5rem',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    margin: 0
  },
  subtitle: {
    fontSize: '1rem',
    opacity: 0.9,
    margin: '0.5rem 0 0'
  },
  mainContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  column: {
    flex: '1',
    minWidth: '350px',
    maxWidth: '600px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    height: '100%'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 0,
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0'
  },
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#e2e8f0',
    color: '#64748b',
    fontSize: '0.875rem'
  }
};

export default App;
