import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const libroSchema = z.object({
    titulo: z.string()
        .min(3, { message: 'El título debe tener al menos 3 caracteres.' })
        .max(100, { message: 'El título es demasiado largo.' }),
    autor: z.string()
        .min(4, { message: 'El nombre del autor debe tener al menos 4 caracteres.' }),
    imagen: z.string()
        .url({ message: 'Debe ser una URL válida para la portada del libro.' })
        .or(z.literal('')) // Permite que quede vacío si no se quiere obligar
});

type LibroFormData = z.infer<typeof libroSchema>;

const AltaLibro: React.FC = () => {
    const navigate = useNavigate();

    // 2. Inicializamos React Hook Form con el resolver de Zod
    const { register, handleSubmit, formState: { errors } } = useForm<LibroFormData>({
        resolver: zodResolver(libroSchema),
        defaultValues: { titulo: '', autor: '', imagen: '' }
    });

    // 3. Función que se ejecuta si Zod valida que todo está correcto
    const onSubmit = (data: LibroFormData) => {
        console.log('Datos del nuevo libro válidos:', data);
    
        alert('¡Libro validado y creado con éxito!');
        
        navigate('/catalogo');
    };

    return (
        <Container style={{ marginTop: '100px', marginBottom: '50px', maxWidth: '600px' }}>
            <Card className="shadow-sm p-4">
                <Card.Body>
                    <h2 className="text-center mb-4 fw-bold">Alta de Nuevo Libro</h2>
                    
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {/* Campo: Título */}
                        <Form.Group className="mb-3" controlId="formTitulo">
                            <Form.Label className="fw-semibold">Título del Libro</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ej: El Aleph" 
                                isInvalid={!!errors.titulo}
                                {...register('titulo')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.titulo?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo: Autor */}
                        <Form.Group className="mb-3" controlId="formAutor">
                            <Form.Label className="fw-semibold">Autor</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ej: Jorge Luis Borges" 
                                isInvalid={!!errors.autor}
                                {...register('autor')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.autor?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo: URL de Portada */}
                        <Form.Group className="mb-4" controlId="formImagen">
                            <Form.Label className="fw-semibold">URL de la Imagen (Portada)</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="https://ejemplo.com/portada.jpg" 
                                isInvalid={!!errors.imagen}
                                {...register('imagen')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.imagen?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Guardar Libro
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/catalogo')}>
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AltaLibro;