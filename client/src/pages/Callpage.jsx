import React, { useRef, useState } from 'react'
import { socket } from '../utils/socketInit'
import VideoFeed from '../components/VideoFeed';

function Callpage() {
    const [stream, setStream] = useState('');

    const getStream = (streamData) => {
        setStream(streamData);
    }

    const peerConnectionRef = useRef(null);
    
    const peerConfiguration = {
        iceServers:[
            {
                urls:[
                    "stun:stun3.l.google.com:5349",
                    "stun:stun2.l.google.com:5349",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun3.l.google.com:3478",
                    "stun:stun4.l.google.com:5349",
                    "stun:stun4.l.google.com:19302"
                ]
            }
        ]
    }

    const createPeerConnection = () => {
        let ps = peerConnectionRef.current;

        ps = new RTCPeerConnection(peerConfiguration);

    }
    
    

  return (
    <div>
        <h1>Hello callpage</h1>
      <VideoFeed sendDataToCallpage = {getStream}/>
    </div>
  )
}

export default Callpage
