// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Col, Container, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDataContext } from '../useContext/DataContext';
import { useNavigate } from 'react-router-dom';
function Reviews() {

    // useNavigate
    const navigate = useNavigate();

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
        userId : null,
        productId : productsId
    });


//  onChange comment
    const [lengthError, updateLengthError] = useState('Comments');
    const update = (inputResult) =>{
        const{name, value} = inputResult.target;
        updateUserComment({...userComment, [name] : value})

        if (userComment.comment.length <= 4){
            updateLengthError("character aleast 4 or above");
        }
        else {
            updateLengthError("LooksGood");
        }
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
    
    // modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ends

    
    const submit = ()=>{
        updateUserComment({
            userId : usersId
        });
        console.log(usersId);
        
        commentApi();
    }

    // navigate
    const redirect = ()=>{
        navigate('/');
    }
    return (
        <>
            <Container>                
                <Col lg={12}>
                    <FloatingLabel controlId="floatingTextarea2" 
                        label={
                                lengthError === 'LooksGood' ? 
                                <Form.Text className="text-success ">{lengthError}</Form.Text>
                            :
                                lengthError !== 'Comments' ? 
                                <Form.Text className="text-danger">{lengthError}</Form.Text> 
                            :
                                'Comments'
                            }>
                        
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
                        {dataContext.userObject !== null ? 
                            <Button variant='secondary' className='my-2 ms-2 rounded-pill' onClick={submit}>Submit</Button>
                        :
                        <Button variant="primary" onClick={handleShow}>
                            Submit
                        </Button>
                        }
                    </div>
                    <hr className='my-2'/>
                </Col>

                {/* modal */}
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Login Failed!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Oops you are not login</h5>
                        <h6>Please Login!!</h6>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={redirect}>Login</Button>
                    </Modal.Footer>
                </Modal>

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