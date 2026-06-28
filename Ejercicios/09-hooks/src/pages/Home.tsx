import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Hero from '../components/hero';
import BookCard from '../components/card';
import type { Libro } from '../components/types/libroProps';

const Home: React.FC = () => {
    const [libros, setLibros] = useState<Libro[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLibros = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://openlibrary.org/search.json?q=fiction&limit=6');
            if (!response.ok) {
            throw new Error('No se pudo conectar con la API de Open Library');
            }
            const data = await response.json();
            const librosTransformados: Libro[] = data.docs.map((doc: any) => {
                const coverId = doc.cover_i;
                const imagenUrl = coverId 
                    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                    : 'https://images.openlibrary.org/b/id/images-no-cover.jpg'
                return {
                    id: doc.key,
                    titulo: doc.title,
                    autor: doc.author_name ? doc.author_name.join(', ') : 'Autor Desconocido',
                    imagen: imagenUrl
                };
            });
            setLibros(librosTransformados);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error al cargar los libros');
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