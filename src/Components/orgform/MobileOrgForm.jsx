import React from 'react';
import { Form, Button } from 'react-bootstrap';

const MobileOrgForm = ({ handleSubmit }) => {
  return (
    <React.Fragment>
      <Form className="text-right" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">להגיש עסק חדש</h3>

        <Form.Group controlId="site_name" className="mb-3">
          <Form.Control size="sm" type="text" name="site_name" required placeholder="*שם" />
        </Form.Group>

        <Form.Group controlId="link1" className="mb-3">
          <Form.Control size="sm" type="text" name="link1" required placeholder="*קישור1" />
        </Form.Group>

        <Form.Group controlId="link2" className="mb-3">
          <Form.Control size="sm" type="text" name="link2" placeholder="קישור2" />
        </Form.Group>

        <Form.Group controlId="link3" className="mb-3">
          <Form.Control size="sm" type="text" name="link3" placeholder="קישור3" />
        </Form.Group>

        <Form.Group controlId="facebook_link1" className="mb-3">
          <Form.Control size="sm" type="text" name="facebook_link1" placeholder="קישור לפייסבוק" />
        </Form.Group>

        <Form.Group controlId="facebook_link2" className="mb-3">
          <Form.Control size="sm" type="text" name="facebook_link2" placeholder="קישור לפייסבוק2" />
        </Form.Group>

        <Form.Group controlId="linkedIn_link" className="mb-3">
          <Form.Control size="sm" type="text" name="linkedIn_link" placeholder="קישור ללינקדאין" />
        </Form.Group>

        <Form.Group controlId="instagram_link" className="mb-3">
          <Form.Control size="sm" type="text" name="instagram_link" placeholder="קישור לאינסטגרם" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email1">
          <Form.Control size="sm" type="email" name="email1" placeholder="אימייל" />
        </Form.Group>

        <Form.Group controlId="email2" className="mb-3">
          <Form.Control size="sm" type="email" name="email2" placeholder="אימייל2" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tel1">
          <Form.Control size="sm" type="tel" name="tel1" placeholder="טלפון" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tel2">
          <Form.Control size="sm" type="tel" name="tel2" placeholder="טלפון2" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="whatsapp">
          <Form.Control size="sm" type="tel" placeholder="מספר ווטסאפ" name="whatsapp" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="region">
          <Form.Select size="sm" defaultValue="" name="region">
            <option value="">כל הארץ</option>
            <option value="north">צפון</option>
            <option value="center">מרכז</option>
            <option value="south">דרום</option>
            <option value="yosh">יו"ש</option>
            <option value="website">אתר אינטרנט</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>הערות:</Form.Label>
          <Form.Control size="sm" as="textarea" name="message" rows={6} />
        </Form.Group>

        <Button variant="primary" size="sm" type="submit">
          לשלוח
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default MobileOrgForm;
