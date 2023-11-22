import React from "react";
import { Link } from 'react-router-dom';
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


const Login = () => {


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
                                <Form.Control className="simpin-form-email" type="email" placeholder="Masukkan email mu" autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="simpin-form-password" type="text" placeholder="Masukkan password mu" autoComplete="off" />
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
                                <Button>
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