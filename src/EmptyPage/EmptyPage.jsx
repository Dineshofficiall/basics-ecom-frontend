// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import { Container, Col, Image, Row } from 'react-bootstrap';
import '../EmptyPage/style.css'

function EmptyPage() {
    
    return (
        <Container className='unknown-url-block'>
            <Row>
                <Image src="https://material-kit-react.devias.io/assets/error-404.png" className='object-fit-contain' style={{height : "70vh"}}></Image>
                <Col sm={12} className='d-flex justify-content-center align-items-center '>
                    <p>Unknown Url</p>
                </Col>
                <Col sm={12}>
                    <h4 className='fw-bold text-center'>404 Not Found</h4>
                </Col>
            </Row>
        </Container>
    )
}

export default EmptyPage