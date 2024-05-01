// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Button, Col, Container, FloatingLabel, Form, Image, InputGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function About() {
    return (
        <>
            <NavBar />

            <Container className='bg-danger'>
                <Image src="https://amgglobaltrading.com/assets/images/about-readmore-banner-img.png" className='banner-img object-fit-fill object-fit-md-cover object-fit-lg-cover' style={{width:`100%`, height : `45vh`,}} fluid />
                <div className='ms-4'>
                    <span className='bg-info p-3 fw-bolder rounded-start-pill'><Link className='text-decoration-none text-danger fw-bold links' to='/Home'>Home</Link></span><span className='bg-danger p-3 fw-bolder rounded-end-pill '><Link className='text-decoration-none text-info fw-bold links' to='/about'>About...</Link></span>
                </div>
            </Container>

            <Container className='bg-secondary my-5'>
                <Col className='p-4 p-md-5'>
                    <p className='fs-6 fw-semibold  '>With the trendiest, freshest, and most unique styles from across India and the world, AJIO invites you to express your personal style fearlessly, and with a confidence and optimism that cannot be easily shaken.</p>
                </Col>
            </Container>

            <Container>
                <Row className='d-flex justify-content-evenly align-items-center'>
                    <Col lg={5}>
                        <h5 className='mb-4 fw-bold '>BASICS OWN</h5>
                        <p>BASICS OWN is our private label – that’s designed by us, and owned by you. If you’re looking for head-turning styles that are one-of-a-kind, BASICS OWN is what you should stock up on.</p>
                    </Col>
                    <Col lg={5}>
                        <h5 className='mb-4 fw-bold'>Exclusive International Labels</h5>
                        <p>We bring you the trendiest and most exclusive brands from around the world to your wardrobe. Forget scouring the net for what’s hot globally, we’ve got you covered.</p>
                    </Col>
                </Row>
            </Container>

            <Container className='bg-secondary my-5'>
                <Col className='p-4 p-md-5 pb-md-4'>
                    <h5 className='mb-4'>Why let a world that loves to police your wardrobe and your expression get the upper hand, anyway?</h5>
                    <p className='fs-6 '>So the next time someone says ‘Oh, that dress is too bold’ ‘Are you sure you’re the right size for this?’ ‘Maybe you should pick a colour that suits you’ or ‘Act your age and wear something else’, go ahead and do exactly what you please. When it comes to great style and personal expression, there should never be any regrets.</p>
                </Col>
            </Container>

            <Container>
                <Row className='d-flex justify-content-evenly align-items-center'>
                    <Col lg={5} className='my-3'>
                        <h5 className='mb-4 fw-bold '>Capsule Collections</h5>
                        <p>If there’s an occasion to express your personal style, we’ve got a capsule collection to match. Shopping for a specific mood, event or style story has never been easier.</p>
                    </Col>
                    <Col lg={5} className='my-3'>
                        <h5 className='mb-4 fw-bold'>The Indie Experience</h5>
                        <p>Our Indie styles are literally art you can wear. They are carefully handpicked, so that only the most authentic, handcrafted pieces by artisans across the country and globe make the cut.</p>
                    </Col>
                    <Col lg={5} className='my-3'>
                        <h5 className='mb-4 fw-bold '>BASICS Style Tribe</h5>
                        <p>A high-fashion editorial where we feature the internet’s coolest cats. It’s where you get to read the stories of these influencers and shop their stunning shoot looks.</p>
                    </Col>
                    <Col lg={5} className='my-3'>
                        <h5 className='mb-4 fw-bold '>#BASICStoday</h5>
                        <p>Our daily trend spotlight that lets you in on what’s hip and happening, and what you should be carting right now. Like they say, a trend each day keeps the blues away!</p>
                    </Col>
                    <Col lg={5} className='my-3'>
                        <h5 className='mb-4 fw-bold '>#BASICSrecommends</h5>
                        <p>From the hailstorm of trends coming down on us every season, we only recommend the ones guaranteed to put you on the hit list. Watch out for these regular highlights.</p>
                    </Col>
                    <Col lg={5} className='my-3'>
                        <h5 className='mb-4 fw-bold '>#recommendsBASICS</h5>
                        <p>This is where we celebrate and showcase our most stylish customers, who’ve given us a shout-out on social while dressed in a trendy AJIO style. You could very well be on the list too.</p>
                    </Col>
                </Row>
            </Container>

            <Container className='my-5'>
                <Row className='d-flex flex-column justify-content-center align-items-center bg-secondary py-5'>
                    <Col sm={5}>
                        <h4 className='text-center mb-3'>Newsletter</h4>
                    </Col>
                    <Col sm={5} className='d-flex flex-column justify-content-center align-items-center '>
                        <InputGroup className="mb-3">
                            <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Comments"
                            className="mb-3 w-100"
                        >
                        <Form.Control as="textarea" placeholder="Leave a comment here" />
                        </FloatingLabel>

                        <Button className='w-50 ' variant='outline-danger'>Sumbit</Button>
                    </Col>
                </Row>
            </Container>
            
            <Footer />
        </>
    )
}

export default About