import fs from 'fs';
import https from 'https'; //we would need https as webrtc needs a secure protocol to work on
import express from 'express';
import { config } from 'dotenv';
import { Server } from 'socket.io';

config();

const app = express();

const key = fs.readFileSync('./certs/cert.key');
const cert = fs.readFileSync('./certs/cert.crt');

const secureServer =  https.createServer({key, cert}, app);



const io = new Server(secureServer, {
    cors: {
        origin: 'https://localhost:3000',
        methods: ["GET", "POST"],
    },
});

secureServer.listen(1601, ()=>{
    console.log("signaling server started");
});

const connectedSocket = [
    //username
    //socket.id
];

//listening for connections to socket server
io.on('connection', (socket)=>{

    const userLink = socket.handshake.auth.userLink;
    connectedSocket.push({
        userLink,
        socketId: socket.id
    })

    console.log(socket.id, 'has joined');
    socket.on('disconnect', ()=>{
        console.log(socket.id, 'has left');
    })
})