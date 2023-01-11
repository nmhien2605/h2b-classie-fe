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
  likeQuestion,
  answerQuestion,
} from "../../utility/Socket";

const QuestionTabControl = ({ room }) => {
  const socketData = useContext(SocketContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (socketData.event === "update-question") {
      console.log(socketData.data);
      setQuestions(socketData.data);
    }
  }, [socketData]);

  useEffect(() => {
    getQuestions(room);
  }, []);

  const handleLikeQuestion = (id) => {
    likeQuestion(room, id);
  };

  const handleAnswerQuestion = (id) => {
    answerQuestion(room, id);
  };

  return (
    <Card style={{ height: '100%' }}>
      {/* <CardHeader>
        <CardTitle tag="h4"></CardTitle>
        <MoreVertical size={18} className="cursor-pointer" />
      </CardHeader> */}
      <CardBody>
        <div className="mb-1" style={{ overflow: "auto" }}>
          <div style={{ maxHeight: "calc(100vh - 170px)", overflow: "auto" }}>
            {questions.map((question) => (
              <div className="mb-1 me-1" key={question.id}>
                <div className="d-flex justify-content-between">
                  <span style={{ fontWeight: "bold" }}>
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
                  {question.isAnswer ? (
                    <Badge style={{ padding: 7, fontSize: 13 }} color="success">
                      Answered
                    </Badge>
                  ) : (
                    <Button
                      style={{
                        padding: 5,
                        paddingBlock: 6,
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                      color="warning"
                      onClick={() => handleAnswerQuestion(question.id)}
                    >
                      Make Answered
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default QuestionTabControl;
