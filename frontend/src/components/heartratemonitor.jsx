import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Howl } from 'howler';
import musicFile from '../assets/background-music-soft-piano-334995.mp3';

const HeartRateMonitor = () => {
  const [heartRate, setHeartRate] = useState('');
  const [status, setStatus] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const soundRef = useRef(null);

  useEffect(() => {
    // Initialize the sound only once
    soundRef.current = new Howl({
      src: [musicFile],
      loop: true,
      volume: volume,
    });

    return () => {
      // Cleanup on component unmount
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    // Update volume when it changes
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

  const checkHeartRate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/heartrate', {
        heart_rate: heartRate
      });

      const play = response.data.play_music;
      const newStatus = determineStatus(heartRate);

      setStatus(newStatus);

      if (play && !isPlaying) {
        soundRef.current.play();
        setIsPlaying(true);
      } else if (!play && isPlaying) {
        soundRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error checking heart rate:', error);
    }
  };

  const determineStatus = (rate) => {
    const hr = parseInt(rate);
    if (isNaN(hr)) return null;
    
    if (hr < 60) return { text: 'Low', color: '#3B82F6', emoji: '⬇️' };
    if (hr > 100) return { text: 'High', color: '#EF4444', emoji: '⬆️' };
    return { text: 'Normal', color: '#10B981', emoji: '✅' };
  };

  const toggleMusic = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>💓 Heart Rate Monitor</h3>
      
      <div style={styles.inputContainer}>
        <input
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="Enter heart rate (bpm)"
          style={styles.input}
        />
        <button onClick={checkHeartRate} style={styles.button}>Check</button>
      </div>

      {status && (
        <div style={{...styles.statusBox, backgroundColor: status.color + '20', borderColor: status.color}}>
          <h3 style={{color: status.color, margin: 0}}>
            {status.emoji} {status.text} Heart Rate
          </h3>
          <p style={{margin: '5px 0', fontWeight: 'bold'}}>{heartRate} bpm</p>
        </div>
      )}

      <div style={styles.musicControls}>
        <button 
          onClick={toggleMusic} 
          style={{
            ...styles.musicButton,
            backgroundColor: isPlaying ? '#ef4444' : '#10B981'
          }}
        >
          {isPlaying ? '⏸ Pause Music' : '▶️ Play Music'}
        </button>
        
        <div style={styles.volumeControl}>
          <label>Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            style={styles.volumeSlider}
          />
        </div>
      </div>

      {isPlaying && <p style={styles.musicNote}>🎶 Calming music is playing...</p>}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f0f9ff',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '450px',
    margin: '20px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    color: '#0369a1',
    marginBottom: '20px'
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    width: '60%',
    borderRadius: '8px',
    border: '2px solid #bae6fd',
    outline: 'none',
    transition: 'border 0.3s',
  },
  button: {
    backgroundColor: '#0284c7',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  statusBox: {
    padding: '15px',
    borderRadius: '10px',
    margin: '20px 0',
    border: '2px solid',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  musicControls: {
    marginTop: '25px',
    padding: '15px',
    backgroundColor: '#e0f2fe',
    borderRadius: '10px'
  },
  musicButton: {
    backgroundColor: '#0ea5e9',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    marginBottom: '10px'
  },
  volumeControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  volumeSlider: {
    width: '100px'
  },
  musicNote: {
    marginTop: '15px',
    fontStyle: 'italic',
    color: '#64748b'
  }
};

export default HeartRateMonitor;