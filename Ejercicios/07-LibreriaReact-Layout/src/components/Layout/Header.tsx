import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary fixed-top shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center fw-bold text-dark" to="/">
                    <i className="bi bi-book-half me-2"></i>
                    <span>MiLibrería</span>
                </Link>
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
                            <Link to="/catalogo" className="nav-link">Catálogo</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contacto" className="nav-link">Contacto</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;