import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Container,
    Card
} from "react-bootstrap";
import HomeLayout from "../../layouts/home/HomeLayout";
import "../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CurrencyFormatter from "../../assets/js/currencyFormatter";
import MapWrapped from "../../components/map/MapWrapped";

const Home = () => {

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

                    localStorage.setItem("userId", currentUserResponse.data.currentUser.id);

                }

            } catch (err) {

                setIsLoggedIn(false);

            }

        };

        validateLogin();

        setIsRefresh(false);

    }, [isRefresh]);

    /* -------------------- End Current User -------------------- */


    /* -------------------- Get Principal Saving -------------------- */

    const [principalSavingData, setPrincipalSavingData] = useState([]);

    useEffect(() => {

        const onSearchPrincipalSaving = async () => {

            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            const principalSavingDataRequest = await axios.get(
                `http://localhost:8080/api/v1/${userId}/principal-saving`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );


            const getPrincipalSavingResponse = await principalSavingDataRequest.data;

            const getSubTotal = []

            getSubTotal.push(...getPrincipalSavingResponse.data.handleGetedPrincipalSavingByUserId.map(item => item.nominal));

            const convertedSubTotal = getSubTotal.map(item => parseFloat(item));

            const total = convertedSubTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            setPrincipalSavingData(total);

        };

        onSearchPrincipalSaving();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* -------------------- End Get Principal Saving -------------------- */


    /* -------------------- Get Mandatory Saving -------------------- */

    const [mandatorySavingData, setMandatorySavingData] = useState([]);

    useEffect(() => {

        const onSearchMandatorySaving = async () => {

            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            const mandatorySavingDataRequest = await axios.get(
                `http://localhost:8080/api/v1/${userId}/mandatory-saving`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );


            const getMandatorySavingResponse = await mandatorySavingDataRequest.data;

            const getSubTotal = []

            getSubTotal.push(...getMandatorySavingResponse.data.handleGetedMandatorySavingByUserId.map(item => item.nominal));

            const convertedSubTotal = getSubTotal.map(item => parseFloat(item));

            const total = convertedSubTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            setMandatorySavingData(total);

        };

        onSearchMandatorySaving();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* -------------------- End Get Mandatory Saving -------------------- */


    /* -------------------- Get Voluntary Saving -------------------- */

    const [voluntarySavingData, setVoluntarySavingData] = useState([]);

    useEffect(() => {

        const onSearchVoluntarySaving = async () => {

            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            const voluntarySavingDataRequest = await axios.get(
                `http://localhost:8080/api/v1/${userId}/voluntary-saving`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );


            const getVoluntarySavingResponse = await voluntarySavingDataRequest.data;

            const getSubTotal = []

            getSubTotal.push(...getVoluntarySavingResponse.data.handleGetedVoluntarySavingByUserId.map(item => item.nominal));

            const convertedSubTotal = getSubTotal.map(item => parseFloat(item));

            const total = convertedSubTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            setVoluntarySavingData(total);

        };

        onSearchVoluntarySaving();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* -------------------- End Get Voluntary Saving -------------------- */


    return isLoggedIn ? (

        <HomeLayout>
            <Container>
                <div id="simpin-overview">
                    <Row className="row-result-total">
                        <Col className="col-12 col-lg-3 mt-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <Row>
                                            <Col className="col-3 col-lg-3">
                                                <i className="bi bi-cash-coin"></i>
                                            </Col>
                                            <Col className="col-9 col-lg-9">
                                                Simpanan Pokok
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        {CurrencyFormatter(principalSavingData)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col-12 col-lg-3 mt-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <Row>
                                            <Col className="col-3 col-lg-3">
                                                <i className="bi bi-cash-coin"></i>
                                            </Col>
                                            <Col className="col-9 col-lg-9">
                                                Simpanan Wajib
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        {CurrencyFormatter(mandatorySavingData)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col-12 col-lg-3 mt-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <Row>
                                            <Col className="col-3 col-lg-3">
                                                <i className="bi bi-cash-coin"></i>
                                            </Col>
                                            <Col className="col-9 col-lg-9">
                                                Simpanan Sukarela
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        {CurrencyFormatter(voluntarySavingData)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col-12 col-lg-3 mt-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <Row>
                                            <Col className="col-3 col-lg-3">
                                                <i className="bi bi-cash-coin"></i>
                                            </Col>
                                            <Col className="col-9 col-lg-9">
                                                Pinjaman
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        Loan
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="card-analytics-diagram">
                    <Row>
                        <Col className="col-12 col-lg-8">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Diagram Total
                                    </Card.Title>
                                    <Card.Text>
                                        <canvas id="myChart" width="400" height="200"></canvas>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col-12 col-lg-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Lokasi Simpin Kopertas
                                    </Card.Title>
                                    <Card.Text className="geo-map">
                                        <MapWrapped
                                            centerCoordinates={[-6.9932, 110.4203]}
                                            coordinatesPosition={[-6.9932, 110.4203]}
                                        />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </HomeLayout>

    ) : (navigate("/login"));

};

export default Home;