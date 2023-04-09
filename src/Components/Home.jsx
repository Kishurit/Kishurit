
import React, { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import UI from "./UI"

import '../App.css'
import "../style.css"
import data from "../JSON/db.json"

export default function Home() {
  //const url = "https://raw.githubusercontent.com/romanbr87/links2/main/src/JSON/db2.json";
  const {data, error, isPending, setData} = useFetch ('/', { key: 'romanbr87' }) 

  useEffect (() => {
    console.clear ();
    /*var data1 = JSON.parse(JSON.stringify(data));
    if (data1) {
      var job1 = data1.job.map (node => {
        var node1 = node;
        node1.catName = node1.name
        delete node1.name;
        node1.subCategories = node1.links
        delete node1.links;

        node1.subCategories.map (subCat => {
            subCat.subCategorieName = subCat.cat;
            delete subCat.cat;

            return subCat
        })

        return node
      }) 
      console.log (job1);
    }*/
  }, [])
  if (!data) return <React.Fragment />
  return (
    <React.Fragment>
      <UI data={data}></UI>
    </React.Fragment>
  )
}
  