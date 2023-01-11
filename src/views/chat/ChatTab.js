/*eslint-disable */
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Input,
  Label,
  Button,
  Form,
  InputGroup,
  InputGroupText,
} from "reactstrap";

// ** Icons Imports
import {
  CheckSquare as Check,
  Send,
  Link as LinkIcon,
  MoreVertical,
} from "react-feather";
import { Link } from "react-router-dom";
import { Fragment, useState, useEffect, useContext } from "react";
import { SocketContext, sendText } from "../../utility/Socket";

const ChatTab = ({ room }) => {
  const [userData, setUserData] = useState(null);

  const [text, setText] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const socketData = useContext(SocketContext);
  const handleSendText = (e) => {
    e.preventDefault();
    if (text !== "") {
      let name = "guest";
      if (userData) {
        name = userData.name;
      }
      sendText(room, name, text);
      setText("");
    }
  };

  const renderMessage = () => {
    return chatLog.map((text) => {
      return (
        <div className="mb-1 me-1" key={text.id}>
          <div className="d-flex justify-content-between">
            <span style={{ fontWeight: "bold" }}>{text.name}</span>
            <span>{text.time}</span>
          </div>
          <div>{text.content}</div>
        </div>
        // <div
        //   key={text.id}
        //   className="employee-task d-flex justify-content-between align-items-center"
        // >
        //   <div className="my-auto">
        //     <h6 className="mb-0">{text.name} : </h6>
        //     <p> {text.content}</p>
        //   </div>

        //   <div className="d-flex align-items-center">
        //     <small className="text-muted me-75">{text.time}</small>
        //   </div>
        // </div>
      );
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  //listener
  useEffect(() => {
    if (socketData.event === "broadcast-new-msg") {
      console.log(socketData.data);
      // console.log(chatLog);
      setChatLog([...chatLog, socketData.data]);
    }
  }, [socketData]);

  return (
    <Fragment>
      <Card style={{ height: "100%" }}>
        <CardHeader>
          <CardTitle tag="h4"></CardTitle>
          <MoreVertical size={18} className="cursor-pointer" />
        </CardHeader>
        <CardBody
          style={{
            display: "flex",
            flexFlow: "column",
            height: "100%",
          }}
        >
          <div className="mb-1" style={{ flex: "1 1 auto" }}>
            <div style={{ maxHeight: "calc(100vh - 245px)", overflow: "auto" }}>
              {renderMessage()}
            </div>
          </div>

          <Form
            className="chat-app-form"
            style={{ flex: "0 1 30px" }}
            onSubmit={(e) => handleSendText(e)}
          >
            <InputGroup>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message"
              />
              <Button className="send" color="primary">
                <Send size={14} className="d-lg-none" />
                <span className="d-none d-lg-block">Send</span>
              </Button>
            </InputGroup>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ChatTab;
