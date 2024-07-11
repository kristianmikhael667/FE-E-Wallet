import callAPI from "../axiosWithConfig";
import { LoginByPinType, RegisterType } from "./types";

export async function userLogin(data: LoginByPinType) {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const url = `${ROOT_API}/user-service/loginbypin`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function userRegister(data: RegisterType) {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const url = `${ROOT_API}/users/customer`;
  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function merchantRegister(data: RegisterType) {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const url = `${ROOT_API}/users/merchant`;
  return callAPI({
    url,
    method: "POST",
    data,
  });
}
