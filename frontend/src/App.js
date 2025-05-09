// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import HeartRateMonitor from './components/heartratemonitor';
import Chatbot from './components/chatbot';
import MusicPlayer from './components/music';

function App() {
  const [playMusic, setPlayMusic] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <HeartRateMonitor setPlayMusic={setPlayMusic} />
      <Chatbot />
      {playMusic && <MusicPlayer />}
    </div>
  );
}

export default App;
