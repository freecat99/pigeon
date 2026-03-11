import React from 'react'
import { io } from 'socket.io-client'
import { link } from '../utils/makeRandomLink';

function Homepage() {

    const socket = io();

    const startCall = () => {
        console.log("hi");
        const callLink = link();
        console.log(callLink);
        socket.emit("start-call", callLink);
        console.log(socket);
    }

  return (
    <div>
      <button type='submit' onClick={startCall}>Start call</button>
    </div>
  )
}

export default Homepage
