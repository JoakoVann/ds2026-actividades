
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import type { Libro } from '../components/types/libroProps'; 

interface LibroDetalle extends Libro {
    descripcion: string
}

const LibroDetalle: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Captura el parámetro :id de la ruta
    const [libro, setLibro] = useState<LibroDetalle | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetalle = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://openlibrary.org/works/${id}.json`);
                if (!response.ok) throw new Error('No se pudo obtener el detalle del libro');
                
                const data = await response.json();
                
                let descripcionTexto = 'No hay descripción disponible para este libro.';
                if (data.description) {
                    descripcionTexto = typeof data.description === 'string' 
                        ? data.description 
                        : data.description.value;
                }

                const coverId = data.covers && data.covers.length > 0 ? data.covers[0] : null;
                const imagenUrl = coverId 
                    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                    : 'https://images.openlibrary.org/b/id/images-no-cover.jpg';

                setLibro({
                    id: id || '',
                    titulo: data.title,
                    autor: 'Cargando autor...', // Nota: los autores se manejan con otra sub-petición si la api lo requiere
                    imagen: imagenUrl,
                    descripcion: descripcionTexto
                });
            } catch (err: any) {
                setError(err.message || 'Error al cargar el detalle');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetalle();
    }, [id]);

    return (
        <Container style={{ marginTop: '100px', marginBottom: '50px' }}>
            <Link to="/catalogo">
                <Button variant="secondary" className="mb-4">← Volver al Catálogo</Button>
            </Link>

            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {libro && (
                <Row className="align-items-center mt-4">
                    <Col md={4} className="text-center">
                        <img 
                            src={libro.imagen} 
                            alt={libro.titulo} 
                            className="img-fluid rounded shadow-sm" 
                            style={{ maxHeight: '450px', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col md={8}>
                        <h1 className="fw-bold mb-3">{libro.titulo}</h1>
                        <h4 className="text-muted mb-3">Sinopsis:</h4>
                        <p className="fs-5 text-secondary" style={{ lineHeight: '1.7' }}>
                            {libro.descripcion}
                        </p>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default LibroDetalle;