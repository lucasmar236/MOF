import React from "react";
import {Card} from "react-bootstrap";

export const CardManageUser = (props:{title:string,children:any}) => {
    return(
        <>
            <Card style={{width:'100%',borderRadius:"30px"}}>
                <Card.Body>
                    <div>
                        <h2 style={{margin:"10px"}}><b>{props.title}</b></h2>
                    </div>
                    {props.children}
                </Card.Body>
            </Card>
        </>
    )
}