import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Container,
    Button
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/style.css";
import axios from "axios";


const HeaderGeneral = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const { pathname } = location;

    const splitLocation = pathname.split("/");

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
        <>

            {/* ------------------- Header Content -------------------  */}

            <div id="header-simpin-content">
                <Container>
                    <div className="header-simpin-greetings">
                        <Row>
                            <Col className="col-12 col-lg-12">
                                <h1> Selamat Datang, <span>{user.name}</span> </h1>
                                <p> Apa saja yang terjadi dengan koperasi anda hari ini. </p>
                            </Col>
                        </Row>
                    </div>
                    <div className="header-choose-analytics">
                        <Row>
                            <Col className="col-4 col-lg-2">
                                <Button className={splitLocation[1] === "" ? "active" : "btn-choose-analytics"} onClick={() => navigate(`/`)}> Ringkasan </Button>
                            </Col>
                            <Col className="col-4 col-lg-2">
                                <Button className={splitLocation[1] === "principal-saving" ? "active" : "btn-choose-analytics"} onClick={() => navigate(`/principal-saving`)}> Simpan Pokok </Button>
                            </Col>
                            <Col className="col-4 col-lg-2">
                                <Button className={splitLocation[1] === "mandatory-saving" ? "active" : "btn-choose-analytics"} onClick={() => navigate(`/mandatory-saving`)}> Simpan Wajib </Button>
                            </Col>
                            <Col className="col-4 col-lg-2">
                                <Button className={splitLocation[1] === "voluntary-saving" ? "active" : "btn-choose-analytics"} onClick={() => navigate(`/voluntary-saving`)}> Simpan Sukarela </Button>
                            </Col>
                            <Col className="col-4 col-lg-2">
                                <Button className={splitLocation[1] === "loan-data" ? "active" : "btn-choose-analytics"} onClick={() => navigate(`/loan-data`)}> Pinjaman </Button>
                            </Col>
                            <Col className="col-4 col-lg-2">
                                <Button className={splitLocation[1] === "report-data" ? "active" : "btn-choose-analytics"} onClick={() => navigate(`/report-data`)}> Cetak Laporan </Button>
                            </Col>
                        </Row>
                    </div>
                    <hr />
                </Container>
            </div>

            {/* ------------------- End Header Content -------------------  */}

        </>

    ) : ( navigate("/login") );

};

export default HeaderGeneral;