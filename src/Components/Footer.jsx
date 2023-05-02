import { isBrowser } from "react-device-detect";
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from "react-redux";

export default function Footer() {
    const data = useSelector((state) => state.data.total)
    return (
    <Container fluid>
    <Row className="fixed-bottom bg-light">
    <Col> 
        { isBrowser ? <h5 style={{marginRight: '1em'}}>{data} רשומות</h5> :
        <h3 style={{marginRight: '1em'}}>{data} רשומות</h3> }
    </Col>
    </Row>
    </Container>
    )
}
