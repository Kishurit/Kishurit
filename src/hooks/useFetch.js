import { useEffect, useState } from "react";
import { getPost } from "../api";

const useFetch = (url, info) => {
    const [data, setData] = useState();
  
    useEffect(() => {
        getPost(url, info)
        .then(dataFromServer => setData(dataFromServer))
    }, [url]);
  
    return {data, setData};
  };
  
  export default useFetch;