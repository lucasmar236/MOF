import React, { useState } from "react";
import FormListContact from "../../components/private/chats/formListContact";
import { Col, Row } from "react-bootstrap";
import FormChat from "../../components/private/chats/formChat";

function Chats() {
  const [userSelect, setUserSelect] = useState("");

  return (
    <div>
      <Row>
        <Col>
          <FormListContact user={userSelect} userState={setUserSelect} />
        </Col>
        <Col xs={8}>
          <FormChat data={userSelect} />
        </Col>
      </Row>
    </div>
  );
}

export default Chats;
