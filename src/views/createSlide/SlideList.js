// ** Reactstrap Imports
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { BarChart } from "react-feather";
import { BsCardHeading, BsTextParagraph } from "react-icons/bs";
import { SLIDE_TYPE } from "../../constants/slide";

const getIcon = (slideType) => {
  switch (slideType) {
    case SLIDE_TYPE.MUL_CHOICES:
      return <BarChart />;
    case SLIDE_TYPE.HEADING:
      return <BsCardHeading size={22} />;
    case SLIDE_TYPE.PARAGRAPH:
      return <BsTextParagraph size={22} />;
    default:
      return <BarChart />;
  }
};

const SlideList = ({ data, current, setCurrent, handleAddNewSlide }) => {
  const { slides } = data;

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
                <CardBody>
                  <p className="text-truncate m-0">{slide.detail.title}</p>
                </CardBody>
              </Card>
            );
          })}
        </CardBody>
      </PerfectScrollbar>
    </Card>
  );
};

export default SlideList;
