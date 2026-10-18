import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Hero from '../components/hero';
import BookCard from '../components/card';
import type { Libro } from '../components/types/libroProps';
import { apiFetch } from '../services/api';

const Home: React.FC = () => {
    const [libros, setLibros] = useState<Libro[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLibros = async () => {
        try {
            setLoading(true);
            const data = await apiFetch<Libro[]>('/libros');
            setLibros(data.slice(0, 6));
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error al cargar los libros');
        } finally {
            setLoading(false);
        }
    };
    fetchLibros();
    }, []);

    return (
        <>
        <Hero />
        <section className="py-5 bg-light" id="catalogo">
            <Container>
                <h2 className="text-center mb-5 fw-bold">Libros Destacados</h2>
                {loading && (
                    <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Buscando libros</p>
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
                            <Col 
                                key={libro.id} 
                                xs={12} 
                                md={6} 
                                lg={4} 
                                className="d-flex justify-content-center">
                            <BookCard libro={libro} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </section>
        </>
    );
};

export default Home;