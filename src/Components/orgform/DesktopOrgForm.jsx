import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { isBrowser, isMobile } from "react-device-detect";

const initialValues = {
  org_name: "",
  web_link: [""],
  facebook_link: [""],
  linkedIn_link: [""],
  instagram_link: [""],
  email: [""],
  tel: [{ tel: "", owner: "" }],
  whatsapp: [{ tel: "", owner: "" }],
  location: "",
  desc: "",
};

const locationOptions = [
  { value: "", text: "כל הארץ" },
  { value: "north", text: "צפון" },
  { value: "center", text: "מרכז" },
  { value: "south", text: "דרום" },
  { value: "yosh", text: 'יו"ש' },
  { value: "website", text: "אתר אינטרנט" }
];


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
          {initialValues.web_link.map((val, i) =>
            <Form.Group controlId={`web_link${i}`} className="mb-3" as={Col} lg={6} md={6}>
              <Form.Control
                size="sm"
                type="text"
                name={`web_link${i}`}
                required={i == 0}
                placeholder={`${i == 0 ? "*" : ""}קישור${i + 1}`}
              />
            </Form.Group>
          )}
          {initialValues.facebook_link.map((val, i) =>
            <Form.Group
              controlId={`facebook${i}`}
              className="mb-3"
              as={Col}
              lg={6}
              md={6}
            >
              <Form.Control
                size="sm"
                type="text"
                name={`facebook${i}`}
                placeholder={`קישור לפייסבוק${i + 1}`}
              />
            </Form.Group>
          )}

          {initialValues.linkedIn_link.map((val, i) =>
            <Form.Group
              controlId={`linkedIn_link${i}`}
              className="mb-3"
              as={Col}
              lg={6}
              md={6}
            >
              <Form.Control
                size="sm"
                type="text"
                name={`linkedIn_link${i}`}
                placeholder={`קישור ללינקדאין${i + 1}`}
              />
            </Form.Group>
          )}

          {initialValues.instagram_link.map((val, i) =>
            <Form.Group
              controlId={`instagram_link${i}`}
              className="mb-3"
              as={Col}
              lg={6}
              md={6}
            >
              <Form.Control
                size="sm"
                type="text"
                name={`instagram_link${i}`}
                placeholder={`קישור לאינסטגרם${i + 1}`}
              />
            </Form.Group>
          )}

          {initialValues.email.map((val, i) =>
            <Form.Group
              className="mb-3"
              controlId={`email${i}`}
              as={Col}
              lg={6}
              md={6}
            >
              <Form.Control
                size="sm"
                type="email"
                name={`email${i}`}
                placeholder={`אימייל${i + 1}`}
              />
            </Form.Group>
          )}

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
              {locationOptions.map(option => (
                <option key={option.value} value={option.value}>{option.text}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>תיאור והערות לגבי העסק:</Form.Label>
            <Form.Control size="sm" as="textarea" name="message" rows={5} />
          </Form.Group>
        </Row>

        <Row>
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
