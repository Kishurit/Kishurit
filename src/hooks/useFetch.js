import { useEffect, useState } from "react";
import { getPost } from "../api";

const useFetch = (url, info = null) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getPost(url, info)
        .then(dataFromServer => {
          setData(dataFromServer);
          setIsPending (false)
        })
        .catch (err => {
          setIsPending (false)
          setError (err);
        })
    }, [url]);
  
    return {data, error, isPending, setData};
  };
  
  export default useFetch;