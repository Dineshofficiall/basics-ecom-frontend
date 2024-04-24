// eslint-disable-next-line no-unused-vars
import React,{useEffect, useState} from 'react'
import { Container, Col, Table, Button, Modal, Form, InputGroup} from 'react-bootstrap'
import axios from 'axios'
import { BsImage } from "react-icons/bs";
import { MdCategory, MdDescription, MdOutlinePriceCheck } from "react-icons/md";
import { BiLogoProductHunt } from "react-icons/bi";
import { SiShutterstock } from "react-icons/si";

function ProductsTable() {
    // list of userData
    const [apiObjData, updateApiObjData] = useState ([]);

    // module for update page
    const [show, setShow] = useState(false);

    // apiModuls
    const [lgShow, setLgShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const [arrString, updateArrString] = useState("")
    
    // updateUserInputs
    const [apiObj, updateApiObj] = useState ({
        productName : '',
        productDescription : '',
        stocksUnit : '',
        productPrice : '',
        categories : '',
        productImage : [''],        
    })

    // updateUserInputs
        const update = (inputRegisterUserValue) => {
        const { name, value } = inputRegisterUserValue.target;

        // If the input name is productImage, split the value by comma to create an array
        // Otherwise, directly set the value
        const newValue = name === 'productImage' ? value.split(',') : value;

        // Update the state accordingly
        updateApiObj({ ...apiObj, [name]: newValue });
        console.log(apiObj);
    };

    // load once before the page gets load
    useEffect(()=>{
        getAllData();
    },[])

    const addSingleProduct = () =>{
        if(confirm("Confirm to Add User")){
            axios.post('http://localhost:5300/Basics-Products/addProduct',apiObj)
            .then((Response) =>{
                console.log(Response.data);
                alert("Data Saved SuccessFully");
                setLgShow(false)
            })
            .catch((error)=>{
                console.log(error);
                console.log(apiObj);
            })
        }
        else{
            alert("Operation Cancelled By Admin");
        }
    }

    // allUsers[admin-users]
    const getAllData = () =>{
        axios.get('http://localhost:5300/Basics-Products/allProduct')
        .then((Response) =>{
            console.log(Response.data);
            updateApiObjData(Response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    // userUpdateByClick
    const apiUpdate = (id) =>{
        axios.put(`http://localhost:5300/Basics-Products/User-Update/${id}`,apiObj)
        .then((response) =>{
            console.log(response);
            setShow(false)
            confirm("SuccessFully Updated Please Refresh the Page");
        })
        .catch((error) => {
            console.log(id);
            console.log(error);
        });
    };

    // user deletByClick
    const apiDelete = (id) => {
        if (confirm("Are you sure want to delete")){
            axios.delete(`http://localhost:5300/Basics-Products/singleProduct/${id}`)
            .then((response) => {
                console.log('Delete request successful:', response);
                updateApiObj(response.data);
            })
            .catch((error) => {
                console.log(id);
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
                <h1 className='my-4'>Products</h1>
                <p>To add new user: <Button onClick={() => setLgShow(true)}>click</Button></p>
                <Col sm={12}>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr className='text-center'>
                                    <th>Id</th>
                                    <th>CATEGORIES</th>
                                    <th>DESCRIPTION</th>
                                    <th>IMAGE</th>
                                    <th>NAME</th>
                                    <th>PRODUCT_PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            {apiObjData.map((response, index)=>(
                                <tbody key={index}>
                                    <tr className='text-center '>
                                        <td>{response.id}</td>
                                        <td>{response.categories}</td>
                                        <td>{response.productDescription}</td>
                                        <td>{response.productImage}</td>
                                        <td>{response.productName}</td>
                                        <td>{response.productPrice}</td>
                                        <td>{response.stocksUnit}</td>
                                        <td className='d-flex justify-content-evenly align-items-center '>
                                            <Button onClick={handleShow} variant="outline-warning">Update</Button>{' '}
                                            <Button onClick={() => apiDelete(response.id)} variant="outline-danger">Delete</Button>{' '}
                                        </td>
                                    </tr>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header className='updateForm' closeButton>
                                            <Modal.Title className='fw-bolder text-decoration-underline '>Admin Update</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className='updateForm'>
                                            <p className='fw-bold text-end old-label'>[Old Categories : {response.categories}]</p>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='categories' value={apiObj.categories} onChange={update} placeholder="Enter your categories" />
                                            </InputGroup>
                                            <p className='fw-bold text-end old-label'>[Old ProductDescription : {response.productDescription}]</p>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdDescription /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productDescription' value={apiObj.productDescription} onChange={update} placeholder="Enter your productDescription" />
                                            </InputGroup>
                                            <p className='fw-bold text-end old-label'>[Old ProductImage : {response.productImage}]</p>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><BsImage /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productImage' value={apiObj.productImage} onChange={update} placeholder="Enter your productImage" />
                                            </InputGroup>
                                            <p className='fw-bold text-end old-label'>[Old ProductName : {response.productName}]</p>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><BiLogoProductHunt /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productName' value={apiObj.productName} onChange={update} placeholder="Enter your productName" />
                                            </InputGroup>
                                            <p className='fw-bold text-end old-label'>[Old ProductPrice : {response.productPrice}]</p>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><MdOutlinePriceCheck /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productPrice' value={apiObj.productPrice} onChange={update} placeholder="Enter your productPrice" />
                                            </InputGroup>
                                            <p className='fw-bold text-end old-label'>[Old StocksUnit : {response.stocksUnit}]</p>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><SiShutterstock /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='stocksUnit' value={apiObj.stocksUnit} onChange={update} placeholder="Enter your stocksUnit" />
                                            </InputGroup>
                                        </Modal.Body>
                                        <Modal.Footer className='updateForm'>
                                            <Button variant="outline-dark" onClick={handleClose}>Close</Button>
                                            <Button variant="outline-dark" onClick={() => apiUpdate(response.id)}>Save Changes</Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                                        <Modal.Header className='updateForm' closeButton>
                                            <Modal.Title id="example-modal-sizes-title-lg">AddProductData</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className='updateForm'>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='categories' value={apiObj.categories} onChange={update} placeholder="Enter your categories" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdDescription /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productDescription' value={apiObj.productDescription} onChange={update} placeholder="Enter your productDescription" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><BsImage /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productImage' value={apiObj.productImage} onChange={update} placeholder="Enter your productImage" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><BiLogoProductHunt /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productName' value={apiObj.productName} onChange={update} placeholder="Enter your productName" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><MdOutlinePriceCheck /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productPrice' value={apiObj.productPrice} onChange={update} placeholder="Enter your productPrice" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><SiShutterstock /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='stocksUnit' value={apiObj.stocksUnit} onChange={update} placeholder="Enter your stocksUnit" />
                                            </InputGroup>
                                        </Modal.Body>
                                        <Modal.Footer className='updateForm'>
                                            <Button variant="outline-dark" onClick={addSingleProduct}>Add New Product</Button>
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

export default ProductsTable