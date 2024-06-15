import React, { useRef } from "react";
import { isBrowser } from "react-device-detect";
import { getPost, serverURL } from "../api";
import { NotificationManager } from "react-notifications";
import { Form, Button } from "react-bootstrap";
import Well from "../Bootstrap3/Well";

const ContactForm = () => {
  const formRef = useRef(null);
  console.clear();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Array.from(formRef.current.elements).reduce((data, element) => {
      if (element.name) {
        data[element.name] = element.value;
      }
      return data;
    }, {});

    console.log (data)
    getPost(serverURL("/mail"), { data })
      .then((val) => {
        NotificationManager.success("ההודעה נשלחה בהצלחה", "", 2000);
        formRef.current.reset();
      })
      .catch((val) => {
        NotificationManager.error("ההודעה לא נשלחה", "", 2000);
        console.log(val);
      });
  };

  const MyForm = ({ style, className }) => (
    <Form onSubmit={onSubmit} ref={formRef} className={className} style={style}>
      <h3 className="mt-6 mb-20 text-center">לשלוח הודעה</h3>

      <Form.Group className="mb-3 col">
        <Form.Control
          type="text"
          size="sm"
          id="subject"
          name="subject"
          placeholder="כותרת"
        />
      </Form.Group>

      <Form.Group className="mb-3 col">
        <Form.Control
          type="text"
          size="sm"
          id="name"
          name="name"
          placeholder="שם"
        />
      </Form.Group>

      <Form.Group className="mb-3 col">
        <Form.Control
          type="email"
          size="sm"
          id="email"
          name="email"
          placeholder="כתובת מייל"
        />
      </Form.Group>

      <Form.Group className="mb-3 col">
        <Form.Control
          type="tel"
          size="sm"
          id="tel"
          name="tel"
          placeholder="מספר טלפון"
        />
      </Form.Group>

      <Form.Group className="mb-3 col">
        <Form.Control
          as="textarea"
          size="sm"
          rows="5"
          id="message"
          name="message"
          placeholder="הודעה"
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-0">
        לשלוח
      </Button>
    </Form>
  );

  return (
    <>
      {isBrowser ? (
        <Well className="lg:col-span-2 sm:col-span-1" type="well2">
          <MyForm />
        </Well>
      ) : (
        <MyForm />
      )}
    </>
  );
};

export default ContactForm;
