import React from "react";
import { Form, ListGroup, Tab, Row, Col, Image } from "react-bootstrap";
import FormChat from "./formChat";
import contactDefaultPhoto from "../../../../assets/imgs/contactDefaultPhoto.png";

const FormListContact = (props: { user: any; userState: any }) => {

  const userNames = [
      {
        id:"1",
        username:"Talyah",
      },
    {
      id:"2",
      username:"Zoe"
    }
  ]
  const handleSelect = (e: any) => {
    props.userState(e.target.id);
  };
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
          {userNames.map((item,index)=> {
            return (
                <ListGroup.Item
                    key={index}
                    action
                    href={"#link"+item.id}
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
                          <p id={item.username} style={{fontStyle: "italic" }}>Acessar o chat</p>
                        </Row>
                      </Col>
                      {/*<Col>*/}
                      {/*  <p>12:09</p>*/}
                      {/*</Col>*/}
                    </Row>
                  </div>
                </ListGroup.Item>
            )
          })}
        </ListGroup>
      </div>
    </>
  );
};

export default FormListContact;
