// ** React Imports
import { useEffect, useState, useContext } from "react";

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
  Badge,
  Form,
  InputGroup,
  InputGroupText,
} from "reactstrap";

// ** Icons Imports
import {
  ThumbsUp,
  ThumbsDown,
  CheckSquare as Check,
  Send,
  Link as LinkIcon,
  MoreVertical,
} from "react-feather";
import { Link } from "react-router-dom";

import {
  SocketContext,
  getQuestions,
  sendQuestion,
  likeQuestion,
} from "../../utility/Socket";

const QuestionTab = ({ room }) => {
  const socketData = useContext(SocketContext);
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (socketData.event === "update-question") {
      console.log(socketData.data);
      setQuestions(socketData.data);
    }
  }, [socketData]);

  useEffect(() => {
    getQuestions(room);
  }, []);

  const handleSendQuestion = (e) => {
    e.preventDefault();
    sendQuestion(room, text);
    setText("");
  };

  const handleLikeQuestion = (id) => {
    likeQuestion(room, id);
  };

  return (
    <Card style={{ height: "100%" }}>
      {/* <CardHeader>
        <CardTitle tag='h4'></CardTitle>
        <MoreVertical size={18} className='cursor-pointer' />
      </CardHeader> */}
      <CardBody
        style={{
          display: "flex",
          flexFlow: "column",
          height: "100%",
        }}
      >
        <div className="mb-1" style={{ flex: "1 1 auto", overflow: "auto" }}>
          {questions.map((question) => (
            <div className="mb-1" key={question.id}>
              <div>
                <span className="me-1" style={{ fontWeight: "bold" }}>
                  {question.username}
                </span>
                <span>{question.time}</span>
              </div>
              <div>{question.question}</div>
              <div>
                <Button
                  className="me-1"
                  style={{ padding: 5, fontSize: 14 }}
                  color="info"
                  onClick={() => handleLikeQuestion(question.id)}
                >
                  <span style={{ verticalAlign: "bottom", marginRight: 5 }}>
                    {question.like}
                  </span>
                  <ThumbsUp size={16} style={{ verticalAlign: "top" }} />
                </Button>
                {question.isAnswer && (
                  <Badge style={{ padding: 7, fontSize: 13 }} color="success">
                    Answered
                  </Badge>
                  // <Button
                  //   style={{
                  //     padding: 5,
                  //     paddingTop: 6,
                  //     fontSize: 13,
                  //     fontWeight: "bold",
                  //   }}
                  //   color="success"
                  //   disabled
                  // >
                  //   Answered
                  // </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <Form className="chat-app-form" style={{ flex: "0 1 40px" }} onSubmit={(e) => handleSendQuestion(e)}>
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
  );
};

export default QuestionTab;
