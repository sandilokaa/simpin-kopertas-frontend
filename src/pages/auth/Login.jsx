import React, { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Container,
    Image,
    Form,
    Button
} from "react-bootstrap";
import LoginImage from "../../assets/images/bg-login.png";
import "../../assets/css/style.css";
import axios from "axios";
import { useSnackbar } from 'notistack';


const Login = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* -------------------- Login Function -------------------- */

    const emailField = useRef();
    const passwordField = useRef();

    const onLogin = async (e) => {

        e.preventDefault();

        try {
            
            const userToLoginPayload = {
                email: emailField.current.value,
                password: passwordField.current.value,
            };


            const userLoginRequest = await axios.post(
                `http://localhost:8080/api/v1/auth/login`,
                userToLoginPayload
            );

            const userLoginResponse = userLoginRequest.data;

            enqueueSnackbar(userLoginResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (userLoginResponse.status) {

                localStorage.setItem("token", userLoginResponse.data.token);

                navigate("/");

            }
        } catch (err) {
            
            enqueueSnackbar('Email atau password anda salah ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });
        
        }
    
    };

    /* -------------------- End Login Function -------------------- */

    return (

        <div>
            <Container>
                <Row className="simpin-row-login">
                    <Col className="col-12 col-lg-6 simpin-col-login">
                        <h2>Login <Image src="https://img.icons8.com/external-flat-juicy-fish/60/null/external-peace-hands-and-gestures-flat-flat-juicy-fish.png" /></h2>
                        <p>Login untuk informasi lebih lanjut</p>
                        <Form className="simpin-form-login">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="simpin-form-email" type="email" ref={emailField} placeholder="Masukkan email mu" autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="simpin-form-password" type="text" ref={passwordField} placeholder="Masukkan password mu" autoComplete="off" />
                            </Form.Group>
                        </Form>
                        <Row>
                            <Col className="col-6 col-lg-6 simpin-content-link-register">
                                <Link className="simpin-content-hyperlink" to="/register">
                                    <p>Belum Punya Akun?</p>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12 col-lg-12 simpin-content-loggedin d-flex justify-content-start">
                                <Button onClick={onLogin}>
                                    <p>Login</p>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-12 col-lg-6 simpin-login-image">
                        <Image src={LoginImage} />
                    </Col>
                </Row>
            </Container>
        </div>

    );
};

export default Login;