import React from "react";
import { Form, ListGroup, Tab, Row, Col, Image } from "react-bootstrap";
import FormChat from "./formChat";
import contactDefaultPhoto from "../../../../assets/imgs/contactDefaultPhoto.png";

const FormListContact = (props: { user: any; userState: any }) => {
  const handleSelect = (e: any) => {
    props.userState("Talyah");
    console.log(e);
  };
  return (
    <>
      <div className="border">
        <ListGroup>
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
          <ListGroup.Item
            action
            href="#link2"
            defaultValue="Talyah"
            onClick={(e) => handleSelect(e)}
          >
            <div>
              <Row>
                <Col>
                  <img
                    alt="Foto do contato"
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
                <Col>
                  <Row>
                    <p>Chat 1</p>
                    <p>Mensagem</p>
                  </Row>
                </Col>
                <Col>
                  <p>12:09</p>
                </Col>
              </Row>
            </div>
          </ListGroup.Item>
          <ListGroup.Item action href="#link3" defaultValue="Zoe">
            <div>
              <Row>
                <Col>
                  <img
                    alt="Foto do contato"
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
                <Col>
                  <Row>
                    <p>Chat 2</p>
                    <p>Mensagem</p>
                  </Row>
                </Col>
                <Col>
                  <p>12:09</p>
                </Col>
              </Row>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default FormListContact;
