// ** Third Party Components
import Select from "react-select";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { selectThemeColors } from "@utils";
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
import SlideOptions from "./SlideOptions";
import SlideView from "./SlideView";
import { BarChart } from "react-feather";
import SlideList from "./SlideList";

const sldieTypeOptions = [
  { value: SLIDE_TYPE.MUL_CHOICES, label: "Multiple choices" },
];

const fakeData = {
  slide: [
    {
      detail: {
        title: "Cau hoi",
        type: SLIDE_TYPE.MUL_CHOICES,
        options: ["option 1", "option 2"],
        values: [5, 6],
      },
    },
    {
      detail: {
        title: "Cau hoi",
        type: SLIDE_TYPE.MUL_CHOICES,
        options: ["option 1", "option 2"],
        values: [5, 7],
      },
    },
  ],
  code: "code",
};

const CreateSlide = () => {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({ ...fakeData });
  const [currentSlide, setCurrentSlide] = useState(data.slide[current]);

  useEffect(() => {
    const slideData = data.slide[current];
    setCurrentSlide({ ...slideData });
  }, [current]);

  useEffect(() => {
    console.log({ currentSlide });

    const newData = { ...data };
    newData.slide = [...newData.slide];
    newData.slide[current] = { ...currentSlide };
    console.log({ newBigData: newData });
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
    newData.slide = [...newData.slide, newSlide];
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

  return (
    <>
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
            <CardHeader>Preview</CardHeader>
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
    </>
  );
};
export default CreateSlide;
