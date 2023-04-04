import '../App.css'
import "../style.css"

import { useState, useEffect } from 'react'
import UI from "./UI"
import employmentData from '../JSON/db2.json';

export default function Home() {
  const [data, setData] = useState()

  const getDataFromJson = () => {
    var fileName = "https://raw.githubusercontent.com/romanbr87/links2/main/src/JSON/db2.json";
    fetch(fileName)
    .then(response => response.json())
    .then(data => {
      var jobs_data = data.job;
      setData (jobs_data);
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    setData (employmentData.job)
  }, [])

  return (
      <UI data={data}></UI>
  )
}
  