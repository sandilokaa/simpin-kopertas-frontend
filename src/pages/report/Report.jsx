import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Container,
    Card,
    Button
} from "react-bootstrap";
import HomeLayout from "../../layouts/home/HomeLayout";
import "../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Report = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();

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
                <div id="print-report">
                    <Row>
                        <Col className="col-12 col-lg-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h6>Simpanan Wajib</h6>
                                    </Card.Title>
                                    <Card.Text>
                                        <p>Cetak laporan ini jika diperlukan dengan mengeklik tombol Download.</p>
                                    </Card.Text>
                                    <Button className="btn-download-report">
                                        Download
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col-12 col-lg-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h6>Simpanan Sukarela</h6>
                                    </Card.Title>
                                    <Card.Text>
                                        <p>Cetak laporan ini jika diperlukan dengan mengeklik tombol Download.</p>
                                    </Card.Text>
                                    <Button className="btn-download-report">
                                        Download
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col-12 col-lg-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h6>Pinjaman</h6>
                                    </Card.Title>
                                    <Card.Text>
                                        <p>Cetak laporan ini jika diperlukan dengan mengeklik tombol Download.</p>
                                    </Card.Text>
                                    <Button className="btn-download-report">
                                        Download
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </HomeLayout>

    ) : (navigate("/login"));

};

export default Report;