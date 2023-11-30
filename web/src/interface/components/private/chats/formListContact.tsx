import React from "react";
import { Form, ListGroup, Tab, Row, Col } from "react-bootstrap";
import contactDefaultPhoto from "../../../../assets/imgs/contactDefaultPhoto.png";
import { useSelector } from "react-redux";

const FormListContact = (props: { user: any; userState: any }) => {
  const { contacts, contactsSuccess, contactsError, contactsLoading, chats } =
    useSelector((state: any) => ({
      contacts: state.listContactsSlice.contacts,
      contactsSuccess: state.listContactsSlice.contactsSuccess,
      contactsError: state.listContactsSlice.contactsError,
      contactsLoading: state.listContactsSlice.contactsLoading,
      chats: state.listChatsSlice.chats,
    }));

    const handleSelect = (username: string) => {
        props.userState(username);
      };
    
      return (
        <>
          <div className="border">
            <ListGroup>
              <ListGroup.Item action>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                      active={props.user === item.username}
                      onClick={() => handleSelect(item.username)}
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
                              <p
                                id={item.username}
                                style={{ fontStyle: "italic" }}
                              >
                                Iniciar o chat
                              </p>
                            </Row>
                          </Col>
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
