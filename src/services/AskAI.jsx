import axios from "axios";
import Cookies from "js-cookie";

const AI_BASE = "https://bookhub-postgress.onrender.com/api";
const headers = () => ({
  Authorization: `Bearer ${Cookies.get("jwt_token")}`,
});
console.log("AI_BASE", `Bearer ${Cookies.get("jwt_token")}`);
export const recommendations = () =>
  axios.get(`${AI_BASE}/ai/recommendations`, { headers: headers() });

export const summarizeChapter = (payload) =>
  axios.post(`${AI_BASE}/ai/summary`, payload, { headers: headers() });

export const askAI = (payload) =>
  axios.post(`${AI_BASE}/ai/interaction`, payload, { headers: headers() });

export const getChatHistory = (bookId) =>
  axios.get(`${AI_BASE}/ai/interaction`, {
    params: { bookId },
    headers: headers(),
  });

export const createHighlight = (payload) =>
  axios.post(`${AI_BASE}/ai/highlight`, payload, {
    headers: headers(),
  });

export const getHighlights = (bookId) =>
  axios.get(`${AI_BASE}/ai/highlight/${bookId}`, {
    headers: headers(),
  });
