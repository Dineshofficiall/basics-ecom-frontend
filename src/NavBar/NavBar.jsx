// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import {Navbar, Container, Image, Row, Col, Badge, Dropdown, DropdownButton, Form, Button, Offcanvas} from 'react-bootstrap/';

// pageLinks
import { Link } from 'react-router-dom';

// css
import '../NavBar/navbar.css'

import { BiSearchAlt, BiSolidShoppingBagAlt } from "react-icons/bi";
import { FaUserAstronaut } from "react-icons/fa6";
import { PiHandHeartDuotone } from "react-icons/pi";
import { BsFillMenuAppFill } from "react-icons/bs";
function NavBar() {
  // smaller device burger menu
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ends
  return (
    <>
      <Container fluid>
        <Navbar expand="lg" sticky="top" className="d-flex justify-content-between align-items-center p-0">
            <Col sm={6} md={2} lg={2}  className='text-center'>
              <Navbar.Brand href="#"><Image src="https://basicslife.com/cdn/shop/files/Untitled-4-01_80x@2x.png?v=1711019726" className='logo' thumbnail /></Navbar.Brand>
            </Col>
            <Col md={5} lg={4} className='d-flex justify-content-evenly align-items-center links'>
              <Link className='text-decoration-none links' to='/Home'>Home</Link>
              <Link className='text-decoration-none links' to='/Home'>Products</Link>
              <Link className='text-decoration-none links' to='/Home'>About</Link>
            </Col>
            <Col md={3} >
              <Form className="d-flex searchbar">
                  <Form.Control type="search" placeholder="Search" className="mx-1 rounded-pill searchbar" aria-label="Search"/>
                  <Button variant="outline-secondary rounded-pill" className='searchbar'><BiSearchAlt /></Button>
              </Form>
            </Col>
            <Col md={2} lg={3} className='d-flex justify-content-evenly align-items-center fs-5 icons'>
              <Link className='text-decoration-none icons' to='/Home'><FaUserAstronaut /></Link>
              <Button variant="outline-primary" className='p-1 border-0 rounded-pill fs-5 icons'><BiSolidShoppingBagAlt /><Badge className='p-1 text-dark bg-transparent'>1</Badge></Button>
              <Link className='text-decoration-none fs-5 icons' to='/Home'><PiHandHeartDuotone /></Link>
            </Col>

            {/* burger menu */}
            <Col sm={6} className='burgerMenu pe-2 d-flex justify-content-evenly align-items-center'>
              <Button variant="secondary" onClick={handleShow}><BsFillMenuAppFill /></Button>

              <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title><Navbar.Brand href="#"><Image src="https://basicslife.com/cdn/shop/files/Untitled-4-01_80x@2x.png?v=1711019726" className='logo' thumbnail /></Navbar.Brand></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Col className='d-flex flex-column justify-content-around h-50 align-items-center'>
                    <Link className='text-decoration-none my-1' to='/Home'>Home</Link>
                    <Link className='text-decoration-none my-1' to='/Home'>Products</Link>
                    <Link className='text-decoration-none my-1' to='/Home'>Blog</Link>
                    <Link className='text-decoration-none my-1' to='/Home'>About</Link>
                  </Col>
                  <hr />
                  <Col md={2} lg={2} className='d-flex justify-content-evenly align-items-center fs-5 '>
                    <Link className='text-decoration-none fs-5' to='/Home'><FaUserAstronaut /></Link>
                    <Button variant="outline-primary" className='p-1 border-0 fs-5 rounded-pill '><BiSolidShoppingBagAlt /><Badge className='p-1 text-dark bg-transparent'>1</Badge></Button>
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

      {/* <Container fluid>
        <Row>
          <Col md={3} lg={3} className='d-flex justify-content-center align-items-center '>
            <DropdownButton id="dropdown-basic-button" variant='light' title="Browse Categories">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={5} lg={6} className='d-flex justify-content-evenly align-items-center reDirectPageLinks'>
            <Link className='text-decoration-none reDirectPageLinks' to='/Home'>Home</Link>
            <Link className='text-decoration-none reDirectPageLinks' to='/Home'>Products</Link>
            <Link className='text-decoration-none reDirectPageLinks' to='/Home'>Blog</Link>
            <Link className='text-decoration-none reDirectPageLinks' to='/Home'>About</Link>
          </Col>
          <Col className='d-flex justify-content-center align-items-center reDirectPageLinks'>
              <h5 className='reDirectPageLinks'><BiLabel /></h5>
              <p className='m-0 mb-1 ms-1 reDirectPageLinks'>Clearance Up to 30% Off</p>
          </Col>
        </Row>
      </Container>
      <hr className='my-1'/> */}
    </>
  )
}

export default NavBar