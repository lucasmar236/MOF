import React, { useState, useCallback, InputHTMLAttributes } from "react";
import { CardManageUser } from "../../shared/cardManageUser";
import FilterModal from "./filterModal";
import AddContactModal from "./addContactModal";
import CreateCommunityModal from "./createCommunityModal";
import { Button, Col, Form, Row } from "react-bootstrap";
import { TbMailUp } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import { LiaUserSlashSolid } from "react-icons/lia";
import { LuShieldOff } from "react-icons/lu";
import styles from "./formContacts.module.scss"
import contactDefaultPhoto from "../../../../assets/imgs/contactDefaultPhoto.png"
import communityDefaultPhoto from "../../../../assets/imgs/communityDefaultPhoto.jpg"

function FormContacts() {
    const getContacts = { // substituir isso pela request que busca os contatos
        friends: ["João", "Mariana Gonçalves de Freitas da Silva", "Julio", "Julia", "Juliano", "Juliana", "Francisco", "Larissa"],
        blockeds: ["Luana", "Manuel"],
        communitys: ["JOBS", "Grupo 2"]
    };

    // filtros
    const [showModalContacts, setShowModalContacts] = useState(false);
    const [showModalCommunitys, setShowModalCommunitys] = useState(false);

    const handleFilterClickContacts = () => {
        setShowModalContacts(true);
    };

    const handleFilterClickCommunitys = () => {
        setShowModalCommunitys(true);
    };

    const handleCloseModalContacts = () => {
        setShowModalContacts(false);
    };

    const handleCloseModalCommunitys = () => {
        setShowModalCommunitys(false);
    };

    // add contacts e create community
    const [showModalAddContact, setShowModalAddContact] = useState(false);
    const [showModalCreateCommunity, setShowModalCreateCommunity] = useState(false);

    const handleAddContact = () => {
        setShowModalAddContact(true);
    };

    const handleCreateCommunity = () => {
        setShowModalCreateCommunity(true);
    };

    const handleCloseModalAddContact = () => {
        setShowModalAddContact(false);
    };

    const handleCloseModalCreateCommunity = () => {
        setShowModalCreateCommunity(false);
    };


    return (
        <>
            <CardManageUser title=''>
                <Row style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Col>
                        <h2 className={styles.title}>
                            <b>Contacts</b>
                            <LuFilter size={25} className={styles.filter} onClick={handleFilterClickContacts} />
                        </h2>
                        <ul className={styles.ulStyle}>
                            {getContacts.friends.map((contact, index) => (
                                <li key={index} className={styles.contactItem}>
                                    <div className={styles.contactContainer}>
                                        <img alt="Foto do contato" src={contactDefaultPhoto} />
                                        <div>{contact}</div>
                                    </div>
                                    <div className={styles.iconsContainer}>
                                        <TbMailUp size={20}/>
                                        <IoMdClose size={20}/> 
                                    </div>
                                </li>
                            ))}
                            {getContacts.blockeds.map((blocked, index) => (
                                <li key={index} className={styles.contactItem}>
                                    <div className={styles.blockedContainer}>
                                        <img alt="Foto do contato bloqueado" src={contactDefaultPhoto} />
                                        <span><LuShieldOff size={25}/></span>
                                        <div>{blocked}</div>
                                    </div>
                                    <div className={styles.blockedIconContainer}>
                                        <LiaUserSlashSolid size={20}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.addContactCommunityButton}>
                            <span onClick={handleAddContact}>Add contact</span>
                        </div>
                    </Col>
                    <Col>
                        <h2 className={styles.title}>
                            <b>Communitys</b>
                            <LuFilter size={25} className={styles.filter} onClick={handleFilterClickCommunitys} />
                        </h2>
                        <ul className={styles.ulStyle}>
                            {getContacts.communitys.map((community, index) => (
                                <li key={index} className={styles.contactItem}>
                                    <div className={styles.contactContainer}>
                                        <img alt="Foto da comunidade" src={communityDefaultPhoto} />
                                        <div>{community}</div>
                                    </div>
                                    <div className={styles.iconsContainer}>
                                        <TbMailUp size={20}/>
                                        <IoMdClose size={20}/> 
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.addContactCommunityButton}>
                            <span onClick={handleCreateCommunity}>Create community</span>
                        </div>
                    </Col>
                </Row>
            </CardManageUser>
            <FilterModal show={showModalContacts} onHide={handleCloseModalContacts} placeholder="Search Contact" showBlockedUsersButton={true} />
            <FilterModal show={showModalCommunitys} onHide={handleCloseModalCommunitys} placeholder="Search Community" showBlockedUsersButton={false} />
            <AddContactModal show={showModalAddContact} onHide={handleCloseModalAddContact} />
            <CreateCommunityModal show={showModalCreateCommunity} onHide={handleCloseModalCreateCommunity} />
        </>
    )
}

export default FormContacts;