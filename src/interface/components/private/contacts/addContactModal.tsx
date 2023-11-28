import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddContactProps {
    show: boolean;
    onHide: () => void;
}

const AddContactModal: React.FC<AddContactProps> = ({ show, onHide }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };


    return (
        <Modal show={show} onHide={onHide} centered={true}>
            <Modal.Header closeButton style={{ border: 'none' }}>
                <Modal.Title>Add contacts</Modal.Title>
            </Modal.Header >
            <Modal.Body style={{ marginLeft: '10px'}}>
                <Form>
                    <Form.Label style={{ marginBottom: '20px'}}>Enter your friend's username to get in touch!</Form.Label>
                    <Form.Group controlId="formAddContact" >
                        <Form.Control
                            type="text"
                            placeholder="Type the username"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ border: 'none', marginTop: '30px', gap: '10px'}}>
                <Button type="submit" style={{ width: "10rem", backgroundColor: "#D44747", borderColor: "#D44747", borderRadius: "25px" }} onClick={onHide}>
                    Cancel
                </Button>
                <Button type="submit" style={{ width: "10rem", backgroundColor: "#6CC04F", borderColor: "#6CC04F", borderRadius: "25px" }}>
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddContactModal;