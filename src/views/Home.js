import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Info } from "react-feather";
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

const dateTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString() + date.toLocaleTimeString();
};

const Home = () => {
  const [groups, setGroups] = useState([]);

  const loadGroups = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_DOMAIN}/groups`,
      { withCredentials: true }
    );

    if (data.success) {
      setGroups(data.data);
    }
  };

  const createGroup = async () => {
    const { value: inputValue } = await MySwal.fire({
      title: "What will your group called?",
      input: "text",
      padding: "30px",
      width: "500px",
      inputLabel: "Your group name",
      inputValue: "",
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/groups`,
      { name: inputValue },
      { withCredentials: true }
    );

    if (data.success) {
      loadGroups();
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="m-0">My Groups</CardTitle>
          <Button color="primary" onClick={createGroup}>
            Add group
          </Button>
        </CardHeader>
      </Card>
      <Row className="match-height mb-2">
        {groups.map((group) => (
          <Col key={group?._id} md="4" xs="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{group?.name}</CardTitle>
                <CardText>Member: {group?.members?.length}</CardText>
              </CardHeader>
              <CardBody className="text-end">
                <CardText>Create at: {dateTime(group?.createdAt)}</CardText>
              </CardBody>
              <CardFooter>
                <Button outline color="primary">
                  <Link to={`/group?id=${group._id}`}>
                    <Info size={14} />
                    <span className="align-middle ms-25">Detail</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
