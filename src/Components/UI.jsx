import '../App.css'
import "../style.css"

import React, { useState, useEffect, useMemo } from 'react'
import DataTable from "./DataTable2";

export default function UI(props) {
  const data = useMemo (() => props.data, [props])
  const [index, setIndex] = useState (0)
  const [searchData, setSearchData] = useState()
  const [searchText, setSearchText] = useState("")
  const [check1, setCheck1] = useState (false)
  const [location, setLocation] = useState ("")

  const AdjustNum = (num) => {
     num++;
     return (num < 10) ? "0" + num : num
  }

  const soryByAtrr = (arr) => {
    return arr = arr.sort((a, b) => {
        let res = a["site_name"].localeCompare(b["site_name"])
            return res;
    })
  }

  const getLinksLength = (links) => {
    return links.reduce ((a, c) => {
        return a + c.links.length;
    }, 0)
  }

  const SearchInData = (e) => {
    e.preventDefault();
    
    var flags = "dug" + ((!check1) ? "i" : ''); 
    var regEx = new RegExp (searchText, flags)

    var arr = data.reduce((a1, c1) => {
      return [...a1, ...c1.links.reduce((a2, c2) => {
        var subArr = c2.links.filter (e => {
          
          /*return (!check1) ? e.site_name.toLowerCase().includes(txt.toLowerCase()) :
                            e.site_name.includes(txt)*/
            
          if (location === '') return e.site_name.match (regEx)
          else return e.site_name.match (regEx) && e.location === location
        })
        
        if (subArr.length > 0) return [...a2, {cat: c2.cat, links: subArr}]
        else return [...a2]

      }, [])

    ]}, [])

    
    setIndex (-1);
    setSearchData ({links: arr});
  }

  const getTotalNum = () => data.reduce((acc,element) => acc + getLinksLength(element.links), 0);
  

  if (!data) return <p>Null</p>
  //<h3 id= "title" style = {{ fontWeight: "lighter", textDecoration: "underline" }}>קטלוג אתרים של מקומות תעסוקה וחברות כוח אדם</h3>
  return (
    <React.Fragment>
    <div className="container text-center pull-center">
      <div className="panel" id="panelForm">
        
        <h2 className="text-center title" style = {{ textDecoration: "underline" }}>קישורית</h2>
        <br style = {{padding: "0", margin: "0"}} />
        <h4 className="text-right">{ getTotalNum() } רשומות  </h4>
        
        <div className="text-center pull-right 
        col-lg-4 col-md-4 col-sm-12 col-xs-12">

        <div className="input-group input-group-sm" id="searchForm" style={{ direction: "ltr" }} >
          <span className="input-group-btn">
            <button className="btn btn-default text-left" type="button" onClick={SearchInData}>
            <i className="glyphicon glyphicon-search"></i></button>
          </span>
          <input type="text" className="form-control" onChange={ e => setSearchText(e.target.value) }
          placeholder="חיפוש" value={searchText}/>
        </div>
        <hr style = {{padding: "0", margin: "0 0 2% 0"}} />
        <div className="checkbox text-right" style={{marginTop: "2%"}}>
            <label htmlFor="inlineCheckbox1" className="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox1" value="option1" 
            onChange={e=> setCheck1(e.target.checked)} />גודל אות</label>
        </div>      
        <div className="radio text-right" style={{margin: "2% auto 3% auto", direction: "ltr"}}>
            
            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value="south" 
            onClick={e=> setLocation("south")} />דרום</label>
    
            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value="center" 
            onClick={e=> setLocation("center")} />מרכז</label>

            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value="north" 
            onClick={e=> setLocation("north")} />צפון</label>

            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value=""
            onClick={e=> setLocation("")} />הכל</label>
    
        </div>

        <select className="form-control" id="sel" onChange={ e => setIndex(e.target.value) } >
        {
          data.map ((e, i) => {
            return <option key={i+1} value={i}>{AdjustNum(i) + ". " + e.name + " - " + getLinksLength(e.links) + " קישורים" }</option> 
          })
        }
        </select>
        </div>
        </div>


      <div id="dataTable" className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2"
      style={{ marginTop: "2%"}}>
        <div className="panel panel-info" style={{border: "none"}}>
          <div className="panel-heading">
          <h3 style = {{ fontWeight: "lighter", margin: '0', padding: '.5em 0 .5em 0'}}>
          { (index !== -1) ? data[index].name: (searchData.links.length !== 0) ? "חיפוש: " + searchText: "לא נמצאו רשומות עבור: " + searchText } </h3>
          </div>
          <div className="panel-body"></div>
          {
            (index === -1) ?  
            <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={searchData}></DataTable>:
            <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={data[index]}></DataTable>              
          }
        </div>
      </div>         
    </div>
    
    <footer className="well well-sm panel-footer text-right navbar-fixed-bottom" 
    style={{ margin: "0 0 0 0", padding:"auto", borderRadius: '0', border: 'none', marginTop: "10em"}}>
        
       <span style={{ padding: 'auto', margin: 'auto'}}>
          { getTotalNum() } רשומות
        </span>
    </footer> 
    </React.Fragment>
  )
}
  