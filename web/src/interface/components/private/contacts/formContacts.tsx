import React, { useState, useCallback, InputHTMLAttributes } from "react";
import { CardManageUser } from "../../shared/cardManageUser";
import ContactFilterModal from "./contactFilterModal";
import CommunityFilterModal from "./communityFilterModal";
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
import { useSelector } from "react-redux";
import { requestListContacts } from "../../../../services/redux/contacts/listContactsSlice";
import { useAppDispatch } from "../../../../services/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Htpp } from "../../../../services/htpp/htppHelper";

function FormContacts() {
    const dispatch = useAppDispatch();

    const { contacts, contactsSuccess, contactsError, contactsLoading } =
        useSelector((state: any) => ({
            contacts: state.listContactsSlice.contacts,
            contactsSuccess: state.listContactsSlice.contactsSuccess,
            contactsError: state.listContactsSlice.contactsError,
            contactsLoading: state.listContactsSlice.contactsLoading,
        }));

    const { blockeds, blockedsSuccess, blockedsError, blockedsLoading } =
        useSelector((state: any) => ({
            blockeds: state.listBlockedsSlice.blockeds,
            blockedsSuccess: state.listBlockedsSlice.blockedsSuccess,
            blockedsError: state.listBlockedsSlice.blockedsError,
            blockedsLoading: state.listBlockedsSlice.blockedsLoading,
        }));

    const communitys: any[] = [];

    // filtros
    const [showModalContacts, setShowModalContacts] = useState(false);
    const [showModalCommunitys, setShowModalCommunitys] = useState(false);
    const [showBlockedUsers, setShowBlockedUsers] = useState(false);

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

    const handleShowBlockedUsersToggle = (showBlocked: boolean) => {
        setShowBlockedUsers(showBlocked);
    };

    // add contacts e create community
    const [showModalAddContact, setShowModalAddContact] = useState(false);
    const [showModalCreateCommunity, setShowModalCreateCommunity] = useState(false);

    const handleAddContact = () => {
        setShowModalAddContact(true);
    };

    /* const handleCreateCommunity = () => {
        setShowModalCreateCommunity(true);
    }; */

    const handleCloseModalAddContact = () => {
        setShowModalAddContact(false);
    };

    const handleCloseModalCreateCommunity = () => {
        setShowModalCreateCommunity(false);
    };

    const handleContactAdded = useCallback(() => {
        dispatch(requestListContacts(""));
    }, []);


    const handleRemoveContact = async (user: string) => {
        try {
            const resp = await Htpp.delete<any>(`/contacts?username=${user}`);
            toast.success("Contact deleted successfully!");
        } catch (error) {
            toast.error("An error has occurred. Contact has not been removed");
        } finally {
            dispatch(requestListContacts(""));
        }
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
                            {contacts.contacts === undefined ? (
                                <p></p>
                            ) : (
                                contacts.contacts.map((contact: any, index: any) => (
                                    <li key={index} className={styles.contactItem}>
                                        <div className={styles.contactContainer}>
                                            <img alt="Foto do contato" src={contactDefaultPhoto} />
                                            <div>{contact.username}</div>
                                        </div>
                                        <div className={styles.iconsContainer}>
                                            <TbMailUp size={20} className={styles.iconStyle} />
                                            <IoMdClose size={20} className={styles.iconStyle} onClick={() => handleRemoveContact(contact.username)}/>
                                        </div>
                                    </li>
                                )))}

                            {blockeds.blockeds === undefined ? (
                                <p></p>
                            ) : (
                                showBlockedUsers && blockeds.blockeds.map((blocked: any, index: any) => (
                                    <li key={index} className={styles.contactItem}>
                                        <div className={styles.blockedContainer}>
                                            <img alt="Foto do contato bloqueado" src={contactDefaultPhoto} />
                                            <span><LuShieldOff size={25} /></span>
                                            <div>{blocked.username}</div>
                                        </div>
                                        <div className={styles.blockedIconContainer}>
                                            <LiaUserSlashSolid size={20} className={styles.iconStyle} />
                                        </div>
                                    </li>
                                )))}
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
                            {communitys.map((community, index) => (
                                <li key={index} className={styles.contactItem}>
                                    <div className={styles.contactContainer}>
                                        <img alt="Foto da comunidade" src={communityDefaultPhoto} />
                                        <div>{community}</div>
                                    </div>
                                    <div className={styles.iconsContainer}>
                                        <TbMailUp size={20} className={styles.iconStyle} />
                                        <IoMdClose size={20} className={styles.iconStyle} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/*                         <div className={styles.addContactCommunityButton}>
                            <span onClick={handleCreateCommunity}>Create community</span>
                        </div> */}
                    </Col>
                </Row>
            </CardManageUser>
            <ContactFilterModal show={showModalContacts} onHide={handleCloseModalContacts} placeholder="Search Contact" onShowBlockedUsersToggle={handleShowBlockedUsersToggle} />
            <CommunityFilterModal show={showModalCommunitys} onHide={handleCloseModalCommunitys} placeholder="Search Community" />
            <AddContactModal show={showModalAddContact} onHide={handleCloseModalAddContact} onContactAdded={handleContactAdded} />
            <CreateCommunityModal show={showModalCreateCommunity} onHide={handleCloseModalCreateCommunity} />
        </>
    )
}

export default FormContacts;