import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const loginURL = "/api/auth/login";
const registerURL = "/api/auth/register";

class AuthService {
  login(body: LoginData) {
    const controller = new AbortController();
    const req = axios.post(loginURL, body, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return { req, cancel: () => controller.abort() };
  }

  register(body: RegisterData) {
    const controller = new AbortController();
    const req = axios.post(registerURL, body, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return { req, cancel: () => controller.abort() };
  }
}

export default new AuthService();

// export default create("/api/user");
