// ** Styles
import "@styles/base/pages/page-misc.scss";
import { Card, CardBody, CardHeader, CardTitle, Button } from "reactstrap";

const SlideVote = ({ title, options, handleVote }) => {
  const votes = options ? options.map((option, key) => {
    return (
      <div>
        <Button
          className="btn m-1"
          style={{ width: "50%" }}
          color="primary"
          key={key}
          onClick={() => {
            handleVote(key);
          }}
        >
          {option}
        </Button>
      </div>
    );
  }) : null;

  return (
    <Card style={{ border: "1px solid black", marginBottom: 0, height: "100%" }}>
      <CardHeader className="justify-content-center">
        <CardTitle tag={"h2"}>{title}</CardTitle>
      </CardHeader>
      <CardBody className="mt-2" style={{ textAlign: "center" }}>
        {votes}
      </CardBody>
    </Card>
  );
};
export default SlideVote;
