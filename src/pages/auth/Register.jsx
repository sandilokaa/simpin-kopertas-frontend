import React, { useState, useRef } from "react";
import {
    Row,
    Col,
    Container,
    Image,
    Form,
    Button
} from "react-bootstrap";
import RegisterImage from "../../assets/images/bg-login.png";
import "../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack';

const Register = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* -------------------- Handle Selected Date -------------------- */

    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {

        const selectedDateValue = e.target.value;

        setSelectedDate(selectedDateValue);

    };

    /* -------------------- End Handle Selected Date -------------------- */


    /* -------------------- Register Function -------------------- */

    const nameField = useRef();
    const phoneNumberField = useRef();
    const memberNumberField = useRef();
    const emailField = useRef();
    const passwordField = useRef();
    const confirmPasswordField = useRef();

    const onRegister = async (e) => {

        if (passwordField.current.value === confirmPasswordField.current.value) {

            try {

                const userToRegisterPayload = {
                    name: nameField.current.value,
                    phoneNumber: phoneNumberField.current.value,
                    memberNumber: memberNumberField.current.value,
                    email: emailField.current.value,
                    password: passwordField.current.value,
                    registrationDate: selectedDate

                };

                const userToRegisterRequest = await axios.post(
                    `http://localhost:8080/api/v1/auth/register`,
                    userToRegisterPayload,
                );

                const userToRegisterResponse = userToRegisterRequest.data;

                enqueueSnackbar(userToRegisterResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

                if (userToRegisterResponse.status) navigate('/login');

            } catch (err) {
                enqueueSnackbar(err.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });
            }

        } else {
            enqueueSnackbar('Please check the registration form again ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });
        }

    };

    /* -------------------- End Register Function -------------------- */

    return (

        <div>
            <Container>
                <Row className="simpin-row-register">
                    <Col className="col-12 col-lg-6 simpin-col-register">
                        <h2>Register <Image src="https://img.icons8.com/external-flat-juicy-fish/60/null/external-peace-hands-and-gestures-flat-flat-juicy-fish.png" /></h2>
                        <p>Daftar akunmu sekarang</p>
                        <Form className="simpin-form-register">
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control className="simpin-form-name" type="text" ref={nameField}  placeholder="Masukkan nama" autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Member Number</Form.Label>
                                <Form.Control className="simpin-form-member-number" type="text" ref={memberNumberField}  placeholder="Masukkan nomor anggota" autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control className="simpin-form-phone-number" type="text" ref={phoneNumberField} placeholder="Masukkan nomor telepon" autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Registration Date</Form.Label>
                                <Form.Control className="simpin-form-registration-date" type="date" value={selectedDate} onChange={handleDateChange} placeholder="Masukkan tanggal daftar akun ini" autoComplete="off"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="simpin-form-email" type="email" ref={emailField} placeholder="Masukkan email" autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Row>
                                    <Col className="col-12 col-lg-6 mt-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control className="simpin-form-password" type="text" ref={passwordField} placeholder="Masukkan password" autoComplete="off"/>
                                    </Col>
                                    <Col className="col-12 col-lg-6 mt-3">
                                        <Form.Label>Konfirmasi Password</Form.Label>
                                        <Form.Control className="simpin-form-confirm-password" type="text" ref={confirmPasswordField} placeholder="Masukkan password" autoComplete="off"/>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                        <Row>
                            <Col className="col-12 col-lg-12 simpin-content-loggedin d-flex justify-content-center">
                                <Button onClick={onRegister}>
                                    <p>Continue</p>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-12 col-lg-6 simpin-col-register-image">
                        <Image src={RegisterImage} />
                    </Col>
                </Row>
            </Container>
        </div>

    );
};

export default Register;