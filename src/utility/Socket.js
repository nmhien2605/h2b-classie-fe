import { io } from 'socket.io-client'

export const socket = io('http://localhost:5000')

socket.on('connect', () => {
  console.log("connected to server")
})

socket.on('res-join-room', (msg) => {
  console.log(msg)
})

// socket.on('res-send-to-room', (data) => {
//   console.log(data)
// })

export const joinRoom = (room) => {
  socket.emit('req-join-room', room)
}

export const sendToRoom = (room, data) => {
  socket.emit('req-send-to-room', room, data)
}