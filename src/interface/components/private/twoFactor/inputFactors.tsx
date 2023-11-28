import React, {useEffect, useState} from "react";
import {Col, Form, InputGroup, Row} from "react-bootstrap";

function InputFactors(props:{verifyCode:any}){

    const [code1,setCode1] = useState("")
    const [code2,setCode2] = useState("")
    const [code3,setCode3] = useState("")
    const [code4,setCode4] = useState("")
    const [code5,setCode5] = useState("")
    const [code6,setCode6] = useState("")



    useEffect(()=>{
        if((code1 && code2 && code3 && code4 && code5 && code6) !== "") {
            let completeCode = code1.concat(code2).concat(code3).concat(code4).concat(code5).concat(code6)
            props.verifyCode(completeCode.toString())
        }
    },[code1,code2,code3,code4,code5,code6])
    return(
        <div>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder=""
                            style={{textAlign:"center"}}
                            maxLength={1}
                            onChange={(e)=> setCode1(e.target.value)} />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder=""
                            style={{textAlign:"center"}}
                            maxLength={1}
                            onChange={(e)=> setCode2(e.target.value)} />
                    </InputGroup>
                </Col>
                <Col >
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder=""
                            style={{textAlign:"center"}}
                            maxLength={1}
                            onChange={(e)=> setCode3(e.target.value)} />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder=""
                            style={{textAlign:"center"}}
                            maxLength={1}
                            onChange={(e)=> setCode4(e.target.value)} />

                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder=""
                            style={{textAlign:"center"}}
                            maxLength={1}
                            onChange={(e)=> setCode5(e.target.value)} />

                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder=""
                            style={{textAlign:"center"}}
                            maxLength={1}
                            onChange={(e)=> setCode6(e.target.value)} />
                    </InputGroup>
                </Col>
            </Row>
        </div>
    )
}

export default InputFactors