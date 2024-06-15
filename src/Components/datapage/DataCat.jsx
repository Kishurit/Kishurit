import React from "react";
import { useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux";

export default function DataCat({ index, setIndex, lg, md}) {
  const data = useSelector((state) => state.data);
  
  return (
    <Row className="justify-content-right">
    <Col lg={lg} md={md} className="text-center">
      <Form.Select size='sm' value={index} onChange={e => setIndex(e.target.value)}>
      {data?.cat?.map((e, i) => {
      return <option key={i + 1} value={i}>{(''+(i+1)).padStart(2, '0') + ". " + e.name + " - " + e.totNum + " קישורים"}</option>
      })}
      </Form.Select>
    </Col>
  </Row>
  )
}
