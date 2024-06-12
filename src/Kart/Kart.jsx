// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Image, Row, Button, Navbar } from 'react-bootstrap'

import '../Kart/kart.css'

// icons
import { HiMiniPlusSmall, HiMiniMinusSmall  } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { useDataContext } from '../useContext/DataContext';
import { useParams } from 'react-router-dom';

function Kart() {
    // useContext
    const dataContext = useDataContext();

    // Params
    const Params = useParams();

    const [kartData, updateKartData] = useState([]);
    
    useEffect(() => {
        if (dataContext.userObject.id && kartData.length === 0) {
            allKartProducts(); // Fetch cart data when userObject.id is available and kartData is empty
            kartQuantityObject();
        }
        allKartProducts();
        kartQuantityObject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // all kart products
    const allKartProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5300/basics-kart/getAllKartData/${dataContext.userObject.id}`)
            updateKartData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching kart data:', error);
        }
    };

    // button quantity
    const [quantity, UpdateQuantity] = useState(0);
    const kartQuantityObject = async () =>{
        try {
            const kartQuantityResponse = await axios.get(`http://localhost:5300/Basics-kart-quantity/getQuantityById/${dataContext.userObject.id}/${Params.id}`);
            UpdateQuantity(kartQuantityResponse.data.productQuantity);
        } catch (error) {
            console.error('error fetching quantity: ', error);
        }
    }

    // item price
    const [itemTotal, updateItemTotal] = useState(0);

    const gst = (12 / 100) * itemTotal;
    
    // totalBill
    const total = itemTotal + gst;

    // updates increment decrement
    const [kartQuantity, setKartQuantity] = useState({
        userId : dataContext.userObject.id,
        productId : null,
        productSizeId : Params.id,
        productQuantity : null
    });
    
    const decrement = (pId, productSizeId)=>{
        setKartQuantity((prev)=>({
            ...prev, productId : pId, productQuantity : -productSizeId
        }))
        decrementApi();
    };
    const decrementApi = async ()=>{
        try{
            const updateResponse = await axios.put(`http://localhost:5300/Basics-kart-quantity/updateQuantityById`, kartQuantity);
            UpdateQuantity(updateResponse.data);
        } catch (error) {
            console.log('error fetching quantity: ', error)
        }        
    };
    const increament = (pId, productSizeId)=>{
        setKartQuantity((prev)=>({
            ...prev, productId : pId, productQuantity : productSizeId
        }))
        incrementApi();
    };
    const incrementApi = async ()=>{
        try {
            const updateResponse = await axios.put(`http://localhost:5300/Basics-kart-quantity/updateQuantityById`, kartQuantity);
            UpdateQuantity(updateResponse.data)
        } catch (error) {
            console.log('error fetching quantity: ', error);
        }
    };


    const kartDelete = (kartProductId)=>{
        axios.delete(`http://localhost:5300/basics-kart/deleteById/${kartProductId}`)
        .then((res)=>{
            console.log(res.data);
            allKartProducts();
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    return (
        <>
            <div className='parent'>
                <Container className='mt-5 d-flex justify-content-between align-items-center '>
                    <Col className='d-flex justify-content-start align-items-center '>
                        <Navbar.Brand href="/Home"><Image src="https://basicslife.com/cdn/shop/files/Untitled-4-01_80x@2x.png?v=1711019726" style={{height : '4em'}} className='logo' thumbnail /></Navbar.Brand>
                        <h4>Secure CheckOut</h4>
                    </Col>
                    <Col lg={2} className='d-flex flex-column justify-content-center align-items-start location ps-lg-4 '>
                        <span className='location-text d-flex justify-content-start align-items-center location'><span className='location'><FaLocationDot /></span><span className='location'>Location</span></span>
                        {/* {locationResult ? <span className='location-text location'>{status}</span> : <Button variant="outline-dark" className=' location' onClick={fetchLocationData}>Click here</Button>} */}
                    </Col>
                </Container>

                <Container>
                    <hr />
                    {kartData.map((res, index)=>(
                        <Row key={index} className='my-3'>
                            <Col lg={12} className='d-flex justify-content-center position-relative '>
                                <Col lg={6} className='d-flex align-items-center '>
                                    <Col  className='d-flex justify-content-evenly align-items-center '>
                                        <Image src={res.products.productImage[0]} className='object-fit-contain ' style={{height : '13em' ,width : '45%'}} />
                                        <div>
                                            <h6>Product Name : {res.products.productName}</h6>
                                            <p>Selected Size : {res.productSize.size}</p>
                                        </div>
                                    </Col>
                                </Col>
                                
                                <Col lg={6} className='d-flex justify-content-end align-items-center'>
                                    <Col className='d-flex flex-column justify-content-center align-items-center '>
                                        <p>Price : ${res.products.productPrice}</p>
                                        <div>
                                            <Button className='p-1 px-2' variant="outline-danger" onClick={()=>decrement(res.products.id, res.productSize.id)}><HiMiniMinusSmall /></Button>{' '}
                                                <span className='p-1 mx-1'>{quantity}</span>
                                            <Button className='p-1 px-2' variant="outline-success" onClick={()=>increament(res.products.id, res.productSize.id)}><HiMiniPlusSmall /></Button>{' '}
                                        </div>
                                    </Col>
                                </Col>
                                <Button variant='outline-danger' className='kartClear p-1' onClick={()=>{kartDelete(res.products.id)}}><IoClose /></Button>
                            </Col>
                        </Row>
                    ))}
                </Container>
                
                <Container className='px-4'>
                    <Row className='my-5'>
                        <Col className='px-lg-4 ' lg={12}>
                            <Col lg={12} className='d-flex justify-content-between align-items-center my-3'>
                                <h5>Item Total</h5>
                                <h5>{itemTotal}</h5>
                            </Col>
                            <Col lg={12} className='d-flex justify-content-between align-items-center my-3'>
                                <h5>GST & Additonal Charges : </h5>
                                <h5>{gst}</h5>
                            </Col>
                            <Col lg={12} className='d-flex justify-content-between align-items-center my-3'>
                                <h5>Total : </h5>
                                <h5>{total}</h5>
                            </Col>
                        </Col>
                        <Col lg={12} className='text-center my-3'>
                            <Button variant='outline-success' className='w-50'>Check Out!</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Kart