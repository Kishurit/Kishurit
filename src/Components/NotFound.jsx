import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const NotFound = () => {
    return (
        <Container className="uicontainer">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1>404: לא נמצא</h1>
                    <p className="text-center">הדף שביקשת לא נמצא</p>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
