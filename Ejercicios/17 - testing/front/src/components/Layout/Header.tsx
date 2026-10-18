import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
    const { usuario, cargando, estaAutenticado, tieneRol, logout } = useAuth();

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
                        {tieneRol('ADMIN') && (
                            <li className="nav-item">
                                <Link to="/libros/nuevo" className="nav-link">Nuevo libro</Link>
                            </li>
                        )}
                        {!cargando && (
                            <li className="nav-item d-flex align-items-center">
                                {estaAutenticado && usuario ? (
                                    <span className="nav-link">
                                        Hola, {usuario.nombre} ·{' '}
                                        <button type="button" className="btn btn-link nav-link d-inline p-0" onClick={logout}>
                                            Salir
                                        </button>
                                    </span>
                                ) : (
                                    <Link to="/login" className="nav-link">Ingresar</Link>
                                )}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;