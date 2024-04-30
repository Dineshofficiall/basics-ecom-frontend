// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Container, Row, Col, Button, Navbar, Image} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { FaUsers } from "react-icons/fa";
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaRegComment } from "react-icons/fa6";
import { TbPackageExport, TbTruckDelivery } from "react-icons/tb";
import { RiExpandLeftFill, RiExpandRightFill  } from "react-icons/ri";
import '../AdminPage/adminPage.css'
function Admin() {
    const [expanded, setExpanded] = useState(false);

    const handleToggleSidebar = () => {
      setExpanded(!expanded);
    };
    return (
        <>        
            <Container fluid>
                <Row className='d-flex'>
                    {/* Sidebar */}
                    <Col sm={2} md={2} className={expanded ? 'sidebar expanded' : 'sidebar collapsed'}>
                        <SidebarMenu expanded={expanded}>
                            <SidebarMenu.Header className='mt-3 mb-4'>
                                <Navbar.Brand href="/Home"><Image src="https://basicslife.com/cdn/shop/files/Untitled-4-01_80x@2x.png?v=1711019726" className='logo' thumbnail /></Navbar.Brand>
                            </SidebarMenu.Header>
                            <SidebarMenu.Body>
                            <SidebarMenu.Nav>
                                <Link className='text-decoration-none text-dark fw-bold ' to='users'>{expanded === false ? <p className='fs-4 text-center '><FaUsers /></p> : <p className='fs-5 text-center '><FaUsers /> Users</p>}</Link>
                                <hr />
                                <Link className='text-decoration-none text-dark fw-bold' to='products'>{expanded === false ? <p className='fs-4 text-center '><TbPackageExport /></p> : <p className='fs-5 text-center '><TbPackageExport /> Products</p>}</Link>
                                <hr />
                                <Link className='text-decoration-none text-dark fw-bold' to='interaction'>{expanded === false ? <p className='fs-4 text-center '><FaRegComment /></p> : <p className='fs-5 text-center '><FaRegComment /> Comments</p>}</Link>
                                <hr />
                                <Link className='text-decoration-none text-dark fw-bold' to='sellers'>{expanded === false ? <p className='fs-4 text-center '><TbTruckDelivery /></p> : <p className='fs-5 text-center '><TbTruckDelivery /> Sellers</p>}</Link>
                                <hr />
                                <Link className='text-decoration-none text-dark fw-bold' to='orders'>{expanded === false ? <p className='fs-4 text-center '><MdProductionQuantityLimits /></p> : <p className='fs-5 text-center '><MdProductionQuantityLimits /> Orders</p>}</Link>
                                <hr />
                            </SidebarMenu.Nav>
                            </SidebarMenu.Body>
                            {/* <SidebarMenu.Footer>
                            Sidebar Footer
                            </SidebarMenu.Footer> */}
                        </SidebarMenu>
                        {/* Toggle button */}
                        <Button className="toggle-button px-3" variant='outline-primary' onClick={handleToggleSidebar}>
                            {expanded ? <RiExpandLeftFill /> : <RiExpandRightFill />}
                        </Button>
                    </Col>

                    {/* Main Content */}
                    <Col sm={10} md={10} lg={11} className="main-content">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Admin