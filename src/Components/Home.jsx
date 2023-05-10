import React, { useState, useEffect } from 'react'

import '../App.css'
import "../style/style.css"
import DataPage from "./datapage/DataPage"

//import jsonData from "../JSON/db.json"

export default function Home() {
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

  }, [])

  return (
    <React.Fragment>
      <DataPage />
    </React.Fragment>
  )
}
  