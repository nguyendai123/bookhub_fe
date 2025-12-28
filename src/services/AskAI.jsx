import axios from "axios";
import Cookies from "js-cookie";

const AI_BASE = "http://localhost:8080/api";
const headers = () => ({
  Authorization: `Bearer ${Cookies.get("jwt_token")}`,
});
export const recommendations = (payload) =>
  axios.get(`${AI_BASE}/ai/recommendations`, { headers: headers() });

export const highlightText = (payload) =>
  axios.post(`${AI_BASE}/highlight`, payload, { headers: headers() });

export const summarizeChapter = (payload) =>
  axios.post(`${AI_BASE}/summary`, payload, { headers: headers() });

export const askAI = (payload) =>
  axios.post(`${AI_BASE}/ai/interaction`, payload, { headers: headers() });
