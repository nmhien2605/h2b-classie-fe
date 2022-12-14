// ** Styles
import "@styles/base/pages/page-misc.scss";
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

const SlideOptions = ({ title, setTitle, options, setOptions }) => {
  //   const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);

  const handleInputOption = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions([...newOptions]);
  };

  const handleAddOption = () => {
    const newOptions = [...options, "new option"];
    setOptions([...newOptions]);
  };

  return (
    <Card style={{ padding: 0, marginBottom: 0 }}>
      <CardHeader>
        <CardTitle tag="h4">Slide content</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="questionField">
                Your question:
              </Label>
              <Input
                type="text"
                name="question"
                id="questionField"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Input your question here"
              />
            </Col>

            <Label className="form-label" for="questionField">
              Options:
            </Label>
            {options.map((option, idx) => {
              return (
                <Col key={idx} sm="12" className="mb-1">
                  <Input
                    type="text"
                    placeholder={`option ${idx + 1}`}
                    value={option}
                    onChange={(event) => {
                      handleInputOption(event.target.value, idx);
                    }}
                  />
                </Col>
              );
            })}

            <Button
              className="me-1"
              color="primary"
              type="button"
              onClick={handleAddOption}
            >
              Add option
            </Button>
            {/* <Button outline color="secondary" type="reset" className="mt-1">
              Reset
            </Button> */}
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default SlideOptions;
