<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useAxiosSimple = (url, method = "get", params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const prevParams = useRef();

  useEffect(() => {

    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios(url, {
          method,
          ...params,
        });
        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }

    };

    if (JSON.stringify(params) !== JSON.stringify(prevParams.current)) {
      fetchData();
      prevParams.current = params;
    }

    return () => {
      cancelTokenSource.cancel("Request canceled by user.");
    };


  }, [url, method, params]);

  return { data, isLoading, error };
};

export default useAxiosSimple;
=======
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useAxiosSimple = (url, method = "get", params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const prevParams = useRef();

  useEffect(() => {

    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios(url, {
          method,
          ...params,
        });
        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }

    };

    if (JSON.stringify(params) !== JSON.stringify(prevParams.current)) {
      fetchData();
      prevParams.current = params;
    }

    return () => {
      cancelTokenSource.cancel("Request canceled by user.");
    };


  }, [url, method, params]);

  return { data, isLoading, error };
};

export default useAxiosSimple;
>>>>>>> 80af62dbefbeccbf611f3c65aede4ade31d713c9
