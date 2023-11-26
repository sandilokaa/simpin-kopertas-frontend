import React from "react";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";
import "../../assets/css/style.css";

const FooterGeneral = () => {

    return (

        <div>
            <Container>
                <Row>
                    <Col className="col-12 col-lg-12 text-center">
                        <p>
                            @2023 Simpin Kopertas. All Rights Reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>


    );

};

export default FooterGeneral;