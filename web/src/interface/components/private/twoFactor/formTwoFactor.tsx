import React, {useState} from "react";
import {CardLayout} from "../../shared/cardLayout";
import lock from "../../../../assets/imgs/lock.png"
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import InputFactors from "./inputFactors";
function FormTwoFactor(){

    const [code,setCode] = useState("")

    const sendCode = () =>{
        console.log(code)
    }

    return(
        <>
        <CardLayout title="Dual-factor authentication" text="Please enter the code sent to your registered email below!" imagem={lock}>
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