import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosHeader from "../../constants/axiosHeader";
import { Label, Input, InputGroup, Button, Form, Row } from "reactstrap";
import { useHistory } from "react-router";

const CreatePresentation = () => {
  const [groups, setGroups] = useState([]);
  const [isPublic, setPublic] = useState(true);
  const [group, setGroup] = useState("");
  const history = useHistory();

  const handleSelectType = (value) => {
    if (value === "public") {
      setPublic(true);
    } else {
      setPublic(false);
    }
  };

  const handleSelectGroup = (value) => {
    setGroup(value);
  };

  const getGroups = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_DOMAIN}/groups`,
      { headers: axiosHeader },
      { withCredentials: true }
    );

    if (data.success) {
      setGroups(data.data);
      setGroup(data.data[0] ? data.data[0]._id : "");
      console.log(data.data);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleCreate = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/presentations`,
      {
        name: "Your new presentation",
        isPublic,
        groups: isPublic ? [] : [group],
      },
      { headers: axiosHeader },
      { withCredentials: true }
    );
    history.push(`/create-slide?id=${data.data._id}`);
  };

  return (
    <div>
      <Row
        style={{ justifyContent: "center", fontSize: 24, fontWeight: "bold" }}
      >
        Create Presentation
      </Row>
      <Label className="mt-2">Presentation type</Label>
      <Input
        type="select"
        id="payment-select"
        onChange={(e) => handleSelectType(e.target.value)}
      >
        <option key="public" value="public">
          Public presentation
        </option>
        {groups.length > 0 && (
          <option key="private" value="private">
            Group presentation
          </option>
        )}
      </Input>
      {!isPublic && groups.length > 0 && (
        <div>
          <Label className="mt-2">Group</Label>
          <Input
            type="select"
            id="payment-select"
            onChange={(e) => handleSelectGroup(e.target.value)}
          >
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </Input>
        </div>
      )}
      <Row className="mt-2" style={{ justifyContent: "center" }}>
        <Button style={{ width: 200 }} color="primary" onClick={handleCreate}>
          Create Presentation
        </Button>
      </Row>
    </div>
  );
};

export default CreatePresentation;
