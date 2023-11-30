import React, { useCallback, useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";

const FormChat = (props: { data: string }) => {
  const { chatCode, sessionCode } = useSelector((state: any) => ({
    chatCode: state.listChatPrivateCodeSlice.chatCode,
    sessionCode: state.listAccessChatPrivateCodeSlice.sessionCode,
  }));

  useEffect(() => {
    if (chatCode.chat && sessionCode.code !== undefined) {
      setSocketUrl(
        `ws://localhost:8080/api/v1/${chatCode.chat}?access_token=${sessionCode.code}`
      );
    }
  }, [chatCode, sessionCode]);

  const [socketUrl, setSocketUrl] = useState("ws://localhost:8080/api/v1");
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage);
      // setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  console.log(messageHistory);

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
        <Button variant="secondary" onClick={handleClickSendMessage}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default FormChat;
