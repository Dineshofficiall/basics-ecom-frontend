// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function AboutProduct() {
    // product id Display
    // const dataContext = useContext();
    // const localProductId = dataContext.productId;
    return (
        <>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className='d-flex justify-content-between align-items-center '>
                            <p>Brand : Basics</p>
                            <p>Color : Yellow</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center '>
                            <p>Category : Shirt</p>
                            <p>Material : Polyster</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center '>
                            <p>Gender : Male</p>
                            <p>Discount : 50%</p>
                        </div>
                    </Col>
                    <Col>
                        <h6>Description</h6>
                        <p className='px-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, error exercitationem. Et, ut placeat explicabo asperiores accusantium libero animi aliquam? Et.</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AboutProduct