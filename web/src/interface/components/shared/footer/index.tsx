import React from "react";
import styles from "./Footer.module.scss"
import png from "./footer.png"
function Footer(props : {title:string,text:string,name1:string,link1:string,name2:string ,link2: string,name3:string,link3:string}){

    return(
        <>
            <footer className={styles.footer}>
                <span style={{color:"#d29712"}}><b>{props.title}</b></span>
                <div>
                    <span>{props.text}</span>
                    <a href={props.link1}>{props.name1}</a>
                    <a href={props.link2}>{props.name2}</a>
                   <a href={props.link3}>{props.name3}</a>
                </div>
            </footer>
        </>
    )
}

export default Footer