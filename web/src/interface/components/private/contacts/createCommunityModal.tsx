import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import communityDefaultPhoto from "../../../../assets/imgs/communityDefaultPhoto.jpg"

interface AddCommunityProps {
    show: boolean;
    onHide: () => void;
}

const CreateCommunityModal: React.FC<AddCommunityProps> = ({ show, onHide }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };


    return (
        <Modal show={show} onHide={onHide} centered={true}>
            <Modal.Header closeButton style={{ border: 'none' }}>
                <Modal.Title>Create Community</Modal.Title>
            </Modal.Header >
            <Modal.Body style={{ marginLeft: '10px'}}>
                <Form>
                    <Form.Label style={{ marginBottom: '20px'}}>Create your community to chat with your friends</Form.Label>
                    <Row style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Col>
                            <img alt="Foto da comunidade" src={communityDefaultPhoto} style={{ width:'150px', height:'150px', borderRadius:'50%' }}/>
                            <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px'}}>Community Image</Form.Label>
                        </Col>
                        <Col>
                    
                        </Col>
                    </Row>

                    {/* <Form.Group controlId="formAddContact" >
                        <Form.Control
                            type="text"
                            placeholder="Type the username"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </Form.Group> */}
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

export default CreateCommunityModal;