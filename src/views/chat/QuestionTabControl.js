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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// ** Icons Imports
import {
  ThumbsUp,
  ThumbsDown,
  CheckSquare as Check,
  Send,
  Link as LinkIcon,
  Filter,
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

  const handleSortAnswered = () => {
    const data = questions.sort((a, b) => {
      if (a.isAnswer) return -1;
      if (b.isAnswer) return 1;
      return 0;
    });
    setQuestions([...data]);
  };

  const handleSortVote = () => {
    const data = questions.sort((a, b) => {
      if (a.like > b.like) return -1;
      if (a.like < b.like) return 1;
      return 0;
    });
    setQuestions([...data]);
  };

  const handleSortTime = () => {
    const data = questions.sort((a, b) => {
      if (a.time < b.time) return -1;
      if (a.time > b.time) return 1;
      return 0;
    });
    setQuestions([...data]);
  };

  return (
    <Card style={{ height: '100%' }}>
      <CardHeader>
        {/* <CardTitle tag="h4"></CardTitle> */}
        <UncontrolledDropdown className="btn-pinned me-1">
          <DropdownToggle tag="span" className="cursor-pointer">
            <Filter size={18} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              className="d-flex align-items-center w-100"
              onClick={handleSortAnswered}
            >
              <span>Sort by answered</span>
            </DropdownItem>
            <DropdownItem
              className="d-flex align-items-center w-100"
              onClick={handleSortVote}
            >
              <span>Sort by vote</span>
            </DropdownItem>
            <DropdownItem
              className="d-flex align-items-center w-100"
              onClick={handleSortTime}
            >
              <span>Sort by time</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody
        style={{
          display: "flex",
          flexFlow: "column",
          height: "100%",
        }}
      >
        <div className="mt-1 mb-1" style={{ flex: "1 1 auto" }}>
          <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
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
