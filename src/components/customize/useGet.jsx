// src/hooks/useGet.js
import useApi from "./useApi";

export const useGet = (url, deps = []) =>
    useApi("get", url, null, {}, deps);
