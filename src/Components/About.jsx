import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import ContactForm from './ContactForm';
import { isBrowser } from 'react-device-detect';

export default function About() {
 
  const AboutTxt = () => 
  <>
      <Row>
      <Col className="page-header">
        <h3 id="title" style={{ textAlign: 'center', width: "100%"  }}>אודות אתר קישורית</h3>
      </Col>
      </Row>

      <Row><Col>
      <p className="text text-right">
      העידן המודרני מייצר לנו המון מקומות תעסוקה, חברות כוח אדם+רכזי תעסוקה ולא מעט אתרי אינטרנט בתחום. מחפש עבודה ממוצע לא פעם יכול להתקשות מאוד בחיפוש עבודה. רבים מהאתרים וחברות כוח האדם גם לא מוכרות לציבור הרחב. בכל מקרה חיפוש העבודה בסופו של דבר מתאפשר ברשת. עם זאת, ישנו רצון לא רק להגיע להיקף משרות גדול אלא גם להיקף מקומות תעסוקה גדול בתחום.    
      </p>
      </Col></Row>

      <Row><Col>
      <p className="text text-right">
      הכלי הזה מייצר פתרון חלקי לבעיה. קטלוג מקומות התעסוקה וחברות כוח האדם יתן למחפשי העבודה אפשרות להכיר את הגורמים השונים בתחום התעסוקה ודרכם לחפש תעסוקה. בהמשך נוכל להקים על הקטלוג מנוע חיפוש לעבודה. כרגע אין היתכנות לזה.        
      </p>
      </Col></Row>

      <Row><Col>
      <p className="text text-right">
      הקטלוג יחלוק לקטגוריות ותתי קטגוריות. כרגע החלוקה די דינאמית. לכל מקום עבודה/חברת כוח אדם יהיו קישורים לאתרי אינטרנט ברשת ואו לדפים ברשתות חברתיות. כמובן שיש גם חיפוש.        
      </p>
      </Col></Row>
      
      <Row><Col>
      <p className="text text-right">
      אינדקס האתרים הוא די בעייתי עקב הדינמיות הרבה ברשת. בשל כך, אנחנו זקוקים לחוכמת ההמונים, לעזרה מכם. אם אתם מכירים גורם תעסוקתי שלא קיים בקטלוג, קישור של אתר שלא קיים או כל בעיה אחרת בקטלוג, ניתן לפנות ניתן לפנות אלינו ל          
      <a href="mailto:drushimgalil@gmail.com">מייל</a> 
      </p>
      </Col></Row>
  </>
  

  const BrowserElement = () => 
    <>
      <Row>
        <Col lg={1} md={1}></Col>
        <Col lg={6} md={6}>
          <AboutTxt/>
        </Col>
        <Col lg={1} md={1}></Col>
        <Col lg={4} md={4} style={{marginTop: "2em"}}>
          <ContactForm />
        </Col>
      </Row>
    </>

  const MobileElement = () => 
    <>
      <AboutTxt />
      <br />
      <Row>
        <Col style={{marginBottom: '2em'}}>
          <ContactForm />
        </Col>
      </Row>
    </>

return (
    <Container className="uicontainer">
    { isBrowser ? <BrowserElement/> : <MobileElement /> }
    </Container> 
  )
}
  