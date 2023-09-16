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
    
    catch (err) {
        const customError = new Error(err.response.data.message)
        throw customError;
    }
} 
    
export const getPost = async (url, data) => {
    return await fetchData (url, 'post', data);
}    

export const sortByAttr = (arr, attr) => {
  if (!arr || arr?.length === 0) return arr;
  arr = arr.sort((a, b) => {
    let res = a[attr]?.localeCompare(b[attr]);
    return res;
  });
  return arr;
};

// export function divideArrayIntoSetsOfTwo(arr) {
//     return arr.reduce((result, currentValue, index) => {
//       if (index % 2 === 0) {
//         result.push([currentValue]);
//       } else {
//         result[result.length - 1].push(currentValue);
//       }
//       return result;
//     }, []);
//   }
  
// navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const coords = {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       };
//       const coords1 = {
//         latitude: 51.525,
//         longitude: 7.4575,
//       };
//       console.log(
//         "You are ",
//         geolib.getDistance(coords, coords1),
//         "meters away from 51.525, 7.4575"
//       );
//     },
//     () => {
//       alert("Position could not be determined.");
//     }
//   );
