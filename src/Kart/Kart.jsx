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

    // params
    const params = useParams();

    // kart object backend to create
    const [kartObj, setKartObj] = useState({
        productId : params.id,
        userId : dataContext.userObject.id
    });
    
    useEffect(()=>{
        console.log("productId kart =====> ", params.id, "userId =====>", dataContext.userObject.id);
    
        const kartApi = ()=>{
            axios.post(`http://localhost:5300/basics-kart/createKart`, kartObj)
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        kartApi();

        const allKartProducts = ()=>{
            axios.get(`http://localhost:5300/basics-kart/getAllKartData/${dataContext.userObject.id}`)
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        allKartProducts();
    }, [])

    // button quantity
    const [quantity, UpdateQuantity] = useState(0);

    // item price
    const [itemTotal, updateItemTotal] = useState(0);

    const gst = (12 / 100) * itemTotal;

    const delivery = "free";
    
    // totalBill
    const total = itemTotal + gst;
    
    const decrement = ()=>{
        if (quantity > 0) {
            UpdateQuantity(quantity - 1);
            updateItemTotal((quantity - 1) * 533);
        }
        
    }
    const increament = ()=>{
        UpdateQuantity(quantity + 1);
        updateItemTotal((quantity + 1) * 533);
    }


    const [status, setStatus] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [locationResult, updateLocationResult] = useState(false)
    const fetchLocationData = () => {
        const success = (position) => {
        if (position && position.coords) {
            const { latitude, longitude } = position.coords;
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

            axios.get(geoApiUrl)
            .then(response => {
                const data = response.data;
                const stateData = data.principalSubdivision;
                const cityData = data.locality;
                setStatus(`${cityData}, ${stateData}`);
                setCity(cityData);
                setState(stateData);

                // result if true then show
                updateLocationResult(true);
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                setStatus('Error fetching location data');
                alert('Error fetching location data');
            });
        } else {
            setStatus('Unable to retrieve your location');
            alert('Unable to retrieve your location');
        }
        };

        const error = () => {
        setStatus('Unable to retrieve your location, Please allow your location');
        alert("Unable to retrieve your location, Please allow your location");
        };

        navigator.geolocation.getCurrentPosition(success, error);
    };

    
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
                        {locationResult ? <span className='location-text location'>{status}</span> : <Button variant="outline-dark" className=' location' onClick={fetchLocationData}>Click here</Button>}
                    </Col>
                </Container>

                <Container>
                    <hr />
                    <Row>
                        <Col lg={12} className='d-flex justify-content-center position-relative '>
                            <Col lg={6} className='d-flex align-items-center '>
                                <Col  className='d-flex justify-content-evenly align-items-center '>
                                    <Image src='https://assets.ajio.com/medias/sys_master/root/20221130/KECd/63873295f997ddfdbdac1468/-473Wx593H-443002269-olivegreen-MODEL.jpg' className='object-fit-contain ' style={{height : '13em' ,width : '45%'}} />
                                    <div>
                                        <h6>Product Name : Basics Green Strips</h6>
                                        <p>Selected Size : Xl (extra Larger)</p>
                                    </div>
                                </Col>
                            </Col>
                            
                            <Col lg={6} className='d-flex justify-content-end align-items-center'>
                                <Col className='d-flex flex-column justify-content-center align-items-center '>
                                    <p>Price : $544</p>
                                    <div>
                                        <Button className='p-1 px-2' variant="outline-danger" onClick={decrement}><HiMiniMinusSmall /></Button>{' '}
                                            <span className='p-1 mx-1'>{quantity}</span>
                                        <Button className='p-1 px-2' variant="outline-success" onClick={increament}><HiMiniPlusSmall /></Button>{' '}
                                    </div>
                                </Col>
                            </Col>
                            <Button variant='outline-danger' className='kartClear p-1'><IoClose /></Button>
                        </Col>
                    </Row>
                </Container>
                
                <Container>
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
                                <h5>Delivery : </h5>
                                <h5>{delivery}</h5>
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