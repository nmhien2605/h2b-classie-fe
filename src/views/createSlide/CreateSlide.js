// ** Third Party Components
import Select from "react-select";

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { selectThemeColors } from "@utils";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Label,
  Row,
} from "reactstrap";
import { SLIDE_TYPE } from "../../constants/slide";
import { buildData } from "../../utility/chartData/barChartData";
import SlideList from "./SlideList";
import SlideOptions from "./SlideOptions";
import SlideView from "./SlideView";
import { toast } from "react-toastify";
import { SuccessToast } from "../../components/toast";
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

  const handleAddNewSlide = (slideType = SLIDE_TYPE.MUL_CHOICES) => {
    const newSlide = {
      detail: {
        title: "Your question",
        type: slideType,
        options: ["x", "y"],
        values: [1, 1],
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
    });
  };

  const handleSaveSlide = async () => {
    console.log(data._id);

    await axios.put(
      `${process.env.REACT_APP_API_DOMAIN}/presentations/${data._id}`,
      { ...data },
      { withCredentials: true }
    );

    notifySuccess();
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
                Preview
                <Button onClick={handleSaveSlide} color="success">
                  Save Slide
                </Button>
              </CardHeader>
              <CardBody>
                <SlideView
                  title={currentSlide.detail.title}
                  chartData={buildData(
                    currentSlide.detail.options,
                    currentSlide.detail.values
                  )}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl={3} md={6}>
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
                title={currentSlide.detail.title}
                setTitle={updateSlideTitle}
                options={currentSlide.detail.options}
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
