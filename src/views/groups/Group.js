// ** React Imports
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { Airplay } from "react-feather";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Table from "./Table";

// ** Table Import

const Group = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const [groupData, setGroupData] = useState({});
  const [presentationData, setPresentationData] = useState([]);
  const [inviteUrl, setInviteUrl] = useState("");

  useEffect(async () => {
    const groupId = searchParams.get("id");
    if (groupId) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/groups/${groupId}`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setGroupData({ ...data.data });
      }

      const { data: presentations } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/presentations/by-group/${groupId}`,
        {
          withCredentials: true,
        }
      );

      if (presentations.success) {
        setPresentationData(presentations.data);
      }

      const { data: inviteData } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/groups/${groupId}/invitation-url`,
        {
          withCredentials: true,
        }
      );

      if (inviteData.success) {
        setInviteUrl(inviteData.data.inviteUrl);
      }
    }
  }, []);

  return (
    <Fragment>
      <Row className="mb-2">
        <Col>
          <h3>{groupData?.name}</h3>
        </Col>
        <Col className="text-end">
          <CopyToClipboard text={inviteUrl}>
            <Button outline color="dark">
              Copy invite link
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>
      <Card>
        <div className="card-datatable app-user-list table-responsive">
          <Table groupData={groupData} />
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Here are the list of your presentations
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
                              <Link
                                to={`/vote-slide?code=${presentation.code}`}
                              >
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
    </Fragment>
  );
};

export default Group;
