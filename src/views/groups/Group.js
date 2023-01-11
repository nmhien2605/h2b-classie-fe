// ** React Imports
import axios from "axios";
import axiosHeader from "../../constants/axiosHeader"
import { Fragment, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Card, Col, Row } from "reactstrap";
import Table from "./Table";
import GroupPresentation from "./GroupPresentation";

const Group = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const [groupData, setGroupData] = useState({});
  const [presentationData, setPresentationData] = useState([]);
  const [inviteUrl, setInviteUrl] = useState("");
  const [isOwner, setOwner] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(async () => {
    const groupId = searchParams.get("id");
    if (groupId) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/groups/${groupId}`,
        { headers: axiosHeader },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        const checkOwner = data.data.members.find((member) => {
          return member.detail._id === user._id && (member.role === "owner" || member.role === "co-owner");
        });
        if (checkOwner) {
          setOwner(true);
        }
        setGroupData({ ...data.data });
      }

      const { data: presentations } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/presentations/by-group/${groupId}`,
        { headers: axiosHeader },
        {
          withCredentials: true,
        }
      );

      if (presentations.success) {
        setPresentationData(presentations.data);
      }

      const { data: inviteData } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/groups/${groupId}/invitation-url`,
        { headers: axiosHeader },
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
      <GroupPresentation
        isOwner={isOwner}
        group={searchParams.get("id")}
        presentationData={presentationData}
      />
    </Fragment>
  );
};

export default Group;
