import React, { Fragment, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { Check, Airplay } from "react-feather";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Badge,
} from "reactstrap";
import Avatar from "@components/avatar";

import { SocketContext } from "../../utility/Socket";

const SuccessToast = ({ name }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title">New present</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {name} is presenting
      </span>
    </div>
  </Fragment>
);

const WarningToast = ({ name }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="warning" icon={<Check size={12} />} />
        <h6 className="toast-title">Close present</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {name} stop present
      </span>
    </div>
  </Fragment>
);

const GroupPresentation = ({ group, presentationData }) => {
  const socketData = useContext(SocketContext); 

  useEffect(() => {
    if (socketData.event === "start-present") {
      if (socketData.data.groups.includes(group)) {
        toast.success(<SuccessToast name={socketData.data.name} />, {
          icon: false,
          hideProgressBar: true,
          autoClose: 5000,
        });
      }
    }
    if (socketData.event === "end-present") {
      if (socketData.data.groups.includes(group)) {
        toast.success(<WarningToast name={socketData.data.name} />, {
          icon: false,
          hideProgressBar: true,
          autoClose: 5000,
        });
      }
    }
  }, [socketData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          Here are the list of presentations in group
        </CardTitle>
      </CardHeader>
      <PerfectScrollbar style={{ height: "calc(100vh - 250px)" }}>
        <CardBody>
          <Row className="gy-2">
            {presentationData.length > 0 &&
              presentationData.map((presentation) => {
                return (
                  <Col key={presentation._id} sm={12}>
                    <div className="bg-light-secondary position-relative rounded p-2">
                      {presentation.isPresent && (
                        <Row className="btn-pinned align-items-center">
                          <Col>
                            <Link to={`/vote-slide?code=${presentation.code}`}>
                              <Airplay size={14} className="me-50" />
                              <span>Join</span>
                            </Link>
                          </Col>
                        </Row>
                      )}
                      <div className="d-flex align-items-center flex-wrap">
                        <h4 className="mb-1 me-1">{presentation.name}</h4>
                        <Badge className="mb-1" color="light-primary">
                          {presentation.isPublic ? "Public" : "Groups only"}
                        </Badge>
                        {presentation.isPresent && (
                          <Badge className="mb-1 ms-1" color="light-success">
                            Presenting
                          </Badge>
                        )}
                      </div>
                      <span>
                        Create on{" "}
                        {new Date(presentation.createdAt).toLocaleDateString()}{" "}
                        {new Date(presentation.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </CardBody>
      </PerfectScrollbar>
    </Card>
  );
};

export default GroupPresentation;
