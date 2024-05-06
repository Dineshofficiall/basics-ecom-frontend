// eslint-disable-next-line no-unused-vars
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'

import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

// css
import './ProductDetailPage.css'

// bootstrap
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';

// nestedRoute
import { Link, Outlet } from 'react-router-dom'

// icons
import { MdOutlineStarRate } from "react-icons/md";
import { LiaHandHoldingHeartSolid } from "react-icons/lia";
import { useDataContext } from '../useContext/DataContext';
import { FaIndianRupeeSign } from "react-icons/fa6";

function ProductDetailPage() {
    // navigate
    const navigate = useNavigate();

    const [apiObj, updateApiObj] = useState('');
    const [loaded, setLoaded] = useState(false);
    const Params = useParams();

    // useContext
    const dataContext = useDataContext();
    const userobj = dataContext.userObject;


    const [loading, setLoading] =useState(true);
    // useEffect
    useEffect(()=>{

        // const idByProduct = () =>{
        //     axios.get(`http://localhost:5300/Basics-Products/singleProduct/${Params.id}`)
        //     .then((response)=>{
        //         // console.log("Data Products",response.data);
        //         updateApiObj(response.data);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     })
        const idByProduct = async () =>{
            try {
                setTimeout( async ()=>{
                    const singleProductResponse = await axios.get(`http://localhost:5300/Basics-Products/singleProduct/${Params.id}`);
                    updateApiObj(singleProductResponse.data);
                    setLoading(false);
                }, 450)

            } catch (error) {
                console.error("error fetching single product", error);
                setLoading(false);
            }
            // axios.get(`http://localhost:5300/Basics-Products/singleProduct/${Params.id}`)
            // .then((response)=>{
            //     // console.log("Data Products",response.data);
            //     updateApiObj(response.data);
            // })
            // .catch((error)=>{
            //     console.log(error);
            // })
        }
        if (apiObj !== null) {
            idByProduct();
        }

        const productId = Params.id;
        console.log(productId);
        setLoaded(true);
        
        dataContext.addProduct(productId);

    }, [Params.id, apiObj, dataContext])

    // const [kartObj, updateKartObj] = useState(null)
    
    // kart page

    const [kartObj, setKartObj] = useState({
        productId : Params.id,
        userId : userobj ? userobj.id : null
    });
    const pageDirectKart = ()=>{
        if (userobj !== null && userobj.id !== null) {
            kartApi();
            navigate(`/kart`);
        }
        else {
            if(confirm('Please Login')){
                navigate('/');
            }
        }
    }
    const kartApi = async ()=>{
        try {
            setTimeout(async ()=>{
                setLoading(true);
                const createKartResponse = await axios.post(`http://localhost:5300/basics-kart/createKart`, kartObj);
                console.log(createKartResponse);
                setLoading(false);
            }, 450)
        } catch (error) {
            setLoading(true);
            console.log("add to cart operation failed", error);
            setLoading(false);
        }
    }

    // images zoom
    const [image, updateImage] = useState(0);

    if (loaded)
        {
            return (
                <>
                {!loading && <>
                {/* context */}
                    <NavBar />
        
                    {/* Cards */}
                    <Container>
                        <Row className='my-4 d-flex justify-content-center align-items-start'>
        
                            {/* img block */}
                            {apiObj!='' ? 
                              
                            (<Col lg={4}>
                                
                                <Col lg={12} className='d-flex justify-content-center align-items-center mt-3'>
                                    <Image src={apiObj.productImage[image]} className='product-img' style={{width : '80%', height : '50vh'}} />
                                </Col>
                                <Col lg={12} className='d-flex justify-content-evenly align-items-center gap-3   my-3'>
                                    <Col sm={2} lg={2}>
                                        <Image src={apiObj.productImage[0]} className='product-img' style={{width : '100%'}} onClick={()=>{updateImage(0)}}/>
                                    </Col>
                                    <Col sm={2} lg={2}>
                                        <Image src={apiObj.productImage[1]} className='product-img' style={{width : '100%'}} onClick={()=>{updateImage(1)}}/>
                                    </Col>
                                    <Col sm={2} lg={2}>
                                        <Image src={apiObj.productImage[2]} className='product-img' style={{width : '100%'}} onClick={()=>{updateImage(2)}}/>
                                    </Col>
                                    <Col sm={2} lg={2}>
                                        <Image src={apiObj.productImage[3]} className='product-img' style={{width : '100%'}} onClick={()=>{updateImage(3)}}/>
                                    </Col>
                                </Col>
                               
                            </Col>
                            ):('')}
        
                            {/* middle hide */}
                            <Col lg={6} className='pb-2 position-relative px-2'>
                                <Col className='fw-bolder my-3 d-flex flex-column align-items-start justify-content-start'>
                                    <h2>{apiObj.productDescription}</h2>
                                    <div className='ps-3 mt-3 d-flex justify-content-start align-items-center '>
                                        <h5>MRP : </h5>
                                        <h5 className='d-flex justify-content-center align-items-center'><span className='fs-6 mx-1' style={{paddingBottom : '1px'}}><FaIndianRupeeSign /></span>{apiObj.productPrice}</h5>
                                    </div>
                                    <div className='d-flex justify-content-start align-items-center w-50 mt-2 ps-3'>
                                        <p className='d-flex justify-content-center align-items-center '>4<MdOutlineStarRate /><span className='ms-2'>Ratings</span></p>
                                        <p className='mx-2'>|</p>
                                        <p className='d-flex align-items-center justify-content-center'>2000<span className='mx-2'>~</span>review</p>
                                    </div>
                                </Col>
                                <Col style={{width : "40%"}} className='ps-3'>
                                    <h6>Choose Size</h6>
                                    <div className='d-flex justify-content-evenly align-items-center'>
                                        <span className='p-2 px-3 bg-info'>S</span>
                                        <span className='p-2 px-3 bg-info'>M</span>
                                        <span className='p-2 px-3 bg-info'>L</span>
                                        <span className='p-2 px-3 bg-info'>XL</span>
                                    </div>
                                </Col>
                                <Col className='mt-4'>
                                    <Button variant='outline-dark' className='w-50' onClick={pageDirectKart}>Add to cart</Button>
                                </Col>
                                <Col className='mt-4'>
                                    <Col className='d-flex justify-content-start align-items-center py-2'>
                                        <Link className='mx-5 text-dark fw-semibold text-decoration-none ' to='aboutProduct'>About item</Link>
                                        <Link className='ms-4 text-dark fw-semibold text-decoration-none ' to='review'>Review</Link>
                                    </Col>
                                    <hr />
                                    <Col lg={12}>
                                        <Outlet/>
                                    </Col>
                                </Col>
                                <Col className='whislists p-0'>
                                    <Button variant='outline-dark' className='fs-5 rounded-pill '><LiaHandHoldingHeartSolid /></Button>
                                </Col>
                            </Col>
                        </Row>
                    </Container>
        
                    {/* footer */}
                    <Footer />
                    </>
                    }

                    {loading && <Container className='d-flex justify-content-center align-items-center ' style={{height : '100vh', width : '100%'}}>
                        <Spinner animation="border" className='fs-2 ' style={{padding : '30px'}} variant="danger" />
                    </Container>}
                </>
            );
    }
    else {
        return (<div>Loading...</div>)
    }
}

export default ProductDetailPage