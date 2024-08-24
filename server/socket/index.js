import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import {GetUserDetails} from '../helper/GetUserDetailS.js';

export const app = express();

export const server = http.createServer(app);
const io=new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

//online User
const onlineUser=new Set();

io.on('connection',async(socket)=>{
    console.log('User connected',socket.id);

    const token=socket.handshake.auth.token;

    //current user details
    const user=await GetUserDetails(token);

    //create a room
    socket.join(user?._id);
    onlineUser.add(user?._id);

    //online user details
    io.emit('onlineUser',Array.from(onlineUser));

    socket.on('disconnect',()=>{
        onlineUser.delete(user?._id);
        console.log('User disconnected',socket.id);
    })
})

