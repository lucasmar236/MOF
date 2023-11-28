import React from "react";
import styles from "./Navbar.module.scss"
import {Link} from "react-router-dom";
import {Navbar, Container, Image} from "react-bootstrap";

function NavbarHeader(props:{title:string,username:string,avatar:string,classname:string}) {
    return(
        <>
            <Navbar className={styles.nav} fixed="top">
                <Container>
                    <Navbar.Brand className={styles.logo}>{props.title}</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        {props.username !== "" ?
                            <div>
                            <Navbar.Text>
                                <a href="/profile">{props.username}</a>
                            </Navbar.Text>
                            <Image style={{margin:"10px"}} src="holder.js/171x180" roundedCircle />
                            </div>
                            : <></>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarHeader