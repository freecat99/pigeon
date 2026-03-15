import React from 'react'
import { socket } from '../utils/socketInit';
import { link } from '../utils/makeRandomLink';
import { useNavigate } from 'react-router';

function Homepage() {

  const navigate = useNavigate();

    const startCall = () => {
        console.log("hi");
        const callLink = link();
        console.log(callLink);
        socket.emit("start-call", socket.id);
        console.log(socket);
        navigate('/call');
    }


  return (
    <div>
      <button type='submit' onClick={startCall}>Start socket call</button>
    </div>
  )
}

export default Homepage
