import fs from 'fs';
//import https from 'https'; //we would need https as webrtc needs a secure protocol to work on
import http from 'http'; //we would need https as webrtc needs a secure protocol to work on
import express from 'express';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { connectDB } from './utils/db.js';
import dbRouter from './routes/dbRoutes.js';

config();

const app = express();

app.use(express.json());

app.use('/api/db', dbRouter);

/* const key = fs.readFileSync('./certs/cert.key');
const cert = fs.readFileSync('./certs/cert.crt'); */

const secureServer =  http.createServer(app);



const io = new Server(secureServer, {
    cors: {
        origin: 'https://localhost:3000',
        methods: ["GET", "POST"],
    },
});



secureServer.listen(1601, ()=>{
    connectDB();
    console.log("backend socket server started");
});



//listening for connections to socket server
io.on('connection', (socket)=>{

    console.log(socket.id, 'has joined');

    socket.on('initiate-call', (data)=>{
        console.log("from server ", data);
    })

    socket.on('offer', (from, to, offer)=>{
        console.log({from, to, offer});
        
    })

    socket.on('disconnect', ()=>{
        console.log(socket.id, 'has left');
    })

})
