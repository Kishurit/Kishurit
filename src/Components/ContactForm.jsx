import React from "react";
import sendMail from "../email";
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
    sendMail ();
  };

  const Form = () =>
  <React.Fragment>
      <div className="form-group form-group-sm" style={{marginTop: "15px"}}>
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
      placeholder="הודעה" required ></textarea>
      </div>

  </React.Fragment>

  return (
    <div id="newMessage" className="modal fade" role="dialog">
      <div className="modal-dialog">
       <div className="modal-content">
          <div className="modal-body" style={{marginTop: "5px", paddingTop: '0', paddingBottom: '0'}}>
          <form className="text-right" onSubmit={handleSubmit} >
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h3 className="modal-title text-center">לשלוח הודעה</h3>
            <small className="text-right modal-title">כתובת מייל והודעה חובה</small>
              <Form />
            <div className="btn-group" style={{paddingBottom: "10px"}}>
              <button type="submit" className="btn btn-primary">לשלוח</button>
              <button type="reset" className="btn btn-primary">לאתחל</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">לסגור</button>
            </div>
          </form>

        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactForm;