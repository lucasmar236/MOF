import React, { useEffect, useState } from "react";
import { CardLayout } from "../../shared/cardLayout";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RiLock2Line, RiMailLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { verifyInputs } from "../../../utils/functions/allFunctionsSend";
import { useAppDispatch } from "../../../../services/hooks";
import { requestChangePassword } from "../../../../services/redux/changePassword/changePassSlice";
import { useSelector } from "react-redux";

function FormForgoutPassword() {
  const { successInfos, errorInfos } = useSelector((state: any) => ({
    successInfos: state.infosChangePassSlice.successInfos,
    errorInfos: state.infosChangePassSlice.errorInfos,
  }));

  const [email, setEmail] = useState("");
  const [validatedEmail, setValidatedEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [validateNewPassword, setValidatedNewPassword] = useState("");

  const [newPasswordToo, setNewPasswordToo] = useState("");
  const [validatedNewPasswordToo, setValidatedNewPasswordToo] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const verifyInfos = (event: any) => {
    let regex = "@";
    let resp = email.search(regex);

    if (resp === -1) {
      verifyInputs(event);
      setValidatedEmail("invalid Email");
    } else {
      setValidatedEmail("");
    }

    if (newPassword !== newPasswordToo) {
      verifyInputs(event);
      setValidatedNewPasswordToo("not equal");
      setValidatedNewPassword("not equal");
    } else {
      setValidatedNewPassword("");
      setValidatedNewPasswordToo("");
    }

    let data = {
      email: email,
      new_pass: newPassword,
      confirm_pass: newPasswordToo,
    };
    dispatch(requestChangePassword(data));
  };

  useEffect(() => {
    if (successInfos === "sucesso") {
      navigate("/two-factors", { state: "forgotPassword" });
    }
  }, [successInfos, errorInfos]);

  //   const sendInfos = (resp: number) => {
  //     if (resp === 1 && newPassword === newPasswordToo) {

  //       //   navigate("/two-factors", { state: "forgotPassword" });
  //     }
  //   };

  return (
    <>
      <CardLayout
        title="New password"
        text="Please enter your new password twice to change it!"
        imagem=""
      >
        <div>
          <Form
            style={{
              marginTop: "30px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
            noValidate
          >
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>
                <RiMailLine style={{ marginRight: "10px" }} />
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter or email"
                style={
                  validatedEmail !== ""
                    ? { borderColor: "red" }
                    : { borderColor: "" }
                }
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                {validatedEmail === "invalid Email" ? (
                  <span style={{ color: "red" }}> Email is invalid</span>
                ) : (
                  <></>
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>
                <RiLock2Line style={{ marginRight: "10px" }} />
                New Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="New password"
                style={
                  validateNewPassword !== ""
                    ? { borderColor: "red" }
                    : { borderColor: "" }
                }
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div>
                {validateNewPassword === "not equal" ? (
                  <span style={{ color: "red" }}> Password is not equal</span>
                ) : (
                  <></>
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword2">
              <Form.Label>
                <RiLock2Line style={{ marginRight: "10px" }} />
                Repeat new Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat new password"
                style={
                  validatedNewPasswordToo !== ""
                    ? { borderColor: "red" }
                    : { borderColor: "" }
                }
                required
                onChange={(e) => setNewPasswordToo(e.target.value)}
              />
              <div>
                {validatedNewPasswordToo === "not equal" ? (
                  <span style={{ color: "red" }}> Password is not equal</span>
                ) : (
                  <></>
                )}
              </div>
            </Form.Group>
            <div style={{ margin: "10px" }}>
              <Row>
                <Col>
                  <Link to="/login">Back to Login</Link>
                </Col>
              </Row>
            </div>
            <br />
            <div
              className="d-grid gap-2"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <Button
                style={{ backgroundColor: "#C99A6D", borderColor: "#C99A6D" }}
                disabled={(email && newPassword && newPasswordToo) === ""}
                onClick={verifyInfos}
              >
                Send code verification
              </Button>
            </div>
          </Form>
        </div>
      </CardLayout>
    </>
  );
}

export default FormForgoutPassword;
