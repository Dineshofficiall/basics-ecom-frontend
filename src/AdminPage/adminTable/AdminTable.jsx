// eslint-disable-next-line no-unused-vars
import React,{useEffect, useState, useRef} from 'react'
import { Container, Col, Table, Button, Modal, Form, InputGroup} from 'react-bootstrap'
import axios from 'axios'
import { BiUser, BiLogoGmail } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlinePhone } from "react-icons/ai";

import '../adminTable/adminTable.css'
function AdminTable() {
    // list of userData
    const [apiObjData, updateApiObjData] = useState ([]);

    // module for update page
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // apiRoleName
    const [smShow, setSmShow] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const target = useRef(null);
    
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

    // allAdmin
    const  getAllData = () =>{
        axios.get('http://localhost:5300/Basics-Admins/getAllAdmin')
        .then((Response) =>{
            console.log(Response.data);
            updateApiObjData(Response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    // adminUpdateByClick
    const apiUpdate = (adminId) =>{
        axios.put(`http://localhost:5300/Basics-Admins/UpdateAdmin/${adminId}`,apiObj)
        .then((response) =>{
            console.log(response);
            setShow(false)
            confirm("SuccessFully Updated Please Refresh the Page");
        })
        .catch((error) => {
            console.log(error);
        });
    };

    // admin deletByClick
    const apiDelete = (adminId) => {
        if (confirm("Are you sure want to delete")){
            axios.delete(`http://localhost:5300/Basics-Admins/deleteAdmin/${adminId}`)
            .then((response) => {
                console.log('Delete request successful:', response);
                updateApiObj(response.data);
            })
            .catch((error) => {
                console.log(adminId);
                console.error('Error deleting admin:', error);
            });
        }
        else {
            alert("Process Cancelled by admin");
        }
    }

    const buttonRefs = useRef([]);
    const [fetchRole, updateFetchRole] = useState ([]);
    const roleFetchApi = (fetchId)=>{
        axios.get(`http://localhost:5300/Basics-Admins/User-Role-Fetch/${fetchId}`)
        .then((res)=>{
            updateFetchRole(res.data)
            setSmShow(true)
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <>  
            <Container>
                <h1 className='my-4'>Admin</h1>
                <Col sm={12}>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr className='text-center'>
                                    <th>Id</th>
                                    <th>Admin Name</th>
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
                                        <td className='d-flex justify-content-evenly align-items-center '> 
                                                                {/* setRoleShow(!roleShow) */}
                                            <Button onClick={() => roleFetchApi(response.userId)} className="me-2">click</Button>
                                            <Button onClick={handleShow} variant="outline-warning">Update</Button>{' '}
                                            <Button onClick={() => apiDelete(response.userId)} variant="outline-danger">Delete</Button>{' '}
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

                                    {/*  */}
                                    {fetchRole.map((roleResponse, roleIndex)=>(
                                        <Modal key={roleIndex} size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                                            <Modal.Header closeButton>
                                            <Modal.Title id="example-modal-sizes-title-sm">Click</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body></Modal.Body>
                                        </Modal>
                                    ))}
                                </tbody>
                            ))}
                        </Table>
                    </div>
                </Col>
            </Container>
        </>
    )
}

export default AdminTable