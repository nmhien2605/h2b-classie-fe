// ** Third Party Components
// import axios from "axios";

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { buildData } from "../../utility/chartData/barChartData";
import SlideVote from "../createSlide/SlideVote";
import SlideView from "../createSlide/SlideView";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";

import { SocketContext, joinRoom, voteRoom } from "../../utility/Socket";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ChatBox from "../chat";
const MySwal = withReactContent(Swal);

const PresentationView = () => {
  const query = new URLSearchParams(document.location.search);
  const socketData = useContext(SocketContext);
  const [slides, setSlides] = useState([
    { detail: { options: [], values: [] } },
  ]);
  const [current, setCurrent] = useState(0);
  const [code, setCode] = useState(query.get("code") ? query.get("code") : "");
  const [isJoined, setJoined] = useState(false);
  const [isVoted, setVoted] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (socketData.event === "join-room") {
      if (socketData.data.success) {
        setJoined(true);
        console.log(socketData.data.data.slides);
        setSlides(socketData.data.data.slides);
        setCurrent(socketData.data.current);
      } else {
        console.log(socketData.data);
        MySwal.fire({
          title: "Join failed!",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
        // noti room not online or incorret code
      }
    } else if (socketData.event === "next-slide") {
      setCurrent(socketData.data);
      setVoted(false);
    } else if (socketData.event === "update-slide") {
      setSlides(socketData.data.slides);
    } else if (socketData.event === "end-present") {
      history.push("/vote-slide")
    }
  }, [socketData]);

  useEffect(() => {
    console.log(code);
    if (query.get("code")) {
      joinRoom(code);
    }
  }, []);

  const handleJoin = () => {
    joinRoom(code);
  };

  const handleVote = (vote) => {
    voteRoom(code, { slide: current, vote });
    setVoted(true);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="m-1" style={{ height: "95%" }}>
        {!isJoined ? (
          <Card style={{ marginBottom: 0, margin: "20px" }}>
            <CardHeader className="justify-content-center">
              <CardTitle tag={"h2"}>Join with Code</CardTitle>
            </CardHeader>
            <CardBody>
              <Input value={code} onChange={(e) => setCode(e.target.value)} />
              <Button onClick={handleJoin} className="mt-2" color="primary">
                Join
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              height: "100%",
            }}
          >
            <div style={{ flex: "1 1 auto" }}>
              <Row style={{ height: "100%" }}>
                <Col xs={9}>
                  {/* content */}
                  <div style={{ height: "100%" }}>
                    {!isVoted ? (
                      <>
                        {/* if slide type = multi choice */}
                        <SlideVote
                          style={{ height: "100%" }}
                          title={slides[current].detail.title}
                          options={slides[current].detail.options}
                          handleVote={handleVote}
                        />
                      </>
                    ) : (
                      <>
                        {/* if slide type = multi choice */}
                        <SlideView
                          style={{ height: "100%" }}
                          title={`Go to www.h2b.com and use the code ${code}`}
                          chartData={buildData(
                            slides[current].detail.options,
                            slides[current].detail.values
                          )}
                        />
                      </>
                    )}
                  </div>
                </Col>
                <Col xs={3}>
                  {/* Chat Bar */}
                  <ChatBox room={code} isClient={true}></ChatBox>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationView;
