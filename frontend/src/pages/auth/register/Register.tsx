import { useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";
import Alert, { AlertData } from "../../../components/Alert";
import RegisterForm from "./RegisterForm";
import AuthService from "../../../services/auth/AuthService";
import "../../../resize_style.css";

interface Data {
  message: string;
}

const Register = () => {
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alert, setAlert] = useState<AlertData>({
    text: "",
    type: "",
  });

  const handleSubmit = (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => {
    const { req } = AuthService.register({
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    });
    req
      .then((res) => {
        createAlert(res.data.message, "success");
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
    setAlert({
      text: text,
      type: type,
    });
    setAlertVisibility(true);
  };

  return (
    <div className="bg-primary">
      {alertVisibility && (
        <Alert type={alert.type} onClose={() => setAlertVisibility(false)}>
          {alert.text}
        </Alert>
      )}
      <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
        <div className="form_container w-40 p-5 rounded bg-white ">
          <RegisterForm handleSubmitFunc={handleSubmit}></RegisterForm>
        </div>
      </div>
    </div>
  );
};

export default Register;
