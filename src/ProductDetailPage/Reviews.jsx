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
    
    let usersId = dataContext.userObject.id;
    const productsId = dataContext.productId


    // userComments
    const [comments, updateComments] = useState(null);
    // useEffect
    useEffect(()=>{

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5300/Basics-Comments/allComment/${productsId}`);
                updateComments(response.data); // Update comments with fetched data
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
    
        if (productsId !== null) {
            fetchComments(); // Only fetch comments if productsId is not null
        }
    }, [productsId])

//  commentVariable
    const [userComment, updateUserComment] = useState({
        comment : '',
        userId : usersId,
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

    
    // modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ends

    
    const submit = ()=>{        
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

                {/* <Col lg={12} className='bg-secondary p-2'>
                    <p className='fw-bold'>User Comments:</p>
                    {comments && comments.map((comment, index) => (
                        <p key={index}>{comment}</p>
                    ))}
                    <hr />
                </Col> */}

                <Col lg={12} className=' p-2'>
                    <p className='fw-bold'>User Comments:</p>
                    {comments && comments.map(comment => (
                        <div key={comment.id}>
                            <p>User ID: {comment.userId}</p>
                            <p>Comment: {comment.comment}</p>
                            {/* Add additional fields as needed */}
                            <hr />
                        </div>
                    ))}
                </Col>
            </Container>
        </>
    )
}

export default Reviews