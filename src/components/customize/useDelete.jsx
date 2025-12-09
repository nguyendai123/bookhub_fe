// src/hooks/useDelete.js
import useApi from "./useApi";

export const useDelete = (url, deps = []) =>
    useApi("delete", url, null, {}, deps);
