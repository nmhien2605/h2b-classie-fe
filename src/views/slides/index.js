import "@styles/react/apps/app-users.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Edit2, MoreVertical, Trash2 } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import {
  Badge,
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
                        <UncontrolledDropdown className="btn-pinned">
                          <DropdownToggle tag="span">
                            <MoreVertical size={18} />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem className="d-flex align-items-center">
                              <Link to={`/create-slide?id=${presentation._id}`}>
                                <Edit2 size={14} className="me-50" />
                                <span>Edit</span>
                              </Link>
                            </DropdownItem>
                            <DropdownItem
                              className="d-flex align-items-center"
                              onClick={() => onDelete(presentation._id)}
                            >
                              <Trash2 size={14} className="me-50" />
                              <span>Delete</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <div className="d-flex align-items-center flex-wrap">
                          <h4 className="mb-1 me-1">{presentation.name}</h4>
                          <Badge className="mb-1" color="light-primary">
                            {presentation.isPublic ? "Public" : "Groups only"}
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
