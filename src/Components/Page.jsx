import React from 'react';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { NotificationManager} from 'react-notifications';
import { Container, Form, Col, FloatingLabel } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';

export default function Page({cat, subcat, id}) {
    const data = useFetch (`/${cat}/${subcat}/${id}`)
    useEffect (()=>{
        console.clear();
        console.log (data);
        if (data === undefined) NotificationManager.error ('גישה לא נכונה לעסק') 

    }, [data])

    if (!data) return <p>null</p>
    return (
        <>
        <Container fluid className='uicontainer' style={{textAlign: 'right'}}>
        <pre className='text-left' style={{direction: 'rtl'}}>
            {JSON.stringify(data,undefined, 2)}
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


