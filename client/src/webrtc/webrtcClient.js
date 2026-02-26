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

const handleClick = () => {
  if (myElementRef.current) {
    myElementRef.current.style.color = 'blue';
  }
};

const call = async(e) => {
    
}

buttonRef.addEventListener('click', call);

