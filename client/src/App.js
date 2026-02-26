import logo from './logo.svg';
import './App.css';

import adapter from 'webrtc-adapter';
import io from 'socket.io-client'
import { useEffect, useRef } from 'react';

function App() {

  useEffect(()=>{
    io.connect('https://localhost:1601');
  }, []);

  const buttonRef = useRef(null);

  return (
    <div className="App">
      <button ref={buttonRef}></button>
    </div>
  );
}

export const socket = io;
export default App;
