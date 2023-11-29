import React from "react";
import { 
    Row,
    Card, 
    Col,
    Button 
} from "react-bootstrap";
import "../../assets/css/style.css";


const NewspaperCard = ({ cardTitle, cardImage, cardDescription, cardLink }) => {

    return (

        <Col className="col-12 col-lg-3 mt-4">
            <Card className="newspaper-collection">
                <Card.Img className="newspapers-image" variant="top" src={cardImage}/>
                <Card.Body>
                    <Card.Title className="news-name">{cardTitle}</Card.Title>
                    <Card.Text className="news-description text-muted">{cardDescription}</Card.Text>
                    <Row>
                        <Col>
                            
                        </Col>
                        <Col className="col-6 col-lg-6">
                            <Button className="btn-youtube" target="blank" href={cardLink}>View</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>

    );

};

export default NewspaperCard;