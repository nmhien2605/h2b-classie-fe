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

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
    }
  }, [socketData]);

  useEffect(() => {
    if (query.get("code")) {
      joinRoom(code);
    }
  }, [])

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
        <Card style={{ marginBottom: 0, margin: "40px" }}>
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
                extraTitle={`Go to www.h2b.com and use the code ${code}`}
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
