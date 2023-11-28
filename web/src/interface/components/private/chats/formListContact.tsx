import React from "react"
import {ListGroup, Tab, Row, Col, Image} from "react-bootstrap";
import FormChat from "./formChat";


function FormListContact () {

    return(
        <>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                <ListGroup.Item action href="#link1">
                                    <Row>
                                        <Col>
                                            <Image src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" roundedCircle style={{width:"70%"}}/>
                                        </Col>
                                        <Col style={{margin:"10px"}}>
                                            <Row><p>UserName 1</p></Row>
                                            <Row>Last msg</Row>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link2">
                                    <Row>
                                    <Col>
                                        <Image src="https://media.istockphoto.com/id/886636648/photo/young-man-is-taking-pictures-with-an-old-camera.jpg?s=612x612&w=0&k=20&c=xhNzBup3llLNBJjj4wU6kO8gmK8xiXIbxKX6cpveUhI=" roundedCircle style={{width:"70%"}}/>
                                    </Col>
                                        <Col style={{margin:"10px"}}>
                                            <Row><p>UserName 2</p></Row>
                                            <Row>Last msg</Row>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#link1"><FormChat data={"userName1"}/></Tab.Pane>
                                <Tab.Pane eventKey="#link2"><FormChat data={"userName2"}/></Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
        </>
    )
}

export default FormListContact