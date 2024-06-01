// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Container, Image, Row, Col, Card, Form, Dropdown, Button, Accordion, Spinner} from 'react-bootstrap';

// css
import '../Product/product.css'

// logo's
import { MdStarPurple500, MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp, MdFilterList } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import axios from 'axios';
import { useEffect } from 'react';
import { TbCurrencyRupee } from "react-icons/tb";
import { TiStarHalfOutline } from "react-icons/ti";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Link
import { Link, useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

// css
import '../Product/styles2.css'
import Slider from 'react-slider';

const MIN = 1000;
const MAX = 5000;

function Product() {
    const navigate = useNavigate();

    // Mobile Responsive Filter
    const [mobileFilterDropDown, setMobileFilterDropDown] = useState(false);

    // apiObj
    const [productApi, updateProductApi] = useState([]);
    const [loading, setLoading] =useState(true);
    const [category, updateCategory] = useState([]);
    const [color, updateColor] = useState([]);
    const [dressSize, setDressSize] = useState([]);

    useEffect(()=>{
        const allProductApi = async () => {
            try {

                // all product
                const allProductsResponse = await axios.get('http://localhost:5300/Basics-Products/allProduct');
                updateProductApi(allProductsResponse.data);
                
                // category
                const uniqueCategories = [...new Set(allProductsResponse.data.map(item => item.categories))];
                updateCategory(uniqueCategories);
                
                // colorCategory
                const uniqueColors = [...new Set(allProductsResponse.data.map(item => item.productColor))];
                updateColor(uniqueColors);

                // productSizes
                const uniqueDressSize = [...new Set(allProductsResponse.data.map(item => item.productSize))];
                setDressSize(uniqueDressSize);

                setLoading(false);

            } catch (error) {
                console.error('Error getting all products:', error);
                setLoading(false);
            }
        };

        allProductApi();
    }, [])

    // getCategoryWise
    const selectedCategory = (catName) =>{
        axios.get(`http://localhost:5300/Basics-Products/category/${catName}`)
        .then((response) =>{
            setLoading(true);
            updateProductApi(response.data);
            setLoading(false);
        })
        .catch((error) =>{
            console.log(error);
        })
    };

    const [values, setValues] = useState([MIN, MAX]);
    
    const filterSubmit = ()=>{
        axios.get(`http://localhost:5300/Basics-Products/getProductRange/${values[0]}/${values[1]}`)
        .then((response)=>{
            setLoading(true);
            updateProductApi(response.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    const selectedColor = (colorName) =>{
        axios.get(`http://localhost:5300/Basics-Products/getColorByProduct/${colorName}`)
        .then((response)=>{
            setLoading(true);
            updateProductApi(response.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const priceHighToLow = () =>{
        axios.get(`http://localhost:5300/Basics-Products/getProductHighToLowPrice`)
        .then((response)=>{
            updateProductApi(response.data);
        })
    }

    const priceLowToHigh = () =>{
        axios.get(`http://localhost:5300/Basics-Products/getProductLowToHighPrice`)
        .then((response)=>{
            updateProductApi(response.data);
        })
    }

    const productDetailRedirect = (productId) =>{
        navigate(`/productDetails/${productId}`)
    }

    return (
        <>
        {!loading && 
            <>
            <NavBar />

            <Container className='bg-warning'>
                <Image src="https://thegenuineleather.com/wp-content/uploads/2023/11/suede-jackets-banner-wepp-scaled.webp" className=' object-fit-fill object-fit-md-cover object-fit-lg-cover' style={{width:`100%`, height : `45vh`,}} fluid />
                <div className='ms-4'>
                    <span className='bg-success p-3 fw-bolder rounded-start-pill'><Link className='text-decoration-none text-warning fw-bold links' to='/Home'>Home</Link></span><span className='bg-warning p-3 fw-bolder rounded-end-pill '><Link className='text-decoration-none text-success  links' to='/product'>Products..</Link></span>
                </div>
            </Container>

            {/* category */}
            <Container className='my-5 px-5 pb-4 productCategories'>
                <Col sm={12} className='my-md-3 mt-md-4 pt-4'>
                    <h5 className='fw-bolder ms-md-2 my-0'>Categories</h5>
                </Col>
                <Swiper slidesPerView={'auto'} spaceBetween={40} freeMode={true}
                    modules={[FreeMode, Pagination]} className="mySwiper py-4 py-lg-4">
                    {Array.isArray(category) && category.map((res, index)=>(
                        <SwiperSlide key={index} className='bg-transparent'>
                            <Col className='perCategory'>
                                <Button variant='transparent' className='category=btn' onClick={()=>selectedCategory(res)}>{res}</Button>
                            </Col>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
            {/* ends */}

            <Container className='my-5'>
                <Row className='d-flex justify-content-center align-items-center align-items-md-start '>
{/* -------------------------------------------------------------------------------- */}

                    {/* Mobile filter */}
                    <Col className='mobile-Filter-parent-block my-4'>
                        <Dropdown show={mobileFilterDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                            <Dropdown.Toggle variant="transparent" className='fw-bolder fs-4 mobile-fiter' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setMobileFilterDropDown(!mobileFilterDropDown)}>
                                Filter <span className='ms-3'><MdFilterList  /></span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ width: '100%' }}>
                                {/* Filters */}
                                <Col sm={12} className='py-4 '>
                                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                                        {/* Range */}
                                        <Col>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Range</Accordion.Header>
                                                <Accordion.Body>
                                                    {/* Range */}
                                                    <Col className='mb-4'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <span className='p-2 priceRangeUpdate'><HiOutlineCurrencyRupee />1000</span><span className='p-2 priceRangeUpdate'><HiOutlineCurrencyRupee />5000</span>
                                                        </div>
                                                    </Col>
                                                    {/* Ends */}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Col>
                                        {/* Ends */}

                                        {/* Ratings */}
                                        <Col>
                                            <Accordion.Item eventKey="1" alwaysOpen>
                                                <Accordion.Header>Ratings</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className='d-flex justify-content-start align-items-center py-1 '>
                                                        <Form.Check aria-label="option 1" className='mx-2'/> 4<MdStarPurple500 /><span className='ms-2'>Above</span>
                                                    </div>
                                                    <hr className='my-1'/>
                                                    <div className="d-flex justify-content-start align-items-center py-1">
                                                        <Form.Check aria-label="option 2" className='mx-2'/> 3<MdStarPurple500 /><span className='ms-2'>Above</span>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Col>
                                        {/* Ends */}

                                        {/* colors */}
                                        <Col>
                                            <Accordion.Item eventKey="2" alwaysOpen>
                                                <Accordion.Header>ProductColor</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className='d-flex justify-content-evenly align-items-center '>
                                                        <span className='p-2 mb-0 bg-danger text-light rounded-pill'>red</span>
                                                        <span className='p-2 mb-0 text-light rounded-pill' style={{backgroundColor : 'purple'}}>violet</span>
                                                        <span className='p-2 mb-0 bg-primary text-light rounded-pill'>blue</span>
                                                        <span className='p-2 mb-0 bg-black text-light rounded-pill'>black</span>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Col>
                                        {/* Ends */}

                                        {/* Sizes */}
                                        <Col>
                                            <Accordion.Item eventKey="3" alwaysOpen>
                                                <Accordion.Header>Sizes</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className='d-flex justify-content-evenly align-items-center flex-wrap sizeUpdate'>
                                                        <span className='p-2 mb-0 rounded-pill'>sm</span>
                                                        <span className='p-2 mb-0 rounded-pill'>md</span>
                                                        <span className='p-2 mb-0 rounded-pill'>lg</span>
                                                        <span className='p-2 mb-0 rounded-pill'>xl</span>
                                                        <span className='p-2 mb-0 rounded-pill'>xll</span>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Col>
                                        {/* Ends */}

                                        {/* Price high to low - low to high */}
                                        <Col>
                                            <Accordion.Item eventKey="4" alwaysOpen>
                                                <Accordion.Header>Price</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className='d-flex justify-content-start align-items-center py-1 '>
                                                        <Form.Check aria-label="option 1" className='mx-2'/> High To Low  <span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowDown /></span>
                                                    </div>
                                                    <hr className='my-1'/>
                                                    <div className="d-flex justify-content-start align-items-center py-1">
                                                        <Form.Check aria-label="option 2" className='mx-2'/> Low To High<span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowUp  /></span>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Col>
                                        {/* Ends */}

                                        
                                        <div className='d-flex justify-content-center align-items-center mt-4'>
                                            <Button variant="primary" className='w-75'>apply Changes</Button>{' '}
                                        </div>
                                    </Accordion>
                                </Col>
                                {/* Ends */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    {/* Ends */}

{/* -------------------------------------------------------------------------------- */}

                    {/* Lap-Filters */}
                    <Col sm={3} className='py-4 filter-parent-block'>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            {/* Range */}
                            <Col className='mb-4'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Price Range</Accordion.Header>
                                    <Accordion.Body>
                                        {/* Range */}
                                        <Col className='mb-4 d-flex flex-column justify-content-evenly pt-3 ' >
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='p-2 priceRangeUpdate'><HiOutlineCurrencyRupee />{values[0]}</span><span className='p-2 priceRangeUpdate'><HiOutlineCurrencyRupee />{values[1]}</span>
                                            </div>
                                            <Slider 
                                                className='slider mt-3'
                                                onChange={setValues}
                                                value={values}
                                                min={MIN}
                                                max={MAX}
                                                aria-labelledby="price-range-slider"
                                            />
                                        </Col>
                                        {/* Ends */}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Col>
                            {/* Ends */}

                            {/* Ratings */}
                            <Col className='mb-4'>
                                <Accordion.Item eventKey="1" alwaysOpen>
                                    <Accordion.Header>Ratings</Accordion.Header>
                                    <Accordion.Body>
                                        <div className='d-flex justify-content-start align-items-center py-1 '>
                                            <Form.Check aria-label="option 1" className='mx-2 custom-checkbox'/> 4<MdStarPurple500 /><span className='ms-2'>Above</span>
                                        </div>
                                        <hr className='my-1'/>
                                        <div className="d-flex justify-content-start align-items-center py-1">
                                            <Form.Check aria-label="option 2" className='mx-2 custom-checkbox'/> 3<MdStarPurple500 /><span className='ms-2'>Above</span>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Col>
                            {/* Ends */}

                            {/* colors */}
                            <Col className='mb-4'>
                                <Accordion.Item eventKey="2" alwaysOpen>
                                    <Accordion.Header>ProductColor</Accordion.Header>
                                    <Accordion.Body>
                                        <div className='d-flex justify-content-between align-items-center flex-wrap'>
                                            {Array.isArray(color) && color.map((res, index) => (
                                                <Button key={index} variant='outline-dark' className='text-dark my-2 rounded-pill' style={{ backgroundColor: res }} onClick={()=>selectedColor(res)}>{res}</Button>
                                            ))}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Col>
                            {/* Ends */}

                            {/* Sizes */}
                            <Col className='mb-4'>
                                <Accordion.Item eventKey="3" alwaysOpen>
                                    <Accordion.Header>Sizes</Accordion.Header>
                                    <Accordion.Body>
                                        <div className='d-flex justify-content-evenly align-items-center flex-wrap sizeUpdate'>
                                            <span className='p-2 mb-0 rounded-pill'>sm</span>
                                            <span className='p-2 mb-0 rounded-pill'>md</span>
                                            <span className='p-2 mb-0 rounded-pill'>lg</span>
                                            <span className='p-2 mb-0 rounded-pill'>xl</span>
                                            <span className='p-2 mb-0 rounded-pill'>xll</span>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Col>
                            {/* Ends */}

                            {/* Price high to low - low to high */}
                            <Col className='mb-4'>
                                <Accordion.Item eventKey="4" alwaysOpen>
                                    <Accordion.Header>Price</Accordion.Header>
                                    <Accordion.Body>
                                        <div className='d-flex justify-content-start align-items-center py-1 '>
                                            <Form.Check onClick={()=>priceHighToLow()} aria-label="option 1" className='mx-2 custom-checkbox'/> High To Low  <span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowDown /></span>
                                        </div>
                                        <hr className='my-1'/>
                                        <div className="d-flex justify-content-start align-items-center py-1">
                                            <Form.Check onClick={()=>priceLowToHigh()} aria-label="option 2" className='mx-2 custom-checkbox'/> Low To High<span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowUp  /></span>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Col>
                            {/* Ends */}


                            <div className='d-flex justify-content-center align-items-center '>
                                <Button variant="primary" className='w-75' onClick={()=>filterSubmit()}>apply Changes</Button>{' '}
                            </div>
                        </Accordion>
                    </Col>
                    {/* Ends */}

{/* -------------------------------------------------------------------------------- */}

                    {/* Cards */}
                    <Col sm={9} className='py-4'>
                        <Row xs={1} md={2} lg={3} className="gx-3 gy-4">
                            {productApi.map((responseObject, index)=>(
                                <Col key={index} onClick={()=> productDetailRedirect(responseObject.id)}>
                                    <Card className='position-relative cards'>
                                        <Card.Img variant="top" src={responseObject.productImage[0]} className='object-fit-contain ' style={{height : '30vh'}} />
                                        <Card.Body>
                                            <Col className='d-flex justify-content-between align-items-center '>
                                                <Card.Text className='fw-bold fs-6 mb-2 d-flex justify-content-between align-items-center '>{responseObject.productName}</Card.Text>
                                                <Button variant="outline-warning">4<TiStarHalfOutline /></Button>{' '}
                                            </Col>
                                            <hr className='mt-3 mb-2' />
                                            <Card.Text>Baiscs | Product | {responseObject.categories}</Card.Text> 
                                            <Col className='d-flex justify-content-start align-items-center '> 
                                                <span>Price : <TbCurrencyRupee />{responseObject.productPrice}</span>
                                            </Col>
                                            <hr className='mt-3 mb-0' />
                                            <small className='bg-primary p-2 rounded-pill text-light card-offer-btn'>{responseObject.productDiscount}%off</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
            {/* ends */}

            {/* Footer */}
            <Footer />
            </>}

            {loading && <Container className='d-flex justify-content-center align-items-center ' style={{height : '100vh', width : '100%'}}>
            <Spinner animation="border" className='fs-2 ' style={{padding : '30px'}} variant="danger" />
        </Container>}
        </>
    );
}

export default Product