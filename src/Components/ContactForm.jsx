import React from "react";
import { isBrowser } from "react-device-detect";
import { getPost } from "../api";
import { NotificationManager } from "react-notifications"
import { Form, Button, Col } from 'react-bootstrap';
import Well from "../Bootstrap3/Well"

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
    .then (val => {
      NotificationManager.success('ההודעה נשלחה בהצלחה') 
      console.log (val)
    })
    .catch (val => {
      NotificationManager.error('ההודעה לא נשלחה')
      console.log (val)
    })

    return true;
  };

  const MyForm = ({style, className}) =>
    <Form onSubmit={handleSubmit} className={className} style={style}>
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
    { isBrowser ? <Well><MyForm /></Well> :
    <MyForm />
    } 
    </React.Fragment>
  );
};

export default ContactForm;