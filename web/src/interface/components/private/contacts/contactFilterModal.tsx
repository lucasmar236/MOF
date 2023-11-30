import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../../services/hooks";
import { requestListContacts } from "../../../../services/redux/contacts/listContactsSlice";
import { requestListBlockeds } from "../../../../services/redux/blockeds/listBlockedsSlice";

interface ContactFilterModalProps {
    show: boolean;
    onHide: () => void;
    placeholder: string;
    onShowBlockedUsersToggle: (showBlocked: boolean) => void;
}

const ContactFilterModal: React.FC<ContactFilterModalProps> = ({ show, onHide, placeholder, onShowBlockedUsersToggle }) => {
    const [searchText, setSearchText] = useState("");
    const [blockedUsers, setBlockedUsers] = useState(false);
    const [localShowBlockedUsersButton, setLocalShowBlockedUsersButton] = useState(blockedUsers);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleBlockedUsersToggle = () => {
        setBlockedUsers(!blockedUsers);
        setLocalShowBlockedUsersButton(!blockedUsers);    
    };

    const dispatch = useAppDispatch();

    const handleSendFilter = () => {
        dispatch(requestListContacts(searchText));
        if (blockedUsers) {
            dispatch(requestListBlockeds());
        }
        onShowBlockedUsersToggle(localShowBlockedUsersButton);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered={true}>
            <Modal.Header closeButton style={{ border: 'none' }}>
                <Modal.Title>Filter</Modal.Title>
            </Modal.Header >
            <Modal.Body style={{ marginLeft: '10px'}}>
                <Form>
                    <Form.Label style={{ marginBottom: '20px', fontWeight: 'bold'}}>Select the desired filters:</Form.Label>
                    {
                        <Form.Group style={{ marginBottom: '10px'}}controlId="formBlockedUsers">
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Show Blocked Users"
                                checked={blockedUsers}
                                onChange={handleBlockedUsersToggle}
                            />
                        </Form.Group>
                    }
                    <Form.Group controlId="formSearchContact">
                        <Form.Control
                            type="text"
                            placeholder={placeholder}
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ border: 'none', gap: '10px' }}>
                <Button type="submit" style={{ width: "10rem", backgroundColor: "#D44747", borderColor: "#D44747", borderRadius: "25px" }} onClick={onHide}>
                    Cancel
                </Button>
                <Button type="submit" style={{ width: "10rem", backgroundColor: "#6CC04F", borderColor: "#6CC04F", borderRadius: "25px" }} onClick={handleSendFilter}> 
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ContactFilterModal;