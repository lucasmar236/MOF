import React from "react";
import { Card } from "react-bootstrap";

export const CardMenu = (props:{children:any}) => {
    return (
        <>
            <Card style={{ width: '20rem', borderRadius: "30px" }}>
                <Card.Body>
                    {props.children}
                </Card.Body>
            </Card>
        </>
    )
}