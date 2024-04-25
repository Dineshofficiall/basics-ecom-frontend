// eslint-disable-next-line no-unused-vars
import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';

function Footer() {
    return (
        <>
            <Container className='bg-dark text-light pt-5 pb-3' fluid>
                <Row className='d-flex justify-content-evenly align-items-center '>
                    <Col xs={6} lg={3} className='text-center'>
                        <h3>Basics</h3>
                        <hr />
                        <div>
                            <p>Who we are?</p>
                            <p>Store Offers</p>
                            <p>Store Locator</p>
                            <p>SiteMap</p>
                        </div>
                    </Col>
                    <Col xs={6} lg={3} className='text-center'>
                        <h3>Help</h3>
                        <hr />
                        <div>
                            <p>Track Order</p>
                            <p>FAQ</p>
                            <p>Returns</p>
                            <p>Cancellations</p>
                        </div>
                    </Col>
                    <Col xs={6} lg={3} className='text-center'>
                        <h3>Our Policies</h3>
                        <hr />
                        <div>
                            <p>Order Policy</p>
                            <p>Buying Policy</p>
                            <p>Stocks Policy</p>
                            <p>Term Policy</p>
                        </div>
                    </Col>
                    <Col xs={6} lg={3} className='text-center'>
                        <h3>Payments</h3>
                        <hr />
                        <div>
                            <p>Upi Transaction</p>
                            <p>Credit Cards</p>
                            <p>Account Transfer</p>
                            <p>Cred official Partner</p>
                        </div>
                    </Col>
                </Row>
                <hr />
                <p className="fs-6 fw-bold ">2024 <span>&copy;</span> Basics All rights reserved.</p>
            </Container>
        </>
    )
}

export default Footer