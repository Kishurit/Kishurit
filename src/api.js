import React from 'react';
import axios, {isCancel, AxiosError} from 'axios';
const context = React.createContext();

//export const serverURL = (url) => `http://localhost:8080${url}`;
export const serverURL = (url) => `https://calm-plum-scorpion-suit.cyclic.app${url}`
export const Provider = context.Provider;
export const Consumer = context.Consumer;


export const fetchData =  async (url, method='POST', dataForServer = undefined) => {
    const requestOptions = {
        method: method,
        headers: {'Content-Type': 'application/json'},
        ...(dataForServer !== undefined && {data: dataForServer})

    }

    try {
        const  {data} = await axios(serverURL(url), requestOptions)
        console.log (data);
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

