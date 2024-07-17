import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
}

function isTokenExpired(token: string) {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      console.error("Token does not have an exp field");
      return true;
    }

    const currentTime = Date.now() / 1000; // Waktu saat ini dalam detik
    return decodedToken.exp < currentTime;
  } catch (e) {
    console.error("Token decoding error:", e);
    return true;
  }
}

export default async function callAPI({
  url,
  method,
  data,
  token,
}: CallAPIProps) {
  let headers = {};

  if (token) {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      const jwtToken = atob(tokenCookies);
      if (!isTokenExpired(jwtToken)) {
        headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
      } else {
        Cookies.remove("token");
        window.location.reload();
      }
    }
  }
  const respon = await axios({
    url,
    method,
    data,
    headers,
  }).catch((err) => err.response);

  if (respon.status == 401) {
    Cookies.remove("token");
    window.location.reload();
  }

  if (
    respon.status == 400 ||
    respon.status == 403 ||
    respon.status == 404 ||
    respon.status == 500
  ) {
    const res = {
      error: true,
      statusCode: respon.status,
      message: respon.data.message,
      data: null,
    };
    return res;
  }

  const length = Object.keys(respon.data).length;

  const res = {
    error: false,
    statusCode: respon.status,
    message: "success",
    data: length > 1 ? respon.data : respon.data.data,
  };
  return res;
}
