import callAPI from "../axiosWithConfig";

export async function getAllBanner() {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const url = `${ROOT_API}/banner-service/banners`;
  return callAPI({
    url,
    method: "GET",
    token: false,
  });
}
