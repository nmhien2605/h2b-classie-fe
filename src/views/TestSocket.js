import React, { useState } from "react"
import { socket, joinRoom, voteRoom } from "../utility/Socket"

function Socket() {
  const [room, setRoom] = useState("")
  const [msg, setMsg] = useState("")

  socket.on('res-send-to-room', (data) => {
    console.log(data)
  })

  const join = () => {
    joinRoom(room)
  }

  const send = () => {
    voteRoom(room, { data: msg })
  }

  return (
    <div>
      <div>
        <input value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={join}>join</button>
      </div>
      <div>
        <input value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button onClick={send}>send</button>
      </div>
    </div>
  )
}

export default Socket