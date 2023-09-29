import React, {useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {RiLock2Line,RiUser3Line} from "react-icons/ri"
import {SendLogin} from "../../../utils/functions/allFunctionsSend";
import {useAppDispatch} from "../../../../services/hooks";
import {requestLogin} from "../../../../services/redux/authentication/userSlice";
import {CardLayout} from "../../shared/cardLayout";
function FormLogin(){

    const[email_User,setEmail_User] = useState("")
    const [password,setPassword] = useState("")
    const [validated, setValidated] = useState(false);
    const dispatch = useAppDispatch()

    const send = (event:any) =>{
        let userLogin = {
            email_username: email_User,
            password:password
        }
        if((email_User && password) === ""){
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }else {
            dispatch(requestLogin(userLogin))
        }
    }


    return(
        <CardLayout title="Sing in" text="Welcome to MOF, your online chat app!" imagem="">
                <div>
                    <Form style={{marginTop:"30px",marginLeft:"10px",marginRight:"10px"}} onSubmit={send} noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>
                                <RiUser3Line style={{marginRight:"10px"}}/>Username/Email
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter your email or username"
                                          onChange={(e)=> setEmail_User(e.target.value)}
                                          required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please check your email/username!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>
                                <RiLock2Line style={{marginRight:"10px"}}/>Password
                            </Form.Label>
                            <Form.Control type="password" placeholder="Enter your password"
                                          onChange={(e)=>setPassword(e.target.value)}
                                          required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please check your password!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div style={{margin:"10px"}}>
                            <Row>
                                <Col>
                                    <Link to="/change-password">Forgot password?</Link>
                                </Col>
                                <Col>
                                    <Link to="/create-account" style={{marginLeft:"40%"}}>Create my account</Link>
                                </Col>
                            </Row>
                        </div><br/>
                        <div className="d-grid gap-2" style={{marginTop:"20px",marginBottom:"20px"}}>
                            <Button type="submit" style={{backgroundColor:"#C99A6D",borderColor:"#C99A6D"}} >
                                Login
                            </Button>
                        </div>
                    </Form>
                </div>
        </CardLayout>
    )
}

export default FormLogin