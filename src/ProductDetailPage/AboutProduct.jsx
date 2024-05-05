// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Container } from 'react-bootstrap'
import { useDataContext } from '../useContext/DataContext';

function AboutProduct() {
    // product id Display
    const dataContext = useDataContext();
    

    useEffect (()=>{
        aboutProductApi();
        // console.log("DataContext Product id ===>", localProductId);
    }, [])


    const [aboutDetails, updateAboutDetails] = useState();
    const aboutProductApi = () =>{
        const localProductId = dataContext.productId;
        console.log(localProductId);
        axios.get(`http://localhost:5300/Basics-Products/singleProduct/${localProductId}`)
        .then((response)=>{
            console.log("About Products ===>",response.data);
            updateAboutDetails(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }
    return (
        <>
            <Container>
                {aboutDetails ? (
                    <Col>
                        <Col lg={12}>
                            <div className='d-flex justify-content-between align-items-center '>
                                <p>Brand : {aboutDetails.productName}</p>
                                <p>Color : {aboutDetails.productColor}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center '>
                                <p>Category : {aboutDetails.categories}</p>
                                <p>Material : {aboutDetails.productType}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center '>
                                <p>Gender : {aboutDetails.productGender}</p>
                                <p>Discount : {aboutDetails.productDiscount}</p>
                            </div>
                        </Col>
                        <hr />
                        <Col>
                            <p>Description : {aboutDetails.productDescription}</p>
                        </Col>
                        
                    </Col>
                ) : (
                    <p>Loading...</p>
                )}
            </Container>
        </>
    )
}

export default AboutProduct