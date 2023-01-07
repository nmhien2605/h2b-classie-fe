// ** Styles
import { useSkin } from "@hooks/useSkin";
import "@styles/base/pages/page-misc.scss";
import { Card, CardBody, CardTitle } from "reactstrap";
import { SLIDE_TYPE } from "../../constants/slide";

const ParagraphView = ({ type, title, text }) => {
  const { skin } = useSkin();
  const labelColor = skin === "dark" ? "#b4b7bd" : "#6e6b7b";

  console.log({ text });

  return (
    <Card
      style={{ border: "1px solid black", marginBottom: 0, height: "70vh" }}
      className="text-center"
    >
      <CardBody
        style={{ width: "100%", margin: "auto" }}
        className="d-flex flex-column justify-content-center"
      >
        {type === SLIDE_TYPE.HEADING ? (
          <>
            <h1 className="display-3">{title}</h1>
            <p style={{ whiteSpace: "pre-wrap" }} className="lead">
              {text}
            </p>
          </>
        ) : (
          <>
            <h1 className="display-5">{title}</h1>
            <p style={{ whiteSpace: "pre-wrap" }} className="display-6 lead">
              {text}
            </p>
          </>
        )}
      </CardBody>
    </Card>
  );
};
export default ParagraphView;
