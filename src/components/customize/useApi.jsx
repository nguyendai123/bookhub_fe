// src/hooks/useApi.js
import { useEffect, useState, useCallback } from "react";
import apiClient from "../ApiClient/apiClient";
import axios from "axios";

const useApi = (method, url, body = null, extraHeaders = {}, deps = []) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    const fetchData = useCallback(() => {
        const source = axios.CancelToken.source();
        setIsLoading(true);
        setIsError(null);

        apiClient({
            method: method,
            url: url,
            data: body,
            headers: {
                ...extraHeaders,
            },
            cancelToken: source.token,
        })
            .then((res) => setData(res.data))
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setIsError(err);
                }
            })
            .finally(() => setIsLoading(false));

        return () => source.cancel("Request canceled");
    }, deps);

    useEffect(fetchData, [fetchData]);

    return { data, isLoading, isError };
};

export default useApi;
