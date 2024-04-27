// eslint-disable-next-line no-unused-vars
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'

import { Container, Row, Col, Card, Button} from 'react-bootstrap';
import { TbCurrencyRupee } from "react-icons/tb";
import { TiStarHalfOutline } from "react-icons/ti";

function ProductDetailPage() {
    const [apiObj, updateApiObj] = useState([]);
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
    return (
        <>
            <Container>
                {/* Cards */}
                <Col sm={9} className='py-4'>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {apiObj.map((responseObject, index)=>(
                            <Col key={index}>
                                <Card className='position-relative cards'>
                                    <Card.Img variant="top" src={responseObject.productImage[0]} className='object-fit-contain ' style={{height : '30vh'}} />
                                    <Card.Body>
                                        <Col className='d-flex justify-content-between align-items-center '>
                                            <Card.Text className='fw-bold fs-6 mb-2 d-flex justify-content-between align-items-center '>{responseObject.productName}</Card.Text>
                                            <Button variant="outline-warning">4<TiStarHalfOutline /></Button>{' '}
                                        </Col>
                                        <Card.Text>Baiscs | Product | {responseObject.categories}</Card.Text> 
                                        <Col className='d-flex justify-content-between align-items-center '> 
                                            <span>Price : <TbCurrencyRupee />{responseObject.productPrice}</span>
                                            <Button variant="outline-secondary rounded-pill">Add to Cart</Button>{' '}
                                        </Col>
                                        <hr />
                                        <small className='bg-primary p-2 rounded-pill text-light card-offer-btn'>{responseObject.productDiscount}%off</small>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Container>
        </>
    );
}

export default ProductDetailPage