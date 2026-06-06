import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { Libro } from './types/libroProps';

interface BookCardProps {
  libro: Libro;
}

const BookCard: React.FC<BookCardProps> = ({ libro }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
    };

    return (
        <Card className="h-100 shadow-sm mx-auto" style={{ width: '18rem' }}>
            <Card.Img 
                variant="top" 
                src={libro.imagen} 
                alt={`Portada de ${libro.titulo}`}
                style={{ height: '350px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 fw-bold">Título: {libro.titulo}</Card.Title>
                <Card.Text className="text-muted mb-4">Autor: {libro.autor}</Card.Text>
                <div className="mt-auto d-flex gap-2">
                    <Button href="#libro" variant="primary" className="flex-grow-1">
                        Ver Más
                    </Button>
                    <Button
                        // className="d-none"
                        variant="link"
                        onClick={handleLikeToggle}
                        style={{ 
                                    textDecoration: 'none',
                                    boxShadow: 'none',   
                                    outline: 'none',
                                    padding: '0.375rem 0.75rem',
                                    fontSize: '1.2rem'      
                                }}
                        aria-label="Marcar como favorito"
                    >
                    {isLiked ? "❤️" : "🩶"}
                    </Button>
                </div>
        </Card.Body>
    </Card>
    );
};

export default BookCard;