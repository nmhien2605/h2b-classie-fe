// ** Third Party Components
// import axios from "axios";

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
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
} from "reactstrap";

import { SocketContext, joinRoom, voteRoom } from "../../utility/Socket";

const API_DOMAIN = "http://localhost:5000";

const PresentationView = () => {
  const socketData = useContext(SocketContext);
  const [slides, setSlides] = useState([
    { detail: { options: [], values: [] } },
  ]);
  const [current, setCurrent] = useState(0);
  const [code, setCode] = useState("");
  const [isJoined, setJoined] = useState(false);
  const [isVoted, setVoted] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    if (socketData.event === "join-room") {
      if (socketData.data.success) {
        setJoined(true);
        console.log(socketData.data.data.slides);
        setSlides(socketData.data.data.slides);
        setCurrent(socketData.data.current);
      } else {
        console.log(socketData.data);
        // noti room not online or incorret code
      }
    } else if (socketData.event === "next-slide") {
      setCurrent(socketData.data);
      setVoted(false);
    } else if (socketData.event === "update-slide") {
      setSlides(socketData.data.slides);
    }
  }, [socketData]);

  const handleJoin = () => {
    joinRoom(code);
  };

  const handleVote = (vote) => {
    voteRoom(code, { slide: current, vote });
    setVoted(true);
  };

  return (
    <>
      {!isJoined ? (
        <Card style={{ border: "1px solid black", marginBottom: 0 }}>
          <CardHeader className="justify-content-center">
            <CardTitle tag={"h2"}>Join with Code</CardTitle>
          </CardHeader>
          <CardBody>
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
            <Button onClick={handleJoin}>Join</Button>
          </CardBody>
        </Card>
      ) : (
        <>
          {!isVoted ? (
            <>
              {/* if slide type = multi choice */}
              <SlideVote
                title={slides[current].detail.title}
                options={slides[current].detail.options}
                handleVote={handleVote}
              />
            </>
          ) : (
            <>
              {/* if slide type = multi choice */}
              <SlideView
                title={`Go to www.h2b.com and use the code ${code}`}
                chartData={buildData(
                  slides[current].detail.options,
                  slides[current].detail.values
                )}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default PresentationView;
