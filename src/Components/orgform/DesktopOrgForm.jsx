import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { isBrowser, isMobile } from "react-device-detect";

const initialValues = {
  site_name: "",
  link1: "",
  link2: "",
  link3: "",
  facebook_link1: "",
  facebook_link2: "",
  linkedIn_link: "",
  instagram_link: "",
  email1: "",
  email2: "",
  tel1: "",
  tel2: "",
  whatsapp: "",
  location: "",
  message: "",
};

const DesktopOrgForm = ({ handleSubmit }) => {
  return (
    <React.Fragment>
      <Form className={"text-right" + (isBrowser && " well2")} onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">להגיש עסק חדש</h3>
        <Row>
          <Form.Group
            controlId="site_name"
            className="mb-3"
            as={Col}
            lg={6}
            md={6}
          >
            <Form.Control
              size="sm"
              type="text"
              name="site_name"
              required
              placeholder="*שם"
            />
          </Form.Group>

          <Form.Group controlId="link1" className="mb-3" as={Col} lg={6} md={6}>
            <Form.Control
              size="sm"
              type="text"
              name="link1"
              required
              placeholder="*קישור1"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="link2" className="mb-3" as={Col} lg={6} md={6}>
            <Form.Control
              size="sm"
              type="text"
              name="link2"
              placeholder="קישור2"
            />
          </Form.Group>

          <Form.Group controlId="link3" className="mb-3" as={Col} lg={6} md={6}>
            <Form.Control
              size="sm"
              type="text"
              name="link3"
              placeholder="קישור3"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            controlId="facebook_link1"
            className="mb-3"
            as={Col}
            lg={6}
            md={6}
          >
            <Form.Control
              size="sm"
              type="text"
              name="facebook_link1"
              placeholder="קישור לפייסבוק"
            />
          </Form.Group>

          <Form.Group
            controlId="facebook_link2"
            className="mb-3"
            as={Col}
            lg={6}
            md={6}
          >
            <Form.Control
              size="sm"
              type="text"
              name="facebook_link2"
              placeholder="קישור לפייסבוק2"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            controlId="linkedIn_link"
            className="mb-3"
            as={Col}
            lg={6}
            md={6}
          >
            <Form.Control
              size="sm"
              type="text"
              name="linkedIn_link"
              placeholder="קישור ללינקדאין"
            />
          </Form.Group>

          <Form.Group
            controlId="instagram_link"
            className="mb-3"
            as={Col}
            lg={6}
            md={6}
          >
            <Form.Control
              size="sm"
              type="text"
              name="instagram_link"
              placeholder="קישור לאינסטגרם"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            className="mb-3"
            controlId="email1"
            as={Col}
            lg={6}
            md={6}
          >
            <Form.Control
              size="sm"
              type="email"
              name="email1"
              placeholder="אימייל"
            />
          </Form.Group>

          <Form.Group
            controlId="email2"
            className="mb-3"
            as={Col}
            lg={6}
            md={6}
          >
            <Form.Control
              size="sm"
              type="email"
              name="email2"
              placeholder="אימייל2"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" as={Col} lg={6} md={6} controlId="tel1">
            <Form.Control
              size="sm"
              type="tel"
              name="tel1"
              placeholder="טלפון"
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} lg={6} md={6} controlId="tel2">
            <Form.Control
              size="sm"
              type="tel"
              name="tel2"
              placeholder="טלפון2"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            className="mb-3"
            controlId="whatsapp"
            as={Col}
            lg={6}
            md={6}
          >
            <Form.Control
              size="sm"
              type="tel"
              placeholder="מספר ווטסאפ"
              name="whatsapp"
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="location"
            as={Col}
            lg={6}
            md={6}
          >
            <Form.Select size="sm" defaultValue="" name="location">
              <option disabled={true}>*מיקום</option>
              <option value="">כל הארץ</option>
              <option value="north">צפון</option>
              <option value="center">מרכז</option>
              <option value="south">דרום</option>
              <option value="yosh">יו"ש</option>
              <option value="website">אתר אינטרנט</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>תיאור והערות לגבי העסק:</Form.Label>
            <Form.Control size="sm" as="textarea" name="message" rows={5} />
          </Form.Group>
        </Row>

        <Row fluid>
          <Col className={isMobile && "d-grid"}>
            <Button variant="primary" size="sm" type="submit">
              לשלוח
            </Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default DesktopOrgForm;
