
//https://github.com/lschlessinger1/Chat-Server/blob/master/chat-server.js
//https://www.youtube.com/watch?v=jD7FnbI76Hg

'use strict';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketio = require("socket.io")(server);
//const io = new Server(server);


app.get('/', (req, res) => {
    res.send("haha")
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});


const io = socketio;
io.sockets.on('connection', (Socket) => {
    console.log('a user  connected : ' + Socket.id);

    Socket.on("first Request", req => {
        console.log("Transmit Approved : " + req.data);
        Socket.emit("first Respond", {data : "firstRespone"});
    })
});



