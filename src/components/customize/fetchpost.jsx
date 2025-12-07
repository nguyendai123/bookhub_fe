import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const useFetchPost = (url, data) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source(); // <-- 1st step

    async function fetchData() {
      try {
        await axios.post(url, data, {
          cancelToken: ourRequest.token, // <-- 2nd step
        });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      }
    }

    setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      ourRequest.cancel("Operation canceled by the user."); // <-- 3rd step
    };
  }, [url, data]);

  return {
    data,
    isLoading,
    isError,
  };
};

export default useFetchPost;
