import { Col, Row, Form } from "react-bootstrap"

export default function DataCat({data, index, setIndex, getLinksLength}) {

  return (
    <Row className="justify-content-right">
    <Col lg={4} md={4} sm={12} xs={12} className="text-center">
      <Form.Select size='sm' value={index} onChange={e => setIndex(e.target.value)}>
      {data.map((e, i) => {
      return <option key={i + 1} value={i}>{(''+(i+1)).padStart(2, '0') + ". " + e.name + " - " + getLinksLength(e.links) + " קישורים"}</option>
      })}
      </Form.Select>
    </Col>
  </Row>
)
}
  