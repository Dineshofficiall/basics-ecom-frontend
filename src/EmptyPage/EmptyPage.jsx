// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import { Container, Col } from 'react-bootstrap';
import '../EmptyPage/style.css'

function EmptyPage() {
    
    return (
        <Container className='unknown-url-block'>
            <Col className='d-flex justify-content-center align-items-center '>
                <p>Unknown Url</p>
            </Col>
        </Container>
    )
}

export default EmptyPage