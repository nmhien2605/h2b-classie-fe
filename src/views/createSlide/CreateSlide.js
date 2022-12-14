// ** Third Party Components
import Select from "react-select";

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { selectThemeColors } from "@utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
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
// import postJson from "../../utility/api/postJson";

const sldieTypeOptions = [
  { value: SLIDE_TYPE.MUL_CHOICES, label: "Multiple choices" },
];

const emptyData = {
  slides: [
    {
      detail: {
        title: "Cau hoi",
        type: SLIDE_TYPE.MUL_CHOICES,
        options: [],
        values: [],
      },
    },
  ],
  code: "code",
};

const CreateSlide = () => {
  const [isCreated, setIsCreated] = useState(false);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({ ...emptyData });
  const [currentSlide, setCurrentSlide] = useState(data.slides[current]);

  const searchParams = new URLSearchParams(document.location.search);
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
    const id = searchParams.get("id");
    if (id) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/presentations/${id}`,
        { withCredentials: true }
      );
      setIsCreated(true);
      setData({ ...data.data });
      setCurrentSlide({ ...data.data.slides[0] });
    }
  }, []);

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

  const handleCreateSlide = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/presentations`,
      { name: "Your new presentation" },
      { withCredentials: true }
    );
    // console.log({ res });
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
    const id = searchParams.get("id");
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
                <SlideView
                  title={currentSlide?.detail?.title}
                  chartData={buildData(
                    currentSlide?.detail?.options,
                    currentSlide?.detail?.values
                  )}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl={3} md={6}>
            <Card>
              <Button onClick={handlePresent} color="success">
                <Play size={14} />
                Present
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
                    defaultValue={sldieTypeOptions[0]}
                    options={sldieTypeOptions}
                    isClearable={false}
                  />
                </div>
              </CardBody>
              <SlideOptions
                title={currentSlide?.detail?.title}
                setTitle={updateSlideTitle}
                options={currentSlide?.detail?.options}
                setOptions={updateSlideOptions}
              />
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default CreateSlide;
