import { useState, createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const socket = io(process.env.REACT_APP_API_DOMAIN);

export const useSocket = () => {
  const [socketData, setSocketData] = useState({ event: "", data: {} });

  socket.on("connect", () => {
    console.log("connected to server");
  });

  socket.on("res-host-room", (data) => {
    setSocketData({ event: "host-room", data });
  });

  socket.on("res-join-room", (data) => {
    setSocketData({ event: "join-room", data });
  });

  socket.on('res-vote-room', (data) => {
    setSocketData({ event: "update-slide", data });
  })

  socket.on('res-next-slide', (data) => {
    setSocketData({ event: "next-slide", data });
  })

  socket.on("start-present", (data) => {
    setSocketData({ event: "start-present", data });
  })

  socket.on("end-present", (data) => {
    setSocketData({ event: "end-present", data });
  })

  socket.on("broadcast-new-msg", (data) => {
    setSocketData({ event: "broadcast-new-msg", data });
  })
  return socketData;
};
// socket client -> server
// socket for presentation 
export const hostRoom = (room) => {
  socket.emit("req-host-room", room);
};

export const closeRoom = () => {
  socket.emit("req-close-room", "");
};

export const joinRoom = (room) => {
  socket.emit("req-join-room", room);
};

export const voteRoom = (room, data) => {
  socket.emit("req-vote-room", room, data);
};

export const nextSlide = (room) => {
  socket.emit("req-next-slide", room);
};

// socket for chat log

export const sendText = (room, name, text) => {
  if (name === 'guest') {
    name = `Guest ${socket.id}`
  }
  socket.emit("req-send-text", room, name, text)
}
