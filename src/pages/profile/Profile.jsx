import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Container,
    Image,
    Form,
    Button
} from "react-bootstrap";
import ProfileLayout from "../../layouts/profile/ProfileLayout";
import "../../assets/css/style.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();

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

    return  isLoggedIn ? (

        <ProfileLayout>
            <Container>
                <h1 className="simpin-title">User Profile</h1>
                <div id="simpin-profile-user">
                    <Row>
                        <Col className="col-12 col-lg-3">
                            Foto Profile
                        </Col>
                        <Col className="col-12 col-lg-3">
                            <p> <i className="bi bi-person"></i> {user.name}</p>
                            <p> <i className="bi bi-envelope"></i> {user.email}</p>
                        </Col>
                        <Col className="col-12 col-lg-3">
                            <p> <i className="bi bi-person-vcard"> </i>{user.memberNumber}</p>
                            <p> <i className="bi bi-telephone-inbound"></i> {user.phoneNumber}</p>
                        </Col>
                        <Col className="col-12 col-lg-3 justify-content-end d-flex">
                            <Button className="btn-edit-profile">
                                Edit
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </ProfileLayout>

    ): ( navigate("/login") );

};

export default Profile;