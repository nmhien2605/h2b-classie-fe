// ** Reactstrap Imports
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { BarChart } from "react-feather";
import { SLIDE_TYPE } from "../../constants/slide";

const getIcon = (slideType) => {
  switch (slideType) {
    case SLIDE_TYPE.MUL_CHOICES:
      return <BarChart />;
    default:
      return "";
  }
};

const SlideList = ({ data, current, setCurrent, handleAddNewSlide }) => {
  const { slide: slides } = data;

  return (
    <Card>
      <CardHeader className="justify-content-center">
        <Button
          color="primary"
          className="text-nowrap"
          onClick={() => handleAddNewSlide()}
        >
          Add New Slide
        </Button>
      </CardHeader>
      <PerfectScrollbar style={{ maxHeight: "calc(100vh - 350px)" }}>
        <CardBody>
          {slides.map((slide, idx) => {
            return (
              <Card
                key={idx}
                className={`border ${
                  current === idx ? "border-info" : "border-dark"
                } mb-1`}
                onClick={() => {
                  console.log(idx);
                  setCurrent(idx);
                }}
              >
                <CardHeader>
                  {idx + 1} {getIcon(slide.detail.type)}
                </CardHeader>
                <CardBody>{slide.detail.title}</CardBody>
              </Card>
            );
          })}
        </CardBody>
      </PerfectScrollbar>
    </Card>
  );
};

export default SlideList;
