import { useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { getPost } from '../../api';
import { Container, Col } from 'react-bootstrap';
import { NotificationManager} from 'react-notifications';
import DesktopOrgForm from './DesktopOrgForm';
import MobileOrgForm from './MobileOrgForm';

const OrgForm = () => {    
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear();

    var dataObj = {}
    for (e of e.target.elements) {
      dataObj[e.name] = e.value;
    }

    console.log (JSON.stringify(dataObj, null, 2));
    dataObj.key = 'romanbr87';
    getPost ('/neworg', dataObj)
    .then (val => {
      NotificationManager.success('העסק הוגש בהצלחה למערכת') 
      console.log (val)
    })
    .catch (val => {
      NotificationManager.error('העסק לא הוגש')
      console.log (val)
    })

    return true;
  };

  return (
    <Container className="uicontainer">
      { isBrowser ?      
      <Col lg={6} md={6}>
        <DesktopOrgForm handleSubmit={handleSubmit}/>
      </Col> : 
      <Col>
        <MobileOrgForm handleSubmit={handleSubmit} /> 
      </Col> }

    </Container>
  );
};

export default OrgForm;
