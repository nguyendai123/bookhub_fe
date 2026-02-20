import axios from "axios";
import Cookies from "js-cookie";

const headers = () => ({
  Authorization: `Bearer ${Cookies.get("jwt_token")}`,
});
const BASE = "/api/follow";

export const followUser = (targetUserId) =>
  axios.post(`${BASE}/${targetUserId}`, null, { headers: headers() });

export const unfollowUser = (targetUserId) =>
  axios.delete(`${BASE}/${targetUserId}`, { headers: headers() });

export const checkFollowing = (followerId, followingId) =>
  axios.get(`${BASE}/check`, {
    params: { followerId, followingId },
    headers: headers(),
  });

export const getFollowers = (userId) =>
  axios.get(`${BASE}/${userId}/followers`, { headers: headers() });

export const getFollowing = (userId) =>
  axios.get(`${BASE}/${userId}/following`, { headers: headers() });

export const getFollowCounts = (userId) =>
  axios.get(`${BASE}/${userId}/followers-counts`, { headers: headers() });
export const getFollowingsCounts = (userIds) =>
  axios.post(`${BASE}/followings-counts`, { userIds }, { headers: headers() });

export const getSuggestedUsers = () =>
  axios.get(`${BASE}/suggested`, { headers: headers() });
export const getMutualFollowers = (userId) =>
  axios.get(`${BASE}/${userId}/mutual`, { headers: headers() });
export const getTopFollowers = () =>
  axios.get(`${BASE}/top`, { headers: headers() });
