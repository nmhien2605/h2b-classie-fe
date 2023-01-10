import React, { Fragment, useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";
import Avatar from "@components/avatar";
import { Play, Pause } from "react-feather";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const socket = io(process.env.REACT_APP_API_DOMAIN);

const user = JSON.parse(localStorage.getItem("user"));

const SuccessToast = ({ group, presentation }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Play size={12} />} />
        <h6 className="toast-title">{group} group</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {presentation} is presenting
      </span>
    </div>
  </Fragment>
);

const WarningToast = ({ group, presentation }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="warning" icon={<Pause size={12} />} />
        <h6 className="toast-title">{group} group</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {presentation} stop present
      </span>
    </div>
  </Fragment>
);

export const useSocket = () => {
  const [socketData, setSocketData] = useState({ event: "", data: {} });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("res-host-room", (data) => {
      setSocketData({ event: "host-room", data });
    });

    socket.on("res-join-room", (data) => {
      setSocketData({ event: "join-room", data });
    });

    socket.on("res-vote-room", (data) => {
      setSocketData({ event: "update-slide", data });
    });

    socket.on("res-next-slide", (data) => {
      setSocketData({ event: "next-slide", data });
    });

    socket.on("start-present", (data) => {
      const checkNoti = data.groups.find((group) => {
        const checkMember = group.members.find((member) => {
          console.log(member, member.detail, user, user._id);
          return member.detail === user._id;
        })
        if (checkMember) return true;
        return false;
      })
      if (checkNoti) {
        toast.success(<SuccessToast group={checkNoti.name} presentation={data.name} />, {
          icon: false,
          hideProgressBar: true,
          autoClose: 5000,
        });
      }
      setSocketData({ event: "start-present", data });
    });

    socket.on("end-present", (data) => {
      const checkNoti = data.groups.find((group) => {
        const checkMember = group.members.find((member) => {
          console.log(member, member.detail, user, user._id);
          return member.detail === user._id;
        })
        if (checkMember) return true;
        return false;
      })
      if (checkNoti) {
        toast.warn(<WarningToast group={checkNoti.name} presentation={data.name} />, {
          icon: false,
          hideProgressBar: true,
          autoClose: 5000,
        });
      }
      setSocketData({ event: "end-present", data });
    });

    socket.on("update-question", (data) => {
      setSocketData({ event: "update-question", data });
    })
  }, [socket]);

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
  socket.emit("req-join-room", room, user);
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

export const getQuestions = (room) => {
  socket.emit("req-get-question", room);
}

export const sendQuestion = (room, question) => {
  if (user) {
    socket.emit("req-send-question", room, { id: user._id.toString(), name: user.name }, question);
  } else {
    socket.emit("req-send-question", room, { id: socket.id, name: socket.id.toString().slice(0, 6) }, question);
  }
}

export const likeQuestion = (room, questionId) => {
  if (user) {
    socket.emit("req-like-question", room, { id: user._id.toString(), name: user.name }, questionId);
  } else {
    socket.emit("req-like-question", room, { id: socket.id, name: socket.id.toString().slice(0, 6) }, questionId);
  }
}

export const answerQuestion = (room, questionId) => {
  if (user) {
    socket.emit("req-answer-question", room, { id: user._id.toString(), name: user.name }, questionId);
  } else {
    socket.emit("req-answer-question", room, { id: socket.id, name: socket.id.toString().slice(0, 6) }, questionId);
  }
}
