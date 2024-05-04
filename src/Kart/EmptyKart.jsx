// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Col, Container, Image } from 'react-bootstrap'

function EmptyKart() {
    return (
        <Container className='d-flex justify-content-center align-items-center ' style={{height : '100vh'}}>
            <Col className='d-flex justify-content-center align-items-center '>
                <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/a74ca420589165.56042b53eb29b.gif"/>
            </Col>
        </Container>
    )
}

export default EmptyKart