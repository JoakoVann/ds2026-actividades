/* import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const CustomNavbar: React.FC = () => {
    return (
        <Navbar bg="secondary" data-bs-theme="light" expand="lg" fixed="top" className="shadow-sm">
            <Container fluid>
                <Navbar.Brand href="#home" className="d-flex align-items-center fw-bold">
                    <i className="bi bi-book-half me-2"></i>
                    <span>MiLibrería</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto">
                        <Nav.Link href="#catalogo" active>Catálogo</Nav.Link>
                        <Nav.Link href="#contacto">Contacto</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar; */

import React from 'react';

const CustomNavbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary fixed-top shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center fw-bold text-dark" href="#home">
                    <i className="bi bi-book-half me-2"></i>
                    <span>MiLibrería</span>
                </a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a href="#catalogo" className="nav-link active fw-semibold text-dark">Catálogo</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contacto" className="nav-link text-dark">Contacto</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default CustomNavbar;