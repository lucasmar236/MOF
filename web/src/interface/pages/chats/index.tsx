import React, { useEffect, useState } from "react";
import FormListContact from "../../components/private/chats/formListContact";
import { Alert, Col, Row } from "react-bootstrap";
import FormChat from "../../components/private/chats/formChat";
import { useAppDispatch } from "../../../services/hooks";
import {
  listContactsSlice,
  requestListContacts,
} from "../../../services/redux/contacts/listContactsSlice";
import { useSelector } from "react-redux";
import { requestListChats } from "../../../services/redux/chats/listchatsSlice";

function Chats() {
  const [userSelect, setUserSelect] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestListChats());
    dispatch(requestListContacts());
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <FormListContact user={userSelect} userState={setUserSelect} />
        </Col>
        <Col xs={8}>
          {userSelect === "" || undefined ? (
            <Alert variant="secondary">Selecione uma conversa</Alert>
          ) : (
            <FormChat data={userSelect} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Chats;
