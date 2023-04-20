import React from "react";
import { isBrowser } from "react-device-detect";
import { getPost } from "../api";
//import sendMail from "../email";
//import { Mailer } from 'nodemailer-react'
import '../style/form.css';

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

  return (
    <form className={"text-right " + (isBrowser && 'well')} onSubmit={handleSubmit} >
      <h3 className="text-center">לשלוח הודעה</h3>

      <div className="form-group form-group-sm" style={{marginTop: "20px"}}>
          <input type="text" className="form-control" id="subject" name="subject" 
          placeholder="כותרת" />
      </div>
      
      <div className="form-group form-group-sm" style={{marginTop: "20px"}}>
          <input type="text" className="form-control" id="name" name="name" 
          placeholder="שם" />
      </div>

      <div className="form-group form-group-sm">
          <input type="email" className="form-control" id="email" name="email" 
          placeholder="כתובת מייל" required />
      </div>

      <div className="form-group form-group-sm">
          <input type="tel" className="form-control" id="tel" name="tel" 
          placeholder="מספר טלפון"/>
      </div>

      <div className="form-group form-group-sm">
      <textarea className="form-control" id="message" name="message" rows="5" 
      placeholder="הודעה" required />
      </div>

      <button className="btn btn-primary btn-sm" type="submit" style={{marginTop: "0"}}>לשלוח</button>
    </form>
  );
};

export default ContactForm;