import React, { useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { getPost } from '../../api';
import { Container, Col, Row } from 'react-bootstrap';
import { NotificationManager} from 'react-notifications';
import DesktopOrgForm from './DesktopOrgForm';
import MobileOrgForm from './MobileOrgForm';

const OrgForm = () => {    
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear();

    var dataObj = { data: { }}
    for (let e1 of e.target.elements) {
      if (e1.name.trim() === '') continue;
      dataObj.data[e1.name] = e1.value;
    }

    //console.log (JSON.stringify(dataObj, null, 2));
    getPost ('/neworg', dataObj)
    .then (val => {
      NotificationManager.success('העסק הוגש בהצלחה למערכת', '', 2000) 
      console.log (val)
    })
    .catch (val => {
      NotificationManager.error('העסק לא הוגש', '', 2000)
      console.log (val)
    })

    return false;
  };

  return (
    <Container className="uicontainer">
    <Row>
      { isBrowser ?      
      <React.Fragment>
      <Col lg={3} md={3}></Col>
      <Col lg={6} md={6} style={{paddingTop: '10px'}}>
        <DesktopOrgForm handleSubmit={handleSubmit}/>
      </Col> 
      </React.Fragment>: 
      <Col>
        <DesktopOrgForm handleSubmit={handleSubmit}/>
      </Col> }
    </Row>
    </Container>
  );
};

export default OrgForm;
