// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import '../AdminPage/adminPage.css'
function Admin() {
    return (
        <>
            <div className="page-container">
                <Container>
                    <Row className='parent-block '>
                        <Col xl={12} className='child-1 d-flex flex-wrap flex-xl-nowrap flex-xl-column justify-content-evenly align-items-center text-center   px-xl-0'>
                            {/* <Col className='mx-2 mx-xl-0' sm={6} md={3} lg={2} xl={12}><h2><Link className='text-decoration-none ' to='admin'>Admin</Link></h2></Col> */}
                            <Col className='mx-2 mx-xl-0' sm={6} md={3} lg={2} xl={12}><h2><Link className='text-decoration-none' to='users'>Users</Link></h2></Col>
                            <Col className='mx-2 mx-xl-0' sm={6} md={3} lg={2} xl={12}><h2><Link className='text-decoration-none' to='products'>Products</Link></h2></Col>
                            <Col className='mx-2 mx-xl-0' sm={6} md={3} lg={2} xl={12}><h2><Link className='text-decoration-none' to='interaction'>Interaction</Link></h2></Col>
                            <Col className='mx-2 mx-xl-0' sm={6} md={3} lg={2} xl={12}><h2><Link className='text-decoration-none' to='sellers'>Sellers</Link></h2></Col>
                            <Col className='mx-2 mx-xl-0' sm={6} md={3} lg={2} xl={12}><h2><Link className='text-decoration-none' to='orders'>Orders</Link></h2></Col>
                        </Col>
                        <Col className='child-2 d-flex justify-content-center my-4 py-4'>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Admin