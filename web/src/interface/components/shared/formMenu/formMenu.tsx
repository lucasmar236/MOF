import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiUser, FiUsers, FiPower } from "react-icons/fi";
import { CardMenu } from "../cardMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Htpp } from "../../../../services/htpp/htppHelper";

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

    const handleLogout = async () => {
        try {
            const resp = await Htpp.post<any>("/logout", {});
            localStorage.removeItem("auth");
            localStorage.removeItem("userName");
            toast.success("Successfuly logged out!");
        } catch (error) {
            toast.error("An error occurred while logging out.");
        }
    };

    return (
        <CardMenu>
            <div style={{ marginLeft: "10px", marginRight: "80px", marginTop: "10px", marginBottom: "10px" }}>
                <Row style={{ marginBottom: "20px" }}>
                    <Col>
                        <Link to="/chats"><FiArrowLeft style={firstItemStyle} /></Link>
                        <Link to="/chats" style={firstItemStyle}>Back to Chats</Link>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                    <Col>
                        <Link to="/profile"><FiUser style={defaultItensStyle} /></Link>
                        <Link to="/profile" style={defaultItensStyle}>Profile</Link>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                    <Col>
                        <Link to="/contacts"><FiUsers style={defaultItensStyle} /></Link>
                        <Link to="/contacts" style={defaultItensStyle}>Contacts</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/login"><FiPower style={defaultItensStyle} onClick={handleLogout}/></Link>
                        <Link to="/login" style={defaultItensStyle} onClick={handleLogout}>Logout</Link>
                    </Col>
                </Row>
            </div>
        </CardMenu>
    );
};

export default FormMenu;