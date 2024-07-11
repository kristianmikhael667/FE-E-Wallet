import callAPI from "../axiosWithConfig";

export async function getAllMenu() {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const url = `${ROOT_API}/picture-service/pictures`;
  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}
