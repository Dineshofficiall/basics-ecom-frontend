// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { TbCurrencyRupee } from 'react-icons/tb';
import { TiStarHalfOutline } from 'react-icons/ti';
import { useNavigate, useParams } from 'react-router-dom';

function Products() {
    const navigate = useNavigate();
    const Params = useParams();
    const searchName = Params.name;
    console.log("Params ==== >",searchName);
    
    const [productApi, updateProductApi] = useState([]);
    useEffect(()=>{
        const allProductApi = async () => {
            try {

                // all product
                const allProductsResponse = await axios.get('http://localhost:5300/Basics-Products/allProduct');
                updateProductApi(allProductsResponse.data);
                
                // // category
                // const uniqueCategories = [...new Set(allProductsResponse.data.map(item => item.categories))];
                // updateCategory(uniqueCategories);
                
                // // colorCategory
                // const uniqueColors = [...new Set(allProductsResponse.data.map(item => item.productColor))];
                // updateColor(uniqueColors);

                // // productSizes
                // const uniqueDressSize = [...new Set(allProductsResponse.data.map(item => item.productSize))];
                // setDressSize(uniqueDressSize);

                // setLoading(false);

            } catch (error) {
                console.error('Error getting all products:', error);
            }
        };

        allProductApi();
    }, [])
    const productDetailRedirect = (productId) =>{
        navigate(`/productDetails/${productId}`)
    }
    return (
        <>
            {/* Cards */}
            <Col sm={8} lg={9} className='py-4'>
                <Row xs={1} md={2} lg={3} className="gx-3 gy-4">
                    {productApi.map((responseObject, index)=>(
                        <Col key={index} onClick={()=> productDetailRedirect(responseObject.id)}>
                            <Card className='position-relative cards'>
                                <Card.Img variant="top" src={responseObject.productImage[0]} className='object-fit-contain ' style={{height : '30vh'}} />
                                <Card.Body>
                                    <Col className='d-flex justify-content-between align-items-center '>
                                        <Card.Text className='fw-bold fs-6 mb-2 d-flex justify-content-between align-items-center '>{responseObject.productName}</Card.Text>
                                        <Button variant="outline-warning">4<TiStarHalfOutline /></Button>{' '}
                                    </Col>
                                    <hr className='mt-3 mb-2' />
                                    <Card.Text>Baiscs | Product | {responseObject.categories}</Card.Text> 
                                    <Col className='d-flex justify-content-start align-items-center '> 
                                        <span>Price : <TbCurrencyRupee />{responseObject.productPrice}</span>
                                    </Col>
                                    <hr className='mt-3 mb-0' />
                                    <small className='bg-primary p-2 rounded-pill text-light card-offer-btn'>{responseObject.productDiscount}%off</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        {/* ends */}
        </>
    )
}

export default Products