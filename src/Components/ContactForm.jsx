import React from "react";
//import sendMail from "../email";
//import { Mailer } from 'nodemailer-react'
import '../style/form.css';

const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear();
    const { name, email, tel, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      tel: tel.value,
      body: message.value,

    };
    console.log (details);
    //sendMail ();
  };

  return (
    <form className="text-right" onSubmit={handleSubmit} >
      <h3 className="text-center">לשלוח הודעה</h3>

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

      <button class="btn btn-primary btn-sm" type="submit" style={{marginTop: "0"}}>לשלוח</button>
    </form>
  );
};

export default ContactForm;