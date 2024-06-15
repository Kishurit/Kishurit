import React, { memo } from "react";
import { useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default memo(function DataCat({ index, setIndex, lg, md }) {
  const history = useHistory();
  const data = useSelector((state) => state.data);

  const handleChange = (e) => {
    const indexFromSelect = e.target.value;
    setIndex(indexFromSelect);
    history.push(`/cat/${indexFromSelect}`)
  }

  return (
    <Row className="justify-content-right">
      <Col lg={lg} md={md} className="text-center">
        <Form.Select size='sm' value={index ?? undefined} onChange={handleChange}>
          {data?.cat?.map((e, i) => {
            return <option key={i + 1} index={i} value={e._id}>{('' + (i + 1)).padStart(2, '0') + ". " + e.name + " - " + e.totNum + " קישורים"}</option>
          })}
        </Form.Select>
      </Col>
    </Row>
  )
})
