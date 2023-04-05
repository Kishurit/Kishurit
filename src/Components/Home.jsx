
import React, { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { serverURL } from "../api";
import UI from "./UI"

import '../App.css'
import "../style.css"

export default function Home() {
  //const url = "https://raw.githubusercontent.com/romanbr87/links2/main/src/JSON/db2.json";
  const { data } = useFetch ('/', { key: 'romanbr87' })
    
  if (!data) return <React.Fragment />
  //false &&  
  return (
    <UI data={data}></UI>
  )
}
  