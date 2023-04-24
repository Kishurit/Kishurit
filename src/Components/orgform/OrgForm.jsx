import { useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { getPost } from '../../api';
import DesktopOrgForm from './DesktopOrgForm';
import MobileOrgForm from './MobileOrgForm';
import { Container, Col } from 'react-bootstrap';

const OrgForm = () => {    
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear();

    const { name, link1, link2, link3, facebook_link1, facebook_link2,
    linkedIn_link, instagram_link, email1, email2, tel1, tel2, whatsapp, region, message } = e.target.elements;
    
    let details = {
      name: name.value,
      link1: link1.value,
      ...(link2 && {link2: link2.value}),
      ...(link3 && {link3: link3.value}),
      ...(facebook_link1 && {facebook_link1: facebook_link1.value}),
      ...(facebook_link2 && {facebook_link2: facebook_link2.value}),
      ...(linkedIn_link && {linkedIn_link: linkedIn_link.value}),
      ...(instagram_link && {instagram_link: instagram_link.value}),
      ...(email1 && {email1: email1.value}),
      ...(email2 && {email2: email2.value}),
      ...(tel1 && {tel1: tel1.value}),
      ...(tel2 && {tel2: tel2.value}),
      ...(whatsapp && {whatsapp: whatsapp.value}),
      ...(region && {region: region.value}),
      ...(message && {message: message.value})
    };
    console.log (JSON.stringify(details, null, 2));
    getPost ('/neworg', { key: 'romanbr87', ...details })
    .then (val => console.log (val))
    .catch (val => console.log (val))

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
