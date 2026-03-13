import React from 'react'
import { socket } from '../utils/socketInit';
import { link } from '../utils/makeRandomLink';

function Homepage() {

    const startCall = () => {
        console.log("hi");
        const callLink = link();
        console.log(callLink);
        socket.emit("start-call", socket.id);
        console.log(socket);
    }


  return (
    <div>
      <button type='submit' onClick={startCall}>Start socket call</button>
    </div>
  )
}

export default Homepage
