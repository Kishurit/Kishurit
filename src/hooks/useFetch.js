import { useEffect, useState } from "react";
import axios from "axios";

const defaultHeaders = { "Content-Type": "application/json" };

const useFetch = (
  url,
  method = "POST",
  body = undefined,
  headers = defaultHeaders,
  withCredentials = false,
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cancelSource = axios.CancelToken.source();
    const controller = new AbortController();
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios(url, {
          method,
          headers,
          withCredentials: withCredentials,
          data: body,
          cancelToken: cancelSource.token,
          signal: controller.signal,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      cancelSource.cancel("Request canceled by user.");
      controller.abort();
    };
  }, [body, headers, method, url, withCredentials]);

  return { data, error, isLoading };
};

export default useFetch;
