import '../App.css'
import "../style.css"

import React, { useState, useMemo, useRef } from 'react'
import DataTable from "./DataTable3";
import ReportForm from './ReportForm';

export default function UI(props) {
  const data = useMemo (() => props.data, [props])
  const [index, setIndex] = useState (0)
  const [searchData, setSearchData] = useState()
  const [location, setLocation] = useState ("")
  const searchText = useRef();
  const [name, setName] = useState ('')

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
    
    var regEx = new RegExp (searchText.current.value, "dugi")

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

  const getTotalNum = data.reduce((acc,element) => acc + getLinksLength(element.links), 0);
  
  return (
    <React.Fragment>
    <div className="container text-center pull-center">       
        <h2 className="text-center title" style = {{ textDecoration: "underline" }}>קישורית</h2>
        <br style = {{padding: "0", margin: "0"}} />
        <h4 className="text-right">{ getTotalNum } רשומות  </h4>
        

        <div className="text-center col-lg-4 col-md-4 col-lg-offset-8 col-md-offset-8 col-sm-12 col-xs-12">
        <div className="input-group input-group-sm" id="searchForm" style={{ direction: "ltr" }} >
          <span className="input-group-btn">
            <button className="btn btn-default text-left" type="button" onClick={SearchInData}>
            <i className="glyphicon glyphicon-search"></i></button>
          </span>
          <input type="text" className="form-control" ref={searchText}
          placeholder="חיפוש" />
        </div>
        <div className="radio text-right" style={{margin: "2% 2px 3% auto", }}>
            
            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value=""
            onClick={e=> setLocation("")} />הכל</label>
    
            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value="north" 
            onClick={e=> setLocation("north")} />צפון</label>
        
            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value="south" 
            onClick={e=> setLocation("south")} />דרום</label>
    
            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value="center" 
            onClick={e=> setLocation("center")} />מרכז</label>

    
        </div>

        <select className="form-control" id="sel" onChange={ e => setIndex(e.target.value) } >
        {
          data.map ((e, i) => {
            return <option key={i+1} value={i}>{AdjustNum(i) + ". " + e.name + " - " + getLinksLength(e.links) + " קישורים" }</option> 
          })
        }
        </select>
        </div>
        
        <div id="dataTable" className="col-lg-8 col-md-8 col-sm-12 col-xs-12 pull-right"
        style={{ marginTop: "2%"}}>
            <h3 style = {{ fontWeight: "lighter", margin: '0', padding: '.5em 0 .5em 0'}}>
            { (index !== -1) ? data[index].name: (searchData.links.length !== 0) ? "חיפוש: " + searchText.current.value: "לא נמצאו רשומות עבור: " + searchText.current.value } 
            </h3>
            {
              (index === -1) ?  
              <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={searchData} setName={setName} />:
              <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={data[index]} setName={setName} />              
            }
        </div>

      </div>

      <footer className="well well-sm panel-footer text-right navbar-fixed-bottom" 
      style={{ margin: "0 0 0 0", padding:"auto", borderRadius: '0', border: 'none', marginTop: "10em"}}>
          
        <span style={{ padding: 'auto', margin: 'auto'}}>
            { getTotalNum } רשומות
          </span>
      </footer> 
      <ReportForm name={name}/>
    </React.Fragment>
  )
}
  