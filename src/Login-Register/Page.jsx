// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'

// css
import './PageStyle.css'

import { Link } from 'react-router-dom';
import {Container, Row, Col, InputGroup, Form, Button, Alert} from 'react-bootstrap/'
import { BsInstagram, BsMeta } from "react-icons/bs";
import { BiUser, BiLogoLinkedin, BiLogoGooglePlus, BiLogoGmail } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlinePhone } from "react-icons/ai";

// Link Imports
import {useNavigate} from 'react-router-dom'

import axios from 'axios'
import { useDataContext } from '../useContext/DataContext';
function Page() {
    // useContext
      const DataContext = useDataContext();

    // message
    const [message, updateMessage] = useState('');

    // Login If UserResponse === true From Backend it Would Excute
    // Navigate to Home Page With User Data
    const navigate = useNavigate();

    
    // Login || Register Block Would Excute Here
    const[page, updatePage] = useState(true);
    const pageRedirect = ()=>{
        updatePage(!page)
    }

    // Login Block
    const[loginUserObj, updateLoginUserObj] = useState({
        mail : '',
        password : '',
    })
    const loginForm = (inputLoginUserValue)=>{
        const {name, value} = inputLoginUserValue.target;
        updateLoginUserObj({...loginUserObj,[name] : value});
        console.log(loginUserObj);
    }

    // alert success
    const [loginResponse, UpdateLoginResponse] = useState(false);

    const submitUserLogin = ()=>{
        if (loginUserObj.mail && loginUserObj.passWord !== ''){
            axios.post('http://localhost:5300/Basics-Users/User',loginUserObj)
            .then((Response)=>{
                
                if (Response.data === "Invalid"){
                    UpdateLoginResponse(true)
                    updateMessage("Please Fill the Inputs")
                }
                else{
                    console.log("page Check",Response.data);
                    if (Response.data[0] === null){
                        alert(Response.data[1]);
                    }
                    else {
                        if(Response.data[0].mail === "dk426327@gmail.com"){
                            navigate('/basics-admin-panel')
                        }
                        else {
                            const res = Response.data[0];
                            console.log("checking res ==> ", res);
                            DataContext.login(res);
                            navigate("/Home");
                        }
                    }
                }
            })
            .catch((error)=>{
                if (error.data === "Invalid"){
                    alert("Bad Credentials");
                }
            })
        }else {
            alert("Please Fill All the Inputs")
        }
    }
    // const objectSuccess = ()=>{
        
    // }

    // Register Blocks
    // eslint-disable-next-line no-unused-vars
    const[roleId, UpdateRoleId] = useState (1);

    const[registerUserObj, updateRegisterUserObj] = useState({
        userName : '',
        mail : '',
        password : '',
        phoneNumber : '',
        
    })
    const registerForm = (inputRegisterUserValue)=>{
        const {name, value} = inputRegisterUserValue.target;
        updateRegisterUserObj({...registerUserObj, [name] : value});
        console.log(registerUserObj);
    }
    const submitUserRegister = ()=>{
        
        axios.post(`http://localhost:5300/Basics-Users/CreateUser/${roleId}`,registerUserObj)
        .then((registerRespose)=>{
            if (registerRespose !== null){
                alert(registerRespose.data);
            }
            else if (registerRespose === "Invalid"){
                alert("Bad Credentials");
            }
            else {
                alert("Invalid");
            }
        })
        .catch((error)=>{
            alert(error.data);
        })
    }
    return (
        <div className="page-container" data-aos="fade-down">
            {page ? (<>
                <Container className='alerts'>
                    <Alert show={loginResponse} variant="danger" onClose={() => UpdateLoginResponse(false)} dismissible>
                        <Alert.Heading>Bad Credential</Alert.Heading>
                        <p className='fw-bolder '>
                            {message}
                        </p>
                    </Alert>
                </Container>


                {/* content */}
                <Container className='d-flex justify-content-center align-items-center'>
                    <Row className='bg-warning d-flex align-items-center loging-row'>
                        <Col md={5} className='d-flex flex-column  justify-content-center align-items-center text-center p-3 switch-pg-section '>
                            <h1 className='my-2'>Hello friend</h1>
                            <p className='my-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure veniam rem atque, soluta dolorem tempore aliquid distinctio. Quo aut voluptates illum animi error.</p>
                            <Button variant="secondary " onClick={pageRedirect}>Switch Page</Button>{' '}
                            <Link className='mt-3 text-decoration-none' to='/Home'>Skip Login</Link>
                        </Col>
                        <Col md={7} className=' p-md-4'>
                            <Col>
                                <h4 className='my-5 my-md-4  text-center'>Login into Jovialuke</h4>
                                <div className='d-flex justify-content-evenly align-items-center my-4 '>
                                    <Link className='mt-3 text-decoration-none' to='/Home'><BsInstagram /></Link>
                                    <Link className='mt-3 text-decoration-none' to='/Home'><BsMeta /></Link>
                                    <Link className='mt-3 text-decoration-none' to='/Home'><BiLogoLinkedin /></Link>
                                    <Link className='mt-3 text-decoration-none' to='/Home'><BiLogoGooglePlus /></Link>
                                </div>
                                <p className=' mb-4 text-center'>or login using email</p>
                            </Col>
                            <Col className='d-flex flex-column justify-content-center align-items-center '>
                                <InputGroup className="mb-3 inputbox">
                                    <InputGroup.Text className='border-0 input-logo'><BiUser /></InputGroup.Text>
                                    <Form.Control type="mail" name='mail' className='border-0' placeholder="Enter your username" value={loginUserObj.mail} onChange={loginForm}/>
                                </InputGroup>
                                <InputGroup className="mb-3 rounded-pill inputbox">
                                    <InputGroup.Text className='border-0 input-logo'><RiLockPasswordFill /></InputGroup.Text>
                                    <Form.Control type="password" name='password' className='border-0' placeholder="Password" value={loginUserObj.password} onChange={loginForm}/>
                                </InputGroup>
                            </Col>
                            <Col md={12} className='d-flex flex-column justify-content-center align-items-center my-2'>
                                <Form.Group>
                                    <Form.Check required label="Agree to terms and conditions" className='radioLabel'/>
                                </Form.Group>
                                <a className='text-decoration-none' href="#">Forgot Password</a>
                            </Col>
                            <Col className='text-center my-3 '>
                                <Button variant="secondary w-50 rounded-pill" onClick={submitUserLogin}>Submit</Button>{' '}
                            </Col>

                            {/* smaller device */}
                            <Col className='d-none  align-items-center mt-4 mb-5 small-device-btn'>
                                <p>Switch to Login Page : </p>
                                <Button className='ms-3' variant="secondary " onClick={pageRedirect}>Click Here</Button>{' '}
                                <Link className='mt-3 text-decoration-none' to='/Home'>Skip Login</Link>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </>) : (<>
                <Container className='d-flex justify-content-center align-items-center '>
                    <Row className='bg-warning d-flex align-items-center loging-row'>
                        <Col md={7} className=' p-md-4'>
                        <Col  className='mb-3'>
                                <h4 className='my-4 my-md-4 text-center'>Register into Jovialuke</h4>
                                <div className='d-flex mb-4 justify-content-evenly align-items-center'>
                                    <span className='links'><BsInstagram /></span>
                                    <span className='links'><BsMeta /></span>
                                    <span className='links'><BiLogoLinkedin /></span>
                                    <span className='links'><BiLogoGooglePlus /></span>
                                </div>
                            </Col>
                            <Col className='d-flex flex-column justify-content-center align-items-center '>
                                <InputGroup className="mb-3 rounded-pill inputbox">
                                    <InputGroup.Text className='border-0 input-logo'><BiUser /></InputGroup.Text>
                                    <Form.Control type="text" className='border-0' name='userName' value={registerUserObj.userName} onChange={registerForm} placeholder="Enter your name" />
                                </InputGroup>
                                <InputGroup className="mb-3 rounded-pill inputbox">
                                    <InputGroup.Text className='border-0 input-logo'><BiLogoGmail /></InputGroup.Text>
                                    <Form.Control type="email" className='border-0' name='mail' value={registerUserObj.mail} onChange={registerForm} placeholder="Enter your email" />
                                </InputGroup>
                                <InputGroup className="mb-3 rounded-pill inputbox">
                                    <InputGroup.Text className='border-0 input-logo'><AiOutlinePhone /></InputGroup.Text>
                                    <Form.Control type="number" name='phoneNumber' className='border-0' value={registerUserObj.phoneNumber} onChange={registerForm} placeholder="PhoneNumber" />
                                </InputGroup>
                                <InputGroup className="mb-3 rounded-pill inputbox">
                                    <InputGroup.Text className='border-0 input-logo'><RiLockPasswordFill /></InputGroup.Text>
                                    <Form.Control type="password" name='password' className='border-0' value={registerUserObj.password} onChange={registerForm} placeholder="Password" />
                                </InputGroup>
                            </Col>
                            <Col className='text-center my-3 '>
                                <Button variant="secondary w-50 rounded-pill" onClick={submitUserRegister}>Submit</Button>{' '}
                            </Col>

                            {/* smaller device */}
                            <Col className='d-none align-items-center mt-4 mb-5 small-device-btn'>
                                <p>Switch to Register Page : </p>
                                <Button className='ms-3' variant="secondary " onClick={pageRedirect}>Click Here</Button>{' '}
                                <Link className='mt-3 text-decoration-none' to='/Home'>Skip Login</Link>
                            </Col>
                        </Col>
                        <Col md={5} className='d-flex flex-column  justify-content-center align-items-center text-center pe-5 switch-pg-section'>
                            <h1 className='my-2'>Hello friend</h1>
                            <p className='my-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure veniam rem atque, soluta dolorem tempore aliquid distinctio. Quo aut voluptates illum animi error.</p>
                            
                            <Button variant="secondary " onClick={pageRedirect}>Switch Page</Button>{' '}
                            <Link className='mt-3 text-decoration-none' to='/Home'>Skip Login</Link>
                        </Col>
                    </Row>
                </Container>
            </>)}
        </div>
    )
}

export default Page