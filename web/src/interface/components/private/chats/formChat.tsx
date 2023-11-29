import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Navbar,
  Row,
  Stack,
} from "react-bootstrap";
import contactDefaultPhoto from "../../../../assets/imgs/contactDefaultPhoto.png";

const FormChat = (props: { data: string }) => {
  return (
    <>
      <div
        className="border"
        style={{
          maxHeight: "70vh",
          overflowY: "scroll",
          overflow: "hidden !important",
          background:
            "url(https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1701043200&semt=ais)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <p>{props.data}</p>
              </Navbar.Text>
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
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div style={{ margin: "20px" }}>
          <p style={{ color: "white" }}>{props.data}</p>
          <Card style={{ width: "32rem" }} bg={"light"}>
            <Card.Body>Mensagem do amigo</Card.Body>
          </Card>
          <br />
          <Card style={{ width: "32rem", marginLeft: "32%" }} bg={"success"}>
            <Card.Body style={{ textAlign: "right", color: "white" }}>
              Mensagem
            </Card.Body>
          </Card>
          <br />
        </div>
      </div>
      <br />
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          className="me-auto"
          placeholder="Add your mensage here..."
        />
        <Button variant="secondary">Submit</Button>
      </Stack>
    </>
  );
};

export default FormChat;
