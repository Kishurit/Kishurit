import React from "react";
import { Col, Form, FormControl } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Dd() {
  const options = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
  ];

  return (
    <Form>
      <Form.Row>
        <Col xs={6}>
          <Form.Control
            type="text"
            as={Typeahead}
            options={options}
            placeholder="Select option 1"
            label="Option 1"
          />
        </Col>
        <Col xs={6}>
          <Form.Control
            type="text"
            as={Typeahead}
            options={options}
            placeholder="Select option 2"
            label="Option 2"
          />
        </Col>
      </Form.Row>
    </Form>
  );
}
