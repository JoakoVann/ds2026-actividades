import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';

const libroSchema = z.object({
    titulo: z.string()
        .min(3, { message: 'El título debe tener al menos 3 caracteres.' })
        .max(100, { message: 'El título es demasiado largo.' }),
    precio: z.coerce.number().int().positive('El precio debe ser positivo.'),
    imagen: z.string().url({ message: 'Debe ser una URL válida para la portada del libro.' }),
    autorId: z.coerce.number().int().positive('El autor es obligatorio.'),
    categoriaIds: z.string().optional(),
});

type LibroFormInput = z.input<typeof libroSchema>;
type LibroFormData = z.output<typeof libroSchema>;

const AltaLibro: React.FC = () => {
    const navigate = useNavigate();

    // 2. Inicializamos React Hook Form con el resolver de Zod
    const { register, handleSubmit, formState: { errors } } = useForm<LibroFormInput, undefined, LibroFormData>({
        resolver: zodResolver(libroSchema),
        defaultValues: { titulo: '', precio: 0, imagen: '', autorId: 0, categoriaIds: '' }
    });

    // 3. Función que se ejecuta si Zod valida que todo está correcto
    const onSubmit = async (data: LibroFormData) => {
        try {
            await apiFetch('/libros', {
                method: 'POST',
                body: JSON.stringify({
                    titulo: data.titulo,
                    precio: data.precio,
                    imagen: data.imagen,
                    autorId: data.autorId,
                    categoriaIds: data.categoriaIds
                        ? data.categoriaIds.split(',').map((id) => Number(id.trim()))
                        : [],
                }),
            });
            navigate('/catalogo');
        } catch (reason: unknown) {
            alert(reason instanceof Error ? reason.message : 'No se pudo crear el libro');
        }
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

                        {/* Campo: Precio */}
                        <Form.Group className="mb-3" controlId="formPrecio">
                            <Form.Label className="fw-semibold">Precio</Form.Label>
                            <Form.Control type="number" isInvalid={!!errors.precio} {...register('precio')} />
                            <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo: Autor */}
                        <Form.Group className="mb-3" controlId="formAutor">
                            <Form.Label className="fw-semibold">ID del autor</Form.Label>
                            <Form.Control type="number" isInvalid={!!errors.autorId} {...register('autorId')}
                            />
                            <Form.Control.Feedback type="invalid">{errors.autorId?.message}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo: URL de Portada */}
                        <Form.Group className="mb-4" controlId="formImagen">
                            <Form.Label className="fw-semibold">URL de la Imagen (Portada)</Form.Label>
                            <Form.Control 
                                type="url" 
                                placeholder="https://ejemplo.com/portada.jpg" 
                                isInvalid={!!errors.imagen}
                                {...register('imagen')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.imagen?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formCategorias">
                            <Form.Label className="fw-semibold">IDs de categorías (separados por coma)</Form.Label>
                            <Form.Control type="text" {...register('categoriaIds')} />
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