// src/hooks/usePut.js
import useApi from "./useApi";

export const usePut = (url, body, deps = []) =>
    useApi("put", url, body, {}, deps);
