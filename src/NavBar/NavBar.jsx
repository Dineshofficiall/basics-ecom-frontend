// eslint-disable-next-line no-unused-vars
import React,{useEffect, useState} from 'react'
import {Navbar, Container, Image, Col, Badge, Form, Button, Offcanvas} from 'react-bootstrap/';

// icons
import { FaLocationDot } from "react-icons/fa6";

// pageLinks
import { Link, useNavigate } from 'react-router-dom';

// css
import '../NavBar/navbar.css'

import { BiSearchAlt, BiSolidShoppingBagAlt } from "react-icons/bi";
import { FaUserAstronaut } from "react-icons/fa6";
import { PiHandHeartDuotone } from "react-icons/pi";
import { BsFillMenuAppFill } from "react-icons/bs";
import axios from 'axios';
function NavBar() {
  // useNavigate
  const navigate = useNavigate();

  // smaller device burger menu
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const kartPage = () =>{
    navigate('/kart')
  }
  // ends
  return (
    <>
      <Container fluid>
        <Navbar expand="lg" sticky="top" className="d-flex justify-content-between align-items-center p-0">
            {/* sm-6 md-2 */}
            <Col sm={6} md={2} lg={2}  className='text-start'>
              <Navbar.Brand href="/Home"><Image src="https://basicslife.com/cdn/shop/files/Untitled-4-01_80x@2x.png?v=1711019726" className='logo' thumbnail /></Navbar.Brand>
            </Col>
            {/* sm-none md-none*/}
            <Col lg={2} className='d-flex flex-column justify-content-center align-items-start location ps-lg-4 '>
                <span className='location-text d-flex justify-content-start align-items-center location'><span className='location'><FaLocationDot /></span><span className='location'>Location</span></span>
                {locationResult ? <span className='location-text location'>{status}</span> : <Button variant="outline-dark" className='py-0 location' onClick={fetchLocationData}>Click here</Button>}
            </Col>
            {/* sm-none md-4 lg */}
            <Col md={4} lg={3} className='d-flex justify-content-evenly align-items-center links'>
              <Link className='text-decoration-none links' to='/Home'>Home</Link>
              <Link className='text-decoration-none links' to='/product'>Products</Link>
              <Link className='text-decoration-none links' to='/Home'>About</Link>
            </Col>
            {/* sm-none md-5 lg */}
            <Col md={4} lg={3}>
              <Form className="d-flex searchbar">
                  <Form.Control type="search" placeholder="Search by categories..." className="mx-1 rounded-pill searchbar" aria-label="Search"/>
                  <Button variant="outline-secondary rounded-pill" className='searchbar'><BiSearchAlt /></Button>
              </Form>
            </Col>
            {/* sm-x md-x lg */}
            <Col lg={2} className='d-flex justify-content-evenly align-items-center fs-5 icons'>
              <Link className='text-decoration-none icons' to='/Home'><FaUserAstronaut /></Link>
              <Button variant="outline-primary" className='p-1 border-0 rounded-pill fs-5 icons' onClick={kartPage}><BiSolidShoppingBagAlt /><Badge className='p-1 text-dark bg-transparent'>1</Badge></Button>
              <Link className='text-decoration-none fs-5 icons' to='/Home'><PiHandHeartDuotone /></Link>
            </Col>

            {/* ------------------------------------------------------------------- */}

            {/* burger menu */}
            <Col sm={6} md={1} className='burgerMenu pe-2 pe-md-0 d-flex justify-content-end justify-content-md-evenly  align-items-center'>
              <Button variant="secondary" onClick={handleShow}><BsFillMenuAppFill /></Button>

              <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title><Navbar.Brand href="#"><Image src="https://basicslife.com/cdn/shop/files/Untitled-4-01_80x@2x.png?v=1711019726" className='logo w-100' thumbnail /></Navbar.Brand></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='h-auto '>
                  <Col className='d-flex flex-column justify-content-center align-items-end mb-3 burgerLocation'>
                    <span className='location-text d-flex justify-content-start align-items-center burgerLocation'><span className='burgerLocation'><FaLocationDot /></span><span className='burgerLocation'>Location</span></span>
                    {locationResult ? <span className='location-text burgerLocation'>{status}</span> : <Button variant="outline-dark" onClick={fetchLocationData}>click here</Button>}
                  </Col>
                  <Col className='d-flex flex-column justify-content-around h-50 align-items-center'>
                    <Link className='text-decoration-none my-1' to='/Home'>Home</Link>
                    <Link className='text-decoration-none my-1' to='/Home'>Products</Link>
                    <Link className='text-decoration-none my-1' to='/Home'>Blog</Link>
                    <Link className='text-decoration-none my-1' to='/Home'>About</Link>
                  </Col>
                  <hr />
                  <Col className='d-flex justify-content-evenly align-items-center fs-5 '>
                    <Link className='text-decoration-none fs-5' to='/Home'><FaUserAstronaut /></Link>
                    <Button variant="outline-primary" className='p-1 border-0 fs-5 rounded-pill ' onClick={kartPage}><BiSolidShoppingBagAlt /><Badge className='p-1 text-dark bg-transparent'>1</Badge></Button>
                    <Link className='text-decoration-none fs-5' to='/Home'><PiHandHeartDuotone /></Link>
                  </Col>
                  <hr />
                  <Col >
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search" className="mx-1 rounded-pill" aria-label="Search"/>
                        <Button variant="outline-secondary rounded-pill"><BiSearchAlt /></Button>
                    </Form>
                  </Col>
                </Offcanvas.Body>
              </Offcanvas>
            </Col>
            {/* ends */}
        </Navbar>
      </Container>
      <hr className='my-1'/>
    </>
  );
}

export default NavBar