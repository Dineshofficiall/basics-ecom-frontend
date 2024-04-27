// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

function Kart() {
    return (
        <>
            <Container fluid>
                <p className='fw-bold fs-6 '>set order</p>
                <hr />
                <Row>
                    <Col lg={12} className='d-flex justify-content-evenly align-items-center '>
                        <Col lg={3}>
                            <Image src='https://assets.ajio.com/medias/sys_master/root/20221130/KECd/63873295f997ddfdbdac1468/-473Wx593H-443002269-olivegreen-MODEL.jpg' style={{height : '100%', width : '100%'}} />
                        </Col>
                        <Col lg={9} className='ms-3 '>
                            <p>Selected Size</p>
                            <p>Xl (extra Larger)</p>
                        </Col>
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default Kart