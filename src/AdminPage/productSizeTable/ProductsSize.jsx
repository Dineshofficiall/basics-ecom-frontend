// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Col, Container, Form, InputGroup, Modal, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

import './ProductSize.css'
import { MdCategory, MdDescription } from 'react-icons/md';
function ProductsSize() {
    // params
    const Params = useParams();

    const[productSize, setProductSize] = useState ([]);
    useEffect(() => {
        productSizeApi();
    }, []);

    const productSizeApi = async () =>{
        try {
            const productSizeResponse = await axios.get(`http://localhost:5300/Basics-Products-Size/getProductSize/${Params.id}`);
            setProductSize(productSizeResponse.data);
            console.log(productSizeResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const[userInput, setUserInput] = useState({
        productId : Params.id,
        size : '',
        quantity : 0
    })

    const[updateUserInput, setUpdateUserInput] = useState ({
        id : ,
        productId : Params.id,
        size : '',
        quantity : 0 
    })

//  create,update modal
    const update = (e) =>{
        const {name, value} = e.target;
        setUserInput({...userInput, [name] : value});
    }

    const saveSize = () =>{
        if (userInput.size !== '' && userInput.quantity !== 0){
            axios.post("http://localhost:5300/Basics-Products-Size/create",userInput)
            .then((res)=>{
                console.log(res.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    const updateProductSize = () =>{
        axios.put('http://localhost:5300/Basics-Products-Size/update',userInput)
        .then((res)=>{
            console.log(res.data);
            handleUpdateClose();
            productSizeApi();
        })
        .catch((error)=>{
            console.log(error.message);
            handleUpdateClose();
        })
    }

    const deleteProductSize = (pId) =>{
        if (pId){
            axios.delete(`http://localhost:5300/Basics-Products-Size/delete/${pId}`)
            .then((res)=>{
                console.log(res.data);
                productSizeApi();
            })
            .catch ((error)=>{
                console.log(error.message);
            })
        }
    }

//  create productsize modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//  update productsize modal
    const [updateShow, setUpdateShow] = useState(false);

    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);
    return (
        <>
            <Container>
                <h1 className='my-4 text-center fw-medium'>Products Quantity</h1>
                <p>To add New Size: <Button onClick={() => handleShow(true)}>click</Button></p>
                <Col sm={12}>
                    <div>
                        <Table striped bordered style={{backgroundColor : '#f2f2f2'}}>
                            <thead>
                                <tr className='text-center'>
                                    <th>Id</th>
                                    <th>PRODUCT_ID</th>
                                    <th>SIZE</th>
                                    <th>QUANTITY</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            {productSize.map((response, index)=>(
                                <tbody key={index}>
                                    <tr className='text-center' >
                                        <td>{response.id}</td>
                                        <td>{response.productId}</td>
                                        <td>{response.size}</td>
                                        <td>{response.quantity}</td>
                                        <td className='d-flex justify-content-evenly align-items-center ' style={{width : '100%'}}>
                                            <Button variant="outline-warning" onClick={handleUpdateShow}>Update</Button>
                                            <Button variant="outline-danger" onClick={()=>deleteProductSize(response.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </div>
                </Col>

                {/* create size Modals */}
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Size</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3 rounded-pill">
                            <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                            <Form.Control type="text" className='border-0 py-2 inputbox' name='size' value={userInput.size} onChange={update} placeholder="Enter the ProductSize [ex : 's', 'xl']" />
                        </InputGroup>
                        <InputGroup className="mb-3 rounded-pill">
                            <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdDescription /></InputGroup.Text>
                            <Form.Control type="number" className='border-0 py-2 inputbox' name='quantity' value={userInput.quantity} onChange={update} placeholder="Enter the ProductQuantity [ex : 35]" />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-success" onClick={saveSize}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* ends */}

                {/* update size Modals */}
                <Modal show={updateShow} onHide={handleUpdateClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>update Size</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3 rounded-pill">
                            <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                            <Form.Control type="text" className='border-0 py-2 inputbox' name='size' value={userInput.size} onChange={update} placeholder="Enter the ProductSize [ex : 's', 'xl']" />
                        </InputGroup>
                        <InputGroup className="mb-3 rounded-pill">
                            <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdDescription /></InputGroup.Text>
                            <Form.Control type="number" className='border-0 py-2 inputbox' name='quantity' value={userInput.quantity} onChange={update} placeholder="Enter the ProductQuantity [ex : 35]" />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={handleUpdateClose}>
                            Close
                        </Button>
                        <Button variant="outline-success" onClick={updateProductSize}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* ends */}
            </Container>
        </>
    )
}

export default ProductsSize