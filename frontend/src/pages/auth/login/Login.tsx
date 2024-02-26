import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosResponse, CanceledError } from "axios";

import AuthService from "../../../services/auth/AuthService";
import LoginForm from "./LoginForm";
import Alert, { AlertData } from "../../../components/Alert";
import "../../../resize_style.css";

interface Data {
  message: string;
}

const Login = () => {
  const [alertVisibility, setAlertVisibility] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertData>({
    text: "",
    type: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (email: string, password: string) => {
    const { req } = AuthService.login({
      email: email,
      password: password,
    });
    req
      .then((res: AxiosResponse) => {
        navigate("/Home", { replace: true });
      })
      .catch((err) => {
        if (!(err instanceof CanceledError)) {
          if (axios.isAxiosError(err)) {
            if (err.response?.data.message) {
              createAlert(err.response?.data.message, "danger");
            } else {
              createAlert(
                `Error: ${err.response?.status} - ${err.response?.statusText}`,
                "danger"
              );
            }
          } else {
            let data: Data = err.response.data as Data;
            createAlert(data.message, "danger");
          }
        }
      });
  };

  const createAlert = (text: string, type: string) => {
    if (!text) {
      text = "Somthing goes wrong...";
    }
    setAlertVisibility(true);
    setAlert({
      text: text,
      type: type,
    });
  };

  return (
    <div className="bg-primary">
      {alertVisibility && (
        <Alert
          type="danger"
          onClose={() => {
            setAlertVisibility(false);
          }}
        >
          {alert.text}
        </Alert>
      )}
      <div className="d-flex justify-content-center align-items-center w-100 vh-100">
        <div className="form_container w-40 p-5 rounded bg-white">
          <LoginForm handleSubmitFunc={handleSubmit}></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
