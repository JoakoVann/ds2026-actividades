import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import BookCard from '../components/card';
import type { Libro } from '../components/types/libroProps';
import { apiFetch } from '../services/api';

const Catalogo: React.FC = () => {
    const [libros, setLibros] = useState<Libro[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        apiFetch<Libro[]>('/libros')
            .then(setLibros)
            .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'No se pudo cargar el catálogo'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="py-5 bg-light" style={{ marginTop: '70px' }}>
            <Container>
                <h2 className="text-center mb-5 fw-bold">Nuestro Catálogo</h2>
                {loading && (
                    <div className="text-center my-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2 text-muted">Cargando libros...</p>
                    </div>
                )}
                {error && !loading && (
                    <Alert variant="danger" className="text-center">
                        {error}
                    </Alert>
                )}
                {!loading && !error && (
                    <Row className="g-4">
                        {libros.map((libro) => (
                            <Col key={libro.id} xs={12} md={6} lg={4} className="d-flex justify-content-center">
                                <BookCard libro={libro} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </section>
    );
};

export default Catalogo;