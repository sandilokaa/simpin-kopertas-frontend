import React from "react";
import {
    Row,
    Col,
    Container,
    Card
} from "react-bootstrap";
import HomeLayout from "../../layouts/home/HomeLayout";
import "../../assets/css/style.css";

const Home = () => {


    return (

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
                                                Total Saving
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        Principal Saving
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
                                                Total Saving
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        Mandatory Saving
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
                                                Total Voluntary
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        Voluntary Saving
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
                                                Total Loan
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
            </Container>
        </HomeLayout>

    )

};

export default Home;