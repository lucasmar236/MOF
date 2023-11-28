import React from "react";
import {Card} from "react-bootstrap";
import styles from "./CardManageUser.module.scss"

export const CardManageUser = (props:{title:string,children:any}) => {
    return(
        <>
            <Card className={styles.card}>
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