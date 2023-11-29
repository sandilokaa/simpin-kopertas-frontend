import React, { useState, useEffect, useRef } from "react";
import {
    Container,
    Table,
    Button,
    Form,
    Row,
    Col,
    Modal
} from "react-bootstrap";
import HomeLayout from "../../layouts/home/HomeLayout";
import "../../assets/css/style.css";
import CurrencyFormatter from "../../assets/js/currencyFormatter";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

const Loan = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* -------------------- Current User -------------------- */

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {

        const validateLogin = async () => {

            try {

                const token = localStorage.getItem("token");

                const currentUserRequest = await axios.get(
                    `http://localhost:8080/api/v1/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentUserResponse = currentUserRequest.data;

                if (currentUserResponse.status) {

                    setUser(currentUserResponse.data.currentUser);

                }

            } catch (err) {

                setIsLoggedIn(false);

            }

        };

        validateLogin();

        setIsRefresh(false);

    }, [isRefresh]);

    /* -------------------- End Current User -------------------- */


    return isLoggedIn ? (

        <HomeLayout>
            <Container>

                <Row>
                    <Col className="col-12 col-lg-6 d-flex justify-content-start">
                        <Button className="btn btn-add-principal-saving"> Tambah Pinjaman </Button>
                    </Col>
                </Row>

                <Table striped bordered hover className="simpin-principal-saving-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Nomor Anggota</th>
                            <th>Jenis Pinjaman</th>
                            <th>Nominal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                </Table>

            </Container>
        </HomeLayout>

    ) : (navigate("/login"));

};

export default Loan;