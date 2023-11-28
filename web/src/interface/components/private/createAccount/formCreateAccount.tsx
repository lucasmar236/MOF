import React, {useEffect, useState} from "react";
import {CardLayout} from "../../shared/cardLayout";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {RiLock2Line, RiPhoneLine, RiAtLine, RiMailLine, RiUserLine, RiCake2Line,RiUserAddLine} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../services/hooks";
import {requestCreate, userCreateSlice} from "../../../../services/redux/createAccount/userCreateSlice";
import {useSelector} from "react-redux";

function FormCreateAccount (){

    const {sendUserCreateSuccess,sendUserCreateError} = useSelector((state:any) => ({
        sendUserCreateSuccess: state.userCreateSlice.sendUserCreateSuccess,
        sendUserCreateError: state.userCreateSlice.sendUserCreateError
    }))

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [userName,setUserName] = useState("")
    const [numberPhone,setNumberPhone] = useState("")
    const [birth,setBirth] = useState("")

    const [invalidForm,setInvalidForm] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSendRegister = () => {
        let userRegister = {
            first_name: firstName,
            last_name: lastName,
            password: password,
            email: email,
            username: userName,
            number_phone: numberPhone,
        }
            dispatch(requestCreate(userRegister))
    }

    useEffect(() => {
        if(sendUserCreateSuccess === "Usuário criado com sucesso!"){
            navigate("/login")
        }
        if(sendUserCreateError === "Usuário ja existe!"){
            console.log("OPA")
        }

    }, [sendUserCreateSuccess,sendUserCreateError]);

    console.log(sendUserCreateSuccess)

    return(
        <>
            <CardLayout title="Register" text="To use our system, please register with your personal information!" imagem="">
                <div>
                    <Form  style={{marginTop:"10px",marginLeft:"10px",marginRight:"10px"}} noValidate validated={invalidForm}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label><RiUserLine style={{marginRight:"10px"}}/>Name</Form.Label>
                                <Form.Control type="name" placeholder="Name" onChange={(e)=>setFirstName(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Please insert your FirstName!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label><RiUserAddLine style={{marginRight:"10px"}}/>Lastname</Form.Label>
                                <Form.Control type="lastname" placeholder="Lastname" onChange={(e)=> setLastName(e.target.value)}/>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3"  as={Col} controlId="formGridAddress1">
                                <Form.Label><RiAtLine style={{marginRight:"10px"}}/>Username</Form.Label>
                                <Form.Control placeholder="Username"  type="username" onChange={(e)=> setUserName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3"  as={Col} controlId="formGridAddress2">
                                <Form.Label><RiMailLine style={{marginRight:"10px"}}/>Email</Form.Label>
                                <Form.Control placeholder="Email" type="email" onChange={(e)=> setEmail(e.target.value)}/>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label><RiLock2Line style={{marginRight:"10px"}}/>Password</Form.Label>
                            <Form.Control placeholder="Password" type="password" onChange={(e)=> setPassword(e.target.value)}/>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label><RiPhoneLine style={{marginRight:"10px"}}/>Cell phone</Form.Label>
                                <Form.Control type="phone" placeholder="Enter your cell phone" onChange={(e) => setNumberPhone(e.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label><RiCake2Line style={{marginRight:"10px"}}/>Date of birth</Form.Label>
                                <Form.Control type="date" placeholder="Date of birth" onChange={(e) => setBirth(e.target.value)}/>
                            </Form.Group>
                        </Row>

                        <div style={{margin:"10px"}}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" id="formGridCheckbox">
                                        <Form.Check type="checkbox" label={<p onClick={handleShow} style={{color:"#0d6efd"}}>Termos de uso</p>} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Link to="/login" style={{marginLeft:"40%"}}>Back to login</Link>
                                </Col>
                            </Row>
                        </div>


                        <div className="d-grid gap-2" style={{marginTop:"20px",marginBottom:"20px"}}>
                            <Button onClick={() => handleSendRegister()} style={{backgroundColor:"#C99A6D",borderColor:"#C99A6D"}} >
                                Create my account
                            </Button>
                        </div>
                    </Form>
                </div>
            </CardLayout>

            <Modal show={show} onHide={handleClose} size="lg"    scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Termos de uso MOF</Modal.Title>
                </Modal.Header>
                <Modal.Body><h2>
                    <span style={{color: "rgb(68, 68, 68)"}}>Privacy Policy</span></h2>
                    <p><span style={{color: "rgb(68, 68, 68)"}}>Your privacy is important to us. It is Mof policy to respect your privacy regarding any information we may collect from you across our website, <a href="">Mof</a>, and other sites we own and operate.</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective&nbsp;</span><a href="https://privacypolicies.in/" rel="noopener noreferrer" target="_blank" style={{color: "rgb(68, 68, 68)"}}>privacy policies</a><span style={{color: "rgb(68, 68, 68)"}}>.</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</span></p><p><span style={{color: "rgb(68, 68, 68)"}}>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}><h2><span style={{color: "rgb(68, 68, 68)"}}>Cookie Policy for Mof</span></h2>
                    <p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><p><span style={{color: "rgb(68, 68, 68)"}}>This is the Cookie Policy for Mof, accessible from URL .</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><h3><span style={{color: "rgb(68, 68, 68)"}}>What Are Cookies</span></h3>
                    <p><span style={{color: "rgb(68, 68, 68)"}}> </span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or br/eak certain elements of the sites functionality.</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><h3><span style={{color: "rgb(68, 68, 68)"}}>How We Use Cookies</span></h3><p><span style={{color: "rgb(68, 68, 68)"}}> </span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</span></p><p><span style={{color: "rgb(68, 68, 68)"}}> </span></p>
                    <h3><span style={{color: "rgb(68, 68, 68)"}}>Disabling Cookies</span></h3><p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><p><span style={{color: "rgb(68, 68, 68)"}}>You can prevent the setting of cookies by adjusting the settings on your br/owser (see your br/owser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><h3><span style={{color: "rgb(68, 68, 68)"}}>The Cookies We Set</span></h3><p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><p><br/></p><p><span style={{color: "rgb(68, 68, 68)"}}> </span></p>
                    <h3><span style={{color: "rgb(68, 68, 68)"}}>Third Party Cookies</span></h3><p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><p><span style={{color: "rgb(68, 68, 68)"}}>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</span></p>
                    <p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><p><br/></p><p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><p><span style={{color: "rgb(68, 68, 68)"}}></span></p><p><span style={{color: "rgb(68, 68, 68)"}}> </span></p><p><br/></p></span></p>
                    <h3><span style={{color: "rgb(68, 68, 68)"}}>Users responsibilities</span></h3><p><span style={{color: "rgb(68, 68, 68)"}}>The user undertakes the responsibility to make appropriate use of the contents and information offered on the site with enunciative, but not imitative, behaviour:</span></p>
                    <ul><li><span style={{color: "rgb(68, 68, 68)"}}>A) Not to engage in activities that are illegal or contrary to good faith and public order;</span></li>
                        <li><span style={{color: "rgb(68, 68, 68)"}}>B) Not to spread propaganda or content of a racist, xenophobic or gambling nature, any type of illegal pornography, terrorist claims or against human rights;</span></li>
                        <li><span style={{color: "rgb(68, 68, 68)"}}>C) Do not cause damage to physical systems (hardware) and unattainable (software) of Mof, its suppliers or third parties, to introduce or disseminate computer viruses or any other hardware or software systems that are capable of causing damage previously mentioned.</span></li>
                    </ul><h3><span style={{color: "rgb(68, 68, 68)"}}>More information</span></h3><p><span style={{color: "rgb(68, 68, 68)"}}>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</span></p><p><span style={{color: "rgb(68, 68, 68)"}}>This policy is effective as of 29 September 2023 14:06.</span></p></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Sair
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Concordo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default FormCreateAccount