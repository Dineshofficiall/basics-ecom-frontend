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
        stocksUnit : [''],
        productPrice : '',
        categories : '',
        productImage : [''],
        productColor : '',
        productSize : [''],
        productType : '',
        productGender : '',
        productDiscount : ''
    })

    // create product
    const update = (inputRegisterUserValue) => {
        const { name, value } = inputRegisterUserValue.target;
    
        // Use updater function form of setState to ensure you're working with the most up-to-date state
        updateApiObj(prevState => ({
            ...prevState,
            [name]: name === 'productImage' || 
                    name === 'productSize' || 
                    name === 'stocksUnit' ? value.split(',') : value
        }));
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
                                    <th>COLOR</th>
                                    <th>DESCRIPTION</th>
                                    <th>IMAGE</th>
                                    <th>NAME</th>
                                    <th>PRODUCT_PRICE</th>
                                    <th>SIZE</th>
                                    <th>TYPE</th>
                                    <th>QUANTITY</th>
                                    <th>GENDER</th>
                                    <th>DISCOUNT</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            {apiObjData.map((response, index)=>(
                                <tbody key={index}>
                                    <tr className='text-center '>
                                        <td>{response.id}</td>
                                        <td>{response.categories}</td>
                                        <td>{response.productColor}</td>
                                        <td>{response.productDescription}</td>
                                        <td>{response.productImage}</td>
                                        <td>{response.productName}</td>
                                        <td>{response.productPrice}</td>
                                        <td>{response.productSize}</td>
                                        <td>{response.productType}</td>
                                        <td>{response.stocksUnit}</td>
                                        <td>{response.productGender}</td>
                                        <td>{response.productDiscount}</td>
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

                                    {/* createApi */}
                                    <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                                        <Modal.Header className='updateForm' closeButton>
                                            <Modal.Title id="example-modal-sizes-title-lg">AddProductData</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className='updateForm'>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='categories' value={apiObj.categories} onChange={update} placeholder="Enter the categories [ex : 'shirt','pant']" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productColor' value={apiObj.productColor} onChange={update} placeholder="Enter the productColor [ex : 'red', 'black']" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdDescription /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productDescription' value={apiObj.productDescription} onChange={update} placeholder="Enter the productDescription [ex : 'abc']" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><BsImage /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productImage' value={apiObj.productImage} onChange={update} placeholder="Enter your productImage [ex : {'https--','https--'}]" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><BiLogoProductHunt /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productName' value={apiObj.productName} onChange={update} placeholder="Enter your productName [ex : 'GAP' , 'Banarse']" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><MdOutlinePriceCheck /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productPrice' value={apiObj.productPrice} onChange={update} placeholder="Enter your productPrice [ex : 34.22]" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productSize' value={apiObj.productSize} onChange={update} placeholder="Enter the productSize [ex : {'sm', 'lg'}]" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productType' value={apiObj.productType} onChange={update} placeholder="Enter the productType [ex : 'cotton']" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><SiShutterstock /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='productGender' value={apiObj.productGender} onChange={update} placeholder="Enter your productGender [ex : Type Male OR Female]" />
                                            </InputGroup>
                                            <InputGroup className="mb-3 rounded-pill">
                                                <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><SiShutterstock /></InputGroup.Text>
                                                <Form.Control type="text" className='border-0 py-2 inputbox' name='stocksUnit' value={apiObj.stocksUnit} onChange={update} placeholder="Enter your stocksUnit [ex : {02,32,05}]" />
                                            </InputGroup>
                                        </Modal.Body>
                                        <Modal.Footer className='updateForm'>
                                            <Button variant="outline-dark" onClick={addSingleProduct}>Add New Product</Button>
                                        </Modal.Footer>
                                    </Modal>
                                    {/* ends */}
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