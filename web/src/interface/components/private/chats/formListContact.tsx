import React, { useEffect } from "react";
import { Form, ListGroup, Tab, Row, Col } from "react-bootstrap";
import contactDefaultPhoto from "../../../../assets/imgs/contactDefaultPhoto.png";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../services/hooks";
import { requestChatPrivateCode } from "../../../../services/redux/chats/createPrivateChatSlice";
import { requestAccessChatPrivateCode } from "../../../../services/redux/chats/acessPrivateChatSlice";

const FormListContact = (props: { user: any; userState: any }) => {
  const {
    contacts,
    contactsSuccess,
    contactsError,
    contactsLoading,
    chats,
    chatCode,
    chatCodeSuccess,
    chatCodeError,
    chatCodeLoading,
    sessionCode,
  } = useSelector((state: any) => ({
    contacts: state.listContactsSlice.contacts,
    contactsSuccess: state.listContactsSlice.contactsSuccess,
    contactsError: state.listContactsSlice.contactsError,
    contactsLoading: state.listContactsSlice.contactsLoading,
    chats: state.listChatsSlice.chats,
    chatCode: state.listChatPrivateCodeSlice.chatCode,
    chatCodeSuccess: state.listChatPrivateCodeSlice.chatCodeSuccess,
    chatCodeError: state.listChatPrivateCodeSlice.chatCodeError,
    chatCodeLoading: state.listChatPrivateCodeSlice.chatCodeLoading,
    sessionCode: state.listAccessChatPrivateCodeSlice.sessionCode,
  }));

  const dispatch = useAppDispatch();

  const handleSelect = (e: any) => {
    let chat = {
      contact: 2,
    };
    dispatch(requestChatPrivateCode(chat));
    props.userState(e.target.id);
  };

  useEffect(() => {
    if (chatCodeSuccess === "Listado com sucesso") {
      if (chatCode.chat !== undefined) {
        let hash = {
          chat: chatCode.chat,
        };
        dispatch(requestAccessChatPrivateCode(hash));
      }
    }
  }, [chatCodeSuccess]);

  return (
    <>
      <div className="border">
        <ListGroup onClick={(e) => handleSelect(e)}>
          <ListGroup.Item action>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="search" placeholder="pesquisar contato" />
              </Form.Group>
            </Form>
          </ListGroup.Item>
          {contacts.contacts === undefined ? (
            <p>Erro ao carregar</p>
          ) : (
            contacts.contacts.map((item: any, index: any) => {
              return (
                <ListGroup.Item
                  key={index}
                  action
                  href={"#link" + item.id}
                  id={item.username}
                >
                  <div id={item.username}>
                    <Row id={item.username}>
                      <Col>
                        <img
                          alt="Foto do contato"
                          id={item.username}
                          src={contactDefaultPhoto}
                          style={{
                            marginTop: "12px",
                            width: "50px",
                            height: "50px",
                            marginLeft: "12px",
                            borderRadius: "50%",
                          }}
                        />
                      </Col>
                      <Col sm={8}>
                        <Row>
                          <p id={item.username}>{item.username}</p>
                          <p id={item.username} style={{ fontStyle: "italic" }}>
                            Iniciar o chat
                          </p>
                        </Row>
                      </Col>
                      {/*<Col>*/}
                      {/*  <p>12:09</p>*/}
                      {/*</Col>*/}
                    </Row>
                  </div>
                </ListGroup.Item>
              );
            })
          )}
        </ListGroup>
      </div>
    </>
  );
};

export default FormListContact;
