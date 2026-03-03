import React, { useEffect, useReducer, useRef, useState } from 'react'

function VideoFeed() {
    const streamRef = useRef(null);
    const videoRef = useRef(null);
    const captureStreamRef = useRef(null);
    const screenVideoRef = useRef(null);

    const [gavePermission, setGavePermission] = useState(false);
    const [devices, setDevices] = useState([]);
    
    const getFeed = async() => {
        
        const constraints = {
            video: true,
            audio: true
        }
        
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = mediaStream;
            videoRef.current.srcObject = mediaStream;      
            setGavePermission(true);
        } catch (error) {
            console.log("Unable to get user media");
        }
    };
    
    useEffect(()=>{
       getDevices();
    }, [gavePermission])
    
    const getScreen = async() => {
        const mediaOptions = {
            video: {
                displaySurface: 'browser'
            },
            audio: {
                suppressLocalAudioPlayback: false, //suppresses audio for user sharing screen
            },
            preferCurrentTab: false,
            selfBrowserSurface: "include",
            systemAudio: "include",
            surfaceSwitching: "include",
            monitorTypeSurfaces: "include",
        };

        try {
            const screen = await navigator.mediaDevices.getDisplayMedia(mediaOptions);
            captureStreamRef.current = screen;
            screenVideoRef.current.srcObject = screen


            //listen for end share screen 
            screen.getVideoTracks()[0].onended = () => {
                captureStreamRef.current = null;
            }

        } catch (error) {
            console.log("Error in screen share")
        }
    }

    const disableScreenShare = () => {
        try {
            
            const screen = captureStreamRef.current;
            if(!screen) return;

            const tracks = screen.getVideoTracks();

            tracks.forEach(track =>{
                track.stop();
            })

        } catch (error) {
            console.log("Error in disable screen share")
        }
    }

    const toggleVideo = () => {
        try {
            const stream = streamRef.current;
            if(!stream) return;

            const tracks = stream.getVideoTracks();
            
            tracks.forEach(track=>{
                track.enabled? track.enabled=false: track.enabled=true;
            })

        } catch (error) {
            console.log("Error with media feed");
        }
    };

    const toggleAudio = () => {
        try {
            const stream = streamRef.current;
            if(!stream) return;

            const tracks = stream.getAudioTracks();
            
            tracks.forEach(track=>{
                track.enabled? track.enabled=false: track.enabled=true;
            })

        } catch (error) {
            console.log("Error with media feed");
        }
    };

    const changeVideoSize = (e) => {

        const selectedVideoSize = e.target.selectedOptions[0].text;
        console.log(selectedVideoSize);
        try {
            const stream = streamRef.current;
            stream.getVideoTracks().forEach(track=>{
                const capabilites = track.getCapabilities();
                let resolution = capabilites.height.max;
                let videoAspectRatio = 1.7;

                if(selectedVideoSize==='Max'){
                    resolution = 720<capabilites.height.max? 720: capabilites.height.max;
                }else if(selectedVideoSize==='Good'){
                    resolution = 480;
                }else if(selectedVideoSize==='Okay'){
                    resolution = 360;
                }else{
                    resolution = 144;
                }

                const videoConstraints = {
                    height: resolution,
                    aspectRatio: videoAspectRatio
                }
                
                track.applyConstraints(videoConstraints);

                console.log('capabilites', capabilites);
            })
            
        } catch (error) {
            
        }
    }

    const getDevices = async() => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            setDevices(devices);

            console.log("devices", devices);

        } catch (error) {
            console.log("Error in get devices")
        }
    }

    const changeVideoInput = async(e) => {
        const preferredDevice = e.target.value;

        const deviceConstraints = {
            audio: true,
            video: {deviceId: {exact: preferredDevice}}
        }

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(deviceConstraints);
            streamRef.current = mediaStream;
            videoRef.current.srcObject = mediaStream;     

        } catch (error) {
            console.log("Error in choosing camera");
        }
    }
    const changeAudioInput = async(e) => {
        const preferredDevice = e.target.value;
        
        const deviceConstraints = {
            video: true,
            audio: {deviceId: {exact: preferredDevice}}
        }

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(deviceConstraints);
            streamRef.current = mediaStream;
            videoRef.current.srcObject = mediaStream;     

        } catch (error) {
            console.log("Error in choosing mic");
        }
    }
    const changeAudioOutput = async(e) => {
        const preferredDevice = e.target.value;
        
        try {
            await videoRef.setSinkId(preferredDevice);    
        } catch (error) {
            console.log("Error in choosing speaker");
        }

    }

  return (
    <div className='videoFeed'>
      <button onClick={getFeed}>Get Media Feed</button>
      <button onClick={getScreen}>Get Screen Share</button>
      <button onClick={toggleVideo}>Toggle Video</button>
      <button onClick={toggleAudio}>Toggle Audio</button>
      <video src="" ref={videoRef} autoPlay playsInline></video>
      <button onClick={disableScreenShare}>End Share Screen</button>
      <video src="" ref={screenVideoRef} autoPlay playsInline muted></video>
      <select name="videoSize" id="videoSize" onChange={changeVideoSize}>
        <option value="Max">Max</option>
        <option value="Good" selected>Good</option>
        <option value="Okay">Okay</option>
        <option value="Min">Min</option>
      </select>
      <label htmlFor="videoin">Select Camera: </label>
      <select name="videoin" id="videoin" onChange={changeVideoInput}>
        {devices.filter(device=>device.kind==="videoinput")
            .map(device=>(
                <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
            ))}
      </select>
      <label htmlFor="audioin">Select Mic: </label>
      <select name="audioin" id="audioin" onChange={changeAudioInput}>
        {devices.filter(device=>device.kind==='audioinput')
            .map(device=>(
                <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
            ))
        }
      </select>
      <label htmlFor="audioout">Select Speaker: </label>
      <select name="audioout" id="audioout" onChange={changeAudioOutput}>
        {devices.filter(device=>device.kind==='audiooutput')
            .map(device=>(
                <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
            ))
        }
      </select>
    </div>
  )
}

export default VideoFeed
