import logo from './logo.svg';
import './App.css';

import adapter from 'webrtc-adapter';
import io from 'socket.io-client'
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    io.connect('https://localhost:1601');

    

  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
