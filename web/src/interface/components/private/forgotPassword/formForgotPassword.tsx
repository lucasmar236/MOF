import React, {useState} from "react";
import {CardLayout} from "../../shared/cardLayout";
import {Button, Col, Form, Row} from "react-bootstrap";
import {RiLock2Line, RiUser3Line} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";


 function FormForgoutPassword () {

     const[email,setEmail] = useState("")
     const[validatedEmail,setValidatedEmail] = useState("")

     const[newPassword,setNewPassword] = useState("")
     const[validateNewPassword,setValidatedNewPassword] = useState("")

     const[newPasswordToo,setNewPasswordToo] = useState("")
     const[validatedNewPasswordToo,setValidatedNewPasswordToo] = useState("")



     const navigate = useNavigate()

     const sendInfos = (event:any) => {
         if((email && newPassword && newPasswordToo) === ""){
             event.preventDefault();
             event.stopPropagation();
             setValidatedEmail("is null");
             setValidatedNewPassword("is null")
             setValidatedNewPasswordToo("is null")
             if(email !==""){
                 event.preventDefault();
                 event.stopPropagation();
                 setValidatedEmail("");
             }
             if(newPassword !== ""){
                 event.preventDefault();
                 event.stopPropagation();
                 setValidatedNewPassword("");
             }
             if(newPasswordToo !==""){
                 event.preventDefault();
                 event.stopPropagation();
                 setValidatedNewPasswordToo("")
             }
         }else if(newPassword !== newPasswordToo){
             event.preventDefault();
             event.stopPropagation();
             setValidatedNewPasswordToo("not equal")
             setValidatedNewPassword("not equal")
         }
         else {
             setValidatedEmail("")
             setValidatedNewPassword("")
             setValidatedNewPasswordToo("")
             console.log("enviei e quero o codigo")
             navigate("/two-factors")
         }
     }

    return(
        <>
            <CardLayout title="New password" text="Please enter your new password twice to change it!" imagem="">
                <div>
                    <Form style={{marginTop:"30px",marginLeft:"10px",marginRight:"10px"}} onSubmit={sendInfos} noValidate>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label><RiUser3Line style={{marginRight:"10px"}}/>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter or email" style={validatedEmail !== "" ? {borderColor:"red"}: {borderColor:""}} required onChange={(e)=>setEmail(e.target.value)}/>
                            <div>
                                {validatedEmail === "is null" ? <span style={{color:"red"}}> Please insert a your email</span> : validatedEmail ==="invalid Email" ? <span style={{color:"red"}}> Email is invalid</span> : <></> }
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label><RiLock2Line style={{marginRight:"10px"}}/>New Password</Form.Label>
                            <Form.Control type="password" placeholder="New password" style={validateNewPassword !== "" ? {borderColor:"red"}: {borderColor:""}} required onChange={(e)=>setNewPassword(e.target.value)}/>
                            <div>
                                {validateNewPassword === "is null" ? <span style={{color:"red"}}> Please insert a new password</span> : validateNewPassword ==="not equal" ? <span style={{color:"red"}}> Password is not equal</span> : <></> }
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword2" >
                            <Form.Label><RiLock2Line style={{marginRight:"10px"}}/>Repit new Password</Form.Label>
                            <Form.Control type="password" placeholder="Repit new password" style={validatedNewPasswordToo !== "" ? {borderColor:"red"}: {borderColor:""}}
                                          required onChange={(e)=>setNewPasswordToo(e.target.value)}
                            />
                            <div>
                                {validatedNewPasswordToo === "is null" ? <span style={{color:"red"}}> Please insert a new password</span> : validatedNewPasswordToo ==="not equal" ? <span style={{color:"red"}}> Password is not equal</span> : <></> }
                            </div>
                        </Form.Group>
                        <div style={{margin:"10px"}}>
                            <Row>
                                <Col>
                                    <Link to="/login">Back to Login</Link>
                                </Col>
                            </Row>
                        </div><br/>
                        <div className="d-grid gap-2" style={{marginTop:"20px",marginBottom:"20px"}}>
                            <Button type="submit" style={{backgroundColor:"#C99A6D",borderColor:"#C99A6D"}} disabled={(email && newPassword && newPasswordToo) === ""}>
                                Send code verification
                            </Button>
                        </div>
                    </Form>
                </div>
            </CardLayout>
        </>
    )
}

export default FormForgoutPassword