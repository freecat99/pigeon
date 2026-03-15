import './App.css';
import io from 'socket.io-client'
import { useEffect } from 'react';
import VideoFeed from './components/VideoFeed.jsx';
import Homepage from './pages/Homepage.jsx';
import Callpage from './pages/Callpage.jsx';
import { socket } from './utils/socketInit.js';

function App() {

  useEffect(()=>{
    //io.connect('https://localhost:1601');

  }, []);

  return (
    <div className="App">
      <Homepage/>
    </div>
  );
}

export default App;
