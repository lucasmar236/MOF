import React from "react";
import {Card} from "react-bootstrap";
import styles from "./CardLayout.module.scss"

export const CardLayout = (props:{title:string,text:string,children:any,imagem:string}) => {
    return(
        <>
            <Card style={{width:'35rem',borderRadius:"30px"}}>
                <Card.Body>
                    <div>
                        <h2 style={{margin:"10px"}}><b>{props.title}</b></h2>
                        {props.imagem === "" ? <></> :
                            <div className={styles.imagem}>
                                <img alt={props.imagem} src={props.imagem}/>
                            </div>
                        }
                        <span style={{margin:"10px"}}>{props.text}</span>
                    </div>
                    {props.children}
                </Card.Body>
            </Card>
        </>
    )
}