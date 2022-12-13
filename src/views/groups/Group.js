// ** React Imports
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

// ** Reactstrap Imports
import { Button, Card, Col, Row } from "reactstrap";
import Table from "./Table";

// ** Table Import

const Group = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const [groupData, setGroupData] = useState({});
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
        console.log({ data: data.data });
        setGroupData({ ...data.data });
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
          <Table />
        </div>
      </Card>
    </Fragment>
  );
};

export default Group;
