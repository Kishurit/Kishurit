import { useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux";

export default function DataCat({ index, setIndex, getLinksLength}) {
  const data = useSelector((state) => state.data);
  
  useEffect (() => {
    console.log (data);
  },[])
  
  return <p>12</p>
  
  /*return (
    <Row className="justify-content-right">
    <Col lg={4} md={4} sm={12} xs={12} className="text-center">
      <Form.Select size='sm' value={index} onChange={e => setIndex(e.target.value)}>
      {data.cat.map((e, i) => {
      return <option key={i + 1} value={i}>{(''+(i+1)).padStart(2, '0') + ". " + e.name + " - " + e.totNum + " קישורים"}</option>
      })}
      </Form.Select>
    </Col>
  </Row>
  )*/
}
  