// eslint-disable-next-line no-unused-vars
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'

import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

// css
import './ProductDetailPage.css'

// bootstrap
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

// nestedRoute
import { Link, Outlet } from 'react-router-dom'

// icons
import { MdOutlineStarRate } from "react-icons/md";
import { LiaHandHoldingHeartSolid } from "react-icons/lia";

function ProductDetailPage() {
    const [apiObj, updateApiObj] = useState('');
    const Params = useParams();
    useEffect(()=>{
        idByProduct();
    }, [])

    const idByProduct = () =>{
        axios.get(`http://localhost:5300/Basics-Products/singleProduct/${Params.id}`)
        .then((response)=>{
            console.log(response.data);
            updateApiObj(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    const pageDirectKart = ()=>{
        
    }

    return (
        <>
            <NavBar />

            {/* Cards */}
            {/* <Col sm={9} className='py-4'>
                {apiObj.productPrice}
                        <Row xs={1} md={2} lg={3} className="gx-3 gy-4">
                            {apiObj.map((responseObject, index)=>(
                                <Col >
                                    <Card className='position-relative cards'>
                                        <Card.Img variant="top" src={apiObj.productImage[0]} className='object-fit-contain ' style={{height : '30vh'}} />
                                        <Card.Body>
                                            <Col className='d-flex justify-content-between align-items-center '>
                                                <Card.Text className='fw-bold fs-6 mb-2 d-flex justify-content-between align-items-center '>{apiObj.productName}</Card.Text>
                                                <Button variant="outline-warning">4</Button>{' '}
                                            </Col>
                                            <Card.Text>Baiscs | Product | {apiObj.categories}</Card.Text> 
                                            <Col className='d-flex justify-content-between align-items-center '> 
                                                <span>Price : {apiObj.productPrice}</span>
                                                <Button variant='outline-secondary rounded-pill' className='' onClick={()=> idByProduct(apiObj.id)}>Click Here</Button>{' '}
                                            </Col>
                                            <hr />
                                            <small className='bg-primary p-2 rounded-pill text-light card-offer-btn'>{apiObj.productDiscount}%off</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col> */}
            {/* productDetails */}
            <Container>
                <Row className='my-4 d-flex justify-content-center align-items-start'>

                    {/* img block */}
                    <Col lg={4}>
                        <Col lg={12} className='d-flex justify-content-center align-items-center mt-3'>
                            <Image src="https://assets.ajio.com/medias/sys_master/root/20221130/KECd/63873295f997ddfdbdac1468/-473Wx593H-443002269-olivegreen-MODEL.jpg" style={{width : '80%', height : '50vh'}} />
                        </Col>
                        <Col lg={12} className='d-flex justify-content-evenly align-items-center my-3'>
                            <Col lg={2}>
                                <Image src="https://assets.ajio.com/medias/sys_master/root/20221130/KECd/63873295f997ddfdbdac1468/-473Wx593H-443002269-olivegreen-MODEL.jpg" style={{width : '100%'}} />
                            </Col>
                            <Col lg={2}>
                                <Image src="https://assets.ajio.com/medias/sys_master/root/20221130/qX7m/63873417f997ddfdbdac1ebc/-473Wx593H-443002269-olivegreen-MODEL4.jpg" style={{width : '100%'}} />
                            </Col>
                            <Col lg={2}>
                                <Image src="https://assets.ajio.com/medias/sys_master/root/20221130/qX7m/63873417f997ddfdbdac1ebc/-473Wx593H-443002269-olivegreen-MODEL4.jpg" style={{width : '100%'}} />
                            </Col>
                            <Col lg={2}>
                                <Image src="https://assets.ajio.com/medias/sys_master/root/20230324/smII/641d7f8c907deb497aaed137/-473Wx593H-443007829-blue-MODEL.jpg" style={{width : '100%'}} />
                            </Col>
                        </Col>
                    </Col>

                    {/* middle hide */}
                    <Col lg={5} className='pb-2 position-relative '>
                        <Col className='fw-bolder my-3 d-flex flex-column align-items-start justify-content-start'>
                            <h2>Essentials Mens Regular-Fit Long-Sleeve Oxford Shirt</h2>
                            <div className='d-flex justify-content-evenly align-items-center w-50 mt-3 '>
                                <p className='d-flex justify-content-center align-items-center '>4<MdOutlineStarRate /><span className='ms-2'>Ratings</span></p>
                                <p>|</p>
                                <p className='d-flex align-items-center justify-content-center'>2000<span className='mx-2'>~</span>review</p>
                            </div>
                        </Col>
                        <Col style={{width : "40%"}}>
                            <h6>Choose Size</h6>
                            <div className='d-flex justify-content-evenly align-items-center'>
                                <span className='p-2 px-3 bg-info'>S</span>
                                <span className='p-2 px-3 bg-info'>M</span>
                                <span className='p-2 px-3 bg-info'>L</span>
                                <span className='p-2 px-3 bg-info'>XL</span>
                            </div>
                        </Col>
                        <Col className='mt-4'>
                            <Button variant='outline-dark' className='w-50' onClick={pageDirectKart}>Add to cart</Button>
                        </Col>
                        <Col className='mt-4'>
                            <Col className='d-flex justify-content-start align-items-center py-2'>
                                <Link className='mx-5 text-dark fw-semibold text-decoration-none ' to='aboutProduct'>About item</Link>
                                <Link className='ms-4 text-dark fw-semibold text-decoration-none ' to='review'>Review</Link>
                            </Col>
                            <hr />
                            <Col lg={12}>
                                <Outlet />
                            </Col>
                        </Col>
                        <Col className='whislists p-0'>
                            <Button variant='outline-dark' className='fs-5 rounded-pill '><LiaHandHoldingHeartSolid /></Button>
                        </Col>
                    </Col>
                </Row>
            </Container>

            {/* footer */}
            <Footer />
        </>
    );
}

export default ProductDetailPage