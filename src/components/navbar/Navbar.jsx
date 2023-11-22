import React from "react";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Image,
    Button
} from "react-bootstrap";
import "../../assets/css/style.css";
import LogoSimpinKopertas from "../../assets/images/simpin-kopertas-logo.png";

const NavbarGeneral = () => {


    return (

        <Navbar className="navbar" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="#home">
                    <Image src={LogoSimpinKopertas} className="logo-image"/>
                    <span> Koperasi Taspen </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="nav-item"> <i className="bi bi-speedometer"></i> Dashboard </Nav.Link>
                        <NavDropdown className="nav-dropdown-master" title={
                            <span> <i className="bi bi-database-add"></i> Master Data </span>
                        } id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                Simpanan Pokok
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                Simpanan Wajib
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                Simpanan Sukarela
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                Pinjaman
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="nav-item"> <i className="bi bi-newspaper"></i> News </Nav.Link>
                        <Nav.Link className="nav-item"> <i className="bi bi-telephone-inbound"></i> Contact Us </Nav.Link>
                        <Nav.Link className="nav-button">
                            <Button className="btn-auth">
                                Logout
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );

};

export default NavbarGeneral;