// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import { Container, Col, Image, Row } from 'react-bootstrap';
import '../EmptyPage/style.css'

function EmptyPage() {
    
    return (
        <Container className='unknown-url-block'>
            <Row>
                <Image src="https://material-kit-react.devias.io/assets/error-404.png" style={{height : "80vh"}}></Image>
                <Col className='d-flex justify-content-center align-items-center '>
                    <p>Unknown Url</p>
                </Col>
            </Row>
        </Container>
    )
}

export default EmptyPage