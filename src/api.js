import React from 'react';
import axios, {isCancel, AxiosError} from 'axios';
const context = React.createContext();

//export const serverURL = (url) => `http://localhost:8080${url}`;
export const serverURL = (url) => `https://dark-jade-caridea-sari.cyclic.app${url}`
export const Provider = context.Provider;
export const Consumer = context.Consumer;

export const fetchData =  async (url, method='POST', dataForServer = undefined) => {
    dataForServer =  {...dataForServer, key: 'romanbr87'}
    const requestOptions = {
        method: method,
        headers: {'Content-Type': 'application/json'},
        data: dataForServer
    }

    try {
        const  {data} = await axios(serverURL(url), requestOptions)
        return data;
    } 
    
    catch (error) {
        console.log (error.response);
        console.log (`url: ${serverURL(url)}`)
        const customError = new Error(error.response.data.message)
        throw customError;
    }
} 
    
export const getPost = async (url, data) => {
    return await fetchData (url, 'post', data);
}    
