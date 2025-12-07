import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";

const useFetch = (url, isConvertData) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const jwtToken = Cookies.get("jwt_token");

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    async function fetchData() {
      try {
        let res = await axios.get(url, {
          headers: headers,
          cancelToken: ourRequest.token,
        });

        let data = res?.data || [];

        if (data.length > 0 && isConvertData) {
          data = data
            .map((item) => ({
              ...item,
              Date: moment(item.Date).format("DD/MM/YYYY"),
            }))
            .reverse();
        }

        setData(data);
        setIsLoading(false);
        setIsError(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      }
    }

    // Delay 400ms nếu bạn muốn, KHÔNG nên để 4000ms
    setTimeout(fetchData, 400);

    return () => {
      ourRequest.cancel("Operation canceled by the user.");
    };
  }, [url]);

  return { data, isLoading, isError };
};

export default useFetch;
