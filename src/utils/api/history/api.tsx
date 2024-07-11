import callAPI from "../axiosWithConfig";

export async function getHistory(currentPage: number) {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const url = `${ROOT_API}/wallet-service/history?p=${currentPage}`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}
