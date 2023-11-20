import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiUser, FiUsers, FiPower } from "react-icons/fi";
import { CardMenu } from "../../shared/cardMenu";

function FormMenu() {
    const firstItemStyle = {
        textDecoration: 'none',
        color: 'black',
        marginLeft: '10px',
        fontSize: '1.4em',
        fontWeight: 'bold',
        verticalAlign: 'middle'
    };

    const defaultItensStyle = {
        textDecoration: 'none',
        color: 'black',
        marginLeft: '10px',
        verticalAlign: 'middle'
    };

    return (
        <CardMenu>
            <div style={{marginLeft:"10px", marginRight: "80px", marginTop: "10px", marginBottom: "10px"}}>
                <Row style={{marginBottom: "20px"}}>
                    <Col>
                        <Link to="/chats"><FiArrowLeft style={firstItemStyle}/></Link>
                        <Link to="/chats" style={firstItemStyle}>Back to Chats</Link>
                    </Col>
                </Row>
                <Row style={{marginBottom: "20px"}}>
                    <Col>
                        <Link to="/profile"><FiUser style={defaultItensStyle}/></Link> 
                        <Link to="/profile" style={defaultItensStyle}>Profile</Link>
                    </Col>
                </Row>
                <Row style={{marginBottom: "20px"}}>
                    <Col>
                        <Link to="/contacts"><FiUsers style={defaultItensStyle}/></Link> 
                        <Link to="/contacts" style={defaultItensStyle}>Contacts</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/contacts"><FiPower style={defaultItensStyle}/></Link> 
                        <Link to="/login" style={defaultItensStyle}>Logout</Link>
                    </Col>
                </Row>
            </div>
        </CardMenu>
    );
};

export default FormMenu;