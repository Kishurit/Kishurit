import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

const MobileOrgForm = ({handleSubmit}) => {
    return (
        <Form className="text-right" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">להגיש עסק חדש</h3>

        <Row className="mb-2">
            <Form.Group controlId="link1" className="mb-3" as={Col} lg={6} md={6}>
                <Form.Label htmlFor="name"><span className="astrix">*</span>שם:</Form.Label>
                <Form.Control type="text" name="name" required />
            </Form.Group>
        
            <Form.Group controlId="link1" className="mb-3" as={Col} lg={6} md={6}>
            <Form.Label htmlFor="link1"><span className="astrix">*</span>קישור1:</Form.Label>
            <InputGroup>
                <Form.Control type="text" name="link1" required />
            </InputGroup>
            </Form.Group>
        </Row>

        <Row className="mb-2">
            <Form.Group controlId="link2" className="mb-3" as={Col} lg={6} md={6}>
                <Form.Label htmlFor="link2">קישור2:</Form.Label>
                <Form.Control type="text" name="link2" />
            </Form.Group>

            <Form.Group controlId="link3" className="mb-3" as={Col} lg={6} md={6}>
                <Form.Label>קישור3:</Form.Label>
                <Form.Control type="text" name="link3" />
            </Form.Group>
        </Row>

        <Row className="mb-2">
            <Form.Group controlId="facebook_link1" className="mb-3" as={Col} lg={6} md={6}>
            <Form.Label htmlFor="facebook_link1">קישור פייסבוק1:</Form.Label>
            <Form.Control type="text" name="facebook_link1"/>
            </Form.Group>

            <Form.Group controlId="facebook_link2" className="mb-3" as={Col} lg={6} md={6}>
            <Form.Label htmlFor="facebook_link2">קישור פייסבוק2:</Form.Label>
            <Form.Control type="text" name="facebook_link2" />
            </Form.Group>
        </Row>

        <Row className="mb-2">
        <Form.Group controlId="linkedIn_link" className="mb-3" as={Col} lg={6} md={6}>
            <Form.Label htmlFor="linkedIn_link">קישור לינקדאין:</Form.Label>
            <Form.Control type="text" name="linkedIn_link" />
        </Form.Group>

        <Form.Group controlId="instagram_link" className="mb-3" as={Col} lg={6} md={6}>
            <Form.Label htmlFor="instagram_link">קישור אינסטגרם:</Form.Label>
            <Form.Control type="text" name="instagram_link" />
        </Form.Group>
        </Row>


        <Row>
        <Form.Group className="mb-3" controlId="email1" as={Col} lg={6} md={6}>
            <Form.Label htmlFor="email1">כתובת מייל1:</Form.Label>
            <Form.Control type="email" id="email1" name="email1" />
        </Form.Group>

        <Form.Group controlId="email2" className="mb-3" as={Col} lg={6} md={6}>
            <Form.Label htmlFor="email2">כתובת מייל2:</Form.Label>
            <Form.Control type="email" id="email2" name="email2" />
        </Form.Group>
        </Row>
        
        <Row>
        <Form.Group className="mb-3" as={Col} lg={6} md={6} controlId="tel1">
            <Form.Label htmlFor="tel1">מספר טלפון1:</Form.Label>
            <Form.Control type="tel" name="tel1" />
        </Form.Group>

        <Form.Group className="mb-3" as={Col} lg={6} md={6} controlId="tel2">
            <Form.Label htmlFor="tel2">מספר טלפון2:</Form.Label>
            <Form.Control type="tel" name="tel2" />
        </Form.Group>
        </Row>

        <Row>
        <Form.Group className="mb-3" controlId="whatsapp" as={Col} lg={6} md={6}>
            <Form.Label htmlFor="whatsapp">מספר ווטסאפ:</Form.Label>
            <Form.Control type="tel" placeholder="מספר ווטסאפ" name="whatsapp" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="region" as={Col} lg={6} md={6}>
            <Form.Label htmlFor="region">אזור גאוגרפי:</Form.Label>
            <Form.Select defaultValue="" name="region">
            <option value="">כל הארץ</option>
                <option value="north">צפון</option>
                <option value="center">מרכז</option>
                <option value="south">דרום</option>
                <option value="yosh">יו"ש</option>
            </Form.Select>
        </Form.Group>
        </Row>

        <Row className="mb-2">
        <Col>
        <Form.Group>
        <Form.Label htmlFor="message">
            <span className="astrix">*</span>הודעה:
        </Form.Label>
        <Form.Control as="textarea" name="message" rows={6} />
        </Form.Group>
        </Col>
        </Row>

        <Button variant="primary" size="sm" type="submit">לשלוח</Button>
    </Form>
    )
}

export default MobileOrgForm