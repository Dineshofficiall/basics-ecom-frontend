/* eslint-disable no-unused-vars */
import React from 'react'
import NavBar from '../NavBar/NavBar'
import {Carousel,Container, Image, Row, Col} from 'react-bootstrap/';

import '../Home/home.css'
function Home() {
    return (
        <>
        <NavBar />
        <div className="home">
          <Container className='mx-0 px-0 ' fluid>
              <Carousel fade>
                  <Carousel.Item>
                    <Image src="https://img.freepik.com/free-photo/view-3d-swing-with-clouds_23-2151113509.jpg?t=st=1713248694~exp=1713252294~hmac=2ec610d1ccc5bb5b5030708e21c7253a16363a292259282e6d476090691e2c84&w=1280" className='banner-img' fluid/>
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image src="https://img.freepik.com/premium-vector/traditional-poster-design-hindu-festival-shree-krishna-janmashtami_747945-387.jpg?w=1280" className='banner-img' fluid />
                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image src="https://img.freepik.com/free-photo/cosmetic-item-with-marijuana-leaves_23-2151336281.jpg?t=st=1713248736~exp=1713252336~hmac=307d7db6f7b3126d6517c46f55d2c79571208f0ec0aca866e8503450d1b622a9&w=1280" className='banner-img' fluid />
                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
            </Container>
            <Container>
              <Row className='d-flex justify-content-between align-items-center bg-info'>
                <Col lg={5} className='text-center bg-danger'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex nulla quas dolorum architecto sed nihil.
                </Col>
                <Col lg={5} className='text-center bg-warning '>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, quidem tempora. Alias accusamus in non!
                </Col>
              </Row>
            </Container>
        </div>
        </>
    )
}

export default Home