import './App.css';
import io from 'socket.io-client'
import { useEffect } from 'react';
import VideoFeed from './components/VideoFeed.jsx';

function App() {

  useEffect(()=>{
    //io.connect('https://localhost:1601');
  }, []);

  return (
    <div className="App">
      <VideoFeed/>
    </div>
  );
}

export default App;
