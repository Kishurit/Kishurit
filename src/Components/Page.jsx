import React from 'react';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { NotificationManager} from 'react-notifications';
import { Container, Form, Col, FloatingLabel } from 'react-bootstrap';

export default function Page({cat, subcat, id}) {
    const data = useSelector((state) => state.data);
    const myData = data.status==='ready'? data[cat]?.links[subcat]?.links[id] : null;

    useEffect (()=>{
        console.clear();
        console.log (myData);
        if (myData === undefined) NotificationManager.error ('גישה לא נכונה לעסק') 

    }, [myData])

    if (!myData) return <p>null</p>
    return (
        <>
        <Container fluid className='uicontainer' style={{textAlign: 'right'}}>
        <pre className='text-left' style={{direction: 'rtl'}}>
            {JSON.stringify(myData,undefined, 2)}
        </pre>
        
        <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating>
            <Form.Control
            id="floatingPasswordCustom"
            type="password"
            placeholder="Password"
            />
            <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
    
        </Container>
        </>
    )
}


