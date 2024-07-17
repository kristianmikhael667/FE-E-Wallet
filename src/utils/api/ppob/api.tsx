import callAPI from "../axiosWithConfig";

export async function getAllPrefix(phone: string, type: string) {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  let types = type;
  if (types != "data") {
    types = "";
  }
  console.log("panggil types ", types);

  const url = `${ROOT_API}/ppob-service/product/${phone}?type=${types}`;
  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}
