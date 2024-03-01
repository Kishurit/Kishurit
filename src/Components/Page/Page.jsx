import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { FaExternalLinkAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import "../../style/page.css";
// import MapWithLocation from "./MapWithLocation";

export default function Page() {
  const [position, setPosition] = useState();

  const data0 = {
    site_name: "נציב שירות המדינה",
    link: "https://www.gov.il/he/service/apply_for_a_civil_service_job_via_tenders_system",
    link2: "https://www.gov.il/he/Departments/civil_service_commission",
    link3:
      "https://www.gov.il/he/Departments/publications/?publicationType=0ec5a7ef-977c-459f-8c0a-dcfbe35c8164&drushimStatusType=1&skip=0&limit=10",
    facebook_link1: "https://www.facebook.com/Civil.service.Israel",
    facebook_link2: "",
    facebook_link3: [],
    linkedIn_link: "",
    email1: "pniyot@csc.gov.il",
    email2: "",
    tel1: "074-769-9100",
    tel2: "",
    whatsapp: "",
    location: "",
  };

  const data = {
    site_name: data0.site_name,
    links: [data0.link, data0.link2, data0.link3],
    socMedia_links: [
      { name: "פייסבוק", link: data0.facebook_link1 },
      { name: "פייסבוק", link: data0.facebook_link2 },
    ],
    email: [data0.email1, data0.email2],
    tel: [data0.tel1, data0.tel2],
    whatsapp: data0.whatsapp,
    location: data0.location,
  };

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ('geolocation' in navigator) {
      // Use navigator.geolocation to get the user's current position
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
      });
    }
  }, []);

  return (
    <Container className="uicontainer" style={{ textAlign: "right" }}>
      <h1 className="beautiful-title text-center">{data.site_name}</h1>

      <Row>
        <Col lg={6} md={6}>
          <div className="well">
            <h4>קישורים שימושיים</h4>
            <h5>אתרי אינטרנט</h5>
            <ul className="d-flex gap-3 mb-4 mt-0">
              {data.links.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    קישור {index + 1} <FaExternalLinkAlt />
                  </a>
                </li>
              ))}
            </ul>
            <h5>רשתות חברתיות</h5>
            <ul className="d-flex gap-3 mb-4 mt-0">
              {data.socMedia_links.map((link, index) => (
                <li key={index}>
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.name} <FaExternalLinkAlt />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="well bg-light">
            <h4>פרטי התקשרות</h4>
            <ul className="link-list gap-3 mb-3 mt-1">
              {data.email.map((email, index) => (
                <li key={index} className="mt-1 mb-1">
                  <label>
                    <FaEnvelope />{" "}
                    <a
                      href={"mailto:" + email}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {email}
                    </a>
                  </label>
                </li>
              ))}
              {data.tel.map((tel, index) => (
                <li key={index} className="mt-1 mb-1">
                  <label>
                    <FaPhone />{" "}
                    <a
                      href={"tel:" + tel}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tel}
                    </a>
                  </label>
                </li>
              ))}

              <li className="mt-1 mb-1">
                <label>
                  <FaPhone />{" "}
                  <a
                    href={"tel:" + data.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.whatsapp}
                  </a>
                </label>
              </li>
            </ul>
          </div>
        </Col>

        <Col lg={6} md={6}>
          {/* <h1>{position && `${position[0]}, ${position[1]}`}</h1> */}
          {/* {position && <MapWithLocation position={position}/> } */}
        </Col>
      </Row>
    </Container>
  );
}
