import { useEffect } from "react";
import { link } from "../utils/makeRandomLink.js";
import {socket} from "../App.js";

const userLink = link;

socket = io.connect('https://localhost:1601', {
    auth:{
        userLink
    }
});

let peerConfiguration = {
    iceServers:[
        {
            urls:[
                "stun:stun3.l.google.com:5349",
                "stun:stun2.l.google.com:5349",
                "stun:stun2.l.google.com:19302" ,
                "stun:stun3.l.google.com:3478",
                "stun:stun4.l.google.com:5349",
                "stun:stun4.l.google.com:19302"
            ]
        }
    ]
}

const call = async(e) => {
    await createPeerConnection();
}

const createPeerConnection = (offerObj) =>{
    return new Promise(async(resolve, reject)=>{
        peerConnection = new RTCPeerConnection(peerConfiguration);
        dataChannel = peerConnection.createDataChannel();
        
        //enable send button when opened data channel
        dataChannel.addEventListener('open', event=>{
            bttnRef.disabled = false;
        })

        dataChannel.addEventListener('close', event=>{
            bttnRef.disabled = true;
        })

        
    })
}

fileRef.addEventListener('click', call);
bttnRef.addEventListener('click', );

