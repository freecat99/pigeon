import React, { useEffect, useReducer, useRef } from 'react'

function VideoFeed() {
    let stream = null; 
    const videoRef = useRef(null);

    const getFeed = async() => {
        
        const constraints = {
            video: true,
            audio: true
        }

        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(stream);
            videoRef.current.srcObject = stream;      
        } catch (error) {
            console.log("Media permission denied");
        }
    };
    
    const disableVideo = () => {
        try {
            const tracks = stream.getTracks();
            tracks.forEach(track=>{
                if(track.kind==='video'){
                    track.stop();
                }
            });

        } catch (error) {
            console.log("Error showing Feed");
        }
    };
    const disableAudio = () => {
        try {
            const tracks = stream.getTracks();
            tracks.forEach(track=>{
                if(track.kind==='audio'){
                    track.stop();
                }
            });

        } catch (error) {
            console.log("Error showing Feed");
        }
    };

  return (
    <div>
      <button onClick={getFeed}>Get Media Feed</button>
      <button onClick={disableVideo}>Hide Video</button>
      <button onClick={disableAudio}>Hide Audio</button>
      <video src="" ref={videoRef} autoPlay playsInline></video>
    </div>
  )
}

export default VideoFeed
