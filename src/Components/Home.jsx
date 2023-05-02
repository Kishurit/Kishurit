import React, { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'

import '../App.css'
import "../style/style.css"
import DataPage from "./datapage/DataPage"

import jsonData from "../JSON/db.json"

export default function Home() {
  //const url = "https://raw.githubusercontent.com/romanbr87/links2/main/src/JSON/db2.json";
  //const {data, error, isPending, setData} = useFetch ('/0') 
  //const data = {};

  useEffect (() => {
    //console.clear ();
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
    
    const data = jsonData.job.reduce((acc,element) => {
      const totalCatNum = element.links.reduce ((acc1, element1) => acc1 + element1.links.length, 0)
      acc.total += totalCatNum;  
      acc.cat.push ({name: element.name, totNum: totalCatNum});
      return acc;
    }, {total: 0, cat: []})
  
  
    console.log (data.cat);
    data.cat.forEach (e => console.log(e))
  }, [])

  return (
    <React.Fragment>
      { false && <DataPage /> }
    </React.Fragment>
  )
}
  