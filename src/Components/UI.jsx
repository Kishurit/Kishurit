import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useMemo, useRef } from 'react'
import { Container, Button, InputGroup, FormControl, Radio, Form, Col, Row } from 'react-bootstrap';
import DataTable from "./DataTable3";
import ReportForm from './ReportForm';

export default function UI(props) {
  const data = useMemo (() => props.data, [props])
  const [index, setIndex] = useState (0)
  const [searchData, setSearchData] = useState()
  const [location, setLocation] = useState ("")
  const [showModal, setShowModal] = useState (false)
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
    if (searchText.current.value.trim() === '') alert ("הכנס ערך");
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
    <Container className='uicontainer'>
        <h2 className="text-center title" style = {{ textDecoration: "underline" }}>קישורית</h2>
        <br style = {{padding: "0", margin: "0"}} />

        <Row className="justify-content-right mb-2">
          <Col lg={4} md={4} sm={12} xs={12} className="text-center">
          <InputGroup size="sm" style={{ direction: "ltr" }}>
            <Button variant="outline-secondary" onClick={SearchInData}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            </Button>
            <FormControl type="text" size="sm" placeholder="חיפוש" ref={searchText} />
          </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-right mb-2">
          <Col lg={4} md={4} sm={12} xs={12} className="text-center">
            <Form style={{marginRight: "-15px"}}>
              <Form.Check inline type="radio" label="הכל" name="inlineRadio" value="" onClick={e => setLocation("")} />
              <Form.Check inline type="radio" label="צפון" name="inlineRadio" value="north" onClick={e => setLocation("north")} />
              <Form.Check inline type="radio" label="דרום" name="inlineRadio" value="south" onClick={e => setLocation("south")} />
              <Form.Check inline type="radio" label="מרכז" name="inlineRadio" value="center" onClick={e => setLocation("center")} />
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-right">
          <Col lg={4} md={4} sm={12} xs={12} className="text-center">
            <Form.Select size='sm' value={index} onChange={e => setIndex(e.target.value)}>
            {data.map((e, i) => {
            return <option key={i + 1} value={i}>{AdjustNum(i) + ". " + e.name + " - " + getLinksLength(e.links) + " קישורים"}</option>
            })}
            </Form.Select>
          </Col>
        </Row>
        
        <Row>
        <Col lg={8} md={8} sm={12} xs={12} className="pull-right" style={{ marginTop: "2%" }}>
        <h3 className="text-center">
        { (index !== -1) ? data[index].name: (searchData.links.length !== 0) ? "חיפוש: " + searchText.current.value: "לא נמצאו רשומות עבור: " + searchText.current.value } 
        </h3>
        {
          (index === -1) ?  
          <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={searchData} setName={setName} 
          setShowModal={setShowModal}/>:
          <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={data[index]} setName={setName} 
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
  