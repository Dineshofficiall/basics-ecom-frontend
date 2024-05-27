// eslint-disable-next-line no-unused-vars
import React,{useEffect, useState} from 'react'
import { Container, Col, Table, Button, Modal, Form, InputGroup} from 'react-bootstrap'
import axios from 'axios'
import { BsImage } from "react-icons/bs";
import { MdCategory, MdDescription, MdOutlinePriceCheck } from "react-icons/md";
import { BiLogoProductHunt } from "react-icons/bi";
import { SiShutterstock } from "react-icons/si";


// css
import '../productsTable/productTable.css'

function ProductsTable() {
    // list of userData
    const [apiObjData, updateApiObjData] = useState ([]);

    // module for update Model
    const [updateShow, setShow] = useState(false);

    // apiModuls
    const [lgShow, setLgShow] = useState(false);

    const handleUpdateClose = () => setShow(false);
    const [selectedProductId, setSelectProductId] = useState(null);

    const updateModel = (id) => {
        // const product = apiObjData.find(product => product.id === id);
        if(id !== null){
            setSelectProductId(id);
            console.log("Your Selected id ===> ",id);
            setShow(true);
        }
    }

    // const [arrString, updateArrString] = useState("")
    
    // updateUserInputs
    const [apiObj, updateApiObj] = useState ({
        productName : '',
        productDescription : '',
        productPrice : '',
        categories : '',
        productImage : [''],
        productColor : '',
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
        axios.put(`http://localhost:5300/Basics-Products/updateProduct/${id}`,apiObj)
        .then((response) =>{
            console.log(response.data);
            setShow(false)
            confirm("SuccessFully Updated Please Refresh the Page");
            getAllData();
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
                getAllData();
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
                <h1 className='my-4 text-center'>Products</h1>
                <p>To add new product: <Button onClick={() => setLgShow(true)}>click</Button></p>
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
                                    <th>TYPE</th>
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
                                        <td>{response.productType}</td>
                                        <td>{response.productGender}</td>
                                        <td>{response.productDiscount}</td>
                                        <td className='d-flex justify-content-evenly align-items-center ' style={{width : '200px', height : '185px'}}>
                                            <Button onClick={()=>updateModel(response.id)} variant="outline-warning">Update</Button>
                                            <Button onClick={() => apiDelete(response.id)} variant="outline-danger">Delete</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                            {/* updateModel */}
                                <Modal size="lg" show={updateShow} onHide={handleUpdateClose} aria-labelledby="example-modal-sizes-title-lg" >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-modal-sizes-title-lg">
                                            Admin Update
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {/* <p className='fw-bold text-end old-label'>[Old Categories : {response.categories}]</p> */}
                                        <InputGroup className="mb-3 rounded-pill">
                                            <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                                            <Form.Control type="text" className='border-0 py-2 inputbox' name='categories' value={apiObj.categories} onChange={update} placeholder="Enter the categories [ex : 'shirt','pant']" />
                                        </InputGroup>
                                        {/* <p className='fw-bold text-end old-label'>[Old Categories : {response.productColor}]</p> */}
                                        <InputGroup className="mb-3 rounded-pill">
                                            <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                                            <Form.Control type="text" className='border-0 py-2 inputbox' name='productColor' value={apiObj.productColor} onChange={update} placeholder="Enter the productColor [ex : 'red', 'black']" />
                                        </InputGroup>
                                        {/* <p className='fw-bold text-end old-label'>[Old Categories : {response.productDescription}]</p> */}
                                        <InputGroup className="mb-3 rounded-pill">
                                            <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdDescription /></InputGroup.Text>
                                            <Form.Control type="text" className='border-0 py-2 inputbox' name='productDescription' value={apiObj.productDescription} onChange={update} placeholder="Enter the productDescription [ex : 'abc']" />
                                        </InputGroup>
                                        {/* <p className='fw-bold text-end old-label'>[Old Categories : {response.productImage}]</p> */}
                                        <InputGroup className="mb-3 rounded-pill">
                                            <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><BsImage /></InputGroup.Text>
                                            <Form.Control type="text" className='border-0 py-2 inputbox' name='productImage' value={apiObj.productImage} onChange={update} placeholder="Enter your productImage [ex : {'https--','https--'}]" />
                                        </InputGroup>
                                        {/* <p className='fw-bold text-end old-label'>[Old Categories : {response.productName}]</p> */}
                                        <InputGroup className="mb-3 rounded-pill">
                                            <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><BiLogoProductHunt /></InputGroup.Text>
                                            <Form.Control type="text" className='border-0 py-2 inputbox' name='productName' value={apiObj.productName} onChange={update} placeholder="Enter your productName [ex : 'GAP' , 'Banarse']" />
                                        </InputGroup>
                                        {/* <p className='fw-bold text-end old-label'>[Old Categories : {response.productPrice}]</p> */}
                                        <InputGroup className="mb-3 rounded-pill">
                                            <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><MdOutlinePriceCheck /></InputGroup.Text>
                                            <Form.Control type="text" className='border-0 py-2 inputbox' name='productPrice' value={apiObj.productPrice} onChange={update} placeholder="Enter your productPrice [ex : 34.22]" />
                                        </InputGroup>
                                        {/* <p className='fw-bold text-end old-label'>[Old Categories : {response.productType}]</p> */}
                                        <InputGroup className="mb-3 rounded-pill">
                                            <InputGroup.Text className='border-0 bg-secondary inputbox-label'><MdCategory /></InputGroup.Text>
                                            <Form.Control type="text" className='border-0 py-2 inputbox' name='productType' value={apiObj.productType} onChange={update} placeholder="Enter the productType [ex : 'cotton']" />
                                        </InputGroup>
                                        {/* <p className='fw-bold text-end old-label'>[Old Categories : {response.productGender}]</p> */}
                                        <InputGroup className="mb-3 rounded-pill">
                                            <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><SiShutterstock /></InputGroup.Text>
                                            <Form.Control type="text" className='border-0 py-2 inputbox' name='productGender' value={apiObj.productGender} onChange={update} placeholder="Enter your productGender [ex : Type Male OR Female]" />
                                        </InputGroup>
                                        {/* <p className='fw-bold text-end old-label'>[Old Categories : {response.productDiscount}]</p> */}
                                        <InputGroup className="mb-3 rounded-pill">
                                            <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><SiShutterstock /></InputGroup.Text>
                                            <Form.Control type="number" className='border-0 py-2 inputbox' name='productDiscount' value={apiObj.productDiscount} onChange={update} placeholder="Enter your productDiscount[% only]" />
                                        </InputGroup>
                                    </Modal.Body>
                                    <Modal.Footer className='updateForm'>
                                        <Button variant="outline-dark" onClick={handleUpdateClose}>Close</Button>
                                        <Button variant="outline-dark" onClick={() => apiUpdate(selectedProductId)}>Save Changes</Button>
                                    </Modal.Footer>
                                </Modal>
                            {/* Ends */}

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
                                        <Form.Control type="text" className='border-0 py-2 inputbox' name='productType' value={apiObj.productType} onChange={update} placeholder="Enter the productType [ex : 'cotton']" />
                                    </InputGroup>
                                    <InputGroup className="mb-3 rounded-pill">
                                        <InputGroup.Text className='border-0 bg-secondary py-2 inputbox-label'><SiShutterstock /></InputGroup.Text>
                                        <Form.Control type="text" className='border-0 py-2 inputbox' name='productGender' value={apiObj.productGender} onChange={update} placeholder="Enter your productGender [ex : Type Male OR Female]" />
                                    </InputGroup>
                                </Modal.Body>
                                <Modal.Footer className='updateForm'>
                                    <Button variant="outline-dark" onClick={addSingleProduct}>Add New Product</Button>
                                </Modal.Footer>
                            </Modal>
                            {/* ends */}
                        </Table>
                    </div>
                </Col>
            </Container>
        </>
    )
}

export default ProductsTable