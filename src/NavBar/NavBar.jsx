// eslint-disable-next-line no-unused-vars
import React,{useEffect, useState} from 'react'
import {Navbar, Modal, Container, Image, Col, Badge, Form, Button, Offcanvas, Row} from 'react-bootstrap/';

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
import { useDataContext } from '../useContext/DataContext';
// import Page from '../Login-Register/Page';
function NavBar() {
  // useContext
  const dataContext = useDataContext();
  const userProfile = dataContext.userObject;

  // useNavigate
  const navigate = useNavigate();

  // smaller device burger menu
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [status, setStatus] = useState('');

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

  // Profile
  const [profileShow, setProfileShow] = useState(false);

  const handleProfileClose = () => setProfileShow(false);
  const handleProfileShow = () => setProfileShow(true);

  // profileValidation if the userObj not present then this block of code execute
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleCloseProfileModal = () => setIsProfileModalOpen(false);
  const handleOpenProfileModal = () => setIsProfileModalOpen(true);

  const logingUser = () =>{
    handleCloseProfileModal();
    navigate('/');
  }
  // validation ends


  const kartPage = () =>{
    navigate('/kart')
  }

  // logout
  const logout = ()=>{
    dataContext.logout();
    navigate('/');
  }

  // ends
  return (
    <>
      <Container fluid>
        <Navbar expand="lg" sticky="top" className="d-flex justify-content-between align-items-center p-0">
            {/* sm-6 md-2 */}
            <Col sm={9} md={2} lg={2}  className='text-start'>
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
              <Link className='text-decoration-none links' to='/about'>About</Link>
            </Col>
            {/* sm-none md-5 lg */}
            <Col md={4} lg={3}>
              <Form className="d-flex searchbar">
                  <Form.Control type="search" placeholder="Search by categories..." className="mx-1 rounded-pill searchbar" aria-label="Search"/>
                  <Button variant="outline-secondary rounded-pill" className='searchbar'><BiSearchAlt /></Button>
              </Form>
            </Col>
            {/* sm-x md-x lg */}
            {/* profile kart whishlist */}
            <Col sm={1} lg={2} className='d-flex justify-content-evenly align-items-center fs-5 icons'>
              {dataContext.userObject !== null ?
                <Button variant="transparent" onClick={handleProfileShow}>
                  <FaUserAstronaut />
                </Button>
              :
                <Button variant="transparent" onClick={handleOpenProfileModal}>
                  <FaUserAstronaut />
                </Button>
              }
              {dataContext.kartPage === null ?
                <Button variant="outline-primary" className='p-1 border-0 rounded-pill fs-5 icons' onClick={kartPage}><BiSolidShoppingBagAlt /><Badge className='p-1 text-dark bg-transparent'>1</Badge></Button>
              :
                <Link className='p-1 border-0 rounded-pill fs-5 icons text-dark' to='/emptyKart'><BiSolidShoppingBagAlt /></Link>
              }
              <Link className='text-decoration-none fs-5 icons text-dark ' to='/Home'><PiHandHeartDuotone /></Link>
            </Col>

            {/* ------------------------------------------------------------------- */}

            {/* burger menu */}
            <Col sm={1} md={1} className='burgerMenu pe-2 pe-md-0 d-flex justify-content-end justify-content-md-evenly  align-items-center'>
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
        {userProfile !== null ?
        <Col>
          <Offcanvas show={profileShow} onHide={handleProfileClose} placement="end" >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>My Account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Row>
                <Col sm={12} className='d-flex justify-content-start align-items-center mt-2 mb-3'>
                  <Image src='https://t4.ftcdn.net/jpg/04/21/43/95/360_F_421439576_zzg0kGw1QZ6S6WDAS4qgglRPP4wxddjS.jpg' className='object-fit-cover ' style={{width : '22%', height : '12vh', borderRadius : '100%'}}/>
                  <div className='ms-4'>
                    <h5>{userProfile.userName}</h5>
                    <h6>{userProfile.mail}</h6>
                  </div>
                </Col>
                <hr />
                <Col sm={12} className='px-3 profile-section'>
                  <p>Coupan</p>
                  <p>Wallet</p>
                  <p>Saved Cards</p>
                  <p>Saved Address</p>
                  <p>Orders</p>
                </Col>
                <hr />
              </Row>
            </Offcanvas.Body>
            <Button variant='outline-danger' onClick={logout}>Logout</Button>
          </Offcanvas>
        </Col>
        :
        ""
        }

        <Col>
        <Modal show={isProfileModalOpen} onHide={handleCloseProfileModal} animation={false}>
          <Modal.Header closeButton>
              <Modal.Title>Login Failed!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Oops you are not login</h5>
              <h6>Please Login!!</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseProfileModal}>
                Close
              </Button>
              <Button variant="primary" onClick={logingUser}>
                Login
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Container>
      <hr className='my-1'/>
    </>
  );
}

export default NavBar