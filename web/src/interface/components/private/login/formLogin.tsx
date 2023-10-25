import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {RiAtLine, RiLock2Line} from "react-icons/ri"
import {SendLogin, verifyInputs} from "../../../utils/functions/allFunctionsSend";
import {useAppDispatch} from "../../../../services/hooks";
import {requestLogin, userSlice} from "../../../../services/redux/authentication/userSlice";
import {CardLayout} from "../../shared/cardLayout";
import {useSelector} from "react-redux";
function FormLogin(){

    const {userSuccess,userLoading,userError} = useSelector((state:any)  =>({
        userSuccess: state.userSlice.userSuccess,
        userLoading: state.userSlice.userLoading,
        userError : state.userSlice.userError
    }))

    const[email_User,setEmail_User] = useState("")
    const [password,setPassword] = useState("")
    const [validated, setValidated] = useState(false);
    const [requestInvalid,setRequestInvalid] = useState(false)


    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const send = (event:any) =>{
        let userLogin = {
            login: email_User,
            password:password
        }
        if((email_User && password) === ""){
            verifyInputs(event)
            setValidated(true);
        }else {
            dispatch(requestLogin(userLogin))
        }
    }

    useEffect(() => {
        if(userSuccess === "Usuário Logado com sucesso!"){
            setRequestInvalid(false)
            navigate("/two-factors", {state:"login"})
        }
        if(userError === "Erro ao logar, verifique suas informações!") {
            setRequestInvalid(true)
        }
    }, [userSuccess,userError]);

    return(
        <CardLayout title="Sing in" text="Welcome to MOF, your online chat app!" imagem=""><br/>
            {requestInvalid ?
                <Alert variant="danger">
                     Invalid credentials! </Alert>
                : <></>}
                <div>
                    <Form style={{marginTop:"30px",marginLeft:"10px",marginRight:"10px"}} noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>
                                <RiAtLine style={{marginRight:"10px"}}/>Username/Email
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
                            <Button style={{backgroundColor:"#C99A6D",borderColor:"#C99A6D"}} onClick={send}>
                                Login
                            </Button>
                        </div>
                    </Form>
                </div>
        </CardLayout>
    )
}

export default FormLogin