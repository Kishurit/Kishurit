import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("שדה חובה"),
  desc: yup.string().required("שדה חובה"),
});

const DbSubCatForm = ({
  cat,
  _id = undefined,
  catRefId,
  name = "",
  desc = "",
  canEdit = undefined,
  index,
  updateData,
}) => {
  const [formData, setFormData] = useState({ _id, catRefId, name, desc });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleReset = useCallback(() => {
    setFormData({ _id, catRefId, name, desc });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateData(formData)) {
      setFormData({ _id: undefined, name: undefined, desc: undefined });
    }
  };

  return (
    <React.Fragment>
      <Form className="text-right well mb-1 mt-1" onSubmit={handleSubmit}>
        {canEdit && (
          <Row className="justify-content-center mb-3">
            <h4>קטגוריה חדשה</h4>
          </Row>
        )}
        <Row className="mb-2">
          <Form.Group controlId="catRefId">
            <Form.Select
              size="sm"
              type="text"
              name="catRefId"
              value={formData?.catRefId?._id}
              placeholder="*קטגוריה"
              onChange={handleChange}
              required
            >
              {cat?.map((e, j) => (
                <option key={`${j} + ${index}`} value={e._id}>
                  {`${j + 1}. ${e.name}`}
                </option>
              ))}
            </Form.Select>

            <Form.Text className="text-danger">
              {schema.errors?.name?.message}
            </Form.Text>
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group controlId="name">
            <Form.Control
              size="sm"
              type="text"
              name="name"
              value={formData?.name}
              placeholder="*שם"
              onChange={handleChange}
              required
            />
            <Form.Text className="text-danger">
              {schema.errors?.name?.message}
            </Form.Text>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="desc">
            <Form.Control
              as="textarea"
              rows={4}
              size="sm"
              name="desc"
              value={formData?.desc}
              placeholder="*תיאור"
              onChange={handleChange}
              required
            />
            <Form.Text className="text-danger">
              {schema.errors?.desc?.message}
            </Form.Text>
          </Form.Group>
        </Row>

        <Row>
          <Col>
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={handleReset}
            >
              ביטול
            </Button>
            <span className="mx-2"></span>
            <Button variant="primary" size="sm" type="submit">
              לשמור
            </Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default DbSubCatForm;
