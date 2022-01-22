const express = require('express');
const app = express();
const path = require('path');

//get http module
const http = require('http');
const server = http.createServer(app); // app is passed as request handler 

const users = {};

const socketio = require('socket.io');
io = socketio(server);

app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => { // connection is the name of an event

    console.log(`someone got connected with the id ${socket.id}`);

    // on is used to listen for the event 
    socket.on('send-msg', (d) => {
        io.emit('rec-msg', {
            msg: d.msg,
            username: users[socket.id]
        })
    })

    socket.on('login', (d) => {
        users[socket.id] = d.username
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`server started at port ${port}`)
});