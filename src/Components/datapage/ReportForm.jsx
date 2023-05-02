import { useRef } from "react";
import { getPost } from "../../api";
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import { NotificationManager} from 'react-notifications';

const ReportForm = ({name, showModal, setShowModal}) => {
    const msgRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.clear();

        const msg = msgRef.current.value.trim(); 
        if (msg === '' || !msg) {
            alert ("ההודעה לא נשלחה");
            return;
        }

        console.log (msgRef.current.value);
        
        getPost ('/report', { report: msg, name: name })
        .then (val => {
          NotificationManager.success('הידד', 'ההודעה נשלחה') 
          //alert ("ההודעה נשלחה");
          console.log (val);
        })
        .catch (val => {
          NotificationManager.error('שגיאה', 'ההודעה לא נשלחה')
          //alert ("ההודעה לא נשלחה");
          console.log (val);
        })

        msgRef.current.value='';
        setShowModal(false)
    };
    
    if (!name || name.trim() === '') return <></>
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="text-right" closeButton='true'>
          <Modal.Title>{"דיווח על " + name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea className="form-control" ref={msgRef} rows="5" style={{width: "100%", height: "120%"}} />
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup aria-label="Buttons" style={{direction:'ltr'}}>
          <Button variant="secondary" className="justify-content-left" closeButton='true' onClick={()=> {
            msgRef.current.value='';
            setShowModal(false);
          }}>לסגור</Button>
          <Button variant="primary" className="pull-right" closeButton='true' onClick={handleSubmit}>להגיש דיווח</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
};

export default ReportForm;