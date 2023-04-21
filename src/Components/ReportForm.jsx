import React, { useRef } from "react";
import { getPost } from "../api";
//import sendMail from "../email";
import '../style/form.css';

const ReportForm = ({name}) => {
    const msgRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.clear();

        const msg = msgRef.current.value.trim(); 
        if (msg === '' || !msg) {
            alert ("לא נשלחה הודעה");
            return;
        }

        console.log (msgRef.current.value);
        
        getPost ('/report', { key: 'romanbr87', report: msg, name: name })
        .then (val => console.log (val))
        .catch (val => console.log (val))

        msgRef.current.value='';
    };
    
    if (!name || name.trim() === '') return <></>
    return (
    <div className="modal fade modal-info" tabIndex="-3" role="dialog" id="reportModal" aria-labelledby="gridSystemModalLabel">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="close pull-left" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="gridSystemModalLabel">{"דיווח על " + name}</h4>
        </div>
        <div className="modal-body text-right" style={{padding :"1%"}}>
            <div className="newRow form-group form-group-sm" style={{width: '100%', height: '120%'}}>
            <textarea className="form-control" ref={msgRef} rows="5" style={{width: "100%", height: "120%"}} />
            </div>
        </div>
        <div className="modal-footer">
            <button type="submit" className="btn btn-primary" data-dismiss="modal" 
            onClick={handleSubmit}>להגיש דיווח</button>
            <button type="reset" className="btn btn-default pull-left" data-dismiss="modal"
            onClick={()=> msgRef.current.value=''}>לסגור</button>
        </div>
    </div>
    </div>
    </div>
    
    );
};

export default ReportForm;