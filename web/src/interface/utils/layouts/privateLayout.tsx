import React from "react"
import Footer from  "../../components/shared/footer"
import {Container, Stack} from "react-bootstrap";
import NavbarHeader from "../../components/shared/navbar";
import styles from "./Public.module.scss"
const PrivateLayout = (props:{children: any,data: any}) => {
    return(
        <Container className={styles.container}>
            <Stack gap={2}>
                <div className="p-2">
                    <NavbarHeader title="Mof" username={props.data.username} avatar="" classname="" />
                </div>
                <div className="p-5 mx-auto" style={{marginTop:"3%"}}>
                    {props.children}
                </div>
            </Stack>
            <Footer title="Mof" text="Desenvolvido por" name1="Arthur Jesus" link1="" name2="Lucas Chaves" link2="" name3="Lucas Sordi" link3=""/>
        </Container>
    )
}

export default PrivateLayout