import React, { useEffect, useState } from "react";
import { CardLayout } from "../../shared/cardLayout";
import lock from "../../../../assets/imgs/lock.png";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputFactors from "./inputFactors";
import { useAppDispatch } from "../../../../services/hooks";
import { useSelector } from "react-redux";
import {
  requestCodeVerifyChangePass,
  resetStateChangePassCodeVerify,
} from "../../../../services/redux/authentication/codeVerifyChangePassSLice";
import {
  requestCodeVerify,
  resetStateCodeVerify,
} from "../../../../services/redux/authentication/codeVerifySLice";
import {
  requestCreaUserCodeVerify,
  resetStateCreateUserVerify,
} from "../../../../services/redux/authentication/CreateUserCodeVerifySLice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormTwoFactor() {
  const {
    successCode,
    errorCode,
    loadingCode,
    codeVerify,

    codeVerifyChangePass,
    successCodeChangePass,
    errorCodeChangePass,

    CreateUserCodeVerify,
    CreateUserSuccessCode,
    CreateUserErrorCode,
  } = useSelector((state: any) => ({
    successCode: state.codeVerifySlice.successCode,
    errorCode: state.codeVerifySlice.errorCode,
    loadingCode: state.codeVerifySlice.loadingCode,
    codeVerify: state.codeVerifySlice.codeVerify,

    successCodeChangePass:
      state.codeVerifyChangePassSlice.successCodeChangePass,
    errorCodeChangePass: state.codeVerifyChangePassSlice.errorCodeChangePass,
    codeVerifyChangePass: state.codeVerifyChangePassSlice.codeVerifyChangePass,

    CreateUserSuccessCode:
      state.CreateUsercodeVerifySlice.CreateUserSuccessCode,
    CreateUserErrorCode: state.CreateUsercodeVerifySlice.CreateUserErrorCode,
    CreateUserCodeVerify: state.CreateUsercodeVerifySlice.CreateUserCodeVerify,
  }));

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const [code, setCode] = useState("");
  const [invalidCode, setInvalidCode] = useState(false);

  const sendCode = () => {
    let codeVerify = {
      code: code,
    };
    if (location.state === "forgotPassword") {
      dispatch(requestCodeVerifyChangePass(codeVerify));
    } else if (location.state === "createUser") {
      dispatch(requestCreaUserCodeVerify(codeVerify));
    } else {
      dispatch(requestCodeVerify(codeVerify));
    }
  };
  useEffect(() => {
    if (successCode === "Usuário logado com sucesso!") {
      localStorage.setItem("auth", codeVerify.access_token);
      navigate("/chats", { state: "codeSuccess" });
    }
    if (successCodeChangePass === "Usuário logado com sucesso!") {
      localStorage.setItem("auth", codeVerifyChangePass.access_token);
      navigate("/chats", { state: "codeSuccess" });
    }
    if (CreateUserSuccessCode === "Usuário logado com sucesso!") {
      localStorage.setItem("auth", CreateUserCodeVerify.access_token);
      navigate("/chats", { state: "codeSuccess" });
    }

    if (
      errorCode.message ||
      errorCodeChangePass.message ||
      CreateUserErrorCode.message === "Code invalid"
    ) {
      toast.error("Code invalid", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetStateCodeVerify());
      dispatch(resetStateChangePassCodeVerify());
      dispatch(resetStateCreateUserVerify());
    }
  }, [
    successCode,
    errorCode,
    successCodeChangePass,
    errorCodeChangePass,
    CreateUserErrorCode,
    CreateUserSuccessCode,
  ]);

  return (
    <>
      <CardLayout
        title="Dual-factor authentication"
        text="Please enter the code sent to your registered email below!"
        imagem={lock}
      >
        <br />
        <div
          style={{ marginTop: "30px", marginLeft: "10px", marginRight: "10px" }}
        >
          <Form
            style={{
              marginTop: "30px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <InputFactors verifyCode={setCode} />
            <div style={{ margin: "10px" }}>
              <Row>
                <Col>
                  <Link to="">Send the code again</Link>
                </Col>
              </Row>
            </div>
            <br />
            <div
              className="d-grid gap-2"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <Button
                onClick={sendCode}
                style={{ backgroundColor: "#C99A6D", borderColor: "#C99A6D" }}
              >
                Verification code
              </Button>
            </div>
          </Form>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </CardLayout>
    </>
  );
}

export default FormTwoFactor;
