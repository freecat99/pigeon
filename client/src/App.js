import './App.css';
import io from 'socket.io-client'
import { useEffect } from 'react';
import VideoFeed from './components/VideoFeed.jsx';
import Homepage from './pages/Homepage.jsx';

function App() {

  useEffect(()=>{
    //io.connect('https://localhost:1601');
  }, []);

  return (
    <div className="App">
      <Homepage/>
      <VideoFeed/>
    </div>
  );
}

export default App;
