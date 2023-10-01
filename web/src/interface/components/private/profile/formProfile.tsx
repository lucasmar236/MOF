import React, { useState } from "react";
import { CardManageUser } from "../../shared/cardManageUser";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RiLock2Line, RiPhoneLine, RiAtLine, RiMailLine, RiUserLine, RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import userProfile from "../../../../assets/imgs/userProfile.png"

const fakeUserData = { // substituir isso pelos dados que vem da request

};

function FormProfile() {
    return (
        <>
            <CardManageUser title="Profile">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '25px'}}>
                    <div>
                        <Row>
                            <img style={{ width: '75%' }} alt={"Foto de perfil do Usuário"} src={userProfile} />
                        </Row>
                        <Form>
                            <Form.Group className="mt-3" as={Col} controlId="formGridAddress1">
                                    <Form.Label><RiAtLine style={{ marginRight: "10px" }} />Username</Form.Label>
                                    <Form.Control placeholder="Username" type="username" />
                            </Form.Group>
                        </Form>
                    </div>

                    <div>
                        <Form style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px" }} onSubmit={() => console.log("ops")} noValidate>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label><RiUserLine style={{ marginRight: "10px" }} />Name</Form.Label>
                                    <Form.Control type="name" placeholder="Name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label><RiUserAddLine style={{ marginRight: "10px" }} />Lastname</Form.Label>
                                    <Form.Control type="lastname" placeholder="Lastname" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridEmail">
                                <Form.Label><RiMailLine style={{ marginRight: "10px" }} />Email</Form.Label>
                                <Form.Control placeholder="Email" type="email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridPassword">
                                <Form.Label><RiLock2Line style={{ marginRight: "10px" }} />Password</Form.Label>
                                <Form.Control placeholder="Password" type="password" />
                            </Form.Group>

                            <Form.Group className="mb-5" controlId="formGridCellPhone">
                                <Form.Label><RiPhoneLine style={{ marginRight: "10px" }} />Cell phone</Form.Label>
                                <Form.Control type="phone" placeholder="Enter your cell phone" />
                            </Form.Group>

                            <div style={{ marginTop: "20px", marginBottom: "20px", justifyContent: "flex-end", display: "flex" }}>
                                <Button type="submit" style={{ width: "10rem", backgroundColor: "#D44747", borderColor: "#D44747", borderRadius: "25px", marginRight: "10px" }}>
                                    Delete Account
                                </Button>
                                <Button type="submit" style={{ width: "10rem", backgroundColor: "#6CC04F", borderColor: "#6CC04F", borderRadius: "25px" }}>
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </CardManageUser>
        </>
    )
}


export default FormProfile