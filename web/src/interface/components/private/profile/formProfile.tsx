import React, { useState } from "react";
import { CardManageUser } from "../../shared/cardManageUser";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RiLock2Line, RiPhoneLine, RiAtLine, RiMailLine, RiUserLine, RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import userProfile from "../../../../assets/imgs/userProfile.png"

function FormProfile() {
    const getUserInfo = { // substituir isso pela request que busca os dados
        first_name: "Jose",
        last_name: "Joseval",
        email: "jose@gmail.br",
        password: "123456",
        number_phone:"54999629886",
        username:"josejoseval34"
    };

    const [userInfo, setUserInfo] = useState(getUserInfo);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };
    
    const handleSave = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log("Dados atualizados:", userInfo);
        // fazer request pra atualizar os dados 
    };
    
    const handleDeleteAccount = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log("Conta excluída");
        // fazer request ou abrir modal pra exclusão de conta
    };

    return (
        <>
            <CardManageUser title="Profile">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '25px'}}>
                    <div style={{ marginLeft: '20px' }}>
                        <Row>
                            <img style={{ width: '75%' }} alt={"Foto de perfil do Usuário"} src={userProfile} />
                        </Row>
                        <Form>
                            <Form.Group className="mt-3" as={Col} controlId="formUsername">
                                    <Form.Label><RiAtLine style={{ marginRight: "10px" }} />Username</Form.Label>
                                    <Form.Control name="username" type="text" placeholder="Username" value={userInfo.username} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </div>

                    <div>
                        <Form style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px" }}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formName">
                                    <Form.Label><RiUserLine style={{ marginRight: "10px" }} />Name</Form.Label>
                                    <Form.Control name="first_name" type="text" placeholder="Name" value={userInfo.first_name} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formLastName">
                                    <Form.Label><RiUserAddLine style={{ marginRight: "10px" }} />Lastname</Form.Label>
                                    <Form.Control name="last_name" type="text" placeholder="Lastname" value={userInfo.last_name} onChange={handleChange} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label><RiMailLine style={{ marginRight: "10px" }} />Email</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Email" value={userInfo.email} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label><RiLock2Line style={{ marginRight: "10px" }} />Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" value={userInfo.password} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-5" controlId="formPhone">
                                <Form.Label><RiPhoneLine style={{ marginRight: "10px" }} />Cell phone</Form.Label>
                                <Form.Control name="number_phone" type="text" placeholder="Enter your cell phone" value={userInfo.number_phone} onChange={handleChange} />
                            </Form.Group>

                            <div style={{ marginTop: "20px", marginBottom: "20px", justifyContent: "flex-end", display: "flex" }}>
                                <Button type="submit" onClick={handleDeleteAccount} style={{ width: "10rem", backgroundColor: "#D44747", borderColor: "#D44747", borderRadius: "25px", marginRight: "10px" }}>
                                    Delete Account
                                </Button>
                                <Button type="submit" onClick={handleSave} style={{ width: "10rem", backgroundColor: "#6CC04F", borderColor: "#6CC04F", borderRadius: "25px" }}>
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

export default FormProfile;