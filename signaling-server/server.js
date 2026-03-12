import fs from 'fs';
//import https from 'https'; //we would need https as webrtc needs a secure protocol to work on
import http from 'http'; //we would need https as webrtc needs a secure protocol to work on
import express from 'express';
import { config } from 'dotenv';
import { Server } from 'socket.io';

config();

const app = express();

const key = fs.readFileSync('./certs/cert.key');
const cert = fs.readFileSync('./certs/cert.crt');

const secureServer =  http.createServer({key, cert}, app);



const io = new Server(secureServer, {
    cors: {
        origin: 'https://localhost:3000',
        methods: ["GET", "POST"],
    },
});

secureServer.listen(1601, ()=>{
    console.log("signaling server started");
});



//listening for connections to socket server
io.on('connection', (socket)=>{

    console.log(socket.id, 'has joined');

    socket.on('start-call', (data)=>{
        console.log("from server ", data);
    })

    socket.on('disconnect', ()=>{
        console.log(socket.id, 'has left');
    })

})
