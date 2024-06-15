import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";

const schema = yup.object().shape({
  name: yup.string().required("שדה חובה"),
  desc: yup.string().required("שדה חובה"),
});

const DbCatForm = ({
  className,
  _id = undefined,
  name = "",
  desc = "",
  canEdit = undefined,
  updateData,
}) => {
  const [formData, setFormData] = useState({ _id, name, desc });
  const isMounted = useRef(true); // Add a ref to track component mount status
  useEffect(() => {
    return () => {
      isMounted.current = false; // Set to false when component unmounts
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({ _id, name, desc });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(formData).then((e) => {
      if (e === false) return;
      if (!_id)
        setFormData({ _id: undefined, name: undefined, desc: undefined });
    });
  };

  return (
    <React.Fragment>
      <Form
        className={className + " text-right well mb-1 mt-1"}
        onSubmit={handleSubmit}
      >
        {canEdit && (
          <Row className="justify-content-center mb-3">
            <h4>קטגוריה חדשה</h4>
          </Row>
        )}
        <Row className="mb-2">
          <Form.Group controlId="name">
            <Form.Control
              size="sm"
              type="text"
              name="name"
              value={formData.name}
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
              value={formData.desc}
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
              type="reset"
              onClick={handleReset}
              disabled={_.isEqual(formData, { _id, name, desc })}
            >
              ביטול
            </Button>
            <span className="mx-1"></span>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              disabled={_.isEqual(formData, { _id, name, desc })}
            >
              { _id ? 'לעדכן': 'לשמור' }
            </Button>
            { (_id) &&
              <React.Fragment>
                <span className="mx-1"></span>
                <Button variant="danger" size="sm" type="button">
                  למחוק
                </Button>
              </React.Fragment>
            }
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default DbCatForm;
