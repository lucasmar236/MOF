import React, {useEffect, useState} from "react";
import FormListContact from "../../components/private/chats/formListContact";
import {Alert, Col, Row} from "react-bootstrap";
import FormChat from "../../components/private/chats/formChat";
import {useAppDispatch} from "../../../services/hooks";
import {listContactsSlice, requestListContacts} from "../../../services/redux/contacts/getContactsSlice";
import {useSelector} from "react-redux";

function Chats() {

  const {contacts,contactsSuccess,contactsError,contactsLoading} =
      useSelector((state: any) => ({
        contacts: state.listContactsSlice.contacts,
        contactsSuccess: state.listContactsSlice.contactsSuccess,
        contactsError: state.listContactsSlice.contactsError,
        contactsLoading: state.listContactsSlice.contactsLoading

      }));

  const [userSelect, setUserSelect] = useState("");

  const dispatch = useAppDispatch()

  useEffect(() => {
    let token = `Bearer ${localStorage.getItem("auth")}`
    dispatch(requestListContacts(token))
  }, []);

  console.log(contacts,contactsSuccess,contactsError,contactsLoading)

  return (
    <div>
      <Row>
        <Col>
          <FormListContact user={userSelect} userState={setUserSelect} />
        </Col>
        <Col xs={8}>
          {userSelect === "" || undefined ? <Alert variant="secondary">Selecione uma conversa</Alert>:
          <FormChat data={userSelect} />
          }
        </Col>
      </Row>
    </div>
  );
}

export default Chats;
