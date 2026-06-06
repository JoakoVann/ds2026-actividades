import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero: React.FC = () => {
    const heroStyle = {
    background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://static.vecteezy.com/system/resources/previews/051/488/673/large_2x/open-concept-library-with-large-windows-and-cozy-chairs-free-photo.jpg') no-repeat center center/cover", 
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '70px',
    width: '100vw',
    marginLeft: '50%',
    transform: 'translateX(-50%)'
    };

    return (
    
        <section style={heroStyle} className="text-center text-white py-5">
            <Container> 
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <h1 className="display-3 fw-bold mb-3">Bienvenido a Nuestra Librería</h1>
                        <p className="lead mb-5 fs-4">
                            Descubre los mejores libros del país
                        </p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <Button href="#catalogo" variant="primary" size="lg" className="px-5 py-3 fw-semibold">
                                Explorar Catálogo
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;