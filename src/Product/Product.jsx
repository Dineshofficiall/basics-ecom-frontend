// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Container, Image, Row, Col, Card, Form, Dropdown, Button, Pagination} from 'react-bootstrap';

// css
import '../Product/product.css'

// logo's
import { MdStarPurple500, MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp, MdFilterList } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import axios from 'axios';
import { useEffect } from 'react';
import { TbCurrencyRupee } from "react-icons/tb";
import { TiStarHalfOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
function Product() {
    const navigate = useNavigate();
    // ratings
    const [ratingsDropDown, setRatingsDropDown] = useState(true);
    // colors
    const [colorDropDown, setColorDropDown] = useState(true);
    // sizes
    const [sizeDropDown, setSizeDropDown] = useState(true);
    // priceDifference
    const [priceSortDropDown, setPriceSortDropDown] = useState(true);
    // alphabeticalSortDropDown
    const [alphabeticalSortDropDown, setAlphabeticalSortDropDown] = useState(true);
    
    // Mobile Responsive Filter
    const [mobileFilterDropDown, setMobileFilterDropDown] = useState(false);

    // apiObj
    const [productApi, updateProductApi] = useState([]);
    useEffect(()=>{
        allProductApi();
    }, [])

    const allProductApi = ()=>{
        axios.get('http://localhost:5300/Basics-Products/allProduct')
        .then((response)=>{
            console.log(response.data);
            updateProductApi(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const productDetailRedirect = (productId) =>{
        console.log(productId);
        navigate(`/productDetails/${productId}`)
    }

    // pagination
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }

    return (
        <>
            <NavBar />

            <Container className='bg-warning'>
                <Image src="https://thegenuineleather.com/wp-content/uploads/2023/11/suede-jackets-banner-wepp-scaled.webp" className='banner-img object-fit-fill object-fit-md-cover object-fit-lg-cover' style={{width:`100%`, height : `45vh`,}} fluid />
                <div className='ms-4'>
                    <span className='bg-info p-3 fw-bolder rounded-start-pill'>Home</span><span className='bg-danger p-3 fw-bolder rounded-end-pill '>Products..</span>
                </div>
            </Container>

            {/* swipper block categories */}
            <Container>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </Container>

            <Container className='my-5'>
                <Row>
{/* -------------------------------------------------------------------------------- */}

                    {/* Mobile filter */}
                    <Col className='mobile-Filter-parent-block my-4'>
                        <Dropdown show={mobileFilterDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                            <Dropdown.Toggle variant="transparent" className='fw-bolder fs-4 mobile-fiter' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setMobileFilterDropDown(!mobileFilterDropDown)}>
                                Filter <span className='ms-3'><MdFilterList  /></span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ width: '100%' }}>
                                {/* Filters */}
                                <Col sm={3} className='bg-secondary py-4 '>
                                    <Row className='d-flex flex-column '>
                                        {/* Range */}
                                        <Col className='mb-4'>
                                            <Form.Label>Range</Form.Label>
                                            <Form.Range />
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='p-2 priceRangeUpdate'><HiOutlineCurrencyRupee />1000</span><span className='p-2 priceRangeUpdate'><HiOutlineCurrencyRupee />5000</span>
                                            </div>
                                        </Col>
                                        {/* Ends */}

                                        {/* Ratings */}
                                        <Col className='mb-4'>
                                            <Dropdown show={ratingsDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                                <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setRatingsDropDown(!ratingsDropDown)}>
                                                    Ratings
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu style={{ width: '100%' }}>
                                                    <div className='d-flex justify-content-start align-items-center py-1 '>
                                                        <Form.Check aria-label="option 1" className='mx-2'/> 4<MdStarPurple500 /><span className='ms-2'>Above</span>
                                                    </div>
                                                    <hr className='my-1'/>
                                                    <div className="d-flex justify-content-start align-items-center py-1">
                                                        <Form.Check aria-label="option 2" className='mx-2'/> 3<MdStarPurple500 /><span className='ms-2'>Above</span>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        {/* Ends */}

                                        {/* colors */}
                                        <Col className='mb-4'>
                                            <Dropdown show={colorDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                                <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setColorDropDown(!colorDropDown)}>
                                                    Color
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu style={{ width: '100%' }}>
                                                    <div className='d-flex justify-content-evenly align-items-center '>
                                                        <span className='p-2 mb-0 bg-danger text-light rounded-pill'>red</span>
                                                        <span className='p-2 mb-0 text-light rounded-pill' style={{backgroundColor : 'purple'}}>violet</span>
                                                        <span className='p-2 mb-0 bg-primary text-light rounded-pill'>blue</span>
                                                        <span className='p-2 mb-0 bg-black text-light rounded-pill'>black</span>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        {/* Ends */}

                                        {/* Sizes */}
                                        <Col className='mb-4'>
                                            <Dropdown show={sizeDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                                <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setSizeDropDown(!sizeDropDown)}>
                                                    Sizes
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu style={{ width: '100%' }}>
                                                    <div className='d-flex justify-content-evenly align-items-center flex-wrap sizeUpdate'>
                                                        <span className='p-2 mb-0 rounded-pill'>sm</span>
                                                        <span className='p-2 mb-0 rounded-pill'>md</span>
                                                        <span className='p-2 mb-0 rounded-pill'>lg</span>
                                                        <span className='p-2 mb-0 rounded-pill'>xl</span>
                                                        <span className='p-2 mb-0 rounded-pill'>xll</span>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        {/* Ends */}

                                        {/* Price high to low - low to high */}
                                        <Col className='mb-4'>
                                            <Dropdown show={priceSortDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                                <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setPriceSortDropDown(!priceSortDropDown)}>
                                                    Price
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu style={{ width: '100%' }}>
                                                    <div className='d-flex justify-content-start align-items-center py-1 '>
                                                        <Form.Check aria-label="option 1" className='mx-2'/> High To Low  <span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowDown /></span>
                                                    </div>
                                                    <hr className='my-1'/>
                                                    <div className="d-flex justify-content-start align-items-center py-1">
                                                        <Form.Check aria-label="option 2" className='mx-2'/> Low To High<span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowUp  /></span>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        {/* Ends */}

                                        {/* Product Alphabetically */}
                                        <Col className='mb-4'>
                                            <Dropdown show={alphabeticalSortDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                                <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setAlphabeticalSortDropDown(!alphabeticalSortDropDown)}>
                                                Product Alphabetical
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu style={{ width: '100%' }}>
                                                    <div className='d-flex justify-content-start align-items-center py-1 '>
                                                        <Form.Check aria-label="option 1" className='mx-2'/> A To Z  <span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowDown /></span>
                                                    </div>
                                                    <hr className='my-1'/>
                                                    <div className="d-flex justify-content-start align-items-center py-1">
                                                        <Form.Check aria-label="option 2" className='mx-2'/> Z To A<span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowUp  /></span>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        {/* Ends */}
                                        <div className='d-flex justify-content-center align-items-center '>
                                            <Button variant="primary" className='w-75'>apply Changes</Button>{' '}
                                        </div>
                                    </Row>
                                </Col>
                                {/* Ends */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    {/* Ends */}

{/* -------------------------------------------------------------------------------- */}

                    {/* Lap-Filters */}
                    <Col sm={3} className='py-4 filter-parent-block'>
                        <Row className='d-flex flex-column '>
                            {/* Range */}
                            <Col className='mb-4'>
                                <Form.Label>Range</Form.Label>
                                <Form.Range />
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span className='p-2 priceRangeUpdate'><HiOutlineCurrencyRupee />1000</span><span className='p-2 priceRangeUpdate'><HiOutlineCurrencyRupee />5000</span>
                                </div>
                            </Col>
                            {/* Ends */}

                            {/* Ratings */}
                            <Col className='mb-4'>
                                <Dropdown show={ratingsDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                    <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setRatingsDropDown(!ratingsDropDown)}>
                                        Ratings
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        <div className='d-flex justify-content-start align-items-center py-1 '>
                                            <Form.Check aria-label="option 1" className='mx-2'/> 4<MdStarPurple500 /><span className='ms-2'>Above</span>
                                        </div>
                                        <hr className='my-1'/>
                                        <div className="d-flex justify-content-start align-items-center py-1">
                                            <Form.Check aria-label="option 2" className='mx-2'/> 3<MdStarPurple500 /><span className='ms-2'>Above</span>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            {/* Ends */}

                            {/* colors */}
                            <Col className='mb-4'>
                                <Dropdown show={colorDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                    <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setColorDropDown(!colorDropDown)}>
                                        Color
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        <div className='d-flex justify-content-evenly align-items-center '>
                                            <span className='p-2 mb-0 bg-danger text-light rounded-pill'>red</span>
                                            <span className='p-2 mb-0 text-light rounded-pill' style={{backgroundColor : 'purple'}}>violet</span>
                                            <span className='p-2 mb-0 bg-primary text-light rounded-pill'>blue</span>
                                            <span className='p-2 mb-0 bg-black text-light rounded-pill'>black</span>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            {/* Ends */}

                            {/* Sizes */}
                            <Col className='mb-4'>
                                <Dropdown show={sizeDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                    <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setSizeDropDown(!sizeDropDown)}>
                                        Sizes
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        <div className='d-flex justify-content-evenly align-items-center flex-wrap sizeUpdate'>
                                            <span className='p-2 mb-0 rounded-pill'>sm</span>
                                            <span className='p-2 mb-0 rounded-pill'>md</span>
                                            <span className='p-2 mb-0 rounded-pill'>lg</span>
                                            <span className='p-2 mb-0 rounded-pill'>xl</span>
                                            <span className='p-2 mb-0 rounded-pill'>xll</span>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            {/* Ends */}

                            {/* Price high to low - low to high */}
                            <Col className='mb-4'>
                                <Dropdown show={priceSortDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                    <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setPriceSortDropDown(!priceSortDropDown)}>
                                        Price
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        <div className='d-flex justify-content-start align-items-center py-1 '>
                                            <Form.Check aria-label="option 1" className='mx-2'/> High To Low  <span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowDown /></span>
                                        </div>
                                        <hr className='my-1'/>
                                        <div className="d-flex justify-content-start align-items-center py-1">
                                            <Form.Check aria-label="option 2" className='mx-2'/> Low To High<span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowUp  /></span>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            {/* Ends */}

                            {/* Product Alphabetically */}
                            <Col className='mb-4'>
                                <Dropdown show={alphabeticalSortDropDown} style={{ width: '100%', borderRadius : '20px' }}>
                                    <Dropdown.Toggle variant="transparent" className='fw-bolder rounded-3 border-0 ' id="dropdown-basic" style={{ width: '100%' }}  onClick={() => setAlphabeticalSortDropDown(!alphabeticalSortDropDown)}>
                                    Product Alphabetical
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        <div className='d-flex justify-content-start align-items-center py-1 '>
                                            <Form.Check aria-label="option 1" className='mx-2'/> A To Z  <span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowDown /></span>
                                        </div>
                                        <hr className='my-1'/>
                                        <div className="d-flex justify-content-start align-items-center py-1">
                                            <Form.Check aria-label="option 2" className='mx-2'/> Z To A<span className='ms-2 fs-5 pb-1'><MdKeyboardDoubleArrowUp  /></span>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            {/* Ends */}
                            <div className='d-flex justify-content-center align-items-center '>
                                <Button variant="primary" className='w-75'>apply Changes</Button>{' '}
                            </div>
                        </Row>
                    </Col>
                    {/* Ends */}

{/* -------------------------------------------------------------------------------- */}

                    {/* Cards */}
                    <Col sm={9} className='py-4'>
                        <Row xs={1} md={2} lg={3} className="gx-3 gy-4">
                            {productApi.map((responseObject, index)=>(
                                <Col key={index}>
                                    <Card className='position-relative cards'>
                                        <Card.Img variant="top" src={responseObject.productImage[0]} className='object-fit-contain ' style={{height : '30vh'}} />
                                        <Card.Body>
                                            <Col className='d-flex justify-content-between align-items-center '>
                                                <Card.Text className='fw-bold fs-6 mb-2 d-flex justify-content-between align-items-center '>{responseObject.productName}</Card.Text>
                                                <Button variant="outline-warning">4<TiStarHalfOutline /></Button>{' '}
                                            </Col>
                                            <Card.Text>Baiscs | Product | {responseObject.categories}</Card.Text> 
                                            <Col className='d-flex justify-content-between align-items-center '> 
                                                <span>Price : <TbCurrencyRupee />{responseObject.productPrice}</span>
                                                <Button variant='outline-secondary rounded-pill' className='' onClick={()=> productDetailRedirect(responseObject.id)}>Click Here</Button>{' '}
                                            </Col>
                                            <hr />
                                            <small className='bg-primary p-2 rounded-pill text-light card-offer-btn'>{responseObject.productDiscount}%off</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Container>
            
            </Container>

            {/* Pagination */}
            <Container>
                <div className='d-flex justify-content-center align-items-center '>
                    <Pagination size="sm" className='mx-1'>{items}</Pagination>
                </div>
            </Container>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Product