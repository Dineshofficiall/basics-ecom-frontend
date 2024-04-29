// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import '../AdminPage/adminPage.css'
function Admin() {

    return (
        
        <>
        <Container className='bg-info'>
            <Row>
                <Col>
                
                </Col>
                    <span>
                        <Link className='text-decoration-none text-dark ' to='users'>Users</Link>
                        <Link className='text-decoration-none text-dark' to='products'>Products</Link>
                        <Link className='text-decoration-none text-dark' to='interaction'>Interaction</Link>
                        <Link className='text-decoration-none text-dark' to='sellers'>Sellers</Link>
                        <Link className='text-decoration-none text-dark' to='orders'>Orders</Link>
                    </span>
            </Row>
        </Container>
        <Col className='d-flex justify-content-center my-4 py-4'>
            <Outlet />
        </Col>
        
        
        </>
    )
}

export default Admin