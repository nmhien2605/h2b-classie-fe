// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from "reactstrap";

// ** Demo Components
import Tabs from "./Tabs";

import ChatTab from "./ChatTab";
import QuestionTab from "./QuestionTab";
import QuestionTabControl from "./QuestionTabControl";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";

const ChatBox = ({ room, isClient }) => {
  // ** States
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "100%",
      }}
    >
      <Tabs className="" style={{ flex: "0 1 auto" }} activeTab={activeTab} toggleTab={toggleTab} />

      <TabContent activeTab={activeTab} style={{ flex: "1 1 auto" }}>
        <TabPane tabId="1" style={{ height: "100%" }}>
          <ChatTab room={room} />
        </TabPane>
        {isClient ? (
          <TabPane tabId="2" style={{ height: "100%" }}>
            <QuestionTab room={room} />
          </TabPane>
        ) : (
          <TabPane tabId="2" style={{ height: "100%" }}>
            <QuestionTabControl room={room} />
          </TabPane>
        )}
      </TabContent>
    </div>
  );
};

export default ChatBox;
