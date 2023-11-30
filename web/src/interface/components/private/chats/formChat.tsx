import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Navbar, Row, Stack } from "react-bootstrap";
import contactDefaultPhoto from "../../../../assets/imgs/contactDefaultPhoto.png";
import styles from "./formChat.module.scss"

const NewMensagemAmigo = (msg: string) => {
    return (
        <div>
            <Card style={{ width: "26rem", marginLeft: "10px" }} bg={"light"}>
                <Card.Body>{msg}</Card.Body>
            </Card>
            <br />
        </div>
    )
};

const NewMensagemUser = (msg: string) => {
    return (
        <>
            <Card style={{ width: "26rem", marginRight: "10px", marginLeft: 'auto', textAlign: 'right' }} bg={"success"}>
                <Card.Body style={{ textAlign: "right", color: "white" }}>
                    {msg}
                </Card.Body>
            </Card>
            <br />
        </>
    )
};

const FormChat = (props: { data: string }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [userMessage, setUserMessage] = useState<string>("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const handleWebSocketMessage = (event: MessageEvent) => {
        const newMessage = event.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:8080/api/v1/5E08C2B91E63E0FD?access_token=BE6D88A8E4A06C35");

        newSocket.addEventListener("message", handleWebSocketMessage);

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(userMessage);
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setUserMessage("");
        }
    };

    return (
        <>
            <div
                style={{
                    height: "50vh", // Ajuste a altura conforme necessário
                    maxHeight: "50vh", // Ajuste a altura conforme necessário
                    background:
                        "url(https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1701043200&semt=ais)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100%",
                }}
            >
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-start">
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
                <div style={{ height: "40vh", maxHeight: "40vh" }}>
                    <ul className={styles.ulStyle}>
                        {NewMensagemAmigo("olaaa")}
                        {NewMensagemUser("ola meu amigo")}
                        {NewMensagemUser("ola meu amigo")}
                        {NewMensagemUser("ola meu amigo")}
                        {NewMensagemUser("ola meu amigo")}
                        {NewMensagemAmigo("olaaa")}
                        {NewMensagemAmigo("olaaa")}
                    </ul>
                </div>
            </div>
            <br />
            <div>
                <Stack direction="horizontal" gap={3}>
                    <Form.Control
                        className="me-auto"
                        placeholder="Add your mensage here..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                    />
                    <Button variant="secondary" onClick={sendMessage}>Submit</Button>
                </Stack>
            </div>
        </>
    );
};



export default FormChat;