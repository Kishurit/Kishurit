import React from "react";
import { isBrowser } from "react-device-detect";
import { getPost } from "../api";
import { Form, Button, Col, Well } from 'react-bootstrap';

const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear();
    const { subject, name, email, tel, message } = e.target.elements;
    let details = {
      name: name.value.trim(),
      subject: subject.value.trim(),
      email: email.value.trim(),
      tel: tel.value.trim(),
      body: message.value,

    };
    console.log (details);
    //sendMail ();
    getPost ('/mail', { key: 'romanbr87', ...details })
    .then (val => console.log (val))
    .catch (val => console.log (val))

    return true;
  };

  const MyForm = ({style}) =>
    <Form onSubmit={handleSubmit} className={`text-right ${isBrowser && 'bg-light'}`} style={style}>
    <h3 className="text-center">לשלוח הודעה</h3>

    <Form.Group className="mb-2" as={Col}>
      <Form.Control type="text" size='sm' id="subject" name="subject" placeholder="כותרת" />
    </Form.Group>
    
    <Form.Group className="mb-2" as={Col}>
      <Form.Control type="text" size='sm' id="name" name="name" placeholder="שם" />
    </Form.Group>

    <Form.Group className="mb-2" as={Col}>
      <Form.Control type="email" size='sm' id="email" name="email" placeholder="כתובת מייל" required />
    </Form.Group>

    <Form.Group className="mb-2" as={Col}>
      <Form.Control type="tel" size='sm' id="tel" name="tel" placeholder="מספר טלפון"/>
    </Form.Group>

    <Form.Group className="mb-2" as={Col}>
      <Form.Control as="textarea" size='sm' id="message" name="message" rows="5" placeholder="הודעה" required />
    </Form.Group>

    <Button variant="primary" type="submit" style={{marginTop: "0"}}>לשלוח</Button>
  </Form>


  return (
    <React.Fragment>
    { isBrowser ? <MyForm style={{padding: '4% 5%', border: '1px solid silver', borderRadius: '5px'}} />:
    <MyForm />} 
    </React.Fragment>
  );
};

export default ContactForm;