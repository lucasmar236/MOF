import React, { useState, useCallback, useEffect } from "react";
import { CardManageUser } from "../../shared/cardManageUser";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RiLock2Line, RiPhoneLine, RiAtLine, RiMailLine, RiUserLine, RiUserAddLine } from "react-icons/ri";
import userProfile from "../../../../assets/imgs/userProfile.png"
import {checkEmail} from "../../../utils/functions/checkSharedFieldsFunctions";
import InputMask from 'react-input-mask';
import { useSelector } from "react-redux";

function FormProfile() {
    const { profile, profileSuccess, profileError, profileLoading } =
        useSelector((state: any) => ({
            profile: state.getProfileSlice.profile,
            profileSuccess: state.getProfileSlice.contactsSuccess,
            profileError: state.getProfileSlice.contactsError,
            profileLoading: state.getProfileSlice.contactsLoading,
        }));

    const [firstname, setFirstname] = useState(profile.first_name);
    const [lastname, setLastname] = useState(profile.last_name);
    const [email, setEmail] = useState(profile.email);
    const [numberphone, setNumberphone] = useState(profile.number_phone);
    const [username, setUsername] = useState(profile.username);
    
    useEffect(() => {
        if (profile) {
            setFirstname(profile.first_name);
            setLastname(profile.last_name);
            setEmail(profile.email);
            setNumberphone(profile.number_phone);
            setUsername(profile.username);
        }
    }, [profile]);

    const [validatedFirstname, setValidatedFirstname] = useState("")
    const [validatedLastname, setValidatedLastname] = useState("")
    const [validatedEmail, setValidatedEmail] = useState("")
    const [validatedNumberphone, setValidatedNumberphone] = useState("")
    const [validatedUsername, setValidatedUsername] = useState("")


    const handleSave = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (checkEmail(email)) {
            setValidatedEmail("")
        } else {
            setValidatedEmail("Email is invalid.")
        };

        if (numberphone.length === 11) {
            setValidatedNumberphone("")
        } else {
            setValidatedNumberphone("Phone number is not completely filled in.")
        }

        if (username.length > 4) {
            setValidatedUsername("")
        } else {
            setValidatedUsername("Must contain least 5 characters.")
        }

        if (firstname.length > 2) {
            setValidatedFirstname("")
        } else {
            setValidatedFirstname("Must contain least 2 characters.")
        }

        if (lastname.length > 2) {
            setValidatedLastname("")
        } else {
            setValidatedLastname("Must contain least 2 characters.")
        }

        // somente se nao tiver erros fazer isso \/
        let userUpdate = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            username: username,
            number_phone: numberphone
        }

        console.log("Dados atualizados:", userUpdate);
        // fazer request pra atualizar os dados 
    };

    const handleDeleteAccount = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log("Conta excluída");
        // fazer request ou abrir modal pra confirmar exclusão de conta
    };

    const handleUsername = useCallback((e: any) => {
        let value = e.currentTarget.value;
        value = value.replace(/[^a-zA-Z0-9\-_]/g, "");
        e.currentTarget.value = value;
        
        setUsername(e.currentTarget.value);
    }, []);

    const handleFirstname = useCallback((e: any) => {
        let value = e.currentTarget.value;
        value = value.replace(/[^a-zA-Z]/g, "");
        e.currentTarget.value = value;
        
        setFirstname(e.currentTarget.value);
    }, []);

    const handleLastname = useCallback((e: any) => {
        let value = e.currentTarget.value;
        value = value.replace(/[^a-zA-Z]/g, "");
        e.currentTarget.value = value;
        
        setLastname(e.currentTarget.value);
    }, []);

    return (
        <>
            <CardManageUser title="Profile">
                <Form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '25px', justifyContent: 'space-between' }} noValidate>
                    <div style={{ marginLeft: '10px', marginRight: '40px' }}>
                        <Row>
                            <img style={{ width: '75%' }} alt={"Foto de perfil do Usuário"} src={userProfile} />
                        </Row>
                        <Form.Group className="mt-3" as={Col} controlId="formUsername">
                            <Form.Label><RiAtLine style={{ marginRight: "10px" }} />Username</Form.Label>
                            <Form.Control maxLength={18} name="username" type="text" placeholder="Username" value={username} onChange={handleUsername} isInvalid={validatedUsername !== ""}/>
                            <Form.Control.Feedback type="invalid">
                                {validatedUsername}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px" }}>
                        <Row className="mb-4" style={{ maxWidth:'28.875em'}}>
                            <Form.Group as={Col} controlId="formName">
                                <Form.Label><RiUserLine style={{ marginRight: "10px" }} />Name</Form.Label>
                                <Form.Control maxLength={20} name="first_name" type="text" placeholder="Name" value={firstname} onChange={handleFirstname} isInvalid={validatedFirstname !== ""}/>
                                <Form.Control.Feedback type="invalid">
                                    {validatedFirstname}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formLastName">
                                <Form.Label><RiUserAddLine style={{ marginRight: "10px" }} />Lastname</Form.Label>
                                <Form.Control maxLength={20} name="last_name" type="text" placeholder="Lastname" value={lastname} onChange={handleLastname} isInvalid={validatedLastname !== ""}/>
                                <Form.Control.Feedback type="invalid">
                                    {validatedLastname}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-4" controlId="formEmail">
                            <Form.Label><RiMailLine style={{ marginRight: "10px" }} />Email</Form.Label>
                            <Form.Control maxLength={50} name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={validatedEmail !== ""} />
                            <Form.Control.Feedback type="invalid">
                                {validatedEmail}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-5" controlId="formPhone">
                            <Form.Label><RiPhoneLine style={{ marginRight: "10px" }} />Cell phone</Form.Label>
                            <Form.Control name="number_phone" type="text" as={InputMask} mask="+99 99999-9999" placeholder="Enter your cell phone" value={numberphone} onChange={(e) => setNumberphone(e.target.value.replace(/[^0-9]/g, ""))} isInvalid={validatedNumberphone !== ""}/>
                            <Form.Control.Feedback type="invalid">
                                {validatedNumberphone}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div style={{  marginTop: "20px", marginBottom: "20px", justifyContent: "flex-end", display: "flex", gap: "10px" }}>
                            <Button type="submit" onClick={handleDeleteAccount} style={{ width: "10rem", backgroundColor: "#D44747", borderColor: "#D44747", borderRadius: "25px", marginRight: "10px" }}>
                                Delete Account
                            </Button>
                            <Button type="submit" style={{ width: "10rem", backgroundColor: "#6CC04F", borderColor: "#6CC04F", borderRadius: "25px" }}>
                                Save
                            </Button>
                        </div>
                    </div>
                </Form>
            </CardManageUser>
        </>
    )
}

export default FormProfile;