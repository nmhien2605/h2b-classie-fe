/*eslint-disable */
// ** Third Party Components
import Select from "react-select";

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { selectThemeColors } from "@utils";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Play } from "react-feather";
import { SuccessToast } from "../../components/toast";
import { SLIDE_TYPE } from "../../constants/slide";
import { buildData } from "../../utility/chartData/barChartData";
import SlideList from "./SlideList";
import SlideOptions from "./SlideOptions";
import SlideView from "./SlideView";
import ParagraphView from "./ParagraphView";
// import postJson from "../../utility/api/postJson";

import { SocketContext } from "../../utility/Socket";

const sldieTypeOptions = [
  { value: SLIDE_TYPE.MUL_CHOICES, label: "Multiple choices" },
  { value: SLIDE_TYPE.PARAGRAPH, label: "Paragraph" },
  { value: SLIDE_TYPE.HEADING, label: "Heading" },
];

const emptyData = {
  slides: [
    {
      detail: {
        title: "Cau hoi",
        text: "",
        type: SLIDE_TYPE.MUL_CHOICES,
        options: [],
        values: [],
      },
    },
  ],
  code: "code",
};

const CreateSlide = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const socketData = useContext(SocketContext); 
  const [id, setId] = useState(searchParams.get("id"));
  const [isCreated, setIsCreated] = useState(false);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({ ...emptyData });
  const [currentSlide, setCurrentSlide] = useState(data.slides[current]);
  const [code, setCode] = useState("");
  const [isPresent, setPresent] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const slideData = data.slides[current];
    setCurrentSlide({ ...slideData });
  }, [current]);

  useEffect(() => {
    const newData = { ...data };
    newData.slides = [...newData.slides];
    newData.slides[current] = { ...currentSlide };
    setData({ ...newData });
  }, [currentSlide]);

  useEffect(async () => {
    if (id) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/presentations/${id}`,
        { withCredentials: true }
      );
      setIsCreated(true);
      setData({ ...data.data });
      setCode(data.data.code);
      setPresent(data.data.isPresent);
      setCurrentSlide({ ...data.data.slides[0] });
    }
  }, []);

  useEffect(() => {
    if (socketData.event === "start-present") {
      if (socketData.data.code === code) {
        setPresent(true);
      }
    }
    if (socketData.event === "end-present") {
      if (socketData.data.code === code) {
        setPresent(false);
      }
    }
  }, [socketData]);

  const handleAddNewSlide = (slideType = SLIDE_TYPE.MUL_CHOICES) => {
    const newSlide = {
      detail: {
        title: "Your question",
        type: slideType,
        options: ["x", "y"],
        values: [0, 0],
      },
    };

    const newData = { ...data };
    newData.slides = [...newData.slides, newSlide];
    setData({ ...newData });
  };

  const updateSlideOptions = (value) => {
    const newData = { ...currentSlide };
    newData.detail.options = value;
    setCurrentSlide({ ...newData });
  };

  // const updateSlideValues = (value) => {
  //   const newData = { ...currentSlide };
  //   newData.detail.values = value;
  //   setCurrentSlide({ ...newData });
  // };

  const updateSlideTitle = (value) => {
    const newData = { ...currentSlide };
    newData.detail.title = value;
    setCurrentSlide({ ...newData });
  };

  const updateSlideText = (value) => {
    const newData = { ...currentSlide };
    newData.detail.text = value;
    setCurrentSlide({ ...newData });
  };

  const updateSlideType = (value) => {
    const newData = { ...currentSlide };
    newData.detail.type = value;
    setCurrentSlide({ ...newData });
  };

  const handleCreateSlide = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/presentations`,
      { name: "Your new presentation" },
      { withCredentials: true }
    );
    // console.log({ res });
    setId(data.data._id);
    setIsCreated(true);
    setData({ ...data.data });
    setCurrentSlide({ ...data.data.slides[0] });
  };

  const notifySuccess = () => {
    return toast.success(<SuccessToast />, {
      icon: false,
      hideProgressBar: true,
      autoClose: 5000,
    });
  };

  const handleSaveSlide = async () => {
    await axios.put(
      `${process.env.REACT_APP_API_DOMAIN}/presentations/${data._id}`,
      { ...data },
      { withCredentials: true }
    );

    notifySuccess();
  };

  const handleChangePresentationName = (event) => {
    setData({ ...data, name: event.target.value });
  };

  const handlePresent = () => {
    history.push(`/view-slide?id=${id}`);
  };

  return (
    <>
      {!isCreated ? (
        <Row className="justify-content-center">
          <Button
            className="me-1 w-25"
            color="primary"
            type="button"
            onClick={handleCreateSlide}
          >
            Let's get started
          </Button>
        </Row>
      ) : (
        <Row>
          <Col xl={2} md={2}>
            <SlideList
              data={data}
              current={current}
              setCurrent={setCurrent}
              handleAddNewSlide={handleAddNewSlide}
            />
          </Col>
          <Col xl={7} md={6}>
            <Card>
              <CardHeader>
                <div className="w-75">
                  <Input
                    type="text"
                    placeholder="Enter presentation name"
                    value={data.name}
                    onChange={handleChangePresentationName}
                  />
                </div>
                <Row>
                  <Button onClick={handleSaveSlide} color="success">
                    Save Presentation
                  </Button>
                </Row>
              </CardHeader>
              <CardBody>
                {currentSlide?.detail.type === SLIDE_TYPE.MUL_CHOICES ? (
                  <SlideView
                    title={currentSlide?.detail?.title}
                    chartData={buildData(
                      currentSlide?.detail?.options,
                      currentSlide?.detail?.values
                    )}
                  />
                ) : (
                  <ParagraphView
                    type={currentSlide?.detail.type}
                    title={currentSlide?.detail?.title}
                    text={currentSlide?.detail?.text}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xl={3} md={6}>
            <Card>
              <Button onClick={handlePresent} color="success">
                <Play size={14} />
                {isPresent ? "Presenting" : "Present"}
              </Button>
            </Card>
            <Card>
              <CardBody>
                <div>
                  <Label className="form-label">Slide type</Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    value={{
                      value: currentSlide.detail.type,
                      label: sldieTypeOptions.find(
                        (item) => item.value === currentSlide.detail.type
                      )?.label,
                    }}
                    options={sldieTypeOptions}
                    isClearable={false}
                    onChange={(event) => {
                      updateSlideType(event.value);
                    }}
                  />
                </div>
              </CardBody>

              {currentSlide?.detail.type !== SLIDE_TYPE.MUL_CHOICES ? (
                <Card style={{ padding: 0, marginBottom: 0 }}>
                  <CardHeader>
                    <CardTitle tag="h4">Slide content</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col sm="12" className="mb-1">
                          <Label className="form-label" for="headingField">
                            Your Heading:
                          </Label>
                          <Input
                            type="text"
                            id="headingField"
                            value={currentSlide?.detail?.title}
                            onChange={(event) => {
                              return updateSlideTitle(event.target.value);
                            }}
                            placeholder="Input your heading here"
                          />
                        </Col>
                        <Col sm="12" className="mb-1">
                          <Label className="form-label" for="subHeadingField">
                            {currentSlide?.detail.type === SLIDE_TYPE.HEADING
                              ? "Your sub-heading:"
                              : "Your paragraph"}
                          </Label>
                          <Input
                            type="textarea"
                            id="subHeadingField"
                            value={currentSlide?.detail?.text}
                            onChange={(event) => {
                              console.log({ value: event.target.value });
                              return updateSlideText(event.target.value);
                            }}
                            placeholder={
                              currentSlide?.detail.type === SLIDE_TYPE.HEADING
                                ? "Input your sub-heading"
                                : "Input your paragraph"
                            }
                          />
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              ) : (
                <SlideOptions
                  title={currentSlide?.detail?.title}
                  setTitle={updateSlideTitle}
                  options={currentSlide?.detail?.options}
                  setOptions={updateSlideOptions}
                />
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default CreateSlide;
