// src/hooks/usePost.js
import useApi from "./useApi";

export const usePost = (url, body, deps = []) =>
    useApi("post", url, body, {}, deps);
