import React, { useState, useEffect } from "react";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Image
} from "react-bootstrap";
import "../../assets/css/style.css";
import LogoSimpinKopertas from "../../assets/images/simpin-kopertas-logo.png";
import ProfileUserImage from "../../assets/images/undraw_profile_2.svg";
import StandLineNavbar from "../../assets/images/stand-line-navbar.png";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

import axios from "axios";

const NavbarGeneral = () => {


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


    /* -------------------- Logout Account -------------------- */

    const onLogout = () => {

        localStorage.removeItem('token');

        navigate("/login");

        enqueueSnackbar('User has successfully logged out (:', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

    };

    /* -------------------- End Logout Account -------------------- */


    return isLoggedIn ? (

        <Navbar className="navbar" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="#home">
                    <Image src={LogoSimpinKopertas} className="logo-image"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="nav-item" href="/"> <i className="bi bi-speedometer"></i> Dashboard </Nav.Link>
                        <NavDropdown className="nav-dropdown-master" title={
                            <span> <i className="bi bi-database-add"></i> Master Data </span>
                        } id="basic-nav-dropdown">
                            <NavDropdown.Item className="dropdown-item" href="/principal-saving">
                                Simpanan Pokok
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item">
                                Simpanan Wajib
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item">
                                Simpanan Sukarela
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item">
                                Pinjaman
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="nav-item"> <i className="bi bi-newspaper"></i> News </Nav.Link>
                        <Nav.Link className="nav-item"> <i className="bi bi-telephone-inbound"></i> Contact Us </Nav.Link>
                        <Image className="stand-line-navbar" src={StandLineNavbar} />
                        <NavDropdown title={<span> <i className="bi bi-person"></i> Account</span>} id="basic-nav-dropdown" className="nav-profile">
                            <NavDropdown.Item className="dropdown-item">
                                <div className="profile-user">
                                    <Image className="profile-user-image" src={ProfileUserImage} />
                                    {user.name}
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item" href="/profile-user">
                                View Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={onLogout} className="dropdown-item">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    ) : (navigate("/login"));

};

export default NavbarGeneral;