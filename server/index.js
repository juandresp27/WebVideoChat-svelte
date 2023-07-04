import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
//import { configureServer } from '../plugin/WebSocketServer' 
import { handler } from '../build/handler.js'

const rooms = {}
const port = process.env.PORT || 3000
const app = express()
const server = createServer(app)

const io = new Server(server)

const removeUsers = (socket, roomID, socketID) =>{
    socket.leave(roomID)
      rooms[roomID] = rooms[roomID].filter(user => user.Socket !== socketID)
      io.sockets.in(roomID).emit('users:response', rooms[roomID])
      if(rooms[roomID].length === 0){
        delete rooms[roomID]
      }
  }

io.on('connection', (socket) => {

    socket.on('room:create', ({tokenRoom, meUser}) => {
        socket.join(tokenRoom)
        rooms[tokenRoom] = [{User: meUser, Socket: socket.id}]
    })

    socket.on('room:join', ({roomT, meUser}) => {
        if (roomT in rooms) {
        socket.join(roomT)
        socket.emit('room:valid', roomT)
        rooms[roomT] = [...rooms[roomT], {User: meUser, Socket: socket.id}]
        } else {
        socket.emit('room:novalid', roomT)
        }
    })

    socket.on('page:ready', (data) => {
        if(rooms[data]){
        const socketsInRoom = rooms[data].map(sck => sck.Socket)
        io.in(data).emit('user:connected', socket.id, rooms[data].length, socketsInRoom)
        } else {
        socket.emit('room:incorrect')
        }
    })

    socket.on('signal', (toId, message) => {
        io.to(toId).emit('signal', socket.id, message)
    })

    socket.on("message", function(data){
        io.sockets.emit("broadcast-message", socket.id, data);
    })

    socket.on('users:request', data => {
        if(rooms[data]){
        const socketsInRoom1 = rooms[data].map(sck => sck.Socket)
        console.log(socketsInRoom1)
        if(!socketsInRoom1.includes(socket.id)){
            socket.emit('join:incorrect')
        } else {
            io.sockets.in(data).emit('users:response', rooms[data])
        }  
        } else {
        socket.emit('room:incorrect')
        }
    })

    socket.on('room:leave', data => {
        io.to(data).emit('user:left', socket.id)
        removeUsers(socket, data, socket.id)
    })

    socket.on('disconnecting', () => {
        const rooms = socket.rooms
        if(rooms.size === 2){
        const [socketID, roomID] = rooms
        socket.in(roomID).emit('user:left', socketID)
        removeUsers(socket, roomID, socketID)      
        }
    })

})

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler)

server.listen(port)