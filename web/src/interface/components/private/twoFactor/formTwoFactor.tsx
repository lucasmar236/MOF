import React, {useEffect, useState} from "react";
import {CardLayout} from "../../shared/cardLayout";
import lock from "../../../../assets/imgs/lock.png"
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import InputFactors from "./inputFactors";
import {useAppDispatch} from "../../../../services/hooks";
import {codeVerifySlice, requestCodeVerify} from "../../../../services/redux/authentication/codeVerifySLice";
import {useSelector} from "react-redux";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
function FormTwoFactor(){

    const { successCode,errorCode,loadingCode,codeVerify} = useSelector((state:any)=>({
        successCode: state.codeVerifySlice.successCode,
        errorCode: state.codeVerifySlice.errorCode,
        loadingCode: state.codeVerifySlice.loadingCode,
        codeVerify: state.codeVerifySlice.codeVerify
    }))

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const location = useLocation()

    const [code,setCode] = useState("")
    const [invalidCode,setInvalidCode] = useState(false)
    const sendCode = () =>{
        // if(location.state === "forgotPassword"){
        //     console.log("forgotPassword")
        // }else if(location.state === "create-account"){
        //     console.log("create-account")
        // }else{
        //     console.log("Login")
        // }
        let codeVerify = {
            code: code
        }
        dispatch(requestCodeVerify(codeVerify))
    }
    useEffect(() => {
        if(successCode === "Usuário logado com sucesso!"){
            localStorage.setItem("auth",codeVerify.access_token)
            setInvalidCode(false)
            navigate("/chats", {state:"codeSuccess"})
        }
        if(errorCode === "Erro ao verificar codigo!"){
            setInvalidCode(true)
        }
    }, [successCode,errorCode]);



    return(
        <>
        <CardLayout title="Dual-factor authentication" text="Please enter the code sent to your registered email below!" imagem={lock}><br/>
            {invalidCode ?
                <Alert variant="danger">
                    Invalid code! </Alert>
                : <></>}
            <div style={{marginTop:"30px",marginLeft:"10px",marginRight:"10px"}}>
                <Form style={{marginTop:"30px",marginLeft:"10px",marginRight:"10px"}}>
                   <InputFactors verifyCode={setCode}/>
                    <div style={{margin:"10px"}}>
                        <Row>
                            <Col>
                                <Link to="">Send the code again</Link>
                            </Col>
                        </Row>
                    </div><br/>
                    <div className="d-grid gap-2" style={{marginTop:"20px",marginBottom:"20px"}}>
                        <Button onClick={sendCode} style={{backgroundColor:"#C99A6D",borderColor:"#C99A6D"}}>
                           Verification code
                        </Button>
                    </div>
                </Form>
            </div>
        </CardLayout>
        </>
    )

}

export default FormTwoFactor