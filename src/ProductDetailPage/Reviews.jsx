// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Col, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useDataContext } from '../useContext/DataContext';
function Reviews() {

    // useContext
    const dataContext = useDataContext();
    
    let usersId = dataContext.userObject;
    const productsId = dataContext.productId

    // useEffect
    useEffect(()=>{
        getAllProduct();
    }, [])

//  commentVariable
    const [userComment, updateUserComment] = useState({
        comment : '',
        userId : '',
        productId : productsId
    });


//  onChange comment
    const update = (inputResult) =>{
        const{name, value} = inputResult.target;
        updateUserComment({...userComment, [name] : value})
    }

//  commentClear
    const clearComment = ()=> {
        updateUserComment({
            comment : ''
        })
    }

//  send singleProduct
    const commentApi = () =>{
        axios.post(`http://localhost:5300/Basics-Comments/createNewComment`, userComment)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    // userPrefferedProduct
    const getAllProduct = () =>{
        // axios.get(`http://localhost:5300/Basics-Comments/allComment${productsId}`)
        // .then((res)=>{
        //     console.log(res);
        // })
        // .catch((err)=>{
        //     console.log(err);
        // })
    }

    const submit = ()=>{
        updateUserComment({
            userId : usersId
        });
        console.log(usersId);
        commentApi();
    }
    return (
        <>
            <Container>                
                <Col lg={12}>
                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                        <Form.Control as="textarea"
                        placeholder="Leave a comment here"
                        name='comment'
                        value={userComment.comment}
                        onChange={update}
                        style={{ height: '100px' }} />
                    </FloatingLabel>
                    <div
                     className='d-flex justify-content-end align-items-center '>
                        <Button variant='secondary' className='my-2 me-2 rounded-pill' onClick={clearComment}>Clear</Button>
                        <Button variant='secondary' className='my-2 ms-2 rounded-pill' onClick={submit}>Submit</Button>
                    </div>
                    <hr className='my-2'/>
                </Col>

                <Col lg={12} className='bg-secondary p-2'>
                    <p className='fw-bold'>UserName : </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel commodi et in! Maiores laboriosam illo vel dignissimos aspernatur animi rem impedit voluptates quas repellendus.</p>
                    <hr />
                </Col>
            </Container>
        </>
    )
}

export default Reviews