import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Container,
    Card
} from "react-bootstrap";
import ProfileLayout from "../../layouts/profile/ProfileLayout";
import "../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NewspapersData } from "../../assets/js/newspapersData";
import NewspaperCard from "../../components/news/NewspaperCard";

const News = () => {

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

    return isLoggedIn ? (

        <ProfileLayout>
            <Container>
                <div id="simpin-newspapers-header">
                    <Row>
                        <Col className="col-12 col-lg-12">
                            <div className="newspapers-header">
                                <i className="bi bi-stack"></i>
                                <h4>Berita</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-12 col-lg-12">
                            <div className="newspapers-description">
                                <p> Disini ada <span> 20++ berita </span> yang tersedia untuk kamu.</p>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div id="simpin-newspapers-card">
                    <Row>
                        <Col className="col-12 col-lg-6 simpin-newspapers">
                            <h1>Recomended for you ({NewspapersData.Collections.length})</h1>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        {
                            NewspapersData.Collections.map((news) => {
                                return (

                                    <NewspaperCard
                                        key={news.id}
                                        cardImage={news.properties.image}
                                        cardTitle={news.properties.name}
                                        cardDescription={news.properties.description}
                                        cardLink={news.properties.link}
                                    />

                                );
                            })
                        }
                    </Row>
                </div>

            </Container>
        </ProfileLayout>

    ) : (navigate("/login"));

};

export default News;