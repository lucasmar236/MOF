import React from "react";
import styles from "./Navbar.module.scss"
import {Link} from "react-router-dom";
import {Navbar,Container} from "react-bootstrap";

function NavbarHeader(props:{title:string,username:string,avatar:string,classname:string}) {
    return(
        <>
            <Navbar className={styles.nav} fixed="top">
                <Container>
                    <Navbar.Brand className={styles.logo}>{props.title}</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        {props.username !== "" ?
                            <Navbar.Text>
                                <a href="/profile">{props.username}</a>
                            </Navbar.Text>
                            : <></>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarHeader