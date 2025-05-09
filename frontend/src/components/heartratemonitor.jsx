import React, { useState } from 'react';
import axios from 'axios';

export default function HeartRateMonitor({ setPlayMusic }) {
  const [heartRate, setHeartRate] = useState('');

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/heartrate', { heart_rate: Number(heartRate) });
    setPlayMusic(res.data.play_music);
  };

  return (
    <div>
      <input type="number" value={heartRate} onChange={e => setHeartRate(e.target.value)} placeholder="Enter HR" />
      <button onClick={handleSubmit}>Check HR</button>
    </div>
  );
}
