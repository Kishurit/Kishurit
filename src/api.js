import React from 'react';
import axios, {isCancel, AxiosError} from 'axios';
const context = React.createContext();

const baseUrl = 'https://dark-jade-caridea-sari.cyclic.app';
//const baseUrl = 'https://zzsl5m-8081.csb.app';
//const baseUrl = 'http://localhost:8081';
export const serverURL = (url) => `${baseUrl}${url}`;

export const Provider = context.Provider;
export const Consumer = context.Consumer;

export const fetchData =  async (url, method='POST', dataForServer = undefined, withCredentials = false) => {
    dataForServer =  {...dataForServer, key: 'romanbr87'}
    const requestOptions = {
        method: method,
        headers: {'Content-Type': 'application/json'},
        data: dataForServer,
        withCredentials: withCredentials,
    }

    try {
        const  {data} = await axios(url, requestOptions)
        return data;
    } 
    
    catch (error) {
        console.log (error);
        console.log (`url: ${url}`)
        //const customError = new Error(error.response.data.message)
        //throw customError;
    }
} 
    
export const getPost = async (url, data) => {
    return await fetchData (url, 'post', data);
}    
