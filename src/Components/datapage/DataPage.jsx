import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useMemo, useRef } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import DataTable from "../DataTable3";
import ReportForm from './ReportForm';
import DataCat from './DataCat';
import RegionPanel from './RegionPanel';
import SearchPanel from './SearchPanel';

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

export default function DataPage(props) {
  const data = useMemo (() => props.data, [props])
  const [index, setIndex] = useState (0)
  const [searchData, setSearchData] = useState()
  const [location, setLocation] = useState ("")
  const [showModal, setShowModal] = useState (false)
  const searchText = useRef();
  //const location = useRef();
  const [name, setName] = useState ('')


  const SearchInData = (e) => {
    e.preventDefault();
    if (searchText.current.value.trim() === '') alert ("הכנס ערך");
    var regEx = new RegExp (searchText.current.value, "dugi")

    var arr = data.reduce((a1, c1) => {
      return [...a1, ...c1.links.reduce((a2, c2) => {
        var subArr = c2.links.filter (e => {
                      
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
    <Container className='uicontainer'>
        <h2 className="text-center title" style = {{ textDecoration: "underline" }}>קישורית</h2>
        <br style = {{padding: "0", margin: "0"}} />

        <Form onSubmit={SearchInData}>
          <SearchPanel searchText={searchText}/>
          <RegionPanel location={location} setLocation={setLocation}/>
          <DataCat data={data} getLinksLength={getLinksLength} index={index} setIndex={setIndex}/>        
        </Form>
        <Row>
        <Col lg={8} md={8} sm={12} xs={12} className="pull-right" style={{ marginTop: "2%" }}>
        <h3 className="text-center">
        { (index !== -1) ? data[index].name : (searchData.links.length !== 0) ? "חיפוש: " + searchText.current.value: "לא נמצאו רשומות עבור: " + searchText.current.value } 
        </h3>
        {
          (index === -1) ?  
          <DataTable soryByAtrr={soryByAtrr} data={searchData} setName={setName} 
          setShowModal={setShowModal}/>:
          <DataTable soryByAtrr={soryByAtrr} data={data[index]} setName={setName} 
          setShowModal={setShowModal}/>
        }
        </Col>
      </Row>
        <ReportForm name={name} showModal={showModal} setShowModal={setShowModal}/>
      </Container>

      <Container fluid>
        <Row className="fixed-bottom bg-light">
          <Col style={{margin: '5px 0 5px 0'}}>
              <span style={{marginRight: '2em'}}>{getTotalNum} רשומות</span>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}
  