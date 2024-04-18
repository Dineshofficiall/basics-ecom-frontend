// eslint-disable-next-line no-unused-vars
import React,{useEffect, useState} from 'react'
import { Container, Col, Table, Button, Modal, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import { BiUser, BiLogoGmail } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlinePhone } from "react-icons/ai";

import '../usersTable/userTable.css'
function UsersTable() {
    // list of userData
    const [apiObjData, updateApiObjData] = useState ([]);

    // module for update page
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // updateUserInputs
    const [apiObj, updateApiObj] = useState ({
        userName : '',
        mail : '',
        password : '',
        phoneNumber : ''
    })
    // assign through obj's
    const update = (inputRegisterUserValue)=>{
        const {name, value} = inputRegisterUserValue.target;
        updateApiObj({...apiObj, [name] : value});
        console.log(apiObj);
    }

    // load once before the page gets load
    useEffect(()=>{
        getAllData();
    },[])

    // allUsers
    const  getAllData = () =>{
        axios.get('http://localhost:5300/Basics-Users/All-Users')
        .then((Response) =>{
            console.log(Response.data);
            updateApiObjData(Response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    // userUpdateByClick
    const apiUpdate = (userId) =>{
        axios.put(`http://localhost:5300/Basics-Users/User-Update/${userId}`,apiObj)
        .then((response) =>{
            console.log(response);
            setShow(false)
            confirm("SuccessFully Updated Please Refresh the Page");
        })
        .catch((error) => {
            console.log(error);
        });
    };

    // user deletByClick
    const apiDelete = (userId) => {
        if (confirm("Are you sure want to delete")){
            axios.delete(`http://localhost:5300/Basics-Users/delete-User/${userId}`)
            .then((response) => {
                console.log('Delete request successful:', response);
                updateApiObj(response.data);
            })
            .catch((error) => {
                console.log(userId);
                console.error('Error deleting user:', error);
            });
        }
        else {
            alert("Process Cancelled by user");
        }
    }
    return (
        <>
            <Container>
                <h1 className='my-4'>User</h1>
                <Col sm={12}>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr className='text-center'>
                                    <th>Id</th>
                                    <th>User Name</th>
                                    <th>Password</th>
                                    <th>Mail</th>
                                    <th>PhoneNumber</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {apiObjData.map((response, index)=>(
                                <tbody key={index}>
                                    <tr className='text-center '>
                                        <td>{response.userId}</td>
                                        <td>{response.userName}</td>
                                        <td>{response.password}</td>
                                        <td>{response.mail}</td>
                                        <td>{response.phoneNumber}</td>
                                        <td className='d-flex justify-content-evenly align-items-center'>
                                            <Button onClick={handleShow} className='mx-2' variant="outline-warning">Update</Button>{' '}
                                            <Button onClick={() => apiDelete(response.userId)} className='mx-2' variant="outline-danger">Delete</Button>{' '}
                                        </td>
                                    </tr>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header className='updateForm' closeButton>
                                            <Modal.Title className='fw-bolder text-decoration-underline '>Admin Update</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className='updateForm'>
                                            <p className='fw-bold text-end old-label'>[Old Name : {response.userName}]</p>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><BiUser /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0  inputbox' name='userName' value={apiObj.userName} onChange={update} placeholder="Enter your UpdateName" />
                                            </InputGroup>
                                            <p className='fw-bold text-end old-label'>[Old E-Mail : {response.mail}]</p>
                                            <InputGroup className="mb-3 rounded-pill inputbox">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><BiLogoGmail /></InputGroup.Text>
                                                <Form.Control type="email" className='border-0 inputbox' name='mail' value={apiObj.mail} onChange={update} placeholder="Enter your UpdateEmail" />
                                            </InputGroup>
                                            <p className='fw-bold text-end old-label'>[Old Name : {response.phoneNumber}]</p>
                                            <InputGroup className="mb-3 rounded-pill inputbox">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><AiOutlinePhone /></InputGroup.Text>
                                                <Form.Control type="number" name='phoneNumber' className='border-0 inputbox' value={apiObj.phoneNumber} onChange={update} placeholder="Enter the Updated PhoneNumber" />
                                            </InputGroup>
                                            <p className='fw-bold text-end old-label'>[Old Name : {response.password}]</p>
                                            <InputGroup className="mb-3 rounded-pill  inputbox">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><RiLockPasswordFill /></InputGroup.Text>
                                                <Form.Control type="password" name='password' className='border-0 inputbox' value={apiObj.password} onChange={update} placeholder="Enter The Update Password" />
                                            </InputGroup>
                                        </Modal.Body>
                                        <Modal.Footer className='updateForm'>
                                            <Button variant="outline-dark" onClick={handleClose}>Close</Button>
                                            <Button variant="outline-dark" onClick={() => apiUpdate(response.userId)}>Save Changes</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </tbody>
                            ))}
                        </Table>
                    </div>
                </Col>
            </Container>
        </>
    )
}

export default UsersTable
