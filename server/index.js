const express = require('express');
const socket = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./user.js');
//Setting up the port
const PORT = process.env.PORT || 5000

const router = require('./router');

const app = express();
//initilize server
const server = http.createServer(app);
const io = socket(server);
app.use(router);
io.on('connection', (socket) =>{
    console.log('we have a new connection');
socket.on('join',({name, room}, callback)=>{
const{error, user} = addUser({id: socket.id, name, room});
if(error) return callback(error);
socket.join(user.room);
//displays welcome message to new user who joins the chat
socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
//display new user who joins the chat
socket.broadcast.to(user.room).emit('message',{user: 'admin', text:`${user.name}, has joined`});

//users in room
io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
callback();
});
//user defined messages
socket.on('sendMessage', (message, callback)=>{
 const user = getUser(socket.id);
 io.to(user.room).emit('message', {user: user.name, text: message});
 io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
 callback();
});
    socket.on('disconnect', () =>{
        console.log('Use had left');
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
          }

    })
});

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));