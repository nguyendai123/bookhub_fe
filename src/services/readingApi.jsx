import axios from "axios";
import Cookies from "js-cookie";

const API = "http://localhost:8080/api/reading";

const headers = () => ({
  Authorization: `Bearer ${Cookies.get("jwt_token")}`,
});

export const addToShelf = (payload) =>
  axios.post(`${API}/add`, payload, { headers: headers() });

export const updateReadingProgress = (payload) =>
  axios.post(`${API}/update`, payload, { headers: headers() });

export const getMyReadingShelf = () => axios.get(API, { headers: headers() });
