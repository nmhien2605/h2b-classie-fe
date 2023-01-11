import "@styles/react/apps/app-users.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Edit2, MoreVertical, Trash2, UserPlus } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const MyPresentations = () => {
  const [presentations, setPresentations] = useState([]);
  const [user, setUser] = useState();

  useEffect(async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_DOMAIN}/presentations`,
      {
        withCredentials: true,
      }
    );

    setPresentations(data.data);
  }, []);

  const handleSuccess = (message) => {
    return MySwal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  };

  // const onDelete = async (id) => {
  //   handleConfirmCancel();

  //   const { data } = await axios.delete(
  //     `${process.env.REACT_APP_API_DOMAIN}/presentations/${id}`,
  //     { withCredentials: true }
  //   );

  //   if (data.success) {
  //     const newPresentations = presentations.filter(
  //       (presentation) => presentation._id !== id
  //     );

  //     setPresentations([...newPresentations]);
  //     handleSuccess("Presentation deleted");
  //   }
  // };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser({ ...localUser });
  }, []);

  const onDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
    });

    if (result.value) {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_DOMAIN}/presentations/${id}`,
        { withCredentials: true }
      );

      if (data.success) {
        const newPresentations = presentations.filter(
          (presentation) => presentation._id !== id
        );

        setPresentations([...newPresentations]);
        handleSuccess("Presentation deleted");
      }
    } else if (result.dismiss === MySwal.DismissReason.cancel) {
      MySwal.fire({
        title: "Cancelled",
        text: "Your presentation is safe :)",
        icon: "error",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  };

  const addCollab = async (presentation) => {
    const { value, isDismissed } = await MySwal.fire({
      title: `Add collaborator for - ${presentation.name}`,
      input: "text",
      inputPlaceholder: "Enter their email address",
      padding: "30px",
      width: "500px",
      inputValue: "",
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
    });
    console.log({ value });

    const data = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/presentations/${presentation._id}/add-collab`,
      { email: value },
      {
        withCredentials: true,
      }
    );

    MySwal.fire({
      title: "Success",
      text: "A collaborator successfully added",
      icon: "success",
    });
    console.log({ data });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Here are the list of your presentations
          </CardTitle>
        </CardHeader>
        <PerfectScrollbar style={{ height: "calc(100vh - 250px)" }}>
          <CardBody>
            <Row className="gy-2">
              {presentations.length > 0 &&
                presentations.map((presentation) => {
                  return (
                    <Col key={presentation._id} sm={12}>
                      <div className="bg-light-secondary position-relative rounded p-2">
                        <Row className="btn-pinned align-items-center">
                          <Col>
                            <Link to={`/create-slide?id=${presentation._id}`}>
                              <Edit2 size={14} className="me-50" />
                              <span>Detail</span>
                            </Link>

                          </Col>
                          <Col>
                            {presentation?.owner?._id === user._id && (
                              <Button
                                className="d-flex align-items-center"
                                color="primary"
                                outline
                                style={{ whiteSpace: "nowrap" }}
                                onClick={() => addCollab(presentation)}
                              >
                                <UserPlus size={14} className="me-50" />
                                Add Collab
                              </Button>
                            )}
                          </Col>

                          <Col>
                            <Button
                              className="d-flex align-items-center"
                              color="danger"
                              outline
                              onClick={() => onDelete(presentation._id)}
                            >
                              <Trash2 size={14} className="me-50" />
                              <span>Delete</span>
                            </Button>
                          </Col>
                        </Row>
                        <div className="d-flex align-items-center flex-wrap">
                          <h4 className="mb-1 me-1">{presentation.name}</h4>
                          <Badge className="mb-1" color="light-primary">
                            {presentation.isPublic ? "Public" : "Groups only"}
                          </Badge>
                          <Badge className="mb-1 ms-2" color="info">
                            {presentation?.owner?._id === user._id
                              ? "Owner"
                              : ""}
                          </Badge>
                          <Badge className="mb-1 ms-2" color="info">
                            {presentation["co-owner"]?.includes(user._id)
                              ? "Co-Owner"
                              : ""}
                          </Badge>
                        </div>
                        <span>
                          Create on{" "}
                          {new Date(
                            presentation.createdAt
                          ).toLocaleDateString()}{" "}
                          {new Date(
                            presentation.createdAt
                          ).toLocaleTimeString()}
                        </span>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </CardBody>
        </PerfectScrollbar>
      </Card>
    </div>
  );
};
export default MyPresentations;
