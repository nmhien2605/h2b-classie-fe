// ** Third Party Components
import axios from "axios";

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { buildData } from "../../utility/chartData/barChartData";
import SlideView from "../createSlide/SlideView";
import { Button, Col, Row } from "reactstrap";
import ChatBox from "../chat";
import {
  SocketContext,
  hostRoom,
  closeRoom,
  nextSlide,
} from "../../utility/Socket";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const Presentation = () => {
  const socketData = useContext(SocketContext);
  const [code, setCode] = useState("");
  const [slides, setSlides] = useState([
    { detail: { options: [], values: [] } },
  ]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  const searchParams = new URLSearchParams(document.location.search);
  const id = searchParams.get("id");

  const getData = (id) => {
    axios
      .put(
        `${API_DOMAIN}/presentations/enable/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          const data = { ...res.data.data };
          console.log(data);
          setCode(data.code);
          setSlides(data.slides);
          hostRoom(data.code);
        } else {
          console.log("Fail");
          // noti and link to another page
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!id || id === null) {
      history.push("/");
    }
    getData(id);
  }, []);

  useEffect(() => {
    if (socketData.event === "host-room") {
      if (socketData.data.success) {
        setCurrent(socketData.data.current);
        setLoading(false);
      }
    } else if (socketData.event === "next-slide") {
      setCurrent(socketData.data);
    } else if (socketData.event === "update-slide") {
      setSlides(socketData.data.slides);
    }
  }, [socketData]);

  const handleClosePresent = () => {
    axios
      .put(
        `${API_DOMAIN}/presentations/disable/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          closeRoom();
          history.push(`/create-slide?id=${id}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleNextSlide = () => {
    nextSlide(code);
  };

  //   <Row>
  //   <Col xs={9} >
  //     {/* content */}

  //     <SlideView
  //       title={`Go to ${process.env.REACT_APP_DOMAIN}/vote-slide and use the code ${code}`}
  //       chartData={buildData(
  //         slides[current].detail.options,
  //         slides[current].detail.values
  //       )}
  //       setCurrent={setCurrent}
  //     />

  //   </Col>
  //   <Col xs={3}>
  //     {/* Chat Bar */}
  //     <ChatBox room={code} isClient={false}></ChatBox>
  //   </Col>
  // </Row>

  // <Button className="mt-2" onClick={handleClosePresent}>Close</Button>
  // <>
  //   {current !== slides.length - 1 ? (
  //     <Button onClick={handleNextSlide}>Next Slide</Button>
  //   ) : null}
  // </>

  return (
    <div style={{ height: "100vh" }}>
      {/* <div className="container-lg d-flex align-items-center h-100">
      <div className="w-100"> */}
      {!isLoading ? (
        <div className="m-1" style={{ height: "95%" }}>
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              height: "100%",
            }}
          >
            <div style={{ flex: "1 1 auto" }}>
              <Row>
                <Col xs={9}>
                  {/* content */}
                  <SlideView
                    title={`Go to ${process.env.REACT_APP_DOMAIN}/vote-slide and use the code ${code}`}
                    chartData={buildData(
                      slides[current].detail.options,
                      slides[current].detail.values
                    )}
                    setCurrent={setCurrent}
                  />
                </Col>
                <Col xs={3}>
                  {/* Chat Bar */}
                  <ChatBox room={code} isClient={false}></ChatBox>
                </Col>
              </Row>
            </div>
            <div style={{ flex: "0 1 50px" }}>
              <Button className="mt-2" onClick={handleClosePresent}>
                Close
              </Button>
              {current !== slides.length - 1 ? (
                <Button onClick={handleNextSlide}>Next Slide</Button>
              ) : null}
            </div>
          </div>
          {/* if slide type = multi choice */}

          {/* add button next and pre slide */}
        </div>
      ) : null}
      {/* </div> */}
    </div>
  );
};
export default Presentation;
