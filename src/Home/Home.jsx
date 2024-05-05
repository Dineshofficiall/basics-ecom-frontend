/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import {Carousel,Container, Image, Row, Col, Card, CardFooter, Button, ProgressBar} from 'react-bootstrap/';
import Footer from '../Footer/Footer'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Link
import { Link, useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

// css
import './home.css';

// import './styles.css';
import './styles2.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

function Home() {

  // useNavigate
  const navigate = useNavigate();

  // offerPeriod
  const [offerDate, updateOfferDate] = useState(new Date("May 26, 2024 00:00:00").getTime())
  
  // currentDate Variable
  const [currentTime, updateCurrentTime] = useState()
  
  // distance between offer and current date
  const [distance, updateDistance] = useState()
  const [date, updateDate] = useState()
  const [hours, updateHours] = useState()
  const [minutes, updateMinutes] = useState()
  const [seconds, updateSeconds] = useState()

  // const [interval, updateInterval] = useState()

    const OffersTimeLimited = setInterval(() => {

      const current = new Date().getTime();
      const tempDistance = offerDate - current;

      // If offer period is over, clear the interval
      if (tempDistance <= 0) {
        clearInterval(OffersTimeLimited);
        return;
      }

      // Calculate remaining time components
      const remainingSeconds = Math.floor((tempDistance / 1000) % 60);
      const remainingMinutes = Math.floor((tempDistance / (1000 * 60)) % 60);
      const remainingHours = Math.floor((tempDistance / (1000 * 60 * 60)) % 24);
      const remainingDays = Math.floor(tempDistance / (1000 * 60 * 60 * 24));

      // Update state variables
      updateCurrentTime(current);
      updateDistance(tempDistance);
      updateDate(remainingDays);
      updateHours(remainingHours);
      updateMinutes(remainingMinutes);
      updateSeconds(remainingSeconds);
    }, 1000);


    // pageRedirect - tops sections
    const pageDirect = (contentName)=>{
      console.log(contentName);
      navigate(`/product/${contentName}`)
    }
    return (
      <>
        {/* navbar */}
        <NavBar />
        {/* ends */}

        {/* carousal */}
        <div className="home">
          <Container className='mx-0 px-0' fluid>
            <Carousel fade>

              {/* saree */}
                <Carousel.Item>
                  <Button variant="transparent" className='w-100' onClick={() => pageDirect('Top')}>
                    <Image src="https://www.bunaai.com/cdn/shop/files/WEB_BANNER_b0d24f7d-bcdd-4e77-8b74-b2dbf6cb8cfa.jpg?v=1708417432" className='banner-img object-fit-fill object-fit-md-cover object-fit-lg-cover' style={{width:`100%`, height : `45vh`,}} fluid/>
                  </Button>
                </Carousel.Item>

              {/* Coat */}
                <Carousel.Item>
                  <Button variant="transparent" className='w-100' onClick={() => pageDirect('Coat')}>
                    <Image src="https://www.bonsoir.co.in/cdn/shop/files/ultimate-banner5.jpg?v=1704271879" className='banner-img object-fit-cover object-fit-md-cover object-fit-fill ' style={{width:`100%`, height : `45vh`}} fluid />
                  </Button>
                </Carousel.Item>

              {/* Bridal */}
                <Carousel.Item>
                  <Button variant="transparent" className='w-100' onClick={() => pageDirect('wedGirls')}>
                    <Image src="https://www.geetanjalisalon.com/wp-content/uploads/2023/11/seerat-banner-.jpg" className='banner-img object-fit-cover object-fit-md-cover object-fit-fill ' style={{width:`100%`, height : `45vh`}} fluid />
                  </Button>
                </Carousel.Item>

              {/* girl kurta */}
                <Carousel.Item>
                  <Button variant="transparent" className='w-100' onClick={() => pageDirect('Kurta')}>
                    <Image src="https://www.freshlookfashion.com/slideshow/1669975849_sharara%20suits%20(1).jpg" className='banner-img object-fit-cover object-fit-md-cover object-fit-fill ' style={{width:`100%`, height : `45vh`}} fluid />
                  </Button>
                </Carousel.Item>
                
              {/* Bridal Boys */}
                <Carousel.Item>
                  <Button variant="transparent" className='w-100' onClick={() => pageDirect('wedBoys')}>
                    <Image src="https://www.lascoot.com/singla_views/images/1.jpg" className='banner-img object-fit-cover object-fit-md-cover object-fit-fill ' style={{width:`100%`, height : `45vh`}} fluid />
                  </Button>
                </Carousel.Item>

              {/* boys tshirt */}
                <Carousel.Item>
                  <Button variant="transparent" className='w-100' onClick={() => pageDirect('tshirt')}>
                    <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/264e3629894817.5609864fcd16d.png" className='banner-img object-fit-cover object-fit-md-cover object-fit-fill ' style={{width:`100%`, height : `45vh`}} fluid />
                  </Button>
                </Carousel.Item>

              {/* kids */}
                <Carousel.Item>
                  <Button variant="transparent" className='w-100' onClick={() => pageDirect('Kids')}>
                    <Image src="https://marketplace.canva.com/EAFIMHQ5yhE/1/0/1600w/canva-orange-and-teal-summer-sale-kids-fashion-bright-website-banner-L6kUMOWkkho.jpg" className='banner-img object-fit-fill object-fit-md-cover  object-fit-lg-cover' style={{width:`100%`, height : `45vh`}} fluid />
                  </Button>
                </Carousel.Item>
              </Carousel>
          </Container>
        </div>
        {/* ends */}

        {/* block = summerSale and  */}
        <Container className='mt-5'>
          <Row>
            {/* boys shirt */}
            <Col>
              <Button variant='transparent' onClick={()=> pageDirect('shirt')}><Image src='https://assets.ajio.com/medias/sys_master/images/images/hd7/hcf/14844211527710/10122019-M-MHP-topbanner-NewArrivals-upto50.jpg' fluid/></Button>
            </Col>

            {/* girl kurta */}
            <Col>
              <Button variant='transparent' onClick={()=> pageDirect('Kurta')}><Image src="https://images-eu.ssl-images-amazon.com/images/G/31/img2020/fashion/WA_2020/Thedressedit/sizerev/topban.gif" fluid /></Button>
            </Col>
          </Row>
        </Container>

        {/* Special Products */}
        <Container className='my-5 cardsBlock px-5 pb-4'>
          <Col sm={12} className='d-flex flex-column align-items-center justify-content-center flex-md-row  justify-content-md-start align-items-md-center  my-md-3 mt-md-4 pt-4'>
            <h5 className='fw-bolder ms-md-2 my-0'>Special Products for you</h5>
            <div className='py-2 py-md-0 '><span className='ms-md-4'>Ends in :</span><span className='mx-md-1 bg-danger p-1'>{date} Days</span><span className='mx-md-1 bg-danger p-md-1'>{hours}</span> : <span className='mx-1 bg-danger  p-1'>{minutes}</span> : <span className='mx-1 bg-danger p-1'>{seconds}</span></div>
          </Col>
          <Swiper slidesPerView={'auto'} spaceBetween={40} freeMode={true}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[FreeMode, Pagination]} className="mySwiper py-4 py-lg-4">
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-5.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-6.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural.
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-7.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-8.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-9.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
          </Swiper>
        </Container>
        {/* ends */}
        
        {/* block = summerSale and  */}
        <Container>
          <Row>
            {/* girls tshirt */}
            <Col lg={6}>
              <Card className=" bg-light adsBlock">
                <img src="https://img.freepik.com/free-vector/instagram-puzzle-feed-template-with-sales_23-2148679509.jpg?t=st=1713879548~exp=1713883148~hmac=d8249e759d7e425f6ac7d54f9914c61cef1fdc2a5ed0126d5b5329eb0572d877&w=2000" alt="Card image" />
                  <Card.ImgOverlay className='d-flex justify-content-center align-items-end'>
                    <Card.Body className='d-flex justify-content-center align-items-end cardAds'>
                      <Button variant="danger" className='w-50' onClick={()=>pageDirect('tshirt')}>Click Here</Button>{' '}
                    </Card.Body>
                  </Card.ImgOverlay>
              </Card>
            </Col>
            {/* mens tshirt */}
            <Col lg={6}>
              <Card>
                <Card.Img src="https://indiater.com/wp-content/uploads/2019/05/1.jpg" alt="Card image" />
                <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
                  <Card.Body className='d-flex justify-content-end align-items-end mb-3 cardAds'>
                    <Button variant="danger" className='w-50' onClick={()=> pageDirect('tshirt')}>Click Here</Button>{' '}
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Best Products */}
        <Container className='my-5 cardsBlock px-5 pb-4'>
          <Col sm={12} className='d-flex flex-column align-items-center justify-content-center flex-md-row  justify-content-md-start align-items-md-center  my-md-3 mt-md-4 pt-4'>
            <h5 className='fw-bolder ms-md-2 my-0'>Best Products for you</h5>
          </Col>
          <Swiper slidesPerView={'auto'} spaceBetween={40} freeMode={true}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[FreeMode, Pagination]} className="mySwiper py-4 py-lg-4">
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-5.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-6.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural.
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-7.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-8.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Card.Img variant="top" src="https://swiperjs.com/demos/images/nature-9.jpg" style={{height:'25vh'}} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                    </Card.Text>
                    <ProgressBar striped variant="danger" animated now={45} />
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
          </Swiper>
        </Container>


        {/* top dress banner */}
        <Container>
          <Col sm={12}>
            <Button variant="transparent" onClick={() => pageDirect('Top')}>
              <Card className=" bg-light">
                <Image src='https://www.beyoung.in/api/cache/catalog/products/banner_desktop/womens_topwear_banner_desktop__view_3_8_2022_1920x475.jpg' alt='Image' fluid />
              </Card>
            </Button>{' '}
          </Col>
        </Container>

        {/* feedBack */}
        <Container className='my-5 cardsBlock px-5 pb-4'>
            <h5 className='fw-bolder text-center mt-4 pt-4'>FeedBack</h5>
          <Swiper slidesPerView={'auto'} spaceBetween={40} freeMode={true}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[FreeMode, Pagination]} className="mySwiper p-0">
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Col className='d-flex justify-content-start align-items-center '>
                    <Image src='https://img.freepik.com/free-photo/side-view-woman-posing-with-trendy-hairstyle_23-2149883734.jpg?size=626&ext=jpg&ga=GA1.1.783361277.1699509797&semt=ais' style={{maxHeight:'9vh', width:'15%'}} alt='Card Img' fluid></Image>
                    <Card.Title className='d-flex flex-column align-items-start justify-content-center mt-2 '><span className='ms-3 fs-5 fw-medium '>HariPrasath</span><span className='ms-3 fs-6 fw-bolder '>User</span></Card.Title>
                  </Col>
                  <hr className='mt-0'/>
                  <Card.Body>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the cards content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Col className='d-flex justify-content-start align-items-center '>
                    <Image src='https://img.freepik.com/free-photo/side-view-woman-posing-with-trendy-hairstyle_23-2149883734.jpg?size=626&ext=jpg&ga=GA1.1.783361277.1699509797&semt=ais' style={{maxHeight:'9vh', width:'15%'}} alt='Card Img' fluid></Image>
                    <Card.Title className='d-flex flex-column align-items-start justify-content-center mt-2 '><span className='ms-3 fs-5 fw-medium '>HariPrasath</span><span className='ms-3 fs-6 fw-bolder '>User</span></Card.Title>
                  </Col>
                  <hr className='mt-0'/>
                  <Card.Body>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the cards content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Col className='d-flex justify-content-start align-items-center '>
                    <Image src='https://img.freepik.com/free-photo/side-view-woman-posing-with-trendy-hairstyle_23-2149883734.jpg?size=626&ext=jpg&ga=GA1.1.783361277.1699509797&semt=ais' style={{maxHeight:'9vh', width:'15%'}} alt='Card Img' fluid></Image>
                    <Card.Title className='d-flex flex-column align-items-start justify-content-center mt-2 '><span className='ms-3 fs-5 fw-medium '>HariPrasath</span><span className='ms-3 fs-6 fw-bolder '>User</span></Card.Title>
                  </Col>
                  <hr className='mt-0'/>
                  <Card.Body>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the cards content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Col className='d-flex justify-content-start align-items-center '>
                    <Image src='https://img.freepik.com/free-photo/side-view-woman-posing-with-trendy-hairstyle_23-2149883734.jpg?size=626&ext=jpg&ga=GA1.1.783361277.1699509797&semt=ais' style={{maxHeight:'9vh', width:'15%'}} alt='Card Img' fluid></Image>
                    <Card.Title className='d-flex flex-column align-items-start justify-content-center mt-2 '><span className='ms-3 fs-5 fw-medium '>HariPrasath</span><span className='ms-3 fs-6 fw-bolder '>User</span></Card.Title>
                  </Col>
                  <hr className='mt-0'/>
                  <Card.Body>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the cards content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <Row xs={1} md={2} className="g-4"> */}
              <Col>
                <Card>
                  <Col className='d-flex justify-content-start align-items-center '>
                    <Image src='https://img.freepik.com/free-photo/side-view-woman-posing-with-trendy-hairstyle_23-2149883734.jpg?size=626&ext=jpg&ga=GA1.1.783361277.1699509797&semt=ais' style={{maxHeight:'9vh', width:'15%'}} alt='Card Img' fluid></Image>
                    <Card.Title className='d-flex flex-column align-items-start justify-content-center mt-2 '><span className='ms-3 fs-5 fw-medium '>HariPrasath</span><span className='ms-3 fs-6 fw-bolder '>User</span></Card.Title>
                  </Col>
                  <hr className='mt-0'/>
                  <Card.Body>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the cards content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* </Row> */}
            </SwiperSlide>
          </Swiper>
        </Container>
        {/* ends */}

          <Footer />
      </>
    )
}

export default Home